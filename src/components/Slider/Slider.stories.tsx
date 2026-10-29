import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Badge } from '../Badge';
import { Card, CardBody } from '../Card';
import { MotadataSwitch } from '../Switch';
import { Slider } from './Slider';
import type { SliderProps } from './Slider.types';

const meta: Meta<typeof Slider> = {
  title: 'New Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'One number picked between two limits - a session timeout, a restart cap, a share of hosts. The name sits',
          'above; a sunken panel holds the value riding on the handle, a flat track and a ruler; the two limits are',
          'named under the panel.',
          '',
          '- **`saved`** - where a saved value exists, the tag is quiet at rest and turns the solid ink once moved; a',
          '  yellow mark stays where the saved value sits and a chip above the track shows it - press it to set the',
          '  slider back. Leave it out where nothing is saved yet (a create step).',
          '- **`typeable`** - the value tag is the field: press it, type, Enter keeps it, Escape leaves it. A number',
          '  outside the limits turns the edge red and is not kept.',
          '- **`info`** in place of `hint` puts the explanation in an ⓘ; **`hideEnds`** drops the limit names where',
          '  the ⓘ already says what each end costs; **`endsOnRuler`** hangs them off the ruler instead.',
          '- **`mark`** and **`aside`** put an "Edited" badge after the name and a switch at the row\'s end;',
          '  **`folded`** keeps only the name row until the switch opens it.',
          '- **`divided`** - the hairline between rows when several share one card.',
          '',
          "**Ported from the console's policy slider (Pranjal, 2026-10-01 onwards)** - Settings → Security policy,",
          "Create organization's policy step, both fleets' Govern → Policies and their Changes step.",
        ].join('\n'),
      },
    },
  },
  args: {
    label: 'Session timeout',
    hint: 'Signs a person out after this long without activity.',
    unit: 'min',
    min: 15,
    max: 240,
    value: 60,
  },
  argTypes: {
    onChange: { action: 'changed' },
    hint: { control: 'text' },
    info: { control: false },
    mark: { control: false },
    aside: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** The outline card the rows sit in, as the console's policy pages draw it: 12 corners, 20 / 24 / 24 in. */
const PolicyCard = ({ children }: { children: ReactNode }) => (
  <Card
    surface="outline"
    padding="none"
    className="mdt-w-[36rem] mdt-max-w-full mdt-rounded-xl mdt-bg-background"
  >
    <CardBody className="mdt-px-6 mdt-pb-6 mdt-pt-5">{children}</CardBody>
  </Card>
);

/** Holds the value, so the story moves like the product does. */
const Live = ({ value, onChange, ...props }: SliderProps) => {
  const [v, setV] = useState(value);
  return (
    <Slider
      {...props}
      value={v}
      onChange={(n) => {
        setV(n);
        onChange?.(n);
      }}
    />
  );
};

/** With nothing saved yet - a create step: the solid ink tag from the start, the limits under the panel. */
export const Default: Story = {
  render: (args) => (
    <PolicyCard>
      <Live {...args} />
    </PolicyCard>
  ),
};

/** At its saved value: the tag wears its quiet outline. Move it and the reset chip appears. */
export const Saved: Story = {
  args: { saved: 60, endName: 'MSP baseline', max: 120 },
  render: (args) => (
    <PolicyCard>
      <Live {...args} />
    </PolicyCard>
  ),
};

/** Moved off the saved value: the solid tag, the yellow mark where 60 sits, and the chip that sets it back. */
export const Changed: Story = {
  args: { saved: 60, value: 150 },
  render: (args) => (
    <PolicyCard>
      <Live {...args} />
    </PolicyCard>
  ),
};

/** Agent Fleet's Govern → Policies: the explanation in an ⓘ, no end names, and a tag you can type into. */
export const Typeable: Story = {
  args: {
    label: 'Restart attempts',
    hint: undefined,
    info: 'How many times an agent is restarted before it is held. More attempts keep it running longer; fewer surface a broken host sooner.',
    unit: 'restarts',
    min: 1,
    max: 10,
    value: 3,
    saved: 3,
    hideEnds: true,
    typeable: true,
  },
  render: (args) => (
    <PolicyCard>
      <Live {...args} />
    </PolicyCard>
  ),
};

/** The tag pressed: it is the field, in the same place, the unit after it. */
export const Typing: Story = {
  ...Typeable,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /Type a value/ }));
    await expect(
      canvas.getByRole('textbox', { name: /between 1 restart and 10 restarts/ })
    ).toHaveFocus();
  },
};

/** The two end names hung off the ruler's first and last numbers. */
export const EndsOnRuler: Story = {
  args: {
    startName: 'Platform floor',
    endName: 'MSP baseline',
    max: 60,
    value: 30,
    endsOnRuler: true,
  },
  render: (args) => (
    <PolicyCard>
      <Live {...args} />
    </PolicyCard>
  ),
};

/** The fleets' Changes step: an "Edited" badge after the name, the include switch at the end; off, the track folds. */
const SwitchedRow = () => {
  const [on, setOn] = useState(true);
  return (
    <PolicyCard>
      <Live
        label="Log retention"
        info="How long an agent keeps its own logs on the host."
        unit="days"
        min={1}
        max={30}
        value={14}
        saved={7}
        hideEnds
        typeable
        folded={!on}
        mark={
          <Badge tone="info" shape="square" size="sm">
            Edited
          </Badge>
        }
        aside={
          <MotadataSwitch checked={on} onCheckedChange={setOn} aria-label="Include log retention" />
        }
      />
    </PolicyCard>
  );
};

export const WithSwitch: Story = {
  parameters: { controls: { disable: true } },
  render: () => <SwitchedRow />,
};

/** Locked: half strength, a not-allowed pointer, "Locked" on hover. */
export const Locked: Story = {
  args: { saved: 60, disabled: true },
  render: (args) => (
    <PolicyCard>
      <Slider {...args} />
    </PolicyCard>
  ),
};

/** Several rows in one card: every row after the first is `divided`. */
export const InACard: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <PolicyCard>
      <Live
        label="Session timeout"
        hint="Signs a person out after this long without activity."
        unit="min"
        min={15}
        max={240}
        value={60}
        saved={60}
      />
      <Live
        divided
        label="Password expiry"
        hint="Asks for a new password after this many days."
        unit="days"
        min={30}
        max={365}
        value={90}
        saved={90}
      />
      <Live
        divided
        label="Concurrent sessions"
        hint="How many places one person can be signed in at once."
        min={1}
        max={10}
        value={3}
        saved={3}
      />
    </PolicyCard>
  ),
};
