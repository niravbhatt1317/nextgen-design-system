import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Icon } from '../Icon';
import { TableBulkAction, TableBulkBar, TableBulkSeparator } from './TableBulkBar';

describe('TableBulkBar', () => {
  it('renders nothing when nothing is selected', () => {
    const { container } = render(<TableBulkBar count={0} />);
    // An empty bar would reserve space for a question nobody has asked.
    expect(container).toBeEmptyDOMElement();
  });

  it('counts the selection', () => {
    render(<TableBulkBar count={3} />);
    expect(screen.getByText('3 selected')).toBeInTheDocument();
  });

  it('announces the count, since a bar that appears silently is invisible', () => {
    render(<TableBulkBar count={3} />);
    expect(screen.getByText('3 selected')).toHaveAttribute('aria-live', 'polite');
  });

  it('takes a label of its own when rows are not rows', () => {
    render(<TableBulkBar count={3} label="3 tickets" />);
    expect(screen.getByText('3 tickets')).toBeInTheDocument();
  });

  it('announces itself as one group', () => {
    render(<TableBulkBar count={1} />);
    expect(screen.getByRole('toolbar', { name: 'Selected rows' })).toBeInTheDocument();
  });

  it('renders its actions', () => {
    render(
      <TableBulkBar count={2}>
        <TableBulkAction icon={<Icon name="user" size="sm" aria-hidden />}>Assign</TableBulkAction>
        <TableBulkSeparator />
      </TableBulkBar>
    );
    expect(screen.getByRole('button', { name: 'Assign' })).toBeInTheDocument();
  });

  it('clears from the mark, which is where people reach first', async () => {
    const onClear = vi.fn();
    render(<TableBulkBar count={2} onClear={onClear} />);
    await userEvent.click(screen.getByRole('button', { name: 'Clear selection' }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('disables the mark when there is nothing to clear with', () => {
    render(<TableBulkBar count={2} />);
    expect(screen.getByRole('button', { name: 'Clear selection' })).toBeDisabled();
  });

  it('renders an action with no label, for an overflow control', () => {
    render(
      <TableBulkBar count={2}>
        <TableBulkAction
          aria-label="More actions"
          icon={<Icon name="more-vertical" size="sm" aria-hidden />}
        />
      </TableBulkBar>
    );
    expect(screen.getByRole('button', { name: 'More actions' })).toBeInTheDocument();
  });

  it('accepts extra classes', () => {
    render(<TableBulkBar count={1} className="custom" data-testid="bar" />);
    expect(screen.getByTestId('bar')).toHaveClass('custom');
  });
});
