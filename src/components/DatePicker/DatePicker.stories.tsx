import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button';
import { DatePicker } from './DatePicker';
import type { DatePickerProps } from './DatePicker.types';
import { formatDay } from './date';

/**
 * THE CALENDAR, as a part of its own (Pranjal, 2026-09-22: "the date picker
 * drop push as a separate component as well"). The DateInput opens it below
 * the field in the library Popover; a page can also lay it into a Card or a
 * Dialog. The console's numbers are kept: a 296 grid of seven columns with a
 * 2-px gap, weekday initials at 11 / 600 in neutral-50, days 34 high with
 * corners 8 at 13 / 500, the month name at 14 / 600, prev / next as the
 * library's icon-only ghost buttons (28). The chosen day fills with the
 * primary colour; today wears a 1-px neutral-40 ring; a day outside min / max
 * greys to neutral-50 and cannot be clicked, and the month nav stops at the
 * bound. The value is a DAY, "YYYY-MM-DD" - no time. The console's 12-hour
 * time picker was dropped on purpose (expiry is day-only, Pranjal 2026-09-22);
 * a `withTime` option is left for later.
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
          'The calendar on its own. A 296 grid: seven columns, 2-px gap, weekday initials 11 / 600 in neutral-50, days 34 high with corners 8 at 13 / 500, the month name 14 / 600 between two 28 icon-only ghost buttons. The chosen day is the primary fill; today is a 1-px neutral-40 ring; days outside min / max grey to neutral-50 and are not clickable, and the month nav stops at a bound. Clear (ghost, sm) and Done (primary, sm) show only when a handler is given. The value is a day, "YYYY-MM-DD" - there is no time; a `withTime` option is a later addition, not built.',
      },
    },
  },
  decorators: [
    (Story) => (
      /* the surface the DateInput's Popover gives it: corners 16, padding 20, the popover ground and shadow */
      <div className="mdt-rounded-2xl mdt-border mdt-border-border mdt-bg-popover mdt-p-5 mdt-text-popover-foreground mdt-shadow-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

type DemoProps = Omit<DatePickerProps, 'value' | 'onChange'> & { initial?: string };

function Demo({ initial, ...props }: DemoProps) {
  const [day, setDay] = useState(initial ?? '');
  return <DatePicker {...props} value={day} onChange={setDay} />;
}

/** No value: the calendar opens on today's month with today ringed (1 px, neutral-40). Pick a day and it fills with the primary colour. */
export const Default: Story = {
  render: () => <Demo />,
};

/** Bounds: min 5 Oct 2026, max 20 Nov 2026. Days before and after grey to neutral-50 and do not click; the prev arrow stops at October and the next at November. */
export const WithBounds: Story = {
  render: () => <Demo initial="2026-10-12" min="2026-10-05" max="2026-11-20" />,
};

/** Clear (ghost, sm) at the left of the footer and Done (primary, sm) at the right, 12 above them. Each shows only when its handler is given. */
export const WithClear: Story = {
  render: function WithClearStory() {
    const [day, setDay] = useState('2026-10-22');
    const [note, setNote] = useState('');
    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <DatePicker
          value={day}
          onChange={setDay}
          onClear={() => {
            setDay('');
          }}
          onDone={() => {
            setNote(day ? `Done - ${formatDay(day)}` : 'Done - no day');
          }}
        />
        <p className="mdt-text-xs mdt-text-muted-foreground">{note || 'Pick, then Done.'}</p>
      </div>
    );
  },
};

/** The value owned outside: change it from the buttons and the calendar follows into that month and marks the day. */
export const Controlled: Story = {
  render: function ControlledStory() {
    const [day, setDay] = useState('2026-10-22');
    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <DatePicker value={day} onChange={setDay} />
        <div className="mdt-flex mdt-items-center mdt-gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setDay('2026-12-01');
            }}
          >
            Jump to 1 Dec 2026
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setDay('');
            }}
          >
            Unset
          </Button>
        </div>
        <p className="mdt-text-xs mdt-text-muted-foreground">
          Value: {day || 'none'}
          {day ? ` - shown as "${formatDay(day)}"` : ''}
        </p>
      </div>
    );
  },
};
