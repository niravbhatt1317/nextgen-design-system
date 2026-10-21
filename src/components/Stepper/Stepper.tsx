import { cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import { StepperRail } from './StepperRail';
import { StepDisc, StepLabel } from './StepParts';
import {
  DESCRIPTION_LOOK,
  HIT_BOX,
  QUIET,
  SETTLES,
  TRIGGER,
  lights,
  resolveCounters,
  resolveStep,
  type StepLook,
  type StepModel,
} from './stepperState';
import type { StepperLayout, StepperProps, StepperStep } from './Stepper.types';

/** The three layouts drawn across the page; `vertical` is the rail, drawn by StepperRail. */
type AcrossLayout = Exclude<StepperLayout, 'vertical'>;

/**
 * The strip.
 *
 * `stacked` is a row of columns: disc over label, joined by a line that fills
 * only once you are past it. `inline` is one wrapping row: disc beside label,
 * chevrons doing the ordering, so no line has to be drawn at all.
 */
export const stepperVariants = cva('mdt-flex mdt-w-full mdt-list-none mdt-p-0', {
  variants: {
    layout: {
      stacked: 'mdt-items-start',
      // Wraps rather than clipping. Nothing is hidden; the strip gets taller.
      // 12 between a label and the next chevron, 8 between rows.
      inline: 'mdt-flex-wrap mdt-items-center mdt-gap-x-3 mdt-gap-y-2',
      // Equal columns, so the bars read as one track cut into parts rather than
      // as labels that happen to be underlined.
      underline: 'mdt-items-stretch mdt-gap-3',
      vertical: 'mdt-m-0 mdt-flex-col',
    },
  },
  defaultVariants: { layout: 'stacked' },
});

/**
 * The label's ink and weight. A finished step reads as finished - full ink,
 * regular weight - and only the steps you have not got to stay quiet. The one
 * you are on is the heaviest.
 */
const SETTLED_LABEL = 'mdt-font-normal mdt-text-foreground';
const QUIET_LABEL = `mdt-font-normal ${QUIET}`;
const LABEL_INK: Record<StepLook, string> = {
  complete: SETTLED_LABEL,
  current: 'mdt-font-semibold mdt-text-foreground',
  reached: SETTLED_LABEL,
  upcoming: QUIET_LABEL,
  skipped: QUIET_LABEL,
  disabled: QUIET_LABEL,
};

const DISC_SIZE: Record<AcrossLayout, string> = {
  stacked: 'mdt-h-8 mdt-w-8 mdt-border-2 mdt-text-[13px]',
  inline: 'mdt-h-6 mdt-w-6 mdt-border-[1.5px] mdt-text-xs',
  underline: 'mdt-h-6 mdt-w-6 mdt-border-[1.5px] mdt-text-xs',
};

const MARK_SIZE: Record<AcrossLayout, 'sm' | 'xs'> = {
  stacked: 'sm',
  inline: 'xs',
  underline: 'xs',
};

/**
 * The bar under one step, and the stacked connector.
 *
 * 2px so it reads as a track rather than as a border on the label above it -
 * `primary` up to the furthest step you have got to, `muted` after it.
 */
const TRACK_ON = 'mdt-bg-primary';
const TRACK_OFF = 'mdt-bg-muted';

/**
 * Every label keeps the room its bold version needs, so the step you are on
 * turning semibold never pushes the steps after it along the row. A copy of the
 * words at 600 sits under the label at no height, invisible, and holds the
 * width; `/ ''` gives it no text for a screen reader.
 */
const KEEPS_BOLD_ROOM = [
  'mdt-inline-flex mdt-flex-col',
  "after:mdt-content-[attr(data-text)_/_'']",
  'after:mdt-invisible after:mdt-h-0 after:mdt-overflow-hidden after:mdt-font-semibold',
  'after:mdt-pointer-events-none after:mdt-select-none',
];

/** How one step's label sits beside its disc, per layout. */
const LABEL_FLOW: Record<AcrossLayout, ClassValue> = {
  stacked: 'mdt-text-[13px]',
  // Must not wrap - its steps sit on one row and a broken word breaks the row.
  inline: ['mdt-whitespace-nowrap mdt-text-sm', ...KEEPS_BOLD_ROOM],
  // Owns a column, so it truncates rather than pushing its neighbours around.
  // Truncating clips to the label's box, and the hover's dashed line sits 4px
  // under the words - below the 20px line. 6px of room under the words to paint
  // in, handed straight back as a negative margin, so the line shows and
  // nothing in the row moves.
  underline: 'mdt-truncate mdt-text-sm mdt-pb-1.5 -mdt-mb-1.5',
};

/**
 * The step's own box, per layout - the same whether it is a button or not, so
 * nothing moves when a strip becomes clickable. No padding on purpose: the
 * stacked connector is pinned to the disc's centre line, and the underline
 * label has to start where the bar under it starts.
 */
const HIT_FLOW: Record<AcrossLayout, string> = {
  stacked: 'mdt-flex-col mdt-items-center mdt-gap-2 mdt-text-center',
  inline: 'mdt-items-center mdt-gap-2 mdt-text-left',
  // Only as wide as its disc and label, so the hover marks those and not the
  // empty end of the column.
  underline: 'mdt-items-center mdt-gap-2 mdt-self-start mdt-text-left',
};

/** How one step's own column or cell behaves in the row, per layout. */
const STEP_FLOW: Record<AcrossLayout, string> = {
  stacked:
    'mdt-relative mdt-min-w-[92px] mdt-flex-1 mdt-basis-0 mdt-flex-col mdt-items-center mdt-text-center',
  // 12 between the chevron and the disc after it.
  inline: 'mdt-items-center mdt-gap-3',
  // Equal columns, so the bars read as one track cut into parts. `min-w-0`
  // lets a long label truncate instead of widening its column past its
  // neighbours.
  underline: 'mdt-min-w-0 mdt-flex-1 mdt-basis-0 mdt-flex-col mdt-gap-2',
};

/**
 * The room one stacked step needs before its label starts breaking.
 *
 * Measured on the specimen: a two-word label under a 32px disc holds one line at
 * about 112px and wraps to three below roughly 90. This is the width the whole
 * strip is checked against - `steps × 112` - and it is the only number in the
 * component that came from looking rather than from a token.
 */
const STACKED_STEP_WIDTH = 112;

/**
 * Reports the container's width, so `stacked` can drop to `inline` when there is
 * genuinely not room for it.
 *
 * Measured rather than read off the window. A stepper in a side panel has to
 * know about the panel; a media query would have it believing it has 1400px
 * while it sits in 320.
 */
const useMeasuredWidth = (enabled: boolean): [React.RefObject<HTMLDivElement>, number | null] => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!enabled || node === null || typeof ResizeObserver === 'undefined') {
      setWidth(null);
      return undefined;
    }

    const measure = (): void => {
      // Zero means "cannot be measured", never "too narrow". A stepper inside a
      // panel that has not been opened yet, or a tab that is not the shown one,
      // reports 0 - and collapsing on that would have it come back in the wrong
      // shape the moment it appeared.
      const measured = node.getBoundingClientRect().width;
      setWidth(measured > 0 ? measured : null);
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [enabled]);

  return [ref, width];
};

/** Warns once, in development, about a description on a layout with no room for one. */
const useDescriptionFits = (steps: readonly StepperStep[], layout: AcrossLayout): void => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' || layout !== 'inline') return;
    if (!steps.some((s) => s.description !== undefined && s.description !== '')) return;

    console.warn(
      '[Stepper] A step has a description and the layout is "inline", which has ' +
        'nowhere to put it - beside the label the row stops reading as one line ' +
        'of travel. The description is not rendered. Use layout="stacked".'
    );
  }, [steps, layout]);
};

interface AcrossStepProps {
  step: StepperStep;
  index: number;
  model: StepModel;
  shown: AcrossLayout;
  /** Stacked: whether the line arriving at this step is filled. Underline: whether its bar is. */
  lit: boolean;
  onStepSelect: StepperProps['onStepSelect'];
}

/** The disc, the label and (stacked) the description - the same parts whether or not the step is a button. */
const stepBody = ({ step, index, model, shown }: AcrossStepProps): ReactNode => (
  <>
    <StepDisc
      index={index}
      model={model}
      className={DISC_SIZE[shown]}
      markSize={MARK_SIZE[shown]}
    />
    <StepLabel
      label={step.label}
      model={model}
      // `leading-snug` first: a later text size replaces it, as it always has here.
      className={['mdt-leading-snug', LABEL_FLOW[shown]]}
      ink={LABEL_INK}
      dataText={shown === 'inline' && typeof step.label === 'string' ? step.label : undefined}
    />
    {shown === 'stacked' && step.description !== undefined && step.description !== '' ? (
      <span
        data-slot="stepper-description"
        className={cn('mdt-text-xs mdt-leading-snug', SETTLES, DESCRIPTION_LOOK[model.look])}
      >
        {step.description}
      </span>
    ) : null}
  </>
);

/** One step of an across layout: its piece of the track, and its box. */
const AcrossStep = (props: AcrossStepProps) => {
  const { step, index, model, shown, lit } = props;
  const box = cn(HIT_BOX, HIT_FLOW[shown]);
  const select = model.selectable ? props.onStepSelect : undefined;

  const hit = select ? (
    <button
      type="button"
      data-slot="stepper-trigger"
      onClick={() => {
        select(index, step);
      }}
      className={cn(box, TRIGGER)}
    >
      {stepBody(props)}
    </button>
  ) : (
    <div className={box}>{stepBody(props)}</div>
  );

  return (
    <li
      data-slot="stepper-step"
      data-state={model.state}
      // Exactly one step carries this, and it is what a screen reader
      // uses to say "current step" rather than reading five equal items.
      {...(model.state === 'current' ? { 'aria-current': 'step' as const } : {})}
      className={cn('mdt-flex', STEP_FLOW[shown], model.state === 'disabled' && 'mdt-opacity-45')}
    >
      {/*
        A connector cannot be a sibling of a list item - an `ol` may hold
        nothing but `li`. So each step carries the piece that arrives at it:
        stacked gets the line running back to the disc behind it, inline
        gets the chevron that sits in front of its own disc.
      */}
      {shown === 'stacked' && index > 0 ? (
        // Pinned to the centre line of the discs and stopped clear of both,
        // so it reads as the gap between two steps rather than as part of
        // either. Filled up to the furthest step you have got to, which makes
        // it a report on the journey - going back does not empty it.
        <span
          aria-hidden="true"
          data-slot="stepper-connector"
          data-joined={lit}
          className={cn(
            'mdt-absolute mdt-top-[15px] mdt-h-0.5 mdt-rounded-full',
            'mdt-left-[calc(-50%+24px)] mdt-right-[calc(50%+24px)]',
            SETTLES,
            lit ? TRACK_ON : TRACK_OFF
          )}
        />
      ) : null}

      {shown === 'inline' && index > 0 ? (
        <Icon
          name="chevron-right"
          size="sm"
          aria-hidden
          data-slot="stepper-connector"
          className="mdt-shrink-0 mdt-text-muted-foreground/60"
        />
      ) : null}

      {hit}

      {shown === 'underline' ? (
        // Under this step's own label, not between two discs. Every step
        // owns one, which is what makes the row read as a track cut into
        // parts rather than as a line joining stations.
        <span
          aria-hidden="true"
          data-slot="stepper-bar"
          data-joined={lit}
          className={cn(
            'mdt-h-0.5 mdt-w-full mdt-rounded-full',
            SETTLES,
            lit ? TRACK_ON : TRACK_OFF
          )}
        />
      ) : null}
    </li>
  );
};

/**
 * Stepper - a named, ordered journey with a place you are now.
 *
 * **It is not Tabs.** Tabs are four doors into the same room: no order, nothing
 * to finish, and everything behind them already exists. A stepper is a sequence
 * where the steps ahead of you have not happened yet. *The one-line test: if you
 * can do them in any order, it is Tabs.* It is not `Progress` either, which is
 * one number with no names and nobody doing anything; nor a breadcrumb, which is
 * depth rather than sequence.
 *
 * Announced as a list with one item marked as the current step. Steps are plain
 * text and not focusable unless `onStepSelect` is given - a step is not a button
 * unless you can actually go there, and a strip of five stops that do nothing is
 * worse than no stops at all.
 *
 * **Going back keeps your progress.** Pass `reached` - the furthest step got to -
 * and stepping back to fix something leaves every step up to it ticked, lined and
 * clickable: the furthest one shows as where you left off, and the one you went
 * back to keeps its tick inside a "you are here" ring.
 *
 * @example
 * ```tsx
 * <Stepper
 *   aria-label="Import assets"
 *   current={2}
 *   steps={[
 *     { label: 'Choose a source' },
 *     { label: 'Connect' },
 *     { label: 'Map fields' },
 *     { label: 'Review' },
 *   ]}
 * />
 * ```
 */
export const Stepper = ({
  steps,
  current,
  layout = 'stacked',
  responsive = true,
  reached,
  onStepSelect,
  className,
  ...props
}: StepperProps) => {
  // Only `stacked` has anything to fall back to, so nothing is measured on
  // `inline` - it already wraps.
  // `underline` never collapses: its columns already shrink, and dropping it to
  // `inline` would take away the bars that are the whole point of it.
  const watching = responsive && layout === 'stacked';
  const [ref, width] = useMeasuredWidth(watching);

  const tooNarrow = width !== null && width < steps.length * STACKED_STEP_WIDTH;
  const across: AcrossLayout = layout === 'vertical' ? 'stacked' : layout;
  const shown: AcrossLayout = watching && tooNarrow ? 'inline' : across;

  useDescriptionFits(steps, shown);

  /* the rail: its own drawing (locked steps, the rail line), after every hook above has run */
  if (layout === 'vertical') {
    return (
      <StepperRail
        steps={steps}
        current={current}
        reached={reached}
        onStepSelect={onStepSelect}
        className={className}
        {...props}
      />
    );
  }

  const counters = resolveCounters(steps.length, current, reached);
  const rows = steps.map((step, index) => ({
    step,
    model: resolveStep(step, index, counters, onStepSelect !== undefined),
  }));

  /**
   * Stacked: the line arriving at a step lights once the step behind it is
   * settled. Underline: a step's own bar lights up to and including the
   * furthest step. Neither lights for a step passed over or not available.
   */
  const litAt = (index: number): boolean => {
    const owner = rows[shown === 'stacked' ? index - 1 : index];
    return index <= counters.far && owner !== undefined && lights(owner.model.state);
  };

  return (
    <nav ref={ref} className={cn('mdt-w-full', className)} {...props}>
      <ol
        className={cn(stepperVariants({ layout: shown }))}
        data-slot="stepper"
        data-layout={shown}
      >
        {rows.map(({ step, model }, index) => (
          <AcrossStep
            key={step.id ?? index}
            step={step}
            index={index}
            model={model}
            shown={shown}
            lit={litAt(index)}
            onStepSelect={onStepSelect}
          />
        ))}
      </ol>
    </nav>
  );
};

Stepper.displayName = 'Stepper';
