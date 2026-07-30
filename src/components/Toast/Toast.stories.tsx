import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast, toast, usePromotionalOpen } from './Toast';
import type { ToasterProps, ToastTone } from './Toast.types';
import { Button } from '../Button';
import { Icon } from '../Icon';

/**
 * The toaster's own props, plus one that belongs to the toast rather than the
 * toaster: which tone the button at the top fires.
 *
 * It is here because the table is meant to be the way you try the component,
 * and the toaster alone cannot show you what a toast looks like.
 */
type ToastStoryArgs = ToasterProps & { tone: ToastTone };

const meta: Meta<ToastStoryArgs> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A brief message that appears over the page and clears itself. Use it to confirm something happened, not to ask for anything - a toast cannot be relied on to be read.',
      },
      // Spelled out rather than left to the default, for one reason: the
      // default repeats the first story - once at the top, then again under
      // Stories. `includePrimary={false}` means the top of the page is a single
      // toast you can steer with the table under it, and the Stories section
      // below starts where the examples actually start.
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories includePrimary={false} />
        </>
      ),
    },
    controls: {
      exclude: ['class'],
    },
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['success', 'danger', 'warning', 'info', 'neutral', 'ai'],
      description:
        'Which tone the toast below uses. Only the icon and the border carry it — the text stays the same in all six.',
      table: {
        category: 'Toast',
        defaultValue: { summary: 'success' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
      table: {
        type: { summary: 'string' },
      },
    },
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      description: 'Position of the toaster on screen',
      table: {
        defaultValue: { summary: 'bottom-right' },
      },
    },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'system'],
      description: 'Theme of the toaster',
      table: {
        defaultValue: { summary: 'light' },
      },
    },
    expand: {
      control: 'boolean',
      description: 'Whether toasts should expand on hover',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    duration: {
      control: 'number',
      description: 'Default duration for all toasts (in milliseconds)',
      table: {
        defaultValue: { summary: '4000' },
      },
    },
    visibleToasts: {
      control: 'number',
      description: 'Maximum number of visible toasts',
      table: {
        defaultValue: { summary: '3' },
      },
    },
  },
  // The toaster is fed the story's own args, which is what makes the props
  // table on the docs page do something. Rendering a bare `<Toast />` here -
  // as this did - left every control inert: you could change `position` or
  // `duration` and nothing happened, because the toaster reading them was not
  // the one on screen.
  decorators: [
    (Story, context) => {
      // `tone` belongs to the toast, not the toaster, so it is kept back here -
      // passing it on would land an unknown attribute on the DOM.
      const { tone: _tone, ...toaster } = context.args;
      return (
        <div className="mdt-flex mdt-min-h-[160px] mdt-w-full mdt-items-center mdt-justify-center">
          <Story />
          <Toast {...toaster} />
        </div>
      );
    },
  ],
  // Spelled out so the table opens with real values rather than blanks.
  // `success` rather than `neutral` on purpose: neutral is the one tone with no
  // colour in it, which makes a poor first thing to see at the top of the page.
  args: {
    tone: 'success',
    position: 'bottom-right',
    theme: 'light',
    expand: false,
    duration: 4000,
    visibleToasts: 3,
  },
};

export default meta;
type Story = StoryObj<ToastStoryArgs>;

/** A labelled row of triggers, so everything sits on one page. */
const Row = ({
  label,
  note,
  children,
}: Readonly<{ label: string; note?: string; children: React.ReactNode }>) => (
  <div className="mdt-flex mdt-flex-col mdt-gap-2">
    <div className="mdt-flex mdt-flex-col mdt-gap-0.5">
      <span className="mdt-text-sm mdt-font-semibold mdt-text-foreground">{label}</span>
      {note ? <span className="mdt-text-xs mdt-text-muted-foreground">{note}</span> : null}
    </div>
    <div className="mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-2">{children}</div>
  </div>
);

/**
 * Stand-in artwork for the promotional toast.
 *
 * Drawn from our own tokens rather than loaded from somewhere, so the story
 * works with no network and nothing to keep in sync.
 */
const PromoArt = () => (
  <div className="mdt-flex mdt-items-center mdt-justify-center mdt-bg-gradient-to-br mdt-from-blue-90 mdt-via-purple-90 mdt-to-blue-70">
    <Icon name="sparkles" size="xl" aria-hidden className="mdt-text-blue-20" />
  </div>
);

/**
 * The promotional row, with its triggers switched off while one is open.
 *
 * There can only be one promotional toast at a time, and a disabled trigger is
 * how you say so - the same way Blade does it. Showing a second would silently
 * replace the first, which reads as the click not working.
 */
const PromotionalRow = () => {
  const open = usePromotionalOpen();

  return (
    <Row
      label="Promotional"
      note="An announcement, not a report — its own layer at the bottom, with the ordinary stack above it. Only one at a time, so these switch off while one is open."
    >
      <Button
        variant="outline"
        size="sm"
        disabled={open}
        onClick={() => {
          toast.promotional({
            title: 'Introducing Agent Fleet',
            media: <PromoArt />,
            description:
              'Roll out, update and retire agents across every site from one screen. No more per-host scripts, and no more guessing which build is where.',
            action: { label: 'Take a look', onClick: () => toast.success('Opening Agent Fleet') },
          });
        }}
      >
        Full — picture and action
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={open}
        onClick={() => {
          toast.promotional({
            title: 'Scheduled maintenance on 4 August',
            description: 'Reporting will be read-only between 01:00 and 03:00 IST.',
          });
        }}
      >
        Text only
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={open}
        onClick={() => {
          toast.promotional({
            title: 'Dark mode has arrived',
            media: <PromoArt />,
            closable: false,
          });
        }}
      >
        Picture, no cross
      </Button>
      <Button
        variant="ghost"
        size="sm"
        disabled={!open}
        onClick={() => {
          toast.dismissPromotional();
        }}
      >
        Dismiss it
      </Button>
    </Row>
  );
};

/** Every trigger is the same quiet button, so the toast is what you look at. */
const Fire = ({
  onClick,
  children,
}: Readonly<{ onClick: () => void; children: React.ReactNode }>) => (
  <Button variant="outline" size="sm" onClick={onClick}>
    {children}
  </Button>
);

/**
 * One toast, driven by the table below.
 *
 * Change anything in **Controls** — where it appears, how long it stays, how
 * many stack up — then press the button and the change is there. The table is
 * the way you try the component, not a list to read.
 */
export const Default: Story = {
  render: ({ tone }) => (
    <Button
      onClick={() => {
        toast[tone]('Domain verified', {
          description: 'portal.acmehealth.com now serves the branded portal.',
        });
      }}
    >
      Show toast
    </Button>
  ),
};

/**
 * **Everything the toast can do, on one page.**
 *
 * Fire any of them from here and watch it appear — no hopping between pages to
 * compare one type against another.
 */
export const ToastVariants: Story = {
  name: 'Toast variants',
  parameters: { layout: 'padded', controls: { disable: true } },
  render: () => (
    <div className="mdt-flex mdt-max-w-3xl mdt-flex-col mdt-gap-7">
      <Row label="Types" note="Six tones. Only the icon and the border carry the tone.">
        <Fire onClick={() => toast.success('Changes saved successfully')}>Success</Fire>
        <Fire onClick={() => toast.danger('Failed to save changes')}>Danger</Fire>
        <Fire onClick={() => toast.warning('Please review your input')}>Warning</Fire>
        <Fire onClick={() => toast.info('New features are available')}>Info</Fire>
        <Fire onClick={() => toast.neutral('Retention is a platform standard')}>Neutral</Fire>
        <Fire onClick={() => toast.ai('Three orgs match this attribute scope')}>AI</Fire>
        <Fire onClick={() => toast.loading('Loading your data')}>Loading</Fire>
      </Row>

      <Row
        label="With a description"
        note="A heading in ink 900, a line under it in ink 700 — the same in every tone."
      >
        <Fire
          onClick={() =>
            toast.success('Domain verified', {
              description: 'portal.acmehealth.com now serves the branded portal.',
            })
          }
        >
          Success
        </Fire>
        <Fire
          onClick={() =>
            toast.danger('This action can’t be undone', {
              description: 'Offboarding releases the subdomain and disables every portal.',
            })
          }
        >
          Danger
        </Fire>
        <Fire
          onClick={() =>
            toast.warning('Suspension scheduled', {
              description:
                'Acme Healthcare suspends on 24 Jul 2026. Members keep access until then.',
            })
          }
        >
          Warning
        </Fire>
        <Fire
          onClick={() =>
            toast.info('Subdomain is immutable', {
              description: 'It becomes this client’s permanent portal address after creation.',
            })
          }
        >
          Info
        </Fire>
        <Fire
          onClick={() =>
            toast.neutral('Retention is a platform standard', {
              description: '90-day hold, then anonymization; purge after 365 days.',
            })
          }
        >
          Neutral
        </Fire>
        <Fire
          onClick={() =>
            toast.ai('AI suggestion', {
              description: 'Three orgs match this attribute scope — apply it to all?',
            })
          }
        >
          AI
        </Fire>
      </Row>

      <PromotionalRow />

      <Row label="Content">
        <Fire
          onClick={() =>
            toast('Event has been created', {
              action: { label: 'Undo', onClick: () => toast.success('Undone') },
            })
          }
        >
          With an action
        </Fire>
        <Fire
          onClick={() =>
            toast(
              'This is a very long toast message that shows how the component handles extensive text. It should wrap properly and stay readable without breaking the layout.'
            )
          }
        >
          Long message
        </Fire>
        <Fire
          onClick={() =>
            toast.danger('Session expired', {
              description: 'Sign in again to continue.',
              closable: false,
            })
          }
        >
          Without the cross
        </Fire>
      </Row>

      <Row label="Icons" note="The tone icon can be replaced, or removed entirely.">
        <Fire
          onClick={() =>
            toast.success('Payment processed successfully', {
              icon: <Icon name="check-circle" size="md" aria-hidden={true} />,
            })
          }
        >
          Custom success
        </Fire>
        <Fire
          onClick={() =>
            toast.error('Failed to process payment', {
              icon: <Icon name="x-circle" size="md" aria-hidden={true} />,
            })
          }
        >
          Custom error
        </Fire>
        <Fire
          onClick={() =>
            toast.warning('Your session will expire soon', {
              icon: <Icon name="alert-triangle" size="md" aria-hidden={true} />,
            })
          }
        >
          Custom warning
        </Fire>
        <Fire
          onClick={() =>
            toast.info('New update available', {
              icon: <Icon name="info" size="md" aria-hidden={true} />,
            })
          }
        >
          Custom info
        </Fire>
        <Fire onClick={() => toast('Celebration notification', { icon: '🎉' })}>Emoji</Fire>
        <Fire onClick={() => toast('No icon toast', { icon: null })}>No icon</Fire>
      </Row>

      <Row label="Behaviour">
        <Fire
          onClick={() => {
            toast('First notification');
            setTimeout(() => toast.success('Second — success'), 200);
            setTimeout(() => toast.error('Third — error'), 400);
            setTimeout(() => toast.warning('Fourth — warning'), 600);
            setTimeout(() => toast.info('Fifth — info'), 800);
          }}
        >
          Five at once
        </Fire>
        <Fire
          onClick={() => {
            const job = new Promise<{ data: string }>((resolve, reject) => {
              const willSucceed = Math.random() > 0.5;
              setTimeout(() => {
                if (willSucceed) {
                  resolve({ data: 'ok' });
                } else {
                  // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
                  reject('Failed to fetch data');
                }
              }, 2000);
            });
            toast.promise(job, {
              loading: 'Loading data…',
              success: 'Data loaded successfully',
              error: 'Failed to load data',
            });
          }}
        >
          Promise — succeeds or fails
        </Fire>
        <Fire onClick={() => toast('Gone in 1 second', { duration: 1000 })}>1 second</Fire>
        <Fire onClick={() => toast('Stays for 10 seconds', { duration: 10000 })}>10 seconds</Fire>
        <Fire
          onClick={() => {
            toast.dismiss();
          }}
        >
          Dismiss all
        </Fire>
      </Row>

      <Row label="Where it appears">
        <Fire onClick={() => toast('Top left', { position: 'top-left' })}>Top left</Fire>
        <Fire onClick={() => toast('Top centre', { position: 'top-center' })}>Top centre</Fire>
        <Fire onClick={() => toast('Top right', { position: 'top-right' })}>Top right</Fire>
        <Fire onClick={() => toast('Bottom left', { position: 'bottom-left' })}>Bottom left</Fire>
        <Fire onClick={() => toast('Bottom centre', { position: 'bottom-center' })}>
          Bottom centre
        </Fire>
        <Fire onClick={() => toast('Bottom right', { position: 'bottom-right' })}>
          Bottom right
        </Fire>
      </Row>
    </div>
  ),
};
