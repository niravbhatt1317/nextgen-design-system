import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { SelectableCard, SelectableCardGroup } from './SelectableCard';
import { PickCard } from './PickCard';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import { IconTile } from '../IconTile';
import { Select } from '../Select';
import alibaba from './marks/alibaba.svg';
import aws from './marks/aws.svg';
import azure from './marks/azure.svg';
import gcp from './marks/gcp.svg';
import ibm from './marks/ibm.svg';
import kubernetes from './marks/kubernetes.svg';
import openstack from './marks/openstack.svg';

const meta: Meta<typeof SelectableCard> = {
  title: 'New Components/SelectableCard',
  component: SelectableCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "An answer drawn as a card, its radio or checkbox at the top right - the console's option card. " +
          'The whole card is the control: press it, or Space / Enter; in a radio set the arrows move the answer. ' +
          "A picker or button in the card's body keeps its press to itself, so the chosen answer can ask its follow-up in place. " +
          'The edge is 1.5 in every state, so a choice never moves anything.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SelectableCard>;

const Box = ({ children, width = 560 }: { children: React.ReactNode; width?: number }) => (
  <div style={{ width }}>{children}</div>
);

/** A radio set: one answer, and the chosen one asks its follow-up in place. */
export const RadioWithFollowUp: Story = {
  render: function RadioStory() {
    const [mode, setMode] = useState('existing');
    const [target, setTarget] = useState('');
    return (
      <Box>
        <SelectableCardGroup
          aria-label="How should its holders be handled?"
          value={mode}
          onValueChange={setMode}
        >
          <SelectableCard
            value="existing"
            title="Replace with an existing access profile"
            description="Every holder moves to the chosen profile with the end date they have today."
          >
            {mode === 'existing' && (
              <Select
                aria-label="Replacement access profile"
                placeholder="Select an access profile…"
                options={[
                  { value: 'helpdesk', label: 'Helpdesk Access' },
                  { value: 'special', label: 'Special Access' },
                ]}
                value={target}
                onChange={(v) => {
                  setTarget(typeof v === 'string' ? v : '');
                }}
              />
            )}
          </SelectableCard>
          <SelectableCard
            value="fresh"
            title="Replace with a new access profile"
            description="Open the create drawer prefilled from this one - shape the replacement, and its holders move to it when you create it."
          />
          <SelectableCard
            value="remove"
            title="Remove without replacement"
            description="Every holder loses this access. The record stays in the audit trail."
          />
        </SelectableCardGroup>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('radio', { name: 'Remove without replacement' }));
    await expect(canvas.getByRole('radio', { name: 'Remove without replacement' })).toHaveAttribute(
      'aria-checked',
      'true'
    );
    await userEvent.click(
      canvas.getByRole('radio', { name: 'Replace with an existing access profile' })
    );
  },
};

/* THE PROVIDERS - the console's own list (discovery-profiles data.js PROVIDERS: the order, the names, the kind under
 * each) and marks (./marks - each the vendor's own drawing from a CC0 set, the file's first line names it; three
 * vendors publish no mark that reads at 32 and wear a monogram on the same plate). */
const MARKS: Record<string, string> = { aws, azure, gcp, alibaba, ibm, openstack, kubernetes };
const MONOGRAM: Record<string, string> = { oci: 'OCI', ovirt: 'oVirt', vmware: 'VMW' };
const PROVIDERS = [
  { id: 'aws', name: 'AWS', kind: 'Public cloud' },
  { id: 'azure', name: 'Azure', kind: 'Public cloud' },
  { id: 'gcp', name: 'GCP', kind: 'Public cloud' },
  { id: 'alibaba', name: 'Alibaba Cloud', kind: 'Public cloud' },
  { id: 'ibm', name: 'IBM Cloud', kind: 'Public cloud' },
  { id: 'oci', name: 'OCI', kind: 'Public cloud' },
  { id: 'openstack', name: 'OpenStack', kind: 'Private cloud' },
  { id: 'ovirt', name: 'oVirt', kind: 'Virtualization' },
  { id: 'vmware', name: 'VMware vCenter', kind: 'Virtualization' },
  { id: 'kubernetes', name: 'Kubernetes', kind: 'Agentless pull' },
];

/** The plate: the vendor's mark 32 on the 48 white plate (IconTile's `brand` tone), or its monogram. */
const Mark = ({ id, name }: { id: string; name: string }) => {
  const src = MARKS[id];
  return (
    <IconTile
      tone="brand"
      size="xl"
      shape="square"
      icon={
        src === undefined ? (
          <>{MONOGRAM[id] ?? name.slice(0, 3).toUpperCase()}</>
        ) : (
          <img src={src} alt="" draggable={false} />
        )
      }
    />
  );
};

/**
 * Logo tiles: a pick among many named things - providers, engines, platforms - as a radio set five to a row, each
 * card re-flowed around its mark: a logo on a white plate (white in both themes, so a mark drawn in its own colours
 * reads), the name and one faint word under it, the dot in the top-right corner. A thing with no logo that reads small
 * wears a monogram on the same plate. Shown here with the cloud providers it was ported from (the cloud discovery
 * profile's Provider & connection step).
 */
export const LogoTiles: Story = {
  name: 'Logo Tiles',
  render: function TilesStory() {
    const [provider, setProvider] = useState('aws');
    return (
      <Box width={710}>
        <SelectableCardGroup layout="tiles" aria-label="Provider" value={provider} onValueChange={setProvider}>
          {PROVIDERS.map((p) => (
            <SelectableCard
              key={p.id}
              value={p.id}
              title={p.name}
              description={p.kind}
              icon={<Mark id={p.id} name={p.name} />}
            />
          ))}
        </SelectableCardGroup>
      </Box>
    );
  },
};

/** A checkbox set in a grid of two, with an icon, a tag and a held card. */
export const CheckboxGrid: Story = {
  render: function CheckboxStory() {
    const [on, setOn] = useState<Record<string, boolean>>({ email: true });
    const card = (key: string, title: string, description: string, icon: IconName, extra = {}) => (
      <SelectableCard
        title={title}
        description={description}
        icon={<Icon name={icon} />}
        checked={on[key] ?? false}
        onCheckedChange={(next) => {
          setOn((s) => ({ ...s, [key]: next }));
        }}
        {...extra}
      />
    );
    return (
      <Box>
        <SelectableCardGroup type="checkbox" columns={2} aria-label="Notify by">
          {card('email', 'Email', 'A message to the address on file.', 'mail', { tag: 'Fastest' })}
          {card('sms', 'SMS', 'A text to the verified number.', 'phone')}
          {card('slack', 'Slack', 'A direct message in the workspace.', 'slack')}
          {card('pager', 'Pager', 'Not set up for this organization.', 'bell', { disabled: true })}
        </SelectableCardGroup>
      </Box>
    );
  },
};

/** Chips: one row as wide as their words, no line under the title. */
export const Chips: Story = {
  render: function ChipsStory() {
    const [value, setValue] = useState('saml');
    return (
      <SelectableCardGroup
        layout="chips"
        aria-label="Protocol"
        value={value}
        onValueChange={setValue}
      >
        <SelectableCard value="saml" title="SAML 2.0" icon={<Icon name="shield" />} />
        <SelectableCard value="oidc" title="OpenID Connect" icon={<Icon name="key-round" />} />
        <SelectableCard value="ldap" title="LDAP" icon={<Icon name="server" />} />
      </SelectableCardGroup>
    );
  },
};

/* ── the Pick card ─────────────────────────────────────────────────────── */

/** The three ways an agent's data ships - Create profile's "How it ships" (Agent Fleet). */
const SHIP = [
  {
    value: 'direct',
    icon: 'cloud',
    title: 'Direct to SaaS',
    description: 'Straight to the platform, with no collector in between',
  },
  {
    value: 'collector',
    icon: 'radio',
    title: 'Via the collector mapped in its network zone',
    description: 'Only through its zone\u2019s collector; waits if it is down',
  },
  {
    value: 'collector-then-saas',
    icon: 'split',
    title: 'Collector first, then direct',
    description: 'Through the collector, direct when none is reachable',
  },
] as const satisfies readonly {
  value: string;
  icon: IconName;
  title: string;
  description: string;
}[];

/**
 * **The Pick card** - a choice already made, shown as one card with a **Change** door. At rest the
 * selector glyph sits on the right; on hover or keyboard focus the underlined "Change" takes its place
 * and the card takes the sunken fill. The whole card is the button. Ported from the console's
 * `PickCard` (Pranjal, 2026-10-19: his named element).
 */
export const PickCardAtRest: Story = {
  name: 'Pick card',
  render: () => (
    <Box>
      <PickCard
        icon={<Icon name="cloud" />}
        title="Direct to SaaS"
        description="Straight to the platform, with no collector in between"
        aria-label="How it ships: Direct to SaaS. Change"
      />
    </Box>
  ),
};

/** The pointer on it: the sunken fill, the tile on the page ground, "Change" in the selector's place. */
export const PickCardHovered: Story = {
  name: 'Pick card · hovered',
  render: () => (
    <Box>
      <PickCard
        icon={<Icon name="split" />}
        title="Collector first, then direct"
        description="Through the collector, direct when none is reachable - and a line long enough to be cut with an ellipsis at the card's edge"
        aria-label="How it ships: Collector first, then direct. Change"
      />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByRole('button', { name: /Collector first, then direct/ }));
  },
};

/**
 * Shopify's checkout summary: pressing the Pick card opens every option in its place; picking one folds
 * it back to the Pick card. Nothing else on the form moves.
 */
export const PickCardFolds: Story = {
  name: 'Pick card · opens the options',
  render: function PickCardFoldsStory() {
    const [way, setWay] = useState<string>('direct');
    const [open, setOpen] = useState(false);
    const chosen = SHIP.find((s) => s.value === way) ?? SHIP[0];
    return (
      <Box>
        <div className="mdt-flex mdt-flex-col mdt-gap-2">
          <span id="ship-label" className="mdt-text-[13px] mdt-font-medium mdt-text-neutral-90">
            How it ships
          </span>
          {open ? (
            <SelectableCardGroup
              aria-labelledby="ship-label"
              value={way}
              onValueChange={(next) => {
                setWay(next);
                setOpen(false);
              }}
            >
              {SHIP.map((s) => (
                <SelectableCard
                  key={s.value}
                  value={s.value}
                  title={s.title}
                  description={s.description}
                />
              ))}
            </SelectableCardGroup>
          ) : (
            <PickCard
              icon={<Icon name={chosen.icon} />}
              title={chosen.title}
              description={chosen.description}
              aria-label={`How it ships: ${chosen.title}. Change`}
              onChange={() => {
                setOpen(true);
              }}
            />
          )}
        </div>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /How it ships: Direct to SaaS/ }));
    await userEvent.click(canvas.getByRole('radio', { name: 'Collector first, then direct' }));
    await expect(
      canvas.getByRole('button', { name: /How it ships: Collector first, then direct/ })
    ).toBeInTheDocument();
  },
};
