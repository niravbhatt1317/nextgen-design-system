import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type { TagPillProps } from './TagPill.types';

/**
 * TagPill styles.
 *
 * A tag is something a person put there and can take away. `Badge` is the other
 * half of the pair - a label the system applies, which nobody removes.
 *
 * ## The geometry, and why
 *
 * The chip is 24px tall because the remove control needs a 24 x 24 target to be
 * reliably hittable, and a shorter chip cannot hold one. That is also why there
 * is only one size: a small tag would ship a cross people miss.
 *
 * A plain word or an icon sits 10px in. An avatar sits 2px in, because a 20px
 * filled circle already leaves 2px above and below - give it the same 10px as a
 * word and it reads pushed off-centre against its own breathing room.
 *
 * Measured from the ink rather than the boxes, a tag with an icon comes out at
 * 12px of air on each side.
 */
export const tagPillVariants = cva(
  [
    'mdt-inline-flex mdt-shrink-0 mdt-items-center',
    'mdt-h-6 mdt-gap-2',
    'mdt-whitespace-nowrap mdt-text-xs mdt-font-medium',
    'mdt-border mdt-border-solid',
    // Neutral only. Colour is a separate decision - see TagPill.types.ts.
    'mdt-border-neutral-40 mdt-bg-neutral-30 mdt-text-neutral-110',
    'dark:mdt-border-neutral-110 dark:mdt-bg-neutral-120 dark:mdt-text-neutral-30',
    'mdt-transition-colors',
  ],
  {
    variants: {
      shape: {
        pill: 'mdt-rounded-full',
        square: 'mdt-rounded-sm',
      },
      /** An avatar hugs the edge; anything else sits back. */
      hasAvatar: {
        true: 'mdt-pl-0.5',
        false: 'mdt-pl-2.5',
      },
      /**
       * With a cross, the right inset is only 2px - the cross's own 24px well
       * supplies the rest, and its glyph lands 12px from the edge either way.
       */
      removable: {
        true: 'mdt-pr-0.5',
        false: 'mdt-pr-2.5',
      },
      /**
       * The chip lifts one step on hover. It does not change width; a tag that
       * grows shoves its neighbours sideways while you are aiming at them.
       */
      interactive: {
        true: 'hover:mdt-bg-neutral-40 dark:hover:mdt-bg-neutral-110',
        false: '',
      },
      disabled: {
        true: 'mdt-pointer-events-none mdt-opacity-50',
        false: '',
      },
      truncate: {
        true: 'mdt-max-w-32',
        false: '',
      },
    },
    defaultVariants: {
      shape: 'pill',
      hasAvatar: false,
      removable: false,
      interactive: false,
      disabled: false,
      truncate: false,
    },
  }
);

/**
 * The remove control.
 *
 * The button is the full height of the chip and 24 wide, so the target is
 * 24 x 24 even though the cross inside it is 12. It has its own hover surface
 * on top of the chip's, so it is clear which of the two you are about to hit.
 *
 * It sits *beside* the label rather than inside it: a button nested in another
 * button is invalid and leaves the cross unreachable by keyboard.
 */
const REMOVE_CLASSES = [
  'mdt-inline-flex mdt-h-6 mdt-w-6 mdt-shrink-0 mdt-items-center mdt-justify-center',
  'mdt-rounded-[inherit] mdt-border-0 mdt-bg-transparent mdt-p-0',
  'mdt-text-muted-foreground mdt-transition-colors',
  'hover:mdt-bg-neutral-50 hover:mdt-text-neutral-110',
  'dark:hover:mdt-bg-neutral-100 dark:hover:mdt-text-neutral-30',
  'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring',
  'disabled:mdt-pointer-events-none',
];

/** 20px, and one letter rather than two - the size Avatar itself ships. */
const AVATAR_SLOT = 'mdt-inline-flex mdt-h-5 mdt-w-5 mdt-shrink-0 mdt-items-center';

/** 12px, at the icon set's own stroke weight. */
const ICON_SLOT =
  'mdt-inline-flex mdt-h-3 mdt-w-3 mdt-shrink-0 mdt-items-center [&_svg]:mdt-size-3 [&_svg]:mdt-shrink-0';

/**
 * TagPill - a label a person put there and can take away.
 *
 * @example
 * ```tsx
 * <TagPill onRemove={() => drop('production')}>Production</TagPill>
 * <TagPill shape="square" icon={<Icon name="tag" />}>Platform</TagPill>
 * <TagPill avatar={<Avatar name="Nirav Bhatt" size="xs" />}>Nirav Bhatt</TagPill>
 * <TagPill readOnly>Owned by IAM</TagPill>
 * ```
 */
const TagPill = forwardRef<HTMLSpanElement, TagPillProps>(
  (
    {
      shape,
      icon,
      avatar,
      onRemove,
      readOnly = false,
      disabled = false,
      truncate = false,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    // A read-only tag was never yours to remove, so the cross is not merely
    // disabled - it is absent, and nothing about the chip invites a click.
    const removable = onRemove !== undefined && !readOnly;
    const hasAvatar = avatar !== undefined;

    return (
      <span
        ref={ref}
        className={cn(
          tagPillVariants({
            shape,
            hasAvatar,
            removable,
            interactive: removable && !disabled,
            disabled,
            truncate,
          }),
          className
        )}
        data-testid="tag"
        {...rest}
      >
        {hasAvatar ? (
          <span className={AVATAR_SLOT} aria-hidden="true" data-testid="tag-avatar">
            {avatar}
          </span>
        ) : null}
        {/* One leading mark, not two. An avatar wins if both are given. */}
        {!hasAvatar && icon !== undefined ? (
          <span className={ICON_SLOT} aria-hidden="true" data-testid="tag-icon">
            {icon}
          </span>
        ) : null}
        <span className={cn(truncate && 'mdt-truncate')} data-testid="tag-label">
          {children}
        </span>
        {removable ? (
          <button
            type="button"
            onClick={onRemove}
            disabled={disabled}
            className={cn(REMOVE_CLASSES)}
            aria-label="Remove"
            data-testid="tag-remove"
          >
            <Icon name="x" size="xs" aria-hidden />
          </button>
        ) : null}
      </span>
    );
  }
);

TagPill.displayName = 'TagPill';

export { TagPill };
