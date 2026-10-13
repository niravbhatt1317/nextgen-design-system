import type { ReactNode } from 'react';

/**
 * How loud the action is.
 *
 * `destructive` paints the action red and, when its label starts with Delete,
 * Remove or Permanently delete, puts the bin in front of it. `default` is the
 * primary button - a reversible step such as Disable or Archive.
 */
export type ConfirmDialogTone = 'default' | 'destructive';

/**
 * The console's two dialog widths: `sm` 480 (every plain confirm) and `md` 560
 * (a confirm that also asks what happens to the holders - Delete role, Delete
 * access profile).
 */
export type ConfirmDialogWidth = 'sm' | 'md';

export interface ConfirmDialogProps {
  /** Whether the dialog is showing. */
  open: boolean;

  /**
   * Called with `false` whenever the dialog wants to close: Cancel, Escape, a
   * press outside, the ✕, or the action finishing.
   */
  onOpenChange?: ((open: boolean) => void) | undefined;

  /** The question, as a verb and its object: "Delete team", "Disable user". */
  title: ReactNode;

  /**
   * One supporting line under the title, inside the header. For the sentence
   * that frames the decision ("Roles are definitions - retiring one means
   * deciding what happens to its holders.").
   */
  description?: ReactNode | undefined;

  /**
   * The body: what will happen and what will be lost. Plain text renders at
   * 14 / 1.5 in the reading ink; `<b>` or `<strong>` around a name lifts it to
   * the heading ink. A `Banner` listing the consequences goes here too.
   */
  children?: ReactNode | undefined;

  /** The action's label - the concrete verb, never "OK" or "Confirm". */
  confirmLabel: string;

  /** The safe way out. Defaults to "Cancel". */
  cancelLabel?: string | undefined;

  /** `destructive` for a red action. Defaults to `default`. */
  tone?: ConfirmDialogTone | undefined;

  /**
   * The glyph before the action's label. Left unset, a destructive action whose
   * label starts with Delete, Remove or Permanently delete gets the bin; `null`
   * takes it away.
   */
  confirmIcon?: ReactNode | undefined;

  /**
   * A word the person has to type before the action unlocks - "delete" across
   * the console. Matched trimmed and ignoring case, so a pasted word with a
   * trailing space still counts.
   */
  typedWord?: string | undefined;

  /**
   * A further lock on the action, for a confirm that asks something else first
   * (a replacement role not picked yet). The typed word, if any, still applies.
   */
  confirmDisabled?: boolean | undefined;

  /** Hide Cancel, for a notice with a single button ("Got it"). */
  hideCancel?: boolean | undefined;

  /**
   * Runs the action. Return a promise to keep the action busy until it settles;
   * return or resolve `false` to stay open, anything else closes. Report your
   * own errors inside it - a rejection only keeps the dialog open.
   *
   * Typed `unknown` so any handler fits - one returning nothing, a boolean, or
   * the promise from an API call.
   */
  onConfirm: () => unknown;

  /** Called on every way out that is not the action: Cancel, Escape, outside, ✕. */
  onCancel?: (() => void) | undefined;

  /** `sm` 480 or `md` 560. Defaults to `sm`. */
  width?: ConfirmDialogWidth | undefined;

  /** Extra classes on the dialog's box. */
  className?: string | undefined;
}
