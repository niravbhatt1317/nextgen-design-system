import { cva } from 'class-variance-authority';
import { forwardRef, useId } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type { TextareaProps } from './Textarea.types';

/**
 * Textarea variants using Class Variance Authority (CVA)
 * Provides consistent styling with support for multiple sizes and states
 */
export const textareaVariants = cva(
  // Base styles applied to all textareas
  [
    /* THE FIELD (Pranjal, 2026-09-17) - the same box as the Input, grown */
    'mdt-flex mdt-w-full mdt-rounded-lg mdt-border mdt-border-neutral-30',
    'mdt-bg-background mdt-text-neutral-90',
    'mdt-transition-[border-color,box-shadow]',
    'placeholder:mdt-text-neutral-70',
    'hover:mdt-border-primary',
    'focus:mdt-border-primary focus-visible:mdt-outline-none ' +
      'focus:mdt-shadow-[0_0_0_3px_hsl(var(--mdt-primary)/0.08)]',
    'disabled:mdt-cursor-not-allowed disabled:mdt-bg-neutral-10 disabled:mdt-text-neutral-70 disabled:hover:mdt-border-neutral-30',
  ],
  {
    variants: {
      /**
       * Size variant of the textarea
       */
      size: {
        sm: 'mdt-min-h-[80px] mdt-px-3 mdt-py-2 mdt-text-[13px]',
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
        true:
          'mdt-border-destructive hover:mdt-border-destructive focus:mdt-border-destructive ' +
          'focus:mdt-shadow-[0_0_0_3px_hsl(var(--mdt-destructive)/0.14)]',
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
      size: 'sm',
      variant: 'default',
      hasError: false,
      resize: 'vertical',
    },
  }
);

/**
 * Textarea component with support for labels, error states, and character counting.
 *
 * @example
 * ```tsx
 * // Basic textarea
 * <Textarea placeholder="Enter your message..." />
 *
 * // With label and error
 * <Textarea
 *   label="Message"
 *   error="Message is required"
 *   placeholder="Enter your message"
 * />
 *
 * // With character count
 * <Textarea
 *   label="Bio"
 *   maxLength={200}
 *   placeholder="Tell us about yourself"
 * />
 * ```
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
    /* A HELD FIELD (Pranjal, 2026-09-17): disabled, the lock inside at the top right, the text stopping short of it */
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
        <div className="mdt-relative mdt-flex">
          <textarea
            id={id}
            ref={ref}
            className={cn(
              textareaVariants({ size, variant, hasError, resize }),
              held && 'mdt-pr-[34px]',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            disabled={held || disabled}
            {...props}
          />
          {held && (
            <div className="mdt-absolute mdt-right-3 mdt-top-[9px] mdt-flex mdt-items-center mdt-text-neutral-70">
              <Icon name="lock" size={14} aria-hidden />
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

Textarea.displayName = 'Textarea';

export { Textarea };
