'use client';

import { forwardRef, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { cn } from '@/utils';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Banner } from '../Banner';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { Select } from '../Select';
import { Textarea } from '../Textarea';
import type { TargetBuilderProps, TargetEntry } from './TargetBuilder.types';

/* PORTED FROM THE CONSOLE (Ronak, 2026-10-26). The network discovery profile's Target step - Include targets and
 * Exclusions (features/discovery-profiles/wizard/steps-network.jsx IpBuilder, data.js INCLUDE_KINDS / ipEntryError):
 * a dashed add row (the type, 240 wide; the value in mono; Add at the field's 32), and above it the targets added, one
 * row each - the type's badge, the value in 12/500 mono cut with an ellipsis, a pencil and a bin. His rulings it keeps:
 * "after the add Include targets or Exclusions, user can also able to edit that" (2026-10-15, edit in the row, Enter
 * saves, Escape cancels); a block opens in a text area "like we give on add" (same day, Ctrl+Enter saves); "all black
 * text-line should align left with each other" (2026-10-19: the rows share four columns, the badge's as wide as the
 * widest); "please give the validation" (2026-10-22: Add and Save refuse a failing value, the message under the field,
 * live from the first refused press). The kinds and their checks are the caller's - the console's network set is in
 * the stories. */

const ROW_LINE = 'mdt-border-b mdt-border-neutral-20';

/**
 * TargetBuilder - a list of targets built one at a time: pick a type, type the value, Add. The added targets sit
 * above the add row, one row each with the type's badge, the value in mono, an edit pencil and a remove bin.
 *
 * @example
 * ```tsx
 * <TargetBuilder
 *   label="Include targets"
 *   kinds={[{ value: 'host', label: 'Specific IP / host', field: 'single', placeholder: '10.20.4.14' }]}
 *   defaultKind="host"
 *   entries={targets}
 *   onEntriesChange={setTargets}
 * />
 * ```
 */
const TargetBuilder = forwardRef<HTMLDivElement, TargetBuilderProps>(function TargetBuilder(
  {
    kinds,
    entries,
    onEntriesChange,
    label,
    defaultKind = '',
    onKindChange,
    placeholder = 'Add a target - choose a type…',
    tone = 'info',
    onUpload,
    fileHint = 'Single-column CSV - one entry per row, no header.',
    className,
    ...rest
  },
  ref
) {
  const labelId = useId();
  const [kind, setKind] = useState(defaultKind);
  const [value, setValue] = useState('');
  const [tried, setTried] = useState(false);
  const [editing, setEditing] = useState(-1);
  const [draft, setDraft] = useState('');
  const [editTried, setEditTried] = useState(false);
  /* the field a row opens in takes the focus, so the pencil leads straight to typing */
  const editInput = useRef<HTMLInputElement>(null);
  const editArea = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (editing < 0) return;
    (editArea.current ?? editInput.current)?.focus();
  }, [editing]);

  const kindOf = (k: string) => kinds.find((x) => x.value === k);
  const labelOf = (k: string) => kindOf(k)?.label ?? k;
  const def = kindOf(kind);
  const error = def && def.field !== 'file' ? (def.validate?.(value) ?? null) : null;
  const warning = def?.warning?.(value);

  const pick = (k: string) => {
    setKind(k);
    onKindChange?.(k);
    setValue('');
    setTried(false);
  };
  const add = (entry: TargetEntry) => {
    onEntriesChange([...entries, entry]);
    pick(defaultKind);
  };
  const onAdd = () => {
    if (!def) return;
    if (def.field === 'file') {
      const file = onUpload ? onUpload(kind) : `${kind}.csv`;
      if (file) add({ kind, file });
    } else if (error) setTried(true);
    else add({ kind, value: value.trim() });
  };

  /* editing a row: the type stays (a different type is a different entry); removing any row ends an edit */
  const startEdit = (i: number) => {
    setEditing(i);
    setDraft(entries[i]?.value ?? '');
    setEditTried(false);
  };
  const cancelEdit = () => {
    setEditing(-1);
    setDraft('');
    setEditTried(false);
  };
  const edited = editing >= 0 ? entries[editing] : undefined;
  const editError = edited ? (kindOf(edited.kind)?.validate?.(draft) ?? null) : null;
  const saveEdit = () => {
    const t = draft.trim();
    if (!t) return;
    if (editError) {
      setEditTried(true);
      return;
    }
    onEntriesChange(entries.map((x, j) => (j === editing ? { ...x, value: t } : x)));
    cancelEdit();
  };
  const remove = (i: number) => {
    onEntriesChange(entries.filter((_, j) => j !== i));
    cancelEdit();
  };
  const onEditKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  };
  /* a block: Enter is a new line, Ctrl/Cmd+Enter saves */
  const onBlockKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  };

  return (
    <div
      ref={ref}
      role="group"
      aria-labelledby={label ? labelId : undefined}
      className={cn('mdt-flex mdt-min-w-0 mdt-flex-col mdt-gap-1.5', className)}
      {...rest}
    >
      {label && (
        <span
          id={labelId}
          className="mdt-text-[13px] mdt-font-medium mdt-leading-[1.4] mdt-text-neutral-90"
        >
          {label}
        </span>
      )}

      {entries.length > 0 && (
        /* four columns - badge, value, pencil, bin - each row a subgrid, so the values start on one line */
        <ul className="mdt-m-0 mdt-mb-2.5 mdt-grid mdt-list-none mdt-grid-cols-[max-content_minmax(0,1fr)_auto_auto] mdt-overflow-hidden mdt-rounded-lg mdt-border mdt-border-neutral-20 mdt-p-0">
          {entries.map((entry, i) => {
            const k = kindOf(entry.kind);
            const last = i === entries.length - 1;
            const isFile = k?.field === 'file' || entry.file !== undefined;
            const badge = (
              <Badge size="sm" shape="square" tone={tone}>
                {labelOf(entry.kind)}
              </Badge>
            );
            if (editing === i && k?.field === 'multi') {
              return (
                <li
                  // eslint-disable-next-line react/no-array-index-key -- an entry has no identity beyond its place; the same value may be added twice
                  key={i}
                  className={cn(
                    'mdt-col-span-full mdt-flex mdt-flex-col mdt-gap-2 mdt-bg-secondary mdt-px-3 mdt-py-2.5',
                    !last && ROW_LINE
                  )}
                >
                  <div>{badge}</div>
                  <Textarea
                    size="sm"
                    rows={3}
                    resize="vertical"
                    ref={editArea}
                    aria-label={`Edit ${labelOf(entry.kind)}`}
                    className="mdt-font-mono"
                    value={draft}
                    {...(k.placeholder ? { placeholder: k.placeholder } : {})}
                    onChange={(e) => {
                      setDraft(e.target.value);
                    }}
                    onKeyDown={onBlockKey}
                    {...(editTried && editError ? { error: editError } : {})}
                  />
                  <div className="mdt-flex mdt-justify-end mdt-gap-2">
                    <Button variant="ghost" size="sm" onClick={cancelEdit}>
                      Cancel
                    </Button>
                    <Button variant="primary" size="sm" onClick={saveEdit} disabled={!draft.trim()}>
                      Save
                    </Button>
                  </div>
                </li>
              );
            }
            return (
              <li
                // eslint-disable-next-line react/no-array-index-key -- an entry has no identity beyond its place; the same value may be added twice
                key={i}
                className={cn(
                  'mdt-col-span-full mdt-grid mdt-grid-cols-subgrid mdt-items-center mdt-justify-items-start mdt-gap-x-2.5 mdt-py-1.5 mdt-pl-3 mdt-pr-2',
                  editing === i && 'mdt-bg-secondary',
                  !last && ROW_LINE
                )}
              >
                {badge}
                {editing === i ? (
                  <>
                    <div className="mdt-min-w-0 mdt-justify-self-stretch">
                      <Input
                        size="sm"
                        ref={editInput}
                        aria-label={`Edit ${labelOf(entry.kind)}`}
                        className="mdt-font-mono"
                        value={draft}
                        onChange={(e) => {
                          setDraft(e.target.value);
                        }}
                        onKeyDown={onEditKey}
                        {...(editTried && editError ? { error: editError } : {})}
                      />
                    </div>
                    {/* md = 32, the inline field's height */}
                    <Button variant="ghost" size="md" onClick={cancelEdit}>
                      Cancel
                    </Button>
                    <Button variant="primary" size="md" onClick={saveEdit} disabled={!draft.trim()}>
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <span className="mdt-min-w-0 mdt-max-w-full mdt-truncate mdt-font-mono mdt-text-xs mdt-font-medium mdt-leading-[1.3] mdt-text-foreground">
                      {isFile ? (entry.file ?? 'file.csv') : (entry.value ?? '')}
                    </span>
                    {!isFile && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconOnly
                        className="mdt-h-4 mdt-w-4"
                        title="Edit"
                        ariaLabel={`Edit ${entry.value ?? ''}`}
                        leftIcon={<Icon name="pencil" size={14} aria-hidden />}
                        onClick={() => {
                          startEdit(i);
                        }}
                      />
                    )}
                    {/* the bin keeps the last column even where a file row has no pencil */}
                    <span className="mdt-col-start-4 mdt-inline-flex">
                      <Button
                        variant="destructiveGhost"
                        size="sm"
                        iconOnly
                        className="mdt-h-4 mdt-w-4"
                        title="Remove"
                        ariaLabel={`Remove ${isFile ? (entry.file ?? '') : (entry.value ?? '')}`}
                        leftIcon={<Icon name="trash-2" size={14} aria-hidden />}
                        onClick={() => {
                          remove(i);
                        }}
                      />
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* the add row: dashed, on the sunken ground */}
      <div className="mdt-flex mdt-flex-col mdt-gap-2 mdt-rounded-lg mdt-border mdt-border-dashed mdt-border-input mdt-bg-secondary mdt-p-2.5">
        {/* items-start: the value's error line grows under it, the type and Add stay on the field's row */}
        <div className="mdt-flex mdt-items-start mdt-gap-2">
          <div className="mdt-w-60 mdt-shrink-0">
            <Select
              mode="single"
              size="sm"
              aria-label="Target type"
              options={kinds.map((x) => ({ value: x.value, label: x.label }))}
              value={kind || null}
              placeholder={placeholder}
              onChange={(v) => {
                pick(typeof v === 'string' ? v : '');
              }}
            />
          </div>
          {def?.field === 'single' && (
            <div className="mdt-min-w-0 mdt-flex-1">
              <Input
                size="sm"
                aria-label={def.label}
                className="mdt-font-mono"
                value={value}
                {...(def.placeholder ? { placeholder: def.placeholder } : {})}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    onAdd();
                  }
                }}
                {...(tried && error ? { error } : {})}
              />
            </div>
          )}
          {def?.field === 'file' && (
            /* on the field's 32 line, centred with the select and Upload beside it - the row starts at the top so a
             * field's error line can grow under it (Ronak, 2026-10-28: "align vertical center with dropdown") */
            <div className="mdt-flex mdt-min-h-8 mdt-min-w-0 mdt-flex-1 mdt-items-center mdt-text-xs mdt-leading-normal mdt-text-muted-foreground">
              {fileHint}
            </div>
          )}
          {def && def.field !== 'multi' && (
            /* md = 32, the field's height */
            <Button
              variant={def.field === 'file' ? 'outline' : 'primary'}
              size="md"
              onClick={onAdd}
              leftIcon={
                <Icon name={def.field === 'file' ? 'upload' : 'plus'} size={14} aria-hidden />
              }
            >
              {def.field === 'file' ? 'Upload' : 'Add'}
            </Button>
          )}
        </div>
        {def?.field === 'multi' && (
          <>
            <Textarea
              size="sm"
              rows={2}
              resize="vertical"
              aria-label={def.label}
              className="mdt-font-mono"
              value={value}
              {...(def.placeholder ? { placeholder: def.placeholder } : {})}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              {...(tried && error ? { error } : {})}
            />
            <div className="mdt-flex mdt-justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={onAdd}
                leftIcon={<Icon name="plus" size={14} aria-hidden />}
              >
                Add block
              </Button>
            </div>
          </>
        )}
        {warning ? (
          <Banner
            tone="warning"
            icon={<Icon name="alert-triangle" size={14} aria-hidden />}
            description={warning}
          />
        ) : null}
      </div>
    </div>
  );
});

TargetBuilder.displayName = 'TargetBuilder';

export { TargetBuilder };
