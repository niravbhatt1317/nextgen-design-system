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
/** Why a dialog is being asked to close. */
export type DialogCloseReason = 'escape' | 'outside' | 'close-button';

export interface DialogContentProps extends ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> {
  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Nothing dismisses it: no close button, no Escape, no click outside.
   *
   * For the few things that genuinely must be answered - a session that has
   * expired, a plan that has lapsed. Reach for it rarely. A dialog with no way
   * out is the most hostile thing an interface can do, and every use of this is
   * a promise that the content contains the way forward.
   *
   * @default false
   */
  blocking?: boolean;

  /**
   * Work is in flight, so dismissal is refused until it clears.
   *
   * Submitting takes two seconds, and in those two seconds Escape, the close
   * button and a stray click outside would all abandon a request that is
   * already on its way to the server. The button shows `loading`; this stops
   * the dialog going anywhere while it does.
   *
   * @default false
   */
  busy?: boolean;

  /**
   * Asked before every dismissal. Return `false` to keep the dialog open.
   *
   * Anything other than `false` lets it close, so a handler that only wants to
   * observe can return nothing.
   *
   * Where an unsaved-changes guard lives: return `false` and open a
   * confirmation of your own. The reason says which way it was asked, because
   * "I pressed Escape" and "I clicked outside" sometimes deserve different
   * answers - the second is often an accident.
   */
  onRequestClose?: (reason: DialogCloseReason) => boolean | undefined;
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
