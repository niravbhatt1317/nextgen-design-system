import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Where the crumb sits, which settles its type and what goes before it.
 *
 * `page` is the header band's crumb: 12/500 in the faint ink (#8FA0BD), the place you
 * are on in the foreground, the ancestors clickable when they are given
 * somewhere to go.
 *
 * `drawer` replaces a drawer's title while a page is open inside it. It wears
 * the title's own 16: the parent at 400 in the faint ink, the step at 600 in
 * the foreground, and a back button with a nick before the trail. **Only the
 * back button navigates** - an item's `href` and `onSelect` are ignored here,
 * because the crumb's job in a drawer is to name where a page will return to,
 * and one way back is enough.
 */
export type BreadcrumbVariant = 'page' | 'drawer';

export interface BreadcrumbItem {
  /** What the place is called. Stays on one line and is never shortened, as the console has it. */
  label: ReactNode;

  /** A real address. Renders an anchor. Ignored by the drawer form. */
  href?: string | undefined;

  /**
   * Something to do rather than somewhere to go - a router push, a view
   * switch. Renders a button. Ignored by the drawer form.
   */
  onSelect?: (() => void) | undefined;

  /** Used as the React key. Falls back to the position. */
  id?: string | undefined;
}

export interface BreadcrumbOwnProps {
  /** The trail, root first. The last one is where you are now. */
  items: readonly BreadcrumbItem[];

  /** @default 'page' */
  variant?: BreadcrumbVariant | undefined;

  /**
   * Drawer form only: what the back button does. It takes the caller's path,
   * so a dirty draft still gets its discard question first. Without it no
   * button is drawn.
   */
  onBack?: (() => void) | undefined;

  /**
   * Drawer form only: the back button's accessible name.
   * @default "Back to <the first item>"
   */
  backLabel?: string | undefined;

  /** @default 'Breadcrumb' */
  'aria-label'?: string | undefined;

  className?: string | undefined;
}

export type BreadcrumbProps = BreadcrumbOwnProps &
  Omit<ComponentPropsWithoutRef<'nav'>, 'className' | 'aria-label' | 'children'>;
