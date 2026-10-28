import { forwardRef, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/utils';
import { ChartTip } from './ChartTip';
import { formatCount, formatReading, nounFor } from './chartFormat';
import type { HistogramProps } from './Chart.types';
import './chart.css';

const HOSTS = { one: 'host', many: 'hosts' };
/* the budget's bar index: a bar is a tenth of the budget, so bars 0-9 hold what is within it and 10 on what is over */
const BUDGET_BINS = 10;
/* the scale reaches at least a quarter past the budget, so there is room to show what is over it */
const HEADROOM = 1.25;
/* the budget's name sits right of its line, or left of it once the line is past 62% across, so it never runs off */
const LABEL_FLIP_AT = 62;
/* float slack, so a reading exactly on a bar edge lands in the bar it starts */
const EPS = 1e-9;

/** A round number at or above `v` for the top of the count scale: 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8 or 10 × a power of 10. */
const niceCeil = (v: number) => {
  const e = Math.pow(10, Math.floor(Math.log10(Math.max(v, 1))));
  return [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].map((m) => m * e).find((x) => x >= v) ?? v;
};

/** Sorts each reading into its bar: at or under the budget stays left of the line, anything over it right of it. */
function binsOf(vals: number[], budget: number) {
  const w = budget / BUDGET_BINS;
  const top = Math.max(budget * HEADROOM, ...vals);
  const n = Math.max(BUDGET_BINS + 1, Math.ceil(top / w - EPS));
  const members: number[][] = Array.from({ length: n }, () => []);
  vals.forEach((v, j) => {
    const raw = Math.floor(v / w + EPS);
    const i = Math.min(
      n - 1,
      v <= budget ? Math.min(BUDGET_BINS - 1, raw) : Math.max(BUDGET_BINS, raw)
    );
    members[i]?.push(j);
  });
  return { w, max: n * w, members };
}

/**
 * Histogram - how a group spreads for one reading against its budget: bar height is how many, across is the reading,
 * every bar past the budget's dashed line red.
 *
 * Ported from the console Health's `Histogram` (Host cost, version C, Pranjal 2026-10-22: "Now use this third
 * chart"). Each bar is a tenth of the budget wide, so the budget sits on a bar edge and no bar mixes members under
 * and over it; the scale ends just past the last reading or at 1.25 × the budget; the budget is named on its line; a
 * red bar keeps 4px, any other 3px. No band, no wash, no legend line. With `onPick` every bar with members is a
 * button handing back which readings fall in it (Pranjal 2026-10-22: "on chart level click agents list in sidedrawer
 * will open"). Each bar has a one-line hover: "0–0.5 % · 43 hosts".
 *
 * @example
 * ```tsx
 * <Histogram vals={hosts.map((h) => h.cpu)} budget={5} unit="%" onPick={(members, range) => open(members, range)} />
 * ```
 */
export const Histogram = forwardRef<HTMLDivElement, HistogramProps>(
  ({ vals, budget, unit, noun = HOSTS, format = formatReading, onPick, className }, ref) => {
    const { w, max, members } = binsOf(vals, budget);
    const yMax = niceCeil(Math.max(1, ...members.map((m) => m.length)));
    const at = (budget / max) * 100;
    const labelAt: CSSProperties =
      at > LABEL_FLIP_AT
        ? { right: `${String(100 - at)}%`, paddingRight: 4 }
        : { left: `${String(at)}%`, paddingLeft: 4 };
    return (
      <div ref={ref} className={cn('mdt-chart-histo-wrap', className)}>
        <div className="mdt-chart-histo">
          {[yMax, yMax / 2, 0].map((t) => (
            <span
              key={t}
              className="mdt-chart-histo__y"
              style={{ top: `${String(100 - (t / yMax) * 100)}%` }}
            >
              {formatCount(t)}
            </span>
          ))}
          <span className="mdt-chart-histo__grid" style={{ top: '0%' }} />
          <span className="mdt-chart-histo__grid" style={{ top: '50%' }} />
          <span className="mdt-chart-histo__budget" style={{ left: `${String(at)}%` }} />
          <span className="mdt-chart-histo__budget-l" style={labelAt}>
            Budget {formatCount(budget)} {unit}
          </span>
          {members.map((m, i) => {
            const b = m.length;
            const over = i >= BUDGET_BINS;
            const range = `${format(i * w)}–${format((i + 1) * w)} ${unit}`;
            const said = `${formatCount(b)} ${nounFor(b, noun)}`;
            const bar: ReactNode = b ? (
              <span
                className="mdt-chart-histo__b"
                data-over={over ? '' : undefined}
                style={{ height: `${String((b / yMax) * 100)}%` }}
              />
            ) : null;
            return (
              // eslint-disable-next-line react/no-array-index-key -- a bar is its place on the scale; it has no other identity
              <ChartTip key={i} text={`${range} · ${said}`}>
                {onPick ? (
                  <button
                    type="button"
                    className="mdt-chart-histo__bin"
                    disabled={!b}
                    aria-label={`${range}: ${said}`}
                    onClick={() => {
                      onPick(m, range);
                    }}
                  >
                    {bar}
                  </button>
                ) : (
                  /* a bar takes focus so its one-line hover opens from the keyboard too */
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                  <span className="mdt-chart-histo__bin" tabIndex={0}>
                    {bar}
                  </span>
                )}
              </ChartTip>
            );
          })}
        </div>
        <div className="mdt-chart-axis mdt-chart-axis--histo">
          <span>0</span>
          <span>
            {format(max)} {unit}
          </span>
        </div>
      </div>
    );
  }
);
Histogram.displayName = 'Histogram';
