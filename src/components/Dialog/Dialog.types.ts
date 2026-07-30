import type * as DialogPrimitive from '@radix-ui/react-dialog';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Props for the Dialog root component
 */
export type DialogProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

/**
 * Props for the DialogTrigger component
 */
export type DialogTriggerProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;

/**
 * Props for the DialogPortal component
 */
export type DialogPortalProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>;

/**
 * Props for the DialogOverlay component
 */
export type DialogOverlayProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;

/**
 * Props for the DialogContent component
 */
export interface DialogContentProps extends ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> {
  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean;
}

/**
 * Props for the DialogHeader component
 */
export interface DialogHeaderProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

/**
 * Props for the DialogFooter component
 */
export interface DialogFooterProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

/**
 * Props for the DialogTitle component
 */
export type DialogTitleProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;

/**
 * Props for the DialogDescription component
 */
export type DialogDescriptionProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Description>;

/**
 * Props for the DialogClose component
 */
export type DialogCloseProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;
