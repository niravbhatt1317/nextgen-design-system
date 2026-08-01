import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DataTable } from './DataTable';

interface Row {
  id: string;
  name: string;
  score: number;
  team: string;
}

/**
 * Deliberately arranged so the input order matches neither sort. A fixture that
 * arrives already sorted cannot tell a working sort from a broken one.
 */
const rows: Row[] = [
  { id: 'a', name: 'item 10', score: 30, team: 'Red' },
  { id: 'b', name: 'item 2', score: 100, team: 'Blue' },
  { id: 'c', name: 'item 1', score: 2, team: 'Red' },
];

const columns = [
  { key: 'id', label: 'ID', locked: true },
  { key: 'name', label: 'Name' },
  { key: 'score', label: 'Score' },
  { key: 'team', label: 'Team' },
];

const bodyText = () =>
  within(screen.getByRole('table'))
    .getAllByRole('row')
    .slice(1)
    .map((row) => row.textContent ?? '');

const firstColumn = () => bodyText().map((text) => text.slice(0, 1));

describe('DataTable', () => {
  describe('rendering', () => {
    it('renders a row per record and a column per definition', () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} />);
      expect(bodyText()).toHaveLength(3);
      expect(screen.getByRole('columnheader', { name: /Name/ })).toBeInTheDocument();
    });

    it('prints values as text without a renderer', () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} />);
      expect(screen.getByText('item 10')).toBeInTheDocument();
    });

    it('uses renderCell when given one', () => {
      render(
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          renderCell={(row, key) => (key === 'team' ? <b>{row.team}!</b> : row[key as keyof Row])}
        />
      );
      expect(screen.getAllByText('Red!')).toHaveLength(2);
    });

    it('says nothing is here when there are no rows at all', () => {
      render(
        <DataTable
          columns={columns}
          rows={[]}
          getRowId={(row: Row) => row.id}
          emptyMessage="No records."
        />
      );
      expect(screen.getByText('No records.')).toBeInTheDocument();
    });
  });

  describe('sorting', () => {
    it('sorts numerically rather than alphabetically', async () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} />);
      await userEvent.click(screen.getByRole('button', { name: 'Sort by Score' }));
      // Scores 2, 30, 100 -> c, a, b. A string sort would give 100, 2, 30.
      expect(firstColumn()).toEqual(['c', 'a', 'b']);
    });

    it('sorts text naturally, so item 2 precedes item 10', async () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} />);
      await userEvent.click(screen.getByRole('button', { name: 'Sort by Name' }));
      // item 1, item 2, item 10 -> c, b, a. A plain compare puts 10 before 2.
      expect(firstColumn()).toEqual(['c', 'b', 'a']);
    });

    it('leaves the rows alone when sorting is handed back', async () => {
      const onSortChange = vi.fn();
      render(
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          manualSort
          onSortChange={onSortChange}
        />
      );
      await userEvent.click(screen.getByRole('button', { name: 'Sort by Score' }));
      // Reported, not applied: that is the whole contract of `manualSort`.
      expect(onSortChange).toHaveBeenCalled();
      expect(firstColumn()).toEqual(['a', 'b', 'c']);
    });
  });

  describe('searching', () => {
    it('narrows the rows', async () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} />);
      await userEvent.type(screen.getByRole('searchbox'), 'Blue');
      expect(bodyText()).toHaveLength(1);
    });

    it('says nothing matches rather than nothing exists', async () => {
      render(
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          emptyMessage="No records."
          filteredEmptyMessage="Nothing matches."
        />
      );
      await userEvent.type(screen.getByRole('searchbox'), 'zzzz');
      // Telling these apart is the difference between someone creating a record
      // and someone clearing a filter.
      expect(screen.getByText('Nothing matches.')).toBeInTheDocument();
      expect(screen.queryByText('No records.')).not.toBeInTheDocument();
    });

    it('reports but does not apply when searching is handed back', async () => {
      const onSearchChange = vi.fn();
      render(
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          manualSearch
          onSearchChange={onSearchChange}
        />
      );
      await userEvent.type(screen.getByRole('searchbox'), 'Blue');
      expect(onSearchChange).toHaveBeenCalled();
      expect(bodyText()).toHaveLength(3);
    });

    it('can be turned off entirely', () => {
      render(
        <DataTable columns={columns} rows={rows} getRowId={(row) => row.id} searchable={false} />
      );
      expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
    });
  });

  describe('filtering', () => {
    const attributes = [{ key: 'team', label: 'Team', values: ['Red', 'Blue'] }];

    it('shows no filter control without attributes', () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} />);
      expect(screen.queryByRole('button', { name: /Filters/ })).not.toBeInTheDocument();
    });

    it('narrows the rows and shows a chip', async () => {
      render(
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          filterAttributes={attributes}
        />
      );
      await userEvent.click(screen.getByRole('button', { name: /Filters/ }));
      await userEvent.click(screen.getByRole('option', { name: /Team/ }));
      await userEvent.click(screen.getByRole('option', { name: 'Red' }));
      await userEvent.keyboard('{Escape}');
      expect(bodyText()).toHaveLength(2);
      expect(screen.getByText(/Team: Red/)).toBeInTheDocument();
    });
  });

  describe('the sort menu', () => {
    const openSort = async () => {
      await userEvent.click(screen.getByRole('button', { name: 'Sort' }));
    };

    it('sorts from the menu as well as the header', async () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} />);
      await openSort();
      await userEvent.click(screen.getByRole('option', { name: 'Score' }));
      await userEvent.keyboard('{Escape}');
      expect(firstColumn()).toEqual(['c', 'a', 'b']);
    });

    it('reverses a direction from the menu', async () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} />);
      await openSort();
      await userEvent.click(screen.getByRole('option', { name: 'Score' }));
      await userEvent.click(screen.getByRole('button', { name: /Score is ascending/ }));
      await userEvent.keyboard('{Escape}');
      expect(firstColumn()).toEqual(['b', 'a', 'c']);
    });

    it('stops sorting from the menu', async () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} />);
      await openSort();
      await userEvent.click(screen.getByRole('option', { name: 'Score' }));
      await userEvent.click(screen.getByRole('button', { name: /Stop sorting by Score/ }));
      await userEvent.keyboard('{Escape}');
      expect(firstColumn()).toEqual(['a', 'b', 'c']);
    });
  });

  describe('filter chips and callbacks', () => {
    const attributes = [{ key: 'team', label: 'Team', values: ['Red', 'Blue'] }];

    const applyRed = async () => {
      await userEvent.click(screen.getByRole('button', { name: /Filters/ }));
      await userEvent.click(screen.getByRole('option', { name: /Team/ }));
      await userEvent.click(screen.getByRole('option', { name: 'Red' }));
      await userEvent.keyboard('{Escape}');
    };

    it('removes a filter from its chip', async () => {
      const onFilterChange = vi.fn();
      render(
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          filterAttributes={attributes}
          onFilterChange={onFilterChange}
        />
      );
      await applyRed();
      expect(bodyText()).toHaveLength(2);
      await userEvent.click(screen.getByRole('button', { name: 'Remove' }));
      expect(bodyText()).toHaveLength(3);
      expect(onFilterChange).toHaveBeenCalled();
    });

    it('clears every filter from the menu', async () => {
      render(
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          filterAttributes={attributes}
        />
      );
      await applyRed();
      await userEvent.click(screen.getByRole('button', { name: /Filters/ }));
      await userEvent.click(screen.getByRole('button', { name: /Clear all filters/ }));
      await userEvent.keyboard('{Escape}');
      expect(bodyText()).toHaveLength(3);
    });

    it('reports but does not apply when filtering is handed back', async () => {
      const onFilterChange = vi.fn();
      render(
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          filterAttributes={attributes}
          manualFilter
          onFilterChange={onFilterChange}
        />
      );
      await applyRed();
      expect(onFilterChange).toHaveBeenCalled();
      expect(bodyText()).toHaveLength(3);
    });
  });

  describe('awkward values', () => {
    interface Odd {
      id: string;
      when: Date;
      thing: { deep: string };
      missing: string | null;
    }

    const odd: Odd[] = [
      { id: 'x', when: new Date('2026-02-01'), thing: { deep: 'a' }, missing: null },
      { id: 'y', when: new Date('2026-01-01'), thing: { deep: 'b' }, missing: 'here' },
    ];
    const oddColumns = [
      { key: 'id', label: 'ID' },
      { key: 'when', label: 'When' },
      { key: 'thing', label: 'Thing' },
      { key: 'missing', label: 'Missing' },
    ];

    it('prints a date rather than [object Object]', () => {
      render(<DataTable columns={oddColumns} rows={odd} getRowId={(row) => row.id} />);
      expect(screen.getByText(/2026-02-01/)).toBeInTheDocument();
    });

    it('prints nothing for an object, rather than something that looks like data', () => {
      render(<DataTable columns={oddColumns} rows={odd} getRowId={(row) => row.id} />);
      // A column of objects needs `renderCell`; "[object Object]" would hide
      // that behind text that looks deliberate.
      expect(screen.queryByText(/object Object/)).not.toBeInTheDocument();
    });

    it('sorts dates by their real order', async () => {
      render(<DataTable columns={oddColumns} rows={odd} getRowId={(row) => row.id} />);
      await userEvent.click(screen.getByRole('button', { name: 'Sort by When' }));
      expect(firstColumn()).toEqual(['y', 'x']);
    });

    it('puts empty values at one end rather than scattering them', async () => {
      // A separate render on purpose: clicking a second column *adds* to the
      // sort stack rather than replacing it, so reusing the previous one would
      // measure two sorts and call it one.
      render(<DataTable columns={oddColumns} rows={odd} getRowId={(row) => row.id} />);
      await userEvent.click(screen.getByRole('button', { name: 'Sort by Missing' }));
      expect(firstColumn()).toEqual(['x', 'y']);
    });
  });

  describe('paging', () => {
    const many = Array.from({ length: 12 }, (_, i) => ({
      id: `r${String(i)}`,
      name: `row ${String(i)}`,
      score: i,
      team: 'Red',
    }));

    it('shows one page at a time', () => {
      render(<DataTable columns={columns} rows={many} getRowId={(row) => row.id} pageSize={5} />);
      expect(bodyText()).toHaveLength(5);
      expect(screen.getByText('1–5 of 12')).toBeInTheDocument();
    });

    it('moves between pages and reports it', async () => {
      const onPageChange = vi.fn();
      render(
        <DataTable
          columns={columns}
          rows={many}
          getRowId={(row) => row.id}
          pageSize={5}
          onPageChange={onPageChange}
        />
      );
      await userEvent.click(screen.getByRole('button', { name: 'Go to next page' }));
      expect(onPageChange).toHaveBeenCalled();
      expect(screen.getByText('6–10 of 12')).toBeInTheDocument();
      await userEvent.click(screen.getByRole('button', { name: 'Go to previous page' }));
      expect(screen.getByText('1–5 of 12')).toBeInTheDocument();
    });

    it('hides the controls when everything fits on one page', () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} pageSize={25} />);
      expect(screen.queryByRole('button', { name: 'Go to next page' })).not.toBeInTheDocument();
    });

    it('shows every row and no controls when paging is handed back', () => {
      render(
        <DataTable
          columns={columns}
          rows={many}
          getRowId={(row) => row.id}
          manualPagination
          total={430}
        />
      );
      expect(bodyText()).toHaveLength(12);
      expect(screen.queryByRole('button', { name: 'Go to next page' })).not.toBeInTheDocument();
    });
  });

  describe('columns', () => {
    it('hides a column through the view menu', async () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} />);
      await userEvent.click(screen.getByRole('button', { name: 'View settings' }));
      await userEvent.click(screen.getByRole('button', { name: /^Columns/ }));
      await userEvent.click(screen.getByRole('option', { name: /Team/ }));
      await userEvent.keyboard('{Escape}');
      expect(screen.queryByRole('columnheader', { name: /Team/ })).not.toBeInTheDocument();
    });
  });

  describe('selection', () => {
    it('shows no checkboxes unless asked', () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} />);
      expect(screen.queryByRole('checkbox', { name: 'Select all rows' })).not.toBeInTheDocument();
    });

    it('selects a row and shows the bar', async () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} selectable />);
      await userEvent.click(screen.getByRole('checkbox', { name: 'Select a' }));
      expect(screen.getByRole('toolbar', { name: 'Selected rows' })).toBeInTheDocument();
      expect(screen.getByText('1 selected')).toBeInTheDocument();
    });

    it('selects a range with shift', async () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} selectable />);
      // One session, because `userEvent.keyboard` and `userEvent.click` each
      // create their own instance otherwise - and a Shift held by one is not
      // held by the other, so the modifier never reaches the handler and the
      // test passes for the wrong reason.
      const user = userEvent.setup();
      await user.click(screen.getByRole('checkbox', { name: 'Select a' }));
      await user.keyboard('{Shift>}');
      await user.click(screen.getByRole('checkbox', { name: 'Select c' }));
      await user.keyboard('{/Shift}');
      expect(screen.getByText('3 selected')).toBeInTheDocument();
    });

    it('selects everything from the header', async () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} selectable />);
      await userEvent.click(screen.getByRole('checkbox', { name: 'Select all rows' }));
      expect(screen.getByText('3 selected')).toBeInTheDocument();
    });

    it('renders bulk actions with the selected ids', async () => {
      render(
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          selectable
          bulkActions={(selected) => <button type="button">Delete {selected.length}</button>}
        />
      );
      await userEvent.click(screen.getByRole('checkbox', { name: 'Select b' }));
      expect(screen.getByRole('button', { name: 'Delete 1' })).toBeInTheDocument();
    });

    it('spans the checkbox column in the empty state', async () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} selectable />);
      await userEvent.type(screen.getByRole('searchbox'), 'zzzz');
      const cell = screen.getByText(/Nothing matches/).closest('td');
      // Four columns plus the checkbox: a short colSpan leaves a gap where the
      // checkbox column is.
      expect(cell).toHaveAttribute('colspan', '5');
    });
  });

  describe('column controls', () => {
    it('gives each header its own menu, sort control and grip', () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} />);
      expect(screen.getByRole('button', { name: 'Name column' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Sort by Name' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^Reorder Name/ })).toBeInTheDocument();
    });

    it('hides a column from its own header menu', async () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} />);
      await userEvent.click(screen.getByRole('button', { name: 'Team column' }));
      await userEvent.click(screen.getByRole('menuitem', { name: 'Hide this column' }));
      expect(screen.queryByRole('button', { name: 'Team column' })).not.toBeInTheDocument();
    });

    it('leaves a locked column without move or hide', async () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} />);
      await userEvent.click(screen.getByRole('button', { name: 'ID column' }));
      expect(screen.queryByRole('menuitem', { name: 'Hide this column' })).not.toBeInTheDocument();
    });

    it('can be turned off for a table that is a fixed report', () => {
      render(
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          columnControls={false}
        />
      );
      expect(screen.queryByRole('button', { name: 'Name column' })).not.toBeInTheDocument();
      // Sorting stays - it is not a column control, it is what a header is for.
      expect(screen.getByRole('button', { name: 'Sort by Name' })).toBeInTheDocument();
    });
  });

  describe('extras', () => {
    it('renders toolbar actions it was given', () => {
      render(
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          toolbarActions={<button type="button">Export</button>}
        />
      );
      expect(screen.getByRole('button', { name: 'Export' })).toBeInTheDocument();
    });

    it('accepts extra classes', () => {
      const { container } = render(
        <DataTable columns={columns} rows={rows} getRowId={(row) => row.id} className="custom" />
      );
      expect(container.firstChild).toHaveClass('custom');
    });
  });

  describe('saved views', () => {
    const openViews = async (user: ReturnType<typeof userEvent.setup>, name = 'Views') => {
      await user.click(screen.getByRole('button', { name: new RegExp(name) }));
    };

    it('shows no switcher unless asked for one', () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} />);
      expect(screen.queryByRole('button', { name: /Views/ })).not.toBeInTheDocument();
    });

    it('saves the table as a view and reports it', async () => {
      const user = userEvent.setup();
      const onViewsChange = vi.fn();
      render(
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          savedViews
          onViewsChange={onViewsChange}
        />
      );
      await user.type(screen.getByRole('searchbox'), 'item 1');
      await openViews(user);
      await user.click(screen.getByRole('button', { name: 'Save as new view' }));
      await user.type(screen.getByLabelText('Save this view'), 'Ones{Enter}');

      const saved = onViewsChange.mock.calls[0]?.[0] as {
        name: string;
        state: { query: string };
      }[];
      expect(saved[0]?.name).toBe('Ones');
      // The search is part of the view, so reopening it narrows the table the
      // same way rather than to everything.
      expect(saved[0]?.state.query).toBe('item 1');
    });

    it('applies a stored view to the table', async () => {
      const user = userEvent.setup();
      render(
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          savedViews
          initialViews={[
            {
              id: 'red',
              name: 'Red team',
              state: {
                columns: {
                  order: ['id', 'name', 'score', 'team'],
                  hidden: ['score'],
                  frozenCount: 0,
                },
                sort: [{ column: 'name', direction: 'ascend' }],
                filters: [{ attribute: 'team', values: ['Red'] }],
                query: '',
              },
            },
          ]}
        />
      );
      await openViews(user);
      await user.click(screen.getByText('Red team'));

      expect(firstColumn()).toEqual(['c', 'a']);
      expect(screen.queryByRole('columnheader', { name: /Score/ })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Red team/ })).toBeInTheDocument();
    });

    it('marks the view once the table moves away from it, and clears the mark on discard', async () => {
      const user = userEvent.setup();
      render(
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          savedViews
          initialViewId="all"
          initialViews={[
            {
              id: 'all',
              name: 'Everything',
              state: {
                columns: { order: ['id', 'name', 'score', 'team'], hidden: [], frozenCount: 0 },
                sort: [],
                filters: [],
                query: '',
              },
            },
          ]}
        />
      );
      expect(screen.queryByLabelText('Unsaved changes')).not.toBeInTheDocument();

      await user.type(screen.getByRole('searchbox'), 'item 2');
      expect(screen.getByLabelText('Unsaved changes')).toBeInTheDocument();

      await openViews(user, 'Everything');
      await user.click(screen.getByRole('button', { name: 'Discard changes' }));
      expect(screen.getByRole('searchbox')).toHaveValue('');
      expect(screen.queryByLabelText('Unsaved changes')).not.toBeInTheDocument();
      expect(bodyText()).toHaveLength(3);
    });
  });

  describe('loading', () => {
    it('draws skeleton rows while the first rows are on their way', () => {
      render(<DataTable columns={columns} rows={[]} getRowId={(row: Row) => row.id} loading />);
      const body = screen.getByRole('table').querySelector('tbody');
      expect(body).toHaveAttribute('aria-busy', 'true');
      // The table's shape is held rather than collapsing to a spinner and
      // shoving the page around when the rows land.
      expect(bodyText().length).toBeGreaterThan(1);
      expect(screen.queryByText('Nothing to show.')).not.toBeInTheDocument();
    });

    it('keeps the rows it has and marks them busy instead', () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} loading />);
      // Replacing a table someone is reading with placeholders on every
      // keystroke is a flicker, and throws away rows that were probably right.
      expect(firstColumn()).toEqual(['a', 'b', 'c']);
      expect(screen.getByRole('table').querySelector('tbody')).toHaveAttribute('aria-busy', 'true');
    });

    it('does not claim the table is empty while it is still loading', () => {
      const { rerender } = render(
        <DataTable columns={columns} rows={[]} getRowId={(row: Row) => row.id} loading />
      );
      expect(screen.queryByText('Nothing to show.')).not.toBeInTheDocument();
      rerender(<DataTable columns={columns} rows={[]} getRowId={(row: Row) => row.id} />);
      expect(screen.getByText('Nothing to show.')).toBeInTheDocument();
    });

    it('is not busy when nothing is loading', () => {
      render(<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} />);
      expect(screen.getByRole('table').querySelector('tbody')).not.toHaveAttribute('aria-busy');
    });
  });

  describe('infinite scroll', () => {
    it('offers Load more and no pager', () => {
      render(
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          pageSize={2}
          infinite
          hasMore
          onLoadMore={vi.fn()}
        />
      );
      expect(screen.getByRole('button', { name: 'Load more' })).toBeInTheDocument();
      // One way through a list, not two that disagree about which rows exist.
      expect(screen.queryByRole('button', { name: 'Go to next page' })).not.toBeInTheDocument();
      // And no slicing: all three rows show despite a page size of two. The
      // sentinel is a row of its own, so it is taken back out of the count.
      const data = bodyText().filter((row) => !row.includes('Load more'));
      expect(data).toHaveLength(3);
    });

    it('loads more when the button is pressed', async () => {
      const user = userEvent.setup();
      const onLoadMore = vi.fn();
      render(
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          infinite
          hasMore
          onLoadMore={onLoadMore}
        />
      );
      await user.click(screen.getByRole('button', { name: 'Load more' }));
      expect(onLoadMore).toHaveBeenCalledTimes(1);
    });

    it('says so while the next batch is coming, and will not ask twice', () => {
      render(
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          infinite
          hasMore
          loadingMore
          onLoadMore={vi.fn()}
        />
      );
      expect(screen.getByRole('button', { name: /Loading more/ })).toBeDisabled();
    });

    it('drops the control once there is nothing left', () => {
      render(
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          infinite
          onLoadMore={vi.fn()}
        />
      );
      expect(screen.queryByRole('button', { name: /Load more/ })).not.toBeInTheDocument();
    });

    it('shows nothing to load without somewhere to ask', () => {
      render(
        <DataTable columns={columns} rows={rows} getRowId={(row) => row.id} infinite hasMore />
      );
      expect(screen.queryByRole('button', { name: /Load more/ })).not.toBeInTheDocument();
    });
  });

  describe('rows per page', () => {
    const many: Row[] = Array.from({ length: 30 }, (_, index) => ({
      id: `r${String(index)}`,
      name: `item ${String(index)}`,
      score: index,
      team: 'Red',
    }));

    it('is not offered unless asked for', () => {
      render(<DataTable columns={columns} rows={many} getRowId={(row) => row.id} pageSize={10} />);
      expect(screen.queryByText('Rows per page')).not.toBeInTheDocument();
    });

    it('changes the page size and keeps the first row on screen', async () => {
      const user = userEvent.setup();
      render(
        <DataTable
          columns={columns}
          rows={many}
          getRowId={(row) => row.id}
          pageSize={10}
          rowsPerPage
          pageSizes={[10, 25]}
        />
      );
      await user.click(screen.getByRole('button', { name: 'Go to page 3' }));
      expect(screen.getByText('21–30 of 30')).toBeInTheDocument();

      await user.click(screen.getByRole('combobox', { name: 'Rows per page' }));
      await user.click(screen.getByRole('option', { name: '25' }));
      // Row 21 was the first on screen and is still on screen - it falls
      // inside the new range rather than the table jumping to a page that does
      // not contain it. That is what `setPageSize` was written for, and what
      // nothing called until this control existed.
      expect(screen.getByText('1–25 of 30')).toBeInTheDocument();
      expect(screen.getByText('item 20')).toBeInTheDocument();
    });
  });
});
