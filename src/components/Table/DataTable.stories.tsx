import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Badge } from '../Badge';
import { DropdownMenuItem } from '../DropdownMenu';
import { Icon } from '../Icon';
import { DataTable } from './DataTable';
import { TableBulkAction, TableBulkSeparator } from './TableBulkBar';
import { ContactChips, PersonCell, TagList } from './TableCells';
import { SAMPLE_ROLES, SAMPLE_TEAMS, sampleUsers } from './sampleUsers';
import type { SampleUser } from './sampleUsers';
import type { TableColumnDef } from './Table.types';

const USERS = sampleUsers(10001);

/** The console's own Status glyph: an eight-spoke loader, 14px. */
const StatusGlyph = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
  </svg>
);

const TONE = { Active: 'success', Inactive: 'slate', Invited: 'warning' } as const;
const SOURCE_PALETTE = {
  Manual: undefined,
  LDAP: { fill: '#F2F3FD', ink: '#4F5BC4' },
  SCIM: { fill: '#EDF8F7', ink: '#1F7A71' },
} as const;

const USER_COLUMNS: TableColumnDef<SampleUser>[] = [
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
    cell: (u) => <ContactChips email={u.hasEmail ? u.email : null} phone={u.phone} />,
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
    cell: (u) => <TagList items={u.teams} />,
  },
  { key: 'role', label: 'Role', cell: (u) => <TagList items={[u.role]} /> },
];

function UsersTable(
  props: Partial<React.ComponentProps<typeof DataTable<SampleUser>>> & { rows?: SampleUser[] }
) {
  const [rows, setRows] = useState(props.rows ?? USERS);
  const [note, setNote] = useState('');
  const setStatus = (ids: string[], status: SampleUser['status']) => {
    setRows((r) => r.map((u) => (ids.includes(u.id) ? { ...u, status } : u)));
  };
  return (
    <div className="mdt-flex mdt-flex-col mdt-gap-3">
      <DataTable<SampleUser>
        label="Users"
        noun="users"
        getRowId={(u) => u.id}
        nameColumn={{
          label: 'Name',
          sortValue: (u) => u.name,
          cell: (u) => <PersonCell name={u.name} owner={u.owner} muted={u.status === 'Invited'} />,
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
              <Icon name="pencil" size={16} className="mdt-mr-2 mdt-text-neutral-90" />
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
                className="mdt-mr-2 mdt-text-neutral-90"
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
              <TableBulkAction
                icon={<Icon name="toggle-right" />}
                disabled={!picked.some((u) => u.status === 'Inactive')}
                onClick={() => {
                  setStatus(ids, 'Active');
                }}
              >
                Activate
              </TableBulkAction>
              <TableBulkAction
                icon={<Icon name="toggle-left" />}
                disabled={!picked.some((u) => u.status === 'Active')}
                onClick={() => {
                  setStatus(ids, 'Inactive');
                }}
              >
                Deactivate
              </TableBulkAction>
              <TableBulkSeparator />
              <TableBulkAction
                icon={<Icon name="trash-2" />}
                onClick={() => {
                  setRows((r) => r.filter((u) => !ids.includes(u.id)));
                  clear();
                }}
              >
                Delete
              </TableBulkAction>
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
  title: 'Components/Table',
  component: UsersTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'The merged console Users table, ported on 7 September 2026. `DataTable` assembles the pieces: the `Toolbar` strip with search, Filters, a quick filter, Sort and Columns; the card with its frozen row-number, Name and Action columns; a bulk bar; a pager or a "Load more" footer; and the blank states.',
          '',
          '| Part | Rule |',
          '| --- | --- |',
          '| Rows | 54px under a 40px header, 12px type, one hover and selected tint (neutral-10). |',
          '| Row number | Becomes a checkbox on hover, on focus, once picked, and on every row once anything is picked. Space picks, Enter opens, ↑ ↓ move. |',
          '| Select all | The header box takes this page; its chevron and "N selected" open the scope menu: this page, all matching, a number. |',
          '| Headings | 16px inset, grip, 8px, label, 8px, sort arrow; "⋯" at the right edge; all on hover. Click sorts A to Z, Z to A, off. |',
          '| Move | Drag the grip: the column dims, a copy of the heading follows, a 2px azure line marks the landing. Frozen columns cannot be passed. |',
          '| Insert | With columns hidden, hovering a boundary shows a "+" that puts one back right there. |',
          '| Quick filter | Washes its heading blue-10 and turns the column glyph azure; the glyph becomes the grip on hover. No chips, ever. |',
          '| Pills | Every one is `Badge` at size sm. Pill for status, square for source, teams, roles and "+N". |',
          '| Pager | Typed page box, first and last, rows per page; thousands get a comma. Or a "Load more" footer. |',
        ].join('\n'),
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof UsersTable>;

/** 10,001 made-up people with every control live. Column order, hidden columns and widths are remembered in this browser. */
export const Users: Story = {};

/** The other footer: a count and a "Load more" button that also fires as you scroll near the bottom. */
export const LoadMore: Story = { args: { paging: 'loadMore' } };

/** No selection: no row-number column, no bulk bar. */
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

/** The same table in dark mode, through the library tokens. */
export const Dark: Story = {
  globals: { theme: 'dark' },
  parameters: { backgrounds: { default: 'dark' } },
};
