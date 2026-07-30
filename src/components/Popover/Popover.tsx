import * as PopoverPrimitive from '@radix-ui/react-popover';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cn } from '@/utils';

/**
 * Popover root component - controls the open state.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>Click me</PopoverTrigger>
 *   <PopoverContent>Popover content</PopoverContent>
 * </Popover>
 * ```
 */
const Popover = PopoverPrimitive.Root;

/**
 * PopoverTrigger - the button that toggles the popover.
 */
const PopoverTrigger = PopoverPrimitive.Trigger;

/**
 * PopoverAnchor - an optional element to anchor the popover to.
 */
const PopoverAnchor = PopoverPrimitive.Anchor;

/**
 * PopoverContent - the content container for the popover.
 *
 * @example
 * ```tsx
 * <PopoverContent>
 *   <div>Your content here</div>
 * </PopoverContent>
 * ```
 */
const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'mdt-z-50 mdt-w-72 mdt-rounded-md mdt-border mdt-border-border',
        'mdt-bg-popover mdt-p-4 mdt-text-popover-foreground mdt-shadow-md',
        'mdt-outline-none',
        'data-[state=open]:mdt-animate-in data-[state=closed]:mdt-animate-out',
        'data-[state=closed]:mdt-fade-out-0 data-[state=open]:mdt-fade-in-0',
        'data-[state=closed]:mdt-zoom-out-95 data-[state=open]:mdt-zoom-in-95',
        'data-[side=bottom]:mdt-slide-in-from-top-2 data-[side=left]:mdt-slide-in-from-right-2',
        'data-[side=right]:mdt-slide-in-from-left-2 data-[side=top]:mdt-slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

/**
 * PopoverClose - an optional close button for the popover.
 */
const PopoverClose = PopoverPrimitive.Close;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose };
