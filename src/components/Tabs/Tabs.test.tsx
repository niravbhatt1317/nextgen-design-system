import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Tabs, TabsAdd, TabsList, TabsTrigger, TabsContent } from './Tabs';
import { useEditableTabs } from './useEditableTabs';

describe('Tabs', () => {
  it('renders tabs with default value', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('switches tabs on click', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    await user.click(screen.getByText('Tab 2'));

    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('renders different variants', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList variant="underline">
          <TabsTrigger value="tab1" variant="underline">
            Tab 1
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content</TabsContent>
      </Tabs>
    );
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
  });

  it('renders full width tabs', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList fullWidth>
          <TabsTrigger value="tab1" fullWidth>
            Tab 1
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content</TabsContent>
      </Tabs>
    );
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
  });

  it('handles disabled tabs', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" disabled>
            Tab 2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>
    );
    expect(screen.getByText('Tab 2')).toBeDisabled();
  });
});

describe('TabsTrigger — icon and badge', () => {
  const shell = (trigger: React.ReactNode) => (
    <Tabs defaultValue="a">
      <TabsList>{trigger}</TabsList>
      <TabsContent value="a">Content</TabsContent>
    </Tabs>
  );

  it('renders an icon before the label', () => {
    render(
      shell(
        <TabsTrigger value="a" icon={<span data-testid="glyph">*</span>}>
          Inbox
        </TabsTrigger>
      )
    );
    expect(screen.getByTestId('glyph')).toBeInTheDocument();
    expect(screen.getByRole('tab')).toHaveTextContent('Inbox');
  });

  it('renders a badge after the label', () => {
    render(
      shell(
        <TabsTrigger value="a" badge={<span data-testid="count">9</span>}>
          Inbox
        </TabsTrigger>
      )
    );
    expect(screen.getByTestId('count')).toBeInTheDocument();
  });

  it('carries an icon, a label and a badge at once', () => {
    render(
      shell(
        <TabsTrigger
          value="a"
          icon={<span data-testid="glyph">*</span>}
          badge={<span data-testid="count">3</span>}
        >
          Flagged
        </TabsTrigger>
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
        <TabsTrigger value="a" icon={<span data-testid="glyph">*</span>} badge={<span>3</span>}>
          Flagged
        </TabsTrigger>
      )
    );
    const tab = screen.getByRole('tab');
    const icon = screen.getByTestId('tab-icon');
    const badge = screen.getByTestId('tab-badge');
    expect(tab.firstElementChild).toBe(icon);
    expect(tab.lastElementChild).toBe(badge);
  });

  it('adds spacing only when there is something to space', () => {
    const { rerender } = render(shell(<TabsTrigger value="a">Plain</TabsTrigger>));
    expect(screen.getByRole('tab')).not.toHaveClass('mdt-gap-2');

    rerender(
      shell(
        <TabsTrigger value="a" icon={<span>*</span>}>
          With icon
        </TabsTrigger>
      )
    );
    expect(screen.getByRole('tab')).toHaveClass('mdt-gap-2');
  });

  it('hides the icon from screen readers, since the label already says it', () => {
    render(
      shell(
        <TabsTrigger value="a" icon={<span>*</span>}>
          Inbox
        </TabsTrigger>
      )
    );
    expect(screen.getByTestId('tab-icon')).toHaveAttribute('aria-hidden', 'true');
  });

  it('still renders a plain tab with neither', () => {
    render(shell(<TabsTrigger value="a">Plain</TabsTrigger>));
    expect(screen.queryByTestId('tab-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('tab-badge')).not.toBeInTheDocument();
    expect(screen.getByRole('tab')).toHaveTextContent('Plain');
  });

  it.each(['default', 'underline', 'card', 'pills'] as const)(
    'carries both in the %s look',
    (variant) => {
      render(
        shell(
          <TabsTrigger
            value="a"
            variant={variant}
            icon={<span>*</span>}
            badge={<span data-testid="count">2</span>}
          >
            Inbox
          </TabsTrigger>
        )
      );
      expect(screen.getByTestId('tab-icon')).toBeInTheDocument();
      expect(screen.getByTestId('count')).toBeInTheDocument();
    }
  );
});

describe('useEditableTabs — the rules', () => {
  const setup = (options?: Parameters<typeof useEditableTabs>[0]) =>
    renderHook(() => useEditableTabs(options));

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

describe('TabsTrigger — closing', () => {
  it('shows a close control when closable', () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a" closable onClose={vi.fn()}>
            One
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content</TabsContent>
      </Tabs>
    );
    expect(screen.getByTestId('tab-close')).toBeInTheDocument();
  });

  it('names the close control after the tab', () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a" closable onClose={vi.fn()}>
            Overview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content</TabsContent>
      </Tabs>
    );
    expect(screen.getByRole('button', { name: 'Close Overview' })).toBeInTheDocument();
  });

  it('calls onClose without selecting the tab', async () => {
    const onClose = vi.fn();
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">One</TabsTrigger>
          <TabsTrigger value="b" closable onClose={onClose}>
            Two
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a">First</TabsContent>
        <TabsContent value="b">Second</TabsContent>
      </Tabs>
    );
    await userEvent.click(screen.getByTestId('tab-close'));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByText('First')).toBeVisible();
  });

  it('keeps the close reachable by keyboard, not nested in the tab button', () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a" closable onClose={vi.fn()}>
            One
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content</TabsContent>
      </Tabs>
    );
    const close = screen.getByTestId('tab-close');
    expect(close.closest('[role="tab"]')).toBeNull();
  });

  it('shows no close control by default', () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">One</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content</TabsContent>
      </Tabs>
    );
    expect(screen.queryByTestId('tab-close')).not.toBeInTheDocument();
  });
});

describe('TabsAdd', () => {
  it('makes a new tab when pressed', async () => {
    const onClick = vi.fn();
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">One</TabsTrigger>
          <TabsAdd onClick={onClick} />
        </TabsList>
        <TabsContent value="a">Content</TabsContent>
      </Tabs>
    );
    await userEvent.click(screen.getByTestId('tab-add'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is named for screen readers, since it is only a plus', () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">One</TabsTrigger>
          <TabsAdd />
        </TabsList>
        <TabsContent value="a">Content</TabsContent>
      </Tabs>
    );
    expect(screen.getByRole('button', { name: 'New tab' })).toBeInTheDocument();
  });

  it('is not a tab, so arrow keys skip it', () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">One</TabsTrigger>
          <TabsAdd />
        </TabsList>
        <TabsContent value="a">Content</TabsContent>
      </Tabs>
    );
    expect(screen.getAllByRole('tab')).toHaveLength(1);
  });
});

describe('TabsTrigger — the close only shows when it should', () => {
  const one = () =>
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a" closable onClose={vi.fn()}>
            One
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content</TabsContent>
      </Tabs>
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
