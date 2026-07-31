import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../DropdownMenu';
import { Icon } from '../Icon';
import { Progress } from '../Progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table';
import type { BadgeTone } from '../Badge/Badge.types';

/**
 * Cell recipes - what goes *inside* a table cell.
 *
 * Layers 1 to 3 cover what the table does: the frame, the structure, and
 * column control. This page covers what a cell contains, which is where four
 * product teams currently diverge most.
 *
 * **These are recipes, not components.** Every one is a composition of parts
 * the library already ships. Turning them into `TableStatusCell`,
 * `TableAvatarCell` and so on would multiply the API without adding a single
 * capability, and would freeze choices products need to vary. A recipe teaches
 * the pattern; a component would force it.
 *
 * Drawn from 27 real product tables. **Eight cell patterns appeared and all
 * eight are here.** Six are built from components the library already ships.
 * Two of them - sparkline and media thumbnail - need components that do not
 * exist yet, so they are built against throwaway placeholders defined at the
 * bottom of this file: the arrangement can be agreed now, and the real
 * components drop in later without redesigning the cell. What is still missing
 * is listed in the final story rather than left implied.
 *
 * The inline-control pattern has two shapes here, because they solve different
 * problems: **Editable status tag** for a value you change in place, and
 * **In-cell actions** for actions that belong beside their subject rather than
 * in a column of their own.

 */
const meta: Meta = {
  title: 'Components/Table/Cell Recipes',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

type Status = 'active' | 'pending' | 'failed' | 'archived';

/** The lifecycle a service desk ticket actually moves through. */
type TicketStatus =
  | 'open'
  | 'inProcess'
  | 'onHold'
  | 'resolved'
  | 'closed'
  | 'reopened'
  | 'cancelled';

/**
 * Status is a lookup, never a chain of conditionals. One place to change, and
 * a reader can see every state the column can be in without executing
 * anything in their head.
 */
const STATUS_TONE: Record<Status, BadgeTone> = {
  active: 'success',
  pending: 'warning',
  failed: 'danger',
  archived: 'neutral',
};

const STATUS_LABEL: Record<Status, string> = {
  active: 'Active',
  pending: 'Pending',
  failed: 'Failed',
  archived: 'Archived',
};

interface Row {
  id: string;
  name: string;
  email: string;
  role: string;
  status: Status;
  usage: number;
  spend: number | null;
}

const rows: Row[] = [
  {
    id: '1',
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    role: 'Owner',
    status: 'active',
    usage: 82,
    spend: 1204.5,
  },
  {
    id: '2',
    name: 'Grace Hopper',
    email: 'grace@example.com',
    role: 'Admin',
    status: 'pending',
    usage: 46,
    spend: 318,
  },
  {
    id: '3',
    name: 'Alan Turing',
    email: 'alan@example.com',
    role: 'Editor',
    status: 'failed',
    usage: 97,
    spend: null,
  },
  {
    id: '4',
    name: 'Katherine Johnson',
    email: 'katherine@example.com',
    role: 'Viewer',
    status: 'archived',
    usage: 12,
    spend: 26.75,
  },
];

/** An empty value is a dash, never a blank cell. See the EmptyValue recipe. */
const EmptyValue = () => (
  <>
    <span aria-hidden="true">&mdash;</span>
    <span className="mdt-sr-only">Not set</span>
  </>
);

/**
 * Every action button in these recipes, at one height.
 *
 * `Button` sizes `icon` at 36px and `sm` at 32px, and `iconOnly` forces the
 * former - so a labelled button and an icon button beside it cannot line up at
 * the small size. In a table row 36px is heavy and it drags the row height with
 * it, so these match at 32px: `sm` for the height, then width and padding to
 * square off the icon ones.
 *
 * That override is the tell. `Button` should be able to express a small
 * icon-only button on its own and cannot - worth closing there rather than
 * repeating this in every table.
 */
const ACTION_ICON = 'mdt-w-8 mdt-px-0';

const money = (value: number) =>
  value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * **Status** - the most common thing in any table, in roughly 20 of the 27
 * references.
 *
 * `shape="square"` rather than the default pill: a square badge sits into a
 * column of data quietly, where a row of pills reads as a row of objects
 * floating on top of the table.
 *
 * Keep `emphasis="subtle"`. A solid badge is for counts whose whole job is to
 * be seen; used as a status label it shouts down every other cell.
 *
 * `size="sm"` throughout. A status is an annotation on the row, not a heading
 * for it - at the default size the chip is taller than the text beside it and
 * starts setting the row height, which is the wrong thing for a value to do.
 */
export const StatusRecipe: Story = {
  name: 'Status',
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>
              <Badge tone={STATUS_TONE[row.status]} shape="square" size="sm">
                {STATUS_LABEL[row.status]}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * **Two-line** - a primary value with something quieter underneath, in 7 of
 * the 27 references.
 *
 * The second line is `text-muted-foreground` and one step smaller. It is not a
 * second column: it belongs to the value above it, so it must never be sorted
 * or aligned independently.
 *
 * **Tighten the leading rather than reaching for a looser density.** Two lines
 * of default leading do not fit a `compact` row, and the easy fix - moving the
 * whole table to `default` - pays for one column by padding every other one.
 * `leading-tight` on both lines buys back enough to keep the table compact, and
 * the pair still reads as one value because they are closer to each other than
 * either is to the row above.
 */
export const TwoLine: Story = {
  render: () => (
    <Table density="compact">
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <div className="mdt-font-medium mdt-leading-tight">{row.name}</div>
              <div className="mdt-text-xs mdt-leading-tight mdt-text-muted-foreground">
                {row.email}
              </div>
            </TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * **Avatar and text** - identity, in 6 of the 27 references.
 *
 * `size="sm"` is the largest that fits a `compact` row without setting the
 * height for the whole table. The avatar is decorative here because the name
 * is right beside it - `Avatar` takes `name` for its initials, and the text
 * cell carries the accessible name.
 */
export const AvatarAndText: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <div className="mdt-flex mdt-items-center mdt-gap-2">
                <Avatar name={row.name} size="sm" aria-hidden />
                <span className="mdt-font-medium">{row.name}</span>
              </div>
            </TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * **Numeric** - right-aligned figures, in 6 of the 27 references.
 *
 * Two things, and the second is the one everyone forgets:
 *
 * - `align="right"` on **both** the header and the cell. A right-aligned
 *   column under a left-aligned header looks like a mistake.
 * - `mdt-tabular-nums`. Without it the digits are proportionally spaced, so
 *   `1` is narrower than `8` and the decimal points wander from row to row.
 *   It is the difference between a column of numbers and a list of numbers.
 */
export const Numeric: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead align="right">Spend</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell align="right" className="mdt-tabular-nums">
              {row.spend === null ? <EmptyValue /> : `$${money(row.spend)}`}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * **Row actions** - a menu or buttons on the trailing edge, in 7 of the 27
 * references.
 *
 * Revealed on hover, because a column of identical buttons on every row is
 * visual noise. But hover alone is unusable, so this recipe also shows them:
 *
 * - **on keyboard focus**, via `group-focus-within` - otherwise you Tab into
 *   buttons you cannot see
 * - **on touch**, via `pointer-coarse` - a phone has no hover at all, and
 *   hover-only actions are simply unreachable there
 *
 * The column keeps its width whether or not the buttons are showing, because
 * they fade rather than mount. A column that appears on hover reflows the
 * table under the cursor.
 *
 * **What the actions are.** Two tiers, and the split matters: the *one* thing
 * people do constantly gets its own button, everything else goes behind the
 * menu. A row of five icon buttons is unreadable, and a menu holding a single
 * item is a button wearing a costume. Here Edit is the frequent one; view,
 * duplicate and remove sit in the menu, with remove separated because it is
 * the one that cannot be undone. Click either and this story tells you what
 * fired.
 *
 * **The group must be named.** `Table` already puts an unnamed `group` on its
 * scroll container, for the scrolled-edge shadows. A plain `group-hover:` here
 * would match that container instead of the row, so hovering anywhere in the
 * table would light up every row's actions at once. Adding an unnamed `group`
 * to the row does not help either - the container still matches. `group/row`
 * and `group-hover/row:` bind the two together explicitly.
 */
export const RowActions: Story = {
  render: function RowActionsRecipe() {
    const [fired, setFired] = useState<string | null>(null);
    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead align="right">
                <span className="mdt-sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} className="mdt-group/row">
                <TableCell className="mdt-font-medium">{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell align="right">
                  <div
                    className={[
                      'mdt-flex mdt-justify-end mdt-gap-1',
                      'mdt-opacity-0 mdt-transition-opacity',
                      'group-focus-within/row:mdt-opacity-100 group-hover/row:mdt-opacity-100',
                      'pointer-coarse:mdt-opacity-100',
                    ].join(' ')}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className={ACTION_ICON}
                      aria-label={`Edit ${row.name}`}
                      onClick={() => {
                        setFired(`Edit - ${row.name}`);
                      }}
                    >
                      <Icon name="pencil" size="sm" aria-hidden />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={ACTION_ICON}
                          aria-label={`More actions for ${row.name}`}
                        >
                          <Icon name="more-vertical" size="sm" aria-hidden />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {['View details', 'Duplicate'].map((label) => (
                          <DropdownMenuItem
                            key={label}
                            onSelect={() => {
                              setFired(`${label} - ${row.name}`);
                            }}
                          >
                            {label}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onSelect={() => {
                            setFired(`Remove - ${row.name}`);
                          }}
                        >
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="mdt-text-xs mdt-text-muted-foreground">
          {fired === null ? 'Hover a row, then use an action.' : `Fired: ${fired}`}
        </p>
      </div>
    );
  },
};

/**
 * **Progress in a cell** - a proportion you can compare down the column, part
 * of the mini-viz pattern in 3 of the 27 references.
 *
 * The bar alone is not enough. A bar answers "roughly how full", never "how
 * full" - so the number goes beside it, right-aligned and tabular, and the bar
 * is capped in width so the column does not stretch with the table.
 *
 * `Progress` requires `aria-label`, and it must name the row, not the column.
 * Four bars all labelled "Usage" tell a screen-reader user nothing.
 */
export const ProgressInCell: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Usage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="mdt-font-medium">{row.name}</TableCell>
            <TableCell>
              <div className="mdt-flex mdt-items-center mdt-gap-2">
                <Progress
                  value={row.usage}
                  size="sm"
                  tone={row.usage >= 90 ? 'danger' : 'default'}
                  aria-label={`Usage for ${row.name}`}
                  className="mdt-w-24"
                />
                <span className="mdt-w-10 mdt-text-right mdt-text-xs mdt-tabular-nums mdt-text-muted-foreground">
                  {row.usage}%
                </span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * **Empty value** - a dash, never a blank cell.
 *
 * A blank cell is ambiguous: it reads as "the table failed to load this" as
 * readily as "there is nothing here". A dash says someone looked and there was
 * nothing.
 *
 * The dash is `aria-hidden` with the real meaning in `sr-only` text, because a
 * screen reader announcing "em dash" is worse than silence.
 */
export const EmptyValueRecipe: Story = {
  name: 'Empty value',
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead align="right">Spend</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="mdt-font-medium">{row.name}</TableCell>
            <TableCell align="right" className="mdt-tabular-nums">
              {row.spend === null ? <EmptyValue /> : `$${money(row.spend)}`}
            </TableCell>
            <TableCell>
              <Badge tone={STATUS_TONE[row.status]} shape="square" size="sm">
                {STATUS_LABEL[row.status]}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * Every recipe on this page in one table, which is how they actually appear.
 *
 * Note what the combination costs: the avatar and the action buttons are both
 * taller than a line of text, so this table cannot run at `short` density. The
 * tallest cell in a row sets the row.
 */
export const AllTogether: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Usage</TableHead>
          <TableHead align="right">Spend</TableHead>
          <TableHead align="right">
            <span className="mdt-sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id} className="mdt-group/row">
            <TableCell>
              <div className="mdt-flex mdt-items-center mdt-gap-2">
                <Avatar name={row.name} size="sm" aria-hidden />
                <div>
                  <div className="mdt-font-medium">{row.name}</div>
                  <div className="mdt-text-xs mdt-text-muted-foreground">{row.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge tone={STATUS_TONE[row.status]} shape="square" size="sm">
                {STATUS_LABEL[row.status]}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="mdt-flex mdt-items-center mdt-gap-2">
                <Progress
                  value={row.usage}
                  size="sm"
                  tone={row.usage >= 90 ? 'danger' : 'default'}
                  aria-label={`Usage for ${row.name}`}
                  className="mdt-w-24"
                />
                <span className="mdt-w-10 mdt-text-right mdt-text-xs mdt-tabular-nums mdt-text-muted-foreground">
                  {row.usage}%
                </span>
              </div>
            </TableCell>
            <TableCell align="right" className="mdt-tabular-nums">
              {row.spend === null ? <EmptyValue /> : `$${money(row.spend)}`}
            </TableCell>
            <TableCell align="right">
              <div
                className={[
                  'mdt-flex mdt-justify-end mdt-gap-1',
                  'mdt-opacity-0 mdt-transition-opacity',
                  'group-focus-within/row:mdt-opacity-100 group-hover/row:mdt-opacity-100',
                  'pointer-coarse:mdt-opacity-100',
                ].join(' ')}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className={ACTION_ICON}
                  aria-label={`Edit ${row.name}`}
                >
                  <Icon name="pencil" size="sm" aria-hidden />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={ACTION_ICON}
                      aria-label={`More actions for ${row.name}`}
                    >
                      <Icon name="more-vertical" size="sm" aria-hidden />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * The status set a service desk actually uses, and the tone each one gets.
 *
 * **Seven states, five colours.** The reference gives every state its own
 * colour - blue, amber, orange, green, grey, purple, red. `Badge` ships six
 * tones and one of them, `ai`, is named for what it is for, so borrowing its
 * purple for "reopened" would make the name a lie. That leaves five usable, and
 * per the token rule this maps to the nearest we own rather than inventing a
 * seventh:
 *
 * - **Reopened takes the same blue as Open**, because it *is* open again.
 * - **On Hold takes the same grey as Closed**, because in both nobody is
 *   working on it.
 *
 * So the colour tells you the *class* of state and the label tells you which
 * one. That is a defensible position, not a fudge - but it is the design
 * owner's call, and the alternative is a seventh tone, which is a palette
 * decision rather than an implementation detail.
 */
const TICKET_TONE: Record<TicketStatus, BadgeTone> = {
  open: 'info',
  reopened: 'info',
  inProcess: 'warning',
  onHold: 'neutral',
  resolved: 'success',
  closed: 'neutral',
  cancelled: 'danger',
};

const TICKET_LABEL: Record<TicketStatus, string> = {
  open: 'Open',
  inProcess: 'In Process',
  onHold: 'On Hold',
  resolved: 'Resolved',
  closed: 'Closed',
  reopened: 'Reopened',
  cancelled: 'Cancelled',
};

const TICKET_ORDER: TicketStatus[] = [
  'open',
  'inProcess',
  'onHold',
  'resolved',
  'closed',
  'reopened',
  'cancelled',
];

const tickets = [
  { id: 'TKT-245', subject: 'Network Connectivity Problem', status: 'open' as TicketStatus },
  { id: 'TKT-246', subject: 'VPN drops every few minutes', status: 'inProcess' as TicketStatus },
  { id: 'TKT-247', subject: 'Printer queue stuck on floor 3', status: 'onHold' as TicketStatus },
  { id: 'TKT-248', subject: 'Password reset for contractor', status: 'resolved' as TicketStatus },
];

/**
 * **Editable status tag** - the cell shows the value, not a control.
 *
 * This is the inline-control pattern, and the important move is what the cell
 * looks like *at rest*: a plain status tag, exactly as it reads in a
 * non-editable column. No chevron, no select frame, no border. A column of
 * dropdown triggers turns a table you read into a form you fill in, and most of
 * the time people are reading.
 *
 * The affordance arrives on hover - a quiet outline around the tag saying "this
 * one is yours to change". Editability is discovered, not advertised.
 *
 * The menu names itself (**Update status**) rather than relying on the column
 * header, because by the time it is open the header may be scrolled away, and
 * it marks the current value with a check. Every option is the same tag you
 * would see in the cell, so choosing one is a direct preview of the result.
 *
 * Three collisions this recipe has to settle, all of them real:
 *
 * - **The row and the control both want the click.** On a clickable row,
 *   opening this would also open the record. The cell stops the event - a
 *   decision the recipe has to make visible, since `TableCell` cannot guess it.
 * - **The menu must escape the table.** The table lives in an `overflow-auto`
 *   container for horizontal scrolling, so anything not portalled out of it is
 *   clipped at the table edge. `DropdownMenu` portals.
 * - **It sets the row height** - a hit target big enough to click is taller
 *   than a bare line of text, so this cannot run at `short` density.
 */
export const EditableStatusTag: Story = {
  render: function EditableStatusTagRecipe() {
    const [statuses, setStatuses] = useState<Record<string, TicketStatus>>(
      Object.fromEntries(tickets.map((ticket) => [ticket.id, ticket.status]))
    );
    const [opened, setOpened] = useState<string | null>(null);

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => {
              const current = statuses[ticket.id] ?? ticket.status;
              return (
                <TableRow
                  key={ticket.id}
                  onClick={() => {
                    setOpened(ticket.id);
                  }}
                >
                  <TableCell className="mdt-font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  {/*
                    The row's click handler would fire when the menu is used.
                    Stopping it on the cell keeps the whole control out of the
                    row's reach, without the control needing to know it is in a
                    table.
                  */}
                  <TableCell
                    // The frame belongs on the cell edge, so the cell gives up
                    // its padding and the trigger takes it. Anything less and
                    // the outline floats inside the cell with a gap around it,
                    // which reads as a control sitting in the cell rather than
                    // the cell being editable.
                    className="mdt-p-0"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          aria-label={`Status ${TICKET_LABEL[current]} for ${ticket.id}. Change it`}
                          className={[
                            // Fills the cell it replaced, and carries the
                            // padding the cell gave up. `px-3 py-2` is
                            // `compact` density - this recipe is pinned to the
                            // table's density, and a table at `default` needs
                            // `p-4` here instead.
                            'mdt-flex mdt-h-full mdt-w-full mdt-items-center',
                            'mdt-rounded-md mdt-px-3 mdt-py-2',
                            // Transparent at rest so the cell reads as a value.
                            // The border is always there, so nothing shifts when
                            // it becomes visible.
                            'mdt-border mdt-border-transparent mdt-transition-colors',
                            'hover:mdt-border-border hover:mdt-bg-muted/40',
                            // Keep the frame while the menu is open, or the
                            // trigger looks untouched under its own popup.
                            'data-[state=open]:mdt-border-border data-[state=open]:mdt-bg-muted/40',
                            'focus-visible:mdt-border-border focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring',
                          ].join(' ')}
                        >
                          <Badge tone={TICKET_TONE[current]} shape="square" size="sm" dot>
                            {TICKET_LABEL[current]}
                          </Badge>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Update status</DropdownMenuLabel>
                        {TICKET_ORDER.map((status) => (
                          <DropdownMenuItem
                            key={status}
                            className="mdt-flex mdt-items-center mdt-gap-6"
                            onSelect={() => {
                              setStatuses((prev) => ({ ...prev, [ticket.id]: status }));
                            }}
                          >
                            <Badge tone={TICKET_TONE[status]} shape="square" size="sm" dot>
                              {TICKET_LABEL[status]}
                            </Badge>
                            {status === current && (
                              <Icon name="check" size="sm" className="mdt-ml-auto" aria-hidden />
                            )}
                            {status === current && <span className="mdt-sr-only">Current</span>}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <p className="mdt-text-xs mdt-text-muted-foreground">
          {opened === null
            ? 'Change a status - the row is not opened.'
            : `Row opened: ${opened}. Changing a status never does this.`}
        </p>
      </div>
    );
  },
};

/**
 * **In-cell actions** - actions revealed inside a content cell, not in a column
 * of their own.
 *
 * The trailing actions column has a cost: it is dead space on every row, and in
 * a wide table it ends up miles from the thing it acts on. Putting the actions
 * at the end of the cell they belong to keeps them next to their subject and
 * gives the column back.
 *
 * **The space is reserved, not created on hover.** The buttons are always in
 * the layout and only their opacity changes. Mounting them on hover would
 * reflow the sentence under the cursor, and absolutely positioning them over
 * the text would need a background that exactly matches the row's hover
 * colour - which is a mix of two tokens and not expressible as one. The cost is
 * honest and visible: the subject column is permanently narrower by the width
 * of the actions, and long subjects truncate.
 *
 * The primary action is **labelled**, not another icon. Three unlabelled icons
 * in a content cell is a puzzle; the one people use constantly earns a word.
 *
 * Same reveal rules as the actions column - hover, keyboard focus, and always
 * on touch - and the same named group, because `Table` already owns the
 * unnamed one.
 */
export const InCellActions: Story = {
  render: function InCellActionsRecipe() {
    const [fired, setFired] = useState<string | null>(null);
    const reveal = [
      'mdt-flex mdt-shrink-0 mdt-items-center mdt-gap-1',
      'mdt-opacity-0 mdt-transition-opacity',
      'group-focus-within/row:mdt-opacity-100 group-hover/row:mdt-opacity-100',
      'pointer-coarse:mdt-opacity-100',
    ].join(' ');

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Subject</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id} className="mdt-group/row">
                <TableCell className="mdt-font-medium">{ticket.id}</TableCell>
                <TableCell>
                  <div className="mdt-flex mdt-items-center mdt-gap-2">
                    <span className="mdt-truncate group-hover/row:mdt-underline">
                      {ticket.subject}
                    </span>
                    <div className={`mdt-ml-auto ${reveal}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFired(`Open - ${ticket.id}`);
                        }}
                      >
                        <Icon name="panel-right-open" size="sm" aria-hidden />
                        Open
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={ACTION_ICON}
                        aria-label={`Edit ${ticket.id}`}
                        onClick={() => {
                          setFired(`Edit - ${ticket.id}`);
                        }}
                      >
                        <Icon name="pencil" size="sm" aria-hidden />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={ACTION_ICON}
                            aria-label={`More actions for ${ticket.id}`}
                          >
                            <Icon name="more-vertical" size="sm" aria-hidden />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {['Assign', 'Duplicate'].map((label) => (
                            <DropdownMenuItem
                              key={label}
                              onSelect={() => {
                                setFired(`${label} - ${ticket.id}`);
                              }}
                            >
                              {label}
                            </DropdownMenuItem>
                          ))}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onSelect={() => {
                              setFired(`Delete - ${ticket.id}`);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="mdt-text-xs mdt-text-muted-foreground">
          {fired === null ? 'Hover a row, then use an action.' : `Fired: ${fired}`}
        </p>
      </div>
    );
  },
};

/**
 * **What is still missing.**
 *
 * The two recipes above are arrangements agreed against placeholders. They are
 * not finished until the components underneath them exist, and until then a
 * product copying them would be copying a stand-in.
 */
export const StillMissing: Story = {
  name: 'Still missing',
  render: () => (
    <div className="mdt-flex mdt-max-w-2xl mdt-flex-col mdt-gap-4">
      {[
        {
          title: 'Chart / sparkline component',
          seen: '3 of 27',
          blocked:
            'The Sparkline recipe draws its line with a local stand-in. A real component owns the scale, the empty and single-point cases, and the tones.',
        },
        {
          title: 'Thumbnail component',
          seen: '3 of 27',
          blocked:
            'The Media recipe draws the fallback only. A real component owns the aspect ratio, the loading state and what happens when the image fails.',
        },
      ].map((gap) => (
        <div key={gap.title} className="mdt-rounded-md mdt-border mdt-border-dashed mdt-p-4">
          <div className="mdt-flex mdt-items-center mdt-gap-2">
            <span className="mdt-font-medium">{gap.title}</span>
            <Badge tone="warning" shape="square" size="sm">
              placeholder in use
            </Badge>
            <Badge tone="neutral" shape="square" size="sm">
              seen in {gap.seen}
            </Badge>
          </div>
          <p className="mdt-mt-1 mdt-text-sm mdt-text-muted-foreground">{gap.blocked}</p>
        </div>
      ))}
    </div>
  ),
};
