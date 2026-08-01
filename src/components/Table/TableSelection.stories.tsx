import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table';
import { TableBulkAction, TableBulkBar, TableBulkSeparator } from './TableBulkBar';
import { TableToolbar, TableToolbarActions } from './TableToolbar';
import { useTableSelection } from './useTableSelection';

/**
 * What you can do with the rows you have picked.
 *
 * Layer 5d. The Selectable rows story shows the checkboxes; this shows what
 * they are for - `useTableSelection` holding the state, and the bar that
 * appears once there is something to act on.
 */
const meta: Meta = {
  title: 'Components/Table/Bulk Actions',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj;

interface Ticket {
  id: string;
  subject: string;
  status: 'Open' | 'In Process' | 'Resolved';
  assignee: string;
}

const tickets: Ticket[] = [
  {
    id: 'TKT-245',
    subject: 'Network Connectivity Problem',
    status: 'Open',
    assignee: 'Ada Lovelace',
  },
  {
    id: 'TKT-246',
    subject: 'VPN drops every few minutes',
    status: 'In Process',
    assignee: 'Grace Hopper',
  },
  {
    id: 'TKT-247',
    subject: 'Printer queue stuck on floor 3',
    status: 'Open',
    assignee: 'Alan Turing',
  },
  {
    id: 'TKT-248',
    subject: 'Password reset for contractor',
    status: 'Resolved',
    assignee: 'Katherine Johnson',
  },
  {
    id: 'TKT-249',
    subject: 'Laptop will not wake from sleep',
    status: 'Open',
    assignee: 'Ada Lovelace',
  },
];

const STATUS_TONE = { Open: 'info', 'In Process': 'warning', Resolved: 'success' } as const;

/**
 * **Shift-click a second checkbox** and everything between takes that row's new
 * state. Without it a range of thirty rows is thirty clicks, which is where
 * people give up and select all.
 *
 * **The bar joins the toolbar rather than replacing it.** Replacing was the
 * first instinct and it was wrong: a selection survives filtering on purpose,
 * so building one across two searches is a thing people do - and hiding the
 * search box the moment they tick a row makes that impossible.
 *
 * **Search while rows are selected.** The selection survives - someone who ticks
 * two rows, searches for a third and ticks that expects three. But the header
 * checkbox reports only what is on screen, because a tick there while a filter
 * hides other selected rows would claim something untrue of this view.
 */
export const RowSelection: Story = {
  render: function RowSelectionDemo() {
    const [query, setQuery] = useState('');
    const [done, setDone] = useState<string | null>(null);

    const rows = useMemo(
      () =>
        tickets.filter((ticket) =>
          query.trim() === ''
            ? true
            : `${ticket.id} ${ticket.subject} ${ticket.assignee}`
                .toLowerCase()
                .includes(query.trim().toLowerCase())
        ),
      [query]
    );

    const selection = useTableSelection({ rowIds: rows.map((ticket) => ticket.id) });

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <TableToolbar label="Ticket controls">
          <Input
            type="search"
            aria-label="Search tickets"
            placeholder="Search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            className="mdt-w-56"
          />
          <TableToolbarActions>
            <Button variant="outline" size="sm">
              <Icon name="list-filter" size="sm" aria-hidden />
              Filters
            </Button>
          </TableToolbarActions>
        </TableToolbar>

        <TableBulkBar count={selection.count} onClear={selection.clear}>
          <TableBulkAction
            icon={<Icon name="circle-dot" size="sm" aria-hidden />}
            onClick={() => {
              setDone(`Set status on ${String(selection.count)}`);
            }}
          >
            Status
          </TableBulkAction>
          <TableBulkAction
            icon={<Icon name="flag" size="sm" aria-hidden />}
            onClick={() => {
              setDone(`Set priority on ${String(selection.count)}`);
            }}
          >
            Priority
          </TableBulkAction>
          <TableBulkAction
            icon={<Icon name="user" size="sm" aria-hidden />}
            onClick={() => {
              setDone(`Assigned ${String(selection.count)}`);
            }}
          >
            Assignee
          </TableBulkAction>

          {/* Routine actions on one side of the rule, the rest on the other. */}
          <TableBulkSeparator />

          <TableBulkAction
            icon={<Icon name="merge" size="sm" aria-hidden />}
            onClick={() => {
              setDone(`Merged ${String(selection.count)}`);
            }}
          >
            Merge
          </TableBulkAction>
          <TableBulkAction
            icon={<Icon name="copy" size="sm" aria-hidden />}
            onClick={() => {
              setDone(`Cloned ${String(selection.count)}`);
            }}
          >
            Clone
          </TableBulkAction>
          <TableBulkAction
            aria-label="More actions"
            icon={<Icon name="more-vertical" size="sm" aria-hidden />}
            onClick={() => {
              setDone('More actions');
            }}
          />
        </TableBulkBar>

        <Table containerClassName="mdt-rounded-md mdt-border">
          <TableHeader>
            <TableRow>
              <TableHead className="mdt-w-10">
                <Checkbox
                  checked={selection.headerState}
                  onCheckedChange={selection.toggleAll}
                  aria-label="Select all rows"
                />
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assignee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((ticket) => (
              <TableRow key={ticket.id} selected={selection.isSelected(ticket.id)}>
                <TableCell>
                  {/*
                    The shift key reaches the hook through the click, not the
                    change: `onCheckedChange` reports the new value and nothing
                    about the modifiers, and the range is the whole reason a
                    long selection is bearable.
                  */}
                  <Checkbox
                    checked={selection.isSelected(ticket.id)}
                    onClick={(event) => {
                      selection.toggle(ticket.id, { extend: event.shiftKey });
                    }}
                    aria-label={`Select ${ticket.id}`}
                  />
                </TableCell>
                <TableCell className="mdt-font-medium">{ticket.id}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>
                  <Badge tone={STATUS_TONE[ticket.status]} shape="square" size="sm" dot>
                    {ticket.status}
                  </Badge>
                </TableCell>
                <TableCell>{ticket.assignee}</TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow interactive={false}>
                <TableCell colSpan={5} className="mdt-p-0">
                  <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2 mdt-py-10">
                    <p className="mdt-text-sm mdt-font-medium">No tickets match your search.</p>
                    {/*
                      A filtered empty table is not an empty table. "No tickets
                      yet" would be a lie and would send someone off to create
                      one; the way out is to clear the thing that hid them.
                    */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setQuery('');
                      }}
                    >
                      Clear search
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <p className="mdt-text-xs mdt-text-muted-foreground">
          {done ?? `${String(selection.count)} selected of ${String(rows.length)} shown.`}
        </p>
      </div>
    );
  },
};
