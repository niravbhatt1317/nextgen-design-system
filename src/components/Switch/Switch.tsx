import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { MotadataSwitchProps } from './Switch.types';

/**
 * Switch root variants using Class Variance Authority (CVA)
 */
export const motadataSwitchRootVariants = cva(
  [
    'mdt-group',
    'mdt-peer',
    'mdt-inline-flex',
    'mdt-shrink-0',
    'mdt-cursor-pointer',
    'mdt-items-center',
    'mdt-rounded-full',
    'mdt-border-2',
    'mdt-border-transparent',
    'mdt-transition-colors',
    'focus-visible:mdt-outline-none',
    'focus-visible:mdt-ring-2',
    'focus-visible:mdt-ring-ring',
    'focus-visible:mdt-ring-offset-2',
    'focus-visible:mdt-ring-offset-background',
    'disabled:mdt-cursor-not-allowed',
    'disabled:mdt-opacity-50',
    'data-[state=checked]:mdt-bg-primary',
    'data-[state=unchecked]:mdt-bg-input',
  ],
  {
    variants: {
      size: {
        sm: 'mdt-h-5 mdt-w-9',
        md: 'mdt-h-6 mdt-w-11',
        lg: 'mdt-h-7 mdt-w-14',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/**
 * Switch thumb variants using Class Variance Authority (CVA)
 */
export const motadataSwitchThumbVariants = cva(
  [
    'mdt-pointer-events-none',
    'mdt-block',
    'mdt-rounded-full',
    'mdt-bg-background',
    'mdt-shadow-lg',
    'mdt-ring-0',
    'mdt-transition-transform',
    'data-[state=unchecked]:mdt-translate-x-0',
  ],
  {
    variants: {
      size: {
        sm: 'mdt-h-4 mdt-w-4 data-[state=checked]:mdt-translate-x-4',
        md: 'mdt-h-5 mdt-w-5 data-[state=checked]:mdt-translate-x-5',
        lg: 'mdt-h-6 mdt-w-6 data-[state=checked]:mdt-translate-x-7',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/**
 * MotadataSwitch component - A toggle switch control.
 *
 * Built on top of Radix UI Switch for accessibility and keyboard navigation.
 *
 * @example
 * ```tsx
 * // Basic switch
 * <MotadataSwitch />
 *
 * // Controlled switch
 * <MotadataSwitch checked={isEnabled} onCheckedChange={setIsEnabled} />
 *
 * // Different sizes
 * <MotadataSwitch size="sm" />
 * <MotadataSwitch size="md" />
 * <MotadataSwitch size="lg" />
 *
 * // Disabled switch
 * <MotadataSwitch disabled />
 *
 * // With label
 * <label className="flex items-center gap-2">
 *   <MotadataSwitch />
 *   <span>Enable notifications</span>
 * </label>
 * ```
 */
const MotadataSwitch = forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  MotadataSwitchProps
>(({ className, size, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(motadataSwitchRootVariants({ size }), className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className={cn(motadataSwitchThumbVariants({ size }))} />
  </SwitchPrimitives.Root>
));

MotadataSwitch.displayName = 'MotadataSwitch';

export { MotadataSwitch };
