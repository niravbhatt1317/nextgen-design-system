'use client';

import { forwardRef, useEffect, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '@/utils';
import { Icon, type IconName } from '../Icon';
import type { TreeViewNode, TreeViewProps } from './TreeView.types';
import './treeView.css';

/* PORTED FROM THE CONSOLE (Ronak, 2026-10-09 to 2026-10-13): next-gen-ui features/credential-profiles/CredentialForm.jsx
 * PathBrowserModal - the tree in the Browse popup, split out as its own part (Ronak, 2026-10-26: "we need to saparate
 * out hyriarchy folder option as componant"). Folders open and shut on a chevron, items are picked; 19 a level so a
 * child's first glyph sits under its parent's folder; a deep tree scrolls sideways (2026-10-13). treeView.css holds
 * the console's measures. */

/** A level's indent - the 12 chevron and its 7 gap - over the row's own 8. */
const INDENT_STEP = 19;
const INDENT_BASE = 8;

/** A folder's id: the labels from the top, joined - "secret/", "secret//data/". */
const idOf = (parent: string, label: string): string => (parent ? `${parent}/${label}` : label);

const valueOf = (node: TreeViewNode): string => node.value ?? node.label;

/** The folders on the way to the item whose value is `value`, or null when no item has it. */
const trailTo = (nodes: TreeViewNode[], value: string, parent = ''): string[] | null => {
  for (const node of nodes) {
    const id = idOf(parent, node.label);
    if (node.kind === 'item' && valueOf(node) === value) return [];
    if (node.kind === 'folder') {
      const below = trailTo(node.children ?? [], value, id);
      if (below) return [id, ...below];
    }
  }
  return null;
};

/** With nothing picked, open each folder that stands alone at its level - the walk stops where the tree branches. */
const loneTrail = (nodes: TreeViewNode[], parent = ''): string[] => {
  const only = nodes.length === 1 ? nodes[0] : undefined;
  if (only?.kind !== 'folder') return [];
  const id = idOf(parent, only.label);
  return [id, ...loneTrail(only.children ?? [], id)];
};

/** Enter and Space press a row, as they press a button. */
const pressOn =
  (act: () => void) =>
  (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      act();
    }
  };

interface RowsProps {
  nodes: TreeViewNode[];
  depth: number;
  parent: string;
  open: Set<string>;
  value: string;
  itemIcon: IconName;
  showValues: boolean;
  onToggle: (id: string) => void;
  onSelect: (value: string) => void;
}

function Rows({
  nodes,
  depth,
  parent,
  open,
  value,
  itemIcon,
  showValues,
  onToggle,
  onSelect,
}: RowsProps): ReactNode {
  const indent = { paddingLeft: INDENT_BASE + depth * INDENT_STEP };
  return nodes.map((node) => {
    const id = idOf(parent, node.label);
    if (node.kind === 'folder') {
      const isOpen = open.has(id);
      return (
        <div key={id} role="none">
          <div
            role="treeitem"
            tabIndex={0}
            aria-expanded={isOpen}
            aria-selected={false} /* a folder opens; only an item is picked */
            aria-level={depth + 1}
            className="mdt-tree__row mdt-tree__row--folder"
            style={indent}
            onClick={() => {
              onToggle(id);
            }}
            onKeyDown={pressOn(() => {
              onToggle(id);
            })}
          >
            <Icon name={isOpen ? 'chevron-down' : 'chevron-right'} size={12} aria-hidden />
            <Icon
              name={isOpen ? 'folder-open' : 'folder'}
              size={13}
              aria-hidden
              className={isOpen ? 'mdt-tree__glyph--open' : 'mdt-tree__glyph--shut'}
            />
            <span>{node.label}</span>
          </div>
          {isOpen ? (
            <div role="group">
              <Rows
                nodes={node.children ?? []}
                depth={depth + 1}
                parent={id}
                open={open}
                value={value}
                itemIcon={itemIcon}
                showValues={showValues}
                onToggle={onToggle}
                onSelect={onSelect}
              />
            </div>
          ) : null}
        </div>
      );
    }
    const own = valueOf(node);
    const picked = value === own;
    return (
      <div
        key={id}
        role="treeitem"
        tabIndex={0}
        aria-selected={picked}
        aria-level={depth + 1}
        className={cn(
          'mdt-tree__row mdt-tree__row--item',
          node.fresh && !picked && 'mdt-tree__row--fresh'
        )}
        style={indent}
        onClick={() => {
          onSelect(own);
        }}
        onKeyDown={pressOn(() => {
          onSelect(own);
        })}
      >
        <Icon name={node.icon ?? itemIcon} size={12} aria-hidden />
        <span>{node.label}</span>
        {showValues ? <span className="mdt-tree__value">{own}</span> : null}
      </div>
    );
  });
}

/**
 * TreeView - a bordered box of folders that open and shut and items that are picked, each level indented under its
 * folder. At most 320 tall, then it scrolls - and across, for a tree deeper than the box is wide.
 *
 * @example
 * ```tsx
 * <TreeView
 *   aria-label="Vault paths"
 *   nodes={paths}
 *   itemIcon="key"
 *   showValues
 *   value={picked}
 *   onSelect={setPicked}
 * />
 * ```
 */
const TreeView = forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      nodes,
      value = '',
      onSelect,
      defaultExpanded,
      expanded,
      onExpandedChange,
      itemIcon = 'file',
      showValues = false,
      className,
      ...props
    },
    ref
  ) => {
    const [own, setOwn] = useState<string[]>(
      () => defaultExpanded ?? (value ? trailTo(nodes, value) : null) ?? loneTrail(nodes)
    );
    const open = new Set(expanded ?? own);

    /* A FETCHED TREE OPENS TOO (Nirav's review of #188): the nodes usually arrive after mount, so whenever the nodes or
       the picked value change, the folders on the way to the pick are opened - added to what is open, never closing
       what someone opened. With nothing picked, a tree that arrives into an empty box opens its lone folders, as on
       mount. Uncontrolled only: a controlled `expanded` is the caller's. */
    useEffect(() => {
      if (expanded !== undefined) return;
      const trail = value ? trailTo(nodes, value) : null;
      setOwn((prev) => {
        const add = trail ?? (prev.length || defaultExpanded ? [] : loneTrail(nodes));
        const fresh = add.filter((id) => !prev.includes(id));
        return fresh.length ? [...prev, ...fresh] : prev;
      });
    }, [nodes, value, expanded, defaultExpanded]);

    const toggle = (id: string): void => {
      const next = new Set(open);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      const list = [...next];
      if (expanded === undefined) setOwn(list);
      onExpandedChange?.(list);
    };

    return (
      <div ref={ref} role="tree" className={cn('mdt-tree', className)} {...props}>
        <Rows
          nodes={nodes}
          depth={0}
          parent=""
          open={open}
          value={value}
          itemIcon={itemIcon}
          showValues={showValues}
          onToggle={toggle}
          onSelect={(picked) => onSelect?.(picked)}
        />
      </div>
    );
  }
);

TreeView.displayName = 'TreeView';

export { TreeView };
