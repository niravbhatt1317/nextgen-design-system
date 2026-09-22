'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { createContext, forwardRef, useContext } from 'react';
import type { ElementRef, KeyboardEvent, MouseEvent } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type {
  TabsAddProps,
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
  TabsType,
} from './Tabs.types';

/*
 * THE TABS (Pranjal 2026-09-17, mocks/foundation/tabs.html; DESIGN-LANGUAGE.md
 * K-Tabs-01 to K-Tabs-26). Into the library 2026-09-22; the component as it was
 * before is TabsOld2, under Deprecated 2.
 *
 * UNDERLINE - the default, every drawer band and page band: the label 13/500 in
 * the faint ink (#8FA0BD), the active one 600 in the primary colour; a 2px primary line ON
 * the strip's hairline spanning the label plus 12 at both sides; the tabs flush,
 * so labels read 24 apart; 9 above the label, 11 below; the strip starts on the
 * content edge so the active line lines up with the text under it.
 *
 * FILLED - a switch inside a body: a 32 track, corners 8, neutral-20, 3 in; the
 * chip 26 high, corners 5, 10 at the sides, 2 between; the active chip white
 * with the label at 500 in the primary colour and a hairline shadow; hover tints
 * the chip primary at 4%; the active chip ignores a click.
 *
 * Both: hover darkens the label to neutral-90; disabled reads neutral-40 with a
 * not-allowed cursor; an icon is 14 with 6 before the label; a count is an
 * 18-high pill at 11/600, muted, inverted on the active tab.
 *
 * Three calls the rulebook still lists as open are built at the console's
 * value: the active underline label at 600 (K-Tabs-07), the chip at 26 in the
 * 32 track (K-Tabs-10), the icon at 14 with 6 (K-Tabs-13).
 */

/** The type set once on the TabsList, read by every trigger inside it. */
const TabsTypeContext = createContext<TabsType>('underline');

/* THE STRIP. Underline: the band's own hairline, full width, starting on the
 * content edge (K-Tabs-06, K-Tabs-08); the tabs end-aligned so a taller band
 * (the drawer's 48) still lands the line on the divider. Filled: the 32 track
 * (K-Tabs-09), 3 in so the 26 chip sits at exactly 3 · 3 (K-Tabs-10), 2 between
 * chips. */
const LIST_TYPE: Record<TabsType, string> = {
  underline: 'mdt-flex mdt-w-full mdt-items-end mdt-gap-0 mdt-border-b mdt-border-neutral-20',
  filled:
    'mdt-inline-flex mdt-h-8 mdt-items-center mdt-gap-0.5 mdt-rounded-[8px] mdt-bg-neutral-20 mdt-p-[3px]',
};

/* THE LABEL, both types (K-Tabs-02 to K-Tabs-05): 13/500 on an 18 line in
 * the faint ink (#8FA0BD, K-Tabs-03); hover neutral-90; the active one in the primary colour, and it
 * stays primary under the pointer; disabled neutral-40 with a not-allowed cursor
 * (not pointer-events-none, or the cursor never shows). 6 between the icon, the
 * label and the count (K-Tabs-13). Colour moves in 120ms (K-Tabs-23). */
const TRIGGER_BASE = cn(
  'mdt-inline-flex mdt-items-center mdt-justify-center mdt-gap-1.5 mdt-whitespace-nowrap',
  'mdt-text-[13px] mdt-font-medium mdt-leading-[18px] mdt-text-faint',
  'mdt-transition-colors mdt-duration-[120ms] mdt-ease-[ease]',
  'hover:mdt-text-neutral-90',
  'data-[state=active]:mdt-text-primary data-[state=active]:hover:mdt-text-primary',
  'disabled:mdt-cursor-not-allowed disabled:mdt-text-neutral-40',
  'focus-visible:mdt-outline-none focus-visible:mdt-ring-1 focus-visible:mdt-ring-inset focus-visible:mdt-ring-blue-40'
);

const TRIGGER_TYPE: Record<TabsType, string> = {
  /* 12 at both sides; 9 above the label, 11 below; the 2px line is the tab's
   * own bottom border, pulled 1 down (-mb-px) so it sits ON the strip's
   * hairline rather than above it (K-Tabs-06). The active label is 600
   * (K-Tabs-07, built at the console's value). */
  underline: cn(
    '-mdt-mb-px mdt-px-3 mdt-pb-[11px] mdt-pt-[9px]',
    'mdt-border-b-2 mdt-border-transparent mdt-bg-transparent',
    'data-[state=active]:mdt-border-primary data-[state=active]:mdt-font-semibold'
  ),
  /* The chip: 26 high, corners 5 (concentric with the track's 8 at 3 in), 10
   * at the sides (K-Tabs-09, K-Tabs-10). Active: white, the label at 500 - not
   * bold, the white chip and the colour carry it - under the hairline shadow
   * (K-Tabs-11). Hover: primary at 4% (K-Tabs-04); the active chip stays white. */
  filled: cn(
    'mdt-h-[26px] mdt-rounded-[5px] mdt-bg-transparent mdt-px-2.5',
    'hover:mdt-bg-primary/[0.04]',
    'data-[state=active]:mdt-bg-white data-[state=active]:mdt-font-medium data-[state=active]:hover:mdt-bg-white',
    'data-[state=active]:mdt-shadow-[0_1px_2px_rgba(29,43,62,0.10),0_0_0_1px_rgba(29,43,62,0.04)]',
    'disabled:mdt-bg-transparent'
  ),
};

/* THE COUNT (K-Tabs-14): the console's CountBadge as it is - 18 high, 11/600 on
 * a line of 1, a muted pill that inverts on the active tab (neutral-90 under
 * white) and fades with a disabled label. On the filled track it sits a step
 * darker (neutral-30) so it still reads against the neutral-20 ground. */
const COUNT_BASE = cn(
  'mdt-inline-flex mdt-h-[18px] mdt-min-w-[18px] mdt-shrink-0 mdt-items-center mdt-justify-center',
  'mdt-rounded-[9px] mdt-px-[5px] mdt-text-[11px] mdt-font-semibold mdt-leading-none',
  'mdt-text-faint',
  '[[data-state=active]_&]:mdt-bg-neutral-90 [[data-state=active]_&]:mdt-text-white',
  '[:disabled_&]:mdt-text-neutral-40'
);

const COUNT_TYPE: Record<TabsType, string> = {
  underline: 'mdt-bg-neutral-20',
  filled: 'mdt-bg-neutral-30',
};

/** Above the cap the pill reads `99+`, the way the console's CountBadge does. */
const capCount = (count: number | string, max: number): string => {
  const value = typeof count === 'number' ? count : Number(count);
  if (Number.isFinite(value) && value > max) return `${String(max)}+`;
  return String(count);
};

/**
 * K-Tabs-12: the active tab ignores a click. Radix selects on mousedown and on
 * Enter or Space, and skips its own handler once the event is defaultPrevented,
 * so a tab that is already selected neither re-fires `onValueChange` nor
 * changes state. Preventing mousedown also stops the button taking focus, so
 * focus is put back by hand and keyboard travel carries on from the same tab.
 */
const ignoreWhenActive = (
  event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
): void => {
  if (event.currentTarget.dataset.state !== 'active') return;
  event.preventDefault();
  if (event.type === 'mousedown') event.currentTarget.focus();
};

/**
 * Tabs root component - controls the tab state and behavior.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="about">
 *   <TabsList>
 *     <TabsTrigger value="about">About</TabsTrigger>
 *     <TabsTrigger value="grants" count={3}>Grants</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="about">…</TabsContent>
 *   <TabsContent value="grants">…</TabsContent>
 * </Tabs>
 *
 * <Tabs defaultValue="manual">
 *   <TabsList type="filled">
 *     <TabsTrigger value="manual">Manual</TabsTrigger>
 *     <TabsTrigger value="ldap">LDAP</TabsTrigger>
 *   </TabsList>
 * </Tabs>
 * ```
 */
const Tabs = forwardRef<ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Root ref={ref} className={cn('mdt-w-full', className)} {...props} />
  )
);
Tabs.displayName = 'Tabs';

/**
 * TabsList - the strip (underline) or the track (filled). Its `type` is handed
 * to every trigger inside, so it is written once.
 */
const TabsList = forwardRef<ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, type: typeProp, variant, fullWidth = false, ...props }, ref) => {
    const type = typeProp ?? variant ?? 'underline';
    return (
      <TabsTypeContext.Provider value={type}>
        <TabsPrimitive.List
          ref={ref}
          data-type={type}
          className={cn(LIST_TYPE[type], fullWidth && 'mdt-flex mdt-w-full', className)}
          {...props}
        />
      </TabsTypeContext.Provider>
    );
  }
);
TabsList.displayName = 'TabsList';

/**
 * TabsTrigger - one tab.
 *
 * Takes an `icon` before the label and a `count` (or any `badge`) after it, so
 * the 14 glyph, the 18 pill and the 6 between them are decided here, once.
 */
const TabsTrigger = forwardRef<ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(
  (
    {
      className,
      type: typeProp,
      variant,
      fullWidth = false,
      icon,
      count,
      countMax = 99,
      badge,
      closable = false,
      onClose,
      closeLabel,
      onMouseDown,
      onKeyDown,
      children,
      ...props
    },
    ref
  ) => {
    const inherited = useContext(TabsTypeContext);
    const type = typeProp ?? variant ?? inherited;

    const trigger = (
      <TabsPrimitive.Trigger
        ref={ref}
        data-type={type}
        className={cn(
          TRIGGER_BASE,
          TRIGGER_TYPE[type],
          fullWidth && 'mdt-flex-1',
          // Room for the close control, which sits over the tab's right edge
          // rather than inside it. After the type's own padding, so it wins:
          // 36 against a 20 cross at 4 from the edge leaves 12 between the
          // label and the cross, held whether or not the cross is showing so
          // the tab never changes width (K-Tabs-21).
          closable && 'mdt-pr-9',
          className
        )}
        onMouseDown={(event) => {
          onMouseDown?.(event);
          ignoreWhenActive(event);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.key === 'Enter' || event.key === ' ') ignoreWhenActive(event);
        }}
        {...props}
      >
        {icon !== undefined ? (
          // 14, whatever was handed in (K-Tabs-13); `shrink-0` so a long label
          // never squeezes the glyph.
          <span
            className="mdt-inline-flex mdt-shrink-0 [&_svg]:mdt-size-3.5"
            aria-hidden="true"
            data-testid="tab-icon"
          >
            {icon}
          </span>
        ) : null}

        {children}

        {/* The space before the count and the badge is for the screen reader
         * ("Grants 3", not "Grants3"); a flex container never draws a
         * whitespace-only text node, so nothing moves on screen. */}
        {count !== undefined ? (
          <>
            {' '}
            <span className={cn(COUNT_BASE, COUNT_TYPE[type])} data-testid="tab-count">
              {capCount(count, countMax)}
            </span>
          </>
        ) : null}

        {badge !== undefined ? (
          <>
            {' '}
            <span className="mdt-inline-flex mdt-shrink-0" data-testid="tab-badge">
              {badge}
            </span>
          </>
        ) : null}
      </TabsPrimitive.Trigger>
    );

    if (!closable) return trigger;

    // The close sits *beside* the tab in the markup and only looks like it is
    // inside it. A button nested in a button is invalid HTML and leaves the
    // close unreachable by keyboard, which is exactly the control someone
    // navigating by keyboard needs most (K-Tabs-21).
    return (
      <span className="mdt-group mdt-relative mdt-inline-flex mdt-items-center">
        {trigger}
        <button
          type="button"
          aria-label={
            closeLabel ?? (typeof children === 'string' ? `Close ${children}` : 'Close tab')
          }
          onClick={onClose}
          className={cn(
            'mdt-absolute mdt-right-1 mdt-top-1/2 -mdt-translate-y-1/2',
            'mdt-inline-flex mdt-size-5 mdt-items-center mdt-justify-center mdt-rounded-sm',
            'mdt-text-neutral-70 hover:mdt-bg-neutral-20 hover:mdt-text-primary',
            'mdt-transition-colors mdt-transition-opacity',
            // Hidden until the tab is the one you are on, or the one you are
            // pointing at. `pointer-events-none` matters as much as the
            // opacity: an invisible-but-clickable cross over the right edge of
            // every tab would close a tab you meant to open.
            'mdt-pointer-events-none mdt-opacity-0',
            'group-hover:mdt-pointer-events-auto group-hover:mdt-opacity-100',
            '[[data-state=active]+&]:mdt-pointer-events-auto [[data-state=active]+&]:mdt-opacity-100',
            // Keyboard users never hover, so tabbing to it has to reveal it too.
            'focus-visible:mdt-pointer-events-auto focus-visible:mdt-opacity-100',
            'focus-visible:mdt-outline-none focus-visible:mdt-ring-1 focus-visible:mdt-ring-blue-40'
          )}
          data-testid="tab-close"
        >
          <Icon name="x" size="xs" aria-hidden />
        </button>
      </span>
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

/**
 * TabsAdd - the control that makes a new tab (K-Tabs-22): a 32 square with a
 * 16 plus at the end of the list. Not a tab itself, so it takes no part in
 * arrow-key travel between tabs.
 */
const TabsAdd = forwardRef<HTMLButtonElement, TabsAddProps>(
  ({ className, label = 'New tab', ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className={cn(
        'mdt-inline-flex mdt-size-8 mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded-sm',
        'mdt-text-neutral-70 hover:mdt-bg-neutral-20 hover:mdt-text-primary',
        'mdt-transition-colors',
        'focus-visible:mdt-outline-none focus-visible:mdt-ring-1 focus-visible:mdt-ring-inset focus-visible:mdt-ring-blue-40',
        className
      )}
      data-testid="tab-add"
      {...props}
    >
      <Icon name="plus" size="sm" aria-hidden />
    </button>
  )
);
TabsAdd.displayName = 'TabsAdd';

/**
 * TabsContent - the panel for one tab. Sits 8 under the strip (K-Tabs-23);
 * a page surface under a tab band insets 16 instead, which the PageFrame owns.
 */
const TabsContent = forwardRef<ElementRef<typeof TabsPrimitive.Content>, TabsContentProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        'mdt-mt-2',
        'focus-visible:mdt-outline-none focus-visible:mdt-ring-1 focus-visible:mdt-ring-blue-40',
        className
      )}
      {...props}
    />
  )
);
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsAdd };
