import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NumberInput } from './NumberInput';

const up = () => screen.getByRole('button', { name: 'Increase' });
const down = () => screen.getByRole('button', { name: 'Decrease' });
const field = () => screen.getByRole('spinbutton');

describe('NumberInput', () => {
  describe('what it shows', () => {
    it('is a number field with its own stepper, and hides the native one', () => {
      render(<NumberInput aria-label="Retries" />);
      expect(field()).toHaveAttribute('type', 'number');
      expect(field().className).toContain('[appearance:textfield]');
      expect(up()).toBeInTheDocument();
      expect(down()).toBeInTheDocument();
    });

    it('labels the field, and the label points at it', () => {
      render(<NumberInput label="Retries" />);
      expect(screen.getByLabelText('Retries')).toBe(field());
    });

    it('takes a caller id over its own', () => {
      render(<NumberInput id="retries" label="Retries" />);
      expect(field()).toHaveAttribute('id', 'retries');
    });

    it('shows helper text, and names it as the description', () => {
      render(<NumberInput aria-label="Retries" helperText="Between 1 and 5" />);
      expect(screen.getByText('Between 1 and 5')).toBeInTheDocument();
      expect(field()).toHaveAccessibleDescription('Between 1 and 5');
    });

    it('shows the error instead, and marks the field invalid', () => {
      render(<NumberInput aria-label="Retries" helperText="ignored" error="Too many" />);
      expect(screen.getByText('Too many')).toBeInTheDocument();
      expect(screen.queryByText('ignored')).not.toBeInTheDocument();
      expect(field()).toHaveAttribute('aria-invalid', 'true');
      expect(field()).toHaveAccessibleDescription('Too many');
    });

    it('describes nothing when there is neither', () => {
      render(<NumberInput aria-label="Retries" />);
      expect(field()).not.toHaveAttribute('aria-describedby');
    });
  });

  describe('the stepper', () => {
    it('adds a step, and reports the next value as a string', async () => {
      const onChange = vi.fn();
      render(<NumberInput aria-label="Retries" value="3" onChange={onChange} />);
      await userEvent.click(up());
      expect(onChange).toHaveBeenCalledWith('4');
    });

    it('takes a step away', async () => {
      const onChange = vi.fn();
      render(<NumberInput aria-label="Retries" value="3" onChange={onChange} />);
      await userEvent.click(down());
      expect(onChange).toHaveBeenCalledWith('2');
    });

    it('uses the step it is given, not 1', async () => {
      const onChange = vi.fn();
      render(<NumberInput aria-label="Port" value="100" step={10} onChange={onChange} />);
      await userEvent.click(up());
      expect(onChange).toHaveBeenCalledWith('110');
    });

    it('counts an empty field as zero rather than NaN', async () => {
      const onChange = vi.fn();
      render(<NumberInput aria-label="Retries" onChange={onChange} />);
      await userEvent.click(up());
      expect(onChange).toHaveBeenCalledWith('1');
    });

    it('stops at min going down, and at max going up', async () => {
      const onChange = vi.fn();
      const { rerender } = render(
        <NumberInput aria-label="Retries" value="1" min={1} max={5} onChange={onChange} />
      );
      await userEvent.click(down());
      expect(onChange).toHaveBeenLastCalledWith('1');
      rerender(<NumberInput aria-label="Retries" value="5" min={1} max={5} onChange={onChange} />);
      await userEvent.click(up());
      expect(onChange).toHaveBeenLastCalledWith('5');
    });

    it('reports what was typed, untouched — a half-typed number is not fought', async () => {
      const onChange = vi.fn();
      render(<NumberInput aria-label="Retries" value="" onChange={onChange} />);
      await userEvent.type(field(), '7');
      expect(onChange).toHaveBeenCalledWith('7');
    });
  });

  describe('when it cannot be used', () => {
    it('disabled: the field and both buttons are off', () => {
      render(<NumberInput aria-label="Retries" value="3" disabled />);
      expect(field()).toBeDisabled();
      expect(up()).toBeDisabled();
      expect(down()).toBeDisabled();
    });

    it('held: the lock takes the stepper’s place', () => {
      render(<NumberInput aria-label="Retries" value="3" locked />);
      expect(field()).toBeDisabled();
      expect(screen.queryByRole('button', { name: 'Increase' })).not.toBeInTheDocument();
      expect(field().className).toContain('mdt-pr-[34px]');
    });

    it('steps nothing while it is off', async () => {
      const onChange = vi.fn();
      render(<NumberInput aria-label="Retries" value="3" disabled onChange={onChange} />);
      await userEvent.click(up(), { pointerEventsCheck: 0 });
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('forwards a ref to the input itself', () => {
      const ref = createRef<HTMLInputElement>();
      render(<NumberInput ref={ref} aria-label="Retries" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('hands the input to a callback ref too', () => {
      const seen: (HTMLInputElement | null)[] = [];
      render(
        <NumberInput
          aria-label="Retries"
          ref={(el) => {
            seen.push(el);
          }}
        />
      );
      expect(seen[0]).toBeInstanceOf(HTMLInputElement);
    });

    it('names both stepper buttons, and hides their glyphs', () => {
      const { container } = render(<NumberInput aria-label="Retries" />);
      expect(up()).toHaveAttribute('type', 'button');
      expect(down()).toHaveAttribute('type', 'button');
      expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0);
    });
  });
});
