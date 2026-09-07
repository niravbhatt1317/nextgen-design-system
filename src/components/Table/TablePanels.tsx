import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/utils';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from '../Popover';

export interface TableColumnsPanelColumn {
  key: string;
  label: string;
  hidden: boolean;
}

export interface TableColumnsPanelProps {
  /** The control that opens the panel, usually a ToolbarButton. */
  trigger: ReactNode;
  /** Columns in display order, hidden ones included. */
  columns: TableColumnsPanelColumn[];
  /** Labels of the columns nobody can hide: Name on Users. Shown first, ticked and dimmed. */
  locked?: string[];
  onToggle: (key: string) => void;
  onHideAll: () => void;
  onShowAll: () => void;
  onReset: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const PANEL = 'mdt-w-[264px] mdt-rounded-xl mdt-px-3.5 mdt-pb-2.5 mdt-pt-4';
const ROW =
  'mdt-flex mdt-min-h-[34px] mdt-w-full mdt-items-center mdt-gap-2.5 mdt-rounded-md mdt-border-0 mdt-bg-transparent mdt-px-1 mdt-text-left mdt-text-[13px] mdt-font-medium mdt-text-neutral-130 hover:mdt-bg-neutral-10';
const SECTION =
  'mdt-mb-0.5 mdt-mt-2.5 mdt-flex mdt-min-h-6 mdt-items-center mdt-justify-between mdt-text-xs mdt-font-medium mdt-text-neutral-90';
const LINK =
  'mdt-rounded-md mdt-border-0 mdt-bg-transparent mdt-px-1.5 mdt-py-0.5 mdt-text-[13px] mdt-font-medium mdt-text-neutral-130 hover:mdt-bg-neutral-10 -mdt-mr-1.5';

function Search({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <label className="mdt-mb-3 mdt-flex mdt-h-8 mdt-items-center mdt-gap-2 mdt-rounded-lg mdt-border mdt-border-solid mdt-border-neutral-30 mdt-px-2.5 mdt-text-muted-foreground focus-within:mdt-border-neutral-90">
      <Icon name="search" size={14} />
      <input
        className="mdt-min-w-0 mdt-flex-1 mdt-border-0 mdt-bg-transparent mdt-text-[13px] mdt-text-neutral-130 mdt-outline-none placeholder:mdt-text-muted-foreground"
        placeholder="Search"
        aria-label={label}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </label>
  );
}

/**
 * The Columns panel behind the toolbar's Columns button: search, Shown and
 * Hidden groups, Hide all, Show all, Reset. Locked columns are ticked and dimmed.
 */
function TableColumnsPanel({
  trigger,
  columns,
  locked = [],
  onToggle,
  onHideAll,
  onShowAll,
  onReset,
  open,
  onOpenChange,
}: TableColumnsPanelProps) {
  const [q, setQ] = useState('');
  const match = (label: string) => label.toLowerCase().includes(q.trim().toLowerCase());
  const shown = columns.filter((c) => !c.hidden && match(c.label));
  const hidden = columns.filter((c) => c.hidden && match(c.label));
  return (
    <Popover {...(open !== undefined ? { open } : {})} {...(onOpenChange ? { onOpenChange } : {})}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align="end" sideOffset={6} className={PANEL} aria-label="Columns">
        <div className="mdt-mb-2.5 mdt-flex mdt-items-center mdt-justify-between">
          <span className="mdt-text-base mdt-font-semibold mdt-text-neutral-130">Columns</span>
          <button type="button" className={LINK} onClick={onReset}>
            Reset
          </button>
        </div>
        <Search value={q} onChange={setQ} label="Search columns" />
        <div className={SECTION}>
          <span>Shown in table</span>
          <button type="button" className={LINK} onClick={onHideAll}>
            Hide all
          </button>
        </div>
        {locked.filter(match).map((label) => (
          <div
            key={label}
            className={cn(ROW, 'mdt-cursor-default hover:mdt-bg-transparent')}
            aria-disabled="true"
          >
            <span className="mdt-flex-1">{label}</span>
            <Checkbox
              checked
              disabled
              aria-label={`${label} is always shown`}
              className="mdt-border-neutral-40 data-[state=checked]:mdt-border-neutral-40 data-[state=checked]:mdt-bg-neutral-50"
            />
          </div>
        ))}
        {shown.map((c) => (
          <button
            key={c.key}
            type="button"
            className={ROW}
            onClick={() => {
              onToggle(c.key);
            }}
            aria-pressed="true"
          >
            <span className="mdt-flex-1">{c.label}</span>
            <Checkbox
              checked
              tabIndex={-1}
              aria-hidden="true"
              className="mdt-pointer-events-none mdt-border-neutral-40"
            />
          </button>
        ))}
        {hidden.length > 0 && (
          <>
            <div className={cn(SECTION, 'mdt-mt-3')}>
              <span>Hidden in table</span>
              <button type="button" className={LINK} onClick={onShowAll}>
                Show all
              </button>
            </div>
            {hidden.map((c) => (
              <button
                key={c.key}
                type="button"
                className={ROW}
                onClick={() => {
                  onToggle(c.key);
                }}
                aria-pressed="false"
              >
                <span className="mdt-flex-1">{c.label}</span>
                <Checkbox
                  checked={false}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="mdt-pointer-events-none mdt-border-neutral-40"
                />
              </button>
            ))}
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}

export interface TableInsertPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The "+" button the panel hangs from. */
  anchor: HTMLElement | null;
  /** The heading the picked column will follow. */
  afterLabel: string;
  hidden: { key: string; label: string }[];
  onPick: (key: string) => void;
}

/** The insert-in-place panel: the same parts as the Columns panel, listing the hidden columns with a "+". */
function TableInsertPanel({
  open,
  onOpenChange,
  anchor,
  afterLabel,
  hidden,
  onPick,
}: TableInsertPanelProps) {
  const [q, setQ] = useState('');
  const anchorRef = useRef<HTMLElement | null>(anchor);
  anchorRef.current = anchor;
  const list = hidden.filter((c) => c.label.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverAnchor virtualRef={anchorRef} />
      <PopoverContent
        align="start"
        sideOffset={6}
        className={PANEL}
        aria-label={`Insert a column after ${afterLabel}`}
      >
        <div className="mdt-mb-2.5 mdt-text-base mdt-font-semibold mdt-text-neutral-130">
          Insert a column
        </div>
        <Search value={q} onChange={setQ} label="Search hidden columns" />
        <div className={SECTION}>
          <span>Hidden in table · goes after {afterLabel}</span>
        </div>
        {list.map((c) => (
          <button
            key={c.key}
            type="button"
            className={ROW}
            onClick={() => {
              onPick(c.key);
            }}
          >
            <span className="mdt-flex-1">{c.label}</span>
            <Icon name="plus" size={14} className="mdt-text-neutral-90" />
          </button>
        ))}
        {list.length === 0 && (
          <div className="mdt-px-1 mdt-py-2 mdt-text-xs mdt-text-muted-foreground">
            Nothing hidden matches.
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export { TableColumnsPanel, TableInsertPanel };
