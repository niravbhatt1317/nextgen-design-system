import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useDismissUntilNew } from './useDismissUntilNew';
import type { DismissStorage } from './useDismissUntilNew';

const KEY = 'cfm.unplaced.dismissed.northwind';

/** A storage that keeps its values in a map, so each test starts clean. */
const memory = (
  seed: Record<string, string> = {}
): DismissStorage & { data: Map<string, string> } => {
  const data = new Map(Object.entries(seed));
  return {
    data,
    getItem: (k) => data.get(k) ?? null,
    setItem: (k, v) => {
      data.set(k, v);
    },
  };
};

const hook = (ids: readonly string[], storage: DismissStorage | null) =>
  renderHook(({ list }) => useDismissUntilNew(KEY, list, { storage }), {
    initialProps: { list: ids },
  });

afterEach(() => {
  vi.restoreAllMocks();
  window.localStorage.clear();
});

describe('useDismissUntilNew', () => {
  describe('showing and dismissing', () => {
    it('shows while something has not been dismissed', () => {
      const { result } = hook(['col-ams-01'], memory());
      expect(result.current.visible).toBe(true);
    });

    it('shows nothing when the notice is about nothing', () => {
      const { result } = hook([], memory());
      expect(result.current.visible).toBe(false);
    });

    it('hides on dismiss and remembers the set under its key', () => {
      const storage = memory();
      const { result } = hook(['col-ams-01', 'col-fra-02'], storage);
      act(() => {
        result.current.dismiss();
      });
      expect(result.current.visible).toBe(false);
      expect(JSON.parse(storage.data.get(KEY) ?? '[]')).toEqual(['col-ams-01', 'col-fra-02']);
    });

    it('comes back when one more joins the set', () => {
      const { result, rerender } = hook(['col-ams-01'], memory());
      act(() => {
        result.current.dismiss();
      });
      rerender({ list: ['col-ams-01', 'col-fra-02'] });
      expect(result.current.visible).toBe(true);
    });

    it('stays hidden while the set only shrinks', () => {
      const { result, rerender } = hook(['col-ams-01', 'col-fra-02'], memory());
      act(() => {
        result.current.dismiss();
      });
      rerender({ list: ['col-fra-02'] });
      expect(result.current.visible).toBe(false);
    });

    it('treats a new array with the same ids as no change', () => {
      const { result, rerender } = hook(['col-ams-01'], memory());
      act(() => {
        result.current.dismiss();
      });
      rerender({ list: ['col-ams-01'] });
      expect(result.current.visible).toBe(false);
    });
  });

  describe('what it remembers', () => {
    it('starts hidden when the same set was dismissed before - no flash on the first paint', () => {
      const storage = memory({ [KEY]: JSON.stringify(['col-ams-01']) });
      const { result } = hook(['col-ams-01'], storage);
      expect(result.current.visible).toBe(false);
    });

    it('forgets an id that has left the set, so it counts as new if it comes back', () => {
      const storage = memory({ [KEY]: JSON.stringify(['col-ams-01', 'col-old-09']) });
      const { result, rerender } = hook(['col-ams-01'], storage);
      expect(result.current.visible).toBe(false);
      expect(JSON.parse(storage.data.get(KEY) ?? '[]')).toEqual(['col-ams-01']);
      rerender({ list: ['col-ams-01', 'col-old-09'] });
      expect(result.current.visible).toBe(true);
    });

    it('leaves the stored set alone when nothing has left it', () => {
      const storage = memory({ [KEY]: JSON.stringify(['col-ams-01']) });
      const spy = vi.spyOn(storage, 'setItem');
      hook(['col-ams-01', 'col-fra-02'], storage);
      expect(spy).not.toHaveBeenCalled();
    });

    it('reads a damaged or foreign value as nothing dismissed', () => {
      expect(hook(['a'], memory({ [KEY]: '{not json' })).result.current.visible).toBe(true);
      expect(hook(['a'], memory({ [KEY]: '{"a":1}' })).result.current.visible).toBe(true);
      expect(hook(['a'], memory({ [KEY]: JSON.stringify([1, 'b']) })).result.current.visible).toBe(
        true
      );
    });

    it('keeps it for this visit only with no storage', () => {
      const { result } = hook(['col-ams-01'], null);
      act(() => {
        result.current.dismiss();
      });
      expect(result.current.visible).toBe(false);
    });

    it('still hides when the storage refuses to write', () => {
      const storage: DismissStorage = {
        getItem: () => null,
        setItem: () => {
          throw new Error('quota');
        },
      };
      const { result } = hook(['col-ams-01'], storage);
      act(() => {
        result.current.dismiss();
      });
      expect(result.current.visible).toBe(false);
    });

    it('reads nothing when the storage refuses to read', () => {
      const storage: DismissStorage = {
        getItem: () => {
          throw new Error('denied');
        },
        setItem: () => undefined,
      };
      expect(hook(['a'], storage).result.current.visible).toBe(true);
    });
  });

  describe('the browser storage', () => {
    it('uses localStorage when no storage is given', () => {
      const { result } = renderHook(() => useDismissUntilNew(KEY, ['col-ams-01']));
      act(() => {
        result.current.dismiss();
      });
      expect(JSON.parse(window.localStorage.getItem(KEY) ?? '[]')).toEqual(['col-ams-01']);
    });

    it('falls back to the visit when localStorage cannot be reached', () => {
      vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
        throw new Error('blocked');
      });
      const { result } = renderHook(() => useDismissUntilNew(KEY, ['col-ams-01']));
      expect(result.current.visible).toBe(true);
      act(() => {
        result.current.dismiss();
      });
      expect(result.current.visible).toBe(false);
    });
  });
});
