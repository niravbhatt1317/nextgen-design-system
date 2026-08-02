import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva } from 'class-variance-authority';
import { createContext, forwardRef, useContext, useMemo } from 'react';
import { cn } from '@/utils';
import { Icon } from '@/components/Icon';
import type {
  CheckboxGroupContextValue,
  CheckboxGroupProps,
  CheckboxProps,
  CheckboxSize,
} from './Checkbox.types';

// ============================================================================
// Shared CSS class constants to reduce duplication (SonarJS: no-duplicate-string)
// ============================================================================
const FOCUS_RING_CLASSES =
  'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-2';
const DISABLED_CLASSES = 'disabled:mdt-cursor-not-allowed disabled:mdt-opacity-50';
const CARD_CHECKED_CLASSES =
  'data-[state=checked]:mdt-border-primary data-[state=checked]:mdt-bg-accent';

/**
 * A half-selection looks like a selection unless both of these are set.
 *
 * Radix shows the indicator for `indeterminate` as well as `checked`, so a box
 * that only styles `checked` renders a full tick on an unfilled box - a header
 * checkbox claiming every row is selected when four of eight are. The fill
 * comes from the same pair as `checked`, because it is the same box in a
 * different state, not a third kind of box.
 */
const MARKED_CLASSES =
  'data-[state=checked]:mdt-bg-primary data-[state=checked]:mdt-text-primary-foreground data-[state=indeterminate]:mdt-bg-primary data-[state=indeterminate]:mdt-text-primary-foreground';

/**
 * The indicator carries the group name, so the glyph inside it can read the
 * state Radix puts on it. Swapped in CSS rather than from the `checked` prop:
 * an uncontrolled checkbox never tells the component which state it is in.
 */
const INDICATOR_CLASSES =
  'mdt-group/mark mdt-flex mdt-items-center mdt-justify-center mdt-text-current';
const TICK_CLASSES = 'group-data-[state=indeterminate]/mark:mdt-hidden';
const DASH_CLASSES = 'mdt-hidden group-data-[state=indeterminate]/mark:mdt-block';

/**
 * Checkbox variants using Class Variance Authority (CVA)
 */
export const checkboxVariants = cva([], {
  variants: {
    /**
     * Visual variant of the checkbox
     */
    variant: {
      default: [
        'mdt-peer mdt-h-4 mdt-w-4 mdt-shrink-0 mdt-rounded-sm mdt-border mdt-border-primary',
        // `inline-flex` and `align-middle` are load-bearing, not tidying.
        //
        // A button is `inline-block` sitting on the text baseline by default.
        // The tick indicator only exists while the box is checked, so ticking it
        // added a child, moved the box's baseline, and grew the surrounding line
        // box - a table row measurably jumped 53px to 55px on every click.
        //
        // `align-middle` takes the box off the baseline so its content cannot
        // move it, and `inline-flex` centres the tick so the box's own size
        // never depends on what is inside it.
        'mdt-inline-flex mdt-items-center mdt-justify-center mdt-align-middle',
        'mdt-ring-offset-background',
        FOCUS_RING_CLASSES,
        DISABLED_CLASSES,
        MARKED_CLASSES,
      ],
      card: [
        'mdt-peer mdt-w-full mdt-cursor-pointer mdt-rounded-lg mdt-border-2 mdt-border-input',
        'mdt-p-4 mdt-transition-all',
        'hover:mdt-border-primary hover:mdt-bg-accent',
        FOCUS_RING_CLASSES,
        CARD_CHECKED_CLASSES,
        DISABLED_CLASSES,
      ],
      // ── one choice, as a chip ──
      //
      // Always an outline. It never fills solid, because a row of solid chips
      // reads as a row of buttons waiting to be pressed - and these are answers,
      // not actions. Choosing one puts the edge at full strength and lifts the
      // ground a step; the tick on the right does the rest.
      //
      // 32px and an 8px corner, deliberately unlike TagPill's 24px pill with a
      // cross. Same shape, opposite meaning: a tag says "this is already chosen,
      // press the cross to take it away", a chip says "press me to choose".
      // Build them alike and people press the tick expecting the option to
      // disappear from the list rather than simply come unchosen.
      chip: [
        'mdt-group mdt-inline-flex mdt-items-center mdt-gap-1.5 mdt-align-middle',
        'mdt-rounded-lg mdt-border mdt-border-input mdt-bg-transparent',
        'mdt-font-medium mdt-leading-none mdt-text-muted-foreground',
        'mdt-cursor-pointer mdt-whitespace-nowrap',
        'mdt-transition-[background-color,border-color,color] mdt-duration-150',
        'hover:mdt-border-muted-foreground hover:mdt-bg-secondary hover:mdt-text-foreground',
        // The weight deliberately does NOT change.
        //
        // Bolder text is wider text - measured at 1.4px to 3.4px per chip
        // depending on the word, which across a row is enough to tip it onto
        // another line. Holding the tick's place and then moving the layout with
        // the font would give away the one thing this variant is for. The edge,
        // the ground and the tick are three cues already.
        'data-[state=checked]:mdt-border-foreground data-[state=checked]:mdt-bg-secondary',
        'data-[state=checked]:mdt-text-foreground',
        FOCUS_RING_CLASSES,
        DISABLED_CLASSES,
        'disabled:hover:mdt-border-input disabled:hover:mdt-bg-transparent',
        // An icon sits before the word at the same 6px the tick uses on the
        // other side, so a chip with one is symmetrical rather than lopsided.
        // It never squashes: a chip is as wide as its contents, so there is
        // nothing to be gained by letting the icon give way first.
        '[&_svg]:mdt-size-4 [&_svg]:mdt-shrink-0',
      ],
      'card-with-checkbox': [
        'mdt-peer mdt-w-full mdt-cursor-pointer mdt-rounded-lg mdt-border-2 mdt-border-input',
        'mdt-p-4 mdt-transition-all',
        'mdt-flex mdt-items-start mdt-gap-3',
        'hover:mdt-border-primary hover:mdt-bg-accent',
        FOCUS_RING_CLASSES,
        CARD_CHECKED_CLASSES,
        DISABLED_CLASSES,
      ],
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

/**
 * Size and layout travel from the group to its chips, so a caller sets them
 * once. A chip may still override its own size; nothing here stops it.
 */
const CheckboxGroupContext = createContext<CheckboxGroupContextValue>({
  variant: 'default',
  size: 'md',
});

/**
 * 32px, comfortably above the 24px a TagPill sits at. That gap is doing work:
 * it is one of the two things keeping "press me to choose" visibly apart from
 * "press the cross to remove this".
 */
const CHIP_SIZES: Record<CheckboxSize, string> = {
  sm: 'mdt-h-7 mdt-px-2.5 mdt-text-[13px]',
  md: 'mdt-h-8 mdt-px-3 mdt-text-sm',
};

/**
 * A row of choices that wraps.
 *
 * ## Not connected, on purpose
 *
 * Each chip is its own shape with its own edge, and they wrap onto the next line
 * when the row runs out. That is the opposite of the segmented strip in `Radio`,
 * where the segments are joined into one bar - joined says "one of these", and
 * separate says "as many as you like".
 *
 * ## It is a group, and it says so
 *
 * `role="group"` with a name, so a screen reader announces what the chips are
 * for before reading them. Each chip inside is a real checkbox: Tab reaches it,
 * Space presses it, and pressing again lets it go.
 *
 * @example
 * ```tsx
 * <CheckboxGroup variant="chip" label="Which of these were affected?">
 *   <Checkbox value="network">Network</Checkbox>
 *   <Checkbox value="storage">Storage</Checkbox>
 * </CheckboxGroup>
 * ```
 */
const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ className, variant = 'chip', size = 'md', label, children, ...props }, ref) => {
    const context = useMemo<CheckboxGroupContextValue>(() => ({ variant, size }), [variant, size]);

    return (
      <CheckboxGroupContext.Provider value={context}>
        <div
          ref={ref}
          role="group"
          data-slot="checkbox-group"
          {...(label !== undefined ? { 'aria-label': label } : {})}
          className={cn(
            variant === 'chip'
              ? 'mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-2'
              : 'mdt-flex mdt-flex-col mdt-gap-2',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </CheckboxGroupContext.Provider>
    );
  }
);
CheckboxGroup.displayName = 'CheckboxGroup';

/**
 * Checkbox component for toggleable selection.
 *
 * @example
 * ```tsx
 * // Default checkbox
 * <Checkbox id="terms" />
 *
 * // Card variant
 * <Checkbox id="feature" variant="card">
 *   <div className="flex items-center justify-between">
 *     <div>
 *       <div className="font-medium">Enable Feature</div>
 *       <div className="text-sm text-muted-foreground">
 *         This will enable the advanced feature.
 *       </div>
 *     </div>
 *   </div>
 * </Checkbox>
 * ```
 */
const Checkbox = forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const group = useContext(CheckboxGroupContext);
    // The group decides unless the chip says otherwise, so a row of chips is
    // written once at the top rather than repeated on every one of them.
    const resolved = variant ?? (group.variant === 'chip' ? 'chip' : 'default');

    if (resolved === 'chip') {
      return (
        <CheckboxPrimitive.Root
          ref={ref}
          data-slot="checkbox-chip"
          className={cn(
            checkboxVariants({ variant: 'chip' }),
            CHIP_SIZES[size ?? group.size],
            className
          )}
          {...props}
        >
          {children}
          {/*
            The tick takes no room until it is there.

            An unchosen chip is exactly as wide as its own word, so a row of
            them is as tight as it can be - which is the whole reason for
            choosing this over holding the space. The trade, chosen with it: the
            chip grows when pressed and everything after it shifts along, so in
            a wrapping row a chip can drop to the next line under your cursor.

            `hidden` rather than a transparent placeholder, deliberately. Flex
            gap only counts between elements that are laid out, so taking the
            tick out of the flow takes its 6px of gap with it and the chip sits
            at its true width.
          */}
          <span
            aria-hidden="true"
            className="mdt-hidden mdt-shrink-0 group-data-[state=checked]:mdt-inline-flex"
            data-slot="checkbox-chip-tick"
          >
            <Icon name="check" size="xs" aria-hidden />
          </span>
        </CheckboxPrimitive.Root>
      );
    }

    if (resolved === 'card') {
      return (
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(checkboxVariants({ variant: resolved }), className)}
          {...props}
        >
          {children}
        </CheckboxPrimitive.Root>
      );
    }

    if (resolved === 'card-with-checkbox') {
      return (
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(checkboxVariants({ variant: resolved }), className)}
          {...props}
        >
          <div
            className={cn(
              'mdt-mt-0.5 mdt-flex mdt-h-4 mdt-w-4 mdt-shrink-0 mdt-items-center mdt-justify-center',
              'mdt-rounded-sm mdt-border mdt-border-primary mdt-bg-background',
              MARKED_CLASSES
            )}
          >
            <CheckboxPrimitive.Indicator className={INDICATOR_CLASSES}>
              <Icon name="check" size="xs" aria-hidden className={TICK_CLASSES} />
              <Icon name="minus" size="xs" aria-hidden className={DASH_CLASSES} />
            </CheckboxPrimitive.Indicator>
          </div>
          {children}
        </CheckboxPrimitive.Root>
      );
    }

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(checkboxVariants({ variant: resolved }), className)}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={INDICATOR_CLASSES}>
          <Icon name="check" size="sm" aria-hidden className={TICK_CLASSES} />
          <Icon name="minus" size="sm" aria-hidden className={DASH_CLASSES} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, CheckboxGroup };
