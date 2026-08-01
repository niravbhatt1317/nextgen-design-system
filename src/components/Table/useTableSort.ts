import { useCallback, useMemo, useState } from 'react';

/** Which way a column is sorted. */
export type SortDirection = 'ascend' | 'descend';

/** One column's contribution to the order. */
export interface SortRule<K extends string = string> {
  column: K;
  direction: SortDirection;
}

export interface UseTableSortOptions<K extends string = string> {
  /** Where the table starts out. Captured once. */
  initial?: SortRule<K>[];

  /**
   * Whether more than one column can sort at a time.
   *
   * Multi-column sort is what the reference designs show, and it is the reason
   * this is a stack rather than a single value. A table that genuinely only
   * ever sorts by one thing should say so, because then adding a second column
   * silently dropping the first is the *correct* behaviour rather than a bug.
   *
   * @default true
   */
  multiple?: boolean;
}

export interface UseTableSort<K extends string = string> {
  /**
   * The sort, most significant first.
   *
   * Order is the whole point of a stack: sorting by status then by date is a
   * different table from date then status, and nothing else in the API can
   * express which one you meant.
   */
  rules: SortRule<K>[];

  /**
   * Cycles one column: unsorted, ascending, descending, unsorted.
   *
   * The third press removing the sort rather than going back to ascending is
   * deliberate - without it there is no way to stop sorting by a column from
   * the column itself, and people end up hunting for a menu.
   */
  toggle: (column: K) => void;

  /** Sorts by a column in a given direction, adding it if it is not there. */
  sortBy: (column: K, direction: SortDirection) => void;

  /** Stops sorting by one column, leaving the rest in order. */
  remove: (column: K) => void;

  /** Moves a rule within the stack, changing which sort wins. */
  move: (from: number, to: number) => void;

  /** Drops every rule. */
  clear: () => void;

  /** Which way a column is sorted, or `null` if it is not. */
  directionOf: (column: K) => SortDirection | null;

  /**
   * A column's 1-based place in the stack, or `null` if it is not sorted.
   *
   * Shown as a small number beside the arrow. With two or more sorts an arrow
   * alone cannot say which one wins, and people reasonably assume the leftmost.
   */
  orderOf: (column: K) => number | null;

  /** Whether anything is sorted at all. */
  isSorted: boolean;
}

const flip = (direction: SortDirection): SortDirection =>
  direction === 'ascend' ? 'descend' : 'ascend';

/**
 * Holds which columns sort the table, and in what order.
 *
 * Like the rest of Table it **holds state and never touches your rows**. It
 * reports that the user wants status ascending then date descending; whether
 * that happens in memory or in a database query is the product's business, and
 * a table backed by a paged API could not use it any other way.
 *
 * @example
 * ```tsx
 * const sort = useTableSort<ColumnKey>();
 *
 * <TableHead
 *   sortable
 *   sortOrder={sort.directionOf('status')}
 *   onSort={() => { sort.toggle('status'); }}
 * >
 *   Status
 * </TableHead>
 * ```
 */
export function useTableSort<K extends string>({
  initial = [],
  multiple = true,
}: UseTableSortOptions<K> = {}): UseTableSort<K> {
  // Captured once, like the other Table hooks: re-reading the argument every
  // render would undo a sort the moment the caller re-rendered for any other
  // reason.
  const [start] = useState<SortRule<K>[]>(initial);
  const [rules, setRules] = useState<SortRule<K>[]>(start);

  const indexOf = useCallback(
    (column: K) => rules.findIndex((rule) => rule.column === column),
    [rules]
  );

  const sortBy = useCallback(
    (column: K, direction: SortDirection) => {
      setRules((prev) => {
        const rest = multiple ? prev.filter((rule) => rule.column !== column) : [];
        // Appended, not prepended: a column you just added is the tie-breaker
        // for the ones already there, which is what "sort by this as well"
        // means. Prepending would silently demote the sort you set up first.
        return [...rest, { column, direction }];
      });
    },
    [multiple]
  );

  const remove = useCallback((column: K) => {
    setRules((prev) => prev.filter((rule) => rule.column !== column));
  }, []);

  const toggle = useCallback(
    (column: K) => {
      setRules((prev) => {
        const existing = prev.find((rule) => rule.column === column);
        if (!existing) {
          const rest = multiple ? prev : [];
          return [...rest, { column, direction: 'ascend' }];
        }
        // Third press removes it. Otherwise there is no way to stop sorting by
        // a column without going to find a menu.
        if (existing.direction === 'descend') {
          return prev.filter((rule) => rule.column !== column);
        }
        return prev.map((rule) =>
          rule.column === column ? { ...rule, direction: flip(rule.direction) } : rule
        );
      });
    },
    [multiple]
  );

  const move = useCallback((from: number, to: number) => {
    setRules((prev) => {
      if (from === to || from < 0 || to < 0 || from >= prev.length || to >= prev.length) {
        return prev;
      }
      const next = [...prev];
      const [rule] = next.splice(from, 1);
      if (!rule) return prev;
      next.splice(to, 0, rule);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setRules([]);
  }, []);

  const directionOf = useCallback(
    (column: K) => rules.find((rule) => rule.column === column)?.direction ?? null,
    [rules]
  );

  const orderOf = useCallback(
    (column: K) => {
      const index = indexOf(column);
      return index < 0 ? null : index + 1;
    },
    [indexOf]
  );

  const isSorted = useMemo(() => rules.length > 0, [rules]);

  return {
    rules,
    toggle,
    sortBy,
    remove,
    move,
    clear,
    directionOf,
    orderOf,
    isSorted,
  };
}
