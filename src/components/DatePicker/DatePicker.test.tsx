import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DatePicker } from './DatePicker';
import { formatDateTime, formatDay, parseDay, parseTime, timeSlots, toDay } from './date';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const day = (name: string) => screen.getByRole('button', { name });
const apply = () => screen.getByRole('button', { name: 'Apply' });
const reset = () => screen.getByRole('button', { name: 'Reset' });

describe('DatePicker', () => {
  describe('the month grid', () => {
    it('renders the month of its value: the title, the weekday initials and every day', () => {
      render(<DatePicker value="2026-10-22" />);
      expect(screen.getByText('October 2026')).toBeInTheDocument();
      for (const w of WEEKDAYS) expect(screen.getByText(w)).toBeInTheDocument();
      expect(day('1 October 2026')).toBeInTheDocument();
      expect(day('31 October 2026')).toBeInTheDocument();
    });

    it('fills the first row with the month before, Sunday-first, in the faint ink', () => {
      /* 1 October 2026 is a Thursday: 27-30 September come before it */
      render(<DatePicker value="2026-10-22" />);
      const sep27 = day('27 September 2026');
      expect(sep27).toHaveClass('mdt-text-faint');
      expect(day('1 October 2026')).not.toHaveClass('mdt-text-faint');
      expect(screen.queryByRole('button', { name: '26 September 2026' })).not.toBeInTheDocument();
    });

    it('drops a sixth row that holds no day of the month', () => {
      /* October 2026 fits five rows (35 cells); August 2026 needs six (starts Saturday) */
      const { rerender } = render(<DatePicker value="2026-10-22" />);
      expect(
        screen.getByRole('group', { name: 'October 2026' }).querySelectorAll('[data-day]')
      ).toHaveLength(35);
      rerender(<DatePicker value="2026-08-10" />);
      expect(
        screen.getByRole('group', { name: 'August 2026' }).querySelectorAll('[data-day]')
      ).toHaveLength(42);
    });

    it('marks the chosen day as pressed, in the info badge pale blue with no outline', () => {
      render(<DatePicker value="2026-10-22" />);
      const picked = day('22 October 2026');
      expect(picked).toHaveAttribute('aria-pressed', 'true');
      expect(picked).toHaveClass(
        'mdt-bg-[color:var(--mdt-badge-info-fill)]',
        'mdt-text-[color:var(--mdt-badge-info-ink)]',
        'mdt-font-semibold',
        'mdt-border-transparent'
      );
      expect(day('21 October 2026')).toHaveAttribute('aria-pressed', 'false');
      expect(day('21 October 2026')).toHaveClass('mdt-text-neutral-90');
    });

    it('opens on today when there is no value, and outlines today', () => {
      const now = new Date();
      const { container } = render(<DatePicker />);
      const today = container.querySelector('[data-day][aria-current="date"]');
      expect(today?.textContent).toBe(String(now.getDate()));
      expect(today).toHaveClass('mdt-border-neutral-40');
      expect(today).toHaveAttribute('aria-pressed', 'false');
    });

    it('names the picker for assistive tech', () => {
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
      expect(day('1 December 2026')).toHaveAttribute('aria-pressed', 'true');
    });

    it('opens on the bound when today falls outside min / max', () => {
      render(<DatePicker min="2099-01-10" />);
      expect(screen.getByText('January 2099')).toBeInTheDocument();
    });

    it('moves between days with the arrow keys, across a month', async () => {
      const user = userEvent.setup();
      render(<DatePicker value="2026-10-31" />);
      day('31 October 2026').focus();
      await user.keyboard('{ArrowRight}');
      expect(screen.getByText('November 2026')).toBeInTheDocument();
      expect(day('1 November 2026')).toHaveFocus();
      await user.keyboard('{ArrowUp}');
      expect(day('25 October 2026')).toHaveFocus();
    });
  });

  describe('the month and year levels', () => {
    it('the title opens the months, a month opens its days', async () => {
      const user = userEvent.setup();
      render(<DatePicker value="2026-10-13" />);
      await user.click(screen.getByRole('button', { name: 'October 2026, choose a month' }));
      const months = screen.getByRole('group', { name: 'Months of 2026' });
      expect(months.querySelectorAll('button')).toHaveLength(12);
      expect(screen.getByRole('button', { name: 'October 2026' })).toHaveAttribute(
        'aria-pressed',
        'true'
      );
      await user.click(screen.getByRole('button', { name: 'Next year' }));
      expect(screen.getByRole('button', { name: '2027, choose a year' })).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'March 2027' }));
      expect(screen.getByText('March 2027')).toBeInTheDocument();
      expect(day('15 March 2027')).toBeInTheDocument();
    });

    it('the year title opens twenty years, steps twenty, and a year opens its months', async () => {
      const user = userEvent.setup();
      render(<DatePicker value="2026-10-13" />);
      await user.click(screen.getByRole('button', { name: 'October 2026, choose a month' }));
      await user.click(screen.getByRole('button', { name: '2026, choose a year' }));
      expect(screen.getByText('2020 – 2039')).toBeInTheDocument();
      /* the block title is not a button */
      expect(screen.getByText('2020 – 2039').tagName).toBe('SPAN');
      const years = screen.getByRole('group', { name: 'Years' });
      expect(years.querySelectorAll('button')).toHaveLength(20);
      expect(screen.getByRole('button', { name: '2026' })).toHaveAttribute('aria-pressed', 'true');
      await user.click(screen.getByRole('button', { name: 'Later years' }));
      expect(screen.getByText('2040 – 2059')).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: '2041' }));
      expect(screen.getByRole('group', { name: 'Months of 2041' })).toBeInTheDocument();
    });

    it('greys months and years outside min / max and stops the arrows', async () => {
      const user = userEvent.setup();
      render(<DatePicker value="2026-10-10" min="2026-03-05" max="2027-02-20" />);
      await user.click(screen.getByRole('button', { name: 'October 2026, choose a month' }));
      expect(screen.getByRole('button', { name: 'February 2026' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'March 2026' })).toBeEnabled();
      expect(screen.getByRole('button', { name: 'Previous year' })).toBeDisabled();
      await user.click(screen.getByRole('button', { name: '2026, choose a year' }));
      expect(screen.getByRole('button', { name: '2025' })).toBeDisabled();
      expect(screen.getByRole('button', { name: '2027' })).toBeEnabled();
      expect(screen.getByRole('button', { name: '2028' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Earlier years' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Later years' })).toBeDisabled();
    });
  });

  describe('the draft, Apply and Reset', () => {
    it('reports nothing on a day click; Apply reports the day as YYYY-MM-DD', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const onDone = vi.fn();
      render(<DatePicker value="2026-10-22" onChange={onChange} onDone={onDone} />);
      await user.click(day('5 October 2026'));
      expect(onChange).not.toHaveBeenCalled();
      expect(day('5 October 2026')).toHaveAttribute('aria-pressed', 'true');
      expect(day('22 October 2026')).toHaveAttribute('aria-pressed', 'false');
      await user.click(apply());
      expect(onChange).toHaveBeenCalledWith('2026-10-05');
      expect(onDone).toHaveBeenCalledTimes(1);
    });

    it('keeps Apply off until a day is picked', async () => {
      const user = userEvent.setup();
      const { container } = render(<DatePicker value="" />);
      expect(apply()).toBeDisabled();
      const first = container.querySelector<HTMLElement>('[data-day][tabindex="0"]');
      expect(first).not.toBeNull();
      if (first) await user.click(first);
      expect(apply()).toBeEnabled();
    });

    it('Reset empties the draft and fires onReset and the older onClear', async () => {
      const user = userEvent.setup();
      const onReset = vi.fn();
      const onChange = vi.fn();
      render(<DatePicker value="2026-10-22" onChange={onChange} onReset={onReset} />);
      await user.click(reset());
      expect(onReset).toHaveBeenCalledTimes(1);
      expect(day('22 October 2026')).toHaveAttribute('aria-pressed', 'false');
      expect(apply()).toBeDisabled();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('with clearable (or the older onClear), an emptied draft applies as ""', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const onClear = vi.fn();
      render(<DatePicker value="2026-10-22" onChange={onChange} onClear={onClear} />);
      await user.click(reset());
      expect(onClear).toHaveBeenCalledTimes(1);
      expect(apply()).toBeEnabled();
      await user.click(apply());
      expect(onChange).toHaveBeenCalledWith('');
    });
  });

  describe('withTime', () => {
    it('shows no time column by default', () => {
      render(<DatePicker value="2026-10-13" />);
      expect(screen.queryByRole('listbox', { name: 'Times' })).not.toBeInTheDocument();
    });

    it('lists every half hour, heads the column with the day, and marks the picked time', () => {
      render(<DatePicker withTime value="2026-10-13T14:30" />);
      const list = screen.getByRole('listbox', { name: 'Times' });
      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(48);
      expect(options[0]).toHaveTextContent('00:00');
      expect(options[47]).toHaveTextContent('23:30');
      expect(list).toBeInTheDocument();
      expect(screen.getByText('Tue, 13 Oct')).toBeInTheDocument();
      expect(screen.getByText('Local time · 24-hour')).toBeInTheDocument();
      expect(screen.getByRole('option', { name: '14:30' })).toHaveAttribute(
        'aria-selected',
        'true'
      );
    });

    it('takes its own step', () => {
      render(<DatePicker withTime timeStep={60} value="2026-10-13" />);
      expect(screen.getAllByRole('option')).toHaveLength(24);
    });

    it('keeps Apply off until a time is picked, then reports YYYY-MM-DDTHH:mm', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<DatePicker withTime value="2026-10-13" onChange={onChange} />);
      expect(apply()).toBeDisabled();
      await user.click(screen.getByRole('option', { name: '09:00' }));
      expect(apply()).toBeEnabled();
      await user.click(day('20 October 2026'));
      expect(screen.getByText('Tue, 20 Oct')).toBeInTheDocument();
      await user.click(apply());
      expect(onChange).toHaveBeenCalledWith('2026-10-20T09:00');
    });

    it('keeps the list where it was scrolled when a time is clicked', () => {
      render(<DatePicker withTime value="2026-10-13T14:30" />);
      const list = screen.getByRole('listbox', { name: 'Times' });
      list.scrollTop = 123;
      fireEvent.click(screen.getByRole('option', { name: '16:00' }));
      expect(list.scrollTop).toBe(123);
      expect(screen.getByRole('option', { name: '16:00' })).toHaveAttribute(
        'aria-selected',
        'true'
      );
    });

    it('holds a time between the steps in the list', () => {
      render(<DatePicker withTime value="2026-10-13T14:15" />);
      expect(screen.getByRole('option', { name: '14:15' })).toHaveAttribute(
        'aria-selected',
        'true'
      );
      expect(screen.getAllByRole('option')).toHaveLength(49);
    });
  });

  describe('bounds', () => {
    it('greys days outside min and max and does not let them click', async () => {
      const user = userEvent.setup();
      render(<DatePicker value="2026-10-10" min="2026-10-05" max="2026-10-20" />);
      expect(day('4 October 2026')).toBeDisabled();
      expect(day('5 October 2026')).toBeEnabled();
      expect(day('20 October 2026')).toBeEnabled();
      expect(day('21 October 2026')).toBeDisabled();
      await user.click(day('4 October 2026'));
      expect(day('4 October 2026')).toHaveAttribute('aria-pressed', 'false');
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

  describe('day and time helpers', () => {
    it('formats a day with a three-letter month', () => {
      expect(formatDay('2026-09-22')).toBe('22 Sep 2026');
      expect(formatDay('2026-10-05')).toBe('5 Oct 2026');
      expect(formatDay('2026-10-05T14:30')).toBe('5 Oct 2026');
      expect(formatDay('')).toBe('');
      expect(formatDay(undefined)).toBe('');
      expect(formatDay('not a day')).toBe('');
    });

    it('formats a day and a time', () => {
      expect(formatDateTime('2026-10-13T14:30')).toBe('13 Oct 2026, 14:30');
      expect(formatDateTime('2026-10-13')).toBe('13 Oct 2026');
      expect(formatDateTime('')).toBe('');
    });

    it('parses and writes a day and refuses an impossible one', () => {
      expect(parseDay('2026-10-22')).toEqual({ y: 2026, mo: 9, d: 22 });
      expect(toDay({ y: 2026, mo: 0, d: 5 })).toBe('2026-01-05');
      expect(parseDay('2026-02-30')).toBeNull();
      expect(parseDay('2026-13-01')).toBeNull();
    });

    it('reads the time and lays out the steps', () => {
      expect(parseTime('2026-10-13T09:05')).toBe('09:05');
      expect(parseTime('2026-10-13')).toBeNull();
      expect(parseTime('2026-10-13T25:00')).toBeNull();
      expect(timeSlots()).toHaveLength(48);
      expect(timeSlots(15)[1]).toBe('00:15');
    });
  });
});
