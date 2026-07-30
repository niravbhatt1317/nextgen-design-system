import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Badge } from './Badge';
import type { BadgeShape, BadgeSize, BadgeTone } from './Badge.types';

const TEXT = 'Active';
const DOT = 'badge-dot';

const getBadge = () => screen.getByText(TEXT);

describe('Badge', () => {
  describe('rendering', () => {
    it('renders its label', () => {
      render(<Badge>{TEXT}</Badge>);
      expect(getBadge()).toBeInTheDocument();
    });

    it('renders without a label', () => {
      const { container } = render(<Badge dot tone="success" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('merges a custom className', () => {
      render(<Badge className="mdt-ml-2">{TEXT}</Badge>);
      expect(getBadge()).toHaveClass('mdt-ml-2');
    });

    it('forwards a ref', () => {
      const ref = createRef<HTMLSpanElement>();
      render(<Badge ref={ref}>{TEXT}</Badge>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it('passes through native span attributes', () => {
      render(<Badge title="Status">{TEXT}</Badge>);
      expect(getBadge()).toHaveAttribute('title', 'Status');
    });
  });

  describe('tones', () => {
    const cases: Array<[BadgeTone, string]> = [
      ['neutral', 'mdt-bg-muted'],
      ['success', 'mdt-bg-green-10'],
      ['warning', 'mdt-bg-orange-20'],
      ['danger', 'mdt-bg-red-10'],
      ['info', 'mdt-bg-blue-10'],
      ['purple', 'mdt-bg-purple-10'],
    ];

    it.each(cases)('applies the %s tone', (tone, expected) => {
      render(<Badge tone={tone}>{TEXT}</Badge>);
      expect(getBadge()).toHaveClass(expected);
    });

    it('is neutral by default', () => {
      render(<Badge>{TEXT}</Badge>);
      expect(getBadge()).toHaveClass('mdt-bg-muted');
    });
  });

  describe('shapes', () => {
    const cases: Array<[BadgeShape, string]> = [
      ['pill', 'mdt-rounded-full'],
      ['tag', 'mdt-rounded-sm'],
      ['bare', 'mdt-bg-transparent'],
    ];

    it.each(cases)('applies the %s shape', (shape, expected) => {
      render(<Badge shape={shape}>{TEXT}</Badge>);
      expect(getBadge()).toHaveClass(expected);
    });

    it('is a pill by default', () => {
      render(<Badge>{TEXT}</Badge>);
      expect(getBadge()).toHaveClass('mdt-rounded-full');
    });

    it('drops its padding when bare, so it sits flush in a table cell', () => {
      render(<Badge shape="bare">{TEXT}</Badge>);
      expect(getBadge()).toHaveClass('mdt-px-0');
    });

    it('drops its fixed height when bare', () => {
      render(<Badge shape="bare">{TEXT}</Badge>);
      expect(getBadge()).toHaveClass('mdt-h-auto');
    });

    it('gives the tag shape a border, since it sits inline with text', () => {
      render(<Badge shape="tag">{TEXT}</Badge>);
      expect(getBadge()).toHaveClass('mdt-border');
    });

    it('gives a pill no border, since its shape already defines it', () => {
      render(<Badge shape="pill">{TEXT}</Badge>);
      expect(getBadge().className).not.toMatch(/(^|\s)mdt-border(\s|$)/);
    });

    it('clears the border and minimum width when bare', () => {
      render(<Badge shape="bare">{TEXT}</Badge>);
      expect(getBadge()).toHaveClass('mdt-border-0');
      expect(getBadge()).toHaveClass('mdt-min-w-0');
    });

    it('clears the dark background too, not just the light one', () => {
      // The tones set their dark background with a `dark:` utility, which the
      // class merger will not let a plain `mdt-bg-transparent` override. Without
      // the dark variant a "bare" badge renders as a filled pill in dark mode.
      render(
        <Badge shape="bare" tone="success">
          {TEXT}
        </Badge>
      );
      expect(getBadge()).toHaveClass('dark:mdt-bg-transparent');
    });
  });

  describe('sizes', () => {
    const cases: Array<[BadgeSize, string]> = [
      ['sm', 'mdt-h-5'],
      ['md', 'mdt-h-6'],
      ['lg', 'mdt-h-7'],
    ];

    it.each(cases)('applies the %s size', (size, expected) => {
      render(<Badge size={size}>{TEXT}</Badge>);
      expect(getBadge()).toHaveClass(expected);
    });

    it.each([
      ['sm', 'mdt-min-w-5'],
      ['md', 'mdt-min-w-6'],
      ['lg', 'mdt-min-w-7'],
    ] as [BadgeSize, string][])(
      'sets a minimum width at %s, so a count rounds into a circle',
      (size, expected) => {
        render(<Badge size={size}>3</Badge>);
        expect(screen.getByText('3')).toHaveClass(expected);
      }
    );

    it('is medium by default', () => {
      render(<Badge>{TEXT}</Badge>);
      expect(getBadge()).toHaveClass('mdt-h-6');
    });
  });

  describe('dot', () => {
    it('is absent by default', () => {
      render(<Badge>{TEXT}</Badge>);
      expect(screen.queryByTestId(DOT)).not.toBeInTheDocument();
    });

    it('renders when asked for', () => {
      render(<Badge dot>{TEXT}</Badge>);
      expect(screen.getByTestId(DOT)).toBeInTheDocument();
    });

    it('takes its colour from the tone', () => {
      render(
        <Badge dot tone="danger">
          {TEXT}
        </Badge>
      );
      expect(screen.getByTestId(DOT)).toHaveClass('mdt-bg-destructive');
    });

    it('grows with the badge', () => {
      render(
        <Badge dot size="lg">
          {TEXT}
        </Badge>
      );
      expect(screen.getByTestId(DOT)).toHaveClass('mdt-h-2');
    });

    it('is hidden from screen readers, since the label already says it', () => {
      render(<Badge dot>{TEXT}</Badge>);
      expect(screen.getByTestId(DOT)).toHaveAttribute('aria-hidden', 'true');
    });

    it.each(['neutral', 'success', 'warning', 'danger', 'info', 'purple'] as const)(
      'renders a %s dot',
      (tone) => {
        render(
          <Badge dot tone={tone}>
            {TEXT}
          </Badge>
        );
        expect(screen.getByTestId(DOT)).toBeInTheDocument();
      }
    );
  });

  describe('icon', () => {
    it('renders an icon before the label', () => {
      render(<Badge icon={<span data-testid="icon" />}>{TEXT}</Badge>);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(getBadge()).toHaveTextContent(TEXT);
    });

    it('renders an icon with no label', () => {
      render(<Badge icon={<span data-testid="icon" />} />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('can carry both a dot and an icon, though it should not', () => {
      render(
        <Badge dot icon={<span data-testid="icon" />}>
          {TEXT}
        </Badge>
      );
      expect(screen.getByTestId(DOT)).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });
});
