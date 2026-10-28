import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface PickCardProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'title' | 'children' | 'type' | 'onChange'
> {
  /**
   * The chosen option's glyph, drawn at 20 on the 40 tile in the sunken fill -
   * the same glyph its option card wears.
   */
  icon: ReactNode;

  /** The chosen option's name: "Direct to SaaS". */
  title: ReactNode;

  /** Its one-line explanation. Always one line, cut with an ellipsis when long. */
  description?: ReactNode | undefined;

  /**
   * Pressing the card: the cue to open all the options (the option cards) in its
   * place, and to fold back to the Pick card once one is picked.
   */
  onChange?: (() => void) | undefined;

  /**
   * The word that takes the selector glyph's place on hover and keyboard focus.
   * @default 'Change'
   */
  changeLabel?: string | undefined;

  /**
   * What a screen reader hears: the field, the pick and the door - "How it ships:
   * Direct to SaaS. Change". Defaults to the title and the change word when the
   * title is a string.
   */
  'aria-label'?: string | undefined;
}
