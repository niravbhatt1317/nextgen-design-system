'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import { CHECKED_ROW_CLASSES } from '@/utils/picked-row';
import { Icon } from '@/components/Icon';
import type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuRadioItemProps,
  DropdownMenuSeparatorProps,
  DropdownMenuShortcutProps,
  DropdownMenuSubContentProps,
  DropdownMenuSubTriggerProps,
} from './DropdownMenu.types';

// ============================================================================
// Shared CSS class constants to reduce duplication (SonarJS: no-duplicate-string)
// ============================================================================
/* THE ONE DROPDOWN — the console's Users menu, ruled 2026-09-16 ("the drop down which is in users is good
 * proper text color, text sizes, icon sizes and everything. Use that drop down everywhere") and carried at
 * the root since 2026-09-22, so no consumer has to patch it: the box has corners 10, 6 inside, a neutral-30
 * hairline and the lg shadow; an item is 34 tall, 0 10 inside, corners 7, 13/500 in the reading ink, 10 to
 * its 16 glyph; under the pointer it takes the neutral-10 ground and KEEPS its text colour; a destructive
 * item is red-60 and takes the danger wash, red text and red glyph throughout. */
const MENU_BOX_CLASSES =
  'mdt-z-50 mdt-min-w-[8rem] mdt-overflow-hidden mdt-rounded-[10px] mdt-border mdt-border-neutral-30 mdt-bg-popover mdt-p-1.5 mdt-text-popover-foreground mdt-shadow-lg';
const MENU_ITEM_BASE_CLASSES =
  'mdt-relative mdt-flex mdt-min-h-[34px] mdt-cursor-pointer mdt-select-none mdt-items-center mdt-gap-2.5 mdt-rounded-[7px] mdt-px-2.5 mdt-py-0 mdt-text-[13px] mdt-font-medium mdt-text-neutral-150 mdt-outline-none';
const MENU_ITEM_GLYPH_CLASSES = '[&>svg]:mdt-size-4 [&>svg]:mdt-shrink-0';
const MENU_ITEM_TRANSITION_CLASSES = 'mdt-transition-colors';
const MENU_ITEM_FOCUS_CLASSES = 'data-[highlighted]:mdt-bg-neutral-10 focus:mdt-bg-neutral-10';
const MENU_ITEM_DESTRUCTIVE_CLASSES =
  'mdt-text-red-60 data-[highlighted]:mdt-bg-feedback-danger-bg focus:mdt-bg-feedback-danger-bg';
const MENU_ITEM_DISABLED_CLASSES =
  'data-[disabled]:mdt-pointer-events-none data-[disabled]:mdt-opacity-50';
/* A PICKED ROW LOOKS THE SAME IN EVERY MENU (Pranjal, 2026-10-21): the checked row - a checkbox item or a radio
 * item - sits on the pale blue-10 ground in every state, the tick on the RIGHT in the reading ink; the row under the
 * pointer or the keys takes only the grey ground and no tick. The 32 the left once reserved for the mark is now kept
 * on the right. The mark stays the row's FIRST child in the DOM and is only placed on the right, so a consumer that
 * swaps it for a checkbox square (`[&>span:first-child]:mdt-hidden`, as DataTable's quick filters do) still hides it. */
const MENU_CHOICE_ITEM_CLASSES = cn(
  MENU_ITEM_BASE_CLASSES,
  'mdt-pr-8',
  MENU_ITEM_TRANSITION_CLASSES,
  MENU_ITEM_FOCUS_CLASSES,
  MENU_ITEM_DISABLED_CLASSES,
  CHECKED_ROW_CLASSES
);
const MENU_CHOICE_MARK_CLASSES =
  'mdt-pointer-events-none mdt-absolute mdt-right-2.5 mdt-flex mdt-h-4 mdt-w-4 mdt-items-center mdt-justify-center';

/**
 * DropdownMenu root component
 */
const DropdownMenu = DropdownMenuPrimitive.Root;

/**
 * DropdownMenuTrigger - element that opens the menu
 */
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

/**
 * DropdownMenuGroup - groups related menu items
 */
const DropdownMenuGroup = DropdownMenuPrimitive.Group;

/**
 * DropdownMenuPortal - renders menu in a portal
 */
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

/**
 * DropdownMenuSub - submenu root
 */
const DropdownMenuSub = DropdownMenuPrimitive.Sub;

/**
 * DropdownMenuRadioGroup - radio group for exclusive selection
 */
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

/**
 * DropdownMenuSubTrigger - trigger for opening a submenu
 */
const DropdownMenuSubTrigger = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      MENU_ITEM_BASE_CLASSES,
      MENU_ITEM_TRANSITION_CLASSES,
      MENU_ITEM_FOCUS_CLASSES,
      'data-[state=open]:mdt-bg-neutral-10',
      '[&_svg]:mdt-pointer-events-none [&_svg]:mdt-size-4 [&_svg]:mdt-shrink-0',
      inset && 'mdt-pl-8',
      className
    )}
    {...props}
  >
    {children}
    <Icon name="chevron-right" size="sm" aria-hidden />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

/**
 * DropdownMenuSubContent - content container for submenu
 */
const DropdownMenuSubContent = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  DropdownMenuSubContentProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      MENU_BOX_CLASSES,
      'data-[state=closed]:mdt-animate-zoom-out data-[state=open]:mdt-animate-zoom-in',
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

/**
 * DropdownMenuContent - main content container for the menu
 *
 * An action menu (a row's or a header's ⋯) is at least 224 wide - pass
 * `className="mdt-min-w-56"`, a floor and not a width, so a longer item widens
 * it (Pranjal, 2026-10-27). Every item carries an icon, no label ends in "…",
 * and the destructive item comes last, red, after a `DropdownMenuSeparator`.
 * A menu of ticks or choices (a quick filter, Sort) keeps its own width.
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button>Open Menu</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent className="mdt-min-w-56">
 *     <DropdownMenuItem><Icon name="pencil" size={16} />Edit details</DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem variant="destructive"><Icon name="trash-2" size={16} />Delete user</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
const DropdownMenuContent = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        MENU_BOX_CLASSES,
        'data-[state=closed]:mdt-animate-zoom-out data-[state=open]:mdt-animate-zoom-in',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = 'DropdownMenuContent';

/**
 * DropdownMenuItem - single menu item
 */
const DropdownMenuItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, inset, variant = 'default', ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    data-variant={variant}
    className={cn(
      MENU_ITEM_BASE_CLASSES,
      MENU_ITEM_TRANSITION_CLASSES,
      MENU_ITEM_FOCUS_CLASSES,
      MENU_ITEM_DISABLED_CLASSES,
      MENU_ITEM_GLYPH_CLASSES,
      variant === 'destructive' && MENU_ITEM_DESTRUCTIVE_CLASSES,
      inset && 'mdt-pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = 'DropdownMenuItem';

/**
 * The tick a checkbox or radio item shows once picked: on the right, in the row's own ink, only while checked.
 */
const ChoiceMark = () => (
  <span className={MENU_CHOICE_MARK_CLASSES}>
    <DropdownMenuPrimitive.ItemIndicator>
      <Icon name="check" size="sm" aria-hidden />
    </DropdownMenuPrimitive.ItemIndicator>
  </span>
);

/**
 * DropdownMenuCheckboxItem - menu item that can be ticked; several at once. A ticked row wears the pale ground and
 * the tick on the right.
 */
const DropdownMenuCheckboxItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(MENU_CHOICE_ITEM_CLASSES, className)}
    {...(checked !== undefined && { checked })}
    {...props}
  >
    <ChoiceMark />
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

/**
 * DropdownMenuRadioItem - menu item for one choice among several. The chosen row wears the pale ground and the tick
 * on the right, as every picked option does (Pranjal, 2026-10-21; it carried a dot on the left until then).
 */
const DropdownMenuRadioItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(MENU_CHOICE_ITEM_CLASSES, className)}
    {...props}
  >
    <ChoiceMark />
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

/**
 * DropdownMenuLabel - label for a group of items
 */
const DropdownMenuLabel = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'mdt-px-2.5 mdt-pb-1 mdt-pt-1.5 mdt-text-[11px] mdt-font-semibold mdt-uppercase mdt-tracking-[0.04em] mdt-text-neutral-50',
      inset && 'mdt-pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

/**
 * DropdownMenuSeparator - visual separator between items
 */
const DropdownMenuSeparator = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('mdt--mx-1 mdt-my-1 mdt-h-px mdt-bg-muted', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

/**
 * DropdownMenuShortcut - displays keyboard shortcut
 */
const DropdownMenuShortcut = ({ className, ...props }: DropdownMenuShortcutProps) => {
  return (
    <span
      className={cn('mdt-ml-auto mdt-text-xs mdt-tracking-widest mdt-opacity-60', className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
