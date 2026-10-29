import { forwardRef, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import { InputVariants } from '../Input/Input';
import { Popover, PopoverAnchor, PopoverContent } from '../Popover';
import type { DurationInputProps } from './DurationInput.types';

/*
 * DurationInput - A DURATION IN ONE BOX. Ported from the console's discovery profile Schedule & Notify step (Max
 * runtime; features/discovery-profiles/wizard/TimeField.jsx DurationField and parts.css .dp-dur, Ronak 2026-10-22:
 * "user can select like 5 days, 4 hours and 45 minutes ... very clean and attractive ... user friendly ... use our
 * theme and component"). The Input's own frame (InputVariants) with its padding given up to three equal segments,
 * Days · Hours · Minutes, a hairline between them running border to border; each a bare number (the browser's spin
 * arrows hidden) with its unit word after it, 13 in the faint ink - the NumberInput's `unit` three times over. The
 * frame takes the field's focus look while any segment holds the caret: the primary border and the 3 halo.
 *
 * THE OVERFLOW CARRIES (Ronak, 2026-10-23: "if user enter 80 min than there will be add 1 in the hours fields and
 * automatically calculated remaining 20 min ... if user enter 36 hours than there will be add the 1 in the days
 * fields"): hours and minutes take any number while typed, and on leaving the box (or Enter) the total is laid out
 * again as days · hours (0-23) · minutes (0-59); a line under the box says what moved ("80 minutes → 1 hour 20
 * minutes"), gone on the next edit or after a few seconds. The days stop at `maxDays`.
 *
 * A LIST UNDER HOURS AND MINUTES (Ronak, 2026-10-22: "when we click on the hours and minutes inputs there should be
 * also show the dropdown ... minute dropdown of the 5 minutes distance"): a press on either segment drops the
 * DatePicker's time column under it - Hours 0..23, Minutes every `minuteStep` - the caret staying in the segment so
 * typing goes on; a pick lands at once and the list closes. ArrowDown opens it from the keyboard into the rows,
 * Escape closes it. Days has no list - a count is typed.
 *
 * The value is one number of minutes; `parseDuration` and `formatDuration` read and write the words the console's
 * profiles carry ("5 days 4 hours 45 minutes").
 */

const DAY = 1440;
const HOUR = 60;

/**
 * "5 days 4 hours 45 minutes" (day / hour / hr / minute / min, singular or plural, any order) to minutes. Text that
 * names no duration at all - the profiles' "No limit", or nothing - is `null`, never 0: no limit is not zero minutes
 * (Nirav's review of #188, 2026-10-29; the console models unlimited as `null` too, EnrollFlow.jsx).
 */
export const parseDuration = (text: string): number | null => {
  let total: number | null = null;
  for (const m of text.matchAll(/(\d+)\s*(day|hour|hr|minute|min)s?/gi)) {
    const n = Number(m[1]);
    const unit = (m[2] ?? '').toLowerCase();
    total = (total ?? 0) + (unit.startsWith('d') ? n * DAY : unit.startsWith('h') ? n * HOUR : n);
  }
  return total;
};

/** What `formatDuration` writes for `null` - the duration with no limit. */
export const NO_LIMIT = 'No limit';

/** Minutes laid out as days · hours (0-23) · minutes (0-59). */
const layOut = (minutes: number) => {
  const total = Math.max(0, Math.floor(minutes));
  return { d: Math.floor(total / DAY), h: Math.floor((total % DAY) / HOUR), m: total % HOUR };
};

/** Minutes to the words the profile carries: 90 -> "1 hour 30 minutes", 0 -> "", null -> "No limit". */
export const formatDuration = (minutes: number | null): string => {
  if (minutes === null) return NO_LIMIT;
  const { d, h, m } = layOut(minutes);
  return (
    [
      [d, 'day'],
      [h, 'hour'],
      [m, 'minute'],
    ] as const
  )
    .filter(([n]) => n > 0)
    .map(([n, w]) => `${String(n)} ${w}${n === 1 ? '' : 's'}`)
    .join(' ');
};

type Seg = 'd' | 'h' | 'm';
type Draft = Record<Seg, string>;
const SEGS: { key: Seg; word: string }[] = [
  { key: 'd', word: 'Days' },
  { key: 'h', word: 'Hours' },
  { key: 'm', word: 'Minutes' },
];

/* THE DATEPICKER'S TIME OPTION, verbatim - its box, ink, hover wash and focus ring, the pick on the info wash - only
   reading from the left, as a column dropped alone under a field does (the select lists read so). The plain and the
   picked looks share no class the other must beat. */
const ROW =
  'mdt-flex mdt-h-8 mdt-w-full mdt-shrink-0 mdt-cursor-pointer mdt-items-center mdt-justify-start mdt-rounded-lg mdt-border mdt-border-solid mdt-border-transparent mdt-px-2 mdt-py-0 mdt-text-[13px] mdt-leading-none mdt-tabular-nums mdt-transition-colors focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-inset focus-visible:mdt-ring-blue-40';
const ROW_PLAIN =
  'mdt-bg-transparent mdt-font-medium mdt-text-neutral-90 hover:mdt-bg-[color:hsl(var(--mdt-overlay-hover))]';
const ROW_PICKED =
  'mdt-bg-[color:var(--mdt-badge-info-fill)] mdt-font-semibold mdt-text-[color:var(--mdt-badge-info-ink)] hover:mdt-bg-[color:var(--mdt-badge-info-fill)]';

/** One column of rows under a segment: its head 12 in the faint ink, the rows 32 high, 112 wide, 240 tall in all. */
function Column({
  label,
  items,
  picked,
  onPick,
}: {
  label: string;
  items: string[];
  picked: string | null;
  onPick: (value: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  /* the picked row starts in view, as the DatePicker's time column scrolls to its pick */
  useLayoutEffect(() => {
    const el = ref.current;
    const sel = el?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (el && sel) el.scrollTop = Math.max(0, sel.offsetTop - 60);
  }, []);
  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const step = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
    if (step === 0 || !ref.current) return;
    e.preventDefault();
    const rows = Array.from(ref.current.querySelectorAll<HTMLButtonElement>('[role="option"]'));
    rows[rows.indexOf(e.currentTarget) + step]?.focus();
  };
  return (
    <div className="mdt-flex mdt-h-60 mdt-w-28 mdt-flex-col">
      <div className="mdt-px-5 mdt-pb-1 mdt-pt-2.5 mdt-text-left mdt-text-xs mdt-text-faint">
        {label}
      </div>
      <div
        ref={ref}
        role="listbox"
        aria-label={label}
        className="mdt-relative mdt-flex mdt-min-h-0 mdt-flex-1 mdt-flex-col mdt-gap-0.5 mdt-overflow-y-auto mdt-p-3 mdt-pt-0"
      >
        {items.map((t) => (
          <button
            key={t}
            type="button"
            role="option"
            aria-selected={picked === t}
            tabIndex={picked === t || (picked === null && t === items[0]) ? 0 : -1}
            className={cn(ROW, picked === t ? ROW_PICKED : ROW_PLAIN)}
            onClick={() => {
              onPick(t);
            }}
            onKeyDown={onKey}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * DurationInput - days, hours and minutes in one box, each number with its unit word after it in the faint ink, a
 * hairline between the segments; hours past 23 and minutes past 59 carry over when the box is left, and a press on
 * Hours or Minutes drops a list under it. The value is one number of minutes.
 *
 * @example
 * ```tsx
 * <DurationInput label="Max runtime" value={minutes} onChange={setMinutes} />
 * ```
 */
export const DurationInput = forwardRef<HTMLDivElement, DurationInputProps>(function DurationInput(
  {
    value,
    defaultValue,
    onChange,
    label,
    error,
    helperText,
    size = 'sm',
    disabled,
    maxDays = 999,
    minuteStep = 5,
    lists = true,
    wrapperClassName,
    className,
    id: idProp,
    'aria-label': ariaLabel,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const labelId = `${id}-label`;
  const daysId = `${id}-days`;
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  const hasError = Boolean(error);
  const off = Boolean(disabled);

  const [inner, setInner] = useState(defaultValue ?? 0);
  const minutes = value ?? inner;
  const saved = layOut(minutes);
  const [draft, setDraft] = useState<Draft | null>(null); // the three as typed; null - the box shows the saved value
  const [open, setOpen] = useState<Seg | null>(null); // the segment whose list is up
  const [carried, setCarried] = useState(''); // what the last commit moved: "80 minutes → 1 hour 20 minutes"
  const inputs = useRef<Record<Seg, HTMLInputElement | null>>({ d: null, h: null, m: null });
  const anchors = useRef<Record<Seg, HTMLElement | null>>({ d: null, h: null, m: null });
  const panel = useRef<HTMLDivElement>(null);
  const via = useRef<'input' | 'keys'>('input'); // a press on the segment keeps the caret; ArrowDown moves into the rows

  /* a new value from outside (a commit, another tab) drops the typing */
  useEffect(() => {
    setDraft(null);
  }, [minutes]);
  useEffect(() => {
    if (!carried) return undefined;
    const t = window.setTimeout(() => {
      setCarried('');
    }, 4000);
    return () => {
      window.clearTimeout(t);
    };
  }, [carried]);

  const cur: Draft = draft ?? {
    d: saved.d ? String(saved.d) : '',
    h: saved.h ? String(saved.h) : '',
    m: saved.m ? String(saved.m) : '',
  };
  const totalOf = (x: Draft) =>
    (Number(x.d) || 0) * DAY + (Number(x.h) || 0) * HOUR + (Number(x.m) || 0);
  const cap = maxDays * DAY + 23 * HOUR + 59;

  const put = (next: number) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
  };

  /* days are CLAMPED at maxDays as typed - every digit kept, then held at the cap, so 1500 reads 999 and never a cut
     150 (Nirav's review of #188); hours and minutes may run over, to carry on commit */
  const type = (k: Seg, text: string) => {
    const all = text.replace(/\D/g, '');
    const digits = k === 'd' ? all : all.slice(0, 5);
    setCarried('');
    setDraft({
      ...cur,
      [k]:
        digits === '' ? '' : String(k === 'd' ? Math.min(Number(digits), maxDays) : Number(digits)),
    });
  };

  const commit = () => {
    if (!draft) return;
    const raw = { h: Number(draft.h) || 0, m: Number(draft.m) || 0 };
    const next = Math.min(totalOf(draft), cap);
    /* say what moved: the segment that ran over, in its own words, and what it became */
    if (raw.m > 59) setCarried(`${String(raw.m)} minutes → ${formatDuration(raw.m)}`);
    else if (raw.h > 23) setCarried(`${String(raw.h)} hours → ${formatDuration(raw.h * HOUR)}`);
    if (next !== minutes) put(next);
    /* the draft goes on both paths, so the box shows `minutes` - a parent that clamps or refuses is what is drawn,
       not the typing it refused (Nirav's review of #188) */
    setDraft(null);
  };

  const show = (k: Seg, how: 'input' | 'keys') => {
    if (off) return;
    via.current = how;
    setOpen(k);
  };

  /* the rows a segment offers: every hour; the minutes every step, a typed one off the step kept in its place */
  const rowsFor = (k: Seg): string[] => {
    if (k === 'h') return Array.from({ length: 24 }, (_, i) => String(i));
    const step = Math.max(1, Math.floor(minuteStep));
    const list = Array.from({ length: Math.ceil(60 / step) }, (_, i) => String(i * step));
    const typed = cur.m === '' ? -1 : Number(cur.m);
    if (typed >= 0 && typed < 60 && !list.includes(String(typed))) {
      list.push(String(typed));
      list.sort((a, b) => Number(a) - Number(b));
    }
    return list;
  };

  const pick = (k: Seg, v: string) => {
    const next = Math.min(totalOf({ ...cur, [k]: v }), cap);
    setDraft(null);
    setOpen(null);
    if (next !== minutes) put(next);
    inputs.current[k]?.focus();
  };

  return (
    <div className={cn('mdt-flex mdt-flex-col mdt-gap-1.5', wrapperClassName)}>
      {label && (
        <label
          id={labelId}
          htmlFor={daysId}
          className="mdt-text-[13px] mdt-font-medium mdt-text-neutral-90"
        >
          {label}
        </label>
      )}
      <div
        ref={ref}
        role="group"
        aria-labelledby={label ? labelId : undefined}
        aria-label={ariaLabel}
        className={cn(
          InputVariants({ size, hasError }),
          /* the frame's padding given up to the segments; the focus look while any of them holds the caret */
          'mdt-cursor-text mdt-items-stretch mdt-overflow-hidden mdt-p-0',
          'focus-within:mdt-border-primary focus-within:mdt-shadow-[0_0_0_3px_hsl(var(--mdt-primary)/0.08)]',
          hasError &&
            'focus-within:mdt-border-destructive focus-within:mdt-shadow-[0_0_0_3px_hsl(var(--mdt-destructive)/0.14)]',
          off &&
            'mdt-cursor-not-allowed mdt-bg-neutral-10 mdt-text-faint hover:mdt-border-neutral-30',
          className
        )}
        {...props}
      >
        {SEGS.map(({ key: k, word }, i) => {
          const listed = lists && k !== 'd';
          const top = k === 'h' ? 23 : 59;
          const seg = (
            <label
              key={k}
              ref={(el) => {
                anchors.current[k] = el;
              }}
              className={cn(
                'mdt-flex mdt-min-w-0 mdt-flex-1 mdt-cursor-text mdt-items-center mdt-gap-1.5 mdt-px-2.5',
                i > 0 && 'mdt-border-0 mdt-border-l mdt-border-solid mdt-border-neutral-30',
                off && 'mdt-cursor-not-allowed'
              )}
            >
              <input
                id={k === 'd' ? daysId : undefined}
                ref={(el) => {
                  inputs.current[k] = el;
                }}
                type="number"
                min={0}
                max={k === 'd' ? maxDays : undefined}
                step={1}
                inputMode="numeric"
                placeholder="0"
                disabled={off}
                aria-label={
                  k === 'd'
                    ? `${word} (0 to ${String(maxDays)})`
                    : `${word} - more than ${String(top)} carries over`
                }
                aria-invalid={hasError}
                aria-describedby={error ? errorId : helperText ? helperId : undefined}
                aria-haspopup={listed ? 'listbox' : undefined}
                value={cur[k]}
                onClick={() => {
                  if (listed && open !== k) show(k, 'input');
                }}
                onChange={(e) => {
                  type(k, e.target.value);
                }}
                onBlur={commit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    commit();
                    setOpen(null);
                  } else if (e.key === 'ArrowDown' && listed && open !== k) {
                    e.preventDefault();
                    show(k, 'keys');
                  }
                }}
                /* a bare number: no box of its own, the spin arrows hidden, 13 in the frame's ink and weight */
                className="mdt-w-full mdt-min-w-0 mdt-flex-auto mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-[13px] mdt-tabular-nums mdt-text-inherit mdt-outline-none [appearance:textfield] placeholder:mdt-font-normal placeholder:mdt-text-faint disabled:mdt-cursor-not-allowed [&::-webkit-inner-spin-button]:mdt-appearance-none [&::-webkit-outer-spin-button]:mdt-appearance-none"
              />
              <span className="mdt-shrink-0 mdt-select-none mdt-whitespace-nowrap mdt-text-[13px] mdt-leading-none mdt-text-faint">
                {word}
              </span>
            </label>
          );
          if (!listed) return seg;
          return (
            <Popover
              key={k}
              open={open === k}
              onOpenChange={(o) => {
                setOpen(o ? k : null);
              }}
            >
              <PopoverAnchor asChild>{seg}</PopoverAnchor>
              <PopoverContent
                ref={panel}
                align="start"
                sideOffset={6}
                collisionPadding={8}
                className="mdt-w-auto mdt-rounded-xl mdt-p-0"
                /* a press back on the segment is not "outside" - the list stays up while the number is typed */
                onInteractOutside={(e) => {
                  const a = anchors.current[k];
                  if (a && e.target instanceof Node && a.contains(e.target)) e.preventDefault();
                }}
                onOpenAutoFocus={(e) => {
                  e.preventDefault();
                  if (via.current === 'input') return; // the caret stays where it was pressed
                  panel.current
                    ?.querySelector<HTMLElement>('[role="option"][tabindex="0"]')
                    ?.focus();
                }}
                onCloseAutoFocus={(e) => {
                  e.preventDefault();
                }}
              >
                <div role="group" aria-label={`Pick ${word.toLowerCase()}`}>
                  <Column
                    label={word}
                    items={rowsFor(k)}
                    picked={cur[k] === '' ? null : String(Number(cur[k]))}
                    onPick={(v) => {
                      pick(k, v);
                    }}
                  />
                </div>
              </PopoverContent>
            </Popover>
          );
        })}
      </div>
      {error && (
        <p
          id={errorId}
          className="mdt-flex mdt-items-start mdt-gap-1.5 mdt-text-xs mdt-text-destructive"
          role="alert"
        >
          {/* the alert mark, 12, on the first line (K-Field-10) */}
          <Icon name="alert-circle" size={12} className="mdt-mt-0.5 mdt-shrink-0" aria-hidden />
          {error}
        </p>
      )}
      {!error && carried && (
        <p
          className="mdt-flex mdt-animate-fade-in mdt-items-start mdt-gap-1.5 mdt-text-xs mdt-text-neutral-60"
          role="status"
        >
          <Icon name="info" size={12} className="mdt-mt-0.5 mdt-shrink-0" aria-hidden />
          {carried}
        </p>
      )}
      {!error && !carried && helperText && (
        <p id={helperId} className="mdt-text-xs mdt-text-muted-foreground">
          {helperText}
        </p>
      )}
    </div>
  );
});

DurationInput.displayName = 'DurationInput';
