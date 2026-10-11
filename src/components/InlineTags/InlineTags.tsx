import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import { TagPill } from '../TagPill';
import type { InlineTagsProps } from './InlineTags.types';

/*
 * InlineTags - tags added in place, one at a time (Pranjal, 2026-09-29, from mocks/foundation/inline-tags.html).
 *
 * At rest: the tags as square TagPills with a tag glyph, then a blue dashed "+ Add tag". Clicked, the button becomes a
 * 28-tall field with a ✕ beside it (outside, not inside) and the suggested tags as dashed chips on a row under it.
 * Typing drops down the earlier tags that match, with Add "…" at the end for a new word - no tick and no Enter: a tag
 * is added from the list. Escape, the ✕ or a press outside closes it. Once added, the pill joins the row and "Add tag"
 * moves along after it. Everything is 28 tall so the row never jumps between states.
 */

/** The keyboard ring every control in the row wears. */
const FOCUS_RING =
  'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring';

/** The info badge's ink: azure-60 in light, #7FB2E0 in dark - the mock's blue in both themes. */
const ADD_CLASSES = [
  'mdt-inline-flex mdt-h-7 mdt-shrink-0 mdt-items-center mdt-gap-1.5 mdt-rounded-lg mdt-pl-2.5 mdt-pr-3',
  'mdt-border mdt-border-dashed mdt-border-[color:var(--mdt-badge-info-ink)] mdt-bg-transparent',
  'mdt-cursor-pointer mdt-text-xs mdt-font-medium mdt-text-[color:var(--mdt-badge-info-ink)] mdt-transition-colors',
  'hover:mdt-border-solid hover:mdt-bg-[var(--mdt-badge-info-fill)]',
  FOCUS_RING,
];

/** The open field: the Input's focused border and halo, at the pill's 28px. */
const FIELD_CLASSES = [
  'mdt-h-7 mdt-w-[200px] mdt-rounded-lg mdt-border mdt-border-primary mdt-bg-background mdt-px-3',
  'mdt-text-xs mdt-font-medium mdt-text-neutral-130 placeholder:mdt-font-normal placeholder:mdt-text-faint',
  'mdt-shadow-[0_0_0_3px_hsl(var(--mdt-primary)/0.08)] focus-visible:mdt-outline-none',
];

const CANCEL_CLASSES = [
  'mdt-inline-flex mdt-h-6 mdt-w-6 mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded-md mdt-border-0 mdt-p-0',
  'mdt-cursor-pointer mdt-bg-transparent mdt-text-muted-foreground hover:mdt-bg-neutral-10 hover:mdt-text-neutral-130',
  FOCUS_RING,
];

/** The drop-down wears the DropdownMenu's surface: hairline, corners 10, lg shadow, 6 inside. */
const LIST_CLASSES = [
  'mdt-absolute mdt-left-0 mdt-top-[calc(100%+6px)] mdt-z-50 mdt-max-h-[232px] mdt-w-60 mdt-overflow-auto',
  'mdt-rounded-[10px] mdt-border mdt-border-neutral-30 mdt-bg-popover mdt-p-1.5 mdt-shadow-lg',
];

const OPTION_CLASSES = [
  'mdt-flex mdt-h-8 mdt-w-full mdt-items-center mdt-gap-2 mdt-rounded-md mdt-border-0 mdt-bg-transparent mdt-px-2.5',
  'mdt-cursor-pointer mdt-text-left mdt-text-[13px] mdt-text-neutral-130 hover:mdt-bg-neutral-10',
  'focus-visible:mdt-bg-neutral-10 focus-visible:mdt-outline-none',
];

const SUGGESTION_CLASSES = [
  'mdt-h-6 mdt-rounded-lg mdt-border mdt-border-dashed mdt-border-neutral-30 mdt-bg-transparent mdt-px-2',
  'mdt-cursor-pointer mdt-text-xs mdt-font-medium mdt-text-neutral-90 hover:mdt-border-solid hover:mdt-text-neutral-130',
  FOCUS_RING,
];

const same = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

/** The typed part of an option in the heading ink at 600, the rest as it is. */
function Highlight({ text, query }: { text: string; query: string }) {
  const k = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (k < 0) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, k)}
      <b className="mdt-font-semibold mdt-text-foreground">{text.slice(k, k + query.length)}</b>
      {text.slice(k + query.length)}
    </span>
  );
}

/**
 * InlineTags - a row of tags with an "Add tag" that opens a field in place.
 *
 * @example
 * ```tsx
 * <InlineTags value={tags} onChange={setTags} suggestions={['Pilot', 'APAC']} options={everyTagUsedBefore} />
 * ```
 */
const InlineTags = forwardRef<HTMLDivElement, InlineTagsProps>(
  (
    {
      value,
      onChange,
      suggestions = [],
      options = [],
      addLabel = 'Add tag',
      placeholder = 'Type a tag',
      disabled = false,
      className,
      ...rest
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const rootRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const addRef = useRef<HTMLButtonElement | null>(null);
    const refocusAdd = useRef(false);
    const listId = useId();

    const has = (t: string) => value.some((v) => same(v, t));
    const typed = query.trim();
    const matches = typed
      ? options.filter((o) => !has(o) && o.toLowerCase().includes(typed.toLowerCase()))
      : [];
    const exact = typed !== '' && [...options, ...value].some((t) => same(t, typed));
    const leftSuggestions = suggestions.filter((s) => !has(s));

    const close = (focusAdd: boolean) => {
      refocusAdd.current = focusAdd;
      setOpen(false);
      setQuery('');
    };

    const add = (t: string, stayOpen: boolean) => {
      const v = t.trim();
      if (v && !has(v)) onChange([...value, v]);
      if (stayOpen) inputRef.current?.focus();
      else close(true);
    };

    // back on "Add tag" after an add or a cancel, so the keyboard keeps its place
    useEffect(() => {
      if (!open && refocusAdd.current) {
        refocusAdd.current = false;
        addRef.current?.focus();
      }
    }, [open]);

    // a press anywhere outside closes it, as in the mock
    useEffect(() => {
      if (!open) return undefined;
      const onDown = (e: MouseEvent) => {
        if (rootRef.current && !rootRef.current.contains(e.target as Node)) close(false);
      };
      document.addEventListener('mousedown', onDown);
      return () => {
        document.removeEventListener('mousedown', onDown);
      };
    }, [open]);

    const onOptionKey = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') close(true);
    };

    return (
      <div
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn('mdt-flex mdt-flex-col', className)}
        data-slot="inline-tags"
        {...rest}
      >
        <div className="mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-2">
          {value.map((t) => (
            <TagPill
              key={t}
              shape="square"
              icon={<Icon name="tag" />}
              disabled={disabled}
              onRemove={
                disabled
                  ? undefined
                  : () => {
                      onChange(value.filter((v) => v !== t));
                    }
              }
            >
              {t}
            </TagPill>
          ))}
          {disabled ? null : open ? (
            <span className="mdt-relative mdt-inline-flex mdt-items-center mdt-gap-1.5">
              <input
                ref={inputRef}
                // eslint-disable-next-line jsx-a11y/no-autofocus -- the field exists only because Add tag was just pressed
                autoFocus
                type="text"
                role="combobox"
                aria-label="New tag"
                aria-autocomplete="list"
                aria-expanded={typed !== ''}
                aria-controls={typed ? listId : undefined}
                value={query}
                placeholder={placeholder}
                className={cn(FIELD_CLASSES)}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    e.preventDefault();
                    close(true);
                  } else if (e.key === 'ArrowDown' && typed) {
                    e.preventDefault();
                    rootRef.current
                      ?.querySelector<HTMLButtonElement>('[data-slot="inline-tags-option"]')
                      ?.focus();
                  }
                }}
              />
              <button
                type="button"
                aria-label="Cancel"
                className={cn(CANCEL_CLASSES)}
                onClick={() => {
                  close(true);
                }}
              >
                <Icon name="x" size={14} aria-hidden />
              </button>
              {typed ? (
                <div
                  id={listId}
                  role="listbox"
                  aria-label="Earlier tags"
                  className={cn(LIST_CLASSES)}
                >
                  <div className="mdt-px-2.5 mdt-pb-1 mdt-pt-2 mdt-text-[11px] mdt-font-medium mdt-uppercase mdt-tracking-[0.04em] mdt-text-faint">
                    Earlier tags
                  </div>
                  {matches.length ? (
                    matches.map((m) => (
                      <button
                        key={m}
                        type="button"
                        role="option"
                        aria-selected="false"
                        data-slot="inline-tags-option"
                        className={cn(OPTION_CLASSES)}
                        onClick={() => {
                          add(m, false);
                        }}
                        onKeyDown={onOptionKey}
                      >
                        <span
                          className="mdt-inline-flex mdt-text-muted-foreground"
                          aria-hidden="true"
                        >
                          <Icon name="tag" size={14} />
                        </span>
                        <Highlight text={m} query={typed} />
                      </button>
                    ))
                  ) : (
                    <div className="mdt-p-2.5 mdt-text-xs mdt-text-muted-foreground">
                      No earlier tag matches.
                    </div>
                  )}
                  {!exact ? (
                    <button
                      type="button"
                      role="option"
                      aria-selected="false"
                      data-slot="inline-tags-option"
                      data-new=""
                      className={cn(OPTION_CLASSES, 'mdt-text-[color:var(--mdt-badge-info-ink)]')}
                      onClick={() => {
                        add(typed, false);
                      }}
                      onKeyDown={onOptionKey}
                    >
                      <Icon name="plus" size={14} aria-hidden />
                      <span>{`Add “${typed}”`}</span>
                    </button>
                  ) : null}
                </div>
              ) : null}
            </span>
          ) : (
            <button
              ref={addRef}
              type="button"
              className={cn(ADD_CLASSES)}
              data-slot="inline-tags-add"
              onClick={() => {
                setQuery('');
                setOpen(true);
              }}
            >
              <Icon name="plus" size={14} aria-hidden />
              {addLabel}
            </button>
          )}
        </div>
        {open && leftSuggestions.length > 0 ? (
          <div
            role="group"
            aria-label="Suggested tags"
            className="mdt-mt-2.5 mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-1.5"
          >
            <span className="mdt-mr-0.5 mdt-text-xs mdt-font-medium mdt-text-muted-foreground">
              Suggested
            </span>
            {leftSuggestions.map((s) => (
              <button
                key={s}
                type="button"
                className={cn(SUGGESTION_CLASSES)}
                onClick={() => {
                  add(s, true);
                }}
              >
                {`+ ${s}`}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);

InlineTags.displayName = 'InlineTags';

export { InlineTags };
