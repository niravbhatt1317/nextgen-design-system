import { forwardRef } from 'react';
import { cn } from '@/utils';
import { useDialogGutter } from './dialogSpacing';
import { Icon } from '../Icon';
import type { DialogStepsProps } from './Dialog.types';

/** The circle, at each of the three states a step can be in. */
const MARK = 'mdt-flex mdt-h-6 mdt-w-6 mdt-shrink-0 mdt-items-center mdt-justify-center';

/**
 * DialogSteps - where you are in a dialog that has more than one part.
 *
 * **The bar under each step is the progress, not a connector between dots.**
 * Every step owns a full-width rule beneath its own label, dark once reached
 * and pale before. A row of circles joined by a line says "these are stations
 * on a route"; a row of underlined labels says "these are the parts, and you
 * have done this many" - which is the question somebody halfway through a form
 * is actually asking.
 *
 * **A step you have finished shows a tick, not its number.** The number is only
 * useful before you arrive; afterwards the useful thing is that it is done.
 *
 * Sits directly under the header, above the body, and never in the footer -
 * `Back` and `Next` belong there, and putting the position there too would
 * crowd the one row that has to stay readable.
 *
 * @example
 * ```tsx
 * <DialogSteps
 *   current={1}
 *   steps={[{ key: 'details', label: 'Invite details' }, { key: 'access', label: 'Access duration' }]}
 *   onStepSelect={(key) => { goTo(key); }}
 * />
 * ```
 */
const DialogSteps = forwardRef<HTMLOListElement, DialogStepsProps>(
  ({ className, steps, current, onStepSelect, label = 'Progress', ...props }, ref) => (
    <ol
      ref={ref}
      aria-label={label}
      // 20px to whatever follows, against the 16 between everything else: the
      // content's grid gap plus this. The reading starts below the steps, and
      // the extra 4 is what says so. It lives here rather than as a rule on the
      // content because the steps are the only block that wants it.
      className={cn(useDialogGutter(), 'mdt-mb-1 mdt-flex mdt-shrink-0 mdt-gap-3', className)}
      {...props}
    >
      {steps.map((step, index) => {
        const done = index < current;
        const here = index === current;
        // Only what you have already been through. Letting somebody jump ahead
        // to a step whose inputs depend on this one is how a form ends up
        // half-filled in an order nobody designed for.
        const reachable = done && onStepSelect !== undefined;

        const inner = (
          <>
            <span className="mdt-flex mdt-items-center mdt-gap-2">
              <span
                className={cn(
                  MARK,
                  'mdt-rounded-full mdt-text-xs mdt-font-medium',
                  done || here
                    ? 'mdt-bg-foreground mdt-text-background'
                    : 'mdt-border mdt-border-border mdt-text-muted-foreground'
                )}
              >
                {done ? <Icon name="check" size="xs" aria-hidden /> : index + 1}
              </span>
              <span
                className={cn(
                  'mdt-truncate mdt-text-sm',
                  here ? 'mdt-font-medium mdt-text-foreground' : 'mdt-text-muted-foreground'
                )}
              >
                {step.label}
              </span>
            </span>
            {/*
              The rule is the progress. 2px so it reads as a track rather than
              as a border on the label above it.
            */}
            <span
              aria-hidden
              className={cn(
                'mdt-h-0.5 mdt-w-full mdt-rounded-full',
                done || here ? 'mdt-bg-foreground' : 'mdt-bg-border'
              )}
            />
          </>
        );

        return (
          <li
            key={step.key}
            // Equal widths, so the bars read as one track cut into parts rather
            // than as labels that happen to be underlined.
            className="mdt-flex mdt-flex-1 mdt-flex-col mdt-gap-2"
            aria-current={here ? 'step' : undefined}
          >
            {reachable ? (
              <button
                type="button"
                onClick={() => {
                  onStepSelect(step.key, index);
                }}
                className={cn(
                  'mdt-flex mdt-flex-col mdt-gap-2 mdt-rounded-sm mdt-text-left',
                  'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring'
                )}
              >
                {inner}
              </button>
            ) : (
              inner
            )}
          </li>
        );
      })}
    </ol>
  )
);
DialogSteps.displayName = 'DialogSteps';

export { DialogSteps };
