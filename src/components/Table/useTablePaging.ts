import { useCallback, useMemo, useState } from 'react';
import type { TablePagingMode } from './Table.types';

export interface UseTablePagingOptions {
  pageSize?: number | undefined;
  mode?: TablePagingMode | undefined;
}

export interface UseTablePaging {
  mode: TablePagingMode;
  setMode: (mode: TablePagingMode) => void;
  page: number;
  pageSize: number;
  /** How many rows a "Load more" table is showing. */
  loaded: number;
  setPage: (page: number, total: number) => void;
  setPageSize: (size: number, total: number) => void;
  loadMore: () => void;
  /** Back to the first page, or the first batch. Call when the search or filters change. */
  reset: () => void;
  pagesFor: (total: number) => number;
  /** The rows to draw for the current page or batch. */
  slice: <Row>(rows: Row[]) => Row[];
}

/** Pages by default; a "Load more" mode for lists that prefer it. Users keeps pages. */
export function useTablePaging({
  pageSize: initialSize = 25,
  mode: initialMode = 'pages',
}: UseTablePagingOptions = {}): UseTablePaging {
  const [mode, setMode] = useState<TablePagingMode>(initialMode);
  const [page, setPageState] = useState(1);
  const [pageSize, setSizeState] = useState(initialSize);
  const [loaded, setLoaded] = useState(initialSize);

  const pagesFor = useCallback(
    (total: number) => Math.max(1, Math.ceil(total / pageSize)),
    [pageSize]
  );
  const setPage = useCallback(
    (p: number, total: number) => {
      setPageState(
        Math.min(Math.max(1, Math.ceil(total / pageSize) || 1), Math.max(1, Math.floor(p) || 1))
      );
    },
    [pageSize]
  );
  const setPageSize = useCallback((size: number, total: number) => {
    setSizeState(size);
    setLoaded(size);
    setPageState((p) => Math.min(p, Math.max(1, Math.ceil(total / size))));
  }, []);
  const loadMore = useCallback(() => {
    setLoaded((n) => n + pageSize);
  }, [pageSize]);
  const reset = useCallback(() => {
    setPageState(1);
    setLoaded(pageSize);
  }, [pageSize]);
  const slice = useCallback(
    <Row>(rows: Row[]): Row[] => {
      if (mode === 'loadMore') return rows.slice(0, loaded);
      const pages = Math.max(1, Math.ceil(rows.length / pageSize));
      const p = Math.min(page, pages);
      return rows.slice((p - 1) * pageSize, p * pageSize);
    },
    [mode, loaded, page, pageSize]
  );

  return useMemo(
    () => ({
      mode,
      setMode,
      page,
      pageSize,
      loaded,
      setPage,
      setPageSize,
      loadMore,
      reset,
      pagesFor,
      slice,
    }),
    [mode, page, pageSize, loaded, setPage, setPageSize, loadMore, reset, pagesFor, slice]
  );
}
