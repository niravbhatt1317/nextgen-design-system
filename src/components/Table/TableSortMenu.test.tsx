import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TableSortMenu } from './TableSortMenu';
import { TableToolbar, TableToolbarActions } from './TableToolbar';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'status', label: 'Status' },
  { key: 'priority', label: 'Priority' },
];

const handlers = () => ({
  onToggleDirection: vi.fn(),
  onRemove: vi.fn(),
  onMove: vi.fn(),
  onClear: vi.fn(),
  onSortBy: vi.fn(),
});

const open = async () => {
  await userEvent.click(screen.getByRole('button', { name: 'Sort' }));
};

describe('TableSortMenu', () => {
  describe('the column list', () => {
    it('lists every column when nothing is sorted', async () => {
      render(<TableSortMenu columns={columns} rules={[]} {...handlers()} />);
      await open();
      expect(screen.getByRole('option', { name: 'ID' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Status' })).toBeInTheDocument();
    });

    it('leaves out columns already in the stack', async () => {
      render(
        <TableSortMenu
          columns={columns}
          rules={[{ column: 'status', direction: 'ascend' }]}
          {...handlers()}
        />
      );
      await open();
      // Status appears above, as a statement of what is true - offering it
      // again below would make the word mean two things on one panel.
      expect(screen.queryByRole('option', { name: 'Status' })).not.toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Priority' })).toBeInTheDocument();
    });

    it('starts sorting by a chosen column', async () => {
      const h = handlers();
      render(<TableSortMenu columns={columns} rules={[]} {...h} />);
      await open();
      await userEvent.click(screen.getByRole('option', { name: 'Priority' }));
      expect(h.onSortBy).toHaveBeenCalledWith('priority');
    });

    it('filters as you type, and says so when nothing matches', async () => {
      render(<TableSortMenu columns={columns} rules={[]} {...handlers()} />);
      await open();
      await userEvent.type(screen.getByPlaceholderText('Search'), 'zzz');
      expect(screen.getByText('No columns match.')).toBeInTheDocument();
    });
  });

  describe('the active stack', () => {
    const sorted = [
      { column: 'status', direction: 'ascend' as const },
      { column: 'priority', direction: 'descend' as const },
    ];

    it('shows nothing above the list when nothing is sorted', async () => {
      render(<TableSortMenu columns={columns} rules={[]} {...handlers()} />);
      await open();
      expect(screen.queryByText('Sorting order')).not.toBeInTheDocument();
    });

    it('lists the active sorts in order', async () => {
      render(<TableSortMenu columns={columns} rules={sorted} {...handlers()} />);
      await open();
      expect(screen.getByText('Sorting order')).toBeInTheDocument();
      const items = screen.getAllByRole('listitem');
      expect(items[0]).toHaveTextContent('Status');
      expect(items[1]).toHaveTextContent('Priority');
    });

    it('says which way each column sorts, in words', async () => {
      render(<TableSortMenu columns={columns} rules={sorted} {...handlers()} />);
      await open();
      // The arrow is `aria-hidden`, so the direction has to reach a screen
      // reader through the button's name.
      expect(
        screen.getByRole('button', { name: 'Status is ascending. Reverse it' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Priority is descending. Reverse it' })
      ).toBeInTheDocument();
    });

    it('reverses a direction', async () => {
      const h = handlers();
      render(<TableSortMenu columns={columns} rules={sorted} {...h} />);
      await open();
      await userEvent.click(screen.getByRole('button', { name: /Status is ascending/ }));
      expect(h.onToggleDirection).toHaveBeenCalledWith('status');
    });

    it('removes one column', async () => {
      const h = handlers();
      render(<TableSortMenu columns={columns} rules={sorted} {...h} />);
      await open();
      await userEvent.click(screen.getByRole('button', { name: 'Stop sorting by Priority' }));
      expect(h.onRemove).toHaveBeenCalledWith('priority');
    });

    it('clears everything', async () => {
      const h = handlers();
      render(<TableSortMenu columns={columns} rules={sorted} {...h} />);
      await open();
      await userEvent.click(screen.getByRole('button', { name: 'Clear all' }));
      expect(h.onClear).toHaveBeenCalledTimes(1);
    });

    const gripFor = (name: string) =>
      screen.getByRole('button', { name: new RegExp(`^Reorder ${name}`) });

    it('moves a rule later with the keyboard', async () => {
      const h = handlers();
      render(<TableSortMenu columns={columns} rules={sorted} {...h} />);
      await open();
      gripFor('Status').focus();
      await userEvent.keyboard('{ArrowDown}');
      expect(h.onMove).toHaveBeenCalledWith(0, 1);
    });

    it('moves a rule earlier with the keyboard', async () => {
      const h = handlers();
      render(<TableSortMenu columns={columns} rules={sorted} {...h} />);
      await open();
      gripFor('Priority').focus();
      await userEvent.keyboard('{ArrowUp}');
      expect(h.onMove).toHaveBeenCalledWith(1, 0);
    });

    it('will not walk off either end', async () => {
      const h = handlers();
      render(<TableSortMenu columns={columns} rules={sorted} {...h} />);
      await open();
      gripFor('Status').focus();
      await userEvent.keyboard('{ArrowUp}');
      gripFor('Priority').focus();
      await userEvent.keyboard('{ArrowDown}');
      expect(h.onMove).not.toHaveBeenCalled();
    });

    it('ignores keys that are not a move', async () => {
      const h = handlers();
      render(<TableSortMenu columns={columns} rules={sorted} {...h} />);
      await open();
      gripFor('Status').focus();
      await userEvent.keyboard('{Enter}');
      expect(h.onMove).not.toHaveBeenCalled();
    });

    it('reorders by dragging, committing once on drop', async () => {
      const h = handlers();
      render(<TableSortMenu columns={columns} rules={sorted} {...h} />);
      await open();
      const grip = gripFor('Status');
      const held = new Set<number>();
      grip.setPointerCapture = (id: number) => held.add(id) as unknown as void;
      grip.hasPointerCapture = (id: number) => held.has(id);
      grip.releasePointerCapture = (id: number) => void held.delete(id);

      // jsdom measures everything as zero-high, so the rows are stubbed: two
      // 32px rows, midpoints at 16 and 48.
      const rows = screen.getAllByRole('listitem');
      rows.forEach((row, index) => {
        row.getBoundingClientRect = () =>
          ({ top: index * 32, height: 32, bottom: index * 32 + 32 }) as DOMRect;
      });

      fireEvent.pointerDown(grip, { pointerId: 1, clientY: 8 });
      fireEvent.pointerMove(grip, { pointerId: 1, clientY: 60 });
      // Nothing has changed yet - the order changes once, on drop.
      expect(h.onMove).not.toHaveBeenCalled();
      fireEvent.pointerUp(grip, { pointerId: 1 });
      expect(h.onMove).toHaveBeenCalledWith(0, 1);
    });

    it('commits nothing when a drag ends where it started', async () => {
      const h = handlers();
      render(<TableSortMenu columns={columns} rules={sorted} {...h} />);
      await open();
      const grip = gripFor('Status');
      grip.setPointerCapture = () => undefined;
      grip.hasPointerCapture = () => false;
      fireEvent.pointerDown(grip, { pointerId: 1, clientY: 8 });
      fireEvent.pointerUp(grip, { pointerId: 1 });
      expect(h.onMove).not.toHaveBeenCalled();
    });

    it('falls back to the key when a rule names a column it does not know', async () => {
      render(
        <TableSortMenu
          columns={columns}
          rules={[{ column: 'mystery', direction: 'ascend' }]}
          {...handlers()}
        />
      );
      await open();
      expect(screen.getByRole('button', { name: /mystery is ascending/ })).toBeInTheDocument();
    });
  });

  describe('the trigger', () => {
    it('marks itself when something is sorted', () => {
      const { rerender } = render(<TableSortMenu columns={columns} rules={[]} {...handlers()} />);
      expect(screen.getByRole('button', { name: 'Sort' })).not.toHaveClass('mdt-border-primary');
      rerender(
        <TableSortMenu
          columns={columns}
          rules={[{ column: 'status', direction: 'ascend' }]}
          {...handlers()}
        />
      );
      expect(screen.getByRole('button', { name: 'Sort' })).toHaveClass('mdt-border-primary');
    });

    it('accepts a name and extra classes of its own', () => {
      render(
        <TableSortMenu
          columns={columns}
          rules={[]}
          label="Sort tickets"
          className="custom"
          {...handlers()}
        />
      );
      const trigger = screen.getByRole('button', { name: 'Sort tickets' });
      expect(trigger).toHaveClass('custom');
    });
  });
});

describe('TableToolbar', () => {
  it('announces itself as one group rather than loose buttons', () => {
    render(
      <TableToolbar>
        <button type="button">Filters</button>
      </TableToolbar>
    );
    const toolbar = screen.getByRole('toolbar', { name: 'Table controls' });
    expect(toolbar).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('takes a name of its own, since a page can hold more than one table', () => {
    render(<TableToolbar label="Ticket controls">x</TableToolbar>);
    expect(screen.getByRole('toolbar', { name: 'Ticket controls' })).toBeInTheDocument();
  });

  it('pushes its actions to the trailing edge', () => {
    render(
      <TableToolbar>
        <span>lead</span>
        <TableToolbarActions data-testid="actions">
          <span>trail</span>
        </TableToolbarActions>
      </TableToolbar>
    );
    // `ml-auto` rather than `justify-between`: it behaves the same however many
    // controls each side has.
    expect(screen.getByTestId('actions')).toHaveClass('mdt-ml-auto');
  });

  it('accepts extra classes', () => {
    render(
      <TableToolbar className="custom" data-testid="bar">
        x
      </TableToolbar>
    );
    expect(screen.getByTestId('bar')).toHaveClass('custom');
  });
});
