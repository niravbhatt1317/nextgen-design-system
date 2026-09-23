import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Badge } from '../Badge';
import { DropdownMenuItem } from '../DropdownMenu';
import { Icon } from '../Icon';
import { DataTableOld2 } from './DataTableOld2';
import { TableBulkActionOld2, TableBulkSeparatorOld2 } from './TableBulkBarOld2';
import { ContactChipsOld2, PersonCellOld2, TagListOld2 } from './TableCells';
import { SAMPLE_ROLES, SAMPLE_TEAMS, sampleUsers } from './sampleUsers';
import type { SampleUser } from './sampleUsers';
import type { TableColumnDefOld2 } from './TableOld2.types';

/* Twenty-six, not ten thousand (Pranjal, 2026-09-11: "26 entries is more than
 * enough"). One more than a page, so the pager has a second page to go to and
 * Load more has one more to load — which is all the stories need to show. */
const USERS = sampleUsers(26);

/** The Status mark: the eight-spoke loader, the library's own icon. One icon for the
 * column heading and the quick-filter square alike (Pranjal, 2026-09-12). */
const StatusGlyph = () => <Icon name="loader" />;

const TONE = { Active: 'success', Inactive: 'slate', Invited: 'warning' } as const;
const SOURCE_PALETTE = {
  Manual: undefined,
  LDAP: { fill: '#F2F3FD', ink: '#4F5BC4' },
  SCIM: { fill: '#EDF8F7', ink: '#1F7A71' },
} as const;

const USER_COLUMNS: TableColumnDefOld2<SampleUser>[] = [
  {
    key: 'email',
    label: 'Email',
    width: 217,
    sortable: true,
    cell: (u) => <span className="mdt-text-muted-foreground">{u.email}</span>,
  },
  {
    key: 'contact',
    label: 'Contact',
    cell: (u) => <ContactChipsOld2 email={u.hasEmail ? u.email : null} phone={u.phone} />,
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    glyph: <StatusGlyph />,
    cell: (u) => (
      <Badge size="sm" tone={TONE[u.status]} dot>
        {u.status}
      </Badge>
    ),
  },
  {
    key: 'source',
    label: 'Source',
    cell: (u) => {
      const palette = SOURCE_PALETTE[u.source];
      return palette ? (
        <Badge size="sm" shape="square" palette={palette}>
          {u.source}
        </Badge>
      ) : (
        <Badge size="sm" shape="square">
          {u.source}
        </Badge>
      );
    },
  },
  {
    key: 'teams',
    label: 'Teams',
    sortable: true,
    sortValue: (u) => u.teams.join(','),
    cell: (u) => <TagListOld2 items={u.teams} />,
  },
  { key: 'role', label: 'Role', cell: (u) => <TagListOld2 items={[u.role]} /> },
];

function UsersTable(
  props: Partial<React.ComponentProps<typeof DataTableOld2<SampleUser>>> & { rows?: SampleUser[] }
) {
  const [rows, setRows] = useState(props.rows ?? USERS);
  const [note, setNote] = useState('');
  const setStatus = (ids: string[], status: SampleUser['status']) => {
    setRows((r) => r.map((u) => (ids.includes(u.id) ? { ...u, status } : u)));
  };
  return (
    <div className="mdt-flex mdt-flex-col mdt-gap-3">
      <DataTableOld2<SampleUser>
        label="Users"
        noun="users"
        getRowId={(u) => u.id}
        nameColumn={{
          label: 'Name',
          sortValue: (u) => u.name,
          cell: (u) => (
            <PersonCellOld2 name={u.name} owner={u.owner} muted={u.status === 'Invited'} />
          ),
        }}
        columns={USER_COLUMNS}
        isRowInert={(u) => u.status === 'Invited'}
        onRowOpen={(u) => {
          setNote(`Opened ${u.name}. The profile drawer goes here.`);
        }}
        rowActions={(u) => (
          <>
            <DropdownMenuItem
              onSelect={() => {
                setNote(`Edit ${u.name}`);
              }}
            >
              <Icon
                name="pencil"
                size={16}
                className="mdt-mr-2 mdt-text-neutral-90 dark:mdt-text-neutral-40"
              />
              Edit details
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                setStatus([u.id], u.status === 'Active' ? 'Inactive' : 'Active');
              }}
            >
              <Icon
                name={u.status === 'Active' ? 'toggle-left' : 'toggle-right'}
                size={16}
                className="mdt-mr-2 mdt-text-neutral-90 dark:mdt-text-neutral-40"
              />
              {u.status === 'Active' ? 'Deactivate user' : 'Activate user'}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="mdt-text-red-60"
              onSelect={() => {
                setRows((r) => r.filter((x) => x.id !== u.id));
              }}
            >
              <Icon name="trash-2" size={16} className="mdt-mr-2" />
              Delete user
            </DropdownMenuItem>
          </>
        )}
        search={{
          placeholder: 'Search by name or email',
          match: (u, q) => u.name.toLowerCase().includes(q) || u.email.includes(q),
        }}
        quickFilter={{
          columnKey: 'status',
          label: 'Filter by status',
          options: ['Active', 'Inactive', 'Invited'],
          value: (u) => u.status,
          /* the menu reads like the column: each status as its own pill */
          renderOption: (v) => (
            <Badge size="sm" tone={TONE[v as SampleUser['status']]} dot>
              {v}
            </Badge>
          ),
        }}
        filters={[
          {
            key: 'source',
            label: 'Source',
            options: ['Manual', 'LDAP', 'SCIM'],
            match: (u, s) => s.has(u.source),
          },
          { key: 'role', label: 'Role', options: SAMPLE_ROLES, match: (u, s) => s.has(u.role) },
          {
            key: 'team',
            label: 'Team',
            options: SAMPLE_TEAMS.slice(0, 6),
            match: (u, s) => u.teams.some((t) => s.has(t)),
          },
        ]}
        bulkActions={(ids, clear) => {
          const picked = rows.filter((u) => ids.includes(u.id));
          return (
            <>
              <TableBulkActionOld2
                icon={<Icon name="toggle-right" />}
                disabled={!picked.some((u) => u.status === 'Inactive')}
                onClick={() => {
                  setStatus(ids, 'Active');
                }}
              >
                Activate
              </TableBulkActionOld2>
              <TableBulkActionOld2
                icon={<Icon name="toggle-left" />}
                disabled={!picked.some((u) => u.status === 'Active')}
                onClick={() => {
                  setStatus(ids, 'Inactive');
                }}
              >
                Deactivate
              </TableBulkActionOld2>
              <TableBulkSeparatorOld2 />
              <TableBulkActionOld2
                icon={<Icon name="trash-2" />}
                onClick={() => {
                  setRows((r) => r.filter((u) => !ids.includes(u.id)));
                  clear();
                }}
              >
                Delete
              </TableBulkActionOld2>
            </>
          );
        }}
        storageKey="storybook.users-table"
        blank={{
          first: {
            onAction: () => {
              setNote('The invite flow opens here.');
            },
          },
          error: {
            onAction: () => {
              setNote('Reloading…');
            },
          },
        }}
        {...props}
        rows={rows}
      />
      {note && <p className="mdt-text-sm mdt-text-muted-foreground">{note}</p>}
    </div>
  );
}

const meta: Meta<typeof UsersTable> = {
  title: 'Deprecated 2/DataTable Old',
  component: UsersTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    status: {
      type: 'deprecated',
      since: '0.5.1',
      deprecation: {
        deprecatedSince: '0.5.1',
        removalIn: 'to be set by Nirav',
        replacement: 'DataTable',
        message:
          'The DataTable as it was before 11 September 2026. Deprecated 2026-09-22 when Pranjal ruled the new one in; kept for side-by-side review; Nirav sets the removal version.',
      },
    },
    docs: {
      description: {
        component: [
          '## ⚠️ Deprecated — use `DataTable`',
          '',
          'The DataTable as it was before 11 September 2026. Deprecated 2026-09-22 when Pranjal',
          'ruled the new one in; kept for side-by-side review; Nirav sets the removal version.',
          '',
          '**Do not start anything new on it.**',
          '',
          'The merged console Users table as ported on 7 September 2026. `DataTableOld2` assembles',
          'the pieces: the `Toolbar` strip with search, Filters, a quick filter, Sort and Columns;',
          'the card with its frozen row-number, Name and Action columns; a bulk bar; a pager or a',
          '"Load more" footer; and the blank states. Its styles are namespaced `tbl-old2-*`, so',
          'they never touch the live table.',
        ].join('\n'),
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof UsersTable>;

/** 26 made-up people — one more than a page — with every control live. Column order, hidden columns and widths are remembered in this browser. */
export const Users: Story = {};

/** The other footer: a count and a "Load more" button that also fires as you scroll near the bottom. */
export const LoadMore: Story = { args: { paging: 'loadMore' } };

/** No selection: the row numbers stay numbers on hover, and "Row number" can be hidden from the Columns panel. No bulk bar. */
export const WithoutSelection: Story = { args: { bulkActions: undefined } };

/** Five grey rows while the list loads. */
export const Loading: Story = { args: { loading: true } };

/** Nothing matches the search: "Clear filters" puts everything back. */
export const NothingFound: Story = { args: { initialQuery: 'zzqx' } };

/** A brand-new tenant: no users at all, so an invitation instead of "Clear filters". */
export const NoUsersYet: Story = { args: { rows: [] } };

/** The list could not be loaded; search and filters are kept. */
export const CouldNotLoad: Story = { args: { error: true } };

/** Today's lighter row line, for the divider decision. */
export const LighterDividers: Story = { args: { divider: 'light' } };

/** The card as the page: square corners, no side edges, a 24px inset on the end cells, the header and pager pinned while the rows scroll inside. `maxHeight` is the card's height here. The page decides when this happens; see Pieces → Docks On Scroll. */
export const Docked: Story = { args: { docked: true, maxHeight: 520 } };

/**
 * **The table on its own.** `toolbar={false}` leaves off the strip above it.
 *
 * Use it where the PAGE already carries a toolbar — a screen with a tab strip
 * puts its controls up there, and a second strip would draw search, Filters,
 * Sort and Columns twice. The page then supplies its own `Toolbar`, a separate
 * component that stays connected to this one: it owns the controls, this owns
 * the rows. Everything inside the card — the frozen columns, the grips, the
 * heading menus, the pager — is unchanged.
 */
export const WithoutToolbar: Story = { args: { toolbar: false } };

/**
 * **A list that fits on one page has no pager.** Twenty rows at twenty-five a
 * page: there is no second page to go to, so the strip is not drawn. The
 * default story above, with twenty-six, is the smallest list that gets one.
 */
export const NoPagerNeeded: Story = { args: { rows: USERS.slice(0, 20) } };

/**
 * **Kept whatever the count.** `pager="always"` holds the strip for a list that
 * is about to grow, so the footer does not pop in and out as rows come and go.
 */
export const PagerAlways: Story = { args: { rows: USERS.slice(0, 8), pager: 'always' } };

/**
 * **Neither strip.** No toolbar, no pager, a short list — the card alone, which
 * is what a table inside a panel or a tab body looks like.
 */
