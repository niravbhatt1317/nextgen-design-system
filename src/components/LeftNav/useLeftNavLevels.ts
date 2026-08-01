import { useCallback, useMemo, useState } from 'react';

export interface UseLeftNavLevelsOptions {
  /** Which section to open on, if any. Captured once. */
  initial?: string | null;

  /** Called whenever the level changes, with the section or `null` for the root. */
  onChange?: (section: string | null) => void;
}

export interface UseLeftNavLevels {
  /** The section being shown, or `null` at the root. */
  section: string | null;

  /** Which level is showing. 1 or 2 - never 3. */
  level: 1 | 2;

  /** Opens a section. From level 2 this switches sections rather than nesting. */
  open: (section: string) => void;

  /** Back to the root list. */
  back: () => void;

  /** Whether a given section is the one being shown. */
  isOpen: (section: string) => boolean;
}

/**
 * Which level of a settings navigation is showing.
 *
 * **Two levels, and the type says so.** `level` is `1 | 2`, and `open` from
 * level 2 replaces the section rather than stacking another one - so a third
 * level cannot be reached by calling the API wrong. Depth in a settings menu is
 * where people get lost: three levels down, the back button has to be pressed
 * an unknown number of times to get anywhere, and nobody knows where they are.
 *
 * Anything that would have been a third level is flattened into the second with
 * groups - a static heading for a handful of pages, a collapsible group for
 * more. Grouping shows the structure without hiding it behind another push.
 *
 * As with the Table hooks, it holds state and touches nothing else. Routing is
 * the product's business: `onChange` reports the move, and what that means for
 * the URL is not this hook's decision.
 *
 * @example
 * ```tsx
 * const levels = useLeftNavLevels();
 * levels.open('observability');   // level 2
 * levels.back();                  // level 1
 * ```
 */
export function useLeftNavLevels({
  initial = null,
  onChange,
}: UseLeftNavLevelsOptions = {}): UseLeftNavLevels {
  const [start] = useState<string | null>(initial);
  const [section, setSection] = useState<string | null>(start);

  const open = useCallback(
    (next: string) => {
      setSection(next);
      onChange?.(next);
    },
    [onChange]
  );

  const back = useCallback(() => {
    setSection(null);
    onChange?.(null);
  }, [onChange]);

  const isOpen = useCallback((candidate: string) => candidate === section, [section]);

  return useMemo(
    () => ({
      section,
      level: section === null ? 1 : 2,
      open,
      back,
      isOpen,
    }),
    [section, open, back, isOpen]
  );
}
