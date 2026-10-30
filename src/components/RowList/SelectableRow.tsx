import { Checkbox } from '../Checkbox';
import { RadioGroup, RadioGroupItem } from '../Radio';
import { RowTitle } from './RowList';
import { hasContent } from './RowText';
import type { SelectableRowProps } from './RowList.types';

/* The console's three hand-rolled pickers (CustomFieldsAdmin, DetailsTab, LifecycleModals) had three geometries and
 * only two were keyboard-usable; src/ui/RowList.jsx made them this one: a <label> around the real control, so a press
 * anywhere on the row picks it and the keyboard always reaches the box. The box is the library Checkbox, or a library
 * Radio in a group of its own (the console's compat Radio does the same, so a radio row hands back `true` and picking
 * it again changes nothing). */

/**
 * SelectableRow - one pick in a short list inside a RowList: a tick box or a
 * radio, before the text or at the row's right end, with a label and a hint
 * line (or your own row text) and something at the right. The whole row is
 * the control's label, so a press anywhere on it picks.
 *
 * @example
 * ```tsx
 * <RowList>
 *   <SelectableRow checked={on} onChange={setOn} label="Sahil Thadani" hint="sahil@acmehealth.org" />
 *   <SelectableRow type="radio" checked={pick === 'a'} onChange={() => setPick('a')} label="col-ams-01" hint="Amsterdam" />
 * </RowList>
 * ```
 */
function SelectableRow({
  type = 'checkbox',
  checked,
  onChange,
  disabled,
  label,
  hint,
  right,
  control = 'start',
  children,
}: SelectableRowProps) {
  const box = (
    <span className="mdt-rowlist__leading" data-control={control}>
      {type === 'radio' ? (
        <RadioGroup
          value={checked ? 'on' : ''}
          onValueChange={() => onChange?.(true)}
          disabled={disabled}
        >
          <RadioGroupItem value="on" />
        </RadioGroup>
      ) : (
        <Checkbox
          checked={!!checked}
          onCheckedChange={(state) => onChange?.(state === true)}
          disabled={disabled}
        />
      )}
    </span>
  );
  return (
    <label
      className="mdt-rowlist__row"
      data-interactive={disabled ? undefined : ''}
      data-selected={checked ? '' : undefined}
      data-row-state={disabled ? 'disabled' : undefined}
      data-control={control}
    >
      {control !== 'end' && box}
      <span className="mdt-rowlist__body">
        {hasContent(children) ? children : <RowTitle primary={label} secondary={hint} />}
      </span>
      {hasContent(right) && <span className="mdt-rowlist__actions">{right}</span>}
      {control === 'end' && box}
    </label>
  );
}

export { SelectableRow };
