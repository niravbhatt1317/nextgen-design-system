import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { cn } from '@/utils';
import { Button } from '../Button';
import { Icon } from '../Icon';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './Dialog';

/**
 * THROWAWAY. Five ways to draw a shortcut that needs more than one key, so they
 * can be compared in one place. Delete this file once one is chosen.
 *
 * Nothing here is exported from the library and nothing imports it. The tones,
 * the 20px height and the 4px radius are the shipped chip's - only the
 * arrangement changes, so what is being compared is the arrangement.
 */
const meta: Meta = {
  title: 'Components/Dialog/Key chip trial',
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj;

/** The shipped chip's own look. Every option below is built from this. */
const CELL = [
  'mdt-inline-flex mdt-h-5 mdt-items-center mdt-justify-center',
  'mdt-rounded mdt-border mdt-border-primary-foreground-subtle',
  'mdt-text-primary-foreground-muted',
].join(' ');

/** How the whole thing sits in the button - the shipped chip's margins. */
const SEAT = 'mdt-ml-1.5 -mdt-mr-1.5 mdt-inline-flex mdt-items-center';

/** A key, with a name of its own so nothing has to be keyed by its position. */
interface Key {
  id: string;
  glyph: ReactNode;
}

const Cmd = () => <Icon name="command" size="xs" aria-hidden />;
const Shift = () => <Icon name="arrow-big-up" size="xs" aria-hidden />;
const Enter = () => <Icon name="corner-down-left" size="xs" aria-hidden />;
const Letter = ({ children }: { children: ReactNode }) => (
  <span className="mdt-text-xs mdt-leading-none">{children}</span>
);

/** 1 — one chip, the keys inside it. */
const OneChip = ({ keys }: { keys: Key[] }) => (
  <span className={SEAT} aria-hidden>
    <span className={cn(CELL, 'mdt-gap-1.5 mdt-px-1.5')}>
      {keys.map((key) => (
        <span key={key.id} className="mdt-inline-flex">
          {key.glyph}
        </span>
      ))}
    </span>
  </span>
);

/** 2 — a chip per key, 4px between them. */
const Separate = ({ keys, gap }: { keys: Key[]; gap: string }) => (
  <span className={cn(SEAT, gap)} aria-hidden>
    {keys.map((key) => (
      <span key={key.id} className={cn(CELL, 'mdt-w-5')}>
        {key.glyph}
      </span>
    ))}
  </span>
);

/** 3 — one chip, a hairline between the keys, inset top and bottom. */
const Divided = ({ keys }: { keys: Key[] }) => (
  <span className={SEAT} aria-hidden>
    <span className={cn(CELL, 'mdt-overflow-hidden')}>
      {keys.map((key, i) => (
        <span key={key.id} className="mdt-inline-flex mdt-items-center">
          {i > 0 && (
            // 12 tall in a 20 chip: 4px of inset top and bottom, stated rather
            // than stretched. `self-stretch` measured 1x0 - it stretches to the
            // row's own height, and the row is only as tall as a 12px icon.
            <span className="mdt-h-3 mdt-w-px mdt-bg-primary-foreground-subtle" />
          )}
          <span className="mdt-inline-flex mdt-w-5 mdt-justify-center">{key.glyph}</span>
        </span>
      ))}
    </span>
  </span>
);

/** 5 — one chip, the modifiers a tone quieter than the key they modify. */
const ToneSplit = ({ keys }: { keys: Key[] }) => (
  <span className={SEAT} aria-hidden>
    <span className={cn(CELL, 'mdt-gap-1.5 mdt-px-1.5')}>
      {keys.map((key, i) => (
        <span
          key={key.id}
          className={cn(
            'mdt-inline-flex',
            i < keys.length - 1 && 'mdt-text-primary-foreground-subtle'
          )}
        >
          {key.glyph}
        </span>
      ))}
    </span>
  </span>
);

const TWO: Key[] = [
  { id: 'cmd', glyph: <Cmd /> },
  { id: 'enter', glyph: <Enter /> },
];
const THREE: Key[] = [
  { id: 'cmd', glyph: <Cmd /> },
  { id: 'shift', glyph: <Shift /> },
  { id: 'e', glyph: <Letter>E</Letter> },
];

const OPTIONS: { n: string; note: string; render: (keys: Key[]) => ReactNode }[] = [
  {
    n: '1 · One chip',
    note: 'Both keys inside a single box. One object, so it never competes with the label for attention.',
    render: (keys) => <OneChip keys={keys} />,
  },
  {
    n: '2 · Separate, 4px',
    note: 'A cap per key. Reads as keys because that is what a keyboard looks like.',
    render: (keys) => <Separate keys={keys} gap="mdt-gap-1" />,
  },
  {
    n: '3 · One chip, divided',
    note: 'A hairline between the keys, inset 4px top and bottom.',
    render: (keys) => <Divided keys={keys} />,
  },
  {
    n: '4 · Separate, 2px',
    note: 'Mine. Option 2 pulled tight - still caps, but one shape at a glance.',
    render: (keys) => <Separate keys={keys} gap="mdt-gap-0.5" />,
  },
  {
    n: '5 · One chip, tone split',
    note: 'Mine. No extra geometry: the modifier sits a tone quieter than the key it modifies.',
    render: (keys) => <ToneSplit keys={keys} />,
  },
];

/**
 * Five arrangements, two and three keys each, on the button they would live on.
 *
 * Same tones, same 20px height, same 4px radius as the shipped single-key chip.
 * Only the arrangement changes.
 */
export const Options: Story = {
  render: function KeyChipOptions() {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Compare
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent size="xl">
            <DialogHeader>
              <DialogTitle>Shortcuts that need more than one key</DialogTitle>
              <DialogDescription>
                Five arrangements of the same chip. Two keys on the left, three on the right.
              </DialogDescription>
            </DialogHeader>
            <DialogBody className="mdt-flex mdt-flex-col mdt-gap-5">
              {OPTIONS.map((option) => (
                <div key={option.n} className="mdt-flex mdt-items-center mdt-gap-6">
                  <div className="mdt-w-56 mdt-shrink-0">
                    <p className="mdt-text-sm mdt-font-medium">{option.n}</p>
                    <p className="mdt-text-xs mdt-text-muted-foreground">{option.note}</p>
                  </div>
                  <Button>
                    Start research
                    {option.render(TWO)}
                  </Button>
                  <Button>
                    Edit
                    {option.render(THREE)}
                  </Button>
                </div>
              ))}
            </DialogBody>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};
