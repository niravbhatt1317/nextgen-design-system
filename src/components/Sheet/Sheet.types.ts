import type * as DialogPrimitive from '@radix-ui/react-dialog';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Available positions for the sheet to slide in from
 */
export type SheetSide = 'top' | 'right' | 'bottom' | 'left';

/**
 * The drawer width scale - the ONLY widths a side sheet takes. Ported from the console's
 * `DRAWER_WIDTHS` (Pranjal, 2026-10-13): sm 480 (a simple form) · md 560 (the default form) ·
 * lg 720 (tabs, a diff, an object drawer) · xl 780 (deep inspection).
 */
export type SheetSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * How the content arranges what is inside it.
 * - `stack` (default) - the original sheet: padded on every side, children stacked with a gap,
 *   the close pinned to the corner.
 * - `drawer` - the console's drawer frame: no padding and no edge, a header row (title, actions,
 *   the close) over a band, a scrolling body and a pinned footer. The close moves into the
 *   header row, so the corner close is off unless `showCloseButton` asks for it.
 */
export type SheetLayout = 'stack' | 'drawer';

/** The drawer frame's side inset in px: 24 (default), 20 (the Users and Organizations drawers), 16. */
export type SheetInset = 16 | 20 | 24;

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
   * Whether to show the close button pinned to the corner
   * @default true (false when `layout="drawer"`, whose header row carries the close)
   */
  showCloseButton?: boolean;

  /**
   * The width from the drawer scale (left and right sheets only): sm 480 · md 560 · lg 720 ·
   * xl 780. Unset keeps the original width (75% on mobile, capped at 24rem). A width class in
   * `className` still wins.
   */
  size?: SheetSize;

  /**
   * `drawer` turns the content into the console's drawer frame - compose it from `SheetHeader`,
   * `SheetBand`, `SheetBody` and `SheetFooter`.
   * @default 'stack'
   */
  layout?: SheetLayout;

  /**
   * The side inset of the drawer frame's header, band, body and footer, in px.
   * @default 24
   */
  inset?: SheetInset;
}

/**
 * Props for the SheetHeader component
 */
export interface SheetHeaderProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;

  /**
   * Controls at the right end of the header row, before the close - a ⋮ menu, say.
   * Drawer layout only.
   */
  actions?: ReactNode;

  /**
   * Whether the header row carries the close (✕), centred on the title. Drawer layout only.
   * @default true
   */
  showClose?: boolean;
}

/**
 * Props for the SheetBand component - the full-bleed strip under the drawer header that holds
 * tabs or a stepper (never both)
 */
export interface SheetBandProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;

  /**
   * The hairline under the band. `true` lets the band decide: the line is drawn, except when the
   * band holds the underline stepper or a tab strip with its own hairline. `false` switches it off
   * for any other band that wants no line.
   * @default true
   */
  hairline?: boolean;
}

/**
 * Props for the SheetBody component - the drawer frame's scrolling content area
 */
export interface SheetBodyProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
}

/**
 * Props for the SheetFooter component
 */
export interface SheetFooterProps extends ComponentPropsWithoutRef<'div'> {
  /** The end group (right): the supporting action, then the primary verb. */
  children?: ReactNode;

  /**
   * The start group (left): the escape (Cancel / Close) or a destructive action. When set, the
   * footer is one row - start, a spacer, then the children - in any layout.
   */
  start?: ReactNode;
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
