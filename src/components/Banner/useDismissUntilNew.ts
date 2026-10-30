import { useCallback, useEffect, useState } from 'react';

/** Where the dismissed set is kept - `localStorage`, `sessionStorage`, or anything shaped like them. */
export type DismissStorage = Pick<Storage, 'getItem' | 'setItem'>;

export interface DismissUntilNewOptions {
  /**
   * Where the dismissed set is remembered. `null` keeps it for this visit only.
   * @default window.localStorage
   */
  storage?: DismissStorage | null | undefined;
}

export interface DismissUntilNewState {
  /** True while something in `ids` has not been dismissed - show the notice. */
  visible: boolean;
  /** The notice's ✕: hides it for every id it is about today. */
  dismiss: () => void;
}

const NO_IDS: readonly string[] = [];

/** The browser's local storage, or nothing where there is none (a server render, a locked-down frame). */
const browserStorage = (): DismissStorage | null => {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
};

const read = (storage: DismissStorage | null, key: string): readonly string[] => {
  if (!storage) return NO_IDS;
  try {
    const raw = storage.getItem(key);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === 'string')
      : NO_IDS;
  } catch {
    return NO_IDS;
  }
};

const write = (storage: DismissStorage | null, key: string, ids: readonly string[]): void => {
  if (!storage) return;
  try {
    storage.setItem(key, JSON.stringify(ids));
  } catch {
    /* no storage: hidden for this visit */
  }
};

const same = (a: readonly string[], b: readonly string[]): boolean =>
  a.length === b.length && a.every((id, i) => id === b[i]);

/**
 * useDismissUntilNew - remembers that a notice was dismissed until something
 * new happens: its ✕ hides it for the things it is about today, and it comes
 * back only when one more joins them.
 *
 * Give it the ids the notice is about ("these collectors aren't placed in a
 * network zone"). Dismissing remembers that set under `key`; the notice shows
 * again as soon as an id outside it appears. An id that leaves the set is
 * forgotten, so the same thing counts as new if it ever comes back. The set is
 * kept in this browser (`localStorage` unless told otherwise); with no storage
 * it is hidden for this visit.
 *
 * Ported from the console (Pranjal, 2026-10-26, Collector Fleet's "A collector
 * isn't placed in a network zone" strip: "this should not be visible all the
 * time"; option A - shown once per new one, with a Dismiss).
 *
 * @example
 * ```tsx
 * const unplaced = useDismissUntilNew(`unplaced.dismissed.${tenantId}`, stranded.map((c) => c.id));
 * {unplaced.visible && (
 *   <Banner placement="strip" tone="warning" title="A collector isn't placed in a network zone"
 *     actions={<Button variant="ghost" size="sm" onClick={review}>Review</Button>}
 *     onDismiss={unplaced.dismiss} />
 * )}
 * ```
 */
export function useDismissUntilNew(
  key: string,
  ids: readonly string[],
  options: DismissUntilNewOptions = {}
): DismissUntilNewState {
  const storage = options.storage === undefined ? browserStorage() : options.storage;
  /* the set as one value, so a new array with the same ids is not a change */
  const signature = JSON.stringify(ids);
  const [dismissed, setDismissed] = useState<readonly string[]>(() =>
    read(storage, key).filter((id) => ids.includes(id))
  );

  /* a change of the set: forget what has left it, and write that back */
  useEffect(() => {
    const now: readonly string[] = JSON.parse(signature) as string[];
    const kept = read(storage, key);
    const live = kept.filter((id) => now.includes(id));
    if (live.length !== kept.length) write(storage, key, live);
    setDismissed((prev) => (same(prev, live) ? prev : live));
  }, [key, signature, storage]);

  const dismiss = useCallback(() => {
    const all: readonly string[] = JSON.parse(signature) as string[];
    setDismissed(all);
    write(storage, key, all);
  }, [key, signature, storage]);

  return { visible: ids.some((id) => !dismissed.includes(id)), dismiss };
}
