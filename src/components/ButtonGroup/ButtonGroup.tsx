'use client';

import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { ButtonGroupProps } from './ButtonGroup.types';

/**
 * ButtonGroup variants using Class Variance Authority (CVA)
 * Provides consistent styling for grouped buttons
 */
export const buttonGroupVariants = cva(
  // Base styles for button group container
  ['mdt-inline-flex'],
  {
    variants: {
      /**
       * Orientation of the button group
       */
      orientation: {
        horizontal: 'mdt-flex-row',
        vertical: 'mdt-flex-col',
      },
      /**
       * Visual style variant
       */
      variant: {
        default: '',
        attached: '',
      },
      /**
       * Size variant - affects spacing
       */
      size: {
        xs: 'mdt-gap-0',
        sm: 'mdt-gap-0',
        md: 'mdt-gap-0',
        lg: 'mdt-gap-0',
        xl: 'mdt-gap-0',
      },
      /**
       * Full width button group
       */
      fullWidth: {
        true: 'mdt-w-full',
        false: '',
      },
    },
    compoundVariants: [
      // Horizontal attached buttons - remove borders between
      {
        orientation: 'horizontal',
        variant: 'attached',
        className: [
          // First child (button, input, or link)
          '[&>button:first-child]:mdt-rounded-r-none',
          '[&>a:first-child]:mdt-rounded-r-none',
          '[&>input:first-child]:mdt-rounded-r-none',
          '[&>*:has(input):first-child_input]:mdt-rounded-r-none',
          // Middle children
          '[&>button:not(:first-child):not(:last-child)]:mdt-rounded-none',
          '[&>button:not(:first-child):not(:last-child)]:mdt-border-l-0',
          '[&>a:not(:first-child):not(:last-child)]:mdt-rounded-none',
          '[&>a:not(:first-child):not(:last-child)]:mdt-border-l-0',
          '[&>input:not(:first-child):not(:last-child)]:mdt-rounded-none',
          '[&>input:not(:first-child):not(:last-child)]:mdt-border-l-0',
          '[&>*:has(input):not(:first-child):not(:last-child)_input]:mdt-rounded-none',
          '[&>*:has(input):not(:first-child):not(:last-child)_input]:mdt-border-l-0',
          // Last child
          '[&>button:last-child]:mdt-rounded-l-none',
          '[&>button:last-child]:mdt-border-l-0',
          '[&>a:last-child]:mdt-rounded-l-none',
          '[&>a:last-child]:mdt-border-l-0',
          '[&>input:last-child]:mdt-rounded-l-none',
          '[&>input:last-child]:mdt-border-l-0',
          '[&>*:has(input):last-child_input]:mdt-rounded-l-none',
          '[&>*:has(input):last-child_input]:mdt-border-l-0',
          // Only child
          '[&>button:only-child]:mdt-rounded-md',
          '[&>a:only-child]:mdt-rounded-md',
          '[&>input:only-child]:mdt-rounded-md',
          '[&>*:has(input):only-child_input]:mdt-rounded-md',
        ],
      },
      // Vertical attached buttons - remove borders between
      {
        orientation: 'vertical',
        variant: 'attached',
        className: [
          // First child
          '[&>button:first-child]:mdt-rounded-b-none',
          '[&>a:first-child]:mdt-rounded-b-none',
          '[&>input:first-child]:mdt-rounded-b-none',
          '[&>*:has(input):first-child_input]:mdt-rounded-b-none',
          // Middle children
          '[&>button:not(:first-child):not(:last-child)]:mdt-rounded-none',
          '[&>button:not(:first-child):not(:last-child)]:mdt-border-t-0',
          '[&>a:not(:first-child):not(:last-child)]:mdt-rounded-none',
          '[&>a:not(:first-child):not(:last-child)]:mdt-border-t-0',
          '[&>input:not(:first-child):not(:last-child)]:mdt-rounded-none',
          '[&>input:not(:first-child):not(:last-child)]:mdt-border-t-0',
          '[&>*:has(input):not(:first-child):not(:last-child)_input]:mdt-rounded-none',
          '[&>*:has(input):not(:first-child):not(:last-child)_input]:mdt-border-t-0',
          // Last child
          '[&>button:last-child]:mdt-rounded-t-none',
          '[&>button:last-child]:mdt-border-t-0',
          '[&>a:last-child]:mdt-rounded-t-none',
          '[&>a:last-child]:mdt-border-t-0',
          '[&>input:last-child]:mdt-rounded-t-none',
          '[&>input:last-child]:mdt-border-t-0',
          '[&>*:has(input):last-child_input]:mdt-rounded-t-none',
          '[&>*:has(input):last-child_input]:mdt-border-t-0',
          // Only child
          '[&>button:only-child]:mdt-rounded-md',
          '[&>a:only-child]:mdt-rounded-md',
          '[&>input:only-child]:mdt-rounded-md',
          '[&>*:has(input):only-child_input]:mdt-rounded-md',
        ],
      },
      // Default spacing for non-attached buttons
      {
        variant: 'default',
        orientation: 'horizontal',
        className: 'mdt-gap-2',
      },
      {
        variant: 'default',
        orientation: 'vertical',
        className: 'mdt-gap-2',
      },
      // Full width buttons in group
      {
        fullWidth: true,
        className: '[&>*]:mdt-flex-1',
      },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      variant: 'attached',
      size: 'md',
      fullWidth: false,
    },
  }
);

/**
 * ButtonGroup component for grouping related buttons together.
 *
 * Supports both horizontal and vertical orientations, with options for
 * attached (seamless) or separated button layouts.
 *
 * @example
 * ```tsx
 * // Horizontal attached buttons
 * <ButtonGroup>
 *   <Button variant="outline">Left</Button>
 *   <Button variant="outline">Middle</Button>
 *   <Button variant="outline">Right</Button>
 * </ButtonGroup>
 *
 * // Vertical button group
 * <ButtonGroup orientation="vertical">
 *   <Button variant="outline">Top</Button>
 *   <Button variant="outline">Middle</Button>
 *   <Button variant="outline">Bottom</Button>
 * </ButtonGroup>
 *
 * // Separated buttons
 * <ButtonGroup variant="default">
 *   <Button>Save</Button>
 *   <Button variant="outline">Cancel</Button>
 * </ButtonGroup>
 * ```
 */
const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation, variant, size, fullWidth, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(buttonGroupVariants({ orientation, variant, size, fullWidth }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

export { ButtonGroup };
