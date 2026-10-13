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

/**
 * The state the corner dot reports - the console's organization lifecycle
 * (OrgHeader.jsx PRESENCE): active in the success token, suspended in the
 * warning token, offboarded in the neutral state token. Ported from the
 * console (Pranjal, 2026-10-13).
 */
export type AvatarStatus = 'active' | 'suspended' | 'offboarded';

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
   * A logo that FILLS the square edge to edge - cover, no frame, no ground -
   * the console's OrgMark (Pranjal, 2026-10-11: "it will be a fill type of
   * logo"); the corners round it. With a logo the shape defaults to the
   * rounded square; with none, or when it fails to load, the letter (or the
   * icon) stands on its tone. Wins over `src` when both are given. Ported from
   * the console (Pranjal, 2026-10-13).
   */
  logo?: string;

  /**
   * A dot on the bottom-right corner naming a state - the console's presence
   * dot on the organization mark: its own ring in the card colour, so it reads
   * as a cut-out in both themes, sized to the avatar (10 at 64, kept in that
   * proportion) and straddling the corner by the console's rule. Ported from
   * the console (Pranjal, 2026-10-13).
   */
  status?: AvatarStatus;

  /** Names the dot for assistive tech and its tooltip. Defaults to the state's own name. */
  statusLabel?: string;

  /**
   * Puts the small camera button on the bottom-right corner - the console's
   * profile drawer in edit mode. Pressing it opens the file picker (images
   * only); the chosen file is handed here. Ported from the console (Pranjal,
   * 2026-10-13).
   */
  onEdit?: (file: File) => void;

  /**
   * The camera button's accessible name and tooltip.
   * @default 'Upload photo'
   */
  editLabel?: string;

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
