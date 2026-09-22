import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { TextareaOld2 } from './TextareaOld2';

// Smoke test for the snapshot: it renders and its main props still work.
describe('TextareaOld2', () => {
  it('renders a multi-line field', () => {
    render(<TextareaOld2 placeholder="Write here" />);
    expect(screen.getByPlaceholderText('Write here')).toBeInTheDocument();
  });

  it('links a label to the field', () => {
    render(<TextareaOld2 label="Message" />);
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('shows an error line and marks the field invalid', () => {
    render(<TextareaOld2 label="Message" error="A message is required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('A message is required');
    expect(screen.getByLabelText('Message')).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows helper text when there is no error', () => {
    render(<TextareaOld2 label="Bio" helperText="Public" />);
    expect(screen.getByText('Public')).toBeInTheDocument();
  });

  it.each([
    ['sm', 'mdt-min-h-[80px]'],
    ['md', 'mdt-min-h-[100px]'],
    ['lg', 'mdt-min-h-[120px]'],
  ] as const)('applies the %s size', (size, expected) => {
    render(<TextareaOld2 size={size} aria-label="Sized" />);
    expect(screen.getByLabelText('Sized')).toHaveClass(expected);
  });

  it('applies the filled variant and the resize rule', () => {
    render(<TextareaOld2 aria-label="Styled" variant="filled" resize="none" />);
    expect(screen.getByLabelText('Styled')).toHaveClass('mdt-bg-muted', 'mdt-resize-none');
  });

  it('takes typing and forwards a ref', async () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<TextareaOld2 ref={ref} aria-label="Typed" />);
    await userEvent.type(screen.getByLabelText('Typed'), 'hello');
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    expect(ref.current?.value).toBe('hello');
  });

  it('can be disabled', () => {
    render(<TextareaOld2 aria-label="Off" disabled />);
    expect(screen.getByLabelText('Off')).toBeDisabled();
  });
});
