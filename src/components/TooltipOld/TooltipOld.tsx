'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { TooltipContentOldProps, TooltipProviderOldProps } from './TooltipOld.types';

/**
 * TooltipProviderOld - wraps your app or component tree to provide tooltip functionality.
 * Must be placed at the root of components using tooltips.
 *
 * @example
 * ```tsx
 * <TooltipProviderOld>
 *   <TooltipOld>
 *     <TooltipTriggerOld>Hover me</TooltipTriggerOld>
 *     <TooltipContentOld>TooltipOld text</TooltipContentOld>
 *   </TooltipOld>
 * </TooltipProviderOld>
 * ```
 *
 * @deprecated Since 0.4.0. Use `Tooltip`, now the merged console bubble on the library engine.
 */
const TooltipProviderOld = ({ delayDuration = 200, ...props }: TooltipProviderOldProps) => (
  <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
);

TooltipProviderOld.displayName = 'TooltipProviderOld';

/**
 * TooltipOld root component - controls the open state.
 *
 * @deprecated Since 0.4.0. Use `Tooltip`, now the merged console bubble on the library engine.
 */
const TooltipOld = TooltipPrimitive.Root;

/**
 * TooltipTriggerOld - the element that triggers the tooltip on hover.
 *
 * @deprecated Since 0.4.0. Use `Tooltip`, now the merged console bubble on the library engine.
 */
const TooltipTriggerOld = TooltipPrimitive.Trigger;

/**
 * TooltipContentOld - the content container for the tooltip with arrow support.
 *
 * @example
 * ```tsx
 * <TooltipOld>
 *   <TooltipTriggerOld>Hover me</TooltipTriggerOld>
 *   <TooltipContentOld>
 *     <p>Helpful information</p>
 *   </TooltipContentOld>
 * </TooltipOld>
 * ```
 *
 * @deprecated Since 0.4.0. Use `Tooltip`, now the merged console bubble on the library engine.
 */
const TooltipContentOld = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentOldProps
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

TooltipContentOld.displayName = TooltipPrimitive.Content.displayName;

export { TooltipOld, TooltipTriggerOld, TooltipContentOld, TooltipProviderOld };
