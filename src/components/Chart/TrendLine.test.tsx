import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { TrendLine } from './TrendLine';
import type { TrendPoint } from './Chart.types';

const bubble = () => document.querySelector<HTMLElement>('.tt');

const PTS: TrendPoint[] = [
  { t: 1, v: 10 },
  { t: 2, v: 20 },
  { t: 3, v: 40 },
];
const AXIS: [string, string, string] = ['16:30', '04:30', 'Now'];

describe('TrendLine', () => {
  it('draws the line and its wash on 1000 × 150, the three-step scale and the axis', () => {
    const { container } = render(
      <TrendLine points={PTS} lo={0} hi={40} tip={() => ''} axis={AXIS} />
    );
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 1000 150');
    expect(svg).toHaveAttribute('data-tone', 'info');
    expect(container.querySelector('.mdt-chart-line')).toHaveAttribute(
      'd',
      'M0.0 112.5 L500.0 75.0 L1000.0 0.0'
    );
    expect(container.querySelector('.mdt-chart-area')).toHaveAttribute(
      'd',
      'M0.0 112.5 L500.0 75.0 L1000.0 0.0 L1000 150 L0 150 Z'
    );
    expect(
      [...container.querySelectorAll('.mdt-chart-trend__y')].map((s) => s.textContent)
    ).toEqual(['0%', '20%', '40%']);
    expect(container.querySelectorAll('.mdt-chart-grid')).toHaveLength(3);
    expect(
      [...container.querySelectorAll('.mdt-chart-axis span')].map((s) => s.textContent)
    ).toEqual(AXIS);
  });

  it('takes the good green and another unit', () => {
    const { container } = render(
      <TrendLine points={PTS} lo={0} hi={1.5} tone="good" unit=" ms" tip={() => ''} axis={AXIS} />
    );
    expect(container.querySelector('svg')).toHaveAttribute('data-tone', 'good');
    expect(container.querySelector('.mdt-chart-trend__dot')).toHaveAttribute('data-tone', 'good');
    expect(container.querySelectorAll('.mdt-chart-trend__y')[1]).toHaveTextContent('0.75 ms');
  });

  it('every point takes focus and opens its one line, told which point it is', async () => {
    const tip = vi.fn((p: TrendPoint, i: number) => `#${String(i)} · ${String(p.v)}%`);
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <TrendLine ref={ref} points={PTS} lo={0} hi={40} tip={tip} axis={AXIS} className="mine" />
    );
    expect(ref.current).toHaveClass('mdt-chart-trend-wrap', 'mine');
    const hits = container.querySelectorAll<HTMLElement>('.mdt-chart-trend__hit');
    expect(hits).toHaveLength(3);
    expect(hits[1]).toHaveAttribute('tabindex', '0');
    expect(hits[2]?.querySelector<HTMLElement>('.mdt-chart-trend__dot')?.style.top).toBe('0%');
    expect(tip).toHaveBeenCalledWith(PTS[1], 1);
    await userEvent.hover(hits[1] as HTMLElement);
    await waitFor(() => {
      expect(bubble()).toHaveTextContent('#1 · 20%');
    });
  });

  it('one point, or a flat scale, draws without dividing by zero', () => {
    const { container } = render(
      <TrendLine points={[{ t: 1, v: 5 }]} lo={5} hi={5} tip={() => ''} axis={AXIS} />
    );
    expect(container.querySelector('.mdt-chart-line')).toHaveAttribute('d', 'M0.0 150.0');
  });
});
