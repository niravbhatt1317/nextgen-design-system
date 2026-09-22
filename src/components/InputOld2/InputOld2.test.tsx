import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { InputOld2 } from './InputOld2';

// Smoke test for the snapshot: it renders and its main props still work.
describe('InputOld2', () => {
  it('renders a text box', () => {
    render(<InputOld2 placeholder="Type here" />);
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
  });

  it('links a label to the field', () => {
    render(<InputOld2 label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows an error line and marks the field invalid', () => {
    render(<InputOld2 label="Email" error="Enter a valid email" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email');
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows helper text when there is no error', () => {
    render(<InputOld2 label="Name" helperText="Shown on your profile" />);
    expect(screen.getByText('Shown on your profile')).toBeInTheDocument();
  });

  it.each([
    ['sm', 'mdt-h-8'],
    ['md', 'mdt-h-9'],
    ['lg', 'mdt-h-10'],
  ] as const)('applies the %s size', (size, expected) => {
    render(<InputOld2 size={size} aria-label="Sized" />);
    expect(screen.getByLabelText('Sized')).toHaveClass(expected);
  });

  it('renders start and end adornments and pads the field for them', () => {
    render(
      <InputOld2
        aria-label="Search"
        startAdornment={<span data-testid="start" />}
        endAdornment={<span data-testid="end" />}
      />
    );
    expect(screen.getByTestId('start')).toBeInTheDocument();
    expect(screen.getByTestId('end')).toBeInTheDocument();
    expect(screen.getByLabelText('Search')).toHaveClass('mdt-pl-10', 'mdt-pr-10');
  });

  it('takes typing and forwards a ref', async () => {
    const ref = createRef<HTMLInputElement>();
    render(<InputOld2 ref={ref} aria-label="Typed" />);
    await userEvent.type(screen.getByLabelText('Typed'), 'hello');
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.value).toBe('hello');
  });

  it('can be disabled', () => {
    render(<InputOld2 aria-label="Off" disabled />);
    expect(screen.getByLabelText('Off')).toBeDisabled();
  });
});
