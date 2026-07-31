import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Table, TableHead, TableHeader, TableRow } from './Table';
import { TableColumnBoundary } from './TableColumnBoundary';

const columns = [
  { key: 'deadline', label: 'Deadline' },
  { key: 'status', label: 'Status' },
  { key: 'tags', label: 'Tags' },
];

/** The boundary only exists inside a header cell, so every case renders one. */
const renderHead = (props: Record<string, unknown>) =>
  render(
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead {...props}>Subject</TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  );

const separator = () => screen.getByRole('separator', { name: 'Resize Subject' });

describe('TableColumnBoundary', () => {
  describe('when it exists at all', () => {
    it('renders nothing for a plain column', () => {
      renderHead({});
      expect(screen.queryByRole('separator')).not.toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders a resize line when resizable', () => {
      renderHead({ resizable: true, width: 200 });
      expect(separator()).toBeInTheDocument();
    });

    it('renders a line for inserting even when not resizable', () => {
      const { container } = renderHead({ insertColumns: columns, onInsert: vi.fn() });
      // No separator, because nothing here resizes - but the hover target for
      // the `+` still has to exist.
      expect(screen.queryByRole('separator')).not.toBeInTheDocument();
      expect(container.querySelector('th > div')).toBeInTheDocument();
    });
  });

  describe('resizing', () => {
    it('reports its width and bounds to a screen reader', () => {
      renderHead({ resizable: true, width: 220, minWidth: 100, maxWidth: 500 });
      const line = separator();
      expect(line).toHaveAttribute('aria-valuenow', '220');
      expect(line).toHaveAttribute('aria-valuemin', '100');
      expect(line).toHaveAttribute('aria-valuemax', '500');
      expect(line).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('is a separator rather than a button - it is a moveable boundary', () => {
      renderHead({ resizable: true, width: 200 });
      expect(separator().tagName).toBe('DIV');
      expect(screen.queryByRole('button', { name: /resize/i })).not.toBeInTheDocument();
    });

    it('moves one step per arrow press', async () => {
      const onResize = vi.fn();
      renderHead({ resizable: true, width: 200, onResize });
      await act(async () => {
        separator().focus();
      });
      await userEvent.keyboard('{ArrowRight}');
      expect(onResize).toHaveBeenCalledWith(216);
      await userEvent.keyboard('{ArrowLeft}');
      expect(onResize).toHaveBeenLastCalledWith(184);
    });

    it('jumps to the bounds on Home and End', async () => {
      const onResize = vi.fn();
      renderHead({ resizable: true, width: 200, minWidth: 90, maxWidth: 460, onResize });
      await act(async () => {
        separator().focus();
      });
      await userEvent.keyboard('{Home}');
      expect(onResize).toHaveBeenLastCalledWith(90);
      await userEvent.keyboard('{End}');
      expect(onResize).toHaveBeenLastCalledWith(460);
    });

    it('clamps to the bounds', async () => {
      const onResize = vi.fn();
      renderHead({ resizable: true, width: 100, minWidth: 96, onResize });
      await act(async () => {
        separator().focus();
      });
      await userEvent.keyboard('{ArrowLeft}');
      expect(onResize).toHaveBeenCalledWith(96);
    });

    it('ignores keys that are not a move', async () => {
      const onResize = vi.fn();
      renderHead({ resizable: true, width: 200, onResize });
      await act(async () => {
        separator().focus();
      });
      await userEvent.keyboard('{Escape}');
      expect(onResize).not.toHaveBeenCalled();
    });

    it('accepts a name of its own', () => {
      renderHead({ resizable: true, width: 200, resizeLabel: 'Resize the subject column' });
      expect(
        screen.getByRole('separator', { name: 'Resize the subject column' })
      ).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('ignores arrow keys on a line that does not resize', () => {
      const onResize = vi.fn();
      const { container } = renderHead({ insertColumns: columns, onInsert: vi.fn(), onResize });
      const line = container.querySelector('th > div') as HTMLElement;
      fireEvent.keyDown(line, { key: 'ArrowRight' });
      expect(onResize).not.toHaveBeenCalled();
    });

    it('measures the column when it has never been given a width', async () => {
      const onResize = vi.fn();
      renderHead({ resizable: true, minWidth: 70, onResize });
      await act(async () => {
        separator().focus();
      });
      await userEvent.keyboard('{ArrowRight}');
      // jsdom measures everything as zero, so this lands on the minimum - the
      // point is that it read a width rather than throwing on `undefined`.
      expect(onResize).toHaveBeenCalledWith(70);
    });

    it('accepts extra classes when used directly', () => {
      // `TableHead` sends its own `className` to the `<th>`, so this is only
      // reachable through the component itself - which is exported, so it is
      // a real path rather than a test-only one.
      render(<TableColumnBoundary resizable width={200} className="custom-line" />);
      expect(screen.getByRole('separator')).toHaveClass('custom-line');
    });
  });

  describe('the + during a drag', () => {
    const withCapture = (el: HTMLElement) => {
      const held = new Set<number>();
      el.setPointerCapture = (id: number) => held.add(id) as unknown as void;
      el.hasPointerCapture = (id: number) => held.has(id);
      el.releasePointerCapture = (id: number) => void held.delete(id);
    };

    it('goes away while the line is being dragged', async () => {
      renderHead({ resizable: true, width: 200, insertColumns: columns, onInsert: vi.fn() });
      const line = separator();
      withCapture(line);
      await userEvent.hover(line);
      expect(screen.getByRole('button', { name: /insert/i })).toBeInTheDocument();

      fireEvent.pointerDown(line, { pointerId: 1, clientX: 100 });
      fireEvent.pointerMove(line, { pointerId: 1, clientX: 220 });
      // It was measured before the drag started, so leaving it on screen would
      // strand it at the old edge - which is exactly what it used to do.
      expect(screen.queryByRole('button', { name: /insert/i })).not.toBeInTheDocument();
    });

    it('comes back once the drag ends', async () => {
      renderHead({ resizable: true, width: 200, insertColumns: columns, onInsert: vi.fn() });
      const line = separator();
      withCapture(line);
      await userEvent.hover(line);
      fireEvent.pointerDown(line, { pointerId: 1, clientX: 100 });
      fireEvent.pointerMove(line, { pointerId: 1, clientX: 220 });
      fireEvent.pointerUp(line, { pointerId: 1 });
      expect(await screen.findByRole('button', { name: /insert/i })).toBeInTheDocument();
    });

    it('comes back after a cancelled drag too', async () => {
      renderHead({ resizable: true, width: 200, insertColumns: columns, onInsert: vi.fn() });
      const line = separator();
      withCapture(line);
      await userEvent.hover(line);
      fireEvent.pointerDown(line, { pointerId: 1, clientX: 100 });
      fireEvent.pointerCancel(line, { pointerId: 1 });
      expect(await screen.findByRole('button', { name: /insert/i })).toBeInTheDocument();
    });
  });

  describe('when the header is not plain text', () => {
    /**
     * The default names are built from the header's text, so a header that is
     * markup rather than a string has to fall back to something generic rather
     * than to nothing at all.
     */
    const renderRich = () =>
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead resizable width={200} insertColumns={columns} onInsert={vi.fn()}>
                <em>Subject</em>
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );

    it('falls back to a generic resize name', () => {
      renderRich();
      expect(screen.getByRole('separator', { name: 'Resize column' })).toBeInTheDocument();
    });

    it('falls back to a generic insert name', async () => {
      renderRich();
      await userEvent.hover(screen.getByRole('separator', { name: 'Resize column' }));
      expect(screen.getByRole('button', { name: 'Insert a column here' })).toBeInTheDocument();
    });
  });

  describe('dragging', () => {
    /** jsdom implements no pointer capture, so the element has to fake it. */
    const withCapture = (el: HTMLElement) => {
      const held = new Set<number>();
      el.setPointerCapture = (id: number) => held.add(id) as unknown as void;
      el.hasPointerCapture = (id: number) => held.has(id);
      el.releasePointerCapture = (id: number) => void held.delete(id);
      return held;
    };

    it('reports a new width while the pointer moves', () => {
      const onResize = vi.fn();
      renderHead({ resizable: true, width: 200, onResize });
      const line = separator();
      withCapture(line);
      fireEvent.pointerDown(line, { pointerId: 1, clientX: 100 });
      fireEvent.pointerMove(line, { pointerId: 1, clientX: 180 });
      // jsdom measures every element as zero wide, so the start width is 0 and
      // the delta alone drives it - clamped to the minimum.
      expect(onResize).toHaveBeenCalledWith(80);
    });

    it('stops reporting once the pointer is up', () => {
      const onResize = vi.fn();
      renderHead({ resizable: true, width: 200, onResize });
      const line = separator();
      const held = withCapture(line);
      fireEvent.pointerDown(line, { pointerId: 1, clientX: 100 });
      fireEvent.pointerUp(line, { pointerId: 1 });
      expect(held.has(1)).toBe(false);
      onResize.mockClear();
      fireEvent.pointerMove(line, { pointerId: 1, clientX: 400 });
      expect(onResize).not.toHaveBeenCalled();
    });

    it('treats a cancelled pointer as the end of the drag', () => {
      const onResize = vi.fn();
      renderHead({ resizable: true, width: 200, onResize });
      const line = separator();
      withCapture(line);
      fireEvent.pointerDown(line, { pointerId: 1, clientX: 100 });
      fireEvent.pointerCancel(line, { pointerId: 1 });
      onResize.mockClear();
      fireEvent.pointerMove(line, { pointerId: 1, clientX: 400 });
      expect(onResize).not.toHaveBeenCalled();
    });

    it('ignores a drag on a line that does not resize', () => {
      const onResize = vi.fn();
      const { container } = renderHead({
        insertColumns: columns,
        onInsert: vi.fn(),
        onResize,
      });
      const line = container.querySelector('th > div') as HTMLElement;
      withCapture(line);
      fireEvent.pointerDown(line, { pointerId: 1, clientX: 100 });
      fireEvent.pointerMove(line, { pointerId: 1, clientX: 300 });
      expect(onResize).not.toHaveBeenCalled();
    });

    it('does nothing without a resize handler', () => {
      renderHead({ resizable: true, width: 200 });
      const line = separator();
      withCapture(line);
      expect(() => {
        fireEvent.pointerDown(line, { pointerId: 1, clientX: 100 });
        fireEvent.pointerMove(line, { pointerId: 1, clientX: 160 });
      }).not.toThrow();
    });
  });

  describe('the + following the table', () => {
    it('stays put through a scroll', async () => {
      renderHead({ resizable: true, insertColumns: columns, onInsert: vi.fn() });
      await userEvent.hover(separator());
      expect(screen.getByRole('button', { name: /insert/i })).toBeInTheDocument();
      fireEvent.scroll(window);
      fireEvent.resize(window);
      expect(screen.getByRole('button', { name: /insert/i })).toBeInTheDocument();
    });

    it('goes away once the pointer leaves for good', async () => {
      renderHead({ resizable: true, insertColumns: columns, onInsert: vi.fn() });
      await userEvent.hover(separator());
      expect(screen.getByRole('button', { name: /insert/i })).toBeInTheDocument();
      await userEvent.unhover(separator());
      await waitFor(() => {
        expect(screen.queryByRole('button', { name: /insert/i })).not.toBeInTheDocument();
      });
    });

    it('survives the pointer crossing the gap to reach it', async () => {
      renderHead({ resizable: true, insertColumns: columns, onInsert: vi.fn() });
      await userEvent.hover(separator());
      const plus = screen.getByRole('button', { name: /insert/i });
      await userEvent.unhover(separator());
      await userEvent.hover(plus);
      // A strict pointerleave would have taken it away on the way there.
      expect(screen.getByRole('button', { name: /insert/i })).toBeInTheDocument();
    });
  });

  describe('inserting', () => {
    it('shows no + until the boundary is hovered', () => {
      renderHead({ resizable: true, insertColumns: columns, onInsert: vi.fn() });
      expect(screen.queryByRole('button', { name: /insert/i })).not.toBeInTheDocument();
    });

    it('shows the + on hover, above the table', async () => {
      renderHead({ resizable: true, insertColumns: columns, onInsert: vi.fn() });
      await userEvent.hover(separator());
      expect(
        screen.getByRole('button', { name: 'Insert a column after Subject' })
      ).toBeInTheDocument();
    });

    it('shows the + on keyboard focus too', async () => {
      renderHead({ resizable: true, insertColumns: columns, onInsert: vi.fn() });
      await act(async () => {
        separator().focus();
      });
      expect(await screen.findByRole('button', { name: /insert/i })).toBeInTheDocument();
    });

    it('offers no + when there is nothing left to add', async () => {
      renderHead({ resizable: true, insertColumns: [], onInsert: vi.fn() });
      await userEvent.hover(separator());
      expect(screen.queryByRole('button', { name: /insert/i })).not.toBeInTheDocument();
    });

    it('offers no + without a handler', async () => {
      renderHead({ resizable: true, insertColumns: columns });
      await userEvent.hover(separator());
      expect(screen.queryByRole('button', { name: /insert/i })).not.toBeInTheDocument();
    });

    it('lists what can be added and reports the key', async () => {
      const onInsert = vi.fn();
      renderHead({ resizable: true, insertColumns: columns, onInsert });
      await userEvent.hover(separator());
      await userEvent.click(screen.getByRole('button', { name: /insert/i }));
      expect(screen.getByRole('option', { name: 'Deadline' })).toBeInTheDocument();
      await userEvent.click(screen.getByRole('option', { name: 'Status' }));
      expect(onInsert).toHaveBeenCalledWith('status');
    });

    it('lifts suggestions into their own group', async () => {
      renderHead({
        resizable: true,
        insertColumns: columns,
        insertSuggested: ['deadline'],
        onInsert: vi.fn(),
      });
      await userEvent.hover(separator());
      await userEvent.click(screen.getByRole('button', { name: /insert/i }));
      expect(screen.getByText('Suggested')).toBeInTheDocument();
      // Still in the full list - Suggested is a shortcut, not a filter.
      expect(screen.getAllByRole('option', { name: 'Deadline' })).toHaveLength(2);
    });

    it('shows no Suggested group when nothing matches', async () => {
      renderHead({
        resizable: true,
        insertColumns: columns,
        insertSuggested: ['nothingLikeThis'],
        onInsert: vi.fn(),
      });
      await userEvent.hover(separator());
      await userEvent.click(screen.getByRole('button', { name: /insert/i }));
      expect(screen.queryByText('Suggested')).not.toBeInTheDocument();
    });

    it('filters as you type, and says so when nothing matches', async () => {
      renderHead({ resizable: true, insertColumns: columns, onInsert: vi.fn() });
      await userEvent.hover(separator());
      await userEvent.click(screen.getByRole('button', { name: /insert/i }));
      await userEvent.type(screen.getByPlaceholderText('Search'), 'zzz');
      expect(screen.getByText('No columns left to add.')).toBeInTheDocument();
    });

    it('names the + after the position, not just the action', async () => {
      renderHead({
        resizable: true,
        insertColumns: columns,
        onInsert: vi.fn(),
        insertLabel: 'Insert between Subject and Status',
      });
      await userEvent.hover(separator());
      expect(
        screen.getByRole('button', { name: 'Insert between Subject and Status' })
      ).toBeInTheDocument();
    });
  });
});
