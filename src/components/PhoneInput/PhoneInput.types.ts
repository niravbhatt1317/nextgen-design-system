import type { ReactNode } from 'react';
import type { InputProps } from '../Input';
import type { PhoneCountry, PhoneInputValue } from './countries';

export type { PhoneCountry, PhoneInputValue };

/**
 * Props for the PhoneInput component - the library Input (label, help, error, held, size) with the country code at its
 * start. Ported from the console's PhoneField (Pranjal, 2026-10-13).
 */
export interface PhoneInputProps extends Omit<
  InputProps,
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'type'
  | 'startAdornment'
  | 'endAdornment'
  | 'onClear'
  | 'clearLabel'
> {
  /**
   * Controlled value: the two parts `{ country, number }`, or a stored phone string ("+44 20 7946 0958"), which is
   * split into its country and national number.
   */
  value?: PhoneInputValue | string;
  /** Uncontrolled starting value, in either shape. */
  defaultValue?: PhoneInputValue | string;
  /**
   * The country chosen while nothing says otherwise - for an empty string value, a bare number, or a dial code
   * several countries share (+1 picks this one when it is a NANP country).
   */
  defaultCountry?: string;
  /**
   * Called on every change of the country or the number, with the two parts and the stored phone they join into
   * ("+<dial> <national>", the trunk 0 dropped outside the NANP; "" while the number is empty).
   */
  onChange?: (value: PhoneInputValue, phone: string) => void;
  /** The countries offered. Every ITU dial-code country by default (`PHONE_COUNTRIES`). */
  countries?: PhoneCountry[];
  /**
   * Draws a country's flag at 18 px (the console passes its flag-icons square). Without it, or when it returns
   * nothing, the country's two-letter code sits in a small tile - the console's own fallback.
   */
  renderFlag?: (code: string) => ReactNode;
  /** The country picker's spoken name while no country is chosen. @default "Country code" */
  countryLabel?: string;
  /** The search box's placeholder in the country list. @default "Search" */
  searchPlaceholder?: string;
  /** The country list's empty message. @default "No country matches" */
  emptyMessage?: string;
}
