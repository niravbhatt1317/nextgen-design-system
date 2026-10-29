/**
 * Props for ChipInput - a field that turns typed values into chips.
 */
export interface ChipInputProps {
  /** The values so far, drawn as chips before the typing space. */
  values: string[];

  /** Called with the whole new list after a value is added or removed. */
  onValuesChange: (values: string[]) => void;

  /**
   * What is wrong with one typed value, or null when it is fine. A value that fails stays in the field with its red
   * edge and this message under it, until it is changed. Left unset, every value is accepted.
   */
  validate?: ((value: string) => string | null) | undefined;

  /** The placeholder while the field holds no value. @default 'Type a value, press Enter' */
  placeholder?: string | undefined;

  /** The field's accessible name - required, since a chip field has no visible label of its own. */
  'aria-label': string;

  /** Draws the values and the typing in mono - for ports, addresses, codes. */
  mono?: boolean | undefined;

  /** Turns the field and its chips off. */
  disabled?: boolean | undefined;

  /** Extra classes on the wrapper. */
  className?: string | undefined;
}
