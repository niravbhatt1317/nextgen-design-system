import { useCallback, useMemo, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent, PointerEvent } from 'react';

/** How near the edge the pointer has to get before the table scrolls itself. */
const EDGE = 48;

/** How fast it scrolls once it does, in pixels per frame. */
const EDGE_SPEED = 12;

/** A column being measured, in display order. */
interface Measured {
  key: string;
  left: number;
  width: number;
}

export interface UseColumnReorderOptions<K extends string = string> {
  /** The visible columns, in display order. */
  columns: { key: K; label: string; locked?: boolean }[];

  /** Called once, on drop, with where the column ended up. */
  onMove: (key: K, toIndex: number) => void;

  /**
   * How many leading columns are pinned.
   *
   * A pinned column cannot be dragged and cannot be displaced. Freezing is a
   * prefix - the pinned columns are the *first* n - so dropping one into the
   * middle of the block, or an unpinned column inside it, would leave a layout
   * the freeze model cannot describe.
   *
   * @default 0
   */
  frozenCount?: number;

  /**
   * How far the pointer must travel before it counts as a drag.
   *
   * Without it a click on the grip that wobbles by a pixel reorders the table,
   * which is a horrible way to lose a layout you spent a minute arranging.
   *
   * @default 4
   */
  threshold?: number;
}

export interface ColumnGripProps {
  onPointerDown: (event: PointerEvent<HTMLElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLElement>) => void;
  onPointerCancel: (event: PointerEvent<HTMLElement>) => void;
  onKeyDown: (event: ReactKeyboardEvent<HTMLElement>) => void;
  'aria-label': string;
  'aria-disabled'?: true;
}

export interface UseColumnReorder<K extends string = string> {
  /** The column currently being dragged, if any. */
  dragging: K | null;

  /** Where it would land if you let go now. */
  targetIndex: number | null;

  /** Handlers and a name for a column's drag grip. */
  gripProps: (key: K) => ColumnGripProps;

  /** What a cell of this column should look like right now. */
  styleFor: (key: K) => CSSProperties;

  /** Whether this column is the one being dragged. */
  isDragging: (key: K) => boolean;

  /**
   * The floating copy that follows the cursor, or null when nothing is being
   * dragged. Render it `position: fixed` at `left`/`top`.
   */
  ghost: {
    key: K;
    label: string;
    left: number;
    top: number;
    width: number;
    canDrop: boolean;
  } | null;

  /** Viewport x for the line showing where it would land, or null. */
  dropLine: number | null;
}

const DEFAULT_THRESHOLD = 4;

/**
 * Drag a column sideways to move it.
 *
 * **The table holds still and a ghost moves.** Two earlier versions of this did
 * something cleverer and both felt wrong:
 *
 * - Letting the dragged column follow the pointer left a **hole** behind it -
 *   nothing else moved until the pointer crossed the next midpoint, so up to a
 *   full column of empty table sat where it came from.
 * - Snapping it to the slot it would land in closed the hole but **jerked**: it
 *   sat still while the pointer moved, then jumped a whole column at once.
 *
 * So nothing in the table moves during a drag. A copy of the header follows the
 * cursor, a line marks where it will land, and the column it came from dims.
 * The only thing animating is one absolutely-positioned element that never
 * touches layout, which is why it cannot stutter.
 *
 * **Nothing is committed until you let go.** The order changes once, on drop,
 * so an abandoned drag costs nothing and undo has one thing to undo.
 *
 * Keyboard: focus a grip and use the arrow keys. One position per press,
 * committed immediately - there is no "let go" to commit on.
 *
 * @example
 * ```tsx
 * const reorder = useColumnReorder({
 *   columns: cols.visible,
 *   frozenCount: cols.frozenCount,
 *   onMove: (key, to) => { cols.move(key, to); },
 * });
 * ```
 */
export function useColumnReorder<K extends string>({
  columns,
  onMove,
  frozenCount = 0,
  threshold = DEFAULT_THRESHOLD,
}: UseColumnReorderOptions<K>): UseColumnReorder<K> {
  const [dragging, setDragging] = useState<K | null>(null);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  const start = useRef<{ key: K; from: number; x: number; measured: Measured[] } | null>(null);
  const armed = useRef(false);
  const scroller = useRef<HTMLElement | null>(null);
  const autoScroll = useRef<number | null>(null);

  const indexOf = useCallback(
    (key: K) => columns.findIndex((column) => column.key === key),
    [columns]
  );

  /** Locked or pinned: either way it does not move, and nothing moves past it. */
  const isFixed = useCallback(
    (index: number) => index < frozenCount || columns[index]?.locked === true,
    [columns, frozenCount]
  );

  const measure = useCallback((element: HTMLElement): Measured[] => {
    const row = element.closest('tr');
    if (!row) return [];
    return [...row.children].map((cell) => {
      const rect = cell.getBoundingClientRect();
      return {
        key: (cell as HTMLElement).dataset.columnKey ?? '',
        left: rect.left,
        width: rect.width,
      };
    });
  }, []);

  const stopScrolling = () => {
    if (autoScroll.current !== null) cancelAnimationFrame(autoScroll.current);
    autoScroll.current = null;
  };

  /**
   * Scrolls the table while the pointer sits near an edge.
   *
   * Without it a column can only be dragged as far as the visible area, which
   * in a table wide enough to need reordering is usually not far enough. The
   * measurements are re-read as it scrolls, so the target keeps up.
   */
  const edgeScroll = (clientX: number) => {
    const el = scroller.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const step =
      clientX < rect.left + EDGE ? -EDGE_SPEED : clientX > rect.right - EDGE ? EDGE_SPEED : 0;
    if (step === 0) {
      stopScrolling();
      return;
    }
    if (autoScroll.current !== null) return;
    const tick = () => {
      const target = scroller.current;
      const from = start.current;
      if (!target || !from) return;

      // Shift the measurements by what actually scrolled, not by what was
      // asked for.
      //
      // At either end `scrollLeft` is clamped and does not move - and the
      // leftmost column is inside the edge zone, so dragging towards it starts
      // a scroll that cannot happen. Adjusting by the requested step anyway
      // slid every cached boundary 12px per frame while the table stood still,
      // and within a moment the whole drag was working from fiction.
      const before = target.scrollLeft;
      target.scrollLeft += step;
      const actual = target.scrollLeft - before;
      if (actual === 0) {
        stopScrolling();
        return;
      }

      // The columns have moved under the pointer, so where it would land has
      // changed even though the pointer has not.
      from.measured = from.measured.map((cell) => ({ ...cell, left: cell.left - actual }));
      autoScroll.current = requestAnimationFrame(tick);
    };
    autoScroll.current = requestAnimationFrame(tick);
  };

  const reset = () => {
    stopScrolling();
    scroller.current = null;
    start.current = null;
    armed.current = false;
    setDragging(null);
    setTargetIndex(null);
    setPointer(null);
  };

  const handlePointerDown = (key: K) => (event: PointerEvent<HTMLElement>) => {
    if (isFixed(indexOf(key))) return;
    const measured = measure(event.currentTarget);
    if (measured.length === 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    scroller.current = event.currentTarget.closest<HTMLElement>('[data-table-scroller]');
    start.current = { key, from: indexOf(key), x: event.clientX, measured };
    armed.current = false;
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const from = start.current;
    if (!from) return;
    const dx = event.clientX - from.x;

    // A click that wobbles is still a click.
    if (!armed.current) {
      if (Math.abs(dx) < threshold) return;
      armed.current = true;
      setDragging(from.key);
    }
    setPointer({ x: event.clientX, y: event.clientY });
    edgeScroll(event.clientX);

    // Where it would land: the column whose midpoint the pointer has passed.
    const pointer = from.x + dx;
    let target = from.from;
    from.measured.forEach((cell, index) => {
      if (isFixed(index)) return;
      const middle = cell.left + cell.width / 2;
      if (index < from.from && pointer < middle) target = Math.min(target, index);
      if (index > from.from && pointer > middle) target = Math.max(target, index);
    });
    setTargetIndex(target);
  };

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    const from = start.current;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (from && armed.current && targetIndex !== null && targetIndex !== from.from) {
      onMove(from.key, targetIndex);
    }
    reset();
  };

  const handleKeyDown = (key: K) => (event: ReactKeyboardEvent<HTMLElement>) => {
    const step = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0;
    if (step === 0) return;
    const from = indexOf(key);
    const to = from + step;
    if (from < 0 || to < 0 || to >= columns.length) return;
    // Stepping onto a pinned or locked column would silently do nothing.
    if (isFixed(from) || isFixed(to)) return;
    event.preventDefault();
    onMove(key, to);
  };

  const gripProps = useCallback(
    (key: K): ColumnGripProps => {
      const index = indexOf(key);
      const column = columns[index];
      const locked = isFixed(index);
      return {
        onPointerDown: handlePointerDown(key),
        onPointerMove: handlePointerMove,
        onPointerUp: handlePointerUp,
        onPointerCancel: handlePointerUp,
        onKeyDown: handleKeyDown(key),
        'aria-label': `Reorder ${column?.label ?? key}`,
        ...(locked ? { 'aria-disabled': true as const } : {}),
      };
    },
    // The handlers close over `columns` and `targetIndex`, both of which change
    // during a drag - rebuilding them every render is the cheap, correct thing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columns, indexOf, targetIndex]
  );

  const styleFor = useCallback(
    (key: K): CSSProperties => {
      // The column does not move. It used to follow the pointer, which left a
      // hole where it came from, and then it snapped between slots instead,
      // which sat still and jumped a whole column at a time. Neither is smooth.
      //
      // So the table holds still and the *ghost* moves: the only thing
      // animating is one absolutely-positioned element, which cannot stutter
      // because it never touches layout. The column it came from dims to say
      // "this is the one in your hand".
      if (dragging === null || key !== dragging) return {};
      return { opacity: 0.4 };
    },
    [dragging]
  );

  /**
   * A copy of the dragged header, following the cursor.
   *
   * `left`/`top` are viewport coordinates, so it wants `position: fixed`.
   */
  const ghost = useMemo(() => {
    const from = start.current;
    if (dragging === null || from === null || pointer === null) return null;
    const cell = from.measured[from.from];
    if (!cell) return null;
    return {
      key: dragging,
      label: columns[from.from]?.label ?? dragging,
      left: pointer.x,
      top: pointer.y,
      width: cell.width,
      // Whether letting go here would do anything. The ghost is the thing under
      // the cursor, so it is where "you cannot put it there" belongs.
      canDrop: targetIndex !== null && targetIndex !== from.from,
    };
  }, [dragging, pointer, columns, targetIndex]);

  /**
   * Where the column would land, as a viewport x for a vertical line.
   *
   * A line rather than the columns stepping aside: the columns cannot step
   * aside without leaving a hole behind the one being dragged, and a line says
   * the same thing without moving anything.
   */
  const dropLine = useMemo(() => {
    const from = start.current;
    if (dragging === null || from === null || targetIndex === null) return null;
    // No line when letting go would change nothing.
    //
    // This is what a locked or pinned column feels like from the outside: drag
    // towards one and the target stops moving, so a line drawn at the column's
    // own edge says "drop here", and then releasing does nothing. The absence
    // of a line is the honest answer - there is nowhere to put it.
    if (targetIndex === from.from) return null;
    const cell = from.measured[targetIndex];
    if (!cell) return null;
    return targetIndex > from.from ? cell.left + cell.width : cell.left;
  }, [dragging, targetIndex]);

  const isDragging = useCallback((key: K) => dragging === key, [dragging]);

  return { dragging, targetIndex, gripProps, styleFor, isDragging, ghost, dropLine };
}
