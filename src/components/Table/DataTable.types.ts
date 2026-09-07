import type { ReactNode } from 'react';
import type { TableBlankKind, TableColumnDef, TablePagingMode } from './Table.types';

/** The toolbar's quick filter: one column, a few values, the square button with the dot. */
export interface DataTableQuickFilter<Row> {
  /** The column whose heading takes the wash and the azure glyph while the filter is on. */
  columnKey: string;
  /** Spoken name of the square: "Filter by status". */
  label: string;
  options: string[];
  /** The row's value for this filter. */
  value: (row: Row) => string;
  /** The square's 14px icon. */
  icon?: ReactNode | undefined;
}

/** One group in the Filters panel: a label and the values a person can tick. */
export interface DataTableFilterGroup<Row> {
  key: string;
  label: string;
  options: string[];
  /** Does the row pass, given the ticked values (never empty when called)? */
  match: (row: Row, selected: ReadonlySet<string>) => boolean;
}

/** Wording for one blank state. */
export interface DataTableBlankCopy {
  title?: string | undefined;
  body?: string | undefined;
  action?: string | undefined;
  onAction?: (() => void) | undefined;
}

export interface DataTableNameColumn<Row> {
  label?: string | undefined;
  width?: number | undefined;
  sortable?: boolean | undefined;
  cell: (row: Row) => ReactNode;
  sortValue?: ((row: Row) => string | number) | undefined;
}

export interface DataTableProps<Row> {
  /** Spoken name of the table: "Users". */
  label: string;
  /** What the rows are called in counts: "users". */
  noun?: string | undefined;
  rows: Row[];
  getRowId: (row: Row) => string;
  /** The frozen Name column: avatar, name, owner mark. */
  nameColumn: DataTableNameColumn<Row>;
  /** The content columns after Name and Action, in default order. */
  columns: TableColumnDef<Row>[];
  /** Menu items for the row's kebab, as DropdownMenuItem elements. Leave unset for no Action column. */
  rowActions?: ((row: Row) => ReactNode) | undefined;
  /** Rows that cannot be picked or opened: invited people. */
  isRowInert?: ((row: Row) => boolean) | undefined;
  /** A click on the row body, or Enter on a focused row. */
  onRowOpen?: ((row: Row) => void) | undefined;
  /** Search box in the toolbar. */
  search?:
    | { placeholder?: string | undefined; match: (row: Row, query: string) => boolean }
    | undefined;
  /** What the search box holds to begin with. */
  initialQuery?: string | undefined;
  quickFilter?: DataTableQuickFilter<Row> | undefined;
  filters?: DataTableFilterGroup<Row>[] | undefined;
  /** Column keys the toolbar Sort menu offers. Defaults to Name plus every sortable column. */
  sortFields?: string[] | undefined;
  pageSize?: number | undefined;
  pageSizes?: number[] | undefined;
  paging?: TablePagingMode | undefined;
  /** Remember column order, hidden columns and widths in this browser. */
  storageKey?: string | undefined;
  /** Bulk-bar actions, as TableBulkAction elements. Leave unset for a table without selection. */
  bulkActions?: ((selectedIds: string[], clear: () => void) => ReactNode) | undefined;
  loading?: boolean | undefined;
  refreshing?: boolean | undefined;
  error?: boolean | undefined;
  /** Wording for the three blank states; "Try again" for error calls `onAction`. */
  blank?: Partial<Record<TableBlankKind, DataTableBlankCopy>> | undefined;
  /** Row lines: neutral-30 as proposed, or the lighter neutral-20 the console draws today. */
  divider?: 'default' | 'light' | undefined;
  /** How tall the rows may grow before they scroll. Once `docked`, the card's own height. */
  maxHeight?: number | string | undefined;
  /**
   * The card becomes the page: `true` docked, a number the in-between while the
   * page scrolls it to its dock line. See Table's `docked`.
   */
  docked?: boolean | number | undefined;
  className?: string | undefined;
}
