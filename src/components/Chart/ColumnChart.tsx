import { forwardRef, type CSSProperties } from 'react';
import { cn } from '@/utils';
import { ChartTip } from './ChartTip';
import { formatCount } from './chartFormat';
import type { ColumnChartProps } from './Chart.types';
import './chart.css';

/**
 * ColumnChart - one column per group with its count above it, scaled to the biggest; each column opens its members.
 *
 * Ported from the console Health's `Columns` (Agent Fleet's "Silent for how long", Collector Fleet's "How full they
 * are"). With `fill` (Pranjal 2026-10-26: "why make it so close to each other giving it so much negative space ... it
 * should not look cluttered") the columns fill their card, each column can carry its own tone (grey while it may come
 * back, red from a day on), and `marker` draws a dashed line with its word where that starts. Every column has a
 * one-line hover; a zero column is disabled.
 *
 * @example
 * ```tsx
 * <ColumnChart fill marker={{ at: 3, label: '1 day' }} cols={[
 *   { label: 'Under 1h', n: 0, tone: 'quiet', tip: 'Under 1h silent · 0 agents' },
 *   { label: '1–2 days', n: 18, tone: 'crit', tip: '1–2 days silent · 18 agents', onPick: open },
 * ]} />
 * ```
 */
export const ColumnChart = forwardRef<HTMLDivElement, ColumnChartProps>(
  ({ cols, tone = 'bar', fill = false, marker, className }, ref) => {
    const max = Math.max(1, ...cols.map((c) => c.n));
    return (
      <div
        ref={ref}
        className={cn('mdt-chart-cols-wrap', fill && 'mdt-chart-cols-wrap--fill', className)}
      >
        <div
          className="mdt-chart-cols"
          style={{ '--mdt-chart-cols-n': cols.length } as CSSProperties}
        >
          {marker && (
            <span
              className="mdt-chart-cols__mark"
              style={{ '--mdt-chart-mark-at': marker.at } as CSSProperties}
            >
              <span>{marker.label}</span>
            </span>
          )}
          {cols.map((c) => (
            <ChartTip key={c.label} text={c.tip}>
              <button type="button" className="mdt-chart-col" onClick={c.onPick} disabled={!c.n}>
                <span className="mdt-chart-col__n" data-zero={c.n ? undefined : ''}>
                  {formatCount(c.n)}
                </span>
                <span
                  className="mdt-chart-col__b"
                  data-tone={c.tone ?? tone}
                  style={{ height: `calc((100% - 24px) * ${(c.n / max).toFixed(3)})` }}
                />
              </button>
            </ChartTip>
          ))}
        </div>
        <div className="mdt-chart-cols-x">
          {cols.map((c) => (
            <span key={c.label}>{c.label}</span>
          ))}
        </div>
      </div>
    );
  }
);
ColumnChart.displayName = 'ColumnChart';
