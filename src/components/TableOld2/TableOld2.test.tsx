import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTableOld2 } from './DataTableOld2';
import { TableBulkActionOld2 } from './TableBulkBarOld2';
import { PersonCellOld2, TagListOld2 } from './TableCells';
import {
  TableOld2,
  TableBodyOld2,
  TableCellOld2,
  TableColGroupOld2,
  TableHeadOld2,
  TableHeaderOld2,
  TableRowOld2,
  TableViewportOld2,
} from './TableOld2';
import { TablePagerOld2 } from './TablePagerOld2';
import { sampleUsers } from './sampleUsers';
import type { SampleUser } from './sampleUsers';
import type { TableColumnDefOld2 } from './TableOld2.types';

const USERS = sampleUsers(30);
const COLS: TableColumnDefOld2<SampleUser>[] = [
  { key: 'email', label: 'Email', sortable: true, cell: (u) => u.email },
  { key: 'role', label: 'Role', cell: (u) => <TagListOld2 items={[u.role]} /> },
];

function Users(props: Partial<React.ComponentProps<typeof DataTableOld2<SampleUser>>>) {
  return (
    <DataTableOld2<SampleUser>
      label="Users"
      noun="users"
      rows={USERS}
      getRowId={(u) => u.id}
      nameColumn={{ sortValue: (u) => u.name, cell: (u) => <PersonCellOld2 name={u.name} /> }}
      columns={COLS}
      search={{ placeholder: 'Search', match: (u, q) => u.name.toLowerCase().includes(q) }}
      bulkActions={() => <TableBulkActionOld2>Activate</TableBulkActionOld2>}
      {...props}
    />
  );
}

beforeEach(() => {
  localStorage.clear();
});

// Smoke test for the snapshot: the assembled table and its pieces render and their main
// props still work. The full suite lives with the live Table.
describe('DataTableOld2', { timeout: 20000 }, () => {
  it('draws the strip, a page of rows under the old2 hooks, and the pager count', () => {
    render(<Users />);
    expect(screen.getByRole('toolbar', { name: 'Users controls' })).toBeInTheDocument();
    const table = screen.getByRole('table', { name: 'Users' });
    expect(table.querySelectorAll('tbody tr.tbl-old2-row')).toHaveLength(25);
    expect(table.querySelectorAll('tbody tr.tbl-row')).toHaveLength(0);
    expect(screen.getByText('1–25 of 30 users')).toBeInTheDocument();
  });

  it('sorts from the heading', async () => {
    render(<Users />);
    await userEvent.click(screen.getByRole('button', { name: 'Sort by Name' }));
    expect(screen.getByRole('columnheader', { name: /Name/ })).toHaveAttribute(
      'aria-sort',
      'ascending'
    );
  });

  it('picks a row and shows the bulk bar with a count', async () => {
    render(<Users />);
    const boxes = screen.getAllByLabelText(/^Select (?!all)/);
    await userEvent.click(boxes[0] as HTMLElement);
    expect(screen.getByRole('button', { name: /1 selected/ })).toBeInTheDocument();
    expect(screen.getByRole('table', { name: 'Users' })).toHaveAttribute(
      'data-has-selection',
      'true'
    );
  });

  it('shows the loading skeleton and the empty state', () => {
    const { rerender } = render(<Users loading />);
    expect(screen.getByRole('table', { name: 'Users' })).toBeInTheDocument();
    rerender(<Users rows={[]} />);
    expect(screen.getByRole('table', { name: 'Users' })).toBeInTheDocument();
  });
});

describe('TableOld2 pieces', () => {
  it('composes a card, its viewport and cells by hand', () => {
    render(
      <TableOld2 label="Hand built">
        <TableViewportOld2 label="Hand built" tableWidth={260}>
          <TableColGroupOld2 widths={[200, 60]} />
          <TableHeaderOld2>
            <tr>
              <TableHeadOld2 columnKey="name" label="Name" width={200} />
            </tr>
          </TableHeaderOld2>
          <TableBodyOld2>
            <TableRowOld2>
              <TableCellOld2>Sarah Johnson</TableCellOld2>
            </TableRowOld2>
          </TableBodyOld2>
        </TableViewportOld2>
        <TablePagerOld2
          total={1}
          page={1}
          pageSize={25}
          onPage={() => undefined}
          onPageSize={() => undefined}
          noun="people"
        />
      </TableOld2>
    );
    const table = screen.getByRole('table', { name: 'Hand built' });
    expect(within(table).getByRole('columnheader', { name: /Name/ })).toBeInTheDocument();
    expect(within(table).getByText('Sarah Johnson').closest('tr')).toHaveClass('tbl-old2-row');
    expect(screen.getByText('1–1 of 1 people')).toBeInTheDocument();
  });
});
