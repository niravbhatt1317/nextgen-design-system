import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { IconName } from '../Icon';

export interface LeftNavProps extends ComponentPropsWithoutRef<'nav'> {
  /**
   * The accessible name. Two navigations on one page must be told apart.
   *
   * @default 'Settings'
   */
  label?: string;
}

export interface LeftNavExitProps extends Omit<ComponentPropsWithoutRef<'a'>, 'href'> {
  /**
   * Where it goes. An anchor with one, a button without.
   *
   * The same rule `PaginationLink` follows: leaving settings is usually a real
   * address worth opening in a new tab, and sometimes it is a router call.
   */
  href?: string;

  /** What it says. Names the destination, never just "Back". @default 'Back to app' */
  children?: ReactNode;
}

export interface LeftNavSearchProps extends Omit<
  ComponentPropsWithoutRef<'input'>,
  'type' | 'size'
> {
  /** The accessible name and the placeholder. @default 'Search' */
  label?: string;
}

export interface LeftNavBodyProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Which level is showing. Published as `data-level`, and nothing else.
   *
   * The component does not animate the move. A product that wants it to can
   * hang a transition off `data-level`, where the mechanism is visible.
   */
  level?: 1 | 2;

  /**
   * Which way the last move went, from `useLeftNavLevels`.
   *
   * Drives an 8px slip in the direction of travel. Omit it and the list simply
   * appears, which is what a panel that never changes level should do.
   */
  direction?: 'forward' | 'back' | null;

  /**
   * A name for the view being shown, so React remounts on a change.
   *
   * `level` is not enough on its own: moving between two second-level sections
   * leaves it at 2, and without a remount the animation never replays.
   * `useLeftNavLevels` reports one as `viewKey`.
   */
  viewKey?: string | number;
}

export interface LeftNavSectionProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  /** The section you are inside. Answers "where am I", not "how do I leave". */
  title: ReactNode;

  /** Back to the root list. */
  onBack: () => void;

  /** The back control's accessible name. @default 'Back to all settings' */
  backLabel?: string;
}

export interface LeftNavGroupProps extends ComponentPropsWithoutRef<'div'> {
  /** The heading above the group. Omit it for an unlabelled block. */
  label?: ReactNode;
}

export interface LeftNavExpandableProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /** The glyph on the trigger row. */
  icon?: ReactNode;

  /** The setting's name. */
  label: ReactNode;

  /** Whether it starts open. @default false */
  defaultOpen?: boolean;

  /** Controlled open state. Pass `onOpenChange` with it. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface LeftNavItemProps extends Omit<ComponentPropsWithoutRef<'a'>, 'href'> {
  /** Where it goes. An anchor with one, a button without. */
  href?: string;

  /** The glyph. Always an `<Icon>`; never an inline `<svg>`. */
  icon?: ReactNode;

  /**
   * Whether this is the page being shown.
   *
   * Renders `aria-current="page"`, which is the part a screen reader hears. The
   * grey pill is the part everyone else sees, and one without the other leaves
   * somebody out.
   */
  active?: boolean;

  /**
   * Marks the item as opening a second level.
   *
   * Adds the trailing chevron, and says so to a screen reader: this one does
   * not go to a page, it opens a list. Without that they are indistinguishable
   * until you press one.
   */
  hasChildren?: boolean;

  /** A count or a status, on the trailing edge. A `Badge`, usually. */
  meta?: ReactNode;

  /** Dims it and stops it responding. */
  disabled?: boolean;
}

export interface LeftNavFooterProps extends ComponentPropsWithoutRef<'div'> {
  /** Nothing of its own - a slot pinned to the bottom edge. */
  children?: ReactNode;
}

/**
 * One entry in a `LeftNav` configuration.
 *
 * **Deliberately serialisable.** The icon is a name rather than a `ReactNode`,
 * so a whole navigation is JSON: it can come from an API, sit in a database,
 * be diffed in a pull request, or be written by a model. `DataDrivenSidebar`
 * took `ReactNode` icons, which meant its config could only ever be written in
 * TypeScript by hand.
 */
export interface LeftNavConfigItem {
  /** Stable identity. What `activeKey` and `onSelect` speak in. */
  key: string;

  /** What it says. */
  label: string;

  /** An icon by name, from the library's own set. */
  icon?: IconName;

  /** Where it goes. With one it is a link; without, a button. */
  href?: string;

  /** A short status or count on the trailing edge - "Beta", "3". */
  badge?: string;

  /** Dims it and stops it responding. */
  disabled?: boolean;

  /**
   * The heading this entry sits under. Entries sharing one are grouped, in the
   * order the headings first appear. Leave it off for an unheaded block.
   */
  group?: string;

  /**
   * Its own pages.
   *
   * At the root, an entry with these opens the second level. Inside the second
   * level, it folds open in place instead. Anything nested below that is
   * ignored - there is no third level, and a config that asks for one is
   * asking for something the component will not do.
   */
  items?: LeftNavConfigItem[];
}

export interface LeftNavConfig {
  /** The way out. Omit it and no home control is rendered. */
  home?: { label?: string; href?: string };

  /** The search field. Omit it and none is rendered. */
  search?: { label?: string };

  /** The root list. */
  items: LeftNavConfigItem[];
}

export interface DataLeftNavProps extends Omit<ComponentPropsWithoutRef<'nav'>, 'onSelect'> {
  /** The whole navigation, as data. */
  config: LeftNavConfig;

  /** Which entry is the page being shown. */
  activeKey?: string;

  /**
   * Called with the entry that was chosen.
   *
   * Only for entries that lead to a page. Opening a section and folding a group
   * are the component's own business and are not reported - a product that had
   * to handle those would be reimplementing the navigation to use it.
   */
  onSelect?: (key: string, item: LeftNavConfigItem) => void;

  /** Called when the home control is pressed. */
  onHome?: () => void;

  /** Which section to open on. */
  initialSection?: string | null;

  /** Pinned to the bottom edge. Not part of the config, because it is markup. */
  footer?: ReactNode;

  /** The panel's accessible name. @default 'Settings' */
  label?: string;
}
