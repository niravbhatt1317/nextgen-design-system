import type { HTMLAttributes } from 'react';
import type { IconName } from '../Icon';

/**
 * One entry in a TreeView: a folder that opens onto more entries, or an item that is picked.
 */
export interface TreeViewNode {
  /** What the row says - "secret/", "postgres-prod-ro". A folder's label is also its id, joined with its parents'. */
  label: string;

  /** A folder opens and closes; an item is picked. */
  kind: 'folder' | 'item';

  /** An item's value - what `onSelect` hands back ("secret/data/db/postgres-prod-ro"). @default the label */
  value?: string | undefined;

  /** A folder's entries. */
  children?: TreeViewNode[] | undefined;

  /** An item's glyph, over the tree's `itemIcon`. */
  icon?: IconName | undefined;

  /** An item that has just arrived (a sync brought it in) - drawn in the success ink until it is picked. */
  fresh?: boolean | undefined;
}

/**
 * Props for TreeView - a bordered box of folders that open and items that are picked.
 */
export interface TreeViewProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onSelect' | 'children'
> {
  /** The entries at the top of the tree. */
  nodes: TreeViewNode[];

  /** The picked item's value. Its folders open on mount. */
  value?: string | undefined;

  /** Called with an item's value when it is clicked, or pressed with Enter or Space. */
  onSelect?: ((value: string) => void) | undefined;

  /**
   * The folders open on mount, by their ids - their labels from the top, joined with "/" ("secret/", "secret//data/").
   * @default the folders on the way to `value`; with none, each folder that stands alone at its level
   */
  defaultExpanded?: string[] | undefined;

  /** The open folders, controlled - pair it with `onExpandedChange`. */
  expanded?: string[] | undefined;

  /** Called with the open folders' ids when a folder opens or shuts. */
  onExpandedChange?: ((expanded: string[]) => void) | undefined;

  /** The glyph on every item that names none of its own. @default 'file' */
  itemIcon?: IconName | undefined;

  /**
   * Draws each item's value at the row's end in small mono - the full path beside its name.
   * @default false
   */
  showValues?: boolean | undefined;
}
