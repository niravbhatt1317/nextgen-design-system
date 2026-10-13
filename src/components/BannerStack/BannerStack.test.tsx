import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Button } from '../Button';
import { BannerStack } from './BannerStack';
import type { BannerStackItem } from './BannerStack.types';

const group = () => screen.getByRole('group');
const cards = () =>
  Array.from(document.querySelectorAll<HTMLElement>('[data-slot="banner-stack-card"]'));
const titles = () =>
  cards().map((c) => c.querySelector('[data-slot="banner-title"]')?.textContent ?? '');
const rail = () => document.querySelector<HTMLElement>('[data-slot="banner-stack-rail"]');
const shade = () => document.querySelector<HTMLElement>('[data-slot="banner-stack-shade"]');

const ITEMS: BannerStackItem[] = [
  { id: 'low', priority: 10, tone: 'warning', title: 'Missing details' },
  { id: 'top', priority: 90, tone: 'danger', title: 'Suspended' },
  { id: 'mid', priority: 50, tone: 'success', title: 'Import complete' },
];

/* jsdom lays nothing out, so every card reports a height the stack can measure */
let heightSpy: ReturnType<typeof vi.spyOn> | undefined;
beforeEach(() => {
  heightSpy = vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(44);
});
afterEach(() => {
  heightSpy?.mockRestore();
  vi.useRealTimers();
});

const hover = (pointerType = 'mouse') =>
  act(() => {
    fireEvent.pointerEnter(group(), { pointerType });
  });

describe('BannerStack', () => {
  describe('rendering', () => {
    it('renders nothing with no notices', () => {
      const { container } = render(<BannerStack items={[]} />);
      expect(container).toBeEmptyDOMElement();
    });

    it('renders one notice plainly - no rail, no shade, no announcement', () => {
      render(<BannerStack items={[ITEMS[0]!]} />);
      expect(group()).toHaveClass('mdt-bstack--one');
      expect(rail()).toBeNull();
      expect(shade()).toBeNull();
      expect(screen.queryByRole('status')).toBeNull();
      expect(screen.getByText('Missing details')).toBeInTheDocument();
    });

    it('draws every notice as a page banner', () => {
      render(<BannerStack items={ITEMS} />);
      expect(document.querySelectorAll('[data-slot="banner"]')).toHaveLength(3);
    });

    it('is a named group', () => {
      render(<BannerStack items={ITEMS} label="Organization notices" />);
      expect(screen.getByRole('group', { name: 'Organization notices' })).toBeInTheDocument();
    });

    it('tells a screen reader how many are stacked', () => {
      render(<BannerStack items={ITEMS} />);
      expect(screen.getByRole('status')).toHaveTextContent('3 notices stacked');
    });

    it('takes its own announcement', () => {
      render(<BannerStack items={ITEMS} stackedAnnouncement={(n) => `${n} waiting`} />);
      expect(screen.getByRole('status')).toHaveTextContent('3 waiting');
    });

    it('passes className and other attributes through', () => {
      render(<BannerStack items={ITEMS} className="extra" data-testid="stack" />);
      expect(screen.getByTestId('stack')).toHaveClass('extra', 'mdt-bstack');
    });
  });

  describe('order', () => {
    it('puts the highest priority in front', () => {
      render(<BannerStack items={ITEMS} />);
      expect(titles()).toEqual(['Suspended', 'Import complete', 'Missing details']);
      expect(cards()[0]).toHaveClass('mdt-bstack__card--front');
    });

    it('orders by tone when no priority is given', () => {
      render(
        <BannerStack
          items={[
            { id: 'n', tone: 'neutral', title: 'N' },
            { id: 's', tone: 'success', title: 'S' },
            { id: 'd', tone: 'danger', title: 'D' },
            { id: 'i', tone: 'info', title: 'I' },
            { id: 'w', tone: 'warning', title: 'W' },
          ]}
        />
      );
      expect(titles()).toEqual(['D', 'W', 'I', 'S', 'N']);
    });

    it('keeps the given order for equal priorities', () => {
      render(
        <BannerStack
          items={[
            { id: 'a', tone: 'warning', title: 'A' },
            { id: 'b', tone: 'warning', title: 'B' },
          ]}
        />
      );
      expect(titles()).toEqual(['A', 'B']);
    });

    it('paints each strip in its own tone', () => {
      render(<BannerStack items={ITEMS} />);
      const tones = cards().map(
        (c) => c.querySelector<HTMLElement>('.mdt-bstack__strip')?.dataset.tone
      );
      expect(tones).toEqual(['danger', 'success', 'warning']);
    });
  });

  describe('collapsed', () => {
    it('shows the front notice and hides the ones behind it', () => {
      render(<BannerStack items={ITEMS} />);
      const [front, ...behind] = cards();
      expect(front).toHaveStyle({ opacity: '1' });
      behind.forEach((c) => expect(c).toHaveStyle({ opacity: '0', pointerEvents: 'none' }));
    });

    it('holds the slot at the front bar’s height', () => {
      render(<BannerStack items={ITEMS} />);
      expect(group()).toHaveStyle({ height: '44px' });
    });

    it('draws a rail with one tick per notice, the front one taller', () => {
      render(<BannerStack items={ITEMS} />);
      const ticks = rail()!.querySelectorAll('i');
      expect(ticks).toHaveLength(3);
      // three notices: 3 apart, each 6 tall, the front 9
      expect(ticks[0]).toHaveStyle({ height: '9px' });
      expect(ticks[1]).toHaveStyle({ height: '6px' });
      expect(rail()).toHaveStyle({ gap: '3px' });
    });

    it('tightens the rail past five notices so it stays inside the bar', () => {
      const many = Array.from({ length: 7 }, (_, i) => ({ id: `n${i}`, title: `N${i}` }));
      render(<BannerStack items={many} />);
      expect(rail()).toHaveStyle({ gap: '2px' });
      expect(rail()!.querySelectorAll('i')[1]).toHaveStyle({ height: '2px' });
    });

    it('puts the rail in the front notice only', () => {
      render(<BannerStack items={ITEMS} />);
      expect(cards()[0]!.contains(rail())).toBe(true);
    });
  });

  describe('opening', () => {
    it('fans out on hover, each card at its list offset', () => {
      render(<BannerStack items={ITEMS} />);
      hover();
      expect(group()).toHaveClass('is-open');
      expect(group()).toHaveAttribute('data-state', 'open');
      const offsets = cards().map((c) => c.style.transform);
      expect(offsets).toEqual(['translateY(0px)', 'translateY(52px)', 'translateY(104px)']);
      cards().forEach((c) => expect(c).toHaveStyle({ opacity: '1' }));
    });

    it('keeps the slot’s height while open, and grows the shade instead', () => {
      render(<BannerStack items={ITEMS} />);
      hover();
      expect(group()).toHaveStyle({ height: '44px' });
      // 12 above + 44·3 + 8·2 + 12 under
      expect(shade()).toHaveStyle({ height: '172px', top: '-12px' });
    });

    it('collapses 160ms after the pointer leaves', () => {
      vi.useFakeTimers();
      render(<BannerStack items={ITEMS} />);
      hover();
      act(() => {
        fireEvent.pointerLeave(group(), { pointerType: 'mouse' });
      });
      act(() => {
        vi.advanceTimersByTime(150);
      });
      expect(group()).toHaveClass('is-open');
      act(() => {
        vi.advanceTimersByTime(20);
      });
      expect(group()).not.toHaveClass('is-open');
    });

    it('stays open when the pointer comes back within the grace', () => {
      vi.useFakeTimers();
      render(<BannerStack items={ITEMS} />);
      hover();
      act(() => {
        fireEvent.pointerLeave(group(), { pointerType: 'mouse' });
      });
      hover();
      act(() => {
        vi.advanceTimersByTime(400);
      });
      expect(group()).toHaveClass('is-open');
    });

    it('opens and pins on a tap; a tap outside collapses it', () => {
      vi.useFakeTimers();
      render(
        <>
          <BannerStack items={ITEMS} />
          <button type="button">Elsewhere</button>
        </>
      );
      act(() => {
        fireEvent.pointerDown(cards()[0]!, { pointerType: 'touch' });
      });
      expect(group()).toHaveClass('is-open');
      // pinned: a pointer leaving does not close it
      act(() => {
        fireEvent.pointerLeave(group(), { pointerType: 'mouse' });
        vi.advanceTimersByTime(400);
      });
      expect(group()).toHaveClass('is-open');
      act(() => {
        fireEvent.pointerDown(screen.getByRole('button', { name: 'Elsewhere' }));
      });
      expect(group()).not.toHaveClass('is-open');
    });

    it('lets a tap on the front notice’s own control act instead of opening', () => {
      const onClick = vi.fn();
      render(
        <BannerStack
          items={[
            {
              id: 'a',
              tone: 'danger',
              title: 'A',
              actions: (
                <Button variant="ghost" size="sm" onClick={onClick}>
                  Reactivate
                </Button>
              ),
            },
            { id: 'b', tone: 'neutral', title: 'B' },
          ]}
        />
      );
      act(() => {
        fireEvent.pointerDown(screen.getByRole('button', { name: 'Reactivate' }), {
          pointerType: 'touch',
        });
      });
      expect(group()).not.toHaveClass('is-open');
    });

    it('opens when focus is tabbed in, and closes when it leaves', async () => {
      const user = userEvent.setup();
      render(
        <>
          <button type="button">Before</button>
          <BannerStack
            items={[
              { id: 'a', tone: 'danger', title: 'A', onDismiss: () => undefined },
              { id: 'b', tone: 'neutral', title: 'B' },
            ]}
          />
          <button type="button">After</button>
        </>
      );
      await user.click(screen.getByRole('button', { name: 'Before' }));
      await user.tab();
      expect(group()).toHaveClass('is-open');
      await user.tab();
      expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
      expect(group()).not.toHaveClass('is-open');
    });

    it('closes on Escape without moving focus', () => {
      render(<BannerStack items={ITEMS} />);
      hover();
      act(() => {
        fireEvent.keyDown(document, { key: 'Escape' });
      });
      expect(group()).not.toHaveClass('is-open');
    });

    it('never opens with a single notice', () => {
      render(<BannerStack items={[ITEMS[0]!]} />);
      hover();
      expect(group()).not.toHaveClass('is-open');
    });

    it('does not fan out before the notices have been measured', () => {
      heightSpy?.mockReturnValue(0);
      render(<BannerStack items={ITEMS} />);
      hover();
      expect(group()).not.toHaveClass('is-open');
    });

    it('still calls the pointer and focus handlers it is given', () => {
      const onPointerEnter = vi.fn();
      const onFocus = vi.fn();
      render(<BannerStack items={ITEMS} onPointerEnter={onPointerEnter} onFocus={onFocus} />);
      hover();
      act(() => {
        fireEvent.focus(cards()[0]!);
      });
      expect(onPointerEnter).toHaveBeenCalled();
      expect(onFocus).toHaveBeenCalled();
    });
  });

  describe('dismissing', () => {
    it('calls the notice’s own onDismiss', async () => {
      const onDismiss = vi.fn();
      render(
        <BannerStack
          items={[
            { id: 'a', tone: 'danger', title: 'A', onDismiss, dismissLabel: 'Dismiss A' },
            { id: 'b', tone: 'neutral', title: 'B' },
          ]}
        />
      );
      await userEvent.click(screen.getByRole('button', { name: 'Dismiss A' }));
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('re-flows in place when a notice is removed while open', () => {
      const { rerender } = render(<BannerStack items={ITEMS} />);
      hover();
      rerender(<BannerStack items={ITEMS.filter((it) => it.id !== 'mid')} />);
      expect(group()).toHaveClass('is-open');
      expect(cards()[1]!.style.transform).toBe('translateY(52px)');
    });

    it('starts collapsed when a new notice arrives', () => {
      const { rerender } = render(<BannerStack items={ITEMS} />);
      hover();
      rerender(<BannerStack items={[...ITEMS, { id: 'new', tone: 'info', title: 'New' }]} />);
      expect(group()).not.toHaveClass('is-open');
    });

    it('falls back to one plain notice when only one is left', () => {
      const { rerender } = render(<BannerStack items={ITEMS.slice(0, 2)} />);
      rerender(<BannerStack items={ITEMS.slice(0, 1)} />);
      expect(group()).toHaveClass('mdt-bstack--one');
      expect(rail()).toBeNull();
    });
  });

  describe('motion', () => {
    it('holds the transitions on first paint and releases them after two frames', async () => {
      render(<BannerStack items={ITEMS} />);
      expect(group()).toHaveClass('mdt-bstack--held');
      await act(
        () =>
          new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())))
      );
      await act(() => new Promise<void>((r) => requestAnimationFrame(() => r())));
      expect(group()).not.toHaveClass('mdt-bstack--held');
    });

    it('staggers the cards: the front first on the way out, the last first on the way back', () => {
      render(<BannerStack items={ITEMS} />);
      const delays = () => cards().map((c) => c.style.getPropertyValue('--bs-delay'));
      expect(delays()).toEqual(['36ms', '18ms', '0ms']);
      hover();
      expect(delays()).toEqual(['0ms', '26ms', '52ms']);
    });

    it('holds the transitions again on a window resize', async () => {
      render(<BannerStack items={ITEMS} />);
      await act(
        () =>
          new Promise<void>((r) =>
            requestAnimationFrame(() =>
              requestAnimationFrame(() => requestAnimationFrame(() => r()))
            )
          )
      );
      act(() => {
        window.dispatchEvent(new Event('resize'));
      });
      expect(group()).toHaveClass('mdt-bstack--held');
    });
  });
});
