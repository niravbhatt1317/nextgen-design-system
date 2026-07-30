import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { FormLabelProps } from './Form.types';

/**
 * FormLabel variants using Class Variance Authority (CVA)
 */
export const formLabelVariants = cva(
  [
    'mdt-text-sm mdt-leading-none',
    'peer-disabled:mdt-cursor-not-allowed peer-disabled:mdt-opacity-70',
  ],
  {
    variants: {
      /**
       * Font weight of the label
       */
      weight: {
        normal: 'mdt-font-normal',
        medium: 'mdt-font-medium',
        semibold: 'mdt-font-semibold',
        bold: 'mdt-font-bold',
      },
      /**
       * Text color of the label
       */
      color: {
        default: 'mdt-text-foreground',
        muted: 'mdt-text-muted-foreground',
        primary: 'mdt-text-primary',
        secondary: 'mdt-text-secondary',
        destructive: 'mdt-text-destructive',
        // Green 40 in dark mode: the success fill is too deep to read against
        // the dark page. See Icon.tsx for the measurements.
        success: 'mdt-text-success dark:mdt-text-green-40',
        warning: 'mdt-text-warning',
        info: 'mdt-text-info',
      },
    },
    defaultVariants: {
      weight: 'normal',
      color: 'default',
    },
  }
);

/**
 * FormLabel component for form field labels with optional required indicator.
 *
 * @example
 * ```tsx
 * // Normal label (default)
 * <FormLabel htmlFor="email">Email Address</FormLabel>
 *
 * // Bold label
 * <FormLabel htmlFor="name" weight="bold">Full Name</FormLabel>
 *
 * // Required label
 * <FormLabel htmlFor="password" required>Password</FormLabel>
 *
 * // Custom color
 * <FormLabel htmlFor="info" color="muted">Optional Field</FormLabel>
 * ```
 */
const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, children, required, weight, color, ...props }, ref) => {
    return (
      <label ref={ref} className={cn(formLabelVariants({ weight, color }), className)} {...props}>
        {children}
        {required && (
          <span className="mdt-ml-1 mdt-text-destructive" aria-label="required">
            *
          </span>
        )}
      </label>
    );
  }
);

FormLabel.displayName = 'FormLabel';

export { FormLabel };
