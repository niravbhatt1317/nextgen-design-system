import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type * as HoverCardPrimitive from '@radix-ui/react-hover-card';

/**
 * Props for the HoverCard root component
 */
export interface HoverCardProps extends HoverCardPrimitive.HoverCardProps {
  /**
   * The open state of the hover card when it is initially rendered. Use when you do not need to control its open state.
   */
  defaultOpen?: boolean;

  /**
   * The controlled open state of the hover card. Must be used in conjunction with onOpenChange.
   */
  open?: boolean;

  /**
   * Event handler called when the open state of the hover card changes.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * The duration from when the mouse enters the trigger until the hover card opens.
   * @default 700
   */
  openDelay?: number;

  /**
   * The duration from when the mouse leaves the trigger until the hover card closes.
   * @default 300
   */
  closeDelay?: number;
}

/**
 * Props for the HoverCardTrigger component
 */
export interface HoverCardTriggerProps extends HoverCardPrimitive.HoverCardTriggerProps {
  /**
   * Content to render inside the trigger
   */
  children: ReactNode;

  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   * @default false
   */
  asChild?: boolean;
}

/**
 * Props for the HoverCardContent component
 */
export interface HoverCardContentProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Content to render inside the hover card
   */
  children: ReactNode;

  /**
   * The preferred side of the trigger to render against when open.
   * Will be reversed when collisions occur and avoidCollisions is enabled.
   * @default 'bottom'
   */
  side?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * The preferred alignment against the trigger. May change when collisions occur.
   * @default 'center'
   */
  align?: 'start' | 'center' | 'end';

  /**
   * The distance in pixels from the trigger.
   * @default 0
   */
  sideOffset?: number;

  /**
   * An offset in pixels from the "start" or "end" alignment options.
   * @default 0
   */
  alignOffset?: number;

  /**
   * When true, overrides the side and align preferences to prevent collisions with boundary edges.
   * @default true
   */
  avoidCollisions?: boolean;

  /**
   * The element used as the collision boundary. By default this is the viewport.
   */
  collisionBoundary?: Element | null | (Element | null)[];

  /**
   * The distance in pixels from the boundary edges where collision detection should occur.
   * @default 0
   */
  collisionPadding?: number | Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>;

  /**
   * The sticky behavior on the align axis. "partial" will keep the content in the boundary as long as the trigger is at least partially in the boundary.
   * @default 'partial'
   */
  sticky?: 'partial' | 'always';

  /**
   * Whether to hide the content when the trigger becomes fully occluded.
   * @default false
   */
  hideWhenDetached?: boolean;
}

/**
 * Props for the HoverCardArrow component
 */
export interface HoverCardArrowProps extends HoverCardPrimitive.HoverCardArrowProps {
  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * The width of the arrow in pixels.
   * @default 10
   */
  width?: number;

  /**
   * The height of the arrow in pixels.
   * @default 5
   */
  height?: number;
}
