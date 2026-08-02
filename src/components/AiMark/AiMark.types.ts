import type { ComponentPropsWithoutRef } from 'react';

/**
 * Which mark.
 *
 * `spark` is the general one - a large four-pointed star with a small one at
 * its shoulder. `trio` is three stars of falling size at a third of the
 * strength, for a surface that wants the mark as a texture.
 */
export type AiMarkVariant = 'spark' | 'trio';

/**
 * Filled, or drawn as a line.
 *
 * `solid` is the mark as it was drawn. `line` strokes the same outline instead
 * of filling it, for a row where every other glyph is line art - beside a
 * Lucide icon a solid mark reads as a different weight of thing.
 */
export type AiMarkAppearance = 'solid' | 'line';

/** The same scale `Icon` uses, so a mark and an icon sit level in a row. */
export type AiMarkSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AiMarkProps extends Omit<ComponentPropsWithoutRef<'svg'>, 'title'> {
  /** Which mark. See {@link AiMarkVariant}. */
  variant?: AiMarkVariant;

  /**
   * Filled, or drawn as a line. See {@link AiMarkAppearance}.
   *
   * Named `appearance` rather than `fill` because an `<svg>` already has a
   * `fill` and shadowing it would make the escape hatch unreachable.
   */
  appearance?: AiMarkAppearance;

  /** How big. Defaults to `sm`, which is 16px - the size it was drawn at. */
  size?: AiMarkSize;

  /**
   * A name, if the mark is carrying meaning on its own.
   *
   * Left off it is `aria-hidden`, which is right almost everywhere: the mark
   * says "AI" to somebody who has learnt it and nothing to somebody who has
   * not, so the writing beside it should carry the meaning. Set this only where
   * there is no such writing.
   */
  title?: string;
}
