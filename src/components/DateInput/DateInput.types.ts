import type { ButtonHTMLAttributes, ReactNode } from 'react';

/** 32 (sm, the default) · 36 (md) · 40 (lg) - the Input's three heights */
export type DateInputSize = 'sm' | 'md' | 'lg';

/**
 * Props for the DateInput - the date field.
 *
 * The field is a button: it holds a day (or, with `withTime`, a day and a time) and opens the
 * picker below it - above when there is no room. It wears the
 * Input's ruled states (K-Field-01..12) and takes the calendar glyph at the
 * right (K-Field-28), or the lock when held (K-Field-11).
 */
export interface DateInputProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'value' | 'onChange' | 'disabled' | 'type'
> {
  /**
   * The saved value. "YYYY-MM-DD", shown as "22 Oct 2026"; with `withTime`, "YYYY-MM-DDTHH:mm"
   * (local, 24-hour), shown as "13 Oct 2026, 14:30".
   */
  value?: string | undefined;
  /** Fires on Apply with the value in the same shape; with "" when a `clearable` field is emptied. */
  onChange?: ((value: string) => void) | undefined;
  /**
   * A developer setting, never a switch shown to people: the picker gains the time column and
   * the value carries the time. Default false.
   */
  withTime?: boolean | undefined;
  /** Minutes between the times in the column. Default 30. */
  timeStep?: number | undefined;
  /** What the empty field says, in the placeholder colour. Defaults to "Pick a date" ("Pick a date and time" with `withTime`). */
  placeholder?: string | undefined;
  /** The earliest day that can be picked, "YYYY-MM-DD". */
  min?: string | undefined;
  /** The latest day that can be picked, "YYYY-MM-DD". */
  max?: string | undefined;
  /** Off for a moment: the neutral-10 ground, placeholder-colour text, no lock. Does not open. */
  disabled?: boolean | undefined;
  /**
   * A held field (K-Field-11): disabled, the 14 lock inside at the right, 12 from the edge, in the
   * disabled text colour, taking the calendar glyph's place; the value truncates 8 before it.
   * For a day something else owns. Does not open.
   */
  locked?: boolean | undefined;
  /** Error text under the field; also paints the danger border and turns the focus halo red. */
  error?: string | undefined;
  /** Helper text under the field, shown when there is no error. */
  helperText?: string | undefined;
  /** Optional label above, 13 in neutral-90, 6 under it. */
  label?: ReactNode | undefined;
  /** 32 (sm, the default) · 36 (md) · 40 (lg) */
  size?: DateInputSize | undefined;
  /**
   * Lets the field be emptied: after Reset in the picker, Apply stays on, reports "" and closes.
   * (Before 2026-09-28 this showed a Clear button; Reset now sits in every picker.)
   */
  clearable?: boolean | undefined;
  /** The accessible name when there is no label. */
  'aria-label'?: string | undefined;
  /** Class name for the outer wrapper. */
  wrapperClassName?: string | undefined;
  /** Class name for the field itself. */
  className?: string | undefined;
}
