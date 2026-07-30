import { useCallback, useState } from 'react';

/**
 * One tab in an editable set.
 */
export interface EditableTab {
  /** Stable and unique. Not the label - a renamed tab is still the same tab. */
  id: string;
  label: string;
}

export interface UseEditableTabsOptions {
  /** What the set starts as. */
  initialTabs?: EditableTab[];

  /** Which one is selected to begin with. Defaults to the first. */
  initialActive?: string;

  /**
   * What a new tab is called. Given the number of tabs that will exist after
   * it is added, so you can number them.
   * @default (n) => `Tab ${n}`
   */
  newTabLabel?: (index: number) => string;

  /**
   * Whether the last remaining tab can be closed.
   *
   * Off by default. An empty tab bar has nothing to select and no way back -
   * Notion and ClickUp both stop you at one for the same reason.
   * @default false
   */
  allowEmpty?: boolean;
}

export interface UseEditableTabs {
  tabs: EditableTab[];
  active: string;
  setActive: (id: string) => void;
  /** Adds a tab at the end and selects it. Returns its id. */
  add: () => string;
  /** Closes a tab, moving the selection if that tab was the one selected. */
  close: (id: string) => void;
  /** Renames a tab in place. */
  rename: (id: string, label: string) => void;
  /** Whether this tab can be closed - false for the last one, unless allowed. */
  canClose: (id: string) => boolean;
}

let sequence = 0;
const nextId = (): string => {
  sequence += 1;
  return `tab-${sequence.toString()}`;
};

/**
 * The rules for a tab bar the person builds themselves.
 *
 * Adding and closing tabs sounds like two lines until you close the one you are
 * looking at - and then every product has to decide where you land. This holds
 * the answer once so every tab bar in the product behaves the same way:
 *
 * - **Closing an inactive tab changes nothing else.** You keep looking at what
 *   you were looking at.
 * - **Closing the active tab selects its right-hand neighbour**, or its left one
 *   if it was last. Notion and ClickUp both do this, and it is the only choice
 *   that does not throw you to an unrelated tab.
 * - **The last tab cannot be closed** unless you say otherwise. An empty tab bar
 *   has nothing to select and no way back.
 * - **A new tab is selected immediately**, because you made it in order to use
 *   it.
 */
export const useEditableTabs = ({
  initialTabs = [{ id: nextId(), label: 'Tab 1' }],
  initialActive,
  newTabLabel = (index) => `Tab ${index.toString()}`,
  allowEmpty = false,
}: UseEditableTabsOptions = {}): UseEditableTabs => {
  const [tabs, setTabs] = useState<EditableTab[]>(initialTabs);
  const [active, setActive] = useState<string>(initialActive ?? initialTabs[0]?.id ?? '');

  const add = useCallback((): string => {
    const id = nextId();
    setTabs((current) => [...current, { id, label: newTabLabel(current.length + 1) }]);
    setActive(id);
    return id;
  }, [newTabLabel]);

  const close = useCallback(
    (id: string): void => {
      setTabs((current) => {
        if (!allowEmpty && current.length <= 1) return current;

        const index = current.findIndex((tab) => tab.id === id);
        if (index === -1) return current;

        const remaining = current.filter((tab) => tab.id !== id);

        // Only move the selection if the tab being closed was the selected one.
        setActive((selected) => {
          if (selected !== id) return selected;
          // The right-hand neighbour takes its place; if it was last, the one
          // to its left does.
          const heir = remaining.at(index) ?? remaining.at(-1);
          return heir?.id ?? '';
        });

        return remaining;
      });
    },
    [allowEmpty]
  );

  const rename = useCallback((id: string, label: string): void => {
    setTabs((current) => current.map((tab) => (tab.id === id ? { ...tab, label } : tab)));
  }, []);

  const canClose = useCallback(
    (id: string): boolean => allowEmpty || tabs.length > 1 || tabs[0]?.id !== id,
    [allowEmpty, tabs]
  );

  return { tabs, active, setActive, add, close, rename, canClose };
};
