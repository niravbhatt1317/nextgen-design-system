import type { Meta, StoryObj } from '@storybook/react-vite';
import { OverflowCount } from './OverflowCount';
import { Badge } from '../Badge';

const meta: Meta<typeof OverflowCount> = {
  title: 'Components/OverflowCount',
  component: OverflowCount,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'The quiet "+N" after the values a row has room for — scopes, teams, members, roles.',
          "Ported from the console's MoreCount (2026-10-13).",
          '',
          '**The value wears the badge; the counter does not.** It is muted 12px text with no pill,',
          'drawn exactly like the "+N" inside the Table\'s TagList. Hover or focus it and an instant',
          'tooltip lists the hidden values. When only the number is known, the tooltip says what it',
          'counts instead. Nothing renders at zero.',
          '',
          '| Prop | What it does |',
          '| --- | --- |',
          '| `items` | the hidden values; the tooltip lists them, and their number is the N |',
          '| `count` | the N, when it is known but the values are not (wins over `items.length`) |',
          '| `label` | what it counts, shown when there is no list · default "More assigned" |',
        ].join('\n'),
      },
    },
  },
  args: {
    items: ['Network', 'Security', 'Billing'],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CountOnly: Story = {
  name: 'Count only',
  args: { items: undefined, count: 12, label: 'More members' },
};

export const LongList: Story = {
  name: 'Long list (scrolls past seven)',
  args: {
    items: [
      'Platform',
      'Network',
      'Security',
      'Billing',
      'Support',
      'Facilities',
      'Legal',
      'Finance',
      'Marketing',
    ],
  },
};

/** In place: two values wear the badge, the counter stays quiet. */
export const AfterBadges: Story = {
  name: 'After badges',
  render: (args) => (
    <span className="mdt-inline-flex mdt-items-center mdt-gap-1">
      <Badge size="sm" shape="square">
        Support
      </Badge>
      <Badge size="sm" shape="square">
        Platform
      </Badge>
      <OverflowCount {...args} />
    </span>
  ),
};
