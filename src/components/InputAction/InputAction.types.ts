import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { IconName } from '../Icon';

/**
 * Props for InputAction - an action that rides inside a field, at its right end, behind a hairline.
 */
export interface InputActionProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'children'
> {
  /** The word on the control - "Browse", "Replace", "Copy". */
  children: ReactNode;

  /** The 14 glyph before the word, from the library Icon set. Left unset, the word stands alone. */
  icon?: IconName | undefined;

  /**
   * Turns the control off: the word goes faint and the pointer shows not-allowed. A disabled button takes no
   * hover, so say why with `disabledReason`.
   * @default false
   */
  disabled?: boolean | undefined;

  /**
   * Why the control is off, shown on hover over it ("No path-list API on this store"). Read only while `disabled`.
   */
  disabledReason?: string | undefined;

  /**
   * Makes the control a copy action: a click copies this text to the clipboard, then the control reads
   * `copiedLabel` with a check in the success ink for `copiedDuration`, and goes back. `onClick` still runs.
   */
  copyText?: string | undefined;

  /** The word shown after a copy. @default 'Copied' */
  copiedLabel?: string | undefined;

  /** How long the copied state shows, in milliseconds. @default 1500 */
  copiedDuration?: number | undefined;

  /** Extra classes for the wrapper that holds the hairline and the control. */
  wrapperClassName?: string | undefined;
}
