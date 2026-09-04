import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BadgeNew } from './BadgeNew';

const Glyph = () => (
  <svg data-testid="glyph" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

describe('BadgeNew', () => {
  describe('rendering', () => {
    it('renders the label with the defaults: neutral, fill, pill, medium', () => {
      render(<BadgeNew>Manual</BadgeNew>);
      const badge = screen.getByText('Manual').closest('span[data-tone]') as HTMLElement;
      expect(badge).toHaveAttribute('data-tone', 'neutral');
      expect(badge).toHaveAttribute('data-size', 'md');
      expect(badge).toHaveAttribute('data-shape', 'pill');
      expect(badge).toHaveClass('bnw-neutral', 'bnw-fill', 'mdt-rounded-full', 'mdt-h-6');
    });

    it('merges a custom className and forwards the ref', () => {
      const ref = { current: null as HTMLSpanElement | null };
      render(
        <BadgeNew ref={ref} className="custom">
          Active
        </BadgeNew>
      );
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current).toHaveClass('custom');
    });

    it('passes other span attributes through', () => {
      render(<BadgeNew title="Sync source">LDAP</BadgeNew>);
      expect(screen.getByTitle('Sync source')).toBeInTheDocument();
    });
  });

  describe('tones, emphasis, shapes', () => {
    it.each(['neutral', 'slate', 'success', 'warning', 'danger', 'info', 'inverse'] as const)(
      'applies the %s tone class',
      (tone) => {
        render(<BadgeNew tone={tone}>{tone}</BadgeNew>);
        expect(screen.getByText(tone).closest('span[data-tone]')).toHaveClass(`bnw-${tone}`);
      }
    );

    it.each(['fill', 'outline', 'solid'] as const)('applies the %s emphasis class', (emphasis) => {
      render(<BadgeNew emphasis={emphasis}>{emphasis}</BadgeNew>);
      expect(screen.getByText(emphasis).closest('span[data-tone]')).toHaveClass(`bnw-${emphasis}`);
    });

    it('rounds the square shape to the 4px corner', () => {
      render(<BadgeNew shape="square">Tag</BadgeNew>);
      const badge = screen.getByText('Tag').closest('span[data-tone]');
      expect(badge).toHaveClass('mdt-rounded-sm');
      expect(badge).not.toHaveClass('mdt-rounded-full');
    });
  });

  describe('sizes', () => {
    it.each([
      ['sm', 'mdt-h-5', 'mdt-px-2'],
      ['md', 'mdt-h-6', 'mdt-px-2.5'],
      ['lg', 'mdt-h-7', 'mdt-px-3'],
    ] as const)('%s is %s tall with %s padding', (size, height, pad) => {
      render(<BadgeNew size={size}>Active</BadgeNew>);
      expect(screen.getByText('Active').closest('span[data-tone]')).toHaveClass(height, pad);
    });

    it('draws a 6px dot, 8px at large', () => {
      const { rerender } = render(<BadgeNew dot>Active</BadgeNew>);
      expect(screen.getByTestId('badge-new-dot')).toHaveClass('mdt-size-1.5');
      rerender(
        <BadgeNew dot size="lg">
          Active
        </BadgeNew>
      );
      expect(screen.getByTestId('badge-new-dot')).toHaveClass('mdt-size-2');
    });

    it('carries an icon at medium and large', () => {
      render(
        <BadgeNew size="lg" icon={<Glyph />}>
          Verified
        </BadgeNew>
      );
      expect(screen.getByTestId('glyph')).toBeInTheDocument();
      expect(screen.getByText('Verified').closest('span[data-tone]')).toHaveClass(
        '[&_svg]:mdt-size-4'
      );
    });

    it('drops the icon at small: small is text or dot only', () => {
      render(
        <BadgeNew size="sm" icon={<Glyph />} dot>
          Verified
        </BadgeNew>
      );
      expect(screen.queryByTestId('glyph')).not.toBeInTheDocument();
      expect(screen.getByTestId('badge-new-dot')).toBeInTheDocument();
    });

    it('becomes a square of its own height when the icon has no label', () => {
      render(<BadgeNew icon={<Glyph />} aria-label="Verified" />);
      const badge = screen.getByLabelText('Verified');
      expect(badge).toHaveClass('mdt-w-6', 'mdt-px-0');
      expect(badge.querySelector('.bnw-label')).toBeNull();
    });
  });

  describe('removable chips', () => {
    it('shows a × at medium that calls back and does not bubble to the chip', async () => {
      const onRemove = vi.fn();
      const onClick = vi.fn();
      render(
        <BadgeNew shape="square" onRemove={onRemove} onClick={onClick}>
          Status: Active
        </BadgeNew>
      );
      await userEvent.click(screen.getByRole('button', { name: 'Remove' }));
      expect(onRemove).toHaveBeenCalledTimes(1);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('takes a custom accessible name for the ×', () => {
      render(
        <BadgeNew onRemove={() => undefined} removeLabel="Clear the status filter">
          Status: Active
        </BadgeNew>
      );
      expect(screen.getByRole('button', { name: 'Clear the status filter' })).toBeInTheDocument();
    });

    it('has no × at small, even when asked', () => {
      render(
        <BadgeNew size="sm" onRemove={() => undefined}>
          Filter
        </BadgeNew>
      );
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('category colours', () => {
    it('takes a palette in place of a tone, with the dot defaulting to the ink', () => {
      render(
        <BadgeNew shape="square" palette={{ fill: '#F2F3FD', ink: '#4F5BC4' }} dot>
          LDAP
        </BadgeNew>
      );
      const badge = screen.getByText('LDAP').closest('span[data-tone]') as HTMLElement;
      expect(badge).toHaveAttribute('data-tone', 'custom');
      expect(badge.style.getPropertyValue('--bnw-fill')).toBe('#F2F3FD');
      expect(badge.style.getPropertyValue('--bnw-ink')).toBe('#4F5BC4');
      expect(badge.style.getPropertyValue('--bnw-dot')).toBe('#4F5BC4');
    });

    it('lets the palette name its own dot', () => {
      render(
        <BadgeNew palette={{ fill: '#EDF8F7', ink: '#1F7A71', dot: '#22857B' }} dot>
          SCIM
        </BadgeNew>
      );
      const badge = screen.getByText('SCIM').closest('span[data-tone]') as HTMLElement;
      expect(badge.style.getPropertyValue('--bnw-dot')).toBe('#22857B');
    });
  });
});
