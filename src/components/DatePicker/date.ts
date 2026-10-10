/**
 * Day and time arithmetic for the date field and the calendar.
 *
 * A value is a DAY - "YYYY-MM-DD" - unless the picker runs `withTime`, when it is
 * a day and a local 24-hour time, "YYYY-MM-DDTHH:mm" (2026-09-28: the date and
 * time popover). Day arithmetic stays date-only (K-Field-30: an end-of-day anchor
 * once made a 10-day save reopen as 11); the time rides along as text and never
 * moves the day.
 */
export interface Day {
  /** the full year, 2026 */
  y: number;
  /** the month, 0 = January .. 11 = December */
  mo: number;
  /** the day of the month, 1..31 */
  d: number;
}

export const MONTHS_LONG = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

/** Three-letter months, always - never the browser's locale "Sept". */
export const MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

/** The weekday initials the console's calendar draws, Sunday first. */
export const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

export const pad = (n: number): string => (n < 10 ? `0${String(n)}` : String(n));

/** How many days the month has - 28..31. */
export const daysInMonth = (y: number, mo: number): number => new Date(y, mo + 1, 0).getDate();

/** "2026-10-22" -> { y: 2026, mo: 9, d: 22 }; anything else -> null. A trailing time is ignored. */
export function parseDay(value: string | null | undefined): Day | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value ?? '');
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  if (mo < 0 || mo > 11 || d < 1 || d > daysInMonth(y, mo)) return null;
  return { y, mo, d };
}

/** { y: 2026, mo: 9, d: 22 } -> "2026-10-22" */
export const toDay = ({ y, mo, d }: Day): string => `${String(y)}-${pad(mo + 1)}-${pad(d)}`;

/** A sortable number for a day: 2026-10-22 becomes 20261022. */
export const dayKey = ({ y, mo, d }: Day): number => y * 10000 + (mo + 1) * 100 + d;

/** The local calendar day right now. */
export function today(): Day {
  const n = new Date();
  return { y: n.getFullYear(), mo: n.getMonth(), d: n.getDate() };
}

/** "2026-10-22" -> "22 Oct 2026"; an empty string for anything that is not a day. */
export function formatDay(value: string | null | undefined): string {
  const p = parseDay(value);
  if (!p) return '';
  return `${String(p.d)} ${MONTHS_SHORT[p.mo] ?? ''} ${String(p.y)}`;
}

/** The weekday names, Sunday first, for the time column's header ("Tue, 13 Oct"). */
export const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

/** "2026-10-13T14:30" -> "14:30"; no time, or an impossible one -> null. */
export function parseTime(value: string | null | undefined): string | null {
  const m = /^\d{4}-\d{2}-\d{2}T(\d{2}):(\d{2})/.exec(value ?? '');
  if (!m) return null;
  const h = Number(m[1]);
  const mi = Number(m[2]);
  if (h > 23 || mi > 59) return null;
  return `${pad(h)}:${pad(mi)}`;
}

/** Every time of day on a step of `step` minutes: "00:00" .. "23:30" for 30. A step outside 1..720 falls back to 30. */
export function timeSlots(step = 30): string[] {
  const s = Number.isFinite(step) && step >= 1 && step <= 720 ? Math.floor(step) : 30;
  const out: string[] = [];
  for (let m = 0; m < 24 * 60; m += s) out.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`);
  return out;
}

/** "2026-10-13T14:30" -> "13 Oct 2026, 14:30"; a day with no time reads as the day alone. */
export function formatDateTime(value: string | null | undefined): string {
  const day = formatDay(value);
  if (!day) return '';
  const t = parseTime(value);
  return t ? `${day}, ${t}` : day;
}

/** The day of the week, 0 = Sunday. */
export const weekday = ({ y, mo, d }: Day): number => new Date(y, mo, d).getDay();
