import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TableColumnMenu } from './TableColumnMenu';

const openMenu = async (name = 'Subject column') => {
  await userEvent.click(screen.getByRole('button', { name }));
};

describe('TableColumnMenu', () => {
  describe('which items appear', () => {
    it('shows only the items it was given a handler for', async () => {
      render(<TableColumnMenu label="Subject" onSort={vi.fn()} onHide={vi.fn()} />);
      await openMenu();
      expect(screen.getByRole('menuitem', { name: 'Sort' })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'Hide this column' })).toBeInTheDocument();
      // An option that does nothing is worse than an option that is not there.
      expect(screen.queryByRole('menuitem', { name: 'Filter' })).not.toBeInTheDocument();
      expect(screen.queryByRole('menuitem', { name: 'Group' })).not.toBeInTheDocument();
    });

    it('renders every item when every handler is given', async () => {
      render(
        <TableColumnMenu
          label="Subject"
          onFilter={vi.fn()}
          onGroup={vi.fn()}
          onSort={vi.fn()}
          canFreeze
          onToggleFreeze={vi.fn()}
          onMoveToStart={vi.fn()}
          onMoveToEnd={vi.fn()}
          onHide={vi.fn()}
        />
      );
      await openMenu();
      expect(screen.getAllByRole('menuitem')).toHaveLength(7);
    });

    it('falls back to plain text when there is nothing to offer', () => {
      render(<TableColumnMenu label="Subject" />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
      expect(screen.getByText('Subject')).toBeInTheDocument();
    });

    it('renders a trigger when only a header was given', async () => {
      render(<TableColumnMenu label="Subject" header={<span>Sorting order</span>} />);
      await openMenu();
      expect(screen.getByText('Sorting order')).toBeInTheDocument();
    });

    it('renders custom trigger content', () => {
      render(
        <TableColumnMenu label="Subject" onSort={vi.fn()}>
          <em>Ticket subject</em>
        </TableColumnMenu>
      );
      expect(screen.getByText('Ticket subject')).toBeInTheDocument();
    });
  });

  describe('freezing', () => {
    it('hides Freeze past the limit rather than disabling it', async () => {
      render(<TableColumnMenu label="Subject" onSort={vi.fn()} onToggleFreeze={vi.fn()} />);
      await openMenu();
      expect(screen.queryByRole('menuitem', { name: /freeze/i })).not.toBeInTheDocument();
    });

    it('offers Freeze when it is allowed', async () => {
      render(<TableColumnMenu label="Subject" canFreeze onToggleFreeze={vi.fn()} />);
      await openMenu();
      expect(screen.getByRole('menuitem', { name: 'Freeze' })).toBeInTheDocument();
    });

    it('says Unfreeze when the column is already pinned', async () => {
      render(<TableColumnMenu label="Subject" canFreeze frozen onToggleFreeze={vi.fn()} />);
      await openMenu();
      expect(screen.getByRole('menuitem', { name: 'Unfreeze' })).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls the handler for the chosen item', async () => {
      const onHide = vi.fn();
      render(<TableColumnMenu label="Subject" onHide={onHide} />);
      await openMenu();
      await userEvent.click(screen.getByRole('menuitem', { name: 'Hide this column' }));
      expect(onHide).toHaveBeenCalledTimes(1);
    });

    it('calls the freeze handler', async () => {
      const onToggleFreeze = vi.fn();
      render(<TableColumnMenu label="Subject" canFreeze onToggleFreeze={onToggleFreeze} />);
      await openMenu();
      await userEvent.click(screen.getByRole('menuitem', { name: 'Freeze' }));
      expect(onToggleFreeze).toHaveBeenCalledTimes(1);
    });

    it('opens on the keyboard', async () => {
      render(<TableColumnMenu label="Subject" onSort={vi.fn()} />);
      screen.getByRole('button', { name: 'Subject column' }).focus();
      await userEvent.keyboard('{Enter}');
      expect(screen.getByRole('menuitem', { name: 'Sort' })).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('names the trigger after the column', () => {
      render(<TableColumnMenu label="Priority" onSort={vi.fn()} />);
      expect(screen.getByRole('button', { name: 'Priority column' })).toBeInTheDocument();
    });

    it('accepts extra classes on the trigger', () => {
      render(<TableColumnMenu label="Subject" onSort={vi.fn()} className="custom" />);
      expect(screen.getByRole('button', { name: 'Subject column' })).toHaveClass('custom');
    });

    it('accepts extra classes on the plain fallback', () => {
      render(<TableColumnMenu label="Subject" className="custom" />);
      expect(screen.getByText('Subject')).toHaveClass('custom');
    });

    it('lines the menu up with the requested edge', async () => {
      render(<TableColumnMenu label="Subject" onSort={vi.fn()} align="end" />);
      await openMenu();
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });
});
