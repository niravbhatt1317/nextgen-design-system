import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TableViewMenu } from './TableViewMenu';

const columns = [
  { key: 'id', label: 'ID', visible: true, locked: true },
  { key: 'subject', label: 'Subject', visible: true },
  { key: 'status', label: 'Status', visible: true },
  { key: 'tags', label: 'Tags', visible: false },
];

const handlers = () => ({ onGroupBy: vi.fn(), onToggleColumn: vi.fn() });

const open = async () => {
  await userEvent.click(screen.getByRole('button', { name: 'View settings' }));
};

describe('TableViewMenu', () => {
  describe('the root panel', () => {
    it('shows what each panel currently says', async () => {
      render(<TableViewMenu columns={columns} {...handlers()} />);
      await open();
      // Checking what a table is doing should cost one click, not three.
      expect(screen.getByRole('button', { name: /Group by\s*None/ })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Columns\s*3 shown/ })).toBeInTheDocument();
    });

    it('names the column the table is grouped by', async () => {
      render(<TableViewMenu columns={columns} groupBy="status" {...handlers()} />);
      await open();
      expect(screen.getByRole('button', { name: /Group by\s*Status/ })).toBeInTheDocument();
    });

    it('marks the trigger once the view is not the default', () => {
      const { rerender } = render(
        <TableViewMenu
          columns={columns.map((column) => ({ ...column, visible: true }))}
          {...handlers()}
        />
      );
      expect(screen.getByRole('button', { name: 'View settings' })).not.toHaveClass(
        'mdt-border-primary'
      );
      // A hidden column is a change worth showing without opening the menu.
      rerender(<TableViewMenu columns={columns} {...handlers()} />);
      expect(screen.getByRole('button', { name: 'View settings' })).toHaveClass(
        'mdt-border-primary'
      );
    });
  });

  describe('drilling in and back', () => {
    it('opens the group panel and returns', async () => {
      render(<TableViewMenu columns={columns} {...handlers()} />);
      await open();
      await userEvent.click(screen.getByRole('button', { name: /^Group by/ }));
      expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
      await userEvent.click(screen.getByRole('button', { name: 'Back to view settings' }));
      expect(screen.getByRole('button', { name: /Columns\s*3 shown/ })).toBeInTheDocument();
    });

    it('opens the columns panel', async () => {
      render(<TableViewMenu columns={columns} {...handlers()} />);
      await open();
      await userEvent.click(screen.getByRole('button', { name: /^Columns/ }));
      expect(screen.getByText('Shown in table')).toBeInTheDocument();
      expect(screen.getByText('Hidden in table')).toBeInTheDocument();
    });

    it('shows no Hidden group when every column is shown', async () => {
      render(
        <TableViewMenu
          columns={columns.map((column) => ({ ...column, visible: true }))}
          {...handlers()}
        />
      );
      await open();
      await userEvent.click(screen.getByRole('button', { name: /^Columns/ }));
      expect(screen.queryByText('Hidden in table')).not.toBeInTheDocument();
    });

    it('starts at the root again the next time it opens', async () => {
      render(<TableViewMenu columns={columns} {...handlers()} />);
      await open();
      await userEvent.click(screen.getByRole('button', { name: /^Columns/ }));
      await userEvent.keyboard('{Escape}');
      await open();
      // Reopening two levels deep would be a small mystery every time.
      expect(screen.getByRole('button', { name: /Group by\s*None/ })).toBeInTheDocument();
    });
  });

  describe('grouping', () => {
    it('groups by a column', async () => {
      const h = handlers();
      render(<TableViewMenu columns={columns} {...h} />);
      await open();
      await userEvent.click(screen.getByRole('button', { name: /^Group by/ }));
      await userEvent.click(screen.getByRole('option', { name: 'Status' }));
      expect(h.onGroupBy).toHaveBeenCalledWith('status');
    });

    it('clears grouping through None', async () => {
      const h = handlers();
      render(<TableViewMenu columns={columns} groupBy="status" {...h} />);
      await open();
      await userEvent.click(screen.getByRole('button', { name: /^Group by/ }));
      await userEvent.click(screen.getByRole('option', { name: 'None' }));
      expect(h.onGroupBy).toHaveBeenCalledWith(null);
    });

    it('does not offer a hidden column to group by', async () => {
      render(<TableViewMenu columns={columns} {...handlers()} />);
      await open();
      await userEvent.click(screen.getByRole('button', { name: /^Group by/ }));
      // Tags is hidden, so grouping by it would group the table by something
      // nobody can see.
      expect(screen.queryByRole('option', { name: 'Tags' })).not.toBeInTheDocument();
    });
  });

  describe('columns', () => {
    it('toggles one column', async () => {
      const h = handlers();
      render(<TableViewMenu columns={columns} {...h} />);
      await open();
      await userEvent.click(screen.getByRole('button', { name: /^Columns/ }));
      await userEvent.click(screen.getByRole('option', { name: /Subject/ }));
      expect(h.onToggleColumn).toHaveBeenCalledWith('subject');
    });

    it('brings a hidden column back', async () => {
      const h = handlers();
      render(<TableViewMenu columns={columns} {...h} />);
      await open();
      await userEvent.click(screen.getByRole('button', { name: /^Columns/ }));
      await userEvent.click(screen.getByRole('option', { name: /Tags/ }));
      expect(h.onToggleColumn).toHaveBeenCalledWith('tags');
    });

    it('offers Show all and Hide all only when given handlers', async () => {
      const h = handlers();
      const { rerender } = render(<TableViewMenu columns={columns} {...h} />);
      await open();
      await userEvent.click(screen.getByRole('button', { name: /^Columns/ }));
      expect(screen.queryByRole('button', { name: 'Show all' })).not.toBeInTheDocument();

      const onShowAll = vi.fn();
      rerender(<TableViewMenu columns={columns} onShowAll={onShowAll} {...h} />);
      await userEvent.click(screen.getByRole('button', { name: 'Show all' }));
      expect(onShowAll).toHaveBeenCalledTimes(1);
    });

    it('calls Hide all', async () => {
      const onHideAll = vi.fn();
      render(<TableViewMenu columns={columns} onHideAll={onHideAll} {...handlers()} />);
      await open();
      await userEvent.click(screen.getByRole('button', { name: /^Columns/ }));
      await userEvent.click(screen.getByRole('button', { name: 'Hide all' }));
      expect(onHideAll).toHaveBeenCalledTimes(1);
    });

    it('leaves a locked column alone', async () => {
      render(<TableViewMenu columns={columns} {...handlers()} />);
      await open();
      await userEvent.click(screen.getByRole('button', { name: /^Columns/ }));
      expect(screen.getByRole('option', { name: /ID/ })).toHaveAttribute('aria-disabled', 'true');
    });

    it('filters as you type, and says so when nothing matches', async () => {
      render(<TableViewMenu columns={columns} {...handlers()} />);
      await open();
      await userEvent.click(screen.getByRole('button', { name: /^Columns/ }));
      await userEvent.type(screen.getByPlaceholderText('Search'), 'zzz');
      expect(screen.getByText('No columns match.')).toBeInTheDocument();
    });
  });

  describe('the trigger', () => {
    it('takes a name and classes of its own', () => {
      render(
        <TableViewMenu
          columns={columns}
          label="Ticket view settings"
          className="custom"
          {...handlers()}
        />
      );
      expect(screen.getByRole('button', { name: 'Ticket view settings' })).toHaveClass('custom');
    });
  });
});
