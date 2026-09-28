import type { ReactNode } from 'react';
import type { FilterKey } from '../AdvancedFilter';
import type { TableBlankKind, TableColumnDef, TablePagingMode } from './Table.types';

/**
 * The advanced filter behind the strip's Filters door: rows of key · operator ·
 * value, with groups, built by the AdvancedFilter component and applied by the
 * table. A page describes its keys once (2026-09-24, Pranjal: "every fix ... solve
 * it from the foundation so that anywhere else it doesnt cause the same issue" -
 * the door and the panel were the Users page's own until then).
 */
export interface DataTableAdvancedFilter<Row> {
  /** The keys a person can filter on. Since 2026-09-26 the page lists its quick filters' keys here too: the quick doors hide while an advanced filter is applied, so their jobs live in the panel. */
  keys: FilterKey<Row>[];
  /** The door's word. "More filters" unless the page says otherwise. */
  label?: string | undefined;
  /** The panel's heading. "Filters" unless the page says otherwise. */
  title?: string | undefined;
  /** The panel's width. 656 unless the page says otherwise. */
  width?: number | undefined;
}

/** The toolbar's quick filter: one column, a few values, the square button with the dot. */
export interface DataTableQuickFilter<Row> {
  /** The column whose heading takes the wash and the azure glyph while the filter is on. */
  columnKey: string;
  /** Spoken name of the square: "Filter by status". */
  label: string;
  options: string[];
  /**
   * The row's value for this filter — one string, or several when a row can
   * match more than one (a service account's home organisation and every
   * organisation in its reach). A row passes when any of them is ticked.
   */
  value: (row: Row) => string | string[];
  /** The square's 14px icon. Left unset, the square wears the column's own glyph. */
  icon?: ReactNode | undefined;
  /**
   * How one value is drawn in the menu. Left unset, the plain word. Users
   * draws each status as its own pill, so the menu reads like the column
   * (Pranjal, 2026-09-12: "we showed the badges inside the filter for clear
   * distinguish visibility").
   */
  renderOption?: ((value: string) => ReactNode) | undefined;
  /**
   * A search box at the top of the menu, for a list long enough to need one
   * (Pranjal, 2026-09-17, the organisation filter: "it will contain search box
   * as well"). Left unset, none.
   */
  searchable?: boolean | undefined;
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
  /** The narrowest a person may drag it; 160 when not given. */
  minWidth?: number | undefined;
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
  /**
   * One quick filter, or several — each is its own square in the strip with
   * its own menu, and the row must satisfy every one that has a tick
   * (Pranjal, 2026-09-12: Service accounts filters by Status AND by
   * Organisation, side by side, as version 3 did).
   */
  quickFilter?: DataTableQuickFilter<Row> | DataTableQuickFilter<Row>[] | undefined;
  filters?: DataTableFilterGroup<Row>[] | undefined;
  /**
   * The advanced filter: a Filters door in the strip that opens the
   * AdvancedFilter panel, its condition count on the door, its rows applied to
   * the list. Give `filters` for a few tick-boxes, this for conditions; a page
   * that gives both gets both doors.
   */
  advancedFilter?: DataTableAdvancedFilter<Row> | undefined;
  /** Column keys the toolbar Sort menu offers. Defaults to Name plus every sortable column. */
  sortFields?: string[] | undefined;
  pageSize?: number | undefined;
  pageSizes?: number[] | undefined;
  paging?: TablePagingMode | undefined;
  /** Remember column order, hidden columns and widths in this browser. */
  storageKey?: string | undefined;
  /**
   * Bulk-bar actions, as TableBulkAction elements. Leave unset for a table
   * without selection: its rows then carry plain numbers that never become
   * checkboxes, and "Row number" can be hidden from the Columns panel.
   */
  bulkActions?: ((selectedIds: string[], clear: () => void) => ReactNode) | undefined;
  /** The blank 60 px column at the right edge that used to soak up leftover width. OFF by default since 2026-09-23
   * (Pranjal: "remove the most right side column which is nothing but empty. Actually hide it from the code we might
   * need it later"): the table ends at its last column and, once a person has dragged a column, the last content
   * column takes the spare. `true` draws the tail as before. */
  tail?: boolean | undefined;
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
   *
   * The bulk bar reads this too (2026-09-26): docked, it hangs 62px above the
   * card's own end; otherwise it hangs from a hook stuck to the bottom of
   * whatever scrolls the card - the page, a drawer's body - so picking rows on
   * a card that runs past the fold still shows the bar without scrolling.
   */
  docked?: boolean | number | undefined;
  /**
   * The strip above the table: search, Filters, the quick filter, Sort and
   * Columns. ON by default.
   *
   * Pass `false` where the PAGE carries its own toolbar — a screen with a tab
   * strip puts its controls up there, and a second strip would draw the same
   * controls twice (Pranjal, 2026-09-11). The page then supplies its own
   * `Toolbar`, a separate component, and the two stay connected through the
   * props below.
   *
   * With its own toolbar the table keeps 16px between the strip and the card.
   * Without one, the page's structure decides the space above the table.
   *
   * Pass the page's own `Toolbar` ELEMENT (Pranjal, 2026-09-12) and the table
   * draws the same controls inside it instead: the page keeps its 60px strip
   * as structure, the table keeps search, Filters, the quick filter, Sort and
   * Columns working. Use a callback ref or state for the element, so the
   * table sees it once it exists; until then it draws no strip.
   */
  toolbar?: boolean | HTMLElement | null | undefined;
  /**
   * When the pager strip appears.
   *
   * `'auto'` — the default — only once there IS a second page: 25 rows at 25 a
   * page have none, 26 have one. Never while loading or in a blank state —
   * nothing to page, and the blank state carries its own message. For a
   * "Load more" table, only while there is more to load.
   *
   * `'always'` keeps it whatever the count, for a list about to grow.
   * `'never'` drops it, for a list that shows everything it has.
   */
  pager?: 'auto' | 'always' | 'never' | undefined;
  className?: string | undefined;
}
