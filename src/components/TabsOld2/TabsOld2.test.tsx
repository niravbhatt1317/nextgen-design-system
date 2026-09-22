import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TabsOld2, TabsAddOld2, TabsListOld2, TabsTriggerOld2, TabsContentOld2 } from './TabsOld2';
import { useEditableTabsOld2 } from './useEditableTabsOld2';

describe('TabsOld2', () => {
  it('renders tabs with default value', () => {
    render(
      <TabsOld2 defaultValue="tab1">
        <TabsListOld2>
          <TabsTriggerOld2 value="tab1">Tab 1</TabsTriggerOld2>
          <TabsTriggerOld2 value="tab2">Tab 2</TabsTriggerOld2>
        </TabsListOld2>
        <TabsContentOld2 value="tab1">Content 1</TabsContentOld2>
        <TabsContentOld2 value="tab2">Content 2</TabsContentOld2>
      </TabsOld2>
    );
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('switches tabs on click', async () => {
    const user = userEvent.setup();
    render(
      <TabsOld2 defaultValue="tab1">
        <TabsListOld2>
          <TabsTriggerOld2 value="tab1">Tab 1</TabsTriggerOld2>
          <TabsTriggerOld2 value="tab2">Tab 2</TabsTriggerOld2>
        </TabsListOld2>
        <TabsContentOld2 value="tab1">Content 1</TabsContentOld2>
        <TabsContentOld2 value="tab2">Content 2</TabsContentOld2>
      </TabsOld2>
    );

    await user.click(screen.getByText('Tab 2'));

    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('renders different variants', () => {
    render(
      <TabsOld2 defaultValue="tab1">
        <TabsListOld2 variant="underline">
          <TabsTriggerOld2 value="tab1" variant="underline">
            Tab 1
          </TabsTriggerOld2>
        </TabsListOld2>
        <TabsContentOld2 value="tab1">Content</TabsContentOld2>
      </TabsOld2>
    );
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
  });

  it('renders full width tabs', () => {
    render(
      <TabsOld2 defaultValue="tab1">
        <TabsListOld2 fullWidth>
          <TabsTriggerOld2 value="tab1" fullWidth>
            Tab 1
          </TabsTriggerOld2>
        </TabsListOld2>
        <TabsContentOld2 value="tab1">Content</TabsContentOld2>
      </TabsOld2>
    );
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
  });

  it('handles disabled tabs', () => {
    render(
      <TabsOld2 defaultValue="tab1">
        <TabsListOld2>
          <TabsTriggerOld2 value="tab1">Tab 1</TabsTriggerOld2>
          <TabsTriggerOld2 value="tab2" disabled>
            Tab 2
          </TabsTriggerOld2>
        </TabsListOld2>
        <TabsContentOld2 value="tab1">Content 1</TabsContentOld2>
      </TabsOld2>
    );
    expect(screen.getByText('Tab 2')).toBeDisabled();
  });
});

describe('TabsTriggerOld2 — icon and badge', () => {
  const shell = (trigger: React.ReactNode) => (
    <TabsOld2 defaultValue="a">
      <TabsListOld2>{trigger}</TabsListOld2>
      <TabsContentOld2 value="a">Content</TabsContentOld2>
    </TabsOld2>
  );

  it('renders an icon before the label', () => {
    render(
      shell(
        <TabsTriggerOld2 value="a" icon={<span data-testid="glyph">*</span>}>
          Inbox
        </TabsTriggerOld2>
      )
    );
    expect(screen.getByTestId('glyph')).toBeInTheDocument();
    expect(screen.getByRole('tab')).toHaveTextContent('Inbox');
  });

  it('renders a badge after the label', () => {
    render(
      shell(
        <TabsTriggerOld2 value="a" badge={<span data-testid="count">9</span>}>
          Inbox
        </TabsTriggerOld2>
      )
    );
    expect(screen.getByTestId('count')).toBeInTheDocument();
  });

  it('carries an icon, a label and a badge at once', () => {
    render(
      shell(
        <TabsTriggerOld2
          value="a"
          icon={<span data-testid="glyph">*</span>}
          badge={<span data-testid="count">3</span>}
        >
          Flagged
        </TabsTriggerOld2>
      )
    );
    const tab = screen.getByRole('tab');
    expect(screen.getByTestId('glyph')).toBeInTheDocument();
    expect(tab).toHaveTextContent('Flagged');
    expect(screen.getByTestId('count')).toBeInTheDocument();
  });

  it('puts them in reading order — icon, label, badge', () => {
    render(
      shell(
        <TabsTriggerOld2 value="a" icon={<span data-testid="glyph">*</span>} badge={<span>3</span>}>
          Flagged
        </TabsTriggerOld2>
      )
    );
    const tab = screen.getByRole('tab');
    const icon = screen.getByTestId('tab-icon');
    const badge = screen.getByTestId('tab-badge');
    expect(tab.firstElementChild).toBe(icon);
    expect(tab.lastElementChild).toBe(badge);
  });

  it('adds spacing only when there is something to space', () => {
    const { rerender } = render(shell(<TabsTriggerOld2 value="a">Plain</TabsTriggerOld2>));
    expect(screen.getByRole('tab')).not.toHaveClass('mdt-gap-2');

    rerender(
      shell(
        <TabsTriggerOld2 value="a" icon={<span>*</span>}>
          With icon
        </TabsTriggerOld2>
      )
    );
    expect(screen.getByRole('tab')).toHaveClass('mdt-gap-2');
  });

  it('hides the icon from screen readers, since the label already says it', () => {
    render(
      shell(
        <TabsTriggerOld2 value="a" icon={<span>*</span>}>
          Inbox
        </TabsTriggerOld2>
      )
    );
    expect(screen.getByTestId('tab-icon')).toHaveAttribute('aria-hidden', 'true');
  });

  it('still renders a plain tab with neither', () => {
    render(shell(<TabsTriggerOld2 value="a">Plain</TabsTriggerOld2>));
    expect(screen.queryByTestId('tab-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('tab-badge')).not.toBeInTheDocument();
    expect(screen.getByRole('tab')).toHaveTextContent('Plain');
  });

  it.each(['default', 'underline', 'card', 'pills'] as const)(
    'carries both in the %s look',
    (variant) => {
      render(
        shell(
          <TabsTriggerOld2
            value="a"
            variant={variant}
            icon={<span>*</span>}
            badge={<span data-testid="count">2</span>}
          >
            Inbox
          </TabsTriggerOld2>
        )
      );
      expect(screen.getByTestId('tab-icon')).toBeInTheDocument();
      expect(screen.getByTestId('count')).toBeInTheDocument();
    }
  );
});

describe('useEditableTabsOld2 — the rules', () => {
  const setup = (options?: Parameters<typeof useEditableTabsOld2>[0]) =>
    renderHook(() => useEditableTabsOld2(options));

  it('starts with one tab selected', () => {
    const { result } = setup({ initialTabs: [{ id: 'a', label: 'A' }] });
    expect(result.current.tabs).toHaveLength(1);
    expect(result.current.active).toBe('a');
  });

  it('adds a tab at the end and selects it', () => {
    const { result } = setup({
      initialTabs: [
        { id: 'a', label: 'A' },
        { id: 'b', label: 'B' },
      ],
    });
    act(() => {
      result.current.add();
    });
    expect(result.current.tabs).toHaveLength(3);
    expect(result.current.active).toBe(result.current.tabs[2]?.id);
  });

  it('leaves the selection alone when closing a tab you are not on', () => {
    const { result } = setup({
      initialTabs: [
        { id: 'a', label: 'A' },
        { id: 'b', label: 'B' },
        { id: 'c', label: 'C' },
      ],
      initialActive: 'a',
    });
    act(() => {
      result.current.close('c');
    });
    expect(result.current.active).toBe('a');
    expect(result.current.tabs).toHaveLength(2);
  });

  it('moves to the right-hand neighbour when you close the tab you are on', () => {
    const { result } = setup({
      initialTabs: [
        { id: 'a', label: 'A' },
        { id: 'b', label: 'B' },
        { id: 'c', label: 'C' },
      ],
      initialActive: 'b',
    });
    act(() => {
      result.current.close('b');
    });
    expect(result.current.active).toBe('c');
  });

  it('falls back to the left when the closed tab was the last one', () => {
    const { result } = setup({
      initialTabs: [
        { id: 'a', label: 'A' },
        { id: 'b', label: 'B' },
        { id: 'c', label: 'C' },
      ],
      initialActive: 'c',
    });
    act(() => {
      result.current.close('c');
    });
    expect(result.current.active).toBe('b');
  });

  it('refuses to close the last tab', () => {
    const { result } = setup({ initialTabs: [{ id: 'a', label: 'A' }] });
    act(() => {
      result.current.close('a');
    });
    expect(result.current.tabs).toHaveLength(1);
    expect(result.current.canClose('a')).toBe(false);
  });

  it('closes the last tab when told it may', () => {
    const { result } = setup({ initialTabs: [{ id: 'a', label: 'A' }], allowEmpty: true });
    act(() => {
      result.current.close('a');
    });
    expect(result.current.tabs).toHaveLength(0);
  });

  it('ignores a tab that is not there', () => {
    const { result } = setup({
      initialTabs: [
        { id: 'a', label: 'A' },
        { id: 'b', label: 'B' },
      ],
    });
    act(() => {
      result.current.close('nope');
    });
    expect(result.current.tabs).toHaveLength(2);
  });

  it('renames in place without moving anything', () => {
    const { result } = setup({
      initialTabs: [
        { id: 'a', label: 'A' },
        { id: 'b', label: 'B' },
      ],
    });
    act(() => {
      result.current.rename('a', 'Renamed');
    });
    expect(result.current.tabs[0]?.label).toBe('Renamed');
    expect(result.current.tabs).toHaveLength(2);
  });

  it('numbers new tabs by how many there will be', () => {
    const { result } = setup({ initialTabs: [{ id: 'a', label: 'A' }] });
    act(() => {
      result.current.add();
    });
    expect(result.current.tabs[1]?.label).toBe('Tab 2');
  });
});

describe('TabsTriggerOld2 — closing', () => {
  it('shows a close control when closable', () => {
    render(
      <TabsOld2 defaultValue="a">
        <TabsListOld2>
          <TabsTriggerOld2 value="a" closable onClose={vi.fn()}>
            One
          </TabsTriggerOld2>
        </TabsListOld2>
        <TabsContentOld2 value="a">Content</TabsContentOld2>
      </TabsOld2>
    );
    expect(screen.getByTestId('tab-close')).toBeInTheDocument();
  });

  it('names the close control after the tab', () => {
    render(
      <TabsOld2 defaultValue="a">
        <TabsListOld2>
          <TabsTriggerOld2 value="a" closable onClose={vi.fn()}>
            Overview
          </TabsTriggerOld2>
        </TabsListOld2>
        <TabsContentOld2 value="a">Content</TabsContentOld2>
      </TabsOld2>
    );
    expect(screen.getByRole('button', { name: 'Close Overview' })).toBeInTheDocument();
  });

  it('calls onClose without selecting the tab', async () => {
    const onClose = vi.fn();
    render(
      <TabsOld2 defaultValue="a">
        <TabsListOld2>
          <TabsTriggerOld2 value="a">One</TabsTriggerOld2>
          <TabsTriggerOld2 value="b" closable onClose={onClose}>
            Two
          </TabsTriggerOld2>
        </TabsListOld2>
        <TabsContentOld2 value="a">First</TabsContentOld2>
        <TabsContentOld2 value="b">Second</TabsContentOld2>
      </TabsOld2>
    );
    await userEvent.click(screen.getByTestId('tab-close'));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByText('First')).toBeVisible();
  });

  it('keeps the close reachable by keyboard, not nested in the tab button', () => {
    render(
      <TabsOld2 defaultValue="a">
        <TabsListOld2>
          <TabsTriggerOld2 value="a" closable onClose={vi.fn()}>
            One
          </TabsTriggerOld2>
        </TabsListOld2>
        <TabsContentOld2 value="a">Content</TabsContentOld2>
      </TabsOld2>
    );
    const close = screen.getByTestId('tab-close');
    expect(close.closest('[role="tab"]')).toBeNull();
  });

  it('shows no close control by default', () => {
    render(
      <TabsOld2 defaultValue="a">
        <TabsListOld2>
          <TabsTriggerOld2 value="a">One</TabsTriggerOld2>
        </TabsListOld2>
        <TabsContentOld2 value="a">Content</TabsContentOld2>
      </TabsOld2>
    );
    expect(screen.queryByTestId('tab-close')).not.toBeInTheDocument();
  });
});

describe('TabsAddOld2', () => {
  it('makes a new tab when pressed', async () => {
    const onClick = vi.fn();
    render(
      <TabsOld2 defaultValue="a">
        <TabsListOld2>
          <TabsTriggerOld2 value="a">One</TabsTriggerOld2>
          <TabsAddOld2 onClick={onClick} />
        </TabsListOld2>
        <TabsContentOld2 value="a">Content</TabsContentOld2>
      </TabsOld2>
    );
    await userEvent.click(screen.getByTestId('tab-add'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is named for screen readers, since it is only a plus', () => {
    render(
      <TabsOld2 defaultValue="a">
        <TabsListOld2>
          <TabsTriggerOld2 value="a">One</TabsTriggerOld2>
          <TabsAddOld2 />
        </TabsListOld2>
        <TabsContentOld2 value="a">Content</TabsContentOld2>
      </TabsOld2>
    );
    expect(screen.getByRole('button', { name: 'New tab' })).toBeInTheDocument();
  });

  it('is not a tab, so arrow keys skip it', () => {
    render(
      <TabsOld2 defaultValue="a">
        <TabsListOld2>
          <TabsTriggerOld2 value="a">One</TabsTriggerOld2>
          <TabsAddOld2 />
        </TabsListOld2>
        <TabsContentOld2 value="a">Content</TabsContentOld2>
      </TabsOld2>
    );
    expect(screen.getAllByRole('tab')).toHaveLength(1);
  });
});

describe('TabsTriggerOld2 — the close only shows when it should', () => {
  const one = () =>
    render(
      <TabsOld2 defaultValue="a">
        <TabsListOld2>
          <TabsTriggerOld2 value="a" closable onClose={vi.fn()}>
            One
          </TabsTriggerOld2>
        </TabsListOld2>
        <TabsContentOld2 value="a">Content</TabsContentOld2>
      </TabsOld2>
    );

  it('starts hidden, and unclickable while hidden', () => {
    // An invisible-but-clickable cross sits over the right edge of every tab,
    // so aiming at the tab would close it instead of opening it.
    one();
    const close = screen.getByTestId('tab-close');
    expect(close).toHaveClass('mdt-opacity-0', 'mdt-pointer-events-none');
  });

  it('shows on hover', () => {
    one();
    expect(screen.getByTestId('tab-close')).toHaveClass(
      'group-hover:mdt-opacity-100',
      'group-hover:mdt-pointer-events-auto'
    );
  });

  it('shows on the selected tab', () => {
    one();
    expect(screen.getByTestId('tab-close')).toHaveClass('[[data-state=active]+&]:mdt-opacity-100');
  });

  it('shows when tabbed to, since keyboard users never hover', () => {
    one();
    expect(screen.getByTestId('tab-close')).toHaveClass('focus-visible:mdt-opacity-100');
  });

  it('reserves the room whether or not the cross is showing', () => {
    // Otherwise the tab changes width the moment you point at it.
    one();
    expect(screen.getByRole('tab')).toHaveClass('mdt-pr-9');
  });
});
