import { act, renderHook } from '@testing-library/react';
import type { TableColumnDef } from './Table.types';
import { useTableColumns } from './useTableColumns';
import { useTablePaging } from './useTablePaging';
import { useTableSelection } from './useTableSelection';
import { useTableSort } from './useTableSort';

interface Row {
  id: string;
  name: string;
  age: number;
}
const COLS: TableColumnDef<Row>[] = [
  { key: 'a', label: 'A', cell: () => null },
  { key: 'b', label: 'B', width: 150, minWidth: 100, cell: () => null },
  { key: 'c', label: 'C', cell: () => null },
];

describe('useTableColumns', () => {
  beforeEach(() => localStorage.clear());

  it('starts with the default order, nothing hidden, 200px widths', () => {
    const { result } = renderHook(() => useTableColumns({ columns: COLS }));
    expect(result.current.visible.map((c) => c.key)).toEqual(['a', 'b', 'c']);
    expect(result.current.widthOf('a')).toBe(200);
    expect(result.current.widthOf('b')).toBe(150);
    expect(result.current.isChanged).toBe(false);
  });

  it('hides, shows, inserts after a column and moves', () => {
    const { result } = renderHook(() => useTableColumns({ columns: COLS }));
    act(() => result.current.hide('b'));
    expect(result.current.visible.map((c) => c.key)).toEqual(['a', 'c']);
    expect(result.current.hidden.map((c) => c.key)).toEqual(['b']);
    act(() => result.current.insertAfter('b', 'c'));
    expect(result.current.visible.map((c) => c.key)).toEqual(['a', 'c', 'b']);
    act(() => result.current.moveBefore('b', 'a'));
    expect(result.current.visible.map((c) => c.key)).toEqual(['b', 'a', 'c']);
    act(() => result.current.moveBy('a', 1));
    expect(result.current.visible.map((c) => c.key)).toEqual(['b', 'c', 'a']);
    act(() => result.current.moveToStart('a'));
    expect(result.current.visible.map((c) => c.key)).toEqual(['a', 'b', 'c']);
    act(() => result.current.moveToEnd('a'));
    expect(result.current.visible.map((c) => c.key)).toEqual(['b', 'c', 'a']);
    expect(result.current.isChanged).toBe(true);
    act(() => result.current.reset());
    expect(result.current.visible.map((c) => c.key)).toEqual(['a', 'b', 'c']);
    expect(result.current.isChanged).toBe(false);
  });

  it('clamps widths to the column floor and the 720 ceiling', () => {
    const { result } = renderHook(() => useTableColumns({ columns: COLS }));
    act(() => result.current.setWidth('b', 40));
    expect(result.current.widthOf('b')).toBe(100);
    act(() => result.current.setWidth('a', 40));
    expect(result.current.widthOf('a')).toBe(120);
    act(() => result.current.setWidth('a', 9999));
    expect(result.current.widthOf('a')).toBe(720);
  });

  it('remembers the layout under a storage key and reconciles new columns', () => {
    const first = renderHook(() => useTableColumns({ columns: COLS, storageKey: 'k' }));
    act(() => {
      first.result.current.hide('c');
      first.result.current.setWidth('a', 300);
      first.result.current.moveToEnd('a');
    });
    const more: TableColumnDef<Row>[] = [...COLS, { key: 'd', label: 'D', cell: () => null }];
    const second = renderHook(() => useTableColumns({ columns: more, storageKey: 'k' }));
    expect(second.result.current.order).toEqual(['b', 'c', 'a', 'd']);
    expect(second.result.current.hidden.map((c) => c.key)).toEqual(['c']);
    expect(second.result.current.widthOf('a')).toBe(300);
  });
});

describe('useTableSelection', () => {
  it('toggles, extends a range with Shift, and reports the header state', () => {
    const { result } = renderHook(() => useTableSelection());
    const page = ['1', '2', '3', '4', '5', '6'];
    act(() => result.current.toggle('2', { within: page }));
    act(() => result.current.toggle('6', { extend: true, within: page }));
    expect([...result.current.selected]).toEqual(['2', '3', '4', '5', '6']);
    expect(result.current.stateOf(page)).toBe('some');
    act(() => result.current.add(['1']));
    expect(result.current.stateOf(page)).toBe('all');
    act(() => result.current.remove(['1', '2']));
    expect(result.current.count).toBe(4);
    act(() => result.current.clear());
    expect(result.current.stateOf(page)).toBe('none');
  });
});

describe('useTableSort', () => {
  const rows: Row[] = [
    { id: '1', name: 'Zara', age: 30 },
    { id: '2', name: 'adam', age: 25 },
    { id: '3', name: 'Mei', age: 41 },
  ];
  const cols: TableColumnDef<Row>[] = [
    { key: 'name', label: 'Name', sortable: true, cell: () => null },
    { key: 'age', label: 'Age', sortable: true, sortValue: (r) => r.age, cell: () => null },
  ];

  it('cycles A to Z, Z to A, off, and sorts case-insensitively', () => {
    const { result } = renderHook(() => useTableSort());
    act(() => result.current.cycle('name'));
    expect(result.current.sort).toEqual({ key: 'name', direction: 'asc' });
    expect(result.current.apply(rows, cols).map((r) => r.name)).toEqual(['adam', 'Mei', 'Zara']);
    act(() => result.current.cycle('name'));
    expect(result.current.apply(rows, cols).map((r) => r.name)).toEqual(['Zara', 'Mei', 'adam']);
    act(() => result.current.cycle('name'));
    expect(result.current.sort).toBeNull();
    expect(result.current.apply(rows, cols)).toBe(rows);
  });

  it('sorts numbers as numbers', () => {
    const { result } = renderHook(() => useTableSort());
    act(() => result.current.set('age', 'desc'));
    expect(result.current.apply(rows, cols).map((r) => r.age)).toEqual([41, 30, 25]);
  });
});

describe('useTablePaging', () => {
  const rows = Array.from({ length: 60 }, (_, i) => i + 1);

  it('pages, clamps the page, and keeps the first row in view when the size changes', () => {
    const { result } = renderHook(() => useTablePaging({ pageSize: 25 }));
    expect(result.current.slice(rows)).toHaveLength(25);
    act(() => result.current.setPage(3, rows.length));
    expect(result.current.slice(rows)[0]).toBe(51);
    act(() => result.current.setPage(99, rows.length));
    expect(result.current.page).toBe(3);
    act(() => result.current.setPageSize(50, rows.length));
    expect(result.current.page).toBe(2);
  });

  it('loads more in batches in the other mode', () => {
    const { result } = renderHook(() => useTablePaging({ pageSize: 25, mode: 'loadMore' }));
    expect(result.current.slice(rows)).toHaveLength(25);
    act(() => result.current.loadMore());
    expect(result.current.slice(rows)).toHaveLength(50);
    act(() => result.current.reset());
    expect(result.current.slice(rows)).toHaveLength(25);
  });
});
