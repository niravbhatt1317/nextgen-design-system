import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseInfiniteScrollOptions {
  /**
   * Whether there is anything left to load.
   *
   * The stop condition. Without it the observer keeps asking at the bottom of
   * a finished list, and every ask is a request.
   */
  hasMore: boolean;

  /**
   * Whether a load is already in flight.
   *
   * Load-bearing, not decorative. The sentinel stays on screen while the rows
   * are being fetched, so an observer that is not paused fires again on the
   * next scroll frame and asks for page 2 four times.
   */
  loading?: boolean;

  /** Called when the end comes into view. */
  onLoadMore: () => void;

  /**
   * How far ahead of the end to ask, as a CSS margin.
   *
   * The point is that the rows arrive before you reach the bottom. At `0px` you
   * hit the end of the list, then wait - which is the version of this feature
   * everybody complains about.
   *
   * @default '200px'
   */
  rootMargin?: string;

  /** Turns it off without unmounting anything. */
  disabled?: boolean;
}

export interface UseInfiniteScroll {
  /**
   * Put this on the element at the end of the list.
   *
   * A ref callback rather than a ref object, because the sentinel comes and
   * goes - it is unmounted while the list is empty and remounted when rows
   * arrive - and an observer set up once against a node that has since been
   * replaced watches nothing.
   */
  sentinelRef: (node: HTMLElement | null) => void;

  /** Whether the sentinel is currently being watched. */
  watching: boolean;
}

const DEFAULT_ROOT_MARGIN = '200px';

/**
 * Asks for more rows when the end of the list comes into view.
 *
 * **Infinite scroll replaces pagination rather than joining it.** Two ways of
 * reaching row 300 that disagree about which rows are loaded is a bug waiting
 * to be filed, so `DataTable` shows one or the other.
 *
 * **The sentinel should be a button, not an empty div.** Scrolling is not the
 * only way people move through a list: a keyboard user tabs, and a screen
 * reader user jumps by heading or by row. A button that both loads more when
 * pressed and loads more when scrolled into view serves all of them, and costs
 * nothing to the person who never sees it.
 *
 * @example
 * ```tsx
 * const { sentinelRef } = useInfiniteScroll({ hasMore, loading, onLoadMore });
 * <button ref={sentinelRef} onClick={onLoadMore}>Load more</button>
 * ```
 */
export function useInfiniteScroll({
  hasMore,
  loading = false,
  onLoadMore,
  rootMargin = DEFAULT_ROOT_MARGIN,
  disabled = false,
}: UseInfiniteScrollOptions): UseInfiniteScroll {
  const [node, setNode] = useState<HTMLElement | null>(null);

  // Held in a ref so a caller passing a fresh arrow function every render does
  // not tear down and rebuild the observer on every render - which, with an
  // observer that fires on setup, is its own infinite loop.
  const latest = useRef(onLoadMore);
  useEffect(() => {
    latest.current = onLoadMore;
  }, [onLoadMore]);

  const watching = node !== null && hasMore && !loading && !disabled;

  useEffect(() => {
    // `node` is proven non-null by `watching`, but a boolean does not carry
    // that proof across, so the observer is set up from the node directly.
    if (node === null || !watching) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) latest.current();
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [watching, node, rootMargin]);

  const sentinelRef = useCallback((next: HTMLElement | null) => {
    setNode(next);
  }, []);

  return { sentinelRef, watching };
}
