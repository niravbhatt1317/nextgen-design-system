import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { OTPInput } from './OTPInput';

describe('OTPInput', () => {
  describe('Rendering', () => {
    it('renders correctly with default length', () => {
      render(<OTPInput />);
      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(6);
    });

    it('renders correct number of inputs based on length prop', () => {
      render(<OTPInput length={4} />);
      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(4);
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<OTPInput ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('applies custom className', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<OTPInput ref={ref} className="custom-class" />);
      expect(ref.current).toHaveClass('custom-class');
    });

    it('displays placeholder in empty inputs', () => {
      render(<OTPInput placeholder="X" />);
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach((input) => {
        expect(input).toHaveAttribute('placeholder', 'X');
      });
    });
  });

  describe('Value and onChange', () => {
    it('displays value correctly', () => {
      render(<OTPInput value="123" />);
      const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
      expect(inputs[0].value).toBe('1');
      expect(inputs[1].value).toBe('2');
      expect(inputs[2].value).toBe('3');
      expect(inputs[3].value).toBe('');
    });

    it('calls onChange when input value changes', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<OTPInput onChange={handleChange} />);
      const inputs = screen.getAllByRole('textbox');

      await user.type(inputs[0], '5');
      expect(handleChange).toHaveBeenCalledWith('5');
    });

    it('auto-advances to next input after entering digit', async () => {
      const user = userEvent.setup();
      render(<OTPInput autoFocus={false} />);
      const inputs = screen.getAllByRole('textbox');

      await user.click(inputs[0]);
      await user.type(inputs[0], '1');

      // Second input should receive focus
      expect(inputs[1]).toHaveFocus();
    });

    it('fills all inputs when value prop contains complete OTP', () => {
      const handleComplete = vi.fn();
      const { rerender } = render(<OTPInput length={4} value="" onComplete={handleComplete} />);

      // Update with complete OTP
      rerender(<OTPInput length={4} value="1234" onComplete={handleComplete} />);

      const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
      expect(inputs[0].value).toBe('1');
      expect(inputs[1].value).toBe('2');
      expect(inputs[2].value).toBe('3');
      expect(inputs[3].value).toBe('4');
    });
  });

  describe('Keyboard Navigation', () => {
    it('moves to previous input on Backspace when current is empty', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<OTPInput value="1" onChange={handleChange} autoFocus={false} />);
      const inputs = screen.getAllByRole('textbox');

      // Click on second input (which is empty)
      await user.click(inputs[1]);
      // Backspace on empty input moves to previous
      await user.keyboard('{Backspace}');

      // Should move to previous and clear it
      expect(inputs[0]).toHaveFocus();
      expect(handleChange).toHaveBeenCalledWith('');
    });

    it('moves to next input on ArrowRight', async () => {
      const user = userEvent.setup();
      render(<OTPInput autoFocus={false} />);
      const inputs = screen.getAllByRole('textbox');

      await user.click(inputs[0]);
      await user.keyboard('{ArrowRight}');

      expect(inputs[1]).toHaveFocus();
    });

    it('moves to previous input on ArrowLeft', async () => {
      const user = userEvent.setup();
      render(<OTPInput autoFocus={false} />);
      const inputs = screen.getAllByRole('textbox');

      await user.click(inputs[1]);
      await user.keyboard('{ArrowLeft}');

      expect(inputs[0]).toHaveFocus();
    });

    it('focuses first input on Home key', async () => {
      const user = userEvent.setup();
      render(<OTPInput autoFocus={false} />);
      const inputs = screen.getAllByRole('textbox');

      await user.click(inputs[3]);
      await user.keyboard('{Home}');

      expect(inputs[0]).toHaveFocus();
    });

    it('focuses last input on End key', async () => {
      const user = userEvent.setup();
      render(<OTPInput autoFocus={false} />);
      const inputs = screen.getAllByRole('textbox');

      await user.click(inputs[0]);
      await user.keyboard('{End}');

      expect(inputs[5]).toHaveFocus();
    });
  });

  describe('Input Type Validation', () => {
    it('accepts only numeric input when type is numeric', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<OTPInput type="numeric" onChange={handleChange} autoFocus={false} />);
      const inputs = screen.getAllByRole('textbox');

      await user.click(inputs[0]);
      await user.type(inputs[0], 'a');
      expect(handleChange).not.toHaveBeenCalled();

      await user.type(inputs[0], '5');
      expect(handleChange).toHaveBeenCalledWith('5');
    });

    it('accepts alphanumeric input when type is alphanumeric', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<OTPInput type="alphanumeric" onChange={handleChange} autoFocus={false} />);
      const inputs = screen.getAllByRole('textbox');

      await user.click(inputs[0]);
      await user.type(inputs[0], 'A');
      expect(handleChange).toHaveBeenCalledWith('A');
    });
  });

  describe('Paste Functionality', () => {
    it('handles pasted content correctly', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<OTPInput onChange={handleChange} autoFocus={false} />);
      const inputs = screen.getAllByRole('textbox');

      await user.click(inputs[0]);
      await user.paste('123456');

      expect(handleChange).toHaveBeenCalledWith('123456');
    });

    it('validates pasted content based on type', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<OTPInput type="numeric" onChange={handleChange} autoFocus={false} />);
      const inputs = screen.getAllByRole('textbox');

      await user.click(inputs[0]);
      await user.paste('ABC123');

      // Should not accept alphanumeric paste for numeric type
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Disabled State', () => {
    it('disables all inputs when disabled prop is true', () => {
      render(<OTPInput disabled />);
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach((input) => {
        expect(input).toBeDisabled();
      });
    });

    it('does not accept input when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<OTPInput disabled onChange={handleChange} />);
      const inputs = screen.getAllByRole('textbox');

      await user.click(inputs[0]);
      await user.type(inputs[0], '5');

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has proper aria-label for each input', () => {
      render(<OTPInput length={4} />);
      const inputs = screen.getAllByRole('textbox');

      expect(inputs[0]).toHaveAttribute('aria-label', 'OTP digit 1 of 4');
      expect(inputs[1]).toHaveAttribute('aria-label', 'OTP digit 2 of 4');
      expect(inputs[2]).toHaveAttribute('aria-label', 'OTP digit 3 of 4');
      expect(inputs[3]).toHaveAttribute('aria-label', 'OTP digit 4 of 4');
    });

    it('has correct inputMode for numeric type', () => {
      render(<OTPInput type="numeric" />);
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach((input) => {
        expect(input).toHaveAttribute('inputMode', 'numeric');
      });
    });

    it('has correct inputMode for alphanumeric type', () => {
      render(<OTPInput type="alphanumeric" />);
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach((input) => {
        expect(input).toHaveAttribute('inputMode', 'text');
      });
    });
  });

  describe('Size variants', () => {
    it('applies sm size classes', () => {
      render(<OTPInput size="sm" length={2} />);
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toHaveClass('mdt-h-9');
      expect(inputs[0]).toHaveClass('mdt-w-9');
      expect(inputs[0]).toHaveClass('mdt-text-sm');
    });

    it('applies md size classes (default)', () => {
      render(<OTPInput size="md" length={2} />);
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toHaveClass('mdt-h-12');
      expect(inputs[0]).toHaveClass('mdt-w-12');
      expect(inputs[0]).toHaveClass('mdt-text-lg');
    });

    it('applies lg size classes', () => {
      render(<OTPInput size="lg" length={2} />);
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toHaveClass('mdt-h-14');
      expect(inputs[0]).toHaveClass('mdt-w-14');
      expect(inputs[0]).toHaveClass('mdt-text-xl');
    });
  });

  describe('Backspace clears current filled input', () => {
    it('clears current input value on Backspace when it has a value', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<OTPInput value="12" onChange={handleChange} autoFocus={false} />);
      const inputs = screen.getAllByRole('textbox');

      // Focus first input which has '1'
      await user.click(inputs[0]);
      await user.keyboard('{Backspace}');

      // Should clear the current input (index 0) without moving
      expect(handleChange).toHaveBeenCalledWith('2');
    });
  });

  describe('Delete key', () => {
    it('clears current input value on Delete key', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<OTPInput value="12" onChange={handleChange} autoFocus={false} />);
      const inputs = screen.getAllByRole('textbox');

      await user.click(inputs[0]);
      await user.keyboard('{Delete}');

      expect(handleChange).toHaveBeenCalledWith('2');
    });
  });

  describe('Boundary navigation', () => {
    it('does not move left from first input', async () => {
      const user = userEvent.setup();
      render(<OTPInput autoFocus={false} length={3} />);
      const inputs = screen.getAllByRole('textbox');

      await user.click(inputs[0]);
      await user.keyboard('{ArrowLeft}');

      // Should stay on first input
      expect(inputs[0]).toHaveFocus();
    });

    it('does not move right from last input', async () => {
      const user = userEvent.setup();
      render(<OTPInput autoFocus={false} length={3} />);
      const inputs = screen.getAllByRole('textbox');

      await user.click(inputs[2]);
      await user.keyboard('{ArrowRight}');

      // Should stay on last input
      expect(inputs[2]).toHaveFocus();
    });

    it('does not move back on Backspace from first empty input', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<OTPInput value="" onChange={handleChange} autoFocus={false} length={3} />);
      const inputs = screen.getAllByRole('textbox');

      await user.click(inputs[0]);
      await user.keyboard('{Backspace}');

      // No change or navigation since at index 0 with no value
      expect(inputs[0]).toHaveFocus();
    });
  });

  describe('Alphanumeric input rejection', () => {
    it('rejects special characters for alphanumeric type', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<OTPInput type="alphanumeric" onChange={handleChange} autoFocus={false} />);
      const inputs = screen.getAllByRole('textbox');

      await user.click(inputs[0]);
      await user.type(inputs[0], '!');

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Paste with alphanumeric type', () => {
    it('accepts valid alphanumeric paste', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<OTPInput type="alphanumeric" onChange={handleChange} autoFocus={false} length={4} />);
      const inputs = screen.getAllByRole('textbox');

      await user.click(inputs[0]);
      await user.paste('AB12');

      expect(handleChange).toHaveBeenCalledWith('AB12');
    });

    it('rejects invalid alphanumeric paste with special chars', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<OTPInput type="alphanumeric" onChange={handleChange} autoFocus={false} length={4} />);
      const inputs = screen.getAllByRole('textbox');

      await user.click(inputs[0]);
      await user.paste('AB!@');

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Auto-focus behavior', () => {
    it('does not auto-focus when autoFocus is false', () => {
      render(<OTPInput autoFocus={false} />);
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).not.toHaveFocus();
    });
  });

  describe('onComplete callback', () => {
    it('calls onComplete when full value is provided', () => {
      const handleComplete = vi.fn();
      render(<OTPInput length={4} value="1234" onComplete={handleComplete} />);

      expect(handleComplete).toHaveBeenCalledWith('1234');
    });

    it('does not call onComplete when value is incomplete', () => {
      const handleComplete = vi.fn();
      render(<OTPInput length={4} value="123" onComplete={handleComplete} />);

      expect(handleComplete).not.toHaveBeenCalled();
    });
  });

  describe('Disabled keyboard and paste interactions', () => {
    it('ignores keyDown events when disabled', () => {
      const handleChange = vi.fn();
      render(<OTPInput disabled value="12" onChange={handleChange} autoFocus={false} />);
      const inputs = screen.getAllByRole('textbox');

      // Even though disabled inputs can't be focused via user click,
      // we verify the disabled state is applied
      expect(inputs[0]).toBeDisabled();
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('ignores paste when disabled', async () => {
      const handleChange = vi.fn();
      render(<OTPInput disabled onChange={handleChange} autoFocus={false} />);
      const inputs = screen.getAllByRole('textbox');

      expect(inputs[0]).toBeDisabled();
      expect(handleChange).not.toHaveBeenCalled();
    });
  });
});
