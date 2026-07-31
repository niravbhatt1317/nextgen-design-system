import { act, renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useColumnWidths } from './useColumnWidths';

describe('useColumnWidths', () => {
  it('starts at the widths it was given', () => {
    const { result } = renderHook(() => useColumnWidths({ name: 200, email: 260 }));
    expect(result.current.widths).toEqual({ name: 200, email: 260 });
    expect(result.current.isResized).toBe(false);
  });

  it('sets one column without touching the others', () => {
    const { result } = renderHook(() => useColumnWidths({ name: 200, email: 260 }));
    act(() => {
      result.current.setWidth('name', 320);
    });
    expect(result.current.widths).toEqual({ name: 320, email: 260 });
  });

  it('clamps to the minimum - a column that reaches zero cannot be grabbed again', () => {
    const { result } = renderHook(() => useColumnWidths({ name: 200 }, { minWidth: 80 }));
    act(() => {
      result.current.setWidth('name', -50);
    });
    expect(result.current.widths.name).toBe(80);
  });

  it('clamps to the maximum', () => {
    const { result } = renderHook(() => useColumnWidths({ name: 200 }, { maxWidth: 400 }));
    act(() => {
      result.current.setWidth('name', 9999);
    });
    expect(result.current.widths.name).toBe(400);
  });

  it('rounds to whole pixels', () => {
    const { result } = renderHook(() => useColumnWidths({ name: 200 }));
    act(() => {
      result.current.setWidth('name', 210.6);
    });
    expect(result.current.widths.name).toBe(211);
  });

  it('reports when something has been resized', () => {
    const { result } = renderHook(() => useColumnWidths({ name: 200 }));
    expect(result.current.isResized).toBe(false);
    act(() => {
      result.current.setWidth('name', 240);
    });
    expect(result.current.isResized).toBe(true);
  });

  it('resets every column to where it started', () => {
    const { result } = renderHook(() => useColumnWidths({ name: 200, email: 260 }));
    act(() => {
      result.current.setWidth('name', 400);
      result.current.setWidth('email', 100);
    });
    act(() => {
      result.current.reset();
    });
    expect(result.current.widths).toEqual({ name: 200, email: 260 });
    expect(result.current.isResized).toBe(false);
  });

  it('keeps a resize when the caller re-renders for another reason', () => {
    // The initial widths are captured once. Re-reading the argument every render
    // would silently undo a resize whenever the parent re-rendered.
    const { result, rerender } = renderHook(({ init }) => useColumnWidths(init), {
      initialProps: { init: { name: 200 } },
    });
    act(() => {
      result.current.setWidth('name', 350);
    });
    rerender({ init: { name: 200 } });
    expect(result.current.widths.name).toBe(350);
  });

  it('returns the same object when a width would not change', () => {
    const { result } = renderHook(() => useColumnWidths({ name: 200 }));
    const before = result.current.widths;
    act(() => {
      result.current.setWidth('name', 200);
    });
    expect(result.current.widths).toBe(before);
  });
});
