import type * as PopoverPrimitive from '@radix-ui/react-popover';
import type { ComponentPropsWithoutRef } from 'react';

/**
 * Props for the PopoverOld2 root component
 */
export interface PopoverOld2Props extends ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> {
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
 * Props for the PopoverOld2Content component
 */
export interface PopoverOld2ContentProps extends ComponentPropsWithoutRef<
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
 * Props for the PopoverOld2Trigger component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopoverOld2TriggerProps extends ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Trigger
> {}

/**
 * Props for the PopoverOld2Close component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopoverOld2CloseProps extends ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Close
> {}

/**
 * Props for the PopoverOld2Anchor component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopoverOld2AnchorProps extends ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Anchor
> {}
