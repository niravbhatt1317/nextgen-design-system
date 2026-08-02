import { cn } from '@/utils';
import { Stepper } from '../Stepper';
import { useDialogGutter } from './dialogSpacing';
import type { DialogStepsProps } from './Dialog.types';

/**
 * DialogSteps - where you are in a dialog that has more than one part.
 *
 * **A preset of `Stepper`, not a second one.** It draws `Stepper`'s `underline`
 * layout, seats it in the dialog's gutter, and stops it shrinking when the body
 * scrolls. Everything about *how a step looks* - the filled disc for settled and
 * the outlined one for live, the tick that replaces the number once a step is
 * behind you, the dash for skipped, the states worked out from `current` - is
 * `Stepper`'s and is the same here as anywhere else in the library.
 *
 * It was briefly its own implementation. Two answers to one question is a
 * defect: the tick would have been fixed in one of them and not the other, and
 * nobody would have known which they were looking at.
 *
 * **The bar under each step is the progress, not a connector between dots.** A
 * row of circles joined by a line says "these are stations on a route"; a row
 * of underlined labels says "these are the parts, and you have done this many"
 * - which is the question somebody halfway through a form is actually asking.
 *
 * **It forwards no ref**, because `Stepper` takes none - it keeps one of its own
 * to measure with. Nothing needed one; said here so the absence is a decision
 * rather than an oversight.
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
const DialogSteps = ({
  className,
  steps,
  current,
  onStepSelect,
  label = 'Progress',
  ...props
}: DialogStepsProps) => (
  <Stepper
    {...props}
    // After the spread, not before: `aria-label` is optional on the props this
    // takes and required on `Stepper`, so a spread landing after it would make
    // the required one optional again - and a nameless list of five items tells
    // a screen reader nothing about what it is counting.
    aria-label={label}
    layout="underline"
    steps={steps.map((step) => ({ id: step.key, label: step.label }))}
    current={current}
    // Only what you have already been through. `Stepper` enforces that itself
    // - a step you have not reached is never clickable - so this only has to
    // translate its index back to the key the dialog knows the step by.
    {...(onStepSelect === undefined
      ? {}
      : {
          onStepSelect: (index: number) => {
            const step = steps[index];
            if (step) onStepSelect(step.key, index);
          },
        })}
    className={cn(
      useDialogGutter(),
      // 20px to whatever follows, against the 16 between everything else: the
      // content's grid gap plus this. The reading starts below the steps.
      'mdt-mb-1',
      // Never squeezed to make room for a scrolling body.
      'mdt-shrink-0',
      className
    )}
  />
);

DialogSteps.displayName = 'DialogSteps';

export { DialogSteps };
