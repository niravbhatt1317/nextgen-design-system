import type * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import type { ComponentPropsWithoutRef } from 'react';

/**
 * Props for the DropdownMenu root component
 */
export type DropdownMenuProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>;

/**
 * Props for the DropdownMenuTrigger component
 */
export type DropdownMenuTriggerProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Trigger
>;

/**
 * Props for the DropdownMenuGroup component
 */
export type DropdownMenuGroupProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group>;

/**
 * Props for the DropdownMenuPortal component
 */
export type DropdownMenuPortalProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Portal>;

/**
 * Props for the DropdownMenuSub component
 */
export type DropdownMenuSubProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Sub>;

/**
 * Props for the DropdownMenuRadioGroup component
 */
export type DropdownMenuRadioGroupProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioGroup
>;

/**
 * Props for the DropdownMenuSubTrigger component
 */
export interface DropdownMenuSubTriggerProps extends ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubTrigger
> {
  /**
   * Whether to apply inset padding
   */
  inset?: boolean;
}

/**
 * Props for the DropdownMenuSubContent component
 */
export type DropdownMenuSubContentProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubContent
>;

/**
 * Props for the DropdownMenuContent component
 */
export type DropdownMenuContentProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
>;

/**
 * Props for the DropdownMenuItem component
 */
export interface DropdownMenuItemProps extends ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
> {
  /**
   * Whether to apply inset padding
   */
  inset?: boolean;
}

/**
 * Props for the DropdownMenuCheckboxItem component
 */
export type DropdownMenuCheckboxItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.CheckboxItem
>;

/**
 * Props for the DropdownMenuRadioItem component
 */
export type DropdownMenuRadioItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioItem
>;

/**
 * Props for the DropdownMenuLabel component
 */
export interface DropdownMenuLabelProps extends ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Label
> {
  /**
   * Whether to apply inset padding
   */
  inset?: boolean;
}

/**
 * Props for the DropdownMenuSeparator component
 */
export type DropdownMenuSeparatorProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Separator
>;

/**
 * Props for the DropdownMenuShortcut component
 */
export type DropdownMenuShortcutProps = ComponentPropsWithoutRef<'span'>;
