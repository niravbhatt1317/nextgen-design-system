import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table';
import { TableColumnMenu } from './TableColumnMenu';
import { TableSortMenu } from './TableSortMenu';
import { TableToolbar, TableToolbarActions } from './TableToolbar';
import { TableViewMenu } from './TableViewMenu';
import { useColumnReorder } from './useColumnReorder';
import { useTableColumns } from './useTableColumns';
import { useTableSort } from './useTableSort';

/**
 * The toolbar - the controls that act on the whole table.
 *
 * Layer 5c. The line between this and the column menu is what each one acts on:
 * the column menu asks "what about this column", the toolbar asks "what should
 * this table show at all".
 *
 * As everywhere else in Table, **nothing here touches your rows.** The toolbar
 * reports that the user wants status ascending then priority descending; doing
 * it in memory or in a database query is the product's business, and a table
 * backed by a paged API could not work any other way. The story below sorts its
 * own rows to show the reporting is real.
 */
const meta: Meta = {
  title: 'Components/Table/Toolbar',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj;

type Key = 'id' | 'subject' | 'status' | 'priority' | 'assignee';

const sortableColumns: { key: Key; label: string }[] = [
  { key: 'id', label: 'ID' },
  { key: 'subject', label: 'Subject' },
  { key: 'status', label: 'Status' },
  { key: 'priority', label: 'Priority' },
  { key: 'assignee', label: 'Assignee' },
];

interface Ticket {
  id: string;
  subject: string;
  status: 'Open' | 'In Process' | 'Resolved';
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
}

const tickets: Ticket[] = [
  {
    id: 'TKT-245',
    subject: 'Network Connectivity Problem',
    status: 'Open',
    priority: 'High',
    assignee: 'Ada Lovelace',
  },
  {
    id: 'TKT-246',
    subject: 'VPN drops every few minutes',
    status: 'In Process',
    priority: 'High',
    assignee: 'Grace Hopper',
  },
  {
    id: 'TKT-247',
    subject: 'Printer queue stuck on floor 3',
    status: 'Open',
    priority: 'Low',
    assignee: 'Alan Turing',
  },
  {
    id: 'TKT-248',
    subject: 'Password reset for contractor',
    status: 'Resolved',
    priority: 'Medium',
    assignee: 'Katherine Johnson',
  },
  {
    id: 'TKT-249',
    subject: 'Laptop will not wake from sleep',
    status: 'Open',
    priority: 'Medium',
    assignee: 'Ada Lovelace',
  },
];

const STATUS_TONE = { Open: 'info', 'In Process': 'warning', Resolved: 'success' } as const;

/** Ranked, not alphabetical: "High" sorting above "Low" is an accident of the alphabet. */
const PRIORITY_RANK = { High: 0, Medium: 1, Low: 2 } as const;

const valueOf = (ticket: Ticket, key: Key): string | number =>
  key === 'priority' ? PRIORITY_RANK[ticket.priority] : ticket[key];

/**
 * The whole toolbar, wired to real state.
 *
 * Worth trying:
 *
 * - **Sort by two columns.** Open the sort menu, choose Status, then Priority.
 *   The headers show **1** and **2** beside their arrows - with two sorts an
 *   arrow alone says both are sorted and nothing about which wins, and people
 *   reasonably assume the leftmost column decides.
 * - **Reorder the stack.** Move Priority above Status and the table changes,
 *   because status-then-priority is a different table from priority-then-status.
 * - **Click a header's arrow three times.** Ascending, descending, gone. Without
 *   that last step there is no way to stop sorting from the column itself.
 */
export const Toolbar: Story = {
  render: function ToolbarDemo() {
    const sort = useTableSort<Key>();
    const cols = useTableColumns<Key>(sortableColumns);
    const reorder = useColumnReorder({
      columns: cols.visible,
      frozenCount: cols.frozenCount,
      onMove: (key, to) => {
        cols.move(key, to);
      },
    });
    const [query, setQuery] = useState('');
    const [groupBy, setGroupBy] = useState<Key | null>(null);

    const rows = useMemo(() => {
      const matched = tickets.filter((ticket) =>
        query.trim() === ''
          ? true
          : `${ticket.id} ${ticket.subject} ${ticket.assignee}`
              .toLowerCase()
              .includes(query.trim().toLowerCase())
      );
      if (sort.rules.length === 0) return matched;
      return [...matched].sort((a, b) => {
        for (const rule of sort.rules) {
          const left = valueOf(a, rule.column);
          const right = valueOf(b, rule.column);
          if (left === right) continue;
          const order = left < right ? -1 : 1;
          return rule.direction === 'ascend' ? order : -order;
        }
        return 0;
      });
    }, [query, sort.rules]);

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <TableToolbar label="Ticket controls">
          <Input
            type="search"
            aria-label="Search tickets"
            placeholder="Search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            className="mdt-w-56"
          />
          <Button variant="outline" size="sm">
            <Icon name="list-filter" size="sm" aria-hidden />
            Filters
          </Button>

          <TableToolbarActions>
            <TableSortMenu
              columns={cols.visible}
              rules={sort.rules}
              onSortBy={(column) => {
                sort.sortBy(column as Key, 'ascend');
              }}
              onToggleDirection={(column) => {
                const current = sort.directionOf(column as Key);
                sort.sortBy(column as Key, current === 'ascend' ? 'descend' : 'ascend');
              }}
              onRemove={(column) => {
                sort.remove(column as Key);
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
              groupBy={groupBy}
              onGroupBy={(key) => {
                setGroupBy(key as Key | null);
              }}
              onToggleColumn={(key) => {
                if (cols.hidden.some((column) => column.key === key)) cols.show(key as Key);
                else cols.hide(key as Key);
              }}
              onShowAll={() => {
                cols.hidden.forEach((column) => {
                  cols.show(column.key);
                });
              }}
              onHideAll={() => {
                // The first column stays: a table with no columns is not a view
                // of anything, and there would be nothing left to click.
                cols.visible.slice(1).forEach((column) => {
                  cols.hide(column.key);
                });
              }}
            />
            <Button
              variant="outline"
              size="sm"
              className="mdt-w-8 mdt-px-0"
              aria-label="Download CSV"
            >
              <Icon name="download" size="sm" aria-hidden />
            </Button>
          </TableToolbarActions>
        </TableToolbar>

        <Table containerClassName="mdt-rounded-md mdt-border">
          <TableHeader>
            <TableRow>
              {cols.visible.map((column, index) => {
                const rank = sort.orderOf(column.key);
                const direction = sort.directionOf(column.key);
                return (
                  <TableHead
                    key={column.key}
                    columnKey={column.key}
                    frozen={column.frozen ? column.index : false}
                    style={reorder.styleFor(column.key)}
                    resizable
                    insertColumns={cols.hidden}
                    onInsert={(key) => {
                      cols.show(key as Key, index + 1);
                    }}
                    insertLabel={`Insert a column after ${column.label}`}
                    className="mdt-group/col mdt-whitespace-nowrap"
                  >
                    {/*
                      Three separate controls rather than one.

                      `TableHead`'s own `sortable` wraps the whole cell in a
                      button, which is right for a table whose header only
                      sorts. Here the header does three jobs, and one button
                      cannot hold the other two - nesting a menu trigger and a
                      drag grip inside a sort button makes every drag a sort and
                      is invalid markup besides.

                      So: the name opens the menu, the arrow sorts, the grip
                      drags.
                    */}
                    <span className="mdt-flex mdt-w-full mdt-items-center mdt-gap-2">
                      <TableColumnMenu
                        label={column.label}
                        align="start"
                        frozen={column.frozen}
                        canFreeze={cols.canFreeze(column.key)}
                        onToggleFreeze={() => {
                          if (column.frozen) cols.unfreeze(column.key);
                          else cols.freeze(column.key);
                        }}
                        onMoveToStart={() => {
                          cols.moveToStart(column.key);
                        }}
                        onMoveToEnd={() => {
                          cols.moveToEnd(column.key);
                        }}
                        onHide={() => {
                          cols.hide(column.key);
                        }}
                      />

                      <button
                        type="button"
                        aria-label={`Sort by ${column.label}`}
                        onClick={() => {
                          sort.toggle(column.key);
                        }}
                        className={[
                          'mdt-flex mdt-items-center mdt-rounded-sm',
                          'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring',
                          // An unsorted column only offers the control on
                          // hover; a sorted one always shows its badge, because
                          // that badge is not an offer, it is the answer to
                          // "how is this table ordered".
                          direction === null
                            ? 'mdt-opacity-0 mdt-transition-opacity focus-visible:mdt-opacity-100 group-hover/col:mdt-opacity-100'
                            : '',
                        ].join(' ')}
                      >
                        {/*
                          A sorted column always wears the badge; the rank only
                          appears once there is more than one sort, because a
                          lone "1" is noise. An unsorted column stays a faded
                          arrow - a badge on every column would make the header
                          a row of chips and say nothing.
                        */}
                        {direction === null ? (
                          <Icon
                            name="arrow-up-down"
                            // 14px: between the scale's 12 and 16, which is
                            // where it sits right against a `sm` badge. Sizing
                            // has no tokens, so a standard step is the correct
                            // thing to reach for.
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
                                name={direction === 'ascend' ? 'arrow-up' : 'arrow-down'}
                                aria-hidden
                              />
                            }
                            className="mdt-tabular-nums"
                          >
                            {sort.rules.length > 1 ? rank : ''}
                          </Badge>
                        )}
                      </button>

                      {!column.frozen && (
                        <button
                          type="button"
                          {...reorder.gripProps(column.key)}
                          className={[
                            // Hard right, clear of the label and the sort
                            // control - and clear of the resize line, which
                            // owns the last 8px of the cell.
                            'mdt-ml-auto mdt-mr-2 mdt-cursor-grab mdt-touch-none mdt-rounded-sm',
                            'mdt-text-muted-foreground hover:mdt-text-foreground',
                            'mdt-opacity-0 mdt-transition-opacity',
                            'focus-visible:mdt-opacity-100 group-hover/col:mdt-opacity-100',
                            'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring',
                          ].join(' ')}
                        >
                          <Icon name="grip-vertical" size="sm" aria-hidden />
                        </button>
                      )}
                    </span>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((ticket) => (
              <TableRow key={ticket.id}>
                {cols.visible.map((column) => (
                  <TableCell
                    key={column.key}
                    columnKey={column.key}
                    frozen={column.frozen ? column.index : false}
                    style={reorder.styleFor(column.key)}
                    className={column.key === 'id' ? 'mdt-font-medium' : undefined}
                  >
                    {column.key === 'status' ? (
                      <Badge tone={STATUS_TONE[ticket.status]} shape="square" size="sm" dot>
                        {ticket.status}
                      </Badge>
                    ) : (
                      ticket[column.key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow interactive={false}>
                <TableCell
                  colSpan={5}
                  className="mdt-py-8 mdt-text-center mdt-text-muted-foreground"
                >
                  Nothing matches “{query}”.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <p className="mdt-text-xs mdt-text-muted-foreground">
          {groupBy !== null &&
            `Grouped by ${sortableColumns.find((c) => c.key === groupBy)?.label ?? groupBy}. `}
          {sort.rules.length === 0
            ? 'Unsorted.'
            : `Sorted by ${sort.rules
                .map(
                  (rule) =>
                    `${sortableColumns.find((c) => c.key === rule.column)?.label ?? rule.column} ${rule.direction === 'ascend' ? '↑' : '↓'}`
                )
                .join(', then ')}.`}
        </p>
      </div>
    );
  },
};
