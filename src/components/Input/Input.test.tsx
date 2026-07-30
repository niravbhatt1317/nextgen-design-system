import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  describe('Rendering', () => {
    it('renders a basic input', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Input className="custom-class" />);
      expect(screen.getByRole('textbox')).toHaveClass('custom-class');
    });

    it('renders with label', () => {
      render(<Input label="Email" />);
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Input helperText="Enter a valid email" />);
      expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
    });

    it('renders with start adornment', () => {
      render(<Input startAdornment={<span data-testid="start-icon">@</span>} />);
      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    });

    it('renders with end adornment', () => {
      render(<Input endAdornment={<span data-testid="end-icon">x</span>} />);
      expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('applies md size by default', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toHaveClass('mdt-h-9');
    });

    it('applies sm size', () => {
      render(<Input size="sm" />);
      expect(screen.getByRole('textbox')).toHaveClass('mdt-h-8');
    });

    it('applies lg size', () => {
      render(<Input size="lg" />);
      expect(screen.getByRole('textbox')).toHaveClass('mdt-h-10');
    });
  });

  describe('Error State', () => {
    it('shows error message', () => {
      render(<Input error="This field is required" />);
      expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
    });

    it('applies error styling', () => {
      render(<Input error="Error" />);
      expect(screen.getByRole('textbox')).toHaveClass('mdt-border-destructive');
    });

    it('sets aria-invalid when error is present', () => {
      render(<Input error="Error" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('hides helper text when error is shown', () => {
      render(<Input error="Error" helperText="Helper text" />);
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('can be disabled', () => {
      render(<Input disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('can be read-only', () => {
      render(<Input readOnly />);
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    });

    it('can be required', () => {
      render(<Input required />);
      expect(screen.getByRole('textbox')).toBeRequired();
    });
  });

  describe('Interactions', () => {
    it('allows typing', async () => {
      const user = userEvent.setup();
      render(<Input />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'Hello World');
      expect(input).toHaveValue('Hello World');
    });

    it('calls onChange when typing', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);

      await user.type(screen.getByRole('textbox'), 'a');
      expect(handleChange).toHaveBeenCalled();
    });

    it('can be focused', async () => {
      const user = userEvent.setup();
      render(<Input />);

      await user.tab();
      expect(screen.getByRole('textbox')).toHaveFocus();
    });

    it('does not allow typing when disabled', async () => {
      const user = userEvent.setup();
      render(<Input disabled defaultValue="initial" />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'more text');
      expect(input).toHaveValue('initial');
    });
  });

  describe('Accessibility', () => {
    it('connects label to input via htmlFor', () => {
      render(<Input label="Username" id="username-input" />);
      const input = screen.getByLabelText('Username');
      expect(input).toHaveAttribute('id', 'username-input');
    });

    it('generates unique id when not provided', () => {
      render(<Input label="Username" />);
      const input = screen.getByLabelText('Username');
      expect(input).toHaveAttribute('id');
    });

    it('connects error message via aria-describedby', () => {
      render(<Input error="Error message" id="test-input" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
    });

    it('connects helper text via aria-describedby', () => {
      render(<Input helperText="Helper text" id="test-input" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'test-input-helper');
    });
  });

  describe('Input Types', () => {
    it('supports email type', () => {
      render(<Input type="email" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    });

    it('supports password type', () => {
      render(<Input type="password" />);
      // Password inputs don't have textbox role
      expect(document.querySelector('input[type="password"]')).toBeInTheDocument();
    });

    it('supports number type', () => {
      render(<Input type="number" />);
      expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number');
    });
  });
});
