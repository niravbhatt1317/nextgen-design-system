import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Button } from '../Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../DropdownMenu';
import { Input } from '../Input';
import { Kbd } from './Kbd';
import { usePlatform } from './usePlatform';

/**
 * `Kbd` draws a keyboard shortcut as keys.
 *
 * **Keys go in as data** — `keys={['mod', 'shift', 'e']}`, not a hand-assembled
 * row of icons. That is what makes it something a model can write correctly,
 * and it is also what lets the component know which keys are modifiers, which
 * glyph each one takes, and what to say out loud.
 *
 * **`'mod'` is the one to reach for.** Command on a Mac, Control everywhere
 * else — which is what almost every shortcut actually means.
 *
 * It replaced five different drawings of the same idea: `CommandShortcut`,
 * `DropdownMenuShortcut`, a hand-written `<kbd>` in `Sidebar`, the chip inside
 * a dialog's primary button, and a trial of five more.
 */
const meta: Meta<typeof Kbd> = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { keys: ['mod', 'k'] },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** A labelled row, so the specimens below stay readable. */
const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="mdt-flex mdt-items-center mdt-gap-4">
    <span className="mdt-w-44 mdt-shrink-0 mdt-text-xs mdt-text-muted-foreground">{label}</span>
    <div className="mdt-flex mdt-items-center mdt-gap-4">{children}</div>
  </div>
);

export const Default: Story = {};

/**
 * Everything the component can be, in one place.
 *
 * The first four rows are the arrangement; the last three are the surface it is
 * drawn on. `separate` is the default because it is the only arrangement where
 * a three-key shortcut still reads as three things rather than as a word.
 */
export const Every: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <Row label="separate — the default">
        <Kbd keys={['mod', 'enter']} />
        <Kbd keys={['mod', 'shift', 'e']} />
      </Row>
      <Row label="separate, tight">
        <Kbd keys={['mod', 'enter']} tight />
        <Kbd keys={['mod', 'shift', 'e']} tight />
      </Row>
      <Row label="joined">
        <Kbd keys={['mod', 'enter']} layout="joined" />
        <Kbd keys={['mod', 'shift', 'e']} layout="joined" />
      </Row>
      <Row label="joined, dimModifiers">
        <Kbd keys={['mod', 'enter']} layout="joined" dimModifiers />
        <Kbd keys={['mod', 'shift', 'e']} layout="joined" dimModifiers />
      </Row>
      <Row label="filled">
        <Kbd keys={['mod', 'enter']} variant="filled" />
        <Kbd keys={['mod', 'shift', 'e']} variant="filled" layout="joined" />
      </Row>
      <Row label="sm · md · lg">
        <Kbd keys={['mod', 'k']} size="sm" />
        <Kbd keys={['mod', 'k']} size="md" />
        <Kbd keys={['mod', 'k']} size="lg" />
      </Row>
      <Row label="words and letters">
        <Kbd keys={['esc']} />
        <Kbd keys={['shift', 'tab']} />
        <Kbd keys={['ctrl', 'alt', 'delete']} />
        <Kbd keys={['g', 'g']} />
        <Kbd keys={['F5']} />
      </Row>
    </div>
  ),
};

/**
 * `mod` is Command on a Mac and Control everywhere else.
 *
 * The row marked **this machine** is what you actually get — the component
 * reads the platform itself, so one `keys={['mod', 'enter']}` is correct on
 * both. The two rows below force it, which is what `platform` is for when you
 * are documenting a shortcut for a machine you are not on.
 *
 * `useSubmitShortcut` already accepts ⌘ *or* Ctrl at the event level, so a hint
 * that named one of them was telling half the people the wrong thing.
 */
export const Platform: Story = {
  render: function PlatformDemo() {
    const detected = usePlatform();

    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <Row label={`this machine — ${detected}`}>
          <Kbd keys={['mod', 'enter']} />
          <Kbd keys={['mod', 'alt', 'i']} />
        </Row>
        <Row label="forced: mac">
          <Kbd keys={['mod', 'enter']} platform="mac" />
          <Kbd keys={['mod', 'alt', 'i']} platform="mac" />
        </Row>
        <Row label="forced: windows">
          <Kbd keys={['mod', 'enter']} platform="windows" />
          <Kbd keys={['mod', 'alt', 'i']} platform="windows" />
        </Row>
      </div>
    );
  },
};

/**
 * Where it goes.
 *
 * **In a button, do not compose it by hand** — `Button` has a `shortcut` prop
 * that seats the caps in the trailing padding and picks the ink from the
 * button's own variant. Both are things the button knows and a caller would
 * have to guess.
 *
 * **Never on a destructive action.** Nobody should be able to delete something
 * by muscle memory, and a keyboard path to an irreversible act is exactly that.
 *
 * Everywhere else it is `<Kbd>` directly: at the end of a menu row, inside a
 * search field, in a legend. In a menu and a legend the keys *are* the
 * information, so they are announced; in a button the label already says what
 * it does, so `Button` passes `decorative`.
 */
export const Usage: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-[34rem] mdt-flex-col mdt-gap-8">
      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <p className="mdt-text-xs mdt-text-muted-foreground">
          In a button — <code>shortcut</code>, not a nested <code>&lt;Kbd&gt;</code>
        </p>
        <div className="mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-3">
          <Button shortcut={['mod', 'enter']}>Send invite</Button>
          <Button variant="outline" shortcut={['esc']}>
            Cancel
          </Button>
          <Button size="sm" shortcut={['mod', 'enter']}>
            Small
          </Button>
          <Button variant="destructive">Delete — no shortcut, deliberately</Button>
        </div>
      </div>

      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <p className="mdt-text-xs mdt-text-muted-foreground">In a menu row</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mdt-w-56">
            <DropdownMenuItem>
              New file
              <Kbd keys={['mod', 'n']} className="mdt-ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem>
              Edit
              <Kbd keys={['mod', 'shift', 'e']} className="mdt-ml-auto" dimModifiers />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Close
              <Kbd keys={['mod', 'w']} className="mdt-ml-auto" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <p className="mdt-text-xs mdt-text-muted-foreground">In a search field</p>
        <div className="mdt-relative">
          <Input placeholder="Search…" aria-label="Search" className="mdt-pr-16" />
          <Kbd
            keys={['mod', 'k']}
            size="sm"
            variant="filled"
            className="mdt-absolute mdt-right-2 mdt-top-1/2 mdt--translate-y-1/2"
          />
        </div>
      </div>

      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <p className="mdt-text-xs mdt-text-muted-foreground">
          In a legend — here the keys are the information, so they are announced
        </p>
        <dl className="mdt-flex mdt-flex-col mdt-gap-2 mdt-rounded-md mdt-border mdt-border-border mdt-p-3">
          {[
            { keys: ['mod', 'k'], what: 'Open the command palette' },
            { keys: ['mod', 'enter'], what: 'Submit the form you are in' },
            { keys: ['esc'], what: 'Close whatever is open' },
            { keys: ['g', 'g'], what: 'Jump to the top' },
          ].map((row) => (
            <div key={row.what} className="mdt-flex mdt-items-center mdt-justify-between">
              <dt className="mdt-text-sm">{row.what}</dt>
              <dd>
                <Kbd keys={row.keys} variant="filled" size="sm" />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  ),
};
