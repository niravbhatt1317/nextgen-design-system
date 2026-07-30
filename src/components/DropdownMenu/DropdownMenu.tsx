'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { forwardRef } from 'react';
import { cn } from '@/utils';
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
const MENU_ITEM_TRANSITION_CLASSES = 'mdt-transition-colors';
const MENU_ITEM_FOCUS_CLASSES = 'focus:mdt-bg-muted focus:mdt-text-foreground';
const MENU_ITEM_DISABLED_CLASSES =
  'data-[disabled]:mdt-pointer-events-none data-[disabled]:mdt-opacity-50';

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
      'mdt-flex mdt-cursor-default mdt-select-none mdt-items-center mdt-gap-2',
      'mdt-rounded-sm mdt-px-2 mdt-py-1.5 mdt-text-sm mdt-outline-none',
      'focus:mdt-bg-muted data-[state=open]:mdt-bg-muted',
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
      'mdt-z-50 mdt-min-w-[8rem] mdt-overflow-hidden mdt-rounded-md mdt-border',
      'mdt-bg-popover mdt-p-1 mdt-text-popover-foreground mdt-shadow-lg',
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
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button>Open Menu</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Item 1</DropdownMenuItem>
 *     <DropdownMenuItem>Item 2</DropdownMenuItem>
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
        'mdt-z-50 mdt-min-w-[8rem] mdt-overflow-hidden mdt-rounded-md mdt-border',
        'mdt-bg-popover mdt-p-1 mdt-text-popover-foreground mdt-shadow-md',
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
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'mdt-relative mdt-flex mdt-cursor-default mdt-select-none mdt-items-center mdt-gap-2',
      'mdt-rounded-sm mdt-px-2 mdt-py-1.5 mdt-text-sm mdt-outline-none',
      MENU_ITEM_TRANSITION_CLASSES,
      MENU_ITEM_FOCUS_CLASSES,
      MENU_ITEM_DISABLED_CLASSES,
      '[&>svg]:mdt-size-4 [&>svg]:mdt-shrink-0',
      inset && 'mdt-pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = 'DropdownMenuItem';

/**
 * DropdownMenuCheckboxItem - menu item with checkbox
 */
const DropdownMenuCheckboxItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'mdt-relative mdt-flex mdt-cursor-default mdt-select-none mdt-items-center',
      'mdt-rounded-sm mdt-py-1.5 mdt-pl-8 mdt-pr-2 mdt-text-sm mdt-outline-none',
      MENU_ITEM_TRANSITION_CLASSES,
      MENU_ITEM_FOCUS_CLASSES,
      MENU_ITEM_DISABLED_CLASSES,
      className
    )}
    {...(checked !== undefined && { checked })}
    {...props}
  >
    <span className="mdt-absolute mdt-left-2 mdt-flex mdt-h-3.5 mdt-w-3.5 mdt-items-center mdt-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Icon name="check" size="sm" aria-hidden />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

/**
 * DropdownMenuRadioItem - menu item with radio selection
 */
const DropdownMenuRadioItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'mdt-relative mdt-flex mdt-cursor-default mdt-select-none mdt-items-center',
      'mdt-rounded-sm mdt-py-1.5 mdt-pl-8 mdt-pr-2 mdt-text-sm mdt-outline-none',
      MENU_ITEM_TRANSITION_CLASSES,
      MENU_ITEM_FOCUS_CLASSES,
      MENU_ITEM_DISABLED_CLASSES,
      className
    )}
    {...props}
  >
    <span className="mdt-absolute mdt-left-2 mdt-flex mdt-h-3.5 mdt-w-3.5 mdt-items-center mdt-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Icon name="circle" size="xs" aria-hidden />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
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
      'mdt-px-2 mdt-py-1.5 mdt-text-sm mdt-font-semibold',
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
