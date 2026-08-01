import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from './Radio';
import { FormLabel } from '../Form';
import { Icon } from '../Icon';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio',
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
          '| `segmented` | One joined strip, no circles - the chosen one takes a tint |',
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
 * Card variant for more prominent selection options.
 */
export const CardVariant: Story = {
  render: () => (
    <div className="mdt-w-[400px]">
      <RadioGroup defaultValue="card1">
        <RadioGroupItem value="card1" id="card1" variant="card">
          <div className="mdt-flex mdt-items-start mdt-justify-between">
            <div>
              <div className="mdt-font-medium">Free Plan</div>
              <div className="mdt-text-sm mdt-text-muted-foreground">
                Perfect for trying out our service
              </div>
            </div>
            <div className="mdt-text-2xl mdt-font-bold">$0</div>
          </div>
        </RadioGroupItem>

        <RadioGroupItem value="card2" id="card2" variant="card">
          <div className="mdt-flex mdt-items-start mdt-justify-between">
            <div>
              <div className="mdt-font-medium">Pro Plan</div>
              <div className="mdt-text-sm mdt-text-muted-foreground">
                For professionals and small teams
              </div>
            </div>
            <div className="mdt-text-2xl mdt-font-bold">$29</div>
          </div>
        </RadioGroupItem>

        <RadioGroupItem value="card3" id="card3" variant="card">
          <div className="mdt-flex mdt-items-start mdt-justify-between">
            <div>
              <div className="mdt-font-medium">Enterprise Plan</div>
              <div className="mdt-text-sm mdt-text-muted-foreground">For large organizations</div>
            </div>
            <div className="mdt-text-2xl mdt-font-bold">$99</div>
          </div>
        </RadioGroupItem>
      </RadioGroup>
    </div>
  ),
};

/**
 * Card with radio button inside - matches the Figma design.
 */
export const CardWithRadio: Story = {
  render: () => (
    <div className="mdt-w-[450px]">
      <RadioGroup defaultValue="custom-mix" aria-label="Select service option">
        <RadioGroupItem value="it-ops" variant="card-with-radio">
          <div className="mdt-flex mdt-flex-1 mdt-items-start mdt-justify-between">
            <div className="mdt-flex-1">
              <div className="mdt-font-medium mdt-text-foreground">IT Operations</div>
              <div className="mdt-text-sm mdt-text-muted-foreground">
                Monitor incidents, track problems, manage your CMDB.
              </div>
            </div>
            <div className="mdt-ml-4 mdt-shrink-0 mdt-text-muted-foreground">
              <span className="mdt-text-xs">1+</span>
            </div>
          </div>
        </RadioGroupItem>

        <RadioGroupItem value="change-release" variant="card-with-radio">
          <div className="mdt-flex mdt-flex-1 mdt-items-start">
            <div className="mdt-flex-1">
              <div className="mdt-font-medium mdt-text-foreground">Change & Release Management</div>
              <div className="mdt-text-sm mdt-text-muted-foreground">
                Plan, approve, and deploy changes.
              </div>
            </div>
          </div>
        </RadioGroupItem>

        <RadioGroupItem value="service-desk" variant="card-with-radio">
          <div className="mdt-flex mdt-flex-1 mdt-items-start mdt-justify-between">
            <div className="mdt-flex-1">
              <div className="mdt-font-medium mdt-text-foreground">Service Desk / Catalog</div>
              <div className="mdt-text-sm mdt-text-muted-foreground">
                Handle incoming requests, share knowledge, automate support.
              </div>
            </div>
            <div className="mdt-ml-4 mdt-shrink-0 mdt-text-muted-foreground">
              <span className="mdt-text-xs">4+</span>
            </div>
          </div>
        </RadioGroupItem>

        <RadioGroupItem value="major-incident" variant="card-with-radio">
          <div className="mdt-flex mdt-flex-1 mdt-items-start">
            <div className="mdt-flex-1">
              <div className="mdt-font-medium mdt-text-foreground">Major Incident Room</div>
              <div className="mdt-text-sm mdt-text-muted-foreground">
                Manage critical issues and root-cause fixes together.
              </div>
            </div>
          </div>
        </RadioGroupItem>

        <RadioGroupItem value="custom-mix" variant="card-with-radio">
          <div className="mdt-flex mdt-flex-1 mdt-items-start">
            <div className="mdt-flex-1">
              <div className="mdt-font-medium mdt-text-foreground">Custom Mix</div>
              <div className="mdt-text-sm mdt-text-muted-foreground">
                Pick the apps you want manually.
              </div>
            </div>
          </div>
        </RadioGroupItem>
      </RadioGroup>
    </div>
  ),
};

/**
 * Disabled state.
 */
export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" aria-label="Select an option">
      <div className="mdt-flex mdt-items-center mdt-space-x-2">
        <RadioGroupItem value="option1" id="d1" />
        <FormLabel htmlFor="d1">Enabled Option</FormLabel>
      </div>
      <div className="mdt-flex mdt-items-center mdt-space-x-2">
        <RadioGroupItem value="option2" id="d2" disabled />
        <FormLabel htmlFor="d2">Disabled Option</FormLabel>
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
 * The chosen one is a pale tint and a heavier word - quiet enough that three of
 * these on one screen do not start shouting at each other.
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

/**
 * The icon sits before the word, never instead of it - unless every segment is
 * icon-only, and then each one needs a spoken name of its own.
 */
export const SegmentedWithIcons: Story = {
  render: () => (
    <RadioGroup variant="segmented" defaultValue="list" aria-label="Layout">
      <RadioGroupItem value="list">
        <Icon name="list" size="sm" />
        List
      </RadioGroupItem>
      <RadioGroupItem value="grid">
        <Icon name="layout-grid" size="sm" />
        Grid
      </RadioGroupItem>
    </RadioGroup>
  ),
};

/**
 * A segment that cannot be chosen fades and stops responding, but **stays in the
 * strip**. Taking it out changes the width and moves everything beside it, and
 * you lose the fact that the option exists at all.
 */
export const SegmentedDisabled: Story = {
  render: () => (
    <RadioGroup variant="segmented" defaultValue="draft" aria-label="Stage">
      <RadioGroupItem value="draft">Draft</RadioGroupItem>
      <RadioGroupItem value="review">In review</RadioGroupItem>
      <RadioGroupItem value="published" disabled>
        Published
      </RadioGroupItem>
    </RadioGroup>
  ),
};
