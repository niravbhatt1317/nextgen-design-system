import type { KpiBarsProps, KpiGaugeProps } from './KpiCard.types';
import './kpiCard.css';

/**
 * The first charts for a KpiCard's chart area, all 104 × 62 or close. Drawn in the neutral ladder; a toned half gauge
 * and the zones gauge wear the chart palette's status colours (--mdt-chart-good / warn / crit / info).
 */

/**
 * The full ring, ported from the console's Overview health ring (Pranjal, 2026-10-13). 150 × 150, radius 58,
 * a 10px stroke; the fill starts at twelve o'clock with a rounded cap; the number 30/600 with a 15/500 "%".
 * At 100% the fill is one closed circle (a dashed stroke left a notch where its two ends met) and a thin
 * 2px ring sits 13px outside it.
 */
function KpiRing({ percent, spoken, bad }: { percent: number; spoken: string; bad: boolean }) {
  const r = 58;
  const c = 2 * Math.PI * r;
  const p = Math.min(100, Math.max(0, percent)) / 100;
  return (
    <svg
      width="150"
      height="150"
      viewBox="-5 -5 150 150"
      role="img"
      aria-label={spoken}
      className="kpi-ring mdt-block"
      data-bad={bad ? '' : undefined}
      data-done={p >= 1 ? '' : undefined}
    >
      {p >= 1 && (
        <circle className="kpi-ring-halo" cx="70" cy="70" r={r + 13} fill="none" strokeWidth="2" />
      )}
      <circle className="kpi-ring-track" cx="70" cy="70" r={r} fill="none" strokeWidth="10" />
      {p >= 1 ? (
        <circle className="kpi-ring-fill" cx="70" cy="70" r={r} fill="none" strokeWidth="10" />
      ) : (
        p > 0 && (
          <circle
            className="kpi-ring-fill"
            cx="70"
            cy="70"
            r={r}
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${(c * p).toFixed(1)} ${c.toFixed(1)}`}
            transform="rotate(-90 70 70)"
          />
        )
      )}
      <text
        className="kpi-ring-number"
        x="70"
        y="81"
        textAnchor="middle"
        fontSize="30"
        fontWeight="600"
      >
        {Math.round(percent)}
        <tspan fontSize="15" fontWeight="500" dx="1">
          %
        </tspan>
      </text>
    </svg>
  );
}

/** A point on a half ring centred at (cx, 56): `f` of the way from the left end, `r` out. Two decimals, as drawn. */
const onHalf = (cx: number, f: number, r: number) => {
  const a = Math.PI * (1 - f);
  return [(cx + r * Math.cos(a)).toFixed(2), (56 - r * Math.sin(a)).toFixed(2)] as const;
};
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/* a toned gauge keeps its dot at 0% and never closes the arc at 100% - the console status gauge's 0.004 / 0.999 */
const TONED_MIN = 0.004;
const TONED_MAX = 0.999;
/* the target tick runs across the 8px band and 3px past either edge: radius 37 to 51 */
const TICK_IN = 37;
const TICK_OUT = 51;

/**
 * The zones half ring, ported from the console Health's headline gauge (ZonesGauge, Pranjal 2026-10-26 on the old
 * ring: "the chart makes less sense so improve the chart"): each zone faint in its status colour, a dot where the
 * value sits in its zone's full colour, the value and the zone's word in the middle, the ends labelled. Drawn on
 * 120 × 76 and cropped to the ink, shown at the KpiCard's chart size, 104 × 62.
 */
function KpiZones({ percent, caption, label, zones = [], min = 0, max = 100 }: KpiGaugeProps) {
  const r = 44;
  const at = (v: number) => onHalf(60, clamp01((v - min) / (max - min || 1)), r);
  const arc = (from: number, to: number) => {
    const [x1, y1] = at(from);
    const [x2, y2] = at(to);
    return `M${x1} ${y1} A${String(r)} ${String(r)} 0 0 1 ${x2} ${y2}`;
  };
  const shown = Number(percent.toFixed(1));
  const zone = zones.find((z) => shown >= z.from && shown <= z.to) ?? zones[0];
  const [dx, dy] = at(shown);
  const spoken =
    label ??
    `${String(shown)}% ${caption ?? ''}`.trim() + (zone === undefined ? '' : `: ${zone.word}`);
  return (
    <svg
      width="104"
      height="62"
      viewBox="0 6 120 71.5"
      role="img"
      aria-label={spoken}
      className="kpi-zones mdt-block"
    >
      {zones.map((z) => (
        <path
          key={`${String(z.from)}-${String(z.to)}`}
          d={arc(z.from, z.to)}
          fill="none"
          className="kpi-zones-zone"
          data-tone={z.tone}
          strokeWidth="9"
        />
      ))}
      <circle
        cx={dx}
        cy={dy}
        r="6.5"
        className="kpi-zones-dot"
        data-tone={zone?.tone}
        strokeWidth="2.5"
      />
      <text
        x="60"
        y="50"
        textAnchor="middle"
        className="kpi-zones-number"
        fontSize="15"
        fontWeight="600"
      >
        {shown}
        <tspan fontSize="10" fontWeight="500">
          %
        </tspan>
      </text>
      <text
        x="60"
        y="64"
        textAnchor="middle"
        className="kpi-zones-word"
        data-tone={zone?.tone}
        fontSize="9.5"
        fontWeight="600"
      >
        {zone?.word}
      </text>
      <text x="16" y="74" textAnchor="middle" className="kpi-zones-end" fontSize="8.5">
        {min}%
      </text>
      <text x="104" y="74" textAnchor="middle" className="kpi-zones-end" fontSize="8.5">
        {max}%
      </text>
    </svg>
  );
}

/** What the gauge says aloud: the label, else the number, the caption and (with a target) the "good at" line. */
function spokenOf({ caption, label, target }: KpiGaugeProps, shown: number) {
  if (label !== undefined) return label;
  const said = `${String(shown)}% ${caption ?? ''}`.trim();
  return target === undefined ? said : `${said}, good at ${String(target)}% or more`;
}

/**
 * A half ring: a share of a limit, the percent inside, a caption under it. `shape="zones"` splits the ring into status
 * zones with a dot where the value sits; `shape="ring"` draws the full health ring. On the half ring, `tone` paints the
 * fill in a status colour and `target` adds the "good at" tick.
 */
export function KpiGauge(props: KpiGaugeProps) {
  const { percent, caption, shape = 'half', bad = false, tone, target } = props;
  if (shape === 'zones') return <KpiZones {...props} />;
  const toned = tone !== undefined && shape === 'half';
  const shown = toned ? Number(percent.toFixed(1)) : Math.round(percent);
  const spoken = spokenOf(props, shown);
  if (shape === 'ring') return <KpiRing percent={percent} spoken={spoken} bad={bad} />;
  const p = clamp01(percent / 100);
  const [x, y] = onHalf(52, toned ? Math.min(TONED_MAX, Math.max(TONED_MIN, p)) : p, 44);
  const tickIn = target === undefined ? null : onHalf(52, clamp01(target / 100), TICK_IN);
  const tickOut = target === undefined ? null : onHalf(52, clamp01(target / 100), TICK_OUT);
  return (
    <svg
      width="104"
      height="62"
      viewBox="0 0 104 62"
      role="img"
      aria-label={spoken}
      className="kpi-gauge mdt-block"
      data-tone={tone}
    >
      <path
        d="M8 56 A44 44 0 0 1 96 56"
        fill="none"
        className="kpi-gauge-track"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {(toned || p > 0) && (
        <path
          d={`M8 56 A44 44 0 0 1 ${x} ${y}`}
          fill="none"
          className="kpi-gauge-fill"
          strokeWidth="8"
          strokeLinecap="round"
        />
      )}
      {tickIn && tickOut && (
        <line
          x1={tickIn[0]}
          y1={tickIn[1]}
          x2={tickOut[0]}
          y2={tickOut[1]}
          className="kpi-gauge-tick"
          strokeWidth="2"
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
        {shown}
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
