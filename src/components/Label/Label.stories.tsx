import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'The uppercase micro-heading that names a group of fields, a section, or a column.',
          '',
          'Three of the four systems have one, and between them they use **three different',
          'letter-spacings**: 0.04em, 0.05em and 0.06em. Org Mgmt also records its size and',
          'line-height drifting across six files.',
          '',
          'This settles on 0.05em — the middle of the three, and an existing step on the',
          'scale rather than a fourth bespoke value.',
        ].join('\n'),
      },
    },
  },
  args: { children: 'Connection' },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-3">
      <Label size="sm">Small — the default</Label>
      <Label size="md">Medium</Label>
    </div>
  ),
};

/** Naming a group of fields, which is what it is mostly for. */
export const InContext: Story = {
  name: 'In context',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="mdt-flex mdt-w-80 mdt-flex-col mdt-gap-5">
      <div>
        <Label>Connection</Label>
        <div className="mdt-mt-2 mdt-rounded-md mdt-border mdt-border-border mdt-p-3 mdt-text-sm mdt-text-foreground">
          10.4.22.9 · port 22
        </div>
      </div>
      <div>
        <Label>Credentials</Label>
        <div className="mdt-mt-2 mdt-rounded-md mdt-border mdt-border-border mdt-p-3 mdt-text-sm mdt-text-foreground">
          svc-monitoring
        </div>
      </div>
    </div>
  ),
};

/**
 * Render it as a real heading or a legend when it is one, so the structure is
 * not lost on a screen reader.
 */
export const Semantics: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-3">
      <Label>span — the default, purely visual</Label>
      <Label as="h3">h3 — a genuine section heading</Label>
      <Label as="h4">h4 — a sub-heading</Label>
      <fieldset className="mdt-border mdt-border-border mdt-p-3">
        <Label as="legend">legend — naming a fieldset</Label>
        <p className="mdt-text-sm mdt-text-muted-foreground">Fields go here</p>
      </fieldset>
    </div>
  ),
};
