import type { HTMLAttributes, ReactNode } from 'react';

/**
 * One key a KeyValuesBuilder row can pick - "SSH", with an optional hint shown after its name ("22").
 */
export interface KeyValuesOption {
  /** The key stored on each row that picks it. */
  value: string;

  /** The key's name in the picker - "SSH", "Finance". */
  label: string;

  /** A hint after the name in the picker, in brackets - "SSH (22)". Left unset, the picker shows the name alone. */
  hint?: string | undefined;
}

/**
 * One KeyValuesBuilder row: the picked key and the values typed for it.
 */
export interface KeyValuesRow {
  /** The option's `value`, or '' while the row has none picked yet. */
  key: string;

  /** The values typed for it, one string each, in the order they were added. */
  values: string[];
}

/**
 * Props for KeyValuesBuilder - rows of a picked key and the values typed for it, a row added per key.
 */
export interface KeyValuesBuilderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The keys offered in each row's picker, in order. A key another row holds is left out of the list. */
  options: KeyValuesOption[];

  /** The rows so far. Empty, the group still shows one blank row to type into. */
  rows: KeyValuesRow[];

  /** Called with the whole new list after any change - a key picked, a value added or removed, a row added or removed. */
  onRowsChange: (rows: KeyValuesRow[]) => void;

  /** The field's label over the group - "Custom ports". */
  label?: ReactNode | undefined;

  /** The explainer behind the ⓘ after the label. Needs `label`. */
  info?: ReactNode | undefined;

  /** Checks each typed value - see the values field's `validate` (ChipInput). Left unset, every value is accepted. */
  validateValue?: ((value: string) => string | null) | undefined;

  /** The key picker's placeholder. @default 'Choose…' */
  keyPlaceholder?: string | undefined;

  /** The values field's placeholder while it holds no value. @default 'Type a value, press Enter' */
  valuePlaceholder?: string | undefined;

  /** The add button's words - "Add protocol". @default 'Add' */
  addLabel?: string | undefined;

  /** The key picker's accessible name - "Protocol". @default 'Key' */
  keyLabel?: string | undefined;

  /** The values field's accessible name, before the picked key's name - "Ports" reads "Ports for SSH". @default 'Values' */
  valuesLabel?: string | undefined;

  /** Draws the values in mono - for ports, addresses, codes. */
  mono?: boolean | undefined;

  /** Turns every control in the group off. */
  disabled?: boolean | undefined;
}
