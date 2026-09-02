import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { LeftNavNew, LeftNavNewTrigger } from './LeftNavNew';
import type { LeftNavNewAccount, LeftNavNewCollection } from './LeftNavNew.types';

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
