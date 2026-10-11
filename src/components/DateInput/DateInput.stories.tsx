import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { userEvent, within } from 'storybook/test';
import { toDay } from '../DatePicker';
import { Input } from '../Input';
import { DateInput } from './DateInput';
import type { DateInputProps } from './DateInput.types';

/**
 * THE DATE FIELD (Pranjal, 2026-09-22: "move date picker field in input
 * field"). It sits with Input, Textarea, Select and NumberInput on the
 * Foundation/Field page and carries the same ruled states: 32 high, corners 8,
 * 13 text in neutral-90, the placeholder in neutral-70, a 1-px neutral-30
 * edge, 12 at the sides; the primary border under the pointer; the primary
 * border with a 3-px halo at 8% when focused or open; disabled on the
 * neutral-10 ground in the placeholder colour; held with the 14 lock at the
 * right, 12 from the edge; error in the danger border, the halo turning red,
 * the message under at 12. The calendar glyph is 16 at the RIGHT, 12 from the
 * edge, and the calendar opens below (K-Field-28). The value is a DAY,
 * "YYYY-MM-DD", shown as "22 Oct 2026" - three-letter months, never the
 * browser's "Sept". With `withTime` (2026-09-28, a developer setting, never a
 * switch people see) the popover gains the time column and the value is
 * "YYYY-MM-DDTHH:mm", shown as "13 Oct 2026, 14:30". Choices in the popover
 * are a draft until Apply.
 */
const meta: Meta<typeof DateInput> = {
  title: 'New Components/DateInput',
  component: DateInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The date field: the Input\'s box (32 high, corners 8, 13 text in neutral-90, placeholder neutral-70, neutral-30 edge, 12 at the sides) as a button, with the 16 calendar glyph at the right, 12 from the edge. Hover turns the border primary; focus and open add the 3-px 8% halo; disabled sits on neutral-10 in the placeholder colour; held swaps the glyph for the 14 lock and truncates the value before it; error is the danger border with the red halo and a 12 message under. Click, Enter or Space opens the DatePicker below the field in the library Popover (above it when there is no room), the focus on the picked day. Choices there are a draft: Apply saves and closes; Escape or a press outside closes without saving; the focus returns to the field. The value is a day, "YYYY-MM-DD", shown as "22 Oct 2026"; with `withTime` (a developer setting) it is "YYYY-MM-DDTHH:mm", shown as "13 Oct 2026, 14:30", and the popover gains the time column. `clearable` lets Reset + Apply empty the field ("").',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

type DemoProps = Omit<DateInputProps, 'value' | 'onChange'> & { initial?: string };

function Demo({ initial, ...props }: DemoProps) {
  const [day, setDay] = useState(initial ?? '');
  return <DateInput {...props} value={day} onChange={setDay} />;
}

const iso = (d: Date) => toDay({ y: d.getFullYear(), mo: d.getMonth(), d: d.getDate() });
const plusDays = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return iso(d);
};

/** Empty: "Pick a date" in the placeholder colour, the calendar glyph 16 at the right. Click it - the picker opens below, 4 under the field. */
export const Default: Story = {
  name: 'Date',
  render: () => (
    <div className="mdt-w-[220px]">
      <Demo label="Expires on" />
    </div>
  ),
};

/** Holding a day: "22 Oct 2026" in neutral-90 - the day, the three-letter month, the year. Open it and the calendar starts on that month with the day filled. */
export const Filled: Story = {
  render: () => (
    <div className="mdt-w-[220px]">
      <Demo label="Expires on" initial="2026-10-22" />
    </div>
  ),
};

function Caption({ children }: { children: string }) {
  return (
    <div className="mdt-mb-2 mdt-text-[11px] mdt-font-semibold mdt-uppercase mdt-tracking-wide mdt-text-neutral-90">
      {children}
    </div>
  );
}

/**
 * The ruled states side by side. Rest: neutral-30 edge. Hover: move the pointer over the first field - the border turns primary. Focus: click into or tab to it - the primary border with the 3-px 8% halo, kept while the calendar is open. Disabled: the neutral-10 ground, the text in the placeholder colour, no lock, and it does not open. Held: disabled with the 14 lock at the right in place of the glyph, the value truncating 8 before it; it does not open. Error: the danger border, the halo red on focus, the message under at 12.
 */
export const States: Story = {
  render: () => (
    <div className="mdt-grid mdt-grid-cols-3 mdt-gap-6">
      <div className="mdt-w-[220px]">
        <Caption>Rest · hover</Caption>
        <Demo label="Expires on" />
      </div>
      <div className="mdt-w-[220px]">
        <Caption>Focus · open</Caption>
        <Demo label="Expires on" initial="2026-10-22" />
      </div>
      <div className="mdt-w-[220px]">
        <Caption>Disabled</Caption>
        <DateInput label="Expires on" value="2026-10-22" disabled />
      </div>
      <div className="mdt-w-[220px]">
        <Caption>Held</Caption>
        <DateInput label="Expires on" value="2026-10-22" locked />
      </div>
      <div className="mdt-w-[220px]">
        <Caption>Error</Caption>
        <DateInput label="Expires on" error="Pick a day after today" />
      </div>
      <div className="mdt-w-[220px]">
        <Caption>Error · filled</Caption>
        <DateInput label="Expires on" value="2026-01-05" error="That day has passed" />
      </div>
    </div>
  ),
};

/** `withTime`: "13 Oct 2026, 14:30". Open it - the calendar and the time column side by side, the list opened on 14:30; pick, then Apply. */
export const DateAndTime: Story = {
  name: 'Date & time',
  render: () => (
    <div className="mdt-w-[240px]">
      <Demo label="Starts at" withTime initial="2026-10-13T14:30" />
    </div>
  ),
};

/** The popover open, date only - the panel hugs its days. */
export const DateOpen: Story = {
  name: 'Date · open',
  render: () => (
    <div className="mdt-h-[440px] mdt-w-[240px]">
      <Demo label="Expires on" initial="2026-10-13" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Expires on' }));
  },
};

/** The popover open with time - one fixed height, the time column beside the calendar. */
export const DateAndTimeOpen: Story = {
  name: 'Date & time · open',
  render: () => (
    <div className="mdt-h-[480px] mdt-w-[240px]">
      <Demo label="Starts at" withTime initial="2026-10-13T14:30" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Starts at' }));
  },
};

/** Near the bottom of the page the popover opens ABOVE the field (the library Popover flips when there is no room below). */
export const FlipsAbove: Story = {
  name: 'Flips above',
  render: () => (
    <div className="mdt-flex mdt-h-[560px] mdt-w-[240px] mdt-flex-col mdt-justify-end">
      <Demo label="Expires on" initial="2026-10-13" />
    </div>
  ),
};

/** Bounds from today to 90 days out: the calendar greys every earlier and later day, month and year, and its arrows stop at the bound. Useful for an expiry that cannot sit in the past. */
export const WithBounds: Story = {
  name: 'With min / max',
  render: () => (
    <div className="mdt-w-[220px]">
      <Demo
        label="Expires on"
        min={iso(new Date())}
        max={plusDays(90)}
        helperText="Today to 90 days out"
      />
    </div>
  ),
};

/** In a form beside a text field: the same label (13 in neutral-90, 6 under it), the same 32 box, the same edge. `clearable` lets Reset then Apply empty the field, reporting "". */
export const InAForm: Story = {
  render: function InAFormStory() {
    const [name, setName] = useState('Night shift access');
    const [day, setDay] = useState('2026-10-22');
    return (
      <div className="mdt-flex mdt-w-[320px] mdt-flex-col mdt-gap-4">
        <Input
          label="Grant name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <DateInput
          label="Expires on"
          value={day}
          onChange={setDay}
          clearable
          helperText="Leave empty and the grant never expires"
        />
      </div>
    );
  },
};
