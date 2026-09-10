import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { KpiStripProps } from './KpiCard.types';
import './kpiCard.css';

/**
 * KpiStrip - the row that holds KpiCards. Every card keeps its floor, they grow
 * evenly until the row is full, and past the fit the row scrolls sideways
 * instead of squeezing. It bleeds through the page's side margin so a cut card
 * is cut at the page edge. Reachable by keyboard; arrow keys scroll it.
 */
const KpiStrip = forwardRef<HTMLDivElement, KpiStripProps>(function KpiStrip(
  { children, inset = 24, gap = 12, label, snap = false, className, style },
  ref
) {
  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- a scrolling row must be reachable by keyboard
      tabIndex={0}
      className={cn('kpi-strip mdt-flex mdt-overflow-x-auto', snap && 'kpi-strip-snap', className)}
      style={{ ...style, gap, marginInline: -inset, paddingInline: inset }}
    >
      {children}
    </div>
  );
});
KpiStrip.displayName = 'KpiStrip';

export { KpiStrip };
