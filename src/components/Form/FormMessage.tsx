import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { FormMessageProps } from './Form.types';

/**
 * FormMessage variants using Class Variance Authority (CVA)
 */
export const formMessageVariants = cva(['mdt-text-xs mdt-font-medium'], {
  variants: {
    /**
     * Text color of the message
     */
    color: {
      default: 'mdt-text-muted-foreground',
      muted: 'mdt-text-muted-foreground',
      destructive: 'mdt-text-destructive',
      // Green 40 in dark mode: the success fill is too deep to read against
      // the dark page. See Icon.tsx for the measurements.
      success: 'mdt-text-success dark:mdt-text-green-40',
      warning: 'mdt-text-warning',
      info: 'mdt-text-info',
      primary: 'mdt-text-primary',
      secondary: 'mdt-text-secondary',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

/**
 * FormMessage component for displaying error messages and helper text.
 *
 * @example
 * ```tsx
 * // Error message (auto-destructive color)
 * <FormMessage error="Email is required" />
 *
 * // Helper text
 * <FormMessage>Enter your email address</FormMessage>
 *
 * // Success message
 * <FormMessage color="success">Email is valid</FormMessage>
 *
 * // Warning message
 * <FormMessage color="warning">Password is weak</FormMessage>
 * ```
 */
const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, error, color, ...props }, ref) => {
    const message = error ?? children;

    if (!message) {
      return null;
    }

    // Auto-set color to destructive when error prop is used
    const effectiveColor = error ? 'destructive' : color;

    return (
      <p
        ref={ref}
        className={cn(formMessageVariants({ color: effectiveColor }), className)}
        role={error ? 'alert' : undefined}
        {...props}
      >
        {message}
      </p>
    );
  }
);

FormMessage.displayName = 'FormMessage';

export { FormMessage };
