import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent, RefObject } from 'react';

export interface ColumnDragState {
  key: string;
  label: string;
  /** Pointer position, for the ghost heading. */
  x: number;
  y: number;
  /** Where the 2px line goes, in viewport px; the top and height of the scroll region. */
  lineX: number;
  lineTop: number;
  lineHeight: number;
  /** The column the dragged one would land before; `null` means the end. */
  beforeKey: string | null;
}

export interface UseColumnDragOptions {
  /** The scrolling region that holds the table. Headings inside it carry `data-movable` and `data-key`. */
  viewportRef: RefObject<HTMLElement | null>;
  onDrop: (key: string, beforeKey: string | null) => void;
}

export interface UseColumnDrag {
  drag: ColumnDragState | null;
  /** Attach to a heading's grip. Nothing happens until the pointer has moved 4px. */
  gripPointerDown: (
    key: string,
    label: string
  ) => (event: ReactPointerEvent<HTMLButtonElement>) => void;
}

const THRESHOLD = 4;
const EDGE = 48;
const STEP = 12;

/**
 * Drag a heading to a new place: the column dims, a copy of the heading follows
 * the pointer, a 2px line marks the landing, the region scrolls when the pointer
 * nears an edge. The frozen columns are never targets, so they cannot be passed.
 */
export function useColumnDrag({ viewportRef, onDrop }: UseColumnDragOptions): UseColumnDrag {
  const [drag, setDrag] = useState<ColumnDragState | null>(null);
  const pending = useRef<{ key: string; label: string; startX: number } | null>(null);
  const live = useRef<ColumnDragState | null>(null);

  const targets = useCallback(() => {
    const root = viewportRef.current;
    if (!root) return [];
    return Array.from(root.querySelectorAll<HTMLElement>('th[data-movable="true"][data-key]')).map(
      (th) => ({
        key: th.dataset.key ?? '',
        rect: th.getBoundingClientRect(),
      })
    );
  }, [viewportRef]);

  const place = useCallback(
    (key: string, label: string, x: number, y: number): ColumnDragState | null => {
      const root = viewportRef.current;
      if (!root) return null;
      const ts = targets();
      if (ts.length === 0) return null;
      const vr = root.getBoundingClientRect();
      let idx = ts.length;
      for (let i = 0; i < ts.length; i++) {
        const t = ts[i];
        if (t && x < t.rect.left + t.rect.width / 2) {
          idx = i;
          break;
        }
      }
      const target = ts[idx];
      const last = ts[ts.length - 1];
      const lineX = target ? target.rect.left : last ? last.rect.right : vr.left;
      const beforeKey = target ? target.key : null;
      if (x > vr.right - EDGE) root.scrollLeft += STEP;
      else if (x < vr.left + EDGE && root.scrollLeft > 0) root.scrollLeft -= STEP;
      return {
        key,
        label,
        x,
        y,
        lineX: Math.min(Math.max(lineX, vr.left), vr.right) - 1,
        lineTop: vr.top,
        lineHeight: vr.height,
        beforeKey: beforeKey === key ? key : beforeKey,
      };
    },
    [targets, viewportRef]
  );

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const p = pending.current;
      if (p && !live.current) {
        if (Math.abs(e.clientX - p.startX) < THRESHOLD) return;
        live.current = place(p.key, p.label, e.clientX, e.clientY);
        setDrag(live.current);
        return;
      }
      if (live.current) {
        live.current = place(live.current.key, live.current.label, e.clientX, e.clientY);
        setDrag(live.current);
      }
    };
    const up = () => {
      const d = live.current;
      pending.current = null;
      live.current = null;
      setDrag(null);
      if (d && d.beforeKey !== d.key) onDrop(d.key, d.beforeKey);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
    document.addEventListener('pointercancel', up);
    return () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      document.removeEventListener('pointercancel', up);
    };
  }, [place, onDrop]);

  const gripPointerDown = useCallback(
    (key: string, label: string) => (event: ReactPointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      pending.current = { key, label, startX: event.clientX };
    },
    []
  );

  return { drag, gripPointerDown };
}
