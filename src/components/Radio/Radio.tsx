import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { RadioGroupProps, RadioGroupItemProps } from './Radio.types';

// ============================================================================
// Shared CSS class constants to reduce duplication (SonarJS: no-duplicate-string)
// ============================================================================
const FOCUS_RING_CLASSES =
  'focus:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-2';
const DISABLED_CLASSES = 'disabled:mdt-cursor-not-allowed disabled:mdt-opacity-50';
const CARD_CHECKED_CLASSES =
  'data-[state=checked]:mdt-border-primary data-[state=checked]:mdt-bg-accent';

/**
 * RadioGroup component for managing a group of radio buttons.
 *
 * @example
 * ```tsx
 * <RadioGroup defaultValue="option1">
 *   <RadioGroupItem value="option1" id="r1">
 *     Option 1
 *   </RadioGroupItem>
 *   <RadioGroupItem value="option2" id="r2">
 *     Option 2
 *   </RadioGroupItem>
 * </RadioGroup>
 * ```
 */
const RadioGroup = forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Root
        className={cn('mdt-grid mdt-gap-2', className)}
        {...props}
        ref={ref}
      />
    );
  }
);
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

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
 * ```
 */
const RadioGroupItem = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, variant = 'default', children, ...props }, ref) => {
  if (variant === 'card') {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(radioGroupItemVariants({ variant }), className)}
        {...props}
      >
        {children}
      </RadioGroupPrimitive.Item>
    );
  }

  if (variant === 'card-with-radio') {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(radioGroupItemVariants({ variant }), className)}
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
      className={cn(radioGroupItemVariants({ variant }), className)}
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
