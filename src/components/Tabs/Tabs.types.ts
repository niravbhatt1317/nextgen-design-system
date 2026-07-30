import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type * as TabsPrimitive from '@radix-ui/react-tabs';

/**
 * Variant type for tabs styling
 */
export type TabsVariant = 'default' | 'underline' | 'card' | 'pills';

/**
 * Props for the Tabs root component
 */
export interface TabsProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  /**
   * The value of the tab that should be active when initially rendered.
   * Use when you do not need to control the state of the tabs.
   */
  defaultValue?: string;

  /**
   * The controlled value of the tab that should be active.
   * Must be used in conjunction with onValueChange.
   */
  value?: string;

  /**
   * Event handler called when the value changes.
   */
  onValueChange?: (value: string) => void;

  /**
   * The orientation of the tabs.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * The direction of navigation between tabs.
   * @default 'ltr'
   */
  dir?: 'ltr' | 'rtl';

  /**
   * When true, keyboard navigation will loop from last tab to first, and vice versa.
   * @default true
   */
  activationMode?: 'automatic' | 'manual';
}

/**
 * Props for the TabsList component
 */
export interface TabsListProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: TabsVariant;

  /**
   * Whether the tabs should take full width of container
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Props for the TabsTrigger component
 */
export interface TabsTriggerProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  /**
   * The value of the tab. Must be unique within the Tabs component.
   */
  value: string;

  /**
   * A glyph before the label.
   *
   * A prop rather than something you put in `children` so the spacing is the
   * same on every tab in the product. Hand-placing it meant each caller picked
   * their own margin, and they did not agree.
   */
  icon?: ReactNode;

  /**
   * A count or status after the label - usually a `Badge`.
   *
   * Pairs with `icon`: a tab can carry a glyph, a label and a count all at
   * once, which is the shape most navigation actually needs.
   */
  badge?: ReactNode;

  /**
   * Shows a close control on the tab.
   *
   * For tab bars the person builds themselves - a set of open documents, a
   * saved view per tab - rather than fixed navigation. Fixed sections should
   * not be closable; there is nothing to put back.
   *
   * @default false
   */
  closable?: boolean;

  /** Called when the close control is used. */
  onClose?: () => void;

  /**
   * What a screen reader says for the close control. Falls back to
   * "Close <label>" when the tab's label is plain text.
   */
  closeLabel?: string;

  /**
   * Visual style variant (should match TabsList variant)
   * @default 'default'
   */
  variant?: TabsVariant;

  /**
   * Whether the tab trigger should take full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Whether the tab is disabled
   */
  disabled?: boolean;
}

/**
 * Props for the add-a-tab control.
 */
export interface TabsAddProps extends ComponentPropsWithoutRef<'button'> {
  /**
   * What a screen reader says. There is no visible text - it is a plus.
   * @default 'New tab'
   */
  label?: string;
}

/**
 * Props for the TabsContent component
 */
export interface TabsContentProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  /**
   * The value of the tab that this content belongs to.
   */
  value: string;
}
