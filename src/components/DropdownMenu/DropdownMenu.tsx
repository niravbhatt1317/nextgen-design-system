'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import { Icon } from '@/components/Icon';
import { Kbd } from '@/components/Kbd';
import type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuFooterProps,
  DropdownMenuHeaderProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuListProps,
  DropdownMenuRadioItemProps,
  DropdownMenuSearchProps,
  DropdownMenuSelectAllProps,
  DropdownMenuSeparatorProps,
  DropdownMenuShortcutProps,
  DropdownMenuSubContentProps,
  DropdownMenuSubTriggerProps,
} from './DropdownMenu.types';

// ============================================================================
// Shared looks
//
// A menu is one surface with a row on it. Everything below is that row with a
// different slot filled, which is why these constants are worth having: the
// alternative is the same eight classes copied into six components that then
// drift apart one fix at a time.
// ============================================================================

/**
 * The surface. 16px corner, and a 6px inset so a hovered row's own 8px corner
 * sits inside it rather than on it.
 */
const PANEL_CLASSES = [
  'mdt-z-dropdown mdt-flex mdt-min-w-[12rem] mdt-max-w-[22rem] mdt-flex-col',
  'mdt-overflow-hidden mdt-rounded-2xl mdt-border mdt-border-border',
  'mdt-bg-popover mdt-p-1.5 mdt-text-popover-foreground mdt-shadow-md',
  'data-[state=closed]:mdt-animate-zoom-out data-[state=open]:mdt-animate-zoom-in',
];

/**
 * One row.
 *
 * `items-start` rather than centred, because the leading icon belongs to the
 * label and has to stay beside it when a description pushes the row to two
 * lines. The trailing slot centres itself instead - see `ITEM_TRAIL`.
 */
const ITEM_CLASSES = [
  'mdt-relative mdt-flex mdt-w-full mdt-cursor-default mdt-select-none mdt-items-start mdt-gap-2.5',
  'mdt-rounded-lg mdt-px-3 mdt-py-1.5 mdt-text-sm mdt-outline-none',
  'mdt-transition-colors',
  'focus:mdt-bg-muted focus:mdt-text-foreground',
  'data-[state=open]:mdt-bg-muted',
  'data-[disabled]:mdt-pointer-events-none data-[disabled]:mdt-opacity-45',
];

/** A hairline, not a filled bar. `bg-muted` is a fill and reads twice as heavy. */
const SEPARATOR_CLASSES = 'mdt--mx-1.5 mdt-my-1 mdt-h-px mdt-bg-border/60';

/**
 * The leading slot, sized to one line so it stays with the label rather than
 * drifting to the middle of a two-line row.
 */
const ITEM_LEAD = 'mdt-flex mdt-h-5 mdt-w-4 mdt-shrink-0 mdt-items-center mdt-justify-center';

/**
 * The trailing slot, centred on the whole row.
 *
 * A shortcut, a count, a tick or a submenu arrow reports on the item as a
 * whole - unlike the leading icon, which is read as part of the label.
 */
const ITEM_TRAIL = [
  'mdt-flex mdt-shrink-0 mdt-items-center mdt-gap-2 mdt-self-center',
  'mdt-text-xs mdt-text-muted-foreground',
];

/**
 * A box or a dot with something in it.
 *
 * Shared by the row's own box, the select-all box and the ring round a dot, so
 * a change to what "chosen" looks like is one edit rather than three.
 */
const MARK_FILLED = 'mdt-border-primary mdt-bg-primary mdt-text-primary-foreground';

/** The same mark, empty. */
const MARK_EMPTY = [
  'mdt-flex mdt-h-4 mdt-w-4 mdt-shrink-0 mdt-items-center mdt-justify-center',
  'mdt-box-border mdt-border-[1.5px] mdt-border-input',
];

/**
 * The bands that sit outside the list - header, footer, select-all.
 *
 * Each is pulled out to the panel's own edges so its rule spans the full width,
 * then given the padding back at the sides so its contents still line up with
 * the rows. Miss that and every band's text sits 6px left of every label.
 */
const BAND_BLEED = 'mdt--mx-1.5';

// ============================================================================
// The pieces Radix gives us unchanged
// ============================================================================

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

// ============================================================================
// Nesting
// ============================================================================

/**
 * DropdownMenuSubTrigger - a row that opens another panel beside it.
 *
 * The arrow is reserved: nothing else in the trailing slot may use that shape,
 * because it is the only thing that can promise there is more behind a row.
 */
const DropdownMenuSubTrigger = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(({ className, inset, icon, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(ITEM_CLASSES, inset && 'mdt-pl-9', className)}
    {...props}
  >
    {icon !== undefined && icon !== null ? (
      <span className={ITEM_LEAD} aria-hidden="true">
        {icon}
      </span>
    ) : null}
    <span className="mdt-min-w-0 mdt-flex-1 mdt-leading-normal">{children}</span>
    <span className={cn(ITEM_TRAIL)}>
      <Icon name="chevron-right" size="sm" aria-hidden />
    </span>
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

/** DropdownMenuSubContent - the child panel. A menu like any other. */
const DropdownMenuSubContent = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  DropdownMenuSubContentProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent ref={ref} className={cn(PANEL_CLASSES, className)} {...props} />
));
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

// ============================================================================
// The panel
// ============================================================================

/**
 * DropdownMenuContent - the panel itself.
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button variant="outline">Actions</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem icon={<Icon name="pencil" size="sm" />}>Rename</DropdownMenuItem>
 *     <DropdownMenuItem shortcut={['mod', 'd']}>Duplicate</DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem tone="danger">Delete</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
const DropdownMenuContent = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, sideOffset = 6, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(PANEL_CLASSES, className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = 'DropdownMenuContent';

/**
 * DropdownMenuList - the scrolling part.
 *
 * Wrap the rows in this and the panel stops growing past `maxHeight` instead of
 * running off the bottom of the screen, which is what an unbounded menu does
 * today. Anything outside it - header, select-all, footer - stays put while the
 * rows move underneath.
 */
const DropdownMenuList = forwardRef<HTMLDivElement, DropdownMenuListProps>(
  ({ className, maxHeight = 260, style, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="menu-list"
      className={cn('mdt--mx-0.5 mdt-overflow-y-auto mdt-px-0.5', className)}
      style={{ maxHeight, ...style }}
      {...props}
    />
  )
);
DropdownMenuList.displayName = 'DropdownMenuList';

// ============================================================================
// Rows
// ============================================================================

/**
 * DropdownMenuItem - one row.
 *
 * Four slots and none of them reserve room they are not using: a leading icon,
 * the label, an optional second line, and one trailing thing.
 */
const DropdownMenuItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, inset, icon, description, shortcut, trailing, tone, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    data-tone={tone}
    className={cn(
      ITEM_CLASSES,
      // The only row in the set that carries a tone. `destructive` is tuned to
      // hold white text on top of it, which leaves it too dark to read AS text
      // on a dark panel - so red words use their own step.
      tone === 'danger' && [
        'mdt-text-danger-text focus:mdt-text-danger-text',
        'focus:mdt-bg-destructive/10',
      ],
      inset && 'mdt-pl-9',
      className
    )}
    {...props}
  >
    {icon !== undefined && icon !== null ? (
      <span className={ITEM_LEAD} aria-hidden="true">
        {icon}
      </span>
    ) : null}

    <span className="mdt-flex mdt-min-w-0 mdt-flex-1 mdt-flex-col">
      <span className="mdt-leading-normal">{children}</span>
      {description !== undefined && description !== null && description !== '' ? (
        <span className="mdt-text-xs mdt-leading-snug mdt-text-muted-foreground">
          {description}
        </span>
      ) : null}
    </span>

    {shortcut !== undefined || trailing !== undefined ? (
      <span className={cn(ITEM_TRAIL)}>
        {shortcut !== undefined ? <Kbd keys={shortcut} size="sm" /> : trailing}
      </span>
    ) : null}
  </DropdownMenuPrimitive.Item>
));
DropdownMenuItem.displayName = 'DropdownMenuItem';

/**
 * DropdownMenuCheckboxItem - a row you can tick, several at a time.
 *
 * The box leads. It is a control you press, and a column of them down the left
 * is what makes a filter scannable.
 */
const DropdownMenuCheckboxItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ className, children, description, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(ITEM_CLASSES, className)}
    {...(checked !== undefined && { checked })}
    {...props}
  >
    <span className={ITEM_LEAD} aria-hidden="true">
      <span
        data-slot="menu-box"
        className={cn(
          MARK_EMPTY,
          'mdt-rounded',
          (checked === true || checked === 'indeterminate') && MARK_FILLED
        )}
      >
        {checked === 'indeterminate' ? (
          <Icon name="minus" size="xs" aria-hidden />
        ) : (
          <DropdownMenuPrimitive.ItemIndicator>
            <Icon name="check" size="xs" aria-hidden />
          </DropdownMenuPrimitive.ItemIndicator>
        )}
      </span>
    </span>

    <span className="mdt-flex mdt-min-w-0 mdt-flex-1 mdt-flex-col">
      <span className="mdt-leading-normal">{children}</span>
      {description !== undefined && description !== null && description !== '' ? (
        <span className="mdt-text-xs mdt-leading-snug mdt-text-muted-foreground">
          {description}
        </span>
      ) : null}
    </span>
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

/**
 * DropdownMenuRadioItem - a row where one of several is true.
 *
 * `indicator` decides what marks it and which end that mark sits on:
 *
 * - `dot` leads, like a radio button. Right when the menu is a small set of
 *   named choices and the dots read as a column of empty circles waiting.
 * - `check` trails, and is the default. Right for a long list of names, where a
 *   leading column pushes every unchosen row 26px to the right of nothing.
 *
 * The two are not interchangeable within one product surface - pick one and
 * hold it, or a sort menu and a filter menu will disagree about which side the
 * mark lives on.
 */
const DropdownMenuRadioItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(({ className, children, description, indicator = 'check', ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem ref={ref} className={cn(ITEM_CLASSES, className)} {...props}>
    {indicator === 'dot' ? (
      <span className={ITEM_LEAD} aria-hidden="true">
        <span data-slot="menu-dot" className={cn(MARK_EMPTY, 'mdt-rounded-full')}>
          <DropdownMenuPrimitive.ItemIndicator asChild>
            <span className="mdt-h-1.5 mdt-w-1.5 mdt-rounded-full mdt-bg-primary" />
          </DropdownMenuPrimitive.ItemIndicator>
        </span>
      </span>
    ) : null}

    <span className="mdt-flex mdt-min-w-0 mdt-flex-1 mdt-flex-col">
      <span className="mdt-leading-normal">{children}</span>
      {description !== undefined && description !== null && description !== '' ? (
        <span className="mdt-text-xs mdt-leading-snug mdt-text-muted-foreground">
          {description}
        </span>
      ) : null}
    </span>

    {indicator === 'check' ? (
      <span className={cn(ITEM_TRAIL, 'mdt-text-foreground')} aria-hidden="true">
        <DropdownMenuPrimitive.ItemIndicator>
          <Icon name="check" size="sm" aria-hidden />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
    ) : null}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

// ============================================================================
// Naming things
// ============================================================================

/**
 * DropdownMenuLabel - names a group INSIDE the list.
 *
 * Small, uppercase and quiet, and that is the whole point: it used to be 14px
 * semibold in the same ink as a row, so a heading read as something you could
 * press. For a name on the whole panel, use `DropdownMenuHeader`.
 */
const DropdownMenuLabel = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'mdt-px-3 mdt-pb-1 mdt-pt-2 mdt-text-xs mdt-font-semibold mdt-uppercase',
      'mdt-tracking-wide mdt-text-muted-foreground',
      inset && 'mdt-pl-9',
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

/**
 * DropdownMenuHeader - names the whole panel.
 *
 * Carries **either words or a search box, never both**. A title sitting over an
 * input reads as a label for that input, which it is not. It lives outside the
 * scrolling list, so it never leaves while the rows move underneath.
 */
const DropdownMenuHeader = forwardRef<HTMLDivElement, DropdownMenuHeaderProps>(
  ({ className, title, description, children, ...props }, ref) => {
    const hasWords = title !== undefined || description !== undefined;
    return (
      <div
        ref={ref}
        data-slot="menu-header"
        className={cn(
          BAND_BLEED,
          'mdt--mt-1.5 mdt-mb-1.5 mdt-flex mdt-flex-col mdt-gap-0.5',
          'mdt-border-b mdt-border-border/60',
          hasWords ? 'mdt-px-3 mdt-py-3.5' : 'mdt-p-2',
          className
        )}
        {...props}
      >
        {title !== undefined ? (
          <span className="mdt-text-sm mdt-font-semibold mdt-leading-snug">{title}</span>
        ) : null}
        {description !== undefined ? (
          <span className="mdt-text-xs mdt-leading-snug mdt-text-muted-foreground">
            {description}
          </span>
        ) : null}
        {children}
      </div>
    );
  }
);
DropdownMenuHeader.displayName = 'DropdownMenuHeader';

/**
 * DropdownMenuSearch - narrows the list.
 *
 * Worth reaching for past about eight rows. Its edge is deliberately the
 * quietest in the component - the same hairline as a separator rather than the
 * input border used on a form, because a hard box cut into a soft panel reads
 * as a mistake.
 */
const DropdownMenuSearch = forwardRef<HTMLInputElement, DropdownMenuSearchProps>(
  ({ className, placeholder = 'Search', ...props }, ref) => (
    <input
      ref={ref}
      type="search"
      data-slot="menu-search"
      placeholder={placeholder}
      // Radix moves focus with printable keys; inside a text box that would
      // jump you out to a row on the first letter typed.
      onKeyDown={(event) => {
        event.stopPropagation();
      }}
      className={cn(
        'mdt-h-8 mdt-w-full mdt-rounded-lg mdt-border mdt-border-border/60',
        'mdt-bg-background mdt-px-3 mdt-text-sm mdt-text-foreground',
        'placeholder:mdt-text-muted-foreground',
        'mdt-transition-colors hover:mdt-border-border',
        'focus:mdt-border-transparent focus:mdt-outline-none focus:mdt-ring-2 focus:mdt-ring-ring',
        className
      )}
      {...props}
    />
  )
);
DropdownMenuSearch.displayName = 'DropdownMenuSearch';

// ============================================================================
// Select all, and the footer
// ============================================================================

/**
 * DropdownMenuSelectAll - the band above a several-of-these list.
 *
 * Two shapes. With nothing chosen it is a box and the words "Select all"; the
 * moment anything is chosen the words become the count, a hairline divides the
 * two, and Clear appears. Every child is pinned to one height so the shape can
 * change without the list below jumping.
 *
 * Belongs on a checkbox list and nowhere else - a one-of-these list cannot have
 * all of them, and an actions menu has nothing to select.
 */
const DropdownMenuSelectAll = forwardRef<HTMLDivElement, DropdownMenuSelectAllProps>(
  (
    {
      className,
      selected,
      total,
      onSelectAll,
      onClear,
      label = 'Select all',
      clearLabel = 'Clear',
      ...props
    },
    ref
  ) => {
    const all = total > 0 && selected >= total;
    const some = selected > 0 && !all;

    return (
      <div
        ref={ref}
        data-slot="menu-select-all"
        className={cn(
          BAND_BLEED,
          'mdt-mb-1.5 mdt-flex mdt-items-center mdt-gap-2.5 mdt-px-[18px] mdt-py-[7px]',
          'mdt-border-b mdt-border-border/60',
          '[&>*]:mdt-h-[22px]',
          className
        )}
        {...props}
      >
        <button
          type="button"
          data-slot="menu-select-all-toggle"
          aria-checked={all ? true : some ? 'mixed' : false}
          role="checkbox"
          onClick={() => {
            if (all) onClear();
            else onSelectAll();
          }}
          className={cn(
            'mdt-flex mdt-items-center mdt-gap-2.5 mdt-rounded-md mdt-text-sm',
            'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring focus-visible:mdt-ring-offset-2 focus-visible:mdt-ring-offset-popover'
          )}
        >
          <span
            className={cn(MARK_EMPTY, 'mdt-rounded', (all || some) && MARK_FILLED)}
            aria-hidden="true"
          >
            {/* A dash, not a tick. A tick would claim everything is chosen. */}
            {some ? <Icon name="minus" size="xs" aria-hidden /> : null}
            {all ? <Icon name="check" size="xs" aria-hidden /> : null}
          </span>
          {selected === 0 ? <span>{label}</span> : null}
        </button>

        {selected > 0 ? (
          <>
            <span
              aria-hidden="true"
              className="mdt--ml-0.5 mdt-h-4 mdt-w-px mdt-shrink-0 mdt-self-center mdt-bg-border"
            />
            <span className="mdt-flex mdt-items-center mdt-text-xs mdt-text-muted-foreground">
              {selected} selected
            </span>
            <button
              type="button"
              data-slot="menu-select-all-clear"
              onClick={onClear}
              className={cn(
                'mdt-flex mdt-items-center mdt-rounded-md mdt-px-1.5',
                'mdt-text-xs mdt-font-medium mdt-text-danger-text',
                'hover:mdt-bg-destructive/10',
                'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring'
              )}
            >
              {clearLabel}
            </button>
          </>
        ) : null}
      </div>
    );
  }
);
DropdownMenuSelectAll.displayName = 'DropdownMenuSelectAll';

/**
 * DropdownMenuFooter - the decision at the bottom.
 *
 * For a menu that has changed something and waits to be told to act on it. The
 * quieter action goes on the left, matching every other footer in the set.
 */
const DropdownMenuFooter = forwardRef<HTMLDivElement, DropdownMenuFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="menu-footer"
      className={cn(
        BAND_BLEED,
        'mdt--mb-1.5 mdt-mt-1.5 mdt-flex mdt-items-center mdt-justify-end mdt-gap-2',
        'mdt-border-t mdt-border-border/60 mdt-px-5 mdt-py-2.5',
        className
      )}
      {...props}
    />
  )
);
DropdownMenuFooter.displayName = 'DropdownMenuFooter';

/** DropdownMenuSeparator - a hairline between groups. */
const DropdownMenuSeparator = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn(SEPARATOR_CLASSES, className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

/**
 * DropdownMenuShortcut - a keyboard shortcut in the trailing slot.
 *
 * Now draws a `Kbd` rather than letter-spaced text at 60% opacity. Prefer
 * `<DropdownMenuItem shortcut={['mod', 'd']}>` - this stays for the rare case
 * where the row is composed by hand.
 */
const DropdownMenuShortcut = ({ keys, className, ...props }: DropdownMenuShortcutProps) => (
  <span className={cn('mdt-ml-auto mdt-flex mdt-items-center', className)} {...props}>
    <Kbd keys={keys} size="sm" />
  </span>
);
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuList,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuHeader,
  DropdownMenuSearch,
  DropdownMenuSelectAll,
  DropdownMenuFooter,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
