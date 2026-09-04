import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Icon } from '../Icon';
import { BadgeNew } from './BadgeNew';
import type { BadgeNewPalette, BadgeNewShape, BadgeNewSize, BadgeNewTone } from './BadgeNew.types';

const meta: Meta<typeof BadgeNew> = {
  title: 'Components/Badge New',
  component: BadgeNew,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          "The console's badge as it would ship in the library: the existing Badge's spacing, the",
          "console's colours, and no stroke by default. A parallel to `Badge` for review.",
          '',
          '| Rule | |',
          '| --- | --- |',
          '| **Fill only** | No stroke on any badge by default. `outline` is a light tinted stroke, opt-in. `solid` is for counts. |',
          '| **Two shapes** | `pill` for states; `square` (a 4px corner) for tags and categories. |',
          '| **Three sizes** | 20, 24 and 28px tall, the existing steps. |',
          '| **Small is text or dot** | An icon handed to a small badge is dropped. Medium and large take a 14 or 16px icon. |',
          '| **Our colours** | Seven tones with a meaning. Category colours (LDAP, SCIM…) come in through `palette`. |',
          '',
          'The dot is the strong tone colour, 6px, 8px at large. The × on a removable chip exists at',
          "medium and large only. Six of the console's colours have no palette name yet and are flagged",
          'in `badge-new.css` for the naming session. Dark mode is set aside.',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const TONES: BadgeNewTone[] = [
  'success',
  'warning',
  'danger',
  'info',
  'neutral',
  'slate',
  'inverse',
];
const TONE_LABEL: Record<BadgeNewTone, string> = {
  success: 'Active',
  warning: 'Invited',
  danger: 'Expired',
  info: 'Open',
  neutral: 'Manual',
  slate: 'Inactive',
  inverse: 'Offboarded',
};
/* Category colours, as a product would pass them. Not tones: they mean nothing. */
const LDAP: BadgeNewPalette = { fill: '#F2F3FD', ink: '#4F5BC4' };
const SCIM: BadgeNewPalette = { fill: '#EDF8F7', ink: '#1F7A71', dot: '#22857B' };
const CATEGORY: { name: string; palette: BadgeNewPalette }[] = [
  { name: 'LDAP', palette: LDAP },
  { name: 'SCIM', palette: SCIM },
  { name: 'Okta', palette: { fill: '#FDE1EE', ink: '#AF1D7A' } },
  { name: 'AI', palette: { fill: '#F0E6FF', ink: '#6633CC' } },
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
function Matrix({ shape }: { shape: BadgeNewShape }) {
  const sizes: BadgeNewSize[] = ['sm', 'md', 'lg'];
  const px: Record<BadgeNewSize, number> = { sm: 12, md: 14, lg: 16 };
  return (
    <Stack>
      {sizes.map((size) => (
        <Row key={size} label={`${size} · ${String({ sm: 20, md: 24, lg: 28 }[size])}px`}>
          <BadgeNew shape={shape} size={size} tone="success">
            Active
          </BadgeNew>
          <BadgeNew shape={shape} size={size} tone="success" dot>
            Active
          </BadgeNew>
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
              <BadgeNew
                shape={shape}
                size={size}
                tone="success"
                icon={<Icon name="check" size={px[size]} />}
              >
                Verified
              </BadgeNew>
              <BadgeNew
                shape={shape}
                size={size}
                tone="success"
                icon={<Icon name="shield" size={px[size]} />}
                aria-label="Protected"
              />
              <BadgeNew
                shape={shape}
                size={size}
                tone="neutral"
                onRemove={() => {
                  /* the story only shows the ×; the product decides what removing means */
                }}
              >
                Filter
              </BadgeNew>
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

/** Rounded square: the 4px corner. Tags, categories, filter chips and "+N" wear this shape. */
export const RoundedSquare: Story = {
  render: () => <Matrix shape="square" />,
};

/**
 * The seven tones with a meaning, in the console's colours, then category
 * colours passed in through `palette`. Every ink passes 4.5:1 on its fill.
 */
export const Tones: Story = {
  render: () => (
    <Stack>
      {TONES.map((tone) => (
        <Row key={tone} label={tone}>
          <BadgeNew tone={tone} dot>
            {TONE_LABEL[tone]}
          </BadgeNew>
          <BadgeNew tone={tone} shape="square">
            {TONE_LABEL[tone]}
          </BadgeNew>
          <BadgeNew tone={tone} size="sm" dot>
            {TONE_LABEL[tone]}
          </BadgeNew>
        </Row>
      ))}
      <Row label="category">
        {CATEGORY.map((c) => (
          <BadgeNew key={c.name} shape="square" palette={c.palette}>
            {c.name}
          </BadgeNew>
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
        {TONES.slice(0, 6).map((tone) => (
          <BadgeNew key={tone} tone={tone} dot>
            {tone}
          </BadgeNew>
        ))}
      </Row>
      <Row label="outline">
        {TONES.slice(0, 6).map((tone) => (
          <BadgeNew key={tone} tone={tone} emphasis="outline">
            {tone}
          </BadgeNew>
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
          ] as [BadgeNewTone, string][]
        ).map(([tone, n]) => (
          <BadgeNew key={tone} tone={tone} emphasis="solid" size="sm">
            {n}
          </BadgeNew>
        ))}
      </Row>
    </Stack>
  ),
};

/** Where each one lives in the product: a table row, the sidebar's Soon row, tab counts, filter chips. */
export const InPlace: Story = {
  render: function InPlaceStory() {
    const [filters, setFilters] = useState(['Status: Active', 'Source: LDAP', 'Team: Platform']);
    const ink = 'hsl(var(--mdt-foreground))';
    const muted = 'hsl(var(--mdt-muted-foreground))';
    const line = '1px solid hsl(var(--mdt-neutral-20))';
    const rows: [string, string, BadgeNewTone, string, BadgeNewPalette | undefined, string][] = [
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
              <BadgeNew size="sm" tone={tone} dot>
                {status}
              </BadgeNew>
              {palette ? (
                <BadgeNew size="sm" shape="square" palette={palette}>
                  {source}
                </BadgeNew>
              ) : (
                <BadgeNew size="sm" shape="square">
                  {source}
                </BadgeNew>
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
          <BadgeNew size="sm" tone="slate">
            soon
          </BadgeNew>
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
            <BadgeNew size="sm" tone="inverse" emphasis="solid">
              24
            </BadgeNew>
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
            <BadgeNew size="sm" tone="slate">
              11
            </BadgeNew>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {filters.map((f) => (
            <BadgeNew
              key={f}
              shape="square"
              onRemove={() => {
                setFilters((cur) => cur.filter((x) => x !== f));
              }}
              removeLabel={`Remove ${f}`}
            >
              {f}
            </BadgeNew>
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
  },
  argTypes: {
    tone: { control: 'select', options: TONES },
    emphasis: { control: 'radio', options: ['fill', 'outline', 'solid'] },
    shape: { control: 'radio', options: ['pill', 'square'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    dot: { control: 'boolean' },
    children: { control: 'text' },
  },
};
