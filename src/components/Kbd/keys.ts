import type { IconName } from '../Icon/icons';
import type { KbdKey, KbdPlatform } from './Kbd.types';

/**
 * What one key looks like and what it is called.
 *
 * `glyph` is what is drawn - an icon name where Lucide has the real symbol, a
 * short string where it does not. `name` is what a screen reader says, which is
 * never the symbol: "⌘" read aloud is "place of interest sign".
 */
export interface ResolvedKey {
  icon?: IconName;
  text?: string;
  name: string;
}

/** Keys that read the same on every machine. */
const SHARED: Record<string, ResolvedKey> = {
  shift: { icon: 'arrow-big-up', name: 'Shift' },
  enter: { icon: 'corner-down-left', name: 'Enter' },
  return: { icon: 'corner-down-left', name: 'Return' },
  backspace: { icon: 'delete', name: 'Backspace' },
  delete: { icon: 'delete', name: 'Delete' },
  up: { icon: 'arrow-up', name: 'Up arrow' },
  down: { icon: 'arrow-down', name: 'Down arrow' },
  left: { icon: 'arrow-left', name: 'Left arrow' },
  right: { icon: 'arrow-right', name: 'Right arrow' },
  esc: { text: 'Esc', name: 'Escape' },
  escape: { text: 'Esc', name: 'Escape' },
  tab: { text: 'Tab', name: 'Tab' },
  space: { text: 'Space', name: 'Space' },
  ctrl: { text: 'Ctrl', name: 'Control' },
  control: { text: 'Ctrl', name: 'Control' },
  cmd: { icon: 'command', name: 'Command' },
  command: { icon: 'command', name: 'Command' },
  meta: { icon: 'command', name: 'Command' },
  win: { text: 'Win', name: 'Windows key' },
  pageup: { text: 'PgUp', name: 'Page up' },
  pagedown: { text: 'PgDn', name: 'Page down' },
  home: { text: 'Home', name: 'Home' },
  end: { text: 'End', name: 'End' },
};

/**
 * Keys that are a different key depending on the machine.
 *
 * `mod` is the point of this whole table. It is the modifier a shortcut
 * actually uses - Command on a Mac, Control everywhere else - and writing it
 * that way is what lets one `keys={['mod', 'enter']}` be correct on both.
 * `useSubmitShortcut` already accepts either at the event level, so a hint that
 * named one of them was telling half the people the wrong thing.
 */
const PER_PLATFORM: Record<string, Record<KbdPlatform, ResolvedKey>> = {
  mod: {
    mac: { icon: 'command', name: 'Command' },
    windows: { text: 'Ctrl', name: 'Control' },
  },
  alt: {
    mac: { icon: 'option', name: 'Option' },
    windows: { text: 'Alt', name: 'Alt' },
  },
  option: {
    mac: { icon: 'option', name: 'Option' },
    windows: { text: 'Alt', name: 'Alt' },
  },
};

/** Which keys are modifiers, for `dimModifiers` and for reading order. */
const MODIFIERS = new Set([
  'mod',
  'cmd',
  'command',
  'meta',
  'ctrl',
  'control',
  'alt',
  'option',
  'shift',
  'win',
]);

/** Whether a key is a modifier rather than the key being modified. */
export const isModifier = (key: KbdKey) => MODIFIERS.has(String(key).toLowerCase());

/**
 * One key, as a glyph to draw and a name to announce.
 *
 * Anything not in the table is drawn as itself and announced as itself, upper
 * cased - so `'e'`, `'/'` and `'F5'` all work without needing an entry. A
 * registry that refuses unknown keys would mean a pull request every time
 * somebody adds a shortcut.
 */
export const resolveKey = (key: KbdKey, platform: KbdPlatform): ResolvedKey => {
  const id = String(key).toLowerCase();
  const perPlatform = PER_PLATFORM[id];
  if (perPlatform) return perPlatform[platform];
  const shared = SHARED[id];
  if (shared) return shared;
  const text = String(key).length === 1 ? String(key).toUpperCase() : String(key);
  return { text, name: text };
};

/**
 * What the whole combination is called - "Command + Shift + E".
 *
 * Spelled out rather than symbolic, because the symbols are the one thing a
 * screen reader cannot help with.
 */
export const describeKeys = (keys: KbdKey[], platform: KbdPlatform) =>
  keys.map((key) => resolveKey(key, platform).name).join(' + ');
