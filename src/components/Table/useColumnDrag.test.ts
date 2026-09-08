import { act, renderHook } from '@testing-library/react';
import type { PointerEvent as ReactPointerEvent, RefObject } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useColumnDrag } from './useColumnDrag';

/**
 * jsdom gives every element a zero-sized rect, and this hook is entirely
 * geometry - which column's midpoint the pointer has passed, how near an edge it
 * is. So the rects are stubbed to real numbers; without them every column sits
 * at 0 and every assertion is vacuously true.
 */
const VIEWPORT = { left: 0, right: 500, top: 10, height: 200 };

function rect(r: Partial<DOMRect> & { left: number; width: number }): DOMRect {
  const top = r.top ?? 0;
  const height = r.height ?? 40;
  return {
    left: r.left,
    width: r.width,
    right: r.left + r.width,
    top,
    height,
    bottom: top + height,
    x: r.left,
    y: top,
    toJSON: () => ({}),
  } as DOMRect;
}

interface Col {
  key: string;
  left: number;
  width: number;
  /** A frozen column: present in the header, but never a landing target. */
  movable?: boolean;
}

function makeViewport(cols: Col[]): HTMLElement {
  const root = document.createElement('div');
  root.getBoundingClientRect = () =>
    rect({
      left: VIEWPORT.left,
      width: VIEWPORT.right - VIEWPORT.left,
      top: VIEWPORT.top,
      height: VIEWPORT.height,
    });

  const table = document.createElement('table');
  const head = document.createElement('thead');
  const row = document.createElement('tr');

  for (const col of cols) {
    const th = document.createElement('th');
    if (col.movable !== false) th.dataset.movable = 'true';
    th.dataset.key = col.key;
    th.getBoundingClientRect = () => rect({ left: col.left, width: col.width });
    row.appendChild(th);
  }

  head.appendChild(row);
  table.appendChild(head);
  root.appendChild(table);
  document.body.appendChild(root);
  return root;
}

/** Three 100px columns starting at x=0, so their midpoints are 50, 150 and 250. */
const THREE: Col[] = [
  { key: 'name', left: 0, width: 100 },
  { key: 'email', left: 100, width: 100 },
  { key: 'role', left: 200, width: 100 },
];

function setup(cols: Col[] | null = THREE) {
  const root = cols ? makeViewport(cols) : null;
  const viewportRef: RefObject<HTMLElement | null> = { current: root };
  const onDrop = vi.fn();
  const view = renderHook(() => useColumnDrag({ viewportRef, onDrop }));
  return { ...view, root, onDrop };
}

function grip(
  result: { current: ReturnType<typeof useColumnDrag> },
  key: string,
  label: string,
  clientX: number
) {
  const preventDefault = vi.fn();
  act(() => {
    result.current.gripPointerDown(
      key,
      label
    )({
      preventDefault,
      clientX,
    } as unknown as ReactPointerEvent<HTMLButtonElement>);
  });
  return preventDefault;
}

function pointer(type: 'pointermove' | 'pointerup' | 'pointercancel', clientX = 0, clientY = 0) {
  act(() => {
    document.dispatchEvent(new MouseEvent(type, { clientX, clientY, bubbles: true }));
  });
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('useColumnDrag', () => {
  it('starts with no drag', () => {
    const { result } = setup();
    expect(result.current.drag).toBeNull();
  });

  it('stops the grip from starting a text selection', () => {
    const { result } = setup();
    expect(grip(result, 'name', 'Name', 10)).toHaveBeenCalled();
  });

  // A 4px threshold: a click that wobbles is a click, not a drag.
  it('does not begin until the pointer has moved past the threshold', () => {
    const { result } = setup();
    grip(result, 'name', 'Name', 10);
    pointer('pointermove', 13, 20);
    expect(result.current.drag).toBeNull();
  });

  it('begins once the pointer has moved far enough', () => {
    const { result } = setup();
    grip(result, 'name', 'Name', 10);
    pointer('pointermove', 120, 20);

    expect(result.current.drag).not.toBeNull();
    expect(result.current.drag?.key).toBe('name');
    expect(result.current.drag?.label).toBe('Name');
    expect(result.current.drag?.x).toBe(120);
    expect(result.current.drag?.y).toBe(20);
  });

  it('keeps following the pointer once it has begun', () => {
    const { result } = setup();
    grip(result, 'name', 'Name', 10);
    pointer('pointermove', 120, 20);
    pointer('pointermove', 260, 30);

    expect(result.current.drag?.x).toBe(260);
    expect(result.current.drag?.y).toBe(30);
  });

  it('lands before the column whose midpoint the pointer has not yet passed', () => {
    const { result } = setup();
    grip(result, 'name', 'Name', 10);
    // 120 is past `name`'s midpoint (50) but short of `email`'s (150).
    pointer('pointermove', 120, 20);

    expect(result.current.drag?.beforeKey).toBe('email');
    expect(result.current.drag?.lineX).toBe(99); // email's left edge, less the 1px line
  });

  it('lands at the end when the pointer is past every midpoint', () => {
    const { result } = setup();
    grip(result, 'name', 'Name', 10);
    pointer('pointermove', 280, 20);

    expect(result.current.drag?.beforeKey).toBeNull();
    expect(result.current.drag?.lineX).toBe(299); // the last column's right edge
  });

  it('reports the scroll region for the landing line', () => {
    const { result } = setup();
    grip(result, 'name', 'Name', 10);
    pointer('pointermove', 120, 20);

    expect(result.current.drag?.lineTop).toBe(VIEWPORT.top);
    expect(result.current.drag?.lineHeight).toBe(VIEWPORT.height);
  });

  it('clamps the landing line to the viewport', () => {
    const { result } = setup([{ key: 'name', left: -400, width: 100 }]);
    grip(result, 'name', 'Name', 10);
    pointer('pointermove', 120, 20);

    // The column sits off to the left, so its edge would put the line outside.
    expect(result.current.drag?.lineX).toBe(VIEWPORT.left - 1);
  });

  it('ignores frozen headings as landing targets', () => {
    const { result } = setup([
      { key: 'name', left: 0, width: 100, movable: false },
      { key: 'email', left: 100, width: 100 },
    ]);
    grip(result, 'email', 'Email', 110);
    pointer('pointermove', 260, 20);

    expect(result.current.drag?.beforeKey).toBeNull();
  });

  describe('edge scrolling', () => {
    it('scrolls right when the pointer nears the right edge', () => {
      const { result, root } = setup();
      grip(result, 'name', 'Name', 10);
      pointer('pointermove', 480, 20); // within 48px of right=500

      expect(root?.scrollLeft).toBe(12);
    });

    it('scrolls left when the pointer nears the left edge', () => {
      const { result, root } = setup();
      if (root) root.scrollLeft = 100;
      grip(result, 'role', 'Role', 210);
      pointer('pointermove', 20, 20); // within 48px of left=0

      expect(root?.scrollLeft).toBe(88);
    });

    it('does not scroll left when already at the start', () => {
      const { result, root } = setup();
      grip(result, 'role', 'Role', 210);
      pointer('pointermove', 20, 20);

      expect(root?.scrollLeft).toBe(0);
    });

    it('does not scroll when the pointer is in the middle', () => {
      const { result, root } = setup();
      if (root) root.scrollLeft = 50;
      grip(result, 'name', 'Name', 10);
      pointer('pointermove', 250, 20);

      expect(root?.scrollLeft).toBe(50);
    });
  });

  describe('dropping', () => {
    it('reports the landing on pointerup', () => {
      const { result, onDrop } = setup();
      grip(result, 'name', 'Name', 10);
      pointer('pointermove', 120, 20);
      pointer('pointerup');

      expect(onDrop).toHaveBeenCalledWith('name', 'email');
    });

    it('reports a drop at the end as a null landing', () => {
      const { result, onDrop } = setup();
      grip(result, 'name', 'Name', 10);
      pointer('pointermove', 280, 20);
      pointer('pointerup');

      expect(onDrop).toHaveBeenCalledWith('name', null);
    });

    it('clears the drag on pointerup', () => {
      const { result } = setup();
      grip(result, 'name', 'Name', 10);
      pointer('pointermove', 120, 20);
      pointer('pointerup');

      expect(result.current.drag).toBeNull();
    });

    // Landing a column exactly where it already is is not a move.
    it('does not report a drop when the column would not move', () => {
      const { result, onDrop } = setup();
      grip(result, 'email', 'Email', 110);
      pointer('pointermove', 120, 20); // lands before `email` - itself

      expect(result.current.drag?.beforeKey).toBe('email');
      pointer('pointerup');
      expect(onDrop).not.toHaveBeenCalled();
    });

    it('does not report a drop when the pointer never moved', () => {
      const { result, onDrop } = setup();
      grip(result, 'name', 'Name', 10);
      pointer('pointerup');

      expect(onDrop).not.toHaveBeenCalled();
    });

    it('abandons the drag on pointercancel', () => {
      const { result, onDrop } = setup();
      grip(result, 'name', 'Name', 10);
      pointer('pointermove', 120, 20);
      pointer('pointercancel');

      expect(result.current.drag).toBeNull();
      // pointercancel shares the handler with pointerup, so it still lands.
      expect(onDrop).toHaveBeenCalledWith('name', 'email');
    });
  });

  describe('when there is nothing to drag within', () => {
    it('does not begin without a viewport', () => {
      const { result } = setup(null);
      grip(result, 'name', 'Name', 10);
      pointer('pointermove', 120, 20);

      expect(result.current.drag).toBeNull();
    });

    it('does not begin when there are no movable headings', () => {
      const { result } = setup([{ key: 'name', left: 0, width: 100, movable: false }]);
      grip(result, 'name', 'Name', 10);
      pointer('pointermove', 120, 20);

      expect(result.current.drag).toBeNull();
    });

    it('does not report a drop when the drag never took hold', () => {
      const { result, onDrop } = setup(null);
      grip(result, 'name', 'Name', 10);
      pointer('pointermove', 120, 20);
      pointer('pointerup');

      expect(onDrop).not.toHaveBeenCalled();
    });
  });

  // The listeners are on `document`, so they see every pointer movement in the
  // page, not just ones over a table.
  it('ignores pointer movement when no grip was ever taken', () => {
    const { result, onDrop } = setup();
    pointer('pointermove', 120, 20);
    pointer('pointerup');

    expect(result.current.drag).toBeNull();
    expect(onDrop).not.toHaveBeenCalled();
  });

  it('stops listening once unmounted', () => {
    const { result, onDrop, unmount } = setup();
    grip(result, 'name', 'Name', 10);
    unmount();
    pointer('pointermove', 120, 20);
    pointer('pointerup');

    expect(onDrop).not.toHaveBeenCalled();
  });
});
