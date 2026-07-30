import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { BadgeProps, BadgeTone } from './Badge.types';

/**
 * Badge styles.
 *
 * One atom covering what the four source systems built as five separate
 * components: the lifecycle status pill (with its dot), the squarer meta chip,
 * count and confidence badges, tinted protocol pills, and icon-only status
 * marks.
 *
 * They shared an anatomy the whole time - [dot or icon] + label, with a
 * meaning, a loudness and a corner radius - so they are switches on one
 * component rather than five components to keep in sync.
 *
 * ## Why the colours are written out per combination
 *
 * Tone and emphasis are not independent: `danger` subtle is a pale red tint
 * with deep red text, while `danger` solid is a filled red chip with white
 * text. No rule derives one from the other, so all eighteen pairings are
 * stated in `compoundVariants`, where each can be read and reviewed on its own.
 *
 * Every pairing was measured against its own background. The lowest in the set
 * is success subtle at 5.94 in light mode, against a 4.5 minimum for text.
 */
export const badgeVariants = cva(
  [
    'mdt-inline-flex mdt-shrink-0 mdt-items-center mdt-justify-center',
    'mdt-whitespace-nowrap mdt-font-medium',
    'mdt-border mdt-border-solid',
    'mdt-transition-colors',
    '[&_svg]:mdt-pointer-events-none [&_svg]:mdt-shrink-0',
  ],
  {
    variants: {
      // Colour lives entirely in compoundVariants below, because it depends on
      // tone AND emphasis together. These entries exist so both are real
      // variants - for typing, and for the catalogue generator to read.
      tone: {
        neutral: '',
        info: '',
        success: '',
        warning: '',
        danger: '',
        ai: '',
      },
      emphasis: {
        subtle: '',
        outline: '',
        solid: '',
      },
      shape: {
        pill: 'mdt-rounded-full',
        square: 'mdt-rounded-sm',
      },
      /**
       * `min-w` matching the height is what makes count badges work without a
       * separate component: "Active" is wider than the minimum so nothing
       * changes, while "3" or "+2" is narrower and rounds out into a circle.
       *
       * The icon step is set here too, so the caller never has to pick a glyph
       * size that suits the chip. A 12px icon left adrift in a 28px chip is
       * exactly what happened while that was the caller's job.
       */
      size: {
        sm: 'mdt-h-5 mdt-min-w-5 mdt-gap-1 mdt-px-2 mdt-text-xs [&_svg]:mdt-size-3',
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
      // ── subtle ── a pale tint with strong text. The default.
      {
        tone: 'neutral',
        emphasis: 'subtle',
        class:
          'mdt-border-neutral-40 mdt-bg-neutral-30 mdt-text-neutral-110 dark:mdt-border-neutral-110 dark:mdt-bg-neutral-120 dark:mdt-text-neutral-30',
      },
      {
        tone: 'info',
        emphasis: 'subtle',
        class:
          'mdt-border-blue-20 mdt-bg-blue-10 mdt-text-blue-80 dark:mdt-border-blue-70 dark:mdt-bg-blue-90 dark:mdt-text-blue-30',
      },
      {
        tone: 'success',
        emphasis: 'subtle',
        class:
          'mdt-border-green-20 mdt-bg-green-10 mdt-text-green-80 dark:mdt-border-green-70 dark:mdt-bg-green-90 dark:mdt-text-green-30',
      },
      // Warning tints with orange 20, not orange 10. Orange at the 10 step
      // reads as a peach smear against white. Avatar and IconTile reached the
      // same conclusion independently, so this is the library's convention.
      {
        tone: 'warning',
        emphasis: 'subtle',
        class:
          'mdt-border-orange-30 mdt-bg-orange-20 mdt-text-orange-80 dark:mdt-border-orange-70 dark:mdt-bg-orange-90 dark:mdt-text-orange-30',
      },
      {
        tone: 'danger',
        emphasis: 'subtle',
        class:
          'mdt-border-red-20 mdt-bg-red-10 mdt-text-red-80 dark:mdt-border-red-70 dark:mdt-bg-red-90 dark:mdt-text-red-30',
      },
      // AI is the one tone that does not sit at the 80 step. Purple's mid steps
      // run lighter than the other hues, so 80 on a purple 10 tint measures
      // 5.37 where 90 measures 7.31. Avatar and IconTile already use 90.
      {
        tone: 'ai',
        emphasis: 'subtle',
        class:
          'mdt-border-purple-20 mdt-bg-purple-10 mdt-text-purple-90 dark:mdt-border-purple-80 dark:mdt-bg-purple-100 dark:mdt-text-purple-30',
      },

      // ── outline ── no fill; the edge and the label carry the tone.
      //
      // `dark:mdt-bg-transparent` is not redundant. The class merger treats
      // `dark:bg-*` and `bg-*` as separate groups, so a plain
      // `mdt-bg-transparent` clears the light fill and leaves any dark one.
      {
        tone: 'neutral',
        emphasis: 'outline',
        class:
          'mdt-border-neutral-110 mdt-bg-transparent mdt-text-neutral-110 dark:mdt-border-neutral-30 dark:mdt-bg-transparent dark:mdt-text-neutral-30',
      },
      {
        tone: 'info',
        emphasis: 'outline',
        class:
          'mdt-border-blue-80 mdt-bg-transparent mdt-text-blue-80 dark:mdt-border-blue-30 dark:mdt-bg-transparent dark:mdt-text-blue-30',
      },
      {
        tone: 'success',
        emphasis: 'outline',
        class:
          'mdt-border-green-80 mdt-bg-transparent mdt-text-green-80 dark:mdt-border-green-30 dark:mdt-bg-transparent dark:mdt-text-green-30',
      },
      {
        tone: 'warning',
        emphasis: 'outline',
        class:
          'mdt-border-orange-80 mdt-bg-transparent mdt-text-orange-80 dark:mdt-border-orange-30 dark:mdt-bg-transparent dark:mdt-text-orange-30',
      },
      {
        tone: 'danger',
        emphasis: 'outline',
        class:
          'mdt-border-red-80 mdt-bg-transparent mdt-text-red-80 dark:mdt-border-red-30 dark:mdt-bg-transparent dark:mdt-text-red-30',
      },
      {
        tone: 'ai',
        emphasis: 'outline',
        class:
          'mdt-border-purple-90 mdt-bg-transparent mdt-text-purple-90 dark:mdt-border-purple-30 dark:mdt-bg-transparent dark:mdt-text-purple-30',
      },

      // ── solid ── counts only. A filled chip whose whole job is to be seen.
      {
        tone: 'neutral',
        emphasis: 'solid',
        class: 'mdt-border-transparent mdt-bg-primary mdt-text-primary-foreground',
      },
      // Info deliberately does NOT use `--mdt-info`. White on that blue
      // measures 3.78, under the 4.5 minimum - a defect in the shared token,
      // logged as its own change. Blue 70 measures 7.31, so this component
      // does not ship a known failure while that is settled.
      {
        tone: 'info',
        emphasis: 'solid',
        class: 'mdt-border-transparent mdt-bg-blue-70 mdt-text-white',
      },
      {
        tone: 'success',
        emphasis: 'solid',
        class: 'mdt-border-transparent mdt-bg-success mdt-text-success-foreground',
      },
      {
        tone: 'warning',
        emphasis: 'solid',
        class: 'mdt-border-transparent mdt-bg-warning mdt-text-warning-foreground',
      },
      {
        tone: 'danger',
        emphasis: 'solid',
        class: 'mdt-border-transparent mdt-bg-destructive mdt-text-destructive-foreground',
      },
      // There is no solid `ai` token, so this points at the ramp directly.
      // White on purple 80 measures 6.45.
      {
        tone: 'ai',
        emphasis: 'solid',
        class: 'mdt-border-transparent mdt-bg-purple-80 mdt-text-white',
      },

      // ── an icon with no label ── drop the side padding so the chip is a true
      // circle or square. These live in compoundVariants because they have to
      // beat the padding the size variant sets, and compounds are applied last.
      { iconOnly: true, size: 'sm', class: 'mdt-w-5 mdt-px-0' },
      { iconOnly: true, size: 'md', class: 'mdt-w-6 mdt-px-0' },
      { iconOnly: true, size: 'lg', class: 'mdt-w-7 mdt-px-0' },
    ],
    defaultVariants: {
      tone: 'neutral',
      emphasis: 'subtle',
      shape: 'pill',
      size: 'md',
      iconOnly: false,
    },
  }
);

/**
 * The dot's colour on a subtle or outline badge.
 *
 * It uses the tone's solid step rather than the label colour, so the dot reads
 * as a status light rather than as a full stop.
 */
const DOT_TONE: Record<BadgeTone, string> = {
  neutral: 'mdt-bg-muted-foreground',
  info: 'mdt-bg-blue-70',
  success: 'mdt-bg-success',
  warning: 'mdt-bg-warning',
  danger: 'mdt-bg-destructive',
  ai: 'mdt-bg-purple-80',
};

/** The dot the four source systems all landed on, independently. */
const DOT_6PX = 'mdt-h-1.5 mdt-w-1.5';
const DOT_8PX = 'mdt-h-2 mdt-w-2';

/** Beside a label, the dot stays 6px until the chip is large. */
const DOT_SIZE = {
  sm: DOT_6PX,
  md: DOT_6PX,
  lg: DOT_8PX,
} as const;

/**
 * A dot on its own, with no chip around it - the unread marker.
 *
 * It steps up at every size rather than holding at 6px, because with no label
 * beside it the dot is the whole control and has to stay findable.
 */
const DOT_ONLY_SIZE = {
  sm: DOT_6PX,
  md: DOT_8PX,
  lg: 'mdt-h-2.5 mdt-w-2.5',
} as const;

/**
 * How wide a truncated label may get before it is cut off. A named constant
 * because the number is a decision, not an accident.
 */
const TRUNCATE_WIDTH = 'mdt-max-w-32';

/**
 * Caps a numeric label so a four-figure count cannot stretch its container.
 *
 * Text written straight into the markup arrives as a string, not a number -
 * `<Badge max={99}>1284</Badge>` and `<Badge max={99}>{1284}</Badge>` look
 * identical to whoever writes them, so both are treated as counts. Anything
 * that is not a number is returned untouched.
 */
function capCount(children: BadgeProps['children'], max: number | undefined) {
  if (max === undefined) return children;
  if (typeof children !== 'number' && typeof children !== 'string') return children;

  const value = Number(children);
  if (!Number.isFinite(value) || value <= max) return children;

  return `${String(max)}+`;
}

/**
 * Badge - a small label that says what something is.
 *
 * @example
 * ```tsx
 * <Badge tone="success" dot>Active</Badge>
 * <Badge tone="info" shape="square">3 users</Badge>
 * <Badge tone="danger" emphasis="solid" max={99}>1284</Badge>
 * <Badge tone="danger" icon={<Icon name="x" />} aria-label="Failed" />
 * <Badge tone="success" dot aria-label="Healthy" />
 * ```
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      tone = 'neutral',
      emphasis = 'subtle',
      shape,
      size = 'md',
      dot = false,
      icon,
      max,
      truncate = false,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const label = capCount(children, max);
    const hasLabel = label !== undefined && label !== null && label !== '';

    // A dot with nothing beside it is the unread marker: no chip, no padding,
    // no border - just the mark.
    if (dot && !hasLabel && icon === undefined) {
      return (
        <span
          ref={ref}
          className={cn(
            'mdt-inline-block mdt-rounded-full',
            DOT_TONE[tone],
            DOT_ONLY_SIZE[size],
            className
          )}
          data-testid="badge-dot"
          {...rest}
        />
      );
    }

    const iconOnly = icon !== undefined && !hasLabel;

    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({ tone, emphasis, shape, size, iconOnly }),
          truncate && TRUNCATE_WIDTH,
          className
        )}
        // Before the spread, so a caller can still supply their own.
        data-testid="badge"
        {...rest}
      >
        {dot ? (
          <span
            className={cn(
              'mdt-rounded-full',
              // On a filled chip the tone colour would disappear into the fill,
              // so the dot borrows the label colour instead.
              emphasis === 'solid' ? 'mdt-bg-current' : DOT_TONE[tone],
              DOT_SIZE[size]
            )}
            // The dot repeats what the label already says, so announcing it
            // would just be noise for a screen reader.
            aria-hidden="true"
            data-testid="badge-dot"
          />
        ) : null}
        {icon}
        {hasLabel ? (
          <span className={cn(truncate && 'mdt-truncate')} data-testid="badge-label">
            {label}
          </span>
        ) : null}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
