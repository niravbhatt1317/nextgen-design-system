import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Props for CopyField - one line holding a value, with a copy button at its right end.
 */
export interface CopyFieldProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children' | 'className' | 'color' | 'onCopy'
> {
  /** The value shown, and the text the button copies - the whole of it, even when the line cuts it short. */
  value: string;

  /**
   * The field's name, above the line at 13/500. It also names the copy button
   * ("Copy Base URL") and the masked dots ("Hidden Base URL").
   */
  label?: string | undefined;

  /** Something beside the label - an InfoTip, usually. Shown only with a `label`. */
  info?: ReactNode | undefined;

  /**
   * Shows the library's SecretDots in place of the value. The button still
   * copies the real value; pass `copyable={false}` when it must not.
   * @default false
   */
  masked?: boolean | undefined;

  /**
   * The value in the monospace face. Off for plain words.
   * @default true
   */
  mono?: boolean | undefined;

  /**
   * Shows the copy button. Off for a value there is nothing to copy from.
   * @default true
   */
  copyable?: boolean | undefined;

  /** The copy button's accessible name. Defaults to "Copy {label}", or "Copy" without a label. */
  copyLabel?: string | undefined;

  /**
   * The word in the tooltip while the pointer rests on the button. After a
   * press it reads "Copied" for 1.4 seconds.
   * @default 'Copy'
   */
  tip?: string | undefined;

  /** Called with the value after every copy. */
  onCopy?: ((value: string) => void) | undefined;

  className?: string | undefined;
}
