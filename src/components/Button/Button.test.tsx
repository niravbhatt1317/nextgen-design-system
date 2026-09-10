import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders a button with its label and fires onClick', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Invite users</Button>);
    const el = screen.getByRole('button', { name: 'Invite users' });
    await userEvent.click(el);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is 32 tall by default and 28 or 36 at the other two sizes', () => {
    const { rerender } = render(<Button>Go</Button>);
    expect(screen.getByRole('button')).toHaveClass('mdt-h-8');
    rerender(<Button size="sm">Go</Button>);
    expect(screen.getByRole('button')).toHaveClass('mdt-h-7');
    rerender(<Button size="lg">Go</Button>);
    expect(screen.getByRole('button')).toHaveClass('mdt-h-9');
  });

  describe('padding follows the edge, not the size', () => {
    it('takes 16 on both sides with words at both edges', () => {
      render(<Button>Invite users</Button>);
      const el = screen.getByRole('button');
      expect(el).toHaveClass('mdt-pl-4');
      expect(el).toHaveClass('mdt-pr-4');
    });

    it('drops the leading side to 12 when a glyph meets it', () => {
      render(<Button leftIcon={<svg data-testid="g" />}>Invite users</Button>);
      const el = screen.getByRole('button');
      expect(el).toHaveClass('mdt-pl-3');
      expect(el).toHaveClass('mdt-pr-4');
    });

    it('swaps the two figures when the glyph trails instead', () => {
      render(<Button rightIcon={<svg data-testid="g" />}>25 rows</Button>);
      const el = screen.getByRole('button');
      expect(el).toHaveClass('mdt-pl-4');
      expect(el).toHaveClass('mdt-pr-3');
    });

    it('takes 12 on both sides with a glyph at each edge', () => {
      render(
        <Button leftIcon={<svg />} rightIcon={<svg />}>
          Invite users
        </Button>
      );
      const el = screen.getByRole('button');
      expect(el).toHaveClass('mdt-pl-3');
      expect(el).toHaveClass('mdt-pr-3');
    });

    it('is a square with no padding when it is icon only', () => {
      render(<Button iconOnly ariaLabel="Row actions" leftIcon={<svg />} />);
      const el = screen.getByRole('button', { name: 'Row actions' });
      expect(el).toHaveClass('mdt-w-8');
      expect(el).toHaveClass('mdt-p-0');
      expect(el).not.toHaveClass('mdt-pl-4');
    });
  });

  describe('working', () => {
    it('stops responding and reports itself busy', async () => {
      const onClick = vi.fn();
      render(
        <Button loading onClick={onClick}>
          Send invite
        </Button>
      );
      const el = screen.getByRole('button');
      expect(el).toBeDisabled();
      expect(el).toHaveAttribute('aria-busy', 'true');
      await userEvent.click(el);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('swaps the label when loadingText is given', () => {
      render(
        <Button loading loadingText="Sending…">
          Send invite
        </Button>
      );
      expect(screen.getByRole('button')).toHaveTextContent('Sending…');
      expect(screen.queryByText('Send invite')).not.toBeInTheDocument();
    });

    it('keeps the label when loadingText is not given', () => {
      render(<Button loading>Send invite</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Send invite');
    });

    it('puts the spinner where a leading glyph would sit, not beside it', () => {
      render(
        <Button loading leftIcon={<svg data-testid="glyph" />}>
          Send invite
        </Button>
      );
      expect(screen.queryByTestId('glyph')).not.toBeInTheDocument();
      expect(document.querySelector('.mdt-btn-spin')).toBeInTheDocument();
    });

    it('spins inside an icon-only square too', () => {
      render(<Button iconOnly loading ariaLabel="Working" leftIcon={<svg />} />);
      expect(document.querySelector('.mdt-btn-spin')).toBeInTheDocument();
    });
  });

  it('is unavailable when disabled and does not fire', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Send invite
      </Button>
    );
    const el = screen.getByRole('button');
    expect(el).toBeDisabled();
    await userEvent.click(el);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('reports itself pressed when held on', () => {
    render(<Button active>Applied</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  describe('as a link', () => {
    it('renders an anchor when href is given', () => {
      render(<Button href="/users">Users</Button>);
      const el = screen.getByRole('link', { name: 'Users' });
      expect(el).toHaveAttribute('href', '/users');
    });

    it('guards a new tab with rel', () => {
      render(
        <Button href="https://example.com" target="_blank">
          Docs
        </Button>
      );
      expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('falls back to a disabled button rather than a dead anchor', () => {
      render(
        <Button href="/users" disabled>
          Users
        </Button>
      );
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('carries an outbound marker on the link variant', () => {
      render(
        <Button variant="link" href="https://example.com">
          Read more
        </Button>
      );
      expect(document.querySelector('.mdt-btn-out')).toBeInTheDocument();
    });

    it('leaves the marker off every other variant', () => {
      render(<Button href="/users">Users</Button>);
      expect(document.querySelector('.mdt-btn-out')).not.toBeInTheDocument();
    });
  });

  it('names an icon-only button through ariaLabel', () => {
    render(<Button iconOnly ariaLabel="Manage columns" leftIcon={<svg />} />);
    expect(screen.getByRole('button', { name: 'Manage columns' })).toBeInTheDocument();
  });

  it('takes a ref, so a caller can move focus to it', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Button ref={ref}>Go</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('stretches when asked', () => {
    render(<Button fullWidth>Go</Button>);
    expect(screen.getByRole('button')).toHaveClass('mdt-w-full');
  });

  it('keeps a caller className alongside its own', () => {
    render(<Button className="mine">Go</Button>);
    const el = screen.getByRole('button');
    expect(el).toHaveClass('mine');
    expect(el).toHaveClass('mdt-btn');
  });

  it('is type=button by default, so it never submits a form by accident', () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});
