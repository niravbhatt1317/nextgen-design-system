/* THE RULER'S TICKS - ported from the console (Pranjal, 2026-10-28): organizations/shared.js rulerTicks (Settings ->
 * Security policy, 2026-09-23). Which values under a slider get a tick, which ticks are major and which carry a number,
 * for any [min, max]:
 *   - a range wider than 12 units: a tick every 5 units, major on every 10 (the 5 between two majors is the minor
 *     midpoint);
 *   - a range of 12 units or fewer (Concurrent session limit, 1 -> 10): a tick on every unit, major on the multiples of 5;
 *   - a WIDE range (over 300 units - Agent Fleet's troubleshooting cap, 128 -> 16384 MB, 2026-10-17): a tick every 5
 *     would be thousands of ticks, a solid smear, so it takes a round step instead (1, 2 or 5 x 10^n, about 24 ticks),
 *     majors on every second step;
 *   - the floor (min) and the ceiling (max) are always major ticks;
 *   - numbers: on the floor, on the multiples of 5 for the short range, and on every k-th major for the others - k
 *     chosen so there are at most eight numbered majors (15 -> 240 numbers 30, 60 ... 240; 15 -> 60 numbers 20 ... 60;
 *     1 -> 30 numbers 10, 20, 30); the ceiling is numbered when it is on that step.
 * Purely visual: the slider's own min / max / value are never touched. */

/** One tick under the track. */
export interface SliderTick {
  /** The value it stands at. */
  v: number;
  /** A major tick is longer and a step darker. */
  major: boolean;
  /** The number printed under it, or null for none. */
  label: string | null;
}

/** About how many ticks a wide range is cut into. */
const WIDE_TICKS = 24;
/** The most numbered majors a scale prints. */
const MOST_NUMBERS = 8;
/** A range of this many units or fewer gets a tick on every unit. */
const SHORT_SPAN = 12;
/** A range wider than this takes a round step. */
const WIDE_SPAN = 300;

/** The round step (1, 2 or 5 x 10^n) that cuts a wide range into about 24 ticks. */
const roundStep = (span: number): number => {
  const raw = span / WIDE_TICKS;
  const mag = 10 ** Math.floor(Math.log10(raw));
  return ([1, 2, 5].find((m) => m * mag >= raw) ?? 10) * mag;
};

/** Every k-th of `majors` carries its number - k chosen so at most eight are numbered. */
const everyKth = (majors: SliderTick[]): number =>
  Math.max(1, Math.ceil(majors.length / MOST_NUMBERS));

const numberShort = (ticks: SliderTick[], min: number, max: number): void => {
  for (const t of ticks) if (t.v === min || t.v === max || t.v % 5 === 0) t.label = String(t.v);
};

const numberWide = (ticks: SliderTick[], min: number, max: number, step: number): void => {
  const majors = ticks.filter((t) => t.major && t.v !== min && t.v !== max && t.v % step === 0);
  const k = everyKth(majors);
  majors.forEach((t, i) => {
    if (i % k === k - 1) t.label = String(t.v);
  });
  ticks.slice(0, 1).forEach((t) => {
    t.label = String(min);
  });
};

const numberMiddle = (ticks: SliderTick[], min: number): void => {
  const k = everyKth(ticks.filter((t) => t.v % 10 === 0 && t.v !== min));
  for (const t of ticks)
    if (t.v === min || (t.v % (10 * k) === 0 && t.v !== min)) t.label = String(t.v);
};

/** The ticks under a slider from `min` to `max`, in order. Purely visual. */
export const sliderTicks = (min: number, max: number): SliderTick[] => {
  const span = max - min;
  if (!(span > 0)) return [];
  const byValue = new Map<number, SliderTick>();
  const put = (v: number, major: boolean): void => {
    if (v < min || v > max) return;
    const t = byValue.get(v);
    if (t) t.major = t.major || major;
    else byValue.set(v, { v, major, label: null });
  };
  const short = span <= SHORT_SPAN;
  const wide = span > WIDE_SPAN;
  const step = wide ? roundStep(span) : 0;
  if (short) {
    for (let v = Math.ceil(min); v <= max; v += 1) put(v, v % 5 === 0);
  } else if (wide) {
    for (let v = Math.ceil(min / step) * step; v <= max; v += step)
      put(v, Math.round(v / step) % 2 === 0);
  } else {
    for (let v = Math.ceil(min / 5) * 5; v <= max; v += 5) put(v, v % 10 === 0);
  }
  put(min, true);
  put(max, true);
  const ticks = [...byValue.values()].sort((a, b) => a.v - b.v);
  if (short) numberShort(ticks, min, max);
  else if (wide) numberWide(ticks, min, max, step);
  else numberMiddle(ticks, min);
  return ticks;
};

/**
 * Where a value at `p` percent of the range sits: on the native thumb's centre. The thumb is 16 wide, so P% of the
 * track less 16, plus 8. The value tag, the saved mark and every tick ride on it.
 */
export const thumbAt = (p: number): string =>
  `calc(${p.toFixed(3)}% + ${(8 - 0.16 * p).toFixed(2)}px)`;

/**
 * A value with its unit, as the console writes it: a "%" sits on the number ("5%"), any other unit after a space
 * ("60 min"), and a counted unit reads singular at 1 ("1 restart", "1 day" - 2026-10-17); "min" and "MB" stay.
 */
export const formatSliderValue = (n: number, unit: string): string => {
  if (unit === '%') return `${String(n)}%`;
  if (!unit) return String(n);
  const word = n === 1 && /[a-z]s$/.test(unit) ? unit.slice(0, -1) : unit;
  return `${String(n)} ${word}`;
};
