import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import { cn } from '@/utils';
import { Banner } from '../Banner';
import type { BannerTone } from '../Banner';
import type { BannerStackItem, BannerStackProps } from './BannerStack.types';
import './bannerStack.css';

/*
 * BannerStack - ported from the console (Pranjal, 2026-10-13).
 *
 * Source: next-gen-ui src/features/organizations/BannerStack.jsx + bannerStack.css (Nikhil's approved design,
 * 2026-10-07, redrawn for full-width strips 2026-10-08, the peeks removed the same day - step 273) and the
 * Strip.jsx wrapper that feeds it, which since 2026-10-11 is the library Banner edge to edge. Same look, same
 * behaviour, same numbers; only the names changed.
 *
 * Every active notice in ONE slot, the way a chat app pins messages. Collapsed (more than one): the front notice is
 * the full-bleed square bar, whole and live (its actions and its cross work without opening anything), with a RAIL of
 * n ticks in its row ahead of the glyph carrying the true count; the notices behind wait hidden behind it. Hover (a
 * mouse), a Tab in, or a tap pulls down the SHADE - a popover surface flush under the bar with a hairline and a deep
 * soft shadow, 18 bottom corners - and every notice becomes a card on it: the bar's corners round, its padding eases
 * from the gutter to the card's, the rail folds away, the cards cascade to their list offsets with a stagger; collapse
 * reverses it. The slot keeps its collapsed height throughout, so nothing under it moves. The pointer leaving starts a
 * 160ms grace, then it collapses unless a tap pinned it (a tap outside unpins); focus leaving collapses it; Escape
 * unpins and collapses without moving focus. One notice renders plainly - the bar as it ships, no rail, no shade.
 * First paint, a resize and a theme switch re-lay with the transitions held; prefers-reduced-motion swaps everything
 * instantly. Dismissing a notice while open re-flows the fan in place; any other change of the set re-sorts and
 * starts collapsed.
 */

/* the constants, in one place - the CSS reads the ones it needs as custom properties set on the container */
const GAP = 8; // the fanned list's gap
const SIDE_INSET = 10; // a card's inset from the slot's edges on the shade
const SHADE_TOP = 12; // the shade's reach above the bar (the overlap hides any seam with what sits above)
const SHADE_BOTTOM = 12; // and under the last notice
const SHADE_RADIUS = 18;
const STRIP_RADIUS = 12;
const EXPAND_STAGGER = 26; // ms per card, the front first
const COLLAPSE_STAGGER = 18; // ms per card, the last first
const GRACE = 160; // the pointer leaving -> collapse
const MOTION = '340ms cubic-bezier(.3, 1.18, .35, 1)'; // transforms, margins, heights
const MORPH = '300ms ease'; // the bar's corners, padding and hairline; the rail's width and margin
const FADE = '220ms ease'; // opacities
const CARD_PAD = 16; // a card's side padding on the shade
const RAIL_BUDGET = 26; // the rail's height budget inside the 44 bar
const QUIET = 400; // after Escape, focus settling back inside does not reopen the fan

/** Left out, a notice's priority comes from its tone - the severity order. */
const TONE_PRIORITY: Record<BannerTone, number> = {
  danger: 50,
  warning: 40,
  info: 30,
  ai: 30,
  success: 20,
  neutral: 10,
};

const priorityOf = (item: BannerStackItem): number =>
  item.priority ?? TONE_PRIORITY[item.tone ?? 'neutral'];

/* a popover or a dialog grown from a notice counts as inside - and since it is a React descendant rendered through a
 * portal, focus and pointer events from it reach the stack's own handlers, so those ignore what happens inside one */
const POPPER = '[data-radix-popper-content-wrapper], [role=dialog]';
const isElement = (el: unknown): el is Element =>
  typeof Element !== 'undefined' && el instanceof Element;
const grown = (el: unknown): boolean => isElement(el) && el.closest(POPPER) !== null;
const within = (root: HTMLElement | null, el: unknown): boolean =>
  isElement(el) && (root?.contains(el) === true || grown(el));

/** The rail's ticks always fit the bar: a 26 budget, 3 apart (2 past five), each 2-8 tall, the front one 3 taller. */
const railOf = (n: number): { gap: number; h: number; hOn: number } => {
  const gap = n > 5 ? 2 : 3;
  const h = Math.max(2, Math.min(8, Math.floor((RAIL_BUDGET - (n - 1) * gap) / n)));
  return { gap, h, hOn: Math.min(h + 3, RAIL_BUDGET - (n - 1) * (h + gap) + h) };
};

const same = (a: readonly number[], b: readonly number[]): boolean =>
  a.length === b.length && a.every((v, i) => v === b[i]);

const defaultAnnouncement = (n: number): string =>
  `${String(n)} notices stacked. Hover, focus or tap to expand.`;

/**
 * BannerStack - several page notices folded into one fanned stack.
 *
 * The highest-priority notice is shown in full at the front; a rail of ticks
 * beside its glyph says how many wait behind it. Hover, Tab in or tap to fan
 * them all out on a shade; each keeps its own actions and its own cross.
 *
 * The notices are library `Banner`s at `placement="page"`. Dismissing is the
 * notice's own `onDismiss` - remove it from `items` and the open fan re-flows
 * in place.
 *
 * @example
 * ```tsx
 * <BannerStack
 *   items={[
 *     { id: 'suspended', tone: 'danger', title: 'Suspended', description: 'Members can't sign in' },
 *     { id: 'import-7', tone: 'success', title: 'Import complete', onDismiss: () => drop('import-7') },
 *   ]}
 * />
 * ```
 */
export const BannerStack = ({
  items,
  label = 'Notices',
  stackedAnnouncement = defaultAnnouncement,
  className,
  style: styleProp,
  onPointerEnter: onPointerEnterProp,
  onPointerLeave: onPointerLeaveProp,
  onPointerDown: onPointerDownProp,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  ...props
}: BannerStackProps) => {
  const sorted = useMemo(
    // Array.prototype.sort is stable, so equal priorities keep the order given
    () => [...items].sort((a, b) => priorityOf(b) - priorityOf(a)),
    [items]
  );
  const n = sorted.length;
  const stacked = n > 1;
  const ids = sorted.map((it) => it.id).join('|');

  const wrap = useRef<HTMLDivElement | null>(null);
  const cards = useRef(new Map<string, HTMLDivElement>());
  const [heights, setHeights] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [held, setHeld] = useState(true); // transitions held: first paint, a resize, a theme switch
  const openRef = useRef(open);
  openRef.current = open;
  const pinnedRef = useRef(pinned);
  pinnedRef.current = pinned;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const raf = useRef<number | null>(null);
  const quietUntil = useRef(0);
  const prevIds = useRef<string[] | null>(null);

  const measure = useCallback(() => {
    const next = sorted.map((it) => cards.current.get(it.id)?.offsetHeight ?? 0);
    setHeights((old) => (same(old, next) ? old : next));
  }, [sorted]);

  const hold = useCallback(() => {
    setHeld(true);
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        setHeld(false);
      });
    });
  }, []);

  const cancel = (): void => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };
  /* a popover trigger inside the stack that is open keeps the fan open (the console read its ⓘ the same way) */
  const popoverOpen = (): boolean =>
    wrap.current !== null && wrap.current.querySelector('[aria-expanded="true"]') !== null;
  const collapse = useCallback((): void => {
    setPinned(false);
    setOpen(false);
  }, []);

  /* the set changed: measure before paint; a pure removal while open re-flows in place, anything else starts collapsed */
  useLayoutEffect(() => {
    const now = ids ? ids.split('|') : [];
    const prev = prevIds.current;
    const removal =
      prev !== null && now.length < prev.length && now.every((id) => prev.includes(id));
    prevIds.current = now;
    measure();
    if (!removal) {
      collapse();
      hold();
    }
  }, [ids]); // eslint-disable-line react-hooks/exhaustive-deps -- keyed on the set of ids, as the console

  /* the heights follow the notices (their text wraps with the width), the window and the theme */
  useEffect(() => {
    if (!stacked) return undefined;
    const relayout = (): void => {
      hold();
      measure();
    };
    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            measure();
          })
        : null;
    if (ro)
      cards.current.forEach((el) => {
        ro.observe(el);
      });
    window.addEventListener('resize', relayout);
    const mo = typeof MutationObserver !== 'undefined' ? new MutationObserver(relayout) : null;
    if (mo) {
      mo.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme', 'class'],
      });
    }
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', relayout);
      if (mo) mo.disconnect();
    };
  }, [ids, stacked, hold, measure]);

  /* outside: a press anywhere else unpins and collapses; Escape unpins and collapses, leaving focus where it is */
  useEffect(() => {
    if (!stacked) return undefined;
    const onDown = (e: Event): void => {
      if (within(wrap.current, e.target)) return;
      if (openRef.current || pinnedRef.current) collapse();
    };
    const onKey = (e: KeyboardEvent): void => {
      if (e.key !== 'Escape' || !(openRef.current || pinnedRef.current)) return;
      quietUntil.current = Date.now() + QUIET;
      collapse();
    };
    document.addEventListener('pointerdown', onDown, true);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('keydown', onKey);
    };
  }, [stacked, collapse]);

  useEffect(
    () => () => {
      cancel();
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    },
    []
  );

  const onPointerEnter = (e: PointerEvent<HTMLDivElement>): void => {
    onPointerEnterProp?.(e);
    if (!stacked || e.pointerType === 'touch' || grown(e.target)) return;
    cancel();
    setOpen(true);
  };
  const onPointerLeave = (e: PointerEvent<HTMLDivElement>): void => {
    onPointerLeaveProp?.(e);
    if (!stacked || e.pointerType === 'touch') return;
    cancel();
    timer.current = setTimeout(() => {
      timer.current = null;
      if (pinnedRef.current || popoverOpen()) return;
      setOpen(false);
    }, GRACE);
  };
  /* touch: a tap opens and pins - except a tap on one of the front notice's own controls while collapsed, which acts */
  const onPointerDown = (e: PointerEvent<HTMLDivElement>): void => {
    onPointerDownProp?.(e);
    if (!stacked || e.pointerType !== 'touch' || grown(e.target)) return;
    const t = e.target;
    if (
      !openRef.current &&
      isElement(t) &&
      t.closest('[data-bstack-front]') !== null &&
      t.closest('button, a, input, [role=button]') !== null
    ) {
      return;
    }
    setOpen(true);
    setPinned(true);
  };
  /* a Tab in (from anywhere, or from one notice's control to the next) opens the fan before focus lands; focus handed
   * back by a closing dialog or popover, or set by a click, does not */
  const onFocus = (e: FocusEvent<HTMLDivElement>): void => {
    onFocusProp?.(e);
    if (!stacked || grown(e.target) || Date.now() < quietUntil.current) return;
    const from = e.relatedTarget;
    if (from === null || grown(from)) return;
    cancel();
    setOpen(true);
  };
  const onBlur = (e: FocusEvent<HTMLDivElement>): void => {
    onBlurProp?.(e);
    if (!stacked || within(wrap.current, e.relatedTarget)) return;
    if (pinnedRef.current || popoverOpen() || wrap.current?.matches(':hover') === true) return;
    setOpen(false);
  };

  if (n === 0) return null;

  const ready = stacked && heights.length === n && heights.every((h) => h > 0);
  const fanned = ready && open;
  const footprint = heights[0] ?? 0; // the front bar alone
  const offsets: number[] = [];
  let y = 0;
  for (let i = 0; i < n; i++) {
    offsets.push(y);
    y += (heights[i] ?? 0) + GAP;
  }
  const spread = y - GAP;
  const { gap, h, hOn } = railOf(n);

  const rail: ReactNode = stacked ? (
    <span
      className="mdt-bstack__rail"
      aria-hidden="true"
      data-slot="banner-stack-rail"
      style={{ gap: `${String(gap)}px` }}
    >
      {sorted.map((t, k) => (
        <i
          key={t.id}
          className={cn('mdt-bstack__tick', k === 0 && 'is-front')}
          style={{ height: k === 0 ? hOn : h }}
        />
      ))}
    </span>
  ) : null;

  const vars = stacked
    ? ({
        height: footprint,
        '--bs-strip-radius': `${String(STRIP_RADIUS)}px`,
        '--bs-shade-radius': `${String(SHADE_RADIUS)}px`,
        '--bs-card-pad': `${String(CARD_PAD)}px`,
        '--bs-motion': MOTION,
        '--bs-morph': MORPH,
        '--bs-fade': FADE,
      } as CSSProperties)
    : undefined;

  return (
    <div
      ref={wrap}
      role="group"
      aria-label={label}
      data-slot="banner-stack"
      data-state={fanned ? 'open' : 'closed'}
      className={cn(
        'mdt-bstack',
        stacked ? 'mdt-bstack--stacked' : 'mdt-bstack--one',
        fanned && 'is-open',
        held && 'mdt-bstack--held',
        className
      )}
      style={{ ...vars, ...styleProp }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onFocus={onFocus}
      onBlur={onBlur}
      {...props}
    >
      {stacked ? (
        <span className="mdt-sr-only" role="status">
          {stackedAnnouncement(n)}
        </span>
      ) : null}
      {stacked ? (
        <div
          className="mdt-bstack__shade"
          aria-hidden="true"
          data-slot="banner-stack-shade"
          style={{
            top: -SHADE_TOP,
            height: SHADE_TOP + (fanned ? spread : footprint) + SHADE_BOTTOM,
          }}
        />
      ) : null}
      {sorted.map((item, i) => {
        const { id, priority: _priority, tone = 'neutral', actionPlacement, ...banner } = item;
        void _priority;
        /* collapsed, every notice but the front waits hidden right behind the bar, already at its card inset, and
         * rises out from under it into its place on the shade */
        const behind = !fanned && i > 0;
        const inset = i === 0 && !fanned ? 0 : SIDE_INSET;
        const style = stacked
          ? ({
              transform: `translateY(${String(fanned ? (offsets[i] ?? 0) : 0)}px)`,
              marginLeft: inset,
              marginRight: inset,
              zIndex: 1 + n - i,
              opacity: behind ? 0 : 1,
              pointerEvents: behind ? 'none' : undefined,
              '--bs-delay': `${String(fanned ? i * EXPAND_STAGGER : (n - 1 - i) * COLLAPSE_STAGGER)}ms`,
            } as CSSProperties)
          : undefined;
        return (
          <div
            key={id}
            data-id={id}
            data-slot="banner-stack-card"
            {...(i === 0 ? { 'data-bstack-front': '' } : {})}
            ref={(el) => {
              if (el) cards.current.set(id, el);
              else cards.current.delete(id);
            }}
            className={cn('mdt-bstack__card', i === 0 && 'mdt-bstack__card--front')}
            style={style}
          >
            {/* the strip: the banner's own wash across the gutter, the hairline in its tone, the rail ahead of it */}
            <div className="mdt-bstack__strip" data-tone={tone}>
              {i === 0 ? rail : null}
              <Banner
                {...banner}
                tone={tone}
                placement="page"
                actionPlacement={actionPlacement ?? 'inline'}
                className={cn('mdt-bstack__banner', banner.className)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

BannerStack.displayName = 'BannerStack';
