'use client';

import { forwardRef } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '@/utils';
import { Icon } from '@/components/Icon';
import type {
  CommandProps,
  CommandDialogProps,
  CommandInputProps,
  CommandListProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandItemProps,
  CommandSeparatorProps,
  CommandShortcutProps,
} from './Command.types';

/**
 * Command - Main command palette component.
 * Wrapper around cmdk with custom styling.
 *
 * @example
 * ```tsx
 * <Command>
 *   <CommandInput placeholder="Type a command..." />
 *   <CommandList>
 *     <CommandEmpty>No results found.</CommandEmpty>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem>Calendar</CommandItem>
 *       <CommandItem>Search Emoji</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 * ```
 */
const Command = forwardRef<HTMLDivElement, CommandProps>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'mdt-flex mdt-h-full mdt-w-full mdt-flex-col mdt-overflow-hidden mdt-rounded-md mdt-bg-popover mdt-text-popover-foreground',
      className
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

/**
 * CommandDialog - Command palette in a dialog.
 *
 * @example
 * ```tsx
 * <CommandDialog open={open} onOpenChange={setOpen}>
 *   <CommandInput placeholder="Search..." />
 *   <CommandList>
 *     <CommandGroup heading="Actions">
 *       <CommandItem>New File</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </CommandDialog>
 * ```
 */
const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <div className="mdt-fixed mdt-inset-0 mdt-z-50 mdt-overflow-y-auto mdt-bg-background/80 mdt-p-4 mdt-backdrop-blur-sm">
      {/*
        Centred by layout rather than by `translate(-50%, -50%)`, for the same
        reason `Dialog` is: a keyframe's transform replaces the element's, so a
        centring transform and an animation cannot share one element. This one
        has no animation today and so never jolted - it was one `animate-*`
        class away from doing so.
      */}
      <div className="mdt-flex mdt-min-h-full mdt-items-center mdt-justify-center">
        <div className="mdt-grid mdt-w-full mdt-max-w-lg mdt-gap-4 mdt-rounded-lg mdt-border mdt-bg-background mdt-p-6 mdt-shadow-lg mdt-duration-200">
          <Command
            className="[&_[cmdk-group-heading]]:mdt-px-2 [&_[cmdk-group-heading]]:mdt-font-medium [&_[cmdk-group-heading]]:mdt-text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:mdt-pt-0 [&_[cmdk-group]]:mdt-px-2 [&_[cmdk-input-wrapper]_svg]:mdt-h-5 [&_[cmdk-input-wrapper]_svg]:mdt-w-5 [&_[cmdk-input]]:mdt-h-12 [&_[cmdk-item]]:mdt-px-2 [&_[cmdk-item]]:mdt-py-3 [&_[cmdk-item]_svg]:mdt-h-5 [&_[cmdk-item]_svg]:mdt-w-5"
            {...props}
          >
            {children}
          </Command>
        </div>
      </div>
    </div>
  );
};

/**
 * CommandInput - Search input for filtering commands.
 *
 * @example
 * ```tsx
 * <CommandInput placeholder="Type to search..." />
 * ```
 */
const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, ...props }, ref) => (
    <div className="mdt-flex mdt-items-center mdt-border-b mdt-px-3" data-cmdk-input-wrapper="">
      <Icon name="search" size="sm" className="mdt-mr-2 mdt-shrink-0 mdt-opacity-50" aria-hidden />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          'mdt-flex mdt-h-10 mdt-w-full mdt-rounded-md mdt-bg-transparent mdt-py-3 mdt-text-sm mdt-outline-none placeholder:mdt-text-muted-foreground disabled:mdt-cursor-not-allowed disabled:mdt-opacity-50',
          className
        )}
        {...props}
      />
    </div>
  )
);
CommandInput.displayName = CommandPrimitive.Input.displayName;

/**
 * CommandList - Scrollable list of command items.
 *
 * @example
 * ```tsx
 * <CommandList>
 *   <CommandGroup>
 *     <CommandItem>Item 1</CommandItem>
 *   </CommandGroup>
 * </CommandList>
 * ```
 */
const CommandList = forwardRef<HTMLDivElement, CommandListProps>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('mdt-max-h-[300px] mdt-overflow-y-auto mdt-overflow-x-hidden', className)}
    {...props}
  />
));
CommandList.displayName = CommandPrimitive.List.displayName;

/**
 * CommandEmpty - Message shown when no results found.
 *
 * @example
 * ```tsx
 * <CommandEmpty>No results found.</CommandEmpty>
 * ```
 */
const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="mdt-py-6 mdt-text-center mdt-text-sm" {...props} />
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

/**
 * CommandGroup - Group of related command items.
 *
 * @example
 * ```tsx
 * <CommandGroup heading="Files">
 *   <CommandItem>New File</CommandItem>
 *   <CommandItem>Open File</CommandItem>
 * </CommandGroup>
 * ```
 */
const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        'mdt-overflow-hidden mdt-p-1 mdt-text-foreground [&_[cmdk-group-heading]]:mdt-px-2 [&_[cmdk-group-heading]]:mdt-py-1.5 [&_[cmdk-group-heading]]:mdt-text-xs [&_[cmdk-group-heading]]:mdt-font-medium [&_[cmdk-group-heading]]:mdt-text-muted-foreground',
        className
      )}
      {...props}
    />
  )
);
CommandGroup.displayName = CommandPrimitive.Group.displayName;

/**
 * CommandSeparator - Visual separator between command groups.
 *
 * @example
 * ```tsx
 * <CommandSeparator />
 * ```
 */
const CommandSeparator = forwardRef<HTMLDivElement, CommandSeparatorProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn('mdt--mx-1 mdt-h-px mdt-bg-border', className)}
      {...props}
    />
  )
);
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

/**
 * CommandItem - Individual selectable command item.
 *
 * @example
 * ```tsx
 * <CommandItem onSelect={() => console.log('Selected')}>
 *   <File className="mr-2 h-4 w-4" />
 *   <span>New File</span>
 * </CommandItem>
 * ```
 */
const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'mdt-relative mdt-flex mdt-cursor-pointer mdt-select-none mdt-items-center mdt-rounded-sm mdt-px-2 mdt-py-1.5 mdt-text-sm mdt-outline-none',
      'mdt-text-foreground',
      'hover:mdt-bg-neutral-10',
      "data-[disabled='true']:mdt-pointer-events-none data-[disabled='true']:mdt-opacity-50",
      'aria-selected:mdt-bg-neutral-10',
      className
    )}
    {...props}
  />
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

/**
 * CommandShortcut - Keyboard shortcut hint.
 *
 * @example
 * ```tsx
 * <CommandItem>
 *   <span>Save</span>
 *   <CommandShortcut>⌘S</CommandShortcut>
 * </CommandItem>
 * ```
 */
const CommandShortcut = ({ className, ...props }: CommandShortcutProps) => {
  return (
    <span
      className={cn(
        'mdt-ml-auto mdt-text-xs mdt-tracking-widest mdt-text-muted-foreground',
        className
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = 'CommandShortcut';

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
};
