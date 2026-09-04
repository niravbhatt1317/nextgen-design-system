import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * The seven tones that carry a meaning. Category colours (LDAP indigo, SCIM
 * teal, a customer's own hue) are not tones: they come in through `palette`.
 */
export type BadgeNewTone =
  | 'neutral'
  | 'slate'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'inverse';

/**
 * `fill` is the default and carries no stroke. `outline` is a light tinted
 * stroke on a clear fill, opt-in. `solid` is the strong colour with white
 * text, for counts.
 */
export type BadgeNewEmphasis = 'fill' | 'outline' | 'solid';

/** Pill for states. Rounded square, 4px corner, for tags and categories. */
export type BadgeNewShape = 'pill' | 'square';

/** 20, 24 and 28px tall. Small is text or dot only. */
export type BadgeNewSize = 'sm' | 'md' | 'lg';

/**
 * A category colour a product passes in when no tone fits: the fill, the ink,
 * and the dot (defaults to the ink). Values are whatever CSS accepts; the
 * component itself stays on tokens.
 */
export interface BadgeNewPalette {
  fill: string;
  ink: string;
  dot?: string;
}

export interface BadgeNewProps extends Omit<ComponentPropsWithoutRef<'span'>, 'color'> {
  /** @default 'neutral' */
  tone?: BadgeNewTone;
  /** @default 'fill' */
  emphasis?: BadgeNewEmphasis;
  /** @default 'pill' */
  shape?: BadgeNewShape;
  /** @default 'md' */
  size?: BadgeNewSize;
  /** The dot before the label: 6px, 8px at large, in the strong tone colour. */
  dot?: boolean;
  /**
   * A 14px icon at medium, 16px at large. Small is text or dot only, so an
   * icon handed to it is dropped rather than shrunk. With no label the badge
   * becomes a square of its own height; give it an `aria-label` then.
   */
  icon?: ReactNode;
  /** Category colours for a badge the tones do not cover. Overrides `tone`. */
  palette?: BadgeNewPalette;
  /** Renders a × after the label at medium and large, for filter chips. Ignored at small. */
  onRemove?: () => void;
  /** The accessible name of the ×. @default 'Remove' */
  removeLabel?: string;
  children?: ReactNode;
}
