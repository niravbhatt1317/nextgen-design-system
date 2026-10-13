import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface InlineTagsOwnProps {
  /** The tags on the record, in the order they were added. */
  value: readonly string[];

  /**
   * Hands back the whole new list - on **Apply** (the picker's ticks are a draft until then), and at once when a
   * pill's ✕ is pressed in the inline row.
   */
  onChange: (next: string[]) => void;

  /** Likely tags: listed first under Suggested, ahead of the rest. */
  suggestions?: readonly string[] | undefined;

  /** Every tag used before (other records' tags): listed under Suggested and searched as the person types. */
  options?: readonly string[] | undefined;

  /** How many records use each tag: the count on each row, and the order of Suggested (most used first). */
  counts?: Readonly<Record<string, number>> | undefined;

  /**
   * - `inline` (default): the pills in a row and a dashed **Add tag** that turns into the search field in place; the
   *   picker opens under it. For a header or a details row.
   * - `popover`: a button showing the tags (or **Add tags**) that opens the picker with its own search on top. For a
   *   table cell.
   */
  variant?: 'inline' | 'popover' | undefined;

  /** popover: what the cell shows instead of the default pills (two, then a quiet "+N"). */
  trigger?: ReactNode | undefined;

  /** The dashed button's words (inline). @default 'Add tag' */
  addLabel?: string | undefined;

  /** The cell's words when there are no tags (popover). @default 'Add tags' */
  emptyLabel?: string | undefined;

  /** The search field's placeholder. @default 'Search or create a tag' */
  placeholder?: string | undefined;

  /** The picker's accessible name. @default 'Tags' */
  label?: string | undefined;

  /** Nothing can be added or removed; the pills stay, the Add button goes. */
  disabled?: boolean | undefined;

  className?: string | undefined;
}

export type InlineTagsProps = InlineTagsOwnProps &
  Omit<ComponentPropsWithoutRef<'div'>, keyof InlineTagsOwnProps | 'children' | 'onChange'>;
