import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DateInput } from './DateInput';

const field = () => screen.getByRole('button', { name: 'Expires on' });
const calendar = () => screen.queryByRole('group', { name: 'Expires on' });

describe('DateInput', () => {
  describe('what it shows', () => {
    it('renders the placeholder when empty', () => {
      render(<DateInput aria-label="Expires on" />);
      expect(field()).toHaveTextContent('Pick a date');
    });

    it('takes its own placeholder', () => {
      render(<DateInput aria-label="Expires on" placeholder="Select a date" />);
      expect(field()).toHaveTextContent('Select a date');
    });

    it('renders the value as day, three-letter month, year', () => {
      render(<DateInput aria-label="Expires on" value="2026-10-22" />);
      expect(field()).toHaveTextContent('22 Oct 2026');
    });

    it('writes every month with three letters - never the browser\'s "Sept"', () => {
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      months.forEach((mon, i) => {
        const { unmount } = render(
          <DateInput aria-label="Expires on" value={`2026-${String(i + 1).padStart(2, '0')}-15`} />
        );
        expect(field()).toHaveTextContent(`15 ${mon} 2026`);
        expect(field()).not.toHaveTextContent('Sept');
        unmount();
      });
    });

    it('is a button that says it opens a dialog', () => {
      render(<DateInput aria-label="Expires on" />);
      expect(field()).toHaveAttribute('aria-haspopup', 'dialog');
      expect(field()).toHaveAttribute('type', 'button');
    });

    it('reaches the field through its label', () => {
      render(<DateInput label="Expires on" value="2026-10-22" />);
      expect(screen.getByLabelText('Expires on')).toHaveTextContent('22 Oct 2026');
    });

    it('wears the field box: 32 high, corners 8, the 14 text', () => {
      render(<DateInput aria-label="Expires on" />);
      expect(field()).toHaveClass('mdt-h-8', 'mdt-rounded-lg', 'mdt-text-sm');
    });

    it('takes the other two heights', () => {
      const { rerender } = render(<DateInput aria-label="Expires on" size="md" />);
      expect(field()).toHaveClass('mdt-h-9');
      rerender(<DateInput aria-label="Expires on" size="lg" />);
      expect(field()).toHaveClass('mdt-h-10');
    });
  });

  describe('opening and closing', () => {
    it("opens the calendar on click, on the value's month", async () => {
      const user = userEvent.setup();
      render(<DateInput aria-label="Expires on" value="2026-10-22" />);
      expect(calendar()).not.toBeInTheDocument();
      await user.click(field());
      expect(calendar()).toBeInTheDocument();
      expect(screen.getByText('October 2026')).toBeInTheDocument();
    });

    it('opens on Enter and on Space, closes on Escape', async () => {
      const user = userEvent.setup();
      render(<DateInput aria-label="Expires on" />);
      field().focus();
      await user.keyboard('{Enter}');
      expect(calendar()).toBeInTheDocument();
      await user.keyboard('{Escape}');
      expect(calendar()).not.toBeInTheDocument();
      await user.keyboard(' ');
      expect(calendar()).toBeInTheDocument();
    });

    it('picks a day as a draft; Apply reports it, closes and hands the focus back', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<DateInput aria-label="Expires on" value="2026-10-22" onChange={onChange} />);
      await user.click(field());
      await user.click(screen.getByRole('button', { name: '5 October 2026' }));
      expect(onChange).not.toHaveBeenCalled();
      expect(calendar()).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Apply' }));
      expect(onChange).toHaveBeenCalledWith('2026-10-05');
      expect(calendar()).not.toBeInTheDocument();
      expect(field()).toHaveFocus();
    });

    it('puts the focus on the picked day when it opens', async () => {
      const user = userEvent.setup();
      render(<DateInput aria-label="Expires on" value="2026-10-22" />);
      await user.click(field());
      expect(screen.getByRole('button', { name: '22 October 2026' })).toHaveFocus();
    });

    it('closes on Escape without saving the draft', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<DateInput aria-label="Expires on" value="2026-10-22" onChange={onChange} />);
      await user.click(field());
      await user.click(screen.getByRole('button', { name: '5 October 2026' }));
      await user.keyboard('{Escape}');
      expect(onChange).not.toHaveBeenCalled();
      expect(calendar()).not.toBeInTheDocument();
      expect(field()).toHaveTextContent('22 Oct 2026');
    });

    it('Reset empties the draft; only a clearable field can then apply "" and close', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const { unmount } = render(
        <DateInput aria-label="Expires on" value="2026-10-22" onChange={onChange} />
      );
      await user.click(field());
      await user.click(screen.getByRole('button', { name: 'Reset' }));
      expect(screen.getByRole('button', { name: 'Apply' })).toBeDisabled();
      unmount();

      render(
        <DateInput aria-label="Expires on" value="2026-10-22" onChange={onChange} clearable />
      );
      await user.click(field());
      await user.click(screen.getByRole('button', { name: 'Reset' }));
      await user.click(screen.getByRole('button', { name: 'Apply' }));
      expect(onChange).toHaveBeenCalledWith('');
      expect(calendar()).not.toBeInTheDocument();
    });

    it('hands min and max to the calendar', async () => {
      const user = userEvent.setup();
      render(
        <DateInput aria-label="Expires on" value="2026-10-10" min="2026-10-05" max="2026-10-20" />
      );
      await user.click(field());
      expect(screen.getByRole('button', { name: '4 October 2026' })).toBeDisabled();
      expect(screen.getByRole('button', { name: '21 October 2026' })).toBeDisabled();
      expect(screen.getByRole('button', { name: '10 October 2026' })).toBeEnabled();
    });
  });

  describe('disabled and held', () => {
    it('does not open when disabled', async () => {
      const user = userEvent.setup();
      render(<DateInput aria-label="Expires on" value="2026-10-22" disabled />);
      expect(field()).toBeDisabled();
      await user.click(field());
      expect(calendar()).not.toBeInTheDocument();
    });

    it('does not open when held, and stops the text 34 short for the lock', async () => {
      const user = userEvent.setup();
      render(<DateInput aria-label="Expires on" value="2026-10-22" locked />);
      expect(field()).toBeDisabled();
      expect(field()).toHaveClass('mdt-pr-[34px]');
      await user.click(field());
      expect(calendar()).not.toBeInTheDocument();
    });

    it('keeps 36 at the right for the calendar glyph when not held', () => {
      render(<DateInput aria-label="Expires on" />);
      expect(field()).toHaveClass('mdt-pr-9');
    });
  });

  describe('error and helper', () => {
    it('shows the error as an alert and marks the field invalid', () => {
      render(<DateInput aria-label="Expires on" error="Pick a day after today" />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent('Pick a day after today');
      expect(field()).toHaveAttribute('data-invalid', 'true');
      expect(field()).toHaveAttribute('aria-describedby', alert.id);
      expect(field()).toHaveClass('mdt-border-destructive');
    });

    it('shows helper text when there is no error, and describes the field with it', () => {
      render(<DateInput aria-label="Expires on" helperText="Leave empty for no expiry" />);
      const helper = screen.getByText('Leave empty for no expiry');
      expect(field()).toHaveAttribute('aria-describedby', helper.id);
    });
  });

  describe('withTime', () => {
    it('shows the day and the time, and says so when empty', () => {
      const { rerender } = render(<DateInput aria-label="Expires on" withTime />);
      expect(field()).toHaveTextContent('Pick a date and time');
      rerender(<DateInput aria-label="Expires on" withTime value="2026-10-13T14:30" />);
      expect(field()).toHaveTextContent('13 Oct 2026, 14:30');
    });

    it('reports YYYY-MM-DDTHH:mm on Apply', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <DateInput aria-label="Expires on" withTime value="2026-10-13T14:30" onChange={onChange} />
      );
      await user.click(field());
      expect(screen.getByRole('listbox', { name: 'Times' })).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: '20 October 2026' }));
      await user.click(screen.getByRole('option', { name: '09:30' }));
      await user.click(screen.getByRole('button', { name: 'Apply' }));
      expect(onChange).toHaveBeenCalledWith('2026-10-20T09:30');
    });

    it('keeps the date-only value a plain day', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<DateInput aria-label="Expires on" value="2026-10-13" onChange={onChange} />);
      await user.click(field());
      expect(screen.queryByRole('listbox', { name: 'Times' })).not.toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: '14 October 2026' }));
      await user.click(screen.getByRole('button', { name: 'Apply' }));
      expect(onChange).toHaveBeenCalledWith('2026-10-14');
    });
  });
});
