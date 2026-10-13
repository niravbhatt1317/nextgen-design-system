import { cva } from 'class-variance-authority';
import { forwardRef, useRef, useState } from 'react';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { cn } from '@/utils';
import type {
  AvatarProps,
  AvatarShape,
  AvatarSize,
  AvatarStatus,
  AvatarTone,
} from './Avatar.types';

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
      /* A WASH AND AN INK, ONE PAIR PER TONE, and no dark twin: under
       * [data-theme='dark'] the ramp step itself flips - blue-10 is #EBF4FF in
       * light and #1D3754 in dark, blue-80 #003899 and #A3CDFF - so the same
       * two classes give a dark wash under a light ink without being told.
       * The `dark:` pairs that used to sit here were written for the retired
       * `.dark` palette and, under the generated map, named the wrong end of
       * every ramp: they painted a near-white circle on the dark page. */
      tone: {
        slate: 'mdt-bg-neutral-30 mdt-text-neutral-110',
        blue: 'mdt-bg-blue-10 mdt-text-blue-80',
        green: 'mdt-bg-green-10 mdt-text-green-80',
        amber: 'mdt-bg-orange-20 mdt-text-orange-80',
        rose: 'mdt-bg-red-10 mdt-text-red-80',
        purple: 'mdt-bg-purple-10 mdt-text-purple-90',
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

/* ── THE STATUS DOT, ported from the console (Pranjal, 2026-10-13) ──────────
 * OrgHeader.jsx PresenceAvatar + orgHeader.css `.org-hero__mark--card
 * .org-hero__presence`: the state in its state token, title and aria-label the
 * state's name, a ring in the card colour so it reads as a cut-out. */

/** The console's PRESENCE map: the state's token and its name. */
const STATUS: Record<AvatarStatus, { fill: string; label: string }> = {
  active: { fill: 'mdt-bg-success', label: 'Active' },
  suspended: { fill: 'mdt-bg-warning', label: 'Suspended' },
  offboarded: { fill: 'mdt-bg-feedback-neutral-icon', label: 'Offboarded' },
};

/**
 * The dot and its ring, in the card mark's proportion: 10 with a 4 ring at 64,
 * 7.5 with a 3 ring at 48 - so the dot is size × 10/64 and the ring size / 16.
 * The library has no size or ring-width step for these; they are raw values.
 */
const STATUS_DOT: Record<AvatarSize, string> = {
  xs: 'mdt-size-[3.13px] mdt-ring-[1.25px]',
  sm: 'mdt-size-[3.75px] mdt-ring-[1.5px]',
  md: 'mdt-size-[5px] mdt-ring-2',
  lg: 'mdt-size-[6.25px] mdt-ring-[2.5px]',
  xl: 'mdt-size-[8.75px] mdt-ring-[3.5px]',
};

/**
 * Where the dot sits: it straddles the corner by the console's rule - its
 * centre 3.7 out from the corner's arc along the diagonal (2.93 past the box
 * at 64 with corners 16, 2.85 at 48 with corners 12). Worked here for this
 * library's own corners: 6 (12 at xl) on the square, half the size on the
 * circle - where a large circle's arc is deep enough that the dot sits inside
 * the box, as an online dot sits on a round photo.
 */
const STATUS_OFFSET: Record<AvatarShape, Record<AvatarSize, string>> = {
  rounded: {
    xs: 'mdt-bottom-[-2.42px] mdt-right-[-2.42px]',
    sm: 'mdt-bottom-[-2.73px] mdt-right-[-2.73px]',
    md: 'mdt-bottom-[-3.36px] mdt-right-[-3.36px]',
    lg: 'mdt-bottom-[-3.98px] mdt-right-[-3.98px]',
    xl: 'mdt-bottom-[-3.48px] mdt-right-[-3.48px]',
  },
  circle: {
    xs: 'mdt-bottom-[-1.25px] mdt-right-[-1.25px]',
    sm: 'mdt-bottom-[-0.98px] mdt-right-[-0.98px]',
    md: 'mdt-bottom-[-0.43px] mdt-right-[-0.43px]',
    lg: 'mdt-bottom-[0.12px] mdt-right-[0.12px]',
    xl: 'mdt-bottom-[1.21px] mdt-right-[1.21px]',
  },
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
 * <Avatar name="Acme Corp" logo="/acme.png" size="xl" status="active" />
 * <Avatar name="Sarah Johnson" src={photo} size="xl" shape="rounded" onEdit={setPhotoFile} />
 * ```
 *
 * Ported from the console (Pranjal, 2026-10-13): the logo that fills the
 * square (ui/OrgMark.jsx), the status dot on the corner (OrgHeader.jsx
 * PresenceAvatar) and the camera button (ProfileDrawer.jsx). With a dot or a
 * camera button the avatar sits in a frame; `ref` and `className` stay on the
 * avatar itself.
 */
const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      name = '',
      initials,
      src,
      logo,
      icon,
      tone,
      size = 'md',
      shape,
      ring,
      status,
      statusLabel,
      onEdit,
      editLabel = 'Upload photo',
      className,
      ...rest
    },
    ref
  ) => {
    const [failed, setFailed] = useState(false);
    // the hidden file input behind the camera button (console: ProfileDrawer.jsx photoRef)
    const fileRef = useRef<HTMLInputElement>(null);

    const hasLogo = logo !== undefined && logo !== '';
    const image = hasLogo ? logo : src;
    const resolvedTone = tone ?? (name ? toneForName(name) : 'slate');
    /* the shape follows the content unless the caller says: a thing (an icon, a logo) is a square, a person a circle */
    const resolvedShape = shape ?? (icon || hasLogo ? 'rounded' : 'circle');
    // The cap applies to a caller-supplied `initials` too: one letter.
    const text = (initials ?? initialsForName(name)).slice(0, MAX_INITIALS);
    const showImage = image !== undefined && image !== '' && !failed;

    const face = (
      <span
        ref={ref}
        className={cn(
          avatarVariants({ tone: resolvedTone, size, shape: resolvedShape, ring }),
          resolvedShape === 'rounded' && LARGE_ROUNDED[size],
          // a logo fills the box with no ground behind it (console OrgMark: "cover, no frame, no ground")
          hasLogo && showImage && 'mdt-bg-transparent',
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
            src={image}
            alt=""
            className="mdt-block mdt-h-full mdt-w-full mdt-object-cover"
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

    // Nothing on the corner: the avatar is exactly what it always was.
    if (!status && !onEdit) return face;

    // The face clips its image, so the corner parts ride a frame around it.
    const dot = status ? STATUS[status] : undefined;
    const dotLabel = statusLabel ?? dot?.label;

    return (
      <span className="mdt-relative mdt-inline-flex mdt-shrink-0" data-testid="avatar-frame">
        {face}
        {dot ? (
          <span
            role="img"
            aria-label={dotLabel}
            title={dotLabel}
            className={cn(
              'mdt-absolute mdt-rounded-full mdt-ring-card',
              dot.fill,
              STATUS_DOT[size],
              STATUS_OFFSET[resolvedShape][size]
            )}
            data-testid="avatar-status"
          />
        ) : null}
        {onEdit ? (
          <>
            {/* the console's camera button: the outline icon button at 28, its corner 6 past the
                avatar's (ProfileDrawer.jsx, Pranjal 2026-09-03) */}
            <Button
              variant="outline"
              size="sm"
              iconOnly
              leftIcon={<Icon name="camera" />}
              ariaLabel={editLabel}
              title={editLabel}
              onClick={() => fileRef.current?.click()}
              className="mdt-absolute -mdt-bottom-1.5 -mdt-right-1.5"
            />
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="mdt-hidden"
              tabIndex={-1}
              aria-hidden="true"
              data-testid="avatar-edit-input"
              onChange={(e) => {
                const file = e.target.files?.[0];
                // cleared, so the same file can be picked again
                e.target.value = '';
                if (file) onEdit(file);
              }}
            />
          </>
        ) : null}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
