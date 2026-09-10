import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from 'react';
import type * as TooltipPrimitive from '@radix-ui/react-tooltip';

/**
 * Props for TooltipProvider. One per app, or one around a component that
 * brings its own bubbles (the Table's contact chips do).
 */
export interface TooltipProviderProps {
  children: ReactNode;
  /**
   * How long the pointer rests on a trigger before the bubble opens.
   * @default 100
   */
  delayDuration?: number;
  /**
   * Moving to a neighbouring trigger within this many ms opens it at once.
   * @default 300
   */
  skipDelayDuration?: number;
  /**
   * Close as soon as the pointer leaves the trigger, instead of letting it
   * travel into the bubble (a scrolling list needs the travel).
   * @default false
   */
  disableHoverableContent?: boolean;
}

/** Props for the Tooltip root, which holds the open state. */
export interface TooltipProps extends ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {
  /**
   * No wait at all. For chips and counters that reveal a value.
   * @default false
   */
  instant?: boolean | undefined;
}

/** Props for the element that opens the bubble. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TooltipTriggerProps extends ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Trigger
> {}

/** Props for the bubble itself. */
export interface TooltipContentProps extends Omit<
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
  'content'
> {
  /** The text. Leave it out when `items` is given. */
  children?: ReactNode;
  className?: string;
  /**
   * Which side of the trigger. Near a screen edge it flips by itself.
   * @default 'top'
   */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /**
   * Distance from the trigger in px, before the arrow.
   * @default 4
   */
  sideOffset?: number;
  /**
   * Where along the trigger the bubble sits.
   * @default 'center'
   */
  align?: 'start' | 'center' | 'end';
  /**
   * The 10 × 5 arrow in the fill colour.
   * @default true
   */
  showArrow?: boolean;
  arrowClassName?: string;
  /** A quieter second line under the text: what a click will do. 10px at 62%. */
  hint?: ReactNode | undefined;
  /** A list of values instead of text: bullet lines, scrolling past seven. */
  items?: string[] | undefined;
  /**
   * The widest the bubble grows before plain text wraps and reads centred.
   * @default 280
   */
  maxWidth?: number | undefined;
}

/** Ref type for TooltipContent. */
export type TooltipContentRef = ElementRef<typeof TooltipPrimitive.Content>;
