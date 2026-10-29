import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Popover, PopoverActionMenu, PopoverContent, PopoverQuickFilter, PopoverTrigger } from './Popover';
import type { PopoverAction } from './Popover.types';

describe('Popover', () => {
  it('renders trigger correctly', () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );

    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('opens popover when trigger is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByText('Open');
    await user.click(trigger);

    expect(screen.getByText('Popover Content')).toBeInTheDocument();
  });

  it('closes popover when clicking outside', async () => {
    const user = userEvent.setup();

    render(
      <div>
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>Popover Content</PopoverContent>
        </Popover>
        <div>Outside</div>
      </div>
    );

    const trigger = screen.getByText('Open');
    await user.click(trigger);

    expect(screen.getByText('Popover Content')).toBeInTheDocument();

    await user.click(screen.getByText('Outside'));

    // Content should be removed from document
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
  });

  it('supports controlled mode', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <Popover open={false} onOpenChange={onOpenChange}>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByText('Open');
    await user.click(trigger);

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('applies custom className to content', async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent className="custom-class">Content</PopoverContent>
      </Popover>
    );

    await user.click(screen.getByText('Open'));

    const content = screen.getByText('Content');
    expect(content).toHaveClass('custom-class');
  });

  it('renders with default alignment', async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );

    await user.click(screen.getByText('Open'));

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders with custom alignment', async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent align="start">Content</PopoverContent>
      </Popover>
    );

    await user.click(screen.getByText('Open'));

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('supports asChild on trigger', async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger asChild>
          <button type="button">Custom Button</button>
        </PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );

    await user.click(screen.getByText('Custom Button'));

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});

/* THE THREE VARIANTS (Pranjal, 2026-10-29) */
const act = (label: string, onSelect: () => void = vi.fn()): PopoverAction => ({
  label,
  icon: <svg data-testid={`icon-${label}`} />,
  onSelect,
});

const openMenu = async (groups: PopoverAction[][], danger?: PopoverAction) => {
  const user = userEvent.setup();
  render(
    <Popover variant="action-menu">
      <PopoverTrigger>More</PopoverTrigger>
      <PopoverActionMenu groups={groups} {...(danger ? { danger } : {})} />
    </Popover>
  );
  await user.click(screen.getByRole('button', { name: 'More' }));
  const menu = screen.getByRole('menu');
  /* the menu's children in order: items and separators */
  const order = Array.from(menu.querySelectorAll('[role="menuitem"], [role="separator"]')).map((el) =>
    el.getAttribute('role') === 'separator' ? '—' : (el.textContent ?? '')
  );
  return { user, menu, order };
};

describe('Popover variant="card"', () => {
  it('is the empty card: a dialog-style surface holding whatever is put in it', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Anything</PopoverContent>
      </Popover>
    );
    await user.click(screen.getByText('Open'));
    const card = screen.getByRole('dialog');
    expect(card).toHaveTextContent('Anything');
    expect(card).toHaveAttribute('data-surface', 'overlay');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});

describe('Popover variant="action-menu"', () => {
  it('opens as a menu, every item a menu item with its icon', async () => {
    const { menu } = await openMenu([[act('Edit details'), act('Disable user')]]);
    expect(menu).toHaveAttribute('data-popover-variant', 'action-menu');
    expect(screen.getAllByRole('menuitem')).toHaveLength(2);
    expect(screen.getByTestId('icon-Edit details')).toBeInTheDocument();
  });

  it('puts the red action last, under a divider', async () => {
    const { order } = await openMenu([[act('Edit details'), act('Disable user')]], act('Delete user'));
    expect(order).toEqual(['Edit details', 'Disable user', '—', 'Delete user']);
    expect(screen.getByRole('menuitem', { name: 'Delete user' })).toHaveAttribute('data-variant', 'destructive');
  });

  it('draws a divider between groups - as many as there are groups - and still one before the red action', async () => {
    const { order } = await openMenu(
      [
        [act('Edit'), act('Duplicate')],
        [act('Export'), act('Copy link')],
      ],
      act('Delete')
    );
    expect(order).toEqual(['Edit', 'Duplicate', '—', 'Export', 'Copy link', '—', 'Delete']);
  });

  it('draws no divider when there is one group and no red action', async () => {
    const { order } = await openMenu([[act('Edit'), act('Resend')]]);
    expect(order).toEqual(['Edit', 'Resend']);
  });

  it('drops an empty group with its divider', async () => {
    const { order } = await openMenu([[act('Edit')], [], [act('Export')]]);
    expect(order).toEqual(['Edit', '—', 'Export']);
  });

  it('only one action is red', async () => {
    await openMenu([[act('Edit'), act('Disable')]], act('Delete'));
    const red = screen
      .getAllByRole('menuitem')
      .filter((el) => el.getAttribute('data-variant') === 'destructive');
    expect(red).toHaveLength(1);
  });

  it('takes the trailing ellipsis off a label', async () => {
    await openMenu([[act('Move to team…'), act('Rename...')]]);
    expect(screen.getByRole('menuitem', { name: 'Move to team' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Rename' })).toBeInTheDocument();
  });

  it('runs the action on select', async () => {
    const onSelect = vi.fn();
    const { user } = await openMenu([[act('Edit', onSelect)]]);
    await user.click(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('is at least 224 wide, a floor', async () => {
    const { menu } = await openMenu([[act('Edit')]]);
    expect(menu).toHaveClass('mdt-min-w-56');
  });
});

describe('Popover variant="quick-filter"', () => {
  const OPTIONS = [
    { value: 'active', label: 'Active' },
    { value: 'invited', label: 'Invited' },
    { value: 'disabled', label: 'Disabled' },
  ];
  const openFilter = async (value: string[], onValueChange = vi.fn(), searchable = false) => {
    const user = userEvent.setup();
    render(
      <Popover variant="quick-filter">
        <PopoverTrigger>Status</PopoverTrigger>
        <PopoverQuickFilter
          heading="Filter by status"
          options={OPTIONS}
          value={value}
          onValueChange={onValueChange}
          searchable={searchable}
        />
      </Popover>
    );
    await user.click(screen.getByRole('button', { name: 'Status' }));
    return { user, onValueChange };
  };

  it('opens as a menu of checkbox rows under the heading', async () => {
    await openFilter(['active']);
    expect(screen.getByRole('menu')).toHaveAttribute('data-popover-variant', 'quick-filter');
    expect(screen.getByText('Filter by status')).toBeInTheDocument();
    const rows = screen.getAllByRole('menuitemcheckbox');
    expect(rows).toHaveLength(3);
    expect(rows[0]).toHaveAttribute('aria-checked', 'true');
    expect(rows[1]).toHaveAttribute('aria-checked', 'false');
  });

  it('adds and removes a value, and a tick does not close it', async () => {
    const { user, onValueChange } = await openFilter(['active']);
    await user.click(screen.getByRole('menuitemcheckbox', { name: 'Invited' }));
    expect(onValueChange).toHaveBeenLastCalledWith(['active', 'invited']);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    await user.click(screen.getByRole('menuitemcheckbox', { name: 'Active' }));
    expect(onValueChange).toHaveBeenLastCalledWith([]);
  });

  it('puts the cursor in the search box on open', async () => {
    await openFilter([], vi.fn(), true);
    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: 'Search Filter by status' })).toHaveFocus();
    });
  });

  it('searches the values and says when nothing matches', async () => {
    const { user } = await openFilter([], vi.fn(), true);
    const box = screen.getByRole('textbox', { name: 'Search Filter by status' });
    await user.type(box, 'inv');
    expect(screen.getAllByRole('menuitemcheckbox')).toHaveLength(1);
    await user.clear(box);
    await user.type(box, 'zzz');
    expect(screen.getByText('No matches')).toBeInTheDocument();
  });
});
