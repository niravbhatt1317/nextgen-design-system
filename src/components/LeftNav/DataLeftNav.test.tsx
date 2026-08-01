import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DataLeftNav } from './DataLeftNav';
import type { LeftNavConfig } from './LeftNav.types';

const config: LeftNavConfig = {
  home: { label: 'Go to home' },
  search: {},
  items: [
    { key: 'profile', label: 'Profile', icon: 'user', group: 'Personal' },
    { key: 'security', label: 'Security', icon: 'shield', group: 'Personal', disabled: true },
    { key: 'domains', label: 'Domains', icon: 'globe', group: 'Platform', href: '/domains' },
    {
      key: 'observability',
      label: 'Observability',
      icon: 'activity',
      group: 'Platform',
      badge: 'Beta',
      items: [
        { key: 'overview', label: 'Overview', icon: 'layout-grid' },
        { key: 'functions', label: 'Functions', icon: 'function-square', group: 'Compute' },
        {
          key: 'alerts',
          label: 'Alerts',
          icon: 'alert-triangle',
          group: 'Compute',
          items: [{ key: 'alert-rules', label: 'Rules' }],
        },
      ],
    },
  ],
};

const nav = () => screen.getByRole('navigation');

describe('DataLeftNav', () => {
  describe('the root list', () => {
    it('renders every entry under the heading it declared', () => {
      render(<DataLeftNav config={config} />);
      // Headings come from the entries themselves, in the order they first
      // appear - a config should not have to declare them twice.
      expect(within(nav()).getByText('Personal')).toBeInTheDocument();
      expect(within(nav()).getByText('Platform')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Profile/ })).toBeInTheDocument();
    });

    it('is a link when the entry says where it goes', () => {
      render(<DataLeftNav config={config} />);
      expect(screen.getByRole('link', { name: /Domains/ })).toHaveAttribute('href', '/domains');
    });

    it('marks the page being shown', () => {
      render(<DataLeftNav config={config} activeKey="profile" />);
      expect(screen.getByRole('button', { name: /Profile/ })).toHaveAttribute(
        'aria-current',
        'page'
      );
    });

    it('reports a choice with the entry, not just its key', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      render(<DataLeftNav config={config} onSelect={onSelect} />);
      await user.click(screen.getByRole('button', { name: /Profile/ }));
      expect(onSelect).toHaveBeenCalledWith('profile', expect.objectContaining({ key: 'profile' }));
    });

    it('honours disabled', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      render(<DataLeftNav config={config} onSelect={onSelect} />);
      const row = screen.getByRole('button', { name: /Security/ });
      expect(row).toBeDisabled();
      await user.click(row);
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('shows a badge where one was asked for', () => {
      render(<DataLeftNav config={config} />);
      expect(within(nav()).getByText('Beta')).toBeInTheDocument();
    });
  });

  describe('the second level', () => {
    it('opens a section and lands on its first page', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      render(<DataLeftNav config={config} onSelect={onSelect} />);
      await user.click(screen.getByRole('button', { name: /Observability/ }));

      expect(screen.getByRole('heading', { name: 'Observability' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Overview/ })).toBeInTheDocument();
      // Arriving at a list with nothing chosen asks you to pick again having
      // just picked.
      expect(onSelect).toHaveBeenCalledWith(
        'overview',
        expect.objectContaining({ key: 'overview' })
      );
    });

    it('groups the section the same way', async () => {
      const user = userEvent.setup();
      render(<DataLeftNav config={config} />);
      await user.click(screen.getByRole('button', { name: /Observability/ }));
      expect(within(nav()).getByText('Compute')).toBeInTheDocument();
    });

    it('folds a page that has pages of its own, rather than pushing a level', async () => {
      const user = userEvent.setup();
      render(<DataLeftNav config={config} />);
      await user.click(screen.getByRole('button', { name: /Observability/ }));

      const alerts = screen.getByRole('button', { name: /Alerts/ });
      expect(alerts).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByText('Rules')).not.toBeInTheDocument();
      await user.click(alerts);
      // Still level 2 - the heading has not changed, so nothing was pushed.
      expect(screen.getByRole('heading', { name: 'Observability' })).toBeInTheDocument();
      expect(screen.getByText('Rules')).toBeInTheDocument();
    });

    it('comes back to the root', async () => {
      const user = userEvent.setup();
      render(<DataLeftNav config={config} />);
      await user.click(screen.getByRole('button', { name: /Observability/ }));
      await user.click(screen.getByRole('button', { name: 'Back to all settings' }));
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Profile/ })).toBeInTheDocument();
    });

    it('opens on a section when told to', () => {
      render(<DataLeftNav config={config} initialSection="observability" />);
      expect(screen.getByRole('heading', { name: 'Observability' })).toBeInTheDocument();
    });
  });

  describe('search', () => {
    it('reaches a page two levels away and takes its section with it', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      render(<DataLeftNav config={config} onSelect={onSelect} />);

      await user.type(screen.getByRole('searchbox'), 'rules');
      // The page someone wants is usually the one they cannot see.
      const hit = screen.getByRole('button', { name: /Rules/ });
      expect(hit).toBeInTheDocument();

      await user.click(hit);
      expect(onSelect).toHaveBeenCalledWith('alert-rules', expect.anything());
      // And it took the section with it, so back lands somewhere sensible.
      expect(screen.getByRole('heading', { name: 'Observability' })).toBeInTheDocument();
    });

    it('counts its results, in the singular when there is one', async () => {
      const user = userEvent.setup();
      render(<DataLeftNav config={config} />);
      await user.type(screen.getByRole('searchbox'), 'profile');
      expect(within(nav()).getByText('1 result')).toBeInTheDocument();
    });

    it('clears itself once something is chosen', async () => {
      const user = userEvent.setup();
      render(<DataLeftNav config={config} />);
      await user.type(screen.getByRole('searchbox'), 'profile');
      await user.click(screen.getByRole('button', { name: /Profile/ }));
      expect(screen.getByRole('searchbox')).toHaveValue('');
    });
  });

  describe('what the config leaves out', () => {
    it('renders no home control and no search when they are absent', () => {
      render(<DataLeftNav config={{ items: [{ key: 'a', label: 'Only' }] }} />);
      expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /home/i })).not.toBeInTheDocument();
    });

    it('takes a footer as markup, since that is what it is', () => {
      render(<DataLeftNav config={config} footer={<span>Signed in as Nirav</span>} />);
      expect(within(nav()).getByText('Signed in as Nirav')).toBeInTheDocument();
    });

    it('reports the home press', async () => {
      const user = userEvent.setup();
      const onHome = vi.fn();
      render(<DataLeftNav config={config} onHome={onHome} />);
      await user.click(screen.getByRole('button', { name: 'Go to home' }));
      expect(onHome).toHaveBeenCalledTimes(1);
    });
  });

  describe('depth', () => {
    it('ignores a third level rather than honouring it', async () => {
      const user = userEvent.setup();
      const deep: LeftNavConfig = {
        items: [
          {
            key: 'a',
            label: 'A',
            items: [
              {
                key: 'b',
                label: 'B',
                items: [{ key: 'c', label: 'C', items: [{ key: 'd', label: 'D' }] }],
              },
            ],
          },
        ],
      };
      render(<DataLeftNav config={deep} />);
      await user.click(screen.getByRole('button', { name: 'A' }));
      // Exact, because "Back to all settings" also contains a B.
      await user.click(screen.getByRole('button', { name: 'B' }));

      expect(screen.getByText('C')).toBeInTheDocument();
      // A config asking for a fourth level is asking for a navigation nobody
      // can get back out of. It is dropped, not rendered.
      expect(screen.queryByText('D')).not.toBeInTheDocument();
    });
  });
});
