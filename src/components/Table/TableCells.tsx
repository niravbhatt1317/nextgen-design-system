import type { ReactNode } from 'react';
import { cn } from '@/utils';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Icon } from '../Icon';
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
        'mdt-inline-flex mdt-min-w-0 mdt-max-w-full mdt-items-center mdt-gap-2.5',
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
          muted
            ? 'mdt-font-normal mdt-text-muted-foreground'
            : 'mdt-font-medium mdt-text-neutral-130'
        )}
        title={name}
      >
        {name}
      </span>
      {owner && (
        <span
          className="tbl-owner mdt-inline-flex mdt-h-5 mdt-w-5 mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded-full mdt-text-azure-60"
          role="img"
          aria-label="Tenant owner"
          title="Tenant owner"
        >
          <Icon name="shield" size={12} />
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

/** The Contact cell: 28px circles that copy on click, overlapping by 6px; an em-dash when there is nothing. */
function ContactChips({ email, phone, onCopy }: ContactChipsProps) {
  if (!email && !phone) return <TableEmptyValue />;
  const chip = (kind: 'email' | 'phone', value: string, icon: IconName) => (
    <button
      type="button"
      key={kind}
      className="mdt-inline-flex mdt-h-7 mdt-w-7 mdt-items-center mdt-justify-center mdt-rounded-full mdt-border mdt-border-solid mdt-border-neutral-30 mdt-bg-background mdt-p-0 mdt-text-neutral-90 hover:mdt-border-neutral-90 [&+&]:-mdt-ml-1.5"
      title={`Copy ${kind}`}
      aria-label={`Copy ${kind}: ${value}`}
      onClick={(e) => {
        e.stopPropagation();
        void navigator.clipboard.writeText(value);
        onCopy?.(value, kind);
      }}
    >
      <Icon name={icon} size={14} />
    </button>
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

/** Teams, roles and the like: neutral square Badges, and a slate "+N" that lists the rest on hover. */
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
      {rest.length > 0 && (
        <Badge
          size="sm"
          shape="square"
          tone="slate"
          title={rest.join(', ')}
          aria-label={`${String(rest.length)} more: ${rest.join(', ')}`}
        >
          +{rest.length}
        </Badge>
      )}
    </span>
  );
}

/** A missing value: an em-dash that reads "Not set". */
function TableEmptyValue() {
  return (
    <span className="mdt-text-muted-foreground" aria-label="Not set">
      —
    </span>
  );
}

export { PersonCell, ContactChips, TagList, TableEmptyValue };
