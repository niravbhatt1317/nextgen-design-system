import type { ComponentPropsWithoutRef } from 'react';

/**
 * Props for the OverflowCount component.
 *
 * ## What it is
 *
 * The quiet "+N" that sits after the values a row has room for - scopes, teams,
 * members, roles. The values wear the badge; the counter is plain muted text with
 * no pill, and hovering or focusing it lists the hidden values in the tooltip.
 *
 * ## What is deliberately absent
 *
 * - **A pill or a fill.** Ruled out (Pranjal, 3 September 2026): the badge goes on
 *   the value, never on the number.
 * - **Colour, size or emphasis options.** One look everywhere, the same as the
 *   "+N" inside the Table's TagList.
 */
export interface OverflowCountOwnProps {
  /**
   * The hidden values, in order. The tooltip lists them. When `count` is not
   * given, the counter shows how many there are.
   */
  items?: string[] | undefined;

  /**
   * How many are hidden. Give it when the number is known but the values are
   * not (or not all of them) - the tooltip then shows `label` instead of a list.
   * Wins over `items.length` when both are given.
   */
  count?: number | undefined;

  /**
   * What the counter counts, shown in the tooltip when there is no list to show
   * ("More members", "More access profiles"). Also read out to screen readers.
   * @default 'More assigned'
   */
  label?: string | undefined;

  /** Extra classes. Must use the `mdt-` prefix. */
  className?: string | undefined;
}

export type OverflowCountProps = OverflowCountOwnProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'className' | 'type'>;
