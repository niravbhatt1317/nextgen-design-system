import { act, renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTableSort } from './useTableSort';

type Key = 'status' | 'priority' | 'created';

const columns = (rules: { column: string }[]) => rules.map((rule) => rule.column);

describe('useTableSort', () => {
  describe('starting state', () => {
    it('starts unsorted', () => {
      const { result } = renderHook(() => useTableSort<Key>());
      expect(result.current.rules).toEqual([]);
      expect(result.current.isSorted).toBe(false);
    });

    it('starts from what it was given', () => {
      const { result } = renderHook(() =>
        useTableSort<Key>({ initial: [{ column: 'status', direction: 'ascend' }] })
      );
      expect(result.current.directionOf('status')).toBe('ascend');
      expect(result.current.isSorted).toBe(true);
    });

    it('survives a re-render', () => {
      const { result, rerender } = renderHook(({ i }) => useTableSort<Key>({ initial: i }), {
        initialProps: { i: [] as { column: Key; direction: 'ascend' | 'descend' }[] },
      });
      act(() => {
        result.current.toggle('status');
      });
      rerender({ i: [] });
      expect(result.current.directionOf('status')).toBe('ascend');
    });
  });

  describe('toggling one column', () => {
    it('cycles unsorted, ascending, descending, unsorted', () => {
      const { result } = renderHook(() => useTableSort<Key>());
      act(() => {
        result.current.toggle('status');
      });
      expect(result.current.directionOf('status')).toBe('ascend');
      act(() => {
        result.current.toggle('status');
      });
      expect(result.current.directionOf('status')).toBe('descend');
      act(() => {
        result.current.toggle('status');
      });
      // The third press removes it. Without that there is no way to stop
      // sorting by a column from the column itself.
      expect(result.current.directionOf('status')).toBeNull();
      expect(result.current.isSorted).toBe(false);
    });
  });

  describe('more than one column', () => {
    it('keeps both, most significant first', () => {
      const { result } = renderHook(() => useTableSort<Key>());
      act(() => {
        result.current.toggle('status');
      });
      act(() => {
        result.current.toggle('priority');
      });
      expect(columns(result.current.rules)).toEqual(['status', 'priority']);
    });

    it('appends a new column rather than promoting it', () => {
      const { result } = renderHook(() => useTableSort<Key>());
      act(() => {
        result.current.sortBy('status', 'ascend');
      });
      act(() => {
        result.current.sortBy('priority', 'descend');
      });
      // "Sort by this as well" means it breaks ties in the existing sort.
      // Prepending would silently demote the sort set up first.
      expect(result.current.orderOf('status')).toBe(1);
      expect(result.current.orderOf('priority')).toBe(2);
    });

    it('numbers the columns so an arrow is not the only clue', () => {
      const { result } = renderHook(() => useTableSort<Key>());
      act(() => {
        result.current.sortBy('status', 'ascend');
        result.current.sortBy('priority', 'ascend');
      });
      expect(result.current.orderOf('priority')).toBe(2);
      expect(result.current.orderOf('created')).toBeNull();
    });

    it('re-sorting a column already in the stack keeps its place', () => {
      const { result } = renderHook(() => useTableSort<Key>());
      act(() => {
        result.current.sortBy('status', 'ascend');
        result.current.sortBy('priority', 'ascend');
      });
      act(() => {
        result.current.toggle('status');
      });
      expect(result.current.directionOf('status')).toBe('descend');
      expect(result.current.orderOf('status')).toBe(1);
    });

    it('replaces rather than stacks when only one sort is allowed', () => {
      const { result } = renderHook(() => useTableSort<Key>({ multiple: false }));
      act(() => {
        result.current.toggle('status');
      });
      act(() => {
        result.current.toggle('priority');
      });
      // Dropping the first is correct here, not a bug - the table said it only
      // ever sorts by one thing.
      expect(columns(result.current.rules)).toEqual(['priority']);
    });

    it('replaces via sortBy when only one sort is allowed', () => {
      const { result } = renderHook(() => useTableSort<Key>({ multiple: false }));
      act(() => {
        result.current.sortBy('status', 'ascend');
      });
      act(() => {
        result.current.sortBy('priority', 'descend');
      });
      expect(columns(result.current.rules)).toEqual(['priority']);
    });
  });

  describe('editing the stack', () => {
    it('removes one column and leaves the rest in order', () => {
      const { result } = renderHook(() => useTableSort<Key>());
      act(() => {
        result.current.sortBy('status', 'ascend');
        result.current.sortBy('priority', 'ascend');
        result.current.sortBy('created', 'ascend');
      });
      act(() => {
        result.current.remove('priority');
      });
      expect(columns(result.current.rules)).toEqual(['status', 'created']);
      expect(result.current.orderOf('created')).toBe(2);
    });

    it('reorders the stack, which changes which sort wins', () => {
      const { result } = renderHook(() => useTableSort<Key>());
      act(() => {
        result.current.sortBy('status', 'ascend');
        result.current.sortBy('priority', 'ascend');
      });
      act(() => {
        result.current.move(1, 0);
      });
      expect(columns(result.current.rules)).toEqual(['priority', 'status']);
    });

    it('ignores a move that goes nowhere or out of bounds', () => {
      const { result } = renderHook(() => useTableSort<Key>());
      act(() => {
        result.current.sortBy('status', 'ascend');
      });
      const before = result.current.rules;
      act(() => {
        result.current.move(0, 0);
        result.current.move(0, 5);
        result.current.move(-1, 0);
      });
      expect(result.current.rules).toBe(before);
    });

    it('clears everything', () => {
      const { result } = renderHook(() => useTableSort<Key>());
      act(() => {
        result.current.sortBy('status', 'ascend');
        result.current.sortBy('priority', 'ascend');
      });
      act(() => {
        result.current.clear();
      });
      expect(result.current.rules).toEqual([]);
      expect(result.current.isSorted).toBe(false);
    });

    it('removing a column that is not sorted changes nothing', () => {
      const { result } = renderHook(() => useTableSort<Key>());
      act(() => {
        result.current.sortBy('status', 'ascend');
      });
      act(() => {
        result.current.remove('created');
      });
      expect(columns(result.current.rules)).toEqual(['status']);
    });
  });
});
