import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn, gapVariants, gapXVariants, gapYVariants } from '@/utils';
import type { FlexProps } from './Flex.types';

/**
 * Flex variants using Class Variance Authority (CVA)
 */
export const flexVariants = cva(['mdt-flex'], {
  variants: {
    direction: {
      row: 'mdt-flex-row',
      'row-reverse': 'mdt-flex-row-reverse',
      col: 'mdt-flex-col',
      'col-reverse': 'mdt-flex-col-reverse',
    },
    wrap: {
      wrap: 'mdt-flex-wrap',
      nowrap: 'mdt-flex-nowrap',
      'wrap-reverse': 'mdt-flex-wrap-reverse',
    },
    justify: {
      start: 'mdt-justify-start',
      end: 'mdt-justify-end',
      center: 'mdt-justify-center',
      between: 'mdt-justify-between',
      around: 'mdt-justify-around',
      evenly: 'mdt-justify-evenly',
    },
    align: {
      start: 'mdt-items-start',
      end: 'mdt-items-end',
      center: 'mdt-items-center',
      baseline: 'mdt-items-baseline',
      stretch: 'mdt-items-stretch',
    },
    gap: gapVariants,
    gapX: gapXVariants,
    gapY: gapYVariants,
  },
  defaultVariants: {
    direction: 'row',
    wrap: 'nowrap',
  },
});

/**
 * Flex component for creating flexbox layouts.
 *
 * A flexible layout primitive that provides a declarative API for building
 * flex-based layouts with support for direction, wrapping, gaps, and alignment.
 *
 * @example
 * ```tsx
 * // Basic horizontal flex
 * <Flex gap="md">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Flex>
 * ```
 *
 * @example
 * ```tsx
 * // Vertical flex with center alignment
 * <Flex direction="col" align="center" gap="lg">
 *   <Button>Button 1</Button>
 *   <Button>Button 2</Button>
 * </Flex>
 * ```
 *
 * @example
 * ```tsx
 * // Flex with space between and center alignment
 * <Flex justify="between" align="center">
 *   <div>Left content</div>
 *   <div>Right content</div>
 * </Flex>
 * ```
 *
 * @example
 * ```tsx
 * // Polymorphic usage as nav
 * <Flex as="nav" gap="md" align="center">
 *   <a href="/">Home</a>
 *   <a href="/about">About</a>
 * </Flex>
 * ```
 */
const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      as: Component = 'div',
      className,
      direction,
      wrap,
      justify,
      align,
      gap,
      gapX,
      gapY,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          flexVariants({
            direction,
            wrap,
            justify,
            align,
            gap,
            gapX,
            gapY,
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

Flex.displayName = 'Flex';

export { Flex };
