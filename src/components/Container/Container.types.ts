import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import type { containerVariants as ContainerVariantsCVA } from './Container';

/**
 * Container variants derived from CVA configuration
 */
export type ContainerVariants = VariantProps<typeof ContainerVariantsCVA>;

/**
 * Polymorphic prop type for the Container component
 */
export interface AsProp<C extends ElementType> {
  /**
   * The element type to render as
   * @default 'div'
   */
  as?: C;
}

/**
 * Props for polymorphic Container component
 */
type PolymorphicContainerProps<C extends ElementType> = AsProp<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof AsProp<C>> &
  ContainerVariants & {
    /**
     * Content to display inside the container
     */
    children?: ReactNode;
  };

/**
 * Props for the Container component
 */
export type ContainerProps<C extends ElementType = 'div'> = PolymorphicContainerProps<C>;
