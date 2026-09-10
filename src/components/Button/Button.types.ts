import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

/**
 * The seven looks a button can take, loudest to quietest.
 *
 * `secondary` is a quiet fill with no border, which is what separates it from
 * `outline`. Together with `primary` that gives three volumes — solid, filled,
 * outlined — and a reader can rank two buttons sitting side by side without
 * reading their labels.
 *
 * The success and AI families, and the soft and outlined destructive steps,
 * stay on `ButtonOld`. They were deliberately left out here.
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'destructiveGhost'
  | 'link';

/**
 * Three heights: 28, 32 and 36. `md` is the default.
 *
 * The text never changes with the size and neither does the glyph. Only the air
 * above and below moves, so the same words make the same width at every size.
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color' | 'children'
> {
  /** The button's look. Defaults to `primary`. */
  variant?: ButtonVariant | undefined;
  /** Height: `sm` 28, `md` 32, `lg` 36. Defaults to `md`. */
  size?: ButtonSize | undefined;
  /** The label. Omit it only with `iconOnly`. */
  children?: ReactNode | undefined;
  /** A glyph before the label. Rendered at 16 with a 1.5 stroke. */
  leftIcon?: ReactNode | undefined;
  /** A glyph after the label. Rendered at 16 with a 1.5 stroke. */
  rightIcon?: ReactNode | undefined;
  /**
   * A square the height of its size, holding one glyph and no label.
   * `ariaLabel` becomes required in practice: nothing else names the button.
   */
  iconOnly?: boolean | undefined;
  /**
   * Busy. Wears the disabled face with a spinner on it, because in both cases
   * there is nothing for the reader to do. The spinner is what says wait
   * rather than no.
   */
  loading?: boolean | undefined;
  /** Swap the label while `loading` — "Saving…" in place of "Save". */
  loadingText?: string | undefined;
  /** Stretch to the width of the parent. */
  fullWidth?: boolean | undefined;
  /**
   * Held on, the way a toolbar control looks once its filter is applied.
   * Draws the pressed fill and reports `aria-pressed`.
   */
  active?: boolean | undefined;
  /** Render an anchor instead of a button. */
  href?: string | undefined;
  /** Where the anchor opens. `_blank` also gets `rel="noopener noreferrer"`. */
  target?: '_blank' | '_self' | '_parent' | '_top' | undefined;
  /** The accessible name. Required when `iconOnly` leaves no label to read. */
  ariaLabel?: string | undefined;
  className?: string | undefined;
  style?: CSSProperties | undefined;
}
