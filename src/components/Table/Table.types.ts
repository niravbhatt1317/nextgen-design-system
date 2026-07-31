import type { ComponentPropsWithoutRef } from 'react';

/**
 * How much vertical room a row takes.
 *
 * Named after Nord and Ant rather than invented here, so anyone who has used
 * another design system already knows what to expect. `default` is exactly the
 * spacing this table had before density existed, so nothing moves unless you
 * ask it to.
 */
export type TableDensity = 'condensed' | 'default' | 'relaxed';

/**
 * Which edge the content of a cell sits against.
 *
 * The rule is that alignment follows the **data type**, not preference: text
 * left, numbers right so digits line up by place value and magnitudes can be
 * compared at a glance. That single rule fixes more "messy table" complaints
 * than any restyle.
 */
export type TableAlign = 'left' | 'center' | 'right';

/**
 * The sort state of a column.
 *
 * `null` means this column is sortable but is not the one currently sorted.
 * Showing an arrow with no state is the commonest sort bug there is, so a
 * column that is not sorted gets a neutral affordance rather than an arrow
 * pointing somewhere arbitrary.
 */
export type TableSortOrder = 'ascend' | 'descend' | null;

/**
 * What `Table` hands down to the cells inside it.
 *
 * Density is set once on the table but has to be applied by every header and
 * data cell. Context is used rather than descendant selectors on purpose: a
 * rule like `[&_td]:mdt-p-2` outranks a cell's own `mdt-p-4`, so per-cell
 * overrides would silently lose.
 */
export interface TableContextValue {
  density: TableDensity;
  striped: boolean;
  stickyHeader: boolean;
}

/**
 * Which part of the table a row or cell is in.
 *
 * Striping applies to body rows only - a striped header or footer reads as a
 * mistake - and the sticky treatment applies to header cells only.
 */
export type TableSection = 'header' | 'body' | 'footer';

/**
 * Props for the Table component
 */
export interface TableProps extends ComponentPropsWithoutRef<'table'> {
  /**
   * Row height and cell padding.
   * @default 'default'
   */
  density?: TableDensity;

  /**
   * Zebra-stripe alternate body rows.
   *
   * Off by default. A single subtle row divider carries the structure in most
   * tables, and stripes compete with the data for attention - but long, dense
   * tables genuinely read better with them.
   *
   * @default false
   */
  striped?: boolean;

  /**
   * Keep the header row visible while the body scrolls.
   *
   * Becomes necessary the moment a table is tall enough that the column titles
   * scroll out of view.
   *
   * @default false
   */
  stickyHeader?: boolean;
}

/**
 * Props for the TableHeader component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableHeaderProps extends ComponentPropsWithoutRef<'thead'> {}

/**
 * Props for the TableBody component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableBodyProps extends ComponentPropsWithoutRef<'tbody'> {}

/**
 * Props for the TableFooter component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableFooterProps extends ComponentPropsWithoutRef<'tfoot'> {}

/**
 * Props for the TableRow component
 */
export interface TableRowProps extends ComponentPropsWithoutRef<'tr'> {
  /**
   * Marks the row as selected.
   *
   * A selected row always wins over a stripe - the stripe is simply not applied
   * to it - so selection stays readable in a striped table.
   *
   * @default false
   */
  selected?: boolean;
}

/**
 * Props for the TableHead component
 */
export interface TableHeadProps extends ComponentPropsWithoutRef<'th'> {
  /**
   * Which edge the header label sits against. Match it to the cells below.
   * @default 'left'
   */
  align?: TableAlign;

  /**
   * Turns the header into a sort control - a real button, so it is reachable
   * by keyboard, with `aria-sort` set for screen readers.
   *
   * @default false
   */
  sortable?: boolean;

  /**
   * Which way this column is currently sorted, or `null` if it is sortable but
   * not the active column. Ignored unless `sortable` is set.
   *
   * @default null
   */
  sortOrder?: TableSortOrder;

  /** Called when the sort control is used. Ignored unless `sortable` is set. */
  onSort?: () => void;
}

/**
 * Props for the TableCell component
 */
export interface TableCellProps extends ComponentPropsWithoutRef<'td'> {
  /**
   * Which edge the content sits against. Numbers belong on the right.
   * @default 'left'
   */
  align?: TableAlign;
}

/**
 * Props for the TableCaption component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableCaptionProps extends ComponentPropsWithoutRef<'caption'> {}
