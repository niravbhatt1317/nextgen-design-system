import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ChartTip } from './ChartTip';
import { ColumnChart } from './ColumnChart';
import type { ColumnChartColumn } from './Chart.types';

/** The visible bubble; Radix keeps a second, hidden copy for screen readers. */
const bubble = () => document.querySelector<HTMLElement>('.tt');

const SILENT: ColumnChartColumn[] = [
  { label: 'Under 1h', n: 0, tone: 'quiet', tip: 'Under 1h silent · 0 agents' },
  { label: '1–6h', n: 4, tone: 'quiet', tip: '1–6h silent · 4 agents' },
  { label: '6–24h', n: 10, tone: 'quiet', tip: '6–24h silent · 10 agents' },
  { label: '1–2 days', n: 18, tone: 'crit', tip: '1–2 days silent · 18 agents' },
  { label: 'Over 2 days', n: 0, tone: 'crit', tip: 'Over 2 days silent · 0 agents' },
];

describe('ChartTip', () => {
  it('opens one line over its mark, at once, in the library bubble', async () => {
    render(
      <ChartTip text="Linux · 412 agents">
        <button type="button">mark</button>
      </ChartTip>
    );
    expect(bubble()).toBeNull();
    await userEvent.hover(screen.getByRole('button', { name: 'mark' }));
    await waitFor(() => {
      expect(bubble()).not.toBeNull();
    });
    const line = bubble()?.querySelector('.mdt-chart-tip');
    expect(line).toHaveTextContent('Linux · 412 agents');
    expect(bubble()?.style.maxWidth).toBe('320px');
  });
});

describe('ColumnChart', () => {
  it('draws one column per group with its count above and its label under, scaled to the biggest', () => {
    const { container } = render(<ColumnChart cols={SILENT} />);
    const cols = container.querySelectorAll<HTMLButtonElement>('.mdt-chart-col');
    expect(cols).toHaveLength(5);
    expect([...cols].map((c) => c.textContent)).toEqual(['0', '4', '10', '18', '0']);
    expect(
      [...container.querySelectorAll('.mdt-chart-cols-x span')].map((s) => s.textContent)
    ).toEqual(['Under 1h', '1–6h', '6–24h', '1–2 days', 'Over 2 days']);
    const bars = container.querySelectorAll<HTMLElement>('.mdt-chart-col__b');
    /* the column's share of the room left under its count (jsdom writes the calc() factor first) */
    expect(bars[3]?.style.height).toMatch(/^calc\(1 \* \(100% - 24px\)\)$/);
    expect(bars[2]?.style.height).toMatch(/0\.556/);
    expect(bars[0]?.style.height).toMatch(/^calc\(0 \* /);
  });

  it('a zero column is disabled and its count is quiet', () => {
    const { container } = render(<ColumnChart cols={SILENT} />);
    const cols = container.querySelectorAll<HTMLButtonElement>('.mdt-chart-col');
    expect(cols[0]).toBeDisabled();
    expect(cols[0]?.querySelector('.mdt-chart-col__n')).toHaveAttribute('data-zero', '');
    expect(cols[1]).toBeEnabled();
    expect(cols[1]?.querySelector('.mdt-chart-col__n')).not.toHaveAttribute('data-zero');
  });

  it('each column wears its own tone, else the chart tone (the blue by default)', () => {
    const { container, rerender } = render(
      <ColumnChart cols={[{ label: 'A', n: 2, tip: 'A · 2' }, ...SILENT.slice(3, 4)]} />
    );
    const tones = () =>
      [...container.querySelectorAll('.mdt-chart-col__b')].map((b) => b.getAttribute('data-tone'));
    expect(tones()).toEqual(['bar', 'crit']);
    rerender(<ColumnChart tone="crit" cols={[{ label: 'A', n: 2, tip: 'A · 2' }]} />);
    expect(tones()).toEqual(['crit']);
  });

  it('fill fills the card; the marker draws its dashed line before the column it names', () => {
    const { container } = render(
      <ColumnChart fill marker={{ at: 3, label: '1 day' }} cols={SILENT} />
    );
    expect(container.firstChild).toHaveClass('mdt-chart-cols-wrap', 'mdt-chart-cols-wrap--fill');
    const mark = container.querySelector<HTMLElement>('.mdt-chart-cols__mark');
    expect(mark).toHaveTextContent('1 day');
    expect(mark?.style.getPropertyValue('--mdt-chart-mark-at')).toBe('3');
    expect(
      container
        .querySelector<HTMLElement>('.mdt-chart-cols')
        ?.style.getPropertyValue('--mdt-chart-cols-n')
    ).toBe('5');
  });

  it('without fill or a marker it is the plain chart', () => {
    const { container } = render(<ColumnChart cols={SILENT} className="mine" />);
    expect(container.firstChild).not.toHaveClass('mdt-chart-cols-wrap--fill');
    expect(container.firstChild).toHaveClass('mine');
    expect(container.querySelector('.mdt-chart-cols__mark')).toBeNull();
  });

  it('a click opens the column; the hover is the one line', async () => {
    const onPick = vi.fn();
    render(<ColumnChart cols={[{ ...SILENT[3], onPick } as ColumnChartColumn]} />);
    const col = screen.getByRole('button', { name: '18' });
    await userEvent.hover(col);
    await waitFor(() => {
      expect(bubble()).toHaveTextContent('1–2 days silent · 18 agents');
    });
    await userEvent.click(col);
    expect(onPick).toHaveBeenCalledTimes(1);
  });

  it('every count is whole with thousands separators; an empty chart still draws', () => {
    const { container, rerender } = render(
      <ColumnChart cols={[{ label: 'Big', n: 1979.4, tip: 'Big' }]} />
    );
    expect(container.querySelector('.mdt-chart-col__n')).toHaveTextContent('1,979');
    rerender(<ColumnChart cols={[]} />);
    expect(container.querySelectorAll('.mdt-chart-col')).toHaveLength(0);
  });

  it('forwards its ref to the wrapper', () => {
    const ref = createRef<HTMLDivElement>();
    render(<ColumnChart ref={ref} cols={SILENT} />);
    expect(ref.current).toHaveClass('mdt-chart-cols-wrap');
  });
});
