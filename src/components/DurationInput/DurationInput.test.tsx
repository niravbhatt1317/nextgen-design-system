import { createRef } from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DurationInput, NO_LIMIT, formatDuration, parseDuration } from './DurationInput';

const days = () => screen.getByRole('spinbutton', { name: /^Days/ });
const hours = () => screen.getByRole('spinbutton', { name: /^Hours/ });
const minutes = () => screen.getByRole('spinbutton', { name: /^Minutes/ });

describe('DurationInput', () => {
  describe('what it shows', () => {
    it('is one group of three number segments, each with its unit word', () => {
      render(<DurationInput label="Max runtime" />);
      expect(screen.getByRole('group', { name: 'Max runtime' })).toBeInTheDocument();
      expect(days()).toHaveAttribute('type', 'number');
      expect(hours()).toHaveAttribute('type', 'number');
      expect(minutes()).toHaveAttribute('type', 'number');
      expect(screen.getByText('Days')).toBeInTheDocument();
      expect(screen.getByText('Hours')).toBeInTheDocument();
      expect(screen.getByText('Minutes')).toBeInTheDocument();
      /* the hairline between the segments, never before the first */
      expect(screen.getByText('Days').parentElement?.className).not.toContain('mdt-border-l');
      expect(screen.getByText('Hours').parentElement?.className).toContain('mdt-border-l');
    });

    it('lays the minutes out as days, hours and minutes, the empty ones as the 0 placeholder', () => {
      render(<DurationInput aria-label="Max runtime" value={1 * 1440 + 1 * 60 + 30} />);
      expect(days()).toHaveValue(1);
      expect(hours()).toHaveValue(1);
      expect(minutes()).toHaveValue(30);
    });

    it('is empty at 0, every segment on its placeholder', () => {
      render(<DurationInput aria-label="Max runtime" value={0} />);
      expect(days()).toHaveValue(null);
      expect(hours()).toHaveValue(null);
      expect(minutes()).toHaveValue(null);
      expect(days()).toHaveAttribute('placeholder', '0');
    });

    it('names the group by its label, and the label points at the Days segment', () => {
      render(<DurationInput id="runtime" label="Max runtime" />);
      expect(screen.getByRole('group', { name: 'Max runtime' })).toBeInTheDocument();
      expect(screen.getByText('Max runtime')).toHaveAttribute('for', 'runtime-days');
      expect(days()).toHaveAttribute('id', 'runtime-days');
    });

    it('shows helper text, and names it as the description', () => {
      render(<DurationInput aria-label="Max runtime" helperText="A hard cap on one run" />);
      expect(screen.getByText('A hard cap on one run')).toBeInTheDocument();
      expect(hours()).toHaveAccessibleDescription('A hard cap on one run');
    });

    it('shows the error instead, and marks every segment invalid', () => {
      render(
        <DurationInput aria-label="Max runtime" helperText="ignored" error="At least one minute." />
      );
      expect(screen.getByRole('alert')).toHaveTextContent('At least one minute.');
      expect(screen.queryByText('ignored')).not.toBeInTheDocument();
      expect(days()).toHaveAttribute('aria-invalid', 'true');
      expect(minutes()).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByRole('group').className).toContain('mdt-border-destructive');
    });

    it('is off as one: every segment disabled, the box on the sunken ground', () => {
      render(<DurationInput aria-label="Max runtime" value={240} disabled />);
      expect(days()).toBeDisabled();
      expect(hours()).toBeDisabled();
      expect(minutes()).toBeDisabled();
      expect(screen.getByRole('group').className).toContain('mdt-bg-neutral-10');
    });

    it('forwards the ref to the box and takes the classes', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <DurationInput ref={ref} aria-label="Max runtime" className="box" wrapperClassName="wrap" />
      );
      expect(ref.current).toBe(screen.getByRole('group'));
      expect(ref.current?.className).toContain('box');
      expect(ref.current?.parentElement?.className).toContain('wrap');
    });
  });

  describe('typing', () => {
    it('commits when a segment is left, as one number of minutes', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<DurationInput aria-label="Max runtime" value={240} onChange={onChange} />);
      await user.type(minutes(), '30');
      expect(onChange).not.toHaveBeenCalled(); // nothing while typing
      await user.tab();
      expect(onChange).toHaveBeenCalledWith(270);
    });

    it('commits on Enter', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<DurationInput aria-label="Max runtime" value={0} onChange={onChange} />);
      await user.type(days(), '2{Enter}');
      expect(onChange).toHaveBeenCalledWith(2880);
    });

    it('carries minutes past 59 into the hours, and says what moved', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<DurationInput aria-label="Max runtime" value={0} onChange={onChange} />);
      await user.type(minutes(), '80');
      await user.tab();
      expect(onChange).toHaveBeenCalledWith(80);
      expect(screen.getByRole('status')).toHaveTextContent('80 minutes → 1 hour 20 minutes');
    });

    it('carries hours past 23 into the days', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<DurationInput aria-label="Max runtime" value={0} onChange={onChange} />);
      await user.type(hours(), '36{Enter}');
      expect(onChange).toHaveBeenCalledWith(36 * 60);
      expect(screen.getByRole('status')).toHaveTextContent('36 hours → 1 day 12 hours');
    });

    it('lays an uncontrolled box out again after the carry', async () => {
      const user = userEvent.setup();
      render(<DurationInput aria-label="Max runtime" defaultValue={60} />);
      await user.type(minutes(), '80');
      await user.tab();
      expect(hours()).toHaveValue(2);
      expect(minutes()).toHaveValue(20);
    });

    it('holds the days at the most it takes', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<DurationInput aria-label="Max runtime" defaultValue={0} />);
      await user.type(days(), '5000');
      expect(days()).toHaveValue(999); // clamped at the cap, never cut to 500
      rerender(<DurationInput aria-label="Max runtime" defaultValue={0} maxDays={30} />);
      await user.clear(days());
      await user.type(days(), '45');
      expect(days()).toHaveValue(30); // a larger count is held at the top
    });

    it('clamps a count past the cap instead of cutting its digits', async () => {
      const user = userEvent.setup();
      render(<DurationInput aria-label="Max runtime" defaultValue={0} />);
      await user.type(days(), '1500');
      expect(days()).toHaveValue(999);
    });

    it('shows what a controlled parent keeps, when it refuses the commit', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn(); // the parent never takes the new value
      render(<DurationInput aria-label="Max runtime" value={240} onChange={onChange} />);
      await user.clear(hours());
      await user.type(hours(), '9');
      await user.tab();
      expect(onChange).toHaveBeenCalledWith(540);
      expect(hours()).toHaveValue(4); // the typing is dropped, the box draws the parent's 4 hours
    });

    it('keeps the typed number while it is typed, and drops a letter', async () => {
      const user = userEvent.setup();
      render(<DurationInput aria-label="Max runtime" defaultValue={0} />);
      await user.type(minutes(), '8a0');
      expect(minutes()).toHaveValue(80); // not yet carried
    });

    it('does not fire when the value did not change', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<DurationInput aria-label="Max runtime" value={240} onChange={onChange} />);
      await user.clear(hours());
      await user.type(hours(), '4');
      await user.tab();
      expect(onChange).not.toHaveBeenCalled();
      expect(hours()).toHaveValue(4);
    });

    it('drops the moved line on the next edit, or after a moment', async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<DurationInput aria-label="Max runtime" defaultValue={0} />);
      await user.type(minutes(), '80{Enter}');
      expect(screen.getByRole('status')).toBeInTheDocument();
      await user.type(minutes(), '1');
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      await user.clear(minutes());
      await user.type(minutes(), '70{Enter}');
      expect(screen.getByRole('status')).toHaveTextContent('70 minutes → 1 hour 10 minutes');
      act(() => {
        vi.advanceTimersByTime(4100);
      });
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      vi.useRealTimers();
    });

    it('reads and writes the words the profile carries', () => {
      expect(parseDuration('5 days 4 hours 45 minutes')).toBe(5 * 1440 + 4 * 60 + 45);
      expect(parseDuration('1 day 30 min')).toBe(1470);
      expect(parseDuration('No limit')).toBeNull(); // no limit is not zero minutes
      expect(parseDuration('')).toBeNull();
      expect(parseDuration('0 minutes')).toBe(0);
      expect(formatDuration(null)).toBe(NO_LIMIT);
      expect(NO_LIMIT).toBe('No limit');
      expect(formatDuration(5 * 1440 + 4 * 60 + 45)).toBe('5 days 4 hours 45 minutes');
      expect(formatDuration(1 * 1440 + 1 * 60 + 1)).toBe('1 day 1 hour 1 minute');
      expect(formatDuration(0)).toBe('');
    });
  });

  describe('the lists', () => {
    it('drops the hours under a press on Hours, and nothing under Days', async () => {
      const user = userEvent.setup();
      render(<DurationInput aria-label="Max runtime" value={240} />);
      expect(days()).not.toHaveAttribute('aria-haspopup');
      await user.click(days());
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      await user.click(hours());
      const list = screen.getByRole('listbox', { name: 'Hours' });
      expect(list.querySelectorAll('[role="option"]')).toHaveLength(24);
      expect(screen.getByRole('option', { name: '4' })).toHaveAttribute('aria-selected', 'true');
      expect(hours()).toHaveFocus(); // the caret stays in the segment
    });

    it('offers the minutes every 5, with a typed one off the step in its place', async () => {
      const user = userEvent.setup();
      render(<DurationInput aria-label="Max runtime" value={32} />);
      await user.click(minutes());
      const names = screen.getAllByRole('option').map((o) => o.textContent);
      expect(names).toEqual([
        '0',
        '5',
        '10',
        '15',
        '20',
        '25',
        '30',
        '32',
        '35',
        '40',
        '45',
        '50',
        '55',
      ]);
    });

    it('picks a row at once, closes the list and sends the segment back to the caret', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<DurationInput aria-label="Max runtime" value={240} onChange={onChange} />);
      await user.click(minutes());
      await user.click(screen.getByRole('option', { name: '45' }));
      expect(onChange).toHaveBeenCalledWith(285);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(minutes()).toHaveFocus();
    });

    it('opens from the keyboard into the rows, which the arrows walk', async () => {
      const user = userEvent.setup();
      render(<DurationInput aria-label="Max runtime" value={0} />);
      hours().focus();
      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('option', { name: '0' })).toHaveFocus();
      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('option', { name: '1' })).toHaveFocus();
      await user.keyboard('{ArrowUp}');
      expect(screen.getByRole('option', { name: '0' })).toHaveFocus();
      await user.keyboard('{Escape}');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('closes on Enter in the segment, and does not open while off or without lists', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<DurationInput aria-label="Max runtime" value={0} />);
      await user.click(hours());
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      await user.keyboard('{Enter}');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      rerender(<DurationInput aria-label="Max runtime" value={0} lists={false} />);
      await user.click(hours());
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      rerender(<DurationInput aria-label="Max runtime" value={0} disabled />);
      expect(hours()).toBeDisabled();
    });
  });
});
