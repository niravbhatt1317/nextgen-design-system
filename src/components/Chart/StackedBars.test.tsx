import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, type ComponentProps } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { StackedBars } from './StackedBars';
import type { StackedBarsRow, StackedBarsSeries } from './Chart.types';

const bubble = () => document.querySelector<HTMLElement>('.tt');

const SERIES: StackedBarsSeries[] = [
  { key: 'crashing', label: 'Crashing', tone: 'crit' },
  { key: 'degraded', label: 'Degraded', tone: 'warn' },
  { key: 'silent', label: 'Silent', tone: 'quiet' },
  { key: 'healthy', label: 'Healthy', tone: 'good' },
];
const row = (id: string, values: Record<string, number>): StackedBarsRow => ({
  id,
  name: id,
  total: Object.values(values).reduce((s, v) => s + v, 0),
  values,
});
const ROWS = [
  row('Metrics', { crashing: 40, degraded: 63, silent: 32, healthy: 1979 }),
  row('Traces', { crashing: 8, degraded: 33, silent: 21, healthy: 1099 }),
];
/* interaction tests click through the tooltips; a busy machine needs more than the default 5s */
const SLOW = 20_000;
const UNIT = { one: 'agent', many: 'agents' };
const axis = (c: HTMLElement) =>
  [...c.querySelectorAll('.mdt-chart-stack-axis span')].map((s) => s.textContent);
const segs = (c: HTMLElement, r = 0) =>
  [
    ...(c.querySelectorAll('.mdt-chart-stack-track')[r]?.querySelectorAll('.mdt-chart-stack-seg') ??
      []),
  ].map((s) => s.getAttribute('data-key'));

function chart(props: Partial<ComponentProps<typeof StackedBars>> = {}) {
  return (
    <StackedBars
      title={<span>Module health</span>}
      series={SERIES}
      rows={ROWS}
      unit={UNIT}
      onPick={() => undefined}
      {...props}
    />
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('StackedBars', () => {
  it('draws nothing without rows', () => {
    const { container } = render(chart({ rows: [] }));
    expect(container.firstChild).toBeNull();
  });

  it('a card: the title and the legend on its title row, one bar per row, its name and what it is on', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(chart({ ref, className: 'mine' }));
    expect(ref.current).toHaveClass('mdt-rounded-xl', 'mine');
    const head = container.querySelector('.mdt-chart-stack-head');
    expect(head).toHaveTextContent('Module health');
    const legend = screen.getByRole('group', { name: 'Show or hide' });
    expect(
      within(legend)
        .getAllByRole('button')
        .map((b) => b.textContent)
    ).toEqual(['Crashing', 'Degraded', 'Silent', 'Healthy']);
    expect(
      screen.getByRole('button', {
        name: 'Metrics: 40 crashing, 63 degraded, 32 silent, 1,979 healthy, on 2,114 agents. Open its agents.',
      })
    ).toBeInTheDocument();
    expect(container.querySelector('.mdt-chart-stack-nm__s')).toHaveTextContent('on 2,114 agents');
    expect(segs(container)).toEqual(['crashing', 'degraded', 'silent', 'healthy']);
    expect(container.querySelector('.mdt-chart-stack-cap')).toHaveTextContent('Agents');
  });

  it('a segment is as long as its count on the scale; the scale ends on a step past the longest bar', () => {
    const { container } = render(chart());
    expect(axis(container)).toEqual([
      '0',
      '250',
      '500',
      '750',
      '1,000',
      '1,250',
      '1,500',
      '1,750',
      '2,000',
      '2,250',
    ]);
    const first = container.querySelector<HTMLElement>('.mdt-chart-stack-seg');
    expect(Number.parseFloat(first?.style.width ?? '')).toBeCloseTo((40 / 2250) * 100, 3);
    const edges = [...container.querySelectorAll('.mdt-chart-stack-axis span')].map((s) =>
      s.getAttribute('data-edge')
    );
    expect(edges[0]).toBe('first');
    expect(edges[edges.length - 1]).toBe('last');
    expect(edges[1]).toBeNull();
  });

  it('small totals start on a small step: 14 ends at 15, 3 at 3', () => {
    const { container, rerender } = render(
      chart({ rows: [row('Ingestion', { crashing: 0, degraded: 2, silent: 1, healthy: 11 })] })
    );
    expect(axis(container)).toEqual(['0', '5', '10', '15']);
    rerender(chart({ rows: [row('Flow', { crashing: 0, degraded: 2, silent: 0, healthy: 1 })] }));
    expect(axis(container)).toEqual(['0', '1', '2', '3']);
    rerender(chart({ rows: [row('Mid', { healthy: 300 })] }));
    expect(axis(container)).toEqual([
      '0',
      '25',
      '50',
      '75',
      '100',
      '125',
      '150',
      '175',
      '200',
      '225',
      '250',
      '275',
      '300',
    ]);
    rerender(chart({ rows: [row('Big', { healthy: 600 })] }));
    expect(axis(container)[1]).toBe('100');
    rerender(chart({ rows: [row('Some', { healthy: 50 })] }));
    expect(axis(container)[1]).toBe('10');
  });

  it('measured, a segment keeps its number only when it fits, and the step widens so numbers clear', () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement
    ) {
      return { width: this.classList.contains('mdt-chart-stack-track') ? 400 : 0 } as DOMRect;
    });
    const { container } = render(chart());
    expect(axis(container)).toEqual(['0', '500', '1,000', '1,500', '2,000', '2,500']);
    const tiny = [...container.querySelectorAll('.mdt-chart-stack-seg')].map((s) =>
      s.hasAttribute('data-tiny')
    );
    expect(tiny.slice(0, 4)).toEqual([true, true, true, false]);
  });

  it(
    'the legend hides and shows a colour, the scale follows, and the last colour stays on',
    async () => {
      const { container } = render(
        chart({ rows: [row('A', { crashing: 1, degraded: 0, silent: 0, healthy: 9 })] })
      );
      const legend = screen.getByRole('group', { name: 'Show or hide' });
      const key = (name: string) => within(legend).getByRole('button', { name });
      expect(segs(container)).toEqual(['crashing', 'healthy']);
      await userEvent.click(key('Healthy'));
      expect(key('Healthy')).toHaveAttribute('aria-pressed', 'false');
      expect(segs(container)).toEqual(['crashing']);
      expect(axis(container)).toEqual(['0', '1']);
      for (const name of ['Crashing', 'Degraded', 'Silent']) await userEvent.click(key(name));
      expect(key('Silent')).toHaveAttribute('aria-pressed', 'true');
      expect(key('Degraded')).toHaveAttribute('aria-pressed', 'false');
      await userEvent.click(key('Healthy'));
      expect(key('Healthy')).toHaveAttribute('aria-pressed', 'true');
      expect(segs(container)).toEqual(['healthy']);
    },
    SLOW
  );

  it(
    'a click on a row hands back "all"; on one colour, that colour',
    async () => {
      const onPick = vi.fn();
      const { container } = render(chart({ onPick }));
      await userEvent.click(container.querySelector('.mdt-chart-stack-nm') as HTMLElement);
      expect(onPick).toHaveBeenLastCalledWith(ROWS[0], 'all');
      await userEvent.click(container.querySelectorAll('.mdt-chart-stack-seg')[1] as HTMLElement);
      expect(onPick).toHaveBeenLastCalledWith(ROWS[0], 'degraded');
    },
    SLOW
  );

  it(
    'a segment hover is the one line, singular at one',
    async () => {
      const { container } = render(
        chart({
          rows: [row('Discovery', { crashing: 1, healthy: 6 })],
          unit: { one: 'collector', many: 'collectors' },
        })
      );
      await userEvent.hover(container.querySelector('.mdt-chart-stack-seg') as HTMLElement);
      await waitFor(() => {
        expect(bubble()).toHaveTextContent('Discovery · Crashing · 1 collector');
      });
      expect(container.querySelector('.mdt-chart-stack-nm__s')).toHaveTextContent(
        'on 7 collectors'
      );
    },
    SLOW
  );

  it('the column beside: each row named again, its lead red with a dot when it is the problem', () => {
    const { container } = render(
      chart({
        sideLabel: 'Crashing and restarts per module',
        side: (r) => ({
          lead: `${String(r.values.crashing)} crashing`,
          alert: (r.values.crashing ?? 0) > 10,
          rest: ' · 184 restarts',
        }),
      })
    );
    const list = screen.getByRole('list', { name: 'Crashing and restarts per module' });
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Metrics40 crashing · 184 restarts');
    expect(items[0]?.querySelector('.mdt-chart-stack-lead')).toHaveAttribute('data-bad', '');
    expect(items[1]?.querySelector('.mdt-chart-stack-lead')).not.toHaveAttribute('data-bad');
    expect(container.querySelector('.mdt-chart-stack-split')).not.toHaveClass(
      'mdt-chart-stack-split--solo'
    );
  });

  it('without a column beside, the chart takes the card', () => {
    const { container } = render(chart());
    expect(container.querySelector('.mdt-chart-stack-split')).toHaveClass(
      'mdt-chart-stack-split--solo'
    );
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('holds the caller drawer and stops watching its size when it goes', () => {
    const disconnect = vi.fn();
    const RO = globalThis.ResizeObserver;
    globalThis.ResizeObserver = class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = disconnect;
    } as unknown as typeof ResizeObserver;
    const { unmount } = render(chart({ children: <div>the drawer</div> }));
    expect(screen.getByText('the drawer')).toBeInTheDocument();
    act(() => {
      unmount();
    });
    expect(disconnect).toHaveBeenCalled();
    globalThis.ResizeObserver = RO;
  });
});
