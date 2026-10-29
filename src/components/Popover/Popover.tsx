import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import {
  createContext,
  forwardRef,
  useContext,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type FocusEvent,
  type KeyboardEvent,
} from 'react';
import { cn } from '@/utils';
import { Checkbox } from '../Checkbox';
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../DropdownMenu';
import { Icon } from '../Icon';
import { Input } from '../Input';
import type {
  PopoverAction,
  PopoverActionMenuProps,
  PopoverProps,
  PopoverQuickFilterProps,
  PopoverVariant,
} from './Popover.types';

/**
 * Popover - the one thing that floats over the page from a trigger, in three variants (Pranjal, 2026-10-29: "create a
 * new popover component with just two variant one will be empty card and another will be action menu popover";
 * "also include quick filter variant as well in popover"). The Popover before this is `PopoverOld2`, under
 * "Deprecated 2/Popover Old".
 *
 * - `variant="card"` (the default) - THE EMPTY CARD: the overlay surface and nothing else, for anything a page puts in
 *   it. Exactly the Popover as it was: `<Popover>`, `<PopoverTrigger>`, `<PopoverContent>`, so every part already on it
 *   keeps working unchanged.
 * - `variant="action-menu"` - THE ACTION MENU (a row's or a header's ⋯): `<PopoverActionMenu groups danger />`. Its
 *   rules are the component's, not the page's: an icon on every item; groups split by a divider where the page wants
 *   one (any number, or none); at most ONE red action, and when there is one it is ALWAYS last, ALWAYS under a divider.
 *   At least 224 wide, a floor - a longer item widens it.
 * - `variant="quick-filter"` - THE QUICK FILTER: `<PopoverQuickFilter heading options value onValueChange />`, the
 *   table toolbar's tick menu - a heading naming what it filters, an optional search, a checkbox per value.
 *
 * The two menus are menus underneath (the DropdownMenu primitives and their item parts), so they keep the menu's keys
 * - arrows between items, type to jump, Escape back to the trigger - and read as a menu to a screen reader. The card is
 * a Radix Popover, a dialog-style surface.
 *
 * THE OVERLAY SURFACE (Pranjal, 2026-09-26): its ground is `--mdt-popover`, the colour map's
 * `elevation.surface.overlay`: #FFFFFF in light, #111C2C in dark - a step DARKER than a card in dark, so a menu reads as
 * its own thing on any surface and the hairline (#1D2A3E) stays visible on it. The ink is `--mdt-popover-foreground`.
 * No private dark rule lives here: the theme is the tokens', switched by <html data-theme="dark">.
 *
 * `popoverSurface` is the same frame as a class list, for the other parts that float - the row menu, a select list,
 * the date panel, the filter panel - so they share one ground and one edge instead of each naming their own.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>
 *   <PopoverContent>…</PopoverContent>
 * </Popover>
 *
 * <Popover variant="action-menu">
 *   <PopoverTrigger asChild><Button iconOnly aria-label="More actions" … /></PopoverTrigger>
 *   <PopoverActionMenu
 *     groups={[[{ label: 'Edit details', icon: <Icon name="pencil" />, onSelect: edit }]]}
 *     danger={{ label: 'Delete user', icon: <Icon name="trash-2" />, onSelect: remove }}
 *   />
 * </Popover>
 * ```
 */

/** The overlay surface as one class list: ground, ink, hairline edge, radius, the elevated shadow. */
export const popoverSurface =
  'mdt-rounded-md mdt-border mdt-border-neutral-30 mdt-bg-popover mdt-text-popover-foreground mdt-shadow-lg';

const isMenu = (v: PopoverVariant) => v !== 'card';
const VariantContext = createContext<PopoverVariant>('card');

/** The root: holds the open state and says which variant the parts inside draw. */
const Popover = ({ variant = 'card', ...props }: PopoverProps) => (
  <VariantContext.Provider value={variant}>
    {isMenu(variant) ? <DropdownMenuPrimitive.Root {...props} /> : <PopoverPrimitive.Root {...props} />}
  </VariantContext.Provider>
);
Popover.displayName = 'Popover';

/** The button that toggles the popover - the menu's trigger in the two menu variants. */
const PopoverTrigger = forwardRef<
  ElementRef<typeof PopoverPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>((props, ref) => {
  const variant = useContext(VariantContext);
  return isMenu(variant) ? (
    <DropdownMenuPrimitive.Trigger ref={ref} {...props} />
  ) : (
    <PopoverPrimitive.Trigger ref={ref} {...props} />
  );
});
PopoverTrigger.displayName = 'PopoverTrigger';

/** An optional element to anchor the card to (the card variant only). */
const PopoverAnchor = PopoverPrimitive.Anchor;

/** The empty card: the overlay surface, 4 under its trigger, 16 of padding, 288 wide unless told otherwise. */
const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, onWheel, onTouchMove, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      /* A popover opened from a drawer or dialog is portalled outside it, so the dialog's scroll lock swallowed its
         wheel and touch scrolling (the date picker's time list did not move, 2026-09-28). Stopping the event here
         keeps it from reaching that document-level lock; the popover's own lists scroll natively. */
      onWheel={(e) => {
        e.stopPropagation();
        onWheel?.(e);
      }}
      onTouchMove={(e) => {
        e.stopPropagation();
        onTouchMove?.(e);
      }}
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      data-surface="overlay"
      className={cn(
        'mdt-z-50 mdt-w-72 mdt-p-4 mdt-outline-none',
        popoverSurface,
        'data-[state=open]:mdt-animate-in data-[state=closed]:mdt-animate-out',
        'data-[state=closed]:mdt-fade-out-0 data-[state=open]:mdt-fade-in-0',
        'data-[state=closed]:mdt-zoom-out-95 data-[state=open]:mdt-zoom-in-95',
        'data-[side=bottom]:mdt-slide-in-from-top-2 data-[side=left]:mdt-slide-in-from-right-2',
        'data-[side=right]:mdt-slide-in-from-left-2 data-[side=top]:mdt-slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

/** An optional close button for the card. */
const PopoverClose = PopoverPrimitive.Close;

/* a label never ends in an ellipsis (Pranjal, 2026-10-14: the action-menu rules) - the dialog it opens says the rest */
const TRAILING_ELLIPSIS = /(…|\.\.\.)\s*$/;

const ActionItem = ({ action, danger = false }: { action: PopoverAction; danger?: boolean }) => (
  <DropdownMenuItem
    variant={danger ? 'destructive' : 'default'}
    disabled={action.disabled ?? false}
    onSelect={action.onSelect}
  >
    {action.icon}
    <span className="mdt-min-w-0 mdt-flex-1 mdt-truncate">{action.label.replace(TRAILING_ELLIPSIS, '')}</span>
  </DropdownMenuItem>
);

/**
 * The action menu's list (inside `<Popover variant="action-menu">`). The page gives the actions; the order and the
 * dividers are the component's: each group in the order given with a divider between groups, then - when there is one
 * - the one red action, last, under its own divider. A group that comes out empty is dropped with its divider.
 */
const PopoverActionMenu = forwardRef<ElementRef<typeof DropdownMenuPrimitive.Content>, PopoverActionMenuProps>(
  ({ groups, danger, align = 'end', className, ...props }, ref) => {
    const filled = groups.filter((g) => g.length > 0);
    return (
      <DropdownMenuContent
        ref={ref}
        align={align}
        data-popover-variant="action-menu"
        /* at least 224 wide, a floor and not a width (Pranjal, 2026-10-27): a longer item widens the menu */
        className={cn('mdt-min-w-56', className)}
        {...props}
      >
        {filled.flatMap((group, i) => [
          ...(i > 0 ? [<DropdownMenuSeparator key={`divider-${String(i)}`} />] : []),
          ...group.map((a) => <ActionItem key={`${String(i)}-${a.label}`} action={a} />),
        ])}
        {danger && filled.length > 0 && <DropdownMenuSeparator data-before="danger" />}
        {danger && <ActionItem action={danger} danger />}
      </DropdownMenuContent>
    );
  }
);
PopoverActionMenu.displayName = 'PopoverActionMenu';

/** keys typed in the search stay in the box - the menu's own type-ahead and arrows would otherwise take them */
const stopMenuKeys = (e: KeyboardEvent) => {
  e.stopPropagation();
};

/**
 * The quick filter's list (inside `<Popover variant="quick-filter">`), as the table toolbar draws it: the heading that
 * names what it filters, an optional search (focused on open), then a checkbox row per value - several at once, and a
 * tick does not close it. As wide as its longest value, up to 380; past that a value ends in an ellipsis and carries
 * its full text as a title. A list with a search starts at 240 so the box has room; one without keeps 192.
 */
const PopoverQuickFilter = forwardRef<ElementRef<typeof DropdownMenuPrimitive.Content>, PopoverQuickFilterProps>(
  (
    {
      heading,
      options,
      value,
      onValueChange,
      searchable = false,
      searchLabel,
      align = 'start',
      className,
      onFocus,
      ...props
    },
    ref
  ) => {
    const [query, setQuery] = useState('');
    const searchRef = useRef<HTMLInputElement>(null);
    /* THE CURSOR STARTS IN THE SEARCH BOX: the menu focuses itself on open (and again when the pointer leaves a row),
       so whenever the list itself takes focus it hands it to the box - typing always lands in the search. A timer
       after mount lost that race in the browser. */
    const handOn = (e: FocusEvent<HTMLDivElement>) => {
      onFocus?.(e);
      if (searchable && e.target === e.currentTarget) searchRef.current?.focus();
    };
    const picked = new Set(value);
    const needle = query.trim().toLowerCase();
    const shown = needle ? options.filter((o) => o.label.toLowerCase().includes(needle)) : options;
    const toggle = (v: string, on: boolean) => {
      onValueChange(on ? [...value.filter((x) => x !== v), v] : value.filter((x) => x !== v));
    };
    return (
      <DropdownMenuContent
        ref={ref}
        align={align}
        data-popover-variant="quick-filter"
        className={cn('mdt-w-max mdt-max-w-[380px]', searchable ? 'mdt-min-w-[240px]' : 'mdt-min-w-48', className)}
        onFocus={handOn}
        {...props}
      >
        {heading && <DropdownMenuLabel>{heading}</DropdownMenuLabel>}
        {searchable && (
          <div className="mdt-p-1 mdt-pb-2">
            <Input
              ref={searchRef}
              onKeyDown={stopMenuKeys}
              size="sm"
              className="mdt-rounded-lg"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              placeholder="Search"
              aria-label={searchLabel ?? (heading ? `Search ${heading}` : 'Search')}
              startAdornment={<Icon name="search" size={14} />}
              onClear={() => {
                setQuery('');
              }}
              clearLabel="Clear search"
            />
          </div>
        )}
        {shown.length === 0 ? (
          <div className="mdt-px-2.5 mdt-py-2 mdt-text-[13px] mdt-text-neutral-60">No matches</div>
        ) : (
          shown.map((o) => (
            <DropdownMenuCheckboxItem
              key={o.value}
              /* THE ROW CARRIES A CHECKBOX (Pranjal, 2026-09-12: "i need checkboxes here"): which values are on, and
                 that several can be, at a glance. The menu's own tick is hidden in favour of the box. */
              className="mdt-min-h-[34px] mdt-gap-2.5 mdt-pl-2 mdt-pr-2 mdt-text-[13px] mdt-font-medium [&>span:first-child]:mdt-hidden"
              checked={picked.has(o.value)}
              onSelect={(e) => {
                e.preventDefault();
              }}
              onCheckedChange={(on) => {
                toggle(o.value, on);
              }}
            >
              <Checkbox
                className="mdt-pointer-events-none mdt-border-neutral-40"
                checked={picked.has(o.value)}
                tabIndex={-1}
                aria-hidden="true"
              />
              <span className="mdt-min-w-0 mdt-flex-1 mdt-truncate" title={o.label}>
                {o.render ?? o.label}
              </span>
            </DropdownMenuCheckboxItem>
          ))
        )}
      </DropdownMenuContent>
    );
  }
);
PopoverQuickFilter.displayName = 'PopoverQuickFilter';

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverClose,
  PopoverActionMenu,
  PopoverQuickFilter,
};
