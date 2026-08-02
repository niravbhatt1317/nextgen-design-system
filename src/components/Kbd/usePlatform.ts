import { useSyncExternalStore } from 'react';
import type { KbdPlatform } from './Kbd.types';

/** The two things a browser might tell us about the machine. Both optional. */
interface PlatformSource {
  userAgentData?: { platform?: string };
  platform?: string;
}

/** Nothing to subscribe to - the machine does not change under you. */
const subscribe = () => () => undefined;

const read = (): KbdPlatform => {
  if (typeof navigator === 'undefined') return 'windows';
  // `userAgentData` where it exists, `platform` where it does not. iPadOS
  // reports as a Mac, which is right for this: it takes a keyboard and that
  // keyboard has a Command key.
  // Read through a shape of our own rather than through `Navigator`.
  // `navigator.platform` is deprecated and every browser still answers it,
  // while `userAgentData` is Chromium-only - so both are wanted, and going
  // through the real type means importing the deprecation with them.
  const nav = navigator as unknown as PlatformSource;
  const raw = nav.userAgentData?.platform ?? nav.platform ?? '';
  return /mac|iphone|ipad|ipod/i.test(raw) ? 'mac' : 'windows';
};

/**
 * Which machine this is, for resolving `mod` and `alt`.
 *
 * `useSyncExternalStore` rather than an effect, so a client-rendered page gets
 * the right answer on its **first** paint - an effect would draw `Ctrl` and
 * then swap it for `⌘`, which is a flicker on exactly the surface that is
 * meant to be glanced at. A server-rendered page gets `windows` and corrects
 * itself on hydration without a mismatch, which is what the third argument is
 * for.
 */
export const usePlatform = (override?: KbdPlatform): KbdPlatform => {
  // `read` serves as the server snapshot too: with no `navigator` it already
  // answers `windows`, which is the right guess for a machine nobody has
  // pressed a key on yet. A second function saying the same thing would be a
  // second place to keep it true.
  const detected = useSyncExternalStore(subscribe, read, read);
  return override ?? detected;
};
