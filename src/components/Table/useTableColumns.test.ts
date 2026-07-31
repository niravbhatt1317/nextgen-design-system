import { act, renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTableColumns } from './useTableColumns';
import type { TableColumnDef } from './useTableColumns';

const defs: TableColumnDef<'id' | 'subject' | 'priority' | 'assignee'>[] = [
  { key: 'id', label: 'ID', locked: true },
  { key: 'subject', label: 'Subject' },
  { key: 'priority', label: 'Priority' },
  { key: 'assignee', label: 'Assignee' },
];

const keys = (columns: { key: string }[]) => columns.map((column) => column.key);

describe('useTableColumns', () => {
  describe('starting state', () => {
    it('starts in the order it was given, all visible', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      expect(keys(result.current.visible)).toEqual(['id', 'subject', 'priority', 'assignee']);
      expect(result.current.hidden).toEqual([]);
      expect(result.current.frozenCount).toBe(0);
      expect(result.current.isChanged).toBe(false);
    });

    it('carries the definition through to the view', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      expect(result.current.visible[0]).toMatchObject({ key: 'id', label: 'ID', locked: true });
    });
  });

  describe('hiding and showing', () => {
    it('hides a column', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      act(() => {
        result.current.hide('priority');
      });
      expect(keys(result.current.visible)).toEqual(['id', 'subject', 'assignee']);
      expect(keys(result.current.hidden)).toEqual(['priority']);
    });

    it('refuses to hide a locked column', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      act(() => {
        result.current.hide('id');
      });
      expect(keys(result.current.visible)).toContain('id');
    });

    it('shows a column back at the end by default', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      act(() => {
        result.current.hide('subject');
      });
      act(() => {
        result.current.show('subject');
      });
      expect(keys(result.current.visible)).toEqual(['id', 'priority', 'assignee', 'subject']);
    });

    it('inserts a column at a position - the whole point of the + control', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      act(() => {
        result.current.hide('assignee');
      });
      act(() => {
        result.current.show('assignee', 1);
      });
      expect(keys(result.current.visible)).toEqual(['id', 'assignee', 'subject', 'priority']);
    });

    it('inserting at 0 puts the column first', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      act(() => {
        result.current.hide('assignee');
      });
      act(() => {
        result.current.show('assignee', 0);
      });
      expect(keys(result.current.visible)[0]).toBe('assignee');
    });

    it('ignores show on a column that is already visible', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      const before = result.current.state;
      act(() => {
        result.current.show('subject', 0);
      });
      expect(result.current.state).toBe(before);
    });
  });

  describe('moving', () => {
    it('moves a column to a position', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      act(() => {
        result.current.move('assignee', 1);
      });
      expect(keys(result.current.visible)).toEqual(['id', 'assignee', 'subject', 'priority']);
    });

    it('moves a column to the start', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      act(() => {
        result.current.moveToStart('priority');
      });
      expect(keys(result.current.visible)[0]).toBe('priority');
    });

    it('moves a column to the end', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      act(() => {
        result.current.moveToEnd('subject');
      });
      expect(keys(result.current.visible).at(-1)).toBe('subject');
    });

    it('refuses to move a locked column', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      act(() => {
        result.current.moveToEnd('id');
      });
      expect(keys(result.current.visible)[0]).toBe('id');
    });

    it('moving to where it already is changes nothing', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      const before = result.current.state;
      act(() => {
        result.current.move('subject', 1);
      });
      expect(result.current.state).toBe(before);
    });

    it('ignores a column it does not know', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      const before = result.current.state;
      act(() => {
        // @ts-expect-error deliberately outside the union
        result.current.move('nope', 0);
      });
      expect(result.current.state).toBe(before);
    });
  });

  describe('freezing', () => {
    it('freezing the first column pins one', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      act(() => {
        result.current.freeze('id');
      });
      expect(result.current.frozenCount).toBe(1);
      expect(result.current.isFrozen('id')).toBe(true);
      expect(result.current.isFrozen('subject')).toBe(false);
    });

    it('freezing the second column pins both - freezing is a prefix', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      act(() => {
        result.current.freeze('subject');
      });
      expect(result.current.frozenCount).toBe(2);
      expect(result.current.isFrozen('id')).toBe(true);
      expect(result.current.isFrozen('subject')).toBe(true);
    });

    it('offers Freeze only within the limit', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      expect(result.current.canFreeze('id')).toBe(true);
      expect(result.current.canFreeze('subject')).toBe(true);
      expect(result.current.canFreeze('priority')).toBe(false);
    });

    it('respects a different limit', () => {
      const { result } = renderHook(() => useTableColumns(defs, { maxFrozen: 1 }));
      expect(result.current.canFreeze('subject')).toBe(false);
      act(() => {
        result.current.freeze('subject');
      });
      expect(result.current.frozenCount).toBe(0);
    });

    it('unfreezing leaves the columns before it pinned', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      act(() => {
        result.current.freeze('subject');
      });
      act(() => {
        result.current.unfreeze('subject');
      });
      expect(result.current.frozenCount).toBe(1);
      expect(result.current.isFrozen('id')).toBe(true);
    });

    it('hiding a pinned column releases its pin', () => {
      const { result } = renderHook(() =>
        useTableColumns([
          { key: 'a', label: 'A' },
          { key: 'b', label: 'B' },
          { key: 'c', label: 'C' },
        ])
      );
      act(() => {
        result.current.freeze('b');
      });
      expect(result.current.frozenCount).toBe(2);
      act(() => {
        result.current.hide('a');
      });
      expect(result.current.frozenCount).toBe(1);
    });

    it('ignores freeze and unfreeze on a hidden column', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      act(() => {
        result.current.hide('priority');
      });
      const before = result.current.state;
      act(() => {
        result.current.freeze('priority');
        result.current.unfreeze('priority');
      });
      expect(result.current.state).toBe(before);
    });
  });

  describe('reset and restore', () => {
    it('reports a change and resets', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      act(() => {
        result.current.hide('priority');
      });
      expect(result.current.isChanged).toBe(true);
      act(() => {
        result.current.reset();
      });
      expect(keys(result.current.visible)).toEqual(['id', 'subject', 'priority', 'assignee']);
      expect(result.current.isChanged).toBe(false);
    });

    it('reports a change after a reorder alone', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      act(() => {
        result.current.moveToEnd('subject');
      });
      expect(result.current.isChanged).toBe(true);
    });

    it('restores a stored layout', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      act(() => {
        result.current.restore({
          order: ['assignee', 'id', 'subject', 'priority'],
          hidden: ['priority'],
          frozenCount: 1,
        });
      });
      expect(keys(result.current.visible)).toEqual(['assignee', 'id', 'subject']);
      expect(result.current.frozenCount).toBe(1);
    });

    it('appends a column the stored layout has never seen', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      act(() => {
        result.current.restore({ order: ['id', 'subject'], hidden: [], frozenCount: 0 });
      });
      // priority and assignee did not exist when the view was saved. Dropping
      // them would hide columns nobody chose to hide.
      expect(keys(result.current.visible)).toEqual(['id', 'subject', 'priority', 'assignee']);
    });

    it('drops keys it does not recognise and clamps the freeze', () => {
      const { result } = renderHook(() => useTableColumns(defs));
      act(() => {
        result.current.restore({
          order: ['gone', 'id', 'subject', 'priority', 'assignee'] as never,
          hidden: ['alsoGone'] as never,
          frozenCount: 99,
        });
      });
      expect(keys(result.current.visible)).toEqual(['id', 'subject', 'priority', 'assignee']);
      expect(result.current.frozenCount).toBe(2);
    });

    it('survives a re-render with the same definitions', () => {
      const { result, rerender } = renderHook(({ d }) => useTableColumns(d), {
        initialProps: { d: defs },
      });
      act(() => {
        result.current.hide('priority');
      });
      rerender({ d: [...defs] });
      expect(keys(result.current.hidden)).toEqual(['priority']);
    });
  });
});
