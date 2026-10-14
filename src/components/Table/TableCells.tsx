import type { ReactNode } from 'react';
import { cn } from '@/utils';
import { OverflowCount } from '../OverflowCount';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Icon } from '../Icon';
import { IconTile } from '../IconTile';
import type { IconName } from '../Icon';
import './table.css';

export interface PersonCellProps {
  name: string;
  /** Overrides the avatar the name would produce. */
  avatar?: ReactNode;
  /** The tenant owner's mark: a 20px blue-10 circle with a 12px azure shield. */
  owner?: boolean;
  /** An invited person: the name goes muted. */
  muted?: boolean;
  className?: string;
}

/** The Name cell: a 32px avatar, the name at 12px medium, and the owner mark when it applies. */
function PersonCell({ name, avatar, owner = false, muted = false, className }: PersonCellProps) {
  return (
    <span
      className={cn(
        'mdt-inline-flex mdt-min-w-0 mdt-max-w-full mdt-items-center mdt-gap-3',
        className
      )}
    >
      {avatar ?? (
        <Avatar
          name={name}
          initials={name.charAt(0)}
          size="md"
          className={cn('mdt-shrink-0 mdt-text-xs mdt-font-semibold', muted && 'mdt-opacity-70')}
        />
      )}
      <span
        className={cn(
          'mdt-overflow-hidden mdt-text-ellipsis mdt-whitespace-nowrap',
          muted ? 'mdt-font-normal mdt-text-faint' : 'mdt-font-medium mdt-text-neutral-130'
        )}
        title={name}
      >
        {name}
      </span>
      {owner && (
        <span
          className="tbl-owner mdt-inline-flex mdt-h-5 mdt-w-5 mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-blue-10 mdt-text-blue-60"
          role="img"
          aria-label="Tenant owner"
          title="Tenant owner"
        >
          {/* the console's mark: Tabler shield-filled at 12, in the label's ink (fill, not stroke) */}
          <svg
            width={12}
            height={12}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="mdt-block"
          >
            <path d="M11.884 2.007l.114 -.007l.118 .007l.059 .008l.061 .013l.111 .034a.993 .993 0 0 1 .217 .112l.104 .082l.255 .218a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.531 -2.527l.263 -.225l.096 -.075a.993 .993 0 0 1 .217 -.112l.112 -.034a.97 .97 0 0 1 .119 -.021z" />
          </svg>
        </span>
      )}
    </span>
  );
}

export interface ContactChipsProps {
  email?: string | null;
  phone?: string | null;
  /** Called with the value that was copied. */
  onCopy?: (value: string, kind: 'email' | 'phone') => void;
}

/** The contact circle: the outline tile at 28 with its 14 glyph, as the console's Contact cell draws it. */
const CHIP_SIZE = 'mdt-h-7 mdt-w-7';

/** The Contact cell: 28px circles that copy on click, overlapping by 6px; an em-dash when there is nothing. Each chip carries its value in a bubble. */
function ContactChips({ email, phone, onCopy }: ContactChipsProps) {
  if (!email && !phone) return <TableEmptyValue />;
  const chip = (kind: 'email' | 'phone', value: string, icon: IconName) => (
    <IconTile
      tone="outline"
      shape="circle"
      size="sm"
      className={CHIP_SIZE}
      icon={<Icon name={icon} size={14} />}
      aria-label={`Copy ${kind}: ${value}`}
      copyValue={value}
      hint={`Click the icon to copy the ${kind === 'email' ? 'mail' : 'number'}`}
      onCopy={(copied) => onCopy?.(copied, kind)}
    />
  );
  return (
    <span className="mdt-inline-flex">
      {email ? chip('email', email, 'mail') : null}
      {phone ? chip('phone', phone, 'phone') : null}
    </span>
  );
}

export interface TagListProps {
  items: string[];
  /** How many to show before the "+N". */
  max?: number;
}

/** Teams, roles and the like: neutral square Badges, and a quiet "+N" whose bubble lists the rest - the value wears the
 * badge, the counter is plain muted text (Pranjal 2026-10-11: one "+N" across the console). */
function TagList({ items, max = 2 }: TagListProps) {
  if (items.length === 0) return <TableEmptyValue />;
  const shown = items.slice(0, max);
  const rest = items.slice(max);
  return (
    <span className="mdt-inline-flex mdt-items-center mdt-gap-1">
      {shown.map((t) => (
        <Badge key={t} size="sm" shape="square">
          {t}
        </Badge>
      ))}
      {/* the one "+N" - OverflowCount was ported from the console's MoreCount to be exactly this */}
      <OverflowCount items={rest} />
    </span>
  );
}

/** A missing value: an em-dash that reads "Not set". */
function TableEmptyValue() {
  return (
    <span className="mdt-text-faint" aria-label="Not set">
      —
    </span>
  );
}

export { PersonCell, ContactChips, TagList, TableEmptyValue };
