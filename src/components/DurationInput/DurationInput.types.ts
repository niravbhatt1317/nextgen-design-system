import type { HTMLAttributes, ReactNode } from 'react';

/**
 * Props for DurationInput - days, hours and minutes in one box, each number with its unit word after it.
 */
export interface DurationInputProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  /** The duration, in minutes. 0 (or nothing) is an empty box: the three placeholders. */
  value?: number | undefined;

  /** The starting duration in minutes of an uncontrolled box. */
  defaultValue?: number | undefined;

  /**
   * Fires with the next duration in minutes - once a segment is left or Enter is pressed (the box laid out again,
   * hours past 23 and minutes past 59 carried over), or a list row picked. A half-typed number is never fought.
   */
  onChange?: ((minutes: number) => void) | undefined;

  /** Above the box: 13/500 in neutral-90, 6 under it. */
  label?: ReactNode;

  /** Error text under the box; also paints the danger border. */
  error?: string | undefined;

  /** Helper text under the box, shown when there is no error. */
  helperText?: string | undefined;

  /** 32 (sm, the default) · 36 (md) · 40 (lg). */
  size?: 'sm' | 'md' | 'lg' | undefined;

  /** Off: the neutral-10 ground, the faint ink, a not-allowed cursor. */
  disabled?: boolean | undefined;

  /** The most days the box holds - a larger count typed is held at it. 999. */
  maxDays?: number | undefined;

  /** The step of the Minutes list - 5: 0, 5, 10 … 55. A minute typed off the step shows in its place. */
  minuteStep?: number | undefined;

  /** A press on Hours or Minutes drops a list under it (ArrowDown too); `false` leaves the numbers to be typed. */
  lists?: boolean | undefined;

  /** Class name for the outer wrapper (the label, the box and the message). */
  wrapperClassName?: string | undefined;

  /** Class name for the box itself. */
  className?: string | undefined;
}
