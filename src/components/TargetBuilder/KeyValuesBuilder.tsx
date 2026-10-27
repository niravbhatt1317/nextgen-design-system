'use client';

import { forwardRef, useId } from 'react';
import { cn } from '@/utils';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { InfoTip } from '../InfoTip';
import { Select } from '../Select';
import { ChipInput } from '../Input';
import type {
  KeyValuesBuilderProps,
  KeyValuesOption,
  KeyValuesRow,
} from './KeyValuesBuilder.types';

/* PORTED FROM THE CONSOLE (Ronak, 2026-10-26), made generic at his word the same day ("this is not only for the custom
 * port we can use other ways also"). First drawn as the network discovery profile's Custom ports (Probing & depth step,
 * features/discovery-profiles/wizard/PortRules.jsx); his rulings it keeps (2026-10-15): "user select the protocols and
 * then add the port and user can also add the multiple port in the single input also user can add the multiple
 * protocols ... it should be in the group so user can understood these are the dependable of each other"; "when user
 * hit enter after add the port it will add ... very user friendly". One group on the sunken ground, a row per key - the
 * picker 224 wide (w-56, the console draws 220 - off the spacing steps), the values field, the bin - and the add button
 * under the rows. What the keys are and how a value is checked are the caller's; the stories carry the console's
 * protocols and port check. */

const BLANK: KeyValuesRow = { key: '', values: [] };

const optionOf = (o: KeyValuesOption) => ({
  value: o.value,
  label: o.hint ? `${o.label} (${o.hint})` : o.label,
});

/**
 * KeyValuesBuilder - rows of a picked key and the values typed for it: pick a key, type its values (each becomes a chip),
 * and add a row per key - custom ports by protocol, tags by category, addresses by site. A key another row holds is
 * left out of the picker, and a row's values field stays off until it has a key.
 *
 * @example
 * ```tsx
 * <KeyValuesBuilder
 *   label="Custom ports"
 *   options={[{ value: 'ssh', label: 'SSH', hint: '22' }]}
 *   rows={rows}
 *   onRowsChange={setRows}
 *   addLabel="Add protocol"
 * />
 * ```
 */
const KeyValuesBuilder = forwardRef<HTMLDivElement, KeyValuesBuilderProps>(
  function KeyValuesBuilder(
    {
      options,
      rows,
      onRowsChange,
      label,
      info,
      validateValue,
      keyPlaceholder = 'Choose…',
      valuePlaceholder = 'Type a value, press Enter',
      addLabel = 'Add',
      keyLabel = 'Key',
      valuesLabel = 'Values',
      mono = false,
      disabled = false,
      className,
      ...rest
    },
    ref
  ) {
    const labelId = useId();
    /* the group always shows one row to type into */
    const shown = rows.length ? rows : [BLANK];
    const used = shown.map((r) => r.key).filter(Boolean);
    const nameOf = (v: string) => options.find((o) => o.value === v)?.label ?? v;
    const update = (i: number, patch: Partial<KeyValuesRow>) => {
      onRowsChange(shown.map((r, j) => (j === i ? { ...r, ...patch } : r)));
    };
    /* off while a row still has no key, or every key is in use */
    const canAdd = !disabled && used.length < options.length && shown.every((r) => r.key);

    return (
      <div
        ref={ref}
        role="group"
        aria-labelledby={label ? labelId : undefined}
        className={cn('mdt-flex mdt-min-w-0 mdt-flex-col mdt-gap-1.5', className)}
        {...rest}
      >
        {label && (
          <span className="mdt-inline-flex mdt-items-center mdt-gap-1">
            <span
              id={labelId}
              className="mdt-text-[13px] mdt-font-medium mdt-leading-[1.4] mdt-text-neutral-90"
            >
              {label}
            </span>
            {info && (
              <InfoTip label={`About ${typeof label === 'string' ? label : 'this field'}`}>
                {info}
              </InfoTip>
            )}
          </span>
        )}

        <div className="mdt-flex mdt-flex-col mdt-gap-2 mdt-rounded-lg mdt-border mdt-border-neutral-20 mdt-bg-secondary mdt-p-2.5">
          {shown.map((r, i) => {
            const choices = options
              .filter((o) => o.value === r.key || !used.includes(o.value))
              .map(optionOf);
            const blankAlone = shown.length === 1 && !r.key && !r.values.length;
            const name = r.key ? nameOf(r.key) : '';
            return (
              /* items-start: a value's error line grows under its field, the picker and the bin stay on the field's row */
              // eslint-disable-next-line react/no-array-index-key -- a row has no identity beyond its place until a key is picked
              <div key={i} className="mdt-flex mdt-items-start mdt-gap-2">
                <div className="mdt-w-56 mdt-shrink-0">
                  <Select
                    mode="single"
                    size="sm"
                    aria-label={keyLabel}
                    options={choices}
                    value={r.key || null}
                    placeholder={keyPlaceholder}
                    disabled={disabled}
                    onChange={(v) => {
                      update(i, { key: typeof v === 'string' ? v : '' });
                    }}
                  />
                </div>
                <ChipInput
                  className="mdt-flex-1"
                  values={r.values}
                  onValuesChange={(values) => {
                    update(i, { values });
                  }}
                  validate={validateValue}
                  placeholder={valuePlaceholder}
                  aria-label={name ? `${valuesLabel} for ${name}` : valuesLabel}
                  mono={mono}
                  disabled={disabled || !r.key}
                />
                {/* the bin keeps its slot so the fields never move; a lone blank row has nothing to remove */}
                <span className="mdt-inline-flex mdt-h-8 mdt-w-7 mdt-shrink-0 mdt-items-center mdt-justify-center">
                  {!blankAlone && (
                    <Button
                      variant="destructiveGhost"
                      size="sm"
                      iconOnly
                      title="Remove"
                      ariaLabel={name ? `Remove ${name}` : 'Remove row'}
                      disabled={disabled}
                      leftIcon={<Icon name="trash-2" size={14} aria-hidden />}
                      onClick={() => {
                        onRowsChange(shown.filter((_, j) => j !== i));
                      }}
                    />
                  )}
                </span>
              </div>
            );
          })}
          <div>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<Icon name="plus" size={14} aria-hidden />}
              disabled={!canAdd}
              onClick={() => {
                onRowsChange([...shown, BLANK]);
              }}
            >
              {addLabel}
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

KeyValuesBuilder.displayName = 'KeyValuesBuilder';

export { KeyValuesBuilder };
