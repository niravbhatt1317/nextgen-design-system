import type { ReactNode } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type { StepState, StepperProps, StepperStep } from './Stepper.types';

/*
 * THE VERTICAL LAYOUT (`layout="vertical"`) - the same journey set down a rail, as the navigation of a two-column
 * flow (the console's Create organization). Pranjal, 2026-10-11: "we already have steppers so it should be sent as a
 * variant not a new component" - it was VerticalStepper in the console's local copy (2026-09-28).
 *
 * The horizontal layouts report progress above a form; this one IS the navigation: it sits in the left rail and the
 * panel beside it shows one step at a time. That is why it reads a second counter, `reached` - the furthest step
 * unlocked so far - so somebody can go back to step 2 and forward again to step 4 without redoing 3.
 */

/** The same rule as the other layouts: a filled disc is settled, an outlined disc is live. */
/** A disc not reached yet: the hairline edge, hollow, the faint ink. */
const DISC_AHEAD = 'mdt-border-border mdt-bg-transparent mdt-text-faint';
const DISC_STATE: Record<StepState, string> = {
  complete: 'mdt-border-primary mdt-bg-primary mdt-text-primary-foreground',
  current: 'mdt-border-primary mdt-bg-transparent mdt-text-foreground',
  upcoming: DISC_AHEAD,
  skipped: DISC_AHEAD,
  disabled: DISC_AHEAD,
};

/**
 * One ink per distance from where you are: the step you are on is the heaviest, a finished one is full ink, a
 * reachable one waits in the secondary ink, and a locked one drops to the faint ink so it reads as not-yet.
 */
const LABEL_STATE: Record<StepState, string> = {
  complete: 'mdt-font-medium mdt-text-foreground',
  current: 'mdt-font-semibold mdt-text-foreground',
  upcoming: 'mdt-font-medium mdt-text-muted-foreground',
  skipped: 'mdt-font-medium mdt-text-muted-foreground',
  disabled: 'mdt-font-medium mdt-text-faint',
};

/** A locked step's label, whatever state it was given. */
const LOCKED_LABEL = 'mdt-font-medium mdt-text-faint';

/** Every part that changes colour does it over the same 150ms, as in the other layouts. */
const SETTLES = 'mdt-transition-colors mdt-duration-150';

const DISC_BASE = [
  'mdt-flex mdt-h-6 mdt-w-6 mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded-full',
  'mdt-box-border mdt-border-[1.5px] mdt-text-xs mdt-font-semibold mdt-tabular-nums',
  SETTLES,
];

/** The row: disc, then the text, 12px apart. */
const ROW = 'mdt-flex mdt-w-full mdt-items-start mdt-gap-3 mdt-text-left';

/** Works out a step's state from the two counters, unless it was told one. */
const resolveRailState = (
  step: StepperStep,
  index: number,
  current: number,
  reached: number
): StepState => {
  if (step.state !== undefined) return step.state;
  if (index === current) return 'current';
  // Behind you, or ahead of you but already finished once - you came back to fix something, and the steps after it
  // are still done.
  if (index < current || index <= reached) return 'complete';
  return 'upcoming';
};

type StepperRailProps = Omit<StepperProps, 'layout' | 'responsive'>;

/**
 * The rail. A step is a button only when you can actually go there: `onStepSelect` is given, it is unlocked, and it
 * is not the one you are on. A locked step is plain text, marked disabled, and says what opens it.
 */
export const StepperRail = ({
  steps,
  current,
  reached,
  onStepSelect,
  className,
  ...props
}: StepperRailProps) => {
  const last = Math.max(steps.length - 1, 0);
  const at = Math.min(Math.max(current, 0), last);
  // Never behind where you are standing: you cannot be on a step you have not reached.
  const furthest = Math.min(Math.max(reached ?? at, at), last);

  const renderDisc = (state: StepState, index: number): ReactNode => (
    <span data-slot="stepper-disc" className={cn(DISC_BASE, DISC_STATE[state])} aria-hidden="true">
      {state === 'complete' ? (
        <Icon name="check" size="xs" strokeWidth={2.5} aria-hidden />
      ) : state === 'skipped' ? (
        <Icon name="minus" size="xs" aria-hidden />
      ) : (
        index + 1
      )}
    </span>
  );

  return (
    <nav className={cn('mdt-w-full', className)} {...props}>
      <ol
        className="mdt-m-0 mdt-flex mdt-list-none mdt-flex-col mdt-p-0"
        data-slot="stepper"
        data-layout="vertical"
      >
        {steps.map((step, index) => {
          const state = resolveRailState(step, index, at, furthest);
          const key = step.id ?? index;
          const locked = index > furthest;
          const selectable =
            onStepSelect !== undefined && !locked && index !== at && state !== 'disabled';

          // Only says what opens it when that can be said in words.
          const behind = index > 0 ? steps[index - 1] : undefined;
          const lockedTitle =
            locked && typeof behind?.label === 'string' ? `Opens after ${behind.label}` : undefined;

          const content = (
            <>
              {renderDisc(state, index)}
              <span className="mdt-flex mdt-min-w-0 mdt-flex-1 mdt-flex-col mdt-gap-0.5 mdt-pt-0.5">
                <span
                  data-slot="stepper-label"
                  className={cn(
                    'mdt-text-sm mdt-leading-[1.3]',
                    SETTLES,
                    locked ? LOCKED_LABEL : LABEL_STATE[state],
                    selectable && 'group-hover:mdt-text-foreground'
                  )}
                >
                  {step.label}
                </span>
                {step.description !== undefined && step.description !== '' ? (
                  <span
                    data-slot="stepper-description"
                    className="mdt-truncate mdt-text-xs mdt-leading-[1.4] mdt-text-faint"
                  >
                    {step.description}
                  </span>
                ) : null}
              </span>
            </>
          );

          const row = selectable ? (
            <button
              type="button"
              data-slot="stepper-trigger"
              onClick={() => {
                onStepSelect(index, step);
              }}
              className={cn(
                'mdt-group mdt-rounded-md',
                'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-2 focus-visible:mdt-ring-offset-background',
                ROW
              )}
            >
              {content}
            </button>
          ) : (
            <div className={ROW}>{content}</div>
          );

          // The line runs down from this disc to the next one, and fills once this step is finished - a report on
          // the journey, as in the stacked layout.
          const joined = state === 'complete';

          return (
            <li
              key={key}
              data-slot="stepper-step"
              data-state={state}
              data-locked={locked || undefined}
              // Exactly one step carries this, so a screen reader says "current step" rather than reading seven
              // equal items.
              {...(index === at ? { 'aria-current': 'step' as const } : {})}
              {...(locked || state === 'disabled' ? { 'aria-disabled': true } : {})}
              title={lockedTitle}
              className={cn(
                'mdt-relative',
                index < steps.length - 1 && 'mdt-pb-5',
                state === 'disabled' && 'mdt-opacity-45'
              )}
            >
              {index < steps.length - 1 ? (
                // Centred on the disc (11px + 2px = the 24px disc's middle), starting 4px under it and stopping 4px
                // short of the next.
                <span
                  aria-hidden="true"
                  data-slot="stepper-connector"
                  data-joined={joined}
                  className={cn(
                    'mdt-absolute mdt-bottom-1 mdt-left-[11px] mdt-top-7 mdt-w-0.5 mdt-rounded-full',
                    SETTLES,
                    joined ? 'mdt-bg-primary' : 'mdt-bg-muted'
                  )}
                />
              ) : null}
              {row}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
