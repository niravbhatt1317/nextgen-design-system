import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Badge } from '../Badge';
import type { FilterKey } from '../AdvancedFilter';
import { DataTable } from './DataTable';
import { PersonCell } from './TableCells';
import { sampleUsers } from './sampleUsers';
import type { SampleUser } from './sampleUsers';
import type { TableColumnDef } from './Table.types';

/* QUICK FILTERS HIDE UNDER AN ADVANCED FILTER (Pranjal, 2026-09-26: "whenever I apply an advanced filter, the quick
 * filters won't be visible. All the quick-filter options, like Status and Organisation, which we removed before from
 * the advanced filter, will all be visible inside the advanced filter now, because the quick filters will be hidden.")
 * These tests hold the table to that rule: the square is there at rest, gone while a row is applied, back on Clear
 * all; a tick in the square rides into the applied rows; a quick key the page forgot to list is never dropped. */

const USERS = sampleUsers(40);
const ACTIVE = USERS.filter((u) => u.status === 'Active').length;
const INACTIVE = USERS.filter((u) => u.status === 'Inactive').length;
const COLS: TableColumnDef<SampleUser>[] = [
  { key: 'email', label: 'Email', sortable: true, cell: (u) => u.email },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    cell: (u) => <Badge size="sm">{u.status}</Badge>,
  },
  { key: 'role', label: 'Role', cell: (u) => u.role },
];
const STATUS = ['Active', 'Inactive', 'Invited'];
const ROLE_KEY: FilterKey<SampleUser> = {
  id: 'role',
  label: 'Role',
  type: 'pick',
  options: ['Admin', 'Member', 'Viewer', 'Billing'],
};
const EMAIL_KEY: FilterKey<SampleUser> = { id: 'email', label: 'Email', type: 'text' };
const STATUS_KEY: FilterKey<SampleUser> = {
  id: 'status',
  label: 'Status',
  type: 'pick',
  options: STATUS,
};
/* the page did its homework: the quick filter's key is among the advanced keys */
const KEYS_WITH_STATUS = [EMAIL_KEY, STATUS_KEY, ROLE_KEY];
/* the page forgot: Status is a quick filter but not a key */
const KEYS_WITHOUT_STATUS = [EMAIL_KEY, ROLE_KEY];

function Users(props: Partial<React.ComponentProps<typeof DataTable<SampleUser>>>) {
  return (
    <DataTable<SampleUser>
      label="Users"
      noun="users"
      rows={USERS}
      getRowId={(u) => u.id}
      nameColumn={{ sortValue: (u) => u.name, cell: (u) => <PersonCell name={u.name} /> }}
      columns={COLS}
      pageSize={100}
      quickFilter={{
        columnKey: 'status',
        label: 'Filter by status',
        options: STATUS,
        value: (u) => u.status,
      }}
      advancedFilter={{ keys: KEYS_WITH_STATUS }}
      {...props}
    />
  );
}

const square = () => screen.queryByRole('button', { name: /^Filter by status/ });
const door = () => screen.getByRole('button', { name: /More filters/ });
const rowCount = () =>
  screen.getByRole('table', { name: 'Users' }).querySelectorAll('tbody tr.tbl-row').length;
const doorCount = () =>
  within(door()).queryByTestId('toolbar-button-count')?.textContent?.trim() ?? '';

/** Tick one value in the Status square and close its menu. */
async function tickStatus(user: ReturnType<typeof userEvent.setup>, value: string) {
  await user.click(square() as HTMLElement);
  await user.click(await screen.findByRole('menuitemcheckbox', { name: value }));
  await user.keyboard('{Escape}');
}

/** Open the panel, fill its blank row with "Email contains <text>" and Apply. A text key: the row the panel builds
 * itself, with no list to pick from. */
async function applyEmailContains(user: ReturnType<typeof userEvent.setup>, text: string) {
  await user.click(door());
  const panel = await screen.findByRole('dialog', { name: 'Filters' });
  const fields = within(panel).getAllByRole('combobox');
  await user.click(fields[0] as HTMLElement);
  await user.click(await screen.findByRole('option', { name: 'Email' }));
  await user.click(within(panel).getAllByRole('combobox')[1] as HTMLElement);
  await user.click(await screen.findByRole('option', { name: 'contains' }));
  await user.type(within(panel).getByPlaceholderText('Type a value'), text);
  await user.click(within(panel).getByRole('button', { name: /^Apply/ }));
}

/** Open the panel and press Clear all: the advanced filter goes back to empty. */
async function clearAll(user: ReturnType<typeof userEvent.setup>) {
  await user.click(door());
  const panel = await screen.findByRole('dialog', { name: 'Filters' });
  await user.click(within(panel).getByRole('button', { name: 'Clear all' }));
}

beforeEach(() => localStorage.clear());

describe('DataTable: quick filters hide under an advanced filter', { timeout: 30000 }, () => {
  it('draws the Status square at rest, beside the More filters door', () => {
    render(<Users />);
    expect(square()).toBeInTheDocument();
    expect(door()).toBeInTheDocument();
    expect(rowCount()).toBe(USERS.length);
  });

  it('hides the square once an advanced row is applied, and brings it back on Clear all', async () => {
    const user = userEvent.setup();
    render(<Users />);
    await applyEmailContains(user, 'a');
    expect(doorCount()).toBe('1');
    expect(square()).not.toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Status/ })).not.toHaveAttribute(
      'data-filtered',
      'true'
    );
    await clearAll(user);
    expect(doorCount()).toBe('');
    expect(square()).toBeInTheDocument();
    expect(square()).not.toHaveAttribute('data-active', 'true');
    expect(rowCount()).toBe(USERS.length);
  });

  it('folds a ticked quick value into the applied rows, then clears the square', async () => {
    const user = userEvent.setup();
    render(<Users />);
    await tickStatus(user, 'Active');
    expect(rowCount()).toBe(ACTIVE);
    expect(square()).toHaveAttribute('data-active', 'true');
    /* "Email contains ." matches everyone, so whatever narrows the list is the Status row that rode along */
    await applyEmailContains(user, '.');
    expect(square()).not.toBeInTheDocument();
    expect(doorCount()).toBe('2');
    expect(rowCount()).toBe(ACTIVE);
    /* the panel shows the row: a Status key holding the Active pill */
    await user.click(door());
    const panel = await screen.findByRole('dialog', { name: 'Filters' });
    expect(within(panel).getAllByText('Status').length).toBeGreaterThan(0);
    expect(within(panel).getByText('Active')).toBeInTheDocument();
    /* Clear all: the square is back and empty - its tick moved into the panel and left with it */
    await user.click(within(panel).getByRole('button', { name: 'Clear all' }));
    expect(square()).toBeInTheDocument();
    expect(square()).not.toHaveAttribute('data-active', 'true');
    expect(rowCount()).toBe(USERS.length);
  });

  it('keeps a quick value applied when its key is not among the advanced keys', async () => {
    const user = userEvent.setup();
    render(<Users advancedFilter={{ keys: KEYS_WITHOUT_STATUS }} />);
    await tickStatus(user, 'Inactive');
    expect(rowCount()).toBe(INACTIVE);
    await applyEmailContains(user, '.');
    /* the square is hidden, nothing rode along (the door counts one), and the list is STILL narrowed by the tick */
    expect(square()).not.toBeInTheDocument();
    expect(doorCount()).toBe('1');
    expect(rowCount()).toBe(INACTIVE);
    /* clear the advanced filter: the square returns with its tick still on */
    await clearAll(user);
    expect(square()).toHaveAttribute('data-active', 'true');
    expect(rowCount()).toBe(INACTIVE);
  });

  it('takes the heading wash off while the square is hidden', async () => {
    const user = userEvent.setup();
    render(<Users />);
    await tickStatus(user, 'Active');
    expect(screen.getByRole('columnheader', { name: /Status/ })).toHaveAttribute(
      'data-filtered',
      'true'
    );
    await applyEmailContains(user, '.');
    expect(screen.getByRole('columnheader', { name: /Status/ })).not.toHaveAttribute(
      'data-filtered',
      'true'
    );
  });

  it('applying with nothing complete folds nothing: the square stays, ticks and all', async () => {
    const user = userEvent.setup();
    render(<Users />);
    await tickStatus(user, 'Active');
    await user.click(door());
    const panel = await screen.findByRole('dialog', { name: 'Filters' });
    await user.click(within(panel).getByRole('button', { name: /^Apply/ }));
    expect(square()).toBeInTheDocument();
    expect(square()).toHaveAttribute('data-active', 'true');
    expect(rowCount()).toBe(ACTIVE);
  });
});
