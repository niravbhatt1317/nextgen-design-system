'use client';

import { useEffect, useRef, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../Tooltip';

/* PORTED FROM THE CONSOLE (Pranjal, 2026-10-28) - ui/OverflowTip.jsx, his rule of 2026-10-15: "if something is truncated
 * anywhere give tooltip on hover to show the full value". The console mounts it once, in App.jsx, so no page has to wrap
 * its cells; the library ships it the same way.
 *
 * On hover it looks at the element under the pointer and up to four of its parents for text the layout cut short: an
 * ellipsis (text-overflow) or a line clamp whose content is wider or taller than its box. If it finds one, the library
 * Tooltip opens over that element with the whole text - the same bubble every ⓘ uses. Text that fits gets nothing. It
 * stands aside where a tooltip already explains the thing (an element inside a tooltip, or a trigger that owns one) and
 * wherever a page marks `data-no-overflow-tip`. */

/** How many parents above the element under the pointer are looked at. */
const LEVELS = 4;

/** Where it stands aside: a marked region, or anything inside a tooltip. */
const STAND_ASIDE = '[data-no-overflow-tip], [role=tooltip]';

/** A trigger that already opens its own tooltip keeps it (Radix marks it with data-state). */
const OWN_TOOLTIP = '[data-state][aria-describedby]';

/** The bubble's widest, as the console's. */
const MAX_WIDTH = 340;

interface Clipped {
  el: Element;
  text: string;
}

interface Shown {
  text: string;
  box: DOMRect;
}

/** Whether the layout cut this element's text: an ellipsis wider than its box, or a clamp taller than it. */
const isCut = (el: Element): boolean => {
  const cs = getComputedStyle(el);
  if (cs.textOverflow === 'ellipsis' && el.scrollWidth > el.clientWidth + 1) return true;
  const clamp = cs.webkitLineClamp;
  return Boolean(clamp) && clamp !== 'none' && el.scrollHeight > el.clientHeight + 1;
};

/** The whole text, on one line. */
const wholeText = (el: Element): string =>
  ((el as HTMLElement).innerText || el.textContent || '').replace(/\s+/g, ' ').trim();

/** The nearest element, from `start` up four parents, whose text the layout cut short - or null. */
const clippedAt = (start: EventTarget | null): Clipped | null => {
  let el = start instanceof Element ? start : null;
  for (let i = 0; el && i <= LEVELS; i += 1, el = el.parentElement) {
    if (el.closest(STAND_ASIDE)) return null;
    if (isCut(el)) {
      const text = wholeText(el);
      return text ? { el, text } : null;
    }
  }
  return null;
};

/**
 * OverflowTip - shows the full text of anything cut short with "…" (or a line
 * clamp) in the library tooltip when the pointer rests on it. Mount it once,
 * near the root of the app; no cell or label has to be wrapped.
 *
 * Text that fits gets nothing. It stands aside inside a tooltip, on a trigger
 * that already opens its own tooltip, and inside anything marked
 * `data-no-overflow-tip`.
 *
 * @example
 * ```tsx
 * <TooltipProvider>
 *   <App />
 *   <OverflowTip />
 * </TooltipProvider>
 * ```
 */
const OverflowTip = () => {
  const [shown, setShown] = useState<Shown | null>(null);
  const current = useRef<Clipped | null>(null);

  useEffect(() => {
    const show = (hit: Clipped | null): void => {
      current.current = hit;
      setShown(hit ? { text: hit.text, box: hit.el.getBoundingClientRect() } : null);
    };
    const over = (event: PointerEvent): void => {
      if (current.current?.el.contains(event.target as Node)) return;
      const hit = clippedAt(event.target);
      show(hit?.el.closest(OWN_TOOLTIP) ? null : hit);
    };
    const out = (event: PointerEvent): void => {
      if (current.current && !current.current.el.contains(event.relatedTarget as Node | null))
        show(null);
    };
    const clear = (): void => {
      if (current.current) show(null);
    };
    document.addEventListener('pointerover', over, true);
    document.addEventListener('pointerout', out, true);
    window.addEventListener('scroll', clear, true);
    window.addEventListener('pointerdown', clear, true);
    return () => {
      document.removeEventListener('pointerover', over, true);
      document.removeEventListener('pointerout', out, true);
      window.removeEventListener('scroll', clear, true);
      window.removeEventListener('pointerdown', clear, true);
    };
  }, []);

  if (!shown) return null;
  const { box, text } = shown;
  return (
    <TooltipProvider>
      <Tooltip open>
        <TooltipTrigger asChild>
          {/* a still box laid over the cut element - the bubble sits on it; the pointer passes through */}
          <span
            aria-hidden="true"
            data-slot="overflow-tip-anchor"
            className="mdt-pointer-events-none mdt-fixed"
            style={{ left: box.left, top: box.top, width: box.width, height: box.height }}
          />
        </TooltipTrigger>
        <TooltipContent side="top" maxWidth={MAX_WIDTH} className="mdt-text-left">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

OverflowTip.displayName = 'OverflowTip';

export { OverflowTip };
