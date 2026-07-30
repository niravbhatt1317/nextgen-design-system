import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { badgeVariants } from './Badge';

export type BadgeVariantsType = VariantProps<typeof badgeVariants>;

/**
 * What the badge means, not what colour it is.
 *
 * Naming by meaning rather than by colour is deliberate. `tone="danger"` still
 * reads correctly if the brand red ever changes, and it tells a reader - human
 * or AI - what the badge is for. `red` tells them neither.
 *
 * `ai` was called `purple` until the tone set was settled. Same colour, but the
 * name now says what it is for, and it matches the `ai` variant Button already
 * ships.
 */
export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'ai';

/**
 * How loud the badge is.
 *
 * - `subtle`  a pale tint with strong text. The default, and what almost
 *             everything should use.
 * - `outline` no fill at all, just an edge and the label.
 * - `solid`   a filled chip with reversed text. **Counts only** - a
 *             notification total whose whole job is to be seen. A solid badge
 *             used as a status label shouts down everything around it.
 *
 * There is no `bare`. It was an emphasis level pretending to be a shape, it
 * made `shape` meaningless, and nothing outside this folder ever used it.
 */
export type BadgeEmphasis = 'subtle' | 'outline' | 'solid';

/**
 * The badge's outline.
 *
 * - `pill`   fully rounded. Reads as an object sitting on the page.
 * - `square` gently rounded. Sits into a table cell or a column of data more
 *            quietly.
 *
 * `tag` was the old name for `square`. It was renamed because `TagPill` is a
 * separate component and one word cannot mean two things.
 */
export type BadgeShape = 'pill' | 'square';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeOwnProps {
  /** What the badge means. @default 'neutral' */
  tone?: BadgeTone;

  /** How loud the badge is. @default 'subtle' */
  emphasis?: BadgeEmphasis;

  /** The badge's outline. @default 'pill' */
  shape?: BadgeShape;

  /** @default 'md' */
  size?: BadgeSize;

  /**
   * Shows a small filled dot before the label.
   *
   * Use it for a live state - active, connected, expired. Do not combine it
   * with `icon`; a dot and an icon in the same badge encode the same thing
   * twice, which is a drift the source systems already fell into.
   *
   * With no `children` it becomes a dot on its own - the unread marker.
   * @default false
   */
  dot?: boolean;

  /**
   * Icon shown before the label.
   *
   * The badge sizes it for you - 12, 14 and 16px for `sm`, `md` and `lg` - so
   * the caller never has to pick a size that matches the chip. Whatever `size`
   * you set on an `<Icon>` here is overridden.
   *
   * With no `children` the chip drops its padding and becomes a true circle or
   * square. That form has no label, so it **needs an `aria-label`**.
   */
  icon?: ReactNode;

  /**
   * Caps a numeric label. `<Badge max={99}>1284</Badge>` renders `99+`.
   *
   * Only applies when `children` is a number. Without it, a four-figure count
   * stretches whatever it sits in.
   */
  max?: number;

  /**
   * Cuts a long label off with an ellipsis instead of letting the badge widen.
   *
   * Off by default, because silently hiding text is worse than a wide badge
   * unless you know the space is fixed - a table column, a sidebar row.
   * @default false
   */
  truncate?: boolean;

  /** The label. */
  children?: ReactNode;

  /** Extra classes. Must use the `mdt-` prefix. */
  className?: string;
}

export type BadgeProps = BadgeOwnProps &
  Omit<ComponentPropsWithoutRef<'span'>, 'children' | 'className' | 'color'>;
