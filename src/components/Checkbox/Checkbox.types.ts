import type * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import type { checkboxVariants as CheckboxVariantsCVA } from './Checkbox';

/**
 * Checkbox variants derived from CVA configuration
 */
export type CheckboxVariants = VariantProps<typeof CheckboxVariantsCVA>;

/**
 * Props for the Checkbox component
 */
export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, CheckboxVariants {
  /**
   * Content to display inside the checkbox (for card variant)
   */
  children?: ReactNode;
}
