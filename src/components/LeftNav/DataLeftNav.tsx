import { useMemo, useState } from 'react';
import { Badge } from '../Badge';
import { Icon } from '../Icon';
import {
  LeftNav,
  LeftNavBody,
  LeftNavExit,
  LeftNavExpandable,
  LeftNavFooter,
  LeftNavGroup,
  LeftNavItem,
  LeftNavSearch,
  LeftNavSection,
} from './LeftNav';
import { useLeftNavLevels } from './useLeftNavLevels';
import type { DataLeftNavProps, LeftNavConfigItem } from './LeftNav.types';

/**
 * Entries in the order their headings first appear.
 *
 * Not alphabetical and not the order of a `groups` array, because a
 * configuration should not have to declare its headings twice. The first entry
 * carrying a heading puts it in the list; every later one joins it.
 */
const byGroup = (items: LeftNavConfigItem[]) => {
  const order: (string | undefined)[] = [];
  for (const item of items) if (!order.includes(item.group)) order.push(item.group);
  return order.map((group) => ({
    group,
    items: items.filter((item) => item.group === group),
  }));
};

/**
 * Every entry, flattened, each tagged with the section it lives in.
 *
 * The *section*, not the immediate parent. A page folded inside another page is
 * two deep, and opening its immediate parent means opening something that is
 * not a section - the panel then has no second level to show and lands on an
 * empty one. What a search result has to take you to is the root entry the page
 * belongs to.
 */
const flatten = (
  items: LeftNavConfigItem[],
  section?: LeftNavConfigItem
): { item: LeftNavConfigItem; section?: LeftNavConfigItem }[] =>
  items.flatMap((item) => [
    { item, ...(section === undefined ? {} : { section }) },
    ...flatten(item.items ?? [], section ?? item),
  ]);

/**
 * DataLeftNav - the whole navigation from one configuration object.
 *
 * `LeftNav` is parts; this is what you reach for when the navigation is data
 * rather than markup - which it usually is. Permissions decide what a person
 * sees, a server decides what a plan includes, and neither belongs in JSX.
 *
 * **The configuration is JSON.** Icons are names, not `ReactNode`s, so a whole
 * navigation can come from an API, sit in a database, be diffed in a pull
 * request, or be written by a model - which is the point of this library.
 * `DataDrivenSidebar`, the thing this replaces, took `ReactNode` icons and so
 * could only ever be written by hand in TypeScript.
 *
 * **Two levels, still.** An entry with `items` at the root opens the second
 * level; the same shape inside the second level folds open in place. A third
 * level is not expressible - nesting deeper is ignored rather than honoured,
 * because the alternative is a config that quietly produces a navigation
 * nobody can get back out of.
 *
 * @example
 * ```tsx
 * <DataLeftNav
 *   activeKey={page}
 *   onSelect={(key) => { setPage(key); }}
 *   config={{
 *     home: { label: 'Go to home', href: '/' },
 *     search: {},
 *     items: [
 *       { key: 'profile', label: 'Profile', icon: 'user', group: 'Personal' },
 *       {
 *         key: 'observability',
 *         label: 'Observability',
 *         icon: 'activity',
 *         group: 'Platform',
 *         items: [{ key: 'overview', label: 'Overview', icon: 'layout-grid' }],
 *       },
 *     ],
 *   }}
 * />
 * ```
 */
export function DataLeftNav({
  config,
  activeKey,
  onSelect,
  onHome,
  initialSection = null,
  footer,
  label = 'Settings',
  ...props
}: DataLeftNavProps) {
  const levels = useLeftNavLevels({ initial: initialSection });
  const [query, setQuery] = useState('');

  const section = config.items.find((item) => item.key === levels.section);
  const needle = query.trim().toLowerCase();

  // Search reaches the whole tree, not the level you happen to be on. The page
  // someone wants is usually the one they cannot see; answering "no results"
  // while it sits one press away is the failure worth avoiding.
  const matches = useMemo(() => {
    if (needle === '') return null;
    return flatten(config.items).filter(({ item }) => item.label.toLowerCase().includes(needle));
  }, [needle, config.items]);

  const choose = (item: LeftNavConfigItem, from?: LeftNavConfigItem) => {
    // A search result inside a section takes you to that section as well as to
    // itself, so pressing back afterwards lands somewhere that makes sense.
    if (from !== undefined) levels.open(from.key);
    onSelect?.(item.key, item);
    setQuery('');
  };

  const row = (item: LeftNavConfigItem, trailing?: ReturnType<typeof badgeFor>) => (
    <LeftNavItem
      key={item.key}
      {...(item.icon === undefined
        ? {}
        : { icon: <Icon name={item.icon} size="sm" aria-hidden /> })}
      {...(item.href === undefined ? {} : { href: item.href })}
      active={activeKey === item.key}
      disabled={item.disabled ?? false}
      meta={trailing ?? badgeFor(item)}
      onClick={() => {
        choose(item);
      }}
    >
      {item.label}
    </LeftNavItem>
  );

  return (
    <LeftNav label={label} {...props}>
      {config.home !== undefined && (
        <LeftNavExit
          {...(config.home.href === undefined ? {} : { href: config.home.href })}
          {...(onHome === undefined ? {} : { onClick: onHome })}
        >
          {config.home.label ?? 'Go to home'}
        </LeftNavExit>
      )}

      {config.search !== undefined && (
        <LeftNavSearch
          {...(config.search.label === undefined ? {} : { label: config.search.label })}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
      )}

      <LeftNavBody level={levels.level} direction={levels.direction} viewKey={levels.viewKey}>
        {matches !== null ? (
          <LeftNavGroup
            label={`${String(matches.length)} ${matches.length === 1 ? 'result' : 'results'}`}
          >
            {matches.map(({ item, section: within }) => (
              <LeftNavItem
                key={`${within?.key ?? 'root'}-${item.key}`}
                {...(item.icon === undefined
                  ? {}
                  : { icon: <Icon name={item.icon} size="sm" aria-hidden /> })}
                active={activeKey === item.key}
                meta={
                  within === undefined ? undefined : (
                    <span className="mdt-truncate mdt-text-xs mdt-text-muted-foreground">
                      {within.label}
                    </span>
                  )
                }
                onClick={() => {
                  choose(item, within);
                }}
              >
                {item.label}
              </LeftNavItem>
            ))}
          </LeftNavGroup>
        ) : section === undefined ? (
          byGroup(config.items).map(({ group, items }) => (
            <LeftNavGroup
              key={group ?? 'ungrouped'}
              {...(group === undefined ? {} : { label: group })}
            >
              {items.map((item) =>
                item.items === undefined ? (
                  row(item)
                ) : (
                  // An entry with pages of its own opens the second level. It
                  // does not report a selection: nothing was chosen, a list was
                  // opened, and a product told otherwise would navigate to a
                  // page that does not exist.
                  <LeftNavItem
                    key={item.key}
                    {...(item.icon === undefined
                      ? {}
                      : { icon: <Icon name={item.icon} size="sm" aria-hidden /> })}
                    hasChildren
                    disabled={item.disabled ?? false}
                    meta={badgeFor(item)}
                    onClick={() => {
                      levels.open(item.key);
                      // Land on its first page rather than on a list with
                      // nothing chosen, which asks you to pick again having
                      // just picked.
                      const first = item.items?.[0];
                      if (first) onSelect?.(first.items?.[0]?.key ?? first.key, first);
                    }}
                  >
                    {item.label}
                  </LeftNavItem>
                )
              )}
            </LeftNavGroup>
          ))
        ) : (
          <LeftNavSection title={section.label} onBack={levels.back}>
            {byGroup(section.items ?? []).map(({ group, items }) => (
              <LeftNavGroup
                key={group ?? 'ungrouped'}
                {...(group === undefined ? {} : { label: group })}
              >
                {items.map((item) =>
                  item.items === undefined ? (
                    row(item)
                  ) : (
                    <LeftNavExpandable
                      key={item.key}
                      {...(item.icon === undefined
                        ? {}
                        : { icon: <Icon name={item.icon} size="sm" aria-hidden /> })}
                      label={item.label}
                      defaultOpen={item.items.some((child) => child.key === activeKey)}
                    >
                      {/*
                        The third level, flattened. These fold open in place
                        rather than pushing a level, and their own `items` are
                        ignored - which is the config asking for a depth this
                        component does not do.
                      */}
                      {item.items.map((child) => row(child))}
                    </LeftNavExpandable>
                  )
                )}
              </LeftNavGroup>
            ))}
          </LeftNavSection>
        )}
      </LeftNavBody>

      {footer !== undefined && <LeftNavFooter>{footer}</LeftNavFooter>}
    </LeftNav>
  );
}

/** A short status on the trailing edge, if the entry asked for one. */
const badgeFor = (item: LeftNavConfigItem) =>
  item.badge === undefined ? undefined : (
    <Badge tone="neutral" size="sm" shape="pill">
      {item.badge}
    </Badge>
  );

DataLeftNav.displayName = 'DataLeftNav';
