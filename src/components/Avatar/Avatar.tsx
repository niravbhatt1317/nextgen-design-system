import { cva } from 'class-variance-authority';
import { forwardRef, useState } from 'react';
import { cn } from '@/utils';
import type { AvatarProps, AvatarSize, AvatarTone } from './Avatar.types';

/**
 * The tones a PERSON may get from their name. Slate is not among them
 * (Pranjal, 2026-09-08: "do not use neutral color avatar"); slate keeps to the
 * +N chip, to a thing with an icon, and to an avatar with no name at all.
 */
const PERSON_TONES: AvatarTone[] = ['blue', 'green', 'amber', 'rose', 'purple'];

/**
 * ONE letter, at every size (Pranjal, 2026-09-20: "we will only be keeping the
 * single letter instead of double letters"; first ruled for IAM on 2026-08-24).
 * A caller-supplied `initials` is capped the same way.
 */
const MAX_INITIALS = 1;

/**
 * Avatar styles.
 *
 * Initials on a pale tint of the tone, which is what Org Mgmt and Agent Fleet
 * both landed on. Both render circles; IAM renders rounded squares. Both shapes
 * are supported because both are in use and neither is wrong.
 *
 * Note on type sizes: the source systems scale the initials at 0.4x the avatar,
 * which lands on 8px and 10px at the small end. This type scale has no step
 * below 12px, so the two smallest sizes run proportionally larger. That is the
 * missing type-scale token showing through - see MISSING-TOKENS.md.
 */
export const avatarVariants = cva(
  [
    'mdt-inline-flex mdt-shrink-0 mdt-items-center mdt-justify-center',
    'mdt-select-none mdt-overflow-hidden mdt-font-semibold mdt-uppercase',
  ],
  {
    variants: {
      tone: {
        slate:
          'mdt-bg-neutral-30 mdt-text-neutral-110 dark:mdt-bg-neutral-120 dark:mdt-text-neutral-30',
        blue: 'mdt-bg-blue-10 mdt-text-blue-80 dark:mdt-bg-blue-90 dark:mdt-text-blue-30',
        green: 'mdt-bg-green-10 mdt-text-green-80 dark:mdt-bg-green-90 dark:mdt-text-green-30',
        amber: 'mdt-bg-orange-20 mdt-text-orange-80 dark:mdt-bg-orange-90 dark:mdt-text-orange-30',
        rose: 'mdt-bg-red-10 mdt-text-red-80 dark:mdt-bg-red-90 dark:mdt-text-red-30',
        purple:
          'mdt-bg-purple-10 mdt-text-purple-90 dark:mdt-bg-purple-100 dark:mdt-text-purple-30',
      },
      /* THE TYPE IS A STEP SMALLER than the scale would give (Pranjal, 2026-08-24,
       * with the one letter: "text one step smaller than the DS default"):
       * 11 · 11 · 12 · 16 · 18. THE ICON follows the IconTile's ratio (his
       * 2026-09-12: "icon size is too big"): 12 in 20, 14 in 24, 16 in 32,
       * 20 in 40, 24 in 56. */
      size: {
        xs: 'mdt-h-5 mdt-w-5 mdt-text-[11px] [&>svg]:mdt-size-3',
        sm: 'mdt-h-6 mdt-w-6 mdt-text-[11px] [&>svg]:mdt-size-3.5',
        md: 'mdt-h-8 mdt-w-8 mdt-text-xs [&>svg]:mdt-size-4',
        lg: 'mdt-h-10 mdt-w-10 mdt-text-base [&>svg]:mdt-size-5',
        xl: 'mdt-h-14 mdt-w-14 mdt-text-lg [&>svg]:mdt-size-6',
      },
      /* THE SQUARE'S CORNERS are the IconTile's: 6, and 12 at 56 - the radius
       * the console's identity marks used at the top of a drawer (Pranjal,
       * 2026-09-12). */
      shape: {
        circle: 'mdt-rounded-full',
        rounded: 'mdt-rounded-[6px]',
      },
      /** Separates overlapping avatars in a stack. */
      ring: {
        true: 'mdt-ring-2 mdt-ring-background',
        false: '',
      },
    },
    defaultVariants: {
      tone: 'slate',
      size: 'md',
      shape: 'circle',
      ring: false,
    },
  }
);

/** A rounded avatar keeps softer corners at the largest size: 12 at 56. */
const LARGE_ROUNDED: Partial<Record<AvatarSize, string>> = {
  xl: 'mdt-rounded-xl',
};

/**
 * Picks a tone from a name, so one person is always one colour.
 *
 * IAM's audit records the failure this avoids: its palette is assigned per row
 * rather than per identity, so the same person appears in two different colours
 * on two different screens, and one data file contradicts another about her.
 */
export const toneForName = (name: string): AvatarTone => {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  // The modulo guarantees a valid index, but noUncheckedIndexedAccess cannot
  // prove it. The lint config forbids both `as` casts and `!` assertions, so
  // the fallback stays - it is unreachable, not defensive.
  return PERSON_TONES.at(hash % PERSON_TONES.length) ?? 'blue';
};

/** "Sarah Johnson" -> "S", "monitoring" -> "m": the first letter of the first word, and only that. */
export const initialsForName = (name: string): string => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';
  // Unreachable after the length check above, for the same reason as in toneForName.
  const first = words.at(0) ?? '';
  return first.slice(0, MAX_INITIALS);
};

/**
 * Avatar - a person or a thing, as a photo, one letter, or an icon.
 *
 * Ruled by Pranjal on mocks/foundation/avatar.html (2026-09-20 → 21): ONE
 * letter at every size; the type a step smaller than the scale; a PERSON is a
 * circle and a THING is a square - the default follows the content (a letter
 * or a photo → circle, an icon → the rounded square), and either can be
 * forced; the square's corners are 6, and 12 at 56; the tone comes from the
 * name and is never slate for a person; a photo falls back to the letter.
 *
 * @example
 * ```tsx
 * <Avatar name="Sarah Johnson" />
 * <Avatar name="Sarah Johnson" src="/sarah.jpg" size="xl" />
 * <Avatar name="Design team" icon={<Icon name="users" />} tone="blue" />
 * <Avatar name="Sarah Johnson" shape="rounded" size="lg" />
 * ```
 */
const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ name = '', initials, src, icon, tone, size = 'md', shape, ring, className, ...rest }, ref) => {
    const [failed, setFailed] = useState(false);

    const resolvedTone = tone ?? (name ? toneForName(name) : 'slate');
    /* the shape follows the content unless the caller says: a thing (an icon) is a square, a person a circle */
    const resolvedShape = shape ?? (icon ? 'rounded' : 'circle');
    // The cap applies to a caller-supplied `initials` too: one letter.
    const text = (initials ?? initialsForName(name)).slice(0, MAX_INITIALS);
    const showImage = src !== undefined && src !== '' && !failed;

    return (
      <span
        ref={ref}
        className={cn(
          avatarVariants({ tone: resolvedTone, size, shape: resolvedShape, ring }),
          resolvedShape === 'rounded' && LARGE_ROUNDED[size],
          className
        )}
        // The initials are decorative once the name is announced, so the whole
        // avatar carries a single accessible name rather than reading "S J".
        role="img"
        aria-label={name || undefined}
        {...rest}
      >
        {showImage ? (
          <img
            src={src}
            alt=""
            className="mdt-h-full mdt-w-full mdt-object-cover"
            onError={() => {
              setFailed(true);
            }}
            data-testid="avatar-image"
          />
        ) : (
          (icon ?? <span aria-hidden="true">{text}</span>)
        )}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
