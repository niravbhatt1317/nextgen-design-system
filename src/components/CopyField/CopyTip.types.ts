import type { MouseEvent, ReactElement } from 'react';

/** The copy control CopyTip wraps: any element that takes an `onClick` - usually a library Button. */
export type CopyTipControl = ReactElement<{
  onClick?: ((event: MouseEvent<HTMLElement>) => void) | undefined;
}>;

/**
 * Props for CopyTip - the copy feedback around a copy control: "Copy" under the pointer, "Copied" after a press.
 */
export interface CopyTipProps {
  /**
   * What a press copies. A function is read at the moment of the press, for a
   * value that is put together late (a link with today's token in it).
   */
  text: string | (() => string);

  /**
   * The word in the tooltip while the pointer rests on the control. After a
   * press it reads "Copied" for 1.4 seconds.
   * @default 'Copy'
   */
  tip?: string | undefined;

  /**
   * Shows `tip` under the pointer. Turn it off for a control that already reads
   * "Copy" ("Copy link", "Copy all URNs"): the bubble then shows only once it has copied.
   * @default true
   */
  hoverTip?: boolean | undefined;

  /**
   * Which side of the control the bubble opens on. Near a screen edge it flips by itself.
   * @default 'top'
   */
  side?: 'top' | 'right' | 'bottom' | 'left' | undefined;

  /** Called with the copied text after every press. */
  onCopy?: ((text: string) => void) | undefined;

  /**
   * The copy control. A press copies `text` and still runs the control's own `onClick` first.
   */
  children: CopyTipControl;
}
