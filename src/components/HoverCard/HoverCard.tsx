'use client';

import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { HoverCardContentProps, HoverCardArrowProps } from './HoverCard.types';

/**
 * HoverCard root component - controls open/close state.
 *
 * @example
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger>Hover me</HoverCardTrigger>
 *   <HoverCardContent>
 *     Content shown on hover
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 */
const HoverCard = HoverCardPrimitive.Root;

/**
 * HoverCardTrigger - element that triggers the hover card.
 */
const HoverCardTrigger = HoverCardPrimitive.Trigger;

/**
 * HoverCardPortal - renders hover card content in a portal.
 */
const HoverCardPortal = HoverCardPrimitive.Portal;

/**
 * HoverCardContent - the content container for the hover card.
 *
 * @example
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger asChild>
 *     <Button variant="link">@username</Button>
 *   </HoverCardTrigger>
 *   <HoverCardContent>
 *     <div className="mdt-flex mdt-gap-4">
 *       <img src="avatar.jpg" className="mdt-h-12 mdt-w-12 mdt-rounded-full" />
 *       <div>
 *         <h4 className="mdt-font-semibold">Username</h4>
 *         <p className="mdt-text-sm mdt-text-muted-foreground">Bio text here</p>
 *       </div>
 *     </div>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 */
const HoverCardContent = forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(({ className, align = 'center', sideOffset = 4, side = 'bottom', children, ...props }, ref) => (
  <HoverCardPortal>
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      side={side}
      className={cn(
        'mdt-z-50 mdt-w-64 mdt-rounded-md mdt-border mdt-border-border',
        'mdt-bg-popover mdt-p-4 mdt-text-popover-foreground mdt-shadow-md mdt-outline-none',
        'mdt-duration-200 mdt-ease-in-out',
        'data-[state=closed]:mdt-animate-zoom-out data-[state=open]:mdt-animate-zoom-in',
        className
      )}
      {...props}
    >
      {children}
    </HoverCardPrimitive.Content>
  </HoverCardPortal>
));
HoverCardContent.displayName = 'HoverCardContent';

/**
 * HoverCardArrow - an optional arrow element to render alongside the hover card content.
 *
 * @example
 * ```tsx
 * <HoverCardContent>
 *   <HoverCardArrow />
 *   <p>Content with arrow</p>
 * </HoverCardContent>
 * ```
 */
const HoverCardArrow = forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Arrow>,
  HoverCardArrowProps
>(({ className, width, height, ...props }, ref) => (
  <HoverCardPrimitive.Arrow
    ref={ref}
    width={width}
    height={height}
    className={cn('mdt-fill-border', className)}
    {...props}
  />
));
HoverCardArrow.displayName = 'HoverCardArrow';

export { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardPortal, HoverCardArrow };
