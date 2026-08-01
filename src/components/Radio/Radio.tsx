import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva } from 'class-variance-authority';
import { createContext, forwardRef, useContext, useMemo } from 'react';
import { cn } from '@/utils';
import type {
  RadioGroupContextValue,
  RadioGroupProps,
  RadioGroupItemProps,
  RadioSize,
} from './Radio.types';

// ============================================================================
// Shared CSS class constants to reduce duplication (SonarJS: no-duplicate-string)
// ============================================================================
const FOCUS_RING_CLASSES =
  'focus:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-2';
const DISABLED_CLASSES = 'disabled:mdt-cursor-not-allowed disabled:mdt-opacity-50';
const CARD_CHECKED_CLASSES =
  'data-[state=checked]:mdt-border-primary data-[state=checked]:mdt-bg-accent';

/**
 * Size and layout travel from the group to its items, so a caller sets them
 * once. An item may still override its own size; nothing here stops it.
 */
const RadioGroupContext = createContext<RadioGroupContextValue>({
  variant: 'default',
  size: 'md',
  fullWidth: false,
});

/**
 * The strip that holds a segmented group.
 *
 * ## One strip, not chips in a tray
 *
 * The segments are butted edge to edge and share their dividing lines. One
 * border goes round the whole thing and only the two ends are rounded - so
 * there is no padding, no gap, and nothing behind it. **The joint is the
 * shape.** A tinted tray with pills floating inside it is `ToggleGroup`, which
 * is a different control for a different job.
 *
 * `overflow-hidden` is what lets the end segments take the strip's corners
 * without each carrying a radius of its own, and it is why focus is drawn
 * *inside* the segment rather than around it.
 */
export const radioGroupVariants = cva('', {
  variants: {
    variant: {
      default: 'mdt-grid mdt-gap-2',
      segmented: [
        'mdt-inline-flex mdt-max-w-full mdt-overflow-hidden',
        'mdt-rounded-md mdt-border mdt-border-input mdt-bg-background',
        // the shared line: every segment but the first draws its own left edge
        '[&>*:not(:first-child)]:mdt-border-l [&>*:not(:first-child)]:mdt-border-input',
      ],
    },
    fullWidth: { true: '', false: '' },
  },
  compoundVariants: [
    // Equal columns, and the strip lines up with the fields above and below it.
    // A strip that stops short of the input over it looks like a mistake.
    { variant: 'segmented', fullWidth: true, class: 'mdt-flex mdt-w-full' },
    // `inline-flex` is not enough on its own. Put the strip in a flex column -
    // which is how a field sits under its label - and it stretches to the
    // column anyway, leaving an empty tail of border past the last segment.
    // A width of its own is what stops that.
    { variant: 'segmented', fullWidth: false, class: 'mdt-w-fit' },
  ],
  defaultVariants: { variant: 'default', fullWidth: false },
});

/**
 * RadioGroup component for managing a group of radio buttons.
 *
 * @example
 * ```tsx
 * <RadioGroup defaultValue="option1">
 *   <RadioGroupItem value="option1" id="r1">
 *     Option 1
 *   </RadioGroupItem>
 * </RadioGroup>
 *
 * // As a segmented strip
 * <RadioGroup variant="segmented" defaultValue="medium">
 *   <RadioGroupItem value="low">Low</RadioGroupItem>
 *   <RadioGroupItem value="medium">Medium</RadioGroupItem>
 *   <RadioGroupItem value="high">High</RadioGroupItem>
 * </RadioGroup>
 * ```
 */
const RadioGroup = forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(
  ({ className, variant = 'default', size = 'md', fullWidth = false, ...props }, ref) => {
    const context = useMemo<RadioGroupContextValue>(
      () => ({ variant, size, fullWidth }),
      [variant, size, fullWidth]
    );

    return (
      <RadioGroupContext.Provider value={context}>
        <RadioGroupPrimitive.Root
          className={cn(radioGroupVariants({ variant, fullWidth }), className)}
          {...props}
          ref={ref}
        />
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const SEGMENT_SIZES: Record<RadioSize, string> = {
  sm: 'mdt-h-8 mdt-px-3 mdt-text-[13px]',
  md: 'mdt-h-9 mdt-px-3.5 mdt-text-sm',
};

/**
 * Radio item variants using Class Variance Authority (CVA)
 */
export const radioGroupItemVariants = cva([], {
  variants: {
    /**
     * Visual variant of the radio item
     */
    variant: {
      default: [
        'mdt-aspect-square mdt-h-4 mdt-w-4 mdt-rounded-full mdt-border mdt-border-primary',
        'mdt-text-primary mdt-ring-offset-background',
        FOCUS_RING_CLASSES,
        DISABLED_CLASSES,
      ],
      card: [
        'mdt-w-full mdt-cursor-pointer mdt-rounded-lg mdt-border-2 mdt-border-input',
        'mdt-p-4 mdt-transition-all',
        'hover:mdt-border-primary hover:mdt-bg-accent',
        FOCUS_RING_CLASSES,
        CARD_CHECKED_CLASSES,
        DISABLED_CLASSES,
      ],
      'card-with-radio': [
        'mdt-w-full mdt-cursor-pointer mdt-rounded-lg mdt-border-2 mdt-border-input',
        'mdt-p-4 mdt-transition-all',
        'mdt-flex mdt-items-start mdt-gap-3',
        'hover:mdt-border-primary hover:mdt-bg-accent',
        FOCUS_RING_CLASSES,
        CARD_CHECKED_CLASSES,
        DISABLED_CLASSES,
      ],
      // ── one segment of the strip ──
      //
      // No circle. The chosen one is marked by a tint and a heavier word, which
      // is quiet enough to sit at the same volume as the rest of the form -
      // three of these on one screen do not start shouting at each other.
      //
      // The ring is drawn INSIDE the segment. The strip clips its own overflow,
      // so a ring with an offset would be cut off exactly where it matters.
      segmented: [
        'mdt-inline-flex mdt-items-center mdt-justify-center mdt-gap-2',
        'mdt-whitespace-nowrap mdt-font-medium mdt-text-muted-foreground',
        'mdt-cursor-pointer mdt-transition-colors',
        'hover:mdt-bg-secondary hover:mdt-text-foreground',
        'data-[state=checked]:mdt-bg-secondary',
        'data-[state=checked]:mdt-font-semibold data-[state=checked]:mdt-text-foreground',
        'focus:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-inset focus-visible:mdt-ring-ring',
        'disabled:mdt-cursor-not-allowed disabled:mdt-opacity-50 disabled:hover:mdt-bg-transparent',
        '[&_svg]:mdt-size-4 [&_svg]:mdt-shrink-0',
      ],
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

/**
 * RadioGroupItem component for individual radio button items.
 *
 * @example
 * ```tsx
 * // Default radio
 * <RadioGroupItem value="option1" id="r1" />
 *
 * // Card variant
 * <RadioGroupItem value="option1" id="r1" variant="card">
 *   <div className="flex items-center justify-between">
 *     <div>
 *       <div className="font-medium">Option 1</div>
 *       <div className="text-sm text-muted-foreground">Description</div>
 *     </div>
 *   </div>
 * </RadioGroupItem>
 *
 * // One segment of a segmented group
 * <RadioGroupItem value="low">Low</RadioGroupItem>
 * ```
 */
const RadioGroupItem = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, variant, size, children, ...props }, ref) => {
  const group = useContext(RadioGroupContext);
  // The group decides unless the item says otherwise, so a segmented strip is
  // written once at the top rather than repeated on every segment.
  const resolved = variant ?? (group.variant === 'segmented' ? 'segmented' : 'default');

  if (resolved === 'segmented') {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        data-slot="radio-segment"
        className={cn(
          radioGroupItemVariants({ variant: 'segmented' }),
          SEGMENT_SIZES[size ?? group.size],
          // Equal columns. `min-w-0` is what lets a long label give way rather
          // than pushing the strip wider than the column it sits in.
          group.fullWidth && 'mdt-min-w-0 mdt-flex-1',
          className
        )}
        {...props}
      >
        {group.fullWidth ? <span className="mdt-truncate">{children}</span> : children}
      </RadioGroupPrimitive.Item>
    );
  }

  if (resolved === 'card') {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(radioGroupItemVariants({ variant: resolved }), className)}
        {...props}
      >
        {children}
      </RadioGroupPrimitive.Item>
    );
  }

  if (resolved === 'card-with-radio') {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(radioGroupItemVariants({ variant: resolved }), className)}
        {...props}
      >
        <div className="mdt-mt-0.5 mdt-flex mdt-h-4 mdt-w-4 mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded-full mdt-border mdt-border-primary mdt-text-primary">
          <RadioGroupPrimitive.Indicator className="mdt-flex mdt-items-center mdt-justify-center">
            <div className="mdt-h-2 mdt-w-2 mdt-rounded-full mdt-bg-primary" />
          </RadioGroupPrimitive.Indicator>
        </div>
        {children}
      </RadioGroupPrimitive.Item>
    );
  }

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioGroupItemVariants({ variant: resolved }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="mdt-flex mdt-items-center mdt-justify-center">
        <div className="mdt-h-2.5 mdt-w-2.5 mdt-rounded-full mdt-bg-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
