/* DEPRECATED 2026-09-26 - use Popover. Pranjal: "create a popover component where you use this color ... if a old
 * component does exist move it depricated." This is the earlier Popover, frozen for side-by-side review until the removal
 * pull request. Its one `dark:` variant is gone: nothing sets the `.dark` class any more, so it never applied. */
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cn } from '@/utils';

/**
 * PopoverOld root component - controls the open state.
 *
 * @example
 * ```tsx
 * <PopoverOld>
 *   <PopoverOldTrigger>Click me</PopoverOldTrigger>
 *   <PopoverOldContent>PopoverOld content</PopoverOldContent>
 * </PopoverOld>
 * ```
 */
const PopoverOld = PopoverPrimitive.Root;

/**
 * PopoverOldTrigger - the button that toggles the popover.
 */
const PopoverOldTrigger = PopoverPrimitive.Trigger;

/**
 * PopoverOldAnchor - an optional element to anchor the popover to.
 */
const PopoverOldAnchor = PopoverPrimitive.Anchor;

/**
 * PopoverOldContent - the content container for the popover.
 *
 * @example
 * ```tsx
 * <PopoverOldContent>
 *   <div>Your content here</div>
 * </PopoverOldContent>
 * ```
 */
const PopoverOldContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'mdt-z-50 mdt-w-72 mdt-rounded-md mdt-border mdt-border-neutral-30',
        'mdt-bg-popover mdt-p-4 mdt-text-popover-foreground mdt-shadow-lg',
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

PopoverOldContent.displayName = PopoverPrimitive.Content.displayName;

/**
 * PopoverOldClose - an optional close button for the popover.
 */
const PopoverOldClose = PopoverPrimitive.Close;

export { PopoverOld, PopoverOldTrigger, PopoverOldContent, PopoverOldAnchor, PopoverOldClose };
