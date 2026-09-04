import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { badgeVariants } from './Badge';

export type BadgeVariantsType = VariantProps<typeof badgeVariants>;

/**
 * What the badge means, not what colour it is. `tone="danger"` still reads
 * correctly if the brand red changes.
 *
 * Category colours (LDAP indigo, SCIM teal, a customer's own hue) are not
 * tones: they mean nothing on their own and come in through `palette`.
 */
export type BadgeTone =
  | 'neutral'
  | 'slate'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'ai'
  | 'inverse';

/**
 * How loud the badge is.
 *
 * - `fill`    a pale tint with strong text and no stroke. The default, and what
 *             almost everything should use.
 * - `outline` no fill; a light tinted stroke and the label carry the tone.
 * - `solid`   the strong colour with reversed text. **Counts only.**
 */
export type BadgeEmphasis = 'fill' | 'outline' | 'solid';

/** `pill` for states. `square` (a 4px corner) for tags, categories and filter chips. */
export type BadgeShape = 'pill' | 'square';

/** 20, 24 and 28px tall. Small is text or dot only. */
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * A category colour a product passes in when no tone fits: the fill, the ink,
 * and the dot (defaults to the ink). Values are whatever CSS accepts; the
 * component itself stays on tokens.
 */
export interface BadgePalette {
  fill: string;
  ink: string;
  dot?: string;
}

export interface BadgeOwnProps {
  /** What the badge means. @default 'neutral' */
  tone?: BadgeTone;

  /** How loud the badge is. @default 'fill' */
  emphasis?: BadgeEmphasis;

  /** The badge's outline. @default 'pill' */
  shape?: BadgeShape;

  /** @default 'md' */
  size?: BadgeSize;

  /**
   * A dot before the label, in the strong tone colour: 6px, 8px at large.
   *
   * With no label and no icon it becomes a dot on its own, the unread marker,
   * which steps up at every size so it stays findable without a chip around it.
   * @default false
   */
  dot?: boolean;

  /**
   * A 14px icon at medium, 16px at large. Small is text or dot only, so an
   * icon handed to it is dropped rather than shrunk. With no label the badge
   * becomes a square of its own height; give it an `aria-label` then.
   */
  icon?: ReactNode;

  /** Category colours for a badge the tones do not cover. Overrides `tone`. */
  palette?: BadgePalette;

  /**
   * Caps a numeric label. `<Badge max={99}>1284</Badge>` renders `99+`.
   * Only applies when the label is a number; anything else is left alone.
   */
  max?: number;

  /**
   * Cuts a long label off with an ellipsis instead of letting the badge widen.
   * Off by default: silently hiding text is worse than a wide badge unless the
   * space is fixed, such as a table column.
   * @default false
   */
  truncate?: boolean;

  /** Renders a × after the label at medium and large, for filter chips. Ignored at small. */
  onRemove?: () => void;

  /** The accessible name of the ×. @default 'Remove' */
  removeLabel?: string;

  /** The label. */
  children?: ReactNode;

  /** Extra classes. Must use the `mdt-` prefix. */
  className?: string;
}

export type BadgeProps = BadgeOwnProps &
  Omit<ComponentPropsWithoutRef<'span'>, 'children' | 'className' | 'color'>;
