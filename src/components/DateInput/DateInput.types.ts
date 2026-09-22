import type { ButtonHTMLAttributes, ReactNode } from 'react';

/** 32 (sm, the default) · 36 (md) · 40 (lg) - the Input's three heights */
export type DateInputSize = 'sm' | 'md' | 'lg';

/**
 * Props for the DateInput - the date field.
 *
 * The field is a button: it holds a day and opens the calendar. It wears the
 * Input's ruled states (K-Field-01..12) and takes the calendar glyph at the
 * right (K-Field-28), or the lock when held (K-Field-11).
 */
export interface DateInputProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'value' | 'onChange' | 'disabled' | 'type'
> {
  /** The chosen day, "YYYY-MM-DD". Shown as "22 Oct 2026". */
  value?: string | undefined;
  /** Fires with the picked day as "YYYY-MM-DD"; with "" when cleared. */
  onChange?: ((day: string) => void) | undefined;
  /** What the empty field says, in the placeholder colour. Defaults to "Pick a date". */
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
  /** Shows a Clear button in the calendar; clearing reports "" and closes. */
  clearable?: boolean | undefined;
  /** The accessible name when there is no label. */
  'aria-label'?: string | undefined;
  /** Class name for the outer wrapper. */
  wrapperClassName?: string | undefined;
  /** Class name for the field itself. */
  className?: string | undefined;
}
