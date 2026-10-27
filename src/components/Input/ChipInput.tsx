'use client';

import { useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import { InputVariants } from './Input';
import { TagPill } from '../TagPill';
import type { ChipInputProps } from './ChipInput.types';

/** Anything between two values: a comma, a semicolon or white space. */
const SEPARATOR = /[\s,;]+/;

const splitValues = (raw: string) =>
  raw
    .split(SEPARATOR)
    .map((x) => x.trim())
    .filter(Boolean);

/* the library field's edge (Input), on a box: the focus it draws is the box's focus-within, since the input inside is bare */
const BOX =
  'mdt-h-auto mdt-min-h-8 mdt-cursor-text mdt-flex-wrap mdt-items-center mdt-gap-1.5 mdt-px-2 mdt-py-0.5';
const BOX_FOCUS =
  'focus-within:mdt-border-primary focus-within:mdt-shadow-[0_0_0_3px_hsl(var(--mdt-primary)/0.08)]';
const BOX_ERROR_FOCUS =
  'focus-within:mdt-border-destructive focus-within:mdt-shadow-[0_0_0_3px_hsl(var(--mdt-destructive)/0.14)]';
const BOX_DISABLED = 'mdt-cursor-not-allowed mdt-bg-neutral-10 hover:mdt-border-neutral-30';

/**
 * ChipInput - a field that turns typed values into chips: Enter, a comma or a space adds what is typed, a pasted list
 * adds every value in it, Backspace on an empty field takes the last chip back, and a duplicate is dropped. A value
 * that fails `validate` stays in the field with the red edge and its message, so nothing typed is lost.
 *
 * @example
 * ```tsx
 * <ChipInput aria-label="Recipients" values={emails} onValuesChange={setEmails} />
 * ```
 */
export const ChipInput = ({
  values,
  onValuesChange,
  validate,
  placeholder = 'Type a value, press Enter',
  'aria-label': ariaLabel,
  mono = false,
  disabled = false,
  className,
}: ChipInputProps) => {
  const [draft, setDraft] = useState('');
  const [error, setError] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  /* a bad value keeps the whole draft in the field, so nothing typed is lost; the good ones wait until it is fixed */
  const commit = (raw: string) => {
    const typed = splitValues(raw);
    const failure = (validate && typed.map(validate).find(Boolean)) ?? null;
    if (failure) {
      setDraft(raw.trim());
      setError(failure);
      return;
    }
    const fresh = typed.filter((v, i) => !values.includes(v) && typed.indexOf(v) === i);
    if (fresh.length) onValuesChange([...values, ...fresh]);
    setDraft('');
    setError(null);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === ' ') {
      e.preventDefault();
      commit(draft);
    } else if (e.key === 'Backspace' && !draft && values.length) {
      e.preventDefault();
      onValuesChange(values.slice(0, -1));
    }
  };
  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text');
    if (!SEPARATOR.test(text)) return;
    e.preventDefault();
    commit(`${draft} ${text}`);
  };

  return (
    <div className={cn('mdt-flex mdt-min-w-0 mdt-flex-col mdt-gap-1', className)}>
      {/* a click anywhere on the box lands in the input, as on a plain field */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- the input inside takes the keyboard; the box only forwards a pointer press to it */}
      <div
        className={cn(
          InputVariants({ size: 'sm', hasError: Boolean(error) }),
          BOX,
          error ? BOX_ERROR_FOCUS : BOX_FOCUS,
          disabled && BOX_DISABLED
        )}
        onClick={() => input.current?.focus()}
      >
        {values.map((v) => (
          <TagPill
            key={v}
            shape="square"
            disabled={disabled}
            onRemove={() => {
              onValuesChange(values.filter((x) => x !== v));
            }}
          >
            <span className={cn(mono && 'mdt-font-mono')}>{v}</span>
          </TagPill>
        ))}
        <input
          ref={input}
          value={draft}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-invalid={error ? true : undefined}
          placeholder={values.length ? '' : placeholder}
          className={cn(
            'mdt-h-6 mdt-min-w-0 mdt-shrink-0 mdt-grow mdt-basis-32 mdt-border-none mdt-bg-transparent mdt-px-1 mdt-text-sm mdt-text-neutral-130 mdt-outline-none placeholder:mdt-font-normal placeholder:mdt-text-faint disabled:mdt-cursor-not-allowed',
            mono && 'mdt-font-mono'
          )}
          onChange={(e) => {
            setDraft(e.target.value);
            setError(null);
          }}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          onBlur={() => {
            commit(draft);
          }}
        />
      </div>
      {error && (
        <p
          className="mdt-m-0 mdt-flex mdt-items-start mdt-gap-1.5 mdt-text-xs mdt-text-destructive"
          role="alert"
        >
          <Icon name="alert-circle" size={12} className="mdt-mt-0.5 mdt-shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
};
