import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Props for Slider - one number picked between two limits: the name, a track with the value riding on its handle,
 * and a ruler under it.
 */
export interface SliderProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children' | 'className' | 'onChange' | 'defaultValue'
> {
  /** The setting's name, at 14/500 above the track. It also names the track for a screen reader. */
  label: string;

  /** The value. One outside `min`..`max` is shown at the nearer limit. */
  value: number;

  /** The lower limit: the ruler's first number. */
  min: number;

  /** The upper limit: the ruler's last number. */
  max: number;

  /** Called with the new number (not the event) while dragging, on a typed value, and on a reset to the saved value. */
  onChange?: ((value: number) => void) | undefined;

  /**
   * Written after every number: "%" sits on it ("5%"), anything else after a space ("60 min"); a counted unit reads
   * singular at 1 ("1 restart").
   */
  unit?: string | undefined;

  /** One line under the name, in the muted ink, saying what the setting does. */
  hint?: ReactNode | undefined;

  /**
   * The explanation in an ⓘ beside the name ("About session timeout") instead of a written `hint` - for a page with
   * too much text to write each one out.
   */
  info?: ReactNode | undefined;

  /** A node after the name and its ⓘ - an "Edited" badge, say. It does not change the name a screen reader hears. */
  mark?: ReactNode | undefined;

  /** A node at the right end of the name row - the "include it in this change" switch, say. */
  aside?: ReactNode | undefined;

  /**
   * Keeps only the name row; the track waits hidden until the caller opens it (with the switch in `aside`, usually).
   * @default false
   */
  folded?: boolean | undefined;

  /**
   * The value as it is saved. When `value` moves off it the tag turns the solid ink, a yellow mark stays on the track
   * where the saved value sits, and a chip above the track shows the saved value - pressing it sets the slider back.
   * Leave it out where nothing is saved yet (a create step): the tag is then the solid ink from the start.
   */
  saved?: number | undefined;

  /**
   * Makes the value tag the field itself: press it, type, Enter keeps it, Escape or pressing elsewhere leaves it as it
   * was. A number outside the limits turns the field's edge red and is not kept. Dragging still works.
   * @default false
   */
  typeable?: boolean | undefined;

  /**
   * The name of the lower limit, under the track ("Min 15 min").
   * @default 'Min'
   */
  startName?: string | undefined;

  /**
   * The name of the upper limit, under the track ("Max 240 min"; "MSP baseline 60 min" where the baseline caps it).
   * @default 'Max'
   */
  endName?: string | undefined;

  /**
   * Hangs the two names off the ruler's first and last numbers instead of a line under the panel that repeats them.
   * @default false
   */
  endsOnRuler?: boolean | undefined;

  /**
   * Leaves the two names out altogether - for a caller whose ⓘ already says what each end costs.
   * @default false
   */
  hideEnds?: boolean | undefined;

  /**
   * Locked: the panel at half strength with a not-allowed pointer and "Locked" on hover; the tag wears its quiet
   * outline.
   * @default false
   */
  disabled?: boolean | undefined;

  /**
   * A hairline above, 20 either side of it - for every slider after the first in one card.
   * @default false
   */
  divided?: boolean | undefined;

  className?: string | undefined;
}
