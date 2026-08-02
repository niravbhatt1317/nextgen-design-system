import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { FeedbackTone } from '@/utils/feedback-tones';

/** Which of the six tones this callout takes. */
export type CalloutTone = FeedbackTone;

/**
 * How much room it takes.
 *
 * `sm` is the density of a form's helper text; `md` matches body copy and is
 * what a callout inside a dialog or a page section wants.
 */
export type CalloutSize = 'sm' | 'md';

/**
 * How much surface it draws.
 *
 * `tinted` is the tone's own tint and edge. `outline` keeps the edge and drops
 * the fill, for a callout that has to sit on a surface that is already tinted -
 * a callout inside a callout, or one on a coloured panel, where a second tint
 * reads as a stain rather than as a block.
 */
export type CalloutVariant = 'tinted' | 'outline';

export interface CalloutProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  /** Which of the six tones. Defaults to `neutral`, which is the quiet one. */
  tone?: CalloutTone;

  /** How much room it takes. See {@link CalloutSize}. */
  size?: CalloutSize;

  /** How much surface it draws. See {@link CalloutVariant}. */
  variant?: CalloutVariant;

  /**
   * A short line above the body, in the same calm ink as the body.
   *
   * Optional: a one-sentence callout does not need a heading repeating it.
   */
  title?: ReactNode;

  /**
   * The reading. Anything - a sentence, a list of what is about to be deleted,
   * a definition list, a pair of controls.
   *
   * This is the difference between a callout and a toast. A toast takes two
   * strings because it is read in passing; a callout is part of the page and
   * holds whatever the page holds.
   */
  children?: ReactNode;

  /**
   * A glyph of your own, or `false` for none.
   *
   * Left alone, each tone brings its own. `false` is for a callout that is a
   * grouped block rather than a warning - an icon there labels a group that
   * does not need labelling.
   */
  icon?: ReactNode | false;

  /**
   * Controls along the bottom, usually one or two buttons.
   *
   * Below the reading rather than beside it: a callout's action is what you do
   * *after* reading, and putting it on the right invites pressing it first.
   */
  actions?: ReactNode;

  /**
   * Makes it dismissible, and is called when the close is pressed.
   *
   * Absent by default, which is the opposite of `Toast`. A toast always has a
   * way out because it arrived uninvited; a callout is part of the page, and a
   * close on something that was always there implies it will come back.
   */
  onDismiss?: () => void;

  /** What the dismiss control is called. */
  dismissLabel?: string;

  /**
   * A word naming the tone, for people who cannot see the colour.
   *
   * The glyph is decorative, so a `danger` callout whose text does not say it
   * is dangerous reads as neutral to a screen reader. Usually the writing
   * already carries it - "This cannot be undone" needs no label. Set this when
   * it does not.
   */
  toneLabel?: string;
}
