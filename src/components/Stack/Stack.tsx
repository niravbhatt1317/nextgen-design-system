import { cva } from 'class-variance-authority';
import React, { forwardRef } from 'react';
import { cn } from '@/utils';
import type { StackProps } from './Stack.types';

/**
 * Stack variants using Class Variance Authority (CVA)
 */
export const stackVariants = cva(['mdt-flex'], {
  variants: {
    /**
     * Direction of the stack (vertical or horizontal)
     */
    direction: {
      vertical: 'mdt-flex-col',
      horizontal: 'mdt-flex-row',
    },
    /**
     * Gap/spacing between items
     */
    gap: {
      none: 'mdt-gap-0',
      xs: 'mdt-gap-1',
      sm: 'mdt-gap-2',
      md: 'mdt-gap-4',
      lg: 'mdt-gap-6',
      xl: 'mdt-gap-8',
      '2xl': 'mdt-gap-12',
      '3xl': 'mdt-gap-16',
    },
    /**
     * Alignment of items along the main axis
     */
    justify: {
      start: 'mdt-justify-start',
      center: 'mdt-justify-center',
      end: 'mdt-justify-end',
      between: 'mdt-justify-between',
      around: 'mdt-justify-around',
      evenly: 'mdt-justify-evenly',
    },
    /**
     * Alignment of items along the cross axis
     */
    align: {
      start: 'mdt-items-start',
      center: 'mdt-items-center',
      end: 'mdt-items-end',
      stretch: 'mdt-items-stretch',
      baseline: 'mdt-items-baseline',
    },
    /**
     * Whether items should wrap
     */
    wrap: {
      true: 'mdt-flex-wrap',
      false: 'mdt-flex-nowrap',
    },
    /**
     * Full width/height
     */
    fullWidth: {
      true: 'mdt-w-full',
      false: '',
    },
    /**
     * Whether to show dividers between items
     */
    divider: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    direction: 'vertical',
    gap: 'md',
    justify: 'start',
    align: 'stretch',
    wrap: false,
    fullWidth: false,
    divider: false,
  },
});

/**
 * Stack component for consistent vertical or horizontal spacing between elements.
 *
 * @example
 * ```tsx
 * // Vertical stack with medium gap
 * <Stack>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 *
 * // Horizontal stack with large gap
 * <Stack direction="horizontal" gap="lg">
 *   <Button>Cancel</Button>
 *   <Button>Save</Button>
 * </Stack>
 *
 * // Centered stack
 * <Stack align="center" justify="center">
 *   <Icon />
 *   <Text>Centered Content</Text>
 * </Stack>
 *
 * // Stack with dividers
 * <Stack divider>
 *   <div>Section 1</div>
 *   <div>Section 2</div>
 * </Stack>
 * ```
 */
const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction,
      gap,
      justify,
      align,
      wrap,
      fullWidth,
      divider = false,
      dividerClassName,
      as: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    // If divider is enabled, we need to insert divider elements between children
    const renderChildren = () => {
      if (!divider || !children) {
        return children;
      }

      const childArray = Array.isArray(children) ? children : [children];
      const validChildren = childArray.filter((child) => child !== null && child !== undefined);

      if (validChildren.length <= 1) {
        return children;
      }

      const dividerElement = (
        <hr
          className={cn(
            'mdt-border-0',
            direction === 'horizontal'
              ? 'mdt-h-auto mdt-w-px mdt-bg-border'
              : 'mdt-h-px mdt-w-full mdt-bg-border',
            dividerClassName
          )}
          aria-orientation={direction === 'horizontal' ? 'vertical' : 'horizontal'}
        />
      );

      return validChildren.reduce<React.ReactNode[]>((acc, child, index) => {
        acc.push(child as React.ReactNode);
        if (index < validChildren.length - 1) {
          acc.push(
            <React.Fragment key={`divider-${String(index)}`}>{dividerElement}</React.Fragment>
          );
        }
        return acc;
      }, []);
    };

    return (
      <Component
        ref={ref}
        className={cn(
          stackVariants({ direction, gap, justify, align, wrap, fullWidth }),
          className
        )}
        {...props}
      >
        {renderChildren()}
      </Component>
    );
  }
);

Stack.displayName = 'Stack';

export { Stack };
