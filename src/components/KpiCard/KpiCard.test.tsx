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

/* Pranjal, 2026-10-15, on the two-column settings pages: "use smaller text so that it doesnt get that much
 * attention just enough to show its there". */
describe('KpiCard size', () => {
  const card = (container: HTMLElement) => container.firstElementChild as HTMLElement;

  it('draws the 24px figure by default', () => {
    const { container } = render(<KpiCard label="Total users" value={8200} />);
    expect(card(container)).toHaveAttribute('data-size', 'md');
    expect(screen.getByText('8.2k')).toHaveClass('mdt-text-2xl', 'mdt-font-medium');
    expect(screen.getByText('8.2k')).not.toHaveClass('mdt-text-base', 'mdt-font-semibold');
  });

  it('sm steps the number down to 16/24 at 600 and leaves the label and hint alone', () => {
    const { container } = render(
      <KpiCard size="sm" label="Sites" value={12} hint="across three regions" />
    );
    expect(card(container)).toHaveAttribute('data-size', 'sm');
    const value = screen.getByText('12');
    expect(value).toHaveClass('kpi-value', 'mdt-text-base', 'mdt-leading-6', 'mdt-font-semibold');
    expect(value).not.toHaveClass('mdt-text-2xl', 'mdt-font-medium');
    expect(screen.getByText('Sites')).toHaveClass('mdt-text-xs');
    expect(screen.getByText('across three regions')).toHaveClass('mdt-text-xs');
  });

  it('sm reaches every segment of a group', () => {
    render(
      <KpiCard
        size="sm"
        label="Structure"
        items={[
          { label: 'Sites', value: 12 },
          { label: 'Departments', value: 48 },
        ]}
      />
    );
    expect(screen.getByRole('group', { name: 'Structure' })).toHaveAttribute('data-size', 'sm');
    expect(screen.getByText('12')).toHaveClass('mdt-text-base');
    expect(screen.getByText('48')).toHaveClass('mdt-text-base');
  });

  it('a card holding a chart keeps the 24px figure, on every segment', () => {
    const { container } = render(
      <KpiCard
        size="sm"
        label="Capacity"
        items={[
          { label: 'Active users', value: 7640 },
          { label: 'Licensed', value: 8200, chart: <KpiGauge percent={82} caption="capacity" /> },
        ]}
      />
    );
    expect(card(container)).toHaveAttribute('data-size', 'md');
    expect(screen.getByText('7.6k')).toHaveClass('mdt-text-2xl');
    expect(screen.getByText('8.2k')).toHaveClass('mdt-text-2xl');
  });
});

/* Ronak, 2026-10-27: the drawers' grey facts card as a variant of the library card, not a hand-styled one. */
describe('KpiCard variant', () => {
  const card = (container: HTMLElement) => container.firstElementChild as HTMLElement;

  it('is outlined by default: the card ground inside the neutral-30 hairline', () => {
    const { container } = render(<KpiCard label="Total users" value={8200} />);
    expect(card(container)).toHaveAttribute('data-variant', 'outlined');
    expect(card(container)).toHaveClass('mdt-border', 'mdt-border-neutral-30', 'mdt-bg-card');
    expect(card(container)).not.toHaveClass('mdt-bg-neutral-10');
  });

  it('filled draws the neutral-10 ground with no edge and keeps the corners and the floor', () => {
    const { container } = render(
      <KpiCard variant="filled" label="Total users" value={8200} hint="across all organisations" />
    );
    const c = card(container);
    expect(c).toHaveAttribute('data-variant', 'filled');
    expect(c).toHaveClass('mdt-bg-neutral-10', 'mdt-border-0', 'mdt-rounded-xl');
    expect(c).not.toHaveClass('mdt-border-neutral-30', 'mdt-bg-card');
    expect(c.style.minWidth).toBe(`${String(KPI_FLOOR)}px`);
    expect(screen.getByText('8.2k')).toHaveClass('mdt-text-2xl');
  });

  it('filled reaches a group, and a clickable segment keeps its switch', async () => {
    const onClick = vi.fn();
    const { container } = render(
      <KpiCard
        variant="filled"
        label="Yield"
        items={[
          { label: 'Targets', value: 1180, onClick },
          { label: 'Discovered', value: 402 },
        ]}
      />
    );
    expect(screen.getByRole('group', { name: 'Yield' })).toHaveAttribute('data-variant', 'filled');
    expect(container.querySelectorAll('.kpi-seg')).toHaveLength(2);
    await userEvent.click(screen.getByRole('button', { name: /Targets/ }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

/* Pranjal, 2026-09-30: "why is there this empty space in the kpi card in the bottom"; Ronak, 2026-10-17: four text
 * segments stood 696 wide in a 680 drawer. The console's adapter sized these from outside; the card does it now. */
describe('KpiCard text segment', () => {
  const line = (text: string) => <span>{text}</span>;

  it('a node with nothing else on the segment drops the 98 floor and the 174 width floor', () => {
    const { container } = render(
      <KpiCard
        variant="filled"
        label="Facts"
        items={[
          { label: 'Type', value: line('SNMP v2c') },
          { label: 'Status', value: line('Active') },
        ]}
      />
    );
    const card = container.firstElementChild as HTMLElement;
    expect(card.style.minWidth).toBe('0px');
    expect(card.style.width).toBe(`${String(KPI_FLOOR * 2)}px`);
    const segs = [...container.querySelectorAll<HTMLElement>('.kpi-seg')];
    expect(segs).toHaveLength(2);
    for (const s of segs) {
      expect(s).not.toHaveClass('mdt-min-h-[98px]');
      expect(s.style.minWidth).toBe('0px');
    }
  });

  it('a number, a string, or a hint keeps both floors, so rows still line up', () => {
    const { container } = render(
      <KpiCard
        items={[
          { label: 'Targets', value: 1180 },
          { label: 'Coverage', value: '34%' },
          { label: 'Type', value: line('SNMP v2c'), hint: 'read-only' },
        ]}
      />
    );
    const card = container.firstElementChild as HTMLElement;
    expect(card.style.minWidth).toBe(`${String(KPI_FLOOR * 3)}px`);
    for (const s of container.querySelectorAll('.kpi-seg')) {
      expect(s).toHaveClass('mdt-min-h-[98px]');
    }
  });

  it('a single text card has no floor either', () => {
    const { container } = render(<KpiCard label="Type" value={line('SNMP v2c')} />);
    const card = container.firstElementChild as HTMLElement;
    expect(card.style.minWidth).toBe('0px');
    expect(container.querySelector('.kpi-seg')).not.toHaveClass('mdt-min-h-[98px]');
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

describe('KpiGauge tone and target (the console status gauge)', () => {
  it('a tone paints the half gauge in its status colour and keeps one decimal', () => {
    const { container } = render(<KpiGauge percent={96.44} caption="sending data" tone="warn" />);
    const svg = screen.getByRole('img', { name: '96.4% sending data' });
    expect(svg).toHaveAttribute('data-tone', 'warn');
    expect(container.querySelector('.kpi-gauge-number')).toHaveTextContent('96.4%');
    expect(container.querySelector('.kpi-gauge-tick')).toBeNull();
  });

  it('a toned gauge keeps its dot at 0% and never closes the arc at 100%', () => {
    const { container, rerender } = render(<KpiGauge percent={0} tone="crit" caption="up" />);
    const fill = () => container.querySelector('.kpi-gauge-fill');
    expect(fill()).not.toBeNull();
    expect(fill()?.getAttribute('d')).not.toBe('M8 56 A44 44 0 0 1 8.00 56.00');
    rerender(<KpiGauge percent={100} tone="good" caption="up" />);
    expect(fill()?.getAttribute('d')).not.toBe('M8 56 A44 44 0 0 1 96.00 56.00');
    rerender(<KpiGauge percent={0} caption="up" />);
    expect(fill()).toBeNull();
  });

  it('a target draws the "good at" tick across the band and says it', () => {
    const { container } = render(
      <KpiGauge percent={82} caption="capacity" tone="good" target={50} />
    );
    expect(
      screen.getByRole('img', { name: '82% capacity, good at 50% or more' })
    ).toBeInTheDocument();
    const tick = container.querySelector('.kpi-gauge-tick');
    expect(tick).toHaveAttribute('x1', '52.00');
    expect(tick).toHaveAttribute('y1', '19.00');
    expect(tick).toHaveAttribute('y2', '5.00');
    expect(tick).toHaveAttribute('stroke-width', '2');
  });

  it('a neutral gauge can carry a target too; a label overrides what is said', () => {
    render(<KpiGauge percent={40} target={80} label="Licences in use" />);
    expect(screen.getByRole('img', { name: 'Licences in use' })).not.toHaveAttribute('data-tone');
  });

  it('the ring ignores a tone and keeps its rounded figure', () => {
    render(<KpiGauge shape="ring" percent={66.6} tone="good" caption="health" />);
    expect(screen.getByRole('img', { name: '67% health' })).toBeInTheDocument();
  });
});

describe('KpiGauge shape="zones" (the console Health headline gauge)', () => {
  const ZONES = [
    { from: 90, to: 96, tone: 'crit' as const, word: 'Low' },
    { from: 96, to: 98, tone: 'warn' as const, word: 'Below target' },
    { from: 98, to: 100, tone: 'good' as const, word: 'On target' },
  ];

  it('draws on 120 × 76 shown at 104 × 62: the zones, the dot, the value, its word and the ends', () => {
    const { container } = render(
      <KpiGauge shape="zones" percent={98.46} min={90} zones={ZONES} caption="sending data" />
    );
    const svg = screen.getByRole('img', { name: '98.5% sending data: On target' });
    expect(svg).toHaveClass('kpi-zones');
    expect(svg).toHaveAttribute('width', '104');
    expect(svg).toHaveAttribute('height', '62');
    expect(svg).toHaveAttribute('viewBox', '0 6 120 71.5');
    const zones = container.querySelectorAll('.kpi-zones-zone');
    expect([...zones].map((z) => z.getAttribute('data-tone'))).toEqual(['crit', 'warn', 'good']);
    expect(zones[0]).toHaveAttribute('stroke-width', '9');
    expect(zones[0]).toHaveAttribute('d', 'M16.00 56.00 A44 44 0 0 1 73.60 14.15');
    const dot = container.querySelector('.kpi-zones-dot');
    expect(dot).toHaveAttribute('data-tone', 'good');
    expect(dot).toHaveAttribute('r', '6.5');
    expect(container.querySelector('.kpi-zones-number')).toHaveTextContent('98.5%');
    const word = container.querySelector('.kpi-zones-word');
    expect(word).toHaveTextContent('On target');
    expect(word).toHaveAttribute('data-tone', 'good');
    expect([...container.querySelectorAll('.kpi-zones-end')].map((e) => e.textContent)).toEqual([
      '90%',
      '100%',
    ]);
  });

  it('a value on a shared edge reads as the first zone that holds it; off the scale it sits at the end', () => {
    const { container, rerender } = render(
      <KpiGauge shape="zones" percent={96} min={90} zones={ZONES} caption="working normally" />
    );
    expect(screen.getByRole('img', { name: '96% working normally: Low' })).toBeInTheDocument();
    rerender(<KpiGauge shape="zones" percent={40} min={90} zones={ZONES} caption="x" />);
    expect(screen.getByRole('img', { name: '40% x: Low' })).toBeInTheDocument();
    expect(container.querySelector('.kpi-zones-dot')).toHaveAttribute('cx', '16.00');
  });

  it('starts at 0 and ends at 100 by default; without zones it is the bare dot and number', () => {
    const { container } = render(<KpiGauge shape="zones" percent={50.94} caption="on 7.4.0" />);
    expect(screen.getByRole('img', { name: '50.9% on 7.4.0' })).toBeInTheDocument();
    expect(container.querySelectorAll('.kpi-zones-zone')).toHaveLength(0);
    expect(container.querySelector('.kpi-zones-dot')).not.toHaveAttribute('data-tone');
    expect([...container.querySelectorAll('.kpi-zones-end')].map((e) => e.textContent)).toEqual([
      '0%',
      '100%',
    ]);
  });

  it('a label overrides what it says; a flat scale does not divide by zero', () => {
    const { container } = render(
      <KpiGauge shape="zones" percent={5} min={5} max={5} zones={ZONES} label="Flat" />
    );
    expect(screen.getByRole('img', { name: 'Flat' })).toBeInTheDocument();
    expect(container.querySelector('.kpi-zones-dot')).toHaveAttribute('cx', '16.00');
  });
});
