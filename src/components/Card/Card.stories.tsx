import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardMedia,
  ClickableCard,
  CollapsibleCard,
} from './Card';
import type { CardPadding, CardSurface } from './Card.types';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { IconTile } from '../IconTile';
import { InfoTip } from '../InfoTip';
import { KpiCard } from '../KpiCard';
import { PickCard } from '../SelectableCard';
import { MotadataSwitch } from '../Switch';

const meta: Meta<typeof Card> = {
  title: 'New Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A surface that holds related content in the page.',
          '',
          '**It does not open, close, float, or freeze the page behind it.** Those are Modal',
          'and Popover, which borrow this surface and add their own behaviour on top. The',
          'one-line test: if it *opens*, it is not a Card.',
          '',
          '| Prop | What it does |',
          '| --- | --- |',
          '| `surface` | borderless / filled / secondary / outline / elevated |',
          '| `padding` | normal 20px / medium 16px / compact 14px / none |',
          '',
          '**One inset governs every part**, which is why the eyebrow, the heading, the body',
          'text and the footer all start on the same vertical line.',
          '',
          '**The header is a region, not a label - so it carries a line.** Collapse a card and',
          'the header is the whole card, so its edge has to be real. `plain` opts out, for the',
          'rarer case where the title only names the rows directly beneath it.',
          '',
          '**Clickable and collapsible are separate components.** A control inside a control is',
          'invalid and unreachable by keyboard, so `ClickableCard` and `CollapsibleCard` make',
          'that combination impossible to write rather than merely discouraged.',
          '',
          '**A nested card is never the answer.** To group content inside a card, use a quiet',
          'block with no border and no shadow of its own, so it reads as a section of that card',
          'rather than a competing object.',
          '',
          '**The problem card, the org card and the module card at the end are this card**, with',
          'different things inside, not components of their own. The pick card, the contact strip',
          'and the KPI card sit with them, and are parts the library already has.',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Grid = ({ children, cols = 2 }: { children: React.ReactNode; cols?: number }) => (
  <div
    className="mdt-grid mdt-items-start mdt-gap-5"
    style={{ gridTemplateColumns: `repeat(${String(cols)}, minmax(0, 1fr))` }}
  >
    {children}
  </div>
);

const Rows = () => (
  <dl className="mdt-m-0 mdt-flex mdt-flex-col mdt-gap-2">
    {[
      ['Hostname', 'dc-west-04'],
      ['Owner', 'Network Ops'],
      ['Warranty', '14 Mar 2027'],
    ].map(([k, v]) => (
      <div key={k} className="mdt-flex mdt-items-baseline mdt-justify-between mdt-gap-4">
        <dt className="mdt-m-0 mdt-text-muted-foreground">{k}</dt>
        <dd className="mdt-m-0 mdt-font-semibold">{v}</dd>
      </div>
    ))}
  </dl>
);

const LOOKS: {
  surface: CardSurface;
  name: string;
  says: string;
  warns?: string;
  facts: [string, string][];
}[] = [
  {
    surface: 'borderless',
    name: 'Background only',
    says: 'A tint with no border, for a block that should stand out without an edge.',
    warns: 'A neutral pill is this same colour in light, so it melts in.',
    facts: [
      ['Fill', 'neutral-20'],
      ['Edge', 'None'],
      ['Against the page', '1.13 light, 1.32 dark'],
    ],
  },
  {
    surface: 'filled',
    name: 'With border',
    says: 'The default. Any section or list item on the page.',
    facts: [
      ['Fill', 'card'],
      ['Edge', '1 px, neutral-20'],
      ['Edge against page', '1.13 light, 1.32 dark'],
    ],
  },
  {
    surface: 'secondary',
    name: 'Secondary',
    says: 'For a quiet block that should recede, like the Users drawer contact strip.',
    warns: 'On a tinted area of the same colour it disappears.',
    facts: [
      ['Fill', 'secondary'],
      ['Edge', 'None'],
      ['Against the page', '1.05 light, 1.05 dark'],
    ],
  },
  {
    surface: 'outline',
    name: 'Outline',
    says: 'An edge and no fill, so a tinted area shows through. The org card uses it.',
    facts: [
      ['Fill', 'None'],
      ['Edge', '1 px, neutral-20'],
    ],
  },
  {
    surface: 'elevated',
    name: 'Elevated',
    says: 'A shadow in place of an edge, for anything you pick up and move.',
    facts: [
      ['Fill', 'card'],
      ['Edge', 'None, a shadow, and a faint ring in dark'],
    ],
  },
];

const Ground = ({ surface, tinted }: { surface: CardSurface; tinted?: boolean }) => (
  <div
    className="mdt-flex mdt-min-w-0 mdt-flex-col mdt-gap-2"
    data-ground={tinted ? 'tinted' : 'page'}
  >
    <span className="mdt-text-xs mdt-leading-4 mdt-text-neutral-60">
      {tinted ? 'On a tinted area' : 'On the page'}
    </span>
    <div
      className={[
        'mdt-flex mdt-flex-1 mdt-flex-col mdt-justify-center mdt-rounded-[8px] mdt-border mdt-border-dashed mdt-border-neutral-40 mdt-p-4',
        tinted ? 'mdt-bg-secondary' : 'mdt-bg-background',
      ].join(' ')}
    >
      <Card surface={surface}>
        <CardHeader
          heading="What it carries"
          supporting="184 agents and 6 scans go through col-iad-01."
        />
      </Card>
    </div>
  </div>
);

/** One row per look, the same card on both grounds. Only the surface changes: the corner and the inset do not. */
export const Surfaces: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col">
      {LOOKS.map((look) => (
        <div
          key={look.surface}
          data-look={look.surface}
          className="mdt-grid mdt-gap-x-5 mdt-gap-y-4 mdt-border-0 mdt-border-t mdt-border-solid mdt-border-neutral-20 mdt-py-5"
          style={{ gridTemplateColumns: 'minmax(0, 268px) minmax(0, 1fr) minmax(0, 1fr)' }}
        >
          <div className="mdt-min-w-0">
            <h3 className="mdt-m-0 mdt-text-sm mdt-font-semibold mdt-leading-5">{look.name}</h3>
            <p className="mdt-m-0 mdt-mt-1 mdt-text-[13px] mdt-leading-5 mdt-text-neutral-90">
              {look.says}
            </p>
            {look.warns ? (
              <p className="mdt-m-0 mdt-mt-2 mdt-text-[13px] mdt-leading-5 mdt-text-orange-80">
                {look.warns}
              </p>
            ) : null}
            <dl
              className="mdt-m-0 mdt-mt-2.5 mdt-grid mdt-gap-x-3 mdt-gap-y-0.5 mdt-text-xs mdt-leading-[18px]"
              style={{ gridTemplateColumns: 'auto minmax(0, 1fr)' }}
            >
              {look.facts.map(([k, v]) => (
                <div key={k} className="mdt-contents">
                  <dt className="mdt-text-neutral-60">{k}</dt>
                  <dd className="mdt-m-0 mdt-min-w-0">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Ground surface={look.surface} />
          <Ground surface={look.surface} tinted />
        </div>
      ))}
    </div>
  ),
};

/**
 * Header, body and footer. Three regions, so two lines: each one marks where a
 * region ends and the next begins.
 */
export const HeaderBodyFooter: Story = {
  render: () => (
    <div className="mdt-max-w-md">
      <Card>
        <CardHeader
          leading={<IconTile icon={<Icon name="server" aria-hidden />} tone="blue" />}
          heading="Firewall rule update, DC-West"
          supporting="Raised by Riya Kulkarni, 2 days ago"
        />
        <CardBody>
          {/* items-start, or the badge stretches to the column's full width */}
          <div className="mdt-flex mdt-flex-col mdt-items-start mdt-gap-3">
            <Badge tone="warning">Awaiting CAB</Badge>
            <p className="mdt-m-0">
              Nine rules affected across two clusters. Rollback plan attached and verified in
              staging.
            </p>
          </div>
        </CardBody>
        <CardFooter
          meta="3 approvals needed"
          actions={
            <>
              <Button variant="outline" size="sm">
                Details
              </Button>
              <Button size="sm">Approve</Button>
            </>
          }
        />
      </Card>
    </div>
  ),
};

/**
 * **Media and the block under it are one unit.** The image already separates the
 * top of the card, so the header after it drops its line automatically. Without
 * that you get four stacked bands and the card reads as a stack of strips.
 *
 * There is nothing to remember and no prop to set: the four-band version cannot
 * be built by accident.
 */
export const WithMedia: Story = {
  render: () => (
    <div className="mdt-max-w-md">
      <Card>
        <CardMedia>
          <div className="mdt-h-32 mdt-w-full mdt-bg-gradient-to-br mdt-from-blue-70 mdt-to-purple-80" />
        </CardMedia>
        <CardHeader
          heading="Firewall rule update, DC-West"
          supporting="Nine rules affected across two clusters. Rollback plan attached and verified in staging."
        />
        <CardFooter
          meta="3 approvals needed"
          actions={
            <>
              <Button variant="outline" size="sm">
                Details
              </Button>
              <Button size="sm">Approve</Button>
            </>
          }
        />
      </Card>
    </div>
  ),
};

/**
 * The header is a region, not a label, so the line is on by default. `plain` is
 * the opt-out, for a title that only names the rows directly beneath it.
 */
export const TheHeaderLine: Story = {
  render: () => (
    <Grid cols={3}>
      <Card>
        <CardHeader heading="Asset summary" supporting="Dell PowerEdge R750, rack 12." />
        <CardBody>
          <Rows />
        </CardBody>
      </Card>
      <Card>
        <CardHeader heading="Asset summary" plain />
        <CardBody>
          <Rows />
        </CardBody>
      </Card>
      <Card>
        <CardHeader
          heading="Asset summary"
          trailing={
            <Button variant="ghost" size="sm" aria-label="More options">
              <Icon name="more-vertical" size="sm" aria-hidden />
            </Button>
          }
        />
        <CardBody>
          <Rows />
        </CardBody>
        <CardFooter
          meta="Synced 4 min ago"
          actions={
            <Button variant="outline" size="sm">
              Open asset
            </Button>
          }
        />
      </Card>
    </Grid>
  ),
};

const INSETS: { padding: CardPadding; name: string; says: string }[] = [
  { padding: 'normal', name: 'Normal, 20', says: 'The default.' },
  { padding: 'medium', name: 'Medium, 16', says: 'For cards that repeat in a stack.' },
  { padding: 'compact', name: 'Compact, 14', says: 'For long lists and narrow side areas.' },
  { padding: 'none', name: 'None, 0', says: 'For a table or image that must reach the edges.' },
];

/** One setting moves the header, body and footer together, so everything starts on the same line. */
export const Padding: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-2">
      {INSETS.map(({ padding, name, says }) => (
        <Card key={padding} padding={padding} data-inset={padding}>
          <CardBody>
            <span className="mdt-block mdt-text-sm mdt-font-semibold mdt-leading-5">{name}</span>
            <span className="mdt-block mdt-text-[13px] mdt-leading-5 mdt-text-neutral-90">
              {says}
            </span>
          </CardBody>
        </Card>
      ))}
    </div>
  ),
};

/**
 * To group content inside a card, use a quiet block, **not a nested card.** A
 * nested card brings its own edge and competes with its parent.
 */
export const AnInsetPanel: Story = {
  render: () => (
    <div className="mdt-max-w-sm">
      <Card>
        <CardHeader
          leading={<IconTile icon={<Icon name="shield-check" aria-hidden />} tone="green" />}
          heading="Identity provider"
          supporting="Checked 4 minutes ago"
        />
        <CardBody>
          <div className="mdt-flex mdt-flex-col mdt-gap-2 mdt-rounded-md mdt-bg-secondary mdt-p-3">
            <p className="mdt-m-0 mdt-text-xs mdt-font-semibold mdt-uppercase mdt-tracking-wider mdt-text-muted-foreground">
              Last 30 days
            </p>
            {[
              ['Uptime', '99.98%'],
              ['Requests today', '1.24M'],
            ].map(([k, v]) => (
              <div key={k} className="mdt-flex mdt-items-baseline mdt-justify-between mdt-gap-4">
                <span className="mdt-text-muted-foreground">{k}</span>
                <span className="mdt-font-semibold">{v}</span>
              </div>
            ))}
          </div>
        </CardBody>
        <CardFooter
          actions={
            <>
              <Button variant="outline" size="sm">
                Logs
              </Button>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </>
          }
        />
      </Card>
    </div>
  ),
};

/**
 * The whole card is one target. **It cannot contain buttons.** That is why it is
 * its own component rather than a switch.
 */
export const Clickable: Story = {
  args: { onClick: fn() } as never,
  render: (args) => (
    <Grid cols={1}>
      {[
        ['INC-4468', 'VPN drops for remote staff', 'Network'],
        ['INC-4469', 'Printer offline, 3rd floor', 'Hardware'],
        ['INC-4470', 'SSO login loop after update', 'Identity'],
      ].map(([id, title, team]) => (
        <ClickableCard key={id} onClick={(args as { onClick?: () => void }).onClick}>
          <CardHeader heading={title} supporting={id} />
          <CardBody>
            <Badge tone="neutral">{team}</Badge>
          </CardBody>
        </ClickableCard>
      ))}
    </Grid>
  ),
};

/**
 * The header **is** the control. Collapsed, the header is the whole card, and its
 * line drops because there is nothing left underneath for it to divide. The header
 * is 16 top and bottom in both states, so a shut card's words sit in its middle and
 * the title does not move when it opens.
 */
export const Collapsible: Story = {
  args: { onOpenChange: fn() } as never,
  render: (args) => (
    // Stacked, not side by side: a shut card is 79px and an open one is 199px,
    // so putting them in a row leaves a dead strip beside the shut one.
    <Grid cols={1}>
      <CollapsibleCard
        header={{ heading: 'Related changes', supporting: '3 linked to this incident' }}
        onOpenChange={(args as { onOpenChange?: (o: boolean) => void }).onOpenChange}
      >
        <Rows />
      </CollapsibleCard>
      <CollapsibleCard
        defaultOpen
        header={{ heading: 'Related changes', supporting: '3 linked to this incident' }}
        onOpenChange={(args as { onOpenChange?: (o: boolean) => void }).onOpenChange}
      >
        <Rows />
      </CollapsibleCard>
    </Grid>
  ),
};

/* ─── Made from the card: no component of their own, this card plus what is listed ─── */

const ROW = [
  'mdt-group mdt-relative mdt-box-border mdt-grid mdt-w-auto mdt-cursor-pointer mdt-grid-cols-[32px_minmax(0,1fr)_auto]',
  'mdt-items-center mdt-gap-x-4 mdt-gap-y-3 -mdt-mx-2.5 mdt-rounded-[8px] mdt-border-0 mdt-bg-transparent',
  'mdt-py-2.5 mdt-pl-2.5 mdt-pr-[18px] mdt-text-left mdt-font-[inherit] mdt-text-sm mdt-leading-normal mdt-text-foreground',
  'hover:mdt-bg-accent focus-visible:mdt-bg-accent',
  'focus-visible:mdt-outline focus-visible:mdt-outline-2 focus-visible:-mdt-outline-offset-2 focus-visible:mdt-outline-ring',
  "before:[&+&]:mdt-absolute before:[&+&]:mdt-left-2.5 before:[&+&]:mdt-right-2.5 before:[&+&]:mdt-top-0 before:[&+&]:mdt-content-['']",
  'before:[&+&]:mdt-border-0 before:[&+&]:mdt-border-t before:[&+&]:mdt-border-solid before:[&+&]:mdt-border-neutral-20',
  'before:[&+&:hover]:mdt-border-transparent before:[&+&:focus-visible]:mdt-border-transparent',
  'before:[&:hover+&]:mdt-border-transparent before:[&:focus-visible+&]:mdt-border-transparent',
].join(' ');

const PROBLEMS: [string, string, string][] = [
  ['125', 'hosts with a crashing module', 'Metrics on 40 · Logs on 30 · Patch on 19'],
  ['32', 'agents silent', '18 silent for more than a day · the longest for 47h'],
  ['26', 'agents holding data', 'Cannot reach the platform · 348,117 events waiting on the hosts'],
  ['24', "hosts over the agent's resource budget", 'CPU on 20 · memory on 22 · network on 6'],
];

/**
 * Health's Needs attention, in both fleets: **With border**, a plain header, then rows. A row is one button: a round
 * 32 tile tinted by its level (rose, amber, blue), a title with its count in 600, one detail line, and View on hover.
 */
export const ProblemCard: Story = {
  render: () => (
    <div className="mdt-max-w-[436px]">
      <Card data-frame="problem-card">
        <CardHeader
          plain
          heading={
            <span className="mdt-inline-flex mdt-items-center mdt-gap-2">
              Needs attention
              <InfoTip label="What needs attention">
                The worst problems in the fleet, worst first.
              </InfoTip>
            </span>
          }
        />
        <CardBody>
          <div className="mdt-flex mdt-flex-col">
            {PROBLEMS.map(([count, title, detail]) => (
              <button key={title} type="button" className={ROW} data-frame="problem-row">
                <IconTile
                  size="md"
                  shape="circle"
                  tone="amber"
                  aria-label="Warning"
                  icon={<Icon name="alert-triangle" size={16} />}
                />
                <span className="mdt-flex mdt-min-w-0 mdt-flex-col">
                  <span className="mdt-truncate mdt-text-[13px] mdt-font-medium mdt-leading-5 mdt-text-foreground">
                    <span className="mdt-font-semibold">{count}</span> {title}
                  </span>
                  <span className="mdt-truncate mdt-text-xs mdt-leading-4 mdt-text-faint">
                    {detail}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="mdt-whitespace-nowrap mdt-text-[13px] mdt-font-medium mdt-leading-5 mdt-text-neutral-90 mdt-underline mdt-underline-offset-[3px] mdt-opacity-0 group-hover:mdt-opacity-100 group-focus-visible:mdt-opacity-100"
                >
                  View
                </span>
              </button>
            ))}
          </div>
          <Button variant="outline" className="mdt-mt-2.5 mdt-w-full" data-frame="problem-all">
            View all 7
          </Button>
        </CardBody>
      </Card>
    </div>
  ),
};

/** Says which organization a thing belongs to: **Outline**, 8 in, a 40 blue tile, the name, one line under it. */
export const OrgCard: Story = {
  render: () => (
    <Card surface="outline" padding="none" data-frame="org-card">
      <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-p-2">
        <span
          aria-hidden="true"
          className="mdt-grid mdt-h-10 mdt-w-10 mdt-flex-none mdt-place-items-center mdt-rounded-[10px]"
          style={{
            background: 'hsl(var(--mdt-avatar-blue-fill))',
            color: 'hsl(var(--mdt-avatar-blue-ink))',
          }}
        >
          <Icon name="building" size={20} aria-hidden />
        </span>
        <span className="mdt-flex mdt-min-w-0 mdt-flex-col">
          <span className="mdt-text-sm mdt-font-medium">MSP owner organization</span>
          <span className="mdt-mt-px mdt-text-xs mdt-leading-[1.5] mdt-text-faint">
            Owned in the active frame; its access can still reach client organizations below.
          </span>
        </span>
      </div>
    </Card>
  ),
};

/** A choice already made, with Change on hover. It is the library's own PickCard, so it is reused here, not redrawn. */
export const PickCardLook: Story = {
  name: 'Pick card',
  render: () => (
    <PickCard
      icon={<Icon name="radio" />}
      title="Via the collector mapped in its network zone"
      description="Only through its zone's collector; waits if it is down"
      aria-label="How it ships: via the collector mapped in its network zone. Change"
    />
  ),
};

const ModuleRow = ({ name, core }: { name: string; core?: boolean }) => (
  <Card padding="medium" data-frame="module-card">
    <CardBody
      className="mdt-grid mdt-items-center mdt-gap-x-4 mdt-gap-y-1.5"
      style={{ gridTemplateColumns: 'minmax(0, 1fr) 120px 168px 128px' }}
    >
      <span className="mdt-inline-flex mdt-min-w-0 mdt-items-center mdt-gap-2">
        <span className="mdt-truncate mdt-text-sm mdt-font-medium mdt-leading-5 mdt-text-neutral-150">
          {name}
        </span>
        {core ? (
          <Badge size="sm" tone="neutral" shape="square">
            Core
          </Badge>
        ) : null}
      </span>
      <span className="mdt-inline-flex mdt-min-w-0 mdt-items-center">
        <Badge size="sm" tone="success" dot>
          Healthy
        </Badge>
      </span>
      {core ? (
        <span className="-mdt-ml-1 mdt-inline-flex mdt-min-h-7 mdt-items-center mdt-gap-2 mdt-px-1 mdt-text-xs mdt-font-medium mdt-leading-4 mdt-text-neutral-70">
          <Icon name="lock" size={14} aria-hidden />
          Always on
        </span>
      ) : (
        <span className="-mdt-ml-1 mdt-inline-flex mdt-min-h-7 mdt-items-center mdt-gap-2 mdt-px-1 mdt-text-xs mdt-font-medium mdt-leading-4 mdt-text-neutral-90">
          <MotadataSwitch size="sm" defaultChecked aria-label={name} />
          Enabled
        </span>
      )}
      <span className="mdt-inline-flex mdt-justify-self-end">
        <Button
          variant="ghost"
          size="sm"
          rightIcon={<Icon name="arrow-right" size={16} aria-hidden />}
        >
          View details
        </Button>
      </span>
    </CardBody>
  </Card>
);

/** One module in a stack, 8 apart: **With border** at the 16 inset, its name, health, its switch or lock, and a door. */
export const ModuleCard: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-2">
      <ModuleRow name="Metrics" core />
      <ModuleRow name="Patch" />
    </div>
  ),
};

/** The Users drawer's contact strip, where the Secondary colour came from. It is the library's KPI group, with no edge. */
export const ContactStrip: Story = {
  render: () => (
    <KpiCard
      style={{ width: '100%', background: 'hsl(var(--mdt-secondary))', border: 'none' }}
      items={[
        {
          label: 'Email',
          value: (
            <span className="mdt-block mdt-min-w-0 mdt-truncate mdt-text-[13px] mdt-leading-[1.5]">
              sarah.johnson@acme.com
            </span>
          ),
        },
        {
          label: 'Phone number',
          value: (
            <span className="mdt-block mdt-min-w-0 mdt-truncate mdt-text-[13px] mdt-leading-[1.5]">
              +1 415 555 0142
            </span>
          ),
        },
      ]}
    />
  ),
};

/** A figure with its label. It stays its own library part, because it also carries charts and a verdict chip. */
export const KpiFigure: Story = {
  name: 'KPI card',
  render: () => <KpiCard label="Agents sending data" value="2,102" hint="of 2,134" />,
};
