import * as PopoverPrimitive from '@radix-ui/react-popover';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cn } from '@/utils';

/**
 * Popover - rich content that floats over the page from a trigger, on Radix Popover.
 *
 * THE PART THAT OWNS THE OVERLAY SURFACE (Pranjal, 2026-09-26: "create a popover component where you use this color.
 * so that atleast this popover color issue will be resolved. keep it in new component and if a old component does
 * exist move it depricated."). Its ground is `--mdt-popover`, the colour map's `elevation.surface.overlay`: #FFFFFF
 * in light, #111C2C in dark - the storybook's neutral-150, tried on the console's Users page on 2026-09-25 ("for
 * popovers try bg of 111c2c neutral 150") and ruled for the map on 2026-09-26 ("we have changed the popover color
 * but its not getting mapped properly"). In dark that is a step DARKER than a card, so a menu reads as its own thing
 * on any surface and the hairline (#1D2A3E) stays visible on it. The ink is `--mdt-popover-foreground`.
 *
 * No private dark rule lives here: the theme is the tokens', switched by <html data-theme="dark">. The earlier
 * Popover (now PopoverOld, under Deprecated) carried a `dark:` border variant written for the old built-in palette.
 *
 * `popoverSurface` is the same frame as a class list, for the other parts that float - the row menu, a select list,
 * the date panel, the filter panel - so they share one ground and one edge instead of each naming their own.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>
 *   <PopoverContent>…</PopoverContent>
 * </Popover>
 * ```
 */

/** The overlay surface as one class list: ground, ink, hairline edge, radius, the elevated shadow. */
export const popoverSurface =
  'mdt-rounded-md mdt-border mdt-border-neutral-30 mdt-bg-popover mdt-text-popover-foreground mdt-shadow-lg';

const Popover = PopoverPrimitive.Root;

/** The button that toggles the popover. */
const PopoverTrigger = PopoverPrimitive.Trigger;

/** An optional element to anchor the popover to. */
const PopoverAnchor = PopoverPrimitive.Anchor;

/** The floating panel: the overlay surface, 4 under its trigger, 16 of padding, 288 wide unless told otherwise. */
const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      data-surface="overlay"
      className={cn(
        'mdt-z-50 mdt-w-72 mdt-p-4 mdt-outline-none',
        popoverSurface,
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

/** An optional close button for the popover. */
const PopoverClose = PopoverPrimitive.Close;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose };
