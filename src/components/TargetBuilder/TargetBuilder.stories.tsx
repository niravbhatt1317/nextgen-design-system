import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { KeyValuesBuilder } from './KeyValuesBuilder';
import type {
  KeyValuesBuilderProps,
  KeyValuesOption,
  KeyValuesRow,
} from './KeyValuesBuilder.types';
import { TargetBuilder } from './TargetBuilder';
import type { TargetBuilderProps, TargetEntry, TargetKind } from './TargetBuilder.types';

/* THE CONSOLE'S NETWORK KINDS AND CHECKS (features/discovery-profiles/data.js INCLUDE_KINDS, EXCLUDE_KINDS,
 * ipEntryError - copy verbatim): one rule per kind and a message a person can act on, the shape that passes in it */
const IPV4_RX = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
const IPV6_RX = /^(?=.*:)[0-9a-f:.]{2,45}$/i;
const HOST_RX =
  /^(?=.{3,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i;
const ipNum = (s: string) => s.split('.').reduce((n, o) => n * 256 + Number(o), 0);
const isIp = (s: string) => IPV4_RX.test(s) || IPV6_RX.test(s);
const isHost = (s: string) => HOST_RX.test(s) && !/^[\d.]+$/.test(s);
const isCidr = (s: string) => {
  const m = /^(.+)\/(\d{1,2})$/.exec(s);
  return !!m && IPV4_RX.test(m[1] ?? '') && Number(m[2]) <= 32;
};
const isRange = (s: string) => {
  const m = /^([^\s-]+)\s*-\s*([^\s-]+)$/.exec(s);
  const a = m?.[1] ?? '';
  const b = m?.[2] ?? '';
  if (!m || !IPV4_RX.test(a)) return false;
  if (IPV4_RX.test(b)) return ipNum(b) >= ipNum(a);
  return /^\d{1,3}$/.test(b) && Number(b) <= 255 && Number(b) >= Number(a.split('.')[3]);
};
const checkSet = (value: string) => {
  const items = value
    .trim()
    .split(/[\s,;]+/)
    .filter(Boolean);
  if (!items.length) return 'Enter at least one address — part several with commas or new lines.';
  const bad = items.find((x) => !(isIp(x) || isHost(x) || isCidr(x) || isRange(x)));
  return bad ? `"${bad}" is not an IP address, CIDR block, range or host name.` : null;
};
const ping = (lead: ReactNode) => (
  <>
    {lead} Keep <b>Ping targets before scanning</b> on.
  </>
);

const INCLUDE_KINDS: TargetKind[] = [
  {
    value: 'host',
    label: 'Specific IP / host',
    field: 'single',
    placeholder: '10.20.4.14  or  host01.acme.local',
    validate: (raw) => {
      const v = raw.trim();
      if (!v) return 'Enter an IP address or a host name.';
      return isIp(v) || isHost(v)
        ? null
        : 'Not an IP address or a host name — try 10.20.4.14 or host01.acme.local.';
    },
  },
  {
    value: 'set',
    label: 'Specific set (include block)',
    field: 'multi',
    placeholder: '10.20.4.14, 10.20.4.20, host02.acme.local',
    validate: checkSet,
  },
  {
    value: 'range',
    label: 'IP range',
    field: 'single',
    placeholder: 'e.g. 192.168.1.10-120',
    validate: (raw) => {
      const v = raw.trim();
      if (!v) return 'Enter a range as start-end.';
      return isRange(v)
        ? null
        : 'Not a range — try 192.168.1.10-120 or 192.168.1.10-192.168.1.120, the end not below the start.';
    },
  },
  {
    value: 'cidr',
    label: 'CIDR block',
    field: 'single',
    placeholder: 'e.g. 10.20.0.0/24',
    validate: (raw) => {
      const v = raw.trim();
      if (!v) return 'Enter a CIDR block.';
      return isCidr(v)
        ? null
        : 'Not a CIDR block — try 10.20.0.0/24: an IPv4 address and a prefix up to /32.';
    },
    warning: (v) =>
      /\/(?:\d|1\d|2[0-2])\b/.test(v)
        ? ping('Large CIDR — a /n expands to 2^(32−n) addresses.')
        : null,
  },
  {
    value: 'entire',
    label: 'Entire network from a start IP',
    field: 'single',
    placeholder: 'start IP, e.g. 10.22.0.1',
    validate: (raw) => {
      const v = raw.trim();
      if (!v) return 'Enter the start IP address.';
      return IPV4_RX.test(v) ? null : 'Not an IPv4 address — try 10.22.0.1.';
    },
    warning: () => ping('Heaviest scope — sweeps from a start IP when bounds are unknown.'),
  },
  { value: 'csv', label: 'CSV import (single-column)', field: 'file' },
];

const EXCLUDE_KINDS: TargetKind[] = [
  {
    value: 'exset',
    label: 'Specific set (exclude block)',
    field: 'multi',
    placeholder: '10.20.0.1, 10.20.3.0/28',
    validate: checkSet,
  },
  { value: 'excsv', label: 'Exclude list import (CSV)', field: 'file' },
];

const meta: Meta<typeof TargetBuilder> = {
  title: 'New Components/TargetBuilder',
  component: TargetBuilder,
  subcomponents: { KeyValuesBuilder },
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A list of **targets built one at a time**: pick a type, type the value, Add. The add row is a dashed box on the sunken ground, 10 inside - the type picker 240 wide, the value in mono, and Add at the field’s 32. A block type (a list of addresses) takes a two-row text area under the row with **Add block**; a file type reads a line beside **Upload**.',
          '',
          'The targets added sit above the add row in one bordered list, a row each, 6 / 8 / 6 / 12 inside: the type’s badge (square, sm - info for targets, danger for exclusions), the value in 12/500 mono cut with an ellipsis, then a pencil and a bin. The rows share four columns, so every value starts on one line whatever its badge says.',
          '',
          'The pencil edits in the row - Enter saves, Escape cancels; a block opens in a text area with Cancel · Save, where Ctrl+Enter saves. Each kind brings its own `validate`: Add and Save refuse a failing value and the message shows under the field from that press on, live, until it passes. A kind’s `warning` shows under the row while it is picked (a large CIDR, a whole network).',
          '',
          '**Ported from the console (Ronak, 2026-10-15 → 10-22)**: the network discovery profile’s Target step, Include targets and Exclusions. The kinds and checks in these stories are the console’s own.',
        ].join('\n'),
      },
    },
  },
  args: { label: 'Include targets', kinds: INCLUDE_KINDS, defaultKind: 'host', tone: 'info' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['info', 'danger'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** One builder holding its own list - the console's step body is 710 wide. */
const Live = ({
  start = [],
  ...props
}: { start?: TargetEntry[] } & Omit<TargetBuilderProps, 'entries' | 'onEntriesChange'>) => {
  const [entries, setEntries] = useState<TargetEntry[]>(start);
  return (
    <div className="mdt-w-[710px] mdt-max-w-full">
      <TargetBuilder {...props} entries={entries} onEntriesChange={setEntries} />
    </div>
  );
};

/** The Target step as it opens: Specific IP / host picked, nothing added yet. Type a value and press Add or Enter. */
export const Default: Story = {
  render: (args) => <Live {...args} />,
};

/**
 * Targets added: each row the type's badge, the value in mono and a pencil and a bin - a CSV row has no pencil (the
 * file is uploaded again). Press a pencil to edit in the row; the set opens in a text area.
 */
export const WithTargets: Story = {
  name: 'With targets',
  render: (args) => (
    <Live
      {...args}
      start={[
        { kind: 'host', value: '10.20.4.14' },
        { kind: 'range', value: '192.168.1.10-120' },
        { kind: 'cidr', value: '10.20.0.0/24' },
        { kind: 'set', value: '10.20.4.14, 10.20.4.20, host02.acme.local' },
        { kind: 'csv', file: 'targets.csv' },
      ]}
    />
  ),
};

/**
 * Exclusions: the danger badge, a block of addresses or a CSV list. The picker opens empty on its placeholder, so a
 * type is chosen first.
 */
export const Exclusions: Story = {
  render: () => (
    <Live
      label="Exclusions"
      kinds={EXCLUDE_KINDS}
      tone="danger"
      placeholder="Exclude - choose a type…"
      start={[{ kind: 'exset', value: '10.20.0.1, 10.20.3.0/28' }]}
    />
  ),
};

/**
 * The three things the builder says, each already showing: a refused value - "abc" as a host, Add pressed - with the
 * message under the field (it stays, live, until the value passes); a large CIDR (/16) with its warning under the row;
 * and Entire network, warned as soon as it is picked.
 */
export const ChecksAndWarnings: Story = {
  name: 'Checks and warnings',
  render: (args) => (
    <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <Live {...args} label="A refused value" defaultKind="host" />
      <Live {...args} label="Large CIDR" defaultKind="cidr" />
      <Live {...args} label="Entire network" defaultKind="entire" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [refused, cidr] = canvas.getAllByRole('group');
    if (!refused || !cidr) return;
    await userEvent.type(within(refused).getByRole('textbox'), 'abc');
    await userEvent.click(within(refused).getByRole('button', { name: 'Add' }));
    await expect(within(refused).getByText(/Not an IP address or a host name/)).toBeInTheDocument();
    await userEvent.type(within(cidr).getByRole('textbox'), '10.20.0.0/16');
    await expect(within(cidr).getByText(/Large CIDR/)).toBeInTheDocument();
  },
};

/* KEY VALUES - KeyValuesBuilder: rows of a picked key and the values typed for it. First drawn as the network discovery
 * profile's Custom ports (Probing & depth step); the console's protocols (features/discovery-profiles/data.js
 * PROBE_PROTOCOLS), its port check (portListError) and the explainer behind its ⓘ - copy verbatim. */
const PROBE_PROTOCOLS: KeyValuesOption[] = [
  { value: 'ssh', label: 'SSH', hint: '22' },
  { value: 'wmi', label: 'WMI', hint: '135' },
  { value: 'powershell', label: 'PowerShell', hint: '5985, 5986' },
  { value: 'snmp', label: 'SNMP', hint: '161/udp' },
  { value: 'http', label: 'HTTP / HTTPS', hint: '80, 443, 5989' },
];
const PORT_RX = /^(\d{1,5})(\/(tcp|udp))?$/i;
const MAX_PORT = 65535;
const checkPort = (port: string) => {
  const m = PORT_RX.exec(port);
  const n = Number(m?.[1]);
  return m && n >= 1 && n <= MAX_PORT ? null : 'A port is a number from 1 to 65535 — e.g. 2222';
};
const PORTS_INFO =
  "Every run probes each protocol's standard ports — SSH 22 · WMI 135 · PowerShell 5985, 5986 · SNMP 161/udp · HTTP / HTTPS 80, 443, 5989. Add a protocol only when it also listens on other ports: type each port and press Enter (a comma or a space works too, and a pasted list adds several). An answer on those ports is treated as that protocol, so its classification and credential types apply.";

/** Everything the console's Custom ports passes - the generic builder, told it holds ports. */
const PORTS: Omit<KeyValuesBuilderProps, 'rows' | 'onRowsChange'> = {
  label: 'Custom ports',
  info: PORTS_INFO,
  options: PROBE_PROTOCOLS,
  validateValue: checkPort,
  keyPlaceholder: 'Protocol…',
  valuePlaceholder: 'Type a port, press Enter',
  addLabel: 'Add protocol',
  keyLabel: 'Protocol',
  valuesLabel: 'Ports',
  mono: true,
};

/** One builder holding its own rows, in the console's 710-wide step body. */
const LiveKeyValues = ({
  start = [],
  ...props
}: { start?: KeyValuesRow[] } & Omit<KeyValuesBuilderProps, 'rows' | 'onRowsChange'>) => {
  const [rows, setRows] = useState<KeyValuesRow[]>(start);
  return (
    <div className="mdt-w-[710px] mdt-max-w-full">
      <KeyValuesBuilder {...props} rows={rows} onRowsChange={setRows} />
    </div>
  );
};

/**
 * **KeyValuesBuilder**, as Custom ports - one group, a row per key: pick the protocol (each option's `hint` names the
 * ports every run already probes - "SSH (22)"), then type its extra ports. Enter, a comma or a space turns each into a
 * chip; a pasted "2222, 2200 8443" adds three; Backspace on an empty field takes the last one back; a duplicate is
 * dropped. The values field stays off until its row has a key. The add button is off while a row has no key or every
 * key is in use, and a key another row holds is left out of the picker. The bin removes a row; a lone blank row has
 * none. Only the props make it about ports - see Key values - tags by category.
 */
export const CustomPorts: Story = {
  name: 'Key values - custom ports',
  render: () => <LiveKeyValues {...PORTS} />,
};

/** Custom ports filled in: two protocols, each with the extra ports it also listens on. */
export const CustomPortsFilled: Story = {
  name: 'Key values - custom ports, filled',
  render: () => (
    <LiveKeyValues
      {...PORTS}
      start={[
        { key: 'ssh', values: ['2222', '2200'] },
        { key: 'http', values: ['8443', '9100'] },
      ]}
    />
  ),
};

/**
 * A value `validateValue` refuses: "70000" typed and Enter pressed. It stays in the field with the red edge and the
 * line under it until it is fixed - nothing typed is lost.
 */
export const CustomPortsCheck: Story = {
  name: 'Key values - a refused value',
  render: () => <LiveKeyValues {...PORTS} start={[{ key: 'ssh', values: ['2222'] }]} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('textbox', { name: 'Ports for SSH' }), '70000{Enter}');
    await expect(canvas.getByText(/A port is a number from 1 to 65535/)).toBeInTheDocument();
  },
};

/** The same builder for something else entirely: tags grouped by category, in the reading font, with no check. */
export const TagsByCategory: Story = {
  name: 'Key values - tags by category',
  render: () => (
    <LiveKeyValues
      label="Tags"
      options={[
        { value: 'env', label: 'Environment' },
        { value: 'team', label: 'Team' },
        { value: 'region', label: 'Region' },
      ]}
      keyPlaceholder="Category…"
      valuePlaceholder="Type a tag, press Enter"
      addLabel="Add category"
      keyLabel="Category"
      valuesLabel="Tags"
      start={[{ key: 'env', values: ['production', 'staging'] }]}
    />
  ),
};
