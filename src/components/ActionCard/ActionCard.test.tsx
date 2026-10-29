import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActionCard } from './ActionCard';

describe('ActionCard', () => {
  it('renders title, badge and description as plain content when nothing is clickable', () => {
    const { container } = render(
      <ActionCard title="northbridge.io" badge={<span>Live</span>} description="SAML 2.0" />
    );
    expect(screen.getByText('northbridge.io')).toBeInTheDocument();
    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.getByText('SAML 2.0')).toBeInTheDocument();
    expect(screen.queryByRole('button')).toBeNull();
    expect(container.querySelector('[data-slot=action-card]')).not.toHaveClass(
      'hover:mdt-bg-secondary'
    );
  });

  it('splits an array description with hairlines', () => {
    const { container } = render(
      <ActionCard title="Acme" description={['SAML 2.0', '2,104 sign-ins']} />
    );
    expect(screen.getByText('2,104 sign-ins')).toBeInTheDocument();
    expect(container.querySelectorAll('.mdt-mx-2')).toHaveLength(1);
  });

  it('becomes one button named by its title when given onClick', async () => {
    const onClick = vi.fn();
    render(<ActionCard title="Add domain" variant="add" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button', { name: 'Add domain' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is reachable and pressable from the keyboard', async () => {
    const onClick = vi.fn();
    render(<ActionCard title="Open drawer" onClick={onClick} />);
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Open drawer' })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('becomes a link with href, guarding a new tab', () => {
    const { rerender } = render(<ActionCard title="Docs" href="/docs" target="_blank" />);
    const link = screen.getByRole('link', { name: 'Docs' });
    expect(link).toHaveAttribute('href', '/docs');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    rerender(<ActionCard title="Docs" href="/docs" />);
    expect(screen.getByRole('link')).not.toHaveAttribute('rel');
  });

  it('keeps its controls their own: a click on one does not fire the card', async () => {
    const onCard = vi.fn();
    const onSwitch = vi.fn();
    render(
      <ActionCard
        title="Acme"
        onClick={onCard}
        actions={<button onClick={onSwitch}>Toggle</button>}
        menu={<button>More</button>}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(onSwitch).toHaveBeenCalledTimes(1);
    expect(onCard).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'More' })).toBeInTheDocument();
  });

  it('holds still with clickable={false}, and in the edit face', () => {
    const { rerender } = render(<ActionCard title="Acme" onClick={vi.fn()} clickable={false} />);
    expect(screen.queryByRole('button')).toBeNull();
    rerender(
      <ActionCard variant="edit" onClick={vi.fn()} href="/x">
        <input aria-label="New domain" />
      </ActionCard>
    );
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.getByRole('textbox', { name: 'New domain' })).toBeInTheDocument();
  });

  it('ignores an empty href', () => {
    render(<ActionCard title="Acme" href="" />);
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('draws the tile only with an icon, and fades it when dim', () => {
    const { container, rerender } = render(<ActionCard title="Acme" />);
    expect(container.querySelector('.mdt-size-9')).toBeNull();
    rerender(<ActionCard title="Acme" icon={<svg />} dim />);
    expect(container.querySelector('.mdt-size-9')).toHaveClass('mdt-opacity-50');
  });

  it('forwards its ref and a className', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ActionCard ref={ref} title="Acme" className="custom" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('custom');
  });

  it('shows the whole title in a tooltip on hover', async () => {
    render(<ActionCard title="northbridge.io" onClick={vi.fn()} />);
    await userEvent.hover(screen.getByText('northbridge.io'));
    await waitFor(() => {
      expect(document.querySelector('.tt')).toHaveTextContent('northbridge.io');
    });
  });

  it('draws the compact face: the tinted card, a bare glyph by the title, no tile, the control on the right', () => {
    const { container } = render(
      <ActionCard
        variant="compact"
        icon={<svg data-testid="glyph" />}
        title="https://vault.acme.io/v1/secret/metadata"
        description="Synced moments ago"
        actions={<button type="button">Sync now</button>}
      />
    );
    const card = container.querySelector('[data-slot=action-card]');
    expect(card).toHaveClass('mdt-bg-neutral-10', 'mdt-rounded-lg', 'mdt-px-3', 'mdt-py-2.5');
    expect(card).not.toHaveClass('mdt-rounded-xl');
    expect(container.querySelector('.mdt-size-9')).toBeNull();
    expect(screen.getByText('https://vault.acme.io/v1/secret/metadata').parentElement).toHaveClass(
      'mdt-text-xs'
    );
    expect(screen.getByText('Synced moments ago')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sync now' })).toBeInTheDocument();
  });

  it('draws the compact face without a glyph', () => {
    render(<ActionCard variant="compact" title="Endpoint" />);
    expect(screen.getByText('Endpoint')).toBeInTheDocument();
  });
});
