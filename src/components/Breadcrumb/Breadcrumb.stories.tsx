import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Breadcrumb } from './Breadcrumb';
import { Button } from '../Button';
import { Icon } from '../Icon';
import type { BreadcrumbItem } from './Breadcrumb.types';

const PAGE: BreadcrumbItem[] = [
  { label: 'Settings' },
  { label: 'User management', href: '#user-management' },
  { label: 'Users' },
];

const DRAWER: BreadcrumbItem[] = [
  { label: 'User management', onSelect: () => undefined },
  { label: 'Edit details' },
];

const meta: Meta<typeof Breadcrumb> = {
  title: 'New Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A crumb says where you are and offers the way back.',
          '',
          '**Depth, not sequence.** Every place on a crumb already exists; you are simply',
          'standing at the bottom of a path. A journey whose later steps have not happened yet',
          'is `Stepper`; doors you can take in any order are `Tabs`.',
          '',
          '**Two forms.** The `page` form sits in the header band after the panel icon: 12/500',
          'in the faint ink (`--mdt-faint`), the place you are on in the foreground (`--mdt-foreground`), and any ancestor given an',
          "`href` or an `onSelect` can be followed. The `drawer` form replaces a drawer's title",
          "while a page is open inside it — the drawer title's own 14 on a 20 line, the earlier steps at 400 in the faint ink,",
          'a chevron 14, the step at 600 in the soft ink (neutral-130), every visible gap 12.',
          '',
          '**The drawer form is a real breadcrumb with no back button** (Pranjal, 2026-10-26: "Where first or other',
          'options will be clickable so no need for back button. Update it in all the sidedrawers"). Every step before the',
          'last that is given an `onSelect` (or an `href`) is a way back: the faint ink at rest, the foreground and an',
          'underline under the pointer, named "Back to <step>". `onBack` is the short form for the step before the last,',
          "and takes the caller's path, so a dirty draft still gets its discard question first.",
          '',
          'Every name stays on one line and is never shortened — the console’s crumb is nowrap throughout.',
          '',
          'Announced as a navigation landmark named "Breadcrumb" holding a list, with the last',
          'item marked as the current page. The chevrons are drawing only.',
          '',
          'Measured against the console 2026-09-22 (/fields, the page form) and 2026-10-28 (Agent Fleet › Health, Needs attention, the drawer form).',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['page', 'drawer'] },
    items: { control: false },
    onBack: { control: false },
    backLabel: { control: 'text' },
    'aria-label': { control: 'text' },
  },
  args: {
    items: PAGE,
    variant: 'page',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Note = ({ children }: { children: React.ReactNode }) => (
  <p className="mdt-mt-3 mdt-text-xs mdt-text-muted-foreground">{children}</p>
);

const PageDemo = () => {
  const [went, setWent] = useState<string | null>(null);
  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Settings' },
          {
            label: 'User management',
            onSelect: () => {
              setWent('User management');
            },
          },
          { label: 'Users' },
        ]}
      />
      <Note>{went ? `Went to ${went}.` : 'Click the middle crumb.'}</Note>
    </div>
  );
};

/**
 * The header band's crumb: three places, the middle one clickable. The last is
 * where you are, in the foreground, and is never a link — you are already here.
 */
export const Page: Story = {
  parameters: { controls: { disable: true } },
  render: () => <PageDemo />,
};

const DrawerDemo = () => {
  const [back, setBack] = useState(0);
  return (
    <div>
      <Breadcrumb
        variant="drawer"
        items={[
          {
            label: 'Needs attention',
            onSelect: () => {
              setBack((n) => n + 1);
            },
          },
          { label: 'Crashing modules' },
        ]}
      />
      <Note>
        {back > 0
          ? `Went back ${String(back)} ${back === 1 ? 'time' : 'times'}.`
          : 'Press "Needs attention" - it is the way back. Its name is "Back to Needs attention".'}
      </Note>
    </div>
  );
};

/**
 * The drawer's crumb, standing in the title's place: the earlier step in the faint
 * ink at 400, a chevron, the step at the title's 600 in the soft ink, 14 on a 20 line.
 * **No back button** - the earlier step is the way back, underlined under the pointer.
 */
export const Drawer: Story = {
  parameters: { controls: { disable: true } },
  render: () => <DrawerDemo />,
};

/**
 * Three steps deep: both earlier steps go back - "Agent details" straight to the
 * drawer's first page, "Modules" one page back.
 */
export const DrawerThreeSteps: Story = {
  name: 'Drawer · three steps',
  parameters: { controls: { disable: true } },
  render: () => (
    <Breadcrumb
      variant="drawer"
      items={[
        { label: 'Agent details', onSelect: () => undefined },
        { label: 'Modules', onSelect: () => undefined },
        { label: 'Metrics' },
      ]}
    />
  ),
};

/**
 * Where the page form lives: the B1 header band at 1440, 60 tall, the one band
 * with a bottom hairline (neutral-30, as the console renders it), padded 16 left so the
 * panel trigger hugs the rail and 24 right, everything 10 apart.
 */
export const InAHeaderBand: Story = {
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
  render: () => (
    <div className="mdt-flex mdt-h-[60px] mdt-w-[1440px] mdt-max-w-full mdt-items-center mdt-gap-2.5 mdt-border-b mdt-border-neutral-30 mdt-bg-card mdt-pl-4 mdt-pr-6">
      <Button
        variant="ghost"
        iconOnly
        size="sm"
        ariaLabel="Collapse the sidebar"
        leftIcon={<Icon name="panel-left" aria-hidden />}
      />
      <Breadcrumb items={PAGE} />
    </div>
  ),
};

/**
 * Where the drawer form lives: a 720 drawer's head, 60 tall, padded 6 · 20, a neutral-20
 * hairline under it, the crumb where the title was and the close at the right. The ✕ closes the whole
 * drawer; "User management" goes back one page.
 */
export const InADrawerHead: Story = {
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
  render: () => (
    <div className="mdt-flex mdt-min-h-[60px] mdt-w-[720px] mdt-max-w-full mdt-items-center mdt-justify-between mdt-gap-3 mdt-border-b mdt-border-neutral-20 mdt-bg-card mdt-px-5 mdt-py-1.5">
      <Breadcrumb variant="drawer" items={DRAWER} />
      <Button
        variant="ghost"
        iconOnly
        size="sm"
        ariaLabel="Close"
        leftIcon={<Icon name="x" aria-hidden />}
      />
    </div>
  ),
};
