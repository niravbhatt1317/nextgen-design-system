import type { CSSProperties } from 'react';
import type { IconName } from '../Icon';

/**
 * One board (a leaf destination) inside a collection.
 */
export interface LeftNavNewBoard {
  key: string;
  label: string;
  /**
   * A board that is wired up and can be opened. One that is not keeps its
   * normal look but refuses the click — the faded not-live look was rejected
   * in the console because it broke the colour standard.
   */
  live?: boolean;
  /**
   * Not built yet: the row fades to 40% and wears the "Soon" badge at full
   * strength, and refuses the click.
   */
  soon?: boolean;
}

/**
 * A collection: a folder of boards. The folder glyph IS the open/closed
 * state — solid-open when open, outline when closed. No chevron.
 */
export interface LeftNavNewCollection {
  key: string;
  label: string;
  /** Start open. */
  defaultOpen?: boolean;
  children: LeftNavNewBoard[];
}

/** One organization the account can travel to. */
export interface LeftNavNewOrg {
  id: string;
  name: string;
  memberCount: number;
}

export type LeftNavNewTheme = 'light' | 'dark' | 'system';

/**
 * Everything the account card at the rail top needs. The card wears the
 * PLACE (current organization, or the MSP-wide view), the login email
 * beneath, and opens the destination panel to its right.
 */
export interface LeftNavNewAccount {
  email: string;
  orgs: LeftNavNewOrg[];
  /**
   * The MSP-wide user population shown on the "where you are" strip. When a
   * demo trims the org list, this keeps the strip's number honest to the
   * full roster. Defaults to the sum of `orgs`.
   */
  totalMembers?: number;
  /** Which organization the viewer is inside. `null` is the MSP-wide view. */
  currentOrgId?: string | null;
  /** Travel. `null` asks for the MSP-wide view. */
  onSwitchOrg?: (id: string | null) => void;
  /** The + in the panel's list header. */
  onAddOrg?: () => void;
  onLogout?: () => void;
  theme?: LeftNavNewTheme;
  onThemeChange?: (theme: LeftNavNewTheme) => void;
}

/**
 * Which floor the rail is showing. `workspace` is the product's home rail;
 * `settings` and `fleet` are the two floors beneath it, reached through the
 * pinned Settings row and then the Agent Fleet entry. Three floors, never
 * more: the crumb strip is the way back up.
 */
export type LeftNavNewView = 'workspace' | 'settings' | 'fleet';

/** One page on the settings or fleet floor. */
export interface LeftNavNewSettingsItem {
  key: string;
  label: string;
  /** One glyph per row; the category labels carry none. */
  icon: IconName;
  /** Not built yet: reads disabled with the neutral "soon" badge. */
  soon?: boolean;
  /**
   * An item that descends to the fleet floor instead of opening a page. Its
   * label becomes the current crumb down there.
   */
  section?: 'fleet';
}

/** A category on the settings or fleet floor: a label, then its pages. */
export interface LeftNavNewSettingsSection {
  key: string;
  label: string;
  items: LeftNavNewSettingsItem[];
}

export interface LeftNavNewProps {
  collections: LeftNavNewCollection[];
  /**
   * The settings floor, as categories of pages. Supplying it makes the pinned
   * Settings row descend into it (and selects its first page, as the product
   * does). Omit it and Settings only fires `onSettings`.
   */
  settings?: LeftNavNewSettingsSection[];
  /** The fleet floor, reached from the settings item marked `section: 'fleet'`. */
  fleet?: LeftNavNewSettingsSection[];
  /** Controlled floor. Leave it out and the rail keeps the floor itself. */
  view?: LeftNavNewView;
  /** The floor to start on when uncontrolled. @default 'workspace' */
  defaultView?: LeftNavNewView;
  /** Every floor change, including the ones the crumb strip makes. */
  onViewChange?: (view: LeftNavNewView) => void;
  /**
   * The selected board, or the selected settings/fleet page. One key space
   * across all three floors; the collection holding a board is highlighted too.
   */
  activeKey?: string;
  /** A board or a page was picked. Descending a floor picks its first page. */
  onSelect?: (key: string) => void;
  /** The pinned Settings row at the rail's bottom, whether or not `settings` is given. */
  onSettings?: () => void;
  /** Omit it and the rail renders without the account card. */
  account?: LeftNavNewAccount;
  /**
   * The 56px icon rail. The state lives with the caller because the product's
   * trigger sits in the page header band, outside the nav.
   */
  collapsed?: boolean;
  /** The accessible name. @default 'Workspace' */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * The collapse control: [panel icon] then a short divider when breadcrumbs
 * follow. It lives in the page header band, not inside the rail.
 */
export interface LeftNavNewTriggerProps {
  collapsed: boolean;
  onToggle: () => void;
  withDivider?: boolean;
}
