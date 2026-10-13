import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { IconName } from '../Icon';

export interface EmptyStateProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  /**
   * The glyph in the tile: an icon name from the library's set, or a node of
   * your own. Defaults to `inbox`, as the console's block did.
   *
   * A node is drawn at the tile's 18px whatever size it asks for, so a glyph
   * from another set lands the same as a named one.
   */
  icon?: IconName | Exclude<ReactNode, string>;

  /** The headline - what is empty. No full stop (Pranjal, 2026-10-11). */
  title: ReactNode;

  /**
   * One muted line under the title: why it is empty, or what fills it.
   * Optional - "No attributes tracked yet" needs nothing more.
   */
  description?: ReactNode;

  /**
   * One control under the text, usually a `Button` - "Clear search",
   * "All organizations". The console's pages pass an outline or secondary
   * button at `sm`; the state does not pick it for them.
   */
  action?: ReactNode;
}
