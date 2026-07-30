import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from 'react';
import type * as TooltipPrimitive from '@radix-ui/react-tooltip';

/**
 * Props for the TooltipProvider component
 */
export interface TooltipProviderProps {
  /**
   * Content wrapped by the provider
   */
  children: ReactNode;

  /**
   * The duration from when the mouse enters a tooltip trigger until the tooltip opens.
   * @default 200
   */
  delayDuration?: number;

  /**
   * Prevents the tooltip from opening when in keyboard navigation mode.
   * @default false
   */
  skipDelayDuration?: number;

  /**
   * Disables the hover card
   * @default false
   */
  disableHoverableContent?: boolean;
}

/**
 * Props for the Tooltip root component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TooltipProps extends ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {}

/**
 * Props for the TooltipTrigger component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TooltipTriggerProps extends ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Trigger
> {}

/**
 * Props for the TooltipContent component
 */
export interface TooltipContentProps extends Omit<
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
  'content'
> {
  /**
   * The content to display in the tooltip
   */
  children: ReactNode;

  /**
   * Custom className for the tooltip content
   */
  className?: string;

  /**
   * The preferred side of the trigger to render against when open.
   * @default 'top'
   */
  side?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * The distance in pixels from the trigger.
   * @default 4
   */
  sideOffset?: number;

  /**
   * The preferred alignment against the trigger.
   * @default 'center'
   */
  align?: 'start' | 'center' | 'end';

  /**
   * Whether to show the arrow pointing to the trigger.
   * @default true
   */
  showArrow?: boolean;

  /**
   * Custom className for the arrow element.
   */
  arrowClassName?: string;
}

/**
 * Ref type for TooltipContent
 */
export type TooltipContentRef = ElementRef<typeof TooltipPrimitive.Content>;
