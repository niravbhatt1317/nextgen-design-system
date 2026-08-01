import { useCallback, useEffect, useMemo, useState } from 'react';

export interface UseTablePaginationOptions {
  /**
   * How many rows there are in total.
   *
   * For a client-side table that is `rows.length`. For a server-side one it is
   * whatever the API reports, which is the whole reason this is a number you
   * pass rather than something derived from an array.
   */
  total: number;

  /** Rows per page. @default 25 */
  pageSize?: number;

  /** Which page to start on, 1-based. @default 1 */
  initialPage?: number;
}

export interface UseTablePagination {
  /** The current page, 1-based. */
  page: number;

  /** Rows per page. */
  pageSize: number;

  /** How many pages there are. At least 1, even with no rows. */
  pageCount: number;

  /** The 0-based index of the first row on this page. */
  from: number;

  /** The 0-based index just past the last row on this page. */
  to: number;

  /** Whether there is a page before or after this one. */
  hasPrevious: boolean;
  hasNext: boolean;

  /** Moves to a page, clamped to what exists. */
  goTo: (page: number) => void;
  next: () => void;
  previous: () => void;

  /**
   * Changes the page size.
   *
   * The first row currently on screen stays on screen: someone who is looking
   * at row 300 and switches to 100-per-page wants to keep looking at row 300,
   * not to be thrown back to the top.
   */
  setPageSize: (size: number) => void;

  /** Takes this page's slice out of an array. Client-side tables only. */
  slice: <T>(rows: T[]) => T[];
}

const DEFAULT_PAGE_SIZE = 25;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * Which page of a table is showing.
 *
 * Holds the page and the size, and reports the range - it does not fetch
 * anything. `slice` is there for a table whose rows are all in memory; a table
 * backed by an API ignores it and sends `from` and `pageSize` instead.
 *
 * @example
 * ```tsx
 * const pagination = useTablePagination({ total: rows.length, pageSize: 10 });
 * const page = pagination.slice(rows);
 * ```
 */
export function useTablePagination({
  total,
  pageSize: initialSize = DEFAULT_PAGE_SIZE,
  initialPage = 1,
}: UseTablePaginationOptions): UseTablePagination {
  const [pageSize, setSize] = useState(initialSize);
  const [page, setPage] = useState(initialPage);

  // At least one page even with no rows: "Page 1 of 0" is a sentence nobody
  // should read, and the controls need something to disable against.
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  // Filtering can shorten the table under someone standing on page 9. Falling
  // back to the last page that exists beats showing an empty one with no clue
  // that the rows are elsewhere.
  useEffect(() => {
    setPage((current) => clamp(current, 1, pageCount));
  }, [pageCount]);

  const safePage = clamp(page, 1, pageCount);
  const from = (safePage - 1) * pageSize;
  const to = Math.min(from + pageSize, total);

  const goTo = useCallback(
    (next: number) => {
      setPage(clamp(Math.round(next), 1, pageCount));
    },
    [pageCount]
  );

  const next = useCallback(() => {
    goTo(safePage + 1);
  }, [goTo, safePage]);

  const previous = useCallback(() => {
    goTo(safePage - 1);
  }, [goTo, safePage]);

  const setPageSize = useCallback(
    (size: number) => {
      const nextSize = Math.max(1, Math.round(size));
      // Keep the first row on screen where it is.
      const firstRow = (clamp(page, 1, pageCount) - 1) * pageSize;
      setSize(nextSize);
      setPage(Math.floor(firstRow / nextSize) + 1);
    },
    [page, pageCount, pageSize]
  );

  const slice = useCallback(
    <T>(rows: T[]): T[] => rows.slice(from, from + pageSize),
    [from, pageSize]
  );

  return useMemo(
    () => ({
      page: safePage,
      pageSize,
      pageCount,
      from,
      to,
      hasPrevious: safePage > 1,
      hasNext: safePage < pageCount,
      goTo,
      next,
      previous,
      setPageSize,
      slice,
    }),
    [safePage, pageSize, pageCount, from, to, goTo, next, previous, setPageSize, slice]
  );
}
