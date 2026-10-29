import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { SelectSize } from '../Select/Select.types';

/** The last level of the tree: one thing under an item, picked on its own or with the whole item. */
export interface TreeSelectLeaf {
  /** Its id, the value the field carries when it is picked alone. */
  id: string;
  /** Its name, one line. */
  label: string;
}

/** A thing to pick. Picking it picks everything under it; picking some of its leaves narrows it. */
export interface TreeSelectItem {
  /** Its id, the value the field carries when the whole item is picked. */
  id: string;
  /** Its name, the row's first line. */
  label: string;
  /** A second, fainter line under the name - an id, a code, a place. */
  description?: string | undefined;
  /**
   * The short form the field shows once the item is picked, in the code face
   * (an id, a key). The label when absent.
   */
  code?: string | undefined;
  /** What sits under it. An item with none is a leaf of its own. */
  children?: TreeSelectLeaf[] | undefined;
}

/** A heading that folds its items away. Its checkbox picks every item under it at once. */
export interface TreeSelectGroup {
  /** Its id, never a value: a group is a heading, not a thing to pick. */
  id: string;
  /** Its name, drawn as a small capital heading. */
  label: string;
  /** A 14px glyph before the name. */
  icon?: ReactNode | undefined;
  /** The items under it. */
  items: TreeSelectItem[];
}

/**
 * The words the field counts with: one and many of the item, and of what sits
 * under an item. "2 regions · 6 zones", "6 zones", "No regions selected".
 */
export interface TreeSelectNouns {
  /** @default ['item', 'items'] */
  item?: [string, string] | undefined;
  /** @default ['sub-item', 'sub-items'] */
  child?: [string, string] | undefined;
}

export interface TreeSelectProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'value' | 'onChange' | 'children'
> {
  /** The tree: groups, their items, and what sits under each item. */
  groups: TreeSelectGroup[];
  /**
   * What is picked, as a flat list of ids. An item's id stands for the whole
   * item, every leaf under it included; a leaf's id on its own narrows its item
   * to the leaves listed. The field keeps the list tidy: picking every leaf of
   * an item collapses to the item's id, unpicking the last leaf drops the item.
   */
  value: string[];
  /** Called with the next list on every pick, unpick and Clear all. */
  onChange: (value: string[]) => void;
  /** The field's words while nothing is picked. @default 'Select…' */
  placeholder?: string | undefined;
  /** The search box's words. @default 'Search…' */
  searchPlaceholder?: string | undefined;
  /** The words the field counts with. */
  nouns?: TreeSelectNouns | undefined;
  /**
   * The status line inside the list while nothing is picked.
   * @default 'No {items} selected'
   */
  emptyText?: string | undefined;
  /**
   * How many picks the closed field shows before "+N more". The rest are still
   * picked; the list inside shows them all.
   * @default 1
   */
  maxPills?: number | undefined;
  /** The field's height: `sm` 32, `md` 36, `lg` 40. @default 'sm' */
  size?: SelectSize | undefined;
  /** The label above the field. */
  label?: string | undefined;
  /** Marks the label with the red asterisk. */
  required?: boolean | undefined;
  /** The error under the field; given, the field's edge turns red. */
  error?: string | undefined;
  /** Holds the field shut. */
  disabled?: boolean | undefined;
  /** Extra classes on the trigger. Must use the `mdt-` prefix. */
  className?: string | undefined;
  /** Extra classes on the wrapper that holds label, field and error. */
  wrapperClassName?: string | undefined;
}
