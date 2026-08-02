import { useCallback, useMemo, useState } from 'react';

export interface UseTypedConfirmationOptions {
  /**
   * What has to be typed, exactly.
   *
   * Use the thing's own name - `Acme Production` - rather than the word
   * `DELETE`. A name has to be read off the screen and copied deliberately;
   * `DELETE` is the same five letters on every dialog anybody has ever seen,
   * and is typed from memory without looking at what it is about to destroy.
   */
  phrase: string;

  /**
   * Whether case has to match too.
   *
   * Off by default. The point of this control is to make somebody stop and
   * read, not to test their shift key - and a person who has typed the right
   * name in the wrong case has demonstrably read it.
   */
  caseSensitive?: boolean;
}

export interface UseTypedConfirmation {
  /** What has been typed. Bind it to the input. */
  value: string;

  /** Bind to the input's `onChange`. */
  onChange: (event: { target: { value: string } }) => void;

  /** Whether it matches. Gate the destructive button on this. */
  confirmed: boolean;

  /** Empties the field, for reopening the dialog on the same page. */
  reset: () => void;
}

/**
 * Makes somebody type the name of the thing before they can destroy it.
 *
 * **A speed bump, not a security control.** Anybody who wants to get past it
 * will, in two seconds. That is fine and is the point: it is there to convert
 * an automatic click into a deliberate one, by making the hand stop and the
 * eyes go back and read what is about to happen.
 *
 * **Trims, and ignores case by default.** A name copied off the screen arrives
 * with a trailing space often enough that refusing it teaches people the
 * control is broken rather than that they are wrong.
 *
 * Pair it with a `Callout` listing what is about to go, and leave the ⏎ chip
 * and `useSubmitShortcut` off the button - the whole point is that this cannot
 * be done by muscle memory, and a keyboard path is muscle memory.
 *
 * @example
 * ```tsx
 * const confirm = useTypedConfirmation({ phrase: workspace.name });
 *
 * <Input label={`Type ${workspace.name} to confirm`} value={confirm.value} onChange={confirm.onChange} />
 * <Button variant="destructive" disabled={!confirm.confirmed} onClick={destroy}>
 *   Delete workspace
 * </Button>
 * ```
 */
export function useTypedConfirmation({
  phrase,
  caseSensitive = false,
}: UseTypedConfirmationOptions): UseTypedConfirmation {
  const [value, setValue] = useState('');

  const onChange = useCallback((event: { target: { value: string } }) => {
    setValue(event.target.value);
  }, []);

  const reset = useCallback(() => {
    setValue('');
  }, []);

  const confirmed = useMemo(() => {
    const typed = value.trim();
    const wanted = phrase.trim();
    // An empty phrase would confirm on an empty field - a gate that is open
    // before anybody touches it, which is worse than no gate because it looks
    // like one.
    if (wanted === '') return false;
    return caseSensitive ? typed === wanted : typed.toLowerCase() === wanted.toLowerCase();
  }, [value, phrase, caseSensitive]);

  return useMemo(
    () => ({ value, onChange, confirmed, reset }),
    [value, onChange, confirmed, reset]
  );
}
