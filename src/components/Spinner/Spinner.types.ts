import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';
import type { spinnerVariants as SpinnerVariantsCVA } from './Spinner';

/**
 * Spinner variants derived from CVA configuration
 */
export type SpinnerVariants = VariantProps<typeof SpinnerVariantsCVA>;

/**
 * Props for the Spinner component
 */
export interface SpinnerProps extends ComponentPropsWithoutRef<'svg'>, SpinnerVariants {
  /**
   * Custom class name to apply to the spinner
   */
  className?: string;
}
