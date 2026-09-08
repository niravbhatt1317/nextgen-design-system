import type { KpiBarsProps, KpiGaugeProps } from './KpiCard.types';
import './kpiCard.css';

/** The two first charts for a KpiCard's chart area, both 104 × 62 or close. Drawn in the neutral ladder. */

/** A half ring: a share of a limit, the percent inside, a caption under it. */
export function KpiGauge({ percent, caption, label }: KpiGaugeProps) {
  const p = Math.min(100, Math.max(0, percent)) / 100;
  const a = Math.PI * (1 - p);
  const x = Math.round((52 + 44 * Math.cos(a)) * 10) / 10;
  const y = Math.round((56 - 44 * Math.sin(a)) * 10) / 10;
  const spoken = label ?? `${String(Math.round(percent))}% ${caption ?? ''}`.trim();
  return (
    <svg
      width="104"
      height="62"
      viewBox="0 0 104 62"
      role="img"
      aria-label={spoken}
      className="kpi-gauge mdt-block"
    >
      <path
        d="M8 56 A44 44 0 0 1 96 56"
        fill="none"
        className="kpi-gauge-track"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {p > 0 && (
        <path
          d={`M8 56 A44 44 0 0 1 ${String(x)} ${String(y)}`}
          fill="none"
          className="kpi-gauge-fill"
          strokeWidth="8"
          strokeLinecap="round"
        />
      )}
      <text
        x="52"
        y="44"
        textAnchor="middle"
        className="kpi-gauge-number"
        fontSize="14"
        fontWeight="600"
      >
        {Math.round(percent)}
        <tspan fontSize="10" fontWeight="500">
          %
        </tspan>
      </text>
      {caption && (
        <text
          x="52"
          y="58"
          textAnchor="middle"
          className="kpi-gauge-caption"
          fontSize="10"
          fontWeight="500"
        >
          {caption}
        </text>
      )}
    </svg>
  );
}

/** Recent readings as bars, with a base line and a threshold line in the danger colour. */
export function KpiBars({
  values,
  base,
  threshold,
  baseLabel = 'Base',
  thresholdLabel = '2x',
  label,
}: KpiBarsProps) {
  const W = 112;
  const H = 62;
  const top = 6;
  const barW = 9;
  const gap = 3;
  const n = values.length;
  const max = Math.max(threshold, base, ...values, 1);
  const yOf = (v: number) => top + (H - top) * (1 - v / max);
  const x0 = W - n * barW - (n - 1) * gap;
  const spoken =
    label ??
    `${String(values[values.length - 1] ?? 0)} now, ${baseLabel.toLowerCase()} ${String(base)}, ${thresholdLabel} threshold ${String(threshold)}`;
  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${String(W)} ${String(H)}`}
      role="img"
      aria-label={spoken}
      className="kpi-bars mdt-block"
    >
      <g className="kpi-bars-bar">
        {values.map((v, i) => (
          <rect
            // eslint-disable-next-line react/no-array-index-key -- readings have no identity beyond their order
            key={i}
            x={x0 + i * (barW + gap)}
            y={yOf(v)}
            width={barW}
            height={Math.max(2, H - yOf(v))}
            rx="2"
          />
        ))}
      </g>
      <line
        x1={x0 - 12}
        y1={yOf(threshold)}
        x2={W}
        y2={yOf(threshold)}
        className="kpi-bars-threshold"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      <line
        x1={x0 - 12}
        y1={yOf(base)}
        x2={W}
        y2={yOf(base)}
        className="kpi-bars-base"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      <text
        x={x0 - 16}
        y={yOf(threshold) + 3}
        textAnchor="end"
        className="kpi-bars-threshold-label"
        fontSize="10"
        fontWeight="600"
      >
        {thresholdLabel}
      </text>
      <text
        x={x0 - 16}
        y={yOf(base) + 3}
        textAnchor="end"
        className="kpi-bars-base-label"
        fontSize="10"
        fontWeight="500"
      >
        {baseLabel}
      </text>
    </svg>
  );
}
