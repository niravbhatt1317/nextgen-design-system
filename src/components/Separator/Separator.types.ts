import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { separatorVariants as SeparatorVariantsCVA } from './Separator';

/**
 * Separator variants derived from CVA configuration
 */
export type SeparatorVariants = VariantProps<typeof SeparatorVariantsCVA>;

/**
 * Props for the Separator component
 */
export interface SeparatorProps extends ComponentPropsWithoutRef<'div'>, SeparatorVariants {
  /**
   * Whether the separator is purely decorative
   * When true, uses role="none", otherwise role="separator"
   * @default true
   */
  decorative?: boolean;

  /**
   * Label to display on the separator (e.g., "OR", "Continue with")
   * When provided, the separator will be split with the label in between
   */
  label?: ReactNode;

  /**
   * Position of the label on the separator
   * @default 'center'
   */
  labelPosition?: 'left' | 'center' | 'right';

  /**
   * Custom className for the label element
   */
  labelClassName?: string;
}
