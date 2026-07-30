import type * as PopoverPrimitive from '@radix-ui/react-popover';
import type { ComponentPropsWithoutRef } from 'react';

/**
 * Props for the Popover root component
 */
export interface PopoverProps extends ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> {
  /**
   * The controlled open state of the popover
   */
  open?: boolean;
  /**
   * Callback when the open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * The modality of the popover. When set to true, interaction with outside elements will be disabled
   * @default false
   */
  modal?: boolean;
}

/**
 * Props for the PopoverContent component
 */
export interface PopoverContentProps extends ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
> {
  /**
   * The preferred alignment against the trigger
   * @default 'center'
   */
  align?: 'start' | 'center' | 'end';
  /**
   * The distance in pixels from the trigger
   * @default 4
   */
  sideOffset?: number;
}

/**
 * Props for the PopoverTrigger component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopoverTriggerProps extends ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Trigger
> {}

/**
 * Props for the PopoverClose component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopoverCloseProps extends ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Close
> {}

/**
 * Props for the PopoverAnchor component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopoverAnchorProps extends ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Anchor
> {}
