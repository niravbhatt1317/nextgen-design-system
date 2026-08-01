import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TableViewSwitcher } from './TableViewSwitcher';

const views = [
  { id: 'a', name: 'Open tickets' },
  { id: 'b', name: 'Mine' },
];

const noop = () => undefined;

/** Opens the panel, which everything below needs and nothing below is testing. */
const open = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: /Open tickets|Views|Mine/ }));
};

describe('TableViewSwitcher', () => {
  describe('the trigger', () => {
    it('shows the label with no view active', () => {
      render(<TableViewSwitcher views={views} onApply={noop} onSaveAs={noop} />);
      expect(screen.getByRole('button', { name: /Views/ })).toBeInTheDocument();
    });

    it('shows the active view instead', () => {
      render(<TableViewSwitcher views={views} activeId="b" onApply={noop} onSaveAs={noop} />);
      expect(screen.getByRole('button', { name: /Mine/ })).toBeInTheDocument();
    });

    it('marks unsaved changes', () => {
      render(<TableViewSwitcher views={views} activeId="b" dirty onApply={noop} onSaveAs={noop} />);
      expect(screen.getByLabelText('Unsaved changes')).toBeInTheDocument();
    });

    it('does not mark a table that still matches', () => {
      render(<TableViewSwitcher views={views} activeId="b" onApply={noop} onSaveAs={noop} />);
      expect(screen.queryByLabelText('Unsaved changes')).not.toBeInTheDocument();
    });
  });

  describe('the list', () => {
    it('applies the view that was picked', async () => {
      const user = userEvent.setup();
      const onApply = vi.fn();
      render(<TableViewSwitcher views={views} onApply={onApply} onSaveAs={noop} />);
      await open(user);
      await user.click(screen.getByText('Mine'));
      expect(onApply).toHaveBeenCalledWith('b');
    });

    it('says so when there is nothing saved', async () => {
      const user = userEvent.setup();
      render(<TableViewSwitcher views={[]} onApply={noop} onSaveAs={noop} />);
      await open(user);
      expect(screen.getByText('No saved views yet.')).toBeInTheDocument();
    });

    it('offers rename and delete per row only when it can do them', async () => {
      const user = userEvent.setup();
      render(<TableViewSwitcher views={views} onApply={noop} onSaveAs={noop} />);
      await open(user);
      expect(screen.queryByRole('button', { name: 'Rename Mine' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Delete Mine' })).not.toBeInTheDocument();
    });

    it('deletes without applying the row it was on', async () => {
      const user = userEvent.setup();
      const onRemove = vi.fn();
      const onApply = vi.fn();
      render(
        <TableViewSwitcher views={views} onApply={onApply} onSaveAs={noop} onRemove={onRemove} />
      );
      await open(user);
      await user.click(screen.getByRole('button', { name: 'Delete Mine' }));
      expect(onRemove).toHaveBeenCalledWith('b');
      // Clicking delete must not also switch you into the view you deleted.
      expect(onApply).not.toHaveBeenCalled();
    });
  });

  describe('naming', () => {
    it('saves the table as a new view', async () => {
      const user = userEvent.setup();
      const onSaveAs = vi.fn();
      render(<TableViewSwitcher views={views} onApply={noop} onSaveAs={onSaveAs} />);
      await open(user);
      await user.click(screen.getByRole('button', { name: 'Save as new view' }));
      await user.type(screen.getByLabelText('Save this view'), 'Unassigned');
      await user.click(screen.getByRole('button', { name: 'Save' }));
      expect(onSaveAs).toHaveBeenCalledWith('Unassigned');
    });

    it('saves on Enter', async () => {
      const user = userEvent.setup();
      const onSaveAs = vi.fn();
      render(<TableViewSwitcher views={views} onApply={noop} onSaveAs={onSaveAs} />);
      await open(user);
      await user.click(screen.getByRole('button', { name: 'Save as new view' }));
      await user.type(screen.getByLabelText('Save this view'), 'Typed{Enter}');
      expect(onSaveAs).toHaveBeenCalledWith('Typed');
    });

    it('will not save an empty name', async () => {
      const user = userEvent.setup();
      const onSaveAs = vi.fn();
      render(<TableViewSwitcher views={views} onApply={noop} onSaveAs={onSaveAs} />);
      await open(user);
      await user.click(screen.getByRole('button', { name: 'Save as new view' }));
      expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
      await user.type(screen.getByLabelText('Save this view'), '   {Enter}');
      expect(onSaveAs).not.toHaveBeenCalled();
    });

    it('renames from the row, starting with the name it has', async () => {
      const user = userEvent.setup();
      const onRename = vi.fn();
      render(
        <TableViewSwitcher views={views} onApply={noop} onSaveAs={noop} onRename={onRename} />
      );
      await open(user);
      await user.click(screen.getByRole('button', { name: 'Rename Mine' }));
      const field = screen.getByLabelText('Rename view');
      expect(field).toHaveValue('Mine');
      await user.clear(field);
      await user.type(field, 'Assigned to me{Enter}');
      expect(onRename).toHaveBeenCalledWith('b', 'Assigned to me');
    });

    it('backs out to the list on Cancel', async () => {
      const user = userEvent.setup();
      const onSaveAs = vi.fn();
      render(<TableViewSwitcher views={views} onApply={noop} onSaveAs={onSaveAs} />);
      await open(user);
      await user.click(screen.getByRole('button', { name: 'Save as new view' }));
      await user.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(onSaveAs).not.toHaveBeenCalled();
      expect(screen.getByText('Open tickets')).toBeInTheDocument();
    });

    it('backs out on Escape without closing the panel', async () => {
      const user = userEvent.setup();
      render(<TableViewSwitcher views={views} onApply={noop} onSaveAs={noop} />);
      await open(user);
      await user.click(screen.getByRole('button', { name: 'Save as new view' }));
      await user.type(screen.getByLabelText('Save this view'), '{Escape}');
      // The list is back, rather than the whole popover having closed and lost
      // where they were.
      expect(screen.getByText('Open tickets')).toBeInTheDocument();
    });
  });

  describe('unsaved changes', () => {
    it('offers save and discard only while there are some', async () => {
      const user = userEvent.setup();
      render(
        <TableViewSwitcher
          views={views}
          activeId="b"
          onApply={noop}
          onSaveAs={noop}
          onSave={noop}
          onReset={noop}
        />
      );
      await open(user);
      expect(screen.queryByRole('button', { name: 'Save changes' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Discard changes' })).not.toBeInTheDocument();
    });

    it('names the view the changes belong to', async () => {
      const user = userEvent.setup();
      const onSave = vi.fn();
      const onReset = vi.fn();
      render(
        <TableViewSwitcher
          views={views}
          activeId="b"
          dirty
          onApply={noop}
          onSaveAs={noop}
          onSave={onSave}
          onReset={onReset}
        />
      );
      await open(user);
      expect(screen.getByText('Unsaved changes to Mine')).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Save changes' }));
      expect(onSave).toHaveBeenCalled();
    });

    it('discards them', async () => {
      const user = userEvent.setup();
      const onReset = vi.fn();
      render(
        <TableViewSwitcher
          views={views}
          activeId="b"
          dirty
          onApply={noop}
          onSaveAs={noop}
          onReset={onReset}
        />
      );
      await open(user);
      await user.click(screen.getByRole('button', { name: 'Discard changes' }));
      expect(onReset).toHaveBeenCalled();
    });

    it('says nothing about changes with no view to have changed', async () => {
      const user = userEvent.setup();
      render(
        <TableViewSwitcher views={views} dirty onApply={noop} onSaveAs={noop} onSave={noop} />
      );
      await open(user);
      expect(screen.queryByText(/Unsaved changes to/)).not.toBeInTheDocument();
    });
  });
});
