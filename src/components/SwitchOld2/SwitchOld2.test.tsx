import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { vi } from 'vitest';
import { MotadataSwitchOld2 } from './SwitchOld2';

// Smoke test for the snapshot: it renders and its main props still work.
describe('MotadataSwitchOld2', () => {
  it('renders a switch, off by default', () => {
    render(<MotadataSwitchOld2 aria-label="Toggle" />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('starts on with defaultChecked', () => {
    render(<MotadataSwitchOld2 defaultChecked aria-label="Toggle" />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'checked');
  });

  it('flips on click and reports the change', async () => {
    const onCheckedChange = vi.fn();
    render(<MotadataSwitchOld2 aria-label="Toggle" onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it.each([
    ['sm', 'mdt-h-5'],
    ['md', 'mdt-h-6'],
    ['lg', 'mdt-h-7'],
  ] as const)('applies the %s size', (size, expected) => {
    render(<MotadataSwitchOld2 size={size} aria-label="Sized" />);
    expect(screen.getByRole('switch')).toHaveClass(expected);
  });

  it('can be disabled and forwards a ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<MotadataSwitchOld2 ref={ref} disabled aria-label="Off" />);
    expect(screen.getByRole('switch')).toBeDisabled();
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
