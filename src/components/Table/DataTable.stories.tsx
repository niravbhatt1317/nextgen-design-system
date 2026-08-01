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
 * A view is a name for a table you have already set up.
 *
 * The columns you kept, the sort you chose, the filters you applied, the search
 * you typed - saved together, so tomorrow is one click rather than six. This is
 * what everything from 5a to 5f was for: each control already reported its
 * state, and nothing new had to be invented to write it down.
 *
 * **Try it.** Open "My open tickets" - the assignee column goes, status filters
 * to Open, and the sort changes. Then sort by something else and watch the dot
 * appear on the trigger: the view is marked, not overwritten. Save the change,
 * or discard it and land exactly back where the view was.
 *
 * **Nothing is stored here.** `onViewsChange` reports the whole list and this
 * story prints it. A product writes it to `localStorage`, to a URL, or to an
 * API where a colleague can open the same view - the third of which is the main
 * reason to have saved views, and impossible for a component that assumed the
 * first.
 */
export const SavedViews: Story = {
  render: function SavedViewsDemo() {
    const [written, setWritten] = useState('Nothing saved yet.');

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <DataTable
          columns={columns}
          rows={tickets}
          getRowId={(row) => row.id}
          filterAttributes={filterAttributes}
          pageSize={6}
          savedViews
          initialViews={[
            {
              id: 'open',
              name: 'My open tickets',
              state: {
                columns: {
                  order: ['id', 'subject', 'status', 'priority', 'assignee'],
                  hidden: ['assignee'],
                  frozenCount: 0,
                },
                sort: [{ column: 'priority', direction: 'ascend' }],
                filters: [{ attribute: 'status', values: ['Open'] }],
                query: '',
              },
            },
            {
              id: 'newest',
              name: 'Everything, newest first',
              state: {
                columns: {
                  order: ['id', 'subject', 'status', 'priority', 'assignee'],
                  hidden: [],
                  frozenCount: 0,
                },
                sort: [{ column: 'id', direction: 'descend' }],
                filters: [],
                query: '',
              },
            },
          ]}
          onViewsChange={(views) => {
            setWritten(views.map((view) => view.name).join(' · ') || 'No views left.');
          }}
          renderCell={(row, key) =>
            key === 'status' ? (
              <Badge tone={STATUS_TONE[row.status]} shape="square" size="sm" dot>
                {row.status}
              </Badge>
            ) : (
              row[key as keyof Ticket]
            )
          }
        />
        <p className="mdt-font-mono mdt-text-xs mdt-text-muted-foreground">
          Written out: {written}
        </p>
      </div>
    );
  },
};

/**
 * Rows on their way, in the two states that are not the same thing.
 *
 * **Nothing yet** draws skeleton rows. They hold the table's shape, so the page
 * below barely moves when the rows land - and they say "a table is coming"
 * rather than "something is happening", which a spinner in the middle of an
 * empty box does not. Barely, not exactly: each placeholder is a line of text
 * tall, and this table's status cells hold a badge, which is two pixels more.
 * Six rows of that is 12px against a spinner's 237.
 *
 * **Refreshing** keeps the rows and dims them. Someone searching a table types
 * six characters and fires six requests; blanking the table each time is a
 * flicker, and the rows already on screen were probably still right. The body
 * carries `aria-busy`, which says the same thing to a screen reader.
 *
 * The toggle below switches between them. Watch what happens to the page height
 * on the first one, and to what you can read on the second.
 */
export const Loading: Story = {
  render: function LoadingDemo() {
    const [stage, setStage] = useState<'first' | 'refresh'>('first');

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <div className="mdt-flex mdt-gap-2">
          <Button
            variant={stage === 'first' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => {
              setStage('first');
            }}
          >
            Nothing yet
          </Button>
          <Button
            variant={stage === 'refresh' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => {
              setStage('refresh');
            }}
          >
            Refreshing
          </Button>
        </div>
        <DataTable
          columns={columns}
          rows={stage === 'first' ? [] : tickets.slice(0, 6)}
          getRowId={(row) => row.id}
          pageSize={6}
          loading
          renderCell={(row, key) =>
            key === 'status' ? (
              <Badge tone={STATUS_TONE[row.status]} shape="square" size="sm" dot>
                {row.status}
              </Badge>
            ) : (
              row[key as keyof Ticket]
            )
          }
        />
      </div>
    );
  },
};

/**
 * Rows that keep coming as you reach the end.
 *
 * **It replaces the pager rather than joining it.** Two ways to reach row 300
 * that disagree about which rows are loaded is a bug waiting to be filed, so
 * `infinite` hides the pager and stops slicing - the rows you pass are the rows
 * shown, because a list that grows as you scroll has already been paged by
 * whoever is fetching it.
 *
 * **The sentinel is a button.** Scrolling is not the only way through a list: a
 * keyboard user tabs to the end and a screen reader user lands on it, and both
 * need something to press. The observer watches that same button, so the person
 * who never sees it pays nothing for it.
 *
 * Scroll to the bottom, or press Load more. The count says what is loaded out of
 * what exists - the one thing infinite scroll takes away and has to give back,
 * because without it there is no way to tell a long list from an endless one.
 */
export const InfiniteScroll: Story = {
  render: function InfiniteScrollDemo() {
    const BATCH = 8;
    const [loaded, setLoaded] = useState(BATCH);
    const [loadingMore, setLoadingMore] = useState(false);
    const hasMore = loaded < tickets.length;

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <div className="mdt-max-h-96 mdt-overflow-y-auto">
          <DataTable
            columns={columns}
            rows={tickets.slice(0, loaded)}
            getRowId={(row) => row.id}
            infinite
            hasMore={hasMore}
            loadingMore={loadingMore}
            onLoadMore={() => {
              if (loadingMore || !hasMore) return;
              setLoadingMore(true);
              // A real product awaits a request here. The delay is the point of
              // the demo: without one, the loading row never appears and the
              // guard that stops page 2 being asked for four times is invisible.
              setTimeout(() => {
                setLoaded((count) => Math.min(count + BATCH, tickets.length));
                setLoadingMore(false);
              }, 600);
            }}
            renderCell={(row, key) =>
              key === 'status' ? (
                <Badge tone={STATUS_TONE[row.status]} shape="square" size="sm" dot>
                  {row.status}
                </Badge>
              ) : (
                row[key as keyof Ticket]
              )
            }
          />
        </div>
        <p className="mdt-text-xs mdt-text-muted-foreground">
          {loaded} of {tickets.length} loaded
        </p>
      </div>
    );
  },
};
