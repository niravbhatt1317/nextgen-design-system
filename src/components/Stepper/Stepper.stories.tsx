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
          'Four layouts on one switch — `stacked`, `inline`, `underline` and `vertical` — and the',
          'same rules in every one (Pranjal, 2026-10-19):',
          '',
          '- **Hover marks the disc and the name, never the whole step** — a soft halo on the disc,',
          '  a dashed underline under the name. Keyboard focus rings the disc.',
          '- **Nothing moves when a step becomes clickable.** A clickable step is exactly the same',
          '  box as a plain one, so the strip never changes height.',
          '- **A finished step reads as finished** — its name in full ink. Only the steps ahead stay',
          '  quiet.',
          '- **Going back keeps your progress.** Pass `reached`, the furthest step got to: every',
          '  step before it keeps its tick and its line, it shows as where you left off, and the',
          '  step you went back to keeps its tick inside a "you are here" ring.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    layout: { control: 'inline-radio', options: ['stacked', 'inline', 'underline', 'vertical'] },
    reached: { control: { type: 'number', min: 0, max: 6 } },
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
 *
 * `underline` gives every step a full-width rule beneath its own label instead
 * of a line between discs. **The bar is the progress, not a connector.** A row
 * of circles joined by a line says *"these are stations on a route"*; a row of
 * underlined labels says *"these are the parts, and you have done this many"* —
 * which is what somebody halfway through a form is actually asking.
 *
 * It is what `DialogSteps` draws. That used to be a second implementation of
 * this idea living in `Dialog`; two answers to one question is a defect, and
 * the tick would eventually have been fixed in one of them and not the other.
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
      <div>
        <Label>underline — the bar is the progress</Label>
        <Stepper steps={IMPORT} current={2} layout="underline" aria-label="Import assets" />
      </div>
    </Stack>
  ),
};

const ALL_STATES: StepperStep[] = [
  { label: 'Completed', state: 'complete' },
  { label: 'Current', state: 'current' },
  { label: 'Upcoming', state: 'upcoming' },
  { label: 'Skipped', state: 'skipped' },
  { label: 'Disabled', state: 'disabled' },
];

/**
 * Five, and every one is readable **without colour** — a tick, a number, a dash.
 * The shape says it as well as the tone does.
 *
 * Three are worked out from `current` and never need setting. The two you set
 * yourself are the ones no counter can know about: `skipped` and `disabled`.
 */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <div>
        <Label>stacked</Label>
        <Stepper steps={ALL_STATES} current={1} aria-label="Every state" />
      </div>
      <div>
        <Label>inline</Label>
        <Stepper steps={ALL_STATES} current={1} layout="inline" aria-label="Every state" />
      </div>
      <div>
        <Label>underline</Label>
        <Stepper steps={ALL_STATES} current={1} layout="underline" aria-label="Every state" />
      </div>
    </Stack>
  ),
};

/**
 * **There is no error state, on purpose.**
 *
 * A coloured ring says *where* a problem is and never what it is, so it always
 * needs a message beside it — and once the message is there, the ring is only
 * repeating itself. Leave the step as the current one and put a `Banner` under
 * the strip, which is where somebody can actually read what went wrong and what
 * to do about it.
 */
export const WhenSomethingGoesWrong: Story = {
  name: 'When something goes wrong',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="mdt-flex mdt-max-w-2xl mdt-flex-col mdt-gap-4">
      <Stepper
        aria-label="Import assets"
        current={1}
        steps={[
          { label: 'Choose a source' },
          { label: 'Connect' },
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
 * Give it, and **every step you have got to** becomes a button - without
 * `reached`, that is the finished ones. The one you are on is already here,
 * and one you have not reached is not a place.
 *
 * **A clickable step is the same box as a plain one**, so nothing moves when
 * this is turned on. Under the pointer only the disc (a soft halo) and the name
 * (a dashed underline) react; keyboard focus rings the disc.
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
 *
 * It keeps `reached`, so clicking back to fix an earlier step loses nothing:
 * the steps after it keep their ticks, the furthest one shows as where you left
 * off, and you can click straight forward to it again.
 */
export const InAWizard: Story = {
  name: 'In a wizard',
  parameters: { controls: { disable: true } },
  render: function Render() {
    const [at, setAt] = useState(1);
    const [reached, setReached] = useState(1);
    const last = IMPORT.length - 1;

    return (
      <div className="mdt-max-w-2xl mdt-rounded-xl mdt-border mdt-border-border mdt-bg-background mdt-p-6">
        <Stepper
          aria-label="Import assets"
          steps={IMPORT}
          current={at}
          reached={reached}
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
              const next = Math.min(last, at + 1);
              setAt(next);
              setReached((r) => Math.max(r, next));
            }}
          >
            {at === last - 1 ? 'Publish' : 'Next'}
          </Button>
        </div>
      </div>
    );
  },
};

const CREATE_ORG: StepperStep[] = [
  { label: 'Essentials', description: 'Required · 3 fields' },
  { label: 'Profile' },
  { label: 'Security policy' },
  { label: 'Allowed domains' },
  { label: 'Sites' },
  { label: 'Branding & portal' },
  { label: 'Tags & attributes' },
];

/**
 * **`layout="vertical"`** - the journey set down a rail, as the navigation of a two-column flow (the console's
 * Create organization): the rail on the left, the panel beside it showing one step at a time.
 *
 * It reads the second counter every layout reads, `reached` - the furthest step got to so far - so somebody can go back
 * to step 2 and forward again to step 4 without redoing 3. Every step up to `reached` but the current one is
 * clickable; everything past it is locked, quiet, and titled "Opens after ...". On step 3 here, with step 4 where
 * you left off.
 */
export const Vertical: Story = {
  args: {
    layout: 'vertical',
    steps: CREATE_ORG,
    current: 2,
    reached: 3,
    'aria-label': 'Create organization',
  },
  render: function Render(args) {
    const [current, setCurrent] = useState(args.current);
    const [reached, setReached] = useState(args.reached ?? args.current);
    return (
      <div className="mdt-w-[280px] mdt-p-4">
        <Stepper
          {...args}
          current={current}
          reached={reached}
          onStepSelect={(index) => {
            setCurrent(index);
            setReached((r) => Math.max(r, index));
          }}
        />
      </div>
    );
  },
};

const RAIL_STATES: StepperStep[] = [
  { label: 'Complete', description: 'Behind you' },
  { label: 'Current', description: 'The one in the panel' },
  { label: 'Where you left off', description: 'Reached, then went back' },
  { label: 'Disabled', description: 'Set by hand', state: 'disabled' },
  { label: 'Locked', description: 'Opens after Disabled' },
];

/** Every vertical state, readable without colour - a tick for done, a number everywhere else, the ink going quiet past where you got to. */
export const VerticalStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="mdt-flex mdt-flex-wrap mdt-gap-8">
      <div className="mdt-w-[280px] mdt-p-4">
        <p className="mdt-mb-3 mdt-text-xs mdt-font-medium mdt-text-muted-foreground">
          clickable - current 1, reached 2
        </p>
        <Stepper
          layout="vertical"
          steps={RAIL_STATES}
          current={1}
          reached={2}
          onStepSelect={() => undefined}
          aria-label="Every state"
        />
      </div>
      <div className="mdt-w-[280px] mdt-p-4">
        <p className="mdt-mb-3 mdt-text-xs mdt-font-medium mdt-text-muted-foreground">
          read only - no onStepSelect
        </p>
        <Stepper
          layout="vertical"
          steps={RAIL_STATES}
          current={1}
          reached={2}
          aria-label="Every state"
        />
      </div>
    </div>
  ),
};

/** One strip of the revisit story: it opens back on step 1, having got as far as step 4. */
const Revisiting = ({ layout }: { layout: 'stacked' | 'inline' | 'underline' | 'vertical' }) => {
  const [current, setCurrent] = useState(0);
  const [reached, setReached] = useState(3);
  return (
    <Stepper
      layout={layout}
      steps={layout === 'vertical' ? CREATE_ORG.slice(0, 5) : IMPORT}
      current={current}
      reached={reached}
      onStepSelect={(index) => {
        setCurrent(index);
        setReached((r) => Math.max(r, index));
      }}
      aria-label={layout === 'vertical' ? 'Create organization' : 'Import assets'}
    />
  );
};

/**
 * **Going back keeps your progress.** Each strip opens mid-revisit: somebody got as far as step 4, then went back to
 * step 1 to fix something. Nothing is undone -
 *
 * - **the step you went back to** keeps its tick, inside a "you are here" ring;
 * - **the steps in between** keep their ticks, and the line or bar stays filled;
 * - **step 4 shows as where you left off** - outlined in primary, its name in full ink;
 * - **every one of them is clickable**, so you can jump straight back to where you were.
 *
 * `reached` is the furthest step got to (`current` when left out). Keep it as the larger of itself and wherever the
 * person goes, as these strips do. A screen reader hears "done", "done, you are here" and "where you left off".
 */
export const GoingBack: Story = {
  name: 'Going back keeps your progress',
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <div data-testid="revisit-stacked">
        <Label>stacked — current 0, reached 3</Label>
        <Revisiting layout="stacked" />
      </div>
      <div data-testid="revisit-inline">
        <Label>inline — current 0, reached 3</Label>
        <Revisiting layout="inline" />
      </div>
      <div data-testid="revisit-underline">
        <Label>underline — current 0, reached 3</Label>
        <Revisiting layout="underline" />
      </div>
      <div data-testid="revisit-vertical" className="mdt-w-[280px]">
        <Label>vertical — current 0, reached 3</Label>
        <Revisiting layout="vertical" />
      </div>
    </Stack>
  ),
};

/**
 * **Nothing moves when a step becomes clickable.** Each layout twice, on step 3: read-only, then with
 * `onStepSelect`. A clickable step is exactly the same box as a plain one, so the two strips are the same height and
 * every disc sits in the same place. Point at a finished step in the second strip: only its disc (a soft halo) and its
 * name (a dashed underline) react - no wash behind the step. Tab to it and the focus ring sits on the disc.
 */
export const ClickableOrNot: Story = {
  name: 'Clickable or not, the same box',
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      {(['stacked', 'inline', 'underline'] as const).map((layout) => (
        <div key={layout} className="mdt-flex mdt-flex-col mdt-gap-4">
          <div data-testid={`plain-${layout}`}>
            <Label>{layout} — read only</Label>
            <Stepper steps={IMPORT} current={2} layout={layout} aria-label="Import assets" />
          </div>
          <div data-testid={`clickable-${layout}`}>
            <Label>{layout} — clickable</Label>
            <Stepper
              steps={IMPORT}
              current={2}
              layout={layout}
              onStepSelect={() => undefined}
              aria-label="Import assets"
            />
          </div>
        </div>
      ))}
    </Stack>
  ),
};
