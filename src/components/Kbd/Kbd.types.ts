import type { ComponentPropsWithoutRef } from 'react';

/** Which machine a shortcut is being read on. */
export type KbdPlatform = 'mac' | 'windows';

/**
 * A key in a shortcut.
 *
 * The named ones are resolved to the right glyph and the right spoken name;
 * anything else is drawn and announced as itself, so `'e'`, `'/'` and `'F5'`
 * need no entry in the table.
 *
 * **`'mod'` is the one to reach for.** It is Command on a Mac and Control
 * everywhere else, which is what almost every shortcut actually means.
 */
export type KbdNamedKey =
  | 'mod'
  | 'cmd'
  | 'command'
  | 'meta'
  | 'ctrl'
  | 'control'
  | 'alt'
  | 'option'
  | 'shift'
  | 'win'
  | 'enter'
  | 'return'
  | 'esc'
  | 'escape'
  | 'tab'
  | 'space'
  | 'backspace'
  | 'delete'
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'pageup'
  | 'pagedown'
  | 'home'
  | 'end';

// The intersection keeps the named keys as autocomplete suggestions while still
// accepting any string - `'e'` and `'F5'` are perfectly good keys.
export type KbdKey = KbdNamedKey | (string & {});

/** How the keys are arranged. */
export type KbdLayout = 'separate' | 'joined';

/** Whether a key is drawn as an outline or as a filled block. */
export type KbdVariant = 'outline' | 'filled';

/** How big the keys are. */
export type KbdSize = 'sm' | 'md' | 'lg';

/**
 * Which ink the keys are drawn in.
 *
 * `default` sits on an ordinary surface - a menu row, a list, a page. `inverted`
 * sits on a solid, saturated one, which in practice means a primary button.
 * Two named tones rather than `currentColor` faded by a percentage: Tailwind
 * cannot mix an alpha into `currentColor`, and a percentage is a number nobody
 * can look up.
 */
export type KbdTone = 'default' | 'inverted';

export interface KbdProps extends Omit<ComponentPropsWithoutRef<'kbd'>, 'children'> {
  /**
   * The keys, in the order they are pressed.
   *
   * Data rather than markup, deliberately: `keys={['mod', 'shift', 'e']}` is
   * something a model gets right, and a hand-assembled row of icons is not.
   * This library's primary consumer is a machine.
   */
  keys: KbdKey[];

  /**
   * A cap per key, or one cap holding all of them.
   *
   * `separate` is the default because it is the only arrangement where a
   * three-key shortcut still reads as three things rather than as a word.
   */
  layout?: KbdLayout;

  /**
   * Outlined, or a filled block.
   *
   * `filled` is quieter and belongs where the shortcut is information rather
   * than an offer - a legend, a help panel, a list of what the keys do.
   */
  variant?: KbdVariant;

  /** How big the keys are. `md` matches the text beside it at `text-sm`. */
  size?: KbdSize;

  /** Which ink to draw in. See {@link KbdTone}. */
  tone?: KbdTone;

  /**
   * Pull the keys closer together.
   *
   * `separate` only. 2px instead of 4, so the caps read as one shape at a
   * glance while staying countable up close.
   */
  tight?: boolean;

  /**
   * Draw the modifiers a tone quieter than the key they modify.
   *
   * Hierarchy without extra geometry: in `⌘⇧E` the E is the part that changes
   * between shortcuts, and this is what makes it the part you read.
   */
  dimModifiers?: boolean;

  /**
   * Which machine to render for, if you know better than the browser does.
   *
   * Left alone, `mod` and `alt` follow the machine the page is on.
   */
  platform?: KbdPlatform;

  /**
   * Hide it from assistive technology.
   *
   * For when the shortcut is decoration on something that already says it - the
   * chip inside a button whose action is named right beside it. **Not** for a
   * shortcuts list or a menu row, where the keys are the information and
   * hiding them removes the only copy.
   */
  decorative?: boolean;

  /**
   * What to announce instead of the generated description.
   *
   * The default is the keys spelled out - "Command + Shift + E" - because the
   * symbols are the one thing a screen reader cannot help with.
   */
  label?: string;
}
