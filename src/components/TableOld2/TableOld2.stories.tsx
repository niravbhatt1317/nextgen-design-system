import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Badge } from '../Badge';
import { Icon } from '../Icon';
import {
  TableOld2,
  TableBodyOld2,
  TableCellOld2,
  TableColGroupOld2,
  TableHeadOld2,
  TableHeaderOld2,
  TableRowOld2,
  TableSelectAllOld2,
  TableSelectionCellOld2,
  TableTailCellOld2,
  TableViewportOld2,
} from './TableOld2';
import { TableBulkActionOld2, TableBulkBarOld2, TableBulkSeparatorOld2 } from './TableBulkBarOld2';
import { ContactChipsOld2, PersonCellOld2, TagListOld2, TableEmptyValueOld2 } from './TableCells';
import { TableLoadMoreOld2, TablePagerOld2 } from './TablePagerOld2';
import { sampleUsers } from './sampleUsers';

const USERS = sampleUsers(8);
const WIDTHS = [60, 200, 217, 200, 200];

const meta: Meta<typeof TableOld2> = {
  title: 'Deprecated 2/DataTable Old/Pieces',
  component: TableOld2,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    status: {
      type: 'deprecated',
      since: '0.5.1',
      deprecation: {
        deprecatedSince: '0.5.1',
        removalIn: 'to be set by Nirav',
        replacement: 'Table',
        message:
          'The Table pieces as they were before 11 September 2026. Deprecated 2026-09-22 when Pranjal ruled the new ones in; kept for side-by-side review; Nirav sets the removal version.',
      },
    },
    docs: {
      description: {
        component: [
          '## ⚠️ Deprecated — use `Table`',
          '',
          'The Table pieces as they were before 11 September 2026. Deprecated 2026-09-22 when',
          'Pranjal ruled the new ones in; kept for side-by-side review; Nirav sets the removal version.',
          '',
          '**Do not start anything new on them.**',
          '',
          'The pieces `DataTableOld2` is built from, shown on their own so each can be compared',
          'with the live one: the headings and their states, the selection column, the bulk bar,',
          'the two footers, and the cells the Users list uses.',
        ].join('\n'),
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof TableOld2>;

/** Name sorted A to Z; Status carrying its quick filter: the wash and the azure glyph. Hover Email for the grip, the faint arrow and the "⋯". */
export const Headings: Story = {
  render: () => (
    <TableOld2 label="Headings">
      <TableViewportOld2 tableWidth={WIDTHS.reduce((a, b) => a + b, 60)}>
        <TableColGroupOld2 widths={WIDTHS} />
        <TableHeaderOld2>
          <tr>
            <TableSelectAllOld2 state="none" onToggle={() => undefined} onScope={() => undefined} />
            <TableHeadOld2
              columnKey="name"
              label="Name"
              width={200}
              frozen={60}
              frozenEdge
              sortable
              sort="asc"
            />
            <TableHeadOld2
              columnKey="email"
              label="Email"
              width={217}
              sortable
              movable
              resizable
              menu={<span className="mdt-px-2 mdt-text-xs">Menu items go here</span>}
            />
            <TableHeadOld2
              columnKey="contact"
              label="Contact"
              width={200}
              movable
              resizable
              menu={<span className="mdt-px-2 mdt-text-xs">Menu items go here</span>}
            />
            <TableHeadOld2
              columnKey="status"
              label="Status"
              width={200}
              sortable
              movable
              resizable
              filtered
              glyph={<Icon name="loader" size={14} />}
              menu={<span className="mdt-px-2 mdt-text-xs">Menu items go here</span>}
            />
            <TableTailCellOld2 head />
          </tr>
        </TableHeaderOld2>
        <TableBodyOld2>
          {USERS.slice(0, 3).map((u, i) => (
            <TableRowOld2 key={u.id}>
              <TableSelectionCellOld2
                index={i + 1}
                selected={false}
                label={u.name}
                onToggle={() => undefined}
              />
              <TableCellOld2 frozen={60} frozenEdge>
                <PersonCellOld2 name={u.name} owner={u.owner} />
              </TableCellOld2>
              <TableCellOld2>
                <span className="mdt-text-muted-foreground">{u.email}</span>
              </TableCellOld2>
              <TableCellOld2>
                <ContactChipsOld2 email={u.email} phone={u.phone} />
              </TableCellOld2>
              <TableCellOld2>
                <Badge size="sm" tone="success" dot>
                  Active
                </Badge>
              </TableCellOld2>
              <TableTailCellOld2 />
            </TableRowOld2>
          ))}
        </TableBodyOld2>
      </TableViewportOld2>
    </TableOld2>
  ),
};

/** Row numbers at rest; pick one and every row shows its checkbox. Tab to a row: Space picks, Enter opens, ↑ ↓ move. */
export const Selection: Story = {
  render: function SelectionStory() {
    const [picked, setPicked] = useState<Set<string>>(new Set());
    const toggle = (id: string) => {
      setPicked((s) => {
        const n = new Set(s);
        if (n.has(id)) n.delete(id);
        else n.add(id);
        return n;
      });
    };
    const ids = USERS.filter((u) => u.status !== 'Invited').map((u) => u.id);
    const state = picked.size === 0 ? 'none' : ids.every((id) => picked.has(id)) ? 'all' : 'some';
    return (
      <TableOld2 label="Selection">
        <TableViewportOld2 tableWidth={60 + 200 + 217 + 60} hasSelection={picked.size > 0}>
          <TableColGroupOld2 widths={[60, 200, 217]} />
          <TableHeaderOld2>
            <tr>
              <TableSelectAllOld2
                state={state}
                onToggle={() => {
                  setPicked(state === 'all' ? new Set() : new Set(ids));
                }}
                onScope={() => undefined}
              />
              <TableHeadOld2 columnKey="name" label="Name" width={200} frozen={60} frozenEdge />
              <TableHeadOld2 columnKey="email" label="Email" width={217} />
              <TableTailCellOld2 head />
            </tr>
          </TableHeaderOld2>
          <TableBodyOld2>
            {USERS.map((u, i) => {
              const inert = u.status === 'Invited';
              return (
                <TableRowOld2
                  key={u.id}
                  selected={picked.has(u.id)}
                  inert={inert}
                  onToggle={() => {
                    toggle(u.id);
                  }}
                >
                  <TableSelectionCellOld2
                    index={i + 1}
                    selected={picked.has(u.id)}
                    inert={inert}
                    label={u.name}
                    onToggle={() => {
                      toggle(u.id);
                    }}
                  />
                  <TableCellOld2 frozen={60} frozenEdge>
                    <PersonCellOld2 name={u.name} owner={u.owner} muted={inert} />
                  </TableCellOld2>
                  <TableCellOld2>
                    <span className="mdt-text-muted-foreground">{u.email}</span>
                  </TableCellOld2>
                  <TableTailCellOld2 />
                </TableRowOld2>
              );
            })}
          </TableBodyOld2>
        </TableViewportOld2>
        <TableBulkBarOld2
          count={picked.size}
          onClear={() => {
            setPicked(new Set());
          }}
        >
          <TableBulkActionOld2 icon={<Icon name="toggle-right" />}>Activate</TableBulkActionOld2>
          <TableBulkActionOld2 icon={<Icon name="toggle-left" />}>Deactivate</TableBulkActionOld2>
          <TableBulkSeparatorOld2 />
          <TableBulkActionOld2 icon={<Icon name="trash-2" />}>Delete</TableBulkActionOld2>
        </TableBulkBarOld2>
        <TablePagerOld2
          total={USERS.length}
          page={1}
          pageSize={25}
          onPage={() => undefined}
          onPageSize={() => undefined}
          noun="users"
        />
      </TableOld2>
    );
  },
};

/** The two footers: the pager built for 401 pages, and the "Load more" strip. */
export const Footers: Story = {
  render: function FootersStory() {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(25);
    const [shown, setShown] = useState(25);
    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-6">
        <TableOld2 label="Pager">
          <TablePagerOld2
            total={10001}
            page={page}
            pageSize={size}
            onPage={setPage}
            onPageSize={setSize}
            noun="users"
          />
        </TableOld2>
        <TableOld2 label="Load more">
          <TableLoadMoreOld2
            shown={shown}
            total={10001}
            noun="users"
            onMore={() => {
              setShown((n) => n + 25);
            }}
          />
        </TableOld2>
      </div>
    );
  },
};

/** Nothing yet, nothing found, could not load. Centred in the card: an icon, a title, one line, one button. */
/** The cells the Users list uses: the person, the contact chips, teams with a "+N", a missing value. Every pill is Badge. */
export const Cells: Story = {
  render: () => (
    <div className="mdt-grid mdt-grid-cols-[160px_1fr] mdt-items-center mdt-gap-x-6 mdt-gap-y-4 mdt-text-xs">
      <span className="mdt-text-muted-foreground">Person, owner</span>
      <PersonCellOld2 name="Sarah Johnson" owner />
      <span className="mdt-text-muted-foreground">Person, invited</span>
      <PersonCellOld2 name="Priya Natarajan" muted />
      <span className="mdt-text-muted-foreground">Contact</span>
      <ContactChipsOld2 email="sarah.johnson@company.com" phone="+1 415 555 0100" />
      <span className="mdt-text-muted-foreground">Contact, none</span>
      <ContactChipsOld2 />
      <span className="mdt-text-muted-foreground">Status</span>
      <span className="mdt-flex mdt-gap-2">
        <Badge size="sm" tone="success" dot>
          Active
        </Badge>
        <Badge size="sm" tone="slate" dot>
          Inactive
        </Badge>
        <Badge size="sm" tone="warning" dot>
          Invited
        </Badge>
      </span>
      <span className="mdt-text-muted-foreground">Source</span>
      <span className="mdt-flex mdt-gap-2">
        <Badge size="sm" shape="square">
          Manual
        </Badge>
        <Badge size="sm" shape="square" palette={{ fill: '#F2F3FD', ink: '#4F5BC4' }}>
          LDAP
        </Badge>
        <Badge size="sm" shape="square" palette={{ fill: '#EDF8F7', ink: '#1F7A71' }}>
          SCIM
        </Badge>
      </span>
      <span className="mdt-text-muted-foreground">Teams</span>
      <TagListOld2 items={['Platform', 'Security', 'Finance', 'Design']} />
      <span className="mdt-text-muted-foreground">Missing value</span>
      <TableEmptyValueOld2 />
    </div>
  ),
};
