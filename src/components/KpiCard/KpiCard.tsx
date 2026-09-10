import { forwardRef } from 'react';
import type { CSSProperties } from 'react';
import { cn } from '@/utils';
import { Badge } from '../Badge';
import type { BadgeTone } from '../Badge';
import { Icon } from '../Icon';
import type { KpiCardProps, KpiMetricProps, KpiTrendTone } from './KpiCard.types';
import './kpiCard.css';

/** A plain card's floor: the Figma card's own width. */
export const KPI_FLOOR = 174;
/** A chart card's natural width. */
export const KPI_CHART_WIDTH = 270;

const TONE: Record<KpiTrendTone, BadgeTone> = {
  good: 'success',
  bad: 'danger',
  caution: 'warning',
  flat: 'slate',
};

/**
 * One decimal with k or M, the console's rounding: 7640 → "7.6k", 8200 → "8.2k",
 * 10001 → "10k", 256 → "256", 1204 → "1.2k".
 */
export function formatKpiValue(n: number): string {
  const abs = Math.abs(n);
  const unit = abs >= 1e9 ? [1e9, 'B'] : abs >= 1e6 ? [1e6, 'M'] : abs >= 1e3 ? [1e3, 'k'] : null;
  if (!unit) return n.toLocaleString('en-US');
  const [div, suffix] = unit as [number, string];
  const scaled = n / div;
  const text =
    Math.abs(scaled) >= 10
      ? Math.round(scaled).toString()
      : (Math.round(scaled * 10) / 10).toString();
  return text + suffix;
}

const SETTINGS_GEAR = (
  <span
    className="kpi-gear mdt-hidden mdt-shrink-0 mdt-text-neutral-50 dark:mdt-text-neutral-70"
    aria-hidden="true"
  >
    <Icon name="settings" size={16} />
  </span>
);

/** The rows every metric shares, single card or segment, so the two can never drift. */
function KpiBody({
  label,
  value,
  hint,
  delta,
  icon,
  clickable,
}: KpiMetricProps & { clickable: boolean }) {
  const tone = delta?.tone ?? 'flat';
  // A drawn arrow, not the ↗ character: on Windows that character renders as an emoji.
  const arrow =
    delta?.direction === 'up' ? (
      <Icon name="arrow-up-right" size={10} aria-hidden />
    ) : delta?.direction === 'down' ? (
      <Icon name="arrow-down-right" size={10} aria-hidden />
    ) : null;
  const spoken =
    delta &&
    (delta.direction === 'up'
      ? `up ${delta.label}`
      : delta.direction === 'down'
        ? `down ${delta.label}`
        : delta.label);
  return (
    <>
      <div className="kpi-top mdt-flex mdt-min-h-[18px] mdt-items-center mdt-justify-between mdt-gap-2">
        <span className="kpi-label mdt-min-w-0 mdt-truncate mdt-text-xs mdt-font-medium mdt-leading-[18px] mdt-text-neutral-90 dark:mdt-text-neutral-40">
          {label}
        </span>
        {icon ? (
          <span className="mdt-inline-flex mdt-shrink-0 mdt-text-neutral-50 dark:mdt-text-neutral-70 [&_svg]:mdt-size-4">
            {icon}
          </span>
        ) : clickable ? (
          SETTINGS_GEAR
        ) : null}
      </div>
      <div className="mdt-mt-2 mdt-flex mdt-items-baseline mdt-gap-2">
        <span className="kpi-value mdt-text-2xl mdt-font-medium mdt-tabular-nums mdt-leading-[1.2] mdt-tracking-[-0.01em] mdt-text-neutral-130 dark:mdt-text-neutral-10">
          {typeof value === 'number' ? formatKpiValue(value) : value}
        </span>
        {delta && (
          <Badge size="sm" shape="square" tone={TONE[tone]} aria-label={spoken}>
            <span className="mdt-inline-flex mdt-items-center mdt-gap-[3px]">
              {arrow}
              {delta.label}
            </span>
          </Badge>
        )}
      </div>
      {hint !== undefined && hint !== null && (
        <span className="kpi-hint mdt-mt-0.5 mdt-truncate mdt-text-xs mdt-font-medium mdt-leading-[18px] mdt-text-neutral-50 dark:mdt-text-neutral-70">
          {hint}
        </span>
      )}
    </>
  );
}

function floorOf(m: KpiMetricProps): number {
  return m.minWidth ?? (m.chart ? 0 : KPI_FLOOR);
}
function basisOf(m: KpiMetricProps): number {
  return Math.max(floorOf(m), m.chart ? KPI_CHART_WIDTH : KPI_FLOOR);
}

/** One segment: the body, or the body beside its chart area; a button when it has a click. */
function KpiSegment({ metric, grouped }: { metric: KpiMetricProps; grouped: boolean }) {
  const clickable = metric.onClick !== undefined;
  const content = metric.chart ? (
    <div className="mdt-flex mdt-min-w-0 mdt-flex-1 mdt-items-stretch mdt-gap-3">
      <div className="mdt-flex mdt-min-w-0 mdt-flex-1 mdt-flex-col">
        <KpiBody {...metric} clickable={clickable} />
      </div>
      <div className="kpi-chart mdt-flex mdt-shrink-0 mdt-items-end">{metric.chart}</div>
    </div>
  ) : (
    <KpiBody {...metric} clickable={clickable} />
  );
  const style: CSSProperties | undefined = grouped
    ? { flex: `1 1 ${String(basisOf(metric))}px`, minWidth: `${String(floorOf(metric))}px` }
    : undefined;
  const base = cn(
    'kpi-seg mdt-relative mdt-flex mdt-min-h-[98px] mdt-min-w-0 mdt-flex-col mdt-px-4 mdt-py-3 mdt-text-left',
    !grouped && 'mdt-flex-1'
  );
  if (clickable) {
    return (
      <button
        type="button"
        className={cn(
          base,
          'kpi-btn mdt-m-0 mdt-cursor-pointer mdt-border-0 mdt-bg-transparent mdt-font-[inherit] mdt-text-[inherit]'
        )}
        style={style}
        onClick={metric.onClick}
      >
        {content}
      </button>
    );
  }
  return (
    <div className={base} style={style}>
      {content}
    </div>
  );
}

/**
 * KpiCard - one metric on one card, or a group of related metrics sharing a card.
 *
 * A plain card has a 174px floor and no ceiling; a chart card no floor and 270
 * natural; a group is the sum of its segments. In a KpiStrip the cards grow
 * evenly until the row is full and the strip scrolls past the fit.
 *
 * @example
 * ```tsx
 * <KpiCard label="Total users" value={8200} hint="across all organisations" />
 * <KpiCard items={[{ label: 'Pending invites', value: 11, onClick: openInvites }, { label: 'Active links', value: 4 }]} label="Invitations" />
 * ```
 */
const KpiCard = forwardRef<HTMLDivElement, KpiCardProps>(function KpiCard(props, ref) {
  const { className, style } = props;
  const metrics: KpiMetricProps[] = props.items ?? [props as KpiMetricProps];
  const grouped = props.items !== undefined;
  const floor = metrics.reduce((a, m) => a + floorOf(m), 0);
  const basis = metrics.reduce((a, m) => a + basisOf(m), 0);
  const ceiling = grouped
    ? metrics.every((m) => m.maxWidth !== undefined)
      ? metrics.reduce((a, m) => a + (m.maxWidth ?? 0), 0)
      : undefined
    : (props as KpiMetricProps).maxWidth;
  const groupLabel = grouped ? (props as { label?: string | undefined }).label : undefined;
  return (
    <div
      ref={ref}
      role={grouped ? 'group' : undefined}
      aria-label={groupLabel}
      data-kpi={grouped ? 'group' : 'card'}
      className={cn(
        'kpi-card mdt-flex mdt-items-stretch mdt-rounded-xl mdt-border mdt-border-solid mdt-border-neutral-30 mdt-bg-background mdt-font-sans dark:mdt-border-neutral-110',
        className
      )}
      style={
        {
          width: `${String(basis)}px`,
          minWidth: `${String(floor)}px`,
          ...(ceiling !== undefined ? { maxWidth: `${String(ceiling)}px` } : {}),
          '--kpi-basis': `${String(basis)}px`,
          '--kpi-grow': metrics.length,
          ...style,
        } as CSSProperties
      }
    >
      {metrics.map((m, i) => (
        <KpiSegment key={`${m.label}-${String(i)}`} metric={m} grouped={grouped} />
      ))}
    </div>
  );
});
KpiCard.displayName = 'KpiCard';

export { KpiCard };
