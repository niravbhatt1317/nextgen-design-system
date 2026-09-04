import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { BadgeOld } from './BadgeOld';
import type { BadgeOldEmphasis, BadgeOldShape, BadgeOldSize, BadgeOldTone } from './BadgeOld.types';

const TEXT = 'Active';
const BADGE = 'badge';
const DOT = 'badge-dot';
const LABEL = 'badge-label';
const ICON = 'icon';

const getBadge = () => screen.getByTestId(BADGE);
const ALL_TONES: BadgeOldTone[] = ['neutral', 'info', 'success', 'warning', 'danger', 'ai'];

describe('BadgeOld', () => {
  describe('rendering', () => {
    it('renders its label', () => {
      render(<BadgeOld>{TEXT}</BadgeOld>);
      expect(screen.getByText(TEXT)).toBeInTheDocument();
    });

    it('wraps the label so it can be truncated independently of the chip', () => {
      render(<BadgeOld>{TEXT}</BadgeOld>);
      expect(screen.getByTestId(LABEL)).toHaveTextContent(TEXT);
    });

    it('renders no label element when there is nothing to label', () => {
      render(<BadgeOld icon={<span data-testid={ICON} />} aria-label="Failed" />);
      expect(screen.queryByTestId(LABEL)).not.toBeInTheDocument();
    });

    it('treats an empty string as no label', () => {
      render(<BadgeOld icon={<span data-testid={ICON} />}>{''}</BadgeOld>);
      expect(screen.queryByTestId(LABEL)).not.toBeInTheDocument();
    });

    it('merges a custom className', () => {
      render(<BadgeOld className="mdt-ml-2">{TEXT}</BadgeOld>);
      expect(getBadge()).toHaveClass('mdt-ml-2');
    });

    it('forwards a ref', () => {
      const ref = createRef<HTMLSpanElement>();
      render(<BadgeOld ref={ref}>{TEXT}</BadgeOld>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it('passes through native span attributes', () => {
      render(<BadgeOld title="Status">{TEXT}</BadgeOld>);
      expect(getBadge()).toHaveAttribute('title', 'Status');
    });

    it('lets a caller override the test id', () => {
      render(<BadgeOld data-testid="mine">{TEXT}</BadgeOld>);
      expect(screen.getByTestId('mine')).toBeInTheDocument();
    });
  });

  describe('tones', () => {
    const cases: Array<[BadgeOldTone, string]> = [
      ['neutral', 'mdt-bg-neutral-30'],
      ['info', 'mdt-bg-blue-10'],
      ['success', 'mdt-bg-green-10'],
      ['warning', 'mdt-bg-orange-20'],
      ['danger', 'mdt-bg-red-10'],
      ['ai', 'mdt-bg-purple-10'],
    ];

    it.each(cases)('tints the %s tone', (tone, expected) => {
      render(<BadgeOld tone={tone}>{TEXT}</BadgeOld>);
      expect(getBadge()).toHaveClass(expected);
    });

    it.each(ALL_TONES)('gives the %s tone a dark-mode tint too', (tone) => {
      render(<BadgeOld tone={tone}>{TEXT}</BadgeOld>);
      expect(getBadge().className).toMatch(/dark:mdt-bg-/);
    });

    it('is neutral by default', () => {
      render(<BadgeOld>{TEXT}</BadgeOld>);
      expect(getBadge()).toHaveClass('mdt-bg-neutral-30');
    });

    // Purple's mid steps run lighter than the other hues, so AI text sits at
    // the 90 step where every other tone sits at 80.
    it('writes AI text at the deeper purple step', () => {
      render(<BadgeOld tone="ai">{TEXT}</BadgeOld>);
      expect(getBadge()).toHaveClass('mdt-text-purple-90');
    });
  });

  describe('emphasis', () => {
    const cases: Array<[BadgeOldEmphasis, string]> = [
      ['subtle', 'mdt-bg-green-10'],
      ['outline', 'mdt-bg-transparent'],
      ['solid', 'mdt-bg-success'],
    ];

    it.each(cases)('applies %s emphasis', (emphasis, expected) => {
      render(
        <BadgeOld tone="success" emphasis={emphasis}>
          {TEXT}
        </BadgeOld>
      );
      expect(getBadge()).toHaveClass(expected);
    });

    it('is subtle by default', () => {
      render(<BadgeOld tone="success">{TEXT}</BadgeOld>);
      expect(getBadge()).toHaveClass('mdt-bg-green-10');
    });

    // The class merger treats `dark:bg-*` and `bg-*` as separate groups, so a
    // plain transparent background clears the light fill and leaves the dark
    // one — an outline badge would render filled in dark mode.
    it('clears the dark background on an outline badge, not just the light one', () => {
      render(
        <BadgeOld tone="success" emphasis="outline">
          {TEXT}
        </BadgeOld>
      );
      expect(getBadge()).toHaveClass('dark:mdt-bg-transparent');
    });

    it('gives an outline badge an edge in the tone colour', () => {
      render(
        <BadgeOld tone="danger" emphasis="outline">
          {TEXT}
        </BadgeOld>
      );
      expect(getBadge()).toHaveClass('mdt-border-red-80');
    });

    it.each(ALL_TONES)('renders %s at every emphasis without clashing', (tone) => {
      const { container } = render(
        <>
          <BadgeOld tone={tone}>a</BadgeOld>
          <BadgeOld tone={tone} emphasis="outline">
            b
          </BadgeOld>
          <BadgeOld tone={tone} emphasis="solid">
            1
          </BadgeOld>
        </>
      );
      expect(container.querySelectorAll('[data-testid="badge"]')).toHaveLength(3);
    });

    // White on `--mdt-info` measures 3.78 against a 4.5 minimum. Until that
    // shared token is fixed, solid info points at a step that passes.
    it('avoids the failing info fill on a solid badge', () => {
      render(
        <BadgeOld tone="info" emphasis="solid">
          4
        </BadgeOld>
      );
      expect(getBadge()).toHaveClass('mdt-bg-blue-70');
      expect(getBadge()).not.toHaveClass('mdt-bg-info');
    });
  });

  describe('shapes', () => {
    const cases: Array<[BadgeOldShape, string]> = [
      ['pill', 'mdt-rounded-full'],
      ['square', 'mdt-rounded-sm'],
    ];

    it.each(cases)('applies the %s shape', (shape, expected) => {
      render(<BadgeOld shape={shape}>{TEXT}</BadgeOld>);
      expect(getBadge()).toHaveClass(expected);
    });

    it('is a pill by default', () => {
      render(<BadgeOld>{TEXT}</BadgeOld>);
      expect(getBadge()).toHaveClass('mdt-rounded-full');
    });
  });

  describe('sizes', () => {
    const heights: Array<[BadgeOldSize, string]> = [
      ['sm', 'mdt-h-5'],
      ['md', 'mdt-h-6'],
      ['lg', 'mdt-h-7'],
    ];

    it.each(heights)('applies the %s size', (size, expected) => {
      render(<BadgeOld size={size}>{TEXT}</BadgeOld>);
      expect(getBadge()).toHaveClass(expected);
    });

    it.each([
      ['sm', 'mdt-min-w-5'],
      ['md', 'mdt-min-w-6'],
      ['lg', 'mdt-min-w-7'],
    ] as Array<[BadgeOldSize, string]>)(
      'sets a minimum width at %s, so a count rounds into a circle',
      (size, expected) => {
        render(<BadgeOld size={size}>3</BadgeOld>);
        expect(getBadge()).toHaveClass(expected);
      }
    );

    // A 12px glyph adrift in a 28px chip is what happened while the caller
    // chose the icon size.
    it.each([
      ['sm', '[&_svg]:mdt-size-3'],
      ['md', '[&_svg]:mdt-size-3.5'],
      ['lg', '[&_svg]:mdt-size-4'],
    ] as Array<[BadgeOldSize, string]>)('sizes the icon at %s', (size, expected) => {
      render(<BadgeOld size={size}>{TEXT}</BadgeOld>);
      expect(getBadge()).toHaveClass(expected);
    });

    it('is medium by default', () => {
      render(<BadgeOld>{TEXT}</BadgeOld>);
      expect(getBadge()).toHaveClass('mdt-h-6');
    });
  });

  describe('dot', () => {
    it('is absent by default', () => {
      render(<BadgeOld>{TEXT}</BadgeOld>);
      expect(screen.queryByTestId(DOT)).not.toBeInTheDocument();
    });

    it('renders when asked for', () => {
      render(<BadgeOld dot>{TEXT}</BadgeOld>);
      expect(screen.getByTestId(DOT)).toBeInTheDocument();
    });

    it('takes its colour from the tone', () => {
      render(
        <BadgeOld dot tone="danger">
          {TEXT}
        </BadgeOld>
      );
      expect(screen.getByTestId(DOT)).toHaveClass('mdt-bg-destructive');
    });

    // On a filled chip the tone colour would vanish into the fill.
    it('borrows the label colour on a solid badge', () => {
      render(
        <BadgeOld dot tone="danger" emphasis="solid">
          {TEXT}
        </BadgeOld>
      );
      expect(screen.getByTestId(DOT)).toHaveClass('mdt-bg-current');
    });

    it('grows with the badge', () => {
      render(
        <BadgeOld dot size="lg">
          {TEXT}
        </BadgeOld>
      );
      expect(screen.getByTestId(DOT)).toHaveClass('mdt-h-2');
    });

    it('is hidden from screen readers, since the label already says it', () => {
      render(<BadgeOld dot>{TEXT}</BadgeOld>);
      expect(screen.getByTestId(DOT)).toHaveAttribute('aria-hidden', 'true');
    });

    it.each(ALL_TONES)('renders a %s dot', (tone) => {
      render(
        <BadgeOld dot tone={tone}>
          {TEXT}
        </BadgeOld>
      );
      expect(screen.getByTestId(DOT)).toBeInTheDocument();
    });
  });

  describe('a dot on its own — the unread marker', () => {
    it('renders no chip around it', () => {
      render(<BadgeOld dot aria-label="Offline" tone="danger" />);
      expect(screen.queryByTestId(BADGE)).not.toBeInTheDocument();
      expect(screen.getByTestId(DOT)).toBeInTheDocument();
    });

    it('carries the tone colour', () => {
      render(<BadgeOld dot aria-label="Healthy" tone="success" />);
      expect(screen.getByTestId(DOT)).toHaveClass('mdt-bg-success');
    });

    it.each([
      ['sm', 'mdt-h-1.5'],
      ['md', 'mdt-h-2'],
      ['lg', 'mdt-h-2.5'],
    ] as Array<[BadgeOldSize, string]>)('sizes the lone dot at %s', (size, expected) => {
      render(<BadgeOld dot size={size} aria-label="Healthy" />);
      expect(screen.getByTestId(DOT)).toHaveClass(expected);
    });

    it('keeps its accessible name', () => {
      render(<BadgeOld dot aria-label="Offline" />);
      expect(screen.getByLabelText('Offline')).toBeInTheDocument();
    });

    it('accepts a custom className', () => {
      render(<BadgeOld dot aria-label="Offline" className="mdt-ml-2" />);
      expect(screen.getByTestId(DOT)).toHaveClass('mdt-ml-2');
    });

    it('still renders a chip when a dot is paired with a label', () => {
      render(<BadgeOld dot>{TEXT}</BadgeOld>);
      expect(screen.getByTestId(BADGE)).toBeInTheDocument();
    });

    it('still renders a chip when a dot is paired with an icon', () => {
      render(<BadgeOld dot icon={<span data-testid={ICON} />} aria-label="Mixed" />);
      expect(screen.getByTestId(BADGE)).toBeInTheDocument();
    });
  });

  describe('icon', () => {
    it('renders an icon before the label', () => {
      render(<BadgeOld icon={<span data-testid={ICON} />}>{TEXT}</BadgeOld>);
      expect(screen.getByTestId(ICON)).toBeInTheDocument();
      expect(screen.getByText(TEXT)).toBeInTheDocument();
    });

    it('renders an icon with no label', () => {
      render(<BadgeOld icon={<span data-testid={ICON} />} aria-label="Failed" />);
      expect(screen.getByTestId(ICON)).toBeInTheDocument();
    });

    // With nothing beside it, side padding leaves the glyph in a stretched oval.
    it.each([
      ['sm', 'mdt-w-5'],
      ['md', 'mdt-w-6'],
      ['lg', 'mdt-w-7'],
    ] as Array<[BadgeOldSize, string]>)(
      'collapses to a square chip at %s when there is no label',
      (size, expected) => {
        render(<BadgeOld size={size} icon={<span data-testid={ICON} />} aria-label="Failed" />);
        expect(getBadge()).toHaveClass(expected);
        expect(getBadge()).toHaveClass('mdt-px-0');
      }
    );

    it('keeps its padding when there is a label', () => {
      render(<BadgeOld icon={<span data-testid={ICON} />}>{TEXT}</BadgeOld>);
      expect(getBadge()).not.toHaveClass('mdt-px-0');
    });

    it('can carry both a dot and an icon, though it should not', () => {
      render(
        <BadgeOld dot icon={<span data-testid={ICON} />}>
          {TEXT}
        </BadgeOld>
      );
      expect(screen.getByTestId(DOT)).toBeInTheDocument();
      expect(screen.getByTestId(ICON)).toBeInTheDocument();
    });
  });

  describe('capped counts', () => {
    it('caps a number above the maximum', () => {
      render(<BadgeOld max={99}>{1284}</BadgeOld>);
      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    // JSX hands a literal to the component as text, so the two spellings below
    // look identical to whoever writes them and must behave identically.
    it('caps a count written straight into the markup', () => {
      render(<BadgeOld max={99}>1284</BadgeOld>);
      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('leaves a written count below the maximum alone', () => {
      render(<BadgeOld max={99}>42</BadgeOld>);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('leaves a label that only looks numeric alone', () => {
      render(<BadgeOld max={2}>v1.4.2</BadgeOld>);
      expect(screen.getByText('v1.4.2')).toBeInTheDocument();
    });

    it('ignores an element child', () => {
      render(
        <BadgeOld max={2}>
          <span data-testid="child">many</span>
        </BadgeOld>
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('leaves a number at the maximum alone', () => {
      render(<BadgeOld max={99}>99</BadgeOld>);
      expect(screen.getByText('99')).toBeInTheDocument();
    });

    it('leaves a number below the maximum alone', () => {
      render(<BadgeOld max={99}>3</BadgeOld>);
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('does nothing without a maximum', () => {
      render(<BadgeOld>1284</BadgeOld>);
      expect(screen.getByText('1284')).toBeInTheDocument();
    });

    it('ignores text labels, which have no maximum', () => {
      render(<BadgeOld max={2}>{TEXT}</BadgeOld>);
      expect(screen.getByText(TEXT)).toBeInTheDocument();
    });
  });

  describe('truncation', () => {
    it('is off by default', () => {
      render(<BadgeOld>{TEXT}</BadgeOld>);
      expect(screen.getByTestId(LABEL)).not.toHaveClass('mdt-truncate');
    });

    it('caps the width when asked for', () => {
      render(<BadgeOld truncate>Partially reconciled</BadgeOld>);
      expect(getBadge()).toHaveClass('mdt-max-w-32');
    });

    it('cuts the label rather than the chip', () => {
      render(<BadgeOld truncate>Partially reconciled</BadgeOld>);
      expect(screen.getByTestId(LABEL)).toHaveClass('mdt-truncate');
    });
  });
});
