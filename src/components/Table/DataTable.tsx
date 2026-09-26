import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils';
import {
  AdvancedFilter,
  EMPTY_FILTER,
  applyAdvanced,
  countConditions,
  isGroup,
} from '../AdvancedFilter';
import type { FilterItem, FilterKey, FilterRow, FilterValue } from '../AdvancedFilter';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../DropdownMenu';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Checkbox } from '../Checkbox';
import { Toolbar, ToolbarButton, ToolbarSection, ToolbarSpacer } from '../Toolbar';
import {
  TABLE_COLUMN_MAX,
  TABLE_COLUMN_MIN,
  TABLE_COLUMN_WIDTH,
  TABLE_GUTTER,
  Table,
  TableBody,
  TableCell,
  TableColGroup,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectionCell,
  TableNumberCell,
  TableNumberHead,
  TableTailCell,
  TableViewport,
  tableMorphOf,
} from './Table';
import { TableBulkBar } from './TableBulkBar';
import { TableLoadMore, TablePager } from './TablePager';
import { TableColumnsPanel, TableInsertPanel } from './TablePanels';
import type { TableColumnsPanelColumn } from './TablePanels';
import type { UseTableColumns } from './useTableColumns';
import { TableBlank, TableSkeleton } from './TableStates';
import { useColumnDrag } from './useColumnDrag';
import { useTableColumns } from './useTableColumns';
import { useTablePaging } from './useTablePaging';
import { useTableSelection } from './useTableSelection';
import { useTableSort } from './useTableSort';
import type { DataTableProps, DataTableQuickFilter } from './DataTable.types';
import type { TableColumnDef, TableSortDirection } from './Table.types';

const ACTION_WIDTH = 100;
const NAME_KEY = '__name';
/** The Name column's floor when the page declares none: room for a tile and a name. */
const NAME_MIN = 160;
const ROWNUM_KEY = '__rownum';

/** Whether the row numbers are shown, remembered next to the column layout. */
function loadNumbers(storageKey: string | undefined): boolean {
  if (!storageKey) return true;
  try {
    return localStorage.getItem(`${storageKey}.rowNumbers`) !== 'off';
  } catch {
    return true;
  }
}
/**
 * What the Columns panel lists and does. Without selection the row numbers are
 * an ordinary entry, first in the list; with selection that column carries the
 * checkboxes, so it is locked.
 */
function columnsPanel<Row>(opts: {
  selectable: boolean;
  numbers: boolean;
  setNumbers: (on: boolean) => void;
  layout: UseTableColumns<Row>;
  labelOf: (key: string) => string;
  nameLabel: string;
  hasActions: boolean;
}) {
  const { selectable, numbers, setNumbers, layout, labelOf, nameLabel, hasActions } = opts;
  const isVisible = (k: string) => layout.visible.some((c) => c.key === k);
  const own: TableColumnsPanelColumn[] = layout.order.map((k) => ({
    key: k,
    label: labelOf(k),
    hidden: !isVisible(k),
  }));
  const rowNumber: TableColumnsPanelColumn = {
    key: ROWNUM_KEY,
    label: 'Row number',
    hidden: !numbers,
    fixed: true, // the serial column keeps its place: it neither drags nor takes a drop
  };
  /* Name stays listed and locked, as the Users panel lists it; the Action column is not listed - it cannot be hidden
   * and Users never shows it (Pranjal, 2026-09-17: "same for column management") */
  const lockedNames = [nameLabel];
  void hasActions;
  return {
    columns: selectable ? own : [rowNumber, ...own],
    locked: selectable ? ['Row number', ...lockedNames] : lockedNames,
    onToggle: (k: string) => {
      if (k === ROWNUM_KEY) setNumbers(!numbers);
      else if (isVisible(k)) layout.hide(k);
      else layout.show(k);
    },
    onHideAll: () => {
      layout.hideAll();
      if (!selectable) setNumbers(false);
    },
    onShowAll: () => {
      layout.showAll();
      setNumbers(true);
    },
    onReset: () => {
      layout.reset();
      setNumbers(true);
    },
    /* a row dragged in the panel moves the column, as dragging the heading does (Pranjal, 2026-09-17) */
    onMoveBefore: (key: string, beforeKey: string) => {
      if (key === ROWNUM_KEY || beforeKey === ROWNUM_KEY) return;
      layout.moveBefore(key, beforeKey);
    },
  };
}

function saveNumbers(storageKey: string | undefined, on: boolean): void {
  if (!storageKey) return;
  try {
    localStorage.setItem(`${storageKey}.rowNumbers`, on ? 'on' : 'off');
  } catch {
    // a browser that refuses storage still gets a working table
  }
}

/**
 * DataTable - the merged console Users table, assembled: the Toolbar strip
 * with search, Filters, a quick filter, Sort and Columns; the table with its
 * frozen row-number, Name and Action columns; a bulk bar; a pager or a
 * "Load more" footer; and the loading, empty, first-run and error states.
 *
 * Every pill inside is the library Badge; every control is a ToolbarButton.
 *
 * QUICK FILTERS HIDE UNDER AN ADVANCED FILTER (Pranjal, 2026-09-26: "whenever I
 * apply an advanced filter, the quick filters won't be visible. All the
 * quick-filter options, like Status and Organisation, which we removed before
 * from the advanced filter, will all be visible inside the advanced filter now,
 * because the quick filters will be hidden.") The rule, which every table
 * follows:
 *   - While the advanced filter holds at least one applied row, the strip draws
 *     no quick-filter squares and no heading wears a quick filter's wash. A page
 *     therefore lists its quick-filter keys (Status, Organisation ...) among the
 *     advanced keys, so they can still be set from inside the panel.
 *   - Applying the advanced filter never loses a quick filter: every value
 *     ticked in a square at that moment is folded into the applied filter as a
 *     row on the advanced key whose id is the square's columnKey - the "is"
 *     operator with the ticked values, exactly the row the panel itself builds
 *     for a pick key (one value or several, "is" means any of them). If the
 *     panel already holds an "is" row on that key the values join it. The
 *     square's own ticks are then cleared, so nothing is filtered twice.
 *   - A square whose key the page did not list among the advanced keys keeps
 *     its ticks and keeps filtering (nothing is dropped silently) - it is just
 *     not visible until the advanced filter is empty again. A page owes the
 *     panel every one of its quick keys.
 *   - When the advanced filter goes back to empty (Clear all, or every row
 *     removed and applied) the squares return, empty.
 */
/** One filter value as a word; an object or nothing is no word (the panel's own reading). */
function word(v: unknown): string {
  return typeof v === 'string'
    ? v
    : typeof v === 'number' || typeof v === 'boolean'
      ? String(v)
      : '';
}

/** The values a row holds, as the panel keeps them: a list for a pick key, a lone string otherwise, nothing when blank. */
function rowValues(v: unknown): string[] {
  if (Array.isArray(v)) return (v as unknown[]).map(word).filter((s) => s !== '');
  const s = word(v);
  return s === '' ? [] : [s];
}

/**
 * The carry-over half of the rule above: the quick filters' ticked values,
 * folded into the advanced filter being applied. Returns the filter to apply
 * and the quick state to keep - only the squares whose key the page did not
 * list. An empty `next` (Clear all, or nothing complete) folds nothing: the
 * squares are about to come back, ticks and all.
 */
function foldQuickIntoAdvanced<Row>(
  next: FilterValue,
  quick: Record<string, Set<string>>,
  quickFilters: DataTableQuickFilter<Row>[],
  keys: FilterKey<Row>[]
): { advanced: FilterValue; quick: Record<string, Set<string>> } {
  if (next.rows.length === 0) return { advanced: next, quick };
  const rows: FilterItem[] = [...next.rows];
  const kept: Record<string, Set<string>> = {};
  for (const qf of quickFilters) {
    const ticked = quick[qf.columnKey];
    if (!ticked || ticked.size === 0) continue;
    const def = keys.find((k) => k.id === qf.columnKey);
    if (!def) {
      kept[qf.columnKey] = ticked;
      continue;
    }
    const values = [...ticked];
    const at = rows.findIndex((it) => !isGroup(it) && it.key === def.id && it.op === 'is');
    const existing = at >= 0 ? (rows[at] as FilterRow) : null;
    if (existing) {
      /* the panel keeps one row per key: the ticks join the row it already holds */
      const joined = [...new Set([...rowValues(existing.value), ...values])];
      rows[at] = {
        ...existing,
        value: def.type === 'pick' || joined.length > 1 ? joined : joined[0],
      };
    } else {
      /* a pick key always carries a list, as the panel's operator field sets it; a text key a lone string */
      rows.push({
        key: def.id,
        op: 'is',
        value: def.type === 'pick' || values.length > 1 ? values : values[0],
      });
    }
  }
  return { advanced: { join: next.join, rows }, quick: kept };
}

/**
 * Whether the pager strip earns its place. A strip reading "1–12 of 12" over a
 * page nobody can leave is furniture: 'auto' draws it only once there IS a
 * second page; 'always' holds it for a list about to grow, so the footer does
 * not pop in and out as rows come and go; 'never' drops it for a list that
 * shows all it has.
 */
function pagerWanted(mode: 'auto' | 'always' | 'never', total: number, pageSize: number): boolean {
  if (mode === 'never') return false;
  if (mode === 'always') return true;
  return total > pageSize;
}

/** The same rule for the Load more footer: only while there is more to load. */
function loadMoreWanted(mode: 'auto' | 'always' | 'never', shown: number, total: number): boolean {
  if (mode === 'never') return false;
  if (mode === 'always') return true;
  return shown < total;
}

function DataTable<Row>({
  label,
  noun = 'rows',
  rows,
  getRowId,
  nameColumn,
  columns,
  rowActions,
  isRowInert,
  onRowOpen,
  search,
  initialQuery = '',
  quickFilter,
  filters = [],
  advancedFilter,
  sortFields,
  pageSize = 25,
  pageSizes,
  paging = 'pages',
  storageKey,
  bulkActions,
  tail = false,
  loading = false,
  refreshing = false,
  error = false,
  blank,
  divider = 'default',
  maxHeight = 600,
  docked,
  toolbar = true,
  pager = 'auto',
  className,
}: DataTableProps<Row>) {
  // ── state ──
  const [query, setQuery] = useState(initialQuery);
  /* one Set of ticked values per quick filter, keyed by the column it filters */
  const [quick, setQuick] = useState<Record<string, Set<string>>>({});
  /* what is typed in a quick filter's search box, per filter; cleared when its menu closes */
  const [quickQuery, setQuickQuery] = useState<Record<string, string>>({});
  const quickSearchRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const quickFilters = useMemo(
    () => (Array.isArray(quickFilter) ? quickFilter : quickFilter ? [quickFilter] : []),
    [quickFilter]
  );
  const quickCount = useMemo(() => Object.values(quick).reduce((t, s) => t + s.size, 0), [quick]);
  const tickQuick = (key: string, value: string, on: boolean) => {
    setQuick((all) => {
      const next = new Set(all[key] ?? []);
      if (on) next.add(value);
      else next.delete(value);
      return { ...all, [key]: next };
    });
  };
  const [ticked, setTicked] = useState<Record<string, Set<string>>>({});
  /* the advanced filter's applied rows, and whether its panel is open (the door toggles it) */
  const [advanced, setAdvanced] = useState<FilterValue>(EMPTY_FILTER);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const advancedCount = advancedFilter ? countConditions(advanced) : 0;
  /* the quick filters step aside while an advanced filter is applied (Pranjal, 2026-09-26; the rule is in the header) */
  const quickHidden = advancedFilter !== undefined && advanced.rows.length > 0;
  const shownQuickFilters = quickHidden ? [] : quickFilters;
  const sort = useTableSort();
  const pagingState = useTablePaging({ pageSize, mode: paging });
  const selection = useTableSelection();
  const layout = useTableColumns({ columns, storageKey });
  const [numbers, setNumbers] = useState(() => loadNumbers(storageKey));
  useEffect(() => {
    saveNumbers(storageKey, numbers);
  }, [storageKey, numbers]);
  const viewportRef = useRef<HTMLDivElement>(null);

  /* THE COLUMNS FILL THE CARD (Pranjal, 2026-09-12: "if there's space left then
   * columns should automatically stretch equally to fill the full width of the
   * table"). The card's inner width is watched; whatever the columns do not
   * cover is shared equally among the CONTENT columns - the lead, Name and
   * Action keep their ruled widths - so a wide screen shows wider columns, not
   * a blank run past the last one. Narrower than the columns, and the table
   * scrolls sideways as before. */
  const [viewportWidth, setViewportWidth] = useState(0);
  useEffect(() => {
    const el = viewportRef.current;
    if (el === null) return undefined;
    const measure = (): void => {
      setViewportWidth(el.clientWidth);
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      ro.disconnect();
    };
  }, []);
  const cardRef = useRef<HTMLDivElement>(null);
  const [insert, setInsert] = useState<{ key: string; x: number; y: number } | null>(null);
  const [insertOpen, setInsertOpen] = useState(false);
  const insertBtn = useRef<HTMLButtonElement>(null);
  const insertTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    pagingState.setMode(paging);
  }, [paging, pagingState]);

  // ── derived rows ──
  const allColumns = useMemo<TableColumnDef<Row>[]>(
    () => [
      {
        key: NAME_KEY,
        label: nameColumn.label ?? 'Name',
        sortable: nameColumn.sortable ?? true,
        cell: nameColumn.cell,
        sortValue: nameColumn.sortValue,
      },
      ...columns,
    ],
    [nameColumn, columns]
  );
  const filterCount = useMemo(
    () => Object.values(ticked).reduce((n, s) => n + s.size, 0),
    [ticked]
  );
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const kept = rows.filter((row) => {
      if (q && search && !search.match(row, q)) return false;
      for (const qf of quickFilters) {
        const s = quick[qf.columnKey];
        if (!s || s.size === 0) continue;
        const v = qf.value(row);
        const values = Array.isArray(v) ? v : [v];
        if (!values.some((x) => s.has(x))) return false;
      }
      for (const g of filters) {
        const s = ticked[g.key];
        if (s && s.size > 0 && !g.match(row, s)) return false;
      }
      return true;
    });
    /* the advanced filter's conditions, last: its own matcher reads the keys */
    return advancedFilter && advanced.rows.length > 0
      ? applyAdvanced(kept, advanced, advancedFilter.keys)
      : kept;
  }, [rows, query, search, quickFilters, quick, filters, ticked, advancedFilter, advanced]);
  const sorted = useMemo(() => sort.apply(filtered, allColumns), [sort, filtered, allColumns]);
  const pageRows = useMemo(() => pagingState.slice(sorted), [pagingState, sorted]);
  const inert = useCallback((row: Row) => isRowInert?.(row) ?? false, [isRowInert]);
  const pageIds = useMemo(
    () => pageRows.filter((r) => !inert(r)).map(getRowId),
    [pageRows, inert, getRowId]
  );
  const selectable = bulkActions !== undefined;
  /** The first column: checkboxes when there is selection, plain numbers otherwise (unless hidden). */
  const leading = selectable || numbers;
  const hasFiltering =
    query.trim() !== '' || quickCount > 0 || filterCount > 0 || advancedCount > 0;

  const resetPaging = pagingState.reset;
  const onQuery = (v: string) => {
    setQuery(v);
    resetPaging();
  };

  // ── widths and offsets ──
  /* THE NAME COLUMN RESIZES like any content column (Pranjal, 2026-09-13:
   * "only checkbox and action columns are the one which cannot be resized").
   * Its width lives in the same remembered layout under NAME_KEY, floored at
   * NAME_MIN (nameColumn.minWidth overrides) and capped with the others. */
  const nameMin = nameColumn.minWidth ?? NAME_MIN;
  const nameWidth = Math.max(
    nameMin,
    Math.min(
      TABLE_COLUMN_MAX,
      layout.hasWidth(NAME_KEY)
        ? layout.widthOf(NAME_KEY)
        : (nameColumn.width ?? TABLE_COLUMN_WIDTH)
    )
  );
  const hasActions = rowActions !== undefined;
  const visible = layout.visible;
  const baseWidths = useMemo(
    () => [
      ...(leading ? [TABLE_GUTTER] : []),
      nameWidth,
      ...(hasActions ? [ACTION_WIDTH] : []),
      ...visible.map((c) => layout.widthOf(c.key)),
    ],
    [leading, nameWidth, hasActions, visible, layout]
  );
  /* the first content column's position: after the lead, Name and Action */
  const contentStart = (leading ? 1 : 0) + 1 + (hasActions ? 1 : 0);
  /* WIDENING ONE COLUMN NEVER NARROWS ANOTHER (Pranjal, 2026-09-13: "when I
   * increase the size of one column the size of other column reduces that
   * should not happen at all … It can stretch through to fill the table").
   * At rest — no width remembered — the content columns share the card's
   * spare equally. The first drag freezes every column where it stands (see
   * resizeTo), and from then on nothing is shared: the elastic tail takes the
   * spare, and when the columns outgrow the card the table scrolls sideways.
   * Reset columns forgets the widths and the sharing returns. */
  const frozen = layout.hasAnyWidth;
  const widths = useMemo(() => {
    if (frozen) {
      if (tail) return baseWidths;
      /* NO TAIL (2026-09-23): once the columns are frozen the LAST content column takes the spare, so the card edge
       * is always met; a table wider than its card still scrolls sideways */
      const sum = baseWidths.reduce((a, b) => a + b, 0);
      const extra = viewportWidth - sum;
      if (extra <= 0 || baseWidths.length <= contentStart) return baseWidths;
      return baseWidths.map((w, i) => (i === baseWidths.length - 1 ? w + extra : w));
    }
    const covered = baseWidths.reduce((a, b) => a + b, 0) + (tail ? TABLE_GUTTER : 0);
    const content = baseWidths.length - contentStart;
    const spare = viewportWidth - covered;
    if (spare <= 0 || content <= 0) return baseWidths;
    const share = spare / content;
    return baseWidths.map((w, i) => (i >= contentStart ? w + share : w));
  }, [baseWidths, contentStart, viewportWidth, frozen, tail]);
  const columnsWidth = widths.reduce((a, b) => a + b, 0);
  const tailWidth = tail
    ? frozen
      ? Math.max(TABLE_GUTTER, viewportWidth - columnsWidth)
      : TABLE_GUTTER
    : 0;
  const tableWidth = columnsWidth + tailWidth;
  /* a drag: the first one freezes every column at its rendered width, so the
   * others do not move; then the dragged key takes its new width */
  const frozenRef = useRef(frozen);
  frozenRef.current = frozen;
  const resizeTo = (key: string, w: number) => {
    if (!frozenRef.current) {
      frozenRef.current = true;
      const all: Record<string, number> = { [NAME_KEY]: nameWidth };
      visible.forEach((c, i) => {
        all[c.key] = widths[contentStart + i] ?? layout.widthOf(c.key);
      });
      all[key] = w;
      layout.setWidths(all);
      return;
    }
    layout.setWidth(key, w);
  };
  const nameLeft = leading ? TABLE_GUTTER : 0;
  const actionLeft = nameLeft + nameWidth;

  // ── drag, insert ──
  const drag = useColumnDrag({
    viewportRef,
    onDrop: (key, beforeKey) => {
      layout.moveBefore(key, beforeKey);
    },
  });
  const showInsert = (key: string, hovering: boolean) => {
    if (insertTimer.current) clearTimeout(insertTimer.current);
    if (hovering) {
      if (layout.hidden.length === 0) return;
      const th = viewportRef.current?.querySelector<HTMLElement>(`th[data-key="${key}"]`);
      const card = cardRef.current;
      if (!th || !card) return;
      const r = th.getBoundingClientRect(),
        c = card.getBoundingClientRect();
      setInsert({ key, x: r.right - c.left, y: r.top - c.top });
    } else {
      insertTimer.current = setTimeout(() => {
        if (!insertOpen && !insertBtn.current?.matches(':hover')) setInsert(null);
      }, 250);
    }
  };

  // ── selection helpers ──
  const pageState = selection.stateOf(pageIds);
  const togglePage = () => {
    if (pageState === 'all') selection.remove(pageIds);
    else selection.add(pageIds);
  };
  const focusSibling = (tr: HTMLTableRowElement, direction: -1 | 1) => {
    const next = direction > 0 ? tr.nextElementSibling : tr.previousElementSibling;
    if (next instanceof HTMLTableRowElement && next.classList.contains('tbl-row')) next.focus();
  };

  // ── sort menu fields ──
  const sortKeys = sortFields ?? allColumns.filter((c) => c.sortable).map((c) => c.key);
  const labelOf = (key: string) => allColumns.find((c) => c.key === key)?.label ?? key;

  // ── load more sentinel ──
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    const root = viewportRef.current;
    if (!el || !root || pagingState.mode !== 'loadMore' || pagingState.loaded >= sorted.length)
      return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          pagingState.loadMore();
        }
      },
      { root, rootMargin: '200px' }
    );
    io.observe(el);
    return () => {
      io.disconnect();
    };
  }, [pagingState, sorted.length, pageRows.length]);

  const blankKind = error
    ? 'error'
    : rows.length === 0 && !hasFiltering
      ? 'first'
      : sorted.length === 0
        ? 'empty'
        : null;
  const clearAll = () => {
    setQuery('');
    setQuick({});
    setTicked({});
    setAdvanced(EMPTY_FILTER);
    resetPaging();
  };
  const blankAction = () => {
    if (blankKind === 'empty') clearAll();
    else blank?.[blankKind ?? 'empty']?.onAction?.();
  };
  const rowIndex = (i: number) =>
    (pagingState.mode === 'pages' ? (pagingState.page - 1) * pagingState.pageSize : 0) + i + 1;

  const headMenu = (c: TableColumnDef<Row>): ReactNode => (
    <>
      {c.sortable && (
        <>
          <DropdownMenuItem
            onSelect={() => {
              sort.set(c.key, 'asc');
            }}
          >
            <Icon name="arrow-up-narrow-wide" size={16} className="mdt-mr-2 mdt-text-neutral-90" />
            Sort A to Z
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              sort.set(c.key, 'desc');
            }}
          >
            <Icon
              name="arrow-down-wide-narrow"
              size={16}
              className="mdt-mr-2 mdt-text-neutral-90"
            />
            Sort Z to A
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </>
      )}
      <DropdownMenuItem
        onSelect={() => {
          layout.hide(c.key);
        }}
      >
        <Icon name="eye-off" size={16} className="mdt-mr-2 mdt-text-neutral-90" />
        Hide column
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() => {
          layout.moveToStart(c.key);
        }}
      >
        <Icon name="chevrons-left" size={16} className="mdt-mr-2 mdt-text-neutral-90" />
        Move to start
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() => {
          layout.moveToEnd(c.key);
        }}
      >
        <Icon name="chevrons-right" size={16} className="mdt-mr-2 mdt-text-neutral-90" />
        Move to end
      </DropdownMenuItem>
    </>
  );

  const sortDir = (key: string): TableSortDirection | null =>
    sort.sort?.key === key ? sort.sort.direction : null;

  /* The strip's controls: search, Filters, the quick filter, then Sort and
   * Columns on the right. Drawn either in the table's own strip or, when the
   * page hands its own Toolbar element in, inside that. */
  const stripControls = (
    <>
      {search && (
        <Input
          size="sm"
          className="mdt-w-[300px]"
          placeholder={search.placeholder ?? 'Search'}
          aria-label={`Search ${noun}`}
          value={query}
          onChange={(e) => {
            onQuery(e.target.value);
          }}
          startAdornment={<Icon name="search" size={14} />}
        />
      )}
      {filters.length > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <ToolbarButton
              icon={<Icon name="funnel" />}
              count={filterCount || undefined}
              activeLabel="applied"
            >
              Filters
            </ToolbarButton>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            sideOffset={6}
            className="mdt-w-[264px] mdt-rounded-xl mdt-px-3.5 mdt-pb-2.5 mdt-pt-4"
            aria-label="Filters"
          >
            <div className="mdt-mb-1 mdt-flex mdt-items-center mdt-justify-between">
              <span className="mdt-text-base mdt-font-semibold mdt-text-neutral-130">Filters</span>
              <button
                type="button"
                className="-mdt-mr-1.5 mdt-rounded-md mdt-border-0 mdt-bg-transparent mdt-px-1.5 mdt-py-0.5 mdt-text-[13px] mdt-font-medium mdt-text-neutral-90 hover:mdt-bg-neutral-10"
                onClick={() => {
                  setTicked({});
                  resetPaging();
                }}
              >
                Clear all
              </button>
            </div>
            {filters.map((g) => (
              <div key={g.key}>
                <div className="mdt-mb-0.5 mdt-mt-2.5 mdt-text-xs mdt-font-medium mdt-text-neutral-90">
                  {g.label}
                </div>
                {g.options.map((o) => {
                  const on = ticked[g.key]?.has(o) ?? false;
                  return (
                    <label
                      key={o}
                      className="mdt-flex mdt-min-h-[34px] mdt-cursor-pointer mdt-items-center mdt-gap-2.5 mdt-rounded-md mdt-px-1 mdt-text-[13px] mdt-font-medium mdt-text-neutral-130 hover:mdt-bg-neutral-10"
                    >
                      <Checkbox
                        className="mdt-border-neutral-40"
                        checked={on}
                        onCheckedChange={(v) => {
                          setTicked((t) => {
                            const s = new Set(t[g.key] ?? []);
                            if (v === true) s.add(o);
                            else s.delete(o);
                            return { ...t, [g.key]: s };
                          });
                          resetPaging();
                        }}
                      />
                      {o}
                    </label>
                  );
                })}
              </div>
            ))}
          </PopoverContent>
        </Popover>
      )}
      {/* THE ADVANCED FILTER'S DOOR (2026-09-24): conditions of key · operator · value,
          with groups, as the Users page built for itself on 2026-09-18 - now the table's
          own, so every list gets the same door, the same panel and the same count. The
          panel hangs under the door inside one relative box, as AdvancedFilter asks. */}
      {advancedFilter && (
        <span className="mdt-relative mdt-inline-flex">
          <ToolbarButton
            icon={<Icon name="funnel" />}
            count={advancedCount || undefined}
            activeLabel="applied"
            aria-expanded={advancedOpen}
            onClick={() => {
              setAdvancedOpen((o) => !o);
            }}
          >
            {advancedFilter.label ?? 'More filters'}
          </ToolbarButton>
          <AdvancedFilter<Row>
            open={advancedOpen}
            onClose={() => {
              setAdvancedOpen(false);
            }}
            keys={advancedFilter.keys}
            value={advanced}
            onApply={(next) => {
              /* the squares' ticks ride along into the applied rows, then the squares clear and hide (2026-09-26) */
              const folded = foldQuickIntoAdvanced(next, quick, quickFilters, advancedFilter.keys);
              setAdvanced(folded.advanced);
              setQuick(folded.quick);
              resetPaging();
            }}
            title={advancedFilter.title}
            width={advancedFilter.width}
          />
        </span>
      )}
      {/* ONE SQUARE PER QUICK FILTER, in the order the page gives them (Pranjal,
          2026-09-12: Status and Organisation side by side on Service accounts) -
          and NONE while an advanced filter is applied (Pranjal, 2026-09-26: "the
          quick filters won't be visible"; their keys live in the panel then). */}
      {shownQuickFilters.map((qf) => {
        const set = quick[qf.columnKey] ?? new Set<string>();
        return (
          <DropdownMenu
            key={qf.columnKey}
            onOpenChange={(o) => {
              if (!o) setQuickQuery((m) => ({ ...m, [qf.columnKey]: '' }));
              /* the search box takes focus once the menu has placed its own (Radix focuses the content on mount) */ else if (
                qf.searchable
              )
                window.setTimeout(() => quickSearchRefs.current[qf.columnKey]?.focus(), 0);
            }}
          >
            <DropdownMenuTrigger asChild>
              <ToolbarButton
                icon={
                  qf.icon ??
                  /* THE SQUARE WEARS THE COLUMN'S GLYPH (Pranjal, 2026-09-12: "the status
                       icon we used in users is different here"): one icon for the
                       filter, in the strip and in the heading it filters. */
                  allColumns.find((c) => c.key === qf.columnKey)?.glyph ?? (
                    <Icon name="check-circle" />
                  )
                }
                dot={set.size > 0}
                aria-label={qf.label}
                activeLabel="applied"
              />
            </DropdownMenuTrigger>
            {/* THE MENU IS AS WIDE AS ITS LONGEST NAME, up to 380 (Pranjal, 2026-09-17:
                "increase the width of the drop down. And truncate it after 40-50
                characters. But till then width should be flexible"): past 380 a name
                ends in an ellipsis and carries its full text as a title. A menu with a
                search box starts at 240 so the box has room; one without keeps 192. */}
            <DropdownMenuContent
              align="start"
              className={cn(
                'mdt-w-max mdt-max-w-[380px]',
                qf.searchable ? 'mdt-min-w-[240px]' : 'mdt-min-w-48'
              )}
            >
              {qf.searchable && (
                /* the search box (Pranjal, 2026-09-17: "it will contain search box as
                   well"): keys stay in the box - the menu's own type-ahead and arrow
                   handling would otherwise swallow them */
                <div
                  className="mdt-p-1 mdt-pb-2"
                  onKeyDown={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Input
                    ref={(el) => {
                      quickSearchRefs.current[qf.columnKey] = el;
                    }}
                    size="sm"
                    className="mdt-rounded-lg"
                    value={quickQuery[qf.columnKey] ?? ''}
                    onChange={(e) => {
                      setQuickQuery((m) => ({ ...m, [qf.columnKey]: e.target.value }));
                    }}
                    placeholder="Search"
                    aria-label={`Search ${qf.label.replace(/^Filter by /i, '')}`}
                    startAdornment={<Icon name="search" size={14} />}
                  />
                </div>
              )}
              {(() => {
                const needle = (quickQuery[qf.columnKey] ?? '').trim().toLowerCase();
                const shown = needle
                  ? qf.options.filter((o) => o.toLowerCase().includes(needle))
                  : qf.options;
                if (shown.length === 0) {
                  return (
                    <div className="mdt-px-2.5 mdt-py-2 mdt-text-[13px] mdt-text-neutral-60">
                      No matches
                    </div>
                  );
                }
                return shown.map((o) => (
                  <DropdownMenuCheckboxItem
                    key={o}
                    /* THE ROW CARRIES A CHECKBOX (Pranjal, 2026-09-12: "i need checkboxes
                         here"), as the Filters panel's rows do and as Users' quick filter
                         always has: a person sees at a glance which values are on and
                         that several can be. The menu's own tick, which only appears
                         once checked, is hidden in favour of the box. */
                    className="mdt-min-h-[34px] mdt-gap-2.5 mdt-pl-2 mdt-pr-2 mdt-text-[13px] mdt-font-medium [&>span:first-child]:mdt-hidden"
                    checked={set.has(o)}
                    onSelect={(e) => {
                      e.preventDefault();
                    }}
                    onCheckedChange={(v) => {
                      tickQuick(qf.columnKey, o, v);
                      resetPaging();
                    }}
                  >
                    <Checkbox
                      className="mdt-pointer-events-none mdt-border-neutral-40"
                      checked={set.has(o)}
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                    <span className="mdt-min-w-0 mdt-flex-1 mdt-truncate" title={o}>
                      {qf.renderOption ? qf.renderOption(o) : o}
                    </span>
                  </DropdownMenuCheckboxItem>
                ));
              })()}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
      <ToolbarSpacer />
      <ToolbarSection>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ToolbarButton
              icon={<Icon name="arrow-up-down" />}
              dot={sort.sort !== null}
              aria-label="Sort"
              activeLabel="applied"
            />
          </DropdownMenuTrigger>
          {/* THE USERS TABLE'S SORT MENU, to the number (Pranjal, 2026-09-17: "keep the sorting design element same as
           * users … other modules sort should look the same"): 220 wide, a SORT BY heading at 11/600 in the muted grey,
           * one row per field with the active one in the reading ink carrying ↑ or ↓, the rest in neutral-90, a
           * hairline, and Clear sort always there in the muted grey - live only while a sort is on. */}
          <DropdownMenuContent align="end" className="mdt-w-[220px]">
            <DropdownMenuLabel className="mdt-px-2.5 mdt-pb-1 mdt-pt-1.5 mdt-text-[11px] mdt-font-semibold mdt-uppercase mdt-tracking-[0.04em] mdt-text-neutral-50">
              Sort by
            </DropdownMenuLabel>
            {sortKeys.map((k) => (
              <DropdownMenuItem
                key={k}
                className={sortDir(k) ? undefined : 'mdt-text-neutral-90'}
                onSelect={() => {
                  sort.set(k, sortDir(k) === 'asc' ? 'desc' : 'asc');
                }}
              >
                {labelOf(k)}
                {sortDir(k) && (
                  <span
                    className="mdt-ml-auto"
                    aria-label={sortDir(k) === 'asc' ? 'ascending' : 'descending'}
                  >
                    {sortDir(k) === 'asc' ? '\u2191' : '\u2193'}
                  </span>
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="mdt-text-neutral-50"
              disabled={!sort.sort}
              onSelect={sort.clear}
            >
              Clear sort
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <TableColumnsPanel
          trigger={<ToolbarButton icon={<Icon name="columns" />} aria-label="Manage columns" />}
          {...columnsPanel({
            selectable,
            numbers,
            setNumbers,
            layout,
            labelOf,
            nameLabel: nameColumn.label ?? 'Name',
            hasActions,
          })}
        />
      </ToolbarSection>
    </>
  );

  return (
    <div className={cn('mdt-flex mdt-flex-col mdt-gap-4', className)}>
      {/* THE TOOLBAR CAN BE LEFT OFF (Pranjal, 2026-09-11). On a screen with a
          tab strip the page carries its own toolbar up there, and a second strip
          here would draw search, Filters, Sort and Columns twice. Everything
          inside the card is untouched either way. */}
      {toolbar === true && (
        /* INSET TO THE TABLE'S EDGE, not the strip's own (Pranjal, 2026-09-11:
           "toolbar spacing doesn't align with that of table"). A standalone
           Toolbar keeps the 24px inset ruled on 4 September; this one belongs
           to the table under it, so its controls sit flush with the card's own
           edges: the search box starts where the card's border starts, the last
           button ends where it ends. And it is only as tall as its controls —
           the 60px is the PAGE band's height, not this strip's — so the gap
           to the card is the plain 16px he asked for, not 14px of empty strip
           plus a gap. A table without its own toolbar leaves all of this to
           the page's structure. */
        <Toolbar label={`${label} controls`} className="mdt-h-auto mdt-px-0">
          {stripControls}
        </Toolbar>
      )}
      {/* OR DRAWN INTO THE PAGE'S OWN STRIP (Pranjal, 2026-09-12: "the table you
          pick from library would not come with toolbar, because there is no tab
          bar we will use the individual toolbar component"). A page without a
          tab strip keeps the 60px Toolbar band as page structure and hands the
          element in; the table places the same controls inside it, so search,
          Filters, the quick filter, Sort and Columns keep working, and stay one
          thing rather than a copy the page has to keep in step. */}
      {toolbar !== true && toolbar ? createPortal(stripControls, toolbar) : null}

      <Table
        ref={cardRef}
        label={label}
        divider={divider}
        docked={docked}
        style={tableMorphOf(docked).driven ? { height: maxHeight } : undefined}
      >
        <TableViewport
          ref={viewportRef}
          tableWidth={tableWidth}
          maxHeight={maxHeight}
          rowCount={sorted.length}
          refreshing={refreshing}
          hasSelection={selection.count > 0}
          label={label}
        >
          <TableColGroup widths={widths} tail={tailWidth} />
          <TableHeader>
            <tr>
              {selectable && <TableSelectAll state={pageState} onToggle={togglePage} frozen={0} />}
              {!selectable && numbers && <TableNumberHead frozen={0} />}
              <TableHead
                columnKey={NAME_KEY}
                label={nameColumn.label ?? 'Name'}
                width={nameWidth}
                frozen={nameLeft}
                frozenEdge={!hasActions}
                sortable={nameColumn.sortable ?? true}
                sort={sortDir(NAME_KEY)}
                onSort={() => {
                  sort.cycle(NAME_KEY);
                }}
                minWidth={nameMin}
                resizable
                onResize={(w) => {
                  resizeTo(NAME_KEY, Math.max(nameMin, w));
                }}
              />
              {hasActions && (
                <TableHead
                  columnKey="__action"
                  label="Action"
                  width={ACTION_WIDTH}
                  frozen={actionLeft}
                  frozenEdge
                  align="center"
                />
              )}
              {visible.map((c, i) => (
                <TableHead
                  key={c.key}
                  columnKey={c.key}
                  label={c.label}
                  width={widths[contentStart + i] ?? layout.widthOf(c.key)}
                  minWidth={c.minWidth ?? TABLE_COLUMN_MIN}
                  align={c.align ?? 'left'}
                  sortable={c.sortable ?? false}
                  sort={sortDir(c.key)}
                  onSort={() => {
                    sort.cycle(c.key);
                  }}
                  movable
                  onGripPointerDown={drag.gripPointerDown(c.key, c.label)}
                  onGripMove={(d) => {
                    layout.moveBy(c.key, d);
                  }}
                  menu={headMenu(c)}
                  glyph={c.glyph}
                  filtered={
                    !quickHidden &&
                    quickFilters.some(
                      (qf) => qf.columnKey === c.key && (quick[qf.columnKey]?.size ?? 0) > 0
                    )
                  }
                  dragging={drag.drag?.key === c.key}
                  resizable
                  onResize={(w) => {
                    resizeTo(c.key, w);
                  }}
                  onBoundaryHover={(h) => {
                    showInsert(c.key, h);
                  }}
                />
              ))}
              {tail && <TableTailCell head />}
            </tr>
          </TableHeader>
          {loading ? (
            <TableSkeleton widths={widths} />
          ) : (
            <TableBody>
              {!blankKind &&
                pageRows.map((row, i) => {
                  const id = getRowId(row);
                  const isInert = inert(row);
                  const picked = selection.isSelected(id);
                  return (
                    <TableRow
                      key={id}
                      selected={picked}
                      inert={isInert}
                      onOpen={
                        onRowOpen
                          ? () => {
                              onRowOpen(row);
                            }
                          : undefined
                      }
                      onToggle={
                        selectable
                          ? (extend) => {
                              selection.toggle(id, { extend, within: pageIds });
                            }
                          : undefined
                      }
                      onArrow={(d) => {
                        const tr =
                          viewportRef.current?.querySelector<HTMLTableRowElement>(
                            `tr.tbl-row:focus`
                          );
                        if (tr) focusSibling(tr, d);
                      }}
                    >
                      {selectable && (
                        <TableSelectionCell
                          index={rowIndex(i)}
                          selected={picked}
                          inert={isInert}
                          label={String(nameColumn.sortValue?.(row) ?? id)}
                          onToggle={(extend) => {
                            selection.toggle(id, { extend, within: pageIds });
                          }}
                          frozen={0}
                        />
                      )}
                      {!selectable && numbers && (
                        <TableNumberCell index={rowIndex(i)} inert={isInert} frozen={0} />
                      )}
                      <TableCell frozen={nameLeft} frozenEdge={!hasActions}>
                        {nameColumn.cell(row)}
                      </TableCell>
                      {hasActions && (
                        <TableCell frozen={actionLeft} frozenEdge align="center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                type="button"
                                className="mdt-inline-flex mdt-h-6 mdt-w-6 mdt-items-center mdt-justify-center mdt-rounded-lg mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-faint hover:mdt-bg-neutral-20 hover:mdt-text-neutral-90 data-[state=open]:mdt-bg-neutral-20 data-[state=open]:mdt-text-neutral-90"
                                aria-label="Row actions"
                                tabIndex={-1}
                              >
                                <Icon name="more-horizontal" size={16} strokeWidth={1.5} />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="mdt-w-48">
                              {rowActions(row)}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
                      {visible.map((c) => (
                        <TableCell
                          key={c.key}
                          align={c.align ?? 'left'}
                          dragging={drag.drag?.key === c.key}
                        >
                          {c.cell(row)}
                        </TableCell>
                      ))}
                      {tail && <TableTailCell />}
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
          {!loading &&
            !blankKind &&
            pagingState.mode === 'loadMore' &&
            pagingState.loaded < sorted.length && (
              <tbody>
                <tr>
                  <td colSpan={widths.length + 1} className="mdt-p-0">
                    <div ref={sentinelRef} className="mdt-h-px" />
                  </td>
                </tr>
              </tbody>
            )}
        </TableViewport>
        {!loading && blankKind && (
          <TableBlank
            kind={blankKind}
            title={blank?.[blankKind]?.title}
            body={blank?.[blankKind]?.body}
            action={blank?.[blankKind]?.action}
            onAction={
              blankKind === 'empty' || blank?.[blankKind]?.onAction ? blankAction : undefined
            }
          />
        )}
        {selectable && (
          <TableBulkBar count={selection.count} onClear={selection.clear}>
            {bulkActions([...selection.selected], selection.clear)}
          </TableBulkBar>
        )}
        {/* THE FOOTER EARNS ITS PLACE (Pranjal, 2026-09-11: "what's the need of
            pagination in blank states?" and "26 entries will create a second
            page. Then only pagination should be visible."). Nothing to page —
            loading, a blank state, a single page, everything already loaded —
            means no strip at all: six disabled controls under an empty table
            are furniture, and the blank state carries its own message. */}
        {!loading &&
          !blankKind &&
          pagingState.mode === 'loadMore' &&
          loadMoreWanted(pager, pagingState.loaded, sorted.length) && (
            <TableLoadMore
              shown={pagingState.loaded}
              total={sorted.length}
              noun={noun}
              loading={refreshing}
              onMore={pagingState.loadMore}
            />
          )}
        {!loading &&
          !blankKind &&
          pagingState.mode !== 'loadMore' &&
          pagerWanted(pager, sorted.length, pagingState.pageSize) && (
            <TablePager
              total={sorted.length}
              page={Math.min(pagingState.page, pagingState.pagesFor(sorted.length))}
              pageSize={pagingState.pageSize}
              pageSizes={pageSizes}
              onPage={(p) => {
                pagingState.setPage(p, sorted.length);
                if (viewportRef.current) viewportRef.current.scrollTop = 0;
              }}
              onPageSize={(s) => {
                pagingState.setPageSize(s, sorted.length);
              }}
              noun={noun}
            />
          )}
        {insert && layout.hidden.length > 0 && (
          <button
            ref={insertBtn}
            type="button"
            className="mdt-absolute mdt-z-[8] mdt-inline-flex mdt-h-5 mdt-w-5 -mdt-translate-x-1/2 -mdt-translate-y-1/2 mdt-items-center mdt-justify-center mdt-rounded-full mdt-border mdt-border-solid mdt-border-neutral-30 mdt-bg-background mdt-p-0 mdt-text-neutral-90 mdt-shadow-sm hover:mdt-border-neutral-90 hover:mdt-text-neutral-130"
            style={{ left: insert.x, top: insert.y }}
            aria-label={`Insert a column after ${labelOf(insert.key)}`}
            onPointerEnter={() => {
              if (insertTimer.current) clearTimeout(insertTimer.current);
            }}
            onPointerLeave={() => {
              showInsert(insert.key, false);
            }}
            onClick={() => {
              setInsertOpen(true);
            }}
          >
            <Icon name="plus" size={12} />
          </button>
        )}
        {insert && (
          <TableInsertPanel
            open={insertOpen}
            onOpenChange={(o) => {
              setInsertOpen(o);
              if (!o) setInsert(null);
            }}
            anchor={insertBtn.current}
            afterLabel={labelOf(insert.key)}
            hidden={layout.hidden.map((c) => ({ key: c.key, label: c.label }))}
            onPick={(k) => {
              layout.insertAfter(k, insert.key);
              setInsertOpen(false);
              setInsert(null);
            }}
          />
        )}
      </Table>

      {/* the "Choose what to select" popover is gone (Pranjal, 2026-09-26): the header checkbox selects the page, the
         bulk bar says how many - nothing else */}
      {drag.drag && (
        <>
          <div
            className="mdt-pointer-events-none mdt-fixed mdt-z-[40] mdt-inline-flex mdt-h-10 mdt-w-[200px] mdt-items-center mdt-gap-2.5 mdt-rounded-lg mdt-border mdt-border-solid mdt-border-neutral-30 mdt-bg-background mdt-pl-3 mdt-pr-4 mdt-text-[11px] mdt-leading-[1.5] mdt-text-neutral-90 mdt-shadow-[0_12px_32px_rgba(29,43,62,0.18)]"
            style={{ left: drag.drag.x - 20, top: drag.drag.y - 20 }}
            aria-hidden="true"
          >
            <Icon name="grip-vertical" size={14} className="mdt-text-neutral-40" />
            {drag.drag.label}
          </div>
          <div
            className="mdt-pointer-events-none mdt-fixed mdt-z-[39] mdt-w-0.5 mdt-bg-azure-60"
            style={{ left: drag.drag.lineX, top: drag.drag.lineTop, height: drag.drag.lineHeight }}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}

export { DataTable };
export type { KeyboardEvent };
