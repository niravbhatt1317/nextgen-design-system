import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Progress } from './Progress';
import type { ProgressSize, ProgressTone } from './Progress.types';

const LABEL = 'Storage used';
const FILL = 'progress-fill';

const bar = () => screen.getByRole('progressbar');
const fill = () => screen.getByTestId(FILL);

describe('Progress', () => {
  describe('value', () => {
    it('reports its value to assistive tech', () => {
      render(<Progress value={40} aria-label={LABEL} />);
      expect(bar()).toHaveAttribute('aria-valuenow', '40');
      expect(bar()).toHaveAttribute('aria-valuemin', '0');
      expect(bar()).toHaveAttribute('aria-valuemax', '100');
    });

    it('is named, so it is not announced as a nameless box', () => {
      render(<Progress value={40} aria-label={LABEL} />);
      expect(screen.getByRole('progressbar', { name: LABEL })).toBeInTheDocument();
    });

    it('fills proportionally', () => {
      render(<Progress value={25} aria-label={LABEL} />);
      expect(fill()).toHaveStyle({ width: '25.000%' });
    });

    it('scales to a custom max', () => {
      render(<Progress value={5} max={20} aria-label={LABEL} />);
      expect(fill()).toHaveStyle({ width: '25.000%' });
      expect(bar()).toHaveAttribute('aria-valuemax', '20');
    });

    it('clamps a value above max', () => {
      render(<Progress value={150} aria-label={LABEL} />);
      expect(fill()).toHaveStyle({ width: '100.000%' });
      expect(bar()).toHaveAttribute('aria-valuenow', '100');
    });

    it('clamps a negative value', () => {
      render(<Progress value={-20} aria-label={LABEL} />);
      expect(fill()).toHaveStyle({ width: '0.000%' });
      expect(bar()).toHaveAttribute('aria-valuenow', '0');
    });

    it('survives a max of zero rather than dividing by it', () => {
      render(<Progress value={10} max={0} aria-label={LABEL} />);
      expect(fill()).toHaveStyle({ width: '10.000%' });
    });
  });

  describe('tone', () => {
    const cases: [ProgressTone, string][] = [
      ['default', 'mdt-bg-info'],
      ['success', 'mdt-bg-success'],
      ['warning', 'mdt-bg-warning'],
      ['danger', 'mdt-bg-destructive'],
    ];

    it.each(cases)('applies the %s tone', (tone, expected) => {
      render(<Progress value={50} tone={tone} aria-label={LABEL} />);
      expect(fill()).toHaveClass(expected);
    });
  });

  describe('size', () => {
    const cases: [ProgressSize, string][] = [
      ['sm', 'mdt-h-1'],
      ['md', 'mdt-h-1.5'],
      ['lg', 'mdt-h-2'],
    ];

    it.each(cases)('applies the %s size', (size, expected) => {
      const { container } = render(<Progress value={50} size={size} aria-label={LABEL} />);
      expect(container.querySelector(`.${CSS.escape(expected)}`)).toBeInTheDocument();
    });
  });

  describe('markers', () => {
    it('draws no markers by default', () => {
      render(<Progress value={50} aria-label={LABEL} />);
      expect(screen.queryByTestId('progress-baseline')).not.toBeInTheDocument();
      expect(screen.queryByTestId('progress-floor')).not.toBeInTheDocument();
    });

    it('draws a baseline where asked', () => {
      render(<Progress value={50} baseline={75} aria-label={LABEL} />);
      expect(screen.getByTestId('progress-baseline')).toHaveStyle({ left: '75.000%' });
    });

    it('draws a floor where asked', () => {
      render(<Progress value={50} floor={10} aria-label={LABEL} />);
      expect(screen.getByTestId('progress-floor')).toHaveStyle({ left: '10.000%' });
    });

    it('clamps markers to the track', () => {
      render(<Progress value={50} baseline={999} floor={-50} aria-label={LABEL} />);
      expect(screen.getByTestId('progress-baseline')).toHaveStyle({ left: '100.000%' });
      expect(screen.getByTestId('progress-floor')).toHaveStyle({ left: '0.000%' });
    });

    it('hides markers from screen readers, since the value is already announced', () => {
      render(<Progress value={50} baseline={75} floor={10} aria-label={LABEL} />);
      expect(screen.getByTestId('progress-baseline')).toHaveAttribute('aria-hidden', 'true');
      expect(screen.getByTestId('progress-floor')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('merges a custom className', () => {
    render(<Progress value={50} className="mdt-mt-2" aria-label={LABEL} />);
    expect(bar()).toHaveClass('mdt-mt-2');
  });

  it('forwards a ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Progress value={50} ref={ref} aria-label={LABEL} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
