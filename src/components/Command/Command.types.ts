import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react';
import type { Command as CommandPrimitive } from 'cmdk';

/**
 * Props for the Command component
 */
export type CommandProps = ComponentPropsWithoutRef<typeof CommandPrimitive>;

/**
 * Props for the CommandDialog component
 */
export interface CommandDialogProps extends CommandProps {
  /**
   * Whether the dialog is open
   */
  open?: boolean;
  /**
   * Callback when the open state changes
   */
  onOpenChange?: (open: boolean) => void;
}

/**
 * Props for the CommandInput component
 */
export type CommandInputProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Input>;

/**
 * Props for the CommandList component
 */
export type CommandListProps = ComponentPropsWithoutRef<typeof CommandPrimitive.List>;

/**
 * Props for the CommandEmpty component
 */
export type CommandEmptyProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>;

/**
 * Props for the CommandGroup component
 */
export type CommandGroupProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Group>;

/**
 * Props for the CommandItem component
 */
export type CommandItemProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Item>;

/**
 * Props for the CommandSeparator component
 */
export type CommandSeparatorProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>;

/**
 * Props for the CommandShortcut component
 */
export type CommandShortcutProps = HTMLAttributes<HTMLSpanElement>;
