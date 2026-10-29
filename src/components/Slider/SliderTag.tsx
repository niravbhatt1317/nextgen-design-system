import { forwardRef, useEffect, useRef, useState, type CSSProperties, type Ref } from 'react';
import { formatSliderValue, thumbAt } from './sliderTicks';

/* THE VALUE TAG on the handle - ported from the console (Pranjal, 2026-10-28): organizations/settingsKit.jsx
 * PolicySlider. An outlined tag at rest, the solid ink tag once moved (2026-10-01: the grey read as disabled, so the
 * track stays the ink and the tag says it). `typeable` (2026-10-17): the tag is a button - press it to type, the dotted
 * underline is the sign - and while typing it is the field, in the same place, the unit after it. */

/** The tag keeps inside the track at either end: past 92% it hangs left of the handle, under 8% right of it. */
const EDGE = 8;

const tagStyle = (p: number): CSSProperties => {
  let transform = 'translateX(-50%)';
  if (p >= 100 - EDGE) transform = 'translateX(calc(-100% + 10px))';
  else if (p <= EDGE) transform = 'translateX(-10px)';
  return { left: thumbAt(p), transform };
};

interface SliderTagProps {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  /** Where the handle is, in percent of the track. */
  p: number;
  /** The tag is a field you can type into. */
  typeable: boolean;
  /** The quiet outlined tag: the value is the saved one, or the slider is locked. */
  resting: boolean;
  onChange?: ((value: number) => void) | undefined;
}

/** The value riding on a Slider's handle; with `typeable`, the field to type it into. */
export const SliderTag = forwardRef<HTMLElement, SliderTagProps>(function SliderTag(
  { label, value, min, max, unit, p, typeable, resting, onChange },
  ref
) {
  /* the typed value while the tag is a field (null = not typing) */
  const [typing, setTyping] = useState<string | null>(null);
  const field = useRef<HTMLInputElement>(null);
  const editing = typing !== null;

  useEffect(() => {
    if (editing) field.current?.focus();
  }, [editing]);

  const show = (n: number): string => formatSliderValue(n, unit);
  const style = tagStyle(p);
  const restingAttr = resting ? { 'data-resting': '' } : {};

  if (!typeable) {
    return (
      <output
        ref={ref as Ref<HTMLOutputElement>}
        className="mdt-slider__tag"
        style={style}
        {...restingAttr}
      >
        {show(value)}
      </output>
    );
  }

  if (typing === null) {
    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        type="button"
        className="mdt-slider__tag"
        style={style}
        {...restingAttr}
        title="Type a value"
        aria-label={`${label}: ${show(value)}. Type a value`}
        onClick={() => {
          setTyping(String(value));
        }}
      >
        <span className="mdt-slider__tag-n">{show(value)}</span>
      </button>
    );
  }

  const n = Number(typing);
  const typedOk = typing !== '' && n >= min && n <= max;
  /** Keeps a typed number inside the limits; says whether it did. */
  const keepTyped = (): boolean => {
    if (!typedOk) return false;
    const next = Math.round(n);
    setTyping(null);
    if (next !== value) onChange?.(next);
    return true;
  };
  const between = `${show(min)} and ${show(max)}`;

  return (
    <span
      ref={ref}
      className="mdt-slider__tag mdt-slider__tag--edit"
      style={style}
      {...(typedOk ? {} : { 'data-invalid': '' })}
    >
      <input
        ref={field}
        inputMode="numeric"
        className="mdt-slider__tag-input"
        style={{ width: `${String(Math.max(String(max).length, 2) + 0.5)}ch` }}
        value={typing}
        aria-label={`${label}, between ${between}`}
        aria-invalid={typedOk ? undefined : true}
        title={`Between ${between}`}
        onChange={(e) => {
          setTyping(e.target.value.replace(/\D/g, ''));
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            keepTyped();
          }
          if (e.key === 'Escape') {
            e.preventDefault();
            setTyping(null);
          }
        }}
        onBlur={() => {
          if (!keepTyped()) setTyping(null);
        }}
      />
      {unit ? <span className="mdt-slider__tag-unit">{unit}</span> : null}
    </span>
  );
});
