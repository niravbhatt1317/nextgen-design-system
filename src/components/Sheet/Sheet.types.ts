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
   * A free width for a left or right sheet, instead of the `size` scale: a number is pixels
   * (`600`), a string is any CSS length (`'40%'`, `'600px'`, `'50vw'`). Wins over `size`, and
   * never grows past the screen.
   */
  width?: number | string;

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

  /**
   * Whether a press outside the panel - on the scrim, or on the page when there is no scrim -
   * closes it. Turn it off for a form whose draft a stray click would lose.
   * @default true
   */
  closeOnOutsideClick?: boolean;

  /**
   * Whether Escape closes it. A control marked `data-escape-stays` keeps the key either way.
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Whether the scrim dims the page behind. Without it the page still cannot be used while the
   * panel is open; pass `modal={false}` on `Sheet` as well to keep the page live beside it.
   * @default true
   */
  overlay?: boolean;
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

/**
 * Props for SheetIdentity - the identity block an object drawer opens with.
 */
export interface SheetIdentityProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  /** The mark on the left: an IconTile, an Avatar, a logo. */
  mark?: ReactNode;
  /** The object's name, 16/600, truncated on one line. */
  name: ReactNode;
  /** A Badge beside the name: Active, Tenant owner. */
  status?: ReactNode;
  /**
   * The lines under the name, in the quiet ink. A line given as an array is split by short
   * hairlines: `['IT Support, Security Team', 'Teams']`.
   */
  lines?: readonly (ReactNode | readonly ReactNode[])[];
  /** Controls at the top right: Edit, the ⋯ menu. */
  actions?: ReactNode;
  /** What sits under the identity row: a strip of key facts, say. */
  children?: ReactNode;
}

/**
 * Props for SheetSection - a titled section of a drawer's body.
 */
export interface SheetSectionProps extends Omit<ComponentPropsWithoutRef<'section'>, 'title'> {
  /** The heading, 14/600. */
  title: ReactNode;
  /** One quiet line under the heading. */
  hint?: ReactNode;
  /** A control at the right end of the heading row: Add, Edit. */
  action?: ReactNode;
  children?: ReactNode;
}

/**
 * Props for SheetField - one label · value row, half and half.
 */
export interface SheetFieldProps extends ComponentPropsWithoutRef<'div'> {
  /** The label on the left, in the slate ink. */
  label: ReactNode;
  /** Ties the label to a control on the right, so a press on the label focuses it. */
  htmlFor?: string;
  /** The value or the control on the right. */
  children?: ReactNode;
}

/**
 * One page of a SheetNavigation.
 */
export interface SheetNavigationEntry {
  /** Which SheetPage shows while this page is current. */
  id: string;
  /** Its name in the header and in the trail: "User management", "Edit details". */
  title: ReactNode;
}

/**
 * Props for SheetNavigation - the page stack of one drawer.
 */
export interface SheetNavigationProps {
  /** The page the drawer opens on. */
  root: SheetNavigationEntry;
  /** Called with the new current page and the whole stack after every push, back and reset. */
  onPageChange?:
    | ((current: SheetNavigationEntry, stack: readonly SheetNavigationEntry[]) => void)
    | undefined;
  children?: ReactNode;
}

/**
 * What useSheetNavigation returns.
 */
export interface SheetNavigationValue {
  /** Every page from the first to the current. */
  stack: readonly SheetNavigationEntry[];
  /** The page showing now. */
  current: SheetNavigationEntry;
  /** 0 on the first page, 1 after one push, and so on. */
  depth: number;
  /** Open a page on top: its content replaces the current one. */
  push: (entry: SheetNavigationEntry) => void;
  /** Back to the page before - unless the page's useSheetLeaveGuard says no; `force` skips the guard. */
  back: (options?: { force?: boolean }) => void;
  /** Straight back to the first page. */
  reset: () => void;
}

/**
 * Props for SheetPage.
 */
export interface SheetPageProps {
  /** Matches a SheetNavigationEntry's id. */
  id: string;
  children?: ReactNode;
}
