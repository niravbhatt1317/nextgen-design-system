import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
import { Icon } from '../Icon';
import { InfoTip } from './InfoTip';

const meta: Meta<typeof InfoTip> = {
  title: 'New Components/InfoTip',
  component: InfoTip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'The ⓘ beside a heading or a label, in place of a helper paragraph. Its explainer opens in the library Tooltip on hover, on keyboard focus and on a press - touch has no hover - and a second press on the ⓘ does not blink it shut. Leaving, Escape, blur or a press anywhere else closes it.',
          '',
          'A 20px box holding the filled info glyph at 14, quiet at rest so it never competes with the heading beside it; the explainer opens under its start, reads from the left and wraps at 340.',
          '',
          'On hover, focus and while its explainer is open **only the glyph answers**: neutral-40 darkens to neutral-60 and nothing is drawn behind it, in either theme, so it never shows a pale box on a tinted card (Pranjal, 2026-10-27: "only icon should have hover"). The keyboard keeps its focus ring.',
          '',
          '`learnMore` adds a link at the foot. The pointer can travel into the bubble to reach it, and Tab on the open ⓘ moves into it; from the link, Tab moves on, Shift+Tab returns to the ⓘ and Escape closes.',
          '',
          "**Ported from the console (Pranjal, 2026-10-13)**, which had three hand-made copies: the Settings headings' ⓘ (its look), the offboarding cards' ⓘ (the same placement) and the setup drawers' ⓘ (its press-to-open behaviour). The link is new.",
        ].join('\n'),
      },
    },
  },
  args: {
    label: 'About Security policy',
    children:
      'Applies to every user in this organization. A stricter rule set on a site wins over this one.',
  },
  argTypes: {
    learnMore: { control: 'object' },
    icon: { control: false },
  },
  decorators: [
    (Story) => (
      <div className="mdt-flex mdt-min-h-[220px] mdt-items-start mdt-justify-center mdt-pt-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Beside a heading and beside a field label - where it lives. */
export const InContext: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="mdt-flex mdt-w-[24rem] mdt-flex-col mdt-gap-6">
      <div className="mdt-flex mdt-items-center mdt-gap-1">
        <h3 className="mdt-m-0 mdt-text-base mdt-font-semibold mdt-text-foreground">
          Security policy
        </h3>
        <InfoTip label="About Security policy">
          Applies to every user in this organization. A stricter rule set on a site wins over this
          one.
        </InfoTip>
      </div>
      <div className="mdt-flex mdt-items-center mdt-gap-1">
        <span className="mdt-text-[13px] mdt-font-medium mdt-text-neutral-90">Entity ID</span>
        <InfoTip label="About Entity ID">
          The name your identity provider knows OneOps by. Paste it into the provider&apos;s SAML
          settings.
        </InfoTip>
      </div>
    </div>
  ),
};

/**
 * Under the pointer, on a tinted card: only the glyph darkens (neutral-40 to neutral-60) - nothing is drawn
 * behind it, so no pale box shows on the danger wash (Pranjal, 2026-10-27). The play hovers the ⓘ.
 */
export const HoveredOnATintedCard: Story = {
  parameters: { controls: { disable: true } },
  play: async ({ canvasElement }) => {
    await userEvent.hover(within(canvasElement).getByRole('button', { name: 'About retiring' }));
  },
  render: () => (
    <div className="mdt-flex mdt-w-[24rem] mdt-items-center mdt-gap-1 mdt-rounded-lg mdt-border mdt-border-solid mdt-border-feedback-danger-border mdt-bg-feedback-danger-bg mdt-p-4">
      <h3 className="mdt-m-0 mdt-text-sm mdt-font-semibold mdt-text-foreground">
        Retire this agent
      </h3>
      <InfoTip label="About retiring">
        The agent stops reporting and its seat is released. Its history stays for 30 days.
      </InfoTip>
    </div>
  ),
};

/** A link at the foot of the explainer. */
export const WithLearnMore: Story = {
  args: {
    label: 'About SCIM',
    children:
      'Your identity provider creates, updates and removes users here, so nobody has to do it by hand.',
    learnMore: { href: 'https://scim.cloud', newTab: true },
  },
};

/** Another glyph with the same explainer. */
export const CustomIcon: Story = {
  args: {
    label: 'Why this mapping is broken',
    children:
      'The source attribute no longer exists in the directory. Pick another, or remove the row.',
    icon: <Icon name="alert-triangle" size={14} aria-hidden />,
  },
};
