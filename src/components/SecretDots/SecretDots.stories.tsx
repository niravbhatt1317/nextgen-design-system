import type { Meta, StoryObj } from '@storybook/react-vite';
import { SecretDots } from './SecretDots';
import { Label } from '../Label';

const meta: Meta<typeof SecretDots> = {
  title: 'Components/SecretDots',
  component: SecretDots,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A masked secret.',
          '',
          '**Always eight bullets**, whatever the secret really is. Credential fixes the',
          'count deliberately so the rendering does not leak how long the value is.',
          '',
          "Credential's audit also records a gap this closes: its dots are `aria-hidden`, so a",
          'screen-reader user gets no indication a secret exists at all unless the caller',
          'happens to supply a caption. Here the caption is built in.',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-3">
      <SecretDots size="sm" />
      <SecretDots size="md" />
    </div>
  ),
};

/** Same length every time, so nothing about the secret is given away. */
export const FixedLength: Story = {
  name: 'Fixed length',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-3">
      <div className="mdt-flex mdt-items-center mdt-gap-4">
        <SecretDots label="Hidden four-character secret" />
        <span className="mdt-text-xs mdt-text-muted-foreground">masking a 4-character value</span>
      </div>
      <div className="mdt-flex mdt-items-center mdt-gap-4">
        <SecretDots label="Hidden sixty-character secret" />
        <span className="mdt-text-xs mdt-text-muted-foreground">masking a 60-character value</span>
      </div>
    </div>
  ),
};

/** Where it actually appears — in a labelled row on a detail panel. */
export const InContext: Story = {
  name: 'In context',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="mdt-w-80 mdt-rounded-md mdt-border mdt-border-border mdt-p-4">
      <Label>Secret</Label>
      <div className="mdt-mt-2 mdt-flex mdt-items-center mdt-justify-between">
        <SecretDots label="Hidden credential secret" />
        <span className="mdt-text-xs mdt-text-muted-foreground">Local store</span>
      </div>
    </div>
  ),
};
