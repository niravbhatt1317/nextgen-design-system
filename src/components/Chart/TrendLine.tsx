import { forwardRef } from 'react';
import { cn } from '@/utils';
import { ChartTip } from './ChartTip';
import { formatReading } from './chartFormat';
import type { TrendLineProps } from './Chart.types';
import './chart.css';

/* drawn on 1000 × 150 and stretched to the box; the strokes keep their width */
const W = 1000;
const H = 150;

/**
 * TrendLine - a reading over time as a line with a pale wash under it, a three-step side scale, and a hover on every
 * point.
 *
 * Ported from the console Health's `TrendLine` (Fleet state's "On the current version" over the chosen range). The
 * line and its wash wear the neutral blue or the good green; each point is a full-height strip that, under the
 * pointer or keyboard focus, shows a hairline and a dot and opens its one-line hover ("14:00 · 98.2%").
 *
 * @example
 * ```tsx
 * <TrendLine points={pts} lo={0} hi={60} tone="good" axis={['16:30', '04:30', 'Now']}
 *   tip={(p) => `${timeOf(p.t)} · ${p.v.toFixed(1)}%`} />
 * ```
 */
export const TrendLine = forwardRef<HTMLDivElement, TrendLineProps>(
  ({ points, lo, hi, tone = 'info', tip, axis, unit = '%', className }, ref) => {
    const span = Math.max(1, points.length - 1);
    const x = (i: number) => (i / span) * W;
    const y = (v: number) => H - ((v - lo) / (hi - lo || 1)) * H;
    const line = points
      .map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(p.v).toFixed(1)}`)
      .join(' ');
    /* the side scale: the bottom, the middle and the top, keyed by place so a flat scale keeps three */
    const ticks = [
      { at: 'lo', t: lo },
      { at: 'mid', t: (lo + hi) / 2 },
      { at: 'hi', t: hi },
    ];
    return (
      <div ref={ref} className={cn('mdt-chart-trend-wrap', className)}>
        <div className="mdt-chart-trend">
          {ticks.map(({ at, t }) => (
            <span
              key={at}
              className="mdt-chart-trend__y"
              style={{ top: `${String((y(t) / H) * 100)}%` }}
            >
              {formatReading(t)}
              {unit}
            </span>
          ))}
          <svg
            viewBox={`0 0 ${String(W)} ${String(H)}`}
            preserveAspectRatio="none"
            aria-hidden="true"
            data-tone={tone}
          >
            {ticks.map(({ at, t }) => (
              <line
                key={at}
                x1="0"
                x2={W}
                y1={y(t)}
                y2={y(t)}
                className="mdt-chart-grid"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <path
              d={`${line} L${String(W)} ${String(H)} L0 ${String(H)} Z`}
              className="mdt-chart-area"
            />
            <path d={line} className="mdt-chart-line" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="mdt-chart-trend__hits">
            {points.map((p, i) => (
              <ChartTip key={p.t} text={tip(p, i)}>
                {/* a point takes focus so its one-line hover opens from the keyboard too */}
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
                <span className="mdt-chart-trend__hit" tabIndex={0}>
                  <span className="mdt-chart-trend__x" />
                  <span
                    className="mdt-chart-trend__dot"
                    data-tone={tone}
                    style={{ top: `${String((y(p.v) / H) * 100)}%` }}
                  />
                </span>
              </ChartTip>
            ))}
          </div>
        </div>
        <div className="mdt-chart-axis mdt-chart-axis--inset">
          {axis.map((a) => (
            <span key={a}>{a}</span>
          ))}
        </div>
      </div>
    );
  }
);
TrendLine.displayName = 'TrendLine';
