'use client';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type {
  ScrollAreaProps,
  ScrollBarProps,
  ScrollAreaViewportProps,
  ScrollAreaCornerProps,
} from './ScrollArea.types';

/**
 * ScrollArea - A custom scrollable area with styled scrollbars.
 * Built on top of Radix UI ScrollArea primitive.
 *
 * @example
 * ```tsx
 * <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
 *   <div>Long content here...</div>
 * </ScrollArea>
 * ```
 */
const ScrollArea = forwardRef<React.ElementRef<typeof ScrollAreaPrimitive.Root>, ScrollAreaProps>(
  ({ className, children, orientation = 'vertical', ...props }, ref) => {
    // Determine actual orientation for first scrollbar
    const primaryOrientation = orientation === 'both' ? 'vertical' : orientation;

    return (
      <ScrollAreaPrimitive.Root
        ref={ref}
        className={cn('mdt-relative mdt-overflow-hidden', className)}
        {...props}
      >
        <ScrollAreaPrimitive.Viewport
          className="mdt-h-full mdt-w-full mdt-rounded-[inherit]"
          tabIndex={0}
        >
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar orientation={primaryOrientation} />
        {orientation === 'both' && <ScrollBar orientation="horizontal" />}
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    );
  }
);
ScrollArea.displayName = 'ScrollArea';

/**
 * ScrollAreaViewport - The viewport element for the scroll area.
 * Use when you need more control over the viewport styling.
 */
const ScrollAreaViewport = forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Viewport>,
  ScrollAreaViewportProps
>(({ className, ...props }, ref) => (
  <ScrollAreaPrimitive.Viewport
    ref={ref}
    className={cn('mdt-h-full mdt-w-full mdt-rounded-[inherit]', className)}
    tabIndex={0}
    {...props}
  />
));
ScrollAreaViewport.displayName = 'ScrollAreaViewport';

/**
 * ScrollBar - The scrollbar element.
 * Can be used for both vertical and horizontal scrolling.
 */
const ScrollBar = forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'mdt-flex mdt-touch-none mdt-select-none mdt-transition-colors',
      orientation === 'vertical' &&
        'mdt-h-full mdt-w-2.5 mdt-border-l mdt-border-l-transparent mdt-p-[1px]',
      orientation === 'horizontal' &&
        'mdt-h-2.5 mdt-flex-col mdt-border-t mdt-border-t-transparent mdt-p-[1px]',
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="mdt-relative mdt-flex-1 mdt-rounded-full mdt-bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = 'ScrollBar';

/**
 * ScrollAreaCorner - The corner element where scrollbars meet.
 */
const ScrollAreaCorner = forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Corner>,
  ScrollAreaCornerProps
>(({ className, ...props }, ref) => (
  <ScrollAreaPrimitive.Corner ref={ref} className={cn('mdt-bg-muted', className)} {...props} />
));
ScrollAreaCorner.displayName = 'ScrollAreaCorner';

export { ScrollArea, ScrollAreaViewport, ScrollBar, ScrollAreaCorner };
