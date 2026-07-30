'use client';

import { forwardRef } from 'react';
import { cn } from '@/utils';
import type {
  InputGroupProps,
  InputGroupAddonProps,
  InputGroupInputProps,
  InputGroupTextProps,
  InputGroupButtonProps,
  InputGroupTextareaProps,
} from './InputGroup.types';

// ============================================================================
// Shared CSS class constants to reduce duplication (SonarJS: no-duplicate-string)
// ============================================================================
const INLINE_START = 'inline-start';
const INLINE_END = 'inline-end';
const DISABLED_CLASSES = 'disabled:mdt-cursor-not-allowed disabled:mdt-opacity-50';
const INLINE_FLEX_CENTER = 'mdt-inline-flex mdt-items-center mdt-justify-center';
const ROUNDED_L_NONE_BORDER_L = 'mdt-rounded-l-none mdt-border-l-0';
const ROUNDED_R_NONE_BORDER_R = 'mdt-rounded-r-none mdt-border-r-0';
const ATTACHED_START_CLASSES =
  'group-has-[[data-attached="true"][data-position="inline-start"]]:mdt-rounded-l-none group-has-[[data-attached="true"][data-position="inline-start"]]:mdt-border-l-0';
const ATTACHED_END_CLASSES =
  'group-has-[[data-attached="true"][data-position="inline-end"]]:mdt-rounded-r-none group-has-[[data-attached="true"][data-position="inline-end"]]:mdt-border-r-0';
const SHADOW_TRANSITION = 'mdt-shadow-sm mdt-transition-colors';
const FOCUS_OUTLINE_NONE = 'focus-visible:mdt-outline-none';

/**
 * InputGroup - Container for inputs with addons
 */
const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mdt-group mdt-relative mdt-flex mdt-w-full mdt-items-center', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

InputGroup.displayName = 'InputGroup';

/**
 * InputGroupInput - Input with support for addons
 */
const InputGroupInput = forwardRef<HTMLInputElement, InputGroupInputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles
          'mdt-flex mdt-h-9 mdt-w-full mdt-min-w-0',
          'mdt-rounded-md mdt-border mdt-border-input',
          'mdt-bg-transparent mdt-px-3 mdt-py-1',
          'mdt-text-base mdt-text-foreground',
          SHADOW_TRANSITION,
          'file:mdt-border-0 file:mdt-bg-transparent file:mdt-text-sm file:mdt-font-medium file:mdt-text-foreground',
          'placeholder:mdt-text-muted-foreground',
          FOCUS_OUTLINE_NONE,
          DISABLED_CLASSES,
          'md:mdt-text-sm',
          // Padding adjustments for addons
          'group-has-[[data-position="inline-start"]]:mdt-pl-9',
          'group-has-[[data-position="inline-end"]]:mdt-pr-9',
          // Border radius adjustments for attached addons
          ATTACHED_START_CLASSES,
          ATTACHED_END_CLASSES,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

InputGroupInput.displayName = 'InputGroupInput';

/**
 * InputGroupAddon - Wrapper for icons (positioned absolutely inside input)
 */
const InputGroupAddon = forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ className, align = INLINE_END, children, ...props }, ref) => {
    const isInline = align === INLINE_START || align === INLINE_END;
    const isBlock = align === 'block-start' || align === 'block-end';

    return (
      <div
        ref={ref}
        data-position={align}
        className={cn(
          INLINE_FLEX_CENTER,
          'mdt-text-sm mdt-text-muted-foreground',
          // Inline positioning (icons inside input)
          isInline && [
            'mdt-absolute mdt-z-10',
            'mdt-h-full mdt-w-9',
            align === INLINE_START && 'mdt-left-0',
            align === INLINE_END && 'mdt-right-0',
          ],
          // Block positioning (above/below input)
          isBlock && [
            'mdt-absolute mdt-left-1/2 mdt--translate-x-1/2',
            align === 'block-start' && 'mdt-top-0 mdt--translate-y-full mdt-pb-1',
            align === 'block-end' && 'mdt-bottom-0 mdt-translate-y-full mdt-pt-1',
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

InputGroupAddon.displayName = 'InputGroupAddon';

/**
 * InputGroupText - Text addon (attached to input border)
 */
const InputGroupText = forwardRef<HTMLSpanElement, InputGroupTextProps>(
  ({ className, align = INLINE_END, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-attached="true"
        data-position={align}
        className={cn(
          INLINE_FLEX_CENTER,
          'mdt-h-9 mdt-whitespace-nowrap mdt-rounded-md',
          'mdt-border mdt-border-input mdt-bg-muted',
          'mdt-px-3 mdt-text-sm mdt-text-muted-foreground',
          // Remove border radius on attached side
          align === INLINE_START && ROUNDED_R_NONE_BORDER_R,
          align === INLINE_END && ROUNDED_L_NONE_BORDER_L,
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

InputGroupText.displayName = 'InputGroupText';

/**
 * InputGroupButton - Button addon (attached to input border)
 */
const InputGroupButton = forwardRef<HTMLButtonElement, InputGroupButtonProps>(
  ({ className, align = INLINE_END, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        data-attached="true"
        data-position={align}
        className={cn(
          INLINE_FLEX_CENTER,
          'mdt-h-9 mdt-whitespace-nowrap mdt-rounded-md',
          'mdt-border mdt-border-input mdt-bg-background',
          'mdt-px-4 mdt-text-sm mdt-font-medium mdt-text-foreground',
          SHADOW_TRANSITION,
          'hover:mdt-bg-muted hover:mdt-text-foreground',
          FOCUS_OUTLINE_NONE,
          DISABLED_CLASSES,
          // Remove border radius on attached side
          align === INLINE_START && ROUNDED_R_NONE_BORDER_R,
          align === INLINE_END && ROUNDED_L_NONE_BORDER_L,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

InputGroupButton.displayName = 'InputGroupButton';

/**
 * InputGroupTextarea - Textarea with support for addons
 */
const InputGroupTextarea = forwardRef<HTMLTextAreaElement, InputGroupTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'mdt-flex mdt-min-h-[60px] mdt-w-full mdt-min-w-0',
          'mdt-rounded-md mdt-border mdt-border-input',
          'mdt-bg-transparent mdt-px-3 mdt-py-2',
          'mdt-text-base mdt-text-foreground',
          SHADOW_TRANSITION,
          'placeholder:mdt-text-muted-foreground',
          FOCUS_OUTLINE_NONE,
          DISABLED_CLASSES,
          'md:mdt-text-sm',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

InputGroupTextarea.displayName = 'InputGroupTextarea';

export {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupButton,
  InputGroupTextarea,
};
