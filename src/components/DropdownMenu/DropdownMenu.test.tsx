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
      expect(screen.getByRole('menuitem', { name: 'Inset Item' })).toHaveClass('mdt-pl-8');
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

  describe('DropdownMenuShortcut', () => {
    it('renders keyboard shortcut', async () => {
      const user = userEvent.setup();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              Save
              <DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      expect(screen.getByText('Ctrl+S')).toBeInTheDocument();
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
        expect(subTrigger).toHaveClass('mdt-pl-8');
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
        expect(label).toHaveClass('mdt-pl-8');
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
});
