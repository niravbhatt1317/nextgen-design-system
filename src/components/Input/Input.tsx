import { cva } from 'class-variance-authority';
import { forwardRef, useId, useRef } from 'react';
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
    /* THE FIELD (Pranjal, 2026-09-17; the value's ink 2026-09-27): corners 8, the typed value in the reading ink (neutral-130, 14/500 - the same as a picked Select value), the placeholder in the faint ink at 400; under
     * the pointer the border is the primary colour; focused, the same border with a 3-px halo of it; disabled sits on
     * neutral-10 in the placeholder colour, not dimmed. */
    'mdt-flex mdt-w-full mdt-rounded-lg mdt-border mdt-border-neutral-30',
    'mdt-bg-background mdt-font-medium mdt-text-neutral-130',
    'mdt-transition-[border-color,box-shadow]',
    'file:mdt-border-0 file:mdt-bg-transparent file:mdt-text-sm file:mdt-font-medium',
    'placeholder:mdt-font-normal placeholder:mdt-text-faint',
    'hover:mdt-border-primary',
    'focus:mdt-border-primary focus-visible:mdt-outline-none ' +
      'focus:mdt-shadow-[0_0_0_3px_hsl(var(--mdt-primary)/0.08)]',
    'disabled:mdt-cursor-not-allowed disabled:mdt-bg-neutral-10 disabled:mdt-text-faint disabled:hover:mdt-border-neutral-30',
  ],
  {
    variants: {
      /**
       * Size variant of the input
       */
      size: {
        /* the field's text is 13 (Pranjal, 2026-09-17) - text-xs is 12 */
        sm: 'mdt-h-8 mdt-px-3 mdt-text-sm',
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
      onClear,
      clearLabel = 'Clear',
      disabled,
      required,
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
    /* the ✕ shows only while there is something to clear, and never on a held or disabled field */
    const own = useRef<HTMLInputElement | null>(null);
    const clearable = Boolean(onClear) && !held && !disabled && String(props.value ?? '') !== '';
    const setRef = (el: HTMLInputElement | null) => {
      own.current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) ref.current = el;
    };

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
            {/* the asterisk in the danger red (K-Field-05), 3 after the label as the console draws it (measured 2026-09-22) */}
            {required && <span className="mdt-ml-[3px] mdt-text-destructive">*</span>}
          </label>
        )}
        <div className="mdt-group mdt-relative mdt-flex mdt-items-center">
          {/* a glyph is 14 at 12 from the edge, in the faint ink at rest and neutral-90 under the pointer or while
           * focused (the mock's search row); the text starts 32 in */}
          {startAdornment && (
            <div className="mdt-absolute mdt-left-3 mdt-flex mdt-items-center mdt-text-faint group-focus-within:mdt-text-neutral-90 group-hover:mdt-text-neutral-90">
              {startAdornment}
            </div>
          )}
          <input
            id={id}
            ref={setRef}
            className={cn(
              InputVariants({ size, hasError }),
              /* 12 to the glyph, 6 to the text, 12 at the right (Pranjal, 2026-09-17) */
              startAdornment && 'mdt-pl-8',
              /* a search box - the field with a leading glyph - keeps its placeholder at 13 (Pranjal, 2026-10-10: "keep the
               * latest placeholder" for search); a form field's placeholder is 14, as its value */
              startAdornment && 'placeholder:mdt-text-[13px]',
              (endAdornment || clearable) && 'mdt-pr-8',
              /* held: the text stops 34 short of the edge (12 + the 14 lock + 8) and ends in an ellipsis */
              held && 'mdt-text-ellipsis mdt-pr-[34px]',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            disabled={held || disabled}
            required={required}
            {...props}
          />
          {held ? (
            <div className="mdt-absolute mdt-right-3 mdt-flex mdt-items-center mdt-text-faint">
              <Icon name="lock" size={14} aria-hidden />
            </div>
          ) : clearable ? (
            /* THE CLEAR ✕: a 20 ghost square, 6 from the edge, the 14 glyph in the faint ink, neutral-90 under the pointer */
            <button
              type="button"
              aria-label={clearLabel}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={() => {
                onClear?.();
                own.current?.focus();
              }}
              className="mdt-absolute mdt-right-1.5 mdt-inline-flex mdt-h-5 mdt-w-5 mdt-cursor-pointer mdt-items-center mdt-justify-center mdt-rounded mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-faint hover:mdt-bg-neutral-20 hover:mdt-text-neutral-90 focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-primary"
            >
              <Icon name="x" size={14} aria-hidden />
            </button>
          ) : (
            endAdornment && (
              <div className="mdt-absolute mdt-right-3 mdt-flex mdt-items-center mdt-text-faint group-focus-within:mdt-text-neutral-90 group-hover:mdt-text-neutral-90">
                {endAdornment}
              </div>
            )
          )}
        </div>
        {error && (
          <p
            id={errorId}
            className="mdt-flex mdt-items-center mdt-gap-1.5 mdt-text-xs mdt-text-destructive"
            role="alert"
          >
            {/* the alert mark, 12, before the message (K-Field-10) */}
            <Icon name="alert-circle" size={12} aria-hidden />
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
