import { useCallback, useMemo, useRef, useState } from 'react';

export interface UseTableSelection {
  /** Ids of the picked rows. */
  selected: ReadonlySet<string>;
  count: number;
  isSelected: (id: string) => boolean;
  /**
   * Pick or unpick one row. With `extend` (shift-click) every row between the
   * last plain pick and this one, in `within` order, takes the new state.
   */
  toggle: (id: string, options?: { extend?: boolean; within?: string[] }) => void;
  /** Replace the selection. */
  setAll: (ids: Iterable<string>) => void;
  /** Add these; nothing else changes. */
  add: (ids: Iterable<string>) => void;
  /** Drop these; nothing else changes. */
  remove: (ids: Iterable<string>) => void;
  clear: () => void;
  /** none, some or all of the given ids are picked: the header checkbox state. */
  stateOf: (ids: string[]) => 'none' | 'some' | 'all';
}

/**
 * Row selection for a DataTable. Ids, not rows, so a pick survives sorting,
 * searching and paging, as it does on the console.
 */
export function useTableSelection(): UseTableSelection {
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const anchor = useRef<string | null>(null);

  const toggle = useCallback<UseTableSelection['toggle']>((id, options) => {
    setSelected((prev) => {
      const next = new Set(prev);
      const within = options?.within;
      if (options?.extend && anchor.current !== null && within) {
        const a = within.indexOf(anchor.current);
        const b = within.indexOf(id);
        if (a >= 0 && b >= 0) {
          const on = !prev.has(id);
          for (let i = Math.min(a, b); i <= Math.max(a, b); i++) {
            const rowId = within[i];
            if (rowId === undefined) continue;
            if (on) next.add(rowId);
            else next.delete(rowId);
          }
          return next;
        }
      }
      if (next.has(id)) next.delete(id);
      else next.add(id);
      anchor.current = id;
      return next;
    });
  }, []);

  const setAll = useCallback((ids: Iterable<string>) => {
    setSelected(new Set(ids));
  }, []);
  const add = useCallback((ids: Iterable<string>) => {
    setSelected((prev) => {
      const next = new Set(prev);
      for (const id of ids) next.add(id);
      return next;
    });
  }, []);
  const remove = useCallback((ids: Iterable<string>) => {
    setSelected((prev) => {
      const next = new Set(prev);
      for (const id of ids) next.delete(id);
      return next;
    });
  }, []);
  const clear = useCallback(() => {
    anchor.current = null;
    setSelected(new Set());
  }, []);
  const isSelected = useCallback((id: string) => selected.has(id), [selected]);
  const stateOf = useCallback(
    (ids: string[]) => {
      if (ids.length === 0) return 'none';
      const n = ids.filter((id) => selected.has(id)).length;
      return n === 0 ? 'none' : n === ids.length ? 'all' : 'some';
    },
    [selected]
  );

  return useMemo(
    () => ({
      selected,
      count: selected.size,
      isSelected,
      toggle,
      setAll,
      add,
      remove,
      clear,
      stateOf,
    }),
    [selected, isSelected, toggle, setAll, add, remove, clear, stateOf]
  );
}
