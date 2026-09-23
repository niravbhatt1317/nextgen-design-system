import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputOld2 } from './InputOld2';

describe('InputOld2', () => {
  describe('Rendering', () => {
    it('renders a basic input', () => {
      render(<InputOld2 placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<InputOld2 className="custom-class" />);
      expect(screen.getByRole('textbox')).toHaveClass('custom-class');
    });

    it('renders with label', () => {
      render(<InputOld2 label="Email" />);
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<InputOld2 helperText="Enter a valid email" />);
      expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
    });

    it('renders with start adornment', () => {
      render(<InputOld2 startAdornment={<span data-testid="start-icon">@</span>} />);
      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    });

    it('renders with end adornment', () => {
      render(<InputOld2 endAdornment={<span data-testid="end-icon">x</span>} />);
      expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('applies md size by default', () => {
      render(<InputOld2 />);
      expect(screen.getByRole('textbox')).toHaveClass('mdt-h-9');
    });

    it('applies sm size', () => {
      render(<InputOld2 size="sm" />);
      expect(screen.getByRole('textbox')).toHaveClass('mdt-h-8');
    });

    it('applies lg size', () => {
      render(<InputOld2 size="lg" />);
      expect(screen.getByRole('textbox')).toHaveClass('mdt-h-10');
    });
  });

  describe('Error State', () => {
    it('shows error message', () => {
      render(<InputOld2 error="This field is required" />);
      expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
    });

    it('applies error styling', () => {
      render(<InputOld2 error="Error" />);
      expect(screen.getByRole('textbox')).toHaveClass('mdt-border-destructive');
    });

    it('sets aria-invalid when error is present', () => {
      render(<InputOld2 error="Error" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('hides helper text when error is shown', () => {
      render(<InputOld2 error="Error" helperText="Helper text" />);
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('can be disabled', () => {
      render(<InputOld2 disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('can be read-only', () => {
      render(<InputOld2 readOnly />);
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    });

    it('can be required', () => {
      render(<InputOld2 required />);
      expect(screen.getByRole('textbox')).toBeRequired();
    });
  });

  describe('Interactions', () => {
    it('allows typing', async () => {
      const user = userEvent.setup();
      render(<InputOld2 />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'Hello World');
      expect(input).toHaveValue('Hello World');
    });

    it('calls onChange when typing', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<InputOld2 onChange={handleChange} />);

      await user.type(screen.getByRole('textbox'), 'a');
      expect(handleChange).toHaveBeenCalled();
    });

    it('can be focused', async () => {
      const user = userEvent.setup();
      render(<InputOld2 />);

      await user.tab();
      expect(screen.getByRole('textbox')).toHaveFocus();
    });

    it('does not allow typing when disabled', async () => {
      const user = userEvent.setup();
      render(<InputOld2 disabled defaultValue="initial" />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'more text');
      expect(input).toHaveValue('initial');
    });
  });

  describe('Accessibility', () => {
    it('connects label to input via htmlFor', () => {
      render(<InputOld2 label="Username" id="username-input" />);
      const input = screen.getByLabelText('Username');
      expect(input).toHaveAttribute('id', 'username-input');
    });

    it('generates unique id when not provided', () => {
      render(<InputOld2 label="Username" />);
      const input = screen.getByLabelText('Username');
      expect(input).toHaveAttribute('id');
    });

    it('connects error message via aria-describedby', () => {
      render(<InputOld2 error="Error message" id="test-input" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
    });

    it('connects helper text via aria-describedby', () => {
      render(<InputOld2 helperText="Helper text" id="test-input" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'test-input-helper');
    });
  });

  describe('InputOld2 Types', () => {
    it('supports email type', () => {
      render(<InputOld2 type="email" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    });

    it('supports password type', () => {
      render(<InputOld2 type="password" />);
      // Password inputs don't have textbox role
      expect(document.querySelector('input[type="password"]')).toBeInTheDocument();
    });

    it('supports number type', () => {
      render(<InputOld2 type="number" />);
      expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number');
    });
  });
});
