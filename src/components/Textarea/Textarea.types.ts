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
   * A held field (Pranjal, 2026-09-17): disabled, with a lock inside at the right - 14 like the search glyph, 12 from
   * the edge, in the disabled text colour - and the value truncating before it. For a value something else owns (a
   * directory, a fixed identity); the label above stays plain.
   */
  locked?: boolean;
  /**
   * Wrapper className for the container div
   */
  wrapperClassName?: string;
}
