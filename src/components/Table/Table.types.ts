import type { ComponentPropsWithoutRef } from 'react';

/**
 * How much vertical room a row takes.
 *
 * Four steps, following Airtable - the only reference that ships a row-height
 * picker to the user rather than fixing it at design time.
 *
 * `compact` exists because the scale was lopsided without it: the jump from
 * `short` to `default` was 24px while `default` to `relaxed` was 8px, so three
 * quarters of the range sat at one end.
 *
 * `default` is exactly the spacing this table had before density existed, so
 * nothing moves unless you ask it to.
 */
export type TableDensity = 'short' | 'compact' | 'default' | 'relaxed';

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
 * How the browser decides column widths.
 *
 * `auto` sizes columns to their content, which is what a table normally wants.
 * `fixed` sizes them from the first row alone - slower to look right, but the
 * widths then stop moving when rows appear or disappear. Collapsing a group in
 * an `auto` table visibly resizes every column, because the browser re-measures
 * from whatever is left.
 */
export type TableLayout = 'auto' | 'fixed';

/**
 * Which edge a row pins itself to while the table scrolls.
 */
export type TableStickyEdge = 'top' | 'bottom';

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
   * @default 'compact'
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
   * **Needs `maxHeight` to do anything.** Sticky positions against the nearest
   * scrolling ancestor, and without a height the table's own scroll container
   * never scrolls, so the header has nothing to stick within.
   *
   * @default false
   */
  stickyHeader?: boolean;

  /**
   * Caps the table's height and makes it scroll internally.
   *
   * This is what `stickyHeader` and a sticky summary row pin against. Accepts
   * anything CSS does - `'24rem'`, `'50vh'`, `400`.
   */
  maxHeight?: string | number;

  /**
   * Classes for the scroll container that wraps the table.
   *
   * This is the element that actually clips, so a border radius has to go here
   * rather than on a wrapper of your own - put it outside and the sticky header
   * paints straight over the rounded corner.
   *
   * @example containerClassName="mdt-rounded-md mdt-border"
   */
  containerClassName?: string;

  /**
   * How column widths are decided.
   *
   * Use `fixed` for a table whose rows appear and disappear - collapsing a group
   * in an `auto` table visibly resizes every column, because the browser
   * re-measures from the rows that are left.
   *
   * @default 'auto'
   */
  layout?: TableLayout;
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
 * How deeply a cell's content is indented, for rows nested under a parent.
 *
 * Capped at three levels on purpose. A table that needs a fourth is telling you
 * it wants to be a tree, and a tree is a different component.
 */
export type TableIndent = 0 | 1 | 2 | 3;

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

  /**
   * Pins the row to the top or bottom of the scroll area.
   *
   * Needs `maxHeight` on the table, same as `stickyHeader`. The row picks up a
   * shadow only while there is content scrolled underneath it, so a pinned
   * total sitting at the true end of the data stays flat.
   */
  sticky?: TableStickyEdge;

  /**
   * Marks the row as a total or subtotal.
   *
   * `TableFooter` already treats its rows this way, so this is for a summary
   * that sits somewhere else - at the top of the table, or at the foot of a
   * group rather than the foot of the table.
   *
   * @default false
   */
  summary?: boolean;
}

/**
 * Props for the TableGroupRow component
 */
export interface TableGroupRowProps extends ComponentPropsWithoutRef<'tr'> {
  /**
   * How many columns the group header spans. Set it to the number of columns in
   * the table, or the heading will not reach across it.
   */
  colSpan: number;

  /**
   * How many rows are in the group. Rendered after the label, quietly.
   */
  count?: number;

  /**
   * Whether the group is open. Leave `onToggle` off for a group that is always
   * open - the control is then not rendered at all, rather than rendered dead.
   *
   * @default true
   */
  expanded?: boolean;

  /** Called when the disclosure control is used. Omit for a static group. */
  onToggle?: () => void;

  /**
   * What a screen reader says for the disclosure control. Falls back to
   * "Toggle group" when the label is not plain text.
   */
  toggleLabel?: string;
}

/**
 * Props for the TableExpandTrigger component
 */
export interface TableExpandTriggerProps extends ComponentPropsWithoutRef<'button'> {
  /** Whether the row this controls is currently open. */
  expanded: boolean;

  /** Called when the control is used. */
  onToggle: () => void;

  /**
   * What a screen reader says. There is no visible text - it is a chevron.
   * @default 'Toggle row'
   */
  label?: string;
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

  /**
   * Indents the content, for a row nested under a parent. Use it on the first
   * cell only - indenting every cell shifts the whole row and breaks the
   * column alignment that makes a table readable.
   *
   * @default 0
   */
  indent?: TableIndent;
}

/**
 * Props for the TableCaption component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableCaptionProps extends ComponentPropsWithoutRef<'caption'> {}
