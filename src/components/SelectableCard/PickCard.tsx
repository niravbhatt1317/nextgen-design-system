import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { iconAtDrawnSize } from '../../utils/icon-at-drawn-size';
import { Icon } from '../Icon';
import { SELECTABLE_CARD_EDGE } from './selectableCardEdge';
import type { PickCardProps } from './PickCard.types';

/* PORTED FROM THE CONSOLE (Pranjal, 2026-10-28). The Pick card - his named element (2026-10-19: "keep this element
 * for future use name this element something so that i dont have to explain it to you in future"):
 * features/fleet-new/afm/shell/PickCard.tsx + pickCard.css, first built for "How it ships" in Create profile
 * (2026-10-14/15) and kept for the next place a made choice should fold. Shopify's checkout summary (2026-10-14:
 * "when i select one of them then all other two will not show").
 *
 * The card is the option card's (the console's kit SelectableCard with Agent Fleet's tile, tileCards.css): 14 in, 12
 * corners, the 1.5 edge - the hairline at rest, the field edge under the pointer; the 40 tile in the sunken fill at 6
 * corners with the glyph at 20; 12 between the tile and the words; the title 14 / 500 on a 20 line, its one line 12
 * on 18 in the faint ink, cut with an ellipsis. The whole card is the button (2026-10-15: "this whole card should have
 * a hover ... show selector icon when not hovered. only during hover show the change text"): on hover the sunken fill
 * and the tile turns to the page ground so it never melts into the card; at rest the selector glyph (16, faint) sits
 * on the right, and on hover or keyboard focus the underlined "Change" (13 / 500 / 20, 3 below) takes its place in the
 * same grid cell, so nothing shifts - a 120ms fade, none under reduced motion. */

/** The glyph's size in the 40 tile. */
const GLYPH_PX = 20;

const FADE = 'mdt-transition-opacity mdt-duration-[120ms] motion-reduce:mdt-transition-none';

/**
 * PickCard - a choice that has already been made, shown as one selectable card:
 * the option's tile, its name and its one line, with a "Change" door on the
 * right that opens all the options in its place.
 *
 * Pair it with a `SelectableCardGroup` of the same options: show the Pick card
 * once one is chosen, swap in the group when it is pressed, and fold back to the
 * Pick card when the next one is picked.
 *
 * @example
 * ```tsx
 * {open ? (
 *   <SelectableCardGroup value={way} onValueChange={(v) => { setWay(v); setOpen(false); }}>…</SelectableCardGroup>
 * ) : (
 *   <PickCard icon={<Icon name="cloud" />} title="Direct to SaaS"
 *     description="Straight to the platform, with no collector in between"
 *     aria-label="How it ships: Direct to SaaS. Change" onChange={() => setOpen(true)} />
 * )}
 * ```
 */
const PickCard = forwardRef<HTMLButtonElement, PickCardProps>(function PickCard(
  {
    icon,
    title,
    description,
    onChange,
    changeLabel = 'Change',
    'aria-label': ariaLabel,
    className,
    onClick,
    ...rest
  },
  ref
) {
  const label = ariaLabel ?? (typeof title === 'string' ? `${title}. ${changeLabel}` : undefined);
  const hasDescription = description !== undefined && description !== null && description !== '';

  return (
    <button
      ref={ref}
      type="button"
      data-slot="pick-card"
      aria-label={label}
      className={cn(
        'mdt-group mdt-relative mdt-box-border mdt-flex mdt-w-full mdt-min-w-0 mdt-cursor-pointer mdt-select-none mdt-flex-col mdt-gap-1.5',
        'mdt-rounded-xl mdt-border mdt-border-solid mdt-bg-background mdt-p-3.5 mdt-text-left mdt-font-[inherit] mdt-text-foreground',
        'mdt-transition-[border-color,box-shadow] mdt-duration-100 hover:mdt-bg-secondary',
        'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-2',
        SELECTABLE_CARD_EDGE.rest,
        SELECTABLE_CARD_EDGE.hover,
        className
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) onChange?.();
      }}
      {...rest}
    >
      <span className="mdt-flex mdt-w-full mdt-min-w-0 mdt-items-center mdt-gap-3">
        <span
          aria-hidden="true"
          className={cn(
            'mdt-inline-flex mdt-size-10 mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded-md',
            'mdt-bg-secondary mdt-text-foreground group-hover:mdt-bg-background [&_svg]:mdt-size-5',
            'mdt-transition-colors mdt-duration-[120ms] motion-reduce:mdt-transition-none'
          )}
          data-slot="pick-card-tile"
        >
          {iconAtDrawnSize(icon, GLYPH_PX)}
        </span>
        <span className="mdt-flex mdt-min-w-0 mdt-flex-auto mdt-flex-col mdt-gap-0.5 mdt-pr-1">
          <span
            className="mdt-inline-flex mdt-min-w-0 mdt-flex-wrap mdt-items-center mdt-gap-2 mdt-text-sm mdt-font-medium mdt-leading-5 mdt-text-foreground"
            data-slot="pick-card-title"
          >
            {title}
          </span>
          {hasDescription ? (
            <span
              className="mdt-truncate mdt-text-xs mdt-leading-normal mdt-text-faint"
              data-slot="pick-card-description"
            >
              {description}
            </span>
          ) : null}
        </span>
        <span
          aria-hidden="true"
          className="mdt-inline-grid mdt-shrink-0 mdt-items-center mdt-justify-items-end"
          data-slot="pick-card-end"
        >
          <Icon
            name="chevrons-up-down"
            size={16}
            className={cn(
              'mdt-col-start-1 mdt-row-start-1 mdt-text-faint',
              'group-hover:mdt-opacity-0 group-focus-visible:mdt-opacity-0',
              FADE
            )}
          />
          <span
            className={cn(
              'mdt-col-start-1 mdt-row-start-1 mdt-whitespace-nowrap mdt-text-[13px] mdt-font-medium mdt-leading-5 mdt-text-foreground',
              'mdt-underline mdt-underline-offset-[3px] mdt-opacity-0',
              'group-hover:mdt-opacity-100 group-focus-visible:mdt-opacity-100',
              FADE
            )}
            data-slot="pick-card-change"
          >
            {changeLabel}
          </span>
        </span>
      </span>
    </button>
  );
});

PickCard.displayName = 'PickCard';

export { PickCard };
