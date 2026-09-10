import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button } from './Button';
import type { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';
import { Icon } from '../Icon';

const VARIANTS: ButtonVariant[] = [
  'primary',
  'secondary',
  'outline',
  'ghost',
  'destructive',
  'destructiveGhost',
  'link',
];
const SIZES: ButtonSize[] = ['sm', 'md', 'lg'];

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>{children}</div>
);
const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'grid', gap: 18 }}>{children}</div>
);
const Label = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      font: '600 11px/1 ui-monospace, monospace',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'hsl(var(--mdt-neutral-70))',
      marginBottom: 10,
    }}
  >
    {children}
  </div>
);

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**Behaviour reference — Claude artifacts:** [Button Variants](https://claude.ai/code/artifact/2418ec74-6852-43bf-9001-d028a8fccddf), every look, state and size on one live page, and [Button Spec](https://claude.ai/code/artifact/9e5401f0-4c01-49c5-8b1e-6072cd630e8c), the measurements drawn out. Open them to see how this component is meant to behave — they are what it was designed and approved from.\n\n' +
          'The merged console button. Seven looks, three heights of 28, 32 and 36, one text size of 13/20 and one glyph size of 16 at a 1.5 stroke. ' +
          'The height is not set directly: it comes from the 20px line the label sits on, so 6 above and 6 below make 32. ' +
          'Padding is decided by what meets each edge — 16 against a word, 12 against a glyph — which is why a button with a leading glyph is 12 on the left and 16 on the right. ' +
          'Hover and press move along the neutral ramp rather than fading the fill, because fading lightens a colour against a white page and costs the label its contrast.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: VARIANTS, description: 'The look, loudest to quietest' },
    size: { control: 'inline-radio', options: SIZES, description: '28, 32 or 36 tall' },
    children: { control: 'text', description: 'The label' },
    iconOnly: { control: 'boolean', description: 'A square holding one glyph and no label' },
    loading: { control: 'boolean', description: 'Busy: the disabled face with a spinner on it' },
    loadingText: { control: 'text', description: 'Swap the label while working' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    active: { control: 'boolean', description: 'Held on, the way an applied filter looks' },
    href: { control: 'text', description: 'Render an anchor instead of a button' },
    ariaLabel: { control: 'text', description: 'Required when iconOnly leaves no label to read' },
    leftIcon: { control: false },
    rightIcon: { control: false },
  },
  args: { children: 'Invite users', onClick: fn() },
};
export default meta;
type Story = StoryObj<ButtonProps>;

/** Change anything in the controls panel. */
export const Playground: Story = {
  args: { variant: 'primary', size: 'md', leftIcon: <Icon name="plus" /> },
};

/**
 * Seven looks. `secondary` is a quiet fill with no border, which is what keeps
 * it apart from `outline` — together with `primary` that gives three volumes a
 * reader can rank without reading the labels.
 */
export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <div>
        <Label>With a leading glyph</Label>
        <Row>
          {VARIANTS.map((v) => (
            <Button key={v} variant={v} leftIcon={v === 'link' ? undefined : <Icon name="plus" />}>
              {v}
            </Button>
          ))}
        </Row>
      </div>
      <div>
        <Label>Icon only</Label>
        <Row>
          {VARIANTS.filter((v) => v !== 'link').map((v) => (
            <Button
              key={v}
              variant={v}
              iconOnly
              ariaLabel={`${v} row actions`}
              leftIcon={<Icon name="more-vertical" />}
            />
          ))}
        </Row>
      </div>
    </Stack>
  ),
};

/**
 * Text, glyph, gap and side padding never change. Only the air above and below
 * moves, so the same words make the same width at every size.
 */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      {SIZES.map((s) => (
        <div key={s}>
          <Label>{s === 'sm' ? '28' : s === 'md' ? '32 · default' : '36'}</Label>
          <Row>
            <Button size={s} leftIcon={<Icon name="plus" />}>
              Invite users
            </Button>
            <Button size={s} variant="secondary">
              Secondary
            </Button>
            <Button size={s} variant="outline">
              Outline
            </Button>
            <Button size={s} variant="ghost">
              Ghost
            </Button>
            <Button
              size={s}
              variant="outline"
              iconOnly
              ariaLabel="Row actions"
              leftIcon={<Icon name="more-vertical" />}
            />
          </Row>
        </div>
      ))}
    </Stack>
  ),
};

/**
 * Padding follows the edge: 16 against a word, 12 against a glyph. A button with
 * a glyph on both sides is 12 on both; one with words at both edges is 16.
 */
export const WithAndWithoutIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <div>
        <Label>text only · 16 / 16</Label>
        <Row>
          <Button>Invite users</Button>
          <Button variant="outline">Cancel</Button>
        </Row>
      </div>
      <div>
        <Label>glyph, then text · 12 / 16</Label>
        <Row>
          <Button leftIcon={<Icon name="plus" />}>Invite users</Button>
          <Button variant="outline" leftIcon={<Icon name="filter" />}>
            More filters
          </Button>
        </Row>
      </div>
      <div>
        <Label>text, then glyph · 16 / 12</Label>
        <Row>
          <Button rightIcon={<Icon name="chevron-down" />}>25 rows per page</Button>
          <Button variant="outline" rightIcon={<Icon name="chevron-down" />}>
            Sort by
          </Button>
        </Row>
      </div>
      <div>
        <Label>glyph both sides · 12 / 12</Label>
        <Row>
          <Button leftIcon={<Icon name="plus" />} rightIcon={<Icon name="chevron-down" />}>
            Invite users
          </Button>
        </Row>
      </div>
      <div>
        <Label>icon only · a square the height of its size</Label>
        <Row>
          <Button iconOnly ariaLabel="Row actions" leftIcon={<Icon name="more-vertical" />} />
          <Button
            variant="outline"
            iconOnly
            ariaLabel="Manage columns"
            leftIcon={<Icon name="sliders" />}
          />
          <Button variant="ghost" iconOnly ariaLabel="Close" leftIcon={<Icon name="x" />} />
        </Row>
      </div>
    </Stack>
  ),
};

/**
 * Working wears the disabled face on purpose. In both cases there is nothing for
 * the reader to do, so they look alike, and the turning glyph is the part that
 * says wait rather than no.
 */
export const WorkingAndDisabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <div>
        <Label>working</Label>
        <Row>
          <Button loading loadingText="Sending…">
            Send invite
          </Button>
          <Button variant="outline" loading>
            Cancel
          </Button>
          <Button variant="destructive" loading loadingText="Deleting…">
            Delete user
          </Button>
          <Button iconOnly loading ariaLabel="Working" leftIcon={<Icon name="more-vertical" />} />
        </Row>
      </div>
      <div>
        <Label>disabled</Label>
        <Row>
          <Button disabled>Send invite</Button>
          <Button variant="outline" disabled>
            Cancel
          </Button>
          <Button variant="destructive" disabled>
            Delete user
          </Button>
          <Button
            iconOnly
            disabled
            ariaLabel="Row actions"
            leftIcon={<Icon name="more-vertical" />}
          />
        </Row>
      </div>
    </Stack>
  ),
};

/**
 * Keyboard focus lights the button's own edge and lifts its fill. Nothing is
 * drawn outside the box, so the mark can never touch a neighbour and the layout
 * never moves. Press Tab to walk it along the row.
 */
export const Focus: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      {VARIANTS.filter((v) => v !== 'link').map((v) => (
        <Button key={v} variant={v} leftIcon={<Icon name="plus" />}>
          {v}
        </Button>
      ))}
    </Row>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: /primary/i })).toHaveFocus();
  },
};

/** Held on, the way a toolbar control looks once its filter is applied. */
export const Active: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      <Button
        variant="outline"
        iconOnly
        ariaLabel="Filter by status"
        leftIcon={<Icon name="filter" />}
      />
      <Button
        variant="outline"
        active
        iconOnly
        ariaLabel="Filter by status, applied"
        leftIcon={<Icon name="filter" />}
      />
      <Button variant="ghost">Not applied</Button>
      <Button variant="ghost" active>
        Applied
      </Button>
    </Row>
  ),
};

/** A link is not a button shape. It takes no padding, and an outbound marker appears while the pointer is on it. */
export const AsLink: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ fontSize: 13, color: 'hsl(var(--mdt-neutral-90))' }}>
      Drop a file here, or{' '}
      <Button variant="link" href="https://example.com" target="_blank">
        select one from your computer
      </Button>
      .
    </div>
  ),
};

/** Stretches to its parent, the way a drawer footer's confirm does. */
export const FullWidth: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 320, display: 'grid', gap: 10 }}>
      <Button fullWidth leftIcon={<Icon name="plus" />}>
        Invite users
      </Button>
      <Button fullWidth variant="outline">
        Cancel
      </Button>
    </div>
  ),
};
