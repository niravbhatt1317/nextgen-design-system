import { forwardRef } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import { IconTile } from '../IconTile';
import type { EmptyStateProps } from './EmptyState.types';

/**
 * PORTED FROM THE CONSOLE (Pranjal, 2026-10-13). The console drew this by hand
 * as `src/ui/EmptyStateBlock.jsx` and used it in about twenty drawers and tabs -
 * Users, Teams, Roles, Access profiles, Organizations, SSO, SCIM - wherever a
 * list inside a panel has nothing in it. Every value below is that block's,
 * read from its source:
 *
 *   block    centred column, gap 8, padding 40 / 24
 *   tile     40 square, radius --mdt-radius (8), muted fill, muted ink, glyph 18
 *   title    13 / 600 / 1.35, foreground ink
 *   line     12 / 1.5, muted ink, 360 wide at most
 *   action   6 below the line, on top of the gap
 *
 * The table's own blank (`TableBlank`) is the bigger sibling: it fills a whole
 * table card, so its tile, title and button are a step larger. This one sits in
 * a drawer section or a tab, between rows, and stays at the drawer's scale.
 */
const ICON_PX = 18;

/** An icon name is a string; anything else is a node the caller drew. */
function isIconName(icon: unknown): icon is IconName {
  return typeof icon === 'string';
}

/**
 * EmptyState - an icon tile, a title, one muted line and an optional action,
 * centred, for an empty list anywhere outside a table.
 *
 * It is a status: the words change as a search or a filter empties the list, so
 * a screen reader hears "No people match" without moving to it. Override
 * `role` where the state is the only thing on a page that will never change.
 *
 * @example
 * ```tsx
 * <EmptyState icon="users" title="No members yet" description="Add people to give them this team's access." />
 *
 * <EmptyState
 *   icon="search"
 *   title="No people match"
 *   description="Nothing here matches the search."
 *   action={<Button variant="outline" size="sm" onClick={clear}>Clear search</Button>}
 * />
 * ```
 */
const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon = 'inbox', title, description, action, className, ...rest }, ref) => {
    const glyph = isIconName(icon) ? <Icon name={icon} size={ICON_PX} /> : icon;
    return (
      <div
        ref={ref}
        role="status"
        className={cn(
          'mdt-flex mdt-flex-col mdt-items-center mdt-justify-center mdt-gap-2 mdt-px-6 mdt-py-10 mdt-text-center',
          className
        )}
        {...rest}
      >
        {/* IconTile at lg is the 40 square; the console's tile differs from the
            slate tone in three places, so those three are set here: the 8
            radius, the muted fill and ink (theme tokens, so dark follows), and
            the 18 glyph. */}
        <IconTile
          size="lg"
          icon={glyph}
          className="mdt-rounded-lg mdt-bg-muted mdt-text-muted-foreground [&_svg]:mdt-size-[18px]"
        />
        <div className="mdt-text-[13px] mdt-font-semibold mdt-leading-[1.35] mdt-text-foreground">
          {title}
        </div>
        {description !== undefined && description !== null && description !== '' ? (
          <div className="mdt-max-w-[360px] mdt-text-xs mdt-leading-normal mdt-text-muted-foreground">
            {description}
          </div>
        ) : null}
        {action !== undefined && action !== null && action !== false ? (
          <div className="mdt-mt-1.5">{action}</div>
        ) : null}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';

export { EmptyState };
