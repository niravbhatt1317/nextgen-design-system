import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from 'react';
import { cn } from '@/utils';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';

/*
 * The tag picker (Pranjal, 2026-10-13, from the table-tag-editor mock - built first in the console's Client
 * organizations table and organization header): the list InlineTags opens in both of its variants.
 *
 * - SELECTED = the tags on the record in this draft; SUGGESTED = every other tag - the `suggestions` first, then the
 *   rest by how many records use them (`counts`). Ticking a suggestion slides it up into Selected and lights it for a
 *   moment; unticking slides it back to its place.
 * - Typing narrows both groups; no exact match = the first row offers Create "...".
 * - Ticks are a DRAFT until Apply. Enter on an empty search applies; Escape clears the search, then cancels.
 * - A second click within a quarter second of a move is ignored, so a row that slid under the pointer is never ticked
 *   by accident.
 */

const same = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

export interface TagDraftOptions {
  options: readonly string[];
  suggestions: readonly string[];
  counts: Readonly<Record<string, number>>;
}

/** The picker's state: the draft, the search, the highlighted row, and the slide that follows a tick. */
export function useTagDraft({ options, suggestions, counts }: TagDraftOptions) {
  const [base, setBase] = useState<string[]>([]);
  const [draft, setDraft] = useState<string[]>([]);
  const [query, setQueryState] = useState('');
  const [active, setActive] = useState(-1);
  const [landed, setLanded] = useState<string | null>(null);
  const lockUntil = useRef(0);
  /* the list follows the keyboard only - a hover never scrolls it */
  const byKey = useRef(false);
  const flip = useRef<Record<string, number> | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const start = useCallback((value: readonly string[]) => {
    setBase([...value]);
    setDraft([...value]);
    setQueryState('');
    setActive(-1);
    setLanded(null);
  }, []);

  const typed = query.trim();
  const lower = typed.toLowerCase();
  const pool = useMemo(
    () => Array.from(new Set([...suggestions, ...options, ...base, ...draft])),
    [suggestions, options, base, draft]
  );
  const match = (t: string) => !lower || t.toLowerCase().includes(lower);
  const rank = (t: string) => {
    const s = suggestions.indexOf(t);
    return s >= 0 ? s - 1e6 : -(counts[t] ?? 0);
  };
  const selected = draft.filter(match);
  const others = pool
    .filter((t) => !draft.includes(t) && match(t))
    .sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
  const canCreate = typed !== '' && !pool.some((t) => same(t, typed));
  const picks: { kind: 'create' | 'tag'; name: string }[] = [
    ...(canCreate ? [{ kind: 'create' as const, name: typed }] : []),
    ...selected.map((name) => ({ kind: 'tag' as const, name })),
    ...others.map((name) => ({ kind: 'tag' as const, name })),
  ];
  const added = draft.filter((t) => !base.includes(t));
  const removed = base.filter((t) => !draft.includes(t));
  const changed = added.length + removed.length > 0;

  /* where every row sits before a move, so the layout effect can slide each one from there */
  const remember = () => {
    const box = listRef.current;
    if (!box) return;
    const at: Record<string, number> = {};
    box.querySelectorAll<HTMLElement>('[data-tag]').forEach((el) => {
      at[el.dataset.tag ?? ''] = el.getBoundingClientRect().top;
    });
    flip.current = at;
  };
  const toggle = (name: string, byPointer: boolean) => {
    if (byPointer && Date.now() < lockUntil.current) return;
    remember();
    if (draft.includes(name)) setDraft(draft.filter((t) => t !== name));
    else {
      setDraft([...draft, name]);
      setLanded(name);
    }
    if (byPointer) lockUntil.current = Date.now() + 280;
  };
  const create = (name: string) => {
    remember();
    setDraft([...draft, name]);
    setLanded(name);
    setQueryState('');
    setActive(-1);
  };
  const pick = (i: number, byPointer = false) => {
    const p = picks[i];
    if (!p) return;
    if (p.kind === 'create') create(p.name);
    else toggle(p.name, byPointer);
  };
  const setQuery = (v: string) => {
    setQueryState(v);
    setActive(v.trim() ? 0 : -1);
  };

  useLayoutEffect(() => {
    const from = flip.current;
    flip.current = null;
    const box = listRef.current;
    if (!from || !box) return;
    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    box.querySelectorAll<HTMLElement>('[data-tag]').forEach((el) => {
      const was = from[el.dataset.tag ?? ''];
      if (was === undefined || typeof el.animate !== 'function') return;
      const dy = was - el.getBoundingClientRect().top;
      if (Math.abs(dy) < 1) return;
      el.animate([{ transform: `translateY(${String(dy)}px)` }, { transform: 'translateY(0)' }], {
        duration: 240,
        easing: 'cubic-bezier(.2,.8,.2,1)',
      });
    });
  });
  useEffect(() => {
    if (!landed) return undefined;
    const t = window.setTimeout(() => {
      setLanded(null);
    }, 1100);
    return () => {
      window.clearTimeout(t);
    };
  }, [landed]);
  useEffect(() => {
    if (active < 0 || !byKey.current) return;
    byKey.current = false;
    const el = listRef.current?.querySelector<HTMLElement>(`[data-i="${String(active)}"]`);
    if (el && typeof el.scrollIntoView === 'function') el.scrollIntoView({ block: 'nearest' });
  }, [active]);

  /** The keys, for whichever field drives the picker (its own search, or the row's field). */
  const keyHandler =
    ({ apply, cancel }: { apply: () => void; cancel: () => void }) =>
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        byKey.current = true;
        setActive(Math.min(picks.length - 1, active + 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        byKey.current = true;
        setActive(Math.max(0, active - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (active >= 0) pick(active);
        else if (!typed && changed) apply();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        if (query) setQuery('');
        else cancel();
      }
    };

  return {
    draft,
    query,
    setQuery,
    typed,
    active,
    setActive,
    landed,
    start,
    selected,
    others,
    canCreate,
    picks,
    pick,
    added,
    removed,
    changed,
    listRef,
    keyHandler,
    counts,
  };
}

export type TagDraft = ReturnType<typeof useTagDraft>;

/** The typed part of a name at 600, the rest as it is. */
function Highlight({ text, query }: { text: string; query: string }) {
  const k = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (k < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, k)}
      <b className="mdt-font-semibold">{text.slice(k, k + query.length)}</b>
      {text.slice(k + query.length)}
    </>
  );
}

const ROW = [
  'mdt-relative mdt-mx-1.5 mdt-flex mdt-h-[34px] mdt-cursor-pointer mdt-select-none mdt-items-center mdt-gap-2.5',
  'mdt-rounded-md mdt-px-2 mdt-text-sm mdt-text-neutral-130',
];
const GROUP =
  'mdt-flex mdt-justify-between mdt-px-3.5 mdt-pb-1 mdt-pt-2 mdt-text-[11px] mdt-font-semibold mdt-uppercase mdt-tracking-[0.05em] mdt-text-muted-foreground';

export interface TagPickerProps {
  draft: TagDraft;
  /** The list's accessible name. */
  label: string;
  onApply: () => void;
  onCancel: () => void;
  /** Rendered above the list - the popover variant's search field. */
  header?: React.ReactNode;
}

/** The list, its groups, and the Apply / Cancel footer. The surface around it is the caller's. */
export const TagPicker = forwardRef<HTMLDivElement, TagPickerProps>(
  ({ draft: d, label, onApply, onCancel, header }, ref) => {
    let i = -1;
    const row = (name: string) => {
      i += 1;
      const idx = i;
      const on = d.draft.includes(name);
      return (
        <div
          key={name}
          data-tag={name}
          data-i={idx}
          role="option"
          aria-selected={on}
          data-active={idx === d.active ? '' : undefined}
          data-landed={d.landed === name ? '' : undefined}
          className={cn(
            ROW,
            'data-[active]:mdt-bg-neutral-10',
            'data-[landed]:mdt-animate-tag-landed motion-reduce:data-[landed]:mdt-animate-none'
          )}
          onMouseMove={() => {
            if (d.active !== idx) d.setActive(idx);
          }}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              d.pick(idx);
            }
          }}
          onClick={() => {
            d.pick(idx, true);
          }}
        >
          <Checkbox
            checked={on}
            tabIndex={-1}
            aria-hidden="true"
            className="mdt-pointer-events-none mdt-shrink-0"
          />
          <span
            className="mdt-inline-flex mdt-shrink-0 mdt-text-muted-foreground"
            aria-hidden="true"
          >
            <Icon name="tag" size={14} />
          </span>
          <span className="mdt-min-w-0 mdt-flex-1 mdt-truncate">
            <Highlight text={name} query={d.typed} />
          </span>
          <span className="mdt-text-xs mdt-tabular-nums mdt-text-muted-foreground">
            {d.counts[name] ?? (on ? 1 : 0)}
          </span>
        </div>
      );
    };
    const diff = d.changed
      ? [
          d.added.length ? `${String(d.added.length)} to add` : '',
          d.removed.length ? `${String(d.removed.length)} to remove` : '',
        ]
          .filter(Boolean)
          .join(' · ')
      : `${String(d.draft.length)} selected`;
    const createIdx = d.canCreate ? (i += 1) : -1;
    return (
      <div
        ref={ref}
        className="mdt-flex mdt-max-h-[380px] mdt-w-80 mdt-flex-col"
        data-slot="tag-picker"
      >
        {header}
        <div
          ref={d.listRef as RefObject<HTMLDivElement>}
          role="listbox"
          aria-multiselectable="true"
          aria-label={label}
          className="mdt-flex-1 mdt-overflow-y-auto mdt-overscroll-contain mdt-pb-1.5 mdt-pt-1"
        >
          {d.canCreate ? (
            <div
              data-i={createIdx}
              role="option"
              aria-selected="false"
              data-active={createIdx === d.active ? '' : undefined}
              data-slot="tag-picker-create"
              className={cn(
                ROW,
                'mdt-font-medium mdt-text-[color:var(--mdt-badge-info-ink)] data-[active]:mdt-bg-neutral-10'
              )}
              onMouseMove={() => {
                if (d.active !== createIdx) d.setActive(createIdx);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              tabIndex={-1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  d.pick(createIdx);
                }
              }}
              onClick={() => {
                d.pick(createIdx, true);
              }}
            >
              <Icon name="plus" size={14} aria-hidden />
              <span className="mdt-min-w-0 mdt-flex-1 mdt-truncate">
                Create{' '}
                <span className="mdt-font-semibold mdt-text-neutral-130">{`“${d.typed}”`}</span>
              </span>
            </div>
          ) : null}
          {d.selected.length > 0 ? (
            <div className={GROUP}>
              <span>Selected</span>
              <span>{d.draft.length}</span>
            </div>
          ) : null}
          {d.selected.map(row)}
          {d.others.length > 0 ? (
            <div className={GROUP}>
              <span>{d.typed ? 'Other tags' : 'Suggested'}</span>
            </div>
          ) : null}
          {d.others.map(row)}
          {d.picks.length === 0 ? (
            <div className="mdt-px-4 mdt-pb-6 mdt-pt-5 mdt-text-center mdt-text-[13px] mdt-leading-normal mdt-text-muted-foreground">
              <b className="mdt-mb-0.5 mdt-block mdt-text-sm mdt-font-semibold mdt-text-neutral-130">
                No tags yet
              </b>
              Type a word to create the first one.
            </div>
          ) : null}
        </div>
        <div className="mdt-flex mdt-shrink-0 mdt-items-center mdt-justify-between mdt-gap-2 mdt-border-t mdt-border-neutral-30 mdt-py-2 mdt-pl-3.5 mdt-pr-2">
          <span
            className="mdt-text-xs mdt-tabular-nums mdt-text-muted-foreground"
            data-slot="tag-picker-diff"
          >
            {diff}
          </span>
          <span className="mdt-inline-flex mdt-gap-1.5">
            <Button variant="ghost" size="sm" onClick={onCancel}>
              Cancel
            </Button>
            <Button size="sm" disabled={!d.changed} onClick={onApply}>
              Apply
            </Button>
          </span>
        </div>
      </div>
    );
  }
);
TagPicker.displayName = 'TagPicker';
