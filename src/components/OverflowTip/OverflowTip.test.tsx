import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OverflowTip } from './OverflowTip';

/** The visible bubble; Radix keeps a second, hidden copy for screen readers. */
const bubble = () => document.querySelector<HTMLElement>('.tt');
const anchor = () => document.querySelector<HTMLElement>('[data-slot="overflow-tip-anchor"]');

/** jsdom lays nothing out, so a cut is described to it: the box and the content's size. */
const size = (
  el: HTMLElement,
  box: { w: number; h: number },
  content: { w: number; h: number }
) => {
  Object.defineProperty(el, 'clientWidth', { configurable: true, value: box.w });
  Object.defineProperty(el, 'clientHeight', { configurable: true, value: box.h });
  Object.defineProperty(el, 'scrollWidth', { configurable: true, value: content.w });
  Object.defineProperty(el, 'scrollHeight', { configurable: true, value: content.h });
};

const LONG = 'Northwind Retail - Eastern region distribution centre';

const Page = ({ clampStyle = false }: { clampStyle?: boolean }) => (
  <div>
    <span
      data-testid="cut"
      style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
    >
      <b data-testid="inner">{LONG}</b>
    </span>
    <span data-testid="fits" style={{ textOverflow: 'ellipsis' }}>
      Short
    </span>
    {clampStyle ? (
      <p data-testid="clamp" style={{ WebkitLineClamp: 2 }}>
        {'Line one\n   and line two and   three'}
      </p>
    ) : null}
    <div data-no-overflow-tip>
      <span data-testid="aside" style={{ textOverflow: 'ellipsis' }}>
        {LONG}
      </span>
    </div>
    <span data-testid="empty" style={{ textOverflow: 'ellipsis' }} />
    <div role="tooltip">
      <span data-testid="in-tip" style={{ textOverflow: 'ellipsis' }}>
        {LONG}
      </span>
    </div>
    <button type="button" data-state="closed" aria-describedby="own-tip">
      <span data-testid="owned" style={{ textOverflow: 'ellipsis' }}>
        {LONG}
      </span>
    </button>
    <OverflowTip />
  </div>
);

describe('OverflowTip', () => {
  describe('rendering', () => {
    it('renders nothing until the pointer rests on cut text', () => {
      render(<Page />);
      expect(anchor()).toBeNull();
      expect(bubble()).toBeNull();
    });
  });

  describe('interactions', () => {
    it('shows the whole text of an ellipsis, from a child up to the cut element', () => {
      render(<Page />);
      size(screen.getByTestId('cut'), { w: 100, h: 18 }, { w: 300, h: 18 });
      fireEvent.pointerOver(screen.getByTestId('inner'));
      expect(bubble()).toHaveTextContent(LONG);
      expect(bubble()).toHaveClass('mdt-text-left');
      expect(bubble()).toHaveStyle({ maxWidth: '340px' });
      expect(bubble()).toHaveAttribute('data-side', 'top');
      const a = anchor();
      expect(a).toHaveAttribute('aria-hidden', 'true');
      expect(a).toHaveClass('mdt-fixed', 'mdt-pointer-events-none');
    });

    it('gives text that fits nothing', () => {
      render(<Page />);
      size(screen.getByTestId('fits'), { w: 100, h: 18 }, { w: 100, h: 18 });
      fireEvent.pointerOver(screen.getByTestId('fits'));
      expect(bubble()).toBeNull();
    });

    it('shows a line clamp taller than its box, on one line', () => {
      render(<Page clampStyle />);
      const clamp = screen.getByTestId('clamp');
      const cs = window.getComputedStyle.bind(window);
      const spy = (el: Element) => {
        const real = cs(el);
        if (el !== clamp) return real;
        return new Proxy(real, {
          get: (target, key) => (key === 'webkitLineClamp' ? '2' : Reflect.get(target, key)),
        });
      };
      const restore = window.getComputedStyle;
      window.getComputedStyle = spy as typeof window.getComputedStyle;
      size(clamp, { w: 200, h: 36 }, { w: 200, h: 54 });
      fireEvent.pointerOver(clamp);
      window.getComputedStyle = restore;
      expect(bubble()).toHaveTextContent('Line one and line two and three');
    });

    it('stands aside inside data-no-overflow-tip', () => {
      render(<Page />);
      size(screen.getByTestId('aside'), { w: 100, h: 18 }, { w: 300, h: 18 });
      fireEvent.pointerOver(screen.getByTestId('aside'));
      expect(bubble()).toBeNull();
    });

    it('stands aside on a trigger that owns its tooltip', () => {
      render(<Page />);
      size(screen.getByTestId('owned'), { w: 100, h: 18 }, { w: 300, h: 18 });
      fireEvent.pointerOver(screen.getByTestId('owned'));
      expect(bubble()).toBeNull();
    });

    it('stands aside inside a tooltip, and closes when the pointer moves onto one', () => {
      render(<Page />);
      size(screen.getByTestId('in-tip'), { w: 100, h: 18 }, { w: 300, h: 18 });
      fireEvent.pointerOver(screen.getByTestId('in-tip'));
      expect(bubble()).toBeNull();
      size(screen.getByTestId('cut'), { w: 100, h: 18 }, { w: 300, h: 18 });
      fireEvent.pointerOver(screen.getByTestId('inner'));
      expect(bubble()).toHaveTextContent(LONG);
      fireEvent.pointerOver(screen.getByTestId('in-tip'));
      expect(bubble()).toBeNull();
    });

    it('gives a cut element with no words nothing', () => {
      render(<Page />);
      size(screen.getByTestId('empty'), { w: 10, h: 18 }, { w: 30, h: 18 });
      fireEvent.pointerOver(screen.getByTestId('empty'));
      expect(bubble()).toBeNull();
    });

    it('ignores a pointer over something that is not an element', () => {
      render(<Page />);
      act(() => {
        document.dispatchEvent(new Event('pointerover'));
      });
      expect(bubble()).toBeNull();
    });

    it('keeps the bubble while the pointer moves inside, closes it on leaving', () => {
      render(<Page />);
      const cut = screen.getByTestId('cut');
      size(cut, { w: 100, h: 18 }, { w: 300, h: 18 });
      fireEvent.pointerOver(cut);
      fireEvent.pointerOver(screen.getByTestId('inner'));
      expect(bubble()).toHaveTextContent(LONG);
      fireEvent.pointerOut(cut, { relatedTarget: screen.getByTestId('inner') });
      expect(bubble()).toHaveTextContent(LONG);
      fireEvent.pointerOut(cut, { relatedTarget: screen.getByTestId('fits') });
      expect(bubble()).toBeNull();
    });

    it('a pointer out with nothing shown changes nothing', () => {
      render(<Page />);
      fireEvent.pointerOut(screen.getByTestId('fits'));
      expect(bubble()).toBeNull();
    });

    it('closes on a scroll and on a press', () => {
      render(<Page />);
      const cut = screen.getByTestId('cut');
      size(cut, { w: 100, h: 18 }, { w: 300, h: 18 });
      fireEvent.pointerOver(cut);
      expect(bubble()).not.toBeNull();
      fireEvent.scroll(document);
      expect(bubble()).toBeNull();
      fireEvent.scroll(document);
      fireEvent.pointerOver(screen.getByTestId('fits'));
      fireEvent.pointerOver(cut);
      expect(bubble()).not.toBeNull();
      fireEvent.pointerDown(document.body);
      expect(bubble()).toBeNull();
    });

    it('lets go of the page when it unmounts', () => {
      const { unmount } = render(<Page />);
      unmount();
      expect(() => fireEvent.pointerOver(document.body)).not.toThrow();
    });
  });
});
