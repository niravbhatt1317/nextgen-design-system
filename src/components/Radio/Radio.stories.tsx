import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from './Radio';
import { FormLabel } from '../Form';

const meta: Meta<typeof RadioGroup> = {
  title: 'New Components/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'Radio buttons for choosing one option from a list.',
          '',
          '| Variant | What it looks like |',
          '| --- | --- |',
          '| `default` | A circle beside each choice |',
          '| `card` / `card-with-radio` | Each choice is a bordered panel |',
          '| `segmented` | One joined strip, no circles - the chosen one takes a tint and a primary edge |',
          '',
          '**All of them are the same control underneath**: a value you submit, announced as',
          'a radio group. Use `Tabs` when the point is to change what is on screen, and',
          '`ToggleGroup` for a view preference that is not part of the form.',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default radio buttons with labels.
 */
export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" aria-label="Select an option">
      <div className="mdt-flex mdt-items-center mdt-space-x-2">
        <RadioGroupItem value="option1" id="r1" />
        <FormLabel htmlFor="r1">Option 1</FormLabel>
      </div>
      <div className="mdt-flex mdt-items-center mdt-space-x-2">
        <RadioGroupItem value="option2" id="r2" />
        <FormLabel htmlFor="r2">Option 2</FormLabel>
      </div>
      <div className="mdt-flex mdt-items-center mdt-space-x-2">
        <RadioGroupItem value="option3" id="r3" />
        <FormLabel htmlFor="r3">Option 3</FormLabel>
      </div>
    </RadioGroup>
  ),
};

/**
 * ## Segmented
 *
 * One joined strip: the segments are butted edge to edge and share their
 * dividing lines, one border goes round the whole thing, and only the two ends
 * are rounded. No tray behind it, no gaps, no padding.
 *
 * **The chosen segment carries the tint and a primary edge.** The edge is one
 * pixel, all the way round, painted over the strip's own line and over the
 * dividers either side of it - so the chosen one reads as chosen, not merely
 * hovered.
 *
 * **It is still a radio group.** Tab reaches it, the arrow keys move between
 * segments, and a screen reader announces "Priority, radio group, Medium, 2 of
 * 3". Reach for `Tabs` when the point is to change what is on screen, and
 * `ToggleGroup` for a view preference that is not part of the form.
 */
export const Segmented: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-[380px] mdt-flex-col mdt-gap-1.5">
      <FormLabel>Priority</FormLabel>
      <RadioGroup variant="segmented" defaultValue="medium" aria-label="Priority">
        <RadioGroupItem value="low">Low</RadioGroupItem>
        <RadioGroupItem value="medium">Medium</RadioGroupItem>
        <RadioGroupItem value="high">High</RadioGroupItem>
      </RadioGroup>
    </div>
  ),
};

/**
 * The chosen one is a pale tint, a heavier word and a one-pixel primary edge -
 * quiet enough that three of these on one screen do not start shouting at each
 * other.
 */
export const SegmentedInAForm: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-[380px] mdt-flex-col mdt-gap-5">
      <div className="mdt-flex mdt-flex-col mdt-gap-1.5">
        <FormLabel>Priority</FormLabel>
        <RadioGroup variant="segmented" fullWidth defaultValue="medium" aria-label="Priority">
          <RadioGroupItem value="low">Low</RadioGroupItem>
          <RadioGroupItem value="medium">Medium</RadioGroupItem>
          <RadioGroupItem value="high">High</RadioGroupItem>
        </RadioGroup>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-1.5">
        <FormLabel>Impact</FormLabel>
        <RadioGroup variant="segmented" fullWidth defaultValue="site" aria-label="Impact">
          <RadioGroupItem value="user">One user</RadioGroupItem>
          <RadioGroupItem value="team">A team</RadioGroupItem>
          <RadioGroupItem value="site">A whole site</RadioGroupItem>
        </RadioGroup>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-1.5">
        <FormLabel>Billing period</FormLabel>
        <RadioGroup variant="segmented" fullWidth defaultValue="yearly" aria-label="Billing period">
          <RadioGroupItem value="monthly">Monthly</RadioGroupItem>
          <RadioGroupItem value="yearly">Yearly</RadioGroupItem>
        </RadioGroup>
        <p className="mdt-text-xs mdt-text-muted-foreground">Yearly saves two months.</p>
      </div>
    </div>
  ),
};

/**
 * `fullWidth` shares the width equally so the strip lines up with the fields
 * around it. Without it the strip is only as wide as its own words, which suits
 * a filter above a table more than a field in a form.
 */
export const SegmentedWidth: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-[380px] mdt-flex-col mdt-gap-6">
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <p className="mdt-text-xs mdt-font-semibold mdt-uppercase mdt-tracking-wider mdt-text-muted-foreground">
          Hugs its labels
        </p>
        <RadioGroup variant="segmented" defaultValue="week" aria-label="Range">
          <RadioGroupItem value="day">Day</RadioGroupItem>
          <RadioGroupItem value="week">Week</RadioGroupItem>
          <RadioGroupItem value="month">Month</RadioGroupItem>
          <RadioGroupItem value="quarter">Quarter</RadioGroupItem>
        </RadioGroup>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <p className="mdt-text-xs mdt-font-semibold mdt-uppercase mdt-tracking-wider mdt-text-muted-foreground">
          Fills the column
        </p>
        <RadioGroup variant="segmented" fullWidth defaultValue="week" aria-label="Range">
          <RadioGroupItem value="day">Day</RadioGroupItem>
          <RadioGroupItem value="week">Week</RadioGroupItem>
          <RadioGroupItem value="month">Month</RadioGroupItem>
          <RadioGroupItem value="quarter">Quarter</RadioGroupItem>
        </RadioGroup>
      </div>
    </div>
  ),
};

/** Medium matches a button and a text input, so a row of mixed controls sits on one line. */
export const SegmentedSizes: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <p className="mdt-text-xs mdt-font-semibold mdt-uppercase mdt-tracking-wider mdt-text-muted-foreground">
          Medium · 36px
        </p>
        <RadioGroup variant="segmented" defaultValue="all" aria-label="Status">
          <RadioGroupItem value="all">All</RadioGroupItem>
          <RadioGroupItem value="open">Open</RadioGroupItem>
          <RadioGroupItem value="closed">Closed</RadioGroupItem>
        </RadioGroup>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <p className="mdt-text-xs mdt-font-semibold mdt-uppercase mdt-tracking-wider mdt-text-muted-foreground">
          Small · 32px, for a toolbar above a table
        </p>
        <RadioGroup variant="segmented" size="sm" defaultValue="all" aria-label="Status">
          <RadioGroupItem value="all">All</RadioGroupItem>
          <RadioGroupItem value="open">Open</RadioGroupItem>
          <RadioGroupItem value="closed">Closed</RadioGroupItem>
        </RadioGroup>
      </div>
    </div>
  ),
};
