import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { IconTile } from './IconTile';
import type { IconTileShape, IconTileSize, IconTileTone } from './IconTile';

const icon = <span data-testid="icon" />;

describe('IconTile', () => {
  it('renders its icon', () => {
    render(<IconTile icon={icon} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  describe('tone', () => {
    const cases: [IconTileTone, string][] = [
      ['slate', 'mdt-bg-neutral-30'],
      ['blue', 'mdt-bg-blue-10'],
      ['green', 'mdt-bg-green-10'],
      ['amber', 'mdt-bg-orange-20'],
      ['rose', 'mdt-bg-red-10'],
      ['purple', 'mdt-bg-purple-10'],
    ];

    it.each(cases)('applies the %s tone', (tone, expected) => {
      const { container } = render(<IconTile icon={icon} tone={tone} />);
      expect(container.firstChild).toHaveClass(expected);
    });

    it('is slate by default', () => {
      const { container } = render(<IconTile icon={icon} />);
      expect(container.firstChild).toHaveClass('mdt-bg-neutral-30');
    });
  });

  describe('size', () => {
    const cases: [IconTileSize, string][] = [
      ['sm', 'mdt-h-6'],
      ['md', 'mdt-h-8'],
      ['lg', 'mdt-h-10'],
      ['xl', 'mdt-h-12'],
    ];

    it.each(cases)('applies the %s size', (size, expected) => {
      const { container } = render(<IconTile icon={icon} size={size} />);
      expect(container.firstChild).toHaveClass(expected);
    });

    it('is square at every size', () => {
      const { container } = render(<IconTile icon={icon} size="lg" />);
      expect(container.firstChild).toHaveClass('mdt-h-10');
      expect(container.firstChild).toHaveClass('mdt-w-10');
    });
  });

  describe('shape', () => {
    const cases: [IconTileShape, string][] = [
      ['square', 'mdt-rounded-md'],
      ['circle', 'mdt-rounded-full'],
    ];

    it.each(cases)('applies the %s shape', (shape, expected) => {
      const { container } = render(<IconTile icon={icon} shape={shape} />);
      expect(container.firstChild).toHaveClass(expected);
    });
  });

  describe('accessibility', () => {
    it('is hidden from screen readers when it has no label, since it only decorates', () => {
      const { container } = render(<IconTile icon={icon} />);
      expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
    });

    it('becomes an image with a name when labelled', () => {
      render(<IconTile icon={icon} aria-label="Server" />);
      expect(screen.getByRole('img', { name: 'Server' })).toBeInTheDocument();
    });

    it('is not hidden once it is labelled', () => {
      render(<IconTile icon={icon} aria-label="Server" />);
      expect(screen.getByRole('img', { name: 'Server' })).not.toHaveAttribute('aria-hidden');
    });
  });

  it('merges a custom className', () => {
    const { container } = render(<IconTile icon={icon} className="mdt-mr-2" />);
    expect(container.firstChild).toHaveClass('mdt-mr-2');
  });

  it('forwards a ref', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<IconTile icon={icon} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
