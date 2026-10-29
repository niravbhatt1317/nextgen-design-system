import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { PathBrowserDialog } from './PathBrowserDialog';
import type { TreeViewNode } from '../TreeView';
import type { PathBrowserDialogProps } from './PathBrowserDialog.types';

const TREE: TreeViewNode[] = [
  {
    label: 'secret/',
    kind: 'folder',
    children: [
      {
        label: 'data/',
        kind: 'folder',
        children: [
          {
            label: 'db/',
            kind: 'folder',
            children: [
              { label: 'postgres-prod-ro', kind: 'item', value: 'secret/data/db/postgres-prod-ro' },
              { label: 'mysql-billing', kind: 'item', value: 'secret/data/db/mysql-billing' },
            ],
          },
          {
            label: 'network/',
            kind: 'folder',
            children: [{ label: 'cisco-ro', kind: 'item', value: 'secret/data/network/cisco-ro' }],
          },
        ],
      },
    ],
  },
];

const SOURCE = {
  url: 'https://vault.acme.io/v1/secret/metadata',
  syncedLabel: 'Synced moments ago · auto every 10 min',
};

const setup = (props: Partial<PathBrowserDialogProps> = {}) => {
  const onPick = vi.fn();
  const onOpenChange = vi.fn();
  render(
    <PathBrowserDialog
      open
      onOpenChange={onOpenChange}
      subtitle="platform-vault-prod · HashiCorp Vault"
      tree={TREE}
      onPick={onPick}
      {...props}
    />
  );
  return { onPick, onOpenChange };
};

/* a row by the label it starts with - a key's name runs on into its path, which repeats the folders' labels */
const row = (label: string) =>
  screen.getByRole('treeitem', { name: (accessible) => accessible.startsWith(label) });
const useButton = () => screen.getByRole('button', { name: /Use this path/ });

describe('PathBrowserDialog', () => {
  describe('rendering', () => {
    it('shows the title and the store line', () => {
      setup();
      expect(screen.getByRole('dialog', { name: 'Browse vault paths' })).toBeInTheDocument();
      expect(screen.getByText('platform-vault-prod · HashiCorp Vault')).toBeInTheDocument();
    });

    it('takes its own title and pick label', () => {
      setup({ title: 'Browse store paths', pickLabel: 'Use path' });
      expect(screen.getByRole('dialog', { name: 'Browse store paths' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Use path/ })).toBeInTheDocument();
    });

    it('renders nothing while closed', () => {
      setup({ open: false });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('opens each folder that stands alone, and stops where the tree branches', () => {
      setup();
      expect(row('secret/')).toHaveAttribute('aria-expanded', 'true');
      expect(row('data/')).toHaveAttribute('aria-expanded', 'true');
      expect(row('db/')).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByText('postgres-prod-ro')).not.toBeInTheDocument();
    });

    it('opens nothing when the top level branches', () => {
      setup({ tree: [...TREE, { label: 'kv/', kind: 'folder', children: [] }] });
      expect(row('secret/')).toHaveAttribute('aria-expanded', 'false');
    });

    it('opens the folders given', () => {
      setup({ defaultExpanded: ['secret/'] });
      expect(row('secret/')).toHaveAttribute('aria-expanded', 'true');
      expect(row('data/')).toHaveAttribute('aria-expanded', 'false');
    });

    it('opens on the field’s path: its folders open, its key picked', () => {
      setup({ value: 'secret/data/network/cisco-ro' });
      expect(row('network/')).toHaveAttribute('aria-expanded', 'true');
      expect(row('cisco-ro')).toHaveAttribute('aria-selected', 'true');
      expect(useButton()).toBeEnabled();
    });

    it('falls back to the lone folders for a path that is not in the tree', () => {
      setup({ value: 'secret/data/elsewhere' });
      expect(row('data/')).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('secret/data/elsewhere')).toBeInTheDocument();
    });

    it('shows the hint until a key is picked, and keeps Use this path off', () => {
      setup();
      expect(screen.getByText('— pick a key, or type one in the field —')).toBeInTheDocument();
      expect(useButton()).toBeDisabled();
    });

    it('takes its own hint', () => {
      setup({ emptyHint: 'Pick a key' });
      expect(screen.getByText('Pick a key')).toBeInTheDocument();
    });

    it('draws a key with no path by its label, and a fresh key in its own ink', () => {
      setup({
        tree: [
          { label: 'loose', kind: 'item' },
          { label: 'new', kind: 'item', value: 'kv/new', fresh: true },
        ],
      });
      expect(row('loose')).toHaveTextContent('looseloose');
      expect(row('new')).toHaveClass('mdt-tree__row--fresh');
    });

    it('draws a folder with no entries', async () => {
      setup({
        tree: [
          { label: 'empty/', kind: 'folder' },
          { label: 'other/', kind: 'folder' },
        ],
      });
      await userEvent.click(row('empty/'));
      expect(row('empty/')).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('the endpoint card', () => {
    it('is not drawn without a source', () => {
      setup();
      expect(screen.queryByText(SOURCE.url)).not.toBeInTheDocument();
    });

    it('shows the endpoint and its sync line', () => {
      setup({ source: SOURCE });
      expect(screen.getByText(SOURCE.url)).toBeInTheDocument();
      expect(screen.getByText(SOURCE.syncedLabel)).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /Sync now/ })).not.toBeInTheDocument();
    });

    it('calls onSync from Sync now', async () => {
      const onSync = vi.fn();
      setup({ source: SOURCE, onSync });
      await userEvent.click(screen.getByRole('button', { name: /Sync now/ }));
      expect(onSync).toHaveBeenCalledTimes(1);
    });

    it('reads Syncing… and turns off while syncing', () => {
      setup({ source: SOURCE, onSync: vi.fn(), syncing: true });
      expect(screen.getByRole('button', { name: /Syncing…/ })).toBeDisabled();
    });
  });

  describe('a store that cannot list', () => {
    it('leads with the warning, turns Sync now off and draws no tree', () => {
      setup({
        source: SOURCE,
        onSync: vi.fn(),
        unavailable: 'This store has no Path-list API configured.',
      });
      expect(screen.getByText('This store has no Path-list API configured.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Sync now/ })).toBeDisabled();
      expect(screen.queryByRole('tree')).not.toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('opens and shuts a folder on a click', async () => {
      setup();
      await userEvent.click(row('db/'));
      expect(row('db/')).toHaveAttribute('aria-expanded', 'true');
      expect(row('postgres-prod-ro')).toBeInTheDocument();
      await userEvent.click(row('db/'));
      expect(row('db/')).toHaveAttribute('aria-expanded', 'false');
    });

    it('picks a key, names it on the selected line and hands it back on Use this path', async () => {
      const { onPick } = setup();
      await userEvent.click(row('db/'));
      await userEvent.click(row('mysql-billing'));
      expect(row('mysql-billing')).toHaveAttribute('aria-selected', 'true');
      expect(screen.getAllByText('secret/data/db/mysql-billing').length).toBeGreaterThan(1);
      await userEvent.click(useButton());
      expect(onPick).toHaveBeenCalledWith('secret/data/db/mysql-billing');
    });

    it('works from the keyboard - Enter opens a folder, Space picks a key, other keys do nothing', async () => {
      setup();
      row('db/').focus();
      await userEvent.keyboard('{Enter}');
      expect(row('db/')).toHaveAttribute('aria-expanded', 'true');
      row('postgres-prod-ro').focus();
      await userEvent.keyboard('a');
      expect(row('postgres-prod-ro')).toHaveAttribute('aria-selected', 'false');
      await userEvent.keyboard(' ');
      expect(row('postgres-prod-ro')).toHaveAttribute('aria-selected', 'true');
    });

    it('asks to close from Cancel', async () => {
      const { onOpenChange } = setup();
      await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('starts again from the field each time it opens', async () => {
      const onPick = vi.fn();
      const props = {
        onOpenChange: vi.fn(),
        tree: TREE,
        onPick,
        value: 'secret/data/db/mysql-billing',
      };
      const { rerender } = render(<PathBrowserDialog open {...props} />);
      await userEvent.click(row('postgres-prod-ro'));
      expect(row('postgres-prod-ro')).toHaveAttribute('aria-selected', 'true');
      rerender(<PathBrowserDialog open={false} {...props} />);
      rerender(<PathBrowserDialog open {...props} />);
      expect(row('mysql-billing')).toHaveAttribute('aria-selected', 'true');
    });

    it('has no description when given no store line', () => {
      render(
        <PathBrowserDialog
          open
          onOpenChange={vi.fn()}
          tree={TREE}
          onPick={vi.fn()}
          title={<b>Paths</b>}
        />
      );
      expect(screen.getByRole('tree', { name: 'Paths' })).toBeInTheDocument();
    });
  });
});
