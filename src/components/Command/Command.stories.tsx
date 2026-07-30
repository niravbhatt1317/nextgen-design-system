/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  CommandDialog,
} from './Command';
import { Icon } from '../Icon';

const meta: Meta<typeof Command> = {
  title: 'Components/Command',
  component: Command,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Command palette for search and navigation. Built with cmdk. Provides fast, accessible command menu functionality with keyboard shortcuts.',
      },
    },
    // Disable aria-required-children rule as cmdk library
    // uses a listbox role that may not have option children
    // in certain states (e.g., when filtering shows no results).
    // This is a known third-party library limitation.
    a11y: {
      config: {
        rules: [{ id: 'aria-required-children', enabled: false }],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic command palette with search and grouped items.
 */
export const Default: Story = {
  render: () => (
    <Command className="mdt-rounded-lg mdt-border mdt-shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Icon name="calendar" size="sm" className="mdt-mr-2" aria-hidden />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Icon name="smile" size="sm" className="mdt-mr-2" aria-hidden />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <Icon name="calculator" size="sm" className="mdt-mr-2" aria-hidden />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <Icon name="user" size="sm" className="mdt-mr-2" aria-hidden />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Icon name="credit-card" size="sm" className="mdt-mr-2" aria-hidden />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Icon name="settings" size="sm" className="mdt-mr-2" aria-hidden />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

/**
 * Command palette in a dialog modal.
 */
export const Dialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <p className="mdt-text-sm mdt-text-muted-foreground">
          Press{' '}
          <kbd className="mdt-pointer-events-none mdt-inline-flex mdt-h-5 mdt-select-none mdt-items-center mdt-gap-1 mdt-rounded mdt-border mdt-bg-muted mdt-px-1.5 mdt-font-mono mdt-text-[10px] mdt-font-medium mdt-text-foreground mdt-opacity-100">
            <span className="mdt-text-xs">⌘</span>K
          </kbd>
        </p>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="mdt-mt-4 mdt-rounded-md mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90"
        >
          Open Command Menu
        </button>
        {open && (
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Icon name="calendar" size="sm" className="mdt-mr-2" aria-hidden />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Icon name="smile" size="sm" className="mdt-mr-2" aria-hidden />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem>
                  <Icon name="calculator" size="sm" className="mdt-mr-2" aria-hidden />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        )}
      </>
    );
  },
};

/**
 * Command with keyboard shortcuts displayed.
 */
export const WithShortcuts: Story = {
  render: () => (
    <Command className="mdt-rounded-lg mdt-border mdt-shadow-md">
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>
            <Icon name="file-text" size="sm" className="mdt-mr-2" aria-hidden />
            <span>New File</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Icon name="search" size="sm" className="mdt-mr-2" aria-hidden />
            <span>Search Files</span>
            <CommandShortcut>⌘F</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Icon name="settings" size="sm" className="mdt-mr-2" aria-hidden />
            <span>Open Settings</span>
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

/**
 * Multiple command groups with separators.
 */
export const MultipleGroups: Story = {
  render: () => (
    <Command className="mdt-rounded-lg mdt-border mdt-shadow-md">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Files">
          <CommandItem>
            <Icon name="file-text" size="sm" className="mdt-mr-2" aria-hidden />
            <span>New File</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Icon name="file-text" size="sm" className="mdt-mr-2" aria-hidden />
            <span>Open File</span>
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Communication">
          <CommandItem>
            <Icon name="mail" size="sm" className="mdt-mr-2" aria-hidden />
            <span>Email</span>
          </CommandItem>
          <CommandItem>
            <Icon name="message-square" size="sm" className="mdt-mr-2" aria-hidden />
            <span>Messages</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <Icon name="user" size="sm" className="mdt-mr-2" aria-hidden />
            <span>Profile</span>
          </CommandItem>
          <CommandItem>
            <Icon name="settings" size="sm" className="mdt-mr-2" aria-hidden />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

/**
 * Command with selection handling.
 */
export const WithSelection: Story = {
  render: () => {
    const [selectedCommand, setSelectedCommand] = useState<string>('');

    return (
      <div className="mdt-space-y-4">
        <Command className="mdt-rounded-lg mdt-border mdt-shadow-md">
          <CommandInput placeholder="Select a command..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem
                onSelect={() => {
                  setSelectedCommand('calendar');
                }}
              >
                <Icon name="calendar" size="sm" className="mdt-mr-2" aria-hidden />
                <span>Open Calendar</span>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setSelectedCommand('profile');
                }}
              >
                <Icon name="user" size="sm" className="mdt-mr-2" aria-hidden />
                <span>View Profile</span>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setSelectedCommand('settings');
                }}
              >
                <Icon name="settings" size="sm" className="mdt-mr-2" aria-hidden />
                <span>Open Settings</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        {selectedCommand && (
          <div className="mdt-rounded-md mdt-border mdt-bg-muted/50 mdt-p-4 mdt-text-sm">
            <span className="mdt-font-medium">Selected: </span>
            <span className="mdt-font-mono mdt-text-primary">{selectedCommand}</span>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Disabled command items.
 */
export const WithDisabledItems: Story = {
  render: () => (
    <Command className="mdt-rounded-lg mdt-border mdt-shadow-md">
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>
            <Icon name="file-text" size="sm" className="mdt-mr-2" aria-hidden />
            <span>New File</span>
          </CommandItem>
          <CommandItem disabled>
            <Icon name="file-text" size="sm" className="mdt-mr-2" aria-hidden />
            <span>Save (disabled)</span>
          </CommandItem>
          <CommandItem>
            <Icon name="search" size="sm" className="mdt-mr-2" aria-hidden />
            <span>Search</span>
          </CommandItem>
          <CommandItem disabled>
            <Icon name="settings" size="sm" className="mdt-mr-2" aria-hidden />
            <span>Settings (disabled)</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

/**
 * Simple command menu without icons.
 */
export const Simple: Story = {
  render: () => (
    <Command className="mdt-rounded-lg mdt-border mdt-shadow-md">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Fruits">
          <CommandItem>Apple</CommandItem>
          <CommandItem>Banana</CommandItem>
          <CommandItem>Orange</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Vegetables">
          <CommandItem>Carrot</CommandItem>
          <CommandItem>Broccoli</CommandItem>
          <CommandItem>Spinach</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

/**
 * Custom empty state message.
 */
export const CustomEmptyState: Story = {
  render: () => (
    <Command className="mdt-rounded-lg mdt-border mdt-shadow-md">
      <CommandInput placeholder="Search for commands..." />
      <CommandList>
        <CommandEmpty>
          <div className="mdt-py-6 mdt-text-center">
            <p className="mdt-text-sm mdt-text-muted-foreground">No commands found.</p>
            <p className="mdt-mt-1 mdt-text-xs mdt-text-muted-foreground">
              Try searching for something else.
            </p>
          </div>
        </CommandEmpty>
        <CommandGroup heading="Commands">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};
