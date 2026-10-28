import { forwardRef } from 'react';
import { cn } from '@/utils';
import { ChartTip } from './ChartTip';
import { formatCount, shareOf } from './chartFormat';
import type { BarListProps } from './Chart.types';
import './chart.css';

/**
 * BarList - one row per group, its bar scaled to the biggest group, the count and its share of the total beside it.
 *
 * Ported from the console Health's `BarList` (Fleet state: versions, platforms, rings, modules running). A chart, not
 * a progress bar - no track - unless `track` lays a pale full-width one under every bar (Pranjal 2026-10-22, option B
 * of "Silent for how long"). A row can be `current` (green, with a quiet "current") or carry a tone (red, grey). Every
 * row is a button with a one-line hover. No rows reads "Nothing in this scope."
 *
 * @example
 * ```tsx
 * <BarList rows={[
 *   { label: '7.4.0', n: 1086, current: true, tip: '7.4.0 · 1,086 agents' },
 *   { label: '7.3.2', n: 702, tip: '7.3.2 · 702 agents' },
 * ]} />
 * ```
 */
export const BarList = forwardRef<HTMLDivElement, BarListProps>(
  ({ rows, track = false, className }, ref) => {
    if (rows.length === 0) {
      return (
        <div ref={ref} className={cn('mdt-chart-note', className)}>
          Nothing in this scope.
        </div>
      );
    }
    const max = Math.max(1, ...rows.map((r) => r.n));
    const total = rows.reduce((s, r) => s + r.n, 0);
    return (
      <div ref={ref} className={cn('mdt-chart-bars', track && 'mdt-chart-bars--track', className)}>
        {rows.map((r) => (
          <ChartTip key={r.label} text={r.tip}>
            <button type="button" className="mdt-chart-bar" onClick={r.onPick}>
              <span className="mdt-chart-bar__l">
                {r.label}
                {r.current ? <span className="mdt-chart-note"> current</span> : null}
              </span>
              <span className="mdt-chart-bar__track">
                <span
                  className="mdt-chart-bar__b"
                  data-current={r.current ? '' : undefined}
                  data-tone={r.tone}
                  data-zero={r.n === 0 ? '' : undefined}
                  style={{ width: `${String((r.n / max) * 100)}%` }}
                />
              </span>
              <span className="mdt-chart-bar__v">
                {formatCount(r.n)}
                <span className="mdt-chart-note">{shareOf(r.n, total)}%</span>
              </span>
            </button>
          </ChartTip>
        ))}
      </div>
    );
  }
);
BarList.displayName = 'BarList';
