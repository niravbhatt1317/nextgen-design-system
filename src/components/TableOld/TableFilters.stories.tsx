import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Input } from '../Input';
import {
  TableOld,
  TableBodyOld,
  TableCellOld,
  TableHeadOld,
  TableHeaderOld,
  TableRowOld,
} from './TableOld';
import { TableFilterChipsOld } from './TableFilterChips';
import { TableFilterMenuOld } from './TableFilterMenu';
import { TableToolbarOld, TableToolbarActionsOld } from './TableToolbar';
import { toCsvOld } from './toCsv';
import { useTableFiltersOld } from './useTableFilters';

/**
 * Narrowing a table, and saying so.
 *
 * Layer 5e. `useTableFiltersOld` holds which attributes are narrowed and to what;
 * `TableFilterMenuOld` picks them; `TableFilterChipsOld` says what is active.
 *
 * As everywhere else in TableOld, **nothing here touches your rows.** The hook
 * reports "status is Open or In Process"; turning that into a predicate or a
 * `WHERE` clause is the product's business. The story filters its own rows to
 * show the reporting is real.
 *
 * **It stops at attribute-and-values.** Operators - is not, contains, before,
 * between - are a query builder, which is a feature in its own right rather
 * than a table control. Half of one built here would settle its shape by
 * accident.
 */
const meta: Meta = {
  title: 'Deprecated/Table Old Filters',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj;

type Key = 'status' | 'priority' | 'assignee';

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

const attributes = [
  { key: 'status', label: 'Status', values: ['Open', 'In Process', 'Resolved'] },
  { key: 'priority', label: 'Priority', values: ['High', 'Medium', 'Low'] },
  {
    key: 'assignee',
    label: 'Assignee',
    values: ['Ada Lovelace', 'Grace Hopper', 'Alan Turing', 'Katherine Johnson'],
  },
];

const labelFor = (key: string) => attributes.find((a) => a.key === key)?.label ?? key;

/**
 * Worth trying:
 *
 * - **Filter by two statuses.** They become one chip, not two - "Status: Open,
 *   In Process" is a single condition, and splitting it would read as two
 *   filters that both have to be true.
 * - **Untick the last value.** The filter disappears rather than sitting there
 *   empty: an attribute filtered to nothing matches everything.
 * - **The quick filters** are the same state by another route. "Mine" and
 *   "High priority" are shortcuts to filters people set constantly, and they
 *   show as chips like anything else - a shortcut that hides what it did is
 *   how a table starts looking broken.
 */
export const Filters: Story = {
  render: function FiltersDemo() {
    const filters = useTableFiltersOld<Key>();
    const [query, setQuery] = useState('');
    const [exported, setExported] = useState<string | null>(null);

    const rows = useMemo(
      () =>
        tickets.filter((ticket) => {
          const matchesQuery =
            query.trim() === '' ||
            `${ticket.id} ${ticket.subject}`.toLowerCase().includes(query.trim().toLowerCase());
          // Values within an attribute are OR, attributes are AND. Anything
          // else and "Status: Open, Resolved" could never match anything.
          const matchesFilters = filters.filters.every((filter) =>
            filter.values.includes(ticket[filter.attribute])
          );
          return matchesQuery && matchesFilters;
        }),
      [query, filters.filters]
    );

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <TableToolbarOld label="Ticket controls">
          <Input
            type="search"
            aria-label="Search tickets"
            placeholder="Search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            size="sm"
            className="mdt-w-48"
          />

          <TableFilterMenuOld
            attributes={attributes}
            valuesFor={(attribute) => filters.valuesFor(attribute as Key)}
            onToggleValue={(attribute, value) => {
              filters.toggleValue(attribute as Key, value);
            }}
            onClear={filters.clear}
            count={filters.count}
          />

          {/*
            Separate buttons rather than a segmented group. A switcher says its
            options are alternatives - pick one of these - and these are neither
            exclusive nor a set: each one is an independent shortcut to a filter
            people set constantly, and it belongs beside Filters as one more
            control of the same kind.

            They light up the same way Filters does when active, because they
            are the same state by another route: two controls disagreeing about
            whether something is filtered is worse than one.
          */}
          {[
            {
              key: 'assignee' as const,
              value: 'Ada Lovelace',
              label: 'Mine',
              icon: 'user' as const,
            },
            { key: 'priority' as const, value: 'High', label: 'High', icon: 'flag' as const },
          ].map((quick) => {
            const on = filters.valuesFor(quick.key).includes(quick.value);
            return (
              <Button
                key={quick.label}
                variant="outline"
                size="sm"
                aria-pressed={on}
                className={on ? 'mdt-border-primary' : ''}
                onClick={() => {
                  filters.toggleValue(quick.key, quick.value);
                }}
              >
                <Icon name={quick.icon} size="sm" aria-hidden />
                {quick.label}
              </Button>
            );
          })}

          <TableToolbarActionsOld>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Only what is on screen. A table backed by a paged API has
                // rows the browser has never seen, and calling that "export"
                // is a lie.
                const csv = toCsvOld(rows, [
                  { label: 'ID', value: (row) => row.id },
                  { label: 'Subject', value: (row) => row.subject },
                  { label: 'Status', value: (row) => row.status },
                  { label: 'Priority', value: (row) => row.priority },
                  { label: 'Assignee', value: (row) => row.assignee },
                ]);
                setExported(`${String(csv.split('\r\n').length - 1)} rows exported`);
              }}
            >
              <Icon name="download" size="sm" aria-hidden />
              Export
            </Button>
          </TableToolbarActionsOld>
        </TableToolbarOld>

        <TableFilterChipsOld
          filters={filters.filters}
          labelFor={labelFor}
          onRemove={(attribute) => {
            filters.remove(attribute as Key);
          }}
          onClear={filters.clear}
        />

        <TableOld containerClassName="mdt-rounded-md mdt-border">
          <TableHeaderOld>
            <TableRowOld>
              <TableHeadOld>ID</TableHeadOld>
              <TableHeadOld>Subject</TableHeadOld>
              <TableHeadOld>Status</TableHeadOld>
              <TableHeadOld>Priority</TableHeadOld>
              <TableHeadOld>Assignee</TableHeadOld>
            </TableRowOld>
          </TableHeaderOld>
          <TableBodyOld>
            {rows.map((ticket) => (
              <TableRowOld key={ticket.id}>
                <TableCellOld className="mdt-font-medium">{ticket.id}</TableCellOld>
                <TableCellOld>{ticket.subject}</TableCellOld>
                <TableCellOld>
                  <Badge tone={STATUS_TONE[ticket.status]} shape="square" size="sm" dot>
                    {ticket.status}
                  </Badge>
                </TableCellOld>
                <TableCellOld>{ticket.priority}</TableCellOld>
                <TableCellOld>{ticket.assignee}</TableCellOld>
              </TableRowOld>
            ))}
            {rows.length === 0 && (
              <TableRowOld interactive={false}>
                <TableCellOld colSpan={5} className="mdt-p-0">
                  <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2 mdt-py-10">
                    <p className="mdt-text-sm mdt-font-medium">No tickets match your filters.</p>
                    <p className="mdt-text-sm mdt-text-muted-foreground">
                      There are {tickets.length} tickets, none of them in this view.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        filters.clear();
                        setQuery('');
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                </TableCellOld>
              </TableRowOld>
            )}
          </TableBodyOld>
        </TableOld>

        <p className="mdt-text-xs mdt-text-muted-foreground">
          {exported ?? `Showing ${String(rows.length)} of ${String(tickets.length)}.`}
        </p>
      </div>
    );
  },
};
