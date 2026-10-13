import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CopyField } from './CopyField';

const URL = 'https://scim.oneops.example.com/v2';
const writeText = vi.fn(() => Promise.resolve());

/** The visible bubble; Radix keeps a second, hidden copy for screen readers. */
const bubble = () => document.querySelector<HTMLElement>('.tt');

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

describe('CopyField', () => {
  describe('rendering', () => {
    it('shows the value on one line, cut with an ellipsis and whole on hover', () => {
      render(<CopyField value={URL} />);
      const text = screen.getByText(URL);
      expect(text).toHaveClass('mdt-truncate', 'mdt-font-mono', 'mdt-text-xs');
      expect(text).toHaveAttribute('title', URL);
    });

    it('draws the line on the sunken ground, 36 tall, 8 radius', () => {
      render(<CopyField value={URL} />);
      expect(screen.getByTestId('copyfield-line')).toHaveClass(
        'mdt-h-9',
        'mdt-rounded-lg',
        'mdt-bg-secondary',
        'mdt-pl-3',
        'mdt-pr-1'
      );
    });

    it('puts the label above and names the group by it', () => {
      render(<CopyField label="Base URL" value={URL} />);
      expect(screen.getByRole('group', { name: 'Base URL' })).toBeInTheDocument();
      expect(screen.getByText('Base URL')).toHaveClass('mdt-text-[13px]', 'mdt-font-medium');
    });

    it('shows the info slot beside the label', () => {
      render(<CopyField label="Base URL" value={URL} info={<span>INFO</span>} />);
      expect(screen.getByText('INFO')).toBeInTheDocument();
    });

    it('drops the monospace face when mono is off', () => {
      render(<CopyField value="Plain words" mono={false} />);
      expect(screen.getByText('Plain words')).not.toHaveClass('mdt-font-mono');
    });

    it('masks the value with SecretDots and no title', () => {
      render(<CopyField label="Bearer token" value="sk-live-secret" masked />);
      expect(screen.queryByText('sk-live-secret')).toBeNull();
      expect(screen.getByText('Hidden Bearer token')).toHaveClass('mdt-sr-only');
      expect(screen.getByTestId('secret-dots-bullets')).toBeInTheDocument();
    });

    it('leaves the button out when copyable is off, and keeps 12 on the right', () => {
      render(<CopyField value={URL} copyable={false} />);
      expect(screen.queryByRole('button')).toBeNull();
      expect(screen.getByTestId('copyfield-line')).toHaveClass('mdt-pr-3');
    });

    it('forwards the ref and the className', () => {
      const ref = createRef<HTMLDivElement>();
      render(<CopyField ref={ref} value={URL} className="custom" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('custom');
    });
  });

  describe('the copy button', () => {
    it('is icon-only and named after the label', () => {
      render(<CopyField label="Base URL" value={URL} />);
      expect(screen.getByRole('button', { name: 'Copy Base URL' })).toBeInTheDocument();
    });

    it('is named "Copy" without a label, or by copyLabel', () => {
      const { rerender } = render(<CopyField value={URL} />);
      expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument();
      rerender(<CopyField value={URL} copyLabel="Copy the endpoint" />);
      expect(screen.getByRole('button', { name: 'Copy the endpoint' })).toBeInTheDocument();
    });

    it('copies the whole value and calls onCopy', async () => {
      const onCopy = vi.fn();
      render(<CopyField label="Base URL" value={URL} onCopy={onCopy} />);
      await userEvent.click(screen.getByRole('button', { name: 'Copy Base URL' }));
      expect(writeText).toHaveBeenCalledWith(URL);
      expect(onCopy).toHaveBeenCalledWith(URL);
    });

    it('copies the real value while masked', async () => {
      render(<CopyField label="Bearer token" value="sk-live-secret" masked />);
      await userEvent.click(screen.getByRole('button', { name: 'Copy Bearer token' }));
      expect(writeText).toHaveBeenCalledWith('sk-live-secret');
    });

    it('says "Copy" under the pointer', async () => {
      render(<CopyField value={URL} />);
      await userEvent.hover(screen.getByRole('button', { name: 'Copy' }));
      await waitFor(() => {
        expect(bubble()).toHaveTextContent('Copy');
      });
    });

    it('takes another hover word', async () => {
      render(<CopyField value={URL} tip="Copy URL" />);
      await userEvent.hover(screen.getByRole('button', { name: 'Copy' }));
      await waitFor(() => {
        expect(bubble()).toHaveTextContent('Copy URL');
      });
    });

    it('says "Copied" for 1.4 s after a press, then closes', () => {
      vi.useFakeTimers();
      render(<CopyField value={URL} />);
      fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
      expect(bubble()).toHaveTextContent('Copied');
      expect(screen.getByText('Copied', { selector: '.mdt-sr-only' })).toBeInTheDocument();
      act(() => {
        vi.advanceTimersByTime(1399);
      });
      expect(bubble()).toHaveTextContent('Copied');
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(bubble()).toBeNull();
    });

    it('survives a refused or missing clipboard', () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        configurable: true,
        writable: true,
      });
      render(<CopyField value={URL} />);
      expect(() => {
        fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
      }).not.toThrow();
      expect(bubble()).toHaveTextContent('Copied');
    });
  });
});
