import { cva } from 'class-variance-authority';
import { forwardRef, useState } from 'react';
import type { ButtonHTMLAttributes, Ref } from 'react';
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

const FOCUS =
  'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-1 focus-visible:mdt-ring-offset-background';

/**
 * How the row you are on is marked.
 *
 * **A tinted pill and a bar down its left edge.** The bar is the part that
 * survives a glance: a fill alone has to be strong enough to spot from the
 * corner of your eye, and at that strength forty rows of menu turn into a
 * chessboard. A 2px rule at the leading edge is unmistakable at any tint,
 * which is why it lets the fill stay quiet.
 *
 * It is drawn as a real element rather than a `before:` pseudo-class, so it can
 * be seen in the DOM and tested. Both use `accent`, the pair the system already
 * has for a selected surface.
 */
export const leftNavItemVariants = cva(
  [
    'mdt-group/nav-item mdt-relative mdt-flex mdt-w-full mdt-items-center mdt-gap-2',
    ROW,
    'mdt-text-sm mdt-text-foreground mdt-transition-colors',
    FOCUS,
  ],
  {
    variants: {
      active: {
        true: 'mdt-bg-accent mdt-font-medium mdt-text-accent-foreground',
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
  ({ className, label = 'Settings', ...props }, ref) => (
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
  )
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
    const shared = {
      className: cn(
        // Its own padding rather than a wrapper: the exit is a fixed part of the
        // anatomy, and a caller who has to remember to pad it will forget.
        'mdt-group/exit mdt-flex mdt-items-center mdt-gap-2 mdt-px-3 mdt-pb-3 mdt-pt-3',
        'mdt-text-sm mdt-font-medium mdt-text-foreground',
        'focus-visible:mdt-outline-none',
        className
      ),
    };
    const content = (
      <>
        <span
          className={cn(
            'mdt-flex mdt-h-8 mdt-w-8 mdt-shrink-0 mdt-items-center mdt-justify-center',
            // The one raised object on the panel. `background` rather than a
            // literal white, so it is still the raised surface in dark mode
            // instead of a hole punched in the page.
            'mdt-rounded-full mdt-border mdt-border-border mdt-bg-background mdt-shadow-sm',
            'mdt-transition-shadow group-hover/exit:mdt-shadow-md',
            'group-focus-visible/exit:mdt-ring-2 group-focus-visible/exit:mdt-ring-ring'
          )}
        >
          <Icon name="home" size="sm" aria-hidden />
        </span>
        <span className="mdt-truncate">{children}</span>
      </>
    );

    if (href === undefined) {
      return (
        <button
          ref={ref as Ref<HTMLButtonElement>}
          type="button"
          {...shared}
          {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {content}
        </button>
      );
    }

    return (
      <a ref={ref as Ref<HTMLAnchorElement>} href={href} {...shared} {...props}>
        {content}
      </a>
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
  ({ className, label = 'Search', ...props }, ref) => (
    <div className="mdt-px-3 mdt-pb-4">
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
  )
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
  ({ className, level = 1, children, ...props }, ref) => (
    // Relative, so the two fades can sit over the scrolling rows.
    <div className="mdt-relative mdt-flex-1 mdt-overflow-hidden">
      <div
        ref={ref}
        data-level={level}
        className={cn('mdt-h-full mdt-overflow-y-auto mdt-overflow-x-hidden mdt-px-3', className)}
        {...props}
      >
        <div className="mdt-flex mdt-flex-col mdt-gap-0.5 mdt-py-1">{children}</div>
      </div>

      {/*
        Rows fade out rather than being sliced off.
        
        A hard edge under the search reads as a mistake - half a row of text
        cut through the middle looks like something failed to render. A fade
        says the list continues, which is the true thing and the calmer one.
        
        Both strips are the panel's own colour going transparent, and both are
        `pointer-events-none` so they cannot swallow a click on the row beneath.
      */}
      <div
        aria-hidden
        className="mdt-pointer-events-none mdt-absolute mdt-inset-x-0 mdt-top-0 mdt-h-4 mdt-bg-gradient-to-b mdt-from-neutral-10 mdt-to-transparent dark:mdt-from-neutral-150"
      />
      <div
        aria-hidden
        className="mdt-pointer-events-none mdt-absolute mdt-inset-x-0 mdt-bottom-0 mdt-h-6 mdt-bg-gradient-to-t mdt-from-neutral-10 mdt-to-transparent dark:mdt-from-neutral-150"
      />
    </div>
  )
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
  ({ className, title, onBack, backLabel = 'Back to all settings', children, ...props }, ref) => (
    <div ref={ref} className={cn('mdt-flex mdt-flex-col mdt-gap-0.5', className)} {...props}>
      <div className="mdt-mb-0.5 mdt-flex mdt-items-center mdt-gap-1">
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
      </div>
      {/*
        Wrapped, so `first:pt-0` on the first group actually fires. Without it
        the header is the first child, the first group is the second, and it
        keeps its 16px - which put 22px between a heading and the rows it names.
      */}
      <div className="mdt-flex mdt-flex-col mdt-gap-0.5">{children}</div>
    </div>
  )
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
        <div className="mdt-flex mdt-h-6 mdt-items-center mdt-px-2 mdt-text-xs mdt-font-medium mdt-text-muted-foreground">
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
            className="mdt-absolute mdt-bottom-1.5 mdt-left-0 mdt-top-1.5 mdt-w-0.5 mdt-rounded-full mdt-bg-accent-foreground"
          />
        )}
        {icon !== undefined && (
          <span
            className={cn(
              'mdt-flex mdt-h-4 mdt-w-4 mdt-shrink-0 mdt-items-center mdt-justify-center',
              // The glyph sits back from the label until the row matters, which
              // is what stops forty icons reading as forty things to look at.
              active ? 'mdt-text-accent-foreground' : 'mdt-text-muted-foreground'
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
