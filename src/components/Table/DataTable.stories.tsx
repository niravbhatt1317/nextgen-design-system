import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { DropdownMenuItem, DropdownMenuSeparator } from '../DropdownMenu';
import { Icon } from '../Icon';
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../Sheet';
import { Toolbar } from '../Toolbar';
import { DataTable } from './DataTable';
import { TableBulkAction, TableBulkSeparator } from './TableBulkBar';
import { ContactChips, PersonCell, TagList } from './TableCells';
import { SAMPLE_ROLES, SAMPLE_TEAMS, sampleUsers } from './sampleUsers';
import type { SampleUser } from './sampleUsers';
import type { TableColumnDef } from './Table.types';

/* Twenty-six, not ten thousand (Pranjal, 2026-09-11: "26 entries is more than
 * enough"). One more than a page, so the pager has a second page to go to and
 * Load more has one more to load — which is all the stories need to show. */
const USERS = sampleUsers(26);

/** The Status mark: the eight-spoke loader, the library's own icon. One icon for the
 * column heading and the quick-filter square alike (Pranjal, 2026-09-12). Asked for at
 * the 14 it is drawn at, as /users hands its own (UsersTable's StatusGlyph, size 14), so
 * the stroke ladder gives the small-icon line: an unsized Icon is a 20 squeezed to 14,
 * which keeps the 20's lighter line (the parity check read 1.5 here, 1.75 on /users). */
const StatusGlyph = () => <Icon name="loader" size={14} />;

const TONE = { Active: 'success', Inactive: 'slate', Invited: 'warning' } as const;

const USER_COLUMNS: TableColumnDef<SampleUser>[] = [
  {
    key: 'email',
    label: 'Email',
    width: 217,
    sortable: true,
    /* one ink per column, the value's own (the console's rule since 2026-10-15: /users dropped its muted email) */
    cell: (u) => <span>{u.email}</span>,
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
      <Badge size="md" tone={TONE[u.status]} dot>
        {u.status}
      </Badge>
    ),
  },
  {
    key: 'source',
    label: 'Source',
    /* every source is the one neutral square, as on /users (a coloured LDAP / SCIM pair was invented here; removed 2026-09-22) */
    cell: (u) => (
      <Badge size="sm" shape="square">
        {u.source}
      </Badge>
    ),
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
              <Icon name="pencil" size={16} />
              Edit details
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                setStatus([u.id], u.status === 'Active' ? 'Inactive' : 'Active');
              }}
            >
              <Icon name={u.status === 'Active' ? 'toggle-left' : 'toggle-right'} size={16} />
              {u.status === 'Active' ? 'Deactivate user' : 'Activate user'}
            </DropdownMenuItem>
            {/* the destructive item last, red, after a divider (the action-menu rule, Pranjal 2026-10-14) */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => {
                setRows((r) => r.filter((x) => x.id !== u.id));
              }}
            >
              <Icon name="trash-2" size={16} />
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
            <Badge size="md" tone={TONE[v as SampleUser['status']]} dot>
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
  title: 'New Components/Table',
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
          '| Select all | The header box takes this page, and only this page; the bulk bar says how many. The chevron beside the box and its "Choose what to select" menu (this page, all matching, a number) went on 26 September 2026. |',
          '| Headings | 16px inset, grip, 8px, label, 8px, sort arrow; "⋯" at the right edge; all on hover. Click sorts A to Z, Z to A, off. |',
          '| Move | Drag the grip: the column dims, a copy of the heading follows, a 2px azure line marks the landing. Frozen columns cannot be passed. |',
          '| Insert | With columns hidden, hovering a boundary shows a "+" that puts one back right there. |',
          '| Quick filter | Washes its heading blue-10 and turns the column glyph azure; the glyph becomes the grip on hover. No chips, ever. |',
          '| Filters | `filters` for a few tick-boxes; `advancedFilter` for conditions of key · operator · value with groups, the count on the door (2026-09-24). |',
          '| Pills | Every one is `Badge`. The status pill, in the column and in the quick-filter menu, at size md (the console renders 24); squares at sm for source, teams, roles and "+N". |',
          '| Pager | Typed page box, first and last, rows per page. Or a "Load more" footer. |',
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

/** The blank tail column at the right edge, drawn on request (`tail`): off everywhere since 2026-09-23 (Pranjal: "remove the
 * most right side column which is nothing but empty. Actually hide it from the code we might need it later"). */
export const WithTheTail: Story = { args: { tail: true } };

/** THE HEADING AT ITS FLOOR (2026-09-23): every content column is at least 160; a long name truncates under the pointer
 * so the arrow and the ⋯ keep 20 px between them; the grip, the arrow and the ⋯ appear instantly. Hover a heading. */
export const NarrowHeadings: Story = {
  args: {
    columns: [
      {
        key: 'creds',
        label: 'Total credentials issued',
        width: 160,
        sortable: true,
        cell: (u: SampleUser) => <span>{u.teams.length}</span>,
      },
      {
        key: 'status',
        label: 'Status',
        width: 160,
        sortable: true,
        glyph: <StatusGlyph />,
        cell: (u: SampleUser) => (
          <Badge size="md" tone={TONE[u.status]} dot>
            {u.status}
          </Badge>
        ),
      },
      {
        key: 'owner',
        label: 'Accountable owner of record',
        width: 160,
        sortable: true,
        cell: (u: SampleUser) => <span>{u.role}</span>,
      },
    ],
  },
};

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
export const CardOnly: Story = {
  args: { toolbar: false, pager: 'never', rows: USERS.slice(0, 6) },
};

/**
 * **The page owns the strip.** A screen with no tab bar keeps the 60px
 * `Toolbar` band as page structure and hands the table the ELEMENT; the table
 * draws its own search, Filters, quick filter, Sort and Columns inside it
 * (Pranjal, 2026-09-12). Every control works as it does in the table's own
 * strip, and there is no second copy for the page to keep in step.
 */
export const WithThePagesToolbar: Story = {
  parameters: { layout: 'fullscreen' },
  render: function WithThePagesToolbarStory() {
    const [strip, setStrip] = useState<HTMLDivElement | null>(null);
    return (
      <div className="mdt-flex mdt-flex-col mdt-bg-background">
        <Toolbar ref={setStrip} label="User controls">
          {null}
        </Toolbar>
        <div className="mdt-px-6 mdt-pb-5 mdt-pt-1.5">
          <UsersTable toolbar={strip ?? false} />
        </div>
      </div>
    );
  },
};

/**
 * **Conditions, not tick-boxes.** `advancedFilter` puts the console's Filters door in the strip: rows of key ·
 * operator · value, with groups, the count on the door, the rows applied to the list. The Users page carried this
 * door itself until 2026-09-24 (Pranjal: "every fix ... solve it from the foundation so that anywhere else it doesnt
 * cause the same issue"); now every list gets the same one by naming its keys.
 */
export const WithTheAdvancedFilter: Story = {
  args: {
    filters: undefined,
    advancedFilter: {
      keys: [
        { id: 'name', label: 'Name', type: 'text' },
        { id: 'email', label: 'Email', type: 'text' },
        { id: 'role', label: 'Role', type: 'pick', options: SAMPLE_ROLES },
        { id: 'source', label: 'Source', type: 'pick', options: ['Manual', 'LDAP', 'SCIM'] },
      ],
    },
  },
};

/**
 * **Quick filters are disabled under an advanced filter** - disabled, not hidden (Pranjal, 2026-09-27: "make quick
 * filter disabled instead of disappearing them"). The day before they hid (Pranjal, 2026-09-26: "whenever I apply an
 * advanced filter, the quick filters won't be visible. All the quick-filter options, like Status and Organisation,
 * which we removed before from the advanced filter, will all be visible inside the advanced filter now, because the
 * quick filters will be hidden." - history now: the panel still owns the quick keys while it holds a filter, but the
 * square stays where the eye left it). The strip here has the Status square AND a More filters door whose keys
 * include Status. Apply any row in the panel and the square greys out: it opens no menu, and hovering or tabbing to
 * it says "Set inside More filters while a filter is applied" - Status is set from inside the panel instead. Tick a
 * status in the square first and then apply a row: the tick rides along as a "Status is ..." row (the door's count
 * says so), so no filter is lost. Clear all wakes the square again, empty. This is the table's rule, not the story's:
 * every list with both filters behaves this way; a page only has to list its quick keys among the advanced keys.
 */
export const QuickFiltersDisabledUnderAnAdvancedFilter: Story = {
  name: 'Quick filters are disabled under an advanced filter',
  args: {
    filters: undefined,
    advancedFilter: {
      keys: [
        { id: 'name', label: 'Name', type: 'text' },
        { id: 'email', label: 'Email', type: 'text' },
        { id: 'status', label: 'Status', type: 'pick', options: ['Active', 'Inactive', 'Invited'] },
        { id: 'role', label: 'Role', type: 'pick', options: SAMPLE_ROLES },
        { id: 'source', label: 'Source', type: 'pick', options: ['Manual', 'LDAP', 'SCIM'] },
      ],
    },
  },
};

/**
 * **The list opens already filtered** (2026-10-28). `advancedFilter.initial` hands the table a filter to start with,
 * in the same rows the panel builds - here "Role is Admin" and "Source is LDAP". It lands exactly as if the
 * person had applied it: the door reads "2 applied", the Status square is held, and opening the door shows both rows
 * ready to edit or clear. Read once, when the table first appears, like `initialQuery`; to start over the page gives
 * the table a new `key`.
 *
 * Asked for by the console: the fleets' Change log has a View button that opens Agents or Collectors narrowed to one
 * tag or one network zone, as a real filter rather than words in the search box (Pranjal's pick).
 */
export const OpensAlreadyFiltered: Story = {
  name: 'Opens already filtered',
  args: {
    filters: undefined,
    advancedFilter: {
      keys: [
        { id: 'name', label: 'Name', type: 'text' },
        { id: 'email', label: 'Email', type: 'text' },
        { id: 'status', label: 'Status', type: 'pick', options: ['Active', 'Inactive', 'Invited'] },
        { id: 'role', label: 'Role', type: 'pick', options: SAMPLE_ROLES },
        { id: 'source', label: 'Source', type: 'pick', options: ['Manual', 'LDAP', 'SCIM'] },
      ],
      initial: {
        join: 'and',
        rows: [
          { key: 'role', op: 'is', value: ['Admin'] },
          { key: 'source', op: 'is', value: ['LDAP'] },
        ],
      },
    },
  },
};

/**
 * **The bar follows the window, not the card** (2026-09-26). This is the table on a page like the console's: a
 * scrolling frame the height of the window, a 60px band pinned at its top, a title and a strip of counts, and the
 * card filling the room under the band - so at rest the card's last rows and its pager sit below the fold, exactly as
 * on Users. The bar used to hang 62px above the card's end, which on the console put it 135px below the fold: rows
 * picked, nothing to show for it until the page was scrolled. Now it hangs from a hook that sticks to the bottom of
 * whatever scrolls the card - the page here, a drawer's body elsewhere - 62px up, centred on the card, and it rides up
 * with the card only once the card's end comes into view. Picking rows changes nothing in the card's layout: the bar
 * still overlays the last row and the pager does not move. Scroll the frame and watch the bar stay put. A card that
 * IS the page (Docked, above) keeps the bar above its own end, which is the same line there. Open the story itself:
 * every row on the page is picked as it opens, and the bar is there without a scroll.
 */
export const SelectedOnALongPage: Story = {
  name: 'Selected on a long page',
  /* autoplay: the docs page picks the rows too, so the example there shows the bar and not a table at rest */
  parameters: { layout: 'fullscreen', docs: { story: { autoplay: true } } },
  render: function SelectedOnALongPageStory() {
    const counts = [
      ['All users', '26'],
      ['Active', '17'],
      ['Invited', '5'],
    ];
    return (
      <div
        className="mdt-h-screen mdt-overflow-y-auto mdt-bg-background mdt-font-sans mdt-text-neutral-130"
        /* the band the card docks under: the frame publishes its line, as the console's page frame does */
        style={{ scrollbarWidth: 'none', '--mdt-thead-top': '60px' } as React.CSSProperties}
      >
        <div className="mdt-sticky mdt-top-0 mdt-z-10 mdt-flex mdt-h-[60px] mdt-items-center mdt-border-b mdt-border-solid mdt-border-neutral-20 mdt-bg-background mdt-px-6 mdt-text-sm mdt-text-muted-foreground">
          Access · Users
        </div>
        <div className="mdt-px-6 mdt-pb-6 mdt-pt-6">
          <h1 className="mdt-m-0 mdt-text-xl mdt-font-semibold">Users</h1>
          <p className="mdt-mb-5 mdt-mt-1 mdt-text-xs mdt-text-muted-foreground">
            Everyone with a sign-in, across every organisation you can see.
          </p>
          <div className="mdt-mb-6 mdt-grid mdt-grid-cols-3 mdt-gap-4">
            {counts.map(([k, v]) => (
              <div
                key={k}
                className="mdt-rounded-xl mdt-border mdt-border-solid mdt-border-neutral-20 mdt-bg-card mdt-p-5"
              >
                <div className="mdt-text-xs mdt-text-muted-foreground">{k}</div>
                <div className="mdt-mt-1 mdt-text-2xl mdt-font-semibold mdt-tabular-nums">{v}</div>
              </div>
            ))}
          </div>
          <UsersTable />
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('checkbox', { name: 'Select all on this page' }));
  },
};

/* ── The fleets' agent lists (2026-10-28) ── a host over its address and system, a state pill, two plain values and a
 * count: the shape of the console's Agent Fleet lists (AgentListTable, ModuleHealth), with made-up agents. */
interface SampleAgent {
  id: string;
  host: string;
  ip: string;
  os: string;
  health: 'Online' | 'Degraded' | 'Buffering' | 'Offline';
  zone: string;
  version: string;
  restarts: number;
}
const HEALTH_TONE = {
  Online: 'success',
  Degraded: 'warning',
  Buffering: 'info',
  Offline: 'danger',
} as const;
const AGENTS: SampleAgent[] = [
  ['web-01', '10.20.1.11', 'Ubuntu 22.04', 'Online', 'Retail core', '4.12.0', 0],
  ['web-02', '10.20.1.12', 'Ubuntu 22.04', 'Degraded', 'Retail core', '4.12.0', 3],
  ['db-primary', '10.20.4.20', 'RHEL 9', 'Online', 'Data centre east', '4.11.2', 0],
  ['db-replica', '10.20.4.21', 'RHEL 9', 'Buffering', 'Data centre east', '4.11.2', 1],
  ['pos-gw-14', '172.16.8.14', 'Windows Server 2022', 'Offline', 'Stores north', '4.10.5', 12],
  ['pos-gw-15', '172.16.8.15', 'Windows Server 2022', 'Online', 'Stores north', '4.12.0', 0],
].map(([host, ip, os, health, zone, version, restarts]) => ({
  id: String(host),
  host: String(host),
  ip: String(ip),
  os: String(os),
  health: health as SampleAgent['health'],
  zone: String(zone),
  version: String(version),
  restarts: Number(restarts),
}));

const AGENT_COLUMNS: TableColumnDef<SampleAgent>[] = [
  {
    key: 'health',
    label: 'State',
    width: 160,
    cell: (a) => (
      <Badge tone={HEALTH_TONE[a.health]} dot>
        {a.health}
      </Badge>
    ),
  },
  { key: 'zone', label: 'Zone', width: 160, sortable: true, cell: (a) => a.zone },
  { key: 'version', label: 'Version', width: 160, sortable: true, cell: (a) => a.version },
  {
    key: 'restarts',
    label: 'Restarts',
    width: 160,
    sortable: true,
    sortValue: (a) => a.restarts,
    /* a figure sits on the left like every column (no right-aligned columns, 2026-09-12); tabular digits line up */
    cell: (a) => <span className="mdt-tabular-nums">{a.restarts || '-'}</span>,
  },
];

/** The host over its address and system: the second line in a flex column under the value, as the console builds it. */
const agentName = {
  label: 'Agent',
  width: 200,
  sortValue: (a: SampleAgent) => a.host,
  cell: (a: SampleAgent) => (
    <div className="mdt-flex mdt-flex-col">
      <span className="mdt-font-medium">{a.host}</span>
      <span className="mdt-text-xs mdt-text-neutral-90">
        {a.ip} · {a.os}
      </span>
    </div>
  ),
};

function AgentsTable({
  onRowOpen,
  rowActions,
}: {
  onRowOpen?: (a: SampleAgent) => void;
  rowActions?: (a: SampleAgent) => React.ReactNode;
}) {
  return (
    <DataTable<SampleAgent>
      label="Agents"
      noun="agents"
      rows={AGENTS}
      getRowId={(a) => a.id}
      docked={false}
      maxHeight="none"
      onRowOpen={onRowOpen}
      rowActions={rowActions}
      search={{
        placeholder: 'Search by name, zone or version',
        match: (a, q) =>
          `${a.host} ${a.ip} ${a.os} ${a.version} ${a.zone}`
            .toLowerCase()
            .includes(q.toLowerCase()),
      }}
      nameColumn={agentName}
      columns={AGENT_COLUMNS}
    />
  );
}

/**
 * **A cell's second line is the middle grey** (Pranjal, 2026-10-28: he picked "Middle grey" for every table's second
 * line). A cell that stacks a line under its value - the host over its address and system here - draws that line in
 * neutral-60 in both themes, a step lighter than the value's own grey. The cell writes the line in neutral-90, as
 * the console's do; the table repaints it, and only inside its own cells.
 *
 * **No right-aligned columns.** Restarts is a figure and still sits on the left like every column (the console's
 * rulebook item 65, 2026-09-12); `mdt-tabular-nums` on the value keeps the digits lined up.
 */
export const TwoLineCells: Story = {
  name: 'Two-line cells and figures',
  render: () => <AgentsTable />,
};

function AgentsPanel() {
  const [opened, setOpened] = useState('');
  return (
    <Sheet
      onOpenChange={(open) => {
        if (!open) setOpened('');
      }}
    >
      <SheetTrigger asChild>
        <Button>Agents running Log shipper</Button>
      </SheetTrigger>
      <SheetContent layout="drawer" size="lg" aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>Agents running Log shipper</SheetTitle>
        </SheetHeader>
        <SheetBody>
          <div className="mdt-flex mdt-flex-col mdt-gap-3">
            <AgentsTable
              onRowOpen={(a) => {
                setOpened(a.host);
              }}
            />
            {opened && (
              <p className="mdt-m-0 mdt-text-sm mdt-text-muted-foreground" role="status">
                Opened {opened}. The agent&apos;s details open here.
              </p>
            )}
          </div>
        </SheetBody>
        <SheetFooter
          start={
            <SheetClose asChild>
              <Button variant="ghost">Close</Button>
            </SheetClose>
          }
        />
      </SheetContent>
    </Sheet>
  );
}

/**
 * **A row opens on a click inside a side panel too** (fixed 2026-10-28). Up to 2.3.0 a row ignored any click whose
 * target sat inside `role="dialog"` - meant for a menu or a confirm opened from the row, it also caught the panel
 * the table itself sat in, so a click on a row in a drawer opened nothing while Enter still did. The row now counts
 * only what is inside it: its own buttons, links, fields and `data-no-open` parts, and any layer it opened. The
 * story opens the panel and clicks the first agent; the line under the table says which one opened.
 */
export const RowsOpenFromASidePanel: Story = {
  name: 'Rows open from a side panel',
  render: () => <AgentsPanel />,
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole('button', { name: 'Agents running Log shipper' })
    );
    const panel = await within(document.body).findByRole('dialog', {
      name: 'Agents running Log shipper',
    });
    /* a plain content cell of the first agent: the click lands on the cell itself, nothing inside it */
    const row = (await within(panel).findByText('web-01')).closest('tr') as HTMLElement;
    await userEvent.click(within(row).getByText('4.12.0'));
    await expect(await within(panel).findByRole('status')).toHaveTextContent('Opened web-01');
  },
};

/** The stores' gateways are run by the stores team: on this list there is nothing to do with them. */
const agentActions = (a: SampleAgent) =>
  a.zone === 'Stores north' ? null : (
    <>
      <DropdownMenuItem>
        <Icon name="rotate-cw" size={16} />
        Restart agent
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Icon name="hand" size={16} />
        Hold the agent and its modules
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">
        <Icon name="server-off" size={16} />
        Retire agent
      </DropdownMenuItem>
    </>
  );

/**
 * **A row with nothing to do shows no ⋯** (Pranjal, 2026-10-27: "do not ever show view in the three dot ever. row click
 * already do that. If only view is visible in a table action then remove the full column"). `rowActions` answers
 * nothing - null, false, an empty fragment or list - for the two store gateways, so their Action cell stays (the
 * columns keep their line) but holds no ⋯. A page whose rows never have an action leaves `rowActions` out and the
 * column goes too.
 *
 * **Every ⋯ menu is at least 224 wide** (Pranjal, 2026-10-27: "increase the width by a little bit") - the floor, not
 * the width: a longer item still widens it. The story opens the first agent's menu.
 */
export const RowsWithAndWithoutActions: Story = {
  name: 'Rows with and without actions',
  render: () => <AgentsTable rowActions={agentActions} />,
  play: async ({ canvasElement }) => {
    const row = (await within(canvasElement).findByText('web-01')).closest('tr') as HTMLElement;
    await userEvent.click(within(row).getByRole('button', { name: 'Row actions' }));
    await expect(await within(document.body).findByRole('menu')).toBeVisible();
  },
};
