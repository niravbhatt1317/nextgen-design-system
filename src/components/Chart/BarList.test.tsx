import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { BarList } from './BarList';
import type { BarListRow } from './Chart.types';

const bubble = () => document.querySelector<HTMLElement>('.tt');

const VERSIONS: BarListRow[] = [
  { label: '7.4.0', n: 1086, current: true, tip: '7.4.0 · 1,086 agents' },
  { label: '7.3.2', n: 702, tip: '7.3.2 · 702 agents' },
  { label: '7.2.9', n: 346, tip: '7.2.9 · 346 agents' },
  { label: '7.1.0', n: 0, tone: 'quiet', tip: '7.1.0 · 0 agents' },
];

describe('BarList', () => {
  it('no rows reads "Nothing in this scope."', () => {
    const ref = createRef<HTMLDivElement>();
    render(<BarList ref={ref} rows={[]} className="mine" />);
    expect(screen.getByText('Nothing in this scope.')).toHaveClass('mdt-chart-note', 'mine');
    expect(ref.current).toHaveTextContent('Nothing in this scope.');
  });

  it('one row per group: the bar scaled to the biggest, the count and its share of the total', () => {
    const { container } = render(<BarList rows={VERSIONS} />);
    const rows = container.querySelectorAll('.mdt-chart-bar');
    expect(rows).toHaveLength(4);
    const bars = container.querySelectorAll<HTMLElement>('.mdt-chart-bar__b');
    expect(bars[0]?.style.width).toBe('100%');
    expect(Number.parseFloat(bars[1]?.style.width ?? '')).toBeCloseTo(64.64, 1);
    expect(rows[0]?.querySelector('.mdt-chart-bar__v')).toHaveTextContent('1,08650.9%');
    expect(rows[1]?.querySelector('.mdt-chart-bar__v .mdt-chart-note')).toHaveTextContent('32.9%');
  });

  it('the current row is green with a quiet "current"; a tone colours its bar; a zero bar is marked', () => {
    const { container } = render(<BarList rows={VERSIONS} />);
    const bars = container.querySelectorAll('.mdt-chart-bar__b');
    expect(bars[0]).toHaveAttribute('data-current', '');
    expect(container.querySelector('.mdt-chart-bar__l')).toHaveTextContent('7.4.0 current');
    expect(bars[1]).not.toHaveAttribute('data-current');
    expect(bars[3]).toHaveAttribute('data-tone', 'quiet');
    expect(bars[3]).toHaveAttribute('data-zero', '');
    expect(bars[1]).not.toHaveAttribute('data-zero');
  });

  it('track lays the pale track under every bar', () => {
    const { container, rerender } = render(<BarList rows={VERSIONS} />);
    expect(container.firstChild).not.toHaveClass('mdt-chart-bars--track');
    rerender(<BarList rows={VERSIONS} track />);
    expect(container.firstChild).toHaveClass('mdt-chart-bars', 'mdt-chart-bars--track');
  });

  it('a click opens the row; the hover is the one line', async () => {
    const onPick = vi.fn();
    render(<BarList rows={[{ label: 'Linux', n: 412, tip: 'Linux · 412 agents', onPick }]} />);
    const row = screen.getByRole('button');
    await userEvent.hover(row);
    await waitFor(() => {
      expect(bubble()).toHaveTextContent('Linux · 412 agents');
    });
    await userEvent.click(row);
    expect(onPick).toHaveBeenCalledTimes(1);
  });

  it('all-zero rows draw without dividing by zero', () => {
    const { container } = render(<BarList rows={[{ label: 'None', n: 0, tip: 'None · 0' }]} />);
    expect(container.querySelector<HTMLElement>('.mdt-chart-bar__b')?.style.width).toBe('0%');
    expect(container.querySelector('.mdt-chart-bar__v')).toHaveTextContent('00%');
  });
});
