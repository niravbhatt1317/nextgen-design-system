import { forwardRef, useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import { cn } from '@/utils';
import { Card, CardBody, CardHeader } from '../Card';
import { ChartTip } from './ChartTip';
import { formatCount, nounFor } from './chartFormat';
import type {
  StackedBarsProps,
  StackedBarsRow,
  StackedBarsSeries,
  StackedBarsSide,
} from './Chart.types';
import './chart.css';

/* the number axis's steps: a round step, the end on a step just past the longest bar */
const STEPS = [1, 2, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000];
/* on a narrow chart the step grows until its numbers stand at least this far apart, so no two of them touch */
const MIN_TICK_GAP = 56;
/* a segment shows its number only when the number fits: about 7.5 per digit plus 8 of room */
const DIGIT_W = 7.5;
const DIGIT_ROOM = 8;

/** The first step for a top value: small totals (a few collectors) start on 1 or 5, so 14 ends at 15, not 20. */
function firstStep(top: number) {
  if (top > 1000) return 250;
  if (top > 400) return 100;
  if (top > 100) return 25;
  if (top > 20) return 10;
  return top > 5 ? 5 : 1;
}

/** The scale for what is shown: its end and its ticks, the step widened until the numbers clear each other. */
function scaleOf(rows: StackedBarsRow[], shown: StackedBarsSeries[], width: number) {
  const top = Math.max(
    0,
    ...rows.map((r) => shown.reduce((s, g) => s + (r.values[g.key] ?? 0), 0))
  );
  let i = STEPS.indexOf(firstStep(top));
  const endOf = (step: number) => Math.max(step, Math.ceil(top / step) * step);
  const stepAt = (k: number) => STEPS[k] ?? 1;
  while (width > 0 && i < STEPS.length - 1 && (stepAt(i) / endOf(stepAt(i))) * width < MIN_TICK_GAP)
    i++;
  const step = stepAt(i);
  const max = endOf(step);
  return { max, ticks: Array.from({ length: max / step + 1 }, (_, k) => k * step) };
}

/** The axis number's anchor: the first starts on 0, the last ends on the bar's end, the rest are centred. */
const edgeOf = (i: number, n: number) => {
  if (i === 0) return 'first';
  return i === n - 1 ? 'last' : undefined;
};

/** The line beside a bar: the lead (red with a dot when it is the problem), then the rest. */
function SideRow({ row, side }: { row: StackedBarsRow; side: StackedBarsSide }) {
  return (
    <div className="mdt-chart-stack-side-row" role="listitem">
      <span className="mdt-chart-stack-side-name">{row.name}</span>
      <span className="mdt-chart-stack-side-fig">
        <span className="mdt-chart-stack-lead" data-bad={side.alert ? '' : undefined}>
          {side.lead}
        </span>
        {side.rest}
      </span>
    </div>
  );
}

/**
 * StackedBars - one stacked bar per row on a card, on a shared number axis, with a legend whose colours hide or show
 * themselves and an optional column of figures beside the bars.
 *
 * Ported from the console Health's `ModuleChart` (Module health, both fleets, Pranjal 2026-10-26, the merged Health
 * mock): each row's bar splits into the series' colours (red, amber, grey, green); a click on the row hands back
 * `'all'`, a click on one colour that series' key. The legend is the switch - at least one colour stays on - and the
 * scale follows what is shown. A segment carries its number only when it fits. Every segment has a one-line hover,
 * "Metrics · Crashing · 40 agents" (Pranjal 2026-10-28, "keep them direct to the point"). Under 640 wide the column
 * goes under the chart and the axis hides.
 *
 * @example
 * ```tsx
 * <StackedBars title="Module health" series={SERIES} rows={rows} unit={{ one: 'agent', many: 'agents' }}
 *   side={(r) => ({ lead: `${r.values.crashing} crashing`, alert: r.values.crashing > 0, rest: ' · 184 restarts' })}
 *   onPick={(row, key) => open(row, key)} />
 * ```
 */
export const StackedBars = forwardRef<HTMLDivElement, StackedBarsProps>(
  ({ title, series, rows, unit, side, sideLabel, onPick, children, className }, ref) => {
    const [off, setOff] = useState<string[]>([]);
    const shown = series.filter((g) => !off.includes(g.key));
    /* at least one colour stays on */
    const toggle = (key: string) => {
      setOff((p) => {
        if (p.includes(key)) return p.filter((k) => k !== key);
        return series.length - p.length > 1 ? [...p, key] : p;
      });
    };
    /* a number sits on its segment only when it fits, and the axis spaces its numbers: the bars' width, measured */
    const chart = useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = useState(0);
    const { max, ticks } = scaleOf(rows, shown, width);
    useLayoutEffect(() => {
      const el = chart.current;
      if (!el) return undefined;
      const measure = () => {
        setWidth(
          el.querySelector<HTMLElement>('.mdt-chart-stack-track')?.getBoundingClientRect().width ??
            0
        );
      };
      measure();
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => {
        ro.disconnect();
      };
    }, [rows.length]);

    if (rows.length === 0) return null;
    const pick = (row: StackedBarsRow) => (e: MouseEvent<HTMLButtonElement>) => {
      const seg = (e.target as HTMLElement).closest<HTMLElement>('[data-key]');
      onPick(row, seg?.dataset.key ?? 'all');
    };
    const many = unit.many.charAt(0).toUpperCase() + unit.many.slice(1);
    /* what a row says aloud: every colour's count, what it is on, and that a click opens them */
    const spokenRow = (row: StackedBarsRow) => {
      const counts = series
        .map((g) => `${formatCount(row.values[g.key] ?? 0)} ${g.label.toLowerCase()}`)
        .join(', ');
      const on = `${formatCount(row.total)} ${nounFor(row.total, unit)}`;
      return `${row.name}: ${counts}, on ${on}. Open its ${unit.many}.`;
    };
    return (
      <Card ref={ref} className={cn('mdt-rounded-xl', className)}>
        <CardHeader
          plain
          heading={
            <span className="mdt-chart-stack-head">
              {title}
              {/* the legend is the switch: each colour hides or shows itself */}
              <span className="mdt-chart-stack-legend" role="group" aria-label="Show or hide">
                {series.map((g) => (
                  <button
                    key={g.key}
                    type="button"
                    className="mdt-chart-stack-legend__b"
                    aria-pressed={!off.includes(g.key)}
                    onClick={() => {
                      toggle(g.key);
                    }}
                  >
                    <i className="mdt-chart-stack-key" data-tone={g.tone} />
                    {g.label}
                  </button>
                ))}
              </span>
            </span>
          }
        />
        <CardBody>
          <div className="mdt-chart-stack">
            <div className={cn('mdt-chart-stack-split', !side && 'mdt-chart-stack-split--solo')}>
              <div className="mdt-chart-stack-left">
                <div className="mdt-chart-stack-chart" ref={chart}>
                  <div className="mdt-chart-stack-grid" aria-hidden="true">
                    {ticks.map((t) => (
                      <i key={t} style={{ left: `${String((t / max) * 100)}%` }} />
                    ))}
                  </div>
                  {rows.map((row) => (
                    <button
                      key={row.id}
                      type="button"
                      className="mdt-chart-stack-row"
                      aria-label={spokenRow(row)}
                      onClick={pick(row)}
                    >
                      <span className="mdt-chart-stack-nm">
                        <span className="mdt-chart-stack-nm__t">{row.name}</span>
                        <span className="mdt-chart-stack-nm__s">
                          on {formatCount(row.total)} {nounFor(row.total, unit)}
                        </span>
                      </span>
                      <span className="mdt-chart-stack-track">
                        {shown
                          .filter((g) => (row.values[g.key] ?? 0) > 0)
                          .map((g, i) => {
                            const v = row.values[g.key] ?? 0;
                            const label = formatCount(v);
                            const fits =
                              (v / max) * width - (i ? 2 : 0) >=
                              label.length * DIGIT_W + DIGIT_ROOM;
                            return (
                              <ChartTip
                                key={g.key}
                                text={`${row.name} · ${g.label} · ${label} ${nounFor(v, unit)}`}
                              >
                                <span
                                  className="mdt-chart-stack-seg"
                                  data-tone={g.tone}
                                  data-key={g.key}
                                  data-tiny={fits ? undefined : ''}
                                  style={{ width: `${String((v / max) * 100)}%` }}
                                >
                                  {label}
                                </span>
                              </ChartTip>
                            );
                          })}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mdt-chart-stack-axis" aria-hidden="true">
                  {ticks.map((t, i) => (
                    <span
                      key={t}
                      data-edge={edgeOf(i, ticks.length)}
                      style={{ left: `${String((t / max) * 100)}%` }}
                    >
                      {formatCount(t)}
                    </span>
                  ))}
                </div>
                <div className="mdt-chart-stack-cap" aria-hidden="true">
                  {many}
                </div>
              </div>
              {side && (
                <div className="mdt-chart-stack-right" role="list" aria-label={sideLabel}>
                  {rows.map((row) => (
                    <SideRow key={row.id} row={row} side={side(row)} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardBody>
        {children}
      </Card>
    );
  }
);
StackedBars.displayName = 'StackedBars';
