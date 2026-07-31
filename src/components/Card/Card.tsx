import { cva } from 'class-variance-authority';
import { createContext, forwardRef, useCallback, useContext, useId, useState } from 'react';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type {
  CardBodyProps,
  CardFooterProps,
  CardHeaderProps,
  CardMediaProps,
  CardPadding,
  CardProps,
  ClickableCardProps,
  CollapsibleCardProps,
} from './Card.types';

/**
 * Card styles.
 *
 * ## What a card is, and is not
 *
 * A card is a **surface** that holds related content in the page. It does not
 * open, close, float over anything, freeze the page behind it, or hold your
 * keyboard - those are Modal and Popover, which borrow this surface and add
 * their own behaviour on top. The one-line test: if it *opens*, it is not a Card.
 *
 * ## One inset, every part
 *
 * A single padding value governs the media, header, body and footer, which is
 * why the eyebrow, the heading, the body text and the footer all start on the
 * same vertical line - and why changing it once moves everything together.
 *
 * ## Two different edges
 *
 * The card's own outline uses `border`; the lines *inside* it use `muted`, one
 * step lighter. An internal divider that matches the outer edge reads as a
 * second card rather than a seam. A dedicated divider token would say this
 * better - see PLAN.md.
 */
export const cardVariants = cva(
  [
    'mdt-relative mdt-flex mdt-flex-col',
    'mdt-overflow-hidden mdt-rounded-lg',
    'mdt-border mdt-border-solid',
    'mdt-transition-[background-color,border-color,box-shadow] mdt-duration-150',
    // A header sitting straight on top of a footer would otherwise draw the
    // line twice, 1px apart. The HEADER gives way, not the footer - drop the
    // footer's line instead and a header that had no line of its own (after
    // media, or `plain`) leaves the two with no seam between them at all.
    '[&>[data-slot=card-header]:has(+[data-slot=card-footer])]:mdt-border-b-0',
    // Media and the block under it are ONE unit. The image already separates
    // the top of the card, so a line under the title as well chops it into four
    // stacked bands. The header after media therefore goes plain on its own -
    // no prop to remember, and no way to get the four-band version by accident.
    '[&>[data-slot=card-media]+[data-slot=card-header]]:mdt-border-b-0',
    '[&>[data-slot=card-media]+[data-slot=card-header]]:mdt-pb-0',
  ],
  {
    variants: {
      surface: {
        // White on white measures 1.00 against the page. The border IS the shape.
        filled: 'mdt-border-border mdt-bg-card mdt-text-card-foreground',
        // 1.14 light, 1.26 dark. The fill carries it, so no border.
        secondary: 'mdt-border-transparent mdt-bg-secondary mdt-text-card-foreground',
        outline: 'mdt-border-border mdt-bg-transparent mdt-text-card-foreground',
        // In dark the shadow is invisible, so the lift comes from a lighter
        // surface instead: neutral-140 against a neutral-150 card measures 1.14.
        elevated: [
          'mdt-border-transparent mdt-bg-card mdt-text-card-foreground mdt-shadow-md',
          'dark:mdt-bg-neutral-140',
        ],
      },
      padding: { normal: '', compact: '', none: '' },
    },
    defaultVariants: { surface: 'filled', padding: 'normal' },
  }
);

/** 20px, 14px, 0 - the three insets, split so each part can use the sides it needs. */
const PAD: Record<CardPadding, { x: string; top: string; bottom: string }> = {
  normal: { x: 'mdt-px-5', top: 'mdt-pt-5', bottom: 'mdt-pb-5' },
  compact: { x: 'mdt-px-3.5', top: 'mdt-pt-3.5', bottom: 'mdt-pb-3.5' },
  none: { x: 'mdt-px-0', top: 'mdt-pt-0', bottom: 'mdt-pb-0' },
};

interface CardContextValue {
  padding: CardPadding;
  /** Inside a clickable or collapsible card, where a heading may not sit. */
  interactive: boolean;
}

const CardContext = createContext<CardContextValue>({ padding: 'normal', interactive: false });

const useCard = (): CardContextValue => useContext(CardContext);

/* ────────────────────────────── the surface ────────────────────────────── */

/**
 * Card - a surface that holds related content in the page.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader heading="Asset summary" supporting="Dell PowerEdge R750, rack 12." />
 *   <CardBody>…</CardBody>
 *   <CardFooter meta="Synced 4 min ago" actions={<Button>Open asset</Button>} />
 * </Card>
 * ```
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ surface, padding = 'normal', className, children, ...rest }, ref) => (
    <CardContext.Provider value={{ padding, interactive: false }}>
      <div
        ref={ref}
        className={cn(cardVariants({ surface, padding }), className)}
        data-slot="card"
        data-testid="card"
        {...rest}
      >
        {children}
      </div>
    </CardContext.Provider>
  )
);

Card.displayName = 'Card';

/* ─────────────────────────────── the parts ─────────────────────────────── */

/** Full-bleed. Ignores the inset and runs edge to edge, so it is always first. */
const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(
  ({ className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('mdt-block mdt-w-full mdt-shrink-0 mdt-overflow-hidden', className)}
      data-slot="card-media"
      data-testid="card-media"
      {...rest}
    >
      {children}
    </div>
  )
);

CardMedia.displayName = 'CardMedia';

/**
 * The header - a region with its own edge, not a label.
 *
 * The line is on by default. A header with nothing after it drops it on its own,
 * which is also what makes a collapsed card come out right for free.
 */
const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  (
    {
      leading,
      eyebrow,
      heading,
      supporting,
      meta,
      trailing,
      plain = false,
      headingAs,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const { padding, interactive } = useCard();
    const pad = PAD[padding];
    // A heading may not sit inside a button or a link.
    const HeadingTag = interactive ? 'span' : (headingAs ?? 'h3');

    return (
      <div
        ref={ref}
        className={cn(
          'mdt-flex mdt-items-start mdt-gap-3',
          pad.x,
          pad.top,
          plain ? 'mdt-pb-0' : pad.bottom,
          !plain && 'mdt-border-b mdt-border-solid mdt-border-muted',
          // Nothing after it, so nothing to divide.
          'last:mdt-border-b-0',
          className
        )}
        data-slot="card-header"
        data-testid="card-header"
        {...rest}
      >
        {leading !== undefined ? (
          <span className="mdt-mt-px mdt-shrink-0" data-testid="card-header-leading">
            {leading}
          </span>
        ) : null}

        {/* Centred, so a one-line title shares a middle with a taller icon
            button or leading tile. On a multi-line header it is the tallest
            thing in the row, so centring changes nothing. */}
        <div className="mdt-flex mdt-min-w-0 mdt-flex-1 mdt-flex-col mdt-gap-1 mdt-self-center">
          {eyebrow !== undefined ? (
            <p
              className="mdt-m-0 mdt-text-xs mdt-font-semibold mdt-uppercase mdt-tracking-wider mdt-text-muted-foreground"
              data-testid="card-header-eyebrow"
            >
              {eyebrow}
            </p>
          ) : null}
          {heading !== undefined ? (
            <HeadingTag
              className="mdt-m-0 mdt-text-base mdt-font-semibold mdt-leading-tight mdt-tracking-tight"
              data-testid="card-header-heading"
            >
              {heading}
            </HeadingTag>
          ) : null}
          {supporting !== undefined ? (
            <p
              className="mdt-m-0 mdt-text-sm mdt-leading-normal mdt-text-muted-foreground"
              data-testid="card-header-supporting"
            >
              {supporting}
            </p>
          ) : null}
          {meta !== undefined ? (
            <p
              className="mdt-m-0 mdt-text-xs mdt-text-muted-foreground"
              data-testid="card-header-meta"
            >
              {meta}
            </p>
          ) : null}
          {children}
        </div>

        {trailing !== undefined ? (
          <div
            className="mdt-flex mdt-shrink-0 mdt-items-center mdt-gap-1.5 mdt-self-center"
            data-testid="card-header-trailing"
          >
            {trailing}
          </div>
        ) : null}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/** The one genuinely open part. */
const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...rest }, ref) => {
    const pad = PAD[useCard().padding];
    return (
      <div
        ref={ref}
        className={cn('mdt-text-sm mdt-leading-normal', pad.x, pad.top, pad.bottom, className)}
        data-slot="card-body"
        data-testid="card-body"
        {...rest}
      >
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

/** Quiet detail on the left, at most two buttons on the right. */
const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ meta, actions, plain = false, className, children, ...rest }, ref) => {
    const pad = PAD[useCard().padding];
    return (
      <div
        ref={ref}
        className={cn(
          'mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-3',
          pad.x,
          plain ? 'mdt-pt-0' : pad.top,
          pad.bottom,
          !plain && 'mdt-border-t mdt-border-solid mdt-border-muted',
          className
        )}
        data-slot="card-footer"
        data-testid="card-footer"
        {...rest}
      >
        {meta !== undefined ? (
          <span className="mdt-text-xs mdt-text-muted-foreground" data-testid="card-footer-meta">
            {meta}
          </span>
        ) : null}
        {children}
        {actions !== undefined ? (
          <div
            className="mdt-ml-auto mdt-flex mdt-items-center mdt-gap-2"
            data-testid="card-footer-actions"
          >
            {actions}
          </div>
        ) : null}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

/* ──────────────────────────── the interactive two ──────────────────────── */

/**
 * ClickableCard - the whole card is one target.
 *
 * The common case in a list: a board column, search results, a service
 * catalogue. Hover firms the border and nothing resizes, so the card under the
 * cursor never shoves its neighbours while you are aiming at them.
 *
 * **It cannot contain buttons or links.** That is the point of it being its own
 * component: a control inside a control is invalid and unreachable by keyboard,
 * and here the combination cannot be written down.
 */
const ClickableCard = forwardRef<HTMLElement, ClickableCardProps>(
  ({ surface, padding = 'normal', href, onClick, className, children, ...rest }, ref) => {
    const classes = cn(
      cardVariants({ surface, padding }),
      'mdt-w-full mdt-cursor-pointer mdt-text-left mdt-no-underline',
      'hover:mdt-border-muted-foreground',
      surface === 'elevated' && 'hover:mdt-border-transparent hover:mdt-shadow-lg',
      'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-2',
      className
    );

    return (
      <CardContext.Provider value={{ padding, interactive: true }}>
        {href !== undefined ? (
          <a
            ref={ref as Ref<HTMLAnchorElement>}
            href={href}
            onClick={onClick}
            className={classes}
            data-slot="card"
            data-testid="card"
            {...rest}
          >
            {children}
          </a>
        ) : (
          <button
            ref={ref as Ref<HTMLButtonElement>}
            type="button"
            onClick={onClick}
            className={classes}
            data-slot="card"
            data-testid="card"
            {...(rest as ComponentPropsWithoutRef<'button'>)}
          >
            {children}
          </button>
        )}
      </CardContext.Provider>
    );
  }
);

ClickableCard.displayName = 'ClickableCard';

/**
 * CollapsibleCard - the header opens and closes it.
 *
 * The header **is** the control, so it holds no buttons of its own. Collapsed,
 * the header is the whole card and its dividing line drops, because there is
 * nothing left underneath for it to divide.
 */
const CollapsibleCard = forwardRef<HTMLDivElement, CollapsibleCardProps>(
  (
    {
      surface,
      padding = 'normal',
      header,
      defaultOpen = false,
      open,
      onOpenChange,
      headingAs: HeadingTag = 'h3',
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = useState(defaultOpen);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : uncontrolled;
    const panelId = useId();

    const toggle = useCallback(() => {
      const next = !isOpen;
      if (!isControlled) setUncontrolled(next);
      onOpenChange?.(next);
    }, [isOpen, isControlled, onOpenChange]);

    return (
      <CardContext.Provider value={{ padding, interactive: true }}>
        <div
          ref={ref}
          className={cn(cardVariants({ surface, padding }), className)}
          data-slot="card"
          data-testid="card"
          data-open={isOpen}
          {...rest}
        >
          {/* The heading wraps the control rather than sitting inside it, so the
              card still announces itself as a heading to a screen reader. */}
          <HeadingTag className="mdt-m-0 mdt-flex mdt-flex-col">
            <button
              type="button"
              onClick={toggle}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className={cn(
                'mdt-block mdt-w-full mdt-cursor-pointer mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-left',
                'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-inset focus-visible:mdt-ring-ring'
              )}
              data-testid="card-toggle"
            >
              <CardHeader
                {...header}
                // The header is the only child of this button, so it is always
                // `:last-child` and the `last:border-b-0` rule would strip the
                // line even when the panel is open below. Both states are
                // therefore stated outright rather than left to the sibling.
                plain={!isOpen}
                className={isOpen ? 'last:mdt-border-b' : undefined}
                trailing={
                  <Icon
                    name="chevron-down"
                    size="sm"
                    className={cn(
                      'mdt-text-muted-foreground mdt-transition-transform',
                      isOpen && 'mdt-rotate-180'
                    )}
                    aria-hidden
                  />
                }
              />
            </button>
          </HeadingTag>

          {isOpen ? (
            <CardBody id={panelId} data-testid="card-panel">
              {children}
            </CardBody>
          ) : null}
        </div>
      </CardContext.Provider>
    );
  }
);

CollapsibleCard.displayName = 'CollapsibleCard';

export { Card, CardMedia, CardHeader, CardBody, CardFooter, ClickableCard, CollapsibleCard };
