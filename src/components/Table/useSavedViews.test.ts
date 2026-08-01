import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useSavedViews } from './useSavedViews';
import type { TableView } from './useSavedViews';

interface State {
  sort: string;
}

const stored: TableView<State>[] = [
  { id: 'a', name: 'Open tickets', state: { sort: 'created' } },
  { id: 'b', name: 'Mine', state: { sort: 'priority' } },
];

/** Renders with a `current` that the test can change, which is what dirtiness reads. */
const setup = (current: State = { sort: 'created' }, options = {}) =>
  renderHook(({ live }) => useSavedViews<State>({ current: live, initial: stored, ...options }), {
    initialProps: { live: current },
  });

describe('useSavedViews', () => {
  describe('starting state', () => {
    it('starts with the views it was given and none active', () => {
      const { result } = setup();
      expect(result.current.views).toHaveLength(2);
      expect(result.current.active).toBeNull();
      expect(result.current.activeId).toBeNull();
    });

    it('starts on a view when told to', () => {
      const { result } = renderHook(() =>
        useSavedViews<State>({
          current: { sort: 'created' },
          initial: stored,
          initialActiveId: 'b',
        })
      );
      expect(result.current.active?.name).toBe('Mine');
    });

    it('starts empty', () => {
      const { result } = renderHook(() => useSavedViews<State>({ current: { sort: 'created' } }));
      expect(result.current.views).toEqual([]);
    });

    it('ignores a later change to the initial list', () => {
      const { result, rerender } = renderHook(
        ({ initial }) => useSavedViews<State>({ current: { sort: 'created' }, initial }),
        { initialProps: { initial: stored } }
      );
      rerender({ initial: [] });
      // Captured once, like every other Table hook: re-reading it would wipe a
      // view someone saved the moment the parent re-rendered for any reason.
      expect(result.current.views).toHaveLength(2);
    });
  });

  describe('dirty', () => {
    it('is false with no active view', () => {
      const { result } = setup({ sort: 'nothing like the stored ones' });
      expect(result.current.dirty).toBe(false);
    });

    it('is false while the table still matches the active view', () => {
      const { result } = setup();
      act(() => {
        result.current.apply('a');
      });
      expect(result.current.dirty).toBe(false);
    });

    it('turns true when the table moves away, and false again when it comes back', () => {
      const { result, rerender } = setup();
      act(() => {
        result.current.apply('a');
      });
      rerender({ live: { sort: 'priority' } });
      expect(result.current.dirty).toBe(true);
      // Compared rather than flagged: changing something back is not a change,
      // and a marker that says otherwise teaches people to ignore it.
      rerender({ live: { sort: 'created' } });
      expect(result.current.dirty).toBe(false);
    });

    it('takes a comparison of its own', () => {
      const { result, rerender } = renderHook(
        ({ live }) =>
          useSavedViews<State>({
            current: live,
            initial: stored,
            initialActiveId: 'a',
            isSame: () => true,
          }),
        { initialProps: { live: { sort: 'created' } } }
      );
      rerender({ live: { sort: 'anything at all' } });
      expect(result.current.dirty).toBe(false);
    });
  });

  describe('applying', () => {
    it('hands back the state to restore', () => {
      const { result } = setup();
      let state: State | null = null;
      act(() => {
        state = result.current.apply('b');
      });
      expect(state).toEqual({ sort: 'priority' });
      expect(result.current.activeId).toBe('b');
    });

    it('does nothing for an id that is not there', () => {
      const { result } = setup();
      let state: State | null = { sort: 'untouched' };
      act(() => {
        state = result.current.apply('nope');
      });
      expect(state).toBeNull();
      expect(result.current.activeId).toBeNull();
    });

    it('leaves the current view without changing anything', () => {
      const { result } = setup();
      act(() => {
        result.current.apply('a');
      });
      act(() => {
        result.current.clearActive();
      });
      expect(result.current.activeId).toBeNull();
      expect(result.current.views).toHaveLength(2);
    });
  });

  describe('saving', () => {
    it('overwrites the active view with the live state', () => {
      const onChange = vi.fn();
      const { result, rerender } = renderHook(
        ({ live }) =>
          useSavedViews<State>({ current: live, initial: stored, initialActiveId: 'a', onChange }),
        { initialProps: { live: { sort: 'created' } } }
      );
      rerender({ live: { sort: 'assignee' } });
      act(() => {
        result.current.save();
      });
      expect(result.current.views[0]?.state).toEqual({ sort: 'assignee' });
      expect(result.current.dirty).toBe(false);
      expect(onChange).toHaveBeenCalledWith(result.current.views);
    });

    it('does nothing with no active view', () => {
      const onChange = vi.fn();
      const { result } = setup({ sort: 'created' }, { onChange });
      act(() => {
        result.current.save();
      });
      expect(result.current.views).toEqual(stored);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('saves the live state as a new view and makes it active', () => {
      const onChange = vi.fn();
      const { result } = setup({ sort: 'assignee' }, { onChange });
      act(() => {
        result.current.saveAs('Unassigned');
      });
      expect(result.current.views).toHaveLength(3);
      expect(result.current.active?.name).toBe('Unassigned');
      expect(result.current.active?.state).toEqual({ sort: 'assignee' });
      expect(result.current.dirty).toBe(false);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('mints an id that does not collide with the ones it was given', () => {
      const { result } = setup();
      act(() => {
        result.current.saveAs('One');
      });
      act(() => {
        result.current.saveAs('Two');
      });
      const ids = result.current.views.map((view) => view.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe('renaming and deleting', () => {
    it('renames one view and leaves its state alone', () => {
      const { result } = setup();
      act(() => {
        result.current.rename('a', 'Everything open');
      });
      expect(result.current.views[0]?.name).toBe('Everything open');
      expect(result.current.views[0]?.state).toEqual({ sort: 'created' });
    });

    it('ignores an empty name', () => {
      const onChange = vi.fn();
      const { result } = setup({ sort: 'created' }, { onChange });
      act(() => {
        result.current.rename('a', '   ');
      });
      expect(result.current.views[0]?.name).toBe('Open tickets');
      expect(onChange).not.toHaveBeenCalled();
    });

    it('keeps the active view active through a rename', () => {
      const { result } = setup();
      act(() => {
        result.current.apply('a');
      });
      act(() => {
        result.current.rename('a', 'Renamed');
      });
      // The id is what active-ness hangs on, which is the whole reason a view
      // has one rather than being keyed by its name.
      expect(result.current.active?.name).toBe('Renamed');
    });

    it('deletes a view', () => {
      const { result } = setup();
      act(() => {
        result.current.remove('a');
      });
      expect(result.current.views.map((view) => view.id)).toEqual(['b']);
    });

    it('deleting the active view leaves nothing active rather than moving on', () => {
      const { result } = setup();
      act(() => {
        result.current.apply('a');
      });
      act(() => {
        result.current.remove('a');
      });
      // Jumping to 'b' would rearrange the table someone is looking at as a
      // side effect of tidying a list.
      expect(result.current.activeId).toBeNull();
    });

    it('deleting another view leaves the active one alone', () => {
      const { result } = setup();
      act(() => {
        result.current.apply('a');
      });
      act(() => {
        result.current.remove('b');
      });
      expect(result.current.activeId).toBe('a');
    });
  });

  describe('discarding', () => {
    it('hands back the active view state', () => {
      const { result, rerender } = setup();
      act(() => {
        result.current.apply('a');
      });
      rerender({ live: { sort: 'priority' } });
      expect(result.current.reset()).toEqual({ sort: 'created' });
    });

    it('hands back nothing with no active view', () => {
      const { result } = setup();
      expect(result.current.reset()).toBeNull();
    });
  });
});
