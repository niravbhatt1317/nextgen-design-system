import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { TableColumnsState } from './useTableColumns';
import type { TableFilter } from './useTableFilters';
import type { TableView } from './useSavedViews';
import type { SortRule } from './useTableSort';

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
   * Whether the row responds to hover.
   *
   * Body rows offer hover feedback by default, because most of them are
   * targets. A row that is not a record should say so: an expanded detail
   * panel, a spacer, a row holding a chart. Hover feedback on one of those
   * says "click me" about something that does nothing.
   *
   * A `summary` row already opts out on its own. This is the same thing for
   * every other case, and it exists because the alternative - a
   * `hover:bg-transparent` override at the call site - relies on knowing what
   * the row set in the first place.
   *
   * Leave it unset for the default: on for body rows, off everywhere else.
   */
  interactive?: boolean;

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

  /**
   * This column's place in a multi-column sort, 1-based.
   *
   * Shown as a small number beside the arrow. Leave it out when only one column
   * ever sorts - a lone "1" is noise. With two or more it is not optional: an
   * arrow on three columns says all three are sorted and nothing about which
   * one wins, and people reasonably assume the leftmost does.
   */
  sortIndex?: number;

  /** Called when the sort control is used. Ignored unless `sortable` is set. */
  onSort?: () => void;

  /**
   * Adds a drag handle on the column's trailing edge.
   *
   * Resizing is a contract, not an implementation: the handle and its keyboard
   * behaviour are provided here, the width itself stays yours. `useColumnWidths`
   * holds the arithmetic if you want it.
   *
   * **Needs `layout="fixed"` on the table.** Under the default `auto` layout the
   * browser re-derives column widths from content and will fight whatever you
   * set.
   *
   * @default false
   */
  resizable?: boolean;

  /**
   * The column's current width in pixels. Applied as an inline width.
   *
   * **Leave one column unsized.** A fixed-layout table still fills its
   * container, and if every column carries a width the browser scales all of
   * them to make up the difference - a column set to 200 paints at 346, and the
   * handle no longer tracks the cursor. Give the last column no `width` and it
   * absorbs the slack instead, so every other column is exactly the pixels you
   * asked for.
   */
  width?: number;

  /** Called while the handle is dragged or nudged, with the new width. */
  onResize?: (width: number) => void;

  /**
   * How narrow the column may get. A column that can reach zero cannot be
   * grabbed again.
   * @default 64
   */
  minWidth?: number;

  /**
   * How wide the column may get.
   * @default 720
   */
  maxWidth?: number;

  /**
   * What a screen reader calls the handle. There is always more than one
   * resizer in a table, so each needs its own name.
   * Falls back to "Resize <label>" when the header is plain text.
   */
  resizeLabel?: string;

  /**
   * Columns that can be added at this column's trailing boundary.
   *
   * Passing these puts a `+` above the table on that boundary, on the same
   * line you drag to resize. One line, both jobs - two controls on the same
   * pixels cannot be told apart.
   */
  insertColumns?: { key: string; label: string }[];

  /** Keys to lift into a Suggested group in the insert picker. */
  insertSuggested?: string[];

  /** Called with the chosen column's key. Omit it and no `+` appears. */
  onInsert?: (key: string) => void;

  /** What a screen reader calls the `+`. Names the position, not the action. */
  insertLabel?: string;

  /**
   * Which column this cell belongs to.
   *
   * Emitted as `data-column-key`. Reordering measures the header row to work
   * out where a dragged column would land, and it needs to know which cell is
   * which - position alone is not enough once things start moving.
   */
  columnKey?: string;

  /**
   * Pins this column to the left edge while the table scrolls sideways.
   *
   * `true` pins it as the first frozen column. Pass an index to pin more than
   * one - `frozen={1}` is the second, and it sits at the measured width of the
   * first rather than at a width you have to work out yourself.
   *
   * Put it on the same column in every row, header included, or the column will
   * pin in some rows and not others. Needs the table to actually scroll
   * horizontally - a table narrower than its container has nothing to pin
   * against.
   *
   * Like the row's `sticky`, the edge only asserts itself once something has
   * slid underneath: at rest a frozen column looks like any other.
   *
   * @default false
   */
  frozen?: boolean | number;
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

  /**
   * Which column this cell belongs to.
   *
   * Emitted as `data-column-key`. Reordering measures the header row to work
   * out where a dragged column would land, and it needs to know which cell is
   * which - position alone is not enough once things start moving.
   */
  columnKey?: string;

  /**
   * Pins this column to the left edge while the table scrolls sideways.
   *
   * `true` pins it as the first frozen column. Pass an index to pin more than
   * one - `frozen={1}` is the second, and it sits at the measured width of the
   * first rather than at a width you have to work out yourself.
   *
   * Put it on the same column in every row, header included, or the column will
   * pin in some rows and not others. Needs the table to actually scroll
   * horizontally - a table narrower than its container has nothing to pin
   * against.
   *
   * Like the row's `sticky`, the edge only asserts itself once something has
   * slid underneath: at rest a frozen column looks like any other.
   *
   * @default false
   */
  frozen?: boolean | number;
}

/**
 * Props for the TableCaption component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableCaptionProps extends ComponentPropsWithoutRef<'caption'> {}

/**
 * Props for TableColumnMenu - the controls belonging to one column.
 */
export interface TableColumnMenuProps {
  /** The column's name. Used as the trigger's label and its accessible name. */
  label: string;

  /** Adds a Filter item. Omit it and no Filter item appears. */
  onFilter?: () => void;

  /** Adds a Group item. */
  onGroup?: () => void;

  /** Adds a Sort item. */
  onSort?: () => void;

  /** Whether this column is currently pinned. Switches the item's wording. */
  frozen?: boolean;

  /**
   * Whether pinning is available here at all.
   *
   * False hides the item rather than disabling it. Past the freeze limit
   * "pin this column" is not a thing that could happen - there would be
   * unpinned columns to its left - so offering it greyed out explains nothing.
   *
   * @default false
   */
  canFreeze?: boolean;

  /** Called when Freeze or Unfreeze is chosen. */
  onToggleFreeze?: () => void;

  /** Adds a Move to start item. */
  onMoveToStart?: () => void;

  /** Adds a Move to end item. */
  onMoveToEnd?: () => void;

  /** Adds a Hide this column item. */
  onHide?: () => void;

  /**
   * Content above the items.
   *
   * Where the active sort stack goes once multi-column sorting lands: a
   * statement of what is already true, which is why it sits above the list of
   * things you can do rather than inside it.
   */
  header?: ReactNode;

  /** Which edge of the trigger the menu lines up with. @default 'start' */
  align?: 'start' | 'center' | 'end';

  /** Extra classes for the trigger. */
  className?: string;

  /** Trigger content, when the column header is more than its name. */
  children?: ReactNode;
}

/**
 * Props for TableColumnBoundary - the line between two columns.
 */
export interface TableColumnBoundaryProps {
  /** Whether the line can be dragged to resize the column on its left. */
  resizable?: boolean;

  /** The column's current width in pixels. Reported to a screen reader. */
  width?: number;

  /** Called while the line is dragged or nudged. */
  onResize?: (width: number) => void;

  /** How narrow the column may get. @default 64 */
  minWidth?: number;

  /** How wide the column may get. @default 720 */
  maxWidth?: number;

  /** What a screen reader calls the line when it resizes. */
  resizeLabel?: string;

  /**
   * The columns available to add here. Usually `useTableColumns().hidden`.
   *
   * Empty means no `+` appears. An insertion point that opens an empty list
   * teaches people it is broken.
   */
  columns?: { key: string; label: string }[];

  /** Keys to lift into a Suggested group above the full list. */
  suggested?: string[];

  /** Called with the chosen column's key. Omit it and no `+` appears. */
  onInsert?: (key: string) => void;

  /**
   * What a screen reader calls the `+`.
   *
   * A table has one at every boundary, so it has to name the position.
   */
  insertLabel?: string;

  /** Extra classes for the line. */
  className?: string;
}

/**
 * Props for TableToolbar - the controls that act on the whole table.
 */
export interface TableToolbarProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * What a screen reader calls the group.
   *
   * A page can hold more than one table, and "Table controls" three times over
   * identifies none of them.
   *
   * @default 'Table controls'
   */
  label?: string;
}

/** Props for TableToolbarActions - the trailing group of a toolbar. */
export type TableToolbarActionsProps = ComponentPropsWithoutRef<'div'>;

/**
 * Props for TableSortMenu.
 *
 * The rules come in and the changes go out: like everything else in Table this
 * renders a sort, it does not own one. `useTableSort` is the other half.
 */
export interface TableSortMenuProps {
  /** Every column that can be sorted, in the order to list them. */
  columns: { key: string; label: string }[];

  /** The active sort, most significant first. */
  rules: { column: string; direction: 'ascend' | 'descend' }[];

  /** Reverses one column's direction. */
  onToggleDirection: (column: string) => void;

  /** Stops sorting by one column. */
  onRemove: (column: string) => void;

  /** Moves a rule within the stack, changing which sort wins. */
  onMove: (from: number, to: number) => void;

  /** Drops every rule. */
  onClear: () => void;

  /** Starts sorting by a column that is not in the stack yet. */
  onSortBy: (column: string) => void;

  /** What a screen reader calls the trigger. @default 'Sort' */
  label?: string;

  /** Extra classes for the trigger. */
  className?: string;
}

/**
 * Props for TableViewMenu - grouping and which columns exist.
 */
export interface TableViewMenuProps {
  /** Every column, in display order, with whether it is currently shown. */
  columns: { key: string; label: string; visible: boolean; locked?: boolean }[];

  /** The column the table is grouped by, or `null`. @default null */
  groupBy?: string | null;

  /** Called with the chosen column, or `null` for no grouping. */
  onGroupBy: (key: string | null) => void;

  /** Called with the column whose visibility was toggled. */
  onToggleColumn: (key: string) => void;

  /** Adds a Show all control. Omit it and none appears. */
  onShowAll?: () => void;

  /** Adds a Hide all control. */
  onHideAll?: () => void;

  /** What a screen reader calls the trigger. @default 'View settings' */
  label?: string;

  /** Extra classes for the trigger. */
  className?: string;
}

/**
 * Props for TableBulkBar - what you can do with the rows you have selected.
 */
export interface TableBulkBarProps extends ComponentPropsWithoutRef<'div'> {
  /** How many rows are selected. At zero the bar renders nothing. */
  count: number;

  /** Called to drop the selection. Omit it and no Clear control appears. */
  onClear?: () => void;

  /**
   * What the bar says instead of "3 selected".
   *
   * For when rows are not rows - "3 tickets", "3 files". The default counts
   * without naming, which is right when the noun is obvious from the table.
   */
  label?: string;

  /** The actions, usually `TableBulkAction`. */
  children?: ReactNode;
}

/** Props for TableBulkAction - one action on the bulk bar. */
export interface TableBulkActionProps extends ComponentPropsWithoutRef<'button'> {
  /** The glyph, before the label. */
  icon?: ReactNode;
}

/**
 * Props for TableFilterMenu - choose an attribute, then choose its values.
 */
export interface TableFilterMenuProps {
  /** What can be filtered, and the values each one offers. */
  attributes: { key: string; label: string; values: string[] }[];

  /** The values currently chosen for an attribute. */
  valuesFor: (attribute: string) => string[];

  /** Called with the attribute and the value that was ticked or unticked. */
  onToggleValue: (attribute: string, value: string) => void;

  /** Adds a Clear all control. Omit it and none appears. */
  onClear?: () => void;

  /**
   * How many attributes are filtered.
   *
   * Attributes, not values: "3" beside the button should mean three things are
   * narrowing the table, not that one attribute has three values ticked.
   *
   * @default 0
   */
  count?: number;

  /** The trigger's label. @default 'Filters' */
  label?: string;

  /** Extra classes for the trigger. */
  className?: string;
}

/**
 * Props for TableFilterChips - what is currently narrowing the table.
 */
export interface TableFilterChipsProps extends ComponentPropsWithoutRef<'div'> {
  /** The active filters. */
  filters: { attribute: string; values: string[] }[];

  /** Turns an attribute key into the name a person would recognise. */
  labelFor: (attribute: string) => string;

  /** Called with the attribute whose chip was removed. */
  onRemove: (attribute: string) => void;

  /**
   * Adds a Clear all control, shown only past one filter.
   *
   * With a single chip it would be a second way to do what the chip's own cross
   * already does, sitting right beside it.
   */
  onClear?: () => void;
}

/**
 * Props for DataTable - the whole table, assembled.
 */
export interface DataTableProps<Row> extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  /** The columns, in display order. */
  columns: { key: string; label: string; locked?: boolean }[];

  /** The rows. */
  rows: Row[];

  /** A stable identity per row, for React keys and for selection later. */
  getRowId: (row: Row) => string | number;

  /**
   * How to draw one cell. Without it the value is printed as text.
   *
   * This is where the cell recipes go - a status badge, a two-line cell, an
   * avatar. `DataTable` knows the shape of a table, not the meaning of your
   * data.
   */
  renderCell?: (row: Row, columnKey: string) => ReactNode;

  /** What can be filtered, and the values each attribute offers. */
  filterAttributes?: { key: string; label: string; values: string[] }[];

  /** Whether to show the search field. @default true */
  searchable?: boolean;

  /** The search field's placeholder and accessible name. @default 'Search' */
  searchPlaceholder?: string;

  /**
   * Hand each job back to the product.
   *
   * A table backed by a paged API turns all four on and passes the rows it was
   * given; `DataTable` becomes a renderer and reports what the user asked for
   * through the `on*Change` callbacks.
   */
  manualSort?: boolean;
  manualFilter?: boolean;
  manualSearch?: boolean;
  manualPagination?: boolean;

  /** Rows per page. @default 25 */
  pageSize?: number;

  /** Total rows, when the browser does not have them all. */
  total?: number;

  /** Told what the user asked for, whether or not this component acts on it. */
  onSortChange?: (rules: { column: string; direction: 'ascend' | 'descend' }[]) => void;
  onFilterChange?: (filters: { attribute: string; values: string[] }[]) => void;
  onSearchChange?: (query: string) => void;
  onPageChange?: (page: number, pageSize: number) => void;

  /** Extra controls for the toolbar's trailing group. */
  toolbarActions?: ReactNode;

  /**
   * Adds a checkbox column and the bulk bar.
   *
   * @default false
   */
  selectable?: boolean;

  /**
   * The actions on the bulk bar, given the selected row ids.
   *
   * A function rather than a node because what you can do usually depends on
   * what is selected - one row offers Rename, thirty do not.
   */
  bulkActions?: (selected: string[]) => ReactNode;

  /**
   * Whether each header carries its own menu, drag grip, resize line and
   * insertion point.
   *
   * On by default: they are what makes a table someone's own rather than a
   * fixed report. Turn them off for a table that is a fixed report.
   *
   * @default true
   */
  columnControls?: boolean;

  /**
   * What an empty table says.
   *
   * Two messages, because they are different situations: nothing exists yet, or
   * nothing matches. Telling them apart is the difference between someone
   * creating a record and someone clearing a filter.
   */
  emptyMessage?: string;
  filteredEmptyMessage?: string;

  /**
   * Whether rows are on their way.
   *
   * With nothing on screen yet it draws skeleton rows, which hold the table's
   * shape rather than collapsing the page to a spinner and pushing everything
   * below it around when the rows land. With rows already there it dims them
   * and marks the body busy instead: replacing a table someone is reading with
   * placeholders on every keystroke of a search is a flicker, and throws away
   * rows that were probably still right.
   *
   * @default false
   */
  loading?: boolean;

  /**
   * Loads more rows as you reach the end, instead of paging.
   *
   * One or the other, never both - two ways to reach row 300 that disagree
   * about which rows are loaded is a bug waiting to be filed. Turning this on
   * hides the pager and stops slicing: a list that grows as you scroll has
   * already been paged by whoever is fetching it, so pass the rows you have.
   *
   * @default false
   */
  infinite?: boolean;

  /** Whether there is anything left to fetch. The stop condition. @default false */
  hasMore?: boolean;

  /** Whether the next batch is in flight. Pauses the observer, so page 2 is asked for once. @default false */
  loadingMore?: boolean;

  /** Called when the end of the list comes into view, or when Load more is pressed. */
  onLoadMore?: () => void;

  /**
   * Shows the saved views control in the toolbar.
   *
   * Off by default: a table with one way of looking at it does not need a
   * control for choosing between them, and an empty views list is a button
   * that does nothing.
   *
   * @default false
   */
  savedViews?: boolean;

  /** The views to start with - from storage, an API, a URL. */
  initialViews?: TableView<DataTableViewState>[];

  /** Which view to open on. */
  initialViewId?: string | null;

  /**
   * Called with the whole list whenever it changes.
   *
   * Where persistence happens. `DataTable` deliberately writes nothing itself;
   * views shared between colleagues and views in a URL are both impossible for
   * a component that assumed `localStorage`.
   */
  onViewsChange?: (views: TableView<DataTableViewState>[]) => void;
}

/** One row of the switcher's list. The state a view holds is not its business. */
export interface TableViewSummary {
  id: string;
  name: string;
}

export interface TableViewNamePanelProps {
  /** What the panel is for - "Rename view" or "Save this view". */
  title: string;

  /** What the field starts with. Empty for a new view. */
  initialName: string;

  /** Called with the trimmed name. Never called with an empty one. */
  onCommit: (name: string) => void;

  /** Called on Cancel and on Escape. */
  onCancel: () => void;
}

export interface TableViewSwitcherProps {
  /** The saved views, in the order to list them. */
  views: TableViewSummary[];

  /** Which one is being looked at. */
  activeId?: string | null;

  /**
   * Whether the table has been changed since that view was applied.
   *
   * Drives the dot on the trigger and the save and discard controls. Work it
   * out by comparing state rather than by setting a flag on every change -
   * `useSavedViews` does exactly that.
   *
   * @default false
   */
  dirty?: boolean;

  /** Called with the view to switch to. */
  onApply: (id: string) => void;

  /** Overwrites the active view. Omit it and no Save control appears. */
  onSave?: () => void;

  /** Called with a name for a new view. Required: without it the list can only shrink. */
  onSaveAs: (name: string) => void;

  /** Omit either one and that control disappears from every row. */
  onRename?: (id: string, name: string) => void;
  onRemove?: (id: string) => void;

  /** Puts the table back to the active view. Omit it and no Discard appears. */
  onReset?: () => void;

  /** Shown on the trigger when no view is active. @default 'Views' */
  label?: string;

  /** Extra classes for the trigger. */
  className?: string;
}

/**
 * What a `DataTable` saves when you save a view.
 *
 * Four things the toolbar can change, and nothing else. The page is left out
 * because a view is a way of looking at a table rather than a place in it, and
 * the selection because it belongs to the rows.
 */
export interface DataTableViewState {
  columns: TableColumnsState;
  sort: SortRule[];
  filters: TableFilter[];
  query: string;
}
