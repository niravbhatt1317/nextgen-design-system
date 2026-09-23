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

const DRAWER: BreadcrumbItem[] = [{ label: 'User management' }, { label: 'Edit details' }];

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
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
          'in the quiet ink, the place you are on in the foreground, and any ancestor given an',
          "`href` or an `onSelect` can be followed. The `drawer` form replaces a drawer's title",
          'while a page is open inside it — a back button, a nick, the parent in the quiet ink,',
          "a chevron, the step in the title's own 16/600 — so the way back is visible before",
          'anyone commits.',
          '',
          "**In the drawer form only the back button navigates.** An item's `href` and",
          "`onSelect` are ignored there. The crumb's job in a drawer is to name where a page",
          "will return to, and one way back is enough; the back button takes the caller's",
          'path, so a dirty draft still gets its discard question first.',
          '',
          'Announced as a navigation landmark named "Breadcrumb" holding a list, with the last',
          'item marked as the current page. The chevrons are drawing only.',
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
        items={DRAWER}
        onBack={() => {
          setBack((n) => n + 1);
        }}
      />
      <Note>
        {back > 0
          ? `Back pressed ${String(back)} ${back === 1 ? 'time' : 'times'}.`
          : 'Press the arrow. Its name is "Back to User management".'}
      </Note>
    </div>
  );
};

/**
 * The drawer's crumb, standing in the title's place. Back arrow, nick, the
 * parent in the quiet ink at 400, a chevron, the step at the title's 600.
 * **Only the arrow navigates.**
 */
export const Drawer: Story = {
  parameters: { controls: { disable: true } },
  render: () => <DrawerDemo />,
};

/**
 * When the row is narrower than its names, **the places behind you give way and
 * the place you are on never does.** A truncated ancestor carries its full name
 * as a `title`, so a hover still reads it. Long labels and paths deeper than
 * four are still open calls; this is the behaviour the row has meanwhile.
 */
export const LongLabels: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <div className="mdt-w-[360px] mdt-border mdt-border-dashed mdt-border-border mdt-p-2">
        <Breadcrumb
          items={[
            { label: 'Settings', href: '#settings' },
            { label: 'Identity and access management for the whole organisation', href: '#iam' },
            { label: 'Service accounts and their credentials', href: '#service-accounts' },
            { label: 'Rotate the signing key' },
          ]}
        />
      </div>
      <div className="mdt-w-[360px] mdt-border mdt-border-dashed mdt-border-border mdt-p-2">
        <Breadcrumb
          variant="drawer"
          items={[
            { label: 'Access profiles for the customer success team' },
            { label: 'Create a new access profile' },
          ]}
          onBack={() => undefined}
        />
      </div>
      <Note>Both rows are 360 wide. Hover a shortened name to read all of it.</Note>
    </div>
  ),
};

/**
 * Where the page form lives: the B1 header band at 1440, 60 tall, the one band
 * with a bottom hairline, padded 16 left so the panel trigger hugs the rail and
 * 24 right, everything 10 apart.
 */
export const InAHeaderBand: Story = {
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
  render: () => (
    <div className="mdt-flex mdt-h-[60px] mdt-w-[1440px] mdt-max-w-full mdt-items-center mdt-gap-2.5 mdt-border-b mdt-border-border mdt-bg-card mdt-pl-4 mdt-pr-6">
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
 * Where the drawer form lives: a 720 drawer's head, 60 tall, padded 6 · 20, the
 * crumb where the title was and the close at the right. The ✕ closes the whole
 * drawer; the arrow steps back one page.
 */
export const InADrawerHead: Story = {
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
  render: () => (
    <div className="mdt-flex mdt-min-h-[60px] mdt-w-[720px] mdt-max-w-full mdt-items-center mdt-justify-between mdt-gap-3 mdt-border-b mdt-border-border mdt-bg-card mdt-px-5 mdt-py-1.5">
      <Breadcrumb variant="drawer" items={DRAWER} onBack={() => undefined} />
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
