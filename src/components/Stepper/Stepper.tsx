import { cva } from 'class-variance-authority';
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type { StepState, StepperLayout, StepperProps, StepperStep } from './Stepper.types';

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
      inline: 'mdt-flex-wrap mdt-items-center mdt-gap-x-1 mdt-gap-y-1',
    },
  },
  defaultVariants: { layout: 'stacked' },
});

/** Nothing behind it. Four of the five states share this exactly. */
const HOLLOW = 'mdt-bg-transparent';

/** The quiet ink, worn by every state that is not the one you are on. */
const QUIET = 'mdt-text-muted-foreground';

/**
 * One rule carries the whole component: **a filled disc is settled, an outlined
 * disc is live.**
 *
 * That is why the number stays visible on the step you are standing on and only
 * turns into a tick once it is behind you.
 *
 * There is no red disc here, on purpose. A coloured ring says *where* a problem
 * is and never what it is, so it always needs a message beside it - and once the
 * message is there, the ring is only repeating itself. A broken step stays
 * `current`, with a `Banner` under the strip.
 */
const DISC_STATE: Record<StepState, string> = {
  complete: `mdt-border-primary mdt-bg-primary mdt-text-primary-foreground`,
  current: `mdt-border-primary ${HOLLOW} mdt-text-foreground`,
  upcoming: `mdt-border-border ${HOLLOW} ${QUIET}`,
  // Passed over, not finished, so it never earns a fill.
  skipped: `mdt-border-border ${HOLLOW} ${QUIET}`,
  disabled: `mdt-border-border ${HOLLOW} ${QUIET}`,
};

const LABEL_STATE: Record<StepState, string> = {
  complete: QUIET,
  current: 'mdt-text-foreground mdt-font-semibold',
  upcoming: QUIET,
  skipped: QUIET,
  disabled: QUIET,
};

/**
 * What goes inside the disc.
 *
 * The shape says it as well as the colour does, which is what makes this legible
 * to someone who cannot tell one hue from another: a tick for done, a dash for
 * passed over, and the number everywhere else.
 */
const MARK: Partial<Record<StepState, 'check' | 'minus'>> = {
  complete: 'check',
  skipped: 'minus',
};

const DISC_BASE = [
  'mdt-flex mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded-full',
  'mdt-box-border mdt-font-semibold mdt-tabular-nums',
  'mdt-transition-colors mdt-duration-150',
];

const DISC_SIZE: Record<StepperLayout, string> = {
  stacked: 'mdt-h-8 mdt-w-8 mdt-border-2 mdt-text-[13px]',
  inline: 'mdt-h-6 mdt-w-6 mdt-border-[1.5px] mdt-text-xs',
};

const MARK_SIZE: Record<StepperLayout, 'sm' | 'xs'> = { stacked: 'sm', inline: 'xs' };

/**
 * The room one stacked step needs before its label starts breaking.
 *
 * Measured on the specimen: a two-word label under a 32px disc holds one line at
 * about 112px and wraps to three below roughly 90. This is the width the whole
 * strip is checked against - `steps × 112` - and it is the only number in the
 * component that came from looking rather than from a token.
 */
const STACKED_STEP_WIDTH = 112;

/** Works out a step's state from the counter, unless it was told one. */
const resolveState = (step: StepperStep, index: number, current: number): StepState => {
  if (step.state !== undefined) return step.state;
  if (index < current) return 'complete';
  if (index === current) return 'current';
  return 'upcoming';
};

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
const useDescriptionFits = (steps: readonly StepperStep[], layout: StepperLayout): void => {
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
  onStepSelect,
  className,
  ...props
}: StepperProps) => {
  // Only `stacked` has anything to fall back to, so nothing is measured on
  // `inline` - it already wraps.
  const watching = responsive && layout === 'stacked';
  const [ref, width] = useMeasuredWidth(watching);

  const tooNarrow = width !== null && width < steps.length * STACKED_STEP_WIDTH;
  const shown: StepperLayout = watching && tooNarrow ? 'inline' : layout;

  useDescriptionFits(steps, shown);

  const at = Math.min(Math.max(current, 0), Math.max(steps.length - 1, 0));

  const renderDisc = (state: StepState, index: number): ReactNode => {
    const mark = MARK[state];
    return (
      <span
        data-slot="stepper-disc"
        className={cn(DISC_BASE, DISC_SIZE[shown], DISC_STATE[state])}
        aria-hidden="true"
      >
        {mark ? <Icon name={mark} size={MARK_SIZE[shown]} aria-hidden /> : index + 1}
      </span>
    );
  };

  return (
    <nav ref={ref} className={cn('mdt-w-full', className)} {...props}>
      <ol
        className={cn(stepperVariants({ layout: shown }))}
        data-slot="stepper"
        data-layout={shown}
      >
        {steps.map((step, index) => {
          const state = resolveState(step, index, at);
          const key = step.id ?? index;

          // Only a finished step is somewhere you can return to. A step you have
          // not reached is not a place, and the one you are on is already here.
          const selectable = onStepSelect !== undefined && state === 'complete';

          const label = (
            <>
              {renderDisc(state, index)}
              <span
                data-slot="stepper-label"
                className={cn(
                  'mdt-leading-snug',
                  shown === 'stacked' ? 'mdt-text-[13px]' : 'mdt-whitespace-nowrap mdt-text-sm',
                  LABEL_STATE[state]
                )}
              >
                {step.label}
              </span>
              {shown === 'stacked' && step.description !== undefined && step.description !== '' ? (
                <span
                  data-slot="stepper-description"
                  className="mdt-text-xs mdt-leading-snug mdt-text-muted-foreground"
                >
                  {step.description}
                </span>
              ) : null}
            </>
          );

          const inner = selectable ? (
            <button
              type="button"
              data-slot="stepper-trigger"
              onClick={() => {
                onStepSelect(index, step);
              }}
              className={cn(
                'mdt-rounded-md mdt-transition-colors',
                'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-2 focus-visible:mdt-ring-offset-background',
                'hover:mdt-bg-muted',
                shown === 'stacked'
                  ? // No padding above, on purpose. The connector is pinned to the
                    // disc's own centre line, so anything that pushes the disc down
                    // leaves the line hanging behind it.
                    'mdt-flex mdt-w-full mdt-flex-col mdt-items-center mdt-gap-2 mdt-px-1 mdt-pb-1 mdt-pt-0 mdt-text-center'
                  : 'mdt-flex mdt-items-center mdt-gap-2 mdt-px-1 mdt-py-1'
              )}
            >
              {label}
            </button>
          ) : (
            label
          );

          // A connector cannot be a sibling of a list item - an `ol` may hold
          // nothing but `li`. So each step carries the piece that arrives at it:
          // stacked gets the line running back to the disc behind it, inline
          // gets the chevron that sits in front of its own disc.
          const behind = index > 0 ? steps[index - 1] : undefined;
          const joined = behind !== undefined && resolveState(behind, index - 1, at) === 'complete';

          return (
            <li
              key={key}
              data-slot="stepper-step"
              data-state={state}
              // Exactly one step carries this, and it is what a screen reader
              // uses to say "current step" rather than reading five equal items.
              {...(state === 'current' ? { 'aria-current': 'step' as const } : {})}
              className={cn(
                'mdt-flex',
                shown === 'stacked'
                  ? 'mdt-relative mdt-min-w-[92px] mdt-flex-1 mdt-basis-0 mdt-flex-col mdt-items-center mdt-gap-2 mdt-text-center'
                  : 'mdt-items-center mdt-gap-2',
                state === 'disabled' && 'mdt-opacity-45'
              )}
            >
              {shown === 'stacked' && index > 0 ? (
                // Pinned to the centre line of the discs and stopped clear of
                // both, so it reads as the gap between two steps rather than as
                // part of either. It fills only once the step behind it is
                // finished, which makes it a report on the journey.
                <span
                  aria-hidden="true"
                  data-slot="stepper-connector"
                  data-joined={joined}
                  className={cn(
                    'mdt-absolute mdt-top-[15px] mdt-h-0.5 mdt-rounded-full',
                    'mdt-left-[calc(-50%+24px)] mdt-right-[calc(50%+24px)]',
                    'mdt-transition-colors mdt-duration-150',
                    joined ? 'mdt-bg-primary' : 'mdt-bg-muted'
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

              {inner}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Stepper.displayName = 'Stepper';
