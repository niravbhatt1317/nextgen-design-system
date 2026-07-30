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
 */
export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'purple';

/**
 * The badge's outline.
 *
 * - `pill` fully rounded, for lifecycle and status
 * - `tag`  gently rounded, for tags, counts and metadata
 * - `bare` no background at all, for sitting inside a dense table cell
 */
export type BadgeShape = 'pill' | 'tag' | 'bare';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeOwnProps {
  /** What the badge means. @default 'neutral' */
  tone?: BadgeTone;

  /** The badge's outline. @default 'pill' */
  shape?: BadgeShape;

  /** @default 'md' */
  size?: BadgeSize;

  /**
   * Shows a small filled dot before the label, in the tone's colour.
   *
   * Use it for a live state - active, connected, expired. Do not combine it
   * with `icon`; a dot and an icon in the same badge encode the same thing
   * twice, which is a drift the source systems already fell into.
   * @default false
   */
  dot?: boolean;

  /** Icon shown before the label. */
  icon?: ReactNode;

  /** The label. */
  children?: ReactNode;

  /** Extra classes. Must use the `mdt-` prefix. */
  className?: string;
}

export type BadgeProps = BadgeOwnProps &
  Omit<ComponentPropsWithoutRef<'span'>, 'children' | 'className' | 'color'>;
