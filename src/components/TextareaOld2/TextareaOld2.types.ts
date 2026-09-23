import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';
import type { textareaOld2Variants as TextareaVariantsCVA } from './TextareaOld2';

/**
 * TextareaOld2 component variants derived from CVA configuration
 */
export type TextareaOld2Variants = VariantProps<typeof TextareaVariantsCVA>;

/**
 * Props for the TextareaOld2 component
 */
export interface TextareaOld2Props
  extends Omit<ComponentPropsWithoutRef<'textarea'>, 'size'>, TextareaOld2Variants {
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
