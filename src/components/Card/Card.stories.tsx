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
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { IconTile } from '../IconTile';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
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
          '| `surface` | filled / secondary / outline / elevated |',
          '| `padding` | normal 20px / compact 14px / none |',
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

/** The four surfaces, on the page colour. A tinted panel flatters every border. */
export const Surfaces: Story = {
  render: () => (
    <Grid>
      <Card>
        <CardHeader
          heading="Filled"
          supporting="The default. White on white, so the border is the only thing giving it a shape."
        />
        <CardBody>Contrast against the page: 1.00. Its border cannot be removed.</CardBody>
      </Card>
      <Card surface="secondary">
        <CardHeader
          heading="Secondary"
          supporting="A quiet block inside a busier area. The fill does the work."
        />
        <CardBody>1.14 light, 1.26 dark, so it needs no border at all.</CardBody>
      </Card>
      <Card surface="outline">
        <CardHeader
          heading="Outline"
          supporting="Border only, no fill. It sits on whatever colour is behind it."
        />
        <CardBody>For an already-tinted area, where a white card looks like a patch.</CardBody>
      </Card>
      <Card surface="elevated">
        <CardHeader
          heading="Elevated"
          supporting="A shadow instead of a border, for anything you pick up and move."
        />
        <CardBody>In dark it lifts by making the surface lighter, not the shadow darker.</CardBody>
      </Card>
    </Grid>
  ),
};

/** Media, header, body and footer. All optional, always in that order. */
export const AllFourParts: Story = {
  render: () => (
    <div className="mdt-max-w-md">
      <Card>
        <CardMedia>
          <div className="mdt-h-32 mdt-w-full mdt-bg-gradient-to-br mdt-from-blue-70 mdt-to-purple-80" />
        </CardMedia>
        <CardHeader
          leading={<IconTile icon={<Icon name="server" aria-hidden />} tone="blue" />}
          eyebrow="Change request"
          heading="Firewall rule update, DC-West"
          supporting="Scheduled maintenance window, Saturday 02:00 to 04:00 IST."
          meta="Raised by Riya Kulkarni, 2 days ago"
          trailing={<Badge tone="warning">Awaiting CAB</Badge>}
        />
        <CardBody>
          Nine rules affected across two clusters. Rollback plan attached and verified in staging.
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

/** 20px, 14px, or none, for content that brings its own spacing. */
export const Padding: Story = {
  render: () => (
    <Grid cols={3}>
      <Card>
        <CardHeader heading="Payment gateway" supporting="normal, 20px, the default." />
      </Card>
      <Card padding="compact">
        <CardHeader heading="Payment gateway" supporting="compact, 14px, for dense lists." />
      </Card>
      <Card padding="none">
        <CardMedia>
          <div className="mdt-h-24 mdt-w-full mdt-bg-gradient-to-br mdt-from-green-70 mdt-to-blue-70" />
        </CardMedia>
      </Card>
    </Grid>
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
          meta="Checked 4 minutes ago"
          trailing={<Badge tone="success">Healthy</Badge>}
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
    <Grid cols={3}>
      {[
        ['INC-4468', 'VPN drops for remote staff', 'Network'],
        ['INC-4469', 'Printer offline, 3rd floor', 'Hardware'],
        ['INC-4470', 'SSO login loop after update', 'Identity'],
      ].map(([id, title, team]) => (
        <ClickableCard key={id} onClick={(args as { onClick?: () => void }).onClick}>
          <CardHeader eyebrow={id} heading={title} />
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
 * line drops because there is nothing left underneath for it to divide.
 */
export const Collapsible: Story = {
  args: { onOpenChange: fn() } as never,
  render: (args) => (
    <Grid>
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
