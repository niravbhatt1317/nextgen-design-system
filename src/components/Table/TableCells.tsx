import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/utils';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Icon } from '../Icon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../Tooltip';
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
            : 'mdt-font-medium mdt-text-neutral-130 dark:mdt-text-neutral-10'
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

const CHIP =
  'mdt-inline-flex mdt-h-7 mdt-w-7 mdt-items-center mdt-justify-center mdt-rounded-full mdt-border mdt-border-solid mdt-border-neutral-30 mdt-bg-background mdt-p-0 mdt-text-neutral-90 hover:mdt-border-azure-60 hover:mdt-text-azure-60 data-[state=delayed-open]:mdt-border-azure-60 data-[state=delayed-open]:mdt-text-azure-60 data-[state=instant-open]:mdt-border-azure-60 data-[state=instant-open]:mdt-text-azure-60 dark:mdt-border-neutral-110 dark:mdt-text-neutral-40 [&+&]:-mdt-ml-1.5';

/**
 * One chip: the value in an instant bubble with the click-to-copy hint; after a
 * click the bubble says "Copied!" until the pointer leaves. The bubble is held
 * open through the click, which would otherwise close it.
 */
function ContactChip({
  kind,
  value,
  icon,
  onCopy,
}: {
  kind: 'email' | 'phone';
  value: string;
  icon: IconName;
  onCopy?: ((value: string, kind: 'email' | 'phone') => void) | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const clicked = useRef(false);
  return (
    <Tooltip
      instant
      open={open}
      onOpenChange={(next) => {
        if (!next && clicked.current) {
          clicked.current = false;
          return;
        }
        setOpen(next);
        if (!next) setCopied(false);
      }}
    >
      <TooltipTrigger asChild>
        <button
          type="button"
          className={CHIP}
          aria-label={`Copy ${kind}: ${value}`}
          onClick={(e) => {
            e.stopPropagation();
            void navigator.clipboard.writeText(value);
            clicked.current = true;
            setCopied(true);
            setOpen(true);
            onCopy?.(value, kind);
          }}
        >
          <Icon name={icon} size={14} />
        </button>
      </TooltipTrigger>
      <TooltipContent
        {...(copied
          ? {}
          : { hint: `Click the icon to copy the ${kind === 'email' ? 'mail' : 'number'}` })}
      >
        {copied ? 'Copied!' : value}
      </TooltipContent>
    </Tooltip>
  );
}

/** The Contact cell: 28px circles that copy on click, overlapping by 6px; an em-dash when there is nothing. Each chip carries its value in a bubble. */
function ContactChips({ email, phone, onCopy }: ContactChipsProps) {
  if (!email && !phone) return <TableEmptyValue />;
  return (
    <TooltipProvider>
      <span className="mdt-inline-flex">
        {email ? <ContactChip kind="email" value={email} icon="mail" onCopy={onCopy} /> : null}
        {phone ? <ContactChip kind="phone" value={phone} icon="phone" onCopy={onCopy} /> : null}
      </span>
    </TooltipProvider>
  );
}

export interface TagListProps {
  items: string[];
  /** How many to show before the "+N". */
  max?: number;
}

/** Teams, roles and the like: neutral square Badges, and a slate "+N" whose bubble lists the rest. */
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
        <TooltipProvider>
          <Tooltip instant>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="mdt-inline-flex mdt-cursor-default mdt-rounded mdt-border-0 mdt-bg-transparent mdt-p-0"
                aria-label={`${String(rest.length)} more: ${rest.join(', ')}`}
              >
                <Badge size="sm" shape="square" tone="slate" aria-hidden="true">
                  +{rest.length}
                </Badge>
              </button>
            </TooltipTrigger>
            <TooltipContent items={rest} />
          </Tooltip>
        </TooltipProvider>
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
