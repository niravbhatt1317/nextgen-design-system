import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { avatarVariants } from './Avatar';

export type AvatarVariantsType = VariantProps<typeof avatarVariants>;

/**
 * The six-colour palette Org Mgmt and Agent Fleet both settled on.
 *
 * Agent Fleet's audit records a site passing `magenta`, which is not in the
 * palette and silently falls back to purple. Keeping the set closed and typed
 * means that mistake fails at build time instead of shipping a wrong colour.
 */
export type AvatarTone = 'slate' | 'blue' | 'green' | 'amber' | 'rose' | 'purple';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Circle or rounded square: a person is a circle, a thing is a square (Pranjal,
 * 2026-09-20, on the avatar mock). The square's corners are 6, and 12 at xl.
 */
export type AvatarShape = 'circle' | 'rounded';

export interface AvatarOwnProps {
  /**
   * The person or thing this represents. Used for the initials, for the
   * accessible name, and to pick a colour.
   */
  name?: string;

  /**
   * Overrides the letter derived from `name`.
   *
   * ONE letter at every size (Pranjal, 2026-09-20); anything longer is cut to
   * its first character.
   */
  initials?: string;

  /** Photo. Falls back to the letter if it fails to load. */
  src?: string;

  /**
   * A thing rather than a person: a team, a role, a service account, an
   * organization. The glyph takes the letter's place and sizes itself to the
   * tile - 12 in 20, 14 in 24, 16 in 32, 20 in 40, 24 in 56. With an icon the
   * shape defaults to the rounded square; pass `shape` to say otherwise.
   */
  icon?: ReactNode;

  /**
   * Colour. Left unset, it is derived from `name`, so the same person always
   * gets the same colour.
   *
   * IAM's audit found the opposite: its palette is assigned per row rather than
   * per identity, so "the same person renders in two colors" on two screens.
   * Deriving from the name makes that impossible.
   */
  tone?: AvatarTone;

  /** @default 'md' */
  size?: AvatarSize;

  /**
   * Circle for a person, rounded square for a thing. Left unset it follows the
   * content: an `icon` makes it `rounded`, a letter or a photo `circle`.
   */
  shape?: AvatarShape;

  /**
   * Draws a ring in the page background colour, so overlapping avatars stay
   * separated. Set automatically inside AvatarStack.
   * @default false
   */
  ring?: boolean;

  className?: string;
}

export type AvatarProps = AvatarOwnProps &
  Omit<ComponentPropsWithoutRef<'span'>, 'children' | 'className' | 'color'>;

export interface AvatarStackProps {
  /** Avatars to stack. Size, shape and ring are applied to each. */
  children: ReactNode;

  /**
   * How many to show before collapsing the rest into a "+N" chip.
   * @default 4
   */
  max?: number;

  /** @default 'md' */
  size?: AvatarSize;

  /** @default 'circle' */
  shape?: AvatarShape;

  className?: string;
}
