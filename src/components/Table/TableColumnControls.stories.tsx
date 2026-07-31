import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table';
import { TableColumnMenu } from './TableColumnMenu';
import { useColumnWidths } from './useColumnWidths';
import { useTableColumns } from './useTableColumns';
import type { TableColumnDef } from './useTableColumns';

/**
 * Column controls - who decides what the table shows.
 *
 * Layer 5a. One piece of state, `useTableColumns`, and every control on this
 * page is a view onto it: the header menu, the insertion point, and later the
 * columns picker in the toolbar and the drag handle. That is the whole reason
 * the state exists separately - two controls that each kept their own idea of
 * column order would disagree the first time you used both.
 *
 * As everywhere else in Table, **it holds state and never touches your rows.**
 * Hiding a column does not filter anything; it tells you not to render that
 * column.
 */
const meta: Meta = {
  title: 'Components/Table/Column Controls',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj;

type Key = 'id' | 'subject' | 'status' | 'priority' | 'assignee' | 'category' | 'due' | 'created';

const definitions: TableColumnDef<Key>[] = [
  { key: 'id', label: 'ID', locked: true },
  { key: 'subject', label: 'Subject' },
  { key: 'status', label: 'Status' },
  { key: 'priority', label: 'Priority' },
  { key: 'assignee', label: 'Assignee' },
  { key: 'category', label: 'Category' },
  { key: 'due', label: 'Due date' },
  { key: 'created', label: 'Created on' },
];

interface Ticket {
  id: string;
  subject: string;
  status: 'Open' | 'In Process' | 'Resolved';
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
  category: string;
  due: string;
  created: string;
}

const tickets: Ticket[] = [
  {
    id: 'TKT-245',
    subject: 'Network Connectivity Problem',
    status: 'Open',
    priority: 'High',
    assignee: 'Ada Lovelace',
    category: 'Network',
    due: '12 Aug',
    created: '01 Aug',
  },
  {
    id: 'TKT-246',
    subject: 'VPN drops every few minutes',
    status: 'In Process',
    priority: 'High',
    assignee: 'Grace Hopper',
    category: 'Network',
    due: '13 Aug',
    created: '02 Aug',
  },
  {
    id: 'TKT-247',
    subject: 'Printer queue stuck on floor 3',
    status: 'Open',
    priority: 'Low',
    assignee: 'Alan Turing',
    category: 'Hardware',
    due: '19 Aug',
    created: '02 Aug',
  },
  {
    id: 'TKT-248',
    subject: 'Password reset for contractor',
    status: 'Resolved',
    priority: 'Medium',
    assignee: 'Katherine Johnson',
    category: 'Access',
    due: '09 Aug',
    created: '03 Aug',
  },
];

const STATUS_TONE = {
  Open: 'info',
  'In Process': 'warning',
  Resolved: 'success',
} as const;

const cellFor = (ticket: Ticket, key: Key) => {
  if (key === 'status') {
    return (
      <Badge tone={STATUS_TONE[ticket.status]} shape="square" size="sm" dot>
        {ticket.status}
      </Badge>
    );
  }
  return ticket[key];
};

/**
 * Everything in 5a at once: the header menu on every column, an insertion point
 * at every boundary, and two columns pinned.
 *
 * Things worth trying, because each one is a decision rather than a feature:
 *
 * - **Open a column's menu.** ID offers nothing but its name - it is `locked`,
 *   so it cannot be hidden or moved, and rather than show four dead items it
 *   shows none.
 * - **Freeze Subject.** Both ID and Subject pin, because freezing is a prefix:
 *   you cannot pin the second column while the first scrolls, there would be
 *   nowhere for it to sit. Scroll sideways and the pinned pair keeps one
 *   boundary between them and the rest, not one each.
 * - **Try to freeze Priority.** There is no Freeze item past the second column
 *   - hidden rather than disabled, because it is not a thing that could happen.
 * - **Hide a column, then hover a boundary.** The `+` puts it back *where you
 *   are*, not where it used to be. The strip is 20px wide, so you need to be
 *   near the boundary rather than anywhere in the header - a hover zone the
 *   width of a column would fire constantly.
 *
 * **Filter, Group and Sort are deliberately absent here.** They need the
 * pickers that arrive with the toolbar, and passing a handler that does nothing
 * would put three dead items in every menu - which is the exact thing this
 * component avoids by only rendering what it was given. The Header menu story
 * below shows the full set.
 */
export const ColumnControls: Story = {
  render: function ColumnControlsDemo() {
    const cols = useTableColumns(definitions);
    // One line does both jobs, so the demo needs widths as well as columns.
    //
    // `Created on` is deliberately unsized, and the table is `layout="fixed"`.
    // A fixed table still fills its container, so if every column carries a
    // width the browser scales all of them and the drag stops tracking the
    // cursor - one unsized column absorbs the slack instead.
    const { widths, setWidth } = useColumnWidths({
      id: 88,
      subject: 236,
      status: 120,
      priority: 81,
      assignee: 155,
      category: 92,
      due: 89,
    });

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <div className="mdt-flex mdt-items-center mdt-gap-3">
          <Button variant="outline" size="sm" onClick={cols.reset} disabled={!cols.isChanged}>
            Reset layout
          </Button>
          <p className="mdt-text-xs mdt-text-muted-foreground">
            {cols.visible.length} shown, {cols.hidden.length} hidden, {cols.frozenCount} pinned
          </p>
        </div>

        <Table layout="fixed" containerClassName="mdt-rounded-md mdt-border">
          <TableHeader>
            <TableRow>
              {cols.visible.map((column, index) => (
                <TableHead
                  key={column.key}
                  frozen={column.frozen ? column.index : false}
                  className="mdt-whitespace-nowrap"
                  resizable={column.key !== 'created'}
                  {...(column.key === 'created' ? {} : { width: widths[column.key] })}
                  onResize={(next) => {
                    if (column.key !== 'created') setWidth(column.key, next);
                  }}
                  insertColumns={cols.hidden}
                  insertSuggested={['due', 'category']}
                  onInsert={(key) => {
                    // The boundary belongs to the column on its left, so the
                    // new column lands after it.
                    cols.show(key as Key, index + 1);
                  }}
                  insertLabel={`Insert a column after ${column.label}`}
                >
                  <TableColumnMenu
                    label={column.label}
                    {...(column.locked
                      ? {}
                      : {
                          onHide: () => {
                            cols.hide(column.key);
                          },
                          onMoveToStart: () => {
                            cols.moveToStart(column.key);
                          },
                          onMoveToEnd: () => {
                            cols.moveToEnd(column.key);
                          },
                        })}
                    frozen={column.frozen}
                    canFreeze={cols.canFreeze(column.key)}
                    onToggleFreeze={() => {
                      if (column.frozen) cols.unfreeze(column.key);
                      else cols.freeze(column.key);
                    }}
                  />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                {cols.visible.map((column) => (
                  <TableCell
                    key={column.key}
                    frozen={column.frozen ? column.index : false}
                    className="mdt-whitespace-nowrap"
                  >
                    {cellFor(ticket, column.key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

/**
 * Two pinned columns, which is the piece that was not additive.
 *
 * `frozen` used to be a boolean pinned at `left: 0`, which is correct for
 * exactly one column. A second one has to start at the measured width of the
 * first - a runtime value that depends on the content, the layout mode and
 * whatever the column was dragged to - so `Table` measures its own header and
 * hands each pinned cell its offset.
 *
 * The boundary and the shadow belong to the **last** pinned column only. Draw
 * them on each one and the two pinned columns get a divider between them that
 * no other pair has, which reads as two stuck columns rather than one pinned
 * block.
 *
 * Scroll sideways to see it.
 */
export const TwoFrozenColumns: Story = {
  render: function TwoFrozen() {
    const cols = useTableColumns(definitions);

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <div className="mdt-flex mdt-gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              cols.freeze('id');
            }}
          >
            Pin 1
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              cols.freeze('subject');
            }}
          >
            Pin 2
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              cols.unfreeze('id');
            }}
          >
            Unpin
          </Button>
        </div>

        <Table containerClassName="mdt-rounded-md mdt-border">
          <TableHeader>
            <TableRow>
              {cols.visible.map((column) => (
                <TableHead
                  key={column.key}
                  frozen={column.frozen ? column.index : false}
                  className="mdt-whitespace-nowrap"
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                {cols.visible.map((column) => (
                  <TableCell
                    key={column.key}
                    frozen={column.frozen ? column.index : false}
                    className="mdt-whitespace-nowrap"
                  >
                    {cellFor(ticket, column.key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

/**
 * The insertion point on its own, with three columns already hidden so there is
 * something to add.
 *
 * Hover any boundary between two headers. The line and the `+` appear together
 * on one hover rather than the button waiting behind a second, more precise
 * one - quieter, but it hides the affordance behind a gesture nobody has been
 * taught.
 *
 * The button sits **inside** the header's height rather than above it. The
 * table scrolls sideways inside an `overflow-auto` container, and anything
 * drawn above the header row is clipped by it.
 */
export const InsertionPoints: Story = {
  render: function Insertion() {
    const cols = useTableColumns(definitions);
    const started = cols.hidden.length > 0;

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        {!started && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              cols.hide('category');
              cols.hide('due');
              cols.hide('created');
            }}
          >
            Hide three columns first
          </Button>
        )}
        {started && (
          <p className="mdt-text-xs mdt-text-muted-foreground">
            Hidden: {cols.hidden.map((column) => column.label).join(', ')}. Hover a boundary between
            two headers.
          </p>
        )}

        <Table containerClassName="mdt-rounded-md mdt-border">
          <TableHeader>
            <TableRow>
              {cols.visible.map((column, index) => (
                <TableHead
                  key={column.key}
                  className="mdt-whitespace-nowrap"
                  insertColumns={cols.hidden}
                  insertSuggested={['due']}
                  onInsert={(key) => {
                    cols.show(key as Key, index + 1);
                  }}
                  insertLabel={`Insert a column after ${column.label}`}
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                {cols.visible.map((column) => (
                  <TableCell key={column.key} className="mdt-whitespace-nowrap">
                    {cellFor(ticket, column.key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

/**
 * The header menu, wired to real state.
 *
 * **Move, Freeze and Hide work here** - they are column layout, which is what
 * 5a is. **Filter, Group and Sort report what you chose and do nothing else**,
 * because sorting and grouping arrive with the toolbar and its pickers; wiring
 * them to a no-op would be the dead item this component exists to avoid, so
 * they are wired to a readout instead.
 *
 * A column shows only the items it was given a handler for. ID is `locked` and
 * gets no menu at all rather than four items it would refuse to obey.
 */
export const HeaderMenu: Story = {
  render: function HeaderMenuDemo() {
    const cols = useTableColumns(definitions.slice(0, 5));
    const [chosen, setChosen] = useState<string | null>(null);

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <div className="mdt-flex mdt-items-center mdt-gap-3">
          <Button variant="outline" size="sm" onClick={cols.reset} disabled={!cols.isChanged}>
            Reset layout
          </Button>
          <p className="mdt-text-xs mdt-text-muted-foreground">{chosen ?? 'Open a column menu.'}</p>
        </div>

        <Table containerClassName="mdt-rounded-md mdt-border">
          <TableHeader>
            <TableRow>
              {cols.visible.map((column) => (
                <TableHead
                  key={column.key}
                  frozen={column.frozen ? column.index : false}
                  className="mdt-whitespace-nowrap"
                >
                  <TableColumnMenu
                    label={column.label}
                    onFilter={() => {
                      setChosen(`Filter by ${column.label} - arrives with the toolbar`);
                    }}
                    onGroup={() => {
                      setChosen(`Group by ${column.label} - arrives with the toolbar`);
                    }}
                    onSort={() => {
                      setChosen(`Sort by ${column.label} - arrives with the toolbar`);
                    }}
                    frozen={column.frozen}
                    canFreeze={cols.canFreeze(column.key)}
                    onToggleFreeze={() => {
                      if (column.frozen) cols.unfreeze(column.key);
                      else cols.freeze(column.key);
                      setChosen(`${column.frozen ? 'Unfroze' : 'Froze'} ${column.label}`);
                    }}
                    {...(column.locked
                      ? {}
                      : {
                          onMoveToStart: () => {
                            cols.moveToStart(column.key);
                            setChosen(`Moved ${column.label} to the start`);
                          },
                          onMoveToEnd: () => {
                            cols.moveToEnd(column.key);
                            setChosen(`Moved ${column.label} to the end`);
                          },
                          onHide: () => {
                            cols.hide(column.key);
                            setChosen(`Hid ${column.label}`);
                          },
                        })}
                  />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                {cols.visible.map((column) => (
                  <TableCell
                    key={column.key}
                    frozen={column.frozen ? column.index : false}
                    className="mdt-whitespace-nowrap"
                  >
                    {cellFor(ticket, column.key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};
