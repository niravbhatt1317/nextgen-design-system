import { cva } from 'class-variance-authority';
import { forwardRef, useId } from 'react';
import { cn } from '@/utils';
import type { InputProps } from './Input.types';

/**
 * Input variants using Class Variance Authority (CVA)
 * Provides consistent styling with support for multiple sizes and states
 */
export const InputVariants = cva(
  // Base styles applied to all inputs
  [
    'mdt-flex mdt-w-full mdt-rounded-md mdt-border mdt-border-input',
    'mdt-bg-background mdt-text-foreground',
    'mdt-transition-colors',
    'file:mdt-border-0 file:mdt-bg-transparent file:mdt-text-sm file:mdt-font-medium',
    'placeholder:mdt-text-muted-foreground',
    'focus-visible:mdt-outline-none',
    'disabled:mdt-cursor-not-allowed disabled:mdt-opacity-50',
  ],
  {
    variants: {
      /**
       * Size variant of the input
       */
      size: {
        sm: 'mdt-h-8 mdt-px-3 mdt-text-xs',
        md: 'mdt-h-9 mdt-px-3 mdt-text-sm',
        lg: 'mdt-h-10 mdt-px-4 mdt-text-base',
      },
      /**
       * Whether the input is in an error state
       */
      hasError: {
        true: 'mdt-border-destructive',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      hasError: false,
    },
  }
);

/**
 * Input component with support for labels, error states, and adornments.
 *
 * @example
 * ```tsx
 * // Basic input
 * <Input placeholder="Enter your email" />
 *
 * // With label and error
 * <Input
 *   label="Email"
 *   error="Invalid email address"
 *   placeholder="Enter your email"
 * />
 *
 * // With adornments
 * <Input
 *   startAdornment={<IconSearch />}
 *   placeholder="Search..."
 * />
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      size,
      error,
      label,
      helperText,
      startAdornment,
      endAdornment,
      id: propId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = propId ?? generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const hasError = Boolean(error);

    // Determine aria-describedby value
    let describedBy: string | undefined;
    if (hasError) {
      describedBy = errorId;
    } else if (helperText) {
      describedBy = helperId;
    }

    return (
      <div className={cn('mdt-flex mdt-flex-col mdt-gap-1.5', wrapperClassName)}>
        {label && (
          <label htmlFor={id} className="mdt-text-sm mdt-font-medium mdt-text-foreground">
            {label}
          </label>
        )}
        <div className="mdt-relative mdt-flex mdt-items-center">
          {startAdornment && (
            <div className="mdt-absolute mdt-left-3 mdt-flex mdt-items-center mdt-text-muted-foreground">
              {startAdornment}
            </div>
          )}
          <input
            id={id}
            ref={ref}
            className={cn(
              InputVariants({ size, hasError }),
              startAdornment && 'mdt-pl-10',
              endAdornment && 'mdt-pr-10',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            {...props}
          />
          {endAdornment && (
            <div className="mdt-absolute mdt-right-3 mdt-flex mdt-items-center mdt-text-muted-foreground">
              {endAdornment}
            </div>
          )}
        </div>
        {error && (
          <p id={errorId} className="mdt-text-xs mdt-text-destructive" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="mdt-text-xs mdt-text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
