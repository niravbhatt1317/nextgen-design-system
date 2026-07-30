import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';
import type { textareaVariants as TextareaVariantsCVA } from './Textarea';

/**
 * Textarea component variants derived from CVA configuration
 */
export type TextareaVariants = VariantProps<typeof TextareaVariantsCVA>;

/**
 * Props for the Textarea component
 */
export interface TextareaProps
  extends Omit<ComponentPropsWithoutRef<'textarea'>, 'size'>, TextareaVariants {
  /**
   * Error message to display below the textarea
   */
  error?: string;
  /**
   * Label text for the textarea
   */
  label?: string;
  /**
   * Helper text displayed below the textarea
   */
  helperText?: string;
  /**
   * Wrapper className for the container div
   */
  wrapperClassName?: string;
}
