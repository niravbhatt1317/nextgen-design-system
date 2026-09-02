import type { CSSProperties } from 'react';

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

export interface LeftNavNewProps {
  collections: LeftNavNewCollection[];
  /** The selected board. The collection holding it is highlighted too. */
  activeKey?: string;
  onSelect?: (key: string) => void;
  /** The pinned Settings row at the rail's bottom. */
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
