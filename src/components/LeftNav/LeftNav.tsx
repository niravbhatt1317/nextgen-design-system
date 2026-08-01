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
 * Item states, and why they are grey rather than blue.
 *
 * The selected page is a grey pill, not a coloured one. In a settings menu of
 * forty rows the accent colour is needed for the thing you are being asked to
 * notice - a Beta tag, a count, an upgrade - and spending it on "you are here"
 * leaves nothing for any of them. Every reference that holds up at forty rows
 * does the same: Vercel, Linear, Grok. The ones that colour the selection are
 * the ones with eight rows.
 */
export const leftNavItemVariants = cva(
  [
    'mdt-group/nav-item mdt-flex mdt-w-full mdt-items-center mdt-gap-2',
    ROW,
    'mdt-text-sm mdt-text-foreground mdt-transition-colors',
    FOCUS,
  ],
  {
    variants: {
      active: {
        true: 'mdt-bg-secondary mdt-font-medium',
        false: 'hover:mdt-bg-secondary/60',
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
        'mdt-border-r mdt-border-border mdt-bg-background',
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
 * Above the search and pinned there. It is the only control in the panel that
 * does not change with the level, and it reads as chrome rather than as a nav
 * item: no pill, muted text, a long arrow.
 *
 * **It names where it goes.** "Back to app" is a destination; a bare "Back"
 * would be indistinguishable from the section back further down, which is the
 * exact confusion this arrangement exists to prevent.
 */
const LeftNavExit = forwardRef<HTMLAnchorElement | HTMLButtonElement, LeftNavExitProps>(
  ({ className, href, children = 'Back to app', ...props }, ref) => {
    const shared = {
      className: cn(
        // Its own margin rather than a wrapper: the exit is a fixed part of the
        // anatomy, and a caller who has to remember to pad it will forget.
        'mdt-mx-2 mdt-mt-2 mdt-flex mdt-items-center mdt-gap-1.5',
        ROW,
        'mdt-text-sm mdt-text-muted-foreground mdt-transition-colors',
        'hover:mdt-text-foreground',
        FOCUS,
        className
      ),
    };
    const content = (
      <>
        {/*
          An arrow, not a chevron. The section header one row down uses a
          chevron, and the difference between "leave" and "up one" has to
          survive being glanced at.
        */}
        <Icon name="arrow-left" size="sm" aria-hidden />
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
    <div className="mdt-px-2 mdt-pb-2">
      <Input
        ref={ref}
        type="search"
        size="sm"
        aria-label={label}
        placeholder={label}
        className={cn('mdt-w-full', className)}
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
    <div
      ref={ref}
      data-level={level}
      className={cn('mdt-flex-1 mdt-overflow-y-auto mdt-overflow-x-hidden mdt-px-2', className)}
      {...props}
    >
      <div className="mdt-flex mdt-flex-col mdt-gap-0.5 mdt-pb-2">{children}</div>
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
      <div className="mdt-mb-1 mdt-flex mdt-items-center mdt-gap-1">
        <button
          type="button"
          aria-label={backLabel}
          onClick={onBack}
          className={cn(
            'mdt-flex mdt-h-6 mdt-w-6 mdt-shrink-0 mdt-items-center mdt-justify-center',
            'mdt-rounded-md mdt-text-muted-foreground mdt-transition-colors',
            'hover:mdt-bg-secondary hover:mdt-text-foreground',
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
        <h2 className="mdt-truncate mdt-text-sm mdt-font-medium mdt-text-foreground">{title}</h2>
      </div>
      {children}
    </div>
  )
);
LeftNavSection.displayName = 'LeftNavSection';

/**
 * A labelled block of items, optionally one that folds away.
 *
 * **A plain heading by default.** A control that hides four rows costs a click
 * and saves nothing; `collapsible` is for a group long enough that scrolling
 * past it is the problem.
 *
 * The children of a collapsible group carry a guide line down their left edge,
 * because once a group can be open or shut you need to see where it ends.
 */
const LeftNavGroup = forwardRef<HTMLDivElement, LeftNavGroupProps>(
  (
    {
      className,
      label,
      collapsible = false,
      defaultOpen = true,
      open,
      onOpenChange,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = useState(defaultOpen);
    const isOpen = open ?? uncontrolled;

    const toggle = () => {
      const next = !isOpen;
      if (open === undefined) setUncontrolled(next);
      onOpenChange?.(next);
    };

    const heading = 'mdt-px-2 mdt-text-xs mdt-font-medium mdt-text-muted-foreground';

    return (
      <div
        ref={ref}
        className={cn('mdt-flex mdt-flex-col mdt-gap-0.5 mdt-pt-3', className)}
        {...props}
      >
        {label !== undefined &&
          (collapsible ? (
            <button
              type="button"
              onClick={toggle}
              aria-expanded={isOpen}
              className={cn(
                'mdt-flex mdt-h-6 mdt-w-full mdt-items-center mdt-justify-between mdt-gap-2',
                'mdt-rounded-md mdt-transition-colors hover:mdt-text-foreground',
                heading,
                FOCUS
              )}
            >
              <span className="mdt-truncate">{label}</span>
              <Icon
                name="chevron-down"
                size="sm"
                aria-hidden
                className={cn('mdt-transition-transform', !isOpen && '-mdt-rotate-90')}
              />
            </button>
          ) : (
            <div className={cn('mdt-flex mdt-h-6 mdt-items-center', heading)}>{label}</div>
          ))}

        {(!collapsible || isOpen) && (
          <div
            className={cn(
              'mdt-flex mdt-flex-col mdt-gap-0.5',
              // The guide line only earns its place once the group can close -
              // on a static heading it is decoration on every group in the panel.
              collapsible && 'mdt-ml-3 mdt-border-l mdt-border-border mdt-pl-2'
            )}
          >
            {children}
          </div>
        )}
      </div>
    );
  }
);
LeftNavGroup.displayName = 'LeftNavGroup';

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
  LeftNavItem,
  LeftNavFooter,
};
