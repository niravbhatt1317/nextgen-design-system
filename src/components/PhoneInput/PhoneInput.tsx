'use client';

import { forwardRef, useCallback, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Combobox } from '../Combobox';
import type { ComboboxOption } from '../Combobox';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { PHONE_COUNTRIES, joinPhone, phonePlaceholder, splitPhone } from './countries';
import type { PhoneInputProps, PhoneInputValue } from './PhoneInput.types';

/* THE PHONE FIELD - ported from the console (Pranjal, 2026-10-13), the console's
 * features/organizations/PhoneField.jsx (2026-10-02 Nikhil, the site drawer; the dial code beside the flag 2026-10-05;
 * one phone field for the site, contact and profile drawers, Pranjal's 2026-10-11 design picks "phone with flag (a)").
 * The library Input with the country at its start - its flag, its dial code and a chevron, which open the library
 * Combobox's list: a search box over every country, each with its flag, its name and its dial code at the right - and
 * the national number typed after it, the field hinting the country's own format. The number's left padding follows
 * the trigger's measured width, so "+1" and "+1868" both leave the typed number clear of it. A held (`locked`) field
 * keeps the country closed as well. Tokens only. */

/** The trigger's width before it has been measured (the console's fallback). */
const TRIGGER_FALLBACK_WIDTH = 48;
/** The gap from the trigger's end to the typed number. */
const NUMBER_GAP = 12;
/* the list is as wide as a field, not as the narrow trigger (the library Combobox sizes its popover to its trigger) */
const LIST_WIDTH = '300px';

/** The country's flag at 18, or its code in a tile when there is no flag to draw. */
const FlagMark = ({
  code,
  renderFlag,
}: {
  code: string;
  renderFlag: ((code: string) => ReactNode) | undefined;
}) => {
  const drawn = code && renderFlag ? renderFlag(code) : null;
  if (drawn !== null && drawn !== undefined && drawn !== false) return <>{drawn}</>;
  return (
    <span
      aria-hidden="true"
      data-phone-flag-tile=""
      className="mdt-inline-flex mdt-h-[18px] mdt-w-[18px] mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded mdt-bg-neutral-10 mdt-text-[10px] mdt-font-semibold mdt-leading-none mdt-tracking-[0.02em] mdt-text-foreground mdt-shadow-[0_0_0_1px_hsl(var(--mdt-foreground)/0.08)]"
    >
      {(code || '—').slice(0, 2)}
    </span>
  );
};

const toParts = (v: PhoneInputValue | string | undefined, hint: string): PhoneInputValue =>
  typeof v === 'string' ? splitPhone(v, hint) : (v ?? { country: hint, number: '' });

/**
 * PhoneInput - one field joining a searchable country-code picker and the national number, with the library Input's
 * label, help, error, held state and sizes.
 *
 * @example
 * ```tsx
 * const [phone, setPhone] = useState({ country: 'IN', number: '' });
 * <PhoneInput label="Phone" value={phone} onChange={(next) => setPhone(next)} />
 *
 * // a stored string in and out
 * <PhoneInput label="Phone" value={record.phone} defaultCountry="US" onChange={(_, phone) => save(phone)} />
 * ```
 */
const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value,
      defaultValue,
      defaultCountry = '',
      onChange,
      countries = PHONE_COUNTRIES,
      renderFlag,
      countryLabel = 'Country code',
      searchPlaceholder = 'Search',
      emptyMessage = 'No country matches',
      id: propId,
      placeholder,
      style,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const id = propId ?? generatedId;
    const listboxId = `${id}-cc-listbox`;
    const nameId = `${id}-cc-name`;

    /* the last country chosen, so a string value with no number (or a bare number) keeps it */
    const [hint, setHint] = useState(defaultCountry);
    const [internal, setInternal] = useState<PhoneInputValue>(() =>
      toParts(defaultValue, defaultCountry)
    );
    const isControlled = value !== undefined;
    const current = isControlled ? toParts(value, hint) : internal;

    const byCode = useMemo(() => new Map(countries.map((c) => [c.code, c])), [countries]);
    const options = useMemo<ComboboxOption[]>(
      () => countries.map((c) => ({ value: c.code, label: c.name, description: `+${c.dial}` })),
      [countries]
    );
    const sel = byCode.get(current.country);

    const commit = useCallback(
      (next: PhoneInputValue) => {
        if (!isControlled) setInternal(next);
        setHint(next.country);
        onChange?.(next, joinPhone(next.country, next.number));
      },
      [isControlled, onChange]
    );

    /* the number starts after the trigger, whose width follows the dial code: measured */
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const [triggerWidth, setTriggerWidth] = useState<number | null>(null);
    useLayoutEffect(() => {
      const w = triggerRef.current?.offsetWidth;
      if (w) setTriggerWidth(w);
    }, [current.country]);

    /* the list opens as wide as a field, with its search box focused so a name can be typed straight away (the library
     * leaves the focus on the trigger, which here sits inside the number field) */
    const handleOpenChange = useCallback(
      (open: boolean) => {
        if (!open) return;
        let tries = 0;
        const apply = () => {
          const list = document.getElementById(listboxId);
          if (!list) {
            tries += 1;
            if (tries < 6) requestAnimationFrame(apply);
            return;
          }
          list.style.width = LIST_WIDTH;
          list.querySelector('input')?.focus();
        };
        requestAnimationFrame(apply);
      },
      [listboxId]
    );

    const held = Boolean(rest.disabled) || Boolean(rest.locked);
    const ownDescribedBy = rest.error
      ? `${id}-error`
      : rest.helperText
        ? `${id}-helper`
        : undefined;
    const describedBy =
      [sel ? nameId : undefined, ownDescribedBy, ariaDescribedBy].filter(Boolean).join(' ') ||
      undefined;

    return (
      <Input
        ref={ref}
        id={id}
        inputMode="tel"
        autoComplete="tel-national"
        {...rest}
        value={current.number}
        onChange={(e) => {
          commit({ country: current.country, number: e.target.value });
        }}
        placeholder={placeholder ?? phonePlaceholder(current.country)}
        aria-describedby={describedBy}
        style={{
          ...style,
          paddingLeft: `${String((triggerWidth ?? TRIGGER_FALLBACK_WIDTH) + NUMBER_GAP)}px`,
        }}
        startAdornment={
          <Combobox
            id={`${id}-cc`}
            /* the trigger sits 6 from the field's edge, not the adornment's 12 */
            wrapperClassName="-mdt-ml-1.5"
            options={options}
            value={current.country || null}
            disabled={held}
            onValueChange={(v) => {
              if (v) commit({ country: v, number: current.number });
            }}
            onOpenChange={handleOpenChange}
            searchPlaceholder={searchPlaceholder}
            emptyMessage={emptyMessage}
            renderTrigger={({ disabled: off }) => (
              <button
                ref={triggerRef}
                type="button"
                data-phone-cc=""
                disabled={off}
                title={sel ? `${sel.name} +${sel.dial}` : countryLabel}
                className="mdt-inline-flex mdt-h-6 mdt-cursor-pointer mdt-items-center mdt-gap-1 mdt-rounded mdt-border-0 mdt-bg-transparent mdt-px-1 mdt-text-muted-foreground hover:mdt-bg-neutral-10 focus-visible:mdt-outline focus-visible:mdt-outline-2 focus-visible:mdt-outline-offset-1 focus-visible:mdt-outline-ring disabled:mdt-cursor-not-allowed disabled:hover:mdt-bg-transparent data-[state=open]:mdt-bg-neutral-10"
              >
                <FlagMark code={current.country} renderFlag={renderFlag} />
                {sel && (
                  <span
                    aria-hidden="true"
                    className="mdt-whitespace-nowrap mdt-text-[13px] mdt-tabular-nums mdt-leading-none mdt-text-foreground"
                  >
                    +{sel.dial}
                  </span>
                )}
                <Icon name="chevron-down" size={12} className="mdt-shrink-0" aria-hidden />
                <span className="mdt-sr-only" id={nameId}>
                  {sel ? `${sel.name}, +${sel.dial}` : countryLabel}
                </span>
              </button>
            )}
            renderOption={({ option, selected }) => (
              <span
                data-selected={selected || undefined}
                className="mdt-flex mdt-w-full mdt-min-w-0 mdt-items-center mdt-gap-2.5 mdt-text-[13px] mdt-leading-[1.4]"
              >
                <FlagMark code={option.value} renderFlag={renderFlag} />
                <span className="mdt-min-w-0 mdt-flex-auto mdt-truncate mdt-text-foreground">
                  {option.label}
                </span>
                <span className="mdt-shrink-0 mdt-tabular-nums mdt-text-muted-foreground">
                  {option.description}
                </span>
              </span>
            )}
          />
        }
      />
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
