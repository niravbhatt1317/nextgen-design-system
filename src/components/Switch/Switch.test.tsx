import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { MotadataSwitch } from './Switch';

describe('MotadataSwitch', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<MotadataSwitch aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('renders with unchecked state by default', () => {
      render(<MotadataSwitch aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('data-state', 'unchecked');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('renders with checked state when defaultChecked is true', () => {
      render(<MotadataSwitch defaultChecked aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('data-state', 'checked');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });

    it('renders with custom className', () => {
      render(<MotadataSwitch className="custom-class" aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass('custom-class');
    });

    it('applies base styling classes', () => {
      render(<MotadataSwitch aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass('mdt-inline-flex');
      expect(switchElement).toHaveClass('mdt-rounded-full');
      expect(switchElement).toHaveClass('mdt-cursor-pointer');
    });
  });

  describe('Sizes', () => {
    it('renders with small size', () => {
      render(<MotadataSwitch size="sm" aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass('mdt-h-5');
      expect(switchElement).toHaveClass('mdt-w-9');
    });

    it('renders with medium size (default)', () => {
      render(<MotadataSwitch aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass('mdt-h-6');
      expect(switchElement).toHaveClass('mdt-w-11');
    });

    it('renders with large size', () => {
      render(<MotadataSwitch size="lg" aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass('mdt-h-7');
      expect(switchElement).toHaveClass('mdt-w-14');
    });
  });

  describe('Interactions', () => {
    it('toggles state when clicked', async () => {
      const user = userEvent.setup();
      render(<MotadataSwitch aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');

      expect(switchElement).toHaveAttribute('data-state', 'unchecked');

      await user.click(switchElement);
      expect(switchElement).toHaveAttribute('data-state', 'checked');

      await user.click(switchElement);
      expect(switchElement).toHaveAttribute('data-state', 'unchecked');
    });

    it('toggles state with keyboard (Space)', async () => {
      const user = userEvent.setup();
      render(<MotadataSwitch aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');

      switchElement.focus();
      expect(switchElement).toHaveAttribute('data-state', 'unchecked');

      await user.keyboard(' ');
      expect(switchElement).toHaveAttribute('data-state', 'checked');

      await user.keyboard(' ');
      expect(switchElement).toHaveAttribute('data-state', 'unchecked');
    });

    it('calls onCheckedChange when toggled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<MotadataSwitch onCheckedChange={handleChange} aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');

      await user.click(switchElement);
      expect(handleChange).toHaveBeenCalledWith(true);

      await user.click(switchElement);
      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('does not toggle when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <MotadataSwitch disabled onCheckedChange={handleChange} aria-label="Toggle setting" />
      );
      const switchElement = screen.getByRole('switch');

      await user.click(switchElement);
      expect(handleChange).not.toHaveBeenCalled();
      expect(switchElement).toHaveAttribute('data-state', 'unchecked');
    });
  });

  describe('Controlled Mode', () => {
    it('works as a controlled component', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { rerender } = render(
        <MotadataSwitch
          checked={false}
          onCheckedChange={handleChange}
          aria-label="Toggle setting"
        />
      );
      const switchElement = screen.getByRole('switch');

      expect(switchElement).toHaveAttribute('data-state', 'unchecked');

      await user.click(switchElement);
      expect(handleChange).toHaveBeenCalledWith(true);

      // Simulate parent component updating the state
      rerender(
        <MotadataSwitch checked={true} onCheckedChange={handleChange} aria-label="Toggle setting" />
      );
      expect(switchElement).toHaveAttribute('data-state', 'checked');
    });

    it('respects controlled checked state', () => {
      const { rerender } = render(<MotadataSwitch checked={false} aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('data-state', 'unchecked');

      rerender(<MotadataSwitch checked={true} aria-label="Toggle setting" />);
      expect(switchElement).toHaveAttribute('data-state', 'checked');
    });
  });

  describe('Disabled State', () => {
    it('renders as disabled', () => {
      render(<MotadataSwitch disabled aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeDisabled();
      expect(switchElement).toHaveAttribute('data-disabled');
    });

    it('applies disabled styling classes', () => {
      render(<MotadataSwitch disabled aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');
      // Check that disabled pseudo-class variants are in the className
      expect(switchElement).toHaveClass('disabled:mdt-cursor-not-allowed');
      expect(switchElement).toHaveClass('disabled:mdt-opacity-50');
    });

    it('cannot be toggled when disabled', async () => {
      const user = userEvent.setup();
      render(<MotadataSwitch disabled aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');

      await user.click(switchElement);
      expect(switchElement).toHaveAttribute('data-state', 'unchecked');
    });
  });

  describe('Form Integration', () => {
    it('accepts a name prop', () => {
      render(<MotadataSwitch name="notifications" aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');
      // Verify the switch component renders without errors with name prop
      expect(switchElement).toBeInTheDocument();
    });

    it('accepts a value prop', () => {
      render(<MotadataSwitch value="on" aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');
      // Verify the switch component renders without errors with value prop
      expect(switchElement).toBeInTheDocument();
    });

    it('accepts a required prop', () => {
      render(<MotadataSwitch required aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');
      // Verify the switch component renders without errors with required prop
      // Radix UI handles required state internally
      expect(switchElement).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA role', () => {
      render(<MotadataSwitch aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('has proper ARIA checked state', () => {
      const { rerender } = render(<MotadataSwitch checked={false} aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');

      rerender(<MotadataSwitch checked={true} aria-label="Toggle setting" />);
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });

    it('supports aria-label', () => {
      render(<MotadataSwitch aria-label="Enable notifications" />);
      const switchElement = screen.getByLabelText('Enable notifications');
      expect(switchElement).toBeInTheDocument();
    });

    it('supports aria-labelledby', () => {
      render(
        <div>
          <span id="switch-label">Airplane mode</span>
          <MotadataSwitch aria-labelledby="switch-label" />
        </div>
      );
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-labelledby', 'switch-label');
    });

    it('is keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<MotadataSwitch aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');

      await user.tab();
      expect(switchElement).toHaveFocus();

      await user.keyboard(' ');
      expect(switchElement).toHaveAttribute('data-state', 'checked');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<MotadataSwitch ref={ref} aria-label="Toggle setting" />);
      expect(ref).toHaveBeenCalled();
    });
  });

  describe('Data Attributes', () => {
    it('has correct data-state attribute when unchecked', () => {
      render(<MotadataSwitch aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('data-state', 'unchecked');
    });

    it('has correct data-state attribute when checked', () => {
      render(<MotadataSwitch checked aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('data-state', 'checked');
    });

    it('has data-disabled attribute when disabled', () => {
      render(<MotadataSwitch disabled aria-label="Toggle setting" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('data-disabled');
    });
  });
});
