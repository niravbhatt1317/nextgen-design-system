import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Icon } from '../Icon';
import { TableBulkActionOld, TableBulkBarOld, TableBulkSeparatorOld } from './TableBulkBar';

describe('TableBulkBarOld', () => {
  it('renders nothing when nothing is selected', () => {
    const { container } = render(<TableBulkBarOld count={0} />);
    // An empty bar would reserve space for a question nobody has asked.
    expect(container).toBeEmptyDOMElement();
  });

  it('counts the selection', () => {
    render(<TableBulkBarOld count={3} />);
    expect(screen.getByText('3 selected')).toBeInTheDocument();
  });

  it('announces the count, since a bar that appears silently is invisible', () => {
    render(<TableBulkBarOld count={3} />);
    expect(screen.getByText('3 selected')).toHaveAttribute('aria-live', 'polite');
  });

  it('takes a label of its own when rows are not rows', () => {
    render(<TableBulkBarOld count={3} label="3 tickets" />);
    expect(screen.getByText('3 tickets')).toBeInTheDocument();
  });

  it('announces itself as one group', () => {
    render(<TableBulkBarOld count={1} />);
    expect(screen.getByRole('toolbar', { name: 'Selected rows' })).toBeInTheDocument();
  });

  it('renders its actions', () => {
    render(
      <TableBulkBarOld count={2}>
        <TableBulkActionOld icon={<Icon name="user" size="sm" aria-hidden />}>
          Assign
        </TableBulkActionOld>
        <TableBulkSeparatorOld />
      </TableBulkBarOld>
    );
    expect(screen.getByRole('button', { name: 'Assign' })).toBeInTheDocument();
  });

  it('clears from the mark, which is where people reach first', async () => {
    const onClear = vi.fn();
    render(<TableBulkBarOld count={2} onClear={onClear} />);
    await userEvent.click(screen.getByRole('button', { name: 'Clear selection' }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('disables the mark when there is nothing to clear with', () => {
    render(<TableBulkBarOld count={2} />);
    expect(screen.getByRole('button', { name: 'Clear selection' })).toBeDisabled();
  });

  it('renders an action with no label, for an overflow control', () => {
    render(
      <TableBulkBarOld count={2}>
        <TableBulkActionOld
          aria-label="More actions"
          icon={<Icon name="more-vertical" size="sm" aria-hidden />}
        />
      </TableBulkBarOld>
    );
    expect(screen.getByRole('button', { name: 'More actions' })).toBeInTheDocument();
  });

  it('accepts extra classes', () => {
    render(<TableBulkBarOld count={1} className="custom" data-testid="bar" />);
    expect(screen.getByTestId('bar')).toHaveClass('custom');
  });
});
