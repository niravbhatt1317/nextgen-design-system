import { describe, it, expect } from 'vitest';
import { pageList, PAGE_GAP } from './pageList';

describe('pageList', () => {
  it('shows every page while they fit', () => {
    expect(pageList(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(pageList(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('copes with one page, and with none', () => {
    expect(pageList(1, 1)).toEqual([1]);
    expect(pageList(1, 0)).toEqual([]);
  });

  it('gaps the far end when you are at the start', () => {
    expect(pageList(1, 20)).toEqual([1, 2, 3, 4, 5, PAGE_GAP, 20]);
    expect(pageList(2, 20)).toEqual([1, 2, 3, 4, 5, PAGE_GAP, 20]);
  });

  it('gaps the near end when you are at the finish', () => {
    expect(pageList(20, 20)).toEqual([1, PAGE_GAP, 16, 17, 18, 19, 20]);
    expect(pageList(19, 20)).toEqual([1, PAGE_GAP, 16, 17, 18, 19, 20]);
  });

  it('gaps both ends in the middle', () => {
    expect(pageList(10, 20)).toEqual([1, PAGE_GAP, 9, 10, 11, PAGE_GAP, 20]);
  });

  it('never hides a single page behind a gap', () => {
    // Eight pages is the tight case: a narrower window would leave one page
    // behind an ellipsis, which is wider than the number it replaces.
    expect(pageList(3, 8)).toEqual([1, 2, 3, 4, 5, PAGE_GAP, 8]);
    expect(pageList(6, 8)).toEqual([1, PAGE_GAP, 4, 5, 6, 7, 8]);
  });

  it('keeps the same width all the way through', () => {
    const widths = new Set<number>();
    for (let page = 1; page <= 20; page += 1) widths.add(pageList(page, 20).length);
    // A row that grows and shrinks as you page through moves the control under
    // the pointer, so the next click lands on a different page.
    expect([...widths]).toEqual([7]);
  });

  it('holds its shape however many pages there are', () => {
    expect(pageList(400, 1000)).toHaveLength(pageList(4, 10).length);
  });

  it('clamps a page outside the range', () => {
    expect(pageList(0, 20)).toEqual(pageList(1, 20));
    expect(pageList(99, 20)).toEqual(pageList(20, 20));
  });

  it('always offers the first and last page', () => {
    for (const page of [1, 5, 12, 20]) {
      const slots = pageList(page, 20);
      expect(slots.at(0)).toBe(1);
      expect(slots.at(-1)).toBe(20);
    }
  });

  it('always includes the page you are on', () => {
    for (let page = 1; page <= 20; page += 1) {
      expect(pageList(page, 20)).toContain(page);
    }
  });
});
