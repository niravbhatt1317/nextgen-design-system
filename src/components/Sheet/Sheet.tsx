'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { createContext, forwardRef, useContext, type ReactNode } from 'react';
import { cn } from '@/utils';
import { Icon } from '@/components/Icon';
import type {
  SheetBandProps,
  SheetBodyProps,
  SheetContentProps,
  SheetDescriptionProps,
  SheetFooterProps,
  SheetHeaderProps,
  SheetInset,
  SheetLayout,
  SheetOverlayProps,
  SheetSize,
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

/* ── THE DRAWER FRAME ─────────────────────────────────────────────────────────────────────────
 * Ported from the console (Pranjal, 2026-10-13): the console wrapped this Sheet in its own
 * `Drawer` (src/compat/om/atoms.jsx, with its styles in global.css) to add a width scale, a band
 * under the header, a three-part footer and the ✕ in the header row. Those additions live here
 * now, so a product drawer is this Sheet as it ships. Every value below is the console's. */

/**
 * The drawer width scale in px - the ONLY widths a side sheet takes (the console's
 * `DRAWER_WIDTHS`, PAGE-STRUCTURE-RULES O1): sm 480 a simple form · md 560 the default form ·
 * lg 720 tabs, a diff or an object drawer · xl 780 deep inspection.
 */
const SHEET_SIZES = { sm: 480, md: 560, lg: 720, xl: 780 } as const satisfies Record<
  SheetSize,
  number
>;

/* the scale as classes (the class scanner needs them written out); the panel never outgrows the
 * viewport, the console's maxWidth 100vw */
const SIZE_CLASS: Record<SheetSize, string> = {
  sm: 'mdt-w-[480px] mdt-max-w-[100vw]',
  md: 'mdt-w-[560px] mdt-max-w-[100vw]',
  lg: 'mdt-w-[720px] mdt-max-w-[100vw]',
  xl: 'mdt-w-[780px] mdt-max-w-[100vw]',
};

/** A width as CSS: a number, or a string of bare digits ("600"), is pixels; anything else passes through. */
const asLength = (width: number | string): string =>
  typeof width === 'number' || /^\d+(\.\d+)?$/.test(width) ? `${String(width)}px` : width;

/* the drawer's side inset - the console's `pad`: 24 by default, 20 for the Users and
 * Organizations drawers, 16 asked for once */
const INSET_CLASS: Record<SheetInset, string> = {
  16: 'mdt-px-4',
  20: 'mdt-px-5',
  24: 'mdt-px-6',
};

interface SheetFrame {
  layout: SheetLayout;
  inset: SheetInset;
}

/* the content tells its header, band, body and footer which frame they sit in */
const SheetFrameContext = createContext<SheetFrame>({ layout: 'stack', inset: 24 });

/* a slot renders only when it was given something to hold (`{cond && <X />}` hands in false) */
const hasContent = (node: ReactNode): boolean =>
  node !== null && node !== undefined && node !== false;

/* THE CLOSE (Pranjal, 2026-09-17): a 28 box with corners 6; the glyph in neutral-90; neutral-20 under the
 * pointer with the glyph in the primary colour; a primary ring with the field's halo on keyboard focus
 * only - the content auto-focuses this button on open, and a plain :focus ring lit up every time. One
 * look for both places it sits: the corner (stack) and the header row (drawer, the console's .kit-close) */
const CLOSE_BOX = [
  'mdt-flex mdt-h-7 mdt-w-7 mdt-items-center mdt-justify-center',
  /* corners 6: the console's 28-high controls all sit at 6 (rounded-md is 8 here) */
  'mdt-rounded-[6px] mdt-border-0 mdt-bg-transparent mdt-text-neutral-90 mdt-transition-colors mdt-duration-[120ms]' /* 120ms: the console's .kit-close (ST-87, K-Sheet-15) */,
  'hover:mdt-bg-neutral-20 hover:mdt-text-primary',
  'focus-visible:mdt-shadow-[0_0_0_1px_hsl(var(--mdt-primary)),0_0_0_4px_hsl(var(--mdt-primary)/0.08)] focus-visible:mdt-outline-none',
  'disabled:mdt-pointer-events-none disabled:mdt-text-neutral-40',
].join(' ');

/**
 * SheetContent - the main content container for the sheet.
 *
 * `layout="drawer"` is the console's drawer frame, composed from `SheetHeader` (title, actions,
 * ✕ in one row), `SheetBand` (tabs or a stepper), `SheetBody` (scrolls) and `SheetFooter`
 * (start group left, end group right). `size` picks the width from the drawer scale.
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
 *
 * @example
 * ```tsx
 * <SheetContent size="lg" layout="drawer" inset={20}>
 *   <SheetHeader actions={<RowMenu />}>
 *     <SheetTitle>Asha Rao</SheetTitle>
 *   </SheetHeader>
 *   <SheetBand>
 *     <Tabs>…</Tabs>
 *   </SheetBand>
 *   <SheetBody>…</SheetBody>
 *   <SheetFooter start={<Button variant="destructiveGhost">Delete</Button>}>
 *     <SheetClose asChild><Button variant="ghost">Cancel</Button></SheetClose>
 *     <Button>Save</Button>
 *   </SheetFooter>
 * </SheetContent>
 * ```
 */
const SheetContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(
  (
    {
      side = 'right',
      className,
      children,
      showCloseButton,
      size,
      layout = 'stack',
      inset = 24,
      closeOnOutsideClick = true,
      closeOnEscape = true,
      overlay = true,
      width,
      style,
      onEscapeKeyDown,
      onInteractOutside,
      ...props
    },
    ref
  ) => {
    const drawer = layout === 'drawer';
    const sideways = side === 'left' || side === 'right';
    // the drawer frame's ✕ lives in its header row, so the corner one is off unless asked for
    const cornerClose = showCloseButton ?? !drawer;
    // Check if className contains width classes to determine if we should use defaults
    const hasWidthClass = className && /mdt-w-|mdt-max-w-/.test(className);
    const defaultWidthClass = sideways ? 'mdt-w-3/4 sm:mdt-max-w-sm' : '';
    const widthClass = size && sideways ? SIZE_CLASS[size] : defaultWidthClass;
    // a free width wins over `size`: a number is pixels, a string is any CSS length ('40%', '600px')
    const ownWidth = width !== undefined && sideways;
    const widthStyle = ownWidth ? { width: asLength(width), maxWidth: '100vw' } : undefined;

    return (
      <SheetPortal>
        {overlay && <SheetOverlay />}
        <SheetFrameContext.Provider value={{ layout, inset }}>
          <DialogPrimitive.Content
            ref={ref}
            data-layout={layout}
            data-size={size && sideways && !ownWidth ? size : undefined}
            style={widthStyle ? { ...widthStyle, ...style } : style}
            onEscapeKeyDown={(event) => {
              /* ESCAPE INSIDE A CONTROL THAT HANDLES IT (the console's drawer, 2026-10-05): a control marked
               * `data-escape-stays` takes the key for itself and the drawer stays open - Radix listens on the
               * document in the capture phase, so the control cannot stop it on its own */
              const target = event.target;
              const stays =
                drawer && target instanceof Element && target.closest('[data-escape-stays]');
              if (!closeOnEscape || stays) event.preventDefault();
              onEscapeKeyDown?.(event);
            }}
            onInteractOutside={(event) => {
              // a press outside the panel (on the scrim, or the page when there is none) closes it unless held
              if (!closeOnOutsideClick) event.preventDefault();
              onInteractOutside?.(event);
            }}
            className={cn(
              sheetVariants({ side }),
              !hasWidthClass && !ownWidth && widthClass,
              /* the frame: header, band, body and footer each carry their own inset; and NO EDGE ON A
               * SIDE DRAWER (Pranjal 2026-09-10) - the panel already separates itself from the page by
               * sitting on top of the scrim, a hairline down its side read as a stray grey strip */
              drawer && 'mdt-flex mdt-flex-col mdt-gap-0 mdt-border-0 mdt-p-0',
              className
            )}
            {...props}
          >
            {children}
            {cornerClose && (
              <DialogPrimitive.Close
                className={cn('mdt-absolute mdt-right-2.5 mdt-top-2.5', CLOSE_BOX)}
              >
                <Icon name="x" size="sm" aria-hidden />
                <span className="mdt-sr-only">Close</span>
              </DialogPrimitive.Close>
            )}
          </DialogPrimitive.Content>
        </SheetFrameContext.Provider>
      </SheetPortal>
    );
  }
);
SheetContent.displayName = 'SheetContent';

/**
 * SheetHeader - container for title and description.
 *
 * In the drawer frame it is the console's header row: the title (or a crumb) left, then the
 * `actions`, then the ✕ - all centred on the row, 60 high at least so a wrapping title grows it
 * instead of clipping, a hairline under it.
 */
const SheetHeader = forwardRef<HTMLDivElement, SheetHeaderProps>(
  ({ className, children, actions, showClose = true, ...props }, ref) => {
    const { layout, inset } = useContext(SheetFrameContext);

    if (layout !== 'drawer') {
      return (
        <div
          ref={ref}
          className={cn(
            'mdt-flex mdt-flex-col mdt-space-y-2 mdt-text-center sm:mdt-text-left',
            className
          )}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-slot="sheet-header"
        className={cn(
          /* 60 header, the title tight in it (Pranjal 2026-08-24); one row, the title left and the ✕ right,
           * both centred on it (Pranjal 2026-09-17: "align this x in centre") */
          'mdt-flex mdt-min-h-[60px] mdt-shrink-0 mdt-flex-row mdt-items-center mdt-justify-between mdt-gap-3 mdt-py-1.5',
          INSET_CLASS[inset],
          'mdt-border-b mdt-border-border',
          className
        )}
        {...props}
      >
        {children}
        {hasContent(actions) && (
          <div
            data-slot="sheet-header-actions"
            className="mdt-flex mdt-shrink-0 mdt-items-center mdt-gap-2"
          >
            {actions}
          </div>
        )}
        {showClose && (
          <DialogPrimitive.Close className={cn('mdt-shrink-0', CLOSE_BOX)}>
            <Icon name="x" size="sm" aria-hidden />
            <span className="mdt-sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </div>
    );
  }
);
SheetHeader.displayName = 'SheetHeader';

/**
 * SheetBand - the full-bleed strip directly under the drawer header, for level-3 tabs OR a
 * stepper (never both). Pinned: it does not scroll with the body.
 *
 * THE HAIRLINE UNDER THE BAND IS THE BAND'S CALL (Pranjal, 2026-09-25): "when we are using
 * underline steppers variant we dont need a bottom border in sidedrawers only for non underline
 * stepper variants we will be using the bottom border." The line is drawn, and taken away when
 * the band holds the underline stepper - its own bars are the line - or a tab strip that carries
 * its own hairline (one line, never two), however deep the caller wrapped it. Tabs without their
 * hairline, an identity strip and the compact progress stepper keep it. `hairline={false}`
 * switches it off for any other reason.
 *
 * A stepper wraps itself in 12 of vertical padding (`mdt-py-3`) in the band, as the console's
 * StepsBand does.
 */
const SheetBand = forwardRef<HTMLDivElement, SheetBandProps>(
  ({ className, hairline = true, ...props }, ref) => {
    const { inset } = useContext(SheetFrameContext);
    return (
      <div
        ref={ref}
        data-slot="sheet-band"
        data-border={hairline ? 'on' : 'off'}
        className={cn(
          'mdt-shrink-0',
          INSET_CLASS[inset],
          hairline && [
            'mdt-border-b mdt-border-border',
            'has-[[data-slot="stepper"][data-layout="underline"]]:mdt-border-b-0',
            'has-[[data-hairline="true"]]:mdt-border-b-0',
          ],
          className
        )}
        {...props}
      />
    );
  }
);
SheetBand.displayName = 'SheetBand';

/**
 * SheetBody - the drawer frame's content: everything between the header (and band) and the
 * footer, and the only part that scrolls. 20 above and below, the frame's inset at the sides.
 */
const SheetBody = forwardRef<HTMLDivElement, SheetBodyProps>(({ className, ...props }, ref) => {
  const { inset } = useContext(SheetFrameContext);
  return (
    <div
      ref={ref}
      data-slot="sheet-body"
      className={cn(
        'mdt-min-h-0 mdt-flex-1 mdt-overflow-y-auto mdt-py-5',
        INSET_CLASS[inset],
        className
      )}
      {...props}
    />
  );
});
SheetBody.displayName = 'SheetBody';

/**
 * SheetFooter - container for action buttons.
 *
 * Three parts (the console's O9 footer): `start` pinned left - the escape, or a destructive
 * action - a spacer the footer owns, then the children as the end group - the supporting action
 * and the primary verb. Without `start` the children sit right-aligned as before. In the drawer
 * frame it is pinned under the body with a hairline over it.
 */
const SheetFooter = forwardRef<HTMLDivElement, SheetFooterProps>(
  ({ className, children, start, ...props }, ref) => {
    const { layout, inset } = useContext(SheetFrameContext);
    const drawer = layout === 'drawer';
    const hasStart = hasContent(start);

    return (
      <div
        ref={ref}
        data-slot="sheet-footer"
        className={cn(
          hasStart
            ? 'mdt-flex mdt-flex-row mdt-items-center mdt-gap-2'
            : 'mdt-flex mdt-flex-col-reverse sm:mdt-flex-row sm:mdt-justify-end sm:mdt-space-x-2',
          drawer && ['mdt-shrink-0 mdt-border-t mdt-border-border mdt-py-4', INSET_CLASS[inset]],
          className
        )}
        {...props}
      >
        {hasStart ? (
          <>
            <div data-slot="sheet-footer-start" className="mdt-flex mdt-items-center mdt-gap-2">
              {start}
            </div>
            <span aria-hidden className="mdt-flex-1" />
            {hasContent(children) && (
              <div data-slot="sheet-footer-end" className="mdt-flex mdt-items-center mdt-gap-2">
                {children}
              </div>
            )}
          </>
        ) : (
          children
        )}
      </div>
    );
  }
);
SheetFooter.displayName = 'SheetFooter';

/**
 * SheetTitle - the title of the sheet.
 *
 * In the drawer frame: 16/600 in the heading ink (18 was off the type scale - Pranjal
 * 2026-08-24), taking the row's free width so the actions and the ✕ stay at the right end.
 */
const SheetTitle = forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, SheetTitleProps>(
  ({ className, ...props }, ref) => {
    const { layout } = useContext(SheetFrameContext);
    return (
      <DialogPrimitive.Title
        ref={ref}
        className={cn(
          layout === 'drawer'
            ? 'mdt-min-w-0 mdt-flex-1 mdt-text-base mdt-font-semibold mdt-text-neutral-150'
            : 'mdt-text-lg mdt-font-semibold mdt-text-foreground',
          className
        )}
        {...props}
      />
    );
  }
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
  SheetBand,
  SheetBody,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  sheetVariants,
  SHEET_SIZES,
};
