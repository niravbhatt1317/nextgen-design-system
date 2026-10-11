import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { cn } from '@/utils';
import { Button } from '../Button';
import { Icon } from '../Icon';
import type { DatePickerProps } from './DatePicker.types';
import {
  MONTHS_LONG,
  MONTHS_SHORT,
  WEEKDAYS,
  WEEKDAYS_SHORT,
  type Day,
  dayKey,
  daysInMonth,
  parseDay,
  parseTime,
  timeSlots,
  toDay,
  today,
  weekday,
} from './date';

/**
 * DatePicker - the calendar, and with `withTime` the time beside it, in one panel (Pranjal,
 * 2026-09-28: "we need to create a popover where both the time and date can be selected in one
 * popover ... in this time can be enabled and disabled"; the approved mock is
 * next-gen-ui/mocks/foundation/date-time-picker.html).
 *
 * THE CALENDAR, 300 wide (16 above, 20 at the sides, 12 below): the month title between two
 * icon-only ghost chevrons (28, no outline, a hover fill only). The title is a button - "October
 * 2026" with a small down chevron opens the MONTH level (title "2026", still a button, no
 * chevron; three columns of four months, 36 boxes, 8 between rows and 12 between columns; the
 * arrows step a year); "2026" opens the YEAR level (title "2020 – 2039", not a button; twenty
 * years, four columns of five, 36 boxes, 8 apart; the arrows step twenty years). A year opens its
 * months, a month opens its days. Days are 36 x 36 with 8 between rows, Sunday first, the
 * neighbouring months' days in the faint ink; a sixth row shows only when it holds a day of the
 * month.
 *
 * INKS AND FILLS: every number (days, months, years, times) in the secondary ink (neutral-90);
 * today, this month and this year wear a thin neutral-40 outline; the pick is the info badge's
 * pale blue under its blue ink at 600, no outline (--mdt-badge-info-fill / -ink, full colours);
 * under the pointer the overlay hover (--mdt-overlay-hover: neutral-10 in light, the raised step
 * one above the panel in dark).
 *
 * THE TIME COLUMN (`withTime`, a developer setting - never a switch shown to people): 184 wide
 * behind a hairline; the picked day on top ("Tue, 13 Oct", 14 / 600 in the heading ink) over
 * "Local time · 24-hour" (12, faint), a hairline, then a time every `timeStep` minutes (default
 * 30): rows 32 high, 2 apart, no outline, the same hover and pick. The list opens with the picked
 * time in view and keeps its place when a time is clicked.
 *
 * THE DRAFT: nothing is reported until Apply (primary, sm); Reset (ghost, sm) empties the draft.
 * Apply stays off until a day is picked - and a time, with `withTime`. `onClear` / `onDone` from
 * the older Clear / Done footer still work; see DatePicker.types.ts.
 *
 * ONE SIZE AT EVERY LEVEL: with time, the six-row month sets one height (356) and the time column
 * matches it; date only, the panel hugs its days and the month and year levels hold the day
 * level's height.
 *
 * `min` / `max` grey the days, months and years outside them and stop the arrows. Arrow keys move
 * between days (across months), Enter or Space picks.
 *
 * @example
 * <DatePicker value={day} onChange={setDay} min="2026-10-01" />
 * <DatePicker withTime value="2026-10-13T14:30" onChange={setWhen} />
 */

type Level = 'day' | 'month' | 'year';

interface Month {
  y: number;
  mo: number;
}

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

/** A day moved by `delta` days, through the real calendar. */
const addDays = ({ y, mo, d }: Day, delta: number): Day => {
  const n = new Date(y, mo, d + delta);
  return { y: n.getFullYear(), mo: n.getMonth(), d: n.getDate() };
};

/** The month laid out Sunday-first: the tail of the month before, every day, the head of the next.
 *  Six rows, or five when the sixth holds no day of the month. */
function daysFor({ y, mo }: Month): { day: Day; out: boolean }[] {
  const lead = new Date(y, mo, 1).getDay();
  const cells = Array.from({ length: 42 }, (_, i) => {
    const day = addDays({ y, mo, d: 1 }, i - lead);
    return { day, out: day.mo !== mo };
  });
  return cells.slice(35).every((c) => c.out) ? cells.slice(0, 35) : cells;
}

/** The first year of the twenty-year block a year sits in: 2026 -> 2020. */
const blockOf = (y: number): number => y - (((y % 20) + 20) % 20);

/* ── the classes ─────────────────────────────────────────────────────────────────────────── */

/* under the pointer inside the panel: neutral-10 in light, one step above the panel in dark */
const HOVER = 'hover:mdt-bg-[color:hsl(var(--mdt-overlay-hover))]';
/* the ghost chevrons and the title: the library Button (ghost, sm), the hover moved onto the panel's own step */
const NAV = cn(HOVER, 'hover:mdt-text-neutral-90');
const TITLE = cn(
  HOVER,
  'mdt-gap-1 mdt-px-2 mdt-text-sm mdt-font-semibold mdt-leading-none mdt-text-foreground hover:mdt-text-foreground'
);
/* a cell: a day, a month, a year - 36 high, corners 8, 13 / 500 in the secondary ink, figures of one width */
const CELL =
  'mdt-flex mdt-h-9 mdt-items-center mdt-justify-center mdt-rounded-lg mdt-border mdt-border-solid mdt-border-transparent mdt-bg-transparent mdt-p-0 mdt-text-[13px] mdt-font-medium mdt-leading-none mdt-tabular-nums mdt-transition-colors focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-inset focus-visible:mdt-ring-blue-40';
const CELL_OK = cn('mdt-cursor-pointer mdt-text-neutral-90', HOVER);
const CELL_OUT = 'mdt-text-faint';
const CELL_OFF = 'mdt-cursor-default mdt-text-faint mdt-opacity-50';
const CELL_NOW = 'mdt-border-neutral-40';
/* the pick: the info badge's pale blue under its blue ink, 600, no outline (full colours - var(), never hsl(var())) */
const CELL_PICKED =
  'mdt-border-transparent mdt-bg-[color:var(--mdt-badge-info-fill)] mdt-font-semibold mdt-text-[color:var(--mdt-badge-info-ink)] hover:mdt-bg-[color:var(--mdt-badge-info-fill)]';

/* the six-row month with time: 16 + 28 + 12 + 24 + 8 + 6 x 36 + 5 x 8 + 12 = 356 */
const WITH_TIME_HEIGHT = 'mdt-h-[356px]';

const KEY_STEP: Record<string, number> = {
  ArrowLeft: -1,
  ArrowRight: 1,
  ArrowUp: -7,
  ArrowDown: 7,
};

export function DatePicker({
  value,
  onChange,
  withTime = false,
  timeStep = 30,
  min,
  max,
  clearable = false,
  onReset,
  /* the older Clear / Done footer, still honoured (see DatePicker.types.ts) */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  onClear,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  onDone,
  className,
  'aria-label': ariaLabel,
}: DatePickerProps) {
  const lo = parseDay(min);
  const hi = parseDay(max);
  const [view, setView] = useState<Month>(() => firstView(value, lo, hi));
  const [level, setLevel] = useState<Level>('day');
  const [block, setBlock] = useState(() => blockOf(view.y));
  const [draftDay, setDraftDay] = useState<Day | null>(() => parseDay(value));
  const [draftTime, setDraftTime] = useState<string | null>(() => parseTime(value));
  const [focusKey, setFocusKey] = useState<number | null>(null);
  const wantFocus = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const calRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const dayHeight = useRef(0);

  /* an outside change of the value starts the draft again, in its month */
  const [seen, setSeen] = useState(value);
  if (value !== seen) {
    setSeen(value);
    const v = parseDay(value);
    setDraftDay(v);
    setDraftTime(parseTime(value));
    if (v && (v.y !== view.y || v.mo !== view.mo)) setView({ y: v.y, mo: v.mo });
  }

  const now = today();
  const inRange = (day: Day): boolean => {
    const k = dayKey(day);
    return (!lo || k >= dayKey(lo)) && (!hi || k <= dayKey(hi));
  };
  /* a month is reachable while any of its days is in range; a year while any of its months is */
  const monthOk = ({ y, mo }: Month): boolean =>
    (!lo || dayKey({ y, mo, d: daysInMonth(y, mo) }) >= dayKey(lo)) &&
    (!hi || dayKey({ y, mo, d: 1 }) <= dayKey(hi));
  const yearOk = (y: number): boolean => (!lo || y >= lo.y) && (!hi || y <= hi.y);

  /* the date-only panel holds the day level's height at the month and year levels */
  useLayoutEffect(() => {
    if (level === 'day' && calRef.current) dayHeight.current = calRef.current.offsetHeight;
  });

  /* the time list opens with the picked time in view (and keeps its place after: nothing moves it again) */
  useLayoutEffect(() => {
    const list = listRef.current;
    const picked = list?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (list && picked) list.scrollTop = Math.max(0, picked.offsetTop - 60);
  }, []);

  /* the arrow keys move the focus to the day they land on, once it has rendered */
  useEffect(() => {
    if (!wantFocus.current || focusKey === null) return;
    wantFocus.current = false;
    rootRef.current?.querySelector<HTMLElement>(`[data-day="${String(focusKey)}"]`)?.focus();
  }, [focusKey, view]);

  const cells = daysFor(view);
  const inView = (k: number | null): k is number =>
    k !== null && cells.some((c) => !c.out && dayKey(c.day) === k);
  /* the one day the Tab key reaches: the arrowed-to day, the draft, today, else the first open day of the month */
  const tabKey = [
    focusKey,
    draftDay ? dayKey(draftDay) : null,
    dayKey(now),
    ...cells.filter((c) => !c.out && inRange(c.day)).map((c) => dayKey(c.day)),
  ].find(inView);

  const pickDay = (day: Day) => {
    setDraftDay(day);
    setFocusKey(dayKey(day));
    if (day.y !== view.y || day.mo !== view.mo) setView({ y: day.y, mo: day.mo });
  };

  const onDayKey = (e: KeyboardEvent<HTMLButtonElement>, day: Day) => {
    const step = KEY_STEP[e.key];
    if (step === undefined) return;
    e.preventDefault();
    const next = addDays(day, step);
    if (!inRange(next)) return;
    if (next.y !== view.y || next.mo !== view.mo) setView({ y: next.y, mo: next.mo });
    wantFocus.current = true;
    setFocusKey(dayKey(next));
  };

  /* ── the arrows and the title, per level ── */
  let prev: { label: string; ok: boolean; go: () => void };
  let next: { label: string; ok: boolean; go: () => void };
  let title: { text: string; label?: string; up?: () => void; chevron?: boolean };
  if (level === 'day') {
    const back: Month = view.mo === 0 ? { y: view.y - 1, mo: 11 } : { y: view.y, mo: view.mo - 1 };
    const fwd: Month = view.mo === 11 ? { y: view.y + 1, mo: 0 } : { y: view.y, mo: view.mo + 1 };
    prev = {
      label: 'Previous month',
      ok: monthOk(back),
      go: () => {
        setView(back);
      },
    };
    next = {
      label: 'Next month',
      ok: monthOk(fwd),
      go: () => {
        setView(fwd);
      },
    };
    const text = `${MONTHS_LONG[view.mo] ?? ''} ${String(view.y)}`;
    title = {
      text,
      label: `${text}, choose a month`,
      up: () => {
        setLevel('month');
      },
      chevron: true,
    };
  } else if (level === 'month') {
    prev = {
      label: 'Previous year',
      ok: yearOk(view.y - 1),
      go: () => {
        setView({ y: view.y - 1, mo: view.mo });
      },
    };
    next = {
      label: 'Next year',
      ok: yearOk(view.y + 1),
      go: () => {
        setView({ y: view.y + 1, mo: view.mo });
      },
    };
    title = {
      text: String(view.y),
      label: `${String(view.y)}, choose a year`,
      up: () => {
        setBlock(blockOf(view.y));
        setLevel('year');
      },
    };
  } else {
    prev = {
      label: 'Earlier years',
      ok: yearOk(block - 1),
      go: () => {
        setBlock(block - 20);
      },
    };
    next = {
      label: 'Later years',
      ok: yearOk(block + 20),
      go: () => {
        setBlock(block + 20);
      },
    };
    title = { text: `${String(block)} – ${String(block + 19)}` };
  }

  /* ── the time column's list: every step, plus the draft's own time when it falls between ── */
  const slots = timeSlots(timeStep);
  if (draftTime && !slots.includes(draftTime)) {
    slots.push(draftTime);
    slots.sort();
  }

  const valueDay = parseDay(value);
  const allowEmpty = clearable || onClear !== undefined;
  const complete = draftDay !== null && (!withTime || draftTime !== null);
  const canApply = complete || (allowEmpty && draftDay === null && valueDay !== null);

  const apply = () => {
    if (!canApply) return;
    let out = '';
    if (draftDay) out = withTime && draftTime ? `${toDay(draftDay)}T${draftTime}` : toDay(draftDay);
    onChange?.(out);
    onDone?.();
  };
  const reset = () => {
    setDraftDay(null);
    setDraftTime(null);
    onReset?.();
    onClear?.();
  };

  const heldHeight =
    !withTime && level !== 'day' && dayHeight.current > 0 ? dayHeight.current : undefined;

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label={ariaLabel ?? 'Calendar'}
      className={cn('mdt-flex mdt-w-max mdt-flex-col mdt-text-popover-foreground', className)}
    >
      <div className="mdt-flex">
        <div
          ref={calRef}
          className={cn('mdt-w-[300px] mdt-px-5 mdt-pb-3 mdt-pt-4', withTime && WITH_TIME_HEIGHT)}
          style={heldHeight ? { height: heldHeight } : undefined}
        >
          <div className="mdt-mb-3 mdt-flex mdt-items-center mdt-justify-between">
            <Button
              iconOnly
              variant="ghost"
              size="sm"
              ariaLabel={prev.label}
              disabled={!prev.ok}
              className={NAV}
              leftIcon={<Icon name="chevron-left" size={16} aria-hidden />}
              onClick={prev.go}
            />
            {title.up ? (
              <Button
                variant="ghost"
                size="sm"
                ariaLabel={title.label}
                className={TITLE}
                rightIcon={
                  title.chevron ? (
                    <Icon
                      name="chevron-down"
                      size={14}
                      className="mdt-text-neutral-90"
                      aria-hidden
                    />
                  ) : undefined
                }
                onClick={title.up}
              >
                {title.text}
              </Button>
            ) : (
              <span className="mdt-inline-flex mdt-h-7 mdt-items-center mdt-px-2 mdt-text-sm mdt-font-semibold mdt-leading-none mdt-text-foreground">
                {title.text}
              </span>
            )}
            <Button
              iconOnly
              variant="ghost"
              size="sm"
              ariaLabel={next.label}
              disabled={!next.ok}
              className={NAV}
              leftIcon={<Icon name="chevron-right" size={16} aria-hidden />}
              onClick={next.go}
            />
          </div>

          {level === 'day' && (
            <div
              role="group"
              aria-label={title.text}
              className="mdt-grid mdt-grid-cols-[repeat(7,36px)] mdt-justify-between mdt-gap-x-px mdt-gap-y-2"
            >
              {WEEKDAYS.map((w) => (
                <div
                  key={w}
                  aria-hidden
                  className="mdt-flex mdt-h-6 mdt-items-center mdt-justify-center mdt-text-[11px] mdt-font-medium mdt-leading-none mdt-text-faint"
                >
                  {w}
                </div>
              ))}
              {cells.map(({ day, out }) => {
                const k = dayKey(day);
                const ok = inRange(day);
                const picked = draftDay !== null && dayKey(draftDay) === k;
                const isToday = dayKey(now) === k;
                return (
                  <button
                    key={k}
                    type="button"
                    data-day={k}
                    tabIndex={k === tabKey ? 0 : -1}
                    disabled={!ok}
                    aria-pressed={picked}
                    aria-current={isToday ? 'date' : undefined}
                    aria-label={`${String(day.d)} ${MONTHS_LONG[day.mo] ?? ''} ${String(day.y)}`}
                    className={cn(
                      CELL,
                      'mdt-w-9',
                      ok ? CELL_OK : CELL_OFF,
                      ok && out && CELL_OUT,
                      isToday && CELL_NOW,
                      picked && CELL_PICKED
                    )}
                    onClick={() => {
                      pickDay(day);
                    }}
                    onKeyDown={(e) => {
                      onDayKey(e, day);
                    }}
                  >
                    {day.d}
                  </button>
                );
              })}
            </div>
          )}

          {level === 'month' && (
            <div
              role="group"
              aria-label={`Months of ${String(view.y)}`}
              className="mdt-grid mdt-grid-cols-3 mdt-gap-x-3 mdt-gap-y-2 mdt-pt-1"
            >
              {MONTHS_SHORT.map((name, mo) => {
                const ok = monthOk({ y: view.y, mo });
                const picked = draftDay !== null && draftDay.y === view.y && draftDay.mo === mo;
                const isNow = now.y === view.y && now.mo === mo;
                return (
                  <button
                    key={name}
                    type="button"
                    disabled={!ok}
                    aria-pressed={picked}
                    aria-current={isNow ? 'date' : undefined}
                    aria-label={`${MONTHS_LONG[mo] ?? ''} ${String(view.y)}`}
                    className={cn(
                      CELL,
                      ok ? CELL_OK : CELL_OFF,
                      isNow && CELL_NOW,
                      picked && CELL_PICKED
                    )}
                    onClick={() => {
                      setView({ y: view.y, mo });
                      setLevel('day');
                    }}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          )}

          {level === 'year' && (
            <div
              role="group"
              aria-label="Years"
              className="mdt-grid mdt-grid-cols-4 mdt-gap-2 mdt-pt-1"
            >
              {Array.from({ length: 20 }, (_, i) => block + i).map((y) => {
                const ok = yearOk(y);
                const picked = draftDay?.y === y;
                const isNow = now.y === y;
                return (
                  <button
                    key={y}
                    type="button"
                    disabled={!ok}
                    aria-pressed={picked}
                    aria-current={isNow ? 'date' : undefined}
                    className={cn(
                      CELL,
                      ok ? CELL_OK : CELL_OFF,
                      isNow && CELL_NOW,
                      picked && CELL_PICKED
                    )}
                    onClick={() => {
                      setView({ y, mo: view.mo });
                      setLevel('month');
                    }}
                  >
                    {y}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {withTime && (
          <div
            className={cn(
              'mdt-flex mdt-w-[184px] mdt-flex-col mdt-border-0 mdt-border-l mdt-border-solid mdt-border-neutral-30',
              WITH_TIME_HEIGHT
            )}
          >
            <div className="mdt-border-0 mdt-border-b mdt-border-solid mdt-border-neutral-30 mdt-px-4 mdt-pb-3 mdt-pt-4">
              <div className="mdt-text-sm mdt-font-semibold mdt-leading-[1.4] mdt-text-foreground">
                {draftDay
                  ? `${WEEKDAYS_SHORT[weekday(draftDay)] ?? ''}, ${String(draftDay.d)} ${MONTHS_SHORT[draftDay.mo] ?? ''}`
                  : 'No day yet'}
              </div>
              <div className="mdt-mt-px mdt-text-xs mdt-leading-normal mdt-text-faint">
                Local time · 24-hour
              </div>
            </div>
            <div
              ref={listRef}
              role="listbox"
              aria-label="Times"
              className="mdt-relative mdt-flex mdt-min-h-0 mdt-flex-1 mdt-flex-col mdt-gap-0.5 mdt-overflow-y-auto mdt-p-3"
            >
              {slots.map((t) => {
                const picked = draftTime === t;
                return (
                  <button
                    key={t}
                    type="button"
                    role="option"
                    aria-selected={picked}
                    className={cn(
                      CELL,
                      'mdt-h-8 mdt-w-full mdt-shrink-0',
                      CELL_OK,
                      picked && CELL_PICKED
                    )}
                    onClick={() => {
                      setDraftTime(t);
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="mdt-flex mdt-items-center mdt-justify-end mdt-gap-2 mdt-border-0 mdt-border-t mdt-border-solid mdt-border-neutral-30 mdt-px-4 mdt-py-3">
        <Button variant="ghost" size="md" className={HOVER} onClick={reset}>
          Reset
        </Button>
        <Button variant="primary" size="md" disabled={!canApply} onClick={apply}>
          Apply
        </Button>
      </div>
    </div>
  );
}

DatePicker.displayName = 'DatePicker';
