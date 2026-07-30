import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn, gapVariants, gapXVariants, gapYVariants, alignItemsVariants } from '@/utils';
import type { GridProps } from './Grid.types';

/**
 * Grid variants using Class Variance Authority (CVA)
 */
export const gridVariants = cva(['mdt-grid'], {
  variants: {
    columns: {
      1: 'mdt-grid-cols-1',
      2: 'mdt-grid-cols-2',
      3: 'mdt-grid-cols-3',
      4: 'mdt-grid-cols-4',
      5: 'mdt-grid-cols-5',
      6: 'mdt-grid-cols-6',
      7: 'mdt-grid-cols-7',
      8: 'mdt-grid-cols-8',
      9: 'mdt-grid-cols-9',
      10: 'mdt-grid-cols-10',
      11: 'mdt-grid-cols-11',
      12: 'mdt-grid-cols-12',
      auto: 'mdt-grid-cols-auto',
    },
    rows: {
      1: 'mdt-grid-rows-1',
      2: 'mdt-grid-rows-2',
      3: 'mdt-grid-rows-3',
      4: 'mdt-grid-rows-4',
      5: 'mdt-grid-rows-5',
      6: 'mdt-grid-rows-6',
      auto: 'mdt-grid-rows-auto',
    },
    gap: gapVariants,
    gapX: gapXVariants,
    gapY: gapYVariants,
    justify: {
      start: 'mdt-justify-items-start',
      end: 'mdt-justify-items-end',
      center: 'mdt-justify-items-center',
      stretch: 'mdt-justify-items-stretch',
    },
    align: alignItemsVariants,
    justifyContent: {
      start: 'mdt-justify-start',
      end: 'mdt-justify-end',
      center: 'mdt-justify-center',
      between: 'mdt-justify-between',
      around: 'mdt-justify-around',
      evenly: 'mdt-justify-evenly',
    },
    alignContent: {
      start: 'mdt-content-start',
      end: 'mdt-content-end',
      center: 'mdt-content-center',
      between: 'mdt-content-between',
      around: 'mdt-content-around',
      evenly: 'mdt-content-evenly',
    },
    autoFlow: {
      row: 'mdt-grid-flow-row',
      col: 'mdt-grid-flow-col',
      dense: 'mdt-grid-flow-dense',
      rowDense: 'mdt-grid-flow-row-dense',
      colDense: 'mdt-grid-flow-col-dense',
    },
  },
  defaultVariants: {
    gap: 'md',
  },
});

/**
 * Grid component for creating CSS Grid layouts.
 *
 * A flexible layout primitive that provides a declarative API for building
 * grid-based layouts with support for responsive columns, rows, gaps, and alignment.
 *
 * @example
 * ```tsx
 * // Basic 3-column grid
 * <Grid columns={3} gap="md">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 * ```
 *
 * @example
 * ```tsx
 * // Responsive card grid
 * <Grid columns={4} gap="lg" align="start">
 *   {cards.map(card => <Card key={card.id} {...card} />)}
 * </Grid>
 * ```
 *
 * @example
 * ```tsx
 * // Different horizontal and vertical gaps
 * <Grid columns={3} gapX="lg" gapY="sm">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 * ```
 *
 * @example
 * ```tsx
 * // Polymorphic usage
 * <Grid as="ul" columns={2} gap="md">
 *   <li>Item 1</li>
 *   <li>Item 2</li>
 * </Grid>
 * ```
 */
const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      as: Component = 'div',
      className,
      columns,
      rows,
      gap,
      gapX,
      gapY,
      justify,
      align,
      justifyContent,
      alignContent,
      autoFlow,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          gridVariants({
            columns,
            rows,
            gap,
            gapX,
            gapY,
            justify,
            align,
            justifyContent,
            alignContent,
            autoFlow,
          }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Grid.displayName = 'Grid';

export { Grid };
