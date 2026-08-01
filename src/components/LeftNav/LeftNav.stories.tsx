import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import {
  LeftNav,
  LeftNavBody,
  LeftNavExit,
  LeftNavFooter,
  LeftNavGroup,
  LeftNavItem,
  LeftNavSearch,
  LeftNavSection,
} from './LeftNav';
import { useLeftNavLevels } from './useLeftNavLevels';

const meta: Meta<typeof LeftNav> = {
  title: 'Components/LeftNav',
  component: LeftNav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof meta>;

interface Page {
  key: string;
  label: string;
  icon: IconName;
  group?: string;
  disabled?: boolean;
}

interface Entry {
  key: string;
  label: string;
  icon: IconName;
  meta?: string;
  pages?: Page[];
}

/** The root list. Anything with `pages` opens a second level instead of a page. */
const SETTINGS: Entry[] = [
  { key: 'general', label: 'General', icon: 'settings' },
  { key: 'members', label: 'Members', icon: 'users' },
  { key: 'notifications', label: 'Notifications', icon: 'bell' },
  {
    key: 'observability',
    label: 'Observability',
    icon: 'activity',
    pages: [
      { key: 'overview', label: 'Overview', icon: 'layout-grid' },
      { key: 'query', label: 'Query', icon: 'line-chart' },
      { key: 'notebooks', label: 'Notebooks', icon: 'book-open' },
      { key: 'alerts', label: 'Alerts', icon: 'alert-triangle' },
      { key: 'functions', label: 'Functions', icon: 'function-square', group: 'Compute' },
      { key: 'agent-runs', label: 'Agent runs', icon: 'workflow', group: 'Compute' },
      { key: 'sandboxes', label: 'Sandboxes', icon: 'terminal', group: 'Compute' },
      { key: 'edge', label: 'Edge requests', icon: 'globe', group: 'CDN' },
      { key: 'isr', label: 'ISR', icon: 'file-stack', group: 'CDN' },
      { key: 'images', label: 'Image optimisation', icon: 'image', group: 'CDN' },
      { key: 'origins', label: 'External origins', icon: 'shuffle', group: 'CDN', disabled: true },
    ],
  },
  { key: 'security', label: 'Security', icon: 'shield' },
  { key: 'domains', label: 'Domains', icon: 'globe' },
  {
    key: 'integrations',
    label: 'Integrations',
    icon: 'puzzle',
    meta: 'Beta',
    pages: [
      { key: 'installed', label: 'Installed', icon: 'package' },
      { key: 'marketplace', label: 'Marketplace', icon: 'store' },
      { key: 'webhooks', label: 'Webhooks', icon: 'webhook', group: 'Developer' },
      { key: 'api-keys', label: 'API keys', icon: 'key', group: 'Developer' },
      { key: 'oauth', label: 'OAuth apps', icon: 'lock', group: 'Developer' },
    ],
  },
  { key: 'billing', label: 'Billing', icon: 'credit-card' },
];

/** The groups a section's pages fall into, in the order they first appear. */
const groupsOf = (pages: Page[]) => {
  const order: (string | undefined)[] = [];
  for (const page of pages) if (!order.includes(page.group)) order.push(page.group);
  return order.map((group) => ({ group, pages: pages.filter((page) => page.group === group) }));
};

/**
 * The settings navigation, as a premium product builds it.
 *
 * **Two levels and never three.** The root lists everything. Press
 * *Observability* or *Integrations* - the ones with a trailing chevron - and
 * the panel moves to that section. Anything that would have been a third level
 * is flattened here into groups, because depth is where people get lost: three
 * down, "back" has to be pressed an unknown number of times and nobody knows
 * where they are.
 *
 * **Leaving and going up never compete.** This is the problem the component was
 * built around. A settings area that has replaced the app's navigation needs a
 * way out, and the second level needs a way up, and two back arrows in one
 * panel is a coin toss. They are separated on every axis at once:
 *
 * | | Back to app | Observability |
 * | --- | --- | --- |
 * | Where | above the search, never moves | below it, with the content it belongs to |
 * | Glyph | a long arrow | a chevron |
 * | Says | the destination | where you are |
 * | Weight | small, muted, chrome | a heading |
 *
 * Read them together: the top one is a way out of the building, the second is
 * the name of the room you are standing in.
 *
 * **The search stays put.** Forty rows is exactly where scrolling back to the
 * top to find the search field starts to hurt, so it never leaves.
 */
export const Settings: Story = {
  render: function SettingsNav() {
    const levels = useLeftNavLevels();
    const [current, setCurrent] = useState('general');
    const [query, setQuery] = useState('');

    const section = SETTINGS.find((entry) => entry.key === levels.section);
    const needle = query.trim().toLowerCase();

    // Search reaches into the second level too. A settings menu people search
    // is one where the thing they want is three sections away - matching only
    // what is on screen would answer "not found" while it sits one press away.
    const matches = useMemo(() => {
      if (needle === '') return null;
      return SETTINGS.flatMap((entry) => {
        const own = entry.label.toLowerCase().includes(needle) ? [{ entry, page: undefined }] : [];
        const pages = (entry.pages ?? [])
          .filter((page) => page.label.toLowerCase().includes(needle))
          .map((page) => ({ entry, page }));
        return [...own, ...pages];
      });
    }, [needle]);

    return (
      <div className="mdt-flex mdt-h-screen mdt-bg-muted/30">
        <LeftNav>
          <LeftNavExit onClick={() => undefined}>Back to app</LeftNavExit>
          <LeftNavSearch
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />

          <LeftNavBody level={levels.level}>
            {matches !== null ? (
              <LeftNavGroup
                label={`${String(matches.length)} ${matches.length === 1 ? 'result' : 'results'}`}
              >
                {matches.map(({ entry, page }) => (
                  <LeftNavItem
                    key={`${entry.key}-${page?.key ?? 'self'}`}
                    icon={<Icon name={page?.icon ?? entry.icon} size="sm" aria-hidden />}
                    active={current === (page?.key ?? entry.key)}
                    meta={
                      page ? (
                        <span className="mdt-truncate mdt-text-xs mdt-text-muted-foreground">
                          {entry.label}
                        </span>
                      ) : undefined
                    }
                    onClick={() => {
                      if (page) levels.open(entry.key);
                      setCurrent(page?.key ?? entry.key);
                      setQuery('');
                    }}
                  >
                    {page?.label ?? entry.label}
                  </LeftNavItem>
                ))}
              </LeftNavGroup>
            ) : section === undefined ? (
              SETTINGS.map((entry) => (
                <LeftNavItem
                  key={entry.key}
                  icon={<Icon name={entry.icon} size="sm" aria-hidden />}
                  active={current === entry.key}
                  hasChildren={entry.pages !== undefined}
                  meta={
                    entry.meta === undefined ? undefined : (
                      <Badge tone="info" size="sm" shape="pill">
                        {entry.meta}
                      </Badge>
                    )
                  }
                  onClick={() => {
                    if (entry.pages) levels.open(entry.key);
                    else setCurrent(entry.key);
                  }}
                >
                  {entry.label}
                </LeftNavItem>
              ))
            ) : (
              <LeftNavSection title={section.label} onBack={levels.back}>
                {groupsOf(section.pages ?? []).map(({ group, pages }) => (
                  <LeftNavGroup
                    key={group ?? 'ungrouped'}
                    {...(group === undefined ? {} : { label: group, collapsible: true })}
                  >
                    {pages.map((page) => (
                      <LeftNavItem
                        key={page.key}
                        icon={<Icon name={page.icon} size="sm" aria-hidden />}
                        active={current === page.key}
                        disabled={page.disabled ?? false}
                        onClick={() => {
                          setCurrent(page.key);
                        }}
                      >
                        {page.label}
                      </LeftNavItem>
                    ))}
                  </LeftNavGroup>
                ))}
              </LeftNavSection>
            )}
          </LeftNavBody>

          <LeftNavFooter>
            <div className="mdt-flex mdt-items-center mdt-gap-2">
              <Avatar size="sm" name="Nirav Bhatt" />
              <span className="mdt-flex-1 mdt-truncate mdt-text-sm">Nirav Bhatt</span>
              <Icon name="more-horizontal" size="sm" className="mdt-text-muted-foreground" />
            </div>
          </LeftNavFooter>
        </LeftNav>

        <div className="mdt-flex-1 mdt-p-8">
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Showing <span className="mdt-font-medium mdt-text-foreground">{current}</span> — level{' '}
            {levels.level}
          </p>
        </div>
      </div>
    );
  },
};

/**
 * The two controls, side by side, with nothing else on the panel.
 *
 * The whole design problem in one screen. They are never confusable because
 * they are not the same kind of thing: one is chrome that never moves and names
 * where it goes, the other is a heading that names where you are and belongs to
 * the rows beneath it.
 */
export const LeavingVersusGoingUp: Story = {
  render: function BothControls() {
    return (
      <div className="mdt-flex mdt-h-screen">
        <LeftNav>
          <LeftNavExit onClick={() => undefined}>Back to app</LeftNavExit>
          <LeftNavSearch />
          <LeftNavBody level={2}>
            <LeftNavSection title="Observability" onBack={() => undefined}>
              <LeftNavItem icon={<Icon name="layout-grid" size="sm" aria-hidden />} active>
                Overview
              </LeftNavItem>
              <LeftNavItem icon={<Icon name="line-chart" size="sm" aria-hidden />}>
                Query
              </LeftNavItem>
              <LeftNavItem icon={<Icon name="book-open" size="sm" aria-hidden />}>
                Notebooks
              </LeftNavItem>
            </LeftNavSection>
          </LeftNavBody>
        </LeftNav>
        <div className="mdt-flex-1 mdt-p-8 mdt-text-sm mdt-text-muted-foreground">
          Above the search: a long arrow, muted, naming its destination — a way out.
          <br />
          Below it: a chevron and a heading, naming where you are — a way up.
        </div>
      </div>
    );
  },
};

/**
 * Groups: a plain heading, or one that folds.
 *
 * A control that hides four rows costs a click and saves nothing, so a static
 * heading is the default. `collapsible` is for a group long enough that
 * scrolling past it is the problem — and once a group can close, its children
 * carry a guide line, because you need to see where it ends.
 */
export const Groups: Story = {
  render: () => (
    <div className="mdt-flex mdt-h-screen">
      <LeftNav>
        <LeftNavBody>
          <LeftNavGroup label="Personal">
            <LeftNavItem icon={<Icon name="user" size="sm" aria-hidden />} active>
              Profile
            </LeftNavItem>
            <LeftNavItem icon={<Icon name="bell" size="sm" aria-hidden />}>
              Notifications
            </LeftNavItem>
          </LeftNavGroup>

          <LeftNavGroup label="Workspace" collapsible>
            <LeftNavItem icon={<Icon name="users" size="sm" aria-hidden />}>Members</LeftNavItem>
            <LeftNavItem icon={<Icon name="shield" size="sm" aria-hidden />}>Security</LeftNavItem>
            <LeftNavItem icon={<Icon name="credit-card" size="sm" aria-hidden />}>
              Billing
            </LeftNavItem>
          </LeftNavGroup>

          <LeftNavGroup label="Archived" collapsible defaultOpen={false}>
            <LeftNavItem icon={<Icon name="archive" size="sm" aria-hidden />}>
              Old project
            </LeftNavItem>
          </LeftNavGroup>
        </LeftNavBody>
      </LeftNav>
      <div className="mdt-flex-1" />
    </div>
  ),
};
