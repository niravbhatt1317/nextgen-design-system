import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface LeftNavProps extends ComponentPropsWithoutRef<'nav'> {
  /**
   * The accessible name. Two navigations on one page must be told apart.
   *
   * @default 'Settings'
   */
  label?: string;
}

export interface LeftNavExitProps extends Omit<ComponentPropsWithoutRef<'a'>, 'href'> {
  /**
   * Where it goes. An anchor with one, a button without.
   *
   * The same rule `PaginationLink` follows: leaving settings is usually a real
   * address worth opening in a new tab, and sometimes it is a router call.
   */
  href?: string;

  /** What it says. Names the destination, never just "Back". @default 'Back to app' */
  children?: ReactNode;
}

export interface LeftNavSearchProps extends Omit<
  ComponentPropsWithoutRef<'input'>,
  'type' | 'size'
> {
  /** The accessible name and the placeholder. @default 'Search' */
  label?: string;
}

export interface LeftNavBodyProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Which level is showing. Published as `data-level`, and nothing else.
   *
   * The component does not animate the move. A product that wants it to can
   * hang a transition off `data-level`, where the mechanism is visible.
   */
  level?: 1 | 2;
}

export interface LeftNavSectionProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  /** The section you are inside. Answers "where am I", not "how do I leave". */
  title: ReactNode;

  /** Back to the root list. */
  onBack: () => void;

  /** The back control's accessible name. @default 'Back to all settings' */
  backLabel?: string;
}

export interface LeftNavGroupProps extends ComponentPropsWithoutRef<'div'> {
  /** The heading above the group. Omit it for an unlabelled block. */
  label?: ReactNode;

  /**
   * Lets the group fold away.
   *
   * For a handful of items a plain heading is better: a control that hides four
   * things costs a click and saves nothing. Reach for this when a group is long
   * enough that scrolling past it is the problem.
   *
   * @default false
   */
  collapsible?: boolean;

  /** Whether a collapsible group starts open. @default true */
  defaultOpen?: boolean;

  /** Controlled open state. Pass `onOpenChange` with it. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface LeftNavItemProps extends Omit<ComponentPropsWithoutRef<'a'>, 'href'> {
  /** Where it goes. An anchor with one, a button without. */
  href?: string;

  /** The glyph. Always an `<Icon>`; never an inline `<svg>`. */
  icon?: ReactNode;

  /**
   * Whether this is the page being shown.
   *
   * Renders `aria-current="page"`, which is the part a screen reader hears. The
   * grey pill is the part everyone else sees, and one without the other leaves
   * somebody out.
   */
  active?: boolean;

  /**
   * Marks the item as opening a second level.
   *
   * Adds the trailing chevron, and says so to a screen reader: this one does
   * not go to a page, it opens a list. Without that they are indistinguishable
   * until you press one.
   */
  hasChildren?: boolean;

  /** A count or a status, on the trailing edge. A `Badge`, usually. */
  meta?: ReactNode;

  /** Dims it and stops it responding. */
  disabled?: boolean;
}

export interface LeftNavFooterProps extends ComponentPropsWithoutRef<'div'> {
  /** Nothing of its own - a slot pinned to the bottom edge. */
  children?: ReactNode;
}
