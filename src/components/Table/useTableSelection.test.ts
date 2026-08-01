import { act, renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTableSelection } from './useTableSelection';

const rowIds = ['a', 'b', 'c', 'd', 'e'];

describe('useTableSelection', () => {
  describe('starting state', () => {
    it('starts with nothing selected', () => {
      const { result } = renderHook(() => useTableSelection({ rowIds }));
      expect(result.current.selected).toEqual([]);
      expect(result.current.count).toBe(0);
      expect(result.current.headerState).toBe(false);
    });

    it('starts from what it was given', () => {
      const { result } = renderHook(() => useTableSelection({ rowIds, initial: ['b'] }));
      expect(result.current.isSelected('b')).toBe(true);
      expect(result.current.headerState).toBe('indeterminate');
    });
  });

  describe('one row at a time', () => {
    it('selects and deselects', () => {
      const { result } = renderHook(() => useTableSelection({ rowIds }));
      act(() => {
        result.current.toggle('b');
      });
      expect(result.current.selected).toEqual(['b']);
      act(() => {
        result.current.toggle('b');
      });
      expect(result.current.selected).toEqual([]);
    });

    it('reports some, then all', () => {
      const { result } = renderHook(() => useTableSelection({ rowIds: ['a', 'b'] }));
      act(() => {
        result.current.toggle('a');
      });
      expect(result.current.headerState).toBe('indeterminate');
      act(() => {
        result.current.toggle('b');
      });
      expect(result.current.headerState).toBe(true);
    });
  });

  describe('shift-click', () => {
    it('takes everything between the last row touched and this one', () => {
      const { result } = renderHook(() => useTableSelection({ rowIds }));
      act(() => {
        result.current.toggle('b');
      });
      act(() => {
        result.current.toggle('d', { extend: true });
      });
      expect(result.current.selected.sort()).toEqual(['b', 'c', 'd']);
    });

    it('works backwards too', () => {
      const { result } = renderHook(() => useTableSelection({ rowIds }));
      act(() => {
        result.current.toggle('d');
      });
      act(() => {
        result.current.toggle('b', { extend: true });
      });
      expect(result.current.selected.sort()).toEqual(['b', 'c', 'd']);
    });

    it('sets the whole range to one state rather than flipping each row', () => {
      const { result } = renderHook(() => useTableSelection({ rowIds }));
      act(() => {
        result.current.toggle('a');
        result.current.toggle('c');
      });
      // The range takes the *clicked* row's new state. 'e' is unselected, so
      // shift-clicking it selects c-d-e - including 'c', which was already on.
      // Flipping each row would have turned 'c' off and scrambled the range.
      act(() => {
        result.current.toggle('e', { extend: true });
      });
      expect(result.current.selected.sort()).toEqual(['a', 'c', 'd', 'e']);
    });

    it('clears a range when the clicked row was already selected', () => {
      const { result } = renderHook(() => useTableSelection({ rowIds }));
      act(() => {
        result.current.selectAll();
      });
      act(() => {
        result.current.toggle('b');
      });
      // 'b' is now off and is the anchor; shift-clicking 'd' - still on - turns
      // the whole range off.
      act(() => {
        result.current.toggle('d', { extend: true });
      });
      expect(result.current.selected.sort()).toEqual(['a', 'e']);
    });

    it('falls back to a plain toggle with no anchor', () => {
      const { result } = renderHook(() => useTableSelection({ rowIds }));
      act(() => {
        result.current.toggle('c', { extend: true });
      });
      expect(result.current.selected).toEqual(['c']);
    });

    it('falls back to a plain toggle when the anchor has gone', () => {
      const { result, rerender } = renderHook(({ ids }) => useTableSelection({ rowIds: ids }), {
        initialProps: { ids: rowIds },
      });
      act(() => {
        result.current.toggle('b');
      });
      // 'b' is filtered away; extending from it can no longer mean anything.
      rerender({ ids: ['c', 'd', 'e'] });
      act(() => {
        result.current.toggle('d', { extend: true });
      });
      expect(result.current.isSelected('d')).toBe(true);
      expect(result.current.isSelected('c')).toBe(false);
    });
  });

  describe('select all', () => {
    it('selects every visible row and clears them again', () => {
      const { result } = renderHook(() => useTableSelection({ rowIds }));
      act(() => {
        result.current.toggleAll();
      });
      expect(result.current.count).toBe(5);
      expect(result.current.headerState).toBe(true);
      act(() => {
        result.current.toggleAll();
      });
      expect(result.current.count).toBe(0);
    });

    it('selects the rest when only some are selected', () => {
      const { result } = renderHook(() => useTableSelection({ rowIds }));
      act(() => {
        result.current.toggle('a');
      });
      act(() => {
        result.current.toggleAll();
      });
      expect(result.current.count).toBe(5);
    });

    it('stays off when there are no rows at all', () => {
      const { result } = renderHook(() => useTableSelection({ rowIds: [] }));
      expect(result.current.headerState).toBe(false);
      act(() => {
        result.current.toggleAll();
      });
      expect(result.current.count).toBe(0);
    });
  });

  describe('filtering', () => {
    it('keeps a selection the filter is hiding', () => {
      const { result, rerender } = renderHook(({ ids }) => useTableSelection({ rowIds: ids }), {
        initialProps: { ids: rowIds },
      });
      act(() => {
        result.current.toggle('a');
        result.current.toggle('e');
      });
      rerender({ ids: ['a', 'b'] });
      // Someone who ticks two rows and then searches expects both to still be
      // ticked - dropping one is the table undoing their work.
      expect(result.current.count).toBe(2);
      expect(result.current.isSelected('e')).toBe(true);
    });

    it('reports the header against the visible rows only', () => {
      const { result, rerender } = renderHook(({ ids }) => useTableSelection({ rowIds: ids }), {
        initialProps: { ids: rowIds },
      });
      act(() => {
        result.current.toggle('e');
      });
      rerender({ ids: ['a', 'b'] });
      // A tick in the header would claim something untrue of this view.
      expect(result.current.headerState).toBe(false);
    });

    it('select-all leaves hidden selections alone', () => {
      const { result, rerender } = renderHook(({ ids }) => useTableSelection({ rowIds: ids }), {
        initialProps: { ids: rowIds },
      });
      act(() => {
        result.current.toggle('e');
      });
      rerender({ ids: ['a', 'b'] });
      act(() => {
        result.current.toggleAll();
      });
      act(() => {
        result.current.toggleAll();
      });
      // Two toggles clear the visible rows and nothing else.
      expect(result.current.isSelected('e')).toBe(true);
      expect(result.current.count).toBe(1);
    });

    it('clear drops everything, hidden rows included', () => {
      const { result, rerender } = renderHook(({ ids }) => useTableSelection({ rowIds: ids }), {
        initialProps: { ids: rowIds },
      });
      act(() => {
        result.current.selectAll();
      });
      rerender({ ids: ['a'] });
      act(() => {
        result.current.clear();
      });
      expect(result.current.count).toBe(0);
    });
  });
});
