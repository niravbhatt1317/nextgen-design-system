import { useCallback, useMemo, useState } from 'react';
import type { TableColumnDef, TableSortDirection, TableSortState } from './Table.types';

export interface UseTableSort {
  sort: TableSortState | null;
  /** Clicking a heading: A to Z, again for Z to A, again for off. */
  cycle: (key: string) => void;
  set: (key: string, direction: TableSortDirection) => void;
  clear: () => void;
  /** The rows in sorted order; the input order when nothing is sorted. */
  apply: <Row>(rows: Row[], columns: TableColumnDef<Row>[]) => Row[];
}

function valueOf<Row>(
  row: Row,
  column: TableColumnDef<Row> | undefined,
  key: string
): string | number {
  if (column?.sortValue) return column.sortValue(row);
  const v = (row as Record<string, unknown>)[key];
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return v;
  if (Array.isArray(v)) return v.map(String).join(',');
  if (v === null || v === undefined) return '';
  return typeof v === 'boolean' ? String(v) : JSON.stringify(v);
}

/** One sort at a time, as on the console. The heading and the toolbar Sort menu share it. */
export function useTableSort(initial: TableSortState | null = null): UseTableSort {
  const [sort, setSort] = useState<TableSortState | null>(initial);

  const cycle = useCallback((key: string) => {
    setSort((s) => {
      if (s?.key !== key) return { key, direction: 'asc' };
      if (s.direction === 'asc') return { key, direction: 'desc' };
      return null;
    });
  }, []);
  const set = useCallback((key: string, direction: TableSortDirection) => {
    setSort({ key, direction });
  }, []);
  const clear = useCallback(() => {
    setSort(null);
  }, []);

  const apply = useCallback(
    <Row>(rows: Row[], columns: TableColumnDef<Row>[]): Row[] => {
      if (!sort) return rows;
      const column = columns.find((c) => c.key === sort.key);
      const m = sort.direction === 'asc' ? 1 : -1;
      return rows
        .map((row, i) => ({ row, i, v: valueOf(row, column, sort.key) }))
        .sort((a, b) => {
          const c =
            typeof a.v === 'number' && typeof b.v === 'number'
              ? a.v - b.v
              : String(a.v).localeCompare(String(b.v), undefined, {
                  numeric: true,
                  sensitivity: 'base',
                });
          return c * m || a.i - b.i;
        })
        .map((x) => x.row);
    },
    [sort]
  );

  return useMemo(() => ({ sort, cycle, set, clear, apply }), [sort, cycle, set, clear, apply]);
}
