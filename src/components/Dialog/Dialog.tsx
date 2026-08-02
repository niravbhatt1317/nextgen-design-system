'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type {
  DialogCloseReason,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogTitleProps,
} from './Dialog.types';

/**
 * Dialog - a task that interrupts, in the middle of the screen.
 *
 * ## Dialog or Sheet
 *
 * They are built from the same primitive and share an overlay, a focus trap,
 * escape handling and an animation. The mechanics will not tell you which to
 * reach for. One question does:
 *
 * > **Does the task need the thing behind it?**
 *
 * **No — a Dialog.** It interrupts, and the background is dimmed because it has
 * stopped mattering. **Yes — a `Sheet`.** It attends to something on screen,
 * which stays legible because you are going back to it.
 *
 * | | |
 * | --- | --- |
 * | Destructive confirm | **Dialog**, always. You must not be able to work around the decision. |
 * | Blocking - session expired, forced upgrade | **Dialog** |
 * | Compare options side by side | **Dialog** |
 * | Pick from a grid | **Dialog**, `size="full"` |
 * | Settings | **Dialog**, `size="full"` - an app inside an app needs nav *and* content |
 * | Wizard or onboarding sequence | **Dialog** |
 * | Inspect a record you clicked in a list | `Sheet` |
 * | Filters | `Sheet` |
 * | A long form of stacked fields | `Sheet` |
 *
 * **Shape follows content**, and it decides more cases than any principle. A
 * Dialog is wide, so it suits horizontal composition - three plan cards, a
 * grid, a form beside a live preview. A `Sheet` is tall and narrow, so it suits
 * a vertical stack. Three pricing tiers physically do not fit in a drawer.
 *
 * **Creating something new depends on where you came from.** From a list, a
 * `Sheet` keeps the list visible while the new row appears in it. From a global
 * "New" button there is no context to preserve, so a Dialog is right. Linear's
 * new issue is a modal; Attio's new record is a drawer. Both are correct.
 *
 * **Frequency decides how violent it should be.** Something opened dozens of
 * times a session should slide in from the edge. Something opened once - delete,
 * upgrade - can take the centre.
 *
 * ### Never
 *
 * - A destructive confirm in a `Sheet`.
 * - A wizard in a `Sheet`: step chrome and back/next read wrong on a narrow
 *   vertical surface.
 * - Sheet stacked on Sheet. A **Dialog over a Sheet** is the one legitimate
 *   stack - a confirmation interrupting a panel.
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger asChild><Button>Delete</Button></DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Delete connection</DialogTitle>
 *       <DialogDescription>This cannot be undone.</DialogDescription>
 *     </DialogHeader>
 *     <DialogFooter>
 *       <Button variant="outline">Cancel</Button>
 *       <Button variant="destructive">Delete</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
const Dialog = DialogPrimitive.Root;

/**
 * DialogTrigger - element that opens the dialog.
 */
const DialogTrigger = DialogPrimitive.Trigger;

/**
 * DialogPortal - renders dialog content in a portal.
 */
const DialogPortal = DialogPrimitive.Portal;

/**
 * DialogClose - element that closes the dialog.
 */
const DialogClose = DialogPrimitive.Close;

/**
 * DialogOverlay - semi-transparent backdrop behind the dialog.
 */
const DialogOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'mdt-fixed mdt-inset-0 mdt-z-50 mdt-bg-black/80',
      'data-[state=closed]:mdt-animate-fade-out data-[state=open]:mdt-animate-fade-in',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = 'DialogOverlay';

/**
 * Close icon component for the dialog
 */
function CloseIcon() {
  return <Icon name="x" size="sm" aria-hidden />;
}

/**
 * DialogContent - the main content container for the dialog.
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <Button>Open Dialog</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Dialog Title</DialogTitle>
 *       <DialogDescription>Dialog description</DialogDescription>
 *     </DialogHeader>
 *     <p>Dialog content goes here</p>
 *     <DialogFooter>
 *       <Button>Action</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
const DialogContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    {
      className,
      children,
      showCloseButton = true,
      blocking = false,
      busy = false,
      onRequestClose,
      ...props
    },
    ref
  ) => {
    /**
     * One gate for every way out.
     *
     * Escape, a click outside and the close button are three different events and
     * one question: may this close? Answering it in three places is how they
     * drift - the guard catches Escape and forgets the overlay, and half a form
     * is gone.
     */
    const mayClose = (reason: DialogCloseReason) => {
      if (blocking || busy) return false;
      return onRequestClose?.(reason) !== false;
    };

    return (
      <DialogPortal>
        <DialogOverlay />
        {/*
      Centred by layout, not by a transform.

      It used to sit at `left: 50%; top: 50%` and pull itself back with
      `translate(-50%, -50%)` - and the open animation's keyframe sets
      `transform: scale(0.95)`. A keyframe's transform *replaces* the element's,
      so for those 200ms the centring did not exist: the box hung with its own
      top-left corner at the middle of the screen, down and to the right of
      where it belonged, and snapped into place when the animation ended. That
      was the jolt on every open, and the same on close.

      Centring with a flex parent leaves `transform` free for the animation, and
      pays for itself twice more: `p-4` keeps the dialog off the edge of a small
      screen, and `overflow-y-auto` with `min-h-full` gives a tall one somewhere
      to scroll instead of growing past the viewport.
    */}
        {/*
          No inset on a phone, 16px above that. A dialog floating in the middle
          of a 375px screen with a strip of dimmed page around it is smaller
          than it needs to be and harder to reach; below the breakpoint it takes
          the screen.
        */}
        <div className="mdt-fixed mdt-inset-0 mdt-z-50 mdt-overflow-y-auto sm:mdt-p-4">
          <div className="mdt-flex mdt-min-h-full mdt-items-center mdt-justify-center">
            <DialogPrimitive.Content
              ref={ref}
              onEscapeKeyDown={(event) => {
                if (!mayClose('escape')) event.preventDefault();
              }}
              onPointerDownOutside={(event) => {
                if (!mayClose('outside')) event.preventDefault();
              }}
              onInteractOutside={(event) => {
                if (!mayClose('outside')) event.preventDefault();
              }}
              className={cn(
                'mdt-relative mdt-grid mdt-w-full mdt-max-w-lg',
                // Full-bleed on a phone, a card above that. Corners and a
                // border on something that reaches every edge are decoration
                // on a seam that does not exist.
                'mdt-min-h-full mdt-rounded-none sm:mdt-min-h-0 sm:mdt-rounded-lg',
                'mdt-gap-4 mdt-border mdt-border-border mdt-bg-background mdt-p-6 mdt-shadow-lg',
                'mdt-duration-200 mdt-ease-in-out',
                'data-[state=closed]:mdt-animate-zoom-out data-[state=open]:mdt-animate-zoom-in',
                className
              )}
              {...props}
            >
              {children}
              {/*
            A blocking dialog shows no way out, because there is not one. An X
            that refuses to work is worse than no X - it reads as broken rather
            than as deliberate.
          */}
              {showCloseButton && !blocking && (
                <DialogPrimitive.Close
                  disabled={busy}
                  onClick={(event) => {
                    if (!mayClose('close-button')) event.preventDefault();
                  }}
                  className={cn(
                    'mdt-absolute mdt-right-4 mdt-top-4 mdt-rounded-sm mdt-opacity-70',
                    'mdt-ring-offset-background mdt-transition-opacity',
                    'hover:mdt-opacity-100',
                    'focus:mdt-outline-none focus:mdt-ring-2 focus:mdt-ring-ring focus:mdt-ring-offset-2',
                    'disabled:mdt-pointer-events-none',
                    'data-[state=open]:mdt-bg-accent data-[state=open]:mdt-text-muted-foreground'
                  )}
                >
                  <CloseIcon />
                  <span className="mdt-sr-only">Close</span>
                </DialogPrimitive.Close>
              )}
            </DialogPrimitive.Content>
          </div>
        </div>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = 'DialogContent';

/**
 * DialogHeader - container for title and description.
 */
const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'mdt-flex mdt-flex-col mdt-space-y-1.5 mdt-text-center sm:mdt-text-left',
        className
      )}
      {...props}
    />
  )
);
DialogHeader.displayName = 'DialogHeader';

/**
 * DialogFooter - container for action buttons.
 */
const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'mdt-flex mdt-flex-col-reverse sm:mdt-flex-row sm:mdt-justify-end sm:mdt-space-x-2',
        className
      )}
      {...props}
    />
  )
);
DialogFooter.displayName = 'DialogFooter';

/**
 * DialogTitle - the title of the dialog.
 */
const DialogTitle = forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={cn('mdt-text-lg mdt-font-semibold mdt-leading-none mdt-tracking-tight', className)}
      {...props}
    />
  )
);
DialogTitle.displayName = 'DialogTitle';

/**
 * DialogDescription - secondary text below the title.
 */
const DialogDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('mdt-text-sm mdt-text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = 'DialogDescription';

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
