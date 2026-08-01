import { useCallback, useMemo, useRef, useState } from 'react';

/** What the header checkbox should show. */
export type SelectionState = boolean | 'indeterminate';

export interface UseTableSelectionOptions<Id extends string | number = string> {
  /**
   * The rows currently on screen, in display order.
   *
   * Order matters: it is what a shift-click range is measured along, so it has
   * to be the order people see rather than the order the data arrived in.
   */
  rowIds: Id[];

  /** Rows selected to begin with. Captured once. */
  initial?: Id[];
}

export interface UseTableSelection<Id extends string | number = string> {
  /**
   * Every selected row, including any not currently on screen.
   *
   * A selection survives filtering. Someone who ticks four rows, searches for a
   * fifth and ticks that too expects five - dropping the first four because a
   * search hid them would be the table quietly undoing their work.
   */
  selected: Id[];

  /** How many rows are selected. */
  count: number;

  /** Whether one row is selected. */
  isSelected: (id: Id) => boolean;

  /**
   * Toggles one row.
   *
   * Pass `extend` for a shift-click: everything between the last row you
   * touched and this one takes this row's new state. Without it a range of
   * thirty rows is thirty clicks, which is where people give up and select all.
   */
  toggle: (id: Id, options?: { extend?: boolean }) => void;

  /** Selects every row currently on screen. */
  selectAll: () => void;

  /** Clears everything, including rows not on screen. */
  clear: () => void;

  /**
   * Selects every visible row, or clears them if they are already all selected.
   *
   * What the header checkbox does.
   */
  toggleAll: () => void;

  /**
   * What the header checkbox should show: all, none, or some.
   *
   * Only counts the rows on screen. A tick in the header while a filter hides
   * other selected rows would claim something that is not true of this view.
   */
  headerState: SelectionState;
}

/**
 * Holds which rows are selected.
 *
 * Like the rest of Table it holds state and never touches your rows: it reports
 * which ids are selected, and what happens to them - a bulk delete, an export,
 * an assignment - is the product's business.
 *
 * @example
 * ```tsx
 * const selection = useTableSelection({ rowIds: rows.map((row) => row.id) });
 *
 * <Checkbox
 *   checked={selection.headerState}
 *   onCheckedChange={selection.toggleAll}
 *   aria-label="Select all rows"
 * />
 * ```
 */
export function useTableSelection<Id extends string | number>({
  rowIds,
  initial = [],
}: UseTableSelectionOptions<Id>): UseTableSelection<Id> {
  const [start] = useState<Id[]>(initial);
  const [selected, setSelected] = useState<Set<Id>>(() => new Set(start));

  // Where a shift-click measures from: the last row touched without shift.
  const anchor = useRef<Id | null>(null);

  const isSelected = useCallback((id: Id) => selected.has(id), [selected]);

  const toggle = useCallback(
    (id: Id, options?: { extend?: boolean }) => {
      setSelected((prev) => {
        const next = new Set(prev);
        const turningOn = !prev.has(id);

        const from = anchor.current;
        if (options?.extend === true && from !== null) {
          const a = rowIds.indexOf(from);
          const b = rowIds.indexOf(id);
          if (a >= 0 && b >= 0) {
            const [lo, hi] = a < b ? [a, b] : [b, a];
            // The whole range takes *this* row's new state rather than each row
            // flipping its own - otherwise a shift-click over a mixed range
            // scrambles it instead of setting it.
            for (let i = lo; i <= hi; i += 1) {
              const rowId = rowIds[i];
              if (rowId === undefined) continue;
              if (turningOn) next.add(rowId);
              else next.delete(rowId);
            }
            return next;
          }
        }

        if (turningOn) next.add(id);
        else next.delete(id);
        anchor.current = id;
        return next;
      });
    },
    [rowIds]
  );

  const selectAll = useCallback(() => {
    setSelected((prev) => {
      const next = new Set(prev);
      rowIds.forEach((id) => next.add(id));
      return next;
    });
  }, [rowIds]);

  const clear = useCallback(() => {
    anchor.current = null;
    setSelected(new Set());
  }, []);

  const visibleSelected = useMemo(
    () => rowIds.filter((id) => selected.has(id)).length,
    [rowIds, selected]
  );

  const headerState = useMemo<SelectionState>(() => {
    if (rowIds.length === 0 || visibleSelected === 0) return false;
    return visibleSelected === rowIds.length ? true : 'indeterminate';
  }, [rowIds.length, visibleSelected]);

  const toggleAll = useCallback(() => {
    if (headerState === true) {
      // Only the rows on screen. Clearing a selection the filter is hiding
      // would be a surprise from a control that says "select all".
      setSelected((prev) => {
        const next = new Set(prev);
        rowIds.forEach((id) => next.delete(id));
        return next;
      });
      return;
    }
    selectAll();
  }, [headerState, rowIds, selectAll]);

  return {
    selected: useMemo(() => [...selected], [selected]),
    count: selected.size,
    isSelected,
    toggle,
    selectAll,
    clear,
    toggleAll,
    headerState,
  };
}
