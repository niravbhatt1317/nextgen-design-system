import type * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import type * as PopoverPrimitive from '@radix-ui/react-popover';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * What the popover is (Pranjal, 2026-10-29): `card` - the empty card, anything inside (the default, the Popover as it
 * was); `action-menu` - a ⋯ menu of actions with its rules built in; `quick-filter` - a table toolbar's tick menu.
 */
export type PopoverVariant = 'card' | 'action-menu' | 'quick-filter';

/**
 * Props for the Popover root component
 */
export interface PopoverProps extends ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> {
  /**
   * Which popover this is. The two menus draw `PopoverActionMenu` / `PopoverQuickFilter` inside; the card draws
   * `PopoverContent`.
   * @default 'card'
   */
  variant?: PopoverVariant;
  /**
   * The controlled open state of the popover
   */
  open?: boolean;
  /**
   * Callback when the open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * The modality of the popover. When set to true, interaction with outside elements will be disabled
   * @default false
   */
  modal?: boolean;
}

/**
 * Props for the PopoverContent component
 */
export interface PopoverContentProps extends ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
> {
  /**
   * The preferred alignment against the trigger
   * @default 'center'
   */
  align?: 'start' | 'center' | 'end';
  /**
   * The distance in pixels from the trigger
   * @default 4
   */
  sideOffset?: number;
}

/**
 * Props for the PopoverTrigger component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopoverTriggerProps extends ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Trigger
> {}

/**
 * Props for the PopoverClose component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopoverCloseProps extends ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Close
> {}

/**
 * Props for the PopoverAnchor component
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopoverAnchorProps extends ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Anchor
> {}

/**
 * One action in an action menu. The icon is not optional (every item carries one, Pranjal 2026-10-14); a label that
 * ends in "…" loses it - the dialog the action opens says the rest.
 */
export interface PopoverAction {
  label: string;
  icon: ReactNode;
  onSelect: (event: Event) => void;
  disabled?: boolean;
}

/**
 * Props for PopoverActionMenu - the list inside `<Popover variant="action-menu">`.
 */
export interface PopoverActionMenuProps extends Omit<
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>,
  'children'
> {
  /**
   * The actions, in groups: a divider between each group and the next. One group = no dividers. An empty group is
   * dropped.
   */
  groups: PopoverAction[][];
  /**
   * The one red (destructive) action. There is room for one only; it is always drawn last, under a divider.
   */
  danger?: PopoverAction;
  /** @default 'end' */
  align?: 'start' | 'center' | 'end';
}

/** One value in a quick filter: what it is, the words it shows (and is searched by), and an optional drawing of them. */
export interface PopoverQuickFilterOption {
  value: string;
  label: string;
  render?: ReactNode;
}

/**
 * Props for PopoverQuickFilter - the list inside `<Popover variant="quick-filter">`.
 */
export interface PopoverQuickFilterProps extends Omit<
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>,
  'children'
> {
  /** The heading that names what it filters ("Filter by status"). Left out, the list has none. */
  heading?: string;
  options: PopoverQuickFilterOption[];
  /** The values ticked. */
  value: string[];
  onValueChange: (value: string[]) => void;
  /** A search box over the values, focused on open. @default false */
  searchable?: boolean;
  /** The search box's name for a screen reader. @default "Search <heading>" */
  searchLabel?: string;
  /** @default 'start' */
  align?: 'start' | 'center' | 'end';
}
