import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../DropdownMenu';
import { Icon } from '../Icon';
import { SheetField, SheetFields } from '../Sheet';
import { TagPill } from '../TagPill';
import { KeyValueList, KeyValueItem } from './KeyValueList';
import { LogRow } from './LogRow';
import { Row, RowList, RowTitle } from './RowList';
import { SelectableRow } from './SelectableRow';
import { Timeline, TimelineItem } from './Timeline';

/**
 * The console's row family - every list that is not a table, on one geometry.
 *
 * Ported from the console's `src/ui/RowList.jsx` and its CSS layer (Pranjal, 2026-10-28), which 32 product files use:
 * Users, Teams, Roles, Service accounts, Access profiles, Organizations, Agent Fleet's Health, Collector Fleet,
 * Credential profiles. The fact rows of every About tab and profile are the library's `SheetField`, shown here
 * beside the rest of the family.
 */
const meta: Meta<typeof RowList> = {
  title: 'New Components/RowList',
  component: RowList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Every list that is not a table: one frame, one separator, one hover, the table’s three row heights.',
          '',
          '| Part | What it is |',
          '| --- | --- |',
          '| `RowList` | the frame: `density` default (54) / two-line / compact (36), `bordered` |',
          '| `Row` | one record - `leading`, the text, `actions`; a real button with `onClick`; `selected`, `state` |',
          '| `RowTitle` | a row’s name 12/500 over a quiet 11 line, badges beside the name |',
          '| `SelectableRow` | a pick list’s row: a tick box or a radio, before the text or at the right end |',
          '| `LogRow` | a log line: glyph, message and who, the time at the right |',
          '| `KeyValueList` · `KeyValueItem` | a compact key · value summary, one label width, optional lines |',
          '| `Timeline` · `TimelineItem` | an audit trail: a dot per event on a thin rail |',
          '| `SheetField` · `SheetFields` | the fact row of an About tab or profile: label · value, 18 apart |',
          '',
          'A row that opens something carries a chevron in `actions`, not a second button: a pressable row is already a button.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const PEOPLE = [
  { name: 'Sahil Thadani', team: 'Platform Ops', email: 'sahil@acmehealth.org' },
  { name: 'Meera Kulkarni', team: 'Helpdesk', email: 'meera@acmehealth.org' },
  { name: 'Rahul Deshpande', team: 'Field Services', email: 'rahul@acmehealth.org' },
];

const Frame = ({ width = 320, children }: { width?: number; children: ReactNode }) => (
  <div style={{ width }}>{children}</div>
);

const Caption = ({ children }: { children: ReactNode }) => (
  <div className="mdt-mb-2 mdt-text-xs mdt-text-muted-foreground">{children}</div>
);

const chevron = <Icon name="chevron-right" size={16} className="mdt-text-neutral-60" />;

/** Rows that each open something: the whole row is a button, the chevron says so (Agent Fleet's Health › Modules). */
export const Default: Story = {
  render: () => (
    <Frame width={680}>
      <RowList>
        {[
          { name: 'Inventory', line: 'Last run 2m ago' },
          { name: 'Remote actions', line: 'Collecting' },
          { name: 'Metrics', line: '3 restarts' },
        ].map(({ name, line }) => (
          <Row key={name} onClick={() => undefined} aria-label={`Open ${name}`} actions={chevron}>
            <RowTitle primary={name} secondary={line} />
          </Row>
        ))}
      </RowList>
    </Frame>
  ),
};

const RowMenu = ({ label }: { label: string }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        size="sm"
        iconOnly
        ariaLabel={label}
        leftIcon={<Icon name="more-vertical" size={16} />}
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem variant="destructive">
        <Icon name="user-minus" size={16} />
        Remove from team
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

/**
 * A plain row with a ⋯ at its right end (a user's Teams tab). The menu is the row's only control; the row itself
 * does not press. Opened here by a real click.
 */
export const WithRowMenu: Story = {
  render: () => (
    <Frame width={680}>
      <RowList>
        {['Platform Ops', 'Helpdesk', 'Security Team'].map((team) => (
          <Row key={team} actions={<RowMenu label={`Actions for ${team}`} />}>
            <RowTitle primary={team} />
          </Row>
        ))}
      </RowList>
    </Frame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Actions for Platform Ops' }));
    await expect(
      await within(document.body).findByRole('menuitem', { name: 'Remove from team' })
    ).toBeInTheDocument();
  },
};

/** The three heights, the table's own: default 54, two-line as tall as its words, compact 36. */
export const Densities: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-wrap mdt-gap-6">
      {(['default', 'two-line', 'compact'] as const).map((density) => (
        <Frame key={density}>
          <Caption>{density}</Caption>
          <RowList density={density}>
            {PEOPLE.map((p) => (
              <Row
                key={p.name}
                leading={<Avatar name={p.name} size="sm" />}
                onClick={() => undefined}
              >
                <RowTitle primary={p.name} secondary={density === 'compact' ? undefined : p.team} />
              </Row>
            ))}
          </RowList>
        </Frame>
      ))}
    </div>
  ),
};

/** Picked (the blue-10 fill), dimmed (65%) and disabled (55%, not pressable). */
export const States: Story = {
  render: () => (
    <Frame>
      <RowList>
        <Row selected onClick={() => undefined}>
          <RowTitle primary="Picked" secondary="selected" />
        </Row>
        <Row state="dimmed">
          <RowTitle primary="Dimmed" secondary='state="dimmed"' />
        </Row>
        <Row disabled onClick={() => undefined}>
          <RowTitle primary="Disabled" secondary="not pressable" />
        </Row>
        <Row onClick={() => undefined} title="A row with badges">
          <RowTitle
            primary="Helpdesk Access"
            secondary="IT Support, Security Team"
            badges={<Badge size="sm">Custom</Badge>}
          />
        </Row>
      </RowList>
    </Frame>
  ),
};

/** A pick list: the whole row is the tick box's label, so a press anywhere picks it. */
export const PickList: Story = {
  render: function PickListStory() {
    const [picked, setPicked] = useState<string[]>(['Sahil Thadani']);
    const toggle = (name: string) => {
      setPicked((now) => (now.includes(name) ? now.filter((n) => n !== name) : [...now, name]));
    };
    return (
      <Frame>
        <RowList>
          {PEOPLE.map((p) => (
            <SelectableRow
              key={p.name}
              checked={picked.includes(p.name)}
              onChange={() => {
                toggle(p.name);
              }}
              label={p.name}
              hint={p.email}
            />
          ))}
          <SelectableRow disabled label="Ilya Petrov" hint="already a member" />
        </RowList>
      </Frame>
    );
  },
};

/** The box at the right end of the row (Add access, Pranjal 2026-09-22: "checkbox should be on the right"). */
export const PickListBoxAtEnd: Story = {
  render: function BoxAtEndStory() {
    const [picked, setPicked] = useState<string[]>([]);
    return (
      <Frame width={480}>
        <RowList>
          {['Helpdesk Access', 'Billing Admin', 'Read-only Auditor'].map((name) => (
            <SelectableRow
              key={name}
              control="end"
              checked={picked.includes(name)}
              onChange={(on) => {
                setPicked((now) => (on ? [...now, name] : now.filter((n) => n !== name)));
              }}
            >
              <RowTitle primary={name} secondary="3 roles · 2 organizations" />
            </SelectableRow>
          ))}
        </RowList>
      </Frame>
    );
  },
};

/** One of the list: a radio per row, a status at the right (the on-premises collector picker). */
export const RadioPick: Story = {
  render: function RadioPickStory() {
    const [pick, setPick] = useState('col-ams-01');
    return (
      <Frame width={480}>
        <RowList density="two-line">
          {[
            { id: 'col-ams-01', site: 'Amsterdam', online: true },
            { id: 'col-lhr-01', site: 'London', online: true },
            { id: 'col-fra-02', site: 'Frankfurt', online: false },
          ].map(({ id, site, online }) => (
            <SelectableRow
              key={id}
              type="radio"
              checked={pick === id}
              onChange={() => {
                setPick(id);
              }}
              label={id}
              hint={site}
              right={
                <Badge size="sm" tone={online ? 'success' : 'danger'} dot>
                  {online ? 'Online' : 'Offline'}
                </Badge>
              }
            />
          ))}
        </RowList>
      </Frame>
    );
  },
};

/** A log: the time is written by the caller and always sits at the right. */
export const LogRows: Story = {
  render: () => (
    <Frame>
      <RowList density="compact">
        <LogRow icon={<Icon name="check" size={13} />} message="Connection tested" time="2h ago" />
        <LogRow
          icon={<Icon name="pencil" size={13} />}
          message="Rotation policy changed"
          meta="by Meera K."
          time="1d ago"
        />
        <LogRow
          icon={<Icon name="refresh-cw" size={13} />}
          message="Secret rotated"
          meta="automatic"
          time="3d ago"
        />
      </RowList>
    </Frame>
  ),
};

/** A compact summary - one label width for the list, top-aligned, with or without lines between rows. */
export const KeyValues: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-wrap mdt-gap-8">
      <Frame>
        <Caption>separated</Caption>
        <KeyValueList separated>
          <KeyValueItem label="Store type">HashiCorp Vault</KeyValueItem>
          <KeyValueItem label="Endpoint" hint="mutual TLS">
            vault.acmehealth.org
          </KeyValueItem>
        </KeyValueList>
      </Frame>
      <Frame>
        <Caption>labelWidth 90, in a summary card</Caption>
        <div className="mdt-rounded-lg mdt-bg-muted mdt-px-4 mdt-py-3.5">
          <KeyValueList labelWidth={90}>
            <KeyValueItem label="Name">billing-export</KeyValueItem>
            <KeyValueItem label="Expires">20 Jan 2027</KeyValueItem>
            <KeyValueItem label="Type">OAuth 2.0 client</KeyValueItem>
          </KeyValueList>
        </div>
      </Frame>
    </div>
  ),
};

/** An audit trail: a dot per event (grey, or success / warning / danger), joined by a rail that ends at the last. */
export const TimelineTrail: Story = {
  name: 'Timeline',
  render: () => (
    <Frame>
      <Timeline>
        <TimelineItem tone="success" title="Credential rotated" meta="automatic" time="2h ago" />
        <TimelineItem
          tone="warning"
          title="Test connection failed"
          meta="timeout after 30s"
          time="3d ago"
        />
        <TimelineItem tone="danger" title="Store unreachable" meta="3 retries" time="5d ago" />
        <TimelineItem title="Created" meta="by Natasha Manglore" time="12 Aug 2026" />
      </Timeline>
    </Frame>
  ),
};

/**
 * The fact rows of a profile (a user's About tab): label · value in two halves, 18 between rows. An empty value
 * reads "-".
 */
export const FactRows: Story = {
  render: () => (
    <Frame width={680}>
      <SheetFields>
        <SheetField label="Email">sarah.johnson@company.com</SheetField>
        <SheetField label="Phone number">+1 (555) 0110</SheetField>
        <SheetField label="Access until">Permanent</SheetField>
        <SheetField label="Status">
          <Badge size="sm" tone="success" dot>
            Active
          </Badge>
        </SheetField>
        <SheetField label="VIP user" />
      </SheetFields>
    </Frame>
  ),
};

/**
 * The agent's About: a narrow label beside a wide value (3 : 7), an ⓘ where a value needs explaining, and values
 * that hold text, a quiet word, badges or pills on one line.
 */
export const FactRowsWide: Story = {
  render: () => (
    <Frame width={680}>
      <SheetFields>
        <SheetField label="Agent version" ratio="3:7">
          7.4.0<span className="mdt-font-normal mdt-text-neutral-70">Latest</span>
        </SheetField>
        <SheetField label="Address" ratio="3:7">
          10.32.0.14
        </SheetField>
        <SheetField
          label="Network zone"
          ratio="3:7"
          info="Taken from the agent's address. It decides whether the agent reports direct or through a relay."
        >
          Retail core
        </SheetField>
        <SheetField label="Modules" ratio="3:7">
          <Badge size="sm" tone="success" dot>
            Inventory
          </Badge>
          <Badge size="sm" tone="success" dot>
            Remote actions
          </Badge>
        </SheetField>
        <SheetField label="Tags" ratio="3:7" align="top">
          <TagPill>role:edge</TagPill>
          <TagPill>env:prod</TagPill>
        </SheetField>
      </SheetFields>
    </Frame>
  ),
};
