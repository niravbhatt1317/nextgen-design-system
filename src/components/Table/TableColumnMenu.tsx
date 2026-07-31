import { Fragment } from 'react';
import { cn } from '@/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../DropdownMenu';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import type { TableColumnMenuProps } from './Table.types';

/**
 * The menu items, grouped exactly as they are separated on screen.
 *
 * Written as data rather than markup because the separators depend on which
 * groups survive: a column with nothing to filter and nothing to group would
 * otherwise open onto a leading rule with nothing above it.
 */
interface MenuItem {
  icon: IconName;
  label: string;
  onSelect: (() => void) | undefined;
}

/** The same item once its handler is known to exist. */
interface PresentItem {
  icon: IconName;
  label: string;
  onSelect: () => void;
}

const TRIGGER = [
  'mdt-inline-flex mdt-max-w-full mdt-items-center mdt-gap-1 mdt-rounded-sm',
  'mdt-text-left mdt-font-medium',
  // The header already reads as a label; the affordance is the hover, not a
  // permanent frame. A column of framed buttons turns a header into a toolbar.
  'mdt-transition-colors hover:mdt-text-foreground',
  'focus-visible:mdt-outline-none focus-visible:mdt-ring-2 focus-visible:mdt-ring-ring',
].join(' ');

/**
 * TableColumnMenu - the controls that belong to one column.
 *
 * Everything here acts on a single column, which is what separates it from the
 * toolbar: the toolbar asks "what should this table show", this asks "what
 * about this column". Both read the same `useTableColumns` state, so they
 * cannot disagree about where a column went.
 *
 * **Items appear only when you pass a handler.** A column with no `onGroup`
 * shows no Group item, rather than a dead one - an option that does nothing is
 * worse than an option that is not there, and a table where every column can be
 * grouped is rarer than it sounds.
 *
 * **Freeze is capped, not disabled.** `canFreeze` hides the item entirely past
 * the freeze limit, because "pin this column" makes no sense for a column with
 * unpinned columns to its left - it would have nowhere to sit.
 *
 * @example
 * ```tsx
 * <TableHead>
 *   <TableColumnMenu
 *     label="Subject"
 *     onSort={() => { toggleSort('subject'); }}
 *     frozen={cols.isFrozen('subject')}
 *     canFreeze={cols.canFreeze('subject')}
 *     onToggleFreeze={() => { cols.isFrozen('subject')
 *       ? cols.unfreeze('subject')
 *       : cols.freeze('subject'); }}
 *     onMoveToStart={() => { cols.moveToStart('subject'); }}
 *     onMoveToEnd={() => { cols.moveToEnd('subject'); }}
 *     onHide={() => { cols.hide('subject'); }}
 *   />
 * </TableHead>
 * ```
 */
const TableColumnMenu = ({
  label,
  onFilter,
  onGroup,
  onSort,
  frozen = false,
  canFreeze = false,
  onToggleFreeze,
  onMoveToStart,
  onMoveToEnd,
  onHide,
  header,
  align = 'start',
  className,
  children,
  ...props
}: TableColumnMenuProps) => {
  const groups: MenuItem[][] = [
    [
      { icon: 'list-filter', label: 'Filter', onSelect: onFilter },
      { icon: 'layout-list', label: 'Group', onSelect: onGroup },
      { icon: 'arrow-up-down', label: 'Sort', onSelect: onSort },
    ],
    [
      {
        icon: frozen ? 'pin-off' : 'pin',
        label: frozen ? 'Unfreeze' : 'Freeze',
        onSelect: canFreeze ? onToggleFreeze : undefined,
      },
    ],
    [
      { icon: 'arrow-left-to-line', label: 'Move to start', onSelect: onMoveToStart },
      { icon: 'arrow-right-to-line', label: 'Move to end', onSelect: onMoveToEnd },
    ],
    [{ icon: 'eye-off', label: 'Hide this column', onSelect: onHide }],
  ];

  const present: PresentItem[][] = groups
    .map((group) =>
      group.flatMap((item) =>
        item.onSelect === undefined ? [] : [{ ...item, onSelect: item.onSelect }]
      )
    )
    .filter((group) => group.length > 0);

  // A trigger that opens an empty menu is a worse affordance than plain text.
  if (present.length === 0 && header === undefined) {
    return <span className={cn('mdt-font-medium', className)}>{children ?? label}</span>;
  }

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <button type="button" className={cn(TRIGGER, className)} aria-label={`${label} column`}>
          <span className="mdt-truncate">{children ?? label}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {/*
          Reserved for the sort stack, which arrives with multi-column sorting.
          It sits above the items rather than among them because it is a list of
          what is already true, not a list of things to do.
        */}
        {header}
        {present.map((group, index) => (
          // Index is a safe key here: the groups are a fixed, ordered set, not
          // a list that reorders.
          <Fragment key={group[0]?.label ?? index}>
            {(index > 0 || header !== undefined) && <DropdownMenuSeparator />}
            {group.map((item) => (
              <DropdownMenuItem key={item.label} onSelect={item.onSelect}>
                <Icon name={item.icon} size="sm" aria-hidden />
                {item.label}
              </DropdownMenuItem>
            ))}
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

TableColumnMenu.displayName = 'TableColumnMenu';

export { TableColumnMenu };
