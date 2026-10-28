import { forwardRef, useId } from 'react';
import { cn } from '@/utils';
import { iconAtDrawnSize } from '../../utils/icon-at-drawn-size';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import type { OrgCardProps } from './OrgCard.types';

/* PORTED FROM THE CONSOLE (Pranjal, 2026-10-28). The console's `src/ui/OrgCard.jsx` - "one part for every drawer
 * that says which organisation a thing belongs to" (Pranjal, 2026-09-27: "use that type of card everywhere") - in
 * Create team, Create role, the role builder, Create service account, Add access, Invite and Bulk import. It is the
 * User attributes drawer's "Applies to · This organization" card (2026-09-25: "make it a outline card as well").
 * Every value below is that card's:
 *
 *   label   13 / 500 / 1.5, the secondary ink (neutral-90), 8 above the card - the form ladder's label
 *   card    a hairline outline (neutral-20, the console's border) at radius 10, no fill, 8 in, 12 between the parts
 *   tile    40 square at radius 10 in the avatar-blue pair - a light tint with a dark building glyph at 20, never a
 *           solid fill (avatars wear a soft tint)
 *   name    14 / 500 / 1.5, the reading ink (neutral-150)
 *   line    12 / 1.5, the faint ink, 1 under the name */

/** The glyph's size in the 40 tile. */
const GLYPH_PX = 20;

/** An icon name is a string; anything else is a node the caller drew. */
const isIconName = (icon: unknown): icon is IconName => typeof icon === 'string';

/**
 * OrgCard - the card that says which organization a thing belongs to: the
 * organization's tile, its name and one line on what that means, with an
 * optional field label above it.
 *
 * It is read-only - a fact about the form it sits in, not a choice. To change
 * the organization, the person switches it in the organization switcher.
 *
 * @example
 * ```tsx
 * <OrgCard
 *   label="Organization"
 *   name="MSP owner organization"
 *   line="The team belongs to the active frame. Switch to a client frame to create a client team."
 * />
 * ```
 */
const OrgCard = forwardRef<HTMLDivElement, OrgCardProps>(function OrgCard(
  { name, line, label, icon = 'building', className, ...rest },
  ref
) {
  const labelId = useId();
  const hasLabel = label !== undefined && label !== null && label !== '';
  const hasLine = line !== undefined && line !== null && line !== '';
  const glyph = isIconName(icon) ? (
    <Icon name={icon} size={GLYPH_PX} />
  ) : (
    iconAtDrawnSize(icon, GLYPH_PX)
  );

  return (
    <div
      ref={ref}
      data-slot="org-card"
      className={className}
      {...(hasLabel ? { role: 'group', 'aria-labelledby': labelId } : {})}
      {...rest}
    >
      {hasLabel ? (
        <div
          id={labelId}
          className="mdt-mb-2 mdt-text-[13px] mdt-font-medium mdt-leading-normal mdt-text-neutral-90"
          data-slot="org-card-label"
        >
          {label}
        </div>
      ) : null}
      <div
        className="mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-[10px] mdt-border mdt-border-solid mdt-border-neutral-20 mdt-p-2"
        data-slot="org-card-body"
      >
        <span
          aria-hidden="true"
          className={cn(
            'mdt-grid mdt-size-10 mdt-flex-none mdt-place-items-center mdt-rounded-[10px]',
            'mdt-bg-[hsl(var(--mdt-avatar-blue-fill))] mdt-text-[hsl(var(--mdt-avatar-blue-ink))]',
            '[&_svg]:mdt-size-5'
          )}
          data-slot="org-card-tile"
        >
          {glyph}
        </span>
        <span className="mdt-flex mdt-min-w-0 mdt-flex-col">
          <span
            className="mdt-text-sm mdt-font-medium mdt-leading-normal mdt-text-neutral-150"
            data-slot="org-card-name"
          >
            {name}
          </span>
          {hasLine ? (
            <span
              className="mdt-mt-px mdt-text-xs mdt-leading-normal mdt-text-faint"
              data-slot="org-card-line"
            >
              {line}
            </span>
          ) : null}
        </span>
      </div>
    </div>
  );
});

OrgCard.displayName = 'OrgCard';

export { OrgCard };
