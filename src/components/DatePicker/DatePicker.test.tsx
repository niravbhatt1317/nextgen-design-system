import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DatePicker } from './DatePicker';
import { formatDay, parseDay, toDay } from './date';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

describe('DatePicker', () => {
  describe('the month grid', () => {
    it('renders the month of its value: the name, the weekday initials and every day', () => {
      render(<DatePicker value="2026-10-22" />);
      expect(screen.getByText('October 2026')).toBeInTheDocument();
      for (const w of WEEKDAYS) expect(screen.getByText(w)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '1 October 2026' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '31 October 2026' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: '32 October 2026' })).not.toBeInTheDocument();
    });

    it('lays the month out Sunday-first, blanks before the first day', () => {
      /* 1 October 2026 is a Thursday: four blanks (Su Mo Tu We) come before it */
      const { container } = render(<DatePicker value="2026-10-22" />);
      const grids = container.querySelectorAll('.mdt-grid-cols-7');
      const days = grids[1];
      expect(days).toBeDefined();
      const children = Array.from(days?.children ?? []);
      expect(children.slice(0, 4).every((el) => el.tagName === 'DIV')).toBe(true);
      expect(children[4]?.textContent).toBe('1');
    });

    it('marks the chosen day as pressed', () => {
      render(<DatePicker value="2026-10-22" />);
      expect(screen.getByRole('button', { name: '22 October 2026' })).toHaveAttribute(
        'aria-pressed',
        'true'
      );
      expect(screen.getByRole('button', { name: '21 October 2026' })).toHaveAttribute(
        'aria-pressed',
        'false'
      );
    });

    it('opens on today when there is no value, and marks today', () => {
      const now = new Date();
      const { container } = render(<DatePicker />);
      const today = container.querySelector('[aria-current="date"]');
      expect(today).not.toBeNull();
      expect(today?.textContent).toBe(String(now.getDate()));
      expect(today).not.toHaveAttribute('aria-pressed', 'true');
    });

    it('names the calendar for assistive tech', () => {
      render(<DatePicker aria-label="Expires on" />);
      expect(screen.getByRole('group', { name: 'Expires on' })).toBeInTheDocument();
    });
  });

  describe('moving between months', () => {
    it('prev and next move a month, across the year end', async () => {
      const user = userEvent.setup();
      render(<DatePicker value="2026-12-22" />);
      await user.click(screen.getByRole('button', { name: 'Next month' }));
      expect(screen.getByText('January 2027')).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Previous month' }));
      await user.click(screen.getByRole('button', { name: 'Previous month' }));
      expect(screen.getByText('November 2026')).toBeInTheDocument();
    });

    it('follows an outside change of the value into its month', () => {
      const { rerender } = render(<DatePicker value="2026-10-22" />);
      rerender(<DatePicker value="2026-12-01" />);
      expect(screen.getByText('December 2026')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '1 December 2026' })).toHaveAttribute(
        'aria-pressed',
        'true'
      );
    });

    it('opens on the bound when today falls outside min / max', () => {
      render(<DatePicker min="2099-01-10" />);
      expect(screen.getByText('January 2099')).toBeInTheDocument();
    });
  });

  describe('picking', () => {
    it('reports the picked day as YYYY-MM-DD', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<DatePicker value="2026-10-22" onChange={onChange} />);
      await user.click(screen.getByRole('button', { name: '5 October 2026' }));
      expect(onChange).toHaveBeenCalledWith('2026-10-05');
    });
  });

  describe('bounds', () => {
    it('greys days outside min and max and does not let them click', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <DatePicker value="2026-10-10" min="2026-10-05" max="2026-10-20" onChange={onChange} />
      );
      expect(screen.getByRole('button', { name: '4 October 2026' })).toBeDisabled();
      expect(screen.getByRole('button', { name: '5 October 2026' })).toBeEnabled();
      expect(screen.getByRole('button', { name: '20 October 2026' })).toBeEnabled();
      expect(screen.getByRole('button', { name: '21 October 2026' })).toBeDisabled();
      await user.click(screen.getByRole('button', { name: '4 October 2026' }));
      expect(onChange).not.toHaveBeenCalled();
    });

    it('stops the month nav at a bound', () => {
      render(<DatePicker value="2026-10-10" min="2026-10-05" max="2026-10-20" />);
      expect(screen.getByRole('button', { name: 'Previous month' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Next month' })).toBeDisabled();
    });

    it('still steps when the next month has a day in range', () => {
      render(<DatePicker value="2026-10-10" min="2026-10-05" max="2026-11-01" />);
      expect(screen.getByRole('button', { name: 'Next month' })).toBeEnabled();
    });
  });

  describe('Clear and Done', () => {
    it('shows no footer without handlers', () => {
      render(<DatePicker value="2026-10-22" />);
      expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Done' })).not.toBeInTheDocument();
    });

    it('shows Clear and Done when asked and fires them', async () => {
      const user = userEvent.setup();
      const onClear = vi.fn();
      const onDone = vi.fn();
      render(<DatePicker value="2026-10-22" onClear={onClear} onDone={onDone} />);
      await user.click(screen.getByRole('button', { name: 'Clear' }));
      expect(onClear).toHaveBeenCalledTimes(1);
      await user.click(screen.getByRole('button', { name: 'Done' }));
      expect(onDone).toHaveBeenCalledTimes(1);
    });
  });

  describe('day helpers', () => {
    it('formats a day with a three-letter month', () => {
      expect(formatDay('2026-09-22')).toBe('22 Sep 2026');
      expect(formatDay('2026-10-05')).toBe('5 Oct 2026');
      expect(formatDay('2026-10-05T14:30')).toBe('5 Oct 2026');
      expect(formatDay('')).toBe('');
      expect(formatDay(undefined)).toBe('');
      expect(formatDay('not a day')).toBe('');
    });

    it('parses and writes a day and refuses an impossible one', () => {
      expect(parseDay('2026-10-22')).toEqual({ y: 2026, mo: 9, d: 22 });
      expect(toDay({ y: 2026, mo: 0, d: 5 })).toBe('2026-01-05');
      expect(parseDay('2026-02-30')).toBeNull();
      expect(parseDay('2026-13-01')).toBeNull();
    });
  });
});
