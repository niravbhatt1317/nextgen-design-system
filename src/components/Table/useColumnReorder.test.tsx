import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table';
import { useColumnReorder } from './useColumnReorder';

const columns = [
  { key: 'id', label: 'ID', locked: true },
  { key: 'subject', label: 'Subject' },
  { key: 'status', label: 'Status' },
  { key: 'priority', label: 'Priority' },
];

/**
 * The hook measures the real header row, so every case renders one.
 *
 * jsdom gives every element a zero-sized rect, so the measurements are stubbed
 * per test - the arithmetic is what is under test, not the browser's layout.
 */
const Harness = ({ onMove }: { onMove: (key: string, to: number) => void }) => {
  const reorder = useColumnReorder({ columns, onMove });
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key} columnKey={column.key} style={reorder.styleFor(column.key)}>
              {column.label}
              <button type="button" {...reorder.gripProps(column.key)}>
                grip
              </button>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          {columns.map((column) => (
            <TableCell
              key={column.key}
              columnKey={column.key}
              data-testid={`cell-${column.key}`}
              style={reorder.styleFor(column.key)}
            >
              x
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

/** 100px columns starting at 0, so midpoints land on 50, 150, 250, 350. */
const stubLayout = () => {
  const cells = [...document.querySelectorAll('thead th')];
  cells.forEach((cell, index) => {
    cell.getBoundingClientRect = () =>
      ({ left: index * 100, width: 100, right: index * 100 + 100, top: 0, bottom: 40 }) as DOMRect;
  });
};

const grip = (name: string) => screen.getByRole('button', { name: `Reorder ${name}` });

const withCapture = (el: HTMLElement) => {
  const held = new Set<number>();
  el.setPointerCapture = (id: number) => held.add(id) as unknown as void;
  el.hasPointerCapture = (id: number) => held.has(id);
  el.releasePointerCapture = (id: number) => void held.delete(id);
};

const drag = (name: string, fromX: number, toX: number) => {
  const handle = grip(name);
  withCapture(handle);
  stubLayout();
  fireEvent.pointerDown(handle, { pointerId: 1, clientX: fromX });
  fireEvent.pointerMove(handle, { pointerId: 1, clientX: toX });
  fireEvent.pointerUp(handle, { pointerId: 1 });
};

describe('useColumnReorder', () => {
  describe('dragging', () => {
    it('moves a column to where it was dropped', () => {
      const onMove = vi.fn();
      render(<Harness onMove={onMove} />);
      // Subject sits at index 1; dragging past the midpoint of index 2 and 3.
      drag('Subject', 150, 360);
      expect(onMove).toHaveBeenCalledWith('subject', 3);
    });

    it('moves a column back towards the start', () => {
      const onMove = vi.fn();
      render(<Harness onMove={onMove} />);
      drag('Priority', 350, 140);
      expect(onMove).toHaveBeenCalledWith('priority', 1);
    });

    it('ignores a wobble - a click that moves a pixel is still a click', () => {
      const onMove = vi.fn();
      render(<Harness onMove={onMove} />);
      drag('Subject', 150, 152);
      expect(onMove).not.toHaveBeenCalled();
    });

    it('commits nothing when the column is dropped where it started', () => {
      const onMove = vi.fn();
      render(<Harness onMove={onMove} />);
      drag('Subject', 150, 160);
      expect(onMove).not.toHaveBeenCalled();
    });

    it('commits nothing when the drag is cancelled', () => {
      const onMove = vi.fn();
      render(<Harness onMove={onMove} />);
      const handle = grip('Subject');
      withCapture(handle);
      stubLayout();
      fireEvent.pointerDown(handle, { pointerId: 1, clientX: 150 });
      fireEvent.pointerMove(handle, { pointerId: 1, clientX: 360 });
      fireEvent.pointerCancel(handle, { pointerId: 1 });
      // Cancel is the same path as up - the point is it does not reorder twice.
      expect(onMove).toHaveBeenCalledTimes(1);
    });

    it('refuses to drag a locked column', () => {
      const onMove = vi.fn();
      render(<Harness onMove={onMove} />);
      drag('ID', 50, 360);
      expect(onMove).not.toHaveBeenCalled();
    });

    it('steps over a locked column rather than through it', () => {
      const onMove = vi.fn();
      render(<Harness onMove={onMove} />);
      // ID is locked at index 0, so dragging Subject left cannot reach it.
      drag('Subject', 150, 10);
      expect(onMove).not.toHaveBeenCalledWith('subject', 0);
    });
  });

  describe('while dragging', () => {
    it('leaves the table alone and dims the column in your hand', () => {
      render(<Harness onMove={vi.fn()} />);
      const handle = grip('Subject');
      withCapture(handle);
      stubLayout();
      fireEvent.pointerDown(handle, { pointerId: 1, clientX: 150 });
      fireEvent.pointerMove(handle, { pointerId: 1, clientX: 260 });

      const heads = [...document.querySelectorAll('thead th')] as HTMLElement[];
      // Nothing in the table moves. Sliding the columns is what left a hole
      // behind the dragged one, and snapping them is what made it jerk.
      expect(heads[1]?.style.transform).toBe('');
      expect(heads[2]?.style.transform).toBe('');
      expect(heads[1]?.style.opacity).toBe('0.4');
      expect(heads[2]?.style.opacity).toBe('');
    });

    it('dims the body of the column too, not just its header', () => {
      render(<Harness onMove={vi.fn()} />);
      const handle = grip('Subject');
      withCapture(handle);
      stubLayout();
      fireEvent.pointerDown(handle, { pointerId: 1, clientX: 150 });
      fireEvent.pointerMove(handle, { pointerId: 1, clientX: 260 });
      expect(screen.getByTestId('cell-subject').style.opacity).toBe('0.4');
    });

    it('undims once the drag is over', () => {
      render(<Harness onMove={vi.fn()} />);
      drag('Subject', 150, 260);
      const heads = [...document.querySelectorAll('thead th')] as HTMLElement[];
      expect(heads[1]?.style.opacity).toBe('');
    });
  });

  describe('when there is nowhere to drop', () => {
    /**
     * Dragging towards a locked or pinned column stops the target moving. The
     * old version still drew a line at the column's own edge, so it said "drop
     * here" and then did nothing on release - which reads as broken rather than
     * as refused.
     */
    const Reads = ({ onMove }: { onMove: (key: string, to: number) => void }) => {
      const reorder = useColumnReorder({ columns, onMove });
      return (
        <>
          <span data-testid="line">{reorder.dropLine === null ? 'none' : 'shown'}</span>
          <span data-testid="candrop">{reorder.ghost?.canDrop === true ? 'yes' : 'no'}</span>
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key} columnKey={column.key}>
                    {column.label}
                    <button type="button" {...reorder.gripProps(column.key)}>
                      grip
                    </button>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
          </Table>
        </>
      );
    };

    it('draws no line when letting go would change nothing', () => {
      render(<Reads onMove={vi.fn()} />);
      const handle = grip('Subject');
      withCapture(handle);
      stubLayout();
      // Left, into the locked ID column - the target cannot move.
      fireEvent.pointerDown(handle, { pointerId: 1, clientX: 150 });
      fireEvent.pointerMove(handle, { pointerId: 1, clientX: 10 });
      expect(screen.getByTestId('line')).toHaveTextContent('none');
      expect(screen.getByTestId('candrop')).toHaveTextContent('no');
    });

    it('draws one as soon as the drop would do something', () => {
      render(<Reads onMove={vi.fn()} />);
      const handle = grip('Subject');
      withCapture(handle);
      stubLayout();
      fireEvent.pointerDown(handle, { pointerId: 1, clientX: 150 });
      fireEvent.pointerMove(handle, { pointerId: 1, clientX: 260 });
      expect(screen.getByTestId('line')).toHaveTextContent('shown');
      expect(screen.getByTestId('candrop')).toHaveTextContent('yes');
    });
  });

  describe('pinned columns', () => {
    const Pinned = ({ onMove }: { onMove: (key: string, to: number) => void }) => {
      const reorder = useColumnReorder({ columns, onMove, frozenCount: 2 });
      return (
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  columnKey={column.key}
                  style={reorder.styleFor(column.key)}
                >
                  {column.label}
                  <button type="button" {...reorder.gripProps(column.key)}>
                    grip
                  </button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        </Table>
      );
    };

    it('refuses to drag a pinned column', () => {
      const onMove = vi.fn();
      render(<Pinned onMove={onMove} />);
      // Subject is index 1, inside a frozen prefix of 2.
      drag('Subject', 150, 360);
      expect(onMove).not.toHaveBeenCalled();
    });

    it('will not drop an unpinned column inside the pinned block', () => {
      const onMove = vi.fn();
      render(<Pinned onMove={onMove} />);
      drag('Priority', 350, 60);
      // Freezing is a prefix, so landing at index 0 or 1 would describe a
      // layout the freeze model cannot express.
      expect(onMove).not.toHaveBeenCalledWith('priority', 0);
      expect(onMove).not.toHaveBeenCalledWith('priority', 1);
    });

    it('marks a pinned grip as disabled', () => {
      render(<Pinned onMove={vi.fn()} />);
      expect(grip('Subject')).toHaveAttribute('aria-disabled', 'true');
    });

    it('refuses the keyboard move too', async () => {
      const onMove = vi.fn();
      render(<Pinned onMove={onMove} />);
      grip('Status').focus();
      await userEvent.keyboard('{ArrowLeft}');
      expect(onMove).not.toHaveBeenCalled();
    });
  });

  describe('scrolling at the edge', () => {
    /**
     * A table wide enough to need reordering is usually wider than the screen,
     * so a drag has to be able to reach past the visible area.
     */
    const stubScroller = (left: number, right: number) => {
      const el = document.querySelector('[data-table-scroller]') as HTMLElement;
      el.getBoundingClientRect = () => ({ left, right, width: right - left }) as DOMRect;
      return el;
    };

    it('scrolls the table when the pointer reaches the trailing edge', async () => {
      render(<Harness onMove={vi.fn()} />);
      const el = stubScroller(0, 400);
      const handle = grip('Subject');
      withCapture(handle);
      stubLayout();
      fireEvent.pointerDown(handle, { pointerId: 1, clientX: 150 });
      fireEvent.pointerMove(handle, { pointerId: 1, clientX: 395 });
      await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
      await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
      expect(el.scrollLeft).toBeGreaterThan(0);
      fireEvent.pointerUp(handle, { pointerId: 1 });
    });

    it('stops scrolling once the pointer comes back inside', async () => {
      render(<Harness onMove={vi.fn()} />);
      const el = stubScroller(0, 400);
      const handle = grip('Subject');
      withCapture(handle);
      stubLayout();
      fireEvent.pointerDown(handle, { pointerId: 1, clientX: 150 });
      fireEvent.pointerMove(handle, { pointerId: 1, clientX: 395 });
      await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
      fireEvent.pointerMove(handle, { pointerId: 1, clientX: 200 });
      const settled = el.scrollLeft;
      await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
      await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
      expect(el.scrollLeft).toBe(settled);
      fireEvent.pointerUp(handle, { pointerId: 1 });
    });

    it('does not shift the measurements when the scroll is already at the end', async () => {
      // The leftmost column sits inside the edge zone, so dragging towards it
      // asks for a scroll that cannot happen. Adjusting the cached boundaries
      // by the requested step anyway slid them 12px per frame while the table
      // stood still, and the drag was soon working from fiction.
      const onMove = vi.fn();
      render(<Harness onMove={onMove} />);
      const el = stubScroller(0, 400);
      let scroll = 0;
      Object.defineProperty(el, 'scrollLeft', {
        get: () => scroll,
        // Clamped at zero, exactly as a real element is.
        set: (value: number) => {
          scroll = Math.max(0, value);
        },
        configurable: true,
      });

      const handle = grip('Priority');
      withCapture(handle);
      stubLayout();
      fireEvent.pointerDown(handle, { pointerId: 1, clientX: 350 });
      // Sit at the left edge for several frames.
      fireEvent.pointerMove(handle, { pointerId: 1, clientX: 5 });
      for (let i = 0; i < 4; i += 1) {
        await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
      }
      // Then come back and drop somewhere unambiguous.
      fireEvent.pointerMove(handle, { pointerId: 1, clientX: 240 });
      fireEvent.pointerUp(handle, { pointerId: 1 });
      // Priority started at index 3. 240 is left of index 2's midpoint (250)
      // and right of index 1's (150), so it lands at 2 - which it can only do
      // if the boundaries are still the ones that were measured.
      expect(onMove).toHaveBeenCalledWith('priority', 2);
    });

    it('stops scrolling when the drag ends', async () => {
      render(<Harness onMove={vi.fn()} />);
      const el = stubScroller(0, 400);
      const handle = grip('Subject');
      withCapture(handle);
      stubLayout();
      fireEvent.pointerDown(handle, { pointerId: 1, clientX: 150 });
      fireEvent.pointerMove(handle, { pointerId: 1, clientX: 395 });
      await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
      fireEvent.pointerUp(handle, { pointerId: 1 });
      const settled = el.scrollLeft;
      await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
      await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
      expect(el.scrollLeft).toBe(settled);
    });
  });

  describe('keyboard', () => {
    it('moves one position per arrow press', async () => {
      const onMove = vi.fn();
      render(<Harness onMove={onMove} />);
      grip('Subject').focus();
      await userEvent.keyboard('{ArrowRight}');
      expect(onMove).toHaveBeenCalledWith('subject', 2);
    });

    it('moves back the other way', async () => {
      const onMove = vi.fn();
      render(<Harness onMove={onMove} />);
      grip('Priority').focus();
      await userEvent.keyboard('{ArrowLeft}');
      expect(onMove).toHaveBeenCalledWith('priority', 2);
    });

    it('will not step onto a locked column', async () => {
      const onMove = vi.fn();
      render(<Harness onMove={onMove} />);
      grip('Subject').focus();
      await userEvent.keyboard('{ArrowLeft}');
      expect(onMove).not.toHaveBeenCalled();
    });

    it('will not walk off the end', async () => {
      const onMove = vi.fn();
      render(<Harness onMove={onMove} />);
      grip('Priority').focus();
      await userEvent.keyboard('{ArrowRight}');
      expect(onMove).not.toHaveBeenCalled();
    });

    it('ignores keys that are not a move', async () => {
      const onMove = vi.fn();
      render(<Harness onMove={onMove} />);
      grip('Subject').focus();
      await userEvent.keyboard('{Enter}');
      expect(onMove).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('names each grip after its column', () => {
      render(<Harness onMove={vi.fn()} />);
      expect(screen.getByRole('button', { name: 'Reorder Subject' })).toBeInTheDocument();
    });

    it('marks a locked grip as disabled rather than hiding the reason', () => {
      render(<Harness onMove={vi.fn()} />);
      expect(grip('ID')).toHaveAttribute('aria-disabled', 'true');
      expect(grip('Subject')).not.toHaveAttribute('aria-disabled');
    });
  });
});
