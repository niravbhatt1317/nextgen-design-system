import type { ReactNode } from 'react';
import { cn } from '@/utils';
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
import type { StepperProps, StepperStep } from './Stepper.types';

/*
 * THE VERTICAL LAYOUT (`layout="vertical"`) - the same journey set down a rail, as the navigation of a two-column
 * flow (the console's Create organization). Pranjal, 2026-10-11: "we already have steppers so it should be sent as a
 * variant not a new component" - it was VerticalStepper in the console's local copy (2026-09-28).
 *
 * The horizontal layouts report progress above a form; this one IS the navigation: it sits in the left rail and the
 * panel beside it shows one step at a time. It reads the same two counters as every layout - `current` and `reached`
 * - and adds what only a rail needs: a step past `reached` is locked, and says what opens it.
 */

/**
 * One ink per distance from where you are: the step you are on is the heaviest, a finished one and the one you left
 * off at are full ink, and anything you have not got to waits in the quiet ink.
 */
const SETTLED_LABEL = 'mdt-font-medium mdt-text-foreground';
const QUIET_LABEL = `mdt-font-medium ${QUIET}`;
const LABEL_INK: Record<StepLook, string> = {
  complete: SETTLED_LABEL,
  current: 'mdt-font-semibold mdt-text-foreground',
  reached: SETTLED_LABEL,
  upcoming: QUIET_LABEL,
  skipped: QUIET_LABEL,
  disabled: QUIET_LABEL,
};

/** The rail's disc: 24 across, a 1.5px edge, a 12px number. */
const DISC_SIZE = 'mdt-h-6 mdt-w-6 mdt-border-[1.5px] mdt-text-xs';

/** The rail draws its tick heavier, so it holds up beside the 14px labels. */
const TICK_STROKE = 2.5;

/** The row: disc, then the text, 12px apart - the same box whether or not it is a button. */
const ROW = 'mdt-w-full mdt-items-start mdt-gap-3 mdt-text-left';

type StepperRailProps = Omit<StepperProps, 'layout' | 'responsive'>;

/** The disc, then the label over its description. */
const railBody = (step: StepperStep, index: number, model: StepModel): ReactNode => (
  <>
    <StepDisc
      index={index}
      model={model}
      className={DISC_SIZE}
      markSize="xs"
      tickStroke={TICK_STROKE}
    />
    <span className="mdt-flex mdt-min-w-0 mdt-flex-1 mdt-flex-col mdt-gap-0.5 mdt-pt-0.5">
      <StepLabel
        label={step.label}
        model={model}
        className="mdt-text-sm mdt-leading-[1.3]"
        ink={LABEL_INK}
      />
      {step.description !== undefined && step.description !== '' ? (
        <span
          data-slot="stepper-description"
          className={cn(
            'mdt-truncate mdt-text-xs mdt-leading-[1.4]',
            SETTLES,
            DESCRIPTION_LOOK[model.look]
          )}
        >
          {step.description}
        </span>
      ) : null}
    </span>
  </>
);

/**
 * The rail. A step is a button only when you can actually go there: `onStepSelect` is given, you have got that far,
 * and it is not the one you are on. A locked step is plain text, marked disabled, and says what opens it.
 */
export const StepperRail = ({
  steps,
  current,
  reached,
  onStepSelect,
  className,
  ...props
}: StepperRailProps) => {
  const counters = resolveCounters(steps.length, current, reached);

  return (
    <nav className={cn('mdt-w-full', className)} {...props}>
      <ol
        className="mdt-m-0 mdt-flex mdt-list-none mdt-flex-col mdt-p-0"
        data-slot="stepper"
        data-layout="vertical"
      >
        {steps.map((step, index) => {
          const model = resolveStep(step, index, counters, onStepSelect !== undefined);
          const key = step.id ?? index;
          const locked = index > counters.far;
          const select = model.selectable ? onStepSelect : undefined;

          // Only says what opens it when that can be said in words.
          const behind = index > 0 ? steps[index - 1] : undefined;
          const lockedTitle =
            locked && typeof behind?.label === 'string' ? `Opens after ${behind.label}` : undefined;

          const row = select ? (
            <button
              type="button"
              data-slot="stepper-trigger"
              onClick={() => {
                select(index, step);
              }}
              className={cn(HIT_BOX, ROW, TRIGGER)}
            >
              {railBody(step, index, model)}
            </button>
          ) : (
            <div className={cn(HIT_BOX, ROW)}>{railBody(step, index, model)}</div>
          );

          // The line runs down from this disc to the next one, and fills once you have got past this step - a report
          // on the journey, as in the stacked layout. Going back does not empty it.
          const joined = index < counters.far && lights(model.state);

          return (
            <li
              key={key}
              data-slot="stepper-step"
              data-state={model.state}
              data-locked={locked || undefined}
              // Exactly one step carries this, so a screen reader says "current step" rather than reading seven
              // equal items.
              {...(index === counters.at ? { 'aria-current': 'step' as const } : {})}
              {...(locked || model.state === 'disabled' ? { 'aria-disabled': true } : {})}
              title={lockedTitle}
              className={cn(
                'mdt-relative',
                index < steps.length - 1 && 'mdt-pb-5',
                model.state === 'disabled' && 'mdt-opacity-45'
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
