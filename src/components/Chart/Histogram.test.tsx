import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Histogram } from './Histogram';

const bubble = () => document.querySelector<HTMLElement>('.tt');
const heights = (c: HTMLElement) =>
  [...c.querySelectorAll('.mdt-chart-histo__bin')].map(
    (b) => b.querySelector<HTMLElement>('.mdt-chart-histo__b')?.style.height ?? null
  );

/* a budget of 10: bars are 1 wide; 2.5 sits in 2–3, 10 (on the budget) stays left of the line, 10.5 goes right */
/* interaction tests click through the tooltips; a busy machine needs more than the default 5s */
const SLOW = 20_000;
const VALS = [0.2, 2.5, 2.7, 9.99, 10, 10.5, 12];

describe('Histogram', () => {
  it('one bar per tenth of the budget; the scale ends at 1.25 × the budget, the budget on a bar edge', () => {
    const { container } = render(<Histogram vals={VALS} budget={10} unit="%" />);
    const bins = container.querySelectorAll('.mdt-chart-histo__bin');
    expect(bins).toHaveLength(13);
    expect(container.querySelector<HTMLElement>('.mdt-chart-histo__budget')?.style.left).toMatch(
      /^76\.92/
    );
    expect(
      [...container.querySelectorAll('.mdt-chart-axis span')].map((s) => s.textContent)
    ).toEqual(['0', '13 %']);
    expect(container.querySelector('.mdt-chart-histo__budget-l')).toHaveTextContent('Budget 10 %');
  });

  it('a reading on the budget stays left of the line; anything over it is right of it, red', () => {
    const { container } = render(<Histogram vals={VALS} budget={10} unit="%" />);
    const h = heights(container);
    expect(h[0]).toBe('50%');
    expect(h[2]).toBe('100%');
    expect(h[9]).toBe('100%');
    expect(h[10]).toBe('50%');
    expect(h[12]).toBe('50%');
    expect(h[1]).toBeNull();
    const bars = container.querySelectorAll('.mdt-chart-histo__b');
    expect(bars[0]).not.toHaveAttribute('data-over');
    expect(container.querySelectorAll('.mdt-chart-histo__b[data-over]')).toHaveLength(2);
  });

  it('the count scale is a round number; the side reads it, the middle and 0', () => {
    const many = Array.from({ length: 7 }, () => 1);
    const { container } = render(<Histogram vals={many} budget={10} unit="%" />);
    expect(
      [...container.querySelectorAll('.mdt-chart-histo__y')].map((s) => s.textContent)
    ).toEqual(['8', '4', '0']);
    expect(container.querySelectorAll('.mdt-chart-histo__grid')).toHaveLength(2);
  });

  it('the scale reaches past the last reading; the budget label flips sides past 62%', () => {
    const { container, rerender } = render(<Histogram vals={[1, 17]} budget={10} unit="MB" />);
    expect(container.querySelectorAll('.mdt-chart-histo__bin')).toHaveLength(17);
    const label = () => container.querySelector<HTMLElement>('.mdt-chart-histo__budget-l');
    expect(label()?.style.left).toMatch(/^58\.8/);
    expect(label()?.style.paddingLeft).toBe('4px');
    rerender(<Histogram vals={[1, 2]} budget={10} unit="MB" />);
    expect(label()?.style.right).toMatch(/^23\.0/);
    expect(label()?.style.paddingRight).toBe('4px');
  });

  it(
    'without onPick each bar is a focusable span with its one line, singular at one',
    async () => {
      const { container } = render(<Histogram vals={[0.2, 2.5, 2.7]} budget={10} unit="%" />);
      const bins = container.querySelectorAll<HTMLElement>('.mdt-chart-histo__bin');
      expect(bins[0]?.tagName).toBe('SPAN');
      expect(bins[0]).toHaveAttribute('tabindex', '0');
      await userEvent.hover(bins[0] as HTMLElement);
      await waitFor(() => {
        expect(bubble()).toHaveTextContent('0–1 % · 1 host');
      });
      await userEvent.unhover(bins[0] as HTMLElement);
      await userEvent.hover(bins[2] as HTMLElement);
      await waitFor(() => {
        expect(bubble()).toHaveTextContent('2–3 % · 2 hosts');
      });
    },
    SLOW
  );

  it(
    'with onPick every bar with members is a button handing back its readings and range',
    async () => {
      const onPick = vi.fn();
      const ref = createRef<HTMLDivElement>();
      render(
        <Histogram ref={ref} vals={VALS} budget={10} unit="%" onPick={onPick} className="mine" />
      );
      expect(ref.current).toHaveClass('mdt-chart-histo-wrap', 'mine');
      expect(screen.getByRole('button', { name: '1–2 %: 0 hosts' })).toBeDisabled();
      await userEvent.click(screen.getByRole('button', { name: '2–3 %: 2 hosts' }));
      expect(onPick).toHaveBeenCalledWith([1, 2], '2–3 %');
      await userEvent.click(screen.getByRole('button', { name: '9–10 %: 2 hosts' }));
      expect(onPick).toHaveBeenLastCalledWith([3, 4], '9–10 %');
    },
    SLOW
  );

  it('takes its own noun and number format', () => {
    render(
      <Histogram
        vals={[100, 300]}
        budget={350}
        unit="MB"
        noun={{ one: 'collector', many: 'collectors' }}
        format={(n) => Math.round(n).toLocaleString('en-US')}
        onPick={() => undefined}
      />
    );
    expect(screen.getByRole('button', { name: '70–105 MB: 1 collector' })).toBeEnabled();
    expect(screen.getByText('455 MB')).toBeInTheDocument();
  });
});
