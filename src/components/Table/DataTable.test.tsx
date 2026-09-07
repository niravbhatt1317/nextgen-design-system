import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Badge } from '../Badge';
import { DropdownMenuItem } from '../DropdownMenu';
import { DataTable } from './DataTable';
import { TableBulkAction } from './TableBulkBar';
import { PersonCell } from './TableCells';
import { sampleUsers } from './sampleUsers';
import type { SampleUser } from './sampleUsers';
import type { TableColumnDef } from './Table.types';

const USERS = sampleUsers(60);
const COLS: TableColumnDef<SampleUser>[] = [
  { key: 'email', label: 'Email', sortable: true, cell: (u) => u.email },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    glyph: <span data-testid="glyph">*</span>,
    cell: (u) => <Badge size="sm">{u.status}</Badge>,
  },
  { key: 'role', label: 'Role', cell: (u) => u.role },
];

function Users(props: Partial<React.ComponentProps<typeof DataTable<SampleUser>>>) {
  return (
    <DataTable<SampleUser>
      label="Users"
      noun="users"
      rows={USERS}
      getRowId={(u) => u.id}
      nameColumn={{ sortValue: (u) => u.name, cell: (u) => <PersonCell name={u.name} /> }}
      columns={COLS}
      isRowInert={(u) => u.status === 'Invited'}
      rowActions={() => <DropdownMenuItem>Edit details</DropdownMenuItem>}
      search={{ placeholder: 'Search', match: (u, q) => u.name.toLowerCase().includes(q) }}
      quickFilter={{
        columnKey: 'status',
        label: 'Filter by status',
        options: ['Active', 'Inactive', 'Invited'],
        value: (u) => u.status,
      }}
      filters={[
        {
          key: 'role',
          label: 'Role',
          options: ['Admin', 'Member'],
          match: (u, s) => s.has(u.role),
        },
      ]}
      bulkActions={() => <TableBulkAction>Activate</TableBulkAction>}
      {...props}
    />
  );
}

beforeEach(() => localStorage.clear());

// The full table renders the toolbar, sixty rows of Badges and several menus; under a busy test run that takes seconds.
describe('DataTable', { timeout: 20000 }, () => {
  it('draws the strip, 25 rows, the pager count with a comma-free total, and no chips', () => {
    render(<Users />);
    expect(screen.getByRole('toolbar', { name: 'Users controls' })).toBeInTheDocument();
    expect(
      screen.getByRole('table', { name: 'Users' }).querySelectorAll('tbody tr.tbl-row')
    ).toHaveLength(25);
    expect(screen.getByText('1–25 of 60 users')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Filters$/ })).toBeInTheDocument();
  });

  it('sorts from the heading: A to Z, then Z to A, then off; the toolbar Sort button follows', async () => {
    render(<Users />);
    const nameSort = screen.getByRole('button', { name: 'Sort by Name' });
    await userEvent.click(nameSort);
    const th = screen.getByRole('columnheader', { name: /Name/ });
    expect(th).toHaveAttribute('aria-sort', 'ascending');
    const firstName = () =>
      within(screen.getByRole('table', { name: 'Users' })).getAllByRole('row')[1]?.textContent ??
      '';
    expect(firstName()).toContain('Aditya');
    expect(screen.getByRole('button', { name: 'Sort' })).toHaveAttribute('data-active', 'true');
    await userEvent.click(nameSort);
    expect(th).toHaveAttribute('aria-sort', 'descending');
    await userEvent.click(nameSort);
    expect(th).not.toHaveAttribute('aria-sort');
    expect(screen.getByRole('button', { name: 'Sort' })).not.toHaveAttribute('data-active', 'true');
  });

  it('picks rows with the checkbox, shows the bulk bar with a count, and select-all takes the page', async () => {
    render(<Users />);
    const boxes = screen.getAllByLabelText(/^Select (?!all)/);
    await userEvent.click(boxes[0] as HTMLElement);
    expect(screen.getByRole('button', { name: /1 selected/ })).toBeInTheDocument();
    expect(screen.getByRole('table', { name: 'Users' })).toHaveAttribute(
      'data-has-selection',
      'true'
    );
    await userEvent.click(screen.getByRole('checkbox', { name: 'Select all on this page' }));
    const selectable = USERS.slice(0, 25).filter((u) => u.status !== 'Invited').length;
    expect(
      screen.getByRole('button', { name: new RegExp(`${selectable} selected`) })
    ).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Clear selection' }));
    expect(screen.queryByRole('region', { name: 'Selection' })).not.toBeInTheDocument();
  });

  it('opens the scope menu and can take everything that matches', async () => {
    render(<Users />);
    await userEvent.click(screen.getByRole('button', { name: 'Choose what to select' }));
    const all = USERS.filter((u) => u.status !== 'Invited').length;
    await userEvent.click(screen.getByRole('radio', { name: /Select all users/ }));
    await userEvent.click(screen.getByRole('button', { name: 'Apply' }));
    expect(screen.getByRole('button', { name: new RegExp(`${all} selected`) })).toBeInTheDocument();
  });

  it('goes to a typed page and keeps the row numbers absolute', async () => {
    render(<Users />);
    const box = screen.getByRole('textbox', { name: 'Page number' });
    await userEvent.clear(box);
    await userEvent.type(box, '3{Enter}');
    expect(screen.getByText('51–60 of 60 users')).toBeInTheDocument();
    expect(
      screen.getByRole('table', { name: 'Users' }).querySelector('tbody tr .tbl-num')?.textContent
    ).toBe('51');
  });

  it('washes the Status heading while the quick filter is on and shows the dot on the square', async () => {
    render(<Users />);
    await userEvent.click(screen.getByRole('button', { name: 'Filter by status' }));
    await userEvent.click(screen.getByRole('menuitemcheckbox', { name: 'Active' }));
    await userEvent.keyboard('{Escape}');
    expect(screen.getByRole('columnheader', { name: /Status/ })).toHaveAttribute(
      'data-filtered',
      'true'
    );
    expect(screen.getByRole('button', { name: 'Filter by status' })).toHaveAttribute(
      'data-active',
      'true'
    );
    expect(screen.queryByText(/Status: Active/)).not.toBeInTheDocument();
  });

  it('shows nothing-found with a Clear filters button that brings the rows back', async () => {
    render(<Users initialQuery="zzqx" />);
    expect(within(screen.getByRole('status')).getByText('No users match')).toBeInTheDocument();
    expect(screen.getByText('No users match', { selector: '.tbl-count' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(screen.getByText('1–25 of 60 users')).toBeInTheDocument();
  });

  it('shows the first-run, loading and error states', () => {
    const { rerender } = render(<Users rows={[]} />);
    expect(screen.getByText('No users yet')).toBeInTheDocument();
    rerender(<Users loading />);
    expect(screen.getByText('Loading users…')).toBeInTheDocument();
    expect(screen.getByRole('table', { name: 'Users' }).querySelectorAll('tbody tr')).toHaveLength(
      5
    );
    rerender(<Users error />);
    expect(screen.getByText('Couldn’t load users')).toBeInTheDocument();
  });

  it('hides a column from its menu and offers it back in the Columns panel', async () => {
    render(<Users />);
    await userEvent.click(screen.getByLabelText('Options for Role'));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Hide column' }));
    expect(screen.queryByRole('columnheader', { name: /Role/ })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Manage columns' }));
    expect(screen.getByText('Hidden in table')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /^Role$/ }));
    expect(screen.getByRole('columnheader', { name: /Role/ })).toBeInTheDocument();
  });

  it('switches to a Load more footer', async () => {
    render(<Users paging="loadMore" />);
    expect(screen.getByText('Showing 25 of 60 users')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Load more' }));
    expect(screen.getByText('Showing 50 of 60 users')).toBeInTheDocument();
  });
});
