import { cva } from 'class-variance-authority';
import { forwardRef, useId } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type { InputProps } from './Input.types';

/**
 * Input variants using Class Variance Authority (CVA)
 * Provides consistent styling with support for multiple sizes and states
 */
export const InputVariants = cva(
  // Base styles applied to all inputs
  [
    /* the same edge as the outline Button and the Toolbar's controls
     * (neutral-30) - the toolbar used to force this on any input inside it,
     * and an Input anywhere else came out darker (--mdt-input, neutral-40) */
    /* THE FIELD (Pranjal, 2026-09-17): corners 8, the typed value in neutral-90, the placeholder in neutral-70; under
     * the pointer the border is the primary colour; focused, the same border with a 3-px halo of it; disabled sits on
     * neutral-10 in the placeholder colour, not dimmed. */
    'mdt-flex mdt-w-full mdt-rounded-lg mdt-border mdt-border-neutral-30 dark:mdt-border-neutral-110',
    'mdt-bg-background mdt-text-neutral-90',
    'mdt-transition-[border-color,box-shadow]',
    'file:mdt-border-0 file:mdt-bg-transparent file:mdt-text-sm file:mdt-font-medium',
    'placeholder:mdt-text-neutral-70',
    'hover:mdt-border-primary',
    'focus:mdt-border-primary focus-visible:mdt-outline-none ' +
      'focus:mdt-shadow-[0_0_0_3px_hsl(var(--mdt-primary)/0.08)]',
    'disabled:mdt-cursor-not-allowed disabled:mdt-bg-neutral-10 disabled:mdt-text-neutral-70 disabled:hover:mdt-border-neutral-30',
  ],
  {
    variants: {
      /**
       * Size variant of the input
       */
      size: {
        /* the field's text is 13 (Pranjal, 2026-09-17) - text-xs is 12 */
        sm: 'mdt-h-8 mdt-px-3 mdt-text-[13px]',
        md: 'mdt-h-9 mdt-px-3 mdt-text-sm',
        lg: 'mdt-h-10 mdt-px-4 mdt-text-base',
      },
      /**
       * Whether the input is in an error state
       */
      hasError: {
        true:
          'mdt-border-destructive hover:mdt-border-destructive focus:mdt-border-destructive ' +
          'focus:mdt-shadow-[0_0_0_3px_hsl(var(--mdt-destructive)/0.14)]',
        false: '',
      },
    },
    defaultVariants: {
      /* 32 high is the field (Pranjal, 2026-09-17); md and lg stay for the places that ask */
      size: 'sm',
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
 *
 * // A held field: disabled, the lock inside at the right
 * <Input label="Email" value="emily.davis@company.com" locked readOnly />
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
      locked,
      disabled,
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
    /* A HELD FIELD (Pranjal, 2026-09-17): disabled, the lock inside at the right, the value truncating before it */
    const held = Boolean(locked);

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
          <label htmlFor={id} className="mdt-text-[13px] mdt-text-neutral-90">
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
              /* 12 to the glyph, 6 to the text, 12 at the right (Pranjal, 2026-09-17) */
              startAdornment && 'mdt-pl-8',
              endAdornment && 'mdt-pr-8',
              /* held: the text stops 34 short of the edge (12 + the 14 lock + 8) and ends in an ellipsis */
              held && 'mdt-text-ellipsis mdt-pr-[34px]',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            disabled={held || disabled}
            {...props}
          />
          {held ? (
            <div className="mdt-absolute mdt-right-3 mdt-flex mdt-items-center mdt-text-neutral-70">
              <Icon name="lock" size={14} aria-hidden />
            </div>
          ) : (
            endAdornment && (
              <div className="mdt-absolute mdt-right-3 mdt-flex mdt-items-center mdt-text-muted-foreground">
                {endAdornment}
              </div>
            )
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
