import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Stepper } from './Stepper';
import { Button } from '../Button';
import type { StepperStep } from './Stepper.types';

const IMPORT: StepperStep[] = [
  { label: 'Choose a source' },
  { label: 'Connect' },
  { label: 'Map fields' },
  { label: 'Review' },
  { label: 'Publish' },
];

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A named, ordered journey with a place you are now.',
          '',
          'Three of the four product teams built one and nothing existed in the library.',
          '',
          '**One rule carries the whole component: a filled disc is settled, an outlined disc',
          'is live.** That is why the number stays visible on the step you are standing on and',
          'only turns into a tick once it is behind you — and why a broken step is outlined',
          'rather than filled. You are still standing on it.',
          '',
          '**It is not Tabs.** Tabs are four doors into the same room: no order, nothing to',
          'finish, and everything behind them already exists. Here the steps ahead of you have',
          'not happened yet.',
          '',
          '| | Tabs | Stepper |',
          '| --- | --- | --- |',
          '| Order | None — any, any time | Fixed, and enforced |',
          '| Ahead of you | Already there | Does not exist yet |',
          '| Going back | Free | Sometimes allowed, sometimes not |',
          '| Announced as | Tabs | A list, one item marked as the current step |',
          '',
          '**The one-line test:** if you can do them in any order, it is Tabs. It is not',
          '`Progress` either — that is one number with no names, and nobody is doing anything.',
          '',
          'Horizontal only. Vertical is a different component with different rules, not a third',
          'value on the layout switch.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    layout: { control: 'inline-radio', options: ['stacked', 'inline'] },
    current: { control: { type: 'number', min: 0, max: 4 } },
    responsive: { control: 'boolean' },
    steps: { control: false },
    onStepSelect: { control: false },
  },
  args: {
    steps: IMPORT,
    current: 2,
    'aria-label': 'Import assets',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="mdt-mb-3 mdt-text-xs mdt-font-medium mdt-text-muted-foreground">{children}</p>
);

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div className="mdt-flex mdt-flex-col mdt-gap-9">{children}</div>
);

export const Default: Story = {};

/**
 * `stacked` puts the disc above its label, joined by a line that fills only once
 * you are past it. `inline` sets the disc beside its label on one row with a
 * chevron between — **half the height**, and it wraps rather than breaking words.
 */
export const Layouts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <div>
        <Label>stacked — the one everybody recognises</Label>
        <Stepper steps={IMPORT} current={2} aria-label="Import assets" />
      </div>
      <div>
        <Label>inline — half the height</Label>
        <Stepper steps={IMPORT} current={2} layout="inline" aria-label="Import assets" />
      </div>
    </Stack>
  ),
};

const SIX: StepperStep[] = [
  { label: 'Completed', state: 'complete' },
  { label: 'Current', state: 'current' },
  { label: 'Upcoming', state: 'upcoming' },
  { label: 'Error', state: 'error' },
  { label: 'Skipped', state: 'skipped' },
  { label: 'Disabled', state: 'disabled' },
];

/**
 * Six, and every one is readable **without colour** — a tick, a number, a cross,
 * a dash. The shape says it as well as the colour does.
 *
 * Four are worked out from `current` and never need setting. The two you set
 * yourself are the ones no counter can know about: `error` and `skipped`.
 */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <div>
        <Label>stacked</Label>
        <Stepper steps={SIX} current={1} aria-label="Every state" />
      </div>
      <div>
        <Label>inline</Label>
        <Stepper steps={SIX} current={1} layout="inline" aria-label="Every state" />
      </div>
    </Stack>
  ),
};

/**
 * A red disc says **where** the problem is, never what it is. Every reference
 * agrees on this — so it is always paired with a Banner or an inline message.
 *
 * Note the disc is outlined, not filled: a broken step is one you are still
 * standing on, and filled means settled.
 */
export const WithAnError: Story = {
  name: 'With an error',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <Stepper
        aria-label="Import assets"
        current={1}
        steps={[
          { label: 'Choose a source' },
          { label: 'Connect', state: 'error' },
          { label: 'Map fields' },
          { label: 'Review' },
        ]}
      />
      <p className="mdt-rounded-lg mdt-border mdt-border-destructive/40 mdt-bg-destructive/5 mdt-px-3.5 mdt-py-3 mdt-text-sm mdt-text-foreground">
        <span className="mdt-font-semibold">Could not reach the connector.</span> The host answered
        but rejected the credentials — check the service account has read access.
      </p>
    </div>
  ),
};

/**
 * A second line per step, for when the label alone is not enough.
 *
 * **`stacked` only.** `inline` has nowhere to put it — beside the label the row
 * stops reading as one line of travel — so it is dropped and warned about while
 * you build.
 */
export const WithDescriptions: Story = {
  name: 'With a second line',
  parameters: { controls: { disable: true } },
  render: () => (
    <Stepper
      aria-label="Import assets"
      current={1}
      steps={[
        { label: 'Choose a source', description: 'Where the assets live' },
        { label: 'Connect', description: 'Credentials and reachability' },
        { label: 'Map fields', description: 'Ours against theirs' },
        { label: 'Review', description: 'Before anything is written' },
      ]}
    />
  ),
};

/**
 * **A step is not a button unless you can actually go there.** Leave
 * `onStepSelect` out and no step is focusable at all — which is right for a
 * wizard that acts as it goes, because you cannot return to step 1 once step 2
 * has used it.
 *
 * Give it, and **only finished steps** become buttons. The one you are on is
 * already here, and one you have not reached is not a place.
 */
export const Clickable: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    const [at, setAt] = useState(3);

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-6">
        <Stepper
          aria-label="Import assets"
          steps={IMPORT}
          current={at}
          onStepSelect={(index) => {
            setAt(index);
          }}
        />
        <div className="mdt-flex mdt-items-center mdt-gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={at === 0}
            onClick={() => {
              setAt((n) => Math.max(0, n - 1));
            }}
          >
            Back
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={at === IMPORT.length - 1}
            onClick={() => {
              setAt((n) => Math.min(IMPORT.length - 1, n + 1));
            }}
          >
            Next
          </Button>
          <span className="mdt-text-xs mdt-text-muted-foreground">
            Finished steps are clickable. Try tabbing to them.
          </span>
        </div>
      </div>
    );
  },
};

/**
 * `stacked` drops to `inline` when there is genuinely not room for it —
 * **measured, not guessed at from the window**, because a stepper in a side
 * panel has to know about the panel rather than the screen.
 *
 * Set `responsive={false}` to hold one shape at every width, and accept that the
 * labels will break.
 */
export const InANarrowColumn: Story = {
  name: 'In a narrow column',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-9">
      <div className="mdt-w-[380px] mdt-rounded-lg mdt-border mdt-border-dashed mdt-border-border mdt-p-4">
        <Label>380px — dropped to inline on its own</Label>
        <Stepper steps={IMPORT} current={2} aria-label="Import assets" />
      </div>
      <div className="mdt-w-[380px] mdt-rounded-lg mdt-border mdt-border-dashed mdt-border-border mdt-p-4">
        <Label>380px with responsive={'{false}'} — held stacked, labels break</Label>
        <Stepper steps={IMPORT} current={2} responsive={false} aria-label="Import assets" />
      </div>
      <div className="mdt-w-[720px] mdt-rounded-lg mdt-border mdt-border-dashed mdt-border-border mdt-p-4">
        <Label>720px — room enough, stays stacked</Label>
        <Stepper steps={IMPORT} current={2} aria-label="Import assets" />
      </div>
    </div>
  ),
};

/** Three steps or twelve — the strip shares whatever width it is given. */
export const HowManySteps: Story = {
  name: 'Three steps, and eight',
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <div>
        <Label>Three</Label>
        <Stepper
          aria-label="Invite a teammate"
          current={1}
          steps={[{ label: 'Details' }, { label: 'Permissions' }, { label: 'Review' }]}
        />
      </div>
      <div>
        <Label>Eight — inline holds up better past about six</Label>
        <Stepper
          aria-label="Onboard an organisation"
          current={4}
          layout="inline"
          steps={[
            { label: 'Organisation' },
            { label: 'Domain' },
            { label: 'Branding' },
            { label: 'Plan' },
            { label: 'Agents' },
            { label: 'Alerting' },
            { label: 'Retention' },
            { label: 'Review' },
          ]}
        />
      </div>
    </Stack>
  ),
};

/**
 * The shape it was built for: a step strip above a panel, with Back and Next
 * beneath it. `Dialog` names this as the place a wizard belongs.
 */
export const InAWizard: Story = {
  name: 'In a wizard',
  parameters: { controls: { disable: true } },
  render: function Render() {
    const [at, setAt] = useState(1);
    const last = IMPORT.length - 1;

    return (
      <div className="mdt-max-w-2xl mdt-rounded-xl mdt-border mdt-border-border mdt-bg-background mdt-p-6">
        <Stepper
          aria-label="Import assets"
          steps={IMPORT}
          current={at}
          onStepSelect={(index) => {
            setAt(index);
          }}
        />

        <div className="mdt-my-7 mdt-flex mdt-min-h-[132px] mdt-flex-col mdt-gap-3 mdt-rounded-lg mdt-bg-muted/40 mdt-p-5">
          <p className="mdt-text-sm mdt-font-semibold mdt-text-foreground">
            Step {at + 1} — {IMPORT[at]?.label}
          </p>
          <div className="mdt-h-2 mdt-w-2/5 mdt-rounded-full mdt-bg-muted" />
          <div className="mdt-h-2 mdt-w-3/4 mdt-rounded-full mdt-bg-muted" />
          <div className="mdt-h-2 mdt-w-1/2 mdt-rounded-full mdt-bg-muted" />
        </div>

        <div className="mdt-flex mdt-items-center mdt-justify-between">
          <Button
            variant="ghost"
            size="sm"
            disabled={at === 0}
            onClick={() => {
              setAt((n) => Math.max(0, n - 1));
            }}
          >
            Back
          </Button>
          <Button
            size="sm"
            disabled={at === last}
            onClick={() => {
              setAt((n) => Math.min(last, n + 1));
            }}
          >
            {at === last - 1 ? 'Publish' : 'Next'}
          </Button>
        </div>
      </div>
    );
  },
};
