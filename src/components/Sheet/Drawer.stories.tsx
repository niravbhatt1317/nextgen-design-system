import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { ActionCard } from '../ActionCard';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { ConfirmDialog } from '../ConfirmDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../DropdownMenu';
import { Icon } from '../Icon';
import { IconTile } from '../IconTile';
import { Form, useForm } from '../Form';
import type { UseFormReturn } from '../Form';
import { Input } from '../Input';
import { PhoneInput } from '../PhoneInput';
import { Select } from '../Select';
import { MotadataSwitch } from '../Switch';
import { Tabs, TabsList, TabsTrigger } from '../Tabs';
import {
  Sheet,
  SheetBand,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from './Sheet';
import { SheetField, SheetFields, SheetIdentity, SheetSection } from './SheetParts';
import {
  SheetNavigation,
  SheetNavigationTitle,
  SheetPage,
  useSheetLeaveGuard,
  useSheetNavigation,
} from './SheetNavigation';
import type { SheetContentProps } from './Sheet.types';

type DrawerArgs = Pick<
  SheetContentProps,
  'size' | 'width' | 'side' | 'inset' | 'closeOnOutsideClick' | 'closeOnEscape' | 'overlay'
> & { modal?: boolean };

const meta: Meta<DrawerArgs> = {
  title: 'New Components/Drawer',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The console drawer: `Sheet` with `layout="drawer"`, composed from `SheetHeader`, `SheetBand` (an identity and tabs), ' +
          '`SheetBody` (with `SheetSection` and `SheetField`) and `SheetFooter` (Cancel pinned left, the verb right). ' +
          '**Pages inside one drawer:** a side panel turns into its next page in place, at the same width. Wrap the content ' +
          'in `SheetNavigation` and each page in `SheetPage`; `push` a page (Edit, a row of a list) and its content replaces ' +
          'the current one while `SheetNavigationTitle` turns the 14/600 title into the path - a real breadcrumb with no back ' +
          'button, every earlier step a way back to that page, underlined under the pointer (Pranjal, 2026-10-26). ' +
          '`useSheetLeaveGuard` lets a page ask about an unsaved draft before the trail leaves it. ' +
          '**Props to configure it** sit on `SheetContent`: `size` (sm 480 · md 560 · lg 720 · xl 780) or a free `width` ' +
          "(a number of pixels, or a CSS length such as '40%'), `side`, `inset`, " +
          '`closeOnOutsideClick`, `closeOnEscape` and `overlay`; `modal={false}` on `Sheet` keeps the page usable beside it.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Width: 480, 560, 720, 780',
    },
    width: {
      control: 'text',
      description:
        "A free width instead of size: pixels as a number (600) or any CSS length ('40%', '600px')",
    },
    side: { control: 'inline-radio', options: ['right', 'left'] },
    inset: {
      control: 'inline-radio',
      options: [16, 20, 24],
      description: 'Side inset of every region, px',
    },
    closeOnOutsideClick: { control: 'boolean', description: 'A press outside the panel closes it' },
    closeOnEscape: { control: 'boolean', description: 'Escape closes it' },
    overlay: { control: 'boolean', description: 'The scrim dims the page behind' },
    modal: {
      control: 'boolean',
      description: 'On Sheet: false keeps the page usable beside the panel',
    },
  },
  args: {
    size: 'lg',
    side: 'right',
    inset: 20,
    closeOnOutsideClick: true,
    closeOnEscape: true,
    overlay: true,
    modal: true,
  },
};
export default meta;
type Story = StoryObj<DrawerArgs>;

/** The ⋯ menu in an identity's actions. */
const More = ({ name }: { name: string }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        iconOnly
        ariaLabel={`More for ${name}`}
        leftIcon={<Icon name="more-horizontal" />}
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Duplicate</DropdownMenuItem>
      <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

/** The underline tabs a band holds, pulled onto the band's own hairline. */
const BandTabs = ({ tabs }: { tabs: string[] }) => {
  const [tab, setTab] = useState(tabs[0] ?? '');
  return (
    <Tabs value={tab} onValueChange={setTab} className="-mdt-mb-px">
      <TabsList type="underline" hairline>
        {tabs.map((t) => (
          <TabsTrigger key={t} value={t}>
            {t}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

/** Opens a drawer from a button, with the story's controls applied. */
const Opener = ({
  label,
  args,
  children,
}: {
  label: string;
  args: DrawerArgs;
  children: ReactNode;
}) => {
  const { modal, ...content } = args;
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen} {...(modal === undefined ? {} : { modal })}>
      <Button
        variant="outline"
        onClick={() => {
          setOpen(true);
        }}
      >
        {label}
      </Button>
      <SheetContent layout="drawer" aria-describedby={undefined} {...content}>
        {children}
      </SheetContent>
    </Sheet>
  );
};

const ROLES = [
  { title: 'Ticket Manager', description: 'Oversees ticket queues and SLA compliance' },
  { title: 'HR Manager', description: 'Human resources management with employee data access' },
];
const ORGS = ['Acme Technologies', 'Beta Innovations'];

/** The header of a navigable drawer: the first page's title, or the path - every earlier step a way back. */
const NavHeader = () => (
  <SheetHeader>
    <SheetTitle>
      <SheetNavigationTitle />
    </SheetTitle>
  </SheetHeader>
);

/** Edit opens the edit page inside the same drawer. */
const EditButton = ({ title }: { title: string }) => {
  const { push } = useSheetNavigation();
  return (
    <Button
      variant="outline"
      leftIcon={<Icon name="pencil" />}
      onClick={() => {
        push({ id: 'edit', title });
      }}
    >
      Edit
    </Button>
  );
};

/**
 * An edit page's frame on useForm: its fields inside a Form, then Cancel and Save.
 * Save stays off until something changed and every required field is filled; it
 * submits the form, so a wrong value shows its message and takes the focus. Back
 * and Cancel ask first while the draft is changed.
 */
const EditPage = <T extends Record<string, unknown>>({
  id,
  form,
  children,
}: {
  id: string;
  form: UseFormReturn<T>;
  children: ReactNode;
}) => {
  const { back } = useSheetNavigation();
  // the leave the person asked for (one step back, or a step of the trail), held while the drawer asks
  const [leaving, setLeaving] = useState<(() => void) | null>(null);
  useSheetLeaveGuard((leave) => {
    if (!form.dirty) return true;
    setLeaving(() => leave);
    return false;
  });
  return (
    <>
      <SheetBody>
        <Form id={id} onSubmit={form.handleSubmit}>
          {/* one child, so the form's own spacing never touches the sections' hairline rhythm */}
          <div>{children}</div>
        </Form>
      </SheetBody>
      <SheetFooter
        start={
          <Button
            variant="ghost"
            onClick={() => {
              back();
            }}
          >
            Cancel
          </Button>
        }
      >
        <Button type="submit" form={id} disabled={!form.canSubmit} loading={form.submitting}>
          Save changes
        </Button>
      </SheetFooter>
      <ConfirmDialog
        open={leaving !== null}
        onOpenChange={(open) => {
          if (!open) setLeaving(null);
        }}
        title="Discard unsaved changes?"
        confirmLabel="Discard"
        tone="destructive"
        confirmIcon={null}
        onConfirm={() => {
          leaving?.();
        }}
      >
        The changes on this page have not been saved.
      </ConfirmDialog>
    </>
  );
};

const AccessProfileEdit = () => {
  const { back } = useSheetNavigation();
  const form = useForm({
    initialValues: {
      name: 'Helpdesk Access',
      roles: ROLES.map((r) => r.title),
      all: false,
      orgs: ORGS,
    },
    rules: {
      name: { required: 'Enter a name for the access profile' },
      roles: { required: 'Pick at least one role' },
      orgs: { required: (v) => (v.all ? false : 'Pick at least one organization') },
    },
    onSubmit: () => {
      back({ force: true });
    },
  });
  return (
    <EditPage id="edit-access-profile" form={form}>
      <div className="mdt-flex mdt-flex-col mdt-gap-5">
        <p className="mdt-text-[13px] mdt-leading-5 mdt-text-neutral-90">
          Change the name, the roles or the reach. Everyone who holds it sees the change; each
          holder keeps their own end.
        </p>
        <Input label="Access profile name" {...form.field('name')} />
        <Select
          label="Select roles to assign"
          mode="multiple"
          showPills
          options={ROLES.map((r) => ({ value: r.title, label: r.title }))}
          {...form.field('roles')}
        />
        <div className="mdt-flex mdt-flex-col mdt-gap-2">
          <span className="mdt-text-[13px] mdt-font-medium mdt-text-neutral-90">
            Organization access *
          </span>
          <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-text-sm">
            <MotadataSwitch
              id="all-orgs"
              checked={form.values.all}
              onCheckedChange={(on) => {
                form.setValue('all', on);
              }}
            />
            <label htmlFor="all-orgs">Access to all organizations</label>
          </div>
          {!form.values.all && (
            <Select
              aria-label="Organizations"
              mode="multiple"
              showPills
              options={ORGS.map((o) => ({ value: o, label: o }))}
              {...form.field('orgs')}
            />
          )}
        </div>
      </div>
    </EditPage>
  );
};

/**
 * An object drawer whose Edit opens the edit page in place: the header turns into
 * "Access profiles › Edit access profile", and "Access profiles" brings the record back.
 */
export const ObjectDrawer: Story = {
  render: (args) => (
    <Opener label="Open Helpdesk Access" args={args}>
      <SheetNavigation root={{ id: 'view', title: 'Access profiles' }}>
        <NavHeader />
        <SheetPage id="view">
          <SheetBand>
            <SheetIdentity
              className="mdt-pb-3 mdt-pt-5"
              mark={<IconTile icon={<Icon name="key-round" />} tone="blue" size="xl" />}
              name="Helpdesk Access"
              status={
                <Badge tone="success" dot size="sm">
                  Active
                </Badge>
              }
              lines={[
                ['IT Support, Security Team', 'Teams'],
                ['Created by Natasha Manglore', '12 Aug 2026'],
              ]}
              actions={
                <>
                  <EditButton title="Edit access profile" />
                  <More name="Helpdesk Access" />
                </>
              }
            />
            <BandTabs tabs={['Details', 'People', 'Teams']} />
          </SheetBand>
          <SheetBody>
            <SheetSection title="Roles">
              {ROLES.map((r) => (
                <ActionCard
                  key={r.title}
                  icon={<Icon name="shield" />}
                  title={r.title}
                  description={r.description}
                />
              ))}
            </SheetSection>
            <SheetSection title="Organizations">
              {ORGS.map((o) => (
                <ActionCard
                  key={o}
                  icon={<Icon name="building-2" />}
                  title={o}
                  description="Client organization"
                />
              ))}
            </SheetSection>
          </SheetBody>
        </SheetPage>
        <SheetPage id="edit">
          <AccessProfileEdit />
        </SheetPage>
      </SheetNavigation>
    </Opener>
  ),
};

const SARAH = {
  mark: <Avatar name="Sarah Johnson" size="xl" />,
  name: 'Sarah Johnson',
  status: (
    <Badge tone="info" size="sm" icon={<Icon name="shield" />}>
      Tenant owner
    </Badge>
  ),
  lines: [['Human Resources Coordinator', 'HR Manager']],
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const UserEdit = () => {
  const { back } = useSheetNavigation();
  const form = useForm({
    initialValues: {
      fullName: 'Sarah Johnson',
      recovery: '',
      jobTitle: 'Human Resources Coordinator',
      vip: false,
    },
    rules: {
      fullName: { required: 'Enter a full name' },
      recovery: { validate: (v) => (EMAIL.test(v) ? undefined : 'Enter a valid email address') },
      jobTitle: { required: true },
    },
    onSubmit: () =>
      new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
          back({ force: true });
        }, 800);
      }),
  });
  return (
    <EditPage id="edit-user" form={form}>
      <SheetIdentity
        className="mdt-mb-5"
        {...SARAH}
        mark={<Avatar name="Sarah Johnson" size="xl" onEdit={() => undefined} />}
      />
      <SheetSection title="User details">
        <SheetField label="Source of truth">
          <Badge size="sm">Manual</Badge>
        </SheetField>
        <SheetField label="Full Name" htmlFor="fullName">
          <Input {...form.field('fullName')} />
        </SheetField>
        <SheetField label="Email" htmlFor="email">
          <Input id="email" locked value="sarah.johnson@company.com" readOnly />
        </SheetField>
        <SheetField label="Recovery email" htmlFor="recovery">
          <Input placeholder="Optional" {...form.field('recovery')} />
        </SheetField>
        <SheetField label="Phone number">
          <PhoneInput aria-label="Phone number" defaultValue="+1 (555) 0110" defaultCountry="US" />
        </SheetField>
        <SheetField label="Job title" htmlFor="jobTitle">
          <Input {...form.field('jobTitle')} />
        </SheetField>
        <SheetField label="VIP user">
          <MotadataSwitch
            aria-label="VIP user"
            checked={form.values.vip}
            onCheckedChange={(on) => {
              form.setValue('vip', on);
            }}
          />
        </SheetField>
      </SheetSection>
      <SheetSection
        title="Access details"
        hint="Set how long guest users can access your organization"
      >
        <SheetField label="Access started">Apr 1, 2026</SheetField>
        <SheetField label="Access expires on">Permanent</SheetField>
        <ActionCard
          title="Set an account expiry"
          description="Off means the account does not expire."
          actions={<MotadataSwitch aria-label="Set an account expiry" />}
        />
      </SheetSection>
    </EditPage>
  );
};

/**
 * Reading a record, and editing it in the same drawer: Edit turns the header into
 * "User management › Edit details". Save stays off until something changes; clear
 * the full name and it goes off again; type a bad recovery email and Save shows the
 * message and focuses the field. Change anything and press "User management" in the
 * trail - the drawer asks before the draft is lost.
 */
export const ProfileDrawer: Story = {
  render: (args) => (
    <Opener label="Open Sarah Johnson" args={args}>
      <SheetNavigation root={{ id: 'view', title: 'User management' }}>
        <NavHeader />
        <SheetPage id="view">
          <SheetBand>
            <SheetIdentity
              className="mdt-pb-3 mdt-pt-5"
              {...SARAH}
              actions={
                <>
                  <EditButton title="Edit details" />
                  <More name="Sarah Johnson" />
                </>
              }
            >
              <div className="mdt-grid mdt-grid-cols-2 mdt-divide-x mdt-divide-border mdt-rounded-xl mdt-bg-secondary mdt-py-3 mdt-text-[13px]">
                <div className="mdt-flex mdt-flex-col mdt-gap-1 mdt-px-4">
                  <span className="mdt-text-neutral-90">Email</span>
                  <span className="mdt-font-medium">sarah.johnson@company.com</span>
                </div>
                <div className="mdt-flex mdt-flex-col mdt-gap-1 mdt-px-4">
                  <span className="mdt-text-neutral-90">Phone number</span>
                  <span className="mdt-font-medium">+1 (555) 0110</span>
                </div>
              </div>
            </SheetIdentity>
            <BandTabs
              tabs={['About', 'Access profiles', 'Teams', 'Effective Permissions', 'Sessions']}
            />
          </SheetBand>
          <SheetBody>
            <SheetSection title="User details">
              <SheetFields>
                <SheetField label="Source of truth">
                  <Badge size="sm">Manual</Badge>
                </SheetField>
                <SheetField label="Email">sarah.johnson@company.com</SheetField>
                <SheetField label="Phone number">+1 (555) 0110</SheetField>
                <SheetField label="Access until">Permanent</SheetField>
                <SheetField label="VIP user" />
              </SheetFields>
            </SheetSection>
            <SheetSection title="Additional attributes">
              <SheetFields>
                <SheetField label="Bio" />
                <SheetField label="Location Area" />
                <SheetField label="Blood Group" />
              </SheetFields>
            </SheetSection>
            <SheetSection title="Organization access">
              <div className="mdt-flex mdt-flex-wrap mdt-gap-2">
                {[
                  'MSP owner organization',
                  'Acme Technologies',
                  'Beta Innovations',
                  'Support Ops India',
                ].map((o) => (
                  <Badge key={o} size="sm">
                    {o}
                  </Badge>
                ))}
              </div>
            </SheetSection>
          </SheetBody>
        </SheetPage>
        <SheetPage id="edit">
          <UserEdit />
        </SheetPage>
      </SheetNavigation>
    </Opener>
  ),
};

/** A page that opens another page: the path grows one step at a time, and any step of it goes back there. */
const Step = ({ id, next }: { id: string; next?: string }) => {
  const { push, depth, reset } = useSheetNavigation();
  return (
    <SheetBody>
      <SheetSection title={`Page ${String(depth + 1)}`} hint={`id "${id}"`}>
        {next !== undefined && (
          <Button
            variant="outline"
            onClick={() => {
              push({ id: next, title: next.charAt(0).toUpperCase() + next.slice(1) });
            }}
          >
            Open {next}
          </Button>
        )}
        {depth > 0 && (
          <Button variant="ghost" onClick={reset}>
            Back to the first page
          </Button>
        )}
      </SheetSection>
    </SheetBody>
  );
};

/**
 * Pages are not limited to two: any page can push another, and the trail grows with them -
 * "Teams › Members › Permissions". Press "Teams" from the third page and the drawer goes
 * straight back to the first.
 */
export const NestedPages: Story = {
  args: { size: 'md' },
  render: (args) => (
    <Opener label="Open team" args={args}>
      <SheetNavigation root={{ id: 'team', title: 'Teams' }}>
        <NavHeader />
        <SheetPage id="team">
          <Step id="team" next="members" />
        </SheetPage>
        <SheetPage id="members">
          <Step id="members" next="permissions" />
        </SheetPage>
        <SheetPage id="permissions">
          <Step id="permissions" />
        </SheetPage>
      </SheetNavigation>
    </Opener>
  ),
};

interface Problem {
  id: string;
  title: string;
  line: string;
  detail: string[];
  agents: [string, string][];
}

/* the Agent Fleet Health "Needs attention" drawer's content (the console's Overview.tsx), cut down */
const PROBLEMS: Problem[] = [
  {
    id: 'crashing',
    title: 'Crashing modules',
    line: '125 hosts with a crashing module',
    detail: ['Metrics on 40', 'Logs on 30', 'Patch on 19'],
    agents: [
      ['node-32-0029', 'Retail core'],
      ['edge-36-0071', 'Retail stores'],
      ['svc-36-0223', 'Retail stores'],
    ],
  },
  {
    id: 'silent',
    title: 'Silent agents',
    line: '32 agents silent',
    detail: ['18 silent for more than a day', 'the longest for 47h'],
    agents: [
      ['edge-32-0030', 'Retail core'],
      ['db-36-0237', 'Retail stores'],
    ],
  },
  {
    id: 'holding',
    title: 'Holding data',
    line: '26 agents holding data',
    detail: ['Cannot reach the platform', '348,117 events waiting on the hosts'],
    agents: [['web-32-0617', 'Retail core']],
  },
];

/** The list page: one card a problem, the whole card the way into its page. */
const ProblemList = ({ onPick }: { onPick: (problem: Problem) => void }) => {
  const { push } = useSheetNavigation();
  return (
    <SheetBody>
      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        {PROBLEMS.map((p) => (
          <ActionCard
            key={p.id}
            icon={<Icon name="tabler-alert-triangle" />}
            title={p.line}
            description={p.detail}
            onClick={() => {
              onPick(p);
              push({ id: 'problem', title: p.title });
            }}
          />
        ))}
      </div>
    </SheetBody>
  );
};

/** A problem's page: why it is here, and the agents it touches. */
const ProblemPage = ({ problem }: { problem: Problem | null }) => (
  <SheetBody>
    <SheetSection title="Why it is here" hint={problem?.detail.join(' · ')}>
      {problem?.agents.map(([name, zone]) => (
        <SheetField key={name} label={name}>
          {zone}
        </SheetField>
      ))}
    </SheetSection>
  </SheetBody>
);

/** The Needs attention drawer: the list, and each problem a page of it under the trail. */
const NeedsAttention = () => {
  const [problem, setProblem] = useState<Problem | null>(null);
  return (
    <SheetNavigation root={{ id: 'list', title: 'Needs attention' }}>
      <NavHeader />
      <SheetPage id="list">
        <ProblemList onPick={setProblem} />
      </SheetPage>
      <SheetPage id="problem">
        <ProblemPage problem={problem} />
      </SheetPage>
      {/* one footer every page shares, after the pages */}
      <SheetFooter
        start={
          <SheetClose asChild>
            <Button variant="ghost">Close</Button>
          </SheetClose>
        }
      />
    </SheetNavigation>
  );
};

/**
 * A list whose rows open as pages of the same drawer (the console's Agent Fleet Health
 * "Needs attention", Pranjal 2026-10-26: "whenever i open the need attention ... it should be
 * in breadcrumb so that i can come back to view all"): press a problem and the drawer turns
 * into its page in place, at the same 720, titled "Needs attention › Crashing modules". There
 * is no back button - "Needs attention" is the way back, underlined under the pointer. Close
 * stays in the footer on every page. The console's drawer keeps the default 24 inset.
 */
export const ListToPage: Story = {
  args: { size: 'lg', inset: 24 },
  render: (args) => (
    <Opener label="Open Needs attention" args={args}>
      <NeedsAttention />
    </Opener>
  ),
};

/**
 * The same drawer, opened and on a problem's page by a real click each - the trail as it
 * stands while a page shows. Press "Needs attention" to go back to the list.
 */
export const ListToPageOpen: Story = {
  name: 'List to page · on the page',
  args: { size: 'lg', inset: 24 },
  render: (args) => (
    <Opener label="Open Needs attention" args={args}>
      <NeedsAttention />
    </Opener>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole('button', { name: 'Open Needs attention' })
    );
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(await body.findByRole('button', { name: /125 hosts/ }));
    await expect(
      await body.findByRole('button', { name: 'Back to Needs attention' })
    ).toBeInTheDocument();
  },
};

/**
 * Every option at once - change them in the controls panel and reopen. Turn off
 * `closeOnOutsideClick` for a form a stray click would lose, `overlay` and
 * `modal` for a panel that sits beside a page still in use.
 */
export const ClosingOptions: Story = {
  args: { size: 'md', closeOnOutsideClick: false },
  render: (args) => (
    <Opener label="Open drawer" args={args}>
      <SheetHeader>
        <SheetTitle>Drawer options</SheetTitle>
      </SheetHeader>
      <SheetBody>
        <SheetSection title="This drawer">
          <SheetField label="Width">{args.width ?? args.size}</SheetField>
          <SheetField label="Closes on outside click">
            {args.closeOnOutsideClick ? 'Yes' : 'No'}
          </SheetField>
          <SheetField label="Closes on Escape">{args.closeOnEscape ? 'Yes' : 'No'}</SheetField>
          <SheetField label="Scrim">{args.overlay ? 'On' : 'Off'}</SheetField>
          <SheetField label="Page usable beside it">
            {args.modal === false ? 'Yes' : 'No'}
          </SheetField>
        </SheetSection>
      </SheetBody>
      <SheetFooter
        start={
          <SheetClose asChild>
            <Button variant="ghost">Close</Button>
          </SheetClose>
        }
      />
    </Opener>
  ),
};
