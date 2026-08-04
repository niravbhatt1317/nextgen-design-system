import { vi } from 'vitest';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuFooter,
  DropdownMenuHeader,
  DropdownMenuList,
  DropdownMenuSearch,
  DropdownMenuSelectAll,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './DropdownMenu';

describe('DropdownMenu', () => {
  describe('Rendering', () => {
    it('renders trigger button', () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
      expect(screen.getByRole('button', { name: 'Open Menu' })).toBeInTheDocument();
    });

    it('does not render content initially', () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('Opening and Closing', () => {
    it('opens when trigger is clicked', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('closes when clicking outside', async () => {
      const user = userEvent.setup();
      render(
        <div data-testid="container">
          <DropdownMenu>
            <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Item 1</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button data-testid="outside-button">Outside</button>
        </div>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      expect(screen.getByRole('menu')).toBeInTheDocument();

      // Click outside using fireEvent on document.body to trigger Radix dismiss behavior
      fireEvent.pointerDown(document.body);
      fireEvent.mouseDown(document.body);
      fireEvent.click(document.body);

      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });

    it('closes when Escape is pressed', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      expect(screen.getByRole('menu')).toBeInTheDocument();

      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });
  });

  describe('DropdownMenuItem', () => {
    it('renders menu items', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      expect(screen.getByRole('menuitem', { name: 'Item 1' })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'Item 2' })).toBeInTheDocument();
    });

    it('calls onSelect when item is clicked', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={handleSelect}>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      await user.click(screen.getByRole('menuitem', { name: 'Item 1' }));
      expect(handleSelect).toHaveBeenCalled();
    });

    it('supports disabled items', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem disabled>Disabled Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      const item = screen.getByRole('menuitem', { name: 'Disabled Item' });
      expect(item).toHaveAttribute('data-disabled');
    });

    it('applies inset class when inset prop is true', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem inset>Inset Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      expect(screen.getByRole('menuitem', { name: 'Inset Item' })).toHaveClass('mdt-pl-9');
    });
  });

  describe('DropdownMenuLabel', () => {
    it('renders label', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Section Label</DropdownMenuLabel>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      expect(screen.getByText('Section Label')).toBeInTheDocument();
    });
  });

  describe('DropdownMenuSeparator', () => {
    it('renders separator', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuSeparator data-testid="separator" />
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      expect(screen.getByTestId('separator')).toBeInTheDocument();
    });
  });

  describe('shortcuts', () => {
    it('draws key caps from data rather than hand-typed text', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem shortcut={['mod', 's']}>Save</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      // Kbd spells the shortcut out for a screen reader; the caps themselves
      // are decoration.
      const item = screen.getByRole('menuitem', { name: /Save/ });
      expect(item.querySelector('kbd')).not.toBeNull();
    });

    it('still takes a hand-composed shortcut, for a row built by hand', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              Save
              <DropdownMenuShortcut keys={['mod', 's']} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      expect(screen.getByRole('menuitem', { name: /Save/ }).querySelector('kbd')).not.toBeNull();
    });
  });

  describe('DropdownMenuCheckboxItem', () => {
    it('renders checkbox items', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked>Checked Item</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Unchecked Item</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      const checkedItem = screen.getByRole('menuitemcheckbox', { name: 'Checked Item' });
      const uncheckedItem = screen.getByRole('menuitemcheckbox', { name: 'Unchecked Item' });

      expect(checkedItem).toHaveAttribute('data-state', 'checked');
      expect(uncheckedItem).toHaveAttribute('data-state', 'unchecked');
    });
  });

  describe('DropdownMenuRadioGroup', () => {
    it('renders radio items', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value="option1">
              <DropdownMenuRadioItem value="option1">Option 1</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="option2">Option 2</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      const option1 = screen.getByRole('menuitemradio', { name: 'Option 1' });
      const option2 = screen.getByRole('menuitemradio', { name: 'Option 2' });

      expect(option1).toHaveAttribute('data-state', 'checked');
      expect(option2).toHaveAttribute('data-state', 'unchecked');
    });
  });

  describe('Keyboard Navigation', () => {
    it('supports keyboard navigation with arrow keys', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
            <DropdownMenuItem>Item 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));

      await user.keyboard('{ArrowDown}');
      await waitFor(() => {
        expect(screen.getByRole('menuitem', { name: 'Item 1' })).toHaveFocus();
      });

      await user.keyboard('{ArrowDown}');
      await waitFor(() => {
        expect(screen.getByRole('menuitem', { name: 'Item 2' })).toHaveFocus();
      });
    });

    it('selects item with Enter key', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={handleSelect}>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');
      expect(handleSelect).toHaveBeenCalled();
    });
  });

  describe('DropdownMenuSubTrigger and DropdownMenuSubContent', () => {
    it('renders sub trigger with chevron icon', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));

      await waitFor(() => {
        const subTrigger = screen.getByText('More Options');
        expect(subTrigger).toBeInTheDocument();
      });

      // Verify the chevron icon is rendered (aria-hidden svg inside the sub trigger)
      const subTrigger = screen.getByText('More Options').closest('[role="menuitem"]');
      expect(subTrigger).toBeInTheDocument();
      const chevronSvg = subTrigger?.querySelector('svg[aria-hidden="true"]');
      expect(chevronSvg).toBeInTheDocument();
    });

    it('applies inset class on sub trigger when inset prop is true', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger inset>Inset Sub Trigger</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Sub Item</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));

      await waitFor(() => {
        const subTrigger = screen.getByText('Inset Sub Trigger').closest('[role="menuitem"]');
        expect(subTrigger).toHaveClass('mdt-pl-9');
      });
    });

    it('opens sub content when sub trigger is hovered', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));

      await waitFor(() => {
        expect(screen.getByText('More Options')).toBeInTheDocument();
      });

      // Navigate to sub trigger via keyboard and open submenu
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowRight}');

      await waitFor(() => {
        expect(screen.getByText('Sub Item 1')).toBeInTheDocument();
      });
    });

    it('applies custom className to sub content', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub open>
              <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="mdt-custom-sub-content" data-testid="sub-content">
                <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));

      await waitFor(() => {
        const subContent = screen.getByTestId('sub-content');
        expect(subContent).toBeInTheDocument();
        expect(subContent).toHaveClass('mdt-custom-sub-content');
      });
    });
  });

  describe('DropdownMenuLabel inset', () => {
    it('applies inset class when inset prop is true', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel inset>Inset Label</DropdownMenuLabel>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));

      await waitFor(() => {
        const label = screen.getByText('Inset Label');
        expect(label).toHaveClass('mdt-pl-9');
      });
    });
  });

  describe('DropdownMenuCheckboxItem without checked prop', () => {
    it('renders checkbox item when checked prop is undefined', async () => {
      const user = userEvent.setup();
      const handleCheckedChange = vi.fn();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem onCheckedChange={handleCheckedChange}>
              No Checked Prop
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));

      await waitFor(() => {
        const item = screen.getByRole('menuitemcheckbox', { name: 'No Checked Prop' });
        expect(item).toBeInTheDocument();
        expect(item).toHaveAttribute('data-state', 'unchecked');
      });
    });
  });

  // ==========================================================================
  // The parts that did not exist before
  // ==========================================================================

  const openMenu = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.click(screen.getByRole('button', { name: 'Open Menu' }));
  };

  describe('DropdownMenuHeader', () => {
    it('names the whole panel', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuHeader title="Bulk actions" description="20 of 248 selected" />
            <DropdownMenuItem>Refresh</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await openMenu(user);
      expect(screen.getByText('Bulk actions')).toBeInTheDocument();
      expect(screen.getByText('20 of 248 selected')).toBeInTheDocument();
    });

    it('is not a menu item - a heading is not something you can press', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuHeader title="Bulk actions" />
            <DropdownMenuItem>Refresh</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await openMenu(user);
      expect(screen.getAllByRole('menuitem')).toHaveLength(1);
    });

    it('holds a search box instead of words', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuHeader>
              <DropdownMenuSearch placeholder="Search people" />
            </DropdownMenuHeader>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await openMenu(user);
      expect(screen.getByPlaceholderText('Search people')).toBeInTheDocument();
    });
  });

  describe('DropdownMenuSearch', () => {
    it('keeps a typed letter in the box instead of jumping to a row', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuHeader>
              <DropdownMenuSearch placeholder="Search" />
            </DropdownMenuHeader>
            <DropdownMenuItem>Rename</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await openMenu(user);
      const box = screen.getByPlaceholderText('Search');
      await user.click(box);
      await user.keyboard('re');

      // Radix moves focus on printable keys; without stopping that, the first
      // letter would send you to "Rename" and the box would stay empty.
      expect(box).toHaveValue('re');
      expect(box).toHaveFocus();
    });
  });

  describe('DropdownMenuSelectAll', () => {
    const band = () => document.querySelector('[data-slot="menu-select-all"]') as HTMLElement;
    const toggle = () => screen.getByRole('checkbox');

    const setup = (selected: number, handlers: { all?: () => void; clear?: () => void } = {}) =>
      render(
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSelectAll
              selected={selected}
              total={5}
              onSelectAll={handlers.all ?? (() => undefined)}
              onClear={handlers.clear ?? (() => undefined)}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );

    it('offers to take everything when nothing is chosen', () => {
      setup(0);
      expect(screen.getByText('Select all')).toBeInTheDocument();
      expect(toggle()).toHaveAttribute('aria-checked', 'false');
    });

    it('reports the count once something is chosen, and drops the invitation', () => {
      setup(2);
      expect(screen.getByText('2 selected')).toBeInTheDocument();
      expect(screen.queryByText('Select all')).not.toBeInTheDocument();
    });

    it('is mixed rather than checked when only some are chosen', () => {
      setup(2);
      expect(toggle()).toHaveAttribute('aria-checked', 'mixed');
    });

    it('is checked when every one is', () => {
      setup(5);
      expect(toggle()).toHaveAttribute('aria-checked', 'true');
    });

    it('takes everything when pressed from empty', async () => {
      const user = userEvent.setup();
      const all = vi.fn();
      setup(0, { all });
      await user.click(toggle());
      expect(all).toHaveBeenCalledOnce();
    });

    it('drops everything when pressed while full - the same box, both ways', async () => {
      const user = userEvent.setup();
      const clear = vi.fn();
      setup(5, { clear });
      await user.click(toggle());
      expect(clear).toHaveBeenCalledOnce();
    });

    it('offers Clear only while something is chosen', async () => {
      const user = userEvent.setup();
      const clear = vi.fn();
      const { unmount } = setup(0, { clear });
      expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
      unmount();

      setup(3, { clear });
      await user.click(screen.getByRole('button', { name: 'Clear' }));
      expect(clear).toHaveBeenCalledOnce();
    });

    it('holds one height whichever shape it is in', () => {
      const { unmount } = setup(0);
      const empty = band().className;
      unmount();
      setup(3);
      // Every child pinned to the same height is what stops the list below
      // jumping when you clear.
      expect(band().className).toBe(empty);
      expect(band().className).toContain('[&>*]:mdt-h-[22px]');
    });
  });

  describe('DropdownMenuList', () => {
    it('caps its height so a long menu scrolls rather than running off the screen', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuList>
              <DropdownMenuItem>One</DropdownMenuItem>
            </DropdownMenuList>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await openMenu(user);
      const list = document.querySelector('[data-slot="menu-list"]') as HTMLElement;
      expect(list).toHaveStyle({ maxHeight: '260px' });
      expect(list.className).toContain('mdt-overflow-y-auto');
    });

    it('takes a cap of its own', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuList maxHeight={120}>
              <DropdownMenuItem>One</DropdownMenuItem>
            </DropdownMenuList>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await openMenu(user);
      expect(document.querySelector('[data-slot="menu-list"]')).toHaveStyle({ maxHeight: '120px' });
    });
  });

  describe('rows', () => {
    it('renders a second line under the label', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem description="Opens in any spreadsheet">CSV</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await openMenu(user);
      expect(screen.getByText('Opens in any spreadsheet')).toBeInTheDocument();
    });

    it('reserves no leading column when a row has no icon', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Plain</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await openMenu(user);
      const item = screen.getByRole('menuitem', { name: 'Plain' });
      // An empty column would push every label 26px right of nothing.
      expect(item.querySelectorAll('span[aria-hidden="true"]')).toHaveLength(0);
    });

    it('marks a destructive row, and only that one', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuItem tone="danger">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await openMenu(user);
      expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveAttribute(
        'data-tone',
        'danger'
      );
      expect(screen.getByRole('menuitem', { name: 'Rename' })).not.toHaveAttribute('data-tone');
    });

    it('uses the danger INK on a red row, not the fill colour', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem tone="danger">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await openMenu(user);
      // `destructive` carries white text ON it; read AS text on a dark panel it
      // measures 3.43, under the floor.
      expect(screen.getByRole('menuitem', { name: 'Delete' }).className).toContain(
        'mdt-text-danger-text'
      );
    });
  });

  describe('which side the mark sits on', () => {
    it('trails the tick by default', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value="a">
              <DropdownMenuRadioItem value="a">Alpha</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await openMenu(user);
      const row = screen.getByRole('menuitemradio', { name: 'Alpha' });
      expect(row.querySelector('[data-slot="menu-dot"]')).toBeNull();
    });

    it('leads with a dot when asked', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value="a">
              <DropdownMenuRadioItem value="a" indicator="dot">
                Alpha
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await openMenu(user);
      expect(
        screen.getByRole('menuitemradio', { name: 'Alpha' }).querySelector('[data-slot="menu-dot"]')
      ).not.toBeNull();
    });

    it('always leads a checkbox with its box', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked>Alpha</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await openMenu(user);
      expect(
        screen
          .getByRole('menuitemcheckbox', { name: 'Alpha' })
          .querySelector('[data-slot="menu-box"]')
      ).not.toBeNull();
    });
  });

  describe('DropdownMenuFooter', () => {
    it('holds the decision at the bottom', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Alpha</DropdownMenuItem>
            <DropdownMenuFooter>
              <button type="button">Reset</button>
              <button type="button">Apply</button>
            </DropdownMenuFooter>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await openMenu(user);
      const footer = document.querySelector('[data-slot="menu-footer"]') as HTMLElement;
      expect(footer).toBeInTheDocument();
      // The quieter action first, matching every other footer in the set.
      expect(footer.textContent).toBe('ResetApply');
    });
  });
});
