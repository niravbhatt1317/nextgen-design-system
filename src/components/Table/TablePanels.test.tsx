import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TableColumnsPanel, TableInsertPanel } from './TablePanels';
import type { TableColumnsPanelColumn } from './TablePanels';

const COLUMNS: TableColumnsPanelColumn[] = [
  { key: 'email', label: 'Email', hidden: false },
  { key: 'role', label: 'Role', hidden: false },
  { key: 'phone', label: 'Phone', hidden: true },
  { key: 'created', label: 'Created', hidden: true },
];

function columnsPanel(overrides: Partial<Parameters<typeof TableColumnsPanel>[0]> = {}) {
  const handlers = {
    onToggle: vi.fn(),
    onHideAll: vi.fn(),
    onShowAll: vi.fn(),
    onReset: vi.fn(),
  };
  const view = render(
    <TableColumnsPanel
      trigger={<button type="button">Columns</button>}
      columns={COLUMNS}
      open
      {...handlers}
      {...overrides}
    />
  );
  return { ...view, ...handlers, user: userEvent.setup() };
}

describe('TableColumnsPanel', () => {
  it('groups the columns into shown and hidden', () => {
    columnsPanel();
    expect(screen.getByText('Shown in table')).toBeInTheDocument();
    expect(screen.getByText('Hidden in table')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /email/i })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: /phone/i })).toHaveAttribute('aria-pressed', 'false');
  });

  it('hides the Hidden group when nothing is hidden', () => {
    columnsPanel({ columns: COLUMNS.filter((c) => !c.hidden) });
    expect(screen.queryByText('Hidden in table')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Show all' })).not.toBeInTheDocument();
  });

  it('toggles a shown column', async () => {
    const { user, onToggle } = columnsPanel();
    await user.click(screen.getByRole('button', { name: /email/i }));
    expect(onToggle).toHaveBeenCalledWith('email');
  });

  it('toggles a hidden column', async () => {
    const { user, onToggle } = columnsPanel();
    await user.click(screen.getByRole('button', { name: /phone/i }));
    expect(onToggle).toHaveBeenCalledWith('phone');
  });

  it('hides all, shows all and resets', async () => {
    const { user, onHideAll, onShowAll, onReset } = columnsPanel();
    await user.click(screen.getByRole('button', { name: 'Hide all' }));
    await user.click(screen.getByRole('button', { name: 'Show all' }));
    await user.click(screen.getByRole('button', { name: 'Reset' }));

    expect(onHideAll).toHaveBeenCalled();
    expect(onShowAll).toHaveBeenCalled();
    expect(onReset).toHaveBeenCalled();
  });

  describe('locked columns', () => {
    it('lists them ticked, dimmed and unclickable', () => {
      columnsPanel({ locked: ['Name'] });
      const tick = screen.getByLabelText('Name is always shown');
      expect(tick).toBeDisabled();
      expect(screen.queryByRole('button', { name: /^Name/ })).not.toBeInTheDocument();
    });

    it('lists none when none are locked', () => {
      columnsPanel();
      expect(screen.queryByText(/is always shown/)).not.toBeInTheDocument();
    });
  });

  describe('searching', () => {
    it('narrows both groups', async () => {
      const { user } = columnsPanel();
      await user.type(screen.getByLabelText('Search columns'), 'ro');

      expect(screen.getByRole('button', { name: /role/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /email/i })).not.toBeInTheDocument();
      expect(screen.queryByText('Hidden in table')).not.toBeInTheDocument();
    });

    it('ignores case and surrounding spaces', async () => {
      const { user } = columnsPanel();
      await user.type(screen.getByLabelText('Search columns'), '  PHONE  ');

      expect(screen.getByRole('button', { name: /phone/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /email/i })).not.toBeInTheDocument();
    });

    it('narrows the locked list too', async () => {
      const { user } = columnsPanel({ locked: ['Name'] });
      await user.type(screen.getByLabelText('Search columns'), 'email');

      expect(screen.queryByText(/is always shown/)).not.toBeInTheDocument();
    });
  });

  describe('opening', () => {
    it('opens from its trigger when uncontrolled', async () => {
      const user = userEvent.setup();
      render(
        <TableColumnsPanel
          trigger={<button type="button">Columns</button>}
          columns={COLUMNS}
          onToggle={vi.fn()}
          onHideAll={vi.fn()}
          onShowAll={vi.fn()}
          onReset={vi.fn()}
        />
      );
      expect(screen.queryByText('Shown in table')).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Columns' }));
      expect(screen.getByText('Shown in table')).toBeInTheDocument();
    });

    it('reports opening when asked to', async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      render(
        <TableColumnsPanel
          trigger={<button type="button">Columns</button>}
          columns={COLUMNS}
          open={false}
          onOpenChange={onOpenChange}
          onToggle={vi.fn()}
          onHideAll={vi.fn()}
          onShowAll={vi.fn()}
          onReset={vi.fn()}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Columns' }));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });
});

function insertPanel(overrides: Partial<Parameters<typeof TableInsertPanel>[0]> = {}) {
  const onPick = vi.fn();
  const onOpenChange = vi.fn();
  const anchor = document.createElement('button');
  document.body.appendChild(anchor);

  const view = render(
    <TableInsertPanel
      open
      onOpenChange={onOpenChange}
      anchor={anchor}
      afterLabel="Email"
      hidden={[
        { key: 'phone', label: 'Phone' },
        { key: 'created', label: 'Created' },
      ]}
      onPick={onPick}
      {...overrides}
    />
  );
  return { ...view, onPick, onOpenChange, user: userEvent.setup() };
}

describe('TableInsertPanel', () => {
  it('says where the column will land', () => {
    insertPanel();
    expect(screen.getByLabelText('Insert a column after Email')).toBeInTheDocument();
    expect(screen.getByText(/goes after Email/)).toBeInTheDocument();
  });

  it('lists the hidden columns', () => {
    insertPanel();
    expect(screen.getByRole('button', { name: /phone/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /created/i })).toBeInTheDocument();
  });

  it('picks one', async () => {
    const { user, onPick } = insertPanel();
    await user.click(screen.getByRole('button', { name: /phone/i }));
    expect(onPick).toHaveBeenCalledWith('phone');
  });

  it('narrows the list', async () => {
    const { user } = insertPanel();
    await user.type(screen.getByLabelText('Search hidden columns'), 'pho');

    expect(screen.getByRole('button', { name: /phone/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /created/i })).not.toBeInTheDocument();
  });

  it('says so when the search matches nothing', async () => {
    const { user } = insertPanel();
    await user.type(screen.getByLabelText('Search hidden columns'), 'zzz');

    expect(screen.getByText('Nothing hidden matches.')).toBeInTheDocument();
  });

  it('says so when there is nothing hidden at all', () => {
    insertPanel({ hidden: [] });
    expect(screen.getByText('Nothing hidden matches.')).toBeInTheDocument();
  });

  it('renders nothing while closed', () => {
    insertPanel({ open: false });
    expect(screen.queryByText('Insert a column')).not.toBeInTheDocument();
  });
});
