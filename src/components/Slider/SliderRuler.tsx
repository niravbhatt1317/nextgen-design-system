import { useLayoutEffect, useRef } from 'react';
import { sliderTicks, thumbAt } from './sliderTicks';

/* THE RULER - ported from the console (Pranjal, 2026-10-28): organizations/settingsKit.jsx Ruler. The ticks, placed where
 * the native thumb's centre sits for each value: the thumb is 16px wide, so a value at P% of the range is at P% of
 * (track - 16px) + 8px, the same arithmetic the value tag rides on. The ticks are aria-hidden: the numbers repeat what
 * the slider already announces. `start` and `end` name the two ends in the numbers' own row (2026-09-28, Nikhil,
 * Version 2): the end ticks print their numbers centred on the tick like every other number, the name hangs off the
 * number, and those two stay readable to a screen reader ("15 · Min", "MSP baseline · 60"). A middle number that would
 * touch an end name steps aside - measured, so it holds at any width. */

/** The least room between two numbers on the scale. */
const CLEAR = 8;

interface Placed {
  n: HTMLElement;
  r: DOMRect;
}

/** An end number's box, the name hung off it included. */
const endBox = (n: Element): { left: number; right: number } => {
  const a = n.getBoundingClientRect();
  const w = n.querySelector('.mdt-slider__word')?.getBoundingClientRect();
  return w ? { left: Math.min(a.left, w.left), right: Math.max(a.right, w.right) } : a;
};

/** Whether any number in the row comes within 8 of the one before it. */
const clashes = (shown: Placed[]): boolean =>
  shown.some((x, i) => shown.slice(i - 1, i).some((prev) => x.r.left < prev.r.right + CLEAR));

/* NUMBERS NEVER TOUCH, AT ANY WIDTH (Pranjal 2026-10-28: "the slider we are not making it responsive. Its breaking.
 * Check everywhere"): in a narrow card a wide range ran its numbers together. When any two would come within 8, every
 * second one of the middle numbers steps aside - then every third, and so on - so the scale stays even; the first and
 * the last number always stay. */
const thinOut = (free: Placed[]): void => {
  if (free.length <= 2) return;
  const ends = [...free.slice(0, 1), ...free.slice(-1)];
  const mid = free.slice(1, -1);
  for (let k = 1; k <= mid.length + 1; k += 1) {
    const keep = mid.filter((_, i) => (i + 1) % k === 0);
    if (!clashes([...ends.slice(0, 1), ...keep, ...ends.slice(1)]) || k === mid.length + 1) {
      mid.forEach((x) => {
        x.n.style.visibility = keep.includes(x) ? '' : 'hidden';
      });
      return;
    }
  }
};

/** Hides every middle number that would touch an end name or another number. */
const fitNumbers = (el: HTMLElement): void => {
  const ends = [...el.querySelectorAll('.mdt-slider__num[data-end]')].map(endBox);
  const free: Placed[] = [];
  el.querySelectorAll<HTMLElement>('.mdt-slider__num:not([data-end])').forEach((n) => {
    n.style.visibility = '';
    const r = n.getBoundingClientRect();
    if (ends.some((e) => r.left < e.right + CLEAR && r.right > e.left - CLEAR))
      n.style.visibility = 'hidden';
    else free.push({ n, r });
  });
  thinOut(free);
};

interface SliderRulerProps {
  min: number;
  max: number;
  /** The name hung off the first number. */
  start?: string | undefined;
  /** The name hung before the last number. */
  end?: string | undefined;
}

/** The tick scale under a Slider's track, the two end names in its numbers' row. */
export const SliderRuler = ({ min, max, start, end }: SliderRulerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const span = max - min;
  const ticks = sliderTicks(min, max);
  const layout = ticks.map((t) => `${String(t.v)}:${t.label ?? ''}`).join(',');

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const fit = (): void => {
      fitNumbers(el);
    };
    fit();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => {
      ro.disconnect();
    };
  }, [min, max, layout, start, end]);

  return (
    <div className="mdt-slider__ruler" ref={ref} data-slot="slider-ruler">
      {ticks.map((t) => {
        const p = ((t.v - min) / span) * 100;
        const isStart = start !== undefined && t.v === min;
        const isEnd = end !== undefined && t.v === max;
        const named = isStart || isEnd;
        const label = named ? String(t.v) : t.label;
        return (
          <span
            key={t.v}
            className="mdt-slider__tick"
            data-value={t.v}
            {...(t.major ? { 'data-major': '' } : {})}
            {...(named ? {} : { 'aria-hidden': true })}
            style={{ left: thumbAt(p) }}
          >
            {label !== null ? (
              <span
                className="mdt-slider__num"
                {...(isStart ? { 'data-end': 'start' } : {})}
                {...(isEnd ? { 'data-end': 'end' } : {})}
              >
                {isEnd ? <span className="mdt-slider__word">{end}</span> : null}
                {label}
                {isStart ? <span className="mdt-slider__word">{start}</span> : null}
              </span>
            ) : null}
          </span>
        );
      })}
    </div>
  );
};
