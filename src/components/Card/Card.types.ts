import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

/**
 * How the card separates itself from what is behind it.
 *
 * - `filled`    the default. A white card on a white page measures 1.00, so the
 *               border is not decoration - it is the only thing giving the card
 *               a shape. It cannot be removed.
 * - `secondary` a quiet block inside a busier area. The fill carries it at 1.14
 *               light and 1.26 dark, so it needs no border; adding one draws a
 *               hard edge around something meant to recede.
 * - `outline`   border only, no fill. For sitting on an already-tinted area,
 *               where a white card reads as a patch stuck on top.
 * - `elevated`  a shadow instead of a border, for anything you pick up and move.
 *               In dark it lifts by making the *surface* lighter rather than the
 *               shadow darker - a shadow on a near-black page is invisible.
 */
export type CardSurface = 'filled' | 'secondary' | 'outline' | 'elevated';

/**
 * The inset shared by every part, so the eyebrow, the heading, the body text and
 * the footer all start on the same vertical line.
 *
 * - `normal`  20px. The default.
 * - `compact` 14px, for Kanban columns, sidebars and long lists.
 * - `none`    zero, for content that brings its own spacing - a full-bleed
 *             image, or a table that must reach the edges.
 */
export type CardPadding = 'normal' | 'compact' | 'none';

export interface CardOwnProps {
  /** How the card separates itself from the page. @default 'filled' */
  surface?: CardSurface | undefined;

  /** The inset shared by every part. @default 'normal' */
  padding?: CardPadding | undefined;

  /** Media, header, body and footer - all optional, always in that order. */
  children?: ReactNode | undefined;

  /** Extra classes. Must use the `mdt-` prefix. */
  className?: string | undefined;
}

export type CardProps = CardOwnProps & Omit<ComponentPropsWithoutRef<'div'>, 'className'>;

export interface CardHeaderOwnProps {
  /** A mark before the titles - an icon tile or an avatar. Sits at the top. */
  leading?: ReactNode | undefined;

  /** A short uppercase label above the heading. */
  eyebrow?: ReactNode | undefined;

  /** The card's title. */
  heading?: ReactNode | undefined;

  /** A sentence under the heading. */
  supporting?: ReactNode | undefined;

  /** Quieter detail under the supporting text - who, when. */
  meta?: ReactNode | undefined;

  /**
   * The right-hand slot. **One** thing: a badge, a link, or one icon button.
   *
   * It sits on the header's vertical middle, not its first line - a chip or a
   * menu button belongs to the whole header rather than to the title.
   */
  trailing?: ReactNode | undefined;

  /**
   * Removes the dividing line.
   *
   * The line is on by default because a header is a **region**, not a label:
   * collapse a card and the header is the whole card, so its edge has to be
   * real. Use `plain` for the rarer case where the title and its content are a
   * single thought - a label naming the rows directly beneath it.
   *
   * A header with nothing after it drops the line on its own.
   * @default false
   */
  plain?: boolean | undefined;

  /**
   * The element the heading is drawn as. Defaults to `h3` on a static card, and
   * is forced to a plain `span` inside a clickable or collapsible card, where a
   * heading may not sit inside the control.
   */
  headingAs?: ElementType | undefined;

  /** Anything else, under the titles and inside the header's inset. */
  children?: ReactNode | undefined;

  /** Extra classes. Must use the `mdt-` prefix. */
  className?: string | undefined;
}

export type CardHeaderProps = CardHeaderOwnProps &
  Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'children'>;

export interface CardBodyOwnProps {
  /** Anything - text, rows, form fields, a chart, an inset panel. */
  children?: ReactNode | undefined;
  /** Extra classes. Must use the `mdt-` prefix. */
  className?: string | undefined;
}

export type CardBodyProps = CardBodyOwnProps &
  Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'children'>;

export interface CardFooterOwnProps {
  /** Quiet detail on the left - a count, a timestamp. */
  meta?: ReactNode | undefined;

  /**
   * Up to **two** buttons, on the right. Two is the cap: a third means the card
   * is doing too much.
   */
  actions?: ReactNode | undefined;

  /** Removes the dividing line. See {@link CardHeaderOwnProps.plain}. @default false */
  plain?: boolean | undefined;

  /** Used instead of `meta` and `actions` when the footer holds something else. */
  children?: ReactNode | undefined;

  /** Extra classes. Must use the `mdt-` prefix. */
  className?: string | undefined;
}

export type CardFooterProps = CardFooterOwnProps &
  Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'children'>;

export interface CardMediaOwnProps {
  /** An image, an illustration, a chart. Runs edge to edge, ignoring the inset. */
  children?: ReactNode | undefined;
  /** Extra classes. Must use the `mdt-` prefix. */
  className?: string | undefined;
}

export type CardMediaProps = CardMediaOwnProps &
  Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'children'>;

/**
 * A card that is one big target.
 *
 * Shipped as its own component rather than a switch on `Card`, so that the
 * invalid version - a button inside a button - **cannot be built**. If the card
 * needs its own buttons, it is a plain `Card` and the buttons are the targets.
 */
export interface ClickableCardOwnProps extends CardOwnProps {
  /** Where it goes. With this it renders an anchor; without it, a button. */
  href?: string | undefined;
  /** What it does. */
  onClick?: (() => void) | undefined;
}

export type ClickableCardProps = ClickableCardOwnProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'onClick' | 'href'>;

/**
 * A card whose header opens and closes it.
 *
 * The header **is** the control, so it cannot also hold buttons. Collapsed, the
 * header is the whole card - and its dividing line drops, because there is
 * nothing left underneath for it to divide.
 */
export interface CollapsibleCardOwnProps extends Omit<CardOwnProps, 'children'> {
  /** Everything the header shows. */
  header: Omit<CardHeaderOwnProps, 'trailing' | 'plain' | 'headingAs'>;
  /** What is revealed. */
  children?: ReactNode | undefined;
  /** Open to begin with, when the card manages its own state. @default false */
  defaultOpen?: boolean | undefined;
  /** Drives the card from outside. Pair it with `onOpenChange`. */
  open?: boolean | undefined;
  /** Called with the state the card is moving to. */
  onOpenChange?: ((open: boolean) => void) | undefined;
  /** The element the heading is drawn as, wrapping the control. @default 'h3' */
  headingAs?: ElementType | undefined;
}

export type CollapsibleCardProps = CollapsibleCardOwnProps &
  Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'children'>;
