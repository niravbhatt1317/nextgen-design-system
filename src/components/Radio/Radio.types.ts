import type * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import type { radioGroupItemVariants as RadioGroupItemVariantsCVA } from './Radio';

/**
 * RadioGroupItem variants derived from CVA configuration
 */
export type RadioGroupItemVariants = VariantProps<typeof RadioGroupItemVariantsCVA>;

/**
 * Props for the RadioGroup component
 */
export interface RadioGroupProps extends React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
> {
  /**
   * Content to display inside the radio group
   */
  children: ReactNode;
}

/**
 * Props for the RadioGroupItem component
 */
export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, RadioGroupItemVariants {
  /**
   * Content to display inside the radio item (for card variant)
   */
  children?: ReactNode;
}
