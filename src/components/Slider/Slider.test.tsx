import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Slider } from './Slider';
import { SliderRuler } from './SliderRuler';
import { formatSliderValue, sliderTicks, thumbAt } from './sliderTicks';

const track = () => screen.getByRole('slider');
const tag = () => document.querySelector<HTMLElement>('.mdt-slider__tag');
const chip = () => document.querySelector<HTMLElement>('.mdt-slider__saved');

/** jsdom lays nothing out; a box is described to it. */
const place = (el: Element, left: number, width: number) => {
  el.getBoundingClientRect = () =>
    ({
      left,
      right: left + width,
      width,
      top: 0,
      bottom: 10,
      height: 10,
      x: left,
      y: 0,
    }) as DOMRect;
};

const Controlled = (props: Partial<Parameters<typeof Slider>[0]> & { start?: number }) => {
  const [v, setV] = useState(props.start ?? 60);
  return (
    <Slider
      label="Session timeout"
      unit="min"
      min={15}
      max={240}
      {...props}
      value={v}
      onChange={setV}
    />
  );
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('sliderTicks', () => {
  it('a short range: a tick on every unit, majors on the fives, the ends numbered', () => {
    const ticks = sliderTicks(1, 10);
    expect(ticks.map((t) => t.v)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(ticks.filter((t) => t.major).map((t) => t.v)).toEqual([1, 5, 10]);
    expect(ticks.filter((t) => t.label).map((t) => t.label)).toEqual(['1', '5', '10']);
  });

  it('a middle range: every 5, majors on the tens, at most eight numbers', () => {
    const ticks = sliderTicks(15, 240);
    expect(ticks[0]).toEqual({ v: 15, major: true, label: '15' });
    expect(ticks.filter((t) => t.label).map((t) => t.label)).toEqual([
      '15',
      '30',
      '60',
      '90',
      '120',
      '150',
      '180',
      '210',
      '240',
    ]);
    expect(
      sliderTicks(15, 60)
        .filter((t) => t.label)
        .map((t) => t.label)
    ).toEqual(['15', '20', '30', '40', '50', '60']);
  });

  it('a wide range: a round step of about 24 ticks', () => {
    const ticks = sliderTicks(128, 16384);
    /* 16256 / 24 asks for 677 a step: past 5 x 100, so the step is 1000 - sixteen ticks and the two ends */
    expect(ticks).toHaveLength(18);
    expect(ticks[1]?.v).toBe(1000);
    expect(ticks[0]?.label).toBe('128');
    expect(ticks.filter((t) => t.label).length).toBeLessThanOrEqual(9);
    /* 1000 / 24 asks for 42 a step: within 5 x 10, so the step is 50 */
    expect(
      sliderTicks(0, 1000)
        .map((t) => t.v)
        .slice(0, 3)
    ).toEqual([0, 50, 100]);
  });

  it('nothing for an empty or upside-down range', () => {
    expect(sliderTicks(5, 5)).toEqual([]);
    expect(sliderTicks(9, 3)).toEqual([]);
  });

  it('places a value on the thumb centre', () => {
    expect(thumbAt(0)).toBe('calc(0.000% + 8.00px)');
    expect(thumbAt(100)).toBe('calc(100.000% + -8.00px)');
  });

  it('writes the unit as the console does', () => {
    expect(formatSliderValue(5, '%')).toBe('5%');
    expect(formatSliderValue(60, 'min')).toBe('60 min');
    expect(formatSliderValue(1, 'restarts')).toBe('1 restart');
    expect(formatSliderValue(2, 'restarts')).toBe('2 restarts');
    expect(formatSliderValue(1, 'min')).toBe('1 min');
    expect(formatSliderValue(7, '')).toBe('7');
  });
});

describe('Slider', () => {
  describe('rendering', () => {
    it('draws the name, the track and the value on the handle', () => {
      render(<Slider label="Session timeout" unit=" min " min={15} max={240} value={60} />);
      expect(screen.getByText('Session timeout')).toHaveClass('mdt-text-sm', 'mdt-font-medium');
      expect(track()).toHaveAttribute('aria-label', 'Session timeout');
      expect(track()).toHaveAttribute('aria-valuetext', '60 min');
      expect(track()).toHaveValue('60');
      expect(tag()?.tagName).toBe('OUTPUT');
      expect(tag()).toHaveTextContent('60 min');
      expect(tag()).not.toHaveAttribute('data-resting');
      expect(tag()?.parentElement).toHaveAttribute('aria-hidden', 'true');
    });

    it('sets the filled part with the handle', () => {
      render(<Slider label="Load" min={0} max={200} value={50} />);
      expect(track().style.getPropertyValue('--mdt-slider-p')).toBe('25%');
    });

    it('holds a value outside the limits at the nearer one', () => {
      const { rerender } = render(<Slider label="Load" min={10} max={20} value={99} />);
      expect(track()).toHaveValue('20');
      rerender(<Slider label="Load" min={10} max={20} value={1} />);
      expect(track()).toHaveValue('10');
    });

    it('keeps the tag inside the track at either end', () => {
      const { rerender } = render(<Slider label="Load" min={0} max={100} value={50} />);
      expect(tag()?.style.transform).toBe('translateX(-50%)');
      rerender(<Slider label="Load" min={0} max={100} value={95} />);
      expect(tag()?.style.transform).toBe('translateX(calc(-100% + 10px))');
      rerender(<Slider label="Load" min={0} max={100} value={3} />);
      expect(tag()?.style.transform).toBe('translateX(-10px)');
    });

    it('names the two limits under the panel, Min and Max by default', () => {
      render(<Slider label="Session timeout" unit="min" min={15} max={240} value={60} />);
      expect(screen.getByText('Min').parentElement ?? screen.getByText('Min')).toHaveTextContent(
        'Min 15 min'
      );
      expect(screen.getByText('240 min')).toHaveClass('mdt-font-medium', 'mdt-text-neutral-90');
    });

    it('takes other names, or hangs them off the ruler, or leaves them out', () => {
      const { rerender } = render(
        <Slider
          label="Session"
          min={15}
          max={60}
          value={30}
          startName="Platform floor"
          endName="MSP baseline"
        />
      );
      expect(screen.getByText(/Platform floor/)).toBeInTheDocument();
      expect(screen.getByText(/MSP baseline/)).toBeInTheDocument();
      rerender(
        <Slider
          label="Session"
          min={15}
          max={60}
          value={30}
          startName="Floor"
          endName="MSP baseline"
          endsOnRuler
        />
      );
      const start = document.querySelector('[data-end="start"]');
      const end = document.querySelector('[data-end="end"]');
      expect(start).toHaveTextContent('15Floor');
      expect(end).toHaveTextContent('MSP baseline60');
      expect(start?.parentElement).not.toHaveAttribute('aria-hidden');
      rerender(<Slider label="Session" min={15} max={60} value={30} hideEnds endsOnRuler />);
      expect(screen.queryByText('Min')).toBeNull();
      expect(document.querySelector('[data-end]')).toBeNull();
    });

    it('writes the hint under the name', () => {
      render(<Slider label="Session" min={1} max={9} value={3} hint="Signs a person out." />);
      expect(screen.getByText('Signs a person out.')).toHaveClass(
        'mdt-text-xs',
        'mdt-text-neutral-60'
      );
    });

    it('puts the explanation in an ⓘ named after the setting', () => {
      render(<Slider label="Restart attempts" min={1} max={9} value={3} info="How many times." />);
      expect(screen.getByRole('button', { name: 'About restart attempts' })).toBeInTheDocument();
    });

    it('draws a mark and an aside in the name row', () => {
      render(
        <Slider
          label="Restart attempts"
          min={1}
          max={9}
          value={3}
          mark={<span>Edited</span>}
          aside={<span>Include</span>}
        />
      );
      expect(screen.getByText('Edited').parentElement).toHaveClass('mdt-ml-1');
      expect(screen.getByText('Include').parentElement).toHaveClass('mdt-ml-auto');
      expect(track()).toHaveAttribute('aria-label', 'Restart attempts');
    });

    it('folded keeps only the name row', () => {
      render(<Slider label="Restart attempts" min={1} max={9} value={3} folded />);
      expect(document.querySelector('[data-slot="slider-panel"]')).toHaveClass('mdt-hidden');
      expect(screen.queryByText('Min')).toBeNull();
    });

    it('divided draws the hairline above; a lone slider does not', () => {
      const { rerender } = render(<Slider label="A" min={1} max={9} value={3} />);
      const root = document.querySelector('[data-slot="slider"]');
      expect(root).not.toHaveClass('mdt-border-t');
      rerender(<Slider label="A" min={1} max={9} value={3} divided className="extra" />);
      expect(root).toHaveClass(
        'mdt-mt-5',
        'mdt-border-t',
        'mdt-border-border',
        'mdt-pt-5',
        'extra'
      );
    });

    it('forwards the ref and passes other props to the root', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Slider ref={ref} label="A" min={1} max={9} value={3} data-testid="root" />);
      expect(ref.current).toBe(screen.getByTestId('root'));
    });
  });

  describe('interactions', () => {
    it('reports the number, not the event, as the handle moves', () => {
      const onChange = vi.fn();
      render(<Slider label="Load" min={0} max={100} value={50} onChange={onChange} />);
      fireEvent.change(track(), { target: { value: '70' } });
      expect(onChange).toHaveBeenCalledWith(70);
    });

    it('moves without an onChange and nothing breaks', () => {
      render(<Slider label="Load" min={0} max={100} value={50} />);
      expect(() => fireEvent.change(track(), { target: { value: '70' } })).not.toThrow();
    });
  });

  describe('the saved value', () => {
    it('at the saved value the tag wears its quiet outline and there is no chip', () => {
      render(<Slider label="Session" unit="min" min={15} max={240} value={60} saved={60} />);
      expect(tag()).toHaveAttribute('data-resting');
      expect(chip()).toBeNull();
      expect(track()).toHaveAttribute('aria-valuetext', '60 min');
    });

    it('off the saved value: the solid tag, the yellow mark, the chip, and says so', () => {
      render(<Slider label="Session" unit="min" min={15} max={240} value={90} saved={60} />);
      expect(tag()).not.toHaveAttribute('data-resting');
      expect(document.querySelector('.mdt-slider__saved-mark')).toHaveAttribute(
        'aria-hidden',
        'true'
      );
      expect(chip()).toHaveTextContent('60');
      expect(chip()).toHaveAttribute('title', 'Reset to the saved 60 min');
      expect(track()).toHaveAttribute('aria-valuetext', '90 min, changed from 60 min, not saved');
    });

    it('pressing the chip sets the slider back to the saved value', async () => {
      render(<Controlled start={90} saved={60} />);
      await userEvent.click(
        screen.getByRole('button', { name: 'Reset Session timeout to the saved 60 min' })
      );
      expect(track()).toHaveValue('60');
      expect(chip()).toBeNull();
    });

    it('the chip steps aside from the tag, to the side its value lies on', () => {
      vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
        this: Element
      ) {
        if (this.classList.contains('mdt-slider__tag'))
          return { left: 100, right: 140, width: 40 } as DOMRect;
        if (this.classList.contains('mdt-slider__saved'))
          return { left: 95, right: 115, width: 20 } as DOMRect;
        return { left: 0, right: 400, width: 400 } as DOMRect;
      });
      render(<Slider label="Session" min={0} max={100} value={30} saved={28} />);
      /* the chip's centre (105) is left of the tag's (120): it moves left, 6 clear */
      expect(chip()?.style.marginLeft).toBe('-21px');
    });

    it('steps the other way when its own side has no room', () => {
      vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
        this: Element
      ) {
        if (this.classList.contains('mdt-slider__tag'))
          return { left: 10, right: 50, width: 40 } as DOMRect;
        if (this.classList.contains('mdt-slider__saved'))
          return { left: 5, right: 25, width: 20 } as DOMRect;
        return { left: 0, right: 400, width: 400 } as DOMRect;
      });
      render(<Slider label="Session" min={0} max={100} value={10} saved={8} />);
      expect(chip()?.style.marginLeft).toBe('51px');
    });

    it('steps right when its value lies right, or left when the right has no room', () => {
      const spy = vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
        this: Element
      ) {
        if (this.classList.contains('mdt-slider__tag'))
          return { left: 100, right: 140, width: 40 } as DOMRect;
        if (this.classList.contains('mdt-slider__saved'))
          return { left: 125, right: 145, width: 20 } as DOMRect;
        return { left: 0, right: 400, width: 400 } as DOMRect;
      });
      const { unmount } = render(
        <Slider label="Session" min={0} max={100} value={30} saved={32} />
      );
      expect(chip()?.style.marginLeft).toBe('21px');
      unmount();
      spy.mockImplementation(function (this: Element) {
        if (this.classList.contains('mdt-slider__tag'))
          return { left: 350, right: 390, width: 40 } as DOMRect;
        if (this.classList.contains('mdt-slider__saved'))
          return { left: 375, right: 395, width: 20 } as DOMRect;
        return { left: 0, right: 400, width: 400 } as DOMRect;
      });
      render(<Slider label="Session" min={0} max={100} value={90} saved={92} />);
      expect(chip()?.style.marginLeft).toBe('-51px');
    });

    it('leaves the chip where it is when the two do not touch', () => {
      vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
        this: Element
      ) {
        if (this.classList.contains('mdt-slider__tag'))
          return { left: 300, right: 340, width: 40 } as DOMRect;
        if (this.classList.contains('mdt-slider__saved'))
          return { left: 20, right: 40, width: 20 } as DOMRect;
        return { left: 0, right: 400, width: 400 } as DOMRect;
      });
      render(<Slider label="Session" min={0} max={100} value={80} saved={5} />);
      expect(chip()?.style.marginLeft).toBe('0px');
    });
  });

  describe('disabled', () => {
    it('locks the track, halves the panel and says Locked', () => {
      render(<Slider label="Session" min={15} max={240} value={60} saved={60} disabled typeable />);
      expect(track()).toBeDisabled();
      const panel = document.querySelector('[data-slot="slider-panel"]');
      expect(panel).toHaveClass('mdt-opacity-50', 'mdt-cursor-not-allowed');
      expect(panel).toHaveAttribute('title', 'Locked');
      expect(tag()?.tagName).toBe('OUTPUT');
      expect(tag()).toHaveAttribute('data-resting');
    });

    it('an empty range cannot move', () => {
      render(<Slider label="Session" min={5} max={5} value={5} />);
      expect(track()).toBeDisabled();
      expect(track().style.getPropertyValue('--mdt-slider-p')).toBe('0%');
    });
  });

  describe('typeable', () => {
    const tagButton = () =>
      screen.getByRole('button', { name: 'Session timeout: 60 min. Type a value' });
    const field = () =>
      screen.getByRole('textbox', { name: 'Session timeout, between 15 min and 240 min' });

    it('the tag is a button with the dotted number; the row is no longer hidden', () => {
      render(<Controlled typeable />);
      expect(tagButton()).toHaveAttribute('title', 'Type a value');
      expect(tagButton().querySelector('.mdt-slider__tag-n')).toHaveTextContent('60 min');
      expect(tagButton().parentElement).not.toHaveAttribute('aria-hidden');
    });

    it('press it, type, Enter keeps the number', async () => {
      render(<Controlled typeable />);
      await userEvent.click(tagButton());
      expect(field()).toHaveFocus();
      expect(field()).toHaveValue('60');
      expect(screen.getByText('min', { selector: '.mdt-slider__tag-unit' })).toBeInTheDocument();
      await userEvent.clear(field());
      await userEvent.type(field(), '1x20{Enter}');
      expect(track()).toHaveValue('120');
      expect(
        screen.getByRole('button', { name: 'Session timeout: 120 min. Type a value' })
      ).toBeInTheDocument();
    });

    it('a number outside the limits turns the edge red and is not kept', async () => {
      render(<Controlled typeable />);
      await userEvent.click(tagButton());
      await userEvent.clear(field());
      await userEvent.type(field(), '999');
      expect(field()).toHaveAttribute('aria-invalid', 'true');
      expect(field().parentElement).toHaveAttribute('data-invalid');
      await userEvent.keyboard('{Enter}');
      expect(field()).toBeInTheDocument();
      await userEvent.clear(field());
      expect(field().parentElement).toHaveAttribute('data-invalid');
    });

    it('Escape leaves it as it was', async () => {
      render(<Controlled typeable />);
      await userEvent.click(tagButton());
      await userEvent.clear(field());
      await userEvent.type(field(), '90{Escape}');
      expect(track()).toHaveValue('60');
      expect(tagButton()).toBeInTheDocument();
    });

    it('pressing elsewhere keeps a good number and drops a bad one', async () => {
      render(<Controlled typeable />);
      await userEvent.click(tagButton());
      await userEvent.clear(field());
      await userEvent.type(field(), '200');
      act(() => {
        field().blur();
      });
      expect(track()).toHaveValue('200');
      await userEvent.click(
        screen.getByRole('button', { name: 'Session timeout: 200 min. Type a value' })
      );
      await userEvent.clear(field());
      await userEvent.type(field(), '5');
      act(() => {
        field().blur();
      });
      expect(track()).toHaveValue('200');
    });

    it('typing the same number changes nothing; no unit, no unit after the field', async () => {
      const onChange = vi.fn();
      render(<Slider label="Hosts" min={1} max={9} value={3} typeable onChange={onChange} />);
      await userEvent.click(screen.getByRole('button', { name: 'Hosts: 3. Type a value' }));
      await userEvent.keyboard('{Enter}');
      expect(onChange).not.toHaveBeenCalled();
      await userEvent.click(screen.getByRole('button', { name: 'Hosts: 3. Type a value' }));
      expect(document.querySelector('.mdt-slider__tag-unit')).toBeNull();
      await userEvent.keyboard('{Tab}');
    });
  });
});

describe('SliderRuler', () => {
  it('ticks with their majors and numbers; the plain ones hidden from a screen reader', () => {
    render(<SliderRuler min={1} max={10} />);
    const ticks = document.querySelectorAll('.mdt-slider__tick');
    expect(ticks).toHaveLength(10);
    expect(ticks[0]).toHaveAttribute('data-major');
    expect(ticks[1]).not.toHaveAttribute('data-major');
    expect(ticks[1]).toHaveAttribute('aria-hidden', 'true');
    expect(document.querySelectorAll('.mdt-slider__num')).toHaveLength(3);
  });

  it('keeps a middle number clear of the end names', () => {
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: Element
    ) {
      const v = Number(this.closest('[data-value]')?.getAttribute('data-value'));
      if (this.classList.contains('mdt-slider__word'))
        return { left: v === 1 ? 10 : 330, right: v === 1 ? 70 : 390 } as DOMRect;
      return { left: v * 40 - 5, right: v * 40 + 5 } as DOMRect;
    });
    render(<SliderRuler min={1} max={10} start="Floor" end="Ceiling" />);
    const five = document.querySelector('[data-value="5"] .mdt-slider__num') as HTMLElement;
    expect(five.style.visibility).toBe('');
  });

  it('thins the middle numbers evenly when they would run together', () => {
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: Element
    ) {
      const v = Number(this.parentElement?.getAttribute('data-value'));
      /* every number 20 wide, 10 apart: they touch */
      return { left: (v / 10) * 10, right: (v / 10) * 10 + 20 } as DOMRect;
    });
    render(<SliderRuler min={0} max={100} />);
    const shown = [...document.querySelectorAll<HTMLElement>('.mdt-slider__num')].filter(
      (n) => n.style.visibility !== 'hidden'
    );
    const all = document.querySelectorAll('.mdt-slider__num');
    expect(shown.length).toBeLessThan(all.length);
    expect(shown[0]).toBe(all[0]);
    expect(shown[shown.length - 1]).toBe(all[all.length - 1]);
  });

  it('hides a number under an end name', () => {
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: Element
    ) {
      const v = Number(this.closest('[data-value]')?.getAttribute('data-value'));
      if (this.classList.contains('mdt-slider__word')) return { left: 0, right: 200 } as DOMRect;
      return { left: v * 10, right: v * 10 + 10 } as DOMRect;
    });
    render(<SliderRuler min={1} max={10} start="A very long floor name" />);
    const five = document.querySelector('[data-value="5"] .mdt-slider__num') as HTMLElement;
    expect(five.style.visibility).toBe('hidden');
  });

  it('measures again when it is resized, and stops when it leaves', () => {
    const observe = vi.fn();
    const disconnect = vi.fn();
    let fit: () => void = () => undefined;
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(cb: () => void) {
          fit = cb;
        }
        observe = observe;
        disconnect = disconnect;
      }
    );
    const { unmount } = render(<SliderRuler min={1} max={10} />);
    expect(observe).toHaveBeenCalled();
    expect(() => fit()).not.toThrow();
    unmount();
    expect(disconnect).toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it('runs without a ResizeObserver', () => {
    vi.stubGlobal('ResizeObserver', undefined);
    expect(() => render(<SliderRuler min={1} max={10} />)).not.toThrow();
    vi.unstubAllGlobals();
  });

  it('a lone number with no word keeps its own box', () => {
    place(document.body, 0, 10);
    render(<SliderRuler min={1} max={3} end="Top" />);
    expect(document.querySelector('[data-end="end"]')).toHaveTextContent('Top3');
  });
});
