import type { HTMLAttributes, ReactNode } from 'react';

/**
 * One kind of target the builder offers in its type picker - "Specific IP / host", "CIDR block", "CSV import".
 */
export interface TargetKind {
  /** The key stored on each entry of this kind. */
  value: string;

  /** The name in the type picker and on the entry's badge. */
  label: string;

  /**
   * How the value is typed: `single` one mono field on the picker's row with Add; `multi` a two-row mono text area
   * under the row with Add block (a block of addresses); `file` an upload, the row reading `fileHint` with Upload.
   */
  field: 'single' | 'multi' | 'file';

  /** The field's placeholder - the shape that passes ("10.20.4.14  or  host01.acme.local"). */
  placeholder?: string | undefined;

  /**
   * What is wrong with a typed value, or null when it is fine. Add (and Save on a row) refuses a value that fails,
   * and the message shows under the field from that press on, live, until the value passes.
   */
  validate?: ((value: string) => string | null) | undefined;

  /**
   * A warning shown under the row while this kind is picked, given the value typed so far - "Large CIDR …". Return
   * null for none.
   */
  warning?: ((value: string) => ReactNode) | undefined;
}

/**
 * One target the builder holds: its kind and the typed value, or for a `file` kind the file's name.
 */
export interface TargetEntry {
  /** The kind's `value`. */
  kind: string;

  /** The typed value (a single target, a range, or a block of addresses). */
  value?: string | undefined;

  /** The file's name, for a `file` kind. */
  file?: string | undefined;
}

/**
 * Props for TargetBuilder - a list of targets built one at a time: pick a type, type the value, Add.
 */
export interface TargetBuilderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The types offered in the picker, in order. */
  kinds: TargetKind[];

  /** The targets added so far, drawn as rows above the add row. */
  entries: TargetEntry[];

  /** Called with the whole new list after an Add, a Save on a row, or a Remove. */
  onEntriesChange: (entries: TargetEntry[]) => void;

  /** The field's label over the builder - "Include targets", "Exclusions". */
  label?: ReactNode | undefined;

  /**
   * The type the picker opens on, and returns to after each Add. Left empty, the picker shows `placeholder` until a
   * type is chosen.
   * @default ''
   */
  defaultKind?: string | undefined;

  /** Called when the picked type changes - by hand, or back to `defaultKind` after an Add. */
  onKindChange?: ((kind: string) => void) | undefined;

  /** The picker's placeholder while no type is picked. @default 'Add a target - choose a type…' */
  placeholder?: string | undefined;

  /**
   * The badge tone on every row: `info` for targets that are included, `danger` for exclusions.
   * @default 'info'
   */
  tone?: 'info' | 'danger' | undefined;

  /**
   * A `file` kind's Upload: return the chosen file's name to add it as an entry, or nothing to add none. Left unset,
   * Upload adds `<kind>.csv`.
   */
  onUpload?: ((kind: string) => string | undefined) | undefined;

  /** The line beside Upload for a `file` kind. @default 'Single-column CSV - one entry per row, no header.' */
  fileHint?: ReactNode | undefined;
}
