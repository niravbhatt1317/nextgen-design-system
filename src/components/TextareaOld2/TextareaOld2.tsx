import { cva } from 'class-variance-authority';
import { forwardRef, useId } from 'react';
import { cn } from '@/utils';
import type { TextareaOld2Props } from './TextareaOld2.types';

/**
 * TextareaOld2 variants using Class Variance Authority (CVA)
 * Provides consistent styling with support for multiple sizes and states
 */
export const textareaOld2Variants = cva(
  // Base styles applied to all textareas
  [
    'mdt-flex mdt-w-full mdt-rounded-md mdt-border mdt-border-input',
    'mdt-bg-background mdt-text-foreground',
    'mdt-transition-colors',
    'placeholder:mdt-text-muted-foreground',
    'focus-visible:mdt-outline-none',
    'disabled:mdt-cursor-not-allowed disabled:mdt-opacity-50',
  ],
  {
    variants: {
      /**
       * Size variant of the textarea
       */
      size: {
        sm: 'mdt-min-h-[80px] mdt-px-3 mdt-py-2 mdt-text-xs',
        md: 'mdt-min-h-[100px] mdt-px-3 mdt-py-2 mdt-text-sm',
        lg: 'mdt-min-h-[120px] mdt-px-4 mdt-py-3 mdt-text-base',
      },
      /**
       * Visual style variant of the textarea
       */
      variant: {
        default: '',
        filled: 'mdt-bg-muted',
      },
      /**
       * Whether the textarea is in an error state
       */
      hasError: {
        true: 'mdt-border-destructive',
        false: '',
      },
      /**
       * Resize control for the textarea
       */
      resize: {
        none: 'mdt-resize-none',
        vertical: 'mdt-resize-y',
        both: 'mdt-resize',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      hasError: false,
      resize: 'vertical',
    },
  }
);

/**

 * @deprecated Since 1.0.0. Use `Textarea` instead — the field rebuilt on the 2026-09-17 rulings.
 *
 * Kept for side-by-side review while products move across; the removal
 * version is the design owner's to set. Frozen: it takes no further work.
 *

 * TextareaOld2 component with support for labels, error states, and character counting.
 *
 * @example
 * ```tsx
 * // Basic textarea
 * <TextareaOld2 placeholder="Enter your message..." />
 *
 * // With label and error
 * <TextareaOld2
 *   label="Message"
 *   error="Message is required"
 *   placeholder="Enter your message"
 * />
 *
 * // With character count
 * <TextareaOld2
 *   label="Bio"
 *   maxLength={200}
 *   placeholder="Tell us about yourself"
 * />
 * ```
 */
const TextareaOld2 = forwardRef<HTMLTextAreaElement, TextareaOld2Props>(
  (
    {
      className,
      wrapperClassName,
      size,
      variant,
      resize,
      error,
      label,
      helperText,
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
        <textarea
          id={id}
          ref={ref}
          className={cn(textareaOld2Variants({ size, variant, hasError, resize }), className)}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          {...props}
        />
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

TextareaOld2.displayName = 'TextareaOld2';

export { TextareaOld2 };
