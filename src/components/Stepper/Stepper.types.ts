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
 * `vertical` sets the journey down a rail, as the navigation of a two-column
 * flow: the rail on the left, the panel beside it showing one step at a time.
 * It is the one layout that IS the navigation rather than a report above a
 * form, so a step past `reached` is locked there and says what opens it. (Until
 * 2026-10-11 this comment said vertical was a different component; Pranjal
 * ruled it a variant: "we already have steppers so it should be sent as a
 * variant not a new component".)
 *
 * Every layout reads the same two counters, `current` and `reached`, and draws
 * a step the same way: hover marks only the disc and the name, a clickable step
 * is exactly the same box as a plain one, and a finished step reads in full ink.
 */
export type StepperLayout = 'stacked' | 'inline' | 'underline' | 'vertical';

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
 *
 * Each step writes its state to `data-state`. One more value appears there that
 * is never set by hand: `reached`, on the furthest step got to once you have
 * gone back from it (see `reached` on the Stepper) - outlined, because it is
 * not finished, and where you left off.
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
   * The furthest step got to so far. Never less than `current`. Every layout
   * reads it (until 2.4.0, only `vertical` did).
   *
   * This is what lets somebody go **back** without losing their place: step 4
   * was reached, they returned to step 2 to fix a field, and nothing is undone.
   * Step 3 keeps its tick, step 4 shows as where you left off (outlined, its
   * name in full ink), the line or bar stays filled up to step 4, and step 2 -
   * the one they are on - keeps its tick inside a "you are here" ring. With
   * `onStepSelect`, steps 1, 3 and 4 are all clickable.
   *
   * Everything past it is not somewhere you can go. On `vertical` it is locked:
   * plain text, quiet, titled "Opens after <the step before>".
   *
   * Leave it out and it is `current`, which draws exactly what a strip without
   * it always drew.
   *
   * @default current
   */
  reached?: number | undefined;

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
   * Makes every step you have got to clickable - each one up to `reached` -
   * except the one you are on, and never a step set to `skipped` or
   * `disabled`. Without `reached` that is exactly the finished steps.
   *
   * A clickable step is the same box as a plain one, so nothing moves when this
   * is given. Hover marks only its disc (a soft halo) and its name (a dashed
   * underline); keyboard focus rings the disc.
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
