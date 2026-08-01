import { cva } from 'class-variance-authority';
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ButtonHTMLAttributes, Ref, UIEvent } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import { Input } from '../Input';
import type {
  LeftNavBodyProps,
  LeftNavExitProps,
  LeftNavFooterProps,
  LeftNavExpandableProps,
  LeftNavGroupProps,
  LeftNavItemProps,
  LeftNavProps,
  LeftNavSearchProps,
  LeftNavSectionProps,
} from './LeftNav.types';

/** One row height for everything clickable, so the rhythm never breaks. */
const ROW = 'mdt-h-8 mdt-rounded-md mdt-px-2';

/**
 * The panel's own colour, going transparent.
 *
 * Every fade in here is the surface dissolving rather than a grey laid over
 * the rows, which is why they all reach for the same pair.
 */
/** Every fade is the same strip in a different direction. */
const FADE_STRIP = 'mdt-pointer-events-none mdt-absolute mdt-inset-x-0 mdt-transition-opacity';

/** The height of a fade at the top of a list, and at the head of a section. */
const FADE_TOP = 'mdt-top-0 mdt-h-4';

/** A fade with nothing behind it says there is more when there is not. */
const FADE_OFF = 'mdt-opacity-0';

const FADE_DOWN =
  'mdt-bg-gradient-to-b mdt-from-neutral-10 mdt-to-transparent dark:mdt-from-neutral-150';
const FADE_UP =
  'mdt-bg-gradient-to-t mdt-from-neutral-10 mdt-to-transparent dark:mdt-from-neutral-150';

/** How far you scroll before the header has finished folding. */
const COLLAPSE_DISTANCE = 56;

/** The height the home row gives up as it folds. */
const EXIT_HEIGHT = 44;

/** The width the search gives back so the disc has somewhere to land. */
const DISC_LANDING = 40;

interface LeftNavScrollState {
  /** 0 at the top, 1 once the header has fully folded. */
  progress: number;
  atTop: boolean;
  atBottom: boolean;
  report: (state: { progress: number; atTop: boolean; atBottom: boolean }) => void;

  /**
   * Whether a section header is pinned to the top of the list.
   *
   * The body's own top fade and a sticky header both want to be the thing rows
   * disappear under, and stacked they fade the header itself. When a section is
   * showing, the header takes the job and brings its own fade.
   */
  pinned: boolean;
  setPinned: (pinned: boolean) => void;
}

/**
 * What the header needs to know about the list below it.
 *
 * The parts are composed by the caller - exit, search and body are siblings, in
 * whatever order suits - so the scroll position cannot be passed down as a
 * prop. A context lets the body report and the header react without either one
 * knowing the other exists.
 *
 * The default is a nav that never scrolls, which is exactly what a short one
 * is: nothing folds, nothing fades.
 */
const LeftNavScroll = createContext<LeftNavScrollState>({
  progress: 0,
  atTop: true,
  atBottom: true,
  report: () => undefined,
  pinned: false,
  setPinned: () => undefined,
});

const FOCUS =
  'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-1 focus-visible:mdt-ring-offset-background';

/**
 * How the row you are on is marked, and why none of it is blue.
 *
 * **A grey pill and a bar down its left edge.** The bar is the part that
 * survives a glance: a fill alone has to be strong enough to spot from the
 * corner of your eye, and at that strength forty rows of menu turn into a
 * chessboard. A 2px rule at the leading edge is unmistakable at any tint, which
 * is what lets the fill stay quiet.
 *
 * The system is neutral, so the mark is neutral - the bar is `foreground`, the
 * same ink as the words. Blue was the first attempt and it made "you are here"
 * the loudest thing in a panel whose whole job is to be quiet.
 *
 * **The text steps back until you are on it.** Rows sit at `foreground/70` and
 * the selected one comes to full strength, so the list reads as one thing with
 * a current place in it rather than forty equal claims on your attention.
 */
export const leftNavItemVariants = cva(
  [
    'mdt-group/nav-item mdt-relative mdt-flex mdt-w-full mdt-items-center mdt-gap-2',
    ROW,
    'mdt-text-sm mdt-text-foreground/70 mdt-transition-colors',
    'hover:mdt-text-foreground',
    FOCUS,
  ],
  {
    variants: {
      active: {
        true: 'mdt-bg-secondary mdt-font-medium mdt-text-foreground',
        // One step darker than the panel, not a weaker accent. A faint tint of
        // the selected colour reads as "this is nearly selected", and every row
        // you sweep past claims to be the one you are on. `muted` sits one step
        // off `secondary` in both themes - darker on white, lighter on black.
        false: 'hover:mdt-bg-muted',
      },
      disabled: {
        true: 'mdt-pointer-events-none mdt-opacity-50',
        false: '',
      },
    },
    defaultVariants: { active: false, disabled: false },
  }
);

/**
 * LeftNav - the navigation down the left of a settings area.
 *
 * **Two levels, and never three.** The root lists everything; an item with its
 * own pages opens a second level in place. Anything that would have been a
 * third level is flattened into the second with groups, because depth is where
 * people get lost - three down, "back" has to be pressed an unknown number of
 * times and nobody knows where they are.
 *
 * **Leaving and going up are different acts, and look it.** A settings area
 * that has replaced the app's navigation needs a way out, and a second level
 * needs a way up. Two back arrows stacked in one panel is the mistake this
 * component exists to avoid, so they are separated on every axis available:
 *
 * | | `LeftNavExit` | `LeftNavSection` |
 * | --- | --- | --- |
 * | Where | above the search, pinned | below it, in the scrolling body |
 * | Glyph | `arrow-left`, a long arrow | `chevron-left`, one step |
 * | Says | the destination - "Back to app" | where you are - "Observability" |
 * | Weight | small and muted, chrome | foreground and medium, a heading |
 * | When | always | only at level 2 |
 *
 * The one that leaves is chrome and never moves. The one that goes up is a
 * heading and belongs to the content under it.
 *
 * @example
 * ```tsx
 * const levels = useLeftNavLevels();
 *
 * <LeftNav>
 *   <LeftNavExit href="/">Back to app</LeftNavExit>
 *   <LeftNavSearch value={query} onChange={…} />
 *   <LeftNavBody level={levels.level}>
 *     {levels.level === 1 ? (
 *       <LeftNavItem icon={<Icon name="user" />} href="/settings/profile">Profile</LeftNavItem>
 *     ) : (
 *       <LeftNavSection title="Observability" onBack={levels.back}>…</LeftNavSection>
 *     )}
 *   </LeftNavBody>
 * </LeftNav>
 * ```
 */
const LeftNav = forwardRef<HTMLElement, LeftNavProps>(
  ({ className, label = 'Settings', ...props }, ref) => {
    const [scroll, setScroll] = useState({ progress: 0, atTop: true, atBottom: true });
    const report = useCallback((next: { progress: number; atTop: boolean; atBottom: boolean }) => {
      // Only on a real change: a scroll event fires per frame, and setting
      // identical state on every one of them re-renders the whole panel
      // sixty times a second for nothing.
      setScroll((current) =>
        current.progress === next.progress &&
        current.atTop === next.atTop &&
        current.atBottom === next.atBottom
          ? current
          : next
      );
    }, []);
    const [pinned, setPinned] = useState(false);
    const value = useMemo(
      () => ({ ...scroll, report, pinned, setPinned }),
      [scroll, report, pinned]
    );

    return (
      <LeftNavScroll.Provider value={value}>
        <nav
          ref={ref}
          aria-label={label}
          className={cn(
            // A column that owns its height, so the search pins at the top and the
            // footer at the bottom while only the middle scrolls.
            'mdt-flex mdt-h-full mdt-w-64 mdt-shrink-0 mdt-flex-col',
            // Grey, and the page beside it white. A navigation that matches the
            // content it sits next to has to be drawn with a border to exist at
            // all; one that is a shade back from it simply is a different surface,
            // which is what every reference here does.
            //
            // `neutral-10` - the lightest step in the palette, one shade off white.
            // A primitive rather than a semantic pair, deliberately: every semantic
            // surface is either white or a grey dark enough to read as a slab, and
            // there is no semantic token for "barely tinted". Logged in
            // MISSING-TOKENS.md as a surface the system does not name yet.
            //
            // `neutral-150` in dark, one step off the `neutral-160` background, for
            // the same reason: a panel has to be a different surface, not a
            // different colour.
            'mdt-border-r mdt-border-border mdt-bg-neutral-10 dark:mdt-bg-neutral-150',
            className
          )}
          {...props}
        />
      </LeftNavScroll.Provider>
    );
  }
);
LeftNav.displayName = 'LeftNav';

/**
 * The way out of settings, back to the app.
 *
 * **A white disc on a grey panel.** Nothing else in the navigation looks like
 * this: the rows are flat, and this one is a raised object sitting on the
 * surface. That is what separates it from the section back further down - not a
 * different label, a different physics.
 *
 * **A house, not an arrow.** An arrow means "one step back" and the section
 * header uses one; a house means the place you started, which is where this
 * actually goes. And it names the destination - "Go to home" - because a bare
 * "Back" would be the same sentence as the control below it.
 */
const LeftNavExit = forwardRef<HTMLAnchorElement | HTMLButtonElement, LeftNavExitProps>(
  ({ className, href, children = 'Go to home', ...props }, ref) => {
    const { progress } = useContext(LeftNavScroll);

    const shared = {
      className: cn(
        'mdt-group/exit mdt-absolute mdt-flex mdt-items-center mdt-gap-2',
        'mdt-text-sm mdt-font-normal mdt-text-muted-foreground',
        'hover:mdt-text-foreground focus-visible:mdt-outline-none',
        className
      ),
      style: {
        // It does not move, in either direction. An earlier version walked it
        // right as the header folded, and it read as a thing escaping rather
        // than a panel tidying itself; a later one nudged it 6px down to centre
        // it against the field, which is a smaller version of the same mistake.
        // The one fixed point on the screen should be fixed. The search comes
        // up beside it.
        //
        left: '0.75rem',
        top: '0.75rem',
      },
    };

    const content = (
      <>
        <span
          className={cn(
            'mdt-flex mdt-h-8 mdt-w-8 mdt-shrink-0 mdt-items-center mdt-justify-center',
            // Square, with the same radius as every row and the search field.
            // A disc was the odd shape out in a panel of soft rectangles, and
            // one shape repeated is what makes the set look drawn rather than
            // collected. No border: the shadow is what lifts it, and a ring as
            // well made it a component in a box rather than an object on a
            // surface.
            'mdt-rounded-md mdt-bg-background mdt-text-muted-foreground',
            // The shadow lifts it off the panel while it is alone up there. Beside
            // the search - which has its own - two raised objects touching read as
            // one lumpy surface, so it settles flat and lets the field be the
            // raised thing.
            'mdt-transition-shadow group-hover/exit:mdt-text-foreground',
            progress < 1 && 'mdt-shadow-sm group-hover/exit:mdt-shadow-md',
            'group-focus-visible/exit:mdt-ring-2 group-focus-visible/exit:mdt-ring-ring'
          )}
        >
          <Icon name="home" size="sm" aria-hidden />
        </span>
        {/*
          Fades and stops taking space as the header folds, so the disc has a
          clear run to the right. Kept in the accessibility tree the whole time:
          the control still says where it goes, whether or not the words show.
        */}
        <span
          className="mdt-overflow-hidden mdt-whitespace-nowrap"
          style={{
            // Collapses as well as fades. Fading alone leaves the words taking
            // up room, so the button stays wide, so it hangs off the right edge
            // of the panel when it arrives.
            maxWidth: `${String((1 - progress) * 100)}%`,
            opacity: 1 - Math.min(1, progress * 2),
          }}
        >
          {children}
        </span>
      </>
    );

    // The wrapper is what collapses. The disc inside it stays put and is free
    // to travel, which is why the height is here and not on the control.
    return (
      <div
        className="mdt-relative mdt-shrink-0 mdt-px-3"
        style={{ height: `${String(12 + (1 - progress) * EXIT_HEIGHT)}px` }}
      >
        {href === undefined ? (
          <button
            ref={ref as Ref<HTMLButtonElement>}
            type="button"
            {...shared}
            {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
          >
            {content}
          </button>
        ) : (
          <a ref={ref as Ref<HTMLAnchorElement>} href={href} {...shared} {...props}>
            {content}
          </a>
        )}
      </div>
    );
  }
);
LeftNavExit.displayName = 'LeftNavExit';

/**
 * The search field, pinned under the exit.
 *
 * Sticky because a settings menu is long and the thing people do in a long
 * menu is search it. Scrolling back to the top to find the search field is the
 * failure mode; forty rows is exactly where it starts to bite.
 */
const LeftNavSearch = forwardRef<HTMLInputElement, LeftNavSearchProps>(
  ({ className, label = 'Search', ...props }, ref) => {
    const { progress } = useContext(LeftNavScroll);

    return (
      <div
        className="mdt-shrink-0 mdt-px-3 mdt-pb-3 mdt-pt-1"
        // Room on the right for the disc to land in. It rises on its own as the
        // row above collapses - that is layout, not a transform - and only the
        // width has to be animated.
        style={{ paddingLeft: `${String(12 + progress * DISC_LANDING)}px` }}
      >
        <Input
          ref={ref}
          type="search"
          size="sm"
          aria-label={label}
          placeholder={label}
          // The magnifier inside the field, which is what makes it read as a
          // search rather than as the first form field on the page. `Input`
          // already takes it; a bare box was the lazier half of reusing `Input`.
          startAdornment={<Icon name="search" size="sm" aria-hidden />}
          // The same raised treatment as the home disc. Two objects sitting on
          // the panel, and everything else flat on it - which is what lets the
          // rows scroll underneath them without a border to stop the eye.
          className={cn('mdt-w-full mdt-bg-background mdt-shadow-sm', className)}
          wrapperClassName="mdt-w-full"
          {...props}
        />
      </div>
    );
  }
);
LeftNavSearch.displayName = 'LeftNavSearch';

/**
 * The part that scrolls, and the only part that changes with the level.
 *
 * **It does not animate the move, and `level` is not doing it secretly.** The
 * first version keyed the inner element on the level, on the assumption that a
 * changed key remounts the subtree and restarts a CSS animation. It does not:
 * measured, React reuses the same DOM node and swaps the contents, so the key
 * bought nothing and the comment explaining it was false.
 *
 * `level` is published as `data-level` instead. A product that wants the panel
 * to slide can drive it from there, where the mechanism is visible rather than
 * implied by a prop that appears to do it.
 */
const LeftNavBody = forwardRef<HTMLDivElement, LeftNavBodyProps>(
  ({ className, level = 1, children, onScroll, ...props }, ref) => {
    const { atTop, atBottom, report, pinned, progress } = useContext(LeftNavScroll);
    const scroller = useRef<HTMLDivElement | null>(null);

    const measure = useCallback(
      (element: HTMLDivElement) => {
        const { scrollTop, scrollHeight, clientHeight } = element;
        // A list barely taller than the panel can scroll 20px and no further,
        // which left the header stopped a third of the way through folding -
        // the disc parked in the middle of nowhere and staying there. The
        // header only folds when there is enough scroll to finish the job.
        const room = scrollHeight - clientHeight;
        report({
          progress:
            room < COLLAPSE_DISTANCE ? 0 : Math.min(1, Math.max(0, scrollTop / COLLAPSE_DISTANCE)),
          atTop: scrollTop <= 0,
          // A pixel of slack: sub-pixel layout means the sum rarely lands
          // exactly on the height, and without it the bottom fade never quite
          // goes away.
          atBottom: scrollTop + clientHeight >= scrollHeight - 1,
        });
      },
      [report]
    );

    // On mount and whenever the rows change. A list shorter than the panel has
    // nothing to fade, and switching from a short section to a long one has to
    // bring the bottom fade back before anybody touches the wheel.
    useEffect(() => {
      if (scroller.current) measure(scroller.current);
    }, [children, measure]);

    // A new level starts at its top.
    //
    // Without this you arrive in a section already scrolled, at whatever
    // position the list you left happened to be at - halfway down a list you
    // have never seen, with the header folded, wondering what you missed. The
    // scroll belongs to the list, and this is a different list.
    useEffect(() => {
      const node = scroller.current;
      if (!node) return;
      node.scrollTop = 0;
      measure(node);
    }, [level, measure]);

    const attach = useCallback(
      (node: HTMLDivElement | null) => {
        scroller.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    return (
      // Relative, so the two fades can sit over the scrolling rows.
      <div className="mdt-relative mdt-flex-1 mdt-overflow-hidden">
        <div
          ref={attach}
          data-level={level}
          onScroll={(event: UIEvent<HTMLDivElement>) => {
            measure(event.currentTarget);
            onScroll?.(event);
          }}
          className={cn('mdt-h-full mdt-overflow-y-auto mdt-overflow-x-hidden mdt-px-3', className)}
          {...props}
        >
          {/*
            Padded by exactly what the header gives up.

            Without this the list moves twice as you scroll: once because you
            scrolled it, and again because the row above collapsed and pulled
            everything up by another 44px. It read as the list bolting. Now the
            header folds against this padding and the rows travel at the speed
            of the wheel, which is the only speed anybody expects.
          */}
          <div
            className="mdt-flex mdt-flex-col mdt-gap-0.5 mdt-pb-1"
            style={{ paddingTop: `${String(4 + progress * EXIT_HEIGHT)}px` }}
          >
            {children}
          </div>
        </div>

        {/*
          Rows fade out rather than being sliced off - but only when there is
          something under the fade.

          A hard edge under the search reads as a mistake: half a row of text
          cut through the middle looks like something failed to render. A fade
          says the list continues. A fade with nothing behind it says the same
          thing and is wrong, which is why each one waits for its own end of the
          list to actually be off screen.
        */}
        <div
          aria-hidden
          className={cn(FADE_STRIP, FADE_TOP, FADE_DOWN, (atTop || pinned) && FADE_OFF)}
        />
        <div
          aria-hidden
          className={cn(FADE_STRIP, 'mdt-bottom-0 mdt-h-6', FADE_UP, atBottom && FADE_OFF)}
        />
      </div>
    );
  }
);
LeftNavBody.displayName = 'LeftNavBody';

/**
 * The header of a second level: where you are, and the way back up.
 *
 * A heading with a chevron, not a button with a label. The title carries the
 * weight because the question it answers is "what am I looking at" - the way
 * back is the small part, and it sits inside the heading rather than above it
 * so it cannot be mistaken for the exit two rows up.
 */
const LeftNavSection = forwardRef<HTMLDivElement, LeftNavSectionProps>(
  ({ className, title, onBack, backLabel = 'Back to all settings', children, ...props }, ref) => {
    const { atTop, setPinned } = useContext(LeftNavScroll);

    // Tells the body to stand its own top fade down for as long as this is
    // showing: two fades stacked at the same edge fade the header itself.
    useEffect(() => {
      setPinned(true);
      return () => {
        setPinned(false);
      };
    }, [setPinned]);

    return (
      <div ref={ref} className={cn('mdt-flex mdt-flex-col mdt-gap-0.5', className)} {...props}>
        <div
          className={cn(
            // Pinned, so the name of the section you are in survives scrolling
            // forty rows of it. Opaque, because rows pass underneath.
            'mdt-sticky mdt-top-0 mdt-z-10 mdt-mb-2 mdt-flex mdt-items-center mdt-gap-1',
            'mdt-bg-neutral-10 dark:mdt-bg-neutral-150'
          )}
        >
          <button
            type="button"
            aria-label={backLabel}
            onClick={onBack}
            className={cn(
              'mdt-flex mdt-h-6 mdt-w-6 mdt-shrink-0 mdt-items-center mdt-justify-center',
              'mdt-rounded-md mdt-text-muted-foreground mdt-transition-colors',
              // `muted`, not `secondary` - the panel itself is lighter than
              // `secondary` now, so the old hover was invisible against it.
              'hover:mdt-bg-muted hover:mdt-text-foreground',
              FOCUS
            )}
          >
            <Icon name="chevron-left" size="sm" aria-hidden />
          </button>
          {/*
          A real heading. Screen readers navigate settings by heading, and this
          is the only thing on the panel that says which section forty rows
          below belong to.
        */}
          {/*
          Quiet. It is a label for where you are, not the thing you came to
          read - the rows below it are. At medium weight in full black it
          out-shouted every one of them.
        */}
          <h2 className="mdt-truncate mdt-text-sm mdt-font-normal mdt-text-muted-foreground">
            {title}
          </h2>

          {/*
          Its own fade, hung below it. The body's top fade stands down while a
          header is pinned - stacked, the two of them fade the header itself.
        */}
          <div
            aria-hidden
            className={cn(
              'mdt-pointer-events-none mdt-absolute mdt-inset-x-0 mdt-top-full mdt-h-4 mdt-transition-opacity',
              FADE_DOWN,
              atTop && FADE_OFF
            )}
          />
        </div>
        {/*
        Wrapped, so `first:pt-0` on the first group actually fires. Without it
        the header is the first child, the first group is the second, and it
        keeps its 16px - which put 22px between a heading and the rows it names.
      */}
        <div className="mdt-flex mdt-flex-col mdt-gap-0.5">{children}</div>
      </div>
    );
  }
);
LeftNavSection.displayName = 'LeftNavSection';

/**
 * A labelled block of items. A heading, and nothing more.
 *
 * **It does not fold.** The first version let the heading collapse its group,
 * which is the wrong thing to hide behind a control: a heading like "Compute"
 * is a label for where you are in a list, and collapsing it takes away the map
 * rather than the detail. What people actually want to fold is one *setting*
 * that has pages of its own - see `LeftNavExpandable`. Two collapsing
 * mechanisms in one panel is one too many, so this one lost.
 */
const LeftNavGroup = forwardRef<HTMLDivElement, LeftNavGroupProps>(
  ({ className, label, children, ...props }, ref) => (
    <div
      ref={ref}
      // Space above the heading, none for the first one. A group that follows
      // other rows needs the gap to read as a new block; the first group in a
      // panel or under a section header already has one above it, and adding a
      // second leaves the header floating away from what it names.
      className={cn('mdt-flex mdt-flex-col mdt-gap-0.5 mdt-pt-4 first:mdt-pt-0', className)}
      {...props}
    >
      {label !== undefined && (
        <div className="mdt-flex mdt-h-6 mdt-items-center mdt-px-2 mdt-text-xs mdt-font-medium mdt-text-muted-foreground/70">
          {label}
        </div>
      )}
      {children}
    </div>
  )
);
LeftNavGroup.displayName = 'LeftNavGroup';

/**
 * One setting that has pages of its own, folding open in place.
 *
 * **This is the collapsing thing, not the group heading.** The distinction is
 * the whole point: a group heading labels a run of unrelated settings, while
 * this is one setting whose pages belong to it. Folding the first hides the
 * map; folding the second hides detail you asked for.
 *
 * **A chevron that turns, not one that points sideways.** `LeftNavItem`'s
 * trailing `chevron-right` means "this opens a second level and the panel will
 * move". This one points down and rotates, which everywhere else in software
 * means "this opens underneath". Two different promises need two different
 * glyphs, or the panel becomes a guessing game.
 */
const LeftNavExpandable = forwardRef<HTMLDivElement, LeftNavExpandableProps>(
  (
    { className, icon, label, defaultOpen = false, open, onOpenChange, children, ...props },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = useState(defaultOpen);
    const isOpen = open ?? uncontrolled;

    const toggle = () => {
      const next = !isOpen;
      if (open === undefined) setUncontrolled(next);
      onOpenChange?.(next);
    };

    return (
      <div ref={ref} className={cn('mdt-flex mdt-flex-col mdt-gap-0.5', className)} {...props}>
        <button
          type="button"
          onClick={toggle}
          aria-expanded={isOpen}
          className={cn(leftNavItemVariants({ active: false, disabled: false }))}
        >
          {icon !== undefined && (
            <span className="mdt-flex mdt-h-4 mdt-w-4 mdt-shrink-0 mdt-items-center mdt-justify-center mdt-text-muted-foreground">
              {icon}
            </span>
          )}
          <span className="mdt-flex-1 mdt-truncate mdt-text-left">{label}</span>
          <Icon
            name="chevron-down"
            size="sm"
            aria-hidden
            className={cn(
              // Down when shut, up when open - never sideways. Rotating it to
              // -90 when shut was the first attempt and it made the collapsed
              // state identical to `hasChildren`'s chevron-right, so the two
              // promises this component is careful to separate looked the same
              // at rest. Caught in a screenshot; the tests were green.
              'mdt-text-muted-foreground mdt-transition-transform',
              isOpen && '-mdt-rotate-180'
            )}
          />
        </button>

        {isOpen && (
          // A guide line down the children, because once a thing can be open
          // you need to see where it ends. Indented to sit under the label
          // rather than under the icon, so the nesting reads as belonging to
          // the words rather than to the glyph.
          <div className="mdt-ml-4 mdt-flex mdt-flex-col mdt-gap-0.5 mdt-border-l mdt-border-border mdt-pl-2">
            {children}
          </div>
        )}
      </div>
    );
  }
);
LeftNavExpandable.displayName = 'LeftNavExpandable';

/**
 * One row: a page to open, or a section to descend into.
 *
 * **An anchor with an `href`, a button without** - the same rule
 * `PaginationLink` follows, and for the same reason. A settings page is a real
 * address; a section that opens a second level in place is not.
 *
 * `Item` was the obvious thing to reuse and does not fit: it renders a `div`
 * unless clickable, has no `href`, and cannot express `aria-current`. A nav row
 * that cannot say "you are here" to a screen reader is not a nav row. Logged in
 * COMPONENT-GAP.md rather than worked around.
 */
const LeftNavItem = forwardRef<HTMLAnchorElement | HTMLButtonElement, LeftNavItemProps>(
  (
    {
      className,
      href,
      icon,
      active = false,
      hasChildren = false,
      meta,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const shared = {
      className: cn(leftNavItemVariants({ active, disabled }), className),
      'aria-current': active ? ('page' as const) : undefined,
    };

    const content = (
      <>
        {active && (
          <span
            aria-hidden
            className="mdt-absolute mdt-bottom-1.5 mdt-left-0 mdt-top-1.5 mdt-w-0.5 mdt-rounded-full mdt-bg-foreground"
          />
        )}
        {icon !== undefined && (
          <span
            className={cn(
              'mdt-flex mdt-h-4 mdt-w-4 mdt-shrink-0 mdt-items-center mdt-justify-center',
              // The glyph sits back from the label until the row matters, which
              // is what stops forty icons reading as forty things to look at.
              active ? 'mdt-text-foreground' : 'mdt-text-muted-foreground'
            )}
          >
            {icon}
          </span>
        )}
        <span className="mdt-flex-1 mdt-truncate mdt-text-left">{children}</span>
        {meta}
        {hasChildren && (
          <Icon name="chevron-right" size="sm" aria-hidden className="mdt-text-muted-foreground" />
        )}
      </>
    );

    if (href === undefined) {
      return (
        <button
          ref={ref as Ref<HTMLButtonElement>}
          type="button"
          disabled={disabled}
          {...shared}
          {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {content}
        </button>
      );
    }

    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        {...shared}
        {...props}
      >
        {content}
      </a>
    );
  }
);
LeftNavItem.displayName = 'LeftNavItem';

/** Pinned to the bottom edge. An account row, a plan, an upgrade. */
const LeftNavFooter = forwardRef<HTMLDivElement, LeftNavFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mdt-mt-auto mdt-shrink-0 mdt-border-t mdt-border-border mdt-p-2', className)}
      {...props}
    />
  )
);
LeftNavFooter.displayName = 'LeftNavFooter';

export {
  LeftNav,
  LeftNavExit,
  LeftNavSearch,
  LeftNavBody,
  LeftNavSection,
  LeftNavGroup,
  LeftNavExpandable,
  LeftNavItem,
  LeftNavFooter,
};
