import { useState } from 'react';
import { cn } from '@/utils';
import { Button } from '../Button';
import { Icon } from '../Icon';
import type { DatePickerProps } from './DatePicker.types';
import {
  MONTHS_LONG,
  WEEKDAYS,
  type Day,
  dayKey,
  daysInMonth,
  parseDay,
  toDay,
  today,
} from './date';

/**
 * DatePicker - the calendar, as a part of its own (Pranjal, 2026-09-22: "the
 * date picker drop push as a separate component as well").
 *
 * Ported from the console's month grid (compat/iam/DatePicker.jsx) with its
 * numbers kept: seven columns with a 2-px gap in a 296 grid, weekday initials
 * at 11 / 600, days 34 high with corners 8 at 13 / 500, the month name at
 * 14 / 600. Prev / next are the library's icon-only ghost buttons (28). The
 * chosen day fills with the primary colour; today wears a 1-px neutral-40 ring;
 * days outside `min` / `max` grey to neutral-50 and cannot be clicked, and the
 * month nav stops at a bound. Clear (ghost, sm) and Done (primary, sm) show
 * only when a handler is given.
 *
 * The value is a DAY, "YYYY-MM-DD". The console's 12-hour time picker was
 * dropped on purpose - expiry is day-only (Pranjal, 2026-09-22) - and a
 * `withTime` option is left for later.
 *
 * @example
 * <DatePicker value={day} onChange={setDay} min="2026-10-01" />
 */

interface Month {
  y: number;
  mo: number;
}

const shift = ({ y, mo }: Month, delta: 1 | -1): Month => {
  const next = mo + delta;
  if (next < 0) return { y: y - 1, mo: 11 };
  if (next > 11) return { y: y + 1, mo: 0 };
  return { y, mo: next };
};

/** Where the calendar opens: the value's month; else today's; else the nearest bound's. */
function firstView(value: string | undefined, lo: Day | null, hi: Day | null): Month {
  const v = parseDay(value);
  if (v) return { y: v.y, mo: v.mo };
  const now = today();
  const k = dayKey(now);
  if (lo && k < dayKey(lo)) return { y: lo.y, mo: lo.mo };
  if (hi && k > dayKey(hi)) return { y: hi.y, mo: hi.mo };
  return { y: now.y, mo: now.mo };
}

/* the day cell: 34 high, corners 8, 13 / 500 (the console's numbers) */
const DAY =
  'mdt-flex mdt-h-[34px] mdt-w-full mdt-items-center mdt-justify-center mdt-rounded-lg mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-[13px] mdt-font-medium mdt-transition-colors focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-inset focus-visible:mdt-ring-blue-40';
const DAY_OK =
  'mdt-cursor-pointer mdt-text-foreground hover:mdt-bg-neutral-10 dark:hover:mdt-bg-neutral-130';
const DAY_OFF = 'mdt-cursor-default mdt-text-neutral-50';
const DAY_TODAY = 'mdt-ring-1 mdt-ring-inset mdt-ring-neutral-40';
const DAY_SELECTED =
  'mdt-bg-primary mdt-text-primary-foreground hover:mdt-bg-primary dark:mdt-bg-neutral-20 dark:mdt-text-neutral-160 dark:hover:mdt-bg-neutral-20';

interface Cell {
  key: string;
  d: number | null;
}

/** The month laid out Sunday-first: blanks up to the first weekday, then every day. */
function cellsFor({ y, mo }: Month): Cell[] {
  const first = new Date(y, mo, 1).getDay();
  const count = daysInMonth(y, mo);
  const cells: Cell[] = [];
  for (let i = 0; i < first; i += 1) cells.push({ key: `blank-${String(i)}`, d: null });
  for (let d = 1; d <= count; d += 1) cells.push({ key: `day-${String(d)}`, d });
  return cells;
}

export function DatePicker({
  value,
  onChange,
  min,
  max,
  onClear,
  onDone,
  className,
  'aria-label': ariaLabel,
}: DatePickerProps) {
  const lo = parseDay(min);
  const hi = parseDay(max);
  const [view, setView] = useState<Month>(() => firstView(value, lo, hi));

  /* an outside change of the value moves the calendar into its month */
  const [seen, setSeen] = useState(value);
  if (value !== seen) {
    setSeen(value);
    const v = parseDay(value);
    if (v && (v.y !== view.y || v.mo !== view.mo)) setView({ y: v.y, mo: v.mo });
  }

  const selected = parseDay(value);
  const now = today();

  const inRange = (day: Day): boolean => {
    const k = dayKey(day);
    return (!lo || k >= dayKey(lo)) && (!hi || k <= dayKey(hi));
  };
  /* a month is reachable while any of its days is in range */
  const reachable = ({ y, mo }: Month): boolean =>
    (!lo || dayKey({ y, mo, d: daysInMonth(y, mo) }) >= dayKey(lo)) &&
    (!hi || dayKey({ y, mo, d: 1 }) <= dayKey(hi));
  const canStep = (delta: 1 | -1): boolean => reachable(shift(view, delta));
  const step = (delta: 1 | -1) => {
    if (canStep(delta)) setView(shift(view, delta));
  };

  const monthName = MONTHS_LONG[view.mo] ?? '';
  const hasFooter = onClear !== undefined || onDone !== undefined;

  return (
    <div
      role="group"
      aria-label={ariaLabel ?? 'Calendar'}
      className={cn('mdt-w-[296px] mdt-text-foreground', className)}
    >
      <div className="mdt-mb-3 mdt-flex mdt-items-center mdt-justify-between">
        <Button
          iconOnly
          variant="ghost"
          size="sm"
          ariaLabel="Previous month"
          disabled={!canStep(-1)}
          onClick={() => {
            step(-1);
          }}
          leftIcon={<Icon name="chevron-left" size={16} aria-hidden />}
        />
        <span className="mdt-text-sm mdt-font-semibold" aria-live="polite">
          {monthName} {String(view.y)}
        </span>
        <Button
          iconOnly
          variant="ghost"
          size="sm"
          ariaLabel="Next month"
          disabled={!canStep(1)}
          onClick={() => {
            step(1);
          }}
          leftIcon={<Icon name="chevron-right" size={16} aria-hidden />}
        />
      </div>

      <div className="mdt-mb-1 mdt-grid mdt-grid-cols-7 mdt-gap-0.5" aria-hidden>
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            className="mdt-text-center mdt-text-[11px] mdt-font-semibold mdt-text-neutral-50"
          >
            {w}
          </div>
        ))}
      </div>

      <div className="mdt-grid mdt-grid-cols-7 mdt-gap-0.5">
        {cellsFor(view).map(({ key, d }) => {
          if (d === null) return <div key={key} />;
          const day: Day = { y: view.y, mo: view.mo, d };
          const ok = inRange(day);
          const isSelected = selected !== null && dayKey(selected) === dayKey(day);
          const isToday = dayKey(now) === dayKey(day);
          return (
            <button
              key={key}
              type="button"
              disabled={!ok}
              aria-pressed={isSelected}
              aria-current={isToday ? 'date' : undefined}
              aria-label={`${String(d)} ${monthName} ${String(view.y)}`}
              className={cn(
                DAY,
                ok ? DAY_OK : DAY_OFF,
                isToday && !isSelected && DAY_TODAY,
                isSelected && DAY_SELECTED
              )}
              onClick={() => {
                onChange?.(toDay(day));
              }}
            >
              {d}
            </button>
          );
        })}
      </div>

      {hasFooter && (
        <div className="mdt-mt-3 mdt-flex mdt-items-center mdt-justify-between mdt-gap-2">
          {onClear ? (
            <Button variant="ghost" size="sm" onClick={onClear}>
              Clear
            </Button>
          ) : (
            <span />
          )}
          {onDone ? (
            <Button variant="primary" size="sm" onClick={onDone}>
              Done
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
}

DatePicker.displayName = 'DatePicker';
