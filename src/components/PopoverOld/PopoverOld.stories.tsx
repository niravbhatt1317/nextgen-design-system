import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { PopoverOld, PopoverOldContent, PopoverOldTrigger } from './PopoverOld';

const meta: Meta<typeof PopoverOld> = {
  title: 'Deprecated/Popover Old',
  component: PopoverOld,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    status: {
      type: 'deprecated',
      since: '0.5.1',
      deprecation: {
        deprecatedSince: '0.5.1',
        removalIn: '1.0.0',
        replacement: 'Popover',
        message:
          "The Popover on the overlay surface replaced this one on 26 September 2026: the same Radix parts and the same API, its ground the colour map's overlay step in both themes. It stays for side-by-side comparison until the removal pull request.",
      },
    },
    docs: {
      description: {
        component: [
          '## ⚠️ Deprecated — use `Popover`',
          '',
          '`Popover` (New Components) is the same Radix popover with one difference that matters: its',
          "ground is the colour map's overlay surface, `--mdt-popover`, in both themes - white in light,",
          'neutral-150 in dark - and it carries no private dark rule. This is the earlier version, kept so the',
          'two can be reviewed side by side.',
        ].join('\n'),
      },
    },
    controls: {
      exclude: ['class'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PopoverOld>
      <PopoverOldTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverOldTrigger>
      <PopoverOldContent>
        <div className="mdt-flex mdt-flex-col mdt-gap-2">
          <h4 className="mdt-font-medium mdt-leading-none">Dimensions</h4>
          <p className="mdt-text-sm mdt-text-muted-foreground">Set the dimensions for the layer.</p>
        </div>
      </PopoverOldContent>
    </PopoverOld>
  ),
};
