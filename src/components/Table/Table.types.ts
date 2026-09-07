import type { ComponentPropsWithoutRef, PointerEvent as ReactPointerEvent, ReactNode } from 'react';

/** Which way a column is sorted. One sort at a time, as on the console. */
export type TableSortDirection = 'asc' | 'desc';

/** The sort that is on: which column and which way. `null` means unsorted. */
export interface TableSortState {
  key: string;
  direction: TableSortDirection;
}

/** Horizontal alignment of a column's cells. Numbers sit right. */
export type TableAlign = 'left' | 'center' | 'right';

/**
 * One column of a DataTable.
 *
 * The three console columns that never move (the row number, Name, Action) are
 * described by the table itself; these are the content columns after them.
 */
export interface TableColumnDef<Row> {
  /** Stable identifier; also the key remembered in the browser for order, hiding and width. */
  key: string;
  /** The heading text. */
  label: string;
  /** Starting width in px. Every content column starts at 200 on the console. */
  width?: number | undefined;
  /** The narrowest a person can drag it. 120 unless the content needs more. */
  minWidth?: number | undefined;
  /** Clicking the heading sorts by this column. Contact and Action never sort. */
  sortable?: boolean | undefined;
  /** Where the cell content sits. Numbers go right. */
  align?: TableAlign | undefined;
  /** A small glyph before the label, the mark a quick-filter column wears (Status). 14px. */
  glyph?: ReactNode | undefined;
  /** Draws the cell. */
  cell: (row: Row) => ReactNode;
  /** What to sort by when `sortable`. Defaults to the string form of `row[key]`. */
  sortValue?: ((row: Row) => string | number) | undefined;
}

/** What the browser remembers about the columns: order, hidden keys, widths. */
export interface TableColumnsLayout {
  order: string[];
  hidden: string[];
  widths: Record<string, number>;
}

/** Which rows a select-all should take: the page, everything that matches, or a number. */
export type TableSelectionScope = 'page' | 'all' | 'custom';

/** Pages, or a "Load more" footer that also fires as you scroll. Users keeps pages. */
export type TablePagingMode = 'pages' | 'loadMore';

/** The three blank states a list can be in. */
export type TableBlankKind = 'empty' | 'first' | 'error';

export interface TableProps extends ComponentPropsWithoutRef<'div'> {
  /** Spoken name of the table. */
  label: string;
  /** Row lines: neutral-30 as proposed, or the lighter neutral-20 the console draws today. */
  divider?: 'default' | 'light' | undefined;
  children: ReactNode;
}

export interface TableViewportProps extends ComponentPropsWithoutRef<'div'> {
  /** How tall the scrolling region may grow before rows scroll under the header. */
  maxHeight?: number | string | undefined;
  /** Total table width in px: the sum of the column widths plus the 60px tail. */
  tableWidth: number;
  /** How many rows there are in all, for screen readers. */
  rowCount?: number | undefined;
  /** Dims the rows to 60% while a refresh is in flight. */
  refreshing?: boolean | undefined;
  /** At least one row is picked: every row shows its checkbox instead of its number. */
  hasSelection?: boolean | undefined;
  /** Spoken name of the grid itself. */
  label?: string | undefined;
  children: ReactNode;
}

export interface TableColGroupProps {
  /** Widths in px, one per column, in display order. The 60px tail is added. */
  widths: number[];
}

export interface TableRowProps extends ComponentPropsWithoutRef<'tr'> {
  /** The row is picked. */
  selected?: boolean | undefined;
  /** An invited person: muted, not selectable, does not open. */
  inert?: boolean | undefined;
  /** Enter, or a click on the row body. */
  onOpen?: (() => void) | undefined;
  /** Space. `extend` is true with Shift held. */
  onToggle?: ((extend: boolean) => void) | undefined;
  /** Move focus to the row above or below with the arrow keys. */
  onArrow?: ((direction: -1 | 1) => void) | undefined;
}

export interface TableCellProps extends ComponentPropsWithoutRef<'td'> {
  /** Stays put while the table scrolls sideways; the value is its left offset in px. */
  frozen?: number | undefined;
  /** The last frozen cell draws the boundary line while scrolled. */
  frozenEdge?: boolean | undefined;
  align?: TableAlign | undefined;
  /** The column is being dragged: dims to 40%. */
  dragging?: boolean | undefined;
}

export interface TableHeadProps extends Omit<ComponentPropsWithoutRef<'th'>, 'onResize'> {
  /** Column key, for the drag and insert machinery. */
  columnKey: string;
  label: string;
  width: number;
  minWidth?: number | undefined;
  frozen?: number | undefined;
  frozenEdge?: boolean | undefined;
  align?: TableAlign | undefined;
  /** Clicking the label sorts. */
  sortable?: boolean | undefined;
  sort?: TableSortDirection | null | undefined;
  onSort?: (() => void) | undefined;
  /** The heading can be dragged to a new place, and carries the "⋯" menu. */
  movable?: boolean | undefined;
  /** Pointer down on the grip. The DataTable's drag hook takes over from here. */
  onGripPointerDown?: ((event: ReactPointerEvent<HTMLButtonElement>) => void) | undefined;
  /** Arrow keys on a focused grip move the column one place. */
  onGripMove?: ((direction: -1 | 1) => void) | undefined;
  /** The "⋯" menu's items. Rendered inside a DropdownMenu. */
  menu?: ReactNode | undefined;
  /** A 14px glyph before the label. */
  glyph?: ReactNode | undefined;
  /** The quick filter is on: blue-10 wash and an azure glyph. */
  filtered?: boolean | undefined;
  /** The column is being dragged: dims to 40%. */
  dragging?: boolean | undefined;
  /** Drag or arrow-key the boundary to resize. */
  resizable?: boolean | undefined;
  onResize?: ((width: number, commit: boolean) => void) | undefined;
  /** The pointer is over the boundary: the DataTable may show the insert "+". */
  onBoundaryHover?: ((hovering: boolean) => void) | undefined;
}

export interface TableSelectionCellProps {
  /** The row number shown at rest. */
  index: number;
  selected: boolean;
  /** An invited person: number only, no checkbox. */
  inert?: boolean | undefined;
  /** Spoken name for the checkbox: "Select Sarah Johnson". */
  label: string;
  onToggle: (extend: boolean) => void;
  frozen?: number | undefined;
}

export interface TableSelectAllProps {
  /** none, some or all of the selectable rows on the page are picked. */
  state: 'none' | 'some' | 'all';
  onToggle: () => void;
  /** Opens the scope menu. */
  onScope: (anchor: HTMLElement) => void;
  frozen?: number | undefined;
}

export interface TableScopeMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anchor: HTMLElement | null;
  /** Selectable rows on this page. */
  pageCount: number;
  /** Selectable rows matching the search and filters, across pages. */
  allCount: number;
  /** What the table calls its rows: "users". */
  noun: string;
  onApply: (scope: TableSelectionScope, count: number) => void;
}

export interface TableBulkBarProps extends ComponentPropsWithoutRef<'div'> {
  /** How many rows are picked. The bar is not rendered at zero. */
  count: number;
  /** "N selected" opens the scope menu. */
  onScope?: ((anchor: HTMLElement) => void) | undefined;
  onClear: () => void;
  children?: ReactNode | undefined;
}

export interface TableBulkActionProps extends ComponentPropsWithoutRef<'button'> {
  icon?: ReactNode | undefined;
  /** A destructive action is red. */
  danger?: boolean | undefined;
}

export interface TablePagerProps {
  /** Rows matching the search and filters. */
  total: number;
  page: number;
  pageSize: number;
  pageSizes?: number[] | undefined;
  onPage: (page: number) => void;
  onPageSize: (size: number) => void;
  /** "users", for "1–25 of 10,001 users". */
  noun: string;
  /** Replaces the count text while the table is not showing rows. */
  message?: string | undefined;
}

export interface TableLoadMoreProps {
  shown: number;
  total: number;
  noun: string;
  loading?: boolean | undefined;
  onMore: () => void;
}

export interface TableBlankProps {
  kind: TableBlankKind;
  /** Titles and lines default to the Users wording. */
  title?: string | undefined;
  body?: string | undefined;
  action?: string | undefined;
  onAction?: (() => void) | undefined;
}

export interface TableSkeletonProps {
  /** One width per visible column, so the bars line up under the headings. */
  widths: number[];
  rows?: number | undefined;
}
