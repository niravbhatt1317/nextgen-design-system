import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Tabs, TabsAdd, TabsList, TabsTrigger, TabsContent } from './Tabs';
import { useEditableTabs } from './useEditableTabs';
import type { TabsType } from './Tabs.types';

const three = (type?: TabsType, extra?: Partial<React.ComponentProps<typeof TabsTrigger>>) => (
  <Tabs defaultValue="about">
    <TabsList {...(type !== undefined ? { type } : {})}>
      <TabsTrigger value="about">About</TabsTrigger>
      <TabsTrigger value="grants" {...extra}>
        Grants
      </TabsTrigger>
      <TabsTrigger value="teams">Teams</TabsTrigger>
    </TabsList>
    <TabsContent value="about">About panel</TabsContent>
    <TabsContent value="grants">Grants panel</TabsContent>
    <TabsContent value="teams">Teams panel</TabsContent>
  </Tabs>
);

/** A tab's accessible name starts with its label; a count or a badge follows it ("Grants 3"). */
const tab = (name: string) => screen.getByRole('tab', { name: new RegExp(`^${name}\\b`) });
const list = () => screen.getByRole('tablist');

describe('Tabs — the two types (K-Tabs-01)', () => {
  it('is underline by default', () => {
    render(three());
    expect(list()).toHaveAttribute('data-type', 'underline');
    expect(tab('About')).toHaveAttribute('data-type', 'underline');
    expect(tab('About')).toHaveClass('mdt-border-b-2');
  });

  it('draws the filled track when asked', () => {
    render(three('filled'));
    expect(list()).toHaveAttribute('data-type', 'filled');
    expect(list()).toHaveClass('mdt-bg-neutral-20');
  });

  it('hands the type to every tab inside, so it is set once', () => {
    render(three('filled'));
    expect(tab('About')).toHaveAttribute('data-type', 'filled');
    expect(tab('Teams')).toHaveClass('mdt-h-[26px]');
    expect(tab('Teams')).not.toHaveClass('mdt-border-b-2');
  });

  it('lets one tab override the inherited type', () => {
    render(three('filled', { type: 'underline' }));
    expect(tab('Grants')).toHaveAttribute('data-type', 'underline');
  });

  it('still answers to the old variant word', () => {
    render(
      <Tabs defaultValue="a">
        <TabsList variant="filled">
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
      </Tabs>
    );
    expect(list()).toHaveAttribute('data-type', 'filled');
  });

  it('switches panels on click', async () => {
    const user = userEvent.setup();
    render(three());
    await user.click(tab('Grants'));
    expect(screen.getByText('Grants panel')).toBeVisible();
  });
});

describe('the label (K-Tabs-02 to 05, 07)', () => {
  it('is 13/500 on an 18 line, the faint ink at rest', () => {
    render(three());
    expect(tab('Grants')).toHaveClass(
      'mdt-text-[13px]',
      'mdt-font-medium',
      'mdt-leading-[18px]',
      'mdt-text-faint'
    );
  });

  it('marks the selected tab active', () => {
    render(three());
    expect(tab('About')).toHaveAttribute('data-state', 'active');
    expect(tab('Grants')).toHaveAttribute('data-state', 'inactive');
  });

  it('weighs the active underline label 600 in the primary colour', () => {
    render(three());
    expect(tab('About')).toHaveClass(
      'data-[state=active]:mdt-font-semibold',
      'data-[state=active]:mdt-text-primary'
    );
  });

  it('keeps the active chip label at 500 — not bold', () => {
    render(three('filled'));
    expect(tab('About')).toHaveClass('data-[state=active]:mdt-font-medium');
    expect(tab('About')).not.toHaveClass('data-[state=active]:mdt-font-semibold');
  });

  it('darkens the label to neutral-90 on hover, and keeps the active one primary', () => {
    render(three());
    expect(tab('Grants')).toHaveClass('hover:mdt-text-neutral-90');
    expect(tab('About')).toHaveClass('data-[state=active]:hover:mdt-text-primary');
  });

  it('tints a hovered chip primary at 4%, and leaves the active chip white', () => {
    render(three('filled'));
    expect(tab('Grants')).toHaveClass('hover:mdt-bg-primary/[0.04]');
    expect(tab('About')).toHaveClass('data-[state=active]:hover:mdt-bg-white');
  });

  it('reads neutral-40 with a not-allowed cursor when disabled — never dimmed or unhoverable', () => {
    render(three(undefined, { disabled: true }));
    expect(tab('Grants')).toBeDisabled();
    expect(tab('Grants')).toHaveClass(
      'disabled:mdt-text-neutral-40',
      'disabled:mdt-cursor-not-allowed'
    );
    expect(tab('Grants')).not.toHaveClass('disabled:mdt-opacity-50');
    expect(tab('Grants')).not.toHaveClass('disabled:mdt-pointer-events-none');
  });

  it('moves colour in 120ms', () => {
    render(three());
    expect(tab('Grants')).toHaveClass('mdt-transition-colors', 'mdt-duration-[120ms]');
  });
});

describe('underline geometry (K-Tabs-06, 08)', () => {
  it('pads the label 12 at both sides, 9 above and 11 below', () => {
    render(three());
    expect(tab('Grants')).toHaveClass('mdt-px-3', 'mdt-pt-[9px]', 'mdt-pb-[11px]');
  });

  it('draws the 2px line as the tab’s own bottom border, primary when active', () => {
    render(three());
    expect(tab('Grants')).toHaveClass('mdt-border-b-2', 'mdt-border-transparent');
    expect(tab('About')).toHaveClass('data-[state=active]:mdt-border-primary');
  });

  it('pulls the line 1 down so it sits on the strip’s hairline, not above it', () => {
    render(three());
    expect(tab('About')).toHaveClass('-mdt-mb-px');
    expect(list()).toHaveClass('mdt-border-b', 'mdt-border-neutral-20');
  });

  it('bottom-aligns the tabs so a taller band still lands the line on the divider', () => {
    render(three());
    expect(list()).toHaveClass('mdt-items-end');
  });

  it('sits the tabs flush — no gap — so labels read 24 apart', () => {
    render(three());
    expect(list()).toHaveClass('mdt-gap-0');
  });

  it('runs the strip the full width of the content, starting on its edge', () => {
    render(three());
    expect(list()).toHaveClass('mdt-w-full');
  });
});

describe('filled geometry (K-Tabs-09 to 11)', () => {
  it('draws a 32 track with corners 8 on neutral-20, 3 in, 2 between chips', () => {
    render(three('filled'));
    expect(list()).toHaveClass(
      'mdt-h-8',
      'mdt-rounded-[8px]',
      'mdt-bg-neutral-20',
      'mdt-p-[3px]',
      'mdt-gap-0.5'
    );
  });

  it('draws a 26 chip with corners 5 and 10 at the sides', () => {
    render(three('filled'));
    expect(tab('Grants')).toHaveClass('mdt-h-[26px]', 'mdt-rounded-[5px]', 'mdt-px-2.5');
  });

  it('paints the active chip white under the hairline shadow', () => {
    render(three('filled'));
    expect(tab('About')).toHaveClass(
      'data-[state=active]:mdt-bg-white',
      'data-[state=active]:mdt-shadow-[0_1px_2px_rgba(29,43,62,0.10),0_0_0_1px_rgba(29,43,62,0.04)]'
    );
  });

  it('hugs its chips rather than stretching, unless asked to fill', () => {
    render(three('filled'));
    expect(list()).toHaveClass('mdt-inline-flex');
    expect(list()).not.toHaveClass('mdt-w-full');
  });

  it('stretches the tabs to share the width when asked', () => {
    render(
      <Tabs defaultValue="a">
        <TabsList type="filled" fullWidth>
          <TabsTrigger value="a" fullWidth>
            A
          </TabsTrigger>
        </TabsList>
      </Tabs>
    );
    expect(list()).toHaveClass('mdt-w-full');
    expect(tab('A')).toHaveClass('mdt-flex-1');
  });
});

describe('the icon and the count (K-Tabs-13, 14, 20)', () => {
  it('draws the icon before the label at 14, hidden from screen readers', () => {
    render(three(undefined, { icon: <svg data-testid="glyph" /> }));
    const icon = screen.getByTestId('tab-icon');
    expect(icon).toHaveClass('[&_svg]:mdt-size-3.5');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(tab('Grants').firstElementChild).toBe(icon);
  });

  it('keeps 6 between the icon, the label and the count', () => {
    render(three());
    expect(tab('Grants')).toHaveClass('mdt-gap-1.5');
  });

  it('draws the count after the label as an 18-high pill at 11/600', () => {
    render(three(undefined, { count: 3 }));
    const count = screen.getByTestId('tab-count');
    expect(count).toHaveTextContent('3');
    expect(count).toHaveClass(
      'mdt-h-[18px]',
      'mdt-min-w-[18px]',
      'mdt-rounded-[9px]',
      'mdt-text-[11px]',
      'mdt-font-semibold',
      'mdt-leading-none'
    );
    expect(tab('Grants').lastElementChild).toBe(count);
  });

  it('mutes the count on neutral-20, a step darker on the filled track', () => {
    const { unmount } = render(three(undefined, { count: 3 }));
    expect(screen.getByTestId('tab-count')).toHaveClass('mdt-bg-neutral-20', 'mdt-text-faint');
    unmount();
    render(three('filled', { count: 3 }));
    expect(screen.getByTestId('tab-count')).toHaveClass('mdt-bg-neutral-30');
  });

  it('inverts the count on the active tab and fades it on a disabled one', () => {
    render(three(undefined, { count: 3 }));
    expect(screen.getByTestId('tab-count')).toHaveClass(
      '[[data-state=active]_&]:mdt-bg-neutral-90',
      '[[data-state=active]_&]:mdt-text-white',
      '[:disabled_&]:mdt-text-neutral-40'
    );
  });

  it('caps the count at 99+ by default', () => {
    render(three(undefined, { count: 1284 }));
    expect(screen.getByTestId('tab-count')).toHaveTextContent('99+');
  });

  it('caps at whatever countMax says, for a numeric string too', () => {
    const { unmount } = render(three(undefined, { count: 12, countMax: 9 }));
    expect(screen.getByTestId('tab-count')).toHaveTextContent('9+');
    unmount();
    render(three(undefined, { count: '12', countMax: 9 }));
    expect(screen.getByTestId('tab-count')).toHaveTextContent('9+');
  });

  it('leaves a count that is not a number alone', () => {
    render(three(undefined, { count: 'new' }));
    expect(screen.getByTestId('tab-count')).toHaveTextContent('new');
  });

  it('still takes any badge after the count', () => {
    render(three(undefined, { count: 3, badge: <span data-testid="status">Soon</span> }));
    const t = tab('Grants');
    expect(screen.getByTestId('status')).toBeInTheDocument();
    expect(t.lastElementChild).toBe(screen.getByTestId('tab-badge'));
    expect(screen.getByTestId('tab-count').nextElementSibling).toBe(
      screen.getByTestId('tab-badge')
    );
  });

  it('renders no slots on a plain tab', () => {
    render(three());
    expect(screen.queryByTestId('tab-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('tab-count')).not.toBeInTheDocument();
    expect(screen.queryByTestId('tab-badge')).not.toBeInTheDocument();
  });

  it.each(['underline', 'filled'] as const)('carries icon and count in the %s type', (type) => {
    render(three(type, { icon: <svg />, count: 2 }));
    expect(screen.getByTestId('tab-icon')).toBeInTheDocument();
    expect(screen.getByTestId('tab-count')).toHaveTextContent('2');
  });
});

describe('keyboard travel', () => {
  it('reaches the selected tab with Tab, then moves with the arrow keys and selects as it goes', async () => {
    const user = userEvent.setup();
    render(three());
    await user.tab();
    expect(tab('About')).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(tab('Grants')).toHaveFocus();
    expect(tab('Grants')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Grants panel')).toBeVisible();
    await user.keyboard('{ArrowLeft}');
    expect(tab('About')).toHaveFocus();
    expect(tab('About')).toHaveAttribute('aria-selected', 'true');
  });

  it('jumps with Home and End', async () => {
    const user = userEvent.setup();
    render(three());
    await user.tab();
    await user.keyboard('{End}');
    expect(tab('Teams')).toHaveFocus();
    await user.keyboard('{Home}');
    expect(tab('About')).toHaveFocus();
  });

  it('skips a disabled tab', async () => {
    const user = userEvent.setup();
    render(three(undefined, { disabled: true }));
    await user.tab();
    await user.keyboard('{ArrowRight}');
    expect(tab('Teams')).toHaveFocus();
  });

  it('travels the filled track the same way', async () => {
    const user = userEvent.setup();
    render(three('filled'));
    await user.tab();
    await user.keyboard('{ArrowRight}');
    expect(tab('Grants')).toHaveAttribute('aria-selected', 'true');
  });
});

describe('the active tab ignores a click (K-Tabs-12)', () => {
  const controlled = (type: TabsType, onValueChange: (value: string) => void) => (
    <Tabs value="about" onValueChange={onValueChange}>
      <TabsList type={type}>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="grants">Grants</TabsTrigger>
      </TabsList>
    </Tabs>
  );

  it('does not re-fire onValueChange when the active chip is clicked', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(controlled('filled', onValueChange));
    await user.click(tab('About'));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('still selects another chip on click', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(controlled('filled', onValueChange));
    await user.click(tab('Grants'));
    expect(onValueChange).toHaveBeenCalledWith('grants');
  });

  it('holds for the underline tab too', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(controlled('underline', onValueChange));
    await user.click(tab('About'));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('keeps focus on the active tab after the ignored click', async () => {
    const user = userEvent.setup();
    render(controlled('filled', vi.fn()));
    await user.click(tab('About'));
    expect(tab('About')).toHaveFocus();
  });

  it('ignores Enter and Space on the active tab as well', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(controlled('filled', onValueChange));
    await user.tab();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('still calls a mouse-down handler the caller passed', async () => {
    const user = userEvent.setup();
    const onMouseDown = vi.fn();
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a" onMouseDown={onMouseDown}>
            A
          </TabsTrigger>
        </TabsList>
      </Tabs>
    );
    await user.click(tab('A'));
    expect(onMouseDown).toHaveBeenCalledTimes(1);
  });
});

describe('TabsTrigger — closing (K-Tabs-21)', () => {
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

  it('shows a close control when closable, named after the tab', () => {
    one();
    expect(screen.getByRole('button', { name: 'Close One' })).toBe(screen.getByTestId('tab-close'));
  });

  it('shows no close control by default', () => {
    render(three());
    expect(screen.queryByTestId('tab-close')).not.toBeInTheDocument();
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

  it('keeps the close beside the tab, not nested in it', () => {
    one();
    expect(screen.getByTestId('tab-close').closest('[role="tab"]')).toBeNull();
  });

  it('starts hidden and unclickable, shows on hover, on the selected tab and on focus', () => {
    one();
    const close = screen.getByTestId('tab-close');
    expect(close).toHaveClass('mdt-opacity-0', 'mdt-pointer-events-none');
    expect(close).toHaveClass('group-hover:mdt-opacity-100', 'group-hover:mdt-pointer-events-auto');
    expect(close).toHaveClass('[[data-state=active]+&]:mdt-opacity-100');
    expect(close).toHaveClass('focus-visible:mdt-opacity-100');
  });

  it('holds 36 of right padding whether or not the cross is showing', () => {
    one();
    expect(tab('One')).toHaveClass('mdt-pr-9');
  });
});

describe('TabsAdd (K-Tabs-22)', () => {
  const withAdd = (onClick?: () => void) =>
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">One</TabsTrigger>
          <TabsAdd {...(onClick ? { onClick } : {})} />
        </TabsList>
        <TabsContent value="a">Content</TabsContent>
      </Tabs>
    );

  it('is a 32 square named for screen readers, since it is only a plus', () => {
    withAdd();
    expect(screen.getByRole('button', { name: 'New tab' })).toHaveClass('mdt-size-8');
  });

  it('makes a new tab when pressed', async () => {
    const onClick = vi.fn();
    withAdd(onClick);
    await userEvent.click(screen.getByTestId('tab-add'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is not a tab, so the arrow keys skip it', () => {
    withAdd();
    expect(screen.getAllByRole('tab')).toHaveLength(1);
  });
});

describe('TabsContent (K-Tabs-23)', () => {
  it('sits 8 under the strip', () => {
    render(three());
    expect(screen.getByText('About panel')).toHaveClass('mdt-mt-2');
  });
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
