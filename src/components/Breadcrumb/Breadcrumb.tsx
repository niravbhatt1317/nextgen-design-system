import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type { BreadcrumbItem, BreadcrumbProps, BreadcrumbVariant } from './Breadcrumb.types';

/**
 * The row - the console's `ui/Breadcrumb.jsx` and `ui/DrawerCrumb.jsx`, read
 * off the running console 2026-09-22; the drawer form re-read 2026-10-28.
 *
 * `page` is the header band's 12/500 on a line-height of 1, six apart, in the
 * faint ink (#8FA0BD - the console's muted foreground). `drawer` is the title
 * slot it stands in: 14 on a 20 line like every drawer title (Pranjal
 * 2026-10-26: "even the breadcrumb should be the same", then "make the
 * sidedrawer heading to be 14px"), the same faint ink for everything that is
 * not the step, and its boxes 7 apart - with the 14 chevron's own inset that
 * makes every visible gap 12 (the console's global.css, measured on the fleets'
 * trail).
 */
export const breadcrumbVariants = cva('mdt-flex mdt-items-center', {
  variants: {
    variant: {
      page: 'mdt-gap-1.5 mdt-text-xs mdt-font-medium mdt-leading-none mdt-text-faint',
      drawer: 'mdt-gap-[7px] mdt-text-sm mdt-leading-5 mdt-text-faint',
    },
  },
  defaultVariants: { variant: 'page' },
});

/** The list and each item share the row's gap: six on the page, seven in the drawer (twelve to the eye). */
const TRAIL: Record<BreadcrumbVariant, string> = {
  page: 'mdt-gap-1.5',
  drawer: 'mdt-gap-[7px]',
};

/** The chevron between two places: 12 on the page, 14 in the drawer. */
const SEPARATOR: Record<BreadcrumbVariant, number> = {
  page: 12,
  drawer: 14,
};

/**
 * An ancestor. In the drawer it drops to 400 so the step's 600 is the only
 * weight on the row; on the page the whole row is already 500.
 */
const ANCESTOR: Record<BreadcrumbVariant, string> = {
  page: '',
  drawer: 'mdt-font-normal',
};

/**
 * Where you are now: on the page the foreground (#070F1D); in the drawer the
 * title's 600 in the title's soft ink (#1D2B3E - what the console's drawer
 * title renders, P-106).
 */
const CURRENT: Record<BreadcrumbVariant, string> = {
  page: 'mdt-text-foreground',
  drawer: 'mdt-font-semibold mdt-text-neutral-130',
};

/**
 * A clickable place.
 *
 * On the page nothing is drawn that a plain span would not draw - the pointer
 * is the only hover cue, as the console has it - but the keyboard gets a ring,
 * because the console's span cannot be reached by keyboard and this one can.
 *
 * In the drawer it is the way back (the console's `.drawer-crumb__link`): the
 * crumb's own type and faint ink at rest; under the pointer the foreground and
 * an underline 3 below the text in neutral-60; on keyboard focus a 2 outline in
 * the ring colour, 2 out; corners 4.
 */
const LINK: Record<BreadcrumbVariant, string> = {
  page: [
    'mdt-cursor-pointer mdt-rounded-sm',
    'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring',
    'focus-visible:mdt-ring-offset-2 focus-visible:mdt-ring-offset-background',
  ].join(' '),
  drawer: [
    'mdt-cursor-pointer mdt-rounded-sm',
    'hover:mdt-text-foreground hover:mdt-underline hover:mdt-decoration-neutral-60 hover:mdt-underline-offset-[3px]',
    'focus-visible:mdt-outline focus-visible:mdt-outline-2 focus-visible:mdt-outline-offset-2 focus-visible:mdt-outline-ring',
  ].join(' '),
};

/** Whether there is a real address to follow. */
const linkable = (href: string | undefined): href is string => href !== undefined && href !== '';

/**
 * A drawer step's name as the way back: the given name, else "Back to <its
 * label>" when the label is a word, else nothing - the button is then named by
 * what it shows.
 */
const wayBackName = (item: BreadcrumbItem, given: string | undefined): string | undefined => {
  if (given !== undefined && given !== '') return given;
  return typeof item.label === 'string' && item.label !== '' ? `Back to ${item.label}` : undefined;
};

/** What following a place does, and what it is called - empty when it cannot be followed. */
interface Follow {
  href?: string | undefined;
  onSelect?: (() => void) | undefined;
  name?: string | undefined;
}

interface FollowContext {
  variant: BreadcrumbVariant;
  last: number;
  onBack: (() => void) | undefined;
  backLabel: string | undefined;
}

/**
 * How one place can be followed. On the page: its own `href` or `onSelect`.
 * In the drawer: only an ancestor (the step is where you are), by its own
 * `href` or `onSelect`, and the step before the last by `onBack` when it was
 * given nothing of its own; each named as the way back.
 */
const followOf = (item: BreadcrumbItem, index: number, context: FollowContext): Follow => {
  const { variant, last, onBack, backLabel } = context;
  if (variant === 'page') return { href: item.href, onSelect: item.onSelect };
  if (index === last) return {};
  const parent = index === last - 1;
  const own = linkable(item.href) || item.onSelect !== undefined;
  return {
    href: item.href,
    onSelect: own || !parent ? item.onSelect : onBack,
    name: wayBackName(item, parent ? backLabel : undefined),
  };
};

/**
 * Breadcrumb - says where you are, and offers the way back.
 *
 * Depth, not sequence: a crumb is the path down to here, and every place on it
 * already exists. A journey with steps that have not happened yet is `Stepper`;
 * doors you can take in any order are `Tabs`.
 *
 * Two forms. The `page` form sits in the header band after the panel icon and
 * lets the ancestors be followed. The `drawer` form replaces a drawer's title
 * while a page is open inside it - the earlier steps in the faint ink, a
 * chevron, the step - and is a real breadcrumb with **no back button**
 * (Pranjal, 2026-10-26: "Where first or other options will be clickable so no
 * need for back button. Update it in all the sidedrawers"): every step before
 * the last that is given somewhere to go is a way back, underlined under the
 * pointer and named "Back to <step>".
 *
 * Every name stays on one line and is never shortened - the console's crumb is
 * `white-space: nowrap` throughout.
 *
 * Announced as a navigation landmark named "Breadcrumb" holding a list, with
 * the last item marked as the current page. The chevrons are drawing only.
 *
 * @example
 * <Breadcrumb items={[{ label: 'Settings', href: '/settings' }, { label: 'Users' }]} />
 *
 * @example
 * <Breadcrumb
 *   variant="drawer"
 *   items={[{ label: 'Needs attention', onSelect: showList }, { label: 'Crashing modules' }]}
 * />
 */
export const Breadcrumb = ({
  items,
  variant = 'page',
  onBack,
  backLabel,
  'aria-label': ariaLabel = 'Breadcrumb',
  className,
  ...props
}: BreadcrumbProps) => {
  const last = items.length - 1;
  const inDrawer = variant === 'drawer';
  const context: FollowContext = { variant, last, onBack, backLabel };

  const renderLabel = (item: BreadcrumbItem, index: number): ReactNode => {
    const tone = index === last ? CURRENT[variant] : ANCESTOR[variant];
    const base = cn('mdt-shrink-0 mdt-whitespace-nowrap', tone);
    const follow = followOf(item, index, context);
    const named = follow.name === undefined ? {} : { 'aria-label': follow.name };

    if (linkable(follow.href)) {
      return (
        <a
          href={follow.href}
          data-slot="breadcrumb-label"
          className={cn(base, LINK[variant])}
          {...named}
        >
          {item.label}
        </a>
      );
    }
    if (follow.onSelect !== undefined) {
      return (
        <button
          type="button"
          onClick={follow.onSelect}
          data-slot="breadcrumb-label"
          className={cn(base, LINK[variant])}
          {...named}
        >
          {item.label}
        </button>
      );
    }
    // The console's page crumb sets `cursor: default` on a place you cannot
    // follow; its drawer crumb sets nothing.
    return (
      <span data-slot="breadcrumb-label" className={cn(base, !inDrawer && 'mdt-cursor-default')}>
        {item.label}
      </span>
    );
  };

  return (
    <nav
      aria-label={ariaLabel}
      data-slot="breadcrumb"
      data-variant={variant}
      className={cn(breadcrumbVariants({ variant }), className)}
      {...props}
    >
      <ol
        data-slot="breadcrumb-trail"
        className={cn('mdt-m-0 mdt-flex mdt-list-none mdt-items-center mdt-p-0', TRAIL[variant])}
      >
        {items.map((item, index) => (
          <li
            key={item.id ?? index}
            data-slot="breadcrumb-item"
            className={cn('mdt-flex mdt-shrink-0 mdt-items-center', TRAIL[variant])}
            {...(index === last ? { 'aria-current': 'page' as const } : {})}
          >
            {index > 0 ? (
              <Icon
                name="chevron-right"
                size={SEPARATOR[variant]}
                aria-hidden
                data-slot="breadcrumb-separator"
                className="mdt-shrink-0"
              />
            ) : null}
            {renderLabel(item, index)}
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.displayName = 'Breadcrumb';
