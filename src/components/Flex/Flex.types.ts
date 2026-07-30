import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import type { flexVariants as FlexVariantsCVA } from './Flex';

/**
 * Flex variants derived from CVA configuration
 */
export type FlexVariants = VariantProps<typeof FlexVariantsCVA>;

/**
 * Polymorphic prop type for the Flex component
 */
export interface AsProp<C extends ElementType> {
  /**
   * The element type to render as
   * @default 'div'
   */
  as?: C;
}

/**
 * Props for polymorphic Flex component
 */
type PolymorphicFlexProps<C extends ElementType> = AsProp<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof AsProp<C>> &
  FlexVariants & {
    /**
     * Content to display inside the flex container
     */
    children?: ReactNode;
  };

/**
 * Props for the Flex component
 */
export type FlexProps<C extends ElementType = 'div'> = PolymorphicFlexProps<C>;
