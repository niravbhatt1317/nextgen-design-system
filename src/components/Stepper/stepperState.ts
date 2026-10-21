import type { StepState, StepperStep } from './Stepper.types';

/*
 * What every layout agrees on - the across layouts (Stepper.tsx) and the rail (StepperRail.tsx) read one model, so a
 * step means the same thing whichever way the strip is drawn.
 *
 * Pranjal's four rules (approved on the Stepper lineup, 2026-10-19), the same in every layout:
 *   1. Hover marks the disc (a soft halo) and the name (a dashed underline), never the whole step.
 *   2. Nothing moves when a step becomes clickable: a clickable step is exactly the same box as a plain one.
 *   3. A finished step reads as finished, not faded: its name is in full ink. Only the steps ahead stay quiet.
 *   4. Going back keeps your progress: `reached` is the furthest step got to. Every step before it keeps its tick and
 *      its line, it shows as where you left off, and the step you went back to keeps its tick inside a ring.
 */

/**
 * What a step shows. The five states, plus `reached` - the furthest step you have got to, when you have gone back
 * from it: outlined like the current one, because you have not finished it, but not where you are standing.
 */
export type StepLook = StepState | 'reached';

/** One step, worked out from the two counters. */
export interface StepModel {
  /** Written to `data-state`: the step's state, or `reached` for where you left off. */
  state: StepLook;
  /** What the disc, the label and the description wear. A revisited current step wears `complete`. */
  look: StepLook;
  /** Back on a step you had already finished: it keeps its tick and gains the "you are here" ring. */
  here: boolean;
  /** A button: there is a handler, you have been there, and it is not where you are. */
  selectable: boolean;
  /** Visually hidden words after the label, so a screen reader hears what the tick and the ring say. */
  spoken: string;
}

/** Where you are, and the furthest you have got - both clamped to the list, the second never behind the first. */
export const resolveCounters = (
  count: number,
  current: number,
  reached: number | undefined
): { at: number; far: number } => {
  const last = Math.max(count - 1, 0);
  const at = Math.min(Math.max(current, 0), last);
  // Never behind where you are standing: you cannot be on a step you have not reached.
  const far = Math.min(Math.max(reached ?? at, at), last);
  return { at, far };
};

/** The state the two counters give a step nobody set by hand. */
const counted = (index: number, at: number, far: number): StepLook => {
  if (index === at) return 'current';
  if (index < far) return 'complete';
  if (index === far) return 'reached';
  return 'upcoming';
};

/** What a screen reader hears after the label. The current step says nothing: `aria-current` already does. */
const SPOKEN: Partial<Record<StepLook, string>> = {
  complete: ', done',
  reached: ', where you left off',
  skipped: ', skipped',
  disabled: ', disabled',
};

const SPOKEN_HERE = ', done, you are here';

/**
 * Works out one step.
 *
 * A step set to `skipped` or `disabled` keeps that whatever the counters say, and is never a place to go. Any step up
 * to `far` that is finished or where you left off is - except the one you are on, which is already here.
 */
export const resolveStep = (
  step: StepperStep,
  index: number,
  counters: { at: number; far: number },
  canSelect: boolean
): StepModel => {
  const { at, far } = counters;
  const state: StepLook = step.state ?? counted(index, at, far);
  const here = state === 'current' && index === at && index < far;
  const look: StepLook = here ? 'complete' : state;
  const selectable =
    canSelect && index !== at && index <= far && (state === 'complete' || state === 'reached');
  return { state, look, here, selectable, spoken: here ? SPOKEN_HERE : (SPOKEN[look] ?? '') };
};

/**
 * Whether a step's piece of the track can light up. Passed over or not available is not progress, so a skipped or a
 * disabled step never earns a fill - the same rule its disc follows.
 */
export const lights = (state: StepLook): boolean => state !== 'skipped' && state !== 'disabled';

/** Which ink a label wears: the step you are on reads heaviest, even when it was finished before. */
export const labelKey = (model: StepModel): StepLook =>
  model.state === 'current' ? 'current' : model.look;

/* ── The classes every layout shares ─────────────────────────────────────────────────────────── */

/** Every part that changes colour does it over the same 150ms, so one strip never looks like three. */
export const SETTLES = 'mdt-transition-colors mdt-duration-150';

/** The quiet ink, worn by every step you have not got to. */
export const QUIET = 'mdt-text-muted-foreground';

/** An outlined disc in primary: live - the step you are on, or the one you left off at. */
const LIVE = 'mdt-border-primary mdt-bg-transparent mdt-text-foreground';
/** A step ahead, passed over, or not available: the hairline edge, hollow, the quiet ink. */
const AHEAD = `mdt-border-border mdt-bg-transparent ${QUIET}`;

/**
 * One rule carries the whole component: **a filled disc is settled, an outlined disc is live.** There is no red disc
 * on purpose - a broken step stays `current`, with a `Banner` under the strip.
 */
export const DISC_LOOK: Record<StepLook, string> = {
  complete: 'mdt-border-primary mdt-bg-primary mdt-text-primary-foreground',
  current: LIVE,
  reached: LIVE,
  upcoming: AHEAD,
  skipped: AHEAD,
  disabled: AHEAD,
};

/** The tick for done and the dash for passed over; every other disc shows its number. */
export const MARK: Partial<Record<StepLook, 'check' | 'minus'>> = {
  complete: 'check',
  skipped: 'minus',
};

/** Back on a step you had finished: a 2px gap in the page colour, then a 2px ring in primary - done, and you are here. */
export const HERE_RING = 'mdt-ring-2 mdt-ring-primary mdt-ring-offset-2 mdt-ring-offset-background';

/**
 * Hover and keyboard focus mark the disc, never the whole step. Under the pointer a soft 4px halo in primary at 14%;
 * on keyboard focus the focus ring, with a 2px gap in the page colour. Both key off the trigger's own named group, so
 * a plain step - which has no trigger - and a `group` the page wraps around the strip never light them.
 */
export const DISC_POINTER = [
  'mdt-transition mdt-duration-150',
  'group-hover/stepper-hit:mdt-ring-4 group-hover/stepper-hit:mdt-ring-primary/[0.14]',
  'group-focus-visible/stepper-hit:mdt-ring-2 group-focus-visible/stepper-hit:mdt-ring-ring',
  'group-focus-visible/stepper-hit:mdt-ring-offset-2 group-focus-visible/stepper-hit:mdt-ring-offset-background',
];

/** The name's line: a dashed underline 4px under the words, invisible until the pointer is on a clickable step. */
export const LABEL_LINE = [
  SETTLES,
  'mdt-underline mdt-decoration-transparent mdt-decoration-dashed mdt-decoration-1 mdt-underline-offset-4',
  'group-hover/stepper-hit:mdt-decoration-foreground/55',
];

/** The description's ink: the secondary reading ink once you have been there, the quiet one ahead. */
const DESCRIPTION_READ = 'mdt-text-neutral-90';
export const DESCRIPTION_LOOK: Record<StepLook, string> = {
  complete: DESCRIPTION_READ,
  current: DESCRIPTION_READ,
  reached: DESCRIPTION_READ,
  upcoming: QUIET,
  skipped: QUIET,
  disabled: QUIET,
};

/**
 * The step's own box. A button when you can go there, otherwise a div with exactly these classes - so the strip is the
 * same height, and every disc in the same place, whether or not anything is clickable.
 */
export const HIT_BOX = 'mdt-flex mdt-min-w-0 mdt-max-w-full';

/**
 * What only the button adds, none of it size or space: the named group the disc and label read their hover from, and
 * the resets that make a button draw nothing of its own. The focus ring is on the disc, so the button draws none.
 */
export const TRIGGER = [
  'mdt-group/stepper-hit mdt-m-0 mdt-cursor-pointer mdt-appearance-none',
  'mdt-border-0 mdt-bg-transparent mdt-p-0 focus-visible:mdt-outline-none',
];
