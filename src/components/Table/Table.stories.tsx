import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { Badge } from '../Badge';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { Toolbar, ToolbarButton, ToolbarSection, ToolbarSpacer } from '../Toolbar';
import {
  Table,
  TableBody,
  TableCell,
  TableColGroup,
  TableHead,
  TableHeader,
  TableLeadCell,
  TableLeadHead,
  TableRow,
  TableSelectAll,
  TableSelectionCell,
  TableTailCell,
  TableViewport,
} from './Table';
import { TableBulkAction, TableBulkBar, TableBulkSeparator } from './TableBulkBar';
import { ContactChips, PersonCell, TagList, TableEmptyValue } from './TableCells';
import { TableLoadMore, TablePager } from './TablePager';
import { TableBlank, TableSkeleton } from './TableStates';
import { sampleUsers } from './sampleUsers';

const USERS = sampleUsers(8);
const WIDTHS = [60, 200, 217, 200, 200];
const PAGE = sampleUsers(25);
const PAGE_WIDTHS = [60, 200, 217, 200, 200, 200, 200];
const PAGE_TABLE_WIDTH = PAGE_WIDTHS.reduce((a, b) => a + b, 0) + 60;

/** The console's dock line: the 72px title band plus the 48px toolbar band, less the 2px the card's top edge slides under. */
const DOCK_LINE = 118;
/** The card morphs over the last 140px of its approach. */
const DOCK_RANGE = 140;
/** The page's side margin the docked card grows into. */
const PAGE_INSET = 24;

/**
 * The page's half of docking, kept in the story on purpose: the table only
 * decides how a docked card looks, a page decides when. This helper reads the
 * card's distance to the dock line on every scroll frame and turns it into the
 * 0..1 morph, sizes the card to the room under the dock line, and puts the
 * rows back to their top when the card lets go. The real one belongs with the
 * page scaffold.
 */
function useDockOnScroll(
  scroller: RefObject<HTMLDivElement | null>,
  card: RefObject<HTMLDivElement | null>,
  rows: RefObject<HTMLDivElement | null>
) {
  const [morph, setMorph] = useState(0);
  const [height, setHeight] = useState<number | undefined>(undefined);
  useEffect(() => {
    const sc = scroller.current;
    const el = card.current;
    if (!sc || !el) return undefined;
    let raf = 0;
    let last = 0;
    const size = () => {
      setHeight(sc.clientHeight - DOCK_LINE);
    };
    const apply = () => {
      raf = 0;
      const top = el.getBoundingClientRect().top - sc.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, (DOCK_LINE + DOCK_RANGE - top) / DOCK_RANGE));
      if (last >= 1 && p < 1 && rows.current) rows.current.scrollTop = 0;
      last = p;
      setMorph(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    size();
    apply();
    sc.addEventListener('scroll', onScroll, { passive: true });
    const ro = new ResizeObserver(() => {
      size();
      onScroll();
    });
    ro.observe(sc);
    return () => {
      sc.removeEventListener('scroll', onScroll);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scroller, card, rows]);
  return { morph, height };
}

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Pieces',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'The pieces `DataTable` is built from, shown on their own so each can be reviewed: the headings and their states, the selection column, the bulk bar, the two footers, the blank states, the skeleton, and the cells the Users list uses.',
          'Compose them by hand when a list needs something DataTable does not offer.',
        ].join('\n'),
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Table>;

/** Name sorted A to Z; Status carrying its quick filter: the wash and the azure glyph. Hover Email for the grip, the faint arrow and the "⋯". */
export const Headings: Story = {
  render: () => (
    <Table label="Headings">
      <TableViewport tableWidth={WIDTHS.reduce((a, b) => a + b, 60)}>
        <TableColGroup widths={WIDTHS} />
        <TableHeader>
          <tr>
            <TableSelectAll state="none" onToggle={() => undefined} onScope={() => undefined} />
            <TableHead
              columnKey="name"
              label="Name"
              width={200}
              frozen={60}
              frozenEdge
              sortable
              sort="asc"
            />
            <TableHead
              columnKey="email"
              label="Email"
              width={217}
              sortable
              movable
              resizable
              menu={<span className="mdt-px-2 mdt-text-xs">Menu items go here</span>}
            />
            <TableHead
              columnKey="contact"
              label="Contact"
              width={200}
              movable
              resizable
              menu={<span className="mdt-px-2 mdt-text-xs">Menu items go here</span>}
            />
            <TableHead
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
            <TableTailCell head />
          </tr>
        </TableHeader>
        <TableBody>
          {USERS.slice(0, 3).map((u, i) => (
            <TableRow key={u.id}>
              <TableSelectionCell
                index={i + 1}
                selected={false}
                label={u.name}
                onToggle={() => undefined}
              />
              <TableCell frozen={60} frozenEdge>
                <PersonCell name={u.name} owner={u.owner} />
              </TableCell>
              <TableCell>
                <span className="mdt-text-muted-foreground">{u.email}</span>
              </TableCell>
              <TableCell>
                <ContactChips email={u.email} phone={u.phone} />
              </TableCell>
              <TableCell>
                <Badge size="sm" tone="success" dot>
                  Active
                </Badge>
              </TableCell>
              <TableTailCell />
            </TableRow>
          ))}
        </TableBody>
      </TableViewport>
    </Table>
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
      <Table label="Selection">
        <TableViewport tableWidth={60 + 200 + 217 + 60} hasSelection={picked.size > 0}>
          <TableColGroup widths={[60, 200, 217]} />
          <TableHeader>
            <tr>
              <TableSelectAll
                state={state}
                onToggle={() => {
                  setPicked(state === 'all' ? new Set() : new Set(ids));
                }}
                onScope={() => undefined}
              />
              <TableHead columnKey="name" label="Name" width={200} frozen={60} frozenEdge />
              <TableHead columnKey="email" label="Email" width={217} />
              <TableTailCell head />
            </tr>
          </TableHeader>
          <TableBody>
            {USERS.map((u, i) => {
              const inert = u.status === 'Invited';
              return (
                <TableRow
                  key={u.id}
                  selected={picked.has(u.id)}
                  inert={inert}
                  onToggle={() => {
                    toggle(u.id);
                  }}
                >
                  <TableSelectionCell
                    index={i + 1}
                    selected={picked.has(u.id)}
                    inert={inert}
                    label={u.name}
                    onToggle={() => {
                      toggle(u.id);
                    }}
                  />
                  <TableCell frozen={60} frozenEdge>
                    <PersonCell name={u.name} owner={u.owner} muted={inert} />
                  </TableCell>
                  <TableCell>
                    <span className="mdt-text-muted-foreground">{u.email}</span>
                  </TableCell>
                  <TableTailCell />
                </TableRow>
              );
            })}
          </TableBody>
        </TableViewport>
        <TableBulkBar
          count={picked.size}
          onClear={() => {
            setPicked(new Set());
          }}
        >
          <TableBulkAction icon={<Icon name="toggle-right" />}>Activate</TableBulkAction>
          <TableBulkAction icon={<Icon name="toggle-left" />}>Deactivate</TableBulkAction>
          <TableBulkSeparator />
          <TableBulkAction icon={<Icon name="trash-2" />}>Delete</TableBulkAction>
        </TableBulkBar>
        <TablePager
          total={USERS.length}
          page={1}
          pageSize={25}
          onPage={() => undefined}
          onPageSize={() => undefined}
          noun="users"
        />
      </Table>
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
        <Table label="Pager">
          <TablePager
            total={10001}
            page={page}
            pageSize={size}
            onPage={setPage}
            onPageSize={setSize}
            noun="users"
          />
        </Table>
        <Table label="Load more">
          <TableLoadMore
            shown={shown}
            total={10001}
            noun="users"
            onMore={() => {
              setShown((n) => n + 25);
            }}
          />
        </Table>
      </div>
    );
  },
};

/** Nothing yet, nothing found, could not load. Centred in the card: an icon, a title, one line, one button. */
export const BlankStates: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-6">
      {(['first', 'empty', 'error'] as const).map((kind) => (
        <Table key={kind} label={kind}>
          <TableBlank kind={kind} onAction={() => undefined} />
          <TablePager
            total={0}
            page={1}
            pageSize={25}
            onPage={() => undefined}
            onPageSize={() => undefined}
            noun="users"
            message={
              kind === 'first'
                ? 'No users'
                : kind === 'empty'
                  ? 'No users match'
                  : 'Users not loaded'
            }
          />
        </Table>
      ))}
    </div>
  ),
};

/** Five grey rows while the list loads. */
export const Skeleton: Story = {
  render: () => (
    <Table label="Loading">
      <TableViewport tableWidth={WIDTHS.reduce((a, b) => a + b, 60)}>
        <TableColGroup widths={WIDTHS} />
        <TableHeader>
          <tr>
            <TableSelectAll state="none" onToggle={() => undefined} onScope={() => undefined} />
            <TableHead columnKey="name" label="Name" width={200} frozen={60} frozenEdge />
            <TableHead columnKey="email" label="Email" width={217} />
            <TableHead columnKey="contact" label="Contact" width={200} />
            <TableHead columnKey="status" label="Status" width={200} />
            <TableTailCell head />
          </tr>
        </TableHeader>
        <TableSkeleton widths={WIDTHS} />
      </TableViewport>
      <TablePager
        total={0}
        page={1}
        pageSize={25}
        onPage={() => undefined}
        onPageSize={() => undefined}
        noun="users"
        message="Loading users…"
      />
    </Table>
  ),
};

/** The cells the Users list uses: the person, the contact chips, teams with a "+N", a missing value. Every pill is Badge. */
export const Cells: Story = {
  render: () => (
    <div className="mdt-grid mdt-grid-cols-[160px_1fr] mdt-items-center mdt-gap-x-6 mdt-gap-y-4 mdt-text-xs">
      <span className="mdt-text-muted-foreground">Person, owner</span>
      <PersonCell name="Sarah Johnson" owner />
      <span className="mdt-text-muted-foreground">Person, invited</span>
      <PersonCell name="Priya Natarajan" muted />
      <span className="mdt-text-muted-foreground">Contact</span>
      <ContactChips email="sarah.johnson@company.com" phone="+1 415 555 0100" />
      <span className="mdt-text-muted-foreground">Contact, none</span>
      <ContactChips />
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
      <TagList items={['Platform', 'Security', 'Finance', 'Design']} />
      <span className="mdt-text-muted-foreground">Missing value</span>
      <TableEmptyValue />
    </div>
  ),
};

/** The card becomes the page. Scroll the frame: the card grows into the 24px margins, its corners square off, and at the dock line under the toolbar the rows scroll inside it with the header and pager pinned. Scroll the rows back to their top and the page takes over again. The table only decides how the docked card looks; the small helper in this story is the page's half, and belongs with the page scaffold. */
export const DocksOnScroll: Story = {
  parameters: { layout: 'fullscreen' },
  render: function DocksOnScrollStory() {
    const scroller = useRef<HTMLDivElement>(null);
    const card = useRef<HTMLDivElement>(null);
    const rows = useRef<HTMLDivElement>(null);
    const { morph, height } = useDockOnScroll(scroller, card, rows);
    const [picked, setPicked] = useState<Set<string>>(new Set());
    const toggle = (id: string) => {
      setPicked((s) => {
        const n = new Set(s);
        if (n.has(id)) n.delete(id);
        else n.add(id);
        return n;
      });
    };
    const ids = PAGE.filter((u) => u.status !== 'Invited').map((u) => u.id);
    const state = picked.size === 0 ? 'none' : ids.every((id) => picked.has(id)) ? 'all' : 'some';
    const kpi = [
      ['Total users', '10,001', '+120 this month'],
      ['Active', '7,004', '70% of everyone'],
      ['Invited', '1,012', '38 waiting a week or more'],
    ];
    return (
      <div
        ref={scroller}
        className="mdt-h-[720px] mdt-overflow-y-auto mdt-bg-neutral-10 mdt-font-sans mdt-text-neutral-130 dark:mdt-bg-neutral-130 dark:mdt-text-neutral-10"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="mdt-sticky mdt-top-0 mdt-z-10 mdt-bg-neutral-10 mdt-px-6 dark:mdt-bg-neutral-130">
          <div className="mdt-flex mdt-h-[72px] mdt-items-center">
            <h1 className="mdt-m-0 mdt-text-xl mdt-font-semibold">Users</h1>
          </div>
          <Toolbar className="mdt-h-12">
            <ToolbarSection>
              <Input size="sm" placeholder="Search users" className="mdt-w-[300px]" />
            </ToolbarSection>
            <ToolbarSpacer />
            <ToolbarSection>
              <ToolbarButton icon={<Icon name="arrow-up-down" />} aria-label="Sort" />
              <ToolbarButton icon={<Icon name="columns" />} aria-label="Manage columns" />
            </ToolbarSection>
          </Toolbar>
        </div>
        <div className="mdt-px-6 mdt-pt-6">
          <div className="mdt-mb-6 mdt-grid mdt-grid-cols-3 mdt-gap-4">
            {kpi.map(([k, v, note]) => (
              <div
                key={k}
                className="mdt-rounded-xl mdt-border mdt-border-solid mdt-border-neutral-20 mdt-bg-background mdt-p-5 dark:mdt-border-neutral-120"
              >
                <div className="mdt-text-xs mdt-text-muted-foreground">{k}</div>
                <div className="mdt-mt-1 mdt-text-2xl mdt-font-semibold mdt-tabular-nums">{v}</div>
                <div className="mdt-mt-1 mdt-text-xs mdt-text-muted-foreground">{note}</div>
              </div>
            ))}
          </div>
          <Table
            ref={card}
            label="Users"
            docked={morph}
            style={{
              height,
              width: `calc(100% + ${String(PAGE_INSET * 2 * morph)}px)`,
              marginInline: -PAGE_INSET * morph,
            }}
          >
            <TableViewport ref={rows} tableWidth={PAGE_TABLE_WIDTH} hasSelection={picked.size > 0}>
              <TableColGroup widths={PAGE_WIDTHS} />
              <TableHeader>
                <tr>
                  <TableSelectAll
                    state={state}
                    onToggle={() => {
                      setPicked(state === 'all' ? new Set() : new Set(ids));
                    }}
                    onScope={() => undefined}
                  />
                  <TableHead columnKey="name" label="Name" width={200} frozen={60} frozenEdge />
                  <TableHead columnKey="email" label="Email" width={217} movable resizable />
                  <TableHead columnKey="status" label="Status" width={200} movable sortable />
                  <TableHead columnKey="source" label="Source" width={200} movable />
                  <TableHead columnKey="teams" label="Teams" width={200} movable />
                  <TableHead columnKey="role" label="Role" width={200} movable />
                  <TableTailCell head />
                </tr>
              </TableHeader>
              <TableBody>
                {PAGE.map((u, i) => {
                  const inert = u.status === 'Invited';
                  return (
                    <TableRow
                      key={u.id}
                      selected={picked.has(u.id)}
                      inert={inert}
                      onToggle={() => {
                        toggle(u.id);
                      }}
                    >
                      <TableSelectionCell
                        index={i + 1}
                        selected={picked.has(u.id)}
                        inert={inert}
                        label={u.name}
                        onToggle={() => {
                          toggle(u.id);
                        }}
                      />
                      <TableCell frozen={60} frozenEdge>
                        <PersonCell name={u.name} owner={u.owner} muted={inert} />
                      </TableCell>
                      <TableCell>
                        <span className="mdt-text-muted-foreground">{u.email}</span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          size="sm"
                          tone={
                            u.status === 'Active'
                              ? 'success'
                              : u.status === 'Inactive'
                                ? 'slate'
                                : 'warning'
                          }
                          dot
                        >
                          {u.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge size="sm" shape="square">
                          {u.source}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <TagList items={u.teams} />
                      </TableCell>
                      <TableCell>{u.role}</TableCell>
                      <TableTailCell />
                    </TableRow>
                  );
                })}
              </TableBody>
            </TableViewport>
            <TableBulkBar
              count={picked.size}
              onClear={() => {
                setPicked(new Set());
              }}
            >
              <TableBulkAction icon={<Icon name="toggle-right" />}>Activate</TableBulkAction>
              <TableBulkAction icon={<Icon name="toggle-left" />}>Deactivate</TableBulkAction>
              <TableBulkSeparator />
              <TableBulkAction icon={<Icon name="trash-2" />}>Delete</TableBulkAction>
            </TableBulkBar>
            <TablePager
              total={10001}
              page={1}
              pageSize={25}
              onPage={() => undefined}
              onPageSize={() => undefined}
              noun="users"
            />
          </Table>
        </div>
      </div>
    );
  },
};

/**
 * **Scroll this one.** The table drives itself: it takes the whole height under
 * the dock line, widens to the page as it reaches it, then hands the scroll to
 * its own rows.
 *
 * It holds **one row**. That is the point — expansion is a property of the
 * table, not of how much happens to be in it, so a filtered-down list does not
 * suddenly behave like a different component, and the pager does not float up
 * under a short list. (Pranjal's rule, 2026-09-10.)
 *
 * **This is the default.** `expand` is written out below only to say so out
 * loud; leave it off and you get the same table. A table with no page to fill —
 * in a drawer, a modal or a card — quietly stays an ordinary card instead, so
 * the default costs nothing where it does not apply. `expand={false}` opts out.
 */
export const ExpandsWithASingleRow: Story = {
  render: () => (
    <div
      style={{
        height: 460,
        overflowY: 'auto',
        border: '1px solid hsl(var(--mdt-neutral-20))',
        // the two band heights a PageFrame publishes; the table reads them
        ['--mdt-band-b1-h' as string]: '60px',
        ['--mdt-band-b2t-h' as string]: '60px',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 36,
          height: 60,
          background: 'hsl(var(--mdt-background))',
          borderBottom: '1px solid hsl(var(--mdt-neutral-20))',
        }}
      />
      <div style={{ height: 140, padding: 16 }}>A hero band, which scrolls away.</div>
      <div
        style={{
          position: 'sticky',
          top: 58,
          zIndex: 35,
          height: 60,
          background: 'hsl(var(--mdt-background))',
        }}
      />
      <div style={{ padding: '6px 24px 20px' }}>
        <Table label="One row, expanding" expand>
          <div style={{ padding: 16 }}>A single row.</div>
        </Table>
      </div>
    </div>
  ),
};

/**
 * **The lead column is one slot with two occupants.**
 *
 * A table that can act on many rows at once puts a checkbox here. A table that
 * cannot puts the row number, under a **hash** — not a blank heading, which
 * read as a column somebody forgot to label and left the numbers underneath
 * with no name.
 *
 * Same slot, same 60px, same alignment. A page that later grows bulk actions
 * changes nothing about its columns, and a page that loses them leaves no hole.
 *
 * **The page does not choose which.** It says whether it has bulk actions and
 * `TableLeadHead` / `TableLeadCell` draw the right one. That is the whole
 * reason this is one component rather than two the caller has to keep in step.
 *
 * (Pranjal, 2026-09-11.)
 */
export const TheLeadColumn: Story = {
  render: function LeadColumn() {
    const [picked, setPicked] = useState<number[]>([2]);
    const people = ['Sarah Johnson', 'Michael Smith', 'Emily Davis'];
    const both: { selectable: boolean; caption: string }[] = [
      { selectable: false, caption: 'No bulk actions — a hash, and the row number' },
      { selectable: true, caption: 'With bulk actions — a checkbox in the same slot' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {both.map((v) => (
          <div key={v.caption} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 12, color: 'hsl(var(--mdt-neutral-90))' }}>{v.caption}</div>
            <Table label={v.caption}>
              <TableViewport tableWidth={620} label={v.caption}>
                <TableColGroup widths={[60, 240, 200]} />
                <TableHeader>
                  <TableRow inert>
                    <TableLeadHead
                      selectable={v.selectable}
                      state={picked.length === 0 ? 'none' : picked.length === 3 ? 'all' : 'some'}
                      onToggle={() => {
                        setPicked((p) => (p.length === 0 ? [0, 1, 2] : []));
                      }}
                      onScope={() => undefined}
                    />
                    <TableHead columnKey="name" label="Name" width={240} />
                    <TableHead columnKey="role" label="Role" width={200} />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {people.map((name, i) => (
                    <TableRow key={name} selected={v.selectable && picked.includes(i)}>
                      <TableLeadCell
                        index={i + 1}
                        label={`Select ${name}`}
                        selectable={v.selectable}
                        selected={picked.includes(i)}
                        onToggle={() => {
                          setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
                        }}
                      />
                      <TableCell>{name}</TableCell>
                      <TableCell>Operator</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableViewport>
            </Table>
          </div>
        ))}
      </div>
    );
  },
};
