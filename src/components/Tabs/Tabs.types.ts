import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type * as TabsPrimitive from '@radix-ui/react-tabs';

/**
 * The two types of tab (K-Tabs-01, ruled 2026-09-17).
 *
 * - `underline` — the default: every drawer band and page band. A 13/500 label
 *   over a 2px line that sits on the strip's hairline.
 * - `filled` — a switch inside a body (a view toggle, a form's mode), where a
 *   track reads better than a line: a 32 track holding 26 chips.
 *
 * A sequence is a Stepper, a view preference a ToggleGroup, "one of these" a
 * Radio strip; only sections you visit in any order are Tabs (K-Tabs-25).
 */
export type TabsType = 'underline' | 'filled';

/**
 * The older name for `TabsType`; prefer `TabsType`. The four looks this used to
 * name (default, underline, card, pills) live on in `TabsOld2`; here it is only
 * an alias so callers written against `variant` keep compiling.
 */
export type TabsVariant = TabsType;

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
   * Event handler called when the value changes. Not called for a tab that is
   * already selected: the active tab ignores a click (K-Tabs-12).
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
   * Whether a tab is selected as soon as it is focused (automatic) or only on
   * Enter or Space (manual).
   * @default 'automatic'
   */
  activationMode?: 'automatic' | 'manual';
}

/**
 * Props for the TabsList component - the strip (underline) or the track (filled).
 */
export interface TabsListProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  /**
   * Which of the two types the strip draws. Every trigger inside inherits it,
   * so it is set once here and never repeated on the tabs.
   * @default 'underline'
   */
  type?: TabsType;

  /** The older name for `type`; prefer `type`. */
  variant?: TabsType;

  /**
   * Stretches each tab to share the width equally.
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Props for the TabsTrigger component - one tab.
 *
 * `type` here is the tab's type, not the button's: the trigger is always a
 * `type="button"`, which Radix sets itself.
 */
export interface TabsTriggerProps extends Omit<
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
  'type'
> {
  /**
   * The value of the tab. Must be unique within the Tabs component.
   */
  value: string;

  /**
   * Overrides the type inherited from the `TabsList`. Normally left unset.
   */
  type?: TabsType;

  /** The older name for `type`; prefer `type` on the `TabsList`. */
  variant?: TabsType;

  /**
   * A glyph before the label, drawn at 14 with 6 before the label (K-Tabs-13).
   *
   * A prop rather than something you put in `children` so the size and the
   * spacing are decided once here, not by whoever writes the next tab bar.
   */
  icon?: ReactNode;

  /**
   * A count after the label: an 18-high pill at 11/600, muted, inverted on the
   * active tab (K-Tabs-14 - the console's CountBadge as it is). A tab may carry
   * a count and never a button.
   */
  count?: number | string;

  /**
   * Caps the count. Above it the pill reads `99+`.
   * @default 99
   */
  countMax?: number;

  /**
   * Anything else after the label - a `Badge` for a status, say. For a number
   * use `count`, which is already the right pill.
   */
  badge?: ReactNode;

  /**
   * Shows a close control on the tab (K-Tabs-21).
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
   * Whether the tab takes an equal share of the strip's width.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * A disabled tab reads neutral-40 with a not-allowed cursor (K-Tabs-05) and
   * is skipped by the arrow keys.
   */
  disabled?: boolean;
}

/**
 * Props for the add-a-tab control (K-Tabs-22).
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
