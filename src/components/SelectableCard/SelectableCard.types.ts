import type { HTMLAttributes, ReactNode } from 'react';

/** A set of radios (one answer) or checkboxes (any number). */
export type SelectableCardType = 'radio' | 'checkbox';

/** How the set lays out: a stack 8 apart, a grid 12 apart, or chips wrapping 8 apart. */
export type SelectableCardLayout = 'stack' | 'grid' | 'chips';

export interface SelectableCardGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  /** @default 'radio' */
  type?: SelectableCardType;
  /** The chosen card's `value` in a radio set. */
  value?: string | undefined;
  /** Called with the picked card's `value` in a radio set. */
  onValueChange?: ((value: string) => void) | undefined;
  /** @default 'stack', or 'grid' when `columns` is set */
  layout?: SelectableCardLayout | undefined;
  /** A grid of 2 or 3 columns. Unset, the grid fits as many 220px columns as it can. */
  columns?: 2 | 3 | undefined;
  /** Holds every card in the set. */
  disabled?: boolean | undefined;
}

export interface SelectableCardProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'title' | 'onChange'
> {
  /** This card's answer in a radio set. */
  value?: string | undefined;
  /** A checkbox card's state, when it is not in a radio set. */
  checked?: boolean | undefined;
  /** Called with the new state when a checkbox card is pressed. */
  onCheckedChange?: ((checked: boolean) => void) | undefined;
  /** A card outside any group is a checkbox. @default 'checkbox' */
  type?: SelectableCardType | undefined;
  /** The card's name: also its accessible name. */
  title: ReactNode;
  /** The line under the title: also its accessible description. Not drawn on a chip. */
  description?: ReactNode | undefined;
  /** A bare glyph on the title's line. */
  icon?: ReactNode | undefined;
  /** A hairline tag beside the title ("Fastest"), never filled. */
  tag?: ReactNode | undefined;
  /** Holds this card. */
  disabled?: boolean | undefined;
  /**
   * What the card holds under its words: a picker, a hint, an action. Anything
   * interactive here keeps its press to itself and never picks the card.
   */
  children?: ReactNode;
}
