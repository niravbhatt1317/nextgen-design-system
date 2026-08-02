import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { bannerVariants } from './Banner';

export type BannerVariantsType = VariantProps<typeof bannerVariants>;

/**
 * The same six tones Toast carries, on purpose.
 *
 * A warning should look like a warning wherever it turns up, so the two share
 * one palette. Everything about how they behave is different - see the
 * component's own note.
 */
export type BannerTone = 'info' | 'warning' | 'danger' | 'success' | 'ai' | 'neutral';

/**
 * Where the banner sits.
 *
 * `inline` is the ordinary one: rounded, bordered all round, living inside a
 * panel or a form. `page` runs edge to edge across the top of a view - no
 * rounding and no side edges, because there is nothing beside it to be edged
 * against.
 */
export type BannerPlacement = 'inline' | 'page';

/**
 * Where the actions sit.
 *
 * `auto` is the rule stated in one line: **one action sits beside the words,
 * two or more go on their own line.** A single short action beside the message
 * keeps the banner one row tall; two actions squeezed into the same row is the
 * thing that breaks first in a narrow column.
 *
 * Set `inline` or `below` to hold one shape regardless - worth doing when
 * several banners stack and you want them all the same height, or when the
 * message is long enough that even one action should drop.
 */
export type BannerActionPlacement = 'auto' | 'inline' | 'below';

export interface BannerOwnProps {
  /** @default 'neutral' */
  tone?: BannerTone | undefined;

  /** @default 'inline' */
  placement?: BannerPlacement | undefined;

  /** The bold first line. */
  title?: ReactNode | undefined;

  /** The lighter line beneath it. Optional - plenty of banners are one line. */
  description?: ReactNode | undefined;

  /**
   * Replaces the tone's own glyph. Pass `null` to drop the glyph entirely.
   */
  icon?: ReactNode | null | undefined;

  /**
   * The actions, quietest first and the one you mean last.
   *
   * Pass `Button`s, and only `variant="ghost"` - or `variant="link"` where it is
   * genuinely tight. **Nothing with a ground of its own.** A solid button is the
   * loudest thing on a page and a banner is not the page; and a fill has to be
   * some colour, while every ground the library has is tuned for the white page
   * rather than for a tinted surface. In development this is checked and warned
   * about.
   */
  actions?: ReactNode | undefined;

  /** @default 'auto' */
  actionPlacement?: BannerActionPlacement | undefined;

  /**
   * Shows the dismiss cross, and is what it calls.
   *
   * The cross means "I have read this", never "I have dealt with it" - so it is
   * always last and it is never counted as one of the actions. Leave it out
   * entirely for a banner that has to stay until the reason for it has gone.
   */
  onDismiss?: (() => void) | undefined;

  /** Overrides the cross's label. @default 'Dismiss' */
  dismissLabel?: string | undefined;

  className?: string | undefined;
}

export type BannerProps = BannerOwnProps &
  Omit<ComponentPropsWithoutRef<'section'>, 'className' | 'title' | 'color' | 'children'>;
