import { cva } from 'class-variance-authority';
import { forwardRef, useState } from 'react';
import { cn } from '@/utils';
import type { AvatarProps, AvatarSize, AvatarTone } from './Avatar.types';

/** The six-colour palette, as a stable order so the hash below is repeatable. */
const TONES: AvatarTone[] = ['slate', 'blue', 'green', 'amber', 'rose', 'purple'];

const MAX_INITIALS = 2;

/**
 * How many letters each size shows.
 *
 * At 20px and 24px there is no room for two letters to read as two letters -
 * they crowd into a smudge. One letter at those sizes stays legible, and the
 * count follows the size on its own, so a stack that shrinks does the right
 * thing without anyone remembering to change the text.
 */
const INITIALS_FOR_SIZE: Record<AvatarSize, number> = {
  xs: 1,
  sm: 1,
  md: MAX_INITIALS,
  lg: MAX_INITIALS,
  xl: MAX_INITIALS,
};

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
      size: {
        xs: 'mdt-h-5 mdt-w-5 mdt-text-xs',
        sm: 'mdt-h-6 mdt-w-6 mdt-text-xs',
        md: 'mdt-h-8 mdt-w-8 mdt-text-sm',
        lg: 'mdt-h-10 mdt-w-10 mdt-text-base',
        xl: 'mdt-h-14 mdt-w-14 mdt-text-2xl',
      },
      shape: {
        circle: 'mdt-rounded-full',
        rounded: 'mdt-rounded-md',
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

/** A rounded avatar keeps softer corners at the largest size. */
const LARGE_ROUNDED: Partial<Record<AvatarSize, string>> = {
  lg: 'mdt-rounded-lg',
  xl: 'mdt-rounded-lg',
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
  return TONES.at(hash % TONES.length) ?? 'slate';
};

/** "Sarah Johnson" -> "SJ", "monitoring" -> "mo". */
export const initialsForName = (name: string): string => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';

  // Both fallbacks are unreachable after the length check above, for the same
  // reason as in toneForName.
  const first = words.at(0) ?? '';
  if (words.length === 1) return first.slice(0, MAX_INITIALS);

  const last = words.at(-1) ?? '';
  return first.charAt(0) + last.charAt(0);
};

/**
 * Avatar - a person or thing, as a photo or their initials.
 *
 * @example
 * ```tsx
 * <Avatar name="Sarah Johnson" />
 * <Avatar name="Sarah Johnson" shape="rounded" size="lg" />
 * <Avatar name="Sarah Johnson" src="/sarah.jpg" />
 * ```
 */
const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    { name = '', initials, src, tone, size = 'md', shape = 'circle', ring, className, ...rest },
    ref
  ) => {
    const [failed, setFailed] = useState(false);

    const resolvedTone = tone ?? (name ? toneForName(name) : 'slate');
    // The cap applies to a caller-supplied `initials` too. The size is what
    // decides how many letters fit, not where the letters came from.
    const text = (initials ?? initialsForName(name)).slice(0, INITIALS_FOR_SIZE[size]);
    const showImage = src !== undefined && src !== '' && !failed;

    return (
      <span
        ref={ref}
        className={cn(
          avatarVariants({ tone: resolvedTone, size, shape, ring }),
          shape === 'rounded' && LARGE_ROUNDED[size],
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
          <span aria-hidden="true">{text}</span>
        )}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
