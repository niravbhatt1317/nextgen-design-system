import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import type { stackVariants as StackVariantsCVA } from './Stack';

/**
 * Stack variants derived from CVA configuration
 */
export type StackVariants = VariantProps<typeof StackVariantsCVA>;

/**
 * Props for the Stack component
 */
export interface StackProps extends ComponentPropsWithoutRef<'div'>, StackVariants {
  /**
   * Content to display inside the stack
   */
  children: ReactNode;

  /**
   * Render the stack as a different HTML element
   * @default 'div'
   */
  as?: ElementType;

  /**
   * Custom className for the divider elements
   */
  dividerClassName?: string;
}
