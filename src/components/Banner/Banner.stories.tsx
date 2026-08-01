import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Banner } from './Banner';
import { Button } from '../Button';
import type { BannerTone } from './Banner.types';

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A message that sits in the page and stays there.',
          '',
          'All four product teams built one, which puts it near the top of the gap list.',
          'It is about the thing it sits above, it waits for you, and it can carry as many',
          'actions as the situation actually needs.',
          '',
          '**It is not a Toast.** They share the six tones and the same palette deliberately —',
          'a warning should look like a warning wherever it appears. Everything about how they',
          'behave is different, and that is what decides which one a screen should use.',
          '',
          '| | Toast | Banner |',
          '| --- | --- | --- |',
          '| Where it is | Floating over the page, in a corner | In the layout, where it belongs |',
          '| How it leaves | On a timer, or swiped away | Only when the reason has gone |',
          '| What it is about | Something that just happened | The state of the thing it sits above |',
          '| Actions | One at most — there is no time for two | As many as the situation needs |',
          '| Announced as | A live region — it interrupts | A region in the page — read in order |',
          '',
          '**The one-line test:** if you would still need the message after a refresh, it is a banner.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'danger', 'ai'],
    },
    placement: { control: 'inline-radio', options: ['inline', 'page'] },
    actionPlacement: { control: 'inline-radio', options: ['auto', 'inline', 'below'] },
    title: { control: 'text' },
    description: { control: 'text' },
    actions: { control: false },
    icon: { control: false },
    onDismiss: { control: false },
  },
  args: {
    tone: 'warning',
    title: 'Your trial ends in 3 days',
    description: 'After that, agents keep read-only access until a plan is chosen.',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div className="mdt-flex mdt-max-w-3xl mdt-flex-col mdt-gap-3">{children}</div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="mdt-mb-2 mdt-text-xs mdt-font-medium mdt-text-muted-foreground">{children}</p>
);

export const Default: Story = {
  args: {
    onDismiss: () => undefined,
    actions: (
      <Button variant="secondary" size="sm">
        Choose a plan
      </Button>
    ),
  },
};

const TONES: readonly { tone: BannerTone; title: string }[] = [
  { tone: 'neutral', title: 'Retention is set by the platform, not by this org' },
  { tone: 'info', title: 'Maintenance on Sunday, 02:00–04:00 UTC' },
  { tone: 'success', title: 'All 1,204 assets imported' },
  { tone: 'warning', title: 'Two agents have not signed in for 90 days' },
  { tone: 'danger', title: 'Sync has been failing since 14:20' },
  { tone: 'ai', title: 'Three tickets look like duplicates of INC-4471' },
];

/**
 * Only the icon carries the tone. **The words stay one colour in every tone**,
 * so a danger banner is not also harder to read than an info one — the same
 * rule Toast already follows.
 */
export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      {TONES.map(({ tone, title }) => (
        <Banner key={tone} tone={tone} title={title} onDismiss={() => undefined} />
      ))}
    </Stack>
  ),
};

/** A second line, for when the headline is not the whole story. */
export const WithDescription: Story = {
  name: 'With a description',
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <Banner
        tone="danger"
        title="Sync has been failing since 14:20"
        description="Six runs in a row returned 403 from the connector. Nothing new has come in since."
        onDismiss={() => undefined}
      />
    </Stack>
  ),
};

/**
 * **Never a primary button.** A solid button is the loudest thing on a page and
 * a banner is not the page — put one in a warning and it outranks the Save
 * button the person came for. `secondary`, `ghost` or `link`, and the quieter
 * one goes on the left.
 *
 * Whatever you pass, **the banner recolours it in its own tone** — the library's
 * general `secondary` is a blue-grey, and on a cream banner it reads as a chip
 * borrowed from another screen. A `ghost` still stays empty until you are on it,
 * and a `link` still stays a bare word.
 */
export const WithActions: Story = {
  name: 'With actions',
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <div>
        <Label>One action — sits beside the words, on the banner’s centre line</Label>
        <Banner
          tone="warning"
          title="Your trial ends in 3 days"
          description="After that, agents keep read-only access until a plan is chosen."
          actions={
            <Button variant="secondary" size="sm">
              Choose a plan
            </Button>
          }
          onDismiss={() => undefined}
        />
      </div>
      <div>
        <Label>Two actions — drop to their own line, quieter one first</Label>
        <Banner
          tone="info"
          title="A newer agent build is available"
          description="Version 4.18 fixes the discovery timeout on large subnets."
          actions={
            <>
              <Button variant="ghost" size="sm">
                Read the notes
              </Button>
              <Button variant="secondary" size="sm">
                Update all agents
              </Button>
            </>
          }
          onDismiss={() => undefined}
        />
      </div>
      <div>
        <Label>A link, for somewhere very tight</Label>
        <Banner
          tone="ai"
          title="Three tickets look like duplicates of INC-4471"
          actions={
            <Button variant="link" size="sm">
              Review
            </Button>
          }
          onDismiss={() => undefined}
        />
      </div>
      <div>
        <Label>Every tone recolours its own action</Label>
        <Stack>
          {TONES.map(({ tone, title }) => (
            <Banner
              key={tone}
              tone={tone}
              title={title}
              actions={
                <Button variant="secondary" size="sm">
                  Take a look
                </Button>
              }
              onDismiss={() => undefined}
            />
          ))}
        </Stack>
      </div>
    </Stack>
  ),
};

/**
 * The rule in one line: **one action sits beside the words, two or more go on
 * their own line.** It is counted, never measured, so the same banner always
 * renders the same way.
 *
 * Override it when several banners stack and you want them all one height, or
 * when the message is long enough that even one action should drop.
 */
export const ActionPlacement: Story = {
  name: 'Where the actions go',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="mdt-flex mdt-max-w-sm mdt-flex-col mdt-gap-5">
      <p className="mdt-text-xs mdt-text-muted-foreground">
        Shown in a narrow column, which is where the difference actually matters.
      </p>
      <div>
        <Label>auto — one action, so it stays beside</Label>
        <Banner
          tone="warning"
          title="Your trial ends in 3 days"
          actions={
            <Button variant="secondary" size="sm">
              Choose a plan
            </Button>
          }
          onDismiss={() => undefined}
        />
      </div>
      <div>
        <Label>below — forced down, for a long message</Label>
        <Banner
          tone="warning"
          title="Your trial ends in 3 days"
          description="After that, agents keep read-only access until a plan is chosen."
          actionPlacement="below"
          actions={
            <Button variant="secondary" size="sm">
              Choose a plan
            </Button>
          }
          onDismiss={() => undefined}
        />
      </div>
      <div>
        <Label>inline — held beside, even with two. It gets tight.</Label>
        <Banner
          tone="info"
          title="A newer agent build is available"
          actionPlacement="inline"
          actions={
            <>
              <Button variant="ghost" size="sm">
                Notes
              </Button>
              <Button variant="secondary" size="sm">
                Update
              </Button>
            </>
          }
          onDismiss={() => undefined}
        />
      </div>
    </div>
  ),
};

/**
 * The cross means *"I have read this"*, never *"I have dealt with it"* — so it
 * is always last and it is never counted as one of the actions.
 *
 * Leave `onDismiss` out entirely for a banner that has to stay until the reason
 * for it has gone.
 */
export const Dismissible: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    const [shown, setShown] = useState(true);

    return (
      <Stack>
        {shown ? (
          <Banner
            tone="success"
            title="All 1,204 assets imported"
            description="Nothing was skipped. The report is in Exports."
            actions={
              <Button variant="secondary" size="sm">
                Open the report
              </Button>
            }
            onDismiss={() => {
              setShown(false);
            }}
          />
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShown(true);
            }}
          >
            Bring it back
          </Button>
        )}
      </Stack>
    );
  },
};

/**
 * `page` runs the banner edge to edge across the top of a view — no rounding
 * and no side edges, because there is nothing beside it to be edged against.
 */
export const Placement: Story = {
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-8 mdt-p-6">
      <div>
        <Label>page — across the top of a view</Label>
        <div className="mdt-overflow-hidden mdt-rounded-lg mdt-border mdt-border-border">
          <Banner
            placement="page"
            tone="danger"
            title="Sync has been failing since 14:20"
            actions={
              <Button variant="secondary" size="sm">
                Check the connector
              </Button>
            }
            onDismiss={() => undefined}
          />
          <div className="mdt-flex mdt-flex-col mdt-gap-3 mdt-p-5">
            <div className="mdt-h-2 mdt-w-2/5 mdt-rounded-full mdt-bg-muted" />
            <div className="mdt-h-2 mdt-w-3/4 mdt-rounded-full mdt-bg-muted" />
            <div className="mdt-h-2 mdt-w-1/2 mdt-rounded-full mdt-bg-muted" />
          </div>
        </div>
      </div>
      <div>
        <Label>inline — inside a panel or a form</Label>
        <div className="mdt-max-w-3xl">
          <Banner
            tone="danger"
            title="Sync has been failing since 14:20"
            actions={
              <Button variant="secondary" size="sm">
                Check the connector
              </Button>
            }
            onDismiss={() => undefined}
          />
        </div>
      </div>
    </div>
  ),
};

/**
 * Pass your own glyph, or `null` to drop it. Dropping it is worth considering
 * for `neutral`, where the message is a statement of fact rather than a state.
 */
export const CustomIcon: Story = {
  name: 'A different glyph, or none',
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <Banner
        tone="neutral"
        icon={null}
        title="Retention is set by the platform"
        onDismiss={() => undefined}
      />
      <Banner
        tone="info"
        icon={<span aria-hidden>🛠️</span>}
        title="Maintenance on Sunday, 02:00–04:00 UTC"
        onDismiss={() => undefined}
      />
    </Stack>
  ),
};

/**
 * The glyph sits in a box exactly one line tall, so on a single line everything
 * shares one centre and the moment the text wraps the glyph stays beside the
 * **first** line rather than halfway down a paragraph. One rule, both
 * behaviours.
 */
export const LongMessage: Story = {
  name: 'When the text wraps',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="mdt-max-w-md">
      <Banner
        tone="warning"
        title="Two agents have not signed in for 90 days"
        description="Agents that stay dormant past 120 days are archived automatically, and archived agents keep their history but stop counting towards the seat total on the next billing run."
        actions={
          <Button variant="secondary" size="sm">
            Review agents
          </Button>
        }
        onDismiss={() => undefined}
      />
    </div>
  ),
};
