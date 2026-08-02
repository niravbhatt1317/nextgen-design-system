import { useEffect } from 'react';

export interface UseSubmitShortcutOptions {
  /** What ⌘↵ does. */
  onSubmit: () => void;

  /**
   * Whether the shortcut is listening.
   *
   * Pass the dialog's own open state. A shortcut that survives its dialog fires
   * into a form nobody can see.
   *
   * @default true
   */
  enabled?: boolean;
}

/**
 * ⌘↵ on a Mac, Ctrl↵ elsewhere, for the dialog's primary action.
 *
 * **Not plain Enter.** A dialog is full of fields, and Enter belongs to the one
 * you are in - it moves between them, it opens a select, it adds a line to a
 * textarea. Requiring the modifier is what lets a form with a `<textarea>` in it
 * have a keyboard submit at all.
 *
 * **Say so in the button.** The shortcut nobody knows about is worth nothing;
 * every product that ships this renders the keys next to the label. `Button`
 * takes the hint as part of its children.
 *
 * Listens on the document rather than on the dialog, because focus may be
 * anywhere inside it - or, while a native select is open, briefly nowhere.
 *
 * @example
 * ```tsx
 * useSubmitShortcut({ onSubmit: save, enabled: open && !busy });
 *
 * <Button loading={busy}>Finish setup <CommandShortcut>⌘↵</CommandShortcut></Button>
 * ```
 */
export function useSubmitShortcut({ onSubmit, enabled = true }: UseSubmitShortcutOptions): void {
  useEffect(() => {
    if (!enabled) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return;
      // `metaKey` is Command, `ctrlKey` is Control. Accepting either means one
      // shortcut works on every platform without asking which one it is on.
      if (!event.metaKey && !event.ctrlKey) return;
      event.preventDefault();
      onSubmit();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [enabled, onSubmit]);
}
