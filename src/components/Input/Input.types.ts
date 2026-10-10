import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { InputVariants as InputVariantsCVA } from './Input';

/**
 * Input component variants derived from CVA configuration
 */
export type InputVariants = VariantProps<typeof InputVariantsCVA>;

/**
 * Props for the Input component
 */
export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'>, InputVariants {
  /**
   * Error message to display below the input
   */
  error?: string;
  /**
   * Label text for the input
   */
  label?: string;
  /**
   * Helper text displayed below the input
   */
  helperText?: string;
  /**
   * Icon or element to display at the start of the input
   */
  startAdornment?: ReactNode;
  /**
   * Icon or element to display at the end of the input
   */
  endAdornment?: ReactNode;
  /**
   * A held field (Pranjal, 2026-09-17): disabled, with a lock inside at the right - 14 like the search glyph, 12 from
   * the edge, in the disabled text colour - and the value truncating before it. For a value something else owns (a
   * directory, a fixed identity); the label above stays plain.
   */
  locked?: boolean;
  /**
   * A clear button (Pranjal, 2026-09-28, on the table search: "we need to provide a cross icon on the right so that i
   * can clear all at once instead of backspacing each time"). Given, a ghost ✕ sits inside at the right while the
   * field holds text; pressing it calls this and puts the caret back in the field. Every search box sets it.
   */
  onClear?: () => void;
  /** The clear button's spoken name. "Clear" unless the field says otherwise ("Clear search"). */
  clearLabel?: string;
  /**
   * Wrapper className for the container div
   */
  wrapperClassName?: string;
}
