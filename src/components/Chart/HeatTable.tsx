import { forwardRef } from 'react';
import { cn } from '@/utils';
import { ChartTip } from './ChartTip';
import { formatCount, shareOf } from './chartFormat';
import type { HeatTableProps } from './Chart.types';
import './chart.css';

/* how far a cell's own rate is from the whole's, as the five shades: at most half, 0.85, 1.15, 1.6 times, or more */
const STEPS = [0.5, 0.85, 1.15, 1.6];
const RAMP = [1, 2, 3, 4, 5];

/** The shade of a cell: 0 when it has none, else 1 (far better than the whole) to 5 (far worse). */
function levelOf(rate: number, base: number) {
  if (rate === 0) return 0;
  const x = rate / (base || 0.0001);
  const i = STEPS.findIndex((s) => x <= s);
  return i === -1 ? STEPS.length + 1 : i + 1;
}

/**
 * HeatTable - groups by problems as a table of shaded cells, each shaded against the whole's rate (lighter is better,
 * darker worse), with the ramp named under it.
 *
 * Ported from the console Health's `HeatTable` ("Where the problems are", both fleets). Each cell shows its count and,
 * under it, its share of the row; a cell is a button opening its members, with a one-line hover ("Retail stores ·
 * Silent · 16 agents"); hover darkens the cell's own shade, keyboard focus rings it. A zero cell is disabled. On the
 * two darkest shades the share reads in the full ink, where the quiet grey would lose its contrast.
 *
 * @example
 * ```tsx
 * <HeatTable head="Zone" countLabel="Agents" cols={['Silent', 'Over budget']} rows={[{ label: 'Retail stores',
 *   n: 1075, cells: [{ n: 16, of: 1075, fleetRate: 0.015, tip: 'Retail stores · Silent · 16 agents', onPick }] }]} />
 * ```
 */
export const HeatTable = forwardRef<HTMLDivElement, HeatTableProps>(
  ({ head, countLabel, cols, rows, className }, ref) => (
    <div ref={ref} className={cn('mdt-chart-heat-wrap', className)}>
      <table className="mdt-chart-heat">
        <thead>
          <tr>
            <th>{head}</th>
            <th>{countLabel}</th>
            {cols.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <td>
                {r.label}
                {r.note ? <span className="mdt-chart-note"> {r.note}</span> : null}
              </td>
              <td className="mdt-chart-heat__n">{formatCount(r.n)}</td>
              {r.cells.map((c, i) => (
                <td
                  // eslint-disable-next-line react/no-array-index-key -- a cell is its column; the columns are fixed
                  key={i}
                  className="mdt-chart-heat__c"
                  data-level={levelOf(c.n / (c.of || 1), c.fleetRate)}
                >
                  <ChartTip text={c.tip}>
                    <button type="button" onClick={c.onPick} disabled={!c.n}>
                      {formatCount(c.n)}
                      <span>{shareOf(c.n, c.of)}%</span>
                    </button>
                  </ChartTip>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mdt-chart-ramp" aria-hidden="true">
        Better than the fleet{' '}
        {RAMP.map((l) => (
          <i key={l} data-level={l} />
        ))}{' '}
        Worse than the fleet
      </div>
    </div>
  )
);
HeatTable.displayName = 'HeatTable';
