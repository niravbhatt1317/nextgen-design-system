import { act, renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTablePagination } from './useTablePagination';

describe('useTablePagination', () => {
  it('starts on the first page', () => {
    const { result } = renderHook(() => useTablePagination({ total: 100, pageSize: 10 }));
    expect(result.current.page).toBe(1);
    expect(result.current.pageCount).toBe(10);
    expect(result.current.hasPrevious).toBe(false);
    expect(result.current.hasNext).toBe(true);
  });

  it('reports the range of rows on this page', () => {
    const { result } = renderHook(() => useTablePagination({ total: 95, pageSize: 10 }));
    act(() => {
      result.current.goTo(10);
    });
    // The last page is short, so `to` is the total rather than a round number.
    expect(result.current.from).toBe(90);
    expect(result.current.to).toBe(95);
  });

  it('moves back and forward', () => {
    const { result } = renderHook(() => useTablePagination({ total: 30, pageSize: 10 }));
    act(() => {
      result.current.next();
    });
    expect(result.current.page).toBe(2);
    act(() => {
      result.current.previous();
    });
    expect(result.current.page).toBe(1);
  });

  it('will not walk off either end', () => {
    const { result } = renderHook(() => useTablePagination({ total: 20, pageSize: 10 }));
    act(() => {
      result.current.previous();
    });
    expect(result.current.page).toBe(1);
    act(() => {
      result.current.goTo(99);
    });
    expect(result.current.page).toBe(2);
    expect(result.current.hasNext).toBe(false);
  });

  it('keeps one page even with no rows', () => {
    const { result } = renderHook(() => useTablePagination({ total: 0 }));
    // "Page 1 of 0" is a sentence nobody should read.
    expect(result.current.pageCount).toBe(1);
    expect(result.current.hasNext).toBe(false);
  });

  it('takes this page out of an array', () => {
    const rows = Array.from({ length: 25 }, (_, i) => i);
    const { result } = renderHook(() => useTablePagination({ total: 25, pageSize: 10 }));
    act(() => {
      result.current.goTo(3);
    });
    expect(result.current.slice(rows)).toEqual([20, 21, 22, 23, 24]);
  });

  it('falls back to the last page when the table shrinks underneath it', () => {
    const { result, rerender } = renderHook(
      ({ total }) => useTablePagination({ total, pageSize: 10 }),
      {
        initialProps: { total: 100 },
      }
    );
    act(() => {
      result.current.goTo(9);
    });
    // A filter cut the table to 20 rows while someone stood on page 9.
    rerender({ total: 20 });
    expect(result.current.page).toBe(2);
  });

  it('keeps the first visible row on screen when the size changes', () => {
    const { result } = renderHook(() => useTablePagination({ total: 1000, pageSize: 10 }));
    act(() => {
      result.current.goTo(31);
    });
    // Row 300 is at the top; at 100 per page that is page 4.
    act(() => {
      result.current.setPageSize(100);
    });
    expect(result.current.pageSize).toBe(100);
    expect(result.current.page).toBe(4);
    expect(result.current.from).toBe(300);
  });

  it('refuses a page size of zero, which would divide by nothing', () => {
    const { result } = renderHook(() => useTablePagination({ total: 50 }));
    act(() => {
      result.current.setPageSize(0);
    });
    expect(result.current.pageSize).toBe(1);
  });

  it('starts where it is told', () => {
    const { result } = renderHook(() =>
      useTablePagination({ total: 100, pageSize: 10, initialPage: 4 })
    );
    expect(result.current.page).toBe(4);
    expect(result.current.from).toBe(30);
  });
});
