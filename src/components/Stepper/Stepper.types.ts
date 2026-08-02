import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { stepperVariants } from './Stepper';

export type StepperVariantsType = VariantProps<typeof stepperVariants>;

/**
 * How the steps are laid out.
 *
 * `stacked` puts the disc above its label, joined left to right by a line - the
 * shape everyone recognises, and the one that needs the most room. `inline` sets
 * the disc beside its label on one row, separated by a chevron: half the height,
 * and it wraps onto another row rather than breaking its words.
 *
 * `underline` gives every step a full-width rule beneath its own label instead
 * of a line between discs. **The bar is the progress, not a connector.** A row
 * of circles joined by a line says "these are stations on a route"; a row of
 * underlined labels says "these are the parts, and you have done this many" -
 * which is what somebody halfway through a form is actually asking. It is the
 * shape a dialog wants, where a stepper has to fit above a body without taking
 * a third of the height.
 *
 * Vertical is deliberately not here. It is a different component with different
 * rules, not a fourth value on this switch.
 */
export type StepperLayout = 'stacked' | 'inline' | 'underline';

/**
 * What a step is, at this moment.
 *
 * Three are worked out from `current` and never need setting. The two you set
 * yourself are the ones no counter can know about:
 *
 * - `skipped` - passed over on purpose, and not coming back
 * - `disabled` - there, but not available to this person
 *
 * **There is no error state, on purpose.** A red disc says where a problem is
 * and never what it is, so it always needs a message beside it - and once the
 * message is there, the disc is repeating itself. Leave the step as `current`
 * and put a `Banner` under the strip.
 */
export type StepState = 'complete' | 'current' | 'upcoming' | 'skipped' | 'disabled';

export interface StepperStep {
  /**
   * One or two words, and ideally a verb and a noun - *Map fields*, *Choose a
   * source*. One word is fine when it is universally understood: *Cart*,
   * *Payment*, *Review*.
   */
  label: ReactNode;

  /**
   * A quieter line under the label. **`stacked` only** - `inline` has no room
   * beneath the label, and putting it beside would stop the row reading as one
   * line of travel. Ignored, with a warning, on `inline`.
   */
  description?: ReactNode | undefined;

  /**
   * Overrides what `current` would have worked out.
   *
   * Only worth setting for `skipped` and `disabled` - the other three are what
   * the counter already says.
   */
  state?: StepState | undefined;

  /** Used as the React key and handed back by `onStepSelect`. */
  id?: string | undefined;
}

export interface StepperOwnProps {
  /** The steps, in the order they happen. Three or more, or use plain text. */
  steps: readonly StepperStep[];

  /** Which one you are on, counting from zero. Clamped to the list. */
  current: number;

  /** @default 'stacked' */
  layout?: StepperLayout | undefined;

  /**
   * Lets `stacked` drop to `inline` when there is not room for it.
   *
   * Measured, not guessed at from the window - a stepper in a side panel has to
   * know about the panel, not the screen. Turn it off to hold one shape at every
   * width, and accept that the labels will break.
   *
   * @default true
   */
  responsive?: boolean | undefined;

  /**
   * Makes finished steps clickable, and only finished ones.
   *
   * Leave it out and no step is focusable at all, which is right for a wizard
   * that acts as it goes - you cannot return to step 1 because step 2 already
   * used it. A step you have not reached is never clickable either way, because
   * it is not somewhere you can go.
   */
  onStepSelect?: ((index: number, step: StepperStep) => void) | undefined;

  /**
   * What the whole sequence is for. Required - a nameless list of five items
   * tells a screen reader nothing about what it is counting.
   */
  'aria-label': string;

  className?: string | undefined;
}

export type StepperProps = StepperOwnProps &
  Omit<ComponentPropsWithoutRef<'nav'>, 'className' | 'aria-label' | 'children'>;
