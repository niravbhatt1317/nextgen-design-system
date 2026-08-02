'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import { Icon } from '@/components/Icon';
import type {
  SheetContentProps,
  SheetDescriptionProps,
  SheetFooterProps,
  SheetHeaderProps,
  SheetOverlayProps,
  SheetTitleProps,
} from './Sheet.types';

/**
 * Sheet - a task that attends to something on screen, from the edge.
 *
 * A drawer, in most people's vocabulary. The word is here so that searching for
 * it finds this.
 *
 * ## Sheet or Dialog
 *
 * They are built from the same primitive and share an overlay, a focus trap,
 * escape handling and an animation. The mechanics will not tell you which to
 * reach for. One question does:
 *
 * > **Does the task need the thing behind it?**
 *
 * **Yes — a Sheet.** You came from a list, a record, a canvas, and you are
 * going back to it; it stays legible behind you. **No — a `Dialog`.** It
 * interrupts, and the background is dimmed because it has stopped mattering.
 *
 * | | |
 * | --- | --- |
 * | Inspect a record you clicked in a list | **Sheet** |
 * | Filters | **Sheet** |
 * | A long form of stacked fields | **Sheet** |
 * | Anything you open dozens of times a session | **Sheet** - it is the gentler interruption |
 * | Destructive confirm | `Dialog`, always |
 * | Blocking - session expired, forced upgrade | `Dialog` |
 * | Compare options side by side | `Dialog` |
 * | Settings, or picking from a grid | `Dialog` at full size |
 * | Wizard or onboarding sequence | `Dialog` |
 *
 * **Shape follows content**, and it decides more cases than any principle. A
 * Sheet is tall and narrow, so it suits a vertical stack - fields, a record's
 * properties, an activity feed. Three pricing tiers physically do not fit in
 * one; that belongs in a `Dialog`.
 *
 * **Creating something new depends on where you came from.** From a list, a
 * Sheet keeps the list visible while the new row appears in it. From a global
 * "New" button there is no context to preserve, so a `Dialog` is right. Attio's
 * new record is a drawer; Linear's new issue is a modal. Both are correct.
 *
 * ### Never
 *
 * - A destructive confirm in a Sheet. You must not be able to work around the
 *   decision by carrying on beside it.
 * - A wizard in a Sheet: step chrome and back/next read wrong on a narrow
 *   vertical surface.
 * - Sheet stacked on Sheet. A **`Dialog` over a Sheet** is the one legitimate
 *   stack - a confirmation interrupting a panel.
 *
 * @example
 * ```tsx
 * <Sheet>
 *   <SheetTrigger asChild><Button>Filters</Button></SheetTrigger>
 *   <SheetContent side="right">
 *     <SheetHeader>
 *       <SheetTitle>Filters</SheetTitle>
 *     </SheetHeader>
 *   </SheetContent>
 * </Sheet>
 * ```
 */
const Sheet = DialogPrimitive.Root;

/**
 * SheetTrigger - element that opens the sheet.
 */
const SheetTrigger = DialogPrimitive.Trigger;

/**
 * SheetPortal - renders sheet content in a portal.
 */
const SheetPortal = DialogPrimitive.Portal;

/**
 * SheetClose - element that closes the sheet.
 */
const SheetClose = DialogPrimitive.Close;

/**
 * SheetOverlay - semi-transparent backdrop behind the sheet.
 */
const SheetOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  SheetOverlayProps
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
SheetOverlay.displayName = 'SheetOverlay';

/**
 * Sheet content variants for different slide-in positions
 */
const sheetVariants = cva(
  [
    'mdt-fixed mdt-z-50 mdt-gap-4 mdt-bg-background mdt-p-6 mdt-shadow-lg',
    'mdt-transition mdt-ease-in-out',
    'data-[state=closed]:mdt-duration-300 data-[state=open]:mdt-duration-500',
  ],
  {
    variants: {
      side: {
        top: [
          'mdt-inset-x-0 mdt-top-0 mdt-border-b mdt-border-border',
          'data-[state=closed]:mdt-animate-slide-out-to-top',
          'data-[state=open]:mdt-animate-slide-in-from-top',
        ],
        bottom: [
          'mdt-inset-x-0 mdt-bottom-0 mdt-border-t mdt-border-border',
          'data-[state=closed]:mdt-animate-slide-out-to-bottom',
          'data-[state=open]:mdt-animate-slide-in-from-bottom',
        ],
        left: [
          'mdt-inset-y-0 mdt-left-0 mdt-h-full mdt-border-r mdt-border-border',
          'data-[state=closed]:mdt-animate-slide-out-to-left',
          'data-[state=open]:mdt-animate-slide-in-from-left',
        ],
        right: [
          'mdt-inset-y-0 mdt-right-0 mdt-h-full mdt-border-l mdt-border-border',
          'data-[state=closed]:mdt-animate-slide-out-to-right',
          'data-[state=open]:mdt-animate-slide-in-from-right',
        ],
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);

export type SheetVariants = VariantProps<typeof sheetVariants>;

/**
 * SheetContent - the main content container for the sheet.
 *
 * @example
 * ```tsx
 * <Sheet>
 *   <SheetTrigger asChild>
 *     <Button>Open Sheet</Button>
 *   </SheetTrigger>
 *   <SheetContent side="right">
 *     <SheetHeader>
 *       <SheetTitle>Sheet Title</SheetTitle>
 *       <SheetDescription>Sheet description</SheetDescription>
 *     </SheetHeader>
 *     <p>Sheet content goes here</p>
 *     <SheetFooter>
 *       <Button>Action</Button>
 *     </SheetFooter>
 *   </SheetContent>
 * </Sheet>
 * ```
 */
const SheetContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', className, children, showCloseButton = true, ...props }, ref) => {
  // Check if className contains width classes to determine if we should use defaults
  const hasWidthClass = className && /mdt-w-|mdt-max-w-/.test(className);
  const defaultWidthClass = side === 'left' || side === 'right' ? 'mdt-w-3/4 sm:mdt-max-w-sm' : '';

  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(sheetVariants({ side }), !hasWidthClass && defaultWidthClass, className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            className={cn(
              'mdt-absolute mdt-right-4 mdt-top-4 mdt-rounded-sm mdt-opacity-70',
              'mdt-ring-offset-background mdt-transition-opacity',
              'hover:mdt-opacity-100',
              'focus:mdt-outline-none focus:mdt-ring-2 focus:mdt-ring-ring focus:mdt-ring-offset-2',
              'disabled:mdt-pointer-events-none',
              'data-[state=open]:mdt-bg-secondary'
            )}
          >
            <Icon name="x" size="sm" aria-hidden />
            <span className="mdt-sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </SheetPortal>
  );
});
SheetContent.displayName = 'SheetContent';

/**
 * SheetHeader - container for title and description.
 */
const SheetHeader = forwardRef<HTMLDivElement, SheetHeaderProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'mdt-flex mdt-flex-col mdt-space-y-2 mdt-text-center sm:mdt-text-left',
      className
    )}
    {...props}
  />
));
SheetHeader.displayName = 'SheetHeader';

/**
 * SheetFooter - container for action buttons.
 */
const SheetFooter = forwardRef<HTMLDivElement, SheetFooterProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'mdt-flex mdt-flex-col-reverse sm:mdt-flex-row sm:mdt-justify-end sm:mdt-space-x-2',
      className
    )}
    {...props}
  />
));
SheetFooter.displayName = 'SheetFooter';

/**
 * SheetTitle - the title of the sheet.
 */
const SheetTitle = forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, SheetTitleProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={cn('mdt-text-lg mdt-font-semibold mdt-text-foreground', className)}
      {...props}
    />
  )
);
SheetTitle.displayName = 'SheetTitle';

/**
 * SheetDescription - secondary text below the title.
 */
const SheetDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  SheetDescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('mdt-text-sm mdt-text-muted-foreground', className)}
    {...props}
  />
));
SheetDescription.displayName = 'SheetDescription';

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  sheetVariants,
};
