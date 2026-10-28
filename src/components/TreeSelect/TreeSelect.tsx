'use client';

import { forwardRef, useId, useMemo, useState, type ReactNode } from 'react';
import { cn } from '@/utils';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { selectTriggerVariants } from '../Select';
import type { TreeSelectGroup, TreeSelectItem, TreeSelectProps } from './TreeSelect.types';

/* THE ROWS (ported from the console's region tree, parts.css .dp-tree, 2026-10-27): 36 tall at rest, 8 in and 2
 * down, corners 6, the secondary wash under the pointer. A child row steps 21 in from the spine and draws its branch
 * - 16 of hairline from the spine to the row's middle; under the last child the spine stops at the branch, a strip of
 * the popover's own ground covering the rest. A two-line row (an item: its name over its line) starts its parts at
 * the top so the chevron, the checkbox and the count sit on the NAME line, and its branch lands there too (16 down). */
const ROW =
  'mdt-relative mdt-flex mdt-min-h-9 mdt-items-center mdt-gap-2 mdt-rounded-md mdt-px-2 mdt-py-0.5 hover:mdt-bg-secondary';
const BRANCH =
  "mdt-pl-[21px] before:mdt-absolute before:mdt-left-0 before:mdt-top-1/2 before:mdt-w-4 before:mdt-border-0 before:mdt-border-t before:mdt-border-solid before:mdt-border-neutral-20 before:mdt-content-['']";
const LAST =
  "after:mdt-absolute after:mdt-bottom-0 after:mdt-left-[-1px] after:mdt-top-1/2 after:mdt-w-px after:mdt-bg-popover after:mdt-content-['']";
const TWO_LINE = 'mdt-items-start before:mdt-top-4 after:mdt-top-4';
/* the children's box: 22 in, the spine down its left edge; a leaf's box 35 in, its rows 29 in and 28 tall */
const KIDS = 'mdt-ml-[22px] mdt-border-0 mdt-border-l mdt-border-solid mdt-border-neutral-20';
const LEAF_KIDS = 'mdt-ml-[35px]';
const LEAF_ROW = 'mdt-min-h-7 mdt-pl-[29px]';
/* the words of a row are a button with nothing of its own: they pick, or they fold */
const PLAIN = 'mdt-m-0 mdt-cursor-pointer mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-left';
/* an unpicked box wears the neutral-40 hairline, as the console's does, not the primary edge */
const CHECK = 'data-[state=unchecked]:mdt-border-neutral-40';

const DEFAULT_NOUNS: { item: [string, string]; child: [string, string] } = {
  item: ['item', 'items'],
  child: ['sub-item', 'sub-items'],
};

const word = (pair: readonly [string, string], n: number) => (n === 1 ? pair[0] : pair[1]);
const count = (pair: readonly [string, string], n: number) => `${String(n)} ${word(pair, n)}`;

interface Picked {
  /** The item counts as picked: whole, or narrowed to some of its leaves. */
  on: boolean;
  /** The leaves the pick covers - all of them for a whole item. */
  leaves: string[];
  /** Some leaves, not all. */
  narrowed: boolean;
}

const leavesOf = (item: TreeSelectItem) => item.children ?? [];

/** What the value says about one item. */
function pickedOf(item: TreeSelectItem, value: readonly string[]): Picked {
  const kids = leavesOf(item);
  if (value.includes(item.id)) {
    return { on: true, leaves: kids.map((k) => k.id), narrowed: false };
  }
  const leaves = kids.filter((k) => value.includes(k.id)).map((k) => k.id);
  return {
    on: leaves.length > 0,
    leaves,
    narrowed: leaves.length > 0 && leaves.length < kids.length,
  };
}

/** Every id an item can put in the value: its own and its leaves'. */
const idsOf = (item: TreeSelectItem) => [item.id, ...leavesOf(item).map((k) => k.id)];
const without = (value: readonly string[], ids: readonly string[]) =>
  value.filter((v) => !ids.includes(v));

/**
 * TreeSelect - a pick from a tree, in a dropdown: groups that fold their items
 * away, the items, and what sits under each item, every level a checkbox.
 *
 * Ported from the console's region picker (the cloud discovery profile's
 * Provider & connection step, RegionSelect in parts.jsx, Ronak 2026-10-15/16):
 * geographies holding regions holding zones. Nothing here knows those words -
 * `nouns` supplies them - so the same field picks engines by family, folders by
 * site, or anything else that sits two levels deep.
 *
 * - A group's checkbox picks every item under it; its words fold it.
 * - An item's words pick it whole; its chevron opens its leaves.
 * - A leaf's checkbox narrows its item to the leaves ticked; the last leaf off
 *   drops the item, every leaf on collapses back to the whole item.
 * - The search narrows the items by name, line or code and opens every group
 *   that still has one; opening the field starts the search afresh and opens
 *   the groups that already hold a pick.
 * - The value is one flat list of ids (see `TreeSelectProps.value`).
 *
 * The field itself is the library's Select trigger; the list is a Popover as
 * wide as the field, 320 at least; the search is the Input; the folds are the
 * ghost icon Button; the picks the Checkbox; a pick in the closed field the
 * Badge, in the code face, with "k/N" in blue when the item is narrowed.
 *
 * @example
 * ```tsx
 * <TreeSelect
 *   groups={regions}
 *   value={picked}
 *   onChange={setPicked}
 *   label="Region(s)"
 *   placeholder="Select region(s)…"
 *   nouns={{ item: ['region', 'regions'], child: ['zone', 'zones'] }}
 * />
 * ```
 */
const TreeSelect = forwardRef<HTMLButtonElement, TreeSelectProps>(function TreeSelect(
  {
    groups,
    value,
    onChange,
    placeholder = 'Select…',
    searchPlaceholder = 'Search…',
    nouns,
    emptyText,
    maxPills = 1,
    size = 'sm',
    label,
    required = false,
    error,
    disabled = false,
    className,
    wrapperClassName,
    id: givenId,
    ...rest
  },
  ref
) {
  const ownId = useId();
  const id = givenId ?? ownId;
  const errorId = `${id}-error`;
  const itemNoun = nouns?.item ?? DEFAULT_NOUNS.item;
  const childNoun = nouns?.child ?? DEFAULT_NOUNS.child;

  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const items = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  /* the picks, in the order the value names them, an item once however many of its leaves are listed */
  const picked = useMemo(() => {
    const seen = new Set<string>();
    const out: TreeSelectItem[] = [];
    value.forEach((v) => {
      const item = items.find((i) => i.id === v || leavesOf(i).some((k) => k.id === v));
      if (item && !seen.has(item.id)) {
        seen.add(item.id);
        out.push(item);
      }
    });
    return out;
  }, [items, value]);
  const leafTotal = picked.reduce((n, item) => n + pickedOf(item, value).leaves.length, 0);

  const ql = q.trim().toLowerCase();
  const matches = (item: TreeSelectItem) =>
    !ql || [item.label, item.description, item.code].some((s) => s?.toLowerCase().includes(ql));
  const shown = groups
    .map((g) => ({ ...g, items: g.items.filter(matches) }))
    .filter((g) => g.items.length > 0);

  const onOpenChange = (next: boolean) => {
    if (next) {
      const o: Record<string, boolean> = {};
      groups.forEach((g) => {
        if (g.items.some((i) => pickedOf(i, value).on)) o[g.id] = true;
      });
      setExpanded(o);
      setQ('');
    }
    setOpen(next);
  };
  const flip = (key: string) => {
    setExpanded((p) => ({ ...p, [key]: !p[key] }));
  };

  const pickItem = (item: TreeSelectItem, on: boolean) => {
    const rest = without(value, idsOf(item));
    onChange(on ? rest : [...rest, item.id]);
  };
  const pickLeaf = (item: TreeSelectItem, leafId: string) => {
    const kids = leavesOf(item);
    const cur = pickedOf(item, value).leaves;
    const next = cur.includes(leafId) ? cur.filter((x) => x !== leafId) : [...cur, leafId];
    const rest = without(value, idsOf(item));
    if (next.length === 0) onChange(rest);
    else if (next.length === kids.length) onChange([...rest, item.id]);
    else onChange([...rest, ...kids.filter((k) => next.includes(k.id)).map((k) => k.id)]);
  };
  const pickGroup = (group: TreeSelectGroup) => {
    const off = group.items.filter((i) => !pickedOf(i, value).on);
    if (off.length === 0) onChange(without(value, group.items.flatMap(idsOf)));
    else onChange([...value, ...off.map((i) => i.id)]);
  };

  const fold = (key: string, isOpen: boolean, name: string) => (
    <Button
      iconOnly
      variant="ghost"
      size="sm"
      ariaLabel={`${isOpen ? 'Collapse' : 'Expand'} ${name}`}
      aria-expanded={isOpen}
      onClick={() => {
        flip(key);
      }}
      leftIcon={
        <Icon
          name="chevron-right"
          size={16}
          aria-hidden
          className={cn('mdt-transition-transform mdt-duration-[120ms]', isOpen && 'mdt-rotate-90')}
        />
      }
    />
  );

  const leafRow = (
    item: TreeSelectItem,
    leafId: string,
    name: string,
    on: boolean,
    last: boolean
  ) => (
    <div key={leafId} role="treeitem" aria-label={name} aria-selected={on}>
      <div className={cn(ROW, BRANCH, LEAF_ROW, last && LAST)}>
        <Checkbox
          className={CHECK}
          checked={on}
          onCheckedChange={() => {
            pickLeaf(item, leafId);
          }}
          aria-label={`${item.label} ${name}`}
        />
        <button
          type="button"
          onClick={() => {
            pickLeaf(item, leafId);
          }}
          className={cn(
            PLAIN,
            'mdt-min-w-0 mdt-flex-1 mdt-truncate mdt-text-xs mdt-leading-normal mdt-text-neutral-130'
          )}
        >
          {name}
        </button>
      </div>
    </div>
  );

  const itemRow = (item: TreeSelectItem, last: boolean) => {
    const kids = leavesOf(item);
    const p = pickedOf(item, value);
    const has = kids.length > 0;
    const isOpen = has && Boolean(expanded[item.id]);
    let countText = `no ${childNoun[1]}`;
    if (has) {
      countText = p.narrowed
        ? `${String(p.leaves.length)}/${String(kids.length)} ${childNoun[1]}`
        : count(childNoun, kids.length);
    }
    return (
      <div
        key={item.id}
        role="treeitem"
        aria-label={item.label}
        aria-selected={p.on}
        {...(has ? { 'aria-expanded': isOpen } : {})}
      >
        <div className={cn(ROW, BRANCH, TWO_LINE, last && LAST)}>
          {has ? fold(item.id, isOpen, item.label) : <span className="mdt-w-7 mdt-shrink-0" />}
          <span className="mdt-mt-1.5 mdt-inline-flex">
            <Checkbox
              className={CHECK}
              checked={p.on}
              onCheckedChange={() => {
                pickItem(item, p.on);
              }}
              aria-label={item.label}
            />
          </span>
          <button
            type="button"
            onClick={() => {
              pickItem(item, p.on);
            }}
            className={cn(
              PLAIN,
              'mdt-flex mdt-min-w-0 mdt-flex-1 mdt-flex-col mdt-gap-px mdt-pt-1.5'
            )}
          >
            <span className="mdt-max-w-full mdt-truncate mdt-text-xs mdt-font-medium mdt-leading-[1.3] mdt-text-neutral-130">
              {item.label}
            </span>
            {item.description && (
              <span className="mdt-max-w-full mdt-truncate mdt-text-[11px] mdt-leading-[1.2] mdt-text-faint">
                {item.description}
              </span>
            )}
          </button>
          <span
            className={cn(
              'mdt-mt-[7px] mdt-shrink-0 mdt-whitespace-nowrap mdt-text-[11px] mdt-font-medium mdt-leading-normal',
              p.narrowed ? 'mdt-text-blue-60' : 'mdt-text-faint'
            )}
          >
            {countText}
          </span>
        </div>
        {isOpen && (
          <div role="group" className={cn(KIDS, LEAF_KIDS)}>
            {kids.map((leaf, n) =>
              leafRow(item, leaf.id, leaf.label, p.leaves.includes(leaf.id), n === kids.length - 1)
            )}
          </div>
        )}
      </div>
    );
  };

  const groupRow = (group: TreeSelectGroup) => {
    const onN = group.items.filter((i) => pickedOf(i, value).on).length;
    const allOn = onN === group.items.length;
    const isOpen = Boolean(ql) || Boolean(expanded[group.id]);
    let state: boolean | 'indeterminate' = false;
    if (allOn) state = true;
    else if (onN > 0) state = 'indeterminate';
    return (
      <div
        key={group.id}
        role="treeitem"
        aria-expanded={isOpen}
        aria-selected={allOn}
        aria-label={group.label}
      >
        <div className={ROW}>
          {fold(group.id, isOpen, group.label)}
          <Checkbox
            className={CHECK}
            checked={state}
            onCheckedChange={() => {
              pickGroup(group);
            }}
            aria-label={`All ${group.label} ${itemNoun[1]}`}
          />
          <button
            type="button"
            onClick={() => {
              flip(group.id);
            }}
            className={cn(PLAIN, 'mdt-flex mdt-min-w-0 mdt-flex-1 mdt-items-center mdt-gap-2')}
          >
            {group.icon && (
              <span className="mdt-flex mdt-shrink-0 mdt-text-faint [&_svg]:mdt-size-3.5">
                {group.icon}
              </span>
            )}
            <span className="mdt-truncate mdt-text-[11px] mdt-font-semibold mdt-uppercase mdt-leading-[1.4] mdt-tracking-[0.05em] mdt-text-neutral-90">
              {group.label}
            </span>
          </button>
          <span className="mdt-shrink-0 mdt-font-mono mdt-text-[11px] mdt-leading-normal mdt-text-faint">
            {onN}/{group.items.length}
          </span>
        </div>
        {isOpen && (
          <div role="group" className={KIDS}>
            {group.items.map((item, n) => itemRow(item, n === group.items.length - 1))}
          </div>
        )}
      </div>
    );
  };

  const pill = (item: TreeSelectItem) => {
    const p = pickedOf(item, value);
    return (
      <Badge key={item.id} size="sm" shape="square" className="mdt-shrink-0">
        <span className="mdt-font-mono">{item.code ?? item.label}</span>
        {p.narrowed && (
          <span className="mdt-font-mono mdt-text-blue-60">
            &nbsp;{p.leaves.length}/{leavesOf(item).length}
          </span>
        )}
      </Badge>
    );
  };

  let fieldText: ReactNode = (
    <span className="mdt-truncate mdt-font-normal mdt-text-faint">{placeholder}</span>
  );
  if (picked.length > 0) {
    fieldText = (
      <>
        {picked.slice(0, maxPills).map(pill)}
        {picked.length > maxPills && (
          <span className="mdt-shrink-0 mdt-text-xs mdt-font-medium mdt-text-faint">
            +{picked.length - maxPills} more
          </span>
        )}
      </>
    );
  }

  const status =
    picked.length > 0
      ? `${count(itemNoun, picked.length)} · ${count(childNoun, leafTotal)}`
      : (emptyText ?? `No ${itemNoun[1]} selected`);

  return (
    <div className={cn('mdt-flex mdt-flex-col mdt-gap-1.5', wrapperClassName)}>
      {label && (
        <label htmlFor={id} className="mdt-text-[13px] mdt-font-medium mdt-text-neutral-90">
          {label}
          {required && <span className="mdt-ml-1 mdt-text-destructive">*</span>}
        </label>
      )}
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            id={id}
            type="button"
            disabled={disabled}
            aria-describedby={error ? errorId : undefined}
            data-slot="tree-select"
            className={cn(
              'mdt-group',
              selectTriggerVariants({ size, hasError: Boolean(error) }),
              className
            )}
            {...rest}
          >
            <span className="mdt-flex mdt-min-w-0 mdt-flex-1 mdt-items-center mdt-gap-1 mdt-overflow-hidden">
              {fieldText}
            </span>
            <Icon
              name="chevron-down"
              size={16}
              aria-hidden
              className="mdt-shrink-0 mdt-opacity-50 mdt-transition-transform group-data-[state=open]:mdt-rotate-180"
            />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={4}
          className="mdt-w-[var(--radix-popover-trigger-width)] mdt-min-w-80 mdt-overflow-hidden mdt-p-0"
        >
          <div className="mdt-flex mdt-flex-col mdt-gap-2 mdt-border-0 mdt-border-b mdt-border-solid mdt-border-neutral-20 mdt-p-2">
            <Input
              size="sm"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
              }}
              placeholder={searchPlaceholder}
              aria-label={`Search ${itemNoun[1]}`}
              startAdornment={<Icon name="search" size={14} aria-hidden />}
              clearLabel="Clear search"
              {...(q
                ? {
                    onClear: () => {
                      setQ('');
                    },
                  }
                : {})}
            />
            <div className="mdt-flex mdt-items-center mdt-justify-between mdt-gap-2 mdt-px-0.5">
              <span
                className="mdt-text-xs mdt-font-medium mdt-leading-[1.4] mdt-text-faint"
                aria-live="polite"
              >
                {status}
              </span>
              {picked.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onChange([]);
                  }}
                >
                  Clear all
                </Button>
              )}
            </div>
          </div>
          <div
            role="tree"
            aria-label={itemNoun[1]}
            className="mdt-max-h-80 mdt-overflow-auto mdt-p-1.5"
          >
            {shown.length === 0 && (
              <div className="mdt-px-2.5 mdt-py-3.5 mdt-text-center mdt-text-xs mdt-text-faint">
                No {itemNoun[1]} match “{q}”.
              </div>
            )}
            {shown.map(groupRow)}
          </div>
        </PopoverContent>
      </Popover>
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mdt-flex mdt-items-center mdt-gap-1.5 mdt-text-xs mdt-text-destructive"
        >
          <Icon name="alert-circle" size={12} aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
});

TreeSelect.displayName = 'TreeSelect';

export { TreeSelect };
