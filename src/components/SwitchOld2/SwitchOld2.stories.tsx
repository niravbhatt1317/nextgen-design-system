import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { MotadataSwitchOld2 } from './SwitchOld2';

const meta: Meta<typeof MotadataSwitchOld2> = {
  title: 'Deprecated 2/Switch Old',
  component: MotadataSwitchOld2,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    status: {
      type: 'deprecated',
      since: '0.5.1',
      deprecation: {
        deprecatedSince: '0.5.1',
        removalIn: 'to be set by Nirav',
        replacement: 'MotadataSwitch',
        message:
          'The Switch as it was before 22 September 2026. Deprecated 2026-09-22 when Pranjal ruled the new one in; kept for side-by-side review; Nirav sets the removal version.',
      },
    },
    docs: {
      description: {
        component: [
          '## ⚠️ Deprecated — use `MotadataSwitch`',
          '',
          'The Switch as it was before 22 September 2026. Deprecated 2026-09-22 when Pranjal',
          'ruled the new one in; kept for side-by-side review; Nirav sets the removal version.',
          '',
          '**Do not start anything new on it.**',
          '',
          'A toggle switch built on Radix UI: on/off with keyboard support and form',
          'integration. Three sizes: `sm` 20×36, `md` 24×44, `lg` 28×56.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' } },
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onCheckedChange: { action: 'checked changed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { 'aria-label': 'Toggle setting' },
};

export const Checked: Story = {
  args: { defaultChecked: true, 'aria-label': 'Toggle setting' },
};

export const Sizes: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-6">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="mdt-flex mdt-items-center mdt-gap-2">
          <MotadataSwitchOld2 size={size} aria-label={`${size} switch`} />
          <span className="mdt-text-sm mdt-text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, 'aria-label': 'Disabled switch' },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true, 'aria-label': 'Disabled checked switch' },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [on, setOn] = useState(false);
    return (
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-3">
        <MotadataSwitchOld2 checked={on} onCheckedChange={setOn} aria-label="Notifications" />
        <span className="mdt-text-sm mdt-text-muted-foreground">
          Notifications are {on ? 'on' : 'off'}
        </span>
      </div>
    );
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-text-sm">
      <MotadataSwitchOld2 id="switch-old2-2fa" />
      <label htmlFor="switch-old2-2fa">Enable two-factor sign-in</label>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="mdt-grid mdt-grid-cols-[120px_auto] mdt-items-center mdt-gap-x-6 mdt-gap-y-4 mdt-text-sm">
      <span className="mdt-text-muted-foreground">Off</span>
      <MotadataSwitchOld2 aria-label="Off" />
      <span className="mdt-text-muted-foreground">On</span>
      <MotadataSwitchOld2 defaultChecked aria-label="On" />
      <span className="mdt-text-muted-foreground">Off, disabled</span>
      <MotadataSwitchOld2 disabled aria-label="Off disabled" />
      <span className="mdt-text-muted-foreground">On, disabled</span>
      <MotadataSwitchOld2 disabled defaultChecked aria-label="On disabled" />
    </div>
  ),
};
