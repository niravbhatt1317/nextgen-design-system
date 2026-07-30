import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Item } from './Item';

describe('Item', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Item>Test Item</Item>);
      expect(screen.getByText('Test Item')).toBeInTheDocument();
    });

    it('renders with label prop', () => {
      render(<Item label="Item Label" />);
      expect(screen.getByText('Item Label')).toBeInTheDocument();
    });

    it('renders with description prop', () => {
      render(<Item label="Item Label" description="Item description" />);
      expect(screen.getByText('Item Label')).toBeInTheDocument();
      expect(screen.getByText('Item description')).toBeInTheDocument();
    });

    it('renders with icon', () => {
      const icon = <span data-testid="test-icon">★</span>;
      render(<Item icon={icon} label="Item with icon" />);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByText('Item with icon')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(<Item className="custom-class">Item</Item>);
      const itemDiv = container.querySelector('.custom-class');
      expect(itemDiv).toBeInTheDocument();
    });

    it('renders children when no label or description provided', () => {
      render(
        <Item>
          <span>Custom content</span>
        </Item>
      );
      expect(screen.getByText('Custom content')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Item variant="default">Default Item</Item>);
      expect(screen.getByText('Default Item')).toBeInTheDocument();
    });

    it('renders ghost variant', () => {
      render(<Item variant="ghost">Ghost Item</Item>);
      expect(screen.getByText('Ghost Item')).toBeInTheDocument();
    });

    it('renders with active prop', () => {
      render(<Item active>Active Item</Item>);
      expect(screen.getByText('Active Item')).toBeInTheDocument();
    });

    it('renders destructive variant', () => {
      render(<Item variant="destructive">Destructive Item</Item>);
      expect(screen.getByText('Destructive Item')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Item size="sm">Small Item</Item>);
      expect(screen.getByText('Small Item')).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      render(<Item size="md">Medium Item</Item>);
      expect(screen.getByText('Medium Item')).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<Item size="lg">Large Item</Item>);
      expect(screen.getByText('Large Item')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Item onClick={handleClick}>Clickable Item</Item>);
      const item = screen.getByRole('button');

      await user.click(item);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Item onClick={handleClick} disabled>
          Disabled Item
        </Item>
      );
      const item = screen.getByText('Disabled Item');

      await user.click(item);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles Enter key press', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Item onClick={handleClick}>Keyboard Item</Item>);
      const item = screen.getByRole('button');

      item.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles Space key press', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Item onClick={handleClick}>Keyboard Item</Item>);
      const item = screen.getByRole('button');

      item.focus();
      await user.keyboard(' ');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not handle keyboard events when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Item onClick={handleClick} disabled>
          Disabled Keyboard Item
        </Item>
      );
      const item = screen.getByText('Disabled Keyboard Item');

      item.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not handle keyboard events for non-Enter/Space keys', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Item onClick={handleClick}>Item</Item>);
      const item = screen.getByRole('button');

      item.focus();
      await user.keyboard('a');

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has button role when clickable', () => {
      render(<Item onClick={vi.fn()}>Clickable</Item>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has button role for non-default variants', () => {
      render(<Item variant="destructive">Destructive</Item>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders as button when clickable', () => {
      render(<Item onClick={vi.fn()}>Clickable</Item>);
      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('is disabled when disabled prop is true', () => {
      const { container } = render(
        <Item onClick={vi.fn()} disabled>
          Disabled
        </Item>
      );
      // When disabled, the wrapper div has aria-disabled
      const itemWrapper = container.querySelector('[aria-disabled="true"]');
      expect(itemWrapper).toBeInTheDocument();
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref correctly for non-clickable item', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(
        <Item ref={ref} variant="default">
          Item with ref
        </Item>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref correctly for clickable item', () => {
      const ref = { current: null as HTMLButtonElement | null };
      render(
        <Item ref={ref as any} onClick={vi.fn()}>
          Clickable item with ref
        </Item>
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('Clickable logic', () => {
    it('is clickable when onClick is provided', () => {
      render(<Item onClick={vi.fn()}>With onClick</Item>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('is clickable for non-default variant without onClick', () => {
      render(<Item variant="ghost">Ghost variant</Item>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('is not clickable when disabled even with onClick', () => {
      const handleClick = vi.fn();
      render(
        <Item onClick={handleClick} disabled>
          Disabled with onClick
        </Item>
      );
      const item = screen.getByText('Disabled with onClick');
      expect(item).not.toHaveAttribute('role', 'button');
    });
  });
});
