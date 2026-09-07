import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/utils';
import { Badge } from '../Badge';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { Skeleton } from '../Skeleton';
import { Spinner } from '../Spinner';
import {
  TableOld,
  TableBodyOld,
  TableCellOld,
  TableHeadOld,
  TableHeaderOld,
  TableRowOld,
} from './TableOld';
import { TableBulkBarOld } from './TableBulkBar';
import { TableColumnMenuOld } from './TableColumnMenu';
import { TablePaginationOld } from './TablePagination';
import { TableFilterChipsOld } from './TableFilterChips';
import { TableFilterMenuOld } from './TableFilterMenu';
import { TableSortMenuOld } from './TableSortMenu';
import { TableToolbarOld, TableToolbarActionsOld } from './TableToolbar';
import { TableViewMenuOld } from './TableViewMenu';
import { TableViewSwitcherOld } from './TableViewSwitcher';
import { useColumnReorderOld } from './useColumnReorder';
import { useSavedViewsOld } from './useSavedViews';
import { useInfiniteScrollOld } from './useInfiniteScroll';
import { useTableColumnsOld } from './useTableColumns';
import { useTableFiltersOld } from './useTableFilters';
import { useTablePaginationOld } from './useTablePagination';
import { useTableSelectionOld } from './useTableSelection';
import { useTableSortOld } from './useTableSort';
import type { DataTableOldProps, DataTableViewStateOld } from './TableOld.types';

/**
 * How many skeleton rows a first load draws.
 *
 * Enough to read as a table rather than as one stray row, and few enough that
 * the real rows do not shorten the page when they land. Capped against the page
 * size so a five-row table does not flash twelve placeholders.
 */
const SKELETON_ROWS = 6;

/** The focus ring every bare control in here shares. */
const FOCUS_RING =
  'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring';

/** One cell's raw value. */
const cellValue = (row: unknown, key: string): unknown => (row as Record<string, unknown>)[key];

/**
 * A cell's value as text, for searching, filtering and the default render.
 *
 * Anything that is not a primitive comes back empty rather than as
 * `[object Object]`. A column holding an object has no text form this component
 * could invent - it needs `renderCell`, and printing a stringified object would
 * hide that behind something that looks like data.
 */
const text = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (value instanceof Date) return value.toISOString();
  return '';
};

/**
 * Compares two values the way a person expects a column to sort.
 *
 * Numbers numerically, everything else by locale - so "item 2" comes before
 * "item 10", which a plain string compare gets backwards. This is exactly the
 * kind of assumption a product may not share, which is why `manualSort` exists.
 */
const compare = (left: unknown, right: unknown): number => {
  if (left === right) return 0;
  if (left === null || left === undefined) return -1;
  if (right === null || right === undefined) return 1;
  if (typeof left === 'number' && typeof right === 'number') return left - right;
  // `text` rather than `String`: an object would otherwise sort as
  // "[object Object]", which puts every one of them together and looks like a
  // working sort.
  return text(left).localeCompare(text(right), undefined, { numeric: true });
};

/**
 * DataTableOld - the whole table, assembled.
 *
 * Everything under `TableOld` is deliberately state-free: `TableHeadOld` reports that
 * a sort was asked for, `useTableSortOld` remembers it, and neither touches your
 * rows. That is right for a product with a server that already sorts, and
 * tiring for one with an array in memory - which is most of them, most of the
 * time.
 *
 * So this component does the work, and every piece of it can be switched off:
 *
 * - `manualSort`, `manualFilter`, `manualSearch`, `manualPagination` each hand
 *   that job back. A table backed by a paged API turns all four on and passes
 *   the rows it was given, and `DataTableOld` becomes a renderer.
 *
 * The parts remain exported and remain state-free. Nothing here is reachable
 * only through this component, so a product that outgrows it drops down a level
 * rather than forking.
 *
 * @example
 * ```tsx
 * <DataTableOld
 *   columns={[
 *     { key: 'id', label: 'ID', locked: true },
 *     { key: 'subject', label: 'Subject' },
 *   ]}
 *   rows={tickets}
 *   getRowId={(row) => row.id}
 * />
 * ```
 *
 * @deprecated Since 0.4.0. Use `Table` / `DataTable`, now the merged console
 * Users table. This earlier family stays only for side-by-side comparison until
 * the removal pull request.
 */
export function DataTableOld<Row>({
  columns,
  rows,
  getRowId,
  renderCell,
  filterAttributes = [],
  searchable = true,
  searchPlaceholder = 'Search',
  manualSort = false,
  manualFilter = false,
  manualSearch = false,
  manualPagination = false,
  pageSize = 25,
  total,
  onSortChange,
  onFilterChange,
  onSearchChange,
  onPageChange,
  toolbarActions,
  selectable = false,
  bulkActions,
  columnControls = true,
  loading = false,
  infinite = false,
  hasMore = false,
  loadingMore = false,
  onLoadMore,
  rowsPerPage = false,
  pageSizes,
  savedViews = false,
  initialViews,
  initialViewId,
  onViewsChange,
  emptyMessage = 'Nothing to show.',
  filteredEmptyMessage = 'Nothing matches the current filters.',
  className,
  ...props
}: DataTableOldProps<Row>) {
  const cols = useTableColumnsOld(columns);
  const sort = useTableSortOld();
  const filters = useTableFiltersOld();
  const [query, setQuery] = useState('');
  const reorder = useColumnReorderOld({
    columns: cols.visible,
    frozenCount: cols.frozenCount,
    onMove: (key, to) => {
      cols.move(key, to);
    },
  });

  const searched = useMemo(() => {
    if (manualSearch || query.trim() === '') return rows;
    const needle = query.trim().toLowerCase();
    return rows.filter((row) =>
      cols.visible.some((column) => text(cellValue(row, column.key)).toLowerCase().includes(needle))
    );
  }, [rows, query, manualSearch, cols.visible]);

  const filtered = useMemo(() => {
    if (manualFilter || filters.filters.length === 0) return searched;
    // Values within an attribute are OR, attributes are AND - anything else and
    // "Status: Open, Resolved" could never match a thing.
    return searched.filter((row) =>
      filters.filters.every((filter) =>
        filter.values.includes(text(cellValue(row, filter.attribute)))
      )
    );
  }, [searched, filters.filters, manualFilter]);

  const sorted = useMemo(() => {
    if (manualSort || sort.rules.length === 0) return filtered;
    return [...filtered].sort((a, b) => {
      for (const rule of sort.rules) {
        const order = compare(cellValue(a, rule.column), cellValue(b, rule.column));
        if (order !== 0) return rule.direction === 'ascend' ? order : -order;
      }
      return 0;
    });
  }, [filtered, sort.rules, manualSort]);

  const pagination = useTablePaginationOld({
    total: total ?? sorted.length,
    pageSize,
  });

  // Back to the first page whenever the set of rows changes underneath.
  //
  // Narrowing a table while standing on page 4 leaves you looking at a slice of
  // something you did not ask for - or at "9-9 of 9", which is technically true
  // and reads as a fault.
  const { goTo } = pagination;
  useEffect(() => {
    goTo(1);
  }, [query, filters.filters, goTo]);

  const selection = useTableSelectionOld({ rowIds: sorted.map((row) => String(getRowId(row))) });

  // What a saved view is, here: the four things the toolbar can change.
  //
  // Not the page - a view is a way of looking at the table, and reopening one
  // on page 7 because that is where you were when you saved it is a surprise
  // rather than a convenience. Not the selection either, which belongs to the
  // rows rather than to the view.
  const viewState: DataTableViewStateOld = useMemo(
    () => ({ columns: cols.state, sort: sort.rules, filters: filters.filters, query }),
    [cols.state, sort.rules, filters.filters, query]
  );

  const views = useSavedViewsOld<DataTableViewStateOld>({
    current: viewState,
    ...(initialViews ? { initial: initialViews } : {}),
    ...(initialViewId === undefined ? {} : { initialActiveId: initialViewId }),
    ...(onViewsChange ? { onChange: onViewsChange } : {}),
  });

  // One place that puts the table into a state, so applying a view and
  // discarding changes cannot drift apart - they are the same act aimed at the
  // same stored state.
  const restoreView = (state: DataTableViewStateOld | null) => {
    if (state === null) return;
    cols.restore(state.columns);
    sort.restore(state.sort);
    filters.restore(state.filters);
    setQuery(state.query);
  };

  // Infinite scroll and the pager are alternatives, never both: two ways to
  // reach row 300 that disagree about which rows are loaded is a bug waiting to
  // be filed. Turning it on takes the pager's slicing off too - a list that
  // grows as you scroll has already been paged by whoever is fetching it.
  const paged = manualPagination || infinite;
  const visible = paged ? sorted : pagination.slice(sorted);

  const { sentinelRef } = useInfiniteScrollOld({
    hasMore,
    loading: loading || loadingMore,
    disabled: !infinite || onLoadMore === undefined,
    onLoadMore: onLoadMore ?? (() => undefined),
  });

  // Skeletons only when there is nothing to look at yet.
  //
  // Replacing a table someone is reading with placeholders on every keystroke
  // of a search is a flicker, and it throws away the rows that were probably
  // still right. With rows on screen, a refresh dims them and says so instead.
  const firstLoad = loading && visible.length === 0;
  const skeletonRows = Math.min(SKELETON_ROWS, pageSize);

  // "Nothing here" and "nothing matches" are different sentences, and telling
  // them apart is the difference between someone creating a record and someone
  // clearing a filter.
  const narrowed = query.trim() !== '' || filters.isActive;

  return (
    <div className={cn('mdt-flex mdt-flex-col mdt-gap-3', className)} {...props}>
      <TableToolbarOld>
        {searchable && (
          <Input
            type="search"
            size="sm"
            aria-label={searchPlaceholder}
            placeholder={searchPlaceholder}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              onSearchChange?.(event.target.value);
            }}
            className="mdt-w-48"
          />
        )}

        {filterAttributes.length > 0 && (
          <TableFilterMenuOld
            attributes={filterAttributes}
            valuesFor={filters.valuesFor}
            onToggleValue={(attribute, value) => {
              filters.toggleValue(attribute, value);
              onFilterChange?.(filters.filters);
            }}
            onClear={() => {
              filters.clear();
              onFilterChange?.([]);
            }}
            count={filters.count}
          />
        )}

        <TableToolbarActionsOld>
          {toolbarActions}
          {savedViews && (
            <TableViewSwitcherOld
              views={views.views.map((view) => ({ id: view.id, name: view.name }))}
              activeId={views.activeId}
              dirty={views.dirty}
              onApply={(id) => {
                restoreView(views.apply(id));
              }}
              onSave={views.save}
              onSaveAs={views.saveAs}
              onRename={views.rename}
              onRemove={views.remove}
              onReset={() => {
                restoreView(views.reset());
              }}
            />
          )}
          <TableSortMenuOld
            columns={cols.visible}
            rules={sort.rules}
            onSortBy={(column) => {
              sort.sortBy(column, 'ascend');
              onSortChange?.(sort.rules);
            }}
            onToggleDirection={(column) => {
              sort.sortBy(column, sort.directionOf(column) === 'ascend' ? 'descend' : 'ascend');
              onSortChange?.(sort.rules);
            }}
            onRemove={(column) => {
              sort.remove(column);
              onSortChange?.(sort.rules);
            }}
            onMove={sort.move}
            onClear={sort.clear}
          />
          <TableViewMenuOld
            columns={cols.columns.map((column) => ({
              key: column.key,
              label: column.label,
              visible: column.visible,
              ...(column.locked === true ? { locked: true } : {}),
            }))}
            onGroupBy={() => undefined}
            onToggleColumn={(key) => {
              if (cols.hidden.some((column) => column.key === key)) cols.show(key);
              else cols.hide(key);
            }}
          />
        </TableToolbarActionsOld>
      </TableToolbarOld>

      <TableFilterChipsOld
        filters={filters.filters}
        labelFor={(attribute) =>
          filterAttributes.find((item) => item.key === attribute)?.label ?? attribute
        }
        onRemove={(attribute) => {
          filters.remove(attribute);
          onFilterChange?.(filters.filters);
        }}
        onClear={filters.clear}
      />

      <TableOld containerClassName="mdt-rounded-md mdt-border">
        <TableHeaderOld>
          <TableRowOld>
            {selectable && (
              <TableHeadOld className="mdt-w-10">
                <Checkbox
                  checked={selection.headerState}
                  onCheckedChange={selection.toggleAll}
                  aria-label="Select all rows"
                />
              </TableHeadOld>
            )}
            {cols.visible.map((column, index) => (
              <TableHeadOld
                key={column.key}
                columnKey={column.key}
                frozen={column.frozen ? column.index : false}
                style={reorder.styleFor(column.key)}
                {...(columnControls
                  ? {
                      resizable: true,
                      insertColumns: cols.hidden,
                      onInsert: (key: string) => {
                        cols.show(key, index + 1);
                      },
                      insertLabel: `Insert a column after ${column.label}`,
                    }
                  : {})}
                className="mdt-group/col mdt-whitespace-nowrap"
              >
                <span className="mdt-flex mdt-w-full mdt-items-center mdt-gap-2">
                  {columnControls ? (
                    <TableColumnMenuOld
                      label={column.label}
                      align="start"
                      frozen={column.frozen}
                      canFreeze={cols.canFreeze(column.key)}
                      onToggleFreeze={() => {
                        if (column.frozen) cols.unfreeze(column.key);
                        else cols.freeze(column.key);
                      }}
                      {...(column.locked === true
                        ? {}
                        : {
                            onMoveToStart: () => {
                              cols.moveToStart(column.key);
                            },
                            onMoveToEnd: () => {
                              cols.moveToEnd(column.key);
                            },
                            onHide: () => {
                              cols.hide(column.key);
                            },
                          })}
                    />
                  ) : (
                    <span className="mdt-font-medium">{column.label}</span>
                  )}

                  {/*
                    A separate control from the name.

                    `TableHeadOld`'s own `sortable` wraps the whole cell in a
                    button, which cannot then contain the menu trigger or the
                    drag grip - every drag would sort, and a button inside a
                    button is invalid markup besides. So the name opens the
                    menu, the arrow sorts, the grip drags.
                  */}
                  <button
                    type="button"
                    aria-label={`Sort by ${column.label}`}
                    onClick={() => {
                      sort.toggle(column.key);
                      onSortChange?.(sort.rules);
                    }}
                    className={cn(
                      'mdt-flex mdt-items-center mdt-rounded-sm',
                      FOCUS_RING,
                      // Unsorted offers the control on hover; a sorted column
                      // always shows its badge, because that badge is not an
                      // offer - it is the answer to "how is this ordered".
                      sort.directionOf(column.key) === null &&
                        'mdt-opacity-0 mdt-transition-opacity focus-visible:mdt-opacity-100 group-hover/col:mdt-opacity-100'
                    )}
                  >
                    {sort.directionOf(column.key) === null ? (
                      <Icon
                        name="arrow-up-down"
                        className="mdt-h-3.5 mdt-w-3.5 mdt-opacity-50"
                        aria-hidden
                      />
                    ) : (
                      <Badge
                        tone="info"
                        shape="pill"
                        size="md"
                        icon={
                          <Icon
                            name={
                              sort.directionOf(column.key) === 'ascend' ? 'arrow-up' : 'arrow-down'
                            }
                            aria-hidden
                          />
                        }
                        className="mdt-tabular-nums"
                      >
                        {sort.rules.length > 1 ? sort.orderOf(column.key) : ''}
                      </Badge>
                    )}
                  </button>

                  {columnControls && !column.frozen && (
                    <button
                      type="button"
                      {...reorder.gripProps(column.key)}
                      className={cn(
                        'mdt-ml-auto mdt-cursor-grab mdt-touch-none mdt-rounded-sm',
                        'mdt-text-muted-foreground hover:mdt-text-foreground',
                        'mdt-opacity-0 mdt-transition-opacity',
                        'focus-visible:mdt-opacity-100 group-hover/col:mdt-opacity-100',
                        FOCUS_RING
                      )}
                    >
                      <Icon name="grip-vertical" size="sm" aria-hidden />
                    </button>
                  )}
                </span>
              </TableHeadOld>
            ))}
          </TableRowOld>
        </TableHeaderOld>
        <TableBodyOld
          // Dimmed while a refresh is in flight, so the rows read as "these are
          // about to change" rather than as the answer. `aria-busy` says the
          // same thing to a screen reader, which cannot see the dimming.
          aria-busy={loading || undefined}
          className={cn(loading && !firstLoad && 'mdt-opacity-60 mdt-transition-opacity')}
        >
          {firstLoad &&
            Array.from({ length: skeletonRows }, (_, index) => (
              <TableRowOld key={`skeleton-${String(index)}`} interactive={false}>
                {selectable && (
                  <TableCellOld>
                    <Skeleton className="mdt-h-4 mdt-w-4 mdt-rounded-sm" />
                  </TableCellOld>
                )}
                {cols.visible.map((column) => (
                  <TableCellOld key={column.key}>
                    {/*
                      Uneven widths, because a column of identical bars reads as
                      a loading graphic rather than as the table that is coming.
                    */}
                    {/*
                      A line of text tall, so a row of placeholders is the
                      height of the row it stands in for. A cell holding a badge
                      or an avatar is a few pixels taller than a line of text,
                      which no placeholder can know in advance - this is as
                      close as a component that has not seen your cells can get.
                    */}
                    <Skeleton
                      className={cn('mdt-h-5', index % 2 === 0 ? 'mdt-w-2/3' : 'mdt-w-1/2')}
                    />
                  </TableCellOld>
                ))}
              </TableRowOld>
            ))}
          {visible.map((row) => {
            const rowId = String(getRowId(row));
            return (
              <TableRowOld key={rowId} selected={selectable && selection.isSelected(rowId)}>
                {selectable && (
                  <TableCellOld>
                    {/*
                      The shift key arrives on the click, not the change:
                      `onCheckedChange` reports the new value and nothing about
                      the modifiers, and a range is what makes a long selection
                      bearable.
                    */}
                    <Checkbox
                      checked={selection.isSelected(rowId)}
                      onClick={(event) => {
                        selection.toggle(rowId, { extend: event.shiftKey });
                      }}
                      aria-label={`Select ${rowId}`}
                    />
                  </TableCellOld>
                )}
                {cols.visible.map((column) => (
                  <TableCellOld
                    key={column.key}
                    columnKey={column.key}
                    frozen={column.frozen ? column.index : false}
                    style={reorder.styleFor(column.key)}
                  >
                    {renderCell === undefined
                      ? text(cellValue(row, column.key))
                      : renderCell(row, column.key)}
                  </TableCellOld>
                ))}
              </TableRowOld>
            );
          })}
          {visible.length === 0 && !loading && (
            <TableRowOld interactive={false}>
              <TableCellOld
                colSpan={cols.visible.length + (selectable ? 1 : 0)}
                className="mdt-p-0"
              >
                <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2 mdt-py-10">
                  <p className="mdt-text-sm mdt-text-muted-foreground">
                    {narrowed ? filteredEmptyMessage : emptyMessage}
                  </p>
                </div>
              </TableCellOld>
            </TableRowOld>
          )}
          {infinite && hasMore && onLoadMore !== undefined && (
            <TableRowOld interactive={false}>
              <TableCellOld
                colSpan={cols.visible.length + (selectable ? 1 : 0)}
                className="mdt-p-0"
              >
                {/*
                  A button, not an empty div. Scrolling is not the only way
                  through a list - a keyboard user tabs here and a screen reader
                  user lands on it - and the same element serves the observer.
                */}
                <button
                  type="button"
                  ref={sentinelRef}
                  disabled={loadingMore}
                  onClick={onLoadMore}
                  className={cn(
                    'mdt-flex mdt-w-full mdt-items-center mdt-justify-center mdt-gap-2 mdt-py-4',
                    'mdt-text-sm mdt-text-muted-foreground hover:mdt-text-foreground',
                    FOCUS_RING
                  )}
                >
                  {loadingMore ? <Spinner size="sm" /> : null}
                  {loadingMore ? 'Loading more' : 'Load more'}
                </button>
              </TableCellOld>
            </TableRowOld>
          )}
        </TableBodyOld>
      </TableOld>

      {selectable && (
        <TableBulkBarOld count={selection.count} onClear={selection.clear}>
          {bulkActions?.(selection.selected)}
        </TableBulkBarOld>
      )}

      {!paged && (
        <TablePaginationOld
          page={pagination.page}
          pageCount={pagination.pageCount}
          from={pagination.from}
          to={pagination.to}
          total={total ?? sorted.length}
          pageSize={pagination.pageSize}
          {...(pageSizes ? { pageSizes } : {})}
          onPageChange={(next) => {
            pagination.goTo(next);
            onPageChange?.(next, pagination.pageSize);
          }}
          {...(rowsPerPage
            ? {
                onPageSizeChange: (size: number) => {
                  pagination.setPageSize(size);
                  onPageChange?.(pagination.page, size);
                },
              }
            : {})}
        />
      )}
    </div>
  );
}

DataTableOld.displayName = 'DataTableOld';
