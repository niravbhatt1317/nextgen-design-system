import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import type { gridVariants as GridVariantsCVA } from './Grid';

/**
 * Grid variants derived from CVA configuration
 */
export type GridVariants = VariantProps<typeof GridVariantsCVA>;

/**
 * Polymorphic prop type for the Grid component
 */
export interface AsProp<C extends ElementType> {
  /**
   * The element type to render as
   * @default 'div'
   */
  as?: C;
}

/**
 * Props for polymorphic Grid component
 */
type PolymorphicGridProps<C extends ElementType> = AsProp<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof AsProp<C>> &
  GridVariants & {
    /**
     * Content to display inside the grid
     */
    children?: ReactNode;
  };

/**
 * Props for the Grid component
 */
export type GridProps<C extends ElementType = 'div'> = PolymorphicGridProps<C>;
