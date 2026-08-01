import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';
import { useInfiniteScroll } from './useInfiniteScroll';

/**
 * A controllable observer, because the global mock in `vitest.setup.ts` never
 * fires - it only proves the constructor exists. Everything worth testing here
 * is what happens when the sentinel comes into view.
 */
interface FakeObserver {
  callback: IntersectionObserverCallback;
  observed: Element[];
  disconnected: boolean;
}

let observers: FakeObserver[] = [];
const realObserver = globalThis.IntersectionObserver;

class TestObserver {
  private readonly entry: FakeObserver;

  constructor(callback: IntersectionObserverCallback) {
    this.entry = { callback, observed: [], disconnected: false };
    observers.push(this.entry);
  }

  observe(element: Element) {
    this.entry.observed.push(element);
  }

  unobserve() {
    // Not used: the hook disconnects rather than unobserving one node.
  }

  disconnect() {
    this.entry.disconnected = true;
  }

  takeRecords() {
    return [];
  }
}

/** Fires the newest observer as though the sentinel had scrolled into view. */
const scrollIntoView = (isIntersecting = true) => {
  const observer = observers.at(-1);
  act(() => {
    observer?.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
  });
};

beforeEach(() => {
  observers = [];
  globalThis.IntersectionObserver = TestObserver as unknown as typeof IntersectionObserver;
});

afterAll(() => {
  globalThis.IntersectionObserver = realObserver;
});

const node = () => document.createElement('div');

describe('useInfiniteScroll', () => {
  it('watches the sentinel once it is there', () => {
    const { result } = renderHook(() => useInfiniteScroll({ hasMore: true, onLoadMore: vi.fn() }));
    expect(result.current.watching).toBe(false);
    act(() => {
      result.current.sentinelRef(node());
    });
    expect(result.current.watching).toBe(true);
    expect(observers).toHaveLength(1);
  });

  it('asks for more when the end comes into view', () => {
    const onLoadMore = vi.fn();
    const { result } = renderHook(() => useInfiniteScroll({ hasMore: true, onLoadMore }));
    act(() => {
      result.current.sentinelRef(node());
    });
    scrollIntoView();
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('says nothing while the sentinel is off screen', () => {
    const onLoadMore = vi.fn();
    const { result } = renderHook(() => useInfiniteScroll({ hasMore: true, onLoadMore }));
    act(() => {
      result.current.sentinelRef(node());
    });
    scrollIntoView(false);
    expect(onLoadMore).not.toHaveBeenCalled();
  });

  describe('when it stays quiet', () => {
    const cases = [
      { name: 'there is nothing left to load', options: { hasMore: false } },
      { name: 'a load is already in flight', options: { hasMore: true, loading: true } },
      { name: 'it has been turned off', options: { hasMore: true, disabled: true } },
    ];

    it.each(cases)('does not watch when $name', ({ options }) => {
      const onLoadMore = vi.fn();
      const { result } = renderHook(() => useInfiniteScroll({ ...options, onLoadMore }));
      act(() => {
        result.current.sentinelRef(node());
      });
      // The in-flight case is the one that matters: the sentinel stays on
      // screen while rows are fetched, so an observer that is not paused asks
      // for the same page on every scroll frame.
      expect(result.current.watching).toBe(false);
      expect(observers).toHaveLength(0);
    });
  });

  it('starts watching again once the load lands', () => {
    const onLoadMore = vi.fn();
    const { result, rerender } = renderHook(
      ({ loading }) => useInfiniteScroll({ hasMore: true, loading, onLoadMore }),
      { initialProps: { loading: true } }
    );
    act(() => {
      result.current.sentinelRef(node());
    });
    rerender({ loading: false });
    scrollIntoView();
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('stops watching when the rows run out', () => {
    const { result, rerender } = renderHook(
      ({ hasMore }) => useInfiniteScroll({ hasMore, onLoadMore: vi.fn() }),
      { initialProps: { hasMore: true } }
    );
    act(() => {
      result.current.sentinelRef(node());
    });
    rerender({ hasMore: false });
    expect(observers[0]?.disconnected).toBe(true);
    expect(result.current.watching).toBe(false);
  });

  it('follows the sentinel when it is replaced', () => {
    const { result } = renderHook(() => useInfiniteScroll({ hasMore: true, onLoadMore: vi.fn() }));
    const first = node();
    const second = node();
    act(() => {
      result.current.sentinelRef(first);
    });
    act(() => {
      result.current.sentinelRef(second);
    });
    // A ref object set up once would still be watching the node that has since
    // been unmounted, which observes nothing forever.
    expect(observers[0]?.disconnected).toBe(true);
    expect(observers[1]?.observed).toEqual([second]);
  });

  it('keeps one observer when the callback changes every render', () => {
    const { result, rerender } = renderHook(() =>
      useInfiniteScroll({ hasMore: true, onLoadMore: () => undefined })
    );
    act(() => {
      result.current.sentinelRef(node());
    });
    rerender();
    rerender();
    // A fresh arrow function per render must not tear the observer down and
    // build it again - with an observer that fires on setup, that is its own
    // infinite loop.
    expect(observers).toHaveLength(1);
  });

  it('calls the newest callback, not the one it was created with', () => {
    const first = vi.fn();
    const second = vi.fn();
    const { result, rerender } = renderHook(
      ({ onLoadMore }) => useInfiniteScroll({ hasMore: true, onLoadMore }),
      { initialProps: { onLoadMore: first } }
    );
    act(() => {
      result.current.sentinelRef(node());
    });
    rerender({ onLoadMore: second });
    scrollIntoView();
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });

  it('lets go when it unmounts', () => {
    const { result, unmount } = renderHook(() =>
      useInfiniteScroll({ hasMore: true, onLoadMore: vi.fn() })
    );
    act(() => {
      result.current.sentinelRef(node());
    });
    unmount();
    expect(observers[0]?.disconnected).toBe(true);
  });
});
