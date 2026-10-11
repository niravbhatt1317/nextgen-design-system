import type { ComponentPropsWithoutRef } from 'react';

export interface InlineTagsOwnProps {
  /** The tags added so far, in the order they were added. */
  value: readonly string[];

  /** Hands back the whole new list after an add or a remove. */
  onChange: (next: string[]) => void;

  /**
   * A handful of likely tags, shown as dashed chips under the field **only while
   * it is open** - one tap adds one and the field stays open for the next.
   */
  suggestions?: readonly string[] | undefined;

  /**
   * Every tag used before (other records' tags). Searched as the person types;
   * the matches drop down under the field with Add "…" at the end for a new one.
   */
  options?: readonly string[] | undefined;

  /** The dashed button's words. @default 'Add tag' */
  addLabel?: string | undefined;

  /** The open field's placeholder. @default 'Type a tag' */
  placeholder?: string | undefined;

  /** Nothing can be added or removed; the pills stay, the Add button goes. */
  disabled?: boolean | undefined;

  className?: string | undefined;
}

export type InlineTagsProps = InlineTagsOwnProps &
  Omit<ComponentPropsWithoutRef<'div'>, keyof InlineTagsOwnProps | 'children' | 'onChange'>;
