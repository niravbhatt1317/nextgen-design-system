import { forwardRef, useRef, useState } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from '../Popover';
import { TagPill } from '../TagPill';
import { TagPicker, useTagDraft, type TagDraft } from './TagPicker';
import type { InlineTagsProps } from './InlineTags.types';

/*
 * InlineTags - a record's tags, and the place to change them (Pranjal, 2026-09-29; reworked 2026-10-13 from the
 * table-tag-editor mock, first built in the console's Client organizations table and organization header).
 *
 * variant="inline" (the default - a header or a details row): the tags as square TagPills, then a blue dashed
 * "+ Add tag" that turns into a search field IN THE SAME SPOT. Under the field, the tag picker: Selected and Suggested
 * with ticks, Create "...", Apply / Cancel. The row holds still while the picker is open - ticks are a draft, the
 * pills' ✕ hides - and changes once, on Apply. (Until 2026-10-13 this was dashed suggestion chips under the field and
 * a drop-down of earlier tags; every add landed at once and moved the field along the row.)
 *
 * variant="popover" (a table cell): the cell shows the tags - or "Add tags" - as a button; pressed, a popover opens
 * with the search on top and the same picker under it.
 *
 * Both: Apply hands back the whole new list; Cancel or Escape drops the draft. A press outside with nothing changed
 * closes; with unapplied ticks it is swallowed and the picker wears the filter panel's one-second halo.
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

/** The popover's surface; the halo is the AdvancedFilter's "finish or close me" light. */
const POP_CLASSES = [
  'mdt-w-auto mdt-p-0 mdt-transition-shadow',
  'data-[nudge]:mdt-shadow-[0_0_0_4px_hsl(var(--mdt-nudge)/0.12),0_12px_32px_-12px_rgba(29,43,62,0.22),0_2px_8px_rgba(29,43,62,0.06)]',
];

/** The popover variant's door: the tags in a row, or the quiet "Add tags". */
const DOOR_CLASSES = [
  'mdt-flex mdt-min-h-8 mdt-w-full mdt-cursor-pointer mdt-items-center mdt-gap-1 mdt-rounded-lg mdt-border-0',
  'mdt-bg-transparent mdt-px-2 mdt-text-left hover:mdt-bg-neutral-10 data-[state=open]:mdt-bg-neutral-10',
  'disabled:mdt-cursor-default disabled:hover:mdt-bg-transparent',
  FOCUS_RING,
];

/** A press outside with unapplied ticks: swallowed, and the picker lit for a second. */
function useHold(d: TagDraft) {
  const [nudge, setNudge] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const hold = (e: { preventDefault: () => void }) => {
    if (!d.changed) return;
    e.preventDefault();
    /* swallow the click that follows, so the row or button behind never reacts */
    const eat = (ev: MouseEvent) => {
      ev.stopPropagation();
      ev.preventDefault();
    };
    document.addEventListener('click', eat, { capture: true, once: true });
    window.setTimeout(() => {
      document.removeEventListener('click', eat, { capture: true });
    }, 600);
    if (!nudge) {
      setNudge(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        setNudge(false);
      }, 1000);
    }
  };
  return { nudge, hold };
}

/**
 * InlineTags - a record's tags with a picker to change them: inline in a row, or from a table cell.
 *
 * @example
 * ```tsx
 * <InlineTags value={tags} onChange={setTags} options={everyTagUsedBefore} counts={usage} />
 * <InlineTags variant="popover" value={row.tags} onChange={(t) => save(row, t)} options={everyTagUsedBefore} />
 * ```
 */
const InlineTags = forwardRef<HTMLDivElement, InlineTagsProps>(
  (
    {
      value,
      onChange,
      suggestions = [],
      options = [],
      counts = {},
      variant = 'inline',
      trigger,
      addLabel = 'Add tag',
      emptyLabel = 'Add tags',
      placeholder = 'Search or create a tag',
      label = 'Tags',
      disabled = false,
      className,
      ...rest
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const d = useTagDraft({ options, suggestions, counts });
    const { nudge, hold } = useHold(d);
    const fieldRef = useRef<HTMLDivElement | null>(null);

    const openIt = () => {
      d.start(value);
      setOpen(true);
    };
    const cancel = () => {
      setOpen(false);
    };
    const apply = () => {
      if (d.changed) onChange([...d.draft]);
      setOpen(false);
    };
    const onOpenChange = (next: boolean) => {
      if (next) openIt();
      else if (!d.changed) setOpen(false);
    };
    const keys = d.keyHandler({ apply, cancel });
    const search = (
      <Input
        size="sm"
        // eslint-disable-next-line jsx-a11y/no-autofocus -- the field exists only because the picker was just opened
        autoFocus
        value={d.query}
        placeholder={placeholder}
        aria-label={placeholder}
        startAdornment={<Icon name="search" size={14} aria-hidden />}
        {...(d.query
          ? {
              onClear: () => {
                d.setQuery('');
              },
            }
          : {})}
        onChange={(e) => {
          d.setQuery(e.target.value);
        }}
        onKeyDown={keys}
      />
    );
    const content = (header?: React.ReactNode) => (
      <PopoverContent
        className={cn(POP_CLASSES)}
        side="bottom"
        align="start"
        sideOffset={6}
        collisionPadding={12}
        data-nudge={nudge ? '' : undefined}
        onOpenAutoFocus={(e) => {
          if (variant === 'inline') e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
        onFocusOutside={(e) => {
          e.preventDefault();
        }}
        onPointerDownOutside={(e) => {
          const t = e.target;
          if (fieldRef.current && t instanceof Node && fieldRef.current.contains(t)) {
            e.preventDefault();
            return;
          }
          hold(e);
        }}
      >
        <TagPicker draft={d} label={label} onApply={apply} onCancel={cancel} header={header} />
      </PopoverContent>
    );

    if (variant === 'popover') {
      const shown = value.slice(0, 2);
      const more = value.length - shown.length;
      return (
        <div ref={ref} className={cn('mdt-flex', className)} data-slot="inline-tags" {...rest}>
          <Popover open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>
              <button
                type="button"
                disabled={disabled}
                className={cn(DOOR_CLASSES)}
                aria-label={`Edit ${label.toLowerCase()}`}
                data-slot="inline-tags-door"
              >
                {trigger ??
                  (value.length ? (
                    <>
                      {shown.map((t) => (
                        <TagPill key={t} shape="square" readOnly>
                          {t}
                        </TagPill>
                      ))}
                      {more > 0 ? (
                        <span className="mdt-pl-0.5 mdt-text-xs mdt-text-muted-foreground">{`+${String(more)}`}</span>
                      ) : null}
                    </>
                  ) : (
                    <span className="mdt-text-[13px] mdt-text-muted-foreground">{emptyLabel}</span>
                  ))}
              </button>
            </PopoverTrigger>
            {content(
              <div className="mdt-shrink-0 mdt-border-b mdt-border-neutral-30 mdt-p-2">
                {search}
              </div>
            )}
          </Popover>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('mdt-flex mdt-flex-col', className)}
        data-slot="inline-tags"
        {...rest}
      >
        <Popover open={open} onOpenChange={onOpenChange}>
          <div className="mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-2">
            {value.map((t) => (
              <TagPill
                key={t}
                shape="square"
                icon={<Icon name="tag" />}
                disabled={disabled}
                onRemove={
                  disabled || open
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
              <PopoverAnchor asChild>
                <div ref={fieldRef} className="mdt-w-[220px] mdt-shrink-0">
                  {search}
                </div>
              </PopoverAnchor>
            ) : (
              <button
                type="button"
                className={cn(ADD_CLASSES)}
                data-slot="inline-tags-add"
                onClick={openIt}
              >
                <Icon name="plus" size={14} aria-hidden />
                {addLabel}
              </button>
            )}
          </div>
          {open ? content() : null}
        </Popover>
      </div>
    );
  }
);

InlineTags.displayName = 'InlineTags';

export { InlineTags };
