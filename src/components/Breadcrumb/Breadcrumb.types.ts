import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Where the crumb sits, which settles its type and what goes before it.
 *
 * `page` is the header band's crumb: 12/500 in the faint ink (#8FA0BD), the place you
 * are on in the foreground, the ancestors clickable when they are given
 * somewhere to go.
 *
 * `drawer` replaces a drawer's title while a page is open inside it. It wears
 * the title's own 14 on a 20 line: the earlier steps at 400 in the faint ink,
 * the step at 600 in the soft ink, every visible gap 12. **It is a real
 * breadcrumb with no back button** (Pranjal, 2026-10-26): every step before the
 * last that is given an `href` or an `onSelect` is a way back - underlined in
 * the foreground under the pointer, named "Back to <step>". The last step is
 * where you are and is never followed.
 */
export type BreadcrumbVariant = 'page' | 'drawer';

export interface BreadcrumbItem {
  /** What the place is called. Stays on one line and is never shortened, as the console has it. */
  label: ReactNode;

  /** A real address. Renders an anchor. In the drawer form only an earlier step follows it. */
  href?: string | undefined;

  /**
   * Something to do rather than somewhere to go - a router push, a view
   * switch, a drawer page going back. Renders a button. In the drawer form
   * only an earlier step does it, as a way back.
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
   * Drawer form only: what the step before the last does when it was given no
   * `href` or `onSelect` of its own - the way back one page. It takes the
   * caller's path, so a dirty draft still gets its discard question first.
   * There is no separate back button (Pranjal, 2026-10-26); this is the
   * two-step crumb's short form, `{ parent, step, onBack }`.
   */
  onBack?: (() => void) | undefined;

  /**
   * Drawer form only: the accessible name of the step before the last, as the
   * way back.
   * @default "Back to <that step>"
   */
  backLabel?: string | undefined;

  /** @default 'Breadcrumb' */
  'aria-label'?: string | undefined;

  className?: string | undefined;
}

export type BreadcrumbProps = BreadcrumbOwnProps &
  Omit<ComponentPropsWithoutRef<'nav'>, 'className' | 'aria-label' | 'children'>;
