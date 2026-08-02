import { cva } from 'class-variance-authority';
import { forwardRef, isValidElement } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/utils';
import type {
  ProgressBreakdownProps,
  ProgressCaption,
  ProgressLegendItem,
  ProgressLegendSwatch,
  ProgressProps,
  ProgressTone,
} from './Progress.types';

const PERCENT = 100;
const DEFAULT_MAX = 100;

/**
 * Progress styles.
 *
 * Org Mgmt and Agent Fleet both built this, and both audits call their version
 * "the cleanest atom in the set - zero drift". Two teams arrived at the same
 * thing independently and neither found a fault in it, so this follows it
 * closely: a tinted track, a value fill, and optional markers on the track.
 */
export const progressVariants = cva(
  'mdt-w-full mdt-overflow-hidden mdt-rounded-full mdt-bg-muted',
  {
    variants: {
      size: {
        sm: 'mdt-h-1',
        md: 'mdt-h-1.5',
        lg: 'mdt-h-2',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

const FILL_TONE: Record<ProgressTone, string> = {
  default: 'mdt-bg-info',
  success: 'mdt-bg-success',
  warning: 'mdt-bg-warning',
  danger: 'mdt-bg-destructive',
};

const SWATCH_TONE: Record<ProgressLegendSwatch, string> = {
  ...FILL_TONE,
  track: 'mdt-bg-muted',
  baseline: 'mdt-bg-purple-70',
  floor: 'mdt-bg-muted-foreground',
};

const clamp = (n: number, min: number, max: number): number => Math.min(Math.max(n, min), max);

/**
 * One line of words, with an end at each side.
 *
 * `justify-between` rather than a two-column grid, so a line with only a right
 * end sits hard against the right edge instead of leaving an empty column where
 * the left end would have been.
 *
 * The digits are set to one width. Stack four bars and the figures on the right
 * form a straight edge rather than jittering - 1,860 and 9 otherwise sit at
 * different distances from the edge and the column looks broken.
 */
function Caption({
  caption,
  className,
  slot,
}: {
  readonly caption: ProgressCaption;
  readonly className: string;
  readonly slot: string;
}) {
  const isPair =
    caption !== null &&
    typeof caption === 'object' &&
    !isValidElement(caption) &&
    ('left' in caption || 'right' in caption);
  const parts = isPair
    ? (caption as { left?: ReactNode; right?: ReactNode })
    : { left: caption as ReactNode };

  const left = parts.left ?? null;
  const right = parts.right ?? null;
  if (left === null && right === null) return null;

  return (
    <div
      data-slot={slot}
      className={cn(
        'mdt-flex mdt-items-baseline mdt-gap-4',
        left === null ? 'mdt-justify-end' : 'mdt-justify-between',
        className
      )}
    >
      {left !== null ? <span data-slot={`${slot}-left`}>{left}</span> : null}
      {right !== null ? (
        <span data-slot={`${slot}-right`} className="mdt-shrink-0 mdt-tabular-nums">
          {right}
        </span>
      ) : null}
    </div>
  );
}

/**
 * The key.
 *
 * A key of one colour explains nothing, so this is only drawn when there is more
 * than one thing on the track. It goes last, on its own line, because it
 * explains the colours rather than saying anything new - and it wraps freely,
 * because five or six parts on a narrow column is normal.
 */
function Legend({ items }: { readonly items: ProgressLegendItem[] }) {
  if (items.length === 0) return null;
  return (
    <div
      data-slot="progress-legend"
      className="mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-x-4 mdt-gap-y-1.5 mdt-text-xs mdt-text-muted-foreground"
    >
      {items.map((item, i) => (
        <span
          // The position is the identity. A label may be a whole element rather
          // than a word, so it cannot be turned into a key - and this list is a
          // prop, drawn in the order given, never reordered from inside.
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          data-slot="progress-legend-item"
          className="mdt-inline-flex mdt-items-center mdt-gap-1.5 mdt-whitespace-nowrap"
        >
          <span
            aria-hidden="true"
            className={cn(
              'mdt-block mdt-shrink-0 mdt-rounded-sm',
              // A marker on the track is a line, so its swatch is a line too. A
              // square would say "a band of the bar is this colour", which is
              // the opposite of what a marker is.
              item.swatch === 'baseline' || item.swatch === 'floor'
                ? 'mdt-h-2.5 mdt-w-0.5 mdt-rounded-full'
                : 'mdt-h-2 mdt-w-2',
              SWATCH_TONE[item.swatch ?? 'default']
            )}
          />
          {item.label}
          {item.value !== undefined ? (
            <b className="mdt-font-medium mdt-tabular-nums mdt-text-foreground">{item.value}</b>
          ) : null}
        </span>
      ))}
    </div>
  );
}

/**
 * Progress - how far along something is.
 *
 * ## Four slots for words, and a key
 *
 * A line above and a line below, each with a left end and a right end, so a name
 * and its number sit at opposite sides of the same bar. Any of the four can be
 * left out. The key goes last and is for the **markers** - `baseline` and
 * `floor` - because a key of one colour explains nothing.
 *
 * ## It is one value
 *
 * A bar split into named parts is not progress: nothing is advancing toward
 * finishing, it is a whole broken up, and there is no single value for a screen
 * reader to announce. That is `ProgressBreakdown`.
 *
 * @example
 * ```tsx
 * <Progress value={62} aria-label="Storage used" />
 *
 * <Progress
 *   value={91}
 *   tone="danger"
 *   baseline={75}
 *   above={{ left: 'Seats used', right: '91 of 100' }}
 *   below={{ right: '9 left' }}
 *   legend={[
 *     { label: 'Used', value: 91, swatch: 'danger' },
 *     { label: 'Your plan allows', value: 75, swatch: 'baseline' },
 *   ]}
 *   aria-label="Seats used"
 * />
 * ```
 */
const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = DEFAULT_MAX,
      tone = 'default',
      size = 'md',
      baseline,
      floor,
      above,
      below,
      legend,
      className,
      ...rest
    },
    ref
  ) => {
    const safeMax = max > 0 ? max : DEFAULT_MAX;
    const clamped = clamp(value, 0, safeMax);
    const percent = (clamped / safeMax) * PERCENT;

    const track = (
      <>
        <div className={progressVariants({ size })}>
          <div
            className={cn('mdt-h-full mdt-rounded-full mdt-transition-all', FILL_TONE[tone])}
            style={{ width: `${percent.toFixed(3)}%` }}
            data-testid="progress-fill"
          />
        </div>

        {baseline !== undefined ? (
          <span
            className="mdt-absolute mdt-top-1/2 mdt-h-3 mdt-w-0.5 mdt--translate-y-1/2 mdt-rounded-full mdt-bg-purple-70"
            style={{ left: `${clamp(baseline, 0, PERCENT).toFixed(3)}%` }}
            aria-hidden="true"
            data-testid="progress-baseline"
          />
        ) : null}

        {floor !== undefined ? (
          <span
            className="mdt-absolute mdt-top-1/2 mdt-h-2 mdt-w-px mdt--translate-y-1/2 mdt-bg-muted-foreground"
            style={{ left: `${clamp(floor, 0, PERCENT).toFixed(3)}%` }}
            aria-hidden="true"
            data-testid="progress-floor"
          />
        ) : null}
      </>
    );

    const hasWords =
      above !== undefined || below !== undefined || (legend !== undefined && legend.length > 0);

    // Nothing wraps the bar unless there is something to wrap it for, so a plain
    // `<Progress value={62} />` is the same single element it has always been.
    if (!hasWords) {
      return (
        <div
          ref={ref}
          // A native progressbar role, so assistive tech reads the value rather
          // than announcing a nameless box.
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={safeMax}
          className={cn('mdt-relative', className)}
          {...rest}
        >
          {track}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        className={cn('mdt-flex mdt-w-full mdt-flex-col mdt-gap-1.5', className)}
        {...rest}
      >
        {above !== undefined ? (
          <Caption
            caption={above}
            slot="progress-above"
            className="mdt-text-[13px] mdt-font-medium mdt-text-foreground"
          />
        ) : null}

        <div className="mdt-relative">{track}</div>

        {below !== undefined ? (
          <Caption
            caption={below}
            slot="progress-below"
            className="mdt-text-xs mdt-text-muted-foreground"
          />
        ) : null}

        {legend !== undefined ? <Legend items={legend} /> : null}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

/**
 * ProgressBreakdown - one whole, divided into named parts.
 *
 * ## Why this is not Progress
 *
 * Same track, same tones, same sizes - and a different question. Progress says
 * how far along one thing is; this says what a whole is made of. Nothing here is
 * advancing toward finishing and there is no single value, so it cannot be
 * announced as "91 of 100". It is one picture with one sentence describing it,
 * which is why `aria-label` has to carry the whole story.
 *
 * Kept apart on purpose. Built as a variant of Progress the two would be one
 * prop away from each other, and somebody would reach for a stacked bar when
 * they wanted a progress bar - or put a stacked bar where a screen reader had
 * been promised a value.
 *
 * @example
 * ```tsx
 * <ProgressBreakdown
 *   max={100}
 *   segments={[
 *     { label: 'Tickets', value: 48, valueLabel: '48 GB' },
 *     { label: 'Attachments', value: 22, valueLabel: '22 GB', tone: 'warning' },
 *     { label: 'Backups', value: 14, valueLabel: '14 GB', tone: 'success' },
 *   ]}
 *   remainderLabel="Free"
 *   above={{ left: 'Storage', right: '100 GB' }}
 *   aria-label="Storage: 48 GB tickets, 22 GB attachments, 14 GB backups, 16 GB free"
 * />
 * ```
 */
const ProgressBreakdown = forwardRef<HTMLDivElement, ProgressBreakdownProps>(
  (
    {
      segments,
      max,
      size = 'md',
      above,
      below,
      remainderLabel,
      formatValue,
      showLegend = true,
      className,
      ...rest
    },
    ref
  ) => {
    const total = segments.reduce((sum, s) => sum + Math.max(0, s.value), 0);
    // With no `max` the parts ARE the whole, so they are drawn as shares of
    // their own total. A bar with nothing in it stays empty rather than
    // dividing by zero.
    const whole = max !== undefined && max > 0 ? max : total;
    const remainder = whole - total;

    // One rule for every figure in the key, including the leftover the
    // component works out for itself - otherwise it reads "Backups 14 GB · Free
    // 16", which is the same figure written two ways on one line.
    const write = (n: number): ReactNode => (formatValue ? formatValue(n) : n);

    const legend: ProgressLegendItem[] = segments.map((s) => ({
      label: s.label,
      value: s.valueLabel ?? write(s.value),
      swatch: s.tone ?? 'default',
    }));
    if (remainderLabel !== undefined && remainder > 0) {
      legend.push({ label: remainderLabel, value: write(remainder), swatch: 'track' });
    }

    return (
      <div
        ref={ref}
        // Not a progressbar: there is no single value to announce, so it is one
        // picture and `aria-label` is the whole description of it.
        role="img"
        className={cn('mdt-flex mdt-w-full mdt-flex-col mdt-gap-1.5', className)}
        {...rest}
      >
        {above !== undefined ? (
          <Caption
            caption={above}
            slot="progress-above"
            className="mdt-text-[13px] mdt-font-medium mdt-text-foreground"
          />
        ) : null}

        {/*
          The parts butt together and carry no rounding of their own - only the
          two ends of the whole bar are round. That is what makes it read as one
          thing divided up rather than several bars sitting next to each other.
        */}
        <div className={cn(progressVariants({ size }), 'mdt-flex')} data-slot="progress-segments">
          {segments.map((s, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              data-slot="progress-segment"
              className={cn('mdt-h-full mdt-transition-all', FILL_TONE[s.tone ?? 'default'])}
              style={{
                width:
                  whole > 0 ? `${((Math.max(0, s.value) / whole) * PERCENT).toFixed(3)}%` : '0%',
              }}
            />
          ))}
        </div>

        {below !== undefined ? (
          <Caption
            caption={below}
            slot="progress-below"
            className="mdt-text-xs mdt-text-muted-foreground"
          />
        ) : null}

        {showLegend ? <Legend items={legend} /> : null}
      </div>
    );
  }
);

ProgressBreakdown.displayName = 'ProgressBreakdown';

export { Progress, ProgressBreakdown };
