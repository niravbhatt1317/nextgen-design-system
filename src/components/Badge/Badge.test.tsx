import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Badge, badgeVariants } from './Badge';

const Glyph = () => (
  <svg data-testid="glyph" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ALL_TONES = [
  'neutral',
  'slate',
  'success',
  'warning',
  'danger',
  'info',
  'ai',
  'inverse',
] as const;

describe('Badge', () => {
  describe('rendering', () => {
    it('renders the label with the defaults: neutral, fill, pill, medium', () => {
      render(<Badge>Manual</Badge>);
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveAttribute('data-tone', 'neutral');
      expect(badge).toHaveAttribute('data-size', 'md');
      expect(badge).toHaveAttribute('data-shape', 'pill');
      expect(badge).toHaveClass('bdg-neutral', 'bdg-fill', 'mdt-rounded-full', 'mdt-h-6');
      expect(screen.getByTestId('badge-label')).toHaveTextContent('Manual');
    });

    it('renders no label element when there is nothing to label', () => {
      render(<Badge icon={<Glyph />} aria-label="Verified" />);
      expect(screen.queryByTestId('badge-label')).not.toBeInTheDocument();
    });

    it('treats an empty string as no label', () => {
      render(
        <Badge icon={<Glyph />} aria-label="Verified">
          {''}
        </Badge>
      );
      expect(screen.queryByTestId('badge-label')).not.toBeInTheDocument();
    });

    it('merges a custom className and forwards the ref', () => {
      const ref = createRef<HTMLSpanElement>();
      render(
        <Badge ref={ref} className="custom">
          Active
        </Badge>
      );
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current).toHaveClass('custom');
    });

    it('passes other span attributes through and lets a caller override the test id', () => {
      render(
        <Badge title="Sync source" data-testid="mine">
          LDAP
        </Badge>
      );
      expect(screen.getByTitle('Sync source')).toBeInTheDocument();
      expect(screen.getByTestId('mine')).toBeInTheDocument();
      expect(screen.queryByTestId('badge')).not.toBeInTheDocument();
    });

    it('exports its variants for the catalogue, with the same defaults', () => {
      const classes = badgeVariants({});
      expect(classes).toContain('bdg-neutral');
      expect(classes).toContain('bdg-fill');
      expect(classes).toContain('mdt-rounded-full');
      expect(classes).toContain('mdt-h-6');
    });
  });

  describe('tones, emphasis, shapes', () => {
    it.each(ALL_TONES)('applies the %s tone class', (tone) => {
      render(<Badge tone={tone}>{tone}</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass(`bdg-${tone}`);
    });

    it.each(['fill', 'outline', 'solid'] as const)('applies the %s emphasis class', (emphasis) => {
      render(<Badge emphasis={emphasis}>{emphasis}</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass(`bdg-${emphasis}`);
    });

    it('rounds the square shape to the 4px corner', () => {
      render(<Badge shape="square">Tag</Badge>);
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('mdt-rounded-sm');
      expect(badge).not.toHaveClass('mdt-rounded-full');
    });
  });

  describe('sizes', () => {
    it.each([
      ['sm', 'mdt-h-5', 'mdt-min-w-5', 'mdt-px-2'],
      ['md', 'mdt-h-6', 'mdt-min-w-6', 'mdt-px-2.5'],
      ['lg', 'mdt-h-7', 'mdt-min-w-7', 'mdt-px-3'],
    ] as const)('%s is %s tall, at least as wide, with %s padding', (size, height, minW, pad) => {
      render(<Badge size={size}>Active</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass(height, minW, pad);
    });

    it('draws a 6px dot beside the label, 8px at large', () => {
      const { rerender } = render(<Badge dot>Active</Badge>);
      expect(screen.getByTestId('badge-dot')).toHaveClass('mdt-size-1.5');
      rerender(
        <Badge dot size="lg">
          Active
        </Badge>
      );
      expect(screen.getByTestId('badge-dot')).toHaveClass('mdt-size-2');
    });

    it('hides the dot from screen readers, since the label already says it', () => {
      render(<Badge dot>Active</Badge>);
      expect(screen.getByTestId('badge-dot')).toHaveAttribute('aria-hidden', 'true');
    });

    it('carries an icon at medium and large', () => {
      render(
        <Badge size="lg" icon={<Glyph />}>
          Verified
        </Badge>
      );
      expect(screen.getByTestId('glyph')).toBeInTheDocument();
      expect(screen.getByTestId('badge')).toHaveClass('[&_svg]:mdt-size-4');
    });

    it('drops the icon at small: small is text or dot only', () => {
      render(
        <Badge size="sm" icon={<Glyph />} dot>
          Verified
        </Badge>
      );
      expect(screen.queryByTestId('glyph')).not.toBeInTheDocument();
      expect(screen.getByTestId('badge-dot')).toBeInTheDocument();
    });

    it('becomes a square of its own height when the icon has no label', () => {
      render(<Badge icon={<Glyph />} aria-label="Verified" />);
      const badge = screen.getByLabelText('Verified');
      expect(badge).toHaveClass('mdt-w-6', 'mdt-px-0');
      expect(badge.querySelector('.bdg-label')).toBeNull();
    });
  });

  describe('a dot on its own, the unread marker', () => {
    it('renders no chip around it', () => {
      render(<Badge tone="success" dot aria-label="Online" />);
      expect(screen.queryByTestId('badge')).not.toBeInTheDocument();
      const mark = screen.getByTestId('badge-dot');
      expect(mark).toHaveClass('bdg-mark', 'bdg-success');
      expect(mark).not.toHaveClass('bdg');
    });

    it.each([
      ['sm', 'mdt-size-1.5'],
      ['md', 'mdt-size-2'],
      ['lg', 'mdt-size-2.5'],
    ] as const)('steps up at %s to %s', (size, expected) => {
      render(<Badge dot size={size} aria-label="Online" />);
      expect(screen.getByTestId('badge-dot')).toHaveClass(expected);
    });

    it('keeps its accessible name, a custom className and the ref', () => {
      const ref = createRef<HTMLSpanElement>();
      render(<Badge ref={ref} dot className="mine" aria-label="Offline" />);
      expect(screen.getByLabelText('Offline')).toHaveClass('mine');
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it('still renders a chip when the dot is paired with a label or an icon', () => {
      const { rerender } = render(<Badge dot>Active</Badge>);
      expect(screen.getByTestId('badge')).toBeInTheDocument();
      rerender(<Badge dot icon={<Glyph />} aria-label="Verified" />);
      expect(screen.getByTestId('badge')).toBeInTheDocument();
    });

    it('is the marker at small even with an icon, because small drops the icon', () => {
      render(<Badge dot size="sm" icon={<Glyph />} aria-label="Online" />);
      expect(screen.queryByTestId('badge')).not.toBeInTheDocument();
      expect(screen.getByTestId('badge-dot')).toHaveClass('bdg-mark');
    });
  });

  describe('capped counts', () => {
    it('caps a number above the maximum', () => {
      render(<Badge max={99}>{1284}</Badge>);
      expect(screen.getByTestId('badge-label')).toHaveTextContent('99+');
    });

    it('caps a count written straight into the markup', () => {
      render(<Badge max={99}>1284</Badge>);
      expect(screen.getByTestId('badge-label')).toHaveTextContent('99+');
    });

    it.each([
      ['at the maximum', 99],
      ['below the maximum', 42],
    ])('leaves a number %s alone', (_label, value) => {
      render(<Badge max={99}>{value}</Badge>);
      expect(screen.getByTestId('badge-label')).toHaveTextContent(String(value));
    });

    it('leaves a label that only looks numeric, and an element child, alone', () => {
      const { rerender } = render(<Badge max={99}>v1284</Badge>);
      expect(screen.getByTestId('badge-label')).toHaveTextContent('v1284');
      rerender(
        <Badge max={99}>
          <em>1284</em>
        </Badge>
      );
      expect(screen.getByTestId('badge-label')).toHaveTextContent('1284');
    });
  });

  describe('truncate', () => {
    it('is off by default', () => {
      render(<Badge>Waiting for the identity provider</Badge>);
      expect(screen.getByTestId('badge')).not.toHaveClass('mdt-max-w-32');
      expect(screen.getByTestId('badge-label')).not.toHaveClass('mdt-truncate');
    });

    it('caps the width and cuts the label with an ellipsis when on', () => {
      render(<Badge truncate>Waiting for the identity provider</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('mdt-max-w-32');
      expect(screen.getByTestId('badge-label')).toHaveClass('mdt-truncate', 'mdt-min-w-0');
    });
  });

  describe('category colours', () => {
    it('takes a palette in place of a tone, with the dot defaulting to the ink', () => {
      render(
        <Badge shape="square" palette={{ fill: '#F2F3FD', ink: '#4F5BC4' }} dot>
          LDAP
        </Badge>
      );
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveAttribute('data-tone', 'custom');
      expect(badge.style.getPropertyValue('--bdg-fill')).toBe('#F2F3FD');
      expect(badge.style.getPropertyValue('--bdg-ink')).toBe('#4F5BC4');
      expect(badge.style.getPropertyValue('--bdg-dot')).toBe('#4F5BC4');
    });

    it('lets the palette name its own dot, on a chip and on the marker', () => {
      const scim = { fill: '#EDF8F7', ink: '#1F7A71', dot: '#22857B' };
      const { rerender } = render(
        <Badge palette={scim} dot>
          SCIM
        </Badge>
      );
      expect(screen.getByTestId('badge').style.getPropertyValue('--bdg-dot')).toBe('#22857B');
      rerender(<Badge palette={scim} dot aria-label="SCIM" />);
      const mark = screen.getByTestId('badge-dot');
      expect(mark).toHaveAttribute('data-tone', 'custom');
      expect(mark.style.getPropertyValue('--bdg-dot')).toBe('#22857B');
    });

    it('keeps a caller style alongside the palette variables', () => {
      render(
        <Badge palette={{ fill: '#F2F3FD', ink: '#4F5BC4' }} style={{ marginLeft: 4 }}>
          LDAP
        </Badge>
      );
      const badge = screen.getByTestId('badge');
      expect(badge.style.marginLeft).toBe('4px');
      expect(badge.style.getPropertyValue('--bdg-ink')).toBe('#4F5BC4');
    });
  });
});
