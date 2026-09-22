/**
 * Day arithmetic for the date field and the calendar.
 *
 * A value is a DAY - "YYYY-MM-DD" - never a time. Expiry is day-only (Pranjal,
 * 2026-09-22: "no need to provide select time option"), and date arithmetic is
 * date-only (K-Field-30: an end-of-day anchor once made a 10-day save reopen as
 * 11). Nothing here touches hours.
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

const pad = (n: number): string => (n < 10 ? `0${String(n)}` : String(n));

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
