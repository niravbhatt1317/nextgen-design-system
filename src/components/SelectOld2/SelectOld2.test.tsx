import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { SelectOld2 } from './SelectOld2';
import type { SelectOld2Option } from './SelectOld2.types';

const OPTIONS: SelectOld2Option[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

// Smoke test for the snapshot: it renders and its main props still work.
describe('SelectOld2', () => {
  it('renders the placeholder', () => {
    render(<SelectOld2 options={OPTIONS} placeholder="Pick one" />);
    expect(screen.getByText('Pick one')).toBeInTheDocument();
  });

  it('renders a label, helper text and an error line', () => {
    render(<SelectOld2 options={OPTIONS} label="Country" helperText="Where you live" />);
    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByText('Where you live')).toBeInTheDocument();
  });

  it('renders an error line in the destructive colour', () => {
    render(<SelectOld2 options={OPTIONS} error="Pick something" />);
    expect(screen.getByText('Pick something')).toHaveClass('mdt-text-destructive');
  });

  it('opens on click and reports the picked option', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SelectOld2 options={OPTIONS} onChange={onChange} placeholder="Pick one" />);
    await user.click(screen.getByRole('combobox'));
    await waitFor(() => {
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });
    await user.click(screen.getByText('Option 2'));
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('2');
    });
  });

  it('renders the multiple mode with pills for the chosen values', () => {
    render(<SelectOld2 mode="multiple" options={OPTIONS} value={['1', '3']} showPills />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<SelectOld2 options={OPTIONS} disabled placeholder="Off" />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });
});
