import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, InputHTMLAttributes, ReactNode } from 'react';
import type { sidebarVariants as SidebarVariantsCVA } from './Sidebar';

/**
 * Sidebar variants derived from CVA configuration
 */
export type SidebarVariants = VariantProps<typeof SidebarVariantsCVA>;

/**
 * Props for the Sidebar component
 */
export interface SidebarProps extends ComponentPropsWithoutRef<'div'>, SidebarVariants {
  /**
   * Content to display inside the sidebar
   */
  children: ReactNode;
}

/**
 * Props for the SidebarHeader component
 */
export interface SidebarHeaderProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Content to display inside the sidebar header
   */
  children?: ReactNode;
  /**
   * Optional icon to display in the header
   */
  icon?: ReactNode;
  /**
   * Optional popover content to show when chevron is clicked
   */
  popoverContent?: ReactNode;
  /**
   * Whether the popover is open (controlled)
   */
  open?: boolean;
  /**
   * Callback when popover open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Whether to show bottom border
   */
  showBorder?: boolean;
}

/**
 * Props for the SidebarSearch component
 */
export interface SidebarSearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Keyboard shortcut to display (e.g., "⌘K")
   */
  shortcut?: string;
  /**
   * Callback when search value changes
   */
  onSearch?: (value: string) => void;
}

/**
 * Props for the SidebarContent component
 */
export interface SidebarContentProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Content to display inside the sidebar content
   */
  children: ReactNode;
}

/**
 * Props for the SidebarSection component
 */
export interface SidebarSectionProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Content to display inside the sidebar section
   */
  children: ReactNode;
}

/**
 * Props for the SidebarLabel component
 */
export interface SidebarLabelProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Content to display inside the sidebar label
   */
  children: ReactNode;
  /**
   * Optional action icons/buttons to display on the right
   */
  action?: ReactNode;
}

/**
 * Props for the SidebarCollapse component
 */
export interface SidebarCollapseProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Title of the collapsible section
   */
  title: string;
  /**
   * Whether the section is open by default
   */
  defaultOpen?: boolean;
  /**
   * Content to display when expanded
   */
  children: ReactNode;
}

/**
 * Props for the SidebarItem component
 */
export interface SidebarItemProps extends ComponentPropsWithoutRef<'button'> {
  /**
   * Content to display inside the sidebar item
   */
  children?: ReactNode;
  /**
   * Whether the item is currently active/selected
   */
  active?: boolean;
  /**
   * Optional icon to display before the text
   */
  icon?: ReactNode;
  /**
   * Optional action icons/buttons to display on the right (shown on hover)
   */
  action?: ReactNode;
  /**
   * Whether this item is nested under a parent item
   */
  nested?: boolean;
  /**
   * Visual variant of the item
   */
  variant?: 'default' | 'more';
}

/**
 * Props for the SidebarFooter component
 */
export interface SidebarFooterProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Content to display inside the sidebar footer
   */
  children: ReactNode;
  /**
   * Optional icon to display before the text
   */
  icon?: ReactNode;
  /**
   * Whether to show top border
   */
  showBorder?: boolean;
}

/**
 * Configuration for a single sidebar item
 */
export interface SidebarItemConfig {
  /**
   * Unique identifier for the item
   */
  id: string;
  /**
   * Label text to display
   */
  label: string;
  /**
   * Optional icon to display
   */
  icon?: ReactNode;
  /**
   * Whether the item is currently active/selected
   */
  active?: boolean;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Optional action buttons (e.g., three-dot menu, add button)
   */
  actions?: {
    icon: ReactNode;
    label: string;
    onClick: () => void;
  }[];
  /**
   * Nested child items
   */
  children?: SidebarItemConfig[];
}

/**
 * Configuration for a sidebar section/group
 */
export interface SidebarSectionConfig {
  /**
   * Unique identifier for the section
   */
  id: string;
  /**
   * Section label/title
   */
  label?: string;
  /**
   * Whether the section is collapsible
   */
  collapsible?: boolean;
  /**
   * Whether the section is open by default (for collapsible sections)
   */
  defaultOpen?: boolean;
  /**
   * Items in this section
   */
  items: SidebarItemConfig[];
  /**
   * Optional action buttons for the section label
   */
  actions?: {
    icon: ReactNode;
    label: string;
    onClick: () => void;
  }[];
  /**
   * Maximum number of items to show before "More" button
   */
  maxVisibleItems?: number;
  /**
   * Custom "More" button configuration
   */
  moreButton?: {
    label?: string;
    icon?: ReactNode;
    onClick?: () => void;
  };
}

/**
 * Complete sidebar configuration
 */
export interface SidebarConfig {
  /**
   * Header configuration
   */
  header?: {
    title?: string;
    icon?: ReactNode;
    showBorder?: boolean;
    projects?: {
      id: string;
      name: string;
      icon?: ReactNode;
      onClick?: () => void;
    }[];
  };
  /**
   * Search configuration
   */
  search?: {
    placeholder?: string;
    shortcut?: string;
    onSearch?: (value: string) => void;
  };
  /**
   * Sections/groups in the sidebar
   */
  sections: SidebarSectionConfig[];
  /**
   * Footer configuration
   */
  footer?: {
    label: string;
    icon?: ReactNode;
    showBorder?: boolean;
    onClick?: () => void;
  };
}
