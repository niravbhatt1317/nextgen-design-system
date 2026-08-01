/** A gap in the list of pages, where numbers have been left out. */
export const PAGE_GAP = 'gap';

export type PageSlot = number | typeof PAGE_GAP;

/**
 * How many numbers to show around the current page, per side.
 *
 * One is enough to tell you where you are and to offer the step either way.
 * Two costs two more controls on every table for a case - jumping exactly three
 * pages - that people use the number field or the next button for anyway.
 */
const AROUND = 1;

/**
 * The most numbers the list ever holds, gaps included.
 *
 * first + gap + (current-1, current, current+1) + gap + last. Seven, and the
 * shape does not change as the count grows: page 4 of 10 and page 400 of 1000
 * look the same, which is what stops the row reflowing under the pointer.
 */
const MAX_SLOTS = 7;

const range = (from: number, to: number): number[] =>
  Array.from({ length: Math.max(0, to - from + 1) }, (_, index) => from + index);

/** How close to an end counts as being at it. */
const EDGE = AROUND + 3;

/**
 * Which page numbers to show, and where the gaps go.
 *
 * Every page while they fit; first, last, and a window around the current one
 * once they do not.
 *
 * **The row keeps one width.** Near an end the window widens rather than the
 * row shrinking - the first version of this returned six slots at the ends and
 * seven in the middle, which moves every control sideways as you page and
 * lands the next click on a different number.
 *
 * **A gap is never one hidden page.** These boundaries are what make that true
 * rather than a special case: an ellipsis standing in for a single number is
 * wider than the number, and hides the one thing the row is for.
 *
 * @example
 * ```ts
 * pageList(1, 5)    // [1, 2, 3, 4, 5]
 * pageList(1, 20)   // [1, 2, 3, 4, 5, 'gap', 20]
 * pageList(10, 20)  // [1, 'gap', 9, 10, 11, 'gap', 20]
 * pageList(20, 20)  // [1, 'gap', 16, 17, 18, 19, 20]
 * ```
 */
export function pageList(page: number, pageCount: number): PageSlot[] {
  if (pageCount <= MAX_SLOTS) return range(1, pageCount);

  const current = Math.min(Math.max(page, 1), pageCount);

  // Near the start: one gap, on the right. The window is MAX_SLOTS - 2 wide,
  // which is what keeps the count the same as the middle case.
  if (current <= EDGE) return [...range(1, MAX_SLOTS - 2), PAGE_GAP, pageCount];

  // Near the end: the mirror of it.
  if (current >= pageCount - EDGE + 1) {
    return [1, PAGE_GAP, ...range(pageCount - (MAX_SLOTS - 3), pageCount)];
  }

  return [1, PAGE_GAP, ...range(current - AROUND, current + AROUND), PAGE_GAP, pageCount];
}
