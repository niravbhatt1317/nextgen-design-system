'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { TooltipContentProps, TooltipProps, TooltipProviderProps } from './Tooltip.types';
import './tooltip.css';

/**
 * TooltipProvider - wraps the app, or a component that brings its own bubbles.
 * 100ms before a bubble opens; neighbours within 300ms open at once.
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
const TooltipProvider = ({
  delayDuration = 100,
  skipDelayDuration = 300,
  ...props
}: TooltipProviderProps) => (
  <TooltipPrimitive.Provider
    delayDuration={delayDuration}
    skipDelayDuration={skipDelayDuration}
    {...props}
  />
);
TooltipProvider.displayName = 'TooltipProvider';

/**
 * Tooltip - holds the open state. `instant` drops the wait, for chips and
 * counters that reveal a value.
 */
const Tooltip = ({ instant = false, ...props }: TooltipProps) => (
  <TooltipPrimitive.Root {...(instant ? { delayDuration: 0 } : {})} {...props} />
);
Tooltip.displayName = 'Tooltip';

/** TooltipTrigger - the element that opens the bubble, on hover and on keyboard focus. */
const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * TooltipContent - the bubble: the console's fill and text on the library's
 * engine. Plain text wraps at `maxWidth` and reads centred; a `hint` or an
 * `items` list reads from the left.
 *
 * @example
 * ```tsx
 * <TooltipContent hint="Click the icon to copy the mail">
 *   sarah.johnson@company.com
 * </TooltipContent>
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
      hint,
      items,
      maxWidth = 280,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const fromLeft = hint !== undefined || items !== undefined;
    return (
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          side={side}
          sideOffset={sideOffset}
          align={align}
          className={cn(
            'tt mdt-z-50 mdt-rounded-md mdt-bg-neutral-130 mdt-px-3 mdt-py-1.5',
            'mdt-text-xs mdt-leading-4 mdt-text-white',
            'dark:mdt-bg-neutral-10 dark:mdt-text-neutral-130',
            fromLeft ? 'mdt-text-left' : 'mdt-text-center',
            className
          )}
          style={{ maxWidth, ...style }}
          {...props}
        >
          {items !== undefined ? (
            <ul className="tt-list mdt-m-0 mdt-flex mdt-max-h-[133px] mdt-list-none mdt-flex-col mdt-gap-[3px] mdt-overflow-y-auto mdt-p-0">
              {items.map((item) => (
                <li key={item} className="tt-li mdt-shrink-0 mdt-truncate">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            children
          )}
          {hint !== undefined && (
            <span className="tt-hint mdt-mt-px mdt-block mdt-text-[10px] mdt-leading-[14px] mdt-opacity-[0.62]">
              {hint}
            </span>
          )}
          {showArrow && (
            <TooltipPrimitive.Arrow
              className={cn('mdt-fill-neutral-130 dark:mdt-fill-neutral-10', arrowClassName)}
            />
          )}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    );
  }
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
