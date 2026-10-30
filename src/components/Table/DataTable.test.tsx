import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Badge } from '../Badge';
import { DropdownMenuItem } from '../DropdownMenu';
import { Sheet, SheetBody, SheetContent, SheetHeader, SheetTitle } from '../Sheet';
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
    expect(screen.getByText(/1 selected/)).toBeInTheDocument();
    expect(screen.getByRole('table', { name: 'Users' })).toHaveAttribute(
      'data-has-selection',
      'true'
    );
    await userEvent.click(screen.getByRole('checkbox', { name: 'Select all on this page' }));
    const selectable = USERS.slice(0, 25).filter((u) => u.status !== 'Invited').length;
    expect(screen.getByText(new RegExp(`${selectable} selected`))).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Clear selection' }));
    expect(screen.queryByRole('region', { name: 'Selection' })).not.toBeInTheDocument();
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

  /* Pranjal, 2026-09-28: the empty state's button undoes what is actually applied - a search alone is Clear search */
  it('shows nothing-found for a search with a Clear search button that brings the rows back', async () => {
    render(<Users initialQuery="zzqx" />);
    const blank = screen.getByRole('status');
    expect(within(blank).getByText('No users match')).toBeInTheDocument();
    /* the blank state says it; the footer no longer repeats it under six dead controls */
    expect(document.querySelector('.tbl-foot')).toBeNull();
    expect(within(blank).queryByRole('button', { name: 'Clear filters' })).toBeNull();
    await userEvent.click(within(blank).getByRole('button', { name: 'Clear search' }));
    expect(screen.getByText('1–25 of 60 users')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Search users' })).toHaveValue('');
  });

  it('says Clear all when a search and a filter are both on, and clears both', async () => {
    render(<Users initialQuery="zzqx" />);
    await userEvent.click(screen.getByRole('button', { name: 'Filter by status' }));
    await userEvent.click(screen.getByRole('menuitemcheckbox', { name: /Active/ }));
    await userEvent.keyboard('{Escape}');
    const blank = screen.getByRole('status');
    await userEvent.click(within(blank).getByRole('button', { name: 'Clear all' }));
    expect(screen.getByText('1–25 of 60 users')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Search users' })).toHaveValue('');
  });

  /* Pranjal, 2026-09-28: "we need to provide a cross icon on the right so that i can clear all at once" */
  it('puts a clear ✕ in the search box only while it holds words', async () => {
    render(<Users />);
    const box = screen.getByRole('textbox', { name: 'Search users' });
    expect(screen.queryByRole('button', { name: 'Clear search' })).toBeNull();
    await userEvent.type(box, 'ava');
    await userEvent.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(box).toHaveValue('');
    expect(box).toHaveFocus();
    expect(screen.queryByRole('button', { name: 'Clear search' })).toBeNull();
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

  /* Pranjal, 2026-10-27: every ⋯ action menu is at least 224 wide ("increase the width by a little bit") */
  it('opens the column ⋯ and the row ⋯ at least 224 wide, a floor a longer item can widen', async () => {
    render(<Users />);
    await userEvent.click(screen.getByLabelText('Options for Role'));
    const columnMenu = await screen.findByRole('menu');
    expect(columnMenu).toHaveClass('mdt-min-w-56');
    expect(columnMenu).not.toHaveClass('mdt-min-w-48');
    expect(columnMenu.className).not.toMatch(/(^|\s)mdt-w-/);
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
    const firstRow = screen.getAllByRole('row')[1] as HTMLElement;
    await userEvent.click(within(firstRow).getByRole('button', { name: 'Row actions' }));
    const rowMenu = await screen.findByRole('menu');
    expect(rowMenu).toHaveClass('mdt-min-w-56');
    expect(within(rowMenu).getByRole('menuitem', { name: 'Edit details' })).toBeInTheDocument();
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
    /* row number 60, Name 200, Action 100, then Status - never 110: the floor is 160 (Pranjal, 2026-09-23) */
    expect(cols[3]).toBe('160px');
  });

  /* the tail is hidden by default (Pranjal, 2026-09-23: "remove the most right side column which is nothing but empty.
   * Actually hide it from the code we might need it later") and drawn on request */
  it('draws no tail column unless asked, and a 60px one when asked', () => {
    const { unmount } = render(<Users />);
    const heads = () => [...document.querySelectorAll('thead th')];
    expect(heads().filter((th) => th.getAttribute('aria-hidden') === 'true')).toHaveLength(0);
    expect(document.querySelectorAll('colgroup col')).toHaveLength(heads().length);
    unmount();
    render(<Users tail />);
    const tailHeads = heads().filter((th) => th.getAttribute('aria-hidden') === 'true');
    expect(tailHeads).toHaveLength(1);
    expect((tailHeads[0] as HTMLElement).style.width).toBe('60px');
  });

  /* Pranjal, 2026-09-12: "if there's space left then columns should automatically
   * stretch equally to fill the full width of the table". */
  it('shares spare width equally among the content columns, and only them', () => {
    const wide = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth');
    /* the card is 1600 wide; the columns cover 60 + 200 + 100 + 3 × 200 = 960 - no tail since 2026-09-23 */
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
      const content = cols.slice(3);
      expect(content).toHaveLength(3);
      /* 1600 - 960 = 640 spare, 213.33 each; the table ends at its last column */
      for (const w of content) expect(w).toBeCloseTo(200 + 640 / 3, 1);
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

  /* the one selection look (Pranjal, 2026-10-21): a ticked quick-filter row takes the pale ground too, and the menu's
   * own tick stays hidden behind the checkbox square - it is still the row's first child */
  it('puts a ticked quick-filter row on the pale ground and keeps the menu tick hidden', async () => {
    render(<Users />);
    await userEvent.click(screen.getByRole('button', { name: 'Filter by status' }));
    await userEvent.click(await screen.findByRole('menuitemcheckbox', { name: 'Active' }));
    const row = screen.getByRole('menuitemcheckbox', { name: 'Active' });
    expect(row).toHaveAttribute('data-state', 'checked');
    expect(row).toHaveClass(
      'data-[state=checked]:mdt-bg-blue-10',
      '[&>span:first-child]:mdt-hidden'
    );
    expect(row.firstElementChild?.tagName.toLowerCase()).toBe('span');
    expect(row.firstElementChild).toHaveClass('mdt-right-2.5');
  });

  /* the Sort menu's active field on the pale ground, its arrow kept on the right (Pranjal, 2026-10-21) */
  it('puts the active sort field on the pale ground with its arrow, the rest plain', async () => {
    render(<Users />);
    await userEvent.click(screen.getByRole('button', { name: 'Sort by Name' }));
    await userEvent.click(screen.getByRole('button', { name: 'Sort' }));
    const active = await screen.findByRole('menuitem', { name: /^Name/ });
    const other = screen.getByRole('menuitem', { name: /^Email/ });
    expect(active).toHaveClass('mdt-bg-blue-10', 'data-[highlighted]:mdt-bg-blue-10');
    expect(active).not.toHaveClass('data-[highlighted]:mdt-bg-neutral-10');
    expect(within(active).getByLabelText('ascending')).toHaveTextContent('\u2191');
    expect(other).not.toHaveClass('mdt-bg-blue-10');
    expect(other).toHaveClass('mdt-text-neutral-90');
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

  it('lets the Name column resize; the lead and Action stay fixed', () => {
    render(<Users />);
    /* the handle is a slider named for its heading (Pranjal, 2026-09-13: "only
     * checkbox and action columns are the one which cannot be resized") */
    expect(screen.getByRole('slider', { name: 'Resize Name' })).toBeInTheDocument();
    expect(screen.queryByRole('slider', { name: 'Resize Action' })).toBeNull();
    /* Name plus every content column, nothing for the checkbox lead */
    expect(screen.getAllByRole('slider', { name: /^Resize / })).toHaveLength(COLS.length + 1);
  });

  it('keeps a dragged Name width in the remembered layout', async () => {
    localStorage.clear();
    render(<Users storageKey="t.name-width" />);
    const handle = screen.getByRole('slider', { name: 'Resize Name' });
    handle.focus();
    await userEvent.keyboard('{End}');
    const stored = JSON.parse(localStorage.getItem('t.name-width') || '{}');
    expect(stored.widths && stored.widths.__name).toBe(720);
    localStorage.clear();
  });

  it('widening one column never narrows another: the first drag freezes every column where it stands', async () => {
    localStorage.clear();
    render(<Users storageKey="t.freeze" />);
    const colWidths = () =>
      [...document.querySelectorAll('colgroup col')].map((c) => (c as HTMLElement).style.width);
    const before = colWidths();
    const handle = screen.getByRole('slider', { name: 'Resize Role' });
    handle.focus();
    await userEvent.keyboard('{End}');
    const after = colWidths();
    /* lead · Name · Action · Email · Status · Role · tail */
    expect(after[5]).toBe('720px');
    expect(after[3]).toBe(before[3]);
    expect(after[4]).toBe(before[4]);
    const stored = JSON.parse(localStorage.getItem('t.freeze') || '{}');
    expect(stored.widths.email).toBe(200);
    expect(stored.widths.status).toBe(200);
    expect(stored.widths.role).toBe(720);
    localStorage.clear();
  });

  it('offers the advanced filter door when keys are given, opens the panel and closes it on Escape', async () => {
    render(
      <Users
        filters={undefined}
        advancedFilter={{
          keys: [{ id: 'role', label: 'Role', type: 'pick', options: ['Admin', 'Member'] }],
        }}
      />
    );
    expect(screen.queryByRole('dialog', { name: 'Filters' })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /More filters/ }));
    expect(screen.getByRole('dialog', { name: 'Filters' })).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: 'Filters' })).not.toBeInTheDocument();
  });
});

/* Pranjal, 2026-09-17, on the organisation filter: "it will contain search box
 * as well" - a quick filter whose list is long enough to need finding. */
describe('a searchable quick filter', { timeout: 20000 }, () => {
  const statuses = {
    columnKey: 'status',
    label: 'Filter by status',
    options: ['Active', 'Inactive', 'Invited'],
    value: (u: SampleUser) => u.status,
    searchable: true,
  };

  const openMenu = async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Filter by status' }));
    return screen.findByRole('menuitemcheckbox', { name: 'Active' });
  };

  it('offers no search box unless the filter asks for one', async () => {
    render(<Users />);
    await userEvent.click(screen.getByRole('button', { name: 'Filter by status' }));
    await screen.findByRole('menuitemcheckbox', { name: 'Active' });
    expect(screen.queryByLabelText('Search status')).not.toBeInTheDocument();
  });

  it('puts a named search box at the top when it does', async () => {
    render(<Users quickFilter={statuses} />);
    await openMenu();
    expect(screen.getByLabelText('Search status')).toBeInTheDocument();
  });

  it('narrows the list to what was typed', async () => {
    render(<Users quickFilter={statuses} />);
    await openMenu();
    await userEvent.type(screen.getByLabelText('Search status'), 'inv');
    expect(screen.getByRole('menuitemcheckbox', { name: 'Invited' })).toBeInTheDocument();
    expect(screen.queryByRole('menuitemcheckbox', { name: 'Active' })).not.toBeInTheDocument();
  });

  it('matches without regard to case', async () => {
    render(<Users quickFilter={statuses} />);
    await openMenu();
    await userEvent.type(screen.getByLabelText('Search status'), 'ACTI');
    expect(screen.getByRole('menuitemcheckbox', { name: 'Active' })).toBeInTheDocument();
  });

  it('shows the whole list again once the box is cleared', async () => {
    render(<Users quickFilter={statuses} />);
    await openMenu();
    const box = screen.getByLabelText('Search status');
    await userEvent.type(box, 'inv');
    await userEvent.clear(box);
    expect(screen.getByRole('menuitemcheckbox', { name: 'Active' })).toBeInTheDocument();
  });
});

/* The insert-in-place affordance (Pranjal, 2026-09-26): a hidden column comes back
 * where you want it, not at the end. Hovering a heading boundary offers a "+", and
 * the panel behind it lists what is hidden. */
describe('putting a hidden column back in place', { timeout: 20000 }, () => {
  const seed = (key: string, hidden: string[]) => {
    localStorage.setItem(
      key,
      JSON.stringify({ order: ['email', 'status', 'role'], hidden, widths: {} })
    );
  };
  const plus = () => screen.queryByRole('button', { name: 'Insert a column after Email' });

  it('offers the "+" at a heading boundary while something is hidden', async () => {
    seed('t.insert', ['role']);
    render(<Users storageKey="t.insert" />);
    expect(plus()).not.toBeInTheDocument();
    await userEvent.hover(screen.getByRole('slider', { name: 'Resize Email' }));
    expect(plus()).toBeInTheDocument();
  });

  it('offers nothing when every column is already on the table', async () => {
    seed('t.insert-none', []);
    render(<Users storageKey="t.insert-none" />);
    await userEvent.hover(screen.getByRole('slider', { name: 'Resize Email' }));
    expect(plus()).not.toBeInTheDocument();
  });

  it('opens a panel named after the column the new one will follow', async () => {
    seed('t.insert-open', ['role']);
    render(<Users storageKey="t.insert-open" />);
    await userEvent.hover(screen.getByRole('slider', { name: 'Resize Email' }));
    await userEvent.click(plus() as HTMLElement);
    const panel = screen.getByRole('dialog', { name: 'Insert a column after Email' });
    expect(within(panel).getByText('Insert a column')).toBeInTheDocument();
    expect(within(panel).getByRole('button', { name: 'Role' })).toBeInTheDocument();
  });

  it('narrows the hidden list to what was typed, and says so when nothing matches', async () => {
    seed('t.insert-search', ['role']);
    render(<Users storageKey="t.insert-search" />);
    await userEvent.hover(screen.getByRole('slider', { name: 'Resize Email' }));
    await userEvent.click(plus() as HTMLElement);
    const box = screen.getByLabelText('Search hidden columns');
    await userEvent.type(box, 'rol');
    expect(screen.getByRole('button', { name: 'Role' })).toBeInTheDocument();
    await userEvent.clear(box);
    await userEvent.type(box, 'zzz');
    expect(screen.getByText('Nothing hidden matches.')).toBeInTheDocument();
  });

  it('puts the picked column back right after that heading, and remembers it', async () => {
    seed('t.insert-pick', ['role']);
    render(<Users storageKey="t.insert-pick" />);
    expect(screen.queryByRole('columnheader', { name: 'Role' })).not.toBeInTheDocument();
    await userEvent.hover(screen.getByRole('slider', { name: 'Resize Email' }));
    await userEvent.click(plus() as HTMLElement);
    await userEvent.click(screen.getByRole('button', { name: 'Role' }));
    const heads = screen
      .getAllByRole('columnheader')
      .map((h) => h.textContent?.replace(/\s+/g, ' ').trim());
    expect(heads.indexOf('Role')).toBe(heads.indexOf('Email') + 1);
    const stored = JSON.parse(localStorage.getItem('t.insert-pick') || '{}') as {
      hidden: string[];
      order: string[];
    };
    expect(stored.hidden).toEqual([]);
    expect(stored.order).toEqual(['email', 'role', 'status']);
  });

  it('takes the "+" away once the pointer leaves and the panel is shut', async () => {
    seed('t.insert-leave', ['role']);
    render(<Users storageKey="t.insert-leave" />);
    const handle = screen.getByRole('slider', { name: 'Resize Email' });
    await userEvent.hover(handle);
    expect(plus()).toBeInTheDocument();
    await userEvent.unhover(handle);
    await waitFor(() => {
      expect(plus()).not.toBeInTheDocument();
    });
  });
});

/* The console, 2026-10-28: the fleets' Change log has a View button that opens a
 * list already narrowed to one tag or network zone, as a real filter the person
 * can edit or clear (Pranjal's pick over filling the search box). */
describe('an advanced filter the page starts with', { timeout: 20000 }, () => {
  const ROLES = ['Admin', 'Member', 'Viewer', 'Billing'];
  const roleKey = { id: 'role', label: 'Role', type: 'pick' as const, options: ROLES };
  const emailKey = { id: 'email', label: 'Email', type: 'text' as const };
  const roleIs = (role: string) => ({
    join: 'and' as const,
    rows: [{ key: 'role', op: 'is', value: [role] }],
  });
  const shownRoles = () =>
    screen
      .getAllByRole('cell')
      .map((c) => c.textContent ?? '')
      .filter((t) => ROLES.includes(t));

  it('opens narrowed, with the door counting it as applied', () => {
    render(
      <Users
        filters={undefined}
        advancedFilter={{ keys: [roleKey, emailKey], initial: roleIs('Admin') }}
      />
    );
    expect(screen.getByRole('button', { name: 'More filters, 1 applied' })).toBeInTheDocument();
    const roles = shownRoles();
    expect(roles.length).toBeGreaterThan(0);
    expect(new Set(roles)).toEqual(new Set(['Admin']));
  });

  it('holds the quick filters, exactly as when a person applies one', () => {
    render(
      <Users filters={undefined} advancedFilter={{ keys: [roleKey], initial: roleIs('Admin') }} />
    );
    expect(document.querySelector('[data-quick-held="true"]')).not.toBeNull();
  });

  it('seeds a text key too', () => {
    const someone = USERS[0]!;
    render(
      <Users
        filters={undefined}
        advancedFilter={{
          keys: [roleKey, emailKey],
          initial: { join: 'and', rows: [{ key: 'email', op: 'contains', value: someone.email }] },
        }}
      />
    );
    expect(screen.getByText(someone.email)).toBeInTheDocument();
    expect(screen.getAllByRole('cell').filter((c) => c.textContent?.includes('@'))).toHaveLength(1);
  });

  it('reads the starting filter once, and starts over only with a new key', () => {
    const { rerender } = render(
      <Users
        key="a"
        filters={undefined}
        advancedFilter={{ keys: [roleKey], initial: roleIs('Admin') }}
      />
    );
    rerender(
      <Users
        key="a"
        filters={undefined}
        advancedFilter={{ keys: [roleKey], initial: roleIs('Member') }}
      />
    );
    expect(new Set(shownRoles())).toEqual(new Set(['Admin']));
    rerender(
      <Users
        key="b"
        filters={undefined}
        advancedFilter={{ keys: [roleKey], initial: roleIs('Member') }}
      />
    );
    expect(new Set(shownRoles())).toEqual(new Set(['Member']));
  });

  it('starts empty when the page gives no starting filter', () => {
    render(<Users filters={undefined} advancedFilter={{ keys: [roleKey] }} />);
    expect(screen.getByRole('button', { name: 'More filters' })).toBeInTheDocument();
    expect(document.querySelector('[data-quick-held="true"]')).toBeNull();
  });
});

/* The console, 2026-10-26: every table inside a drawer ignored a row's click (library 2.2.0) - the row's test for
 * "a click on a control" matched the drawer's own role="dialog" - so the fleets read the click themselves. Enter
 * always worked. The row now counts only what is inside it. */
describe('a table inside a side panel', { timeout: 20000 }, () => {
  function InPanel({ onRowOpen }: { onRowOpen: (u: SampleUser) => void }) {
    return (
      <Sheet open>
        <SheetContent layout="drawer" size="lg" aria-describedby={undefined}>
          <SheetHeader>
            <SheetTitle>Agents running Log shipper</SheetTitle>
          </SheetHeader>
          <SheetBody>
            <Users
              rows={USERS.slice(0, 5)}
              isRowInert={undefined}
              docked={false}
              maxHeight="none"
              onRowOpen={onRowOpen}
            />
          </SheetBody>
        </SheetContent>
      </Sheet>
    );
  }
  const first = USERS[0]!;

  it('opens a row on a mouse click', async () => {
    const onRowOpen = vi.fn();
    render(<InPanel onRowOpen={onRowOpen} />);
    const panel = screen.getByRole('dialog', { name: 'Agents running Log shipper' });
    await userEvent.click(within(panel).getByText(first.email));
    expect(onRowOpen).toHaveBeenCalledTimes(1);
    expect(onRowOpen).toHaveBeenCalledWith(first);
  });

  it('still opens it on Enter, and leaves the row menu and the checkbox alone', async () => {
    const onRowOpen = vi.fn();
    render(<InPanel onRowOpen={onRowOpen} />);
    const panel = screen.getByRole('dialog', { name: 'Agents running Log shipper' });
    const row = within(panel).getByText(first.email).closest('tr') as HTMLElement;
    row.focus();
    await userEvent.keyboard('{Enter}');
    expect(onRowOpen).toHaveBeenCalledTimes(1);
    await userEvent.click(within(row).getByRole('button', { name: 'Row actions' }));
    await userEvent.click(await screen.findByRole('menuitem', { name: 'Edit details' }));
    await userEvent.click(within(row).getByRole('checkbox', { hidden: true }));
    expect(onRowOpen).toHaveBeenCalledTimes(1);
  });
});

/* Pranjal, 2026-10-27 (the action menu rules): a row with nothing to do shows no ⋯ - the console hid it with its own
 * data-row-actions="none" mark. The 224 floor is tested with the column ⋯ above. */
describe('the row ⋯', { timeout: 20000 }, () => {
  const SIX = USERS.slice(0, 6);
  /* one answer per row: an item, null, false, an empty fragment, an empty list, a fragment holding only nothing */
  const answers = (u: SampleUser) =>
    [
      <DropdownMenuItem key="e">Edit details</DropdownMenuItem>,
      null,
      false,
      <></>,
      [],
      <>
        {null}
        {false}
      </>,
    ][SIX.indexOf(u)];
  const rows = () =>
    Array.from(
      screen.getByRole('table', { name: 'Users' }).querySelectorAll<HTMLElement>('tbody tr.tbl-row')
    );

  it('draws no ⋯ on a row whose actions are nothing, and keeps its Action cell', () => {
    render(<Users rows={SIX} isRowInert={undefined} rowActions={answers} />);
    const all = rows();
    expect(all).toHaveLength(6);
    expect(within(all[0]!).getByRole('button', { name: 'Row actions' })).toBeInTheDocument();
    for (const tr of all.slice(1)) {
      expect(within(tr).queryByRole('button', { name: 'Row actions' })).not.toBeInTheDocument();
    }
    /* every row still has the same cells, so the columns stay aligned */
    expect(new Set(all.map((tr) => tr.children.length)).size).toBe(1);
    expect(screen.getByRole('columnheader', { name: /Action/ })).toBeInTheDocument();
  });
});
