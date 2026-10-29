import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Button } from '../Button';
import { CopyTip } from './CopyTip';

const ID = 'oneops-entity-8f3a2c';
const writeText = vi.fn(() => Promise.resolve());

/** The visible bubble; Radix keeps a second, hidden copy for screen readers. */
const bubble = () => document.querySelector<HTMLElement>('.tt');

const IconCopy = (props: { onClick?: () => void }) => (
  <Button iconOnly variant="ghost" size="sm" ariaLabel="Copy entity ID" {...props} />
);

beforeEach(() => {
  writeText.mockClear();
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
    writable: true,
  });
});

afterEach(() => {
  vi.useRealTimers();
});

describe('CopyTip', () => {
  describe('rendering', () => {
    it('renders the control inside its own inline anchor, and no bubble at rest', () => {
      render(
        <CopyTip text={ID}>
          <IconCopy />
        </CopyTip>
      );
      const button = screen.getByRole('button', { name: 'Copy entity ID' });
      const anchor = button.parentElement;
      expect(anchor).toHaveAttribute('data-slot', 'copy-tip');
      expect(anchor).toHaveClass('mdt-inline-flex', 'mdt-shrink-0');
      expect(bubble()).toBeNull();
    });
  });

  describe('interactions', () => {
    it('copies the text on a press and calls onCopy', async () => {
      const onCopy = vi.fn();
      render(
        <CopyTip text={ID} onCopy={onCopy}>
          <IconCopy />
        </CopyTip>
      );
      await userEvent.click(screen.getByRole('button', { name: 'Copy entity ID' }));
      expect(writeText).toHaveBeenCalledWith(ID);
      expect(onCopy).toHaveBeenCalledWith(ID);
    });

    it('reads a function at the moment of the press', async () => {
      let n = 1;
      render(
        <CopyTip text={() => `link-${n}`}>
          <IconCopy />
        </CopyTip>
      );
      n = 2;
      await userEvent.click(screen.getByRole('button', { name: 'Copy entity ID' }));
      expect(writeText).toHaveBeenCalledWith('link-2');
    });

    it("still runs the control's own onClick, first", async () => {
      const order: string[] = [];
      writeText.mockImplementationOnce(() => {
        order.push('copy');
        return Promise.resolve();
      });
      render(
        <CopyTip text={ID}>
          <IconCopy onClick={() => order.push('own')} />
        </CopyTip>
      );
      await userEvent.click(screen.getByRole('button', { name: 'Copy entity ID' }));
      expect(order).toEqual(['own', 'copy']);
    });

    it('says "Copy" under the pointer, or another word', async () => {
      const { unmount } = render(
        <CopyTip text={ID}>
          <IconCopy />
        </CopyTip>
      );
      await userEvent.hover(screen.getByRole('button', { name: 'Copy entity ID' }));
      await waitFor(() => {
        expect(bubble()).toHaveTextContent('Copy');
      });
      unmount();
      render(
        <CopyTip text={ID} tip="Copy the ID" side="left">
          <IconCopy />
        </CopyTip>
      );
      await userEvent.hover(screen.getByRole('button', { name: 'Copy entity ID' }));
      await waitFor(() => {
        expect(bubble()).toHaveTextContent('Copy the ID');
      });
      expect(bubble()).toHaveAttribute('data-side', 'left');
    });

    it('says "Copied" for 1.4 s after a press, then closes', () => {
      vi.useFakeTimers();
      render(
        <CopyTip text={ID}>
          <IconCopy />
        </CopyTip>
      );
      fireEvent.click(screen.getByRole('button', { name: 'Copy entity ID' }));
      expect(bubble()).toHaveTextContent('Copied');
      expect(screen.getByText('Copied', { selector: '.mdt-sr-only' })).toHaveAttribute(
        'aria-live',
        'polite'
      );
      act(() => {
        vi.advanceTimersByTime(1399);
      });
      expect(bubble()).toHaveTextContent('Copied');
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(bubble()).toBeNull();
    });

    it('a second press starts the 1.4 s again', () => {
      vi.useFakeTimers();
      render(
        <CopyTip text={ID}>
          <IconCopy />
        </CopyTip>
      );
      const button = screen.getByRole('button', { name: 'Copy entity ID' });
      fireEvent.click(button);
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      fireEvent.click(button);
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(bubble()).toHaveTextContent('Copied');
      act(() => {
        vi.advanceTimersByTime(400);
      });
      expect(bubble()).toBeNull();
    });

    it('hoverTip off: nothing under the pointer, "Copied" after a press', async () => {
      render(
        <CopyTip text={ID} hoverTip={false}>
          <Button variant="secondary">Copy link</Button>
        </CopyTip>
      );
      const button = screen.getByRole('button', { name: 'Copy link' });
      await userEvent.hover(button);
      await act(() => new Promise((r) => setTimeout(r, 200)));
      expect(bubble()).toBeNull();
      await userEvent.click(button);
      expect(bubble()).toHaveTextContent('Copied');
    });

    it('survives a refused or missing clipboard', () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        configurable: true,
        writable: true,
      });
      render(
        <CopyTip text={ID}>
          <IconCopy />
        </CopyTip>
      );
      expect(() => {
        fireEvent.click(screen.getByRole('button', { name: 'Copy entity ID' }));
      }).not.toThrow();
      expect(bubble()).toHaveTextContent('Copied');
    });

    it('survives a clipboard that rejects', async () => {
      writeText.mockImplementationOnce(() => Promise.reject(new Error('denied')));
      render(
        <CopyTip text={ID}>
          <IconCopy />
        </CopyTip>
      );
      await userEvent.click(screen.getByRole('button', { name: 'Copy entity ID' }));
      expect(bubble()).toHaveTextContent('Copied');
    });

    it('clears its timer when it leaves the page', () => {
      vi.useFakeTimers();
      const clear = vi.spyOn(globalThis, 'clearTimeout');
      const { unmount } = render(
        <CopyTip text={ID}>
          <IconCopy />
        </CopyTip>
      );
      fireEvent.click(screen.getByRole('button', { name: 'Copy entity ID' }));
      clear.mockClear();
      unmount();
      expect(clear).toHaveBeenCalled();
      clear.mockRestore();
    });
  });
});
