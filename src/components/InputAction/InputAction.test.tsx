import { createRef } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Input } from '../Input';
import { InputAction } from './InputAction';

describe('InputAction', () => {
  describe('rendering', () => {
    it('renders a button with its word', () => {
      render(<InputAction>Browse</InputAction>);
      expect(screen.getByRole('button', { name: 'Browse' })).toBeInTheDocument();
    });

    it('is a plain button, never a submit', () => {
      render(<InputAction>Browse</InputAction>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('draws the glyph when given one, hidden from assistive tech', () => {
      const { container } = render(<InputAction icon="folder">Browse</InputAction>);
      const svg = container.querySelector('svg');
      expect(svg).not.toBeNull();
      expect(svg).toHaveAttribute('aria-hidden');
    });

    it('draws no glyph without one', () => {
      const { container } = render(<InputAction>Upload</InputAction>);
      expect(container.querySelector('svg')).toBeNull();
    });

    it('puts the control in a wrapper that carries the hairline', () => {
      render(<InputAction wrapperClassName="extra">Browse</InputAction>);
      const wrap = screen.getByRole('button').parentElement;
      expect(wrap).toHaveClass('mdt-inaction');
      expect(wrap).toHaveClass('extra');
    });

    it('passes className and other attributes to the button', () => {
      render(
        <InputAction className="mine" aria-label="Browse the vault's paths">
          Browse
        </InputAction>
      );
      const btn = screen.getByRole('button', { name: "Browse the vault's paths" });
      expect(btn).toHaveClass('mdt-inaction__btn');
      expect(btn).toHaveClass('mine');
    });

    it('forwards its ref to the button', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<InputAction ref={ref}>Browse</InputAction>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('sits inside an Input as its end adornment', () => {
      render(
        <Input
          label="Reference path"
          endAdornment={<InputAction icon="folder">Browse</InputAction>}
        />
      );
      expect(screen.getByLabelText('Reference path')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Browse' })).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onClick when pressed', async () => {
      const onClick = vi.fn();
      render(<InputAction onClick={onClick}>Browse</InputAction>);
      await userEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('can be pressed from the keyboard', async () => {
      const onClick = vi.fn();
      render(<InputAction onClick={onClick}>Browse</InputAction>);
      await userEvent.tab();
      expect(screen.getByRole('button')).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('disabled', () => {
    it('does not call onClick', async () => {
      const onClick = vi.fn();
      render(
        <InputAction disabled onClick={onClick}>
          Browse
        </InputAction>
      );
      const btn = screen.getByRole('button');
      expect(btn).toBeDisabled();
      await userEvent.click(btn);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('shows the reason on the wrapper', () => {
      render(
        <InputAction disabled disabledReason="No path-list API on this store">
          Browse
        </InputAction>
      );
      expect(screen.getByRole('button').parentElement).toHaveAttribute(
        'title',
        'No path-list API on this store'
      );
    });

    it('shows no reason while on', () => {
      render(<InputAction disabledReason="No path-list API on this store">Browse</InputAction>);
      expect(screen.getByRole('button').parentElement).not.toHaveAttribute('title');
    });
  });

  describe('copy', () => {
    const clipboard = () => {
      const writeText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
      return writeText;
    };

    it('copies the text, reads Copied with a check in the success ink, then goes back', () => {
      vi.useFakeTimers();
      const writeText = clipboard();
      const onClick = vi.fn();
      render(
        <InputAction icon="copy" copyText="oneops-tnt-acme" onClick={onClick}>
          Copy
        </InputAction>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Copy');
      fireEvent.click(button);
      expect(writeText).toHaveBeenCalledWith('oneops-tnt-acme');
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(button).toHaveTextContent('Copied');
      expect(button).toHaveAttribute('title', 'Copied');
      expect(button).toHaveClass('mdt-inaction__btn--done');
      act(() => {
        vi.advanceTimersByTime(1500);
      });
      expect(button).toHaveTextContent('Copy');
      expect(button).not.toHaveClass('mdt-inaction__btn--done');
      vi.useRealTimers();
    });

    it('takes its own word and time, and restarts the time on a second click', () => {
      vi.useFakeTimers();
      clipboard();
      render(
        <InputAction copyText="x" copiedLabel="Done" copiedDuration={500}>
          <b>Copy</b>
        </InputAction>
      );
      const button = screen.getByRole('button');
      expect(button).not.toHaveAttribute('title');
      fireEvent.click(button);
      act(() => {
        vi.advanceTimersByTime(400);
      });
      fireEvent.click(button);
      act(() => {
        vi.advanceTimersByTime(400);
      });
      expect(button).toHaveTextContent('Done');
      act(() => {
        vi.advanceTimersByTime(100);
      });
      expect(button).toHaveTextContent('Copy');
      vi.useRealTimers();
    });

    it('still shows Copied when the clipboard is blocked or missing', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn().mockRejectedValue(new Error('blocked')) },
        configurable: true,
      });
      const { unmount } = render(<InputAction copyText="x">Copy</InputAction>);
      await userEvent.click(screen.getByRole('button'));
      expect(screen.getByRole('button')).toHaveTextContent('Copied');
      unmount();
      Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true });
      render(<InputAction copyText="x">Copy</InputAction>);
      await userEvent.click(screen.getByRole('button'));
      expect(screen.getByRole('button')).toHaveTextContent('Copied');
    });
  });
});
