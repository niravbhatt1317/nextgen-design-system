import { useCallback, useEffect, useMemo, useState } from 'react';
import type { TableColumnDef, TableColumnsLayout } from './Table.types';

export interface UseTableColumnsOptions<Row> {
  /** The content columns, in their default order. */
  columns: TableColumnDef<Row>[];
  /**
   * Remember order, hidden columns and widths in this browser under this key.
   * Leave unset to keep the layout for the life of the page only.
   */
  storageKey?: string | undefined;
}

export interface UseTableColumns<Row> {
  /** The columns a person can see, in display order. */
  visible: TableColumnDef<Row>[];
  /** The columns a person has hidden, in their remembered order. */
  hidden: TableColumnDef<Row>[];
  /** Every column key in display order, hidden ones included. */
  order: string[];
  widthOf: (key: string) => number;
  setWidth: (key: string, width: number) => void;
  hide: (key: string) => void;
  show: (key: string) => void;
  hideAll: () => void;
  showAll: () => void;
  /** Put a hidden column back right after `afterKey`; `null` puts it first. */
  insertAfter: (key: string, afterKey: string | null) => void;
  /** Move a column so it sits before `beforeKey`; `null` sends it to the end. */
  moveBefore: (key: string, beforeKey: string | null) => void;
  /** Move a visible column one place left (-1) or right (+1). */
  moveBy: (key: string, direction: -1 | 1) => void;
  moveToStart: (key: string) => void;
  moveToEnd: (key: string) => void;
  reset: () => void;
  /** Anything differs from the defaults. */
  isChanged: boolean;
}

const DEFAULT_WIDTH = 200;

function load(storageKey: string | undefined): TableColumnsLayout | null {
  if (!storageKey) return null;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<TableColumnsLayout>;
    return {
      order: Array.isArray(parsed.order) ? parsed.order : [],
      hidden: Array.isArray(parsed.hidden) ? parsed.hidden : [],
      widths: parsed.widths && typeof parsed.widths === 'object' ? parsed.widths : {},
    };
  } catch {
    return null;
  }
}

function save(storageKey: string | undefined, layout: TableColumnsLayout): void {
  if (!storageKey) return;
  try {
    localStorage.setItem(storageKey, JSON.stringify(layout));
  } catch {
    /* storage may be unavailable; the layout then lives for the page only */
  }
}

/** Keeps a remembered order honest against the columns the table has today. */
function reconcile(order: string[], keys: string[]): string[] {
  const known = order.filter((k) => keys.includes(k));
  const missing = keys.filter((k) => !known.includes(k));
  return [...known, ...missing];
}

/**
 * Column layout for a DataTable: order, hidden columns and widths, remembered
 * in the browser when a `storageKey` is given. The three fixed columns (row
 * number, Name, Action) are not part of this; only the content columns move.
 */
export function useTableColumns<Row>({
  columns,
  storageKey,
}: UseTableColumnsOptions<Row>): UseTableColumns<Row> {
  const keys = useMemo(() => columns.map((c) => c.key), [columns]);
  const byKey = useMemo(() => new Map(columns.map((c) => [c.key, c])), [columns]);
  const [layout, setLayout] = useState<TableColumnsLayout>(() => {
    const stored = load(storageKey);
    return {
      order: reconcile(stored?.order ?? [], keys),
      hidden: (stored?.hidden ?? []).filter((k) => keys.includes(k)),
      widths: stored?.widths ?? {},
    };
  });

  useEffect(() => {
    save(storageKey, layout);
  }, [layout, storageKey]);

  const update = useCallback((fn: (l: TableColumnsLayout) => TableColumnsLayout) => {
    setLayout((l) => fn(l));
  }, []);

  const widthOf = useCallback(
    (key: string) => layout.widths[key] ?? byKey.get(key)?.width ?? DEFAULT_WIDTH,
    [layout.widths, byKey]
  );

  const setWidth = useCallback(
    (key: string, width: number) => {
      const min = byKey.get(key)?.minWidth ?? 120;
      const clamped = Math.max(min, Math.min(720, Math.round(width)));
      update((l) => ({ ...l, widths: { ...l.widths, [key]: clamped } }));
    },
    [byKey, update]
  );

  const hide = useCallback(
    (key: string) => {
      update((l) => (l.hidden.includes(key) ? l : { ...l, hidden: [...l.hidden, key] }));
    },
    [update]
  );
  const show = useCallback(
    (key: string) => {
      update((l) => ({ ...l, hidden: l.hidden.filter((k) => k !== key) }));
    },
    [update]
  );
  const hideAll = useCallback(() => {
    update((l) => ({ ...l, hidden: [...l.order] }));
  }, [update]);
  const showAll = useCallback(() => {
    update((l) => ({ ...l, hidden: [] }));
  }, [update]);

  const moveBefore = useCallback(
    (key: string, beforeKey: string | null) => {
      update((l) => {
        if (key === beforeKey) return l;
        const order = l.order.filter((k) => k !== key);
        const at = beforeKey ? order.indexOf(beforeKey) : order.length;
        order.splice(at < 0 ? order.length : at, 0, key);
        return { ...l, order };
      });
    },
    [update]
  );

  const insertAfter = useCallback(
    (key: string, afterKey: string | null) => {
      update((l) => {
        const order = l.order.filter((k) => k !== key);
        const at = afterKey ? order.indexOf(afterKey) + 1 : 0;
        order.splice(at, 0, key);
        return { ...l, order, hidden: l.hidden.filter((k) => k !== key) };
      });
    },
    [update]
  );

  const moveBy = useCallback(
    (key: string, direction: -1 | 1) => {
      update((l) => {
        const visibleKeys = l.order.filter((k) => !l.hidden.includes(k));
        const i = visibleKeys.indexOf(key);
        const j = i + direction;
        const neighbour = visibleKeys[j];
        if (i < 0 || neighbour === undefined) return l;
        const order = l.order.filter((k) => k !== key);
        const at = order.indexOf(neighbour) + (direction > 0 ? 1 : 0);
        order.splice(at, 0, key);
        return { ...l, order };
      });
    },
    [update]
  );

  const moveToStart = useCallback(
    (key: string) => {
      update((l) => ({ ...l, order: [key, ...l.order.filter((k) => k !== key)] }));
    },
    [update]
  );
  const moveToEnd = useCallback(
    (key: string) => {
      update((l) => ({ ...l, order: [...l.order.filter((k) => k !== key), key] }));
    },
    [update]
  );
  const reset = useCallback(() => {
    setLayout({ order: [...keys], hidden: [], widths: {} });
  }, [keys]);

  const visible = useMemo(
    () =>
      layout.order
        .filter((k) => !layout.hidden.includes(k))
        .map((k) => byKey.get(k))
        .filter((c): c is TableColumnDef<Row> => c !== undefined),
    [layout.order, layout.hidden, byKey]
  );
  const hidden = useMemo(
    () =>
      layout.order
        .filter((k) => layout.hidden.includes(k))
        .map((k) => byKey.get(k))
        .filter((c): c is TableColumnDef<Row> => c !== undefined),
    [layout.order, layout.hidden, byKey]
  );
  const isChanged =
    layout.hidden.length > 0 ||
    Object.keys(layout.widths).length > 0 ||
    layout.order.some((k, i) => k !== keys[i]);

  return {
    visible,
    hidden,
    order: layout.order,
    widthOf,
    setWidth,
    hide,
    show,
    hideAll,
    showAll,
    insertAfter,
    moveBefore,
    moveBy,
    moveToStart,
    moveToEnd,
    reset,
    isChanged,
  };
}
