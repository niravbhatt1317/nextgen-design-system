import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
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
    /* the blank state says it; the footer no longer repeats it under six dead controls */
    expect(document.querySelector('.tbl-foot')).toBeNull();
    await userEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(screen.getByText('1–25 of 60 users')).toBeInTheDocument();
  });

  it('shows the first-run, loading and error states', () => {
    const { rerender } = render(<Users rows={[]} />);
    expect(screen.getByText('No users yet')).toBeInTheDocument();
    rerender(<Users loading />);
    expect(document.querySelector('.tbl-foot')).toBeNull();
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

  it('keeps plain row numbers without selection, and lets the Columns panel hide them', async () => {
    render(<Users bulkActions={undefined} />);
    expect(screen.getByRole('columnheader', { name: 'Row number' })).toBeInTheDocument();
    const firstRow = screen.getAllByRole('row')[1] as HTMLElement;
    expect(within(firstRow).getAllByRole('cell')[0]).toHaveTextContent('1');
    expect(document.querySelector('.tbl-cb')).toBeNull();
    await userEvent.hover(firstRow);
    expect(document.querySelector('.tbl-cb')).toBeNull();
    await userEvent.click(screen.getByRole('button', { name: 'Manage columns' }));
    await userEvent.click(screen.getByRole('button', { name: /^Row number$/ }));
    expect(screen.queryByRole('columnheader', { name: 'Row number' })).not.toBeInTheDocument();
    expect(screen.getByText('Hidden in table')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getByRole('columnheader', { name: 'Row number' })).toBeInTheDocument();
  });

  it('locks the row-number column when there is selection, since it carries the checkboxes', async () => {
    render(<Users />);
    await userEvent.click(screen.getByRole('button', { name: 'Manage columns' }));
    expect(screen.queryByRole('button', { name: /^Row number$/ })).not.toBeInTheDocument();
    expect(screen.getByLabelText('Row number is always shown')).toBeDisabled();
  });

  it('switches to a Load more footer', async () => {
    render(<Users paging="loadMore" />);
    expect(screen.getByText('Showing 25 of 60 users')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Load more' }));
    expect(screen.getByText('Showing 50 of 60 users')).toBeInTheDocument();
  });

  /* Pranjal, 2026-09-11: on a screen that already has a toolbar, a second
   * strip would draw search, Filters, Sort and Columns twice. */
  it('leaves the toolbar off but keeps everything inside the card', () => {
    render(<Users toolbar={false} />);
    expect(screen.queryByPlaceholderText('Search')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Filters' })).not.toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Email/ })).toBeInTheDocument();
  });

  /* Pranjal, 2026-09-12: a page with no tab bar keeps the 60px Toolbar band as
   * page structure and hands the table the element; the table draws its own
   * controls inside it, so nothing is copied and everything keeps working. */
  it('draws its controls into a strip the page owns, and they still work', async () => {
    function Page() {
      const [strip, setStrip] = useState<HTMLDivElement | null>(null);
      return (
        <>
          <div ref={setStrip} role="toolbar" aria-label="The page strip" />
          <Users toolbar={strip ?? false} />
        </>
      );
    }
    render(<Page />);
    const strip = screen.getByRole('toolbar', { name: 'The page strip' });
    /* the controls are inside the page strip, and the table drew no strip of its own */
    const search = within(strip).getByPlaceholderText('Search');
    expect(within(strip).getByRole('button', { name: 'Filters' })).toBeInTheDocument();
    expect(within(strip).getByRole('button', { name: 'Sort' })).toBeInTheDocument();
    expect(screen.queryByRole('toolbar', { name: 'Users controls' })).not.toBeInTheDocument();
    /* and they drive the table */
    const before = screen.getAllByRole('row').length;
    await userEvent.type(search, USERS[0].name);
    expect(screen.getAllByRole('row').length).toBeLessThan(before);
    expect(screen.getByText(USERS[0].name)).toBeInTheDocument();
  });

  /* Pranjal, 2026-09-12: "not following the minimum width of column rule" - a
   * width the page DECLARES is held to the minimum, like one a person drags to. */
  it('holds a declared width to the column minimum', () => {
    render(
      <Users columns={[{ key: 'status', label: 'Status', width: 110, cell: (u) => u.status }]} />
    );
    const cols = [...document.querySelectorAll('colgroup col')].map(
      (c) => (c as HTMLElement).style.width
    );
    /* row number 60, Name 200, Action 100, then Status - never 110 */
    expect(cols[3]).toBe('120px');
  });

  /* Pranjal, 2026-09-12: "if there's space left then columns should automatically
   * stretch equally to fill the full width of the table". */
  it('shares spare width equally among the content columns, and only them', () => {
    const wide = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth');
    /* the card is 1600 wide; the columns cover 60 + 200 + 100 + 3 × 200 + the 60 tail = 1020 */
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get() {
        return (this as HTMLElement).classList.contains('tbl-viewport') ? 1600 : 0;
      },
    });
    try {
      render(<Users />);
      const cols = [...document.querySelectorAll('colgroup col')].map((c) =>
        parseFloat((c as HTMLElement).style.width)
      );
      expect(cols.slice(0, 3)).toEqual([60, 200, 100]);
      const content = cols.slice(3, -1);
      expect(content).toHaveLength(3);
      /* 1600 - 1020 = 580 spare, 193.33 each */
      for (const w of content) expect(w).toBeCloseTo(200 + 580 / 3, 1);
      expect(cols.at(-1)).toBe(60);
      expect(cols.reduce((a, b) => a + b, 0)).toBeCloseTo(1600, 1);
    } finally {
      if (wide) Object.defineProperty(HTMLElement.prototype, 'clientWidth', wide);
      else delete (HTMLElement.prototype as unknown as Record<string, unknown>)['clientWidth'];
    }
  });

  /* Pranjal, 2026-09-12: "the status icon we used in users is different here" -
   * one icon for a filter: the square wears the glyph of the column it filters. */
  it("puts the filtered column's glyph on the quick-filter square", () => {
    render(<Users />);
    const square = screen.getByRole('button', { name: 'Filter by status' });
    expect(square.querySelector('[data-testid="glyph"]')).not.toBeNull();
  });

  /* Pranjal, 2026-09-12: "we showed the badges inside the filter for clear
   * distinguish visibility" - the menu can draw each value as the column's pill. */
  it('draws each quick-filter value the way the page asks, a pill here', async () => {
    render(
      <Users
        quickFilter={{
          columnKey: 'status',
          label: 'Filter by status',
          options: ['Active', 'Inactive'],
          value: (u) => u.status,
          renderOption: (v) => <Badge size="sm">{v}</Badge>,
        }}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: 'Filter by status' }));
    const item = await screen.findByRole('menuitemcheckbox', { name: 'Active' });
    expect(item.querySelector('[data-tone]')).not.toBeNull();
  });

  /* Pranjal, 2026-09-12: "Can you add that organisation quick filter as well" -
   * the strip carries as many quick filters as the page gives it, each its own
   * square; a row may answer a filter with several values and passes on any. */
  describe('several quick filters', () => {
    const two = [
      {
        columnKey: 'status',
        label: 'Filter by status',
        options: ['Active', 'Inactive', 'Invited'],
        value: (r: SampleUser) => r.status,
      },
      {
        columnKey: 'role',
        label: 'Filter by role',
        options: ['Admin', 'Member', 'Everyone'],
        value: (r: SampleUser) => [r.role, 'Everyone'],
      },
    ];
    it('draws one square per quick filter', () => {
      render(<Users quickFilter={two} />);
      expect(screen.getByLabelText('Filter by status')).toBeInTheDocument();
      expect(screen.getByLabelText('Filter by role')).toBeInTheDocument();
    });
    it('passes a row when any of its several values is ticked, and unticking brings the rows back', async () => {
      const user = userEvent.setup();
      render(<Users quickFilter={two} />);
      const all = screen.getAllByRole('row').length;
      await user.click(screen.getByLabelText('Filter by role'));
      await user.click(await screen.findByRole('menuitemcheckbox', { name: /Everyone/ }));
      await user.keyboard('{Escape}');
      /* every row carries 'Everyone' as its second value, so none drop out */
      expect(screen.getAllByRole('row').length).toBe(all);
      await user.click(screen.getByLabelText('Filter by status'));
      await user.click(await screen.findByRole('menuitemcheckbox', { name: /Inactive/ }));
      await user.keyboard('{Escape}');
      expect(screen.getAllByRole('row').length).toBeLessThan(all);
      await user.click(screen.getByLabelText('Filter by status'));
      await user.click(await screen.findByRole('menuitemcheckbox', { name: /Inactive/ }));
      await user.keyboard('{Escape}');
      expect(screen.getAllByRole('row').length).toBe(all);
    });
  });

  /* Pranjal, 2026-09-12: "i need checkboxes here" - every quick-filter row shows
   * a box, on or off, like the Filters panel and like Users. */
  it('shows a checkbox on every quick-filter row, reflecting the tick', async () => {
    render(<Users />);
    await userEvent.click(screen.getByRole('button', { name: 'Filter by status' }));
    const active = await screen.findByRole('menuitemcheckbox', { name: 'Active' });
    const box = active.querySelector('button[data-state]');
    expect(box).not.toBeNull();
    expect(box).toHaveAttribute('data-state', 'unchecked');
    await userEvent.click(active);
    expect(
      screen.getByRole('menuitemcheckbox', { name: 'Active' }).querySelector('button[data-state]')
    ).toHaveAttribute('data-state', 'checked');
  });

  /* Pranjal, 2026-09-11: "26 entries will create a second page. Then only
   * pagination should be visible." */
  it('shows no pager while everything fits on one page', () => {
    render(<Users rows={USERS.slice(0, 20)} />);
    expect(document.querySelector('.tbl-foot')).toBeNull();
    expect(screen.getAllByRole('row').length).toBeGreaterThan(1);
  });

  it('brings the pager back at the row that makes a second page', () => {
    render(<Users rows={USERS.slice(0, 26)} />);
    expect(screen.getByText(/1–25 of 26 users/)).toBeInTheDocument();
  });

  it('keeps the pager whatever the count when asked, and drops it when told', () => {
    const { unmount } = render(<Users rows={USERS.slice(0, 8)} pager="always" />);
    expect(screen.getByText(/rows\/page/)).toBeInTheDocument();
    unmount();
    render(<Users rows={USERS.slice(0, 40)} pager="never" />);
    expect(document.querySelector('.tbl-foot')).toBeNull();
  });

  it('drops the Load more footer once everything is loaded', async () => {
    render(<Users rows={USERS.slice(0, 30)} paging="loadMore" />);
    expect(screen.getByText('Showing 25 of 30 users')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Load more' }));
    expect(document.querySelector('.tbl-foot')).toBeNull();
  });
});
