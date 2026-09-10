import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties, ReactNode } from 'react';

/* ────────────────────────────────────────────────────────────────
 * Foundation / Colors
 *
 * Every swatch on this page is read LIVE from the running stylesheet.
 * Nothing is typed out, so nothing can drift from the token it describes —
 * which is exactly how the page this replaces went wrong.
 * ──────────────────────────────────────────────────────────────── */

interface Family {
  key: string;
  name: string;
  role: string;
  steps: number[];
  /** The lightest step that still reads at 4.5:1 on this family's own tint. */
  ink: number | null;
  added: boolean;
}

const RAMP = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const FAMILIES: Family[] = [
  {
    key: 'neutral',
    name: 'Neutral',
    role: 'Text, borders and surfaces',
    steps: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
    ink: null,
    added: false,
  },
  {
    key: 'red',
    name: 'Red',
    role: 'Danger',
    steps: [5, 10, 20, 30, 40, 50, 60, 65, 70, 80, 90, 100],
    ink: 70,
    added: false,
  },
  {
    key: 'orange',
    name: 'Orange',
    role: 'Warning',
    steps: [5, 10, 20, 30, 40, 50, 60, 65, 70, 80, 90, 100],
    ink: 80,
    added: false,
  },
  { key: 'yellow', name: 'Yellow', role: 'Caution', steps: RAMP, ink: 90, added: false },
  { key: 'green', name: 'Green', role: 'Success', steps: RAMP, ink: 80, added: false },
  {
    key: 'blue',
    name: 'Blue',
    role: 'Brand, information, the focus edge',
    steps: [5, 10, 20, 30, 40, 50, 55, 60, 65, 70, 80, 90, 100],
    ink: 80,
    added: false,
  },
  { key: 'purple', name: 'Purple', role: 'AI', steps: RAMP, ink: 90, added: false },
  {
    key: 'indigo',
    name: 'Indigo',
    role: 'Category — the LDAP source chip',
    steps: RAMP,
    ink: 70,
    added: true,
  },
  {
    key: 'teal',
    name: 'Teal',
    role: 'Category — the SCIM source chip',
    steps: RAMP,
    ink: 80,
    added: true,
  },
  { key: 'magenta', name: 'Magenta', role: 'Category', steps: RAMP, ink: 80, added: true },
  { key: 'cyan', name: 'Cyan', role: 'Category', steps: RAMP, ink: 80, added: true },
  { key: 'lime', name: 'Lime', role: 'Category', steps: RAMP, ink: 80, added: true },
];

/** What each rung of a ladder is good for. A number alone is not a system. */
const JOBS: Record<number, [string, string]> = {
  5: ['Wash', 'the faintest possible ground'],
  10: ['Tint', 'chip and banner backgrounds'],
  20: ['Tint strong', 'avatar circles, a pressed tint'],
  30: ['Border soft', 'dividers drawn inside a tint'],
  40: ['Border', 'outlines and control edges'],
  50: ['Light solid', 'disabled fills, chart bands'],
  55: ['Half-step', 'between light and solid'],
  60: ['Solid', 'the colour itself — dots, icons, fills'],
  65: ['Half-step', 'between solid and its hover'],
  70: ['Solid dark', 'hover and pressed'],
  80: ['Ink', 'text sitting on a tint'],
  90: ['Ink deep', 'text that needs more weight'],
  100: ['Deepest', 'dark-mode grounds'],
  110: ['—', 'deep neutral'],
  120: ['—', 'deep neutral'],
  130: ['—', 'deep neutral'],
  140: ['—', 'deep neutral'],
  150: ['—', 'deep neutral'],
  160: ['Near-black', 'the darkest ground'],
};

/** The names the console and this library both use, for different colours. */
const DISAGREEMENTS: { token: string; library: string; console: string; apart: number }[] = [
  { token: 'purple-70', library: '#A64DFF', console: '#5B27B0', apart: 2.17 },
  { token: 'purple-60', library: '#B366FF', console: '#6C2ED1', apart: 2.12 },
  { token: 'blue-70', library: '#004BCC', console: '#0A2666', apart: 1.94 },
  { token: 'orange-60', library: '#FF6F00', console: '#FDB13F', apart: 1.53 },
  { token: 'green-80', library: '#1B6540', console: '#21823A', apart: 1.45 },
  { token: 'orange-70', library: '#CC5800', console: '#DA7D0B', apart: 1.39 },
  { token: 'orange-80', library: '#994200', console: '#9F6404', apart: 1.37 },
  { token: 'neutral-100', library: '#485875', console: '#384861', apart: 1.29 },
  { token: 'blue-55', library: '#2474FF', console: '#036EBA', apart: 1.27 },
  { token: 'neutral-110', library: '#2B3950', console: '#1D2B3E', apart: 1.23 },
  { token: 'red-50', library: '#EC5B5B', console: '#E74536', apart: 1.17 },
  { token: 'neutral-70', library: '#677FA2', console: '#727283', apart: 1.15 },
];
const SLIGHT = 12;

/* ── reading the live stylesheet ───────────────────────────── */

const readVar = (name: string): string => {
  if (typeof document === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

/** "218 100% 50%" → "#005EFF". Returns '' when the token is missing. */
const hslToHex = (triplet: string): string => {
  const parts = triplet.replace(/%/g, '').split(/\s+/).map(Number);
  const [h, s, l] = parts;
  if (h === undefined || s === undefined || l === undefined || Number.isNaN(h)) return '';
  const S = s / 100;
  const L = l / 100;
  const c = (1 - Math.abs(2 * L - 1)) * S;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = L - c / 2;
  const segs: [number, number, number][] = [
    [c, x, 0],
    [x, c, 0],
    [0, c, x],
    [0, x, c],
    [x, 0, c],
    [c, 0, x],
  ];
  const seg = segs[Math.floor(h / 60) % 6] ?? [0, 0, 0];
  return `#${seg
    .map((v) =>
      Math.round((v + m) * 255)
        .toString(16)
        .padStart(2, '0')
        .toUpperCase()
    )
    .join('')}`;
};

const luminance = (hex: string): number => {
  const chan = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * (chan[0] ?? 0) + 0.7152 * (chan[1] ?? 0) + 0.0722 * (chan[2] ?? 0);
};

const contrast = (a: string, b: string): number => {
  if (a === '' || b === '') return 0;
  const [hi, lo] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return ((hi ?? 0) + 0.05) / ((lo ?? 0) + 0.05);
};

/** The wash step is written `05`, not `5`, everywhere in the stylesheet. */
const stepName = (step: number): string => (step < 10 ? `0${String(step)}` : String(step));

const shadeHex = (family: string, step: number): string =>
  hslToHex(readVar(`--mdt-${family}-${stepName(step)}`));

/* ── page furniture ────────────────────────────────────────── */

const page: CSSProperties = {
  maxWidth: 1080,
  margin: '0 auto',
  padding: '32px 24px 72px',
  fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
  color: 'hsl(var(--mdt-foreground))',
};
const mono: CSSProperties = { fontFamily: 'ui-monospace, "Cascadia Mono", Consolas, monospace' };

const Title = ({ children, lead }: { children: ReactNode; lead?: string }): ReactNode => (
  <header style={{ marginBottom: 28 }}>
    <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em', margin: 0 }}>
      {children}
    </h1>
    {lead !== undefined ? (
      <p
        style={{
          margin: '10px 0 0',
          maxWidth: '68ch',
          fontSize: 14.5,
          lineHeight: 1.6,
          color: 'hsl(var(--mdt-muted-foreground))',
        }}
      >
        {lead}
      </p>
    ) : null}
  </header>
);

const Note = ({ children }: { children: ReactNode }): ReactNode => (
  <div
    style={{
      borderLeft: '3px solid hsl(var(--mdt-blue-60))',
      background: 'hsl(var(--mdt-muted) / 0.5)',
      borderRadius: '0 10px 10px 0',
      padding: '14px 18px',
      margin: '24px 0',
      fontSize: 13.5,
      lineHeight: 1.65,
      maxWidth: '80ch',
    }}
  >
    {children}
  </div>
);

const copy = (value: string): void => {
  if (typeof navigator !== 'undefined' && (navigator.clipboard as unknown) !== undefined) {
    void navigator.clipboard.writeText(value);
  }
};

/** One rung. Click it to copy the token name. */
const Rung = ({
  family,
  step,
  isInk,
}: {
  family: string;
  step: number;
  isInk: boolean;
}): ReactNode => {
  const hex = shadeHex(family, step);
  const token = `--mdt-${family}-${stepName(step)}`;
  return (
    <button
      type="button"
      onClick={() => {
        copy(token);
      }}
      title={`${token} — ${hex === '' ? 'MISSING' : hex}`}
      style={{
        all: 'unset',
        cursor: 'pointer',
        borderRadius: 8,
        overflow: 'hidden',
        border: '1px solid hsl(var(--mdt-border))',
        background: 'hsl(var(--mdt-card))',
      }}
    >
      <span
        style={{
          display: 'block',
          height: 46,
          background:
            hex === '' ? 'repeating-linear-gradient(45deg,#f33 0 6px,#fff 6px 12px)' : hex,
        }}
      />
      <span style={{ display: 'block', padding: '5px 4px 6px', textAlign: 'center' }}>
        <span
          style={{
            display: 'block',
            fontSize: 11,
            fontWeight: 600,
            color: isInk ? 'hsl(var(--mdt-blue-60))' : 'hsl(var(--mdt-muted-foreground))',
          }}
        >
          {stepName(step)}
        </span>
        <span
          style={{
            ...mono,
            display: 'block',
            fontSize: 9,
            color: 'hsl(var(--mdt-muted-foreground))',
          }}
        >
          {hex === '' ? 'missing' : hex}
        </span>
      </span>
    </button>
  );
};

const Ladder = ({ family }: { family: Family }): ReactNode => (
  <section style={{ marginBottom: 26 }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 10,
        flexWrap: 'wrap',
        marginBottom: 8,
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 600 }}>{family.name}</span>
      <span style={{ fontSize: 12, color: 'hsl(var(--mdt-muted-foreground))' }}>{family.role}</span>
      {family.added ? (
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            padding: '2px 8px',
            borderRadius: 999,
            background: 'hsl(var(--mdt-indigo-10))',
            color: 'hsl(var(--mdt-indigo-70))',
          }}
        >
          added 2026-09-10
        </span>
      ) : null}
      {family.ink !== null ? (
        <span style={{ ...mono, fontSize: 11, color: 'hsl(var(--mdt-muted-foreground))' }}>
          text at −{family.ink}
        </span>
      ) : null}
    </div>
    <div style={{ overflowX: 'auto' }}>
      <div
        style={{
          display: 'grid',
          gap: 6,
          minWidth: 760,
          gridTemplateColumns: `repeat(${String(family.steps.length)}, minmax(0, 1fr))`,
        }}
      >
        {family.steps.map((step) => (
          <Rung key={step} family={family.key} step={step} isInk={family.ink === step} />
        ))}
      </div>
    </div>
  </section>
);

const meta = {
  title: 'Foundation/Colors',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'Twelve families, 141 shades. **Every swatch is read live from the running stylesheet**,',
          'so this page cannot drift from the tokens it describes — which is how the page it',
          'replaces went wrong. Click any swatch to copy its token name.',
          '',
          'Reach for a token, never a hex code: `hsl(var(--mdt-blue-60))`.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The whole palette, one family per row. Seven families were already here; five
 * were added on 10 Sep 2026 because our interface needed colours that carry no
 * meaning, and there was nothing to reach for — so they had been written by
 * hand into the chip code instead.
 *
 * Click any swatch to copy its token name.
 */
export const Palette: Story = {
  render: () => (
    <div style={page}>
      <Title lead="Twelve families, 141 shades. Read live from the stylesheet, so nothing here can go stale. Click a swatch to copy its token name.">
        Colour palette
      </Title>
      {FAMILIES.map((family) => (
        <Ladder key={family.key} family={family} />
      ))}
      <Note>
        <b>The five category families</b> — indigo, teal, magenta, cyan and lime — carry no meaning
        on purpose, so a source chip or an avatar never reads as success, warning or danger. Their
        anchor shades are exactly the colours those chips already painted by hand, so nothing on
        screen moved when they landed.
      </Note>
    </div>
  ),
};

/**
 * A number on its own is not a system. Every rung has a job, so picking a shade
 * is a decision about what you are drawing rather than a guess at brightness.
 */
export const WhatEachShadeIsFor: Story = {
  render: () => (
    <div style={page}>
      <Title lead="Shown on Blue. Nothing here is a new colour — only a name for what each existing shade is good for.">
        What each shade is for
      </Title>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 560, fontSize: 13.5 }}>
          <thead>
            <tr>
              {['', 'Step', 'Job', 'What you draw with it'].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: 'left',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '.05em',
                    textTransform: 'uppercase',
                    color: 'hsl(var(--mdt-muted-foreground))',
                    padding: '0 14px 8px 0',
                    borderBottom: '1px solid hsl(var(--mdt-border))',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(FAMILIES[5]?.steps ?? []).map((step) => {
              const job = JOBS[step] ?? ['—', ''];
              return (
                <tr key={step}>
                  <td
                    style={{
                      padding: '9px 14px 9px 0',
                      borderBottom: '1px solid hsl(var(--mdt-border) / 0.5)',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: 34,
                        height: 22,
                        borderRadius: 5,
                        background: shadeHex('blue', step),
                        border: '1px solid hsl(var(--mdt-border))',
                      }}
                    />
                  </td>
                  <td
                    style={{
                      ...mono,
                      padding: '9px 14px 9px 0',
                      borderBottom: '1px solid hsl(var(--mdt-border) / 0.5)',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {stepName(step)}
                  </td>
                  <td
                    style={{
                      padding: '9px 14px 9px 0',
                      borderBottom: '1px solid hsl(var(--mdt-border) / 0.5)',
                      fontWeight: 600,
                    }}
                  >
                    {job[0]}
                  </td>
                  <td
                    style={{
                      padding: '9px 14px 9px 0',
                      borderBottom: '1px solid hsl(var(--mdt-border) / 0.5)',
                      color: 'hsl(var(--mdt-muted-foreground))',
                    }}
                  >
                    {job[1]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  ),
};

/**
 * Each family publishes its own text shade: the lightest step that still reads
 * at 4.5:1 on that family's own tint. It is not the same number everywhere,
 * because a bright hue cannot carry text at a middle shade.
 *
 * The ratios below are measured on the page as it renders, not typed in.
 */
export const TextOnATint: Story = {
  render: () => (
    <div style={page}>
      <Title lead="Tint at −10, dot at −60, text at the family's own text shade. Every ratio is measured live.">
        Text on a tint
      </Title>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
        {FAMILIES.filter((f) => f.ink !== null).map((family) => {
          const tint = shadeHex(family.key, 10);
          const ink = shadeHex(family.key, family.ink ?? 80);
          const dot = shadeHex(family.key, 60);
          const ratio = contrast(ink, tint);
          const passes = ratio >= 4.5;
          return (
            <div key={family.key} style={{ textAlign: 'center' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 11px',
                  borderRadius: 6,
                  fontSize: 12.5,
                  fontWeight: 500,
                  background: tint,
                  color: ink,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: 999, background: dot }} />
                {family.name}
              </span>
              <span
                style={{
                  ...mono,
                  display: 'block',
                  marginTop: 4,
                  fontSize: 10.5,
                  fontWeight: 600,
                  color: passes ? 'hsl(var(--mdt-green-80))' : 'hsl(var(--mdt-red-70))',
                }}
              >
                {ratio.toFixed(2)}:1
              </span>
              <span
                style={{
                  ...mono,
                  display: 'block',
                  fontSize: 9.5,
                  color: 'hsl(var(--mdt-muted-foreground))',
                }}
              >
                −{family.ink}
              </span>
            </div>
          );
        })}
      </div>
      <Note>
        Red reaches 4.5:1 at <b>−70</b>. Blue, green, orange and most of the category families need{' '}
        <b>−80</b>. Yellow and purple have to go all the way to <b>−90</b>. Publishing one text
        shade per family is the only honest answer; a single number across the palette would fail on
        the bright hues.
      </Note>
    </div>
  ),
};

/**
 * One name, two colours. The console re-points a set of these tokens in light
 * mode, so the same token paints differently depending on which side of the
 * fence you are standing on.
 *
 * This is not a bug to fix quietly — it is a decision, and it belongs to Nirav.
 */
export const StillDisagreed: Story = {
  render: () => (
    <div style={page}>
      <Title lead="Twenty-four token names paint one colour in this library and another in the console. Nothing on either side moves until each one is ruled on.">
        Where the console and the library disagree
      </Title>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 620, fontSize: 13 }}>
          <thead>
            <tr>
              {['Token', 'This library', 'The console', 'Apart'].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: 'left',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '.05em',
                    textTransform: 'uppercase',
                    color: 'hsl(var(--mdt-muted-foreground))',
                    padding: '0 14px 8px 0',
                    borderBottom: '1px solid hsl(var(--mdt-border))',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DISAGREEMENTS.map((row) => (
              <tr key={row.token}>
                <td
                  style={{
                    ...mono,
                    fontWeight: 600,
                    padding: '9px 14px 9px 0',
                    borderBottom: '1px solid hsl(var(--mdt-border) / 0.5)',
                  }}
                >
                  {row.token}
                </td>
                {[row.library, row.console].map((hex) => (
                  <td
                    key={hex}
                    style={{
                      padding: '9px 14px 9px 0',
                      borderBottom: '1px solid hsl(var(--mdt-border) / 0.5)',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: 22,
                        height: 22,
                        borderRadius: 5,
                        marginRight: 8,
                        verticalAlign: 'middle',
                        background: hex,
                        border: '1px solid hsl(var(--mdt-border))',
                      }}
                    />
                    <span style={{ ...mono, fontSize: 11.5 }}>{hex}</span>
                  </td>
                ))}
                <td
                  style={{
                    ...mono,
                    fontWeight: 600,
                    fontVariantNumeric: 'tabular-nums',
                    padding: '9px 14px 9px 0',
                    borderBottom: '1px solid hsl(var(--mdt-border) / 0.5)',
                    color:
                      row.apart >= 1.4 ? 'hsl(var(--mdt-red-70))' : 'hsl(var(--mdt-orange-80))',
                  }}
                >
                  {row.apart.toFixed(2)}×
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ marginTop: 12, fontSize: 12.5, color: 'hsl(var(--mdt-muted-foreground))' }}>
        Plus {SLIGHT} more that differ only slightly — rounding and near-misses, but still two
        answers to the same name.
      </p>
      <Note>
        Each of these is one of three things: <b>the console is right</b> and this library should
        adopt its value; <b>the library is right</b> and the console should drop its override; or{' '}
        <b>both are right</b> and they are genuinely different colours that need different names.
        Purple is the loudest — the console&rsquo;s is more than twice as dark as this one&rsquo;s.
      </Note>
    </div>
  ),
};
