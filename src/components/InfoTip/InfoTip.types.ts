import type { ReactNode } from 'react';

/** A "Learn more" link at the foot of the explainer. */
export interface InfoTipLearnMore {
  /** Where the link goes. */
  href: string;
  /**
   * The link's words.
   * @default 'Learn more'
   */
  label?: string | undefined;
  /**
   * Opens in a new tab, with `rel="noopener noreferrer"`; a screen reader hears that it does.
   * @default false
   */
  newTab?: boolean | undefined;
}

/**
 * Props for InfoTip - the ⓘ beside a heading or a label, its explainer in the library Tooltip.
 */
export interface InfoTipProps {
  /** The ⓘ's accessible name: "About Security policy". Required - nothing else names it. */
  label: string;

  /** The explainer. Sentences read from the left. */
  children: ReactNode;

  /**
   * A link at the foot of the explainer. The pointer can travel into the bubble
   * to reach it; from the keyboard, Tab on the open ⓘ moves into it.
   */
  learnMore?: InfoTipLearnMore | undefined;

  /**
   * Which side of the ⓘ the explainer opens on. Near a screen edge it flips by itself.
   * @default 'bottom'
   */
  side?: 'top' | 'right' | 'bottom' | 'left' | undefined;

  /**
   * Where along the ⓘ the explainer sits.
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end' | undefined;

  /**
   * The widest the explainer grows before it wraps.
   * @default 340
   */
  maxWidth?: number | undefined;

  /** Another glyph in place of the filled ⓘ, with the same explainer - a warning triangle, say. */
  icon?: ReactNode | undefined;

  className?: string | undefined;
}
