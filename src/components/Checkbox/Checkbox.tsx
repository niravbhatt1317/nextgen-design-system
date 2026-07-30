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
        'mdt-ring-offset-background',
        FOCUS_RING_CLASSES,
        DISABLED_CLASSES,
        'data-[state=checked]:mdt-bg-primary data-[state=checked]:mdt-text-primary-foreground',
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
          <div className="mdt-mt-0.5 mdt-flex mdt-h-4 mdt-w-4 mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded-sm mdt-border mdt-border-primary mdt-bg-background data-[state=checked]:mdt-bg-primary data-[state=checked]:mdt-text-primary-foreground">
            <CheckboxPrimitive.Indicator
              className={cn('mdt-flex mdt-items-center mdt-justify-center mdt-text-current')}
            >
              <Icon name="check" size="xs" aria-hidden />
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
        <CheckboxPrimitive.Indicator
          className={cn('mdt-flex mdt-items-center mdt-justify-center mdt-text-current')}
        >
          <Icon name="check" size="sm" aria-hidden />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
