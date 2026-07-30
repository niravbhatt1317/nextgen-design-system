import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { SecretDots, BULLET_COUNT } from './SecretDots';

const BULLETS = 'secret-dots-bullets';

describe('SecretDots', () => {
  it('renders exactly eight bullets', () => {
    render(<SecretDots />);
    expect(screen.getByTestId(BULLETS)).toHaveTextContent('•'.repeat(BULLET_COUNT));
  });

  it('renders the same length whatever it is masking, so it leaks nothing', () => {
    const { rerender } = render(<SecretDots label="short" />);
    const first = screen.getByTestId(BULLETS).textContent;
    rerender(<SecretDots label="a very much longer secret indeed" />);
    expect(screen.getByTestId(BULLETS).textContent).toBe(first);
  });

  it('announces that something is hidden', () => {
    render(<SecretDots />);
    expect(screen.getByText('Hidden secret')).toBeInTheDocument();
  });

  it('takes a custom label', () => {
    render(<SecretDots label="Hidden API key" />);
    expect(screen.getByText('Hidden API key')).toBeInTheDocument();
  });

  it('hides the bullets themselves from screen readers', () => {
    render(<SecretDots />);
    expect(screen.getByTestId(BULLETS)).toHaveAttribute('aria-hidden', 'true');
  });

  it('is monospaced, so the bullets sit evenly', () => {
    const { container } = render(<SecretDots />);
    expect(container.firstChild).toHaveClass('mdt-font-mono');
  });

  it.each([
    ['sm', 'mdt-text-xs'],
    ['md', 'mdt-text-sm'],
  ] as const)('applies the %s size', (size, expected) => {
    const { container } = render(<SecretDots size={size} />);
    expect(container.firstChild).toHaveClass(expected);
  });

  it('merges a custom className', () => {
    const { container } = render(<SecretDots className="mdt-ml-2" />);
    expect(container.firstChild).toHaveClass('mdt-ml-2');
  });

  it('forwards a ref', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<SecretDots ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
