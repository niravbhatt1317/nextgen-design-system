import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { DataTable } from './DataTable';
import { TableBulkAction, TableBulkSeparator } from './TableBulkBar';

/**
 * The whole table in one component.
 *
 * Layer 5f. Everything under `Table` is deliberately state-free - `TableHead`
 * reports that a sort was asked for, `useTableSort` remembers it, and neither
 * touches your rows. That is right for a product whose server already sorts,
 * and tiring for one with an array in memory, which is most of them.
 *
 * `DataTable` does the work. **Every piece of it can be handed back**:
 * `manualSort`, `manualFilter`, `manualSearch` and `manualPagination` each turn
 * off one half, and a table backed by a paged API turns on all four and uses
 * this as a renderer.
 *
 * The parts stay exported and stay state-free, so a product that outgrows this
 * drops down a level rather than forking it.
 */
const meta: Meta = {
  title: 'Components/Table/DataTable',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj;

interface Ticket {
  id: string;
  subject: string;
  status: 'Open' | 'In Process' | 'Resolved';
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
}

const STATUS_TONE = { Open: 'info', 'In Process': 'warning', Resolved: 'success' } as const;
const NAMES = ['Ada Lovelace', 'Grace Hopper', 'Alan Turing', 'Katherine Johnson'];
const STATUSES = ['Open', 'In Process', 'Resolved'] as const;
const PRIORITIES = ['High', 'Medium', 'Low'] as const;

const SUBJECTS = [
  'Network connectivity problem',
  'VPN drops every few minutes',
  'Printer queue stuck',
  'Password reset for contractor',
  'Laptop will not wake from sleep',
] as const;

/**
 * Enough rows to page through, generated so the story stays short.
 *
 * `at()` with a modulo index cannot miss, but the compiler does not know that -
 * hence the fallbacks rather than assertions.
 */
const tickets: Ticket[] = Array.from({ length: 43 }, (_, index) => ({
  id: `TKT-${String(200 + index)}`,
  subject: SUBJECTS[index % SUBJECTS.length] ?? SUBJECTS[0],
  status: STATUSES[index % STATUSES.length] ?? STATUSES[0],
  priority: PRIORITIES[index % PRIORITIES.length] ?? PRIORITIES[0],
  assignee: NAMES[index % NAMES.length] ?? 'Ada Lovelace',
}));

const columns = [
  { key: 'id', label: 'ID', locked: true },
  { key: 'subject', label: 'Subject' },
  { key: 'status', label: 'Status' },
  { key: 'priority', label: 'Priority' },
  { key: 'assignee', label: 'Assignee' },
];

const filterAttributes = [
  { key: 'status', label: 'Status', values: [...STATUSES] },
  { key: 'priority', label: 'Priority', values: [...PRIORITIES] },
  { key: 'assignee', label: 'Assignee', values: NAMES },
];

/**
 * Six props, and the table sorts, filters, searches, hides columns and pages
 * itself.
 *
 * Everything from 5a to 5e is here, not just the toolbar: each header carries
 * its own menu, drag grip, resize line and insertion point, and `selectable`
 * brings the checkbox column and the bulk bar.
 *
 * Worth trying: sort by two columns, drag a column sideways, hide one from its
 * own header menu, shift-click a range of rows, then search - all of it works
 * without a line of wiring, and the pagination follows the filtered count and
 * returns to the first page rather than stranding you on page 4 of something
 * you did not ask for.
 */
export const Simple: Story = {
  render: () => (
    <DataTable
      columns={columns}
      rows={tickets}
      getRowId={(row) => row.id}
      filterAttributes={filterAttributes}
      pageSize={8}
      renderCell={(row, key) =>
        key === 'status' ? (
          <Badge tone={STATUS_TONE[row.status]} shape="square" size="sm" dot>
            {row.status}
          </Badge>
        ) : (
          row[key as keyof Ticket]
        )
      }
      selectable
      bulkActions={(selected) => (
        <>
          <TableBulkAction icon={<Icon name="user-plus" size="sm" aria-hidden />}>
            Assign
          </TableBulkAction>
          <TableBulkAction icon={<Icon name="check" size="sm" aria-hidden />}>
            Resolve
          </TableBulkAction>
          <TableBulkSeparator />
          <TableBulkAction icon={<Icon name="trash-2" size="sm" aria-hidden />}>
            Delete {selected.length}
          </TableBulkAction>
        </>
      )}
      toolbarActions={
        <Button variant="outline" size="sm">
          <Icon name="download" size="sm" aria-hidden />
          Export
        </Button>
      }
    />
  ),
};

/**
 * The same component with every job handed back.
 *
 * This is what a table backed by a paged API looks like: `DataTable` renders and
 * reports, the product answers. The readout below shows what it asked for -
 * nothing is applied here, which is the point.
 *
 * Sorting a column changes the message and leaves the rows exactly as they came
 * in. A product would turn that request into an `ORDER BY` and hand back the
 * next page.
 */
export const ServerSide: Story = {
  render: function ServerSideDemo() {
    const [asked, setAsked] = useState('Nothing asked for yet.');

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <DataTable
          columns={columns}
          rows={tickets.slice(0, 8)}
          getRowId={(row) => row.id}
          filterAttributes={filterAttributes}
          manualSort
          manualFilter
          manualSearch
          manualPagination
          total={430}
          onSortChange={(rules) => {
            const clauses = rules.map(
              (rule) => `${rule.column} ${rule.direction === 'ascend' ? 'ASC' : 'DESC'}`
            );
            setAsked(clauses.length === 0 ? 'Sort cleared' : `ORDER BY ${clauses.join(', ')}`);
          }}
          onFilterChange={(filters) => {
            const clauses = filters.map(
              (filter) => `${filter.attribute} IN (${filter.values.join(', ')})`
            );
            setAsked(clauses.length === 0 ? 'Filters cleared' : `WHERE ${clauses.join(' AND ')}`);
          }}
          onSearchChange={(query) => {
            setAsked(query === '' ? 'Search cleared' : `Search: ${query}`);
          }}
        />
        <p className="mdt-font-mono mdt-text-xs mdt-text-muted-foreground">{asked}</p>
      </div>
    );
  },
};

/**
 * A saved view is just the state of the hooks, written down.
 *
 * Nothing extra was built for this: `useTableColumns` already serialises to
 * `state` and takes it back through `restore`, and sort and filters are plain
 * arrays that go in as `initial`. A view is those three objects with a name on
 * top - a database row, a URL, a `localStorage` key, whatever the product
 * wants.
 *
 * That is the argument for keeping the state in hooks rather than inside a
 * component: the feature that would have been hardest to add turned out to
 * already exist.
 */
export const SavedViews: Story = {
  render: function SavedViewsDemo() {
    const [saved] = useState([
      {
        name: 'My open tickets',
        json: '{"filters":[{"attribute":"status","values":["Open"]}],"sort":[{"column":"priority","direction":"ascend"}],"columns":{"hidden":["assignee"]}}',
      },
      {
        name: 'Everything, newest first',
        json: '{"filters":[],"sort":[{"column":"id","direction":"descend"}],"columns":{"hidden":[]}}',
      },
    ]);

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <div className="mdt-flex mdt-flex-col mdt-gap-2">
          {saved.map((view) => (
            <div key={view.name} className="mdt-rounded-md mdt-border mdt-border-border mdt-p-3">
              <p className="mdt-text-sm mdt-font-medium">{view.name}</p>
              <pre className="mdt-mt-1 mdt-overflow-x-auto mdt-text-xs mdt-text-muted-foreground">
                {view.json}
              </pre>
            </div>
          ))}
        </div>
        <p className="mdt-text-xs mdt-text-muted-foreground">
          Three objects and a name. Storing and restoring them needs no new API.
        </p>
      </div>
    );
  },
};
