import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * How bad a problem is - the console's three levels (Health, Needs attention):
 * `danger` reads "Critical", `warning` "Warning", `info` "Notice".
 */
export type ProblemSeverity = 'danger' | 'warning' | 'info';

export interface ProblemRowProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'title' | 'children' | 'type'
> {
  /**
   * How bad it is. Picks the round tile's tint and glyph: danger a rose
   * octagon, warning an amber triangle, info a blue info mark - the same three
   * glyphs the banners use, one per level.
   */
  severity: ProblemSeverity;

  /**
   * What the problem is, as it is said: "125 hosts with a crashing module".
   * A plain string that starts with a number has that number drawn in
   * semibold, and the whole of it shows on hover when it is cut.
   */
  title: ReactNode;

  /**
   * The one line under it - where it is, or the detail behind it. Always one
   * line: cut with an ellipsis, the whole of it on hover when it is a string.
   */
  detail?: ReactNode | undefined;

  /**
   * Another glyph for the tile, in place of the level's own. Only where the
   * problem has its own icon platform-wide (Pranjal, 2026-10-26: "when its
   * better to use general icon instead of randomly assigning").
   */
  icon?: ReactNode | undefined;

  /** The level's word, said by the tile and on its hover. Defaults to Critical, Warning or Notice. */
  severityLabel?: string | undefined;

  /**
   * The quiet word on the right that shows while the row is hovered or focused.
   * @default 'View'
   */
  viewLabel?: string | undefined;
}

/** The column the rows stack in, a hairline between each. */
export type ProblemListProps = ComponentPropsWithoutRef<'div'>;
