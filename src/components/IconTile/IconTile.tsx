import { cva } from 'class-variance-authority';
import { forwardRef, useRef, useState } from 'react';
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode, Ref } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../Tooltip';

/**
 * IconTile styles - a tinted container holding a single icon.
 *
 * Org Mgmt's audit calls this "the most duplicated inline pattern" in that
 * system, and records the cost of leaving it inline: the warning foreground
 * alternates between two values, the success background between two more, and
 * some sites reference tokens that do not exist at all.
 *
 * Tones match Avatar's palette, so a tile and an avatar sitting next to each
 * other agree on what green means.
 */
export const iconTileVariants = cva(
  'mdt-inline-flex mdt-shrink-0 mdt-items-center mdt-justify-center [&_svg]:mdt-shrink-0 [&_img]:mdt-object-contain',
  {
    variants: {
      tone: {
        slate: 'mdt-bg-neutral-30 mdt-text-neutral-110',
        /* THE BLUE INK IS BLUE-60 (Pranjal, 2026-09-12: "use a better blue color this looks really bad" - K-IconTile-07): every Name tile on the console draws its glyph in the accent blue, not the avatar's navy. */
        /* 2026-09-28: the glyph reads --mdt-tile-blue-ink - blue-60 in light, the info badge's #7FB2E0 in dark (Pranjal: the dark tile's icon was not visible enough) */
        blue: 'mdt-bg-blue-10 mdt-text-[hsl(var(--mdt-tile-blue-ink))]',
        green: 'mdt-bg-green-10 mdt-text-green-80',
        amber: 'mdt-bg-orange-20 mdt-text-orange-80',
        rose: 'mdt-bg-red-10 mdt-text-red-80',
        purple: 'mdt-bg-purple-10 mdt-text-purple-90',
        /* THE OUTLINE TILE (Kevin 2026-10-13, the console's contact chip): no wash, the field hairline and the slate
         * ink - the circle that sits in a table's Contact cell */
        outline:
          'mdt-border mdt-border-solid mdt-border-neutral-30 mdt-bg-background mdt-text-neutral-90',
        /* THE BRAND PLATE (Ronak 2026-10-15, the console's cloud Provider tiles): a vendor's mark is drawn in its own
         * colours and reads on white (the AWS wordmark is near-black), so the plate is a FIXED face - white in BOTH
         * themes (the fixed button's fill) under the neutral-20 hairline the console draws (providerPicker.css
         * .dp-pmark). A vendor with no mark that reads small wears a monogram ("OCI", "VMW") in black - the ink
         * that stays black in dark, as the plate stays white - 12/600, tracked 0.02em. */
        brand:
          'mdt-border mdt-border-solid mdt-border-neutral-20 mdt-bg-[hsl(var(--mdt-fixed-fill))] mdt-text-xs mdt-font-semibold mdt-leading-none mdt-tracking-[0.02em] mdt-text-[hsl(var(--mdt-black))]',
      },
      /* THE TILE SIZES ITS ICON (Pranjal, 2026-09-12: "icon size is too big" - a
       * 20px glyph in a 24px tile). The glyph is a little over half the tile at
       * every size: 14 in 24, 16 in 32, 20 in 40 (the size he called right in the
       * Users drawer), 24 in 48. Set here, so no page has to know the ratio.
       *
       * 2XL IS THE IDENTITY MARK (Pranjal, 2026-09-12): the tile at the top of an
       * object drawer sits where Users puts a 56px avatar, so it is 56 too - the
       * band keeps the same height whichever mark it carries. The glyph stays 24
       * (a bot at 24 in 56 reads as a mark, not a button), and a square 2xl tile
       * rounds to 12, the radius the console's own identity tiles used. */
      size: {
        sm: 'mdt-h-6 mdt-w-6 [&_svg]:mdt-size-3.5 [&_img]:mdt-size-4',
        md: 'mdt-h-8 mdt-w-8 [&_svg]:mdt-size-4 [&_img]:mdt-size-5',
        lg: 'mdt-h-10 mdt-w-10 [&_svg]:mdt-size-5 [&_img]:mdt-size-6',
        xl: 'mdt-h-12 mdt-w-12 [&_svg]:mdt-size-6 [&_img]:mdt-size-8',
        '2xl': 'mdt-h-14 mdt-w-14 [&_svg]:mdt-size-6 [&_img]:mdt-size-10',
      },
      shape: {
        square: 'mdt-rounded-md',
        circle: 'mdt-rounded-full',
      },
    },
    compoundVariants: [
      { size: '2xl', shape: 'square', class: 'mdt-rounded-xl' },
      /* the brand plate at 48 rounds to 10, as the console draws it (providerPicker.css .dp-pmark) */
      { tone: 'brand', size: 'xl', shape: 'square', class: 'mdt-rounded-[10px]' },
    ],
    defaultVariants: { tone: 'slate', size: 'md', shape: 'square' },
  }
);

export type IconTileVariantsType = VariantProps<typeof iconTileVariants>;
export type IconTileTone = 'slate' | 'blue' | 'green' | 'amber' | 'rose' | 'purple' | 'outline' | 'brand';
export type IconTileSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type IconTileShape = 'square' | 'circle';

export interface IconTileProps extends Omit<
  ComponentPropsWithoutRef<'span'>,
  'className' | 'children' | 'color' | 'onCopy' | 'onClick'
> {
  /** The icon to hold - or, in the `brand` tone, a vendor's mark (an `<img alt="">`) or its monogram. */
  icon: ReactNode;
  /** @default 'slate' */
  tone?: IconTileTone;
  /** @default 'md' - `2xl` (56) is the identity mark at the top of an object drawer. */
  size?: IconTileSize;
  /** @default 'square' */
  shape?: IconTileShape;
  /**
   * What the icon means. Leave it out and the tile is hidden from screen
   * readers, which is right when the icon only decorates something already
   * labelled beside it.
   */
  'aria-label'?: string;
  className?: string;
  /**
   * Makes the tile a button that copies this value on click: the value shows in a
   * bubble on hover with `hint` under it, and the bubble reads `copiedLabel` once copied.
   */
  copyValue?: string;
  /** What the bubble says on hover. Defaults to `copyValue`. */
  tooltip?: ReactNode;
  /** The quiet line under the bubble's words: "Click the icon to copy the mail". */
  hint?: ReactNode;
  /** What the bubble says after a copy. @default 'Copied!' */
  copiedLabel?: ReactNode;
  /** Called with the value after it is copied. */
  onCopy?: (value: string) => void;
  /** Makes the tile a button that does this on click. */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

/**
 * A pressable tile: lifts over the tile it overlaps, and the outline tone takes the
 * console's subtle hover (Pranjal 2026-10-11: the neutral-40 edge, the neutral-10
 * fill, the neutral-130 ink; neutral-20 pressed - not the old blue). Round tiles in a
 * row tuck 6px under the one before, like an avatar stack.
 */
const PRESSABLE = [
  'mdt-relative mdt-cursor-pointer mdt-p-0 mdt-transition-colors mdt-duration-150',
  'hover:mdt-z-40 data-[state=instant-open]:mdt-z-40 data-[state=delayed-open]:mdt-z-40',
  'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-1',
].join(' ');
const OUTLINE_PRESSABLE = [
  'hover:mdt-border-neutral-40 hover:mdt-bg-neutral-10 hover:mdt-text-neutral-130',
  'data-[state=instant-open]:mdt-border-neutral-40 data-[state=instant-open]:mdt-bg-neutral-10',
  'data-[state=instant-open]:mdt-text-neutral-130 active:mdt-bg-neutral-20',
].join(' ');
const STACKED = '[&+&]:-mdt-ml-1.5';

/**
 * IconTile - a tinted container for a single icon.
 *
 * @example
 * ```tsx
 * <IconTile icon={<Icon name="server" />} tone="blue" />
 * <IconTile icon={<Icon name="check" />} tone="green" shape="circle" size="xl" />
 * ```
 */
/**
 * The tile as a button with a bubble: hover shows `tooltip` (or the value) and the
 * hint; a click copies the value and the bubble says so until the pointer leaves.
 * The engine closes a bubble on pointer-down and on click; while the pointer is still
 * on the tile those closes are ignored, so the bubble is held open through the click.
 */
const PressableTile = forwardRef<HTMLButtonElement, IconTileProps & { tileClass: string }>(
  (
    {
      icon,
      tileClass,
      copyValue,
      tooltip,
      hint,
      copiedLabel = 'Copied!',
      onCopy,
      onClick,
      ...rest
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const hovering = useRef(false);
    const words = tooltip ?? copyValue;
    const label = rest['aria-label'] ?? (copyValue === undefined ? undefined : `Copy ${copyValue}`);
    const button = (
      <button
        {...(rest as ComponentPropsWithoutRef<'button'>)}
        ref={ref}
        type="button"
        className={tileClass}
        aria-label={label}
        onPointerEnter={() => {
          hovering.current = true;
        }}
        onPointerLeave={() => {
          hovering.current = false;
        }}
        onClick={(event) => {
          event.stopPropagation(); // the tile acts on its own; it never opens the row under it
          onClick?.(event);
          if (copyValue === undefined) return;
          void navigator.clipboard.writeText(copyValue);
          setCopied(true);
          setOpen(true);
          onCopy?.(copyValue);
        }}
      >
        {icon}
      </button>
    );
    if (words === undefined) return button;
    return (
      <TooltipProvider>
        <Tooltip
          instant
          open={open}
          onOpenChange={(next) => {
            if (!next && hovering.current) return;
            setOpen(next);
            if (!next) setCopied(false);
          }}
        >
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent {...(copied || hint === undefined ? {} : { hint })}>
            {copied ? copiedLabel : words}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);
PressableTile.displayName = 'PressableTile';

const IconTile = forwardRef<HTMLElement, IconTileProps>(
  ({ icon, tone, size, shape, className, ...rest }, ref) => {
    const pressable = rest.copyValue !== undefined || rest.onClick !== undefined;
    if (pressable) {
      return (
        <PressableTile
          ref={ref as Ref<HTMLButtonElement>}
          icon={icon}
          tileClass={cn(
            iconTileVariants({ tone, size, shape }),
            PRESSABLE,
            tone === 'outline' && OUTLINE_PRESSABLE,
            shape === 'circle' && STACKED,
            className
          )}
          {...rest}
        />
      );
    }
    const {
      copyValue: _c,
      tooltip: _t,
      hint: _h,
      copiedLabel: _l,
      onCopy: _o,
      onClick: _k,
      ...spanProps
    } = rest;
    const label = spanProps['aria-label'];
    return (
      <span
        ref={ref as Ref<HTMLSpanElement>}
        className={cn(iconTileVariants({ tone, size, shape }), className)}
        role={label === undefined ? undefined : 'img'}
        aria-hidden={label === undefined ? true : undefined}
        {...spanProps}
      >
        {icon}
      </span>
    );
  }
);

IconTile.displayName = 'IconTile';

export { IconTile };
