'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva } from 'class-variance-authority';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/utils';
import {
  SCROLL_FADE_BOTTOM,
  SCROLL_FADE_DOWN,
  SCROLL_FADE_OFF,
  SCROLL_FADE_STRIP,
  SCROLL_FADE_TOP,
  SCROLL_FADE_UP,
} from '@/utils/scroll-fade';
import {
  CLOSE_POSITION,
  CLOSE_PULL,
  DialogDensityContext,
  DialogScrollContext,
  useDialogFooterTop,
  useDialogGutter,
  useDialogScrollerPull,
  useDialogScrollsBody,
  useDialogScrollTail,
  useDialogTop,
} from './dialogSpacing';
import { Icon } from '../Icon';
import type {
  DialogBodyProps,
  DialogCloseReason,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogMediaProps,
  DialogOverlayProps,
  DialogScroll,
  DialogTitleProps,
} from './Dialog.types';

/**
 * How wide the dialog is, and how much room it gives its contents.
 *
 * Sizes are named for the job rather than the pixels, and there are five
 * because the product clusters at five. `full` stretches instead of capping:
 * `self-stretch` beats the centring on the flex parent, so it fills the height
 * the scroller already has without anybody having to compute a viewport
 * calculation.
 */
const dialogContentVariants = cva('', {
  variants: {
    size: {
      sm: 'sm:mdt-max-w-md',
      md: 'sm:mdt-max-w-lg',
      lg: 'sm:mdt-max-w-2xl',
      xl: 'sm:mdt-max-w-4xl',
      full: 'mdt-max-w-none sm:mdt-self-stretch',
    },
    density: {
      // The rhythm between regions, and the floor beneath the last one. Left,
      // right and top belong to the regions themselves - see `dialogSpacing`.
      //
      // The bottom stays here because no region knows whether it is the last
      // thing in the box. A dialog with a footer wants the floor under its
      // buttons and one without wants it under its body; putting it on the
      // container is what makes those the same number rather than two that
      // drift. It is the step minus 4 at each density.
      compact: 'mdt-gap-3 mdt-pb-2',
      comfortable: 'mdt-gap-4 mdt-pb-3',
      spacious: 'mdt-gap-6 mdt-pb-5',
    },
  },
  defaultVariants: { size: 'md', density: 'comfortable' },
});

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
      size = 'md',
      density = 'comfortable',
      scroll = 'page',
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
    const closePosition = CLOSE_POSITION[density];
    // Named `scrolls` inside, because `scroll` is also a DOM event handler and
    // reading `scroll === 'body'` beside `onScroll` invites a misread.
    const scrolls: DialogScroll = scroll;
    const scrollerPull = useDialogScrollerPull();

    const mayClose = (reason: DialogCloseReason) => {
      if (blocking || busy) return false;
      return onRequestClose?.(reason) !== false;
    };

    return (
      <DialogScrollContext.Provider value={scrolls}>
        <DialogDensityContext.Provider value={density}>
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
            <div
              className={cn(
                'mdt-fixed mdt-inset-0 mdt-z-50 sm:mdt-p-4',
                // `page` scrolls the dimmed area behind the dialog; `body` never
                // does, because the dialog is capped to fit inside it.
                scrolls === 'page' ? 'mdt-overflow-y-auto' : 'mdt-overflow-hidden'
              )}
            >
              <div
                className={cn(
                  'mdt-flex mdt-items-center mdt-justify-center',
                  // `min-h-full` lets a tall dialog push the wrapper taller than
                  // the screen and scroll it. `h-full` refuses to, which is what
                  // gives `max-h-full` on the dialog something to measure
                  // against - without it there is no height to be a fraction of.
                  scrolls === 'page' ? 'mdt-min-h-full' : 'mdt-h-full'
                )}
              >
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
                    // `flex-col`, not `grid`. Identical for a stack of blocks
                    // with a gap, and the difference only shows up when one of
                    // them has to scroll: a flex child can be told to take the
                    // leftover height and no more.
                    'mdt-relative mdt-flex mdt-w-full mdt-flex-col',
                    dialogContentVariants({ size, density }),
                    scrolls === 'body' && ['mdt-max-h-full mdt-overflow-hidden', scrollerPull],
                    // Full-bleed on a phone, a card above that. Corners and a
                    // border on something that reaches every edge are decoration
                    // on a seam that does not exist.
                    'mdt-min-h-full mdt-rounded-none sm:mdt-min-h-0 sm:mdt-rounded-lg',
                    'mdt-border mdt-border-border mdt-bg-background mdt-shadow-lg',
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
                        // A 28px box, which is the height of the title's line, so
                        // the glyph sits on the title's centre rather than on its
                        // cap height. At 16px square pinned to the same top edge
                        // it rode 6px high of the words beside it.
                        'mdt-absolute mdt-flex mdt-h-7 mdt-w-7 mdt-items-center mdt-justify-center',
                        closePosition,
                        CLOSE_PULL,
                        // Muted, not near-black. The way out of a dialog is not
                        // the thing to look at first, and at full strength the X
                        // competed with the title for that.
                        'mdt-rounded-sm mdt-text-muted-foreground mdt-transition-colors',
                        'hover:mdt-text-foreground',
                        'mdt-ring-offset-background',
                        'focus:mdt-outline-none focus:mdt-ring-2 focus:mdt-ring-ring focus:mdt-ring-offset-2',
                        'disabled:mdt-pointer-events-none',
                        'data-[state=open]:mdt-bg-accent'
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
        </DialogDensityContext.Provider>
      </DialogScrollContext.Provider>
    );
  }
);
DialogContent.displayName = 'DialogContent';

/**
 * DialogHeader - container for title and description.
 */
/**
 * DialogMedia - a picture across the top of a dialog.
 *
 * **The one region with no gutter.** A product shot inset by 16px reads as a
 * picture someone placed in a dialog; the same shot reaching both edges reads
 * as the dialog's own. Every other region pads its contents - this one exists
 * precisely not to.
 *
 * Sits above the header, and rounds its own top corners to match the card it is
 * filling. Below `sm` the dialog is square, so this is too.
 *
 * @example
 * ```tsx
 * <DialogMedia>
 *   <img src={shot} alt="" className="mdt-h-40 mdt-w-full mdt-object-cover" />
 * </DialogMedia>
 * ```
 */
const DialogMedia = forwardRef<HTMLDivElement, DialogMediaProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'mdt-shrink-0 mdt-overflow-hidden',
      // Matches `DialogContent`'s own corners, and stays square on a phone
      // where the dialog is full-bleed.
      'mdt-rounded-none sm:mdt-rounded-t-lg',
      className
    )}
    {...props}
  />
));
DialogMedia.displayName = 'DialogMedia';

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, onBack, backLabel = 'Back', counter, tabs, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        useDialogGutter(),
        useDialogTop(),
        // Never squeezed to make room for the body - that is the whole point
        // of the Panel: the title and the actions stay where they are.
        'mdt-shrink-0',
        // 8px under the title. At 6 the description read as a second line of the
        // heading rather than as the sentence explaining it - unless the title
        // carries a tag, which makes its line taller and closes that gap on its
        // own. `DialogTitle` takes the 2px back in that case.
        'mdt-flex mdt-flex-col mdt-space-y-2 mdt-text-center sm:mdt-text-left',
        className
      )}
      {...props}
    >
      {/*
        The row above the title, and only when something is in it. An empty
        strip of 20px would push the title down for no reason - which is what a
        row rendered unconditionally does on the many dialogs that need neither.
      */}
      {(onBack !== undefined || counter !== undefined) && (
        <div className="mdt-mb-1 mdt-flex mdt-h-5 mdt-items-center mdt-justify-between mdt-gap-2">
          {onBack === undefined ? (
            <span />
          ) : (
            <button
              type="button"
              onClick={onBack}
              className={cn(
                // No vertical padding: the row has to be exactly one line tall
                // or the close button, which centres on a line, sits above it.
                // Measured at 2px out before this.
                'mdt--ml-1 mdt-flex mdt-h-5 mdt-items-center mdt-gap-1 mdt-rounded-sm mdt-px-1',
                'mdt-text-sm mdt-text-muted-foreground mdt-transition-colors hover:mdt-text-foreground',
                'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring'
              )}
            >
              <Icon name="arrow-left" size="xs" aria-hidden />
              {backLabel}
            </button>
          )}
          {counter !== undefined && (
            // Trailing, and pulled in past the close button's own inset so the
            // two do not collide on a narrow dialog.
            <span className="mdt-mr-7 mdt-text-xs mdt-text-muted-foreground">{counter}</span>
          )}
        </div>
      )}

      {children}

      {/*
        Under the reading, inside the header. Inside, because the header is the
        part that does not move - tabs that scrolled away with the body would
        leave somebody unable to switch back without scrolling up.
      */}
      {tabs !== undefined && <div className="mdt-pt-3">{tabs}</div>}
    </div>
  )
);
DialogHeader.displayName = 'DialogHeader';

/**
 * DialogFooter - container for action buttons.
 */
const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, align = 'end', divider = true, ...props }, ref) => {
    // Read unconditionally. Inside the `divider &&` below they would be hooks
    // that stop running the moment somebody passes `divider={false}`, which is
    // the kind of bug that only shows up when a caller toggles it.
    const gutter = useDialogGutter();
    const aboveButtons = useDialogFooterTop();
    const scrollsBody = useDialogScrollsBody();

    return (
      <div
        ref={ref}
        className={cn(
          gutter,
          'mdt-shrink-0',
          'mdt-flex mdt-flex-col-reverse sm:mdt-flex-row sm:mdt-items-center sm:mdt-gap-2',
          // `end` is a decision - Cancel, then the primary. `between` is a
          // journey: something quiet on the left, the way forward on the right.
          // A step back, a support link, "having a problem?".
          align === 'end' ? 'sm:mdt-justify-end' : 'sm:mdt-justify-between',
          divider && [
            // The rule reaches both edges because the footer is a full-width
            // block that pads its own contents - not, as it used to be, a
            // padded box tearing back out through the container's padding with
            // `-mx-4`. That number had to be kept in step with the container by
            // hand, and was wrong by 7px a side the first time anyone measured.
            'mdt-border-t mdt-border-border',
            // 8px above the rule normally, and none when the body scrolls -
            // there the rule IS the clipping edge. The content's own gap is
            // taken back by the content, not here: a footer that pulls itself
            // up has no way to know whether a scrolling body is above it, and
            // collapses against a header when there is not.
            !scrollsBody && 'mdt-mt-2',
            // The step minus 4, matching the floor beneath the buttons, so the
            // footer is even about its own contents. `compact` was keeping
            // `comfortable`'s 12 here while using 8 below - measured, and the
            // one place the densities were not the same shape.
            aboveButtons,
          ],
          className
        )}
        {...props}
      />
    );
  }
);
DialogFooter.displayName = 'DialogFooter';

/**
 * A dialog's own card, which is where its fades have to end.
 *
 * The strip and the directions are shared from `@/utils/scroll-fade`; only the
 * colour is here, because a fade ends in whatever surface it sits on.
 */
const DIALOG_FADE_SURFACE = 'mdt-from-background';

/**
 * DialogBody - the reading between the header and the footer.
 *
 * Its own region, with the same left and right as the header and the footer, so
 * a caller adjusts one and the other two follow. Before this the content padded
 * itself and every region sat inside that, which meant the footer's rule had to
 * tear back out through it with a negative margin to reach the edges.
 *
 * Nothing else about the body is this component's business - a form, a list, a
 * paragraph, a scrolling pane are all just children.
 *
 * @example
 * ```tsx
 * <DialogBody>
 *   <Input label="Invite by email" />
 * </DialogBody>
 * ```
 */
const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ className, onScroll, ...props }, ref) => {
    const gutter = useDialogGutter();
    const scrolls = useDialogScrollsBody();
    const scrollTail = useDialogScrollTail();
    // Both true before anything has scrolled, which is right: a body short
    // enough not to scroll never reaches either end, so neither fade shows.
    const [ends, setEnds] = useState({ atTop: true, atBottom: true });
    const scroller = useRef<HTMLDivElement | null>(null);

    const measure = useCallback((node: HTMLDivElement | null) => {
      if (!node) return;
      const { scrollTop, scrollHeight, clientHeight } = node;
      setEnds({
        atTop: scrollTop <= 0,
        // A pixel of slack. Sub-pixel heights and browser rounding mean an
        // exact comparison can be one short at the very bottom, and a fade that
        // never quite turns off is worse than no fade.
        atBottom: scrollTop + clientHeight >= scrollHeight - 1,
      });
    }, []);

    /*
      Watched, not measured once.

      A scroll event is the obvious trigger and it is not enough: at rest
      nothing has scrolled, so a body long enough to need the bottom fade
      showed none until somebody had already scrolled it - which is the one
      moment the fade existed to prevent. Measured, 742px of content in a
      527px box with the fade off.

      A single measurement on mount fixes that case and not the next one: a
      body whose height changes under it - a font arriving, a section
      expanding, the window resizing - would keep whichever answer it had at
      mount. The observer covers all of them, and fires once on attach, which
      is the mount measurement for free.
    */
    useEffect(() => {
      const node = scroller.current;
      if (!scrolls || !node || typeof ResizeObserver === 'undefined') return;
      const observer = new ResizeObserver(() => {
        measure(node);
      });
      observer.observe(node);
      return () => {
        observer.disconnect();
      };
    }, [scrolls, measure]);

    const body = (
      <div
        // Merged: the component needs the node to watch it, and the caller may
        // want it too. Dropping either is a bug that only shows up in whichever
        // one nobody tested.
        ref={(node: HTMLDivElement | null) => {
          scroller.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          gutter,
          // `min-h-0` is the load-bearing half: a flex child's minimum size is
          // its content, so without it the body refuses to shrink, pushes the
          // dialog past `max-h-full`, and nothing scrolls - the classic version
          // of this bug, where every other class looks right.
          scrolls && ['mdt-min-h-0 mdt-flex-1 mdt-overflow-y-auto', scrollTail],
          className
        )}
        onScroll={(event) => {
          if (scrolls) measure(event.currentTarget);
          onScroll?.(event);
        }}
        {...props}
      />
    );

    if (!scrolls) return body;

    return (
      // The fades are siblings of the scroller, not children of it - a child
      // would scroll away with the content it is meant to be covering.
      <div
        // What the content's pull looks for. Whatever follows this is sitting
        // on the clipping edge and wants the gap above it taken back.
        data-dialog-scroller=""
        className="mdt-relative mdt-flex mdt-min-h-0 mdt-flex-1 mdt-flex-col"
      >
        {body}
        <span
          aria-hidden
          className={cn(
            SCROLL_FADE_STRIP,
            SCROLL_FADE_TOP,
            SCROLL_FADE_DOWN,
            DIALOG_FADE_SURFACE,
            ends.atTop && SCROLL_FADE_OFF
          )}
        />
        <span
          aria-hidden
          className={cn(
            SCROLL_FADE_STRIP,
            SCROLL_FADE_BOTTOM,
            SCROLL_FADE_UP,
            DIALOG_FADE_SURFACE,
            ends.atBottom && SCROLL_FADE_OFF
          )}
        />
      </div>
    );
  }
);
DialogBody.displayName = 'DialogBody';

/**
 * DialogTitle - the title of the dialog.
 */
const DialogTitle = forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, DialogTitleProps>(
  ({ className, tag, children, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        'mdt-text-lg mdt-font-semibold mdt-leading-none mdt-tracking-tight',
        tag !== undefined && [
          'mdt-flex mdt-items-center mdt-gap-2',
          // 6 under a title that carries a tag, against 8 under one that does
          // not. A tag is taller than the text beside it, so it closes some of
          // the gap on its own; keeping the full 8 there made the description
          // drift away from the heading it belongs to.
          '-mdt-mb-0.5',
        ],
        className
      )}
      {...props}
    >
      {children}
      {tag}
    </DialogPrimitive.Title>
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
  DialogBody,
  DialogMedia,
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
