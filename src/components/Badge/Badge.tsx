import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import type { CSSProperties } from 'react';
import { cn } from '@/utils';
import type { BadgeProps, BadgeSize } from './Badge.types';
import './badge.css';

/**
 * Badge styles.
 *
 * One component for the status pill with its dot, the squarer tag, counts,
 * category chips, filter chips with a ×, and the unread marker. Ported from
 * the merged console on 4 September 2026: the previous Badge's spacing, the
 * console's colours, and no stroke by default.
 *
 * Colour is not written here. Each tone class in `badge.css` sets three
 * variables (fill, ink, dot) and each emphasis class reads them, so a tone is
 * one block to review and a category colour is three values passed in.
 */
export const badgeVariants = cva(
  [
    'bdg mdt-inline-flex mdt-shrink-0 mdt-items-center mdt-justify-center',
    'mdt-whitespace-nowrap mdt-font-medium',
    'mdt-border mdt-border-solid',
    'mdt-transition-colors',
    '[&_svg]:mdt-pointer-events-none [&_svg]:mdt-shrink-0',
  ],
  {
    variants: {
      tone: {
        neutral: 'bdg-neutral',
        slate: 'bdg-slate',
        success: 'bdg-success',
        warning: 'bdg-warning',
        danger: 'bdg-danger',
        info: 'bdg-info',
        ai: 'bdg-ai',
        inverse: 'bdg-inverse',
      },
      emphasis: {
        fill: 'bdg-fill',
        outline: 'bdg-outline',
        solid: 'bdg-solid',
      },
      shape: {
        pill: 'mdt-rounded-full',
        square: 'mdt-rounded-sm',
      },
      /**
       * `min-w` matching the height is what makes count badges work: "Active"
       * is wider than the minimum so nothing changes, while "3" rounds out
       * into a circle. The icon step is set here too, so the caller never has
       * to pick a glyph size. Small sets none: it is text or dot only.
       */
      size: {
        sm: 'mdt-h-5 mdt-min-w-5 mdt-gap-1 mdt-px-2 mdt-text-xs',
        md: 'mdt-h-6 mdt-min-w-6 mdt-gap-1.5 mdt-px-2.5 mdt-text-xs [&_svg]:mdt-size-3.5',
        lg: 'mdt-h-7 mdt-min-w-7 mdt-gap-1.5 mdt-px-3 mdt-text-sm [&_svg]:mdt-size-4',
      },
      /** Set by the component when there is an icon but no label. */
      iconOnly: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // An icon with no label: drop the side padding so the chip is a true
      // circle or square. Compounds apply last, so these beat the size padding.
      { iconOnly: true, size: 'md', class: 'mdt-w-6 mdt-px-0' },
      { iconOnly: true, size: 'lg', class: 'mdt-w-7 mdt-px-0' },
    ],
    defaultVariants: {
      tone: 'neutral',
      emphasis: 'fill',
      shape: 'pill',
      size: 'md',
      iconOnly: false,
    },
  }
);

/** The dot the four source systems all landed on, independently. */
const DOT_6PX = 'mdt-size-1.5';
const DOT_8PX = 'mdt-size-2';

/** Beside a label the dot stays 6px until the chip is large. */
const DOT_SIZE: Record<BadgeSize, string> = {
  sm: DOT_6PX,
  md: DOT_6PX,
  lg: DOT_8PX,
};

/** A dot on its own steps up at every size: with no label it is the whole control. */
const DOT_ONLY_SIZE: Record<BadgeSize, string> = {
  sm: DOT_6PX,
  md: DOT_8PX,
  lg: 'mdt-size-2.5',
};

/** The × on a removable chip. Small has none. */
const REMOVE_PX: Record<BadgeSize, number> = { sm: 0, md: 10, lg: 12 };

/** How wide a truncated label may get before it is cut off. */
const TRUNCATE_WIDTH = 'mdt-max-w-32';

/**
 * Caps a numeric label so a four-figure count cannot stretch its container.
 * Text written straight into the markup arrives as a string, so both a number
 * and a numeric string are treated as counts. Anything else is returned as is.
 */
function capCount(children: BadgeProps['children'], max: number | undefined) {
  if (max === undefined) return children;
  if (typeof children !== 'number' && typeof children !== 'string') return children;

  const value = Number(children);
  if (!Number.isFinite(value) || value <= max) return children;

  return `${String(max)}+`;
}

/* The × is drawn inline so it holds its exact size; the Icon wrapper snaps to its own steps. */
function Cross({ px }: { px: number }) {
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

/**
 * Badge - a small label that says what something is.
 *
 * @example
 * ```tsx
 * <Badge tone="success" dot>Active</Badge>
 * <Badge tone="info" shape="square">3 users</Badge>
 * <Badge tone="danger" emphasis="solid" size="sm" max={99}>1284</Badge>
 * <Badge shape="square" palette={{ fill: '#F2F3FD', ink: '#4F5BC4' }}>LDAP</Badge>
 * <Badge shape="square" onRemove={clear}>Status: Active</Badge>
 * <Badge tone="success" dot aria-label="Online" />
 * ```
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    tone = 'neutral',
    emphasis = 'fill',
    shape = 'pill',
    size = 'md',
    dot = false,
    icon,
    palette,
    max,
    truncate = false,
    onRemove,
    removeLabel = 'Remove',
    className,
    style,
    children,
    ...rest
  },
  ref
) {
  const label = capCount(children, max);
  const hasLabel = label !== undefined && label !== null && label !== '';
  /* Small is text or dot only: an icon handed to it is dropped, not shrunk. */
  const showIcon = size !== 'sm' && icon !== undefined && icon !== null;
  const paletteStyle: CSSProperties | undefined = palette
    ? ({
        '--bdg-fill': palette.fill,
        '--bdg-ink': palette.ink,
        '--bdg-dot': palette.dot ?? palette.ink,
      } as CSSProperties)
    : undefined;

  // A dot with nothing beside it is the unread marker: no chip, no padding,
  // no border - just the mark.
  if (dot && !hasLabel && !showIcon) {
    return (
      <span
        ref={ref}
        className={cn('bdg-mark', `bdg-${tone}`, DOT_ONLY_SIZE[size], className)}
        style={{ ...paletteStyle, ...style }}
        data-tone={palette ? 'custom' : tone}
        data-size={size}
        data-testid="badge-dot"
        {...rest}
      />
    );
  }

  const iconOnly = showIcon && !hasLabel;
  const canRemove = size !== 'sm' && typeof onRemove === 'function';

  return (
    <span
      ref={ref}
      data-tone={palette ? 'custom' : tone}
      data-size={size}
      data-shape={shape}
      className={cn(
        badgeVariants({ tone, emphasis, shape, size, iconOnly }),
        truncate && TRUNCATE_WIDTH,
        className
      )}
      style={{ ...paletteStyle, ...style }}
      // Before the spread, so a caller can still supply their own.
      data-testid="badge"
      {...rest}
    >
      {dot ? (
        <span
          className={cn('bdg-dot', DOT_SIZE[size])}
          aria-hidden="true"
          data-testid="badge-dot"
        />
      ) : null}
      {showIcon ? icon : null}
      {hasLabel ? (
        <span
          className={cn('bdg-label', truncate && 'mdt-min-w-0 mdt-truncate')}
          data-testid="badge-label"
        >
          {label}
        </span>
      ) : null}
      {canRemove ? (
        <button
          type="button"
          className="bdg-remove"
          aria-label={removeLabel}
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
        >
          <Cross px={REMOVE_PX[size]} />
        </button>
      ) : null}
    </span>
  );
});

Badge.displayName = 'Badge';

export { Badge };
