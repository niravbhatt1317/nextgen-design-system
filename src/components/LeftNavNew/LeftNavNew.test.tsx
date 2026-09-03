import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { LeftNavNew, LeftNavNewTrigger } from './LeftNavNew';
import type {
  LeftNavNewAccount,
  LeftNavNewCollection,
  LeftNavNewSettingsSection,
} from './LeftNavNew.types';

const COLLECTIONS: LeftNavNewCollection[] = [
  {
    key: 'incident',
    label: 'Incident Response',
    defaultOpen: true,
    children: [
      { key: 'warroom', label: 'Incident War Room', live: true },
      { key: 'rca', label: 'Root Cause Analysis Board' },
      { key: 'perm', label: 'Permissions', soon: true },
    ],
  },
  {
    key: 'monitoring',
    label: 'Monitoring & Metrics',
    children: [{ key: 'health', label: 'Service Health', live: true }],
  },
];

const ACCOUNT: LeftNavNewAccount = {
  email: 'demo.admin@motadata.com',
  orgs: [
    { id: 'northwind', name: 'Northwind Traders', memberCount: 1284 },
    { id: 'fabrikam', name: 'Fabrikam', memberCount: 342 },
  ],
  currentOrgId: 'northwind',
};

describe('LeftNavNew', () => {
  it('renders the rail with its accessible name and the seeded tree', () => {
    render(<LeftNavNew collections={COLLECTIONS} activeKey="warroom" />);
    expect(screen.getByRole('navigation', { name: 'Workspace' })).toBeInTheDocument();
    expect(screen.getByText('Incident Response')).toBeInTheDocument();
    // defaultOpen shows its boards; the closed group hides its own
    expect(screen.getByText('Incident War Room')).toBeInTheDocument();
    expect(screen.queryByText('Service Health')).not.toBeInTheDocument();
  });

  it('selecting a live board reports it and marks the row', () => {
    const onSelect = vi.fn();
    render(<LeftNavNew collections={COLLECTIONS} activeKey="warroom" onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'Incident War Room' }));
    expect(onSelect).toHaveBeenCalledWith('warroom');
    expect(screen.getByRole('button', { name: 'Incident War Room' })).toHaveAttribute(
      'data-on',
      'true'
    );
  });

  it('the collection holding the active board carries the highlight too', () => {
    render(<LeftNavNew collections={COLLECTIONS} activeKey="warroom" />);
    expect(screen.getByRole('button', { name: 'Incident Response' })).toHaveAttribute(
      'data-on',
      'true'
    );
  });

  it('a board that is not live refuses the click', () => {
    const onSelect = vi.fn();
    render(<LeftNavNew collections={COLLECTIONS} onSelect={onSelect} />);
    const row = screen.getByRole('button', { name: 'Root Cause Analysis Board' });
    expect(row).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(row);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('a "soon" board wears the badge and refuses the click', () => {
    const onSelect = vi.fn();
    render(<LeftNavNew collections={COLLECTIONS} onSelect={onSelect} />);
    expect(screen.getByText('Soon')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Permissions/ }));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('clicking the folder folds the boards away and back', () => {
    render(<LeftNavNew collections={COLLECTIONS} />);
    const folder = screen.getByRole('button', { name: 'Incident Response' });
    fireEvent.click(folder);
    expect(screen.queryByText('Incident War Room')).not.toBeInTheDocument();
    fireEvent.click(folder);
    expect(screen.getByText('Incident War Room')).toBeInTheDocument();
  });

  it('search filters boards and forces closed groups open', async () => {
    const user = userEvent.setup();
    render(<LeftNavNew collections={COLLECTIONS} />);
    await user.type(screen.getByLabelText('Search workspace'), 'health');
    // the closed monitoring group opens to show its match
    expect(screen.getByText('Service Health')).toBeInTheDocument();
    // the incident group has no match left and disappears entirely
    expect(screen.queryByText('Incident War Room')).not.toBeInTheDocument();
    expect(screen.queryByText('Incident Response')).not.toBeInTheDocument();
  });

  it('Escape clears the search', async () => {
    const user = userEvent.setup();
    render(<LeftNavNew collections={COLLECTIONS} />);
    const input = screen.getByLabelText('Search workspace');
    await user.type(input, 'health');
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(input).toHaveValue('');
    expect(screen.getByText('Incident War Room')).toBeInTheDocument();
  });

  it('Ctrl+K hands the search the caret', () => {
    render(<LeftNavNew collections={COLLECTIONS} />);
    fireEvent.keyDown(document, { key: 'k', ctrlKey: true });
    expect(screen.getByLabelText('Search workspace')).toHaveFocus();
  });

  it('the pinned Settings row reports through its own callback', () => {
    const onSettings = vi.fn();
    render(<LeftNavNew collections={COLLECTIONS} onSettings={onSettings} />);
    fireEvent.click(screen.getByRole('button', { name: /Settings/ }));
    expect(onSettings).toHaveBeenCalled();
  });

  it('collapsed, clicking a folder opens its boards in a flyout', async () => {
    const onSelect = vi.fn();
    render(<LeftNavNew collections={COLLECTIONS} collapsed onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'Incident Response' }));
    const fly = await screen.findByRole('dialog');
    fireEvent.click(within(fly).getByRole('button', { name: 'Incident War Room' }));
    expect(onSelect).toHaveBeenCalledWith('warroom');
  });

  it('the account card opens the destination panel and travels', async () => {
    const onSwitchOrg = vi.fn();
    render(<LeftNavNew collections={COLLECTIONS} account={{ ...ACCOUNT, onSwitchOrg }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Organization switcher and account' }));
    const panel = await screen.findByRole('dialog');
    expect(within(panel).getByText('demo.admin@motadata.com')).toBeInTheDocument();
    expect(within(panel).getByText('2 organizations')).toBeInTheDocument();
    // the current organization is the "here" strip, not a row in the list
    expect(within(panel).queryByRole('button', { name: /Northwind Traders/ })).toBeNull();
    fireEvent.click(within(panel).getByRole('button', { name: /Fabrikam/ }));
    expect(onSwitchOrg).toHaveBeenCalledWith('fabrikam');
  });

  it('inside an organization the panel offers the MSP-wide door', async () => {
    const onSwitchOrg = vi.fn();
    render(<LeftNavNew collections={COLLECTIONS} account={{ ...ACCOUNT, onSwitchOrg }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Organization switcher and account' }));
    const panel = await screen.findByRole('dialog');
    fireEvent.click(within(panel).getByRole('button', { name: /Switch to MSP-wide view/ }));
    expect(onSwitchOrg).toHaveBeenCalledWith(null);
  });
});

describe('LeftNavNewTrigger', () => {
  it('names its state and toggles', () => {
    const onToggle = vi.fn();
    const { rerender } = render(<LeftNavNewTrigger collapsed={false} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole('button', { name: 'Collapse sidebar' }));
    expect(onToggle).toHaveBeenCalled();
    rerender(<LeftNavNewTrigger collapsed onToggle={onToggle} />);
    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeInTheDocument();
  });
});

/* ── the settings floors ──────────────────────────────────────────────────── */

const SETTINGS: LeftNavNewSettingsSection[] = [
  {
    key: 'people',
    label: 'People & Access',
    items: [
      { key: 'users', label: 'Users', icon: 'users' },
      { key: 'perm', label: 'Permissions', icon: 'list-checks', soon: true },
    ],
  },
  {
    key: 'ops',
    label: 'Operations',
    items: [{ key: 'fleet', label: 'Agent Fleet', icon: 'cpu', section: 'fleet' }],
  },
];

const FLEET: LeftNavNewSettingsSection[] = [
  {
    key: 'overview',
    label: 'Overview',
    items: [
      { key: 'home', label: 'Command center', icon: 'layout-dashboard' },
      { key: 'insights', label: 'Insights & alerts', icon: 'bell' },
    ],
  },
];

describe('LeftNavNew settings floors', () => {
  it('Settings descends to the settings floor and selects its first page', async () => {
    const onSelect = vi.fn();
    const onViewChange = vi.fn();
    render(
      <LeftNavNew
        collections={COLLECTIONS}
        settings={SETTINGS}
        fleet={FLEET}
        onSelect={onSelect}
        onViewChange={onViewChange}
      />
    );
    await userEvent.click(screen.getByTitle('Settings'));
    expect(onViewChange).toHaveBeenCalledWith('settings');
    expect(onSelect).toHaveBeenCalledWith('users');
    expect(screen.getByRole('navigation', { name: 'Settings' })).toBeInTheDocument();
    expect(screen.getByText('People & Access')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search settings')).toBeInTheDocument();
  });

  it('Agent Fleet descends a floor; the crumb strip is the way back up, twice', async () => {
    const onSelect = vi.fn();
    render(
      <LeftNavNew
        collections={COLLECTIONS}
        settings={SETTINGS}
        fleet={FLEET}
        defaultView="settings"
        onSelect={onSelect}
      />
    );
    await userEvent.click(screen.getByTitle('Agent Fleet'));
    expect(onSelect).toHaveBeenCalledWith('home');
    expect(screen.getByText('Command center')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search fleet')).toBeInTheDocument();
    await userEvent.click(screen.getByTitle('Back to all settings'));
    expect(screen.getByText('People & Access')).toBeInTheDocument();
    await userEvent.click(screen.getByTitle('Back to workspace'));
    expect(screen.getByRole('navigation', { name: 'Workspace' })).toBeInTheDocument();
  });

  it('a "soon" page refuses the click; the search filters the floor and survives a floor change', async () => {
    const onSelect = vi.fn();
    render(
      <LeftNavNew
        collections={COLLECTIONS}
        settings={SETTINGS}
        fleet={FLEET}
        defaultView="settings"
        onSelect={onSelect}
      />
    );
    await userEvent.click(screen.getByTitle('Permissions'));
    expect(onSelect).not.toHaveBeenCalledWith('perm');
    await userEvent.click(screen.getByTitle('Agent Fleet'));
    await userEvent.type(screen.getByPlaceholderText('Search fleet'), 'insi');
    expect(screen.queryByText('Command center')).not.toBeInTheDocument();
    expect(screen.getByText('Insights & alerts')).toBeInTheDocument();
    // the query is one box across both floors, as in the product
    await userEvent.click(screen.getByTitle('Back to all settings'));
    expect(screen.getByPlaceholderText('Search settings')).toHaveValue('insi');
    expect(screen.queryByText('People & Access')).not.toBeInTheDocument();
  });

  it('scrolling the list tucks the search away; the floor without settings stays on Settings-only behaviour', () => {
    const onSettings = vi.fn();
    const { container, unmount } = render(
      <LeftNavNew collections={COLLECTIONS} settings={SETTINGS} defaultView="settings" />
    );
    const body = container.querySelector('.snv-body') as HTMLElement;
    fireEvent.scroll(body, { target: { scrollTop: 40 } });
    expect(container.querySelector('.snv-mid')).toHaveAttribute('data-scrolled', 'true');
    unmount();
    render(<LeftNavNew collections={COLLECTIONS} onSettings={onSettings} />);
    fireEvent.click(screen.getByTitle('Settings'));
    expect(onSettings).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('navigation', { name: 'Workspace' })).toBeInTheDocument();
  });
});
