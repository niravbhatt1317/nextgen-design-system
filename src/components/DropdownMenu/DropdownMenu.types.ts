import type * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { KbdKey } from '@/components/Kbd';

export type DropdownMenuProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>;

export type DropdownMenuTriggerProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Trigger
>;

export type DropdownMenuGroupProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group>;

export type DropdownMenuPortalProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Portal>;

export type DropdownMenuSubProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Sub>;

export type DropdownMenuRadioGroupProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioGroup
>;

export type DropdownMenuContentProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
>;

export type DropdownMenuSubContentProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubContent
>;

export type DropdownMenuSeparatorProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Separator
>;

/**
 * What a row can carry, shared by all three kinds.
 *
 * Written once so a plain row, a tickable one and a one-of-these one cannot
 * drift apart on what they accept.
 */
interface RowSlots {
  /**
   * A mark at the start of the row, read as part of the label - so it stays
   * beside the first line when a description pushes the row to two.
   */
  icon?: ReactNode | undefined;

  /** A quieter second line under the label. */
  description?: ReactNode | undefined;
}

export interface DropdownMenuItemProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>, RowSlots {
  /** Indents past a leading column, for a row in a list that has one. */
  inset?: boolean;

  /**
   * A keyboard shortcut, as data: `shortcut={['mod', 'd']}`.
   *
   * Drawn as key caps by `Kbd`, so `'mod'` is Command on a Mac and Control
   * everywhere else. Takes the trailing slot, so it cannot be combined with
   * `trailing`.
   */
  shortcut?: KbdKey[] | undefined;

  /**
   * Anything else for the trailing slot - usually a count.
   *
   * **One trailing thing per row.** Two of them and neither reads. The submenu
   * arrow is drawn by `DropdownMenuSubTrigger` and is reserved: nothing else
   * may use that shape here, because it is the only thing that can promise
   * another panel.
   */
  trailing?: ReactNode | undefined;

  /**
   * `danger` for a row that destroys something. Red, and it belongs last under
   * a separator. The only row in the set that carries a tone.
   */
  tone?: 'danger' | undefined;
}

export interface DropdownMenuCheckboxItemProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>, RowSlots {}

/** Which mark a one-of-these row wears, and therefore which end it sits at. */
export type DropdownMenuRadioIndicator = 'check' | 'dot';

export interface DropdownMenuRadioItemProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>, RowSlots {
  /**
   * `check` trails and is the default - right for a long list of names, where a
   * leading column pushes every unchosen row to the right of nothing.
   *
   * `dot` leads, like a radio button - right for a small set of named choices.
   *
   * @default 'check'
   */
  indicator?: DropdownMenuRadioIndicator | undefined;
}

export interface DropdownMenuLabelProps extends ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Label
> {
  /** Whether to apply inset padding */
  inset?: boolean;
}

export interface DropdownMenuSubTriggerProps extends ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubTrigger
> {
  /** A mark at the start of the row. */
  icon?: ReactNode | undefined;

  /** Indents past a leading column, for a row in a list that has one. */
  inset?: boolean;
}

export interface DropdownMenuListProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * How tall the rows may get before they scroll.
   *
   * @default 260
   */
  maxHeight?: number | string | undefined;
}

export interface DropdownMenuHeaderProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  /** The name of the whole panel. */
  title?: ReactNode | undefined;

  /** A line under it - usually a count, or what this applies to. */
  description?: ReactNode | undefined;

  /**
   * A search box, normally.
   *
   * **Words or a search box, never both.** A title over an input reads as a
   * label for that input, which it is not.
   */
  children?: ReactNode | undefined;
}

export type DropdownMenuSearchProps = ComponentPropsWithoutRef<'input'>;

export interface DropdownMenuSelectAllProps extends ComponentPropsWithoutRef<'div'> {
  /** How many rows are chosen right now. */
  selected: number;

  /** How many there are altogether - including any the search is hiding. */
  total: number;

  /** Take every row. Called when nothing or only some are chosen. */
  onSelectAll: () => void;

  /** Drop every row. Called by Clear, and by the box when all are chosen. */
  onClear: () => void;

  /** @default 'Select all' */
  label?: string | undefined;

  /** @default 'Clear' */
  clearLabel?: string | undefined;
}

export type DropdownMenuFooterProps = ComponentPropsWithoutRef<'div'>;

export interface DropdownMenuShortcutProps extends Omit<
  ComponentPropsWithoutRef<'span'>,
  'children'
> {
  /** The keys, in the order they are pressed. */
  keys: KbdKey[];
}
