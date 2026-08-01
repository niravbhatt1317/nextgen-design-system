import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/utils';
import { Badge } from '../Badge';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table';
import { TableBulkBar } from './TableBulkBar';
import { TableColumnMenu } from './TableColumnMenu';
import { TableFilterChips } from './TableFilterChips';
import { TableFilterMenu } from './TableFilterMenu';
import { TableSortMenu } from './TableSortMenu';
import { TableToolbar, TableToolbarActions } from './TableToolbar';
import { TableViewMenu } from './TableViewMenu';
import { TableViewSwitcher } from './TableViewSwitcher';
import { useColumnReorder } from './useColumnReorder';
import { useSavedViews } from './useSavedViews';
import { useTableColumns } from './useTableColumns';
import { useTableFilters } from './useTableFilters';
import { useTablePagination } from './useTablePagination';
import { useTableSelection } from './useTableSelection';
import { useTableSort } from './useTableSort';
import type { DataTableProps, DataTableViewState } from './Table.types';

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
 * DataTable - the whole table, assembled.
 *
 * Everything under `Table` is deliberately state-free: `TableHead` reports that
 * a sort was asked for, `useTableSort` remembers it, and neither touches your
 * rows. That is right for a product with a server that already sorts, and
 * tiring for one with an array in memory - which is most of them, most of the
 * time.
 *
 * So this component does the work, and every piece of it can be switched off:
 *
 * - `manualSort`, `manualFilter`, `manualSearch`, `manualPagination` each hand
 *   that job back. A table backed by a paged API turns all four on and passes
 *   the rows it was given, and `DataTable` becomes a renderer.
 *
 * The parts remain exported and remain state-free. Nothing here is reachable
 * only through this component, so a product that outgrows it drops down a level
 * rather than forking.
 *
 * @example
 * ```tsx
 * <DataTable
 *   columns={[
 *     { key: 'id', label: 'ID', locked: true },
 *     { key: 'subject', label: 'Subject' },
 *   ]}
 *   rows={tickets}
 *   getRowId={(row) => row.id}
 * />
 * ```
 */
export function DataTable<Row>({
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
  savedViews = false,
  initialViews,
  initialViewId,
  onViewsChange,
  emptyMessage = 'Nothing to show.',
  filteredEmptyMessage = 'Nothing matches the current filters.',
  className,
  ...props
}: DataTableProps<Row>) {
  const cols = useTableColumns(columns);
  const sort = useTableSort();
  const filters = useTableFilters();
  const [query, setQuery] = useState('');
  const reorder = useColumnReorder({
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

  const pagination = useTablePagination({
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

  const selection = useTableSelection({ rowIds: sorted.map((row) => String(getRowId(row))) });

  // What a saved view is, here: the four things the toolbar can change.
  //
  // Not the page - a view is a way of looking at the table, and reopening one
  // on page 7 because that is where you were when you saved it is a surprise
  // rather than a convenience. Not the selection either, which belongs to the
  // rows rather than to the view.
  const viewState: DataTableViewState = useMemo(
    () => ({ columns: cols.state, sort: sort.rules, filters: filters.filters, query }),
    [cols.state, sort.rules, filters.filters, query]
  );

  const views = useSavedViews<DataTableViewState>({
    current: viewState,
    ...(initialViews ? { initial: initialViews } : {}),
    ...(initialViewId === undefined ? {} : { initialActiveId: initialViewId }),
    ...(onViewsChange ? { onChange: onViewsChange } : {}),
  });

  // One place that puts the table into a state, so applying a view and
  // discarding changes cannot drift apart - they are the same act aimed at the
  // same stored state.
  const restoreView = (state: DataTableViewState | null) => {
    if (state === null) return;
    cols.restore(state.columns);
    sort.restore(state.sort);
    filters.restore(state.filters);
    setQuery(state.query);
  };

  const visible = manualPagination ? sorted : pagination.slice(sorted);

  // "Nothing here" and "nothing matches" are different sentences, and telling
  // them apart is the difference between someone creating a record and someone
  // clearing a filter.
  const narrowed = query.trim() !== '' || filters.isActive;

  return (
    <div className={cn('mdt-flex mdt-flex-col mdt-gap-3', className)} {...props}>
      <TableToolbar>
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
          <TableFilterMenu
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

        <TableToolbarActions>
          {toolbarActions}
          {savedViews && (
            <TableViewSwitcher
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
          <TableSortMenu
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
          <TableViewMenu
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
        </TableToolbarActions>
      </TableToolbar>

      <TableFilterChips
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

      <Table containerClassName="mdt-rounded-md mdt-border">
        <TableHeader>
          <TableRow>
            {selectable && (
              <TableHead className="mdt-w-10">
                <Checkbox
                  checked={selection.headerState}
                  onCheckedChange={selection.toggleAll}
                  aria-label="Select all rows"
                />
              </TableHead>
            )}
            {cols.visible.map((column, index) => (
              <TableHead
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
                    <TableColumnMenu
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

                    `TableHead`'s own `sortable` wraps the whole cell in a
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
                      'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring',
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
                        size="sm"
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
                        'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring'
                      )}
                    >
                      <Icon name="grip-vertical" size="sm" aria-hidden />
                    </button>
                  )}
                </span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {visible.map((row) => {
            const rowId = String(getRowId(row));
            return (
              <TableRow key={rowId} selected={selectable && selection.isSelected(rowId)}>
                {selectable && (
                  <TableCell>
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
                  </TableCell>
                )}
                {cols.visible.map((column) => (
                  <TableCell
                    key={column.key}
                    columnKey={column.key}
                    frozen={column.frozen ? column.index : false}
                    style={reorder.styleFor(column.key)}
                  >
                    {renderCell === undefined
                      ? text(cellValue(row, column.key))
                      : renderCell(row, column.key)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
          {visible.length === 0 && (
            <TableRow interactive={false}>
              <TableCell colSpan={cols.visible.length + (selectable ? 1 : 0)} className="mdt-p-0">
                <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2 mdt-py-10">
                  <p className="mdt-text-sm mdt-text-muted-foreground">
                    {narrowed ? filteredEmptyMessage : emptyMessage}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectable && (
        <TableBulkBar count={selection.count} onClear={selection.clear}>
          {bulkActions?.(selection.selected)}
        </TableBulkBar>
      )}

      {!manualPagination && pagination.pageCount > 1 && (
        <div className="mdt-flex mdt-items-center mdt-justify-between mdt-text-sm">
          <span className="mdt-text-muted-foreground">
            {pagination.from + 1}–{pagination.to} of {total ?? sorted.length}
          </span>
          <span className="mdt-flex mdt-items-center mdt-gap-1">
            <button
              type="button"
              aria-label="Previous page"
              disabled={!pagination.hasPrevious}
              onClick={() => {
                pagination.previous();
                onPageChange?.(pagination.page - 1, pagination.pageSize);
              }}
              className="mdt-flex mdt-h-8 mdt-w-8 mdt-items-center mdt-justify-center mdt-rounded-md mdt-border mdt-border-border disabled:mdt-opacity-50"
            >
              <Icon name="chevron-left" size="sm" aria-hidden />
            </button>
            <span className="mdt-px-2 mdt-tabular-nums">
              {pagination.page} / {pagination.pageCount}
            </span>
            <button
              type="button"
              aria-label="Next page"
              disabled={!pagination.hasNext}
              onClick={() => {
                pagination.next();
                onPageChange?.(pagination.page + 1, pagination.pageSize);
              }}
              className="mdt-flex mdt-h-8 mdt-w-8 mdt-items-center mdt-justify-center mdt-rounded-md mdt-border mdt-border-border disabled:mdt-opacity-50"
            >
              <Icon name="chevron-right" size="sm" aria-hidden />
            </button>
          </span>
        </div>
      )}
    </div>
  );
}

DataTable.displayName = 'DataTable';
