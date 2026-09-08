import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ContactChips, PersonCell, TableEmptyValue, TagList } from './TableCells';

/**
 * `userEvent.setup()` installs its own clipboard stub, so the spy has to replace
 * it afterwards rather than before - otherwise setup overwrites the spy and the
 * assertion silently watches an object nothing calls.
 */
function withClipboard() {
  const user = userEvent.setup();
  const writeText = vi.fn<(value: string) => Promise<void>>(() => Promise.resolve());
  Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
  return { user, writeText };
}

describe('PersonCell', () => {
  it('renders the name, and an avatar built from its first letter', () => {
    render(<PersonCell name="Ada Lovelace" />);
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('titles the name so a truncated one is still readable', () => {
    render(<PersonCell name="Ada Lovelace" />);
    expect(screen.getByText('Ada Lovelace')).toHaveAttribute('title', 'Ada Lovelace');
  });

  it('uses a supplied avatar instead of building one', () => {
    render(<PersonCell name="Ada Lovelace" avatar={<img alt="Ada's photo" src="/ada.png" />} />);
    expect(screen.getByAltText("Ada's photo")).toBeInTheDocument();
    expect(screen.queryByText('A')).not.toBeInTheDocument();
  });

  it('marks the tenant owner, labelled for screen readers', () => {
    render(<PersonCell name="Ada Lovelace" owner />);
    expect(screen.getByRole('img', { name: 'Tenant owner' })).toBeInTheDocument();
  });

  it('has no owner mark by default', () => {
    render(<PersonCell name="Ada Lovelace" />);
    expect(screen.queryByRole('img', { name: 'Tenant owner' })).not.toBeInTheDocument();
  });

  it('goes muted for an invited person', () => {
    render(<PersonCell name="Ada Lovelace" muted />);
    expect(screen.getByText('Ada Lovelace')).toHaveClass('mdt-text-muted-foreground');
  });

  it('is not muted by default', () => {
    render(<PersonCell name="Ada Lovelace" />);
    expect(screen.getByText('Ada Lovelace')).not.toHaveClass('mdt-text-muted-foreground');
  });

  it('accepts a className', () => {
    const { container } = render(<PersonCell name="Ada Lovelace" className="custom" />);
    expect(container.querySelector('.custom')).toBeInTheDocument();
  });
});

describe('ContactChips', () => {
  it('shows an em-dash when there is neither email nor phone', () => {
    render(<ContactChips />);
    expect(screen.getByLabelText('Not set')).toBeInTheDocument();
  });

  it('shows an em-dash when both are explicitly null', () => {
    render(<ContactChips email={null} phone={null} />);
    expect(screen.getByLabelText('Not set')).toBeInTheDocument();
  });

  it('shows only the email chip when there is no phone', () => {
    render(<ContactChips email="ada@example.com" />);
    expect(screen.getByRole('button', { name: /copy email/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /copy phone/i })).not.toBeInTheDocument();
  });

  it('shows only the phone chip when there is no email', () => {
    render(<ContactChips phone="+44 20 7946 0000" />);
    expect(screen.getByRole('button', { name: /copy phone/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /copy email/i })).not.toBeInTheDocument();
  });

  it('shows both chips when both are present', () => {
    render(<ContactChips email="ada@example.com" phone="+44 20 7946 0000" />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('copies the email and reports what it copied', async () => {
    const { user, writeText } = withClipboard();
    const onCopy = vi.fn();
    render(<ContactChips email="ada@example.com" onCopy={onCopy} />);

    await user.click(screen.getByRole('button', { name: /copy email/i }));

    expect(writeText).toHaveBeenCalledWith('ada@example.com');
    expect(onCopy).toHaveBeenCalledWith('ada@example.com', 'email');
  });

  it('copies the phone and reports what it copied', async () => {
    const { user, writeText } = withClipboard();
    const onCopy = vi.fn();
    render(<ContactChips phone="+44 20 7946 0000" onCopy={onCopy} />);

    await user.click(screen.getByRole('button', { name: /copy phone/i }));

    expect(writeText).toHaveBeenCalledWith('+44 20 7946 0000');
    expect(onCopy).toHaveBeenCalledWith('+44 20 7946 0000', 'phone');
  });

  it('copies without an onCopy handler', async () => {
    const { user, writeText } = withClipboard();
    render(<ContactChips email="ada@example.com" />);

    await user.click(screen.getByRole('button', { name: /copy email/i }));

    expect(writeText).toHaveBeenCalledWith('ada@example.com');
  });

  // The chips sit inside a row that opens a record on click. Without
  // stopPropagation, copying an address would also navigate away from it.
  it('does not let the click reach the row', async () => {
    const { user } = withClipboard();
    const onRowClick = vi.fn();
    render(
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div onClick={onRowClick}>
        <ContactChips email="ada@example.com" />
      </div>
    );

    await user.click(screen.getByRole('button', { name: /copy email/i }));

    expect(onRowClick).not.toHaveBeenCalled();
  });
});

describe('TagList', () => {
  it('shows an em-dash when there is nothing to list', () => {
    render(<TagList items={[]} />);
    expect(screen.getByLabelText('Not set')).toBeInTheDocument();
  });

  it('shows every item when there are no more than the maximum', () => {
    render(<TagList items={['Support', 'Billing']} />);
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Billing')).toBeInTheDocument();
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });

  it('collapses the rest into a +N that lists them', () => {
    render(<TagList items={['Support', 'Billing', 'Network', 'Security']} />);
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Billing')).toBeInTheDocument();
    expect(screen.queryByText('Network')).not.toBeInTheDocument();
    expect(
      screen.getByLabelText('2 more: Network, Security', { selector: '*' })
    ).toBeInTheDocument();
  });

  it('honours a custom maximum', () => {
    render(<TagList items={['Support', 'Billing', 'Network']} max={1} />);
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.queryByText('Billing')).not.toBeInTheDocument();
    expect(screen.getByLabelText('2 more: Billing, Network')).toBeInTheDocument();
  });

  it('shows every item when the maximum is larger than the list', () => {
    render(<TagList items={['Support']} max={5} />);
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });
});

describe('TableEmptyValue', () => {
  it('reads as "Not set" rather than as a stray dash', () => {
    render(<TableEmptyValue />);
    const dash = screen.getByLabelText('Not set');
    expect(dash).toBeInTheDocument();
    expect(dash).toHaveTextContent('—');
  });
});
