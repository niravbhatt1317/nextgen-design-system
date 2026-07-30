import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { FormDescriptionProps } from './Form.types';

/**
 * FormDescription variants using Class Variance Authority (CVA)
 */
export const formDescriptionVariants = cva(['mdt-text-sm'], {
  variants: {
    /**
     * Text color of the description
     */
    color: {
      default: 'mdt-text-muted-foreground',
      muted: 'mdt-text-muted-foreground',
      foreground: 'mdt-text-foreground',
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
    color: 'default',
  },
});

/**
 * FormDescription component for displaying descriptive text for form fields.
 *
 * @example
 * ```tsx
 * // Default description
 * <FormDescription>
 *   This is your public display name.
 * </FormDescription>
 *
 * // Info description
 * <FormDescription color="info">
 *   Your password must be at least 8 characters.
 * </FormDescription>
 *
 * // Warning description
 * <FormDescription color="warning">
 *   This action cannot be undone.
 * </FormDescription>
 * ```
 */
const FormDescription = forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, children, color, ...props }, ref) => {
    return (
      <p ref={ref} className={cn(formDescriptionVariants({ color }), className)} {...props}>
        {children}
      </p>
    );
  }
);

FormDescription.displayName = 'FormDescription';

export { FormDescription };
