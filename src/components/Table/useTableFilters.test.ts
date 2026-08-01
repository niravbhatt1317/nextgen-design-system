import { act, renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTableFilters } from './useTableFilters';

type Key = 'status' | 'priority' | 'assignee';

describe('useTableFilters', () => {
  it('starts with nothing filtered', () => {
    const { result } = renderHook(() => useTableFilters<Key>());
    expect(result.current.filters).toEqual([]);
    expect(result.current.isActive).toBe(false);
    expect(result.current.count).toBe(0);
  });

  it('starts from what it was given', () => {
    const { result } = renderHook(() =>
      useTableFilters<Key>({ initial: [{ attribute: 'status', values: ['Open'] }] })
    );
    expect(result.current.valuesFor('status')).toEqual(['Open']);
    expect(result.current.isFiltered('status')).toBe(true);
  });

  it('adds a value', () => {
    const { result } = renderHook(() => useTableFilters<Key>());
    act(() => {
      result.current.toggleValue('status', 'Open');
    });
    expect(result.current.filters).toEqual([{ attribute: 'status', values: ['Open'] }]);
  });

  it('adds a second value to the same attribute rather than a second filter', () => {
    const { result } = renderHook(() => useTableFilters<Key>());
    act(() => {
      result.current.toggleValue('status', 'Open');
    });
    act(() => {
      result.current.toggleValue('status', 'In Process');
    });
    // "Status is Open or In Process" is one condition, not two.
    expect(result.current.count).toBe(1);
    expect(result.current.valuesFor('status')).toEqual(['Open', 'In Process']);
  });

  it('counts attributes, not values', () => {
    const { result } = renderHook(() => useTableFilters<Key>());
    act(() => {
      result.current.toggleValue('status', 'Open');
      result.current.toggleValue('status', 'In Process');
      result.current.toggleValue('priority', 'High');
    });
    expect(result.current.count).toBe(2);
  });

  it('drops the filter when its last value goes', () => {
    const { result } = renderHook(() => useTableFilters<Key>());
    act(() => {
      result.current.toggleValue('status', 'Open');
    });
    act(() => {
      result.current.toggleValue('status', 'Open');
    });
    // An attribute filtered to nothing matches everything, so keeping it would
    // leave a chip that does not do anything.
    expect(result.current.filters).toEqual([]);
    expect(result.current.isActive).toBe(false);
  });

  it('replaces every value at once', () => {
    const { result } = renderHook(() => useTableFilters<Key>());
    act(() => {
      result.current.toggleValue('status', 'Open');
    });
    act(() => {
      result.current.setValues('status', ['Resolved', 'Closed']);
    });
    expect(result.current.valuesFor('status')).toEqual(['Resolved', 'Closed']);
  });

  it('setValues with an empty list drops the filter', () => {
    const { result } = renderHook(() => useTableFilters<Key>());
    act(() => {
      result.current.toggleValue('status', 'Open');
    });
    act(() => {
      result.current.setValues('status', []);
    });
    expect(result.current.isFiltered('status')).toBe(false);
  });

  it('keeps a filter in place when its values change', () => {
    const { result } = renderHook(() => useTableFilters<Key>());
    act(() => {
      result.current.toggleValue('status', 'Open');
      result.current.toggleValue('priority', 'High');
    });
    act(() => {
      result.current.setValues('status', ['Closed']);
    });
    // Jumping to the end of the chip row because one value changed is a small
    // nonsense that makes the row impossible to scan.
    expect(result.current.filters.map((filter) => filter.attribute)).toEqual([
      'status',
      'priority',
    ]);
  });

  it('adds a brand new attribute through setValues', () => {
    const { result } = renderHook(() => useTableFilters<Key>());
    act(() => {
      result.current.setValues('assignee', ['Ada']);
    });
    expect(result.current.valuesFor('assignee')).toEqual(['Ada']);
  });

  it('removes one attribute and leaves the rest', () => {
    const { result } = renderHook(() => useTableFilters<Key>());
    act(() => {
      result.current.toggleValue('status', 'Open');
      result.current.toggleValue('priority', 'High');
    });
    act(() => {
      result.current.remove('status');
    });
    expect(result.current.filters.map((filter) => filter.attribute)).toEqual(['priority']);
  });

  it('clears everything', () => {
    const { result } = renderHook(() => useTableFilters<Key>());
    act(() => {
      result.current.toggleValue('status', 'Open');
      result.current.toggleValue('priority', 'High');
    });
    act(() => {
      result.current.clear();
    });
    expect(result.current.filters).toEqual([]);
  });

  it('reports no values for an attribute that is not filtered', () => {
    const { result } = renderHook(() => useTableFilters<Key>());
    expect(result.current.valuesFor('assignee')).toEqual([]);
    expect(result.current.isFiltered('assignee')).toBe(false);
  });

  it('survives a re-render', () => {
    const { result, rerender } = renderHook(() => useTableFilters<Key>());
    act(() => {
      result.current.toggleValue('status', 'Open');
    });
    rerender();
    expect(result.current.valuesFor('status')).toEqual(['Open']);
  });

  describe('restore', () => {
    it('replaces every filter', () => {
      const { result } = renderHook(() => useTableFilters<Key>());
      act(() => {
        result.current.toggleValue('status', 'Open');
      });
      act(() => {
        result.current.restore([{ attribute: 'assignee', values: ['Ada', 'Grace'] }]);
      });
      expect(result.current.isFiltered('status')).toBe(false);
      expect(result.current.valuesFor('assignee')).toEqual(['Ada', 'Grace']);
    });

    it('empties them', () => {
      const { result } = renderHook(() => useTableFilters<Key>());
      act(() => {
        result.current.toggleValue('status', 'Open');
      });
      act(() => {
        result.current.restore([]);
      });
      expect(result.current.isActive).toBe(false);
    });

    it('copies the values, so a chip cannot edit the view it came from', () => {
      const { result } = renderHook(() => useTableFilters<Key>());
      const saved = [{ attribute: 'status' as Key, values: ['Open'] }];
      act(() => {
        result.current.restore(saved);
      });
      act(() => {
        result.current.toggleValue('status', 'Resolved');
      });
      expect(saved[0]?.values).toEqual(['Open']);
    });
  });
});
