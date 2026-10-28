import { forwardRef } from 'react';
import { cn } from '@/utils';
import { ChartTip } from './ChartTip';
import type { StatusBlock, StatusBlocksProps } from './Chart.types';
import './chart.css';

/** Which colour a block wears: green at or above `good`, amber at or above `warn`, red under it. */
const toneOf = (v: number, good: number, warn: number) => {
  if (v >= good) return 'good';
  return v >= warn ? 'warn' : 'crit';
};
/* past this many blocks the gaps close from 4 to 2 */
const DENSE_AFTER = 60;

/**
 * StatusBlocks - a status history: one block per period, coloured by its share, with a legend, an axis and a note
 * naming the lowest period.
 *
 * Ported from the console Health's `StatusBlocks` (the "Agents sending data" history): green at or above `good`
 * (98%), amber at or above `warn` (96%), red under it. Each block has a one-line hover ("16:30–17:00 · 98.2% sending
 * data") and takes keyboard focus for it. A `control` (the range switch) sits at the right of the legend's row.
 *
 * @example
 * ```tsx
 * <StatusBlocks label="Agents sending data, the last 24 hours" what="sending data"
 *   axis={['24h ago', '12h ago', 'Now']} blocks={[{ label: '16:30–17:00', value: 98.9 }, { label: 'Now', value: 98.2 }]} />
 * ```
 */
export const StatusBlocks = forwardRef<HTMLDivElement, StatusBlocksProps>(
  ({ blocks, axis, label, what, good = 98, warn = 96, control, className }, ref) => {
    const last = blocks[blocks.length - 1];
    if (last === undefined) return null;
    const low = blocks.reduce<StatusBlock>((m, b) => (b.value < m.value ? b : m), last);
    const under = blocks.filter((b) => b.value < good).length;
    const word = what ? ` ${what}` : '';
    return (
      <div ref={ref} className={cn('mdt-chart-blocks-wrap', className)}>
        <div className="mdt-chart-blocks-head">
          <span className="mdt-chart-legend" aria-hidden="true">
            <span>
              <i data-tone="good" />
              {good}% or more
            </span>
            <span>
              <i data-tone="warn" />
              {warn}–{good}%
            </span>
            <span>
              <i data-tone="crit" />
              Under {warn}%
            </span>
          </span>
          {control}
        </div>
        <div
          className={cn(
            'mdt-chart-blocks',
            blocks.length > DENSE_AFTER && 'mdt-chart-blocks--dense'
          )}
          role="img"
          aria-label={`${label}: lowest ${low.value.toFixed(1)}%, now ${String(last.value)}%`}
        >
          {blocks.map((b) => (
            <ChartTip key={b.label} text={`${b.label} · ${b.value.toFixed(1)}%${word}`}>
              <span
                className="mdt-chart-block"
                data-tone={toneOf(b.value, good, warn)}
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- a block takes focus so its one-line hover opens from the keyboard too
                tabIndex={0}
              />
            </ChartTip>
          ))}
        </div>
        <div className="mdt-chart-axis">
          {axis.map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
        <span className="mdt-chart-note">
          Lowest {low.value.toFixed(1)}% · {low.label} · {under} of {blocks.length} blocks under{' '}
          {good}%
        </span>
      </div>
    );
  }
);
StatusBlocks.displayName = 'StatusBlocks';
