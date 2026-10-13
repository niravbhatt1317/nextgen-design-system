import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { KPI_CHART_WIDTH, KPI_FLOOR, KpiCard, formatKpiValue } from './KpiCard';
import { KpiBars, KpiGauge } from './KpiCharts';
import { KpiStrip } from './KpiStrip';

describe('formatKpiValue', () => {
  it('rounds to one decimal with k or M, the console way', () => {
    expect(formatKpiValue(256)).toBe('256');
    expect(formatKpiValue(1204)).toBe('1.2k');
    expect(formatKpiValue(7640)).toBe('7.6k');
    expect(formatKpiValue(8200)).toBe('8.2k');
    expect(formatKpiValue(10001)).toBe('10k');
    expect(formatKpiValue(2500000)).toBe('2.5M');
  });
});

describe('KpiCard', () => {
  it('shows the label, the rounded number and the supporting line at the 174 floor', () => {
    const { container } = render(
      <KpiCard label="Total users" value={8200} hint="across all organisations" />
    );
    expect(screen.getByText('Total users')).toBeInTheDocument();
    expect(screen.getByText('8.2k')).toBeInTheDocument();
    expect(screen.getByText('across all organisations')).toBeInTheDocument();
    const card = container.firstElementChild as HTMLElement;
    expect(card.style.width).toBe(`${String(KPI_FLOOR)}px`);
    expect(card.style.minWidth).toBe(`${String(KPI_FLOOR)}px`);
    expect(card.style.maxWidth).toBe('');
    expect(card).toHaveClass('mdt-rounded-xl', 'mdt-border-neutral-30');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('carries the trend as a Badge that speaks its direction', () => {
    render(
      <KpiCard
        label="Privileged accounts"
        value={12}
        delta={{ label: '4.5%', direction: 'up', tone: 'caution' }}
      />
    );
    const chip = screen.getByLabelText('up 4.5%');
    expect(chip).toHaveTextContent('4.5%');
    expect(chip.querySelector('svg')).not.toBeNull();
  });

  it('with a chart it has no floor, starts at 270 and pins the chart to the right', () => {
    const { container } = render(
      <KpiCard
        label="Licensed users limit"
        value={8200}
        hint="10k allowed"
        chart={<KpiGauge percent={82} caption="capacity" />}
      />
    );
    const card = container.firstElementChild as HTMLElement;
    expect(card.style.width).toBe(`${String(KPI_CHART_WIDTH)}px`);
    expect(card.style.minWidth).toBe('0px');
    expect(screen.getByRole('img', { name: '82% capacity' })).toBeInTheDocument();
    expect(container.querySelector('.kpi-chart')).not.toBeNull();
  });

  it('becomes a button with the cue when given a click, and stays a plain card otherwise', async () => {
    const onClick = vi.fn();
    const { container } = render(<KpiCard label="Pending invites" value={11} onClick={onClick} />);
    const button = screen.getByRole('button', { name: /Pending invites/ });
    expect(button).toHaveClass('kpi-btn');
    expect(container.querySelector('.kpi-gear')).not.toBeNull();
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('as a group it is one named surface with a segment per metric, the sum of their floors wide', () => {
    const { container } = render(
      <KpiCard
        label="Invitations"
        items={[
          { label: 'Pending invites', value: 11 },
          { label: 'Active invitation links', value: 4 },
          { label: 'Licensed users limit', value: 8200, chart: <KpiGauge percent={82} /> },
        ]}
      />
    );
    const group = screen.getByRole('group', { name: 'Invitations' });
    expect(container.querySelectorAll('.kpi-seg')).toHaveLength(3);
    expect(group.style.width).toBe(`${String(KPI_FLOOR * 2 + KPI_CHART_WIDTH)}px`);
    expect(group.style.minWidth).toBe(`${String(KPI_FLOOR * 2)}px`);
    expect(group.style.getPropertyValue('--kpi-grow')).toBe('3');
  });

  it('lets each segment carry its own click', async () => {
    const first = vi.fn();
    render(
      <KpiCard
        items={[
          { label: 'Pending invites', value: 11, onClick: first },
          { label: 'Expired links', value: 2 },
        ]}
      />
    );
    expect(screen.getAllByRole('button')).toHaveLength(1);
    await userEvent.click(screen.getByRole('button', { name: /Pending invites/ }));
    expect(first).toHaveBeenCalledTimes(1);
  });
});

describe('KpiStrip', () => {
  it('is a named, keyboard-reachable row that bleeds through the page inset', () => {
    render(
      <KpiStrip label="Key figures" inset={32} gap={16}>
        <KpiCard label="Total users" value={8200} />
      </KpiStrip>
    );
    const strip = screen.getByRole('region', { name: 'Key figures' });
    expect(strip).toHaveAttribute('tabindex', '0');
    expect(strip.style.marginInline).toBe('-32px');
    expect(strip.style.paddingInline).toBe('32px');
    expect(strip.style.gap).toBe('16px');
    expect(strip).not.toHaveClass('kpi-strip-snap');
  });

  it('can snap to cards', () => {
    render(
      <KpiStrip label="Key figures" snap>
        <KpiCard label="Total users" value={8200} />
      </KpiStrip>
    );
    expect(screen.getByRole('region', { name: 'Key figures' })).toHaveClass('kpi-strip-snap');
  });
});

describe('charts', () => {
  it('the bars describe themselves', () => {
    render(<KpiBars values={[56, 44, 32, 38, 26, 34]} base={22} threshold={40} />);
    expect(
      screen.getByRole('img', { name: '34 now, base 22, 2x threshold 40' })
    ).toBeInTheDocument();
  });

  it('the gauge is the half gauge by default', () => {
    const { container } = render(<KpiGauge percent={82} caption="capacity" />);
    const svg = screen.getByRole('img', { name: '82% capacity' });
    expect(svg).toHaveClass('kpi-gauge');
    expect(svg).toHaveAttribute('width', '104');
    expect(container.querySelector('.kpi-ring')).toBeNull();
  });
});

describe('KpiGauge shape="ring"', () => {
  it('draws the console health ring: 150 square, radius 58, a 10px rounded fill from twelve o’clock', () => {
    const { container } = render(
      <KpiGauge shape="ring" percent={50} label="Configuration health 50%" />
    );
    const svg = screen.getByRole('img', { name: 'Configuration health 50%' });
    expect(svg).toHaveClass('kpi-ring');
    expect(svg).toHaveAttribute('width', '150');
    expect(svg).toHaveAttribute('viewBox', '-5 -5 150 150');
    expect(svg).not.toHaveAttribute('data-bad');
    expect(svg).not.toHaveAttribute('data-done');
    const track = container.querySelector('.kpi-ring-track');
    expect(track).toHaveAttribute('r', '58');
    expect(track).toHaveAttribute('stroke-width', '10');
    const fill = container.querySelector('.kpi-ring-fill');
    expect(fill).toHaveAttribute('stroke-linecap', 'round');
    expect(fill).toHaveAttribute('transform', 'rotate(-90 70 70)');
    const c = 2 * Math.PI * 58;
    expect(fill).toHaveAttribute('stroke-dasharray', `${(c / 2).toFixed(1)} ${c.toFixed(1)}`);
    expect(container.querySelector('.kpi-ring-halo')).toBeNull();
    expect(container.querySelector('.kpi-ring-number')).toHaveTextContent('50%');
  });

  it('at 100% the fill is one closed circle and the thin outer ring appears', () => {
    const { container } = render(<KpiGauge shape="ring" percent={100} />);
    const svg = screen.getByRole('img', { name: '100%' });
    expect(svg).toHaveAttribute('data-done', '');
    const fill = container.querySelector('.kpi-ring-fill');
    expect(fill).not.toHaveAttribute('stroke-dasharray');
    expect(fill).not.toHaveAttribute('stroke-linecap');
    const halo = container.querySelector('.kpi-ring-halo');
    expect(halo).toHaveAttribute('r', '71');
    expect(halo).toHaveAttribute('stroke-width', '2');
  });

  it('at 0% shows only the track; bad turns the fill to the danger colour', () => {
    const { container, rerender } = render(<KpiGauge shape="ring" percent={0} />);
    expect(container.querySelector('.kpi-ring-fill')).toBeNull();
    expect(container.querySelector('.kpi-ring-track')).not.toBeNull();
    rerender(<KpiGauge shape="ring" percent={25} bad />);
    expect(screen.getByRole('img')).toHaveAttribute('data-bad', '');
  });

  it('speaks the rounded figure and draws no caption', () => {
    const { container } = render(<KpiGauge shape="ring" percent={66.6} caption="health" />);
    expect(screen.getByRole('img', { name: '67% health' })).toBeInTheDocument();
    // the ring draws no caption; it is spoken only
    expect(container.querySelectorAll('text')).toHaveLength(1);
  });
});
