import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  describe('Rendering', () => {
    it('renders toggle button', () => {
      render(<Toggle aria-label="Toggle bold">Bold</Toggle>);
      expect(screen.getByRole('button', { name: 'Toggle bold' })).toBeInTheDocument();
    });

    it('renders with children text', () => {
      render(<Toggle>Toggle me</Toggle>);
      expect(screen.getByText('Toggle me')).toBeInTheDocument();
    });

    it('renders with icon children', () => {
      const Icon = () => <span data-testid="test-icon">★</span>;
      render(
        <Toggle aria-label="Toggle">
          <Icon />
        </Toggle>
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Toggle className="custom-class">Toggle</Toggle>);
      const toggle = screen.getByRole('button');
      expect(toggle).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Toggle variant="default">Default</Toggle>);
      const toggle = screen.getByRole('button');
      expect(toggle).toHaveClass('mdt-bg-transparent');
    });

    it('renders outline variant', () => {
      render(<Toggle variant="outline">Outline</Toggle>);
      const toggle = screen.getByRole('button');
      expect(toggle).toHaveClass('mdt-border');
      expect(toggle).toHaveClass('mdt-border-input');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Toggle size="sm">Small</Toggle>);
      const toggle = screen.getByRole('button');
      expect(toggle).toHaveClass('mdt-h-8');
      expect(toggle).toHaveClass('mdt-px-2');
      expect(toggle).toHaveClass('mdt-text-xs');
    });

    it('renders medium size (default)', () => {
      render(<Toggle size="md">Medium</Toggle>);
      const toggle = screen.getByRole('button');
      expect(toggle).toHaveClass('mdt-h-9');
      expect(toggle).toHaveClass('mdt-px-3');
      expect(toggle).toHaveClass('mdt-text-sm');
    });

    it('renders large size', () => {
      render(<Toggle size="lg">Large</Toggle>);
      const toggle = screen.getByRole('button');
      expect(toggle).toHaveClass('mdt-h-10');
      expect(toggle).toHaveClass('mdt-px-4');
      expect(toggle).toHaveClass('mdt-text-base');
    });
  });

  describe('Interactions', () => {
    it('toggles state when clicked', async () => {
      const user = userEvent.setup();
      render(<Toggle>Toggle me</Toggle>);
      const toggle = screen.getByRole('button');

      expect(toggle).toHaveAttribute('data-state', 'off');

      await user.click(toggle);

      expect(toggle).toHaveAttribute('data-state', 'on');

      await user.click(toggle);

      expect(toggle).toHaveAttribute('data-state', 'off');
    });

    it('calls onPressedChange when toggled', async () => {
      const handlePressedChange = vi.fn();
      const user = userEvent.setup();
      render(<Toggle onPressedChange={handlePressedChange}>Toggle</Toggle>);
      const toggle = screen.getByRole('button');

      await user.click(toggle);

      expect(handlePressedChange).toHaveBeenCalledWith(true);

      await user.click(toggle);

      expect(handlePressedChange).toHaveBeenCalledWith(false);
    });

    it('respects controlled pressed state', async () => {
      const handlePressedChange = vi.fn();
      const user = userEvent.setup();
      const { rerender } = render(
        <Toggle pressed={false} onPressedChange={handlePressedChange}>
          Controlled
        </Toggle>
      );
      const toggle = screen.getByRole('button');

      expect(toggle).toHaveAttribute('data-state', 'off');

      await user.click(toggle);

      expect(handlePressedChange).toHaveBeenCalledWith(true);

      // Simulate controlled update
      rerender(
        <Toggle pressed={true} onPressedChange={handlePressedChange}>
          Controlled
        </Toggle>
      );

      expect(toggle).toHaveAttribute('data-state', 'on');
    });

    it('has pressed state styling when toggled on', async () => {
      const user = userEvent.setup();
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole('button');

      await user.click(toggle);

      // Check for pressed state classes
      expect(toggle).toHaveAttribute('data-state', 'on');
      expect(toggle.className).toContain('data-[state=on]:mdt-bg-primary');
    });
  });

  describe('Disabled state', () => {
    it('renders disabled toggle', () => {
      render(<Toggle disabled>Disabled</Toggle>);
      const toggle = screen.getByRole('button');
      expect(toggle).toBeDisabled();
    });

    it('does not toggle when disabled', async () => {
      const handlePressedChange = vi.fn();
      render(
        <Toggle disabled onPressedChange={handlePressedChange}>
          Disabled
        </Toggle>
      );
      const toggle = screen.getByRole('button');

      expect(toggle).toBeDisabled();
      expect(handlePressedChange).not.toHaveBeenCalled();
    });

    it('has disabled opacity class', () => {
      render(<Toggle disabled>Disabled</Toggle>);
      const toggle = screen.getByRole('button');
      expect(toggle).toHaveClass('disabled:mdt-opacity-50');
    });

    it('has disabled pointer events class', () => {
      render(<Toggle disabled>Disabled</Toggle>);
      const toggle = screen.getByRole('button');
      expect(toggle).toHaveClass('disabled:mdt-pointer-events-none');
    });
  });

  describe('Accessibility', () => {
    it('has button role', () => {
      render(<Toggle aria-label="Toggle">Toggle</Toggle>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Toggle aria-label="Toggle italic">Italic</Toggle>);
      expect(screen.getByLabelText('Toggle italic')).toBeInTheDocument();
    });

    it('indicates pressed state via aria-pressed', async () => {
      const user = userEvent.setup();
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole('button');

      expect(toggle).toHaveAttribute('aria-pressed', 'false');

      await user.click(toggle);

      expect(toggle).toHaveAttribute('aria-pressed', 'true');
    });

    it('is keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole('button');

      toggle.focus();
      expect(toggle).toHaveFocus();

      await user.keyboard('{Enter}');

      expect(toggle).toHaveAttribute('data-state', 'on');
    });

    it('has focus ring classes', () => {
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole('button');
      expect(toggle).toHaveClass('focus-visible:mdt-ring-2');
    });
  });

  describe('Default pressed state', () => {
    it('starts unpressed by default', () => {
      render(<Toggle>Toggle</Toggle>);
      const toggle = screen.getByRole('button');
      expect(toggle).toHaveAttribute('data-state', 'off');
    });

    it('starts pressed when defaultPressed is true', () => {
      render(<Toggle defaultPressed={true}>Toggle</Toggle>);
      const toggle = screen.getByRole('button');
      expect(toggle).toHaveAttribute('data-state', 'on');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null as HTMLButtonElement | null };
      render(<Toggle ref={ref}>Toggle</Toggle>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('can focus via ref', () => {
      const ref = { current: null as HTMLButtonElement | null };
      render(<Toggle ref={ref}>Toggle</Toggle>);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe('Custom Props', () => {
    it('accepts custom data attributes', () => {
      render(<Toggle data-testid="custom-toggle">Toggle</Toggle>);
      expect(screen.getByTestId('custom-toggle')).toBeInTheDocument();
    });

    it('accepts type attribute', () => {
      render(<Toggle type="button">Toggle</Toggle>);
      const toggle = screen.getByRole('button');
      expect(toggle).toHaveAttribute('type', 'button');
    });
  });

  describe('Icon handling', () => {
    it('applies pointer-events-none to SVG children', () => {
      const { container } = render(
        <Toggle aria-label="Toggle">
          <svg data-testid="icon">
            <path />
          </svg>
        </Toggle>
      );
      const svg = container.querySelector('svg');
      // The class is applied via [&_svg] selector, so check parent has the class
      const toggle = screen.getByRole('button');
      expect(toggle.className).toContain('[&_svg]:mdt-pointer-events-none');
    });

    it('applies shrink-0 to SVG children', () => {
      const { container } = render(
        <Toggle aria-label="Toggle">
          <svg>
            <path />
          </svg>
        </Toggle>
      );
      const toggle = screen.getByRole('button');
      expect(toggle.className).toContain('[&_svg]:mdt-shrink-0');
    });
  });

  describe('Combined variants and sizes', () => {
    it('renders outline variant with small size', () => {
      render(
        <Toggle variant="outline" size="sm">
          Small Outline
        </Toggle>
      );
      const toggle = screen.getByRole('button');
      expect(toggle).toHaveClass('mdt-border');
      expect(toggle).toHaveClass('mdt-h-8');
    });

    it('renders default variant with large size', () => {
      render(
        <Toggle variant="default" size="lg">
          Large Default
        </Toggle>
      );
      const toggle = screen.getByRole('button');
      expect(toggle).toHaveClass('mdt-bg-transparent');
      expect(toggle).toHaveClass('mdt-h-10');
    });
  });
});
