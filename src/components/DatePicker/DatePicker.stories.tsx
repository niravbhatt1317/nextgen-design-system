import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { userEvent, within } from 'storybook/test';
import { cn } from '@/utils';
import { popoverSurface } from '../Popover';
import { DatePicker } from './DatePicker';
import type { DatePickerProps } from './DatePicker.types';
import { formatDateTime } from './date';

/**
 * THE DATE AND TIME PICKER, as a part of its own (Pranjal, 2026-09-28: "we need to create a
 * popover where both the time and date can be selected in one popover"; the approved mock is
 * next-gen-ui/mocks/foundation/date-time-picker.html). The DateInput opens it below the field in
 * the library Popover; a page can also lay it into a Card or a Dialog.
 */
const meta: Meta<typeof DatePicker> = {
  title: 'New Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The calendar, 300 wide: the month title between two ghost chevrons (28, a hover fill only). The title is a button - "October 2026 ⌄" opens the months (3 × 4, 36 boxes, 8 / 12 apart, arrows step a year); "2026" opens twenty years (4 × 5, 36 boxes, arrows step twenty); "2020 – 2039" is not a button. Days 36 × 36, 8 between rows, every number in the secondary ink (neutral-90), the neighbouring months faint, today / this month / this year a thin neutral-40 outline, the pick the info badge\'s pale blue under its blue ink at 600 with no outline, the hover the overlay hover (neutral-10 in light, a step above the panel in dark). `withTime` - a developer setting, never a switch people see - adds the 184-wide time column: the picked day ("Tue, 13 Oct", 14 / 600) over "Local time · 24-hour" (12, faint), then a time every `timeStep` minutes (default 30), rows 32, 2 apart. Everything is a draft until Apply (primary, sm); Reset (ghost, sm) empties it; Apply stays off until a day (and a time) is picked. The size never changes between levels. The value is "YYYY-MM-DD", or "YYYY-MM-DDTHH:mm" with `withTime`. `onClear` / `onDone` from the older Clear / Done footer still work: `onClear` fires on Reset and makes the picker clearable; `onDone` fires after Apply.',
      },
    },
  },
  decorators: [
    (Story) => (
      /* the surface the DateInput's Popover gives it: the overlay ground, the hairline, corners 12, the lg shadow */
      <div className={cn(popoverSurface, 'mdt-rounded-xl')}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

type DemoProps = Omit<DatePickerProps, 'value' | 'onChange'> & { initial?: string };

function Demo({ initial, ...props }: DemoProps) {
  const [value, setValue] = useState(initial ?? '');
  return (
    <div>
      <DatePicker {...props} value={value} onChange={setValue} />
      <p className="mdt-m-0 mdt-border-0 mdt-border-t mdt-border-solid mdt-border-neutral-30 mdt-px-4 mdt-py-2 mdt-text-xs mdt-text-faint">
        Saved: {value ? `${value} - "${formatDateTime(value)}"` : 'nothing yet'}
      </p>
    </div>
  );
}

/** Date only: the panel hugs its days. Pick a day - it turns pale blue - then Apply; Reset empties the draft. */
export const DateOnly: Story = {
  name: 'Date',
  render: () => <Demo initial="2026-10-13" />,
};

/** `withTime`: the 184-wide time column at the right, one fixed height at every level. The list opens with 14:30 in view. */
export const DateAndTime: Story = {
  name: 'Date & time',
  render: () => <Demo withTime initial="2026-10-13T14:30" />,
};

/** No value yet: the calendar opens on today's month with today outlined; Apply stays off until a day is picked. */
export const Empty: Story = {
  render: () => <Demo />,
};

/** Bounds, min 5 Oct 2026 and max 20 Nov 2026: days, months and years outside grey out and do not click; the arrows stop at the bound. */
export const WithMinMax: Story = {
  name: 'With min / max',
  render: () => <Demo initial="2026-10-12" min="2026-10-05" max="2026-11-20" />,
};

/** The month level: the title "2026" (no chevron, still a button), three columns of four months, arrows step a year. The panel keeps the day level's height. */
export const MonthLevel: Story = {
  name: 'Month level',
  render: () => <Demo initial="2026-10-13" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'October 2026, choose a month' }));
  },
};

/** The year level: "2020 – 2039" (not a button), twenty years four across, arrows step twenty. */
export const YearLevel: Story = {
  name: 'Year level',
  render: () => <Demo initial="2026-10-13" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'October 2026, choose a month' }));
    await userEvent.click(canvas.getByRole('button', { name: '2026, choose a year' }));
  },
};

/** The month level with time: the same fixed height as the days, the time column beside it. */
export const DateAndTimeMonthLevel: Story = {
  name: 'Date & time · month level',
  render: () => <Demo withTime initial="2026-10-13T14:30" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'October 2026, choose a month' }));
  },
};
