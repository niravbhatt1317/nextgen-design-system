import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button';
import { BannerStack } from './BannerStack';
import type { BannerStackItem } from './BannerStack.types';

/* Ported from the console (Pranjal, 2026-10-13): the organization page's notice slot, fed the way Strip.jsx and
 * OrgDetail.jsx feed it - the state notice, the import results and the profile nudge, each with its priority. */

const meta: Meta<typeof BannerStack> = {
  title: 'New Components/BannerStack',
  component: BannerStack,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'Several page notices folded into one slot, the way a chat app pins messages.',
          '',
          '- **Collapsed** - the most severe notice is shown in full at the front, live: its actions and its',
          '  cross work without opening anything. A rail of ticks ahead of its glyph says how many wait behind.',
          '- **Open** - hover, Tab in or tap, and every notice fans out as a card on a shade hanging under the',
          '  bar. The slot keeps its collapsed height, so nothing under it moves.',
          '- **Closing** - the pointer leaving (after 160ms), focus leaving, Escape, or a tap outside.',
          '- **Order** - by `priority`, highest first; left out, the tone decides (danger, warning, info, success, neutral).',
          '- **One notice** renders plainly - the page banner as it ships, no rail, no shade.',
          '',
          'Each notice is a library `Banner` at `placement="page"`. Dismissing is the notice’s own `onDismiss`:',
          'drop it from `items` and an open fan re-flows in place. Reduced motion swaps every move instantly.',
          '',
          'Ported from the console’s organization page (Nikhil’s approved design, 2026-10-07).',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    items: { control: false },
    stackedAnnouncement: { control: false },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Page = ({ children }: { children: React.ReactNode }) => (
  <div className="mdt-min-h-[420px] mdt-bg-background">
    {children}
    <div className="mdt-p-6 mdt-text-sm mdt-text-muted-foreground">
      The page under the slot. It never moves while the stack opens.
    </div>
  </div>
);

const ghost = (label: string) => (
  <Button variant="ghost" size="sm">
    {label}
  </Button>
);

const NOTICES: BannerStackItem[] = [
  {
    id: 'onboarding',
    priority: 10,
    tone: 'warning',
    title: 'Missing details',
    description: 'Add the website, address and industry to complete this organization.',
    actions: ghost('Add details'),
  },
  {
    id: 'import-2',
    priority: 50,
    tone: 'success',
    title: 'Import complete',
    description: '42 sites from sites-october.csv',
    actions: ghost('View results'),
  },
  {
    id: 'suspended',
    priority: 90,
    tone: 'danger',
    title: 'Suspended',
    description: 'Members can’t sign in · settings read-only · Unpaid invoice',
    actions: ghost('Reactivate'),
  },
  {
    id: 'import-1',
    priority: 60,
    tone: 'warning',
    title: 'Import finished',
    description: '18 imported · 3 rows failed',
    actions: ghost('View results'),
  },
];

/** Every notice dismissible but the state one - dismiss while open and the fan re-flows in place. */
const Live = ({ initial }: { initial: BannerStackItem[] }) => {
  const [gone, setGone] = useState<string[]>([]);
  const items = initial
    .filter((it) => !gone.includes(it.id))
    .map((it) =>
      it.id === 'suspended'
        ? it
        : {
            ...it,
            onDismiss: () => {
              setGone((g) => [...g, it.id]);
            },
          }
    );
  return (
    <Page>
      <BannerStack items={items} label="Organization notices" />
    </Page>
  );
};

/** Four notices: the suspension in front, three behind it. Hover the bar to fan them out. */
export const Default: Story = {
  render: () => <Live initial={NOTICES} />,
};

/** Two notices - the smallest stack. */
export const Two: Story = {
  render: () => <Live initial={NOTICES.slice(2, 4)} />,
};

/** One notice renders plainly: the page banner as it ships, no rail, no shade. */
export const One: Story = {
  render: () => <Live initial={NOTICES.slice(1, 2)} />,
};

/** Seven notices: the rail tightens its ticks to stay inside the bar. */
export const Many: Story = {
  render: () => (
    <Live
      initial={[
        ...NOTICES,
        {
          id: 'scheduled',
          priority: 80,
          tone: 'warning',
          title: 'Suspension scheduled',
          description: 'On 20 Oct 2026 · everything works as normal until then',
        },
        {
          id: 'import-3',
          priority: 70,
          tone: 'danger',
          title: 'Import failed',
          description: '0 imported · 12 rows failed',
          actions: ghost('View results'),
        },
        {
          id: 'info',
          tone: 'info',
          title: 'New sign-in policy',
          description: 'Takes effect next week.',
        },
      ]}
    />
  ),
};

/** No priorities given - the tone decides the order: danger, warning, info, success, neutral. */
export const OrderedByTone: Story = {
  render: () => (
    <Live
      initial={[
        { id: 'n', tone: 'neutral', title: 'Neutral', description: 'Lowest by default.' },
        { id: 's', tone: 'success', title: 'Success', description: 'Above neutral.' },
        { id: 'd', tone: 'danger', title: 'Danger', description: 'Always in front.' },
        { id: 'w', tone: 'warning', title: 'Warning', description: 'Second.' },
      ]}
    />
  ),
};
