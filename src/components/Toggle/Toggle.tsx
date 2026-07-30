import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { ToggleProps } from './Toggle.types';

/**
 * Toggle variants using Class Variance Authority (CVA)
 * Provides consistent styling with support for multiple variants and sizes
 */
export const toggleVariants = cva(
  // Base styles applied to all toggles
  [
    'mdt-inline-flex mdt-items-center mdt-justify-center',
    'mdt-rounded-md mdt-font-medium',
    'mdt-transition-colors',
    'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-2',
    'disabled:mdt-pointer-events-none disabled:mdt-opacity-50',
    '[&_svg]:mdt-pointer-events-none [&_svg]:mdt-shrink-0',
  ],
  {
    variants: {
      /**
       * Visual style variant of the toggle
       */
      variant: {
        default:
          'mdt-bg-transparent mdt-text-foreground hover:mdt-bg-muted hover:mdt-text-muted-foreground',
        outline:
          'mdt-border mdt-border-input mdt-bg-transparent mdt-text-foreground hover:mdt-bg-muted hover:mdt-text-muted-foreground',
      },
      /**
       * Size variant of the toggle
       */
      size: {
        sm: 'mdt-h-8 mdt-gap-1 mdt-px-2 mdt-text-xs',
        md: 'mdt-h-9 mdt-gap-2 mdt-px-3 mdt-text-sm',
        lg: 'mdt-h-10 mdt-gap-2 mdt-px-4 mdt-text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Toggle component built on Radix UI Toggle primitive.
 * A two-state button that can be toggled on or off.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Toggle aria-label="Toggle bold">
 *   <BoldIcon />
 * </Toggle>
 *
 * // With text
 * <Toggle>Toggle me</Toggle>
 *
 * // Controlled state
 * <Toggle pressed={isPressed} onPressedChange={setIsPressed}>
 *   Bold
 * </Toggle>
 *
 * // With icon and text
 * <Toggle>
 *   <BoldIcon />
 *   Bold
 * </Toggle>
 * ```
 */
const Toggle = forwardRef<React.ElementRef<typeof TogglePrimitive.Root>, ToggleProps>(
  ({ className, variant, size, ...props }, ref) => (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(
        toggleVariants({ variant, size }),
        'data-[state=on]:mdt-bg-primary data-[state=on]:mdt-text-primary-foreground',
        className
      )}
      {...props}
    />
  )
);

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
