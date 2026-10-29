import type { ComponentPropsWithoutRef, HTMLAttributes, MouseEventHandler, ReactNode } from 'react';

/**
 * How tall a row stands - the table's own three densities, so a list and a table
 * beside it read alike.
 *
 * - `default` - 54 at least, 5 above and below (one line, or a name over a line).
 * - `two-line` - as tall as its content, 8 above and below.
 * - `compact` - 36 at least, 4 above and below, 8 at the sides.
 */
export type RowListDensity = 'default' | 'two-line' | 'compact';

export interface RowListProps extends ComponentPropsWithoutRef<'div'> {
  /** @default 'default' */
  density?: RowListDensity;

  /**
   * The 1px neutral-20 edge with the 8 corners around the whole list. Off, the
   * rows keep their separators and lose only the frame - for a list that sits
   * inside a card that already has one.
   * @default true
   */
  bordered?: boolean;

  children?: ReactNode;
}

/** A row that is there but not at full strength: `dimmed` (65%) or `disabled` (55%, not pressable). */
export type RowState = 'dimmed' | 'disabled';

export interface RowProps extends Omit<HTMLAttributes<HTMLElement>, 'onClick' | 'title'> {
  /**
   * Makes the row a real `<button>` - keyboard, focus ring and the hover tint come
   * with it. Without it the row is a plain block and does not change under the
   * pointer.
   */
  onClick?: MouseEventHandler<HTMLElement>;

  /** Not pressable: the row drops its `onClick`, stays a plain block and shows at 55%. */
  disabled?: boolean;

  /** The picked row: the pale blue-10 fill. */
  selected?: boolean;

  /** `dimmed` or `disabled`. When given it is what the row shows, whatever `disabled` says. */
  state?: RowState;

  /** Before the text: an avatar, a tile, a glyph. */
  leading?: ReactNode;

  /** The text - usually a `RowTitle`. */
  children?: ReactNode;

  /**
   * After the text, at the right end: a ⋯ menu, a chevron, a badge. A press or a
   * key in here never reaches the row, so a menu in a pressable row opens the menu
   * and not the row.
   */
  actions?: ReactNode;

  /** The whole row's tooltip. */
  title?: string;
}

export interface RowTitleProps {
  /** The first line, 12/500 in the reading ink. One line, "…" when it does not fit, the whole of it on hover. */
  primary: ReactNode;

  /** The line under it, 11 in the secondary ink. Left out (or empty), the row is one line. */
  secondary?: ReactNode;

  /** The first line in the monospace face - ids, hosts, keys. */
  mono?: boolean;

  /** Beside the first line: a badge or two. */
  badges?: ReactNode;
}

/** Where a pick list's box sits: before the text, or at the right end of the row. */
export type SelectableRowControl = 'start' | 'end';

export interface SelectableRowProps {
  /** A tick box (several at once) or a radio (one of the list). @default 'checkbox' */
  type?: 'checkbox' | 'radio';

  checked?: boolean;

  /**
   * A tick box hands back its new state; a radio always hands back `true`, as a
   * native radio does - picking it again changes nothing.
   */
  onChange?: (checked: boolean) => void;

  /** Not pickable and at 55%. */
  disabled?: boolean;

  /** The row's first line, when no `children` are given. */
  label?: ReactNode;

  /** The line under the label, when no `children` are given. */
  hint?: ReactNode;

  /** At the right end of the row: a badge, a status, a note. */
  right?: ReactNode;

  /**
   * `start` (the default) puts the box before the text; `end` puts it at the right
   * end of the row, after `right` (the Add access list, Pranjal 2026-09-22:
   * "checkbox should be on the right").
   * @default 'start'
   */
  control?: SelectableRowControl;

  /** Your own row text, in place of `label` and `hint`. */
  children?: ReactNode;
}

export interface LogRowProps {
  /** A glyph or a dot before the message. */
  icon?: ReactNode;

  /** What happened, 12/500. */
  message: ReactNode;

  /** Who or why, 11 under the message. */
  meta?: ReactNode;

  /** When - formatted by you, right-aligned by the row, so every log reads its time the same way. */
  time?: ReactNode;
}

export interface KeyValueListProps extends ComponentPropsWithoutRef<'dl'> {
  /** The label column's width in px - one width for the whole list. @default 150 */
  labelWidth?: number;

  /** A 1px neutral-20 line under every row but the last. */
  separated?: boolean;

  children?: ReactNode;
}

export interface KeyValueItemProps {
  /** The key, 11 in the secondary ink. */
  label: ReactNode;

  /** The value, 12/500 in the reading ink; it wraps rather than cuts. */
  children?: ReactNode;

  /** One quiet line under the value. */
  hint?: ReactNode;
}

/** A timeline dot's colour: grey, or the success, warning or danger ink. */
export type TimelineTone = 'neutral' | 'success' | 'warning' | 'danger';

export interface TimelineProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
}

export interface TimelineItemProps {
  /** What happened, 12/500. */
  title: ReactNode;

  /** Who or why, 11 under it. */
  meta?: ReactNode;

  /** When, at the right end. */
  time?: ReactNode;

  /** @default 'neutral' */
  tone?: TimelineTone;

  /**
   * Ends the rail here even when more follows in the DOM. The last child ends it
   * on its own.
   */
  last?: boolean;
}
