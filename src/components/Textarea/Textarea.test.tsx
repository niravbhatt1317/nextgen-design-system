import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  describe('Rendering', () => {
    it('renders textarea element', () => {
      render(<Textarea placeholder="Enter text" aria-label="Test textarea" />);
      expect(screen.getByLabelText('Test textarea')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Textarea label="Message" />);
      expect(screen.getByText('Message')).toBeInTheDocument();
      expect(screen.getByLabelText('Message')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<Textarea placeholder="Enter your message" label="Message" />);
      expect(screen.getByPlaceholderText('Enter your message')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Textarea helperText="Maximum 200 characters" label="Bio" />);
      expect(screen.getByText('Maximum 200 characters')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(<Textarea error="This field is required" label="Message" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('does not show helper text when error is present', () => {
      render(<Textarea error="Error message" helperText="Helper text" label="Field" />);
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Textarea className="custom-class" label="Field" />);
      const textarea = screen.getByLabelText('Field');
      expect(textarea).toHaveClass('custom-class');
    });

    it('renders with custom wrapperClassName', () => {
      render(<Textarea wrapperClassName="custom-wrapper" label="Field" />);
      const wrapper = screen.getByLabelText('Field').parentElement;
      expect(wrapper).toHaveClass('custom-wrapper');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Textarea size="sm" label="Small" />);
      const textarea = screen.getByLabelText('Small');
      expect(textarea).toHaveClass('mdt-min-h-[80px]');
      expect(textarea).toHaveClass('mdt-text-xs');
    });

    it('renders medium size (default)', () => {
      render(<Textarea size="md" label="Medium" />);
      const textarea = screen.getByLabelText('Medium');
      expect(textarea).toHaveClass('mdt-min-h-[100px]');
      expect(textarea).toHaveClass('mdt-text-sm');
    });

    it('renders large size', () => {
      render(<Textarea size="lg" label="Large" />);
      const textarea = screen.getByLabelText('Large');
      expect(textarea).toHaveClass('mdt-min-h-[120px]');
      expect(textarea).toHaveClass('mdt-text-base');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Textarea variant="default" label="Default" />);
      const textarea = screen.getByLabelText('Default');
      expect(textarea).not.toHaveClass('mdt-bg-muted');
    });

    it('renders filled variant', () => {
      render(<Textarea variant="filled" label="Filled" />);
      const textarea = screen.getByLabelText('Filled');
      expect(textarea).toHaveClass('mdt-bg-muted');
    });
  });

  describe('Resize options', () => {
    it('renders with no resize', () => {
      render(<Textarea resize="none" label="No resize" />);
      const textarea = screen.getByLabelText('No resize');
      expect(textarea).toHaveClass('mdt-resize-none');
    });

    it('renders with vertical resize (default)', () => {
      render(<Textarea resize="vertical" label="Vertical" />);
      const textarea = screen.getByLabelText('Vertical');
      expect(textarea).toHaveClass('mdt-resize-y');
    });

    it('renders with both resize', () => {
      render(<Textarea resize="both" label="Both" />);
      const textarea = screen.getByLabelText('Both');
      expect(textarea).toHaveClass('mdt-resize');
    });
  });

  describe('Error state', () => {
    it('has error styling when error prop is provided', () => {
      render(<Textarea error="Error message" label="Field" />);
      const textarea = screen.getByLabelText('Field');
      expect(textarea).toHaveClass('mdt-border-destructive');
    });

    it('has aria-invalid when error is present', () => {
      render(<Textarea error="Error message" label="Field" />);
      const textarea = screen.getByLabelText('Field');
      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });

    it('has aria-describedby pointing to error', () => {
      render(<Textarea error="Error message" label="Field" id="test-field" />);
      const textarea = screen.getByLabelText('Field');
      expect(textarea).toHaveAttribute('aria-describedby', 'test-field-error');
    });

    it('does not have aria-invalid when no error', () => {
      render(<Textarea label="Field" />);
      const textarea = screen.getByLabelText('Field');
      expect(textarea).toHaveAttribute('aria-invalid', 'false');
    });
  });

  describe('Helper text accessibility', () => {
    it('has aria-describedby pointing to helper text when no error', () => {
      render(<Textarea helperText="Helper text" label="Field" id="test-field" />);
      const textarea = screen.getByLabelText('Field');
      expect(textarea).toHaveAttribute('aria-describedby', 'test-field-helper');
    });

    it('does not have aria-describedby when no helper text or error', () => {
      render(<Textarea label="Field" />);
      const textarea = screen.getByLabelText('Field');
      expect(textarea).not.toHaveAttribute('aria-describedby');
    });
  });

  describe('Interactions', () => {
    it('accepts user input', async () => {
      const user = userEvent.setup();
      render(<Textarea label="Message" />);
      const textarea = screen.getByLabelText('Message');

      await user.type(textarea, 'Hello World');

      expect(textarea).toHaveValue('Hello World');
    });

    it('calls onChange handler', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Textarea onChange={handleChange} label="Message" />);
      const textarea = screen.getByLabelText('Message');

      await user.type(textarea, 'A');

      expect(handleChange).toHaveBeenCalled();
    });

    it('respects disabled state', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Textarea disabled onChange={handleChange} label="Disabled" />);
      const textarea = screen.getByLabelText('Disabled');

      await user.type(textarea, 'test');

      expect(textarea).toBeDisabled();
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('respects maxLength attribute', async () => {
      const user = userEvent.setup();
      render(<Textarea maxLength={10} label="Limited" />);
      const textarea = screen.getByLabelText('Limited') as HTMLTextAreaElement;

      await user.type(textarea, '12345678901234567890');

      expect(textarea.value.length).toBeLessThanOrEqual(10);
    });
  });

  describe('ID generation', () => {
    it('uses provided id', () => {
      render(<Textarea id="custom-id" label="Field" />);
      const textarea = screen.getByLabelText('Field');
      expect(textarea).toHaveAttribute('id', 'custom-id');
    });

    it('generates unique id when not provided', () => {
      const { container } = render(
        <>
          <Textarea label="Field 1" />
          <Textarea label="Field 2" />
        </>
      );
      const textareas = container.querySelectorAll('textarea');
      expect(textareas[0].id).toBeTruthy();
      expect(textareas[1].id).toBeTruthy();
      expect(textareas[0].id).not.toBe(textareas[1].id);
    });

    it('associates label with textarea via htmlFor', () => {
      render(<Textarea label="Field" id="test-id" />);
      const label = screen.getByText('Field');
      expect(label).toHaveAttribute('for', 'test-id');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null as HTMLTextAreaElement | null };
      render(<Textarea ref={ref} label="Field" />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });

    it('can focus via ref', () => {
      const ref = { current: null as HTMLTextAreaElement | null };
      render(<Textarea ref={ref} label="Field" />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe('Custom Props', () => {
    it('accepts rows attribute', () => {
      render(<Textarea rows={10} label="Field" />);
      const textarea = screen.getByLabelText('Field');
      expect(textarea).toHaveAttribute('rows', '10');
    });

    it('accepts name attribute', () => {
      render(<Textarea name="message" label="Message" />);
      const textarea = screen.getByLabelText('Message');
      expect(textarea).toHaveAttribute('name', 'message');
    });

    it('accepts required attribute', () => {
      render(<Textarea required label="Required field" />);
      const textarea = screen.getByLabelText('Required field');
      expect(textarea).toBeRequired();
    });

    it('accepts custom data attributes', () => {
      render(<Textarea data-testid="custom-textarea" label="Field" />);
      expect(screen.getByTestId('custom-textarea')).toBeInTheDocument();
    });
  });

  describe('Disabled state styling', () => {
    it('has disabled opacity', () => {
      render(<Textarea disabled label="Disabled" />);
      const textarea = screen.getByLabelText('Disabled');
      expect(textarea).toHaveClass('disabled:mdt-opacity-50');
    });

    it('has disabled cursor', () => {
      render(<Textarea disabled label="Disabled" />);
      const textarea = screen.getByLabelText('Disabled');
      expect(textarea).toHaveClass('disabled:mdt-cursor-not-allowed');
    });
  });
});
