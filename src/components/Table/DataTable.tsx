import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../DropdownMenu';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Checkbox } from '../Checkbox';
import { Toolbar, ToolbarButton, ToolbarSection, ToolbarSpacer } from '../Toolbar';
import {
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
import { TableScopeMenu } from './TableScopeMenu';
import { TableBlank, TableSkeleton } from './TableStates';
import { useColumnDrag } from './useColumnDrag';
import { useTableColumns } from './useTableColumns';
import { useTablePaging } from './useTablePaging';
import { useTableSelection } from './useTableSelection';
import { useTableSort } from './useTableSort';
import type { DataTableProps } from './DataTable.types';
import type { TableColumnDef, TableSortDirection } from './Table.types';

const ACTION_WIDTH = 100;
const NAME_KEY = '__name';
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
  };
  const lockedNames = [nameLabel, ...(hasActions ? ['Action'] : [])];
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
 */
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
  sortFields,
  pageSize = 25,
  pageSizes,
  paging = 'pages',
  storageKey,
  bulkActions,
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
  const [quick, setQuick] = useState<Set<string>>(() => new Set());
  const [ticked, setTicked] = useState<Record<string, Set<string>>>({});
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
  const [scopeAnchor, setScopeAnchor] = useState<HTMLElement | null>(null);
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
    return rows.filter((row) => {
      if (q && search && !search.match(row, q)) return false;
      if (quickFilter && quick.size > 0 && !quick.has(quickFilter.value(row))) return false;
      for (const g of filters) {
        const s = ticked[g.key];
        if (s && s.size > 0 && !g.match(row, s)) return false;
      }
      return true;
    });
  }, [rows, query, search, quickFilter, quick, filters, ticked]);
  const sorted = useMemo(() => sort.apply(filtered, allColumns), [sort, filtered, allColumns]);
  const pageRows = useMemo(() => pagingState.slice(sorted), [pagingState, sorted]);
  const inert = useCallback((row: Row) => isRowInert?.(row) ?? false, [isRowInert]);
  const pageIds = useMemo(
    () => pageRows.filter((r) => !inert(r)).map(getRowId),
    [pageRows, inert, getRowId]
  );
  const allIds = useMemo(
    () => sorted.filter((r) => !inert(r)).map(getRowId),
    [sorted, inert, getRowId]
  );
  const selectable = bulkActions !== undefined;
  /** The first column: checkboxes when there is selection, plain numbers otherwise (unless hidden). */
  const leading = selectable || numbers;
  const hasFiltering = query.trim() !== '' || quick.size > 0 || filterCount > 0;

  const resetPaging = pagingState.reset;
  const onQuery = (v: string) => {
    setQuery(v);
    resetPaging();
  };

  // ── widths and offsets ──
  const nameWidth = nameColumn.width ?? TABLE_COLUMN_WIDTH;
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
  const widths = useMemo(() => {
    const covered = baseWidths.reduce((a, b) => a + b, 0) + TABLE_GUTTER;
    const content = baseWidths.length - contentStart;
    const spare = viewportWidth - covered;
    if (spare <= 0 || content <= 0) return baseWidths;
    const share = spare / content;
    return baseWidths.map((w, i) => (i >= contentStart ? w + share : w));
  }, [baseWidths, contentStart, viewportWidth]);
  const tableWidth = widths.reduce((a, b) => a + b, 0) + TABLE_GUTTER;
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
    setQuick(new Set());
    setTicked({});
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
            <Icon
              name="arrow-up-narrow-wide"
              size={16}
              className="mdt-mr-2 mdt-text-neutral-90 dark:mdt-text-neutral-40"
            />
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
              className="mdt-mr-2 mdt-text-neutral-90 dark:mdt-text-neutral-40"
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
        <Icon
          name="eye-off"
          size={16}
          className="mdt-mr-2 mdt-text-neutral-90 dark:mdt-text-neutral-40"
        />
        Hide column
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() => {
          layout.moveToStart(c.key);
        }}
      >
        <Icon
          name="chevrons-left"
          size={16}
          className="mdt-mr-2 mdt-text-neutral-90 dark:mdt-text-neutral-40"
        />
        Move to start
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() => {
          layout.moveToEnd(c.key);
        }}
      >
        <Icon
          name="chevrons-right"
          size={16}
          className="mdt-mr-2 mdt-text-neutral-90 dark:mdt-text-neutral-40"
        />
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
              <span className="mdt-text-base mdt-font-semibold mdt-text-neutral-130 dark:mdt-text-neutral-10">
                Filters
              </span>
              <button
                type="button"
                className="-mdt-mr-1.5 mdt-rounded-md mdt-border-0 mdt-bg-transparent mdt-px-1.5 mdt-py-0.5 mdt-text-[13px] mdt-font-medium mdt-text-neutral-90 hover:mdt-bg-neutral-10 dark:mdt-text-neutral-40 dark:hover:mdt-bg-neutral-130"
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
                <div className="mdt-mb-0.5 mdt-mt-2.5 mdt-text-xs mdt-font-medium mdt-text-neutral-90 dark:mdt-text-neutral-40">
                  {g.label}
                </div>
                {g.options.map((o) => {
                  const on = ticked[g.key]?.has(o) ?? false;
                  return (
                    <label
                      key={o}
                      className="mdt-flex mdt-min-h-[34px] mdt-cursor-pointer mdt-items-center mdt-gap-2.5 mdt-rounded-md mdt-px-1 mdt-text-[13px] mdt-font-medium mdt-text-neutral-130 hover:mdt-bg-neutral-10 dark:mdt-text-neutral-10 dark:hover:mdt-bg-neutral-130"
                    >
                      <Checkbox
                        className="mdt-border-neutral-40 dark:mdt-border-neutral-90"
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
      {quickFilter && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ToolbarButton
              icon={
                quickFilter.icon ??
                /* THE SQUARE WEARS THE COLUMN'S GLYPH (Pranjal, 2026-09-12: "the status
                       icon we used in users is different here"): one icon for the
                       filter, in the strip and in the heading it filters. */
                allColumns.find((c) => c.key === quickFilter.columnKey)?.glyph ?? (
                  <Icon name="check-circle" />
                )
              }
              dot={quick.size > 0}
              aria-label={quickFilter.label}
              activeLabel="applied"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="mdt-w-48">
            {quickFilter.options.map((o) => (
              <DropdownMenuCheckboxItem
                key={o}
                /* THE ROW CARRIES A CHECKBOX (Pranjal, 2026-09-12: "i need checkboxes
                       here"), as the Filters panel's rows do and as Users' quick filter
                       always has: a person sees at a glance which values are on and
                       that several can be. The menu's own tick, which only appears
                       once checked, is hidden in favour of the box. */
                className="mdt-min-h-[34px] mdt-gap-2.5 mdt-pl-2 mdt-pr-2 mdt-text-[13px] mdt-font-medium [&>span:first-child]:mdt-hidden"
                checked={quick.has(o)}
                onSelect={(e) => {
                  e.preventDefault();
                }}
                onCheckedChange={(v) => {
                  setQuick((s) => {
                    const n = new Set(s);
                    if (v) n.add(o);
                    else n.delete(o);
                    return n;
                  });
                  resetPaging();
                }}
              >
                <Checkbox
                  className="mdt-pointer-events-none mdt-border-neutral-40 dark:mdt-border-neutral-90"
                  checked={quick.has(o)}
                  tabIndex={-1}
                  aria-hidden="true"
                />
                {quickFilter.renderOption ? quickFilter.renderOption(o) : o}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
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
          <DropdownMenuContent align="end" className="mdt-w-48">
            {sortKeys.map((k) => (
              <DropdownMenuItem
                key={k}
                onSelect={() => {
                  sort.set(k, sortDir(k) === 'asc' ? 'desc' : 'asc');
                }}
              >
                {labelOf(k)}
                {sortDir(k) && (
                  <span className="mdt-ml-auto mdt-text-xs mdt-text-muted-foreground">
                    {sortDir(k) === 'asc' ? 'A to Z' : 'Z to A'}
                  </span>
                )}
              </DropdownMenuItem>
            ))}
            {sort.sort && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={sort.clear}>Clear sort</DropdownMenuItem>
              </>
            )}
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
          <TableColGroup widths={widths} />
          <TableHeader>
            <tr>
              {selectable && (
                <TableSelectAll
                  state={pageState}
                  onToggle={togglePage}
                  onScope={setScopeAnchor}
                  frozen={0}
                />
              )}
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
              {visible.map((c) => (
                <TableHead
                  key={c.key}
                  columnKey={c.key}
                  label={c.label}
                  width={layout.widthOf(c.key)}
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
                  filtered={quickFilter?.columnKey === c.key && quick.size > 0}
                  dragging={drag.drag?.key === c.key}
                  resizable
                  onResize={(w) => {
                    layout.setWidth(c.key, w);
                  }}
                  onBoundaryHover={(h) => {
                    showInsert(c.key, h);
                  }}
                />
              ))}
              <TableTailCell head />
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
                                className="mdt-inline-flex mdt-h-7 mdt-w-7 mdt-items-center mdt-justify-center mdt-rounded-lg mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-muted-foreground hover:mdt-bg-neutral-20 hover:mdt-text-neutral-90 data-[state=open]:mdt-bg-neutral-20 data-[state=open]:mdt-text-neutral-90 dark:hover:mdt-bg-neutral-120 dark:hover:mdt-text-neutral-40 dark:data-[state=open]:mdt-bg-neutral-120 dark:data-[state=open]:mdt-text-neutral-40"
                                aria-label="Row actions"
                                tabIndex={-1}
                              >
                                <Icon name="more-horizontal" size={20} />
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
                      <TableTailCell />
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
          <TableBulkBar count={selection.count} onScope={setScopeAnchor} onClear={selection.clear}>
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
            className="mdt-absolute mdt-z-[8] mdt-inline-flex mdt-h-5 mdt-w-5 -mdt-translate-x-1/2 -mdt-translate-y-1/2 mdt-items-center mdt-justify-center mdt-rounded-full mdt-border mdt-border-solid mdt-border-neutral-30 mdt-bg-background mdt-p-0 mdt-text-neutral-90 mdt-shadow-sm hover:mdt-border-neutral-90 hover:mdt-text-neutral-130 dark:mdt-border-neutral-110 dark:mdt-text-neutral-40 dark:hover:mdt-text-neutral-10"
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

      {selectable && (
        <TableScopeMenu
          open={scopeAnchor !== null}
          onOpenChange={(o) => {
            if (!o) setScopeAnchor(null);
          }}
          anchor={scopeAnchor}
          pageCount={pageIds.length}
          allCount={allIds.length}
          noun={noun}
          onApply={(scope, n) => {
            selection.setAll(
              scope === 'page' ? pageIds : scope === 'all' ? allIds : allIds.slice(0, n)
            );
          }}
        />
      )}

      {drag.drag && (
        <>
          <div
            className="mdt-pointer-events-none mdt-fixed mdt-z-[40] mdt-inline-flex mdt-h-10 mdt-w-[200px] mdt-items-center mdt-gap-2.5 mdt-rounded-lg mdt-border mdt-border-solid mdt-border-neutral-30 mdt-bg-background mdt-pl-3 mdt-pr-4 mdt-text-[11px] mdt-leading-[1.5] mdt-text-neutral-90 mdt-shadow-[0_12px_32px_rgba(29,43,62,0.18)] dark:mdt-border-neutral-110 dark:mdt-text-neutral-40"
            style={{ left: drag.drag.x - 20, top: drag.drag.y - 20 }}
            aria-hidden="true"
          >
            <Icon
              name="grip-vertical"
              size={14}
              className="mdt-text-neutral-40 dark:mdt-text-neutral-90"
            />
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
