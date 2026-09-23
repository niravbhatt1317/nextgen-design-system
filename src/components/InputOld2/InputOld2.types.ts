import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { inputOld2Variants as InputVariantsCVA } from './InputOld2';

/**
 * InputOld2 component variants derived from CVA configuration
 */
export type InputOld2Variants = VariantProps<typeof InputVariantsCVA>;

/**
 * Props for the InputOld2 component
 */
export interface InputOld2Props
  extends Omit<ComponentPropsWithoutRef<'input'>, 'size'>, InputOld2Variants {
  /**
   * Error message to display below the input
   */
  error?: string;
  /**
   * Label text for the input
   */
  label?: string;
  /**
   * Helper text displayed below the input
   */
  helperText?: string;
  /**
   * Icon or element to display at the start of the input
   */
  startAdornment?: ReactNode;
  /**
   * Icon or element to display at the end of the input
   */
  endAdornment?: ReactNode;
  /**
   * Wrapper className for the container div
   */
  wrapperClassName?: string;
}
