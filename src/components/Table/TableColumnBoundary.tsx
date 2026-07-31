import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../Command';
import { Icon } from '../Icon';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import type { TableColumnBoundaryProps } from './Table.types';

/** How far one arrow-key press moves a column edge. */
const RESIZE_STEP = 16;

/** How long the button survives the pointer leaving, so you can reach it. */
const REACH_MS = 160;

/** The gap between the top of the table and the button sitting above it. */
const BUTTON_GAP = 6;

const HANDLE = [
  'mdt-absolute mdt-right-0 mdt-top-0 mdt-h-full mdt-w-2',
  'mdt-cursor-col-resize mdt-touch-none mdt-select-none',
  'focus-visible:mdt-outline-none',
  // The visible line lives in ::after so the grab area can stay wider than it.
  "after:mdt-absolute after:mdt-inset-y-1 after:mdt-right-0 after:mdt-w-px after:mdt-bg-border after:mdt-opacity-0 after:mdt-transition-opacity after:mdt-content-['']",
  'hover:after:mdt-opacity-100 focus-visible:after:mdt-opacity-100',
  'focus-visible:after:mdt-bg-ring focus-visible:after:mdt-w-0.5',
].join(' ');

/** While the boundary is live, the line reaches the full height and darkens. */
const HANDLE_ACTIVE = 'after:mdt-inset-y-0 after:mdt-bg-ring after:mdt-opacity-100';

const BUTTON = [
  'mdt-fixed mdt-z-popover mdt-flex mdt-h-5 mdt-w-5 mdt-items-center mdt-justify-center',
  'mdt-rounded-sm mdt-border mdt-border-border mdt-bg-background mdt-text-muted-foreground',
  'mdt-shadow-sm hover:mdt-text-foreground',
  'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring',
].join(' ');

/**
 * TableColumnBoundary - one line between two columns, doing both jobs.
 *
 * Drag it to resize the column on its left. Use the `+` above it to add a
 * column at that position. It is one affordance because it is one boundary:
 * two separate controls on the same pixels - a drag target and a click
 * target - cannot be told apart by anyone using them, and the first version of
 * this had exactly that problem.
 *
 * **The `+` sits above the table, and that needs a portal.** The table lives in
 * an `overflow-auto` container so it can scroll sideways, and CSS forces the
 * other axis to clip as soon as one does - so nothing drawn above the header
 * can escape the container by styling alone. It is positioned `fixed` against
 * the measured boundary instead, and follows scrolling while it is visible.
 *
 * **The button survives the pointer leaving for a moment.** It sits above the
 * table with a gap under it, and a strict `pointerleave` would take it away as
 * you moved towards it.
 *
 * Resizing keeps the ARIA window-splitter pattern: a focusable `separator`
 * carrying `aria-valuenow`, not a button, because that is what a moveable
 * boundary is.
 */
const TableColumnBoundary = ({
  resizable = false,
  width,
  onResize,
  minWidth = 64,
  maxWidth = 720,
  resizeLabel,
  columns = [],
  suggested = [],
  onInsert,
  insertLabel,
  className,
}: TableColumnBoundaryProps) => {
  const handleRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef<{ startX: number; startWidth: number } | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [open, setOpen] = useState(false);
  const [spot, setSpot] = useState<{ left: number; top: number } | null>(null);

  const canInsert = onInsert !== undefined && columns.length > 0;
  const live = hovered || open;

  const place = useCallback(() => {
    const handle = handleRef.current;
    if (!handle) return;
    const rect = handle.getBoundingClientRect();
    // Anchor to the top of the table, not the header cell: the button belongs
    // to the table's edge, and a sticky header would otherwise drag it down
    // the page as the body scrolls.
    const table = handle.closest('table')?.getBoundingClientRect();
    setSpot({ left: rect.right, top: (table?.top ?? rect.top) - BUTTON_GAP });
  }, []);

  // `width` is in the dependencies on purpose: the boundary moves whenever the
  // column is resized, and a button measured once on hover would stay behind at
  // the old edge. Re-measuring when the width changes puts it back where the
  // line actually is.
  useEffect(() => {
    if (!live || !canInsert) return undefined;
    place();
    const onMove = () => {
      place();
    };
    window.addEventListener('scroll', onMove, true);
    window.addEventListener('resize', onMove);
    return () => {
      window.removeEventListener('scroll', onMove, true);
      window.removeEventListener('resize', onMove);
    };
  }, [live, canInsert, place, width, dragging]);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    []
  );

  const hold = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    // With nothing to insert there is no `+` to show, so hovering a
    // resize-only line should not cost a render at all.
    if (!canInsert) return;
    setHovered(true);
  };

  const release = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    // Nothing is showing, so there is nothing to schedule away. Without this a
    // blur on a boundary that was never hovered still queues a state update.
    if (!hovered) return;
    closeTimer.current = setTimeout(() => {
      setHovered(false);
    }, REACH_MS);
  };

  const applyWidth = (next: number) => {
    onResize?.(Math.round(Math.min(Math.max(next, minWidth), maxWidth)));
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!resizable) return;
    const cell = handleRef.current?.closest('th');
    if (!cell) return;
    // Pointer capture keeps the drag alive when the cursor leaves the 8px
    // handle, which it does immediately.
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { startX: event.clientX, startWidth: cell.getBoundingClientRect().width };
    setDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    applyWidth(drag.current.startWidth + (event.clientX - drag.current.startX));
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    drag.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!resizable) return;
    const current =
      width ?? handleRef.current?.closest('th')?.getBoundingClientRect().width ?? minWidth;
    const moves: Record<string, number> = {
      ArrowLeft: current - RESIZE_STEP,
      ArrowRight: current + RESIZE_STEP,
      Home: minWidth,
      End: maxWidth,
    };
    const next = moves[event.key];
    if (next === undefined) return;
    event.preventDefault();
    applyWidth(next);
  };

  const insert = (key: string) => {
    setOpen(false);
    setHovered(false);
    onInsert?.(key);
  };

  const suggestedColumns = columns.filter((column) => suggested.includes(column.key));

  return (
    <>
      {/*
        A focusable separator IS a widget - ARIA defines exactly this for a
        moveable boundary, and the window-splitter pattern requires it to take
        focus and handle arrow keys. jsx-a11y only knows the static `<hr>` sense
        of the role, so it reads the tabIndex and the handlers as mistakes.
        Rendering a button instead would be the real mistake: it is not a
        button, and a screen reader would lose aria-valuenow.

        When it is not resizable it is a hover target with no behaviour of its
        own - the `+` above it carries all of that, and is a real button.
      */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        ref={handleRef}
        role={resizable ? 'separator' : undefined}
        aria-orientation={resizable ? 'vertical' : undefined}
        aria-label={resizable ? (resizeLabel ?? 'Resize column') : undefined}
        aria-valuenow={resizable ? Math.round(width ?? 0) : undefined}
        aria-valuemin={resizable ? minWidth : undefined}
        aria-valuemax={resizable ? maxWidth : undefined}
        tabIndex={resizable ? 0 : undefined}
        onPointerEnter={hold}
        onPointerLeave={release}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={handleKeyDown}
        onFocus={hold}
        onBlur={release}
        className={cn(HANDLE, !resizable && 'mdt-cursor-default', live && HANDLE_ACTIVE, className)}
      />

      {/*
        Hidden while the line is being dragged, and measured again when it
        stops. Following the cursor would be busier, and it would slide a click
        target under the pointer mid-drag; going away and coming back at the new
        edge is calmer and cannot end up in the wrong place.
      */}
      {canInsert &&
        live &&
        !dragging &&
        spot !== null &&
        createPortal(
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                aria-label={insertLabel ?? 'Insert a column here'}
                onPointerEnter={hold}
                onPointerLeave={release}
                style={{ left: spot.left, top: spot.top, transform: 'translate(-50%, -100%)' }}
                className={BUTTON}
              >
                <Icon name="plus" size="xs" aria-hidden />
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="mdt-w-64 mdt-p-0">
              <Command>
                <CommandInput placeholder="Search" />
                <CommandList>
                  <CommandEmpty>No columns left to add.</CommandEmpty>
                  {suggestedColumns.length > 0 && (
                    <>
                      {/*
                        Which columns are worth suggesting is the product's
                        knowledge, not ours - it depends on the data and on what
                        people open this table to do.
                      */}
                      <CommandGroup heading="Suggested">
                        {suggestedColumns.map((column) => (
                          <CommandItem
                            key={column.key}
                            value={`suggested-${column.key}`}
                            onSelect={() => {
                              insert(column.key);
                            }}
                          >
                            {column.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      <CommandSeparator />
                    </>
                  )}
                  <CommandGroup heading="All columns">
                    {columns.map((column) => (
                      <CommandItem
                        key={column.key}
                        value={column.label}
                        onSelect={() => {
                          insert(column.key);
                        }}
                      >
                        {column.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>,
          document.body
        )}
    </>
  );
};

TableColumnBoundary.displayName = 'TableColumnBoundary';

export { TableColumnBoundary };
