import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { SpinnerProps } from './Spinner.types';

/**
 * Spinner variants using Class Variance Authority (CVA)
 */
export const spinnerVariants = cva(
  // Base styles
  ['mdt-inline-block', 'mdt-animate-spin'],
  {
    variants: {
      /**
       * Visual color variant of the spinner
       */
      variant: {
        default: 'mdt-text-primary',
        primary: 'mdt-text-primary',
        secondary: 'mdt-text-muted-foreground',
        success: 'mdt-text-green-50',
        destructive: 'mdt-text-destructive',
      },
      /**
       * Size variant of the spinner
       */
      size: {
        sm: 'mdt-h-4 mdt-w-4',
        md: 'mdt-h-6 mdt-w-6',
        lg: 'mdt-h-8 mdt-w-8',
        xl: 'mdt-h-12 mdt-w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Spinner - Loading indicator component
 *
 * A versatile spinner component for indicating loading states with the following features:
 * - Multiple color variants (default, primary, secondary, accent)
 * - Multiple size variants (sm, md, lg)
 * - CSS animation-based spinning
 * - SVG-based for crisp rendering at all sizes
 * - Accessible with proper ARIA attributes
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Spinner />
 *
 * // With variant and size
 * <Spinner variant="primary" size="lg" />
 *
 * // With custom label
 * <Spinner aria-label="Loading data..." />
 * ```
 */
const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        className={cn(spinnerVariants({ variant, size }), className)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-label="Loading"
        aria-live="polite"
        aria-busy="true"
        {...props}
      >
        <circle
          className="mdt-opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="mdt-opacity-100"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );
  }
);

Spinner.displayName = 'Spinner';

export { Spinner };
