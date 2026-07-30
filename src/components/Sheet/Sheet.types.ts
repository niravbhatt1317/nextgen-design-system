import type * as DialogPrimitive from '@radix-ui/react-dialog';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Available positions for the sheet to slide in from
 */
export type SheetSide = 'top' | 'right' | 'bottom' | 'left';

/**
 * Props for the Sheet root component
 */
export type SheetProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

/**
 * Props for the SheetTrigger component
 */
export type SheetTriggerProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;

/**
 * Props for the SheetPortal component
 */
export type SheetPortalProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>;

/**
 * Props for the SheetOverlay component
 */
export type SheetOverlayProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;

/**
 * Props for the SheetContent component
 */
export interface SheetContentProps extends ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> {
  /**
   * The side of the screen the sheet slides in from
   * @default 'right'
   */
  side?: SheetSide;

  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean;
}

/**
 * Props for the SheetHeader component
 */
export interface SheetHeaderProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

/**
 * Props for the SheetFooter component
 */
export interface SheetFooterProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

/**
 * Props for the SheetTitle component
 */
export type SheetTitleProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;

/**
 * Props for the SheetDescription component
 */
export type SheetDescriptionProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Description>;

/**
 * Props for the SheetClose component
 */
export type SheetCloseProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;
