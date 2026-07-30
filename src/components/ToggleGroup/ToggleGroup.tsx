'use client';

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cva } from 'class-variance-authority';
import { createContext, forwardRef, useContext, useMemo } from 'react';
import { cn } from '@/utils';
import type {
  ToggleGroupContextValue,
  ToggleGroupItemProps,
  ToggleGroupProps,
} from './ToggleGroup.types';

/**
 * Context for sharing variant and size with items
 */
const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  variant: 'default',
  size: 'md',
});

/**
 * ToggleGroup container variants using Class Variance Authority (CVA)
 */
export const toggleGroupVariants = cva(
  // Base styles
  ['mdt-inline-flex mdt-items-center mdt-rounded-md'],
  {
    variants: {
      /**
       * Visual style variant
       */
      variant: {
        default: 'mdt-bg-muted mdt-p-1',
        outline: 'mdt-border mdt-border-input mdt-bg-transparent mdt-p-1',
      },
      /**
       * Orientation of the group
       */
      orientation: {
        horizontal: 'mdt-flex-row',
        vertical: 'mdt-flex-col',
      },
      /**
       * Size variant
       */
      size: {
        sm: 'mdt-gap-0.5',
        md: 'mdt-gap-1',
        lg: 'mdt-gap-1',
      },
      /**
       * Full width modifier
       */
      fullWidth: {
        true: 'mdt-w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      orientation: 'horizontal',
      size: 'md',
      fullWidth: false,
    },
  }
);

/**
 * ToggleGroup item variants using Class Variance Authority (CVA)
 */
export const toggleGroupItemVariants = cva(
  // Base styles
  [
    'mdt-inline-flex mdt-items-center mdt-justify-center',
    'mdt-rounded-sm mdt-font-medium',
    'mdt-transition-all',
    'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-2',
    'disabled:mdt-pointer-events-none disabled:mdt-opacity-50',
    '[&_svg]:mdt-pointer-events-none [&_svg]:mdt-shrink-0',
  ],
  {
    variants: {
      /**
       * Visual style variant
       */
      variant: {
        default: [
          'mdt-bg-transparent mdt-text-muted-foreground',
          'hover:mdt-bg-background/60 hover:mdt-text-foreground',
          'data-[state=on]:mdt-bg-background data-[state=on]:mdt-text-foreground data-[state=on]:mdt-shadow-sm',
        ],
        outline: [
          'mdt-bg-transparent mdt-text-muted-foreground',
          'hover:mdt-bg-muted hover:mdt-text-foreground',
          'data-[state=on]:mdt-bg-primary data-[state=on]:mdt-text-primary-foreground',
        ],
      },
      /**
       * Size variant
       */
      size: {
        sm: 'mdt-h-7 mdt-min-w-7 mdt-gap-1 mdt-px-2 mdt-text-xs [&_svg]:mdt-h-3.5 [&_svg]:mdt-w-3.5',
        md: 'mdt-h-8 mdt-min-w-8 mdt-gap-1.5 mdt-px-3 mdt-text-sm [&_svg]:mdt-h-4 [&_svg]:mdt-w-4',
        lg: 'mdt-h-10 mdt-min-w-10 mdt-gap-2 mdt-px-4 mdt-text-base [&_svg]:mdt-h-5 [&_svg]:mdt-w-5',
      },
      /**
       * Full width item
       */
      fullWidth: {
        true: 'mdt-flex-1',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      fullWidth: false,
    },
  }
);

/**
 * ToggleGroup component built on Radix UI ToggleGroup primitive.
 * A set of two-state buttons that can be toggled on or off.
 *
 * Supports both single and multiple selection modes.
 *
 * @example
 * ```tsx
 * // Single selection
 * <ToggleGroup type="single" defaultValue="center">
 *   <ToggleGroupItem value="left" aria-label="Align left">
 *     <AlignLeftIcon />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="center" aria-label="Align center">
 *     <AlignCenterIcon />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="right" aria-label="Align right">
 *     <AlignRightIcon />
 *   </ToggleGroupItem>
 * </ToggleGroup>
 *
 * // Multiple selection
 * <ToggleGroup type="multiple" defaultValue={['bold']}>
 *   <ToggleGroupItem value="bold" aria-label="Toggle bold">
 *     <BoldIcon />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="italic" aria-label="Toggle italic">
 *     <ItalicIcon />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="underline" aria-label="Toggle underline">
 *     <UnderlineIcon />
 *   </ToggleGroupItem>
 * </ToggleGroup>
 *
 * // With text labels
 * <ToggleGroup type="single" variant="outline">
 *   <ToggleGroupItem value="day">Day</ToggleGroupItem>
 *   <ToggleGroupItem value="week">Week</ToggleGroupItem>
 *   <ToggleGroupItem value="month">Month</ToggleGroupItem>
 * </ToggleGroup>
 * ```
 */
const ToggleGroup = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      orientation = 'horizontal',
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    // Memoize context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({ variant, size }), [variant, size]);

    return (
      <ToggleGroupContext.Provider value={contextValue}>
        <ToggleGroupPrimitive.Root
          ref={ref}
          orientation={orientation}
          className={cn(
            toggleGroupVariants({
              variant,
              orientation,
              size,
              fullWidth,
            }),
            className
          )}
          {...props}
        >
          {children}
        </ToggleGroupPrimitive.Root>
      </ToggleGroupContext.Provider>
    );
  }
);

ToggleGroup.displayName = 'ToggleGroup';

/**
 * ToggleGroupItem - individual toggle button within a ToggleGroup.
 *
 * @example
 * ```tsx
 * <ToggleGroupItem value="bold" aria-label="Toggle bold">
 *   <BoldIcon />
 * </ToggleGroupItem>
 *
 * // With text
 * <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
 *
 * // With icon and text
 * <ToggleGroupItem value="grid">
 *   <GridIcon />
 *   Grid View
 * </ToggleGroupItem>
 * ```
 */
const ToggleGroupItem = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, variant, size, children, ...props }, ref) => {
  const context = useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleGroupItemVariants({
          variant: variant ?? context.variant,
          size: size ?? context.size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = 'ToggleGroupItem';

export { ToggleGroup, ToggleGroupItem };
