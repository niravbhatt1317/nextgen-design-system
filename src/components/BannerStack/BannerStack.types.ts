import type { ComponentPropsWithoutRef } from 'react';
import type { BannerOwnProps, BannerProps } from '../Banner/Banner.types';

/**
 * One notice in the stack - a library `Banner`'s own props, plus the two things
 * the stack needs to place it: who it is and how much it matters.
 *
 * `placement` is not here: every notice in a stack is the edge-to-edge `page`
 * banner, because the stack is the page's notice slot.
 */
export type BannerStackItem = Omit<BannerProps, 'placement'> & {
  /** Stable and unique within the stack. A change of the set of ids re-sorts it and starts it collapsed. */
  id: string;

  /**
   * Higher comes first, and the highest is the one shown in full at the front.
   * Left out, the tone decides: danger 50, warning 40, info and ai 30, success
   * 20, neutral 10. Equal priorities keep the order they were given in.
   */
  priority?: number | undefined;

  /** @default 'inline' - every notice in a stack keeps one row, the console's choice. */
  actionPlacement?: BannerOwnProps['actionPlacement'];
};

export interface BannerStackOwnProps {
  /** The notices. The stack sorts them; one notice renders plainly, two or more fold into the stack. */
  items: readonly BannerStackItem[];

  /** The group's accessible name. @default 'Notices' */
  label?: string | undefined;

  /**
   * What a screen reader is told while two or more are stacked.
   * @default (n) => `${n} notices stacked. Hover, focus or tap to expand.`
   */
  stackedAnnouncement?: ((count: number) => string) | undefined;

  className?: string | undefined;
}

export type BannerStackProps = BannerStackOwnProps &
  Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'children' | 'role'>;
