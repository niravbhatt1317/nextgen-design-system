import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { cn } from '@/utils';
import { Button } from '../Button';
import { Icon } from '../Icon';
import type { BreadcrumbItem, BreadcrumbProps, BreadcrumbVariant } from './Breadcrumb.types';

/**
 * The row - the console's `ui/Breadcrumb.jsx` and `ui/DrawerCrumb.jsx`, read
 * off the running console 2026-09-22.
 *
 * `page` is the header band's 12/500 on a line-height of 1, six apart, in the
 * faint ink (#8FA0BD - the console's muted foreground). `drawer` is the title
 * slot it stands in: the title's 16 on its 24 line, ten apart, and the same
 * faint ink for everything that is not the step.
 */
export const breadcrumbVariants = cva('mdt-flex mdt-items-center', {
  variants: {
    variant: {
      page: 'mdt-gap-1.5 mdt-text-xs mdt-font-medium mdt-leading-none mdt-text-faint',
      drawer: 'mdt-gap-2.5 mdt-text-base mdt-leading-6 mdt-text-faint',
    },
  },
  defaultVariants: { variant: 'page' },
});

/** The list inside the row shares the row's gap, so the back button sits ten from the nick and the nick ten from the parent. */
const TRAIL: Record<BreadcrumbVariant, string> = {
  page: 'mdt-gap-1.5',
  drawer: 'mdt-gap-2.5',
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
 * A clickable place. Nothing is drawn that a plain span would not draw -
 * the pointer is the only hover cue, as the console has it - but the keyboard
 * gets a ring, because the console's span cannot be reached by keyboard and
 * this one can.
 */
const LINK = [
  'mdt-cursor-pointer mdt-rounded-sm',
  'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring',
  'focus-visible:mdt-ring-offset-2 focus-visible:mdt-ring-offset-background',
].join(' ');

/** Whether there is a real address to follow. */
const linkable = (href: string | undefined): href is string => href !== undefined && href !== '';

/**
 * The back button's name when none is given: "Back to <parent>" when the
 * parent is a word, and plain "Back" when it is something drawn.
 */
const defaultBackLabel = (parent: BreadcrumbItem | undefined): string =>
  typeof parent?.label === 'string' && parent.label !== '' ? `Back to ${parent.label}` : 'Back';

/**
 * Breadcrumb - says where you are, and offers the way back.
 *
 * Depth, not sequence: a crumb is the path down to here, and every place on it
 * already exists. A journey with steps that have not happened yet is `Stepper`;
 * doors you can take in any order are `Tabs`.
 *
 * Two forms. The `page` form sits in the header band after the panel icon and
 * lets the ancestors be followed. The `drawer` form replaces a drawer's title
 * while a page is open inside it - a back button, a nick, the parent in the
 * faint ink, a chevron, the step - and there **only the back button
 * navigates**, so the way back is one thing and it is visible before anyone
 * commits.
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
 *   items={[{ label: 'User management' }, { label: 'Edit details' }]}
 *   onBack={closeEdit}
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
  const back = backLabel ?? defaultBackLabel(items[0]);

  const renderLabel = (item: BreadcrumbItem, isLast: boolean): ReactNode => {
    const tone = isLast ? CURRENT[variant] : ANCESTOR[variant];
    const shared = {
      'data-slot': 'breadcrumb-label',
      className: cn('mdt-shrink-0 mdt-whitespace-nowrap', tone),
    };

    // In a drawer the crumb names the way back; it does not offer three of them.
    if (!inDrawer && linkable(item.href)) {
      return (
        <a href={item.href} {...shared} className={cn(shared.className, LINK)}>
          {item.label}
        </a>
      );
    }
    if (!inDrawer && item.onSelect !== undefined) {
      return (
        <button
          type="button"
          onClick={item.onSelect}
          {...shared}
          className={cn(shared.className, LINK)}
        >
          {item.label}
        </button>
      );
    }
    // The console's page crumb sets `cursor: default` on a place you cannot
    // follow; its drawer crumb sets nothing.
    return (
      <span {...shared} className={cn(shared.className, !inDrawer && 'mdt-cursor-default')}>
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
      {inDrawer && onBack !== undefined ? (
        <>
          <Button
            variant="ghost"
            iconOnly
            size="sm"
            leftIcon={<Icon name="chevron-left" aria-hidden />}
            onClick={onBack}
            ariaLabel={back}
            title={back}
            data-slot="breadcrumb-back"
          />
          {/* the nick: 1 x 16 in neutral-30, the console's `t.border` */}
          <span
            aria-hidden="true"
            data-slot="breadcrumb-nick"
            className="mdt-h-4 mdt-w-px mdt-shrink-0 mdt-bg-neutral-30"
          />
        </>
      ) : null}
      <ol
        data-slot="breadcrumb-trail"
        className={cn('mdt-m-0 mdt-flex mdt-list-none mdt-items-center mdt-p-0', TRAIL[variant])}
      >
        {items.map((item, index) => {
          const isLast = index === last;
          return (
            <li
              key={item.id ?? index}
              data-slot="breadcrumb-item"
              className={cn('mdt-flex mdt-shrink-0 mdt-items-center', TRAIL[variant])}
              {...(isLast ? { 'aria-current': 'page' as const } : {})}
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
              {renderLabel(item, isLast)}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.displayName = 'Breadcrumb';
