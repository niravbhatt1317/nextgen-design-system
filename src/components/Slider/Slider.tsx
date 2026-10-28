'use client';

import { forwardRef, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/utils';
import { InfoTip } from '../InfoTip';
import { SliderRuler } from './SliderRuler';
import { SliderTag } from './SliderTag';
import { formatSliderValue, thumbAt } from './sliderTicks';
import type { SliderProps } from './Slider.types';
import './slider.css';

/* PORTED FROM THE CONSOLE (Pranjal, 2026-10-28) - organizations/settingsKit.jsx PolicySlider, "one part for every
 * security-policy setting" (2026-10-01: "You know what we did in creation for policy. Lets go with that same design in
 * security policy"). Settings -> Security policy, Create organization's policy step, Agent Fleet's and Collector Fleet's
 * Govern -> Policies and the fleets' Changes step all draw it.
 *
 * Not ui/RangeSlider.jsx: that early stopgap (a native range in the browser's own look, min / value / max printed under
 * it) is rendered by no page any more - only the console's dev gallery - so it is not what the product looks like.
 *
 * A row: the name (14/500) and its hint written out, or its explanation in an ⓘ; a sunken panel (8 corners, 10 / 16 in)
 * holding the value tag riding on the handle, the flat 8px track and the ruler; the two limits named under the panel.
 * What the console's caller laid out around it stays the caller's: the card the rows sit in (PolicyCard), and `first` is
 * `divided` turned round - a standalone slider draws no hairline. */

/** How far the saved-value chip keeps from the value tag. */
const CHIP_CLEAR = 6;

const clampTo = (n: number, min: number, max: number): number => Math.min(Math.max(n, min), max);

/* THE RESET CHIP RIDES ABOVE THE BAR (2026-10-17, his word: "the reset click box which we create below i think we
 * should create it above the bar. in botton it kind of blends in with others"). It shares the row with the value tag,
 * so when the two would touch it steps aside, to the side its value lies on (or the other side when that one has no
 * room), 6 clear of the tag. Measured after every render; nothing moves at rest. */
const stepAside = (tag: HTMLElement | null, chip: HTMLElement | null): void => {
  const row = chip?.parentElement;
  if (!tag || !chip || !row) return;
  chip.style.marginLeft = '0px';
  const a = tag.getBoundingClientRect();
  const b = chip.getBoundingClientRect();
  if (!(b.right + CHIP_CLEAR > a.left && b.left - CHIP_CLEAR < a.right)) return;
  const box = row.getBoundingClientRect();
  const toLeft = a.left - CHIP_CLEAR - b.right;
  const toRight = a.right + CHIP_CLEAR - b.left;
  const preferLeft = b.left + b.width / 2 <= a.left + a.width / 2;
  const goLeft = preferLeft ? b.left + toLeft >= box.left : b.right + toRight > box.right;
  chip.style.marginLeft = `${String(goLeft ? toLeft : toRight)}px`;
};

interface HeadProps {
  label: string;
  hint: ReactNode;
  info: ReactNode;
  mark: ReactNode;
  aside: ReactNode;
}

/** The name row: the name, its ⓘ, a mark after them, a node at the right end; the hint under it. */
const SliderHead = ({ label, hint, info, mark, aside }: HeadProps) => (
  <div className="mdt-min-w-0">
    <div className="mdt-flex mdt-items-center mdt-gap-1 mdt-text-sm mdt-font-medium mdt-leading-[1.4] mdt-text-foreground">
      {label}
      {info ? <InfoTip label={`About ${label.toLowerCase()}`}>{info}</InfoTip> : null}
      {mark ? <span className="mdt-ml-1 mdt-inline-flex">{mark}</span> : null}
      {aside ? (
        <span className="mdt-ml-auto mdt-inline-flex mdt-items-center mdt-gap-3">{aside}</span>
      ) : null}
    </div>
    {hint ? (
      <div className="mdt-mt-0.5 mdt-text-xs mdt-leading-normal mdt-text-neutral-60">{hint}</div>
    ) : null}
  </div>
);

/**
 * Slider - one number picked between two limits by dragging a handle along a
 * track, with the value riding on the handle and a ruler of the limits under
 * it. It can show where the saved value sits and set it back, and its value
 * tag can be typed into.
 *
 * @example
 * ```tsx
 * <Slider label="Session timeout" unit="min" min={15} max={240} value={v} onChange={setV} saved={60}
 *   hint="Signs a person out after this long without activity." />
 * <Slider label="Restart attempts" unit="restarts" min={1} max={10} value={n} onChange={setN}
 *   info="How many times an agent is restarted before it is held." hideEnds typeable />
 * ```
 */
const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    label,
    value,
    min,
    max,
    onChange,
    unit,
    hint,
    info,
    mark,
    aside,
    folded = false,
    saved,
    typeable = false,
    startName = 'Min',
    endName = 'Max',
    endsOnRuler = false,
    hideEnds = false,
    disabled = false,
    divided = false,
    className,
    ...rest
  },
  ref
) {
  const u = (unit ?? '').trim();
  const show = (n: number): string => formatSliderValue(n, u);
  const movable = !disabled && max > min;
  const v = clampTo(value, min, max);
  const at = (n: number): number =>
    max > min ? ((clampTo(n, min, max) - min) / (max - min)) * 100 : 0;
  const p = at(v);
  /* UNSAVED (2026-10-01, his word: "it doesnt look like that i need to save it first ... showing whats the current value
   * is"): off the saved value, the tag turns the solid ink and a mark stays where the saved value sits */
  const savedAt = saved !== undefined && saved !== v ? saved : null;
  const changed = savedAt !== null;
  const resting = (saved !== undefined && !changed) || disabled;
  const named = endsOnRuler && !hideEnds;

  const tagRef = useRef<HTMLElement>(null);
  const chipRef = useRef<HTMLButtonElement>(null);
  useLayoutEffect(() => {
    stepAside(tagRef.current, chipRef.current);
  });

  return (
    <div
      ref={ref}
      className={cn(divided && 'mdt-mt-5 mdt-border-t mdt-border-border mdt-pt-5', className)}
      data-slot="slider"
      {...rest}
    >
      <SliderHead label={label} hint={hint} info={info} mark={mark} aside={aside} />
      <div
        className={cn(
          'mdt-mt-3 mdt-rounded-lg mdt-bg-secondary mdt-px-4 mdt-py-2.5',
          /* LOCKED (his word, 2026-10-01: "the below sliders should look disabled"): half strength, not-allowed */
          disabled && 'mdt-cursor-not-allowed mdt-opacity-50',
          folded && 'mdt-hidden'
        )}
        data-slot="slider-panel"
        {...(disabled ? { title: 'Locked' } : {})}
      >
        <div
          className="mdt-relative mdt-h-7"
          {...(typeable && movable ? {} : { 'aria-hidden': true })}
        >
          <SliderTag
            ref={tagRef}
            label={label}
            value={v}
            min={min}
            max={max}
            unit={u}
            p={p}
            typeable={typeable && movable}
            resting={resting}
            onChange={onChange}
          />
        </div>
        <div className="mdt-relative">
          {savedAt !== null ? (
            <>
              <span
                aria-hidden="true"
                className="mdt-slider__saved-mark"
                style={{ left: thumbAt(at(savedAt)) }}
              />
              <button
                ref={chipRef}
                type="button"
                className="mdt-slider__saved"
                style={{ left: thumbAt(at(savedAt)) }}
                title={`Reset to the saved ${show(savedAt)}`}
                aria-label={`Reset ${label} to the saved ${show(savedAt)}`}
                onClick={() => onChange?.(savedAt)}
              >
                {savedAt}
              </button>
            </>
          ) : null}
          <input
            type="range"
            className="mdt-slider__range"
            min={min}
            max={max}
            value={v}
            disabled={!movable}
            aria-label={label}
            aria-valuetext={
              savedAt !== null ? `${show(v)}, changed from ${show(savedAt)}, not saved` : show(v)
            }
            onChange={(e) => onChange?.(Number(e.target.value))}
            style={{ '--mdt-slider-p': `${String(p)}%` } as CSSProperties}
          />
          <SliderRuler
            min={min}
            max={max}
            start={named ? startName : undefined}
            end={named ? endName : undefined}
          />
        </div>
      </div>
      {!endsOnRuler && !hideEnds && !folded ? (
        <div className="mdt-mt-2 mdt-flex mdt-items-baseline mdt-justify-between mdt-gap-3 mdt-text-xs mdt-tabular-nums mdt-leading-normal mdt-text-neutral-60">
          <span>
            {startName} <span className="mdt-font-medium mdt-text-neutral-90">{show(min)}</span>
          </span>
          <span>
            {endName} <span className="mdt-font-medium mdt-text-neutral-90">{show(max)}</span>
          </span>
        </div>
      ) : null}
    </div>
  );
});

Slider.displayName = 'Slider';

export { Slider };
