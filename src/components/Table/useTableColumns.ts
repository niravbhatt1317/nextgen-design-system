import { useCallback, useMemo, useState } from 'react';

/**
 * A column, as far as the layout is concerned.
 *
 * Deliberately not the column's *contents* - no renderer, no accessor, no
 * width. This describes which columns exist and what they are called, so the
 * menus have something to list. How a cell draws itself stays where it already
 * is: in your markup, or in the cell recipes.
 */
export interface TableColumnDef<K extends string = string> {
  /** Stable identity. Used everywhere else to refer to this column. */
  key: K;

  /** What the column is called, in menus and in the header. */
  label: string;

  /**
   * A column that cannot be hidden, moved or unfrozen.
   *
   * For the ones that are not really data - a selection checkbox, a row
   * number, a trailing actions column. Hiding those breaks the table rather
   * than customising it, so the menus leave them out.
   *
   * @default false
   */
  locked?: boolean;
}

/**
 * The whole layout, in a form you can store and hand back.
 *
 * This is the entire saved view: put it in a database, keep it in
 * `localStorage`, ship it between users. `restore` takes it back.
 */
export interface TableColumnsState<K extends string = string> {
  /** Every column, visible or not, in display order. */
  order: K[];

  /** Which columns are currently hidden. */
  hidden: K[];

  /** How many leading columns are pinned. */
  frozenCount: number;
}

export interface UseTableColumnsOptions {
  /**
   * How many leading columns may be pinned.
   *
   * Two is the ceiling for a reason rather than a limitation: every pinned
   * column is width the scrollable area does not get, and past two the frozen
   * block starts to be the table. It is also what makes the Freeze item
   * disappear beyond the second column instead of failing when used.
   *
   * @default 2
   */
  maxFrozen?: number;
}

/** A column plus where it currently stands. */
export interface TableColumnView<K extends string = string> extends TableColumnDef<K> {
  /** Whether it is currently in the table. */
  visible: boolean;

  /** Whether it is pinned to the leading edge. */
  frozen: boolean;

  /** Its position among the visible columns, or -1 when hidden. */
  index: number;
}

export interface UseTableColumns<K extends string = string> {
  /** Every column in display order, hidden ones included. */
  columns: TableColumnView<K>[];

  /** The columns actually in the table, in order. Render from this. */
  visible: TableColumnView<K>[];

  /** The columns currently out of the table, in order. */
  hidden: TableColumnView<K>[];

  /** How many leading columns are pinned. */
  frozenCount: number;

  /**
   * Puts a hidden column back, at a position.
   *
   * The position is what makes this different from a checkbox. Adding a column
   * between two others is the whole point of the insertion control, and a
   * plain toggle cannot express it - it would always reappear wherever it
   * happened to sit before.
   *
   * `atIndex` counts visible columns. Omit it and the column returns to the
   * end.
   */
  show: (key: K, atIndex?: number) => void;

  /** Takes a column out of the table. Ignored on a locked column. */
  hide: (key: K) => void;

  /** Moves a visible column to a position among the visible columns. */
  move: (key: K, toIndex: number) => void;

  /** Moves a column to the leading edge. */
  moveToStart: (key: K) => void;

  /** Moves a column to the trailing edge. */
  moveToEnd: (key: K) => void;

  /**
   * Pins every column up to and including this one.
   *
   * Freezing is a prefix, not a per-column flag: you cannot pin the third
   * column while the first two scroll, because there would be nowhere for it
   * to sit. So freezing column 2 pins columns 1 and 2, and unfreezing it
   * leaves column 1 pinned.
   */
  freeze: (key: K) => void;

  /** Unpins this column, leaving the ones before it pinned. */
  unfreeze: (key: K) => void;

  /** Whether the Freeze item should appear on this column at all. */
  canFreeze: (key: K) => boolean;

  /** Whether this column is currently pinned. */
  isFrozen: (key: K) => boolean;

  /** Puts every column back where it started. */
  reset: () => void;

  /** Whether anything has been changed from the starting layout. */
  isChanged: boolean;

  /** The whole layout, ready to store. */
  state: TableColumnsState<K>;

  /** Applies a stored layout. Unknown keys are ignored, missing ones appended. */
  restore: (state: TableColumnsState<K>) => void;
}

const DEFAULT_MAX_FROZEN = 2;

const move = <T>(list: T[], from: number, to: number): T[] => {
  const next = [...list];
  const [item] = next.splice(from, 1);
  if (item === undefined) return list;
  next.splice(to, 0, item);
  return next;
};

/**
 * Holds which columns are shown, in what order, and how many are pinned.
 *
 * The state every other column control reads from. The header menu, the
 * insertion control, the columns picker and the drag-to-reorder handle are all
 * views onto this one object - which is the point, because the alternative is
 * two of them disagreeing about where a column went.
 *
 * Like the rest of Table, it holds state and never touches your rows. Hiding a
 * column does not filter anything; it tells you not to render that column.
 *
 * @example
 * ```tsx
 * const cols = useTableColumns([
 *   { key: 'id', label: 'ID', locked: true },
 *   { key: 'subject', label: 'Subject' },
 *   { key: 'priority', label: 'Priority' },
 * ]);
 *
 * <TableRow>
 *   {cols.visible.map((column) => (
 *     <TableHead key={column.key} frozen={column.frozen}>
 *       {column.label}
 *     </TableHead>
 *   ))}
 * </TableRow>
 * ```
 */
export function useTableColumns<K extends string>(
  definitions: TableColumnDef<K>[],
  options: UseTableColumnsOptions = {}
): UseTableColumns<K> {
  const { maxFrozen = DEFAULT_MAX_FROZEN } = options;

  // Captured once. Re-reading the argument every render would undo a change
  // the moment the caller re-rendered for any other reason - the same trap
  // `useColumnWidths` avoids.
  const [defs] = useState(definitions);
  const [initial] = useState<TableColumnsState<K>>(() => ({
    order: definitions.map((column) => column.key),
    hidden: [],
    frozenCount: 0,
  }));
  const [state, setState] = useState<TableColumnsState<K>>(initial);

  const byKey = useMemo(() => new Map(defs.map((column) => [column.key, column])), [defs]);

  const columns = useMemo<TableColumnView<K>[]>(() => {
    const hiddenSet = new Set(state.hidden);
    let index = 0;
    return state.order.flatMap((key) => {
      const def = byKey.get(key);
      if (!def) return [];
      const isHidden = hiddenSet.has(key);
      const view: TableColumnView<K> = {
        ...def,
        visible: !isHidden,
        frozen: !isHidden && index < state.frozenCount,
        index: isHidden ? -1 : index,
      };
      if (!isHidden) index += 1;
      return [view];
    });
  }, [state, byKey]);

  const visible = useMemo(() => columns.filter((column) => column.visible), [columns]);
  const hidden = useMemo(() => columns.filter((column) => !column.visible), [columns]);

  /** Turns a position among visible columns into a position in the full order. */
  const orderIndexAt = useCallback((current: TableColumnsState<K>, visibleIndex: number) => {
    const hiddenSet = new Set(current.hidden);
    let seen = 0;
    for (let i = 0; i < current.order.length; i += 1) {
      const key = current.order[i];
      if (key === undefined || hiddenSet.has(key)) continue;
      if (seen === visibleIndex) return i;
      seen += 1;
    }
    return current.order.length;
  }, []);

  const show = useCallback(
    (key: K, atIndex?: number) => {
      setState((prev) => {
        if (!prev.hidden.includes(key)) return prev;
        const nextHidden = prev.hidden.filter((k) => k !== key);
        const withoutKey = prev.order.filter((k) => k !== key);
        const target =
          atIndex === undefined
            ? withoutKey.length
            : orderIndexAt({ ...prev, hidden: nextHidden, order: withoutKey }, atIndex);
        const order = [...withoutKey];
        order.splice(target, 0, key);
        return { ...prev, order, hidden: nextHidden };
      });
    },
    [orderIndexAt]
  );

  const hide = useCallback(
    (key: K) => {
      setState((prev) => {
        if (byKey.get(key)?.locked === true || prev.hidden.includes(key)) return prev;
        // A hidden column cannot stay pinned - it is not there to pin.
        const wasFrozen = prev.order.indexOf(key) < prev.frozenCount;
        return {
          ...prev,
          hidden: [...prev.hidden, key],
          frozenCount: wasFrozen ? prev.frozenCount - 1 : prev.frozenCount,
        };
      });
    },
    [byKey]
  );

  const moveTo = useCallback(
    (key: K, toIndex: number) => {
      setState((prev) => {
        if (byKey.get(key)?.locked === true) return prev;
        const from = prev.order.indexOf(key);
        if (from === -1) return prev;
        const target = orderIndexAt(prev, Math.max(0, toIndex));
        if (from === target) return prev;
        return { ...prev, order: move(prev.order, from, target) };
      });
    },
    [byKey, orderIndexAt]
  );

  const moveToStart = useCallback(
    (key: K) => {
      moveTo(key, 0);
    },
    [moveTo]
  );

  const moveToEnd = useCallback(
    (key: K) => {
      setState((prev) => {
        if (byKey.get(key)?.locked === true) return prev;
        const from = prev.order.indexOf(key);
        if (from === -1 || from === prev.order.length - 1) return prev;
        return { ...prev, order: move(prev.order, from, prev.order.length - 1) };
      });
    },
    [byKey]
  );

  const visibleIndexOf = useCallback(
    (key: K) => visible.findIndex((column) => column.key === key),
    [visible]
  );

  const canFreeze = useCallback(
    (key: K) => {
      const index = visibleIndexOf(key);
      return index >= 0 && index < maxFrozen;
    },
    [visibleIndexOf, maxFrozen]
  );

  const isFrozen = useCallback(
    (key: K) => {
      const index = visibleIndexOf(key);
      return index >= 0 && index < state.frozenCount;
    },
    [visibleIndexOf, state.frozenCount]
  );

  const freeze = useCallback(
    (key: K) => {
      const index = visibleIndexOf(key);
      if (index < 0 || index >= maxFrozen) return;
      setState((prev) => ({ ...prev, frozenCount: index + 1 }));
    },
    [visibleIndexOf, maxFrozen]
  );

  const unfreeze = useCallback(
    (key: K) => {
      const index = visibleIndexOf(key);
      if (index < 0) return;
      setState((prev) => (prev.frozenCount <= index ? prev : { ...prev, frozenCount: index }));
    },
    [visibleIndexOf]
  );

  const reset = useCallback(() => {
    setState(initial);
  }, [initial]);

  const restore = useCallback(
    (next: TableColumnsState<K>) => {
      setState(() => {
        const known = next.order.filter((key) => byKey.has(key));
        // A column added to the table since the layout was saved has to appear
        // somewhere. Dropping it would hide a column nobody chose to hide.
        const missing = defs.map((column) => column.key).filter((key) => !known.includes(key));
        const order = [...known, ...missing];
        return {
          order,
          hidden: next.hidden.filter((key) => byKey.has(key)),
          frozenCount: Math.min(Math.max(0, next.frozenCount), maxFrozen),
        };
      });
    },
    [byKey, defs, maxFrozen]
  );

  const isChanged = useMemo(
    () =>
      state.frozenCount !== initial.frozenCount ||
      state.hidden.length !== initial.hidden.length ||
      state.order.some((key, index) => key !== initial.order[index]),
    [state, initial]
  );

  return {
    columns,
    visible,
    hidden,
    frozenCount: state.frozenCount,
    show,
    hide,
    move: moveTo,
    moveToStart,
    moveToEnd,
    freeze,
    unfreeze,
    canFreeze,
    isFrozen,
    reset,
    isChanged,
    state,
    restore,
  };
}
