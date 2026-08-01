import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  LeftNav,
  LeftNavBody,
  LeftNavExit,
  LeftNavFooter,
  LeftNavExpandable,
  LeftNavGroup,
  LeftNavItem,
  LeftNavSearch,
  LeftNavSection,
} from './LeftNav';
import { useLeftNavLevels } from './useLeftNavLevels';

describe('useLeftNavLevels', () => {
  it('starts at the root', () => {
    const { result } = renderHook(() => useLeftNavLevels());
    expect(result.current.level).toBe(1);
    expect(result.current.section).toBeNull();
  });

  it('starts inside a section when told to', () => {
    const { result } = renderHook(() => useLeftNavLevels({ initial: 'observability' }));
    expect(result.current.level).toBe(2);
    expect(result.current.isOpen('observability')).toBe(true);
  });

  it('opens a section and comes back', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useLeftNavLevels({ onChange }));
    act(() => {
      result.current.open('billing');
    });
    expect(result.current.level).toBe(2);
    expect(onChange).toHaveBeenLastCalledWith('billing');
    act(() => {
      result.current.back();
    });
    expect(result.current.level).toBe(1);
    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it('never goes past level two', () => {
    const { result } = renderHook(() => useLeftNavLevels());
    act(() => {
      result.current.open('one');
    });
    act(() => {
      result.current.open('two');
    });
    // Opening from level 2 replaces the section rather than stacking another.
    // Depth is where people get lost, so a third level is not reachable by
    // calling the API wrong - one `back` always returns to the root.
    expect(result.current.level).toBe(2);
    expect(result.current.section).toBe('two');
    act(() => {
      result.current.back();
    });
    expect(result.current.level).toBe(1);
  });

  it('ignores a later change to the starting section', () => {
    const { result, rerender } = renderHook(({ initial }) => useLeftNavLevels({ initial }), {
      initialProps: { initial: 'billing' as string | null },
    });
    rerender({ initial: 'security' });
    expect(result.current.section).toBe('billing');
  });
});

describe('LeftNav', () => {
  describe('the panel', () => {
    it('names itself, so two navigations can be told apart', () => {
      render(<LeftNav />);
      expect(screen.getByRole('navigation', { name: 'Settings' })).toBeInTheDocument();
    });

    it('takes a different name', () => {
      render(<LeftNav label="Workspace settings" />);
      expect(screen.getByRole('navigation', { name: 'Workspace settings' })).toBeInTheDocument();
    });
  });

  describe('leaving versus going up', () => {
    // The whole reason this component exists. The two controls must never be
    // the same kind of thing.
    const both = (
      <LeftNav>
        <LeftNavExit href="/app">Go to home</LeftNavExit>
        <LeftNavBody level={2}>
          <LeftNavSection title="Observability" onBack={() => undefined}>
            <LeftNavItem>Overview</LeftNavItem>
          </LeftNavSection>
        </LeftNavBody>
      </LeftNav>
    );

    it('the exit names its destination and is a link when it has one', () => {
      render(both);
      const exit = screen.getByRole('link', { name: 'Go to home' });
      expect(exit).toHaveAttribute('href', '/app');
    });

    it('the section back names where you are, not where it goes', () => {
      render(both);
      // "Back to all settings" is the accessible name of a small chevron; the
      // visible text is the section, because the question a heading answers is
      // "what am I looking at".
      expect(screen.getByRole('button', { name: 'Back to all settings' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Observability' })).toBeInTheDocument();
    });

    it('the section title is a heading, which the exit is not', () => {
      render(both);
      const headings = screen.getAllByRole('heading');
      expect(headings).toHaveLength(1);
      expect(headings[0]).toHaveTextContent('Observability');
    });

    it('the exit is a button when it has nowhere to go', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<LeftNavExit onClick={onClick} />);
      // Defaults to naming the destination rather than a bare "Back".
      await user.click(screen.getByRole('button', { name: 'Go to home' }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('goes back from the section', async () => {
      const user = userEvent.setup();
      const onBack = vi.fn();
      render(
        <LeftNavSection title="Billing" onBack={onBack}>
          <LeftNavItem>Invoices</LeftNavItem>
        </LeftNavSection>
      );
      await user.click(screen.getByRole('button', { name: 'Back to all settings' }));
      expect(onBack).toHaveBeenCalledTimes(1);
    });
  });

  describe('items', () => {
    it('is a link with an href and a button without', () => {
      render(
        <>
          <LeftNavItem href="/settings/profile">Profile</LeftNavItem>
          <LeftNavItem>Opens a section</LeftNavItem>
        </>
      );
      expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute(
        'href',
        '/settings/profile'
      );
      expect(screen.getByRole('button', { name: 'Opens a section' })).toHaveAttribute(
        'type',
        'button'
      );
    });

    it('says which page you are on, to a screen reader as well as by eye', () => {
      render(<LeftNavItem active>Profile</LeftNavItem>);
      // The grey pill is for everyone else; without this, one group is left out.
      expect(screen.getByRole('button', { name: 'Profile' })).toHaveAttribute(
        'aria-current',
        'page'
      );
    });

    it('leaves aria-current off everything else', () => {
      render(<LeftNavItem>Profile</LeftNavItem>);
      expect(screen.getByRole('button')).not.toHaveAttribute('aria-current');
    });

    it('marks an item that opens a second level', () => {
      const { container } = render(<LeftNavItem hasChildren>Observability</LeftNavItem>);
      // The trailing chevron is what separates "goes to a page" from "opens a
      // list" before you press it.
      expect(container.querySelector('[name="chevron-right"]')).toBeInTheDocument();
    });

    it('has no chevron when it goes straight to a page', () => {
      const { container } = render(<LeftNavItem>General</LeftNavItem>);
      expect(container.querySelector('[name="chevron-right"]')).not.toBeInTheDocument();
    });

    it('carries a count or a status on the trailing edge', () => {
      render(<LeftNavItem meta={<span>Beta</span>}>Integrations</LeftNavItem>);
      expect(screen.getByText('Beta')).toBeInTheDocument();
    });

    it('disables a button for real', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <LeftNavItem disabled onClick={onClick}>
          Not yours
        </LeftNavItem>
      );
      const item = screen.getByRole('button', { name: 'Not yours' });
      expect(item).toBeDisabled();
      await user.click(item);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('says a disabled link is disabled, since HTML has no way to', () => {
      render(
        <LeftNavItem href="/nope" disabled>
          Not yours
        </LeftNavItem>
      );
      const item = screen.getByRole('link', { name: 'Not yours' });
      expect(item).toHaveAttribute('aria-disabled', 'true');
      expect(item).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('groups', () => {
    it('labels a block without hiding it', () => {
      render(
        <LeftNavGroup label="Personal">
          <LeftNavItem>Profile</LeftNavItem>
        </LeftNavGroup>
      );
      // A plain heading by default: a control that hides four rows costs a
      // click and saves nothing.
      expect(screen.getByText('Personal')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /Personal/ })).not.toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('does not fold, because a heading is the map', async () => {
      const user = userEvent.setup();
      render(
        <LeftNavGroup label="Workspace">
          <LeftNavItem>Members</LeftNavItem>
        </LeftNavGroup>
      );
      // Collapsing a heading hides where you are in the list rather than the
      // detail. What folds is one setting with pages of its own.
      expect(screen.queryByRole('button', { name: /Workspace/ })).not.toBeInTheDocument();
      await user.click(screen.getByText('Workspace'));
      expect(screen.getByText('Members')).toBeVisible();
    });

    it('takes an unlabelled block', () => {
      render(
        <LeftNavGroup>
          <LeftNavItem>Loose item</LeftNavItem>
        </LeftNavGroup>
      );
      expect(screen.getByText('Loose item')).toBeInTheDocument();
    });
  });

  describe('a setting that folds open', () => {
    it('starts shut, and opens in place', async () => {
      const user = userEvent.setup();
      render(
        <LeftNavExpandable label="Voice">
          <LeftNavItem>Voice agent</LeftNavItem>
        </LeftNavExpandable>
      );
      expect(screen.queryByText('Voice agent')).not.toBeInTheDocument();
      const trigger = screen.getByRole('button', { name: /Voice/ });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Voice agent')).toBeVisible();
    });

    it('starts open when told to', () => {
      render(
        <LeftNavExpandable label="Voice" defaultOpen>
          <LeftNavItem>Voice agent</LeftNavItem>
        </LeftNavExpandable>
      );
      expect(screen.getByText('Voice agent')).toBeVisible();
    });

    it('can be driven from outside', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      render(
        <LeftNavExpandable label="Voice" open={false} onOpenChange={onOpenChange}>
          <LeftNavItem>Voice agent</LeftNavItem>
        </LeftNavExpandable>
      );
      await user.click(screen.getByRole('button', { name: /Voice/ }));
      expect(onOpenChange).toHaveBeenCalledWith(true);
      // Controlled, so it did not move on its own.
      expect(screen.queryByText('Voice agent')).not.toBeInTheDocument();
    });

    it('turns a chevron down, where an item that opens a level points sideways', () => {
      const { container } = render(
        <LeftNavExpandable label="Voice">
          <LeftNavItem>Voice agent</LeftNavItem>
        </LeftNavExpandable>
      );
      // Two different promises need two different glyphs: this one opens
      // underneath, the other moves the whole panel.
      expect(container.querySelector('[name="chevron-down"]')).toBeInTheDocument();
      expect(container.querySelector('[name="chevron-right"]')).not.toBeInTheDocument();
    });
  });

  describe('the rest of the anatomy', () => {
    it('names the search field and takes typing', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<LeftNavSearch onChange={onChange} />);
      await user.type(screen.getByRole('searchbox', { name: 'Search' }), 'bill');
      expect(onChange).toHaveBeenCalled();
    });

    it('takes a different search label', () => {
      render(<LeftNavSearch label="Find a setting" />);
      expect(screen.getByRole('searchbox', { name: 'Find a setting' })).toBeInTheDocument();
    });

    it('publishes the level, and does not pretend to animate it', () => {
      const { rerender, container } = render(
        <LeftNavBody level={1}>
          <LeftNavItem>Root</LeftNavItem>
        </LeftNavBody>
      );
      expect(container.firstElementChild).toHaveAttribute('data-level', '1');

      rerender(
        <LeftNavBody level={2}>
          <LeftNavItem>Section</LeftNavItem>
        </LeftNavBody>
      );
      expect(container.firstElementChild).toHaveAttribute('data-level', '2');
      expect(screen.getByText('Section')).toBeInTheDocument();
      expect(screen.queryByText('Root')).not.toBeInTheDocument();
    });

    it('holds a footer at the bottom', () => {
      render(
        <LeftNav>
          <LeftNavFooter>
            <span>Nirav</span>
          </LeftNavFooter>
        </LeftNav>
      );
      const nav = screen.getByRole('navigation');
      expect(within(nav).getByText('Nirav')).toBeInTheDocument();
    });
  });
});
