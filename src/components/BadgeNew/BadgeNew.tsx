import { forwardRef } from 'react';
import type { CSSProperties } from 'react';
import { cn } from '@/utils';
import type { BadgeNewProps, BadgeNewSize } from './BadgeNew.types';
import './badge-new.css';

/**
 * Badge New — the console's badge as it would ship in the library: the existing
 * Badge's spacing, the console's colours, and no stroke by default. Two shapes,
 * three sizes, a dot or an icon; small is text or dot only. A parallel to
 * `Badge` for review, not exported from the package root yet.
 */

const SIZE: Record<
  BadgeNewSize,
  { box: string; iconOnly: string; dot: string; icon: string | null; removePx: number }
> = {
  sm: {
    box: 'mdt-h-5 mdt-px-2 mdt-gap-1 mdt-text-xs',
    iconOnly: 'mdt-w-5',
    dot: 'mdt-size-1.5',
    icon: null,
    removePx: 0,
  },
  md: {
    box: 'mdt-h-6 mdt-px-2.5 mdt-gap-1.5 mdt-text-xs',
    iconOnly: 'mdt-w-6',
    dot: 'mdt-size-1.5',
    icon: '[&_svg]:mdt-size-3.5',
    removePx: 10,
  },
  lg: {
    box: 'mdt-h-7 mdt-px-3 mdt-gap-1.5 mdt-text-sm',
    iconOnly: 'mdt-w-7',
    dot: 'mdt-size-2',
    icon: '[&_svg]:mdt-size-4',
    removePx: 12,
  },
};

const BASE =
  'bnw mdt-inline-flex mdt-shrink-0 mdt-items-center mdt-justify-center mdt-whitespace-nowrap mdt-font-medium mdt-border mdt-border-solid mdt-transition-colors [&_svg]:mdt-pointer-events-none [&_svg]:mdt-shrink-0';

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

export const BadgeNew = forwardRef<HTMLSpanElement, BadgeNewProps>(function BadgeNew(
  {
    tone = 'neutral',
    emphasis = 'fill',
    shape = 'pill',
    size = 'md',
    dot = false,
    icon,
    palette,
    onRemove,
    removeLabel = 'Remove',
    className,
    style,
    children,
    ...rest
  },
  ref
) {
  const s = SIZE[size];
  const hasLabel = children !== undefined && children !== null && children !== '';
  /* Small is text or dot only: an icon handed to it is dropped, not shrunk. */
  const showIcon = s.icon !== null && icon !== undefined && icon !== null;
  const iconOnly = showIcon && !hasLabel;
  const canRemove = s.removePx > 0 && typeof onRemove === 'function';
  const paletteStyle: CSSProperties | undefined = palette
    ? ({
        '--bnw-fill': palette.fill,
        '--bnw-ink': palette.ink,
        '--bnw-dot': palette.dot ?? palette.ink,
      } as CSSProperties)
    : undefined;

  return (
    <span
      ref={ref}
      data-tone={palette ? 'custom' : tone}
      data-size={size}
      data-shape={shape}
      className={cn(
        BASE,
        `bnw-${tone}`,
        `bnw-${emphasis}`,
        s.box,
        s.icon,
        shape === 'pill' ? 'mdt-rounded-full' : 'mdt-rounded-sm',
        iconOnly && cn(s.iconOnly, 'mdt-px-0'),
        className
      )}
      style={{ ...paletteStyle, ...style }}
      {...rest}
    >
      {dot ? (
        <span className={cn('bnw-dot-el', s.dot)} aria-hidden="true" data-testid="badge-new-dot" />
      ) : null}
      {showIcon ? icon : null}
      {hasLabel ? <span className="bnw-label">{children}</span> : null}
      {canRemove ? (
        <button
          type="button"
          className="bnw-remove"
          aria-label={removeLabel}
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
        >
          <Cross px={s.removePx} />
        </button>
      ) : null}
    </span>
  );
});

BadgeNew.displayName = 'BadgeNew';
