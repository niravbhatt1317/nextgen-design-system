import type {
  ComponentPropsWithoutRef,
  HTMLAttributeAnchorTarget,
  MouseEventHandler,
  ReactNode,
} from 'react';

/**
 * The three faces an action card takes.
 *
 * - `default` a settled item: a domain, a connection, a sign-in method.
 * - `add`     the dashed blue card that starts something new ("Add domain").
 * - `edit`    the card held open for inline editing: `children` takes the body.
 */
export type ActionCardVariant = 'default' | 'add' | 'edit';

export interface ActionCardProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'title' | 'onClick'
> {
  /** @default 'default' */
  variant?: ActionCardVariant;
  /** The glyph or logo in the 36px tile on the left. Leave out for no tile. */
  icon?: ReactNode;
  /** The name on the first line. When the card is clickable this is also its accessible name. */
  title?: ReactNode;
  /** A Badge beside the title: Live, Off, Draft, Test failed. */
  badge?: ReactNode;
  /** The second line. An array is drawn as a meta line split by hairlines: "SAML 2.0 | 2,104 sign-ins". */
  description?: ReactNode | ReactNode[];
  /** Controls on the right: a Switch, a Button, an AvatarStack. They stay clickable on their own. */
  actions?: ReactNode;
  /** The ⋯ button at the far right, set off from `actions` by a hairline. */
  menu?: ReactNode;
  /** Fades the tile: a retired or switched-off item that is kept. */
  dim?: boolean;
  /** Fires when the card itself is clicked: open a modal, a drawer, an inline edit, change the content. */
  onClick?: MouseEventHandler<HTMLElement>;
  /** Makes the card a link: a click follows it. */
  href?: string;
  /** Where `href` opens. `_blank` adds `rel="noopener noreferrer"`. */
  target?: HTMLAttributeAnchorTarget;
  /**
   * Whether the card responds to a click at all. With `onClick` or `href` it
   * does by default; pass `false` to hold it still (read-only, a busy row).
   * @default true
   */
  clickable?: boolean;
  /** The `edit` variant's body: the field being edited. Replaces title and description. */
  children?: ReactNode;
}
