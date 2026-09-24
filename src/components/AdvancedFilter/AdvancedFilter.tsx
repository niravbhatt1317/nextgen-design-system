'use client';
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions -- the panel takes Enter from anywhere inside it */

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/utils';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu';
import type {
  AdvancedFilterProps,
  FilterGroup,
  FilterItem,
  FilterJoin,
  FilterKey,
  FilterKeyType,
  FilterRow,
  FilterValue,
} from './AdvancedFilter.types';

/**
 * AdvancedFilter - the "More filters" panel: rows of key · operator · value
 * that stack, and groups of them.
 *
 * Ruled by Pranjal on mocks/users/advanced-filter.html (2026-09-17 → 20) and
 * built into the Users list first; this is the same panel as a library part.
 *
 * ## What it does
 *
 * - The first row says **Where**; the second holds the one **And / Or** switch
 *   and every row after it follows. A page's quick filters are never keys in
 *   here.
 * - A key with a list of options always takes **many values**: *is* means any
 *   of them, *is not* none of them. Its menu opens with the library's Select
 *   all.
 * - A key is used **once**: a key another row holds is left out of a new row's
 *   key list. Add filter goes quiet when every key is in use, and until the row
 *   above it is complete.
 * - A row in the outer list ends in the **three-dot action**: Create group ·
 *   Remove (the only row clears instead). A **group** is the rules panel from
 *   the Figma - neutral-10, corners 8, 12 in, no edge line - indented to the
 *   controls column, with the And / Or that joins it sitting *outside* in the
 *   prefix column, level with its header. Inside: its own Where and And / Or,
 *   its rows (each ending in the ✕, because removing is all a row can do in
 *   there) and its own Add filter; its action offers Ungroup and Remove group.
 *   One level deep.
 * - **Apply**, or Enter, hands the page a FilterValue; **Clear all** hands it
 *   the empty one. Escape and a press outside close the panel.
 *
 * ## Where it sits
 *
 * The panel is positioned absolutely under its door: wrap the door and the
 * panel in one `relative inline-flex` element and it hangs 40 below the
 * door's top, on the door's left edge. It lays itself one layer under the
 * dropdowns, so every field inside it opens above it.
 *
 * ## Applying it
 *
 * `applyAdvanced(rows, value, keys)` filters a list; `countConditions(value)`
 * is the number for the door.
 */

export const OPERATORS: Record<FilterKeyType, readonly (readonly [string, string])[]> = {
  text: [
    ['is', 'is'],
    ['isnot', 'is not'],
    ['contains', 'contains'],
    ['starts', 'starts with'],
    ['empty', 'is empty'],
    ['notempty', 'is not empty'],
  ],
  pick: [
    ['is', 'is'],
    ['isnot', 'is not'],
    ['empty', 'is empty'],
    ['notempty', 'is not empty'],
  ],
  date: [
    ['on', 'is on'],
    ['before', 'is before'],
    ['after', 'is after'],
    ['within', 'within the last'],
    ['empty', 'is empty'],
  ],
};

const NO_VALUE = new Set(['empty', 'notempty']);

/* unknown → text, without ever stringifying an object */
const isNil = (v: unknown): v is null | undefined => v === null || v === undefined;
const str = (v: unknown): string =>
  typeof v === 'string'
    ? v
    : typeof v === 'number' || typeof v === 'boolean'
      ? String(v)
      : v instanceof Date
        ? v.toISOString()
        : '';

export const EMPTY_FILTER: FilterValue = { join: 'and', rows: [] };

export const isGroup = (it: FilterItem | undefined): it is FilterGroup =>
  /* `in` rather than reading `.group`: a row has no such property at all, so a
   * bare read returns `undefined` and the signature promises a boolean. It is
   * also the check TypeScript narrows on, so no cast is needed. */
  !!it && 'group' in it;

const blank = (): FilterRow => ({ key: null, op: null, value: null });
const newGroup = (rows: FilterRow[]): FilterGroup => ({
  group: true,
  join: 'and',
  rows: rows.length ? rows : [blank()],
});
const cloneItem = (it: FilterItem): FilterItem =>
  isGroup(it) ? { group: true, join: it.join, rows: it.rows.map((r) => ({ ...r })) } : { ...it };

const hasValue = (v: unknown): boolean =>
  Array.isArray(v) ? v.length > 0 : !isNil(v) && str(v).trim() !== '';
const isRowComplete = (r: FilterRow | undefined): boolean =>
  !!r && !!r.key && !!r.op && (NO_VALUE.has(r.op) || hasValue(r.value));

/** A row is complete with a key, an operator and a value (or an operator that needs none); a group when every row in it is. */
export const isComplete = (it: FilterItem | undefined): boolean =>
  isGroup(it) ? it.rows.length > 0 && it.rows.every(isRowComplete) : isRowComplete(it);

/** What counts: complete rows, and groups with their complete rows. A group with none is nothing. */
export const liveItems = (filter: FilterValue | undefined): FilterItem[] =>
  (filter?.rows ?? [])
    .map((it) => (isGroup(it) ? { ...it, rows: it.rows.filter(isRowComplete) } : it))
    .filter((it) => (isGroup(it) ? it.rows.length > 0 : isRowComplete(it)));

/** The number the door shows: a group's rows count one each. */
export const countConditions = (filter: FilterValue | undefined): number =>
  liveItems(filter).reduce((n, it) => n + (isGroup(it) ? it.rows.length : 1), 0);

const asDate = (v: unknown): Date | null =>
  v instanceof Date ? v : typeof v === 'string' || typeof v === 'number' ? new Date(v) : null;
const dayStart = (d: Date): number =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
const text = (v: unknown): string => str(v).toLowerCase();

/** Does one row of a list pass one condition? */
export function matchRow<Row>(
  row: Row,
  r: FilterRow,
  keys: FilterKey<Row>[],
  now: Date = new Date()
): boolean {
  const def = keys.find((k) => k.id === r.key);
  if (!def || !r.op) return true;
  const raw: unknown = def.get ? def.get(row) : (row as unknown as Record<string, unknown>)[def.id];
  const v = r.value;
  const s = str(raw);
  const empty = isNil(raw) || s === '';
  if (r.op === 'empty') return empty;
  if (r.op === 'notempty') return !empty;
  if (def.type === 'date') {
    const d = asDate(raw);
    if (!d || Number.isNaN(d.getTime())) return false;
    if (r.op === 'within') {
      const days = Number(v ?? 0);
      return (
        now.getTime() - d.getTime() <= days * 86400000 && d.getTime() <= now.getTime() + 86400000
      );
    }
    const picked = asDate(v);
    if (!picked || Number.isNaN(picked.getTime())) return true;
    const a = dayStart(d);
    const b = dayStart(picked);
    if (r.op === 'on') return a === b;
    if (r.op === 'before') return a < b;
    if (r.op === 'after') return a > b;
    return true;
  }
  const low = s.toLowerCase();
  /* a key with a list of options holds MANY picked values: is = any of them, is not = none of them */
  const many = Array.isArray(v) ? (v as unknown[]).map(text) : null;
  switch (r.op) {
    case 'is':
      return many ? many.includes(low) : low === text(v);
    case 'isnot':
      return many ? !many.includes(low) : low !== text(v);
    case 'contains':
      return low.includes(text(v));
    case 'starts':
      return low.startsWith(text(v));
    case 'any':
      return (many ?? [text(v)]).includes(low);
    default:
      return true;
  }
}

/* a group answers by its own join */
const matchItem = <Row,>(row: Row, it: FilterItem, keys: FilterKey<Row>[]): boolean =>
  isGroup(it)
    ? it.join === 'or'
      ? it.rows.some((r) => matchRow(row, r, keys))
      : it.rows.every((r) => matchRow(row, r, keys))
    : matchRow(row, it, keys);

/** The list, filtered. An empty filter returns it whole. */
export function applyAdvanced<Row>(
  rows: Row[],
  filter: FilterValue | undefined,
  keys: FilterKey<Row>[]
): Row[] {
  const live = liveItems(filter);
  if (!filter || !live.length) return rows;
  return rows.filter((row) =>
    filter.join === 'or'
      ? live.some((it) => matchItem(row, it, keys))
      : live.every((it) => matchItem(row, it, keys))
  );
}

/* ── the panel ── */

/* the outer row: prefix 64 (the switch is 8 in, as the Figma's And Or btn) · key 160 · operator 140 · value 206 · the action 28 */
const OUTER =
  'mdt-grid mdt-grid-cols-[64px_160px_140px_206px_28px] mdt-items-center mdt-gap-2 [&>*]:mdt-min-w-0';
/* a row inside a group, 12 in from a panel that starts at the key column: the widest key and value still read whole */
const INNER =
  'mdt-grid mdt-grid-cols-[64px_146px_106px_156px_28px] mdt-items-center mdt-gap-2 [&>*]:mdt-min-w-0';
/* a group in the outer list: the join outside, the panel from the key column on */
const GWRAP = 'mdt-grid mdt-grid-cols-[64px_1fr] mdt-items-start mdt-gap-2';
const PRE =
  'mdt-inline-flex mdt-h-8 mdt-items-center mdt-px-0.5 mdt-text-[13px] mdt-font-medium mdt-text-neutral-90';
/* the And / Or switch: a 32 chip, 8 in, with the exchange glyph */
const SWITCH = cn(
  'mdt-inline-flex mdt-h-8 mdt-cursor-pointer mdt-items-center mdt-gap-1.5 mdt-rounded-[8px] mdt-border mdt-border-neutral-30 mdt-bg-background mdt-px-2',
  'mdt-text-[13px] mdt-font-medium mdt-text-neutral-90 mdt-transition-colors hover:mdt-border-primary hover:mdt-text-primary',
  'focus-visible:mdt-border-primary focus-visible:mdt-shadow-[0_0_0_3px_hsl(var(--mdt-primary)/0.08)] focus-visible:mdt-outline-none',
  '[&>svg]:mdt-text-neutral-70 hover:[&>svg]:mdt-text-primary'
);
/* the 28 box: the ✕ and the three-dot action share the close button's treatment */
const BOX = cn(
  'mdt-inline-flex mdt-h-7 mdt-w-7 mdt-shrink-0 mdt-cursor-pointer mdt-items-center mdt-justify-center mdt-rounded-[6px] mdt-border-0 mdt-bg-transparent mdt-p-0',
  'mdt-text-neutral-90 mdt-transition-colors hover:mdt-bg-neutral-20 hover:mdt-text-primary',
  'focus-visible:mdt-shadow-[0_0_0_1px_hsl(var(--mdt-primary)),0_0_0_4px_hsl(var(--mdt-primary)/0.08)] focus-visible:mdt-outline-none',
  'data-[state=open]:mdt-bg-neutral-20 data-[state=open]:mdt-text-primary'
);
/* a long value or placeholder reads from the left on one line and ends in an ellipsis: the field's value sits in a flex
 * child that would not shrink, and a button centres its text by default */
const SELECT_FIX = cn(
  'mdt-text-left',
  '[&>span:first-child]:mdt-min-w-0 [&>span:first-child]:mdt-flex-1 [&>span:first-child]:mdt-truncate [&>span:first-child]:mdt-text-left',
  '[&>span:first-child_span]:mdt-block [&>span:first-child_span]:mdt-truncate'
);
/* the many-value field: its pill row shrinks to the field and stays on one line; a lone pick may take the whole width
 * (the 64 the library keeps is for the +N) */
const MULTI_FIX = cn(
  'mdt-overflow-hidden [&>div]:mdt-min-w-0 [&>div]:mdt-flex-nowrap',
  '[&>div:not(:has(.mdt-select-overflow))>.mdt-select-pill]:mdt-max-w-full'
);

/* Where on the first row, the one switch on the second, the word after */
function Prefix({
  index,
  join,
  onToggle,
}: {
  index: number;
  join: FilterJoin;
  onToggle: () => void;
}) {
  if (index === 0)
    return (
      <span className={PRE} data-prefix="">
        Where
      </span>
    );
  if (index === 1) {
    return (
      <button
        type="button"
        className={SWITCH}
        title="Switch between And and Or"
        data-join=""
        onClick={onToggle}
      >
        {join === 'and' ? 'And' : 'Or'}
        <Icon name="refresh-cw" size={14} aria-hidden />
      </button>
    );
  }
  return (
    <span className={PRE} data-prefix="">
      {join === 'and' ? 'And' : 'Or'}
    </span>
  );
}

type Action = readonly [
  label: string,
  icon: 'box-select' | 'corner-up-left' | 'trash-2',
  run: () => void,
  danger?: boolean,
];

/* the three-dot action: the 28 box with the menu under it. Not modal: a press elsewhere in the panel closes the menu
 * and lands where it was aimed, and the panel's own outside-press guard does not fire on it. */
function ActionMenu({ label, items }: { label: string; items: readonly Action[] }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button type="button" className={BOX} aria-label={label} title={label} data-action="">
          <Icon name="more-vertical" size={16} aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mdt-w-[176px]">
        {items.map(([itemLabel, icon, run, danger]) => (
          <DropdownMenuItem
            key={itemLabel}
            className={danger ? 'mdt-text-red-60' : undefined}
            onSelect={run}
          >
            <Icon name={icon} size={14} aria-hidden />
            {itemLabel}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const pickedId = (v: unknown): string | null => {
  if (isNil(v) || v === '') return null;
  if (Array.isArray(v)) {
    const first: unknown = v[0];
    return isNil(first) ? null : str(first);
  }
  return str(v);
};

interface ControlsProps<Row> {
  r: FilterRow;
  keys: FilterKey<Row>[];
  keyOptions: { value: string; label: string }[];
  onPatch: (patch: Partial<FilterRow>) => void;
}

/* the three controls of a row: key, operator, value */
function Controls<Row>({ r, keys, keyOptions, onPatch }: ControlsProps<Row>) {
  const def = keys.find((k) => k.id === r.key);
  const ops = def ? OPERATORS[def.type] : [];
  const optionList =
    def?.type === 'pick'
      ? typeof def.options === 'function'
        ? def.options()
        : (def.options ?? [])
      : [];
  const many: string[] = Array.isArray(r.value)
    ? (r.value as unknown[]).map(str)
    : !isNil(r.value) && r.value !== ''
      ? [str(r.value)]
      : [];
  const textValue = typeof r.value === 'string' ? r.value : '';
  const disabledField = (placeholder: string) => (
    <Select
      mode="single"
      size="sm"
      className={SELECT_FIX}
      disabled
      placeholder={placeholder}
      options={[]}
    />
  );
  return (
    <>
      <Select
        mode="single"
        size="sm"
        className={SELECT_FIX}
        placeholder="Select key"
        options={keyOptions}
        value={r.key}
        onChange={(v) => {
          const id = pickedId(v);
          if (id !== r.key) onPatch({ key: id, op: null, value: null });
        }}
      />
      {def ? (
        <Select
          mode="single"
          size="sm"
          className={SELECT_FIX}
          placeholder="Select operator"
          options={ops.map(([id, label]) => ({ value: id, label }))}
          value={r.op}
          onChange={(v) => {
            const id = pickedId(v);
            let value: unknown = r.value;
            if (id && NO_VALUE.has(id)) value = null;
            else if (def.type === 'pick' && !Array.isArray(value)) value = value ? [value] : [];
            onPatch({ op: id, value });
          }}
        />
      ) : (
        disabledField('Select operator')
      )}
      {!def || !r.op ? (
        disabledField('Select value')
      ) : NO_VALUE.has(r.op) ? (
        disabledField('—')
      ) : def.type === 'text' ? (
        <Input
          size="sm"
          placeholder="Type a value"
          value={textValue}
          onChange={(e) => {
            onPatch({ value: e.target.value });
          }}
        />
      ) : def.type === 'pick' ? (
        <Select
          mode="multiple"
          size="sm"
          className={MULTI_FIX}
          placeholder="Select one or more"
          options={optionList.map((o) => ({ value: o, label: o }))}
          value={many}
          onChange={(v) => {
            onPatch({ value: Array.isArray(v) ? v : v === null ? [] : [v] });
          }}
          showPills
          maxPills={1}
          overflowLabel={(n) => '+' + String(n)}
          onRemovePill={(val) => {
            onPatch({ value: many.filter((x) => x !== val) });
          }}
          selectAll
        />
      ) : r.op === 'within' ? (
        <Input
          size="sm"
          type="number"
          min={1}
          placeholder="Days"
          value={textValue}
          onChange={(e) => {
            onPatch({ value: e.target.value });
          }}
        />
      ) : (
        <Input
          size="sm"
          type="date"
          value={textValue}
          onChange={(e) => {
            onPatch({ value: e.target.value });
          }}
        />
      )}
    </>
  );
}

export function AdvancedFilter<Row = unknown>({
  open,
  onClose,
  keys,
  value = EMPTY_FILTER,
  onApply,
  width = 656,
  title = 'Filters',
  className,
}: AdvancedFilterProps<Row>) {
  const fromValue = (): FilterValue => ({
    join: value.join,
    rows: value.rows.length ? value.rows.map(cloneItem) : [blank()],
  });
  const [draft, setDraft] = useState<FilterValue>(fromValue);
  /* every open starts from what is applied */
  useEffect(() => {
    if (open) setDraft(fromValue());
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const setItems = (fn: (rows: FilterItem[]) => FilterItem[]) => {
    setDraft((d) => ({ ...d, rows: fn(d.rows) }));
  };
  const patchOuter = (i: number, patch: Partial<FilterRow>) => {
    setItems((rows) => rows.map((it, k) => (k === i && !isGroup(it) ? { ...it, ...patch } : it)));
  };
  const patchInner = (i: number, j: number, patch: Partial<FilterRow>) => {
    setItems((rows) =>
      rows.map((it, k) =>
        k === i && isGroup(it)
          ? { ...it, rows: it.rows.map((r, m) => (m === j ? { ...r, ...patch } : r)) }
          : it
      )
    );
  };
  const removeOuter = (i: number) => {
    setItems((rows) => (rows.length === 1 ? [blank()] : rows.filter((_, k) => k !== i)));
  };
  const removeInner = (i: number, j: number) => {
    setItems((rows) =>
      rows.map((it, k) =>
        k === i && isGroup(it)
          ? { ...it, rows: it.rows.length === 1 ? [blank()] : it.rows.filter((_, m) => m !== j) }
          : it
      )
    );
  };
  const createGroup = (i: number) => {
    setItems((rows) => rows.map((it, k) => (k === i && !isGroup(it) ? newGroup([{ ...it }]) : it)));
  };
  const ungroup = (i: number) => {
    setItems((rows) =>
      rows.flatMap((it, k) => (k === i && isGroup(it) ? it.rows.map((r) => ({ ...r })) : [it]))
    );
  };
  const removeGroup = (i: number) => {
    setItems((rows) => {
      const next = rows.filter((_, k) => k !== i);
      return next.length ? next : [blank()];
    });
  };
  const addOuter = () => {
    setItems((rows) => [...rows, blank()]);
  };
  const addInner = (i: number) => {
    setItems((rows) =>
      rows.map((it, k) => (k === i && isGroup(it) ? { ...it, rows: [...it.rows, blank()] } : it))
    );
  };
  const flip = (j: FilterJoin): FilterJoin => (j === 'and' ? 'or' : 'and');
  const toggleJoin = () => {
    setDraft((d) => ({ ...d, join: flip(d.join) }));
  };
  const toggleGroupJoin = (i: number) => {
    setItems((rows) =>
      rows.map((it, k) => (k === i && isGroup(it) ? { ...it, join: flip(it.join) } : it))
    );
  };

  const lastComplete = isComplete(draft.rows[draft.rows.length - 1]);
  /* one row per key: the keys other rows hold, inside groups too */
  const allRows = draft.rows.flatMap((it) => (isGroup(it) ? it.rows : [it]));
  const usedKeys = allRows.map((r) => r.key).filter((k): k is string => !!k);
  const keysLeft = keys.length - usedKeys.length > 0;
  const keyOptions = useMemo(() => keys.map((k) => ({ value: k.id, label: k.label })), [keys]);
  const keyOptionsFor = (r: FilterRow) => {
    const others = new Set(usedKeys.filter((k) => k !== r.key));
    return keyOptions.filter((o) => o.value === r.key || !others.has(o.value));
  };
  const apply = () => {
    onApply({ join: draft.join, rows: liveItems(draft) });
    onClose?.();
  };
  const clearAll = () => {
    setDraft({ join: 'and', rows: [blank()] });
    onApply(EMPTY_FILTER);
  };

  /* the panel closes on a press outside it that is not inside a dropdown, a listbox, the many-value field's dialog or a
   * menu, and on Escape when no dropdown is open (an open one takes the Escape itself, on capture, and prevents the
   * default) */
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return undefined;
    const outside = (e: MouseEvent) => {
      const el = e.target as Element | null;
      const host = panel.current?.parentElement;
      if (host && el && host.contains(el)) return;
      if (
        el?.closest(
          '[data-radix-popper-content-wrapper], [role="listbox"], [role="dialog"], [role="menu"]'
        )
      )
        return;
      onClose?.();
    };
    const key = (e: KeyboardEvent) => {
      if (
        e.key === 'Escape' &&
        !e.defaultPrevented &&
        !document.querySelector('[data-radix-popper-content-wrapper]')
      ) {
        onClose?.();
      }
    };
    document.addEventListener('mousedown', outside);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('mousedown', outside);
      document.removeEventListener('keydown', key);
    };
  }, [open, onClose]);

  if (!open) return null;

  const renderRow = (
    r: FilterRow,
    index: number,
    level: 'outer' | 'inner',
    join: FilterJoin,
    onToggle: () => void,
    onPatch: (patch: Partial<FilterRow>) => void,
    tail: ReactNode
  ) => (
    <div key={index} className={level === 'outer' ? OUTER : INNER} data-row="" data-level={level}>
      <Prefix index={index} join={join} onToggle={onToggle} />
      <Controls r={r} keys={keys} keyOptions={keyOptionsFor(r)} onPatch={onPatch} />
      {tail}
    </div>
  );

  return (
    <div
      ref={panel}
      role="dialog"
      aria-label={title}
      className={cn(
        'mdt-absolute mdt-left-0 mdt-top-10 mdt-box-border mdt-rounded-[8px] mdt-border mdt-border-neutral-30 mdt-bg-popover mdt-p-3 mdt-text-left mdt-text-popover-foreground',
        'mdt-shadow-[0_12px_32px_-12px_rgba(29,43,62,0.22),0_2px_8px_rgba(29,43,62,0.06)]',
        className
      )}
      style={{ width, zIndex: 'calc(var(--mdt-z-dropdown) - 1)' }}
      onKeyDown={(e) => {
        const target = e.target as Element;
        if (e.key === 'Enter' && !target.closest('[role=listbox], [role=menu]')) {
          e.preventDefault();
          apply();
        }
      }}
    >
      <div className="mdt-mb-4 mdt-flex mdt-h-7 mdt-items-center">
        <h3 className="mdt-m-0 mdt-text-sm mdt-font-medium mdt-text-neutral-90">{title}</h3>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        {draft.rows.map((it, i) =>
          isGroup(it) ? (
            <div key={'g' + String(i)} className={GWRAP} data-group="">
              {/* the join that binds the group to the rows around it - outside the panel, level with its header */}
              <div className="mdt-mt-3">
                <Prefix index={i} join={draft.join} onToggle={toggleJoin} />
              </div>
              <div
                /* neutral-10 alone left the group reading near-white on a dark panel; the
                   dark ground is neutral-160, so 150 is the same subtle lift */
                className="mdt-flex mdt-min-w-0 mdt-flex-col mdt-gap-3 mdt-rounded-[8px] mdt-bg-neutral-10 mdt-p-3 dark:mdt-bg-neutral-150"
                data-panel=""
              >
                <div
                  className="mdt-grid mdt-h-8 mdt-grid-cols-[1fr_28px] mdt-items-center mdt-gap-2"
                  data-group-head=""
                >
                  <span
                    className="mdt-text-xs mdt-font-semibold mdt-uppercase mdt-tracking-[0.02em] mdt-text-neutral-90"
                    data-group-label=""
                  >
                    Group
                  </span>
                  <ActionMenu
                    label="Group actions"
                    items={[
                      [
                        'Ungroup',
                        'corner-up-left',
                        () => {
                          ungroup(i);
                        },
                      ],
                      [
                        'Remove group',
                        'trash-2',
                        () => {
                          removeGroup(i);
                        },
                        true,
                      ],
                    ]}
                  />
                </div>
                {it.rows.map((r, j) =>
                  renderRow(
                    r,
                    j,
                    'inner',
                    it.join,
                    () => {
                      toggleGroupJoin(i);
                    },
                    (patch) => {
                      patchInner(i, j, patch);
                    },
                    <button
                      type="button"
                      className={BOX}
                      aria-label={it.rows.length === 1 ? 'Clear this filter' : 'Remove this filter'}
                      data-remove=""
                      onClick={() => {
                        removeInner(i, j);
                      }}
                    >
                      <Icon name="x" size={16} aria-hidden />
                    </button>
                  )
                )}
                <div>
                  <Button
                    variant="outline"
                    leftIcon={<Icon name="plus" size={14} />}
                    onClick={() => {
                      addInner(i);
                    }}
                    disabled={!isRowComplete(it.rows[it.rows.length - 1]) || !keysLeft}
                  >
                    Add filter
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            renderRow(
              it,
              i,
              'outer',
              draft.join,
              toggleJoin,
              (patch) => {
                patchOuter(i, patch);
              },
              <ActionMenu
                label="Filter actions"
                items={[
                  [
                    'Create group',
                    'box-select',
                    () => {
                      createGroup(i);
                    },
                  ],
                  [
                    'Remove',
                    'trash-2',
                    () => {
                      removeOuter(i);
                    },
                    true,
                  ],
                ]}
              />
            )
          )
        )}
      </div>
      <div className="mdt-mt-3">
        <Button
          variant="outline"
          leftIcon={<Icon name="plus" size={14} />}
          onClick={addOuter}
          disabled={!lastComplete || !keysLeft}
        >
          Add filter
        </Button>
      </div>
      <div className="mdt-mt-4 mdt-flex mdt-items-center mdt-justify-between mdt-border-t mdt-border-neutral-20 mdt-pt-3">
        <Button variant="outline" onClick={clearAll}>
          Clear all
        </Button>
        <Button variant="primary" onClick={apply}>
          Apply
          <span
            aria-hidden
            className="mdt-ml-1 mdt-inline-flex mdt-h-[18px] mdt-w-[18px] mdt-items-center mdt-justify-center mdt-rounded-[4px] mdt-border mdt-border-white/[0.28]"
          >
            <Icon name="corner-down-left" size={10} />
          </span>
        </Button>
      </div>
    </div>
  );
}
