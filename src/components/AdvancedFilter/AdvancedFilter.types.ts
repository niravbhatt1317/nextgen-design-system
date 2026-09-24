/**
 * The advanced filter's vocabulary.
 *
 * A page describes its keys once; the filter builds rows of key · operator ·
 * value from them and hands back a FilterValue the page applies with
 * applyAdvanced().
 */

/** What a key holds: typed text, a list of options, or a date. */
export type FilterKeyType = 'text' | 'pick' | 'date';

/** One thing a list can be filtered on. */
export interface FilterKey<Row = unknown> {
  /** The field's name in the row, unless `get` says otherwise. */
  id: string;
  /** The word in the key list. */
  label: string;
  /** Text, a list of options, or a date. */
  type: FilterKeyType;
  /** For a `pick` key: the options, or a function that gives them. */
  options?: string[] | (() => string[]) | undefined;
  /** How to read the value off a row when it is not `row[id]` (a date to parse, a code to name). */
  get?: ((row: Row) => unknown) | undefined;
}

/** How the rows of one list combine. */
export type FilterJoin = 'and' | 'or';

/** One condition: a key, an operator, a value. Any of them may still be empty while the row is being built. */
export interface FilterRow {
  key: string | null;
  op: string | null;
  /** A string for text and dates, a string[] for a pick key, a number of days as a string for "within the last". */
  value: unknown;
}

/** A group: rows of its own, combined by its own join, sitting in the outer list like a row. One level deep. */
export interface FilterGroup {
  group: true;
  join: FilterJoin;
  rows: FilterRow[];
}

export type FilterItem = FilterRow | FilterGroup;

/** What the filter applies: the outer join and its rows and groups. */
export interface FilterValue {
  join: FilterJoin;
  rows: FilterItem[];
}

export interface AdvancedFilterProps<Row = unknown> {
  /** Whether the panel shows. The page owns this, so the door can toggle it. */
  open: boolean;
  /** Asked for on Apply, Escape and a press outside. */
  onClose?: (() => void) | undefined;
  /** The keys this list can be filtered on. Whatever the page already offers as a quick filter is never one of them. */
  keys: FilterKey<Row>[];
  /** What is applied now. Every open starts from it. */
  value?: FilterValue | undefined;
  /** Apply, Enter, and Clear all (with an empty filter). */
  onApply: (next: FilterValue) => void;
  /** The panel's width. 656 from the Figma frame. */
  width?: number | undefined;
  /** The heading. "Filters" unless the page says otherwise. */
  title?: string | undefined;
  /** Extra classes on the panel. */
  className?: string | undefined;
}
