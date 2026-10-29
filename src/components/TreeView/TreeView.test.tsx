import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { TreeView } from './TreeView';
import type { TreeViewNode } from './TreeView.types';

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
              {
                label: 'mysql-billing',
                kind: 'item',
                value: 'secret/data/db/mysql-billing',
                icon: 'key',
              },
            ],
          },
          { label: 'network/', kind: 'folder', children: [{ label: 'readme', kind: 'item' }] },
        ],
      },
    ],
  },
];

/* a row by the label it starts with - an item's name can run on into its value */
const row = (label: string) =>
  screen.getByRole('treeitem', { name: (accessible) => accessible.startsWith(label) });

describe('TreeView', () => {
  describe('rendering', () => {
    it('is a labelled tree that takes a ref and a class', () => {
      const ref = createRef<HTMLDivElement>();
      render(<TreeView ref={ref} aria-label="Paths" className="extra" nodes={TREE} />);
      const tree = screen.getByRole('tree', { name: 'Paths' });
      expect(ref.current).toBe(tree);
      expect(tree).toHaveClass('mdt-tree', 'extra');
    });

    it('opens each folder that stands alone, and stops where the tree branches', () => {
      render(<TreeView nodes={TREE} />);
      expect(row('secret/')).toHaveAttribute('aria-expanded', 'true');
      expect(row('data/')).toHaveAttribute('aria-expanded', 'true');
      expect(row('db/')).toHaveAttribute('aria-expanded', 'false');
      expect(row('data/')).toHaveAttribute('aria-level', '2');
    });

    it('opens on the picked item: its folders open, its row selected', () => {
      render(<TreeView nodes={TREE} value="secret/data/db/mysql-billing" />);
      expect(row('db/')).toHaveAttribute('aria-expanded', 'true');
      expect(row('mysql-billing')).toHaveAttribute('aria-selected', 'true');
      expect(row('postgres-prod-ro')).toHaveAttribute('aria-selected', 'false');
    });

    it('opens a fetched tree on its pick when the nodes arrive after mount', () => {
      const { rerender } = render(<TreeView nodes={[]} value="secret/data/db/mysql-billing" />);
      rerender(<TreeView nodes={TREE} value="secret/data/db/mysql-billing" />);
      expect(row('db/')).toHaveAttribute('aria-expanded', 'true');
      expect(row('mysql-billing')).toHaveAttribute('aria-selected', 'true');
    });

    it('opens a fetched tree’s lone folders when nothing is picked', () => {
      const { rerender } = render(<TreeView nodes={[]} />);
      rerender(<TreeView nodes={TREE} />);
      expect(row('data/')).toHaveAttribute('aria-expanded', 'true');
      expect(row('db/')).toHaveAttribute('aria-expanded', 'false');
    });

    it('opens the way to a new pick and keeps open what was opened by hand', async () => {
      const { rerender } = render(<TreeView nodes={TREE} />);
      await userEvent.click(row('network/'));
      rerender(<TreeView nodes={TREE} value="secret/data/db/postgres-prod-ro" />);
      expect(row('db/')).toHaveAttribute('aria-expanded', 'true');
      expect(row('network/')).toHaveAttribute('aria-expanded', 'true');
    });

    it('leaves a controlled tree to its caller when the nodes change', () => {
      const { rerender } = render(<TreeView nodes={[]} value="secret/data/db/mysql-billing" expanded={[]} />);
      rerender(<TreeView nodes={TREE} value="secret/data/db/mysql-billing" expanded={[]} />);
      expect(row('secret/')).toHaveAttribute('aria-expanded', 'false');
    });

    it('opens the folders given', () => {
      render(<TreeView nodes={TREE} defaultExpanded={['secret/']} />);
      expect(row('secret/')).toHaveAttribute('aria-expanded', 'true');
      expect(row('data/')).toHaveAttribute('aria-expanded', 'false');
    });

    it('takes an item’s value from its label when it has none, and draws values only when asked', async () => {
      const { rerender } = render(
        <TreeView
          nodes={TREE}
          defaultExpanded={['secret/', 'secret//data/', 'secret//data//network/']}
        />
      );
      expect(row('readme')).toHaveTextContent(/^readme$/);
      rerender(
        <TreeView
          nodes={TREE}
          showValues
          defaultExpanded={['secret/', 'secret//data/', 'secret//data//network/']}
        />
      );
      expect(row('readme')).toHaveTextContent('readmereadme');
    });

    it('marks an item that has just arrived, until it is picked', () => {
      const nodes: TreeViewNode[] = [{ label: 'new', kind: 'item', fresh: true }];
      const { rerender } = render(<TreeView nodes={nodes} />);
      expect(row('new')).toHaveClass('mdt-tree__row--fresh');
      rerender(<TreeView nodes={nodes} value="new" />);
      expect(row('new')).not.toHaveClass('mdt-tree__row--fresh');
    });

    it('draws a folder with no entries', async () => {
      render(
        <TreeView
          nodes={[
            { label: 'empty/', kind: 'folder' },
            { label: 'other/', kind: 'folder' },
          ]}
        />
      );
      await userEvent.click(row('empty/'));
      expect(row('empty/')).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('interactions', () => {
    it('opens and shuts a folder on a click, and says so', async () => {
      const onExpandedChange = vi.fn();
      render(<TreeView nodes={TREE} onExpandedChange={onExpandedChange} />);
      await userEvent.click(row('db/'));
      expect(row('db/')).toHaveAttribute('aria-expanded', 'true');
      expect(onExpandedChange).toHaveBeenLastCalledWith([
        'secret/',
        'secret//data/',
        'secret//data//db/',
      ]);
      await userEvent.click(row('db/'));
      expect(row('db/')).toHaveAttribute('aria-expanded', 'false');
    });

    it('follows the open folders it is given', async () => {
      const onExpandedChange = vi.fn();
      render(<TreeView nodes={TREE} expanded={['secret/']} onExpandedChange={onExpandedChange} />);
      await userEvent.click(row('data/'));
      expect(onExpandedChange).toHaveBeenCalledWith(['secret/', 'secret//data/']);
      expect(row('data/')).toHaveAttribute('aria-expanded', 'false');
    });

    it('hands an item’s value back on a click', async () => {
      const onSelect = vi.fn();
      render(
        <TreeView
          nodes={TREE}
          defaultExpanded={['secret/', 'secret//data/', 'secret//data//db/']}
          onSelect={onSelect}
        />
      );
      await userEvent.click(row('postgres-prod-ro'));
      expect(onSelect).toHaveBeenCalledWith('secret/data/db/postgres-prod-ro');
    });

    it('works from the keyboard - Enter opens a folder, Space picks an item, other keys do nothing', async () => {
      const onSelect = vi.fn();
      render(<TreeView nodes={TREE} onSelect={onSelect} />);
      row('db/').focus();
      await userEvent.keyboard('{Enter}');
      expect(row('db/')).toHaveAttribute('aria-expanded', 'true');
      row('postgres-prod-ro').focus();
      await userEvent.keyboard('a');
      expect(onSelect).not.toHaveBeenCalled();
      await userEvent.keyboard(' ');
      expect(onSelect).toHaveBeenCalledWith('secret/data/db/postgres-prod-ro');
    });

    it('takes a pick with no handler quietly', async () => {
      render(<TreeView nodes={[{ label: 'only', kind: 'item' }]} />);
      await userEvent.click(row('only'));
      expect(row('only')).toHaveAttribute('aria-selected', 'false');
    });
  });
});
