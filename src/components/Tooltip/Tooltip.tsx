'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { TooltipContentProps, TooltipProviderProps } from './Tooltip.types';

/**
 * TooltipProvider - wraps your app or component tree to provide tooltip functionality.
 * Must be placed at the root of components using tooltips.
 *
 * @example
 * ```tsx
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>Hover me</TooltipTrigger>
 *     <TooltipContent>Tooltip text</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
const TooltipProvider = ({ delayDuration = 200, ...props }: TooltipProviderProps) => (
  <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
);

TooltipProvider.displayName = 'TooltipProvider';

/**
 * Tooltip root component - controls the open state.
 */
const Tooltip = TooltipPrimitive.Root;

/**
 * TooltipTrigger - the element that triggers the tooltip on hover.
 */
const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * TooltipContent - the content container for the tooltip with arrow support.
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>Hover me</TooltipTrigger>
 *   <TooltipContent>
 *     <p>Helpful information</p>
 *   </TooltipContent>
 * </Tooltip>
 * ```
 */
const TooltipContent = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(
  (
    {
      className,
      sideOffset = 4,
      side = 'top',
      align = 'center',
      showArrow = true,
      arrowClassName,
      children,
      ...props
    },
    ref
  ) => (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        side={side}
        sideOffset={sideOffset}
        align={align}
        className={cn(
          'mdt-z-50 mdt-overflow-hidden mdt-rounded-md',
          'mdt-bg-primary mdt-px-3 mdt-py-1.5',
          'mdt-text-xs mdt-text-primary-foreground',
          'mdt-animate-in mdt-fade-in-0 mdt-zoom-in-95',
          'data-[state=closed]:mdt-animate-out data-[state=closed]:mdt-fade-out-0 data-[state=closed]:mdt-zoom-out-95',
          'data-[side=bottom]:mdt-slide-in-from-top-2 data-[side=left]:mdt-slide-in-from-right-2',
          'data-[side=right]:mdt-slide-in-from-left-2 data-[side=top]:mdt-slide-in-from-bottom-2',
          className
        )}
        {...props}
      >
        {children}
        {showArrow && <TooltipPrimitive.Arrow className={cn('mdt-fill-primary', arrowClassName)} />}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
);

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
