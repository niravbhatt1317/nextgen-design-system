import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import { Icon } from '@/components/Icon';
import type { CheckboxProps } from './Checkbox.types';

// ============================================================================
// Shared CSS class constants to reduce duplication (SonarJS: no-duplicate-string)
// ============================================================================
const FOCUS_RING_CLASSES =
  'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-2';
const DISABLED_CLASSES = 'disabled:mdt-cursor-not-allowed disabled:mdt-opacity-50';
const CARD_CHECKED_CLASSES =
  'data-[state=checked]:mdt-border-primary data-[state=checked]:mdt-bg-accent';

/**
 * A half-selection looks like a selection unless both of these are set.
 *
 * Radix shows the indicator for `indeterminate` as well as `checked`, so a box
 * that only styles `checked` renders a full tick on an unfilled box - a header
 * checkbox claiming every row is selected when four of eight are. The fill
 * comes from the same pair as `checked`, because it is the same box in a
 * different state, not a third kind of box.
 */
const MARKED_CLASSES =
  'data-[state=checked]:mdt-bg-primary data-[state=checked]:mdt-text-primary-foreground data-[state=indeterminate]:mdt-bg-primary data-[state=indeterminate]:mdt-text-primary-foreground';

/**
 * The indicator carries the group name, so the glyph inside it can read the
 * state Radix puts on it. Swapped in CSS rather than from the `checked` prop:
 * an uncontrolled checkbox never tells the component which state it is in.
 */
const INDICATOR_CLASSES =
  'mdt-group/mark mdt-flex mdt-items-center mdt-justify-center mdt-text-current';
const TICK_CLASSES = 'group-data-[state=indeterminate]/mark:mdt-hidden';
const DASH_CLASSES = 'mdt-hidden group-data-[state=indeterminate]/mark:mdt-block';

/**
 * Checkbox variants using Class Variance Authority (CVA)
 */
export const checkboxVariants = cva([], {
  variants: {
    /**
     * Visual variant of the checkbox
     */
    variant: {
      default: [
        'mdt-peer mdt-h-4 mdt-w-4 mdt-shrink-0 mdt-rounded-sm mdt-border mdt-border-primary',
        // `inline-flex` and `align-middle` are load-bearing, not tidying.
        //
        // A button is `inline-block` sitting on the text baseline by default.
        // The tick indicator only exists while the box is checked, so ticking it
        // added a child, moved the box's baseline, and grew the surrounding line
        // box - a table row measurably jumped 53px to 55px on every click.
        //
        // `align-middle` takes the box off the baseline so its content cannot
        // move it, and `inline-flex` centres the tick so the box's own size
        // never depends on what is inside it.
        'mdt-inline-flex mdt-items-center mdt-justify-center mdt-align-middle',
        'mdt-ring-offset-background',
        FOCUS_RING_CLASSES,
        DISABLED_CLASSES,
        MARKED_CLASSES,
      ],
      card: [
        'mdt-peer mdt-w-full mdt-cursor-pointer mdt-rounded-lg mdt-border-2 mdt-border-input',
        'mdt-p-4 mdt-transition-all',
        'hover:mdt-border-primary hover:mdt-bg-accent',
        FOCUS_RING_CLASSES,
        CARD_CHECKED_CLASSES,
        DISABLED_CLASSES,
      ],
      'card-with-checkbox': [
        'mdt-peer mdt-w-full mdt-cursor-pointer mdt-rounded-lg mdt-border-2 mdt-border-input',
        'mdt-p-4 mdt-transition-all',
        'mdt-flex mdt-items-start mdt-gap-3',
        'hover:mdt-border-primary hover:mdt-bg-accent',
        FOCUS_RING_CLASSES,
        CARD_CHECKED_CLASSES,
        DISABLED_CLASSES,
      ],
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

/**
 * Checkbox component for toggleable selection.
 *
 * @example
 * ```tsx
 * // Default checkbox
 * <Checkbox id="terms" />
 *
 * // Card variant
 * <Checkbox id="feature" variant="card">
 *   <div className="flex items-center justify-between">
 *     <div>
 *       <div className="font-medium">Enable Feature</div>
 *       <div className="text-sm text-muted-foreground">
 *         This will enable the advanced feature.
 *       </div>
 *     </div>
 *   </div>
 * </Checkbox>
 * ```
 */
const Checkbox = forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    if (variant === 'card') {
      return (
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(checkboxVariants({ variant }), className)}
          {...props}
        >
          {children}
        </CheckboxPrimitive.Root>
      );
    }

    if (variant === 'card-with-checkbox') {
      return (
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(checkboxVariants({ variant }), className)}
          {...props}
        >
          <div
            className={cn(
              'mdt-mt-0.5 mdt-flex mdt-h-4 mdt-w-4 mdt-shrink-0 mdt-items-center mdt-justify-center',
              'mdt-rounded-sm mdt-border mdt-border-primary mdt-bg-background',
              MARKED_CLASSES
            )}
          >
            <CheckboxPrimitive.Indicator className={INDICATOR_CLASSES}>
              <Icon name="check" size="xs" aria-hidden className={TICK_CLASSES} />
              <Icon name="minus" size="xs" aria-hidden className={DASH_CLASSES} />
            </CheckboxPrimitive.Indicator>
          </div>
          {children}
        </CheckboxPrimitive.Root>
      );
    }

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(checkboxVariants({ variant }), className)}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={INDICATOR_CLASSES}>
          <Icon name="check" size="sm" aria-hidden className={TICK_CLASSES} />
          <Icon name="minus" size="sm" aria-hidden className={DASH_CLASSES} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
