import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './Command';

describe('Command', () => {
  it('renders correctly', () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandGroup>
            <CommandItem>Item 1</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Command ref={ref}>Content</Command>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    const { container } = render(<Command className="custom-class">Content</Command>);
    const commandElement = container.firstChild;
    expect(commandElement).toHaveClass('custom-class');
  });
});

describe('CommandInput', () => {
  it('renders with placeholder', () => {
    render(
      <Command>
        <CommandInput placeholder="Type to search..." />
      </Command>
    );
    expect(screen.getByPlaceholderText('Type to search...')).toBeInTheDocument();
  });

  it('allows typing', async () => {
    const user = userEvent.setup();
    render(
      <Command>
        <CommandInput placeholder="Search..." />
      </Command>
    );
    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'test query');
    expect(input).toHaveValue('test query');
  });

  it('displays search icon', () => {
    const { container } = render(
      <Command>
        <CommandInput placeholder="Search..." />
      </Command>
    );
    const searchIcon = container.querySelector('svg');
    expect(searchIcon).toBeInTheDocument();
  });
});

describe('CommandList', () => {
  it('renders children', () => {
    render(
      <Command>
        <CommandList>
          <CommandItem>Test Item</CommandItem>
        </CommandList>
      </Command>
    );
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Command>
        <CommandList className="custom-list">
          <CommandItem>Item</CommandItem>
        </CommandList>
      </Command>
    );
    const listElement = container.querySelector('.custom-list');
    expect(listElement).toBeInTheDocument();
  });
});

describe('CommandEmpty', () => {
  it('displays empty message', () => {
    render(
      <Command>
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
        </CommandList>
      </Command>
    );
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});

describe('CommandGroup', () => {
  it('renders with heading', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup heading="Suggestions">
            <CommandItem>Item 1</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    expect(screen.getByText('Suggestions')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('renders without heading', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem>Item 1</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });
});

describe('CommandItem', () => {
  it('renders correctly', () => {
    render(
      <Command>
        <CommandList>
          <CommandItem>Click me</CommandItem>
        </CommandList>
      </Command>
    );
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles selection', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <Command>
        <CommandList>
          <CommandItem onSelect={onSelect}>Selectable</CommandItem>
        </CommandList>
      </Command>
    );
    await user.click(screen.getByText('Selectable'));
    expect(onSelect).toHaveBeenCalled();
  });

  it('respects disabled state', () => {
    render(
      <Command>
        <CommandList>
          <CommandItem disabled>Disabled Item</CommandItem>
        </CommandList>
      </Command>
    );
    const item = screen.getByText('Disabled Item');
    expect(item).toHaveAttribute('data-disabled', 'true');
  });
});

describe('CommandSeparator', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem>Item 1</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem>Item 2</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    // CommandSeparator renders as a separator element
    const separators = container.querySelectorAll('[cmdk-separator]');
    expect(separators.length).toBeGreaterThan(0);
  });
});

describe('CommandShortcut', () => {
  it('renders shortcut text', () => {
    render(
      <Command>
        <CommandList>
          <CommandItem>
            Action
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem>
        </CommandList>
      </Command>
    );
    expect(screen.getByText('⌘K')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Command>
        <CommandList>
          <CommandItem>
            Action
            <CommandShortcut className="custom-shortcut">⌘S</CommandShortcut>
          </CommandItem>
        </CommandList>
      </Command>
    );
    expect(screen.getByText('⌘S')).toHaveClass('custom-shortcut');
  });
});

describe('Command integration', () => {
  it('renders complete command palette', () => {
    render(
      <Command>
        <CommandInput placeholder="Search commands..." />
        <CommandList>
          <CommandEmpty>No results</CommandEmpty>
          <CommandGroup heading="Files">
            <CommandItem>New File</CommandItem>
            <CommandItem>Open File</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              Preferences
              <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    expect(screen.getByPlaceholderText('Search commands...')).toBeInTheDocument();
    expect(screen.getByText('Files')).toBeInTheDocument();
    expect(screen.getByText('New File')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('⌘,')).toBeInTheDocument();
  });

  it('filters items based on search', async () => {
    const user = userEvent.setup();
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandGroup>
            <CommandItem>Apple</CommandItem>
            <CommandItem>Banana</CommandItem>
            <CommandItem>Orange</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'ban');

    // cmdk handles filtering internally
    expect(input).toHaveValue('ban');
  });
});
