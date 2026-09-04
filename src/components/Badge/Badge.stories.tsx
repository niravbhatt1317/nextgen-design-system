import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Icon } from '../Icon';
import { TagPill } from '../TagPill';
import { Badge } from './Badge';
import type { BadgePalette, BadgeShape, BadgeSize, BadgeTone } from './Badge.types';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A small label the system applies and nobody removes: the status pill with its dot, the',
          'squarer category chip, counts, and the unread marker.',
          '',
          "Ported from the merged console on 4 September 2026: the previous Badge's spacing, the",
          "console's colours, and no stroke by default. The previous component is `BadgeOld`,",
          'deprecated and shown under Deprecated.',
          '',
          '| Rule | |',
          '| --- | --- |',
          '| **Fill only** | No stroke on any badge by default. `outline` is a light tinted stroke, opt-in. `solid` is for counts. |',
          '| **Two shapes** | `pill` for states; `square` (a 4px corner) for categories, sources and counts like +N. |',
          '| **Three sizes** | 20, 24 and 28px tall. |',
          '| **Small is text or dot** | An icon handed to a small badge is dropped. Medium and large take a 14 or 16px icon. |',
          '| **Eight tones with a meaning** | Category colours (LDAP, SCIM…) come in through `palette`, never as new tones. |',
          '| **Capital first letter** | Every label starts with a capital. A lowercase-only word sits in the lower half of the line box and reads as low, whatever the line-height. |',
          '| **Counts** | `emphasis="solid"`, and `max={99}` renders 1284 as 99+. |',
          '| **Nobody removes a badge** | The system sets it. A label a person adds and can take away is `TagPill`, which has the ×. |',
          '',
          '**Coming from `BadgeOld`:** `emphasis="subtle"` is now `fill` (still the default, now',
          'without a stroke); `slate` and `inverse` join the tones and `ai` stays; the 12px icon at',
          'small is gone; `max`, `truncate` and the dot on its own work as before; `palette` is',
          'new. There is no ×: a label a person can remove is `TagPill`.',
          '',
          "The dot is the strong tone colour, 6px, 8px at large. Six of the console's colours have no",
          "palette name yet and are flagged in `badge.css`. Dark mode carries the previous Badge's",
          "pairings until the console's dark pass.",
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const TONES: BadgeTone[] = [
  'success',
  'warning',
  'danger',
  'info',
  'ai',
  'neutral',
  'slate',
  'inverse',
];
const TONE_LABEL: Record<BadgeTone, string> = {
  success: 'Active',
  warning: 'Invited',
  danger: 'Expired',
  info: 'Open',
  ai: 'AI',
  neutral: 'Manual',
  slate: 'Inactive',
  inverse: 'Offboarded',
};
/* Labels start with a capital: a lowercase-only word sits in the lower half of the line box and reads as low. */
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/* Category colours, as a product would pass them. Not tones: they mean nothing. */
const LDAP: BadgePalette = { fill: '#F2F3FD', ink: '#4F5BC4' };
const SCIM: BadgePalette = { fill: '#EDF8F7', ink: '#1F7A71', dot: '#22857B' };
const CATEGORY: { name: string; palette: BadgePalette }[] = [
  { name: 'LDAP', palette: LDAP },
  { name: 'SCIM', palette: SCIM },
  { name: 'Okta', palette: { fill: '#FDE1EE', ink: '#AF1D7A' } },
];

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 40 }}>
    <span
      style={{
        width: 120,
        flex: 'none',
        fontSize: 11,
        letterSpacing: '.08em',
        textTransform: 'uppercase',
        color: 'hsl(var(--mdt-muted-foreground))',
        fontWeight: 600,
      }}
    >
      {label}
    </span>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      {children}
    </div>
  </div>
);

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>{children}</div>
);

/** One shape, three sizes down, every content type across. Small has no icon column. */
function Matrix({ shape }: { shape: BadgeShape }) {
  const sizes: BadgeSize[] = ['sm', 'md', 'lg'];
  const px: Record<BadgeSize, number> = { sm: 12, md: 14, lg: 16 };
  return (
    <Stack>
      {sizes.map((size) => (
        <Row key={size} label={`${size} · ${String({ sm: 20, md: 24, lg: 28 }[size])}px`}>
          <Badge shape={shape} size={size} tone="success">
            Active
          </Badge>
          <Badge shape={shape} size={size} tone="success" dot>
            Active
          </Badge>
          {size === 'sm' ? (
            <span
              style={{
                fontSize: 12,
                color: 'hsl(var(--mdt-muted-foreground))',
                fontStyle: 'italic',
              }}
            >
              no icon at small
            </span>
          ) : (
            <>
              <Badge
                shape={shape}
                size={size}
                tone="success"
                icon={<Icon name="check" size={px[size]} />}
              >
                Verified
              </Badge>
              <Badge
                shape={shape}
                size={size}
                tone="success"
                icon={<Icon name="shield" size={px[size]} />}
                aria-label="Protected"
              />
            </>
          )}
        </Row>
      ))}
    </Stack>
  );
}

export const Default: Story = {
  args: { children: 'Active', tone: 'success', dot: true },
};

/** Pill: three sizes, every content type. States wear this shape. */
export const Pill: Story = {
  render: () => <Matrix shape="pill" />,
};

/** Rounded square: the 4px corner. Categories, sources and "+N" wear this shape. */
export const RoundedSquare: Story = {
  render: () => <Matrix shape="square" />,
};

/**
 * The eight tones with a meaning, in the console's colours, then category
 * colours passed in through `palette`. Every ink passes 4.5:1 on its fill.
 */
export const Tones: Story = {
  render: () => (
    <Stack>
      {TONES.map((tone) => (
        <Row key={tone} label={tone}>
          <Badge tone={tone} dot>
            {TONE_LABEL[tone]}
          </Badge>
          <Badge tone={tone} shape="square">
            {TONE_LABEL[tone]}
          </Badge>
          <Badge tone={tone} size="sm" dot>
            {TONE_LABEL[tone]}
          </Badge>
        </Row>
      ))}
      <Row label="category">
        {CATEGORY.map((c) => (
          <Badge key={c.name} shape="square" palette={c.palette}>
            {c.name}
          </Badge>
        ))}
      </Row>
    </Stack>
  ),
};

/** Fill is the default. Outline is the light tinted stroke, opt-in. Solid is for counts. */
export const Emphasis: Story = {
  render: () => (
    <Stack>
      <Row label="fill · default">
        {TONES.filter((t) => t !== 'inverse').map((tone) => (
          <Badge key={tone} tone={tone} dot>
            {cap(tone)}
          </Badge>
        ))}
      </Row>
      <Row label="outline">
        {TONES.filter((t) => t !== 'inverse').map((tone) => (
          <Badge key={tone} tone={tone} emphasis="outline">
            {cap(tone)}
          </Badge>
        ))}
      </Row>
      <Row label="solid · counts">
        {(
          [
            ['inverse', '12'],
            ['info', '4'],
            ['success', '9'],
            ['warning', '7'],
            ['danger', '3'],
            ['ai', '2'],
          ] as [BadgeTone, string][]
        ).map(([tone, n]) => (
          <Badge key={tone} tone={tone} emphasis="solid" size="sm">
            {n}
          </Badge>
        ))}
      </Row>
    </Stack>
  ),
};

/** Solid is for counts. `max` caps a runaway number. The dot on its own is the unread marker. */
export const Counts: Story = {
  render: () => (
    <Stack>
      <Row label="counts · small">
        <Badge tone="inverse" emphasis="solid" size="sm">
          3
        </Badge>
        <Badge tone="info" emphasis="solid" size="sm">
          12
        </Badge>
        <Badge tone="danger" emphasis="solid" size="sm" max={99}>
          1284
        </Badge>
        <Badge tone="slate" size="sm">
          +2
        </Badge>
      </Row>
      <Row label="max={99}">
        <Badge tone="danger" emphasis="solid" max={99}>
          42
        </Badge>
        <Badge tone="danger" emphasis="solid" max={99}>
          99
        </Badge>
        <Badge tone="danger" emphasis="solid" max={99}>
          1284
        </Badge>
      </Row>
      <Row label="unread marker">
        <Badge tone="success" dot size="sm" aria-label="Online" />
        <Badge tone="success" dot aria-label="Online" />
        <Badge tone="success" dot size="lg" aria-label="Online" />
        <Badge tone="danger" dot aria-label="Needs attention" />
        <Badge tone="info" dot aria-label="Unread" />
      </Row>
    </Stack>
  ),
};

/** `truncate` holds the badge to 128px and cuts the label with an ellipsis. Off by default. */
export const LongLabels: Story = {
  render: () => {
    const long = 'Waiting for the identity provider to confirm the invitation';
    return (
      <Stack>
        <Row label="truncate off">
          <Badge shape="square" tone="warning">
            {long}
          </Badge>
        </Row>
        <Row label="truncate">
          <Badge shape="square" tone="warning" truncate>
            {long}
          </Badge>
          <Badge tone="info" dot truncate>
            {long}
          </Badge>
          <Badge tone="info" dot truncate size="lg">
            {long}
          </Badge>
        </Row>
      </Stack>
    );
  },
};

/** Where each one lives in the product: a table row, the sidebar's Soon row, tab counts; and beside them the tags a person can remove, which are TagPill. */
export const InPlace: Story = {
  render: function InPlaceStory() {
    const [filters, setFilters] = useState(['Status: Active', 'Source: LDAP', 'Team: Platform']);
    const ink = 'hsl(var(--mdt-foreground))';
    const muted = 'hsl(var(--mdt-muted-foreground))';
    const line = '1px solid hsl(var(--mdt-neutral-20))';
    const rows: [string, string, BadgeTone, string, BadgePalette | undefined, string][] = [
      ['Sarah Johnson', 'sarah.johnson@company.com', 'success', 'Active', undefined, 'Manual'],
      ['Michael Smith', 'michael.smith@company.com', 'slate', 'Inactive', undefined, 'Manual'],
      ['Emily Davis', 'emily.davis@company.com', 'warning', 'Invited', LDAP, 'LDAP'],
      ['Olivia Jones', 'olivia.jones@company.com', 'danger', 'Expired', SCIM, 'SCIM'],
    ];
    return (
      <div style={{ display: 'grid', gap: 18, maxWidth: 720, color: ink, fontSize: 14 }}>
        <div>
          {rows.map(([name, mail, tone, status, palette, source]) => (
            <div
              key={name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                height: 44,
                borderBottom: line,
              }}
            >
              <span style={{ flex: 1, fontWeight: 500 }}>{name}</span>
              <span style={{ width: 200, color: muted, fontSize: 13 }}>{mail}</span>
              <Badge size="sm" tone={tone} dot>
                {status}
              </Badge>
              {palette ? (
                <Badge size="sm" shape="square" palette={palette}>
                  {source}
                </Badge>
              ) : (
                <Badge size="sm" shape="square">
                  {source}
                </Badge>
              )}
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            height: 32,
            padding: '0 8px',
            color: muted,
            opacity: 0.55,
            fontSize: 13,
          }}
        >
          <span style={{ flex: 1 }}>Permissions</span>
          <Badge size="sm" tone="slate">
            Soon
          </Badge>
        </div>
        <div style={{ display: 'flex', gap: 18, borderBottom: line, fontSize: 13 }}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 0',
              boxShadow: `inset 0 -2px 0 ${ink}`,
            }}
          >
            Members
            <Badge size="sm" tone="inverse" emphasis="solid">
              24
            </Badge>
          </span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 0',
              color: muted,
            }}
          >
            Invitations
            <Badge size="sm" tone="slate">
              11
            </Badge>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ color: muted, fontSize: 12 }}>TagPill, not Badge:</span>
          {filters.map((f) => (
            <TagPill
              key={f}
              shape="square"
              onRemove={() => {
                setFilters((cur) => cur.filter((x) => x !== f));
              }}
            >
              {f}
            </TagPill>
          ))}
          {filters.length === 0 ? (
            <span style={{ color: muted, fontSize: 13 }}>No filters</span>
          ) : null}
        </div>
      </div>
    );
  },
};

/** Every option on one page, driven by the Controls panel. */
export const Playground: Story = {
  args: {
    children: 'Active',
    tone: 'success',
    emphasis: 'fill',
    shape: 'pill',
    size: 'md',
    dot: true,
    truncate: false,
  },
  argTypes: {
    tone: { control: 'select', options: TONES },
    emphasis: { control: 'radio', options: ['fill', 'outline', 'solid'] },
    shape: { control: 'radio', options: ['pill', 'square'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    dot: { control: 'boolean' },
    truncate: { control: 'boolean' },
    max: { control: 'number' },
    children: { control: 'text' },
    icon: { control: false },
    palette: { control: false },
  },
};
