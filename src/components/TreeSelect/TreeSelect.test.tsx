import { vi } from 'vitest';
import { useState } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TreeSelect } from './TreeSelect';
import type { TreeSelectGroup, TreeSelectProps } from './TreeSelect.types';

const leaves = (id: string, letters: string) =>
  letters.split('').map((c) => ({ id: id + c, label: id + c }));

const GROUPS: TreeSelectGroup[] = [
  {
    id: 'am',
    label: 'Americas',
    items: [
      {
        id: 'us-east-1',
        label: 'US East (N. Virginia)',
        description: 'us-east-1',
        code: 'us-east-1',
        children: leaves('us-east-1', 'abc'),
      },
      {
        id: 'us-west-1',
        label: 'US West (N. California)',
        description: 'us-west-1',
        code: 'us-west-1',
        children: leaves('us-west-1', 'ac'),
      },
    ],
  },
  {
    id: 'eu',
    label: 'Europe',
    icon: <span data-testid="globe" />,
    items: [
      {
        id: 'eu-west-1',
        label: 'Europe (Ireland)',
        description: 'eu-west-1',
        code: 'eu-west-1',
        children: leaves('eu-west-1', 'abc'),
      },
      { id: 'eu-flat', label: 'Europe (Flat)', description: 'eu-flat' },
    ],
  },
];

const NOUNS = {
  item: ['region', 'regions'] as [string, string],
  child: ['zone', 'zones'] as [string, string],
};

type HarnessProps = Partial<Omit<TreeSelectProps, 'value' | 'onChange'>> & {
  initial?: string[];
  onChange?: (value: string[]) => void;
};

/** The field with its own state, so a run of picks reads back the way a form would see it. */
function Harness({ initial = [], onChange, ...props }: HarnessProps) {
  const [value, setValue] = useState<string[]>(initial);
  return (
    <TreeSelect
      groups={GROUPS}
      value={value}
      onChange={(next) => {
        setValue(next);
        onChange?.(next);
      }}
      placeholder="Select region(s)…"
      nouns={NOUNS}
      {...props}
    />
  );
}

const field = () => screen.getByRole('button', { name: /select region|us-|eu-/i });

describe('TreeSelect', () => {
  it('shows the placeholder, then the picks as code chips, "k/N" on a narrowed one, "+N more" past maxPills', () => {
    const { unmount } = render(<Harness />);
    expect(screen.getByText('Select region(s)…')).toHaveClass('mdt-text-faint');
    unmount();

    render(<Harness initial={['us-east-1', 'us-west-1a', 'eu-west-1']} maxPills={2} />);
    const whole = screen.getByText('us-east-1');
    expect(whole).toHaveClass('mdt-font-mono');
    expect(whole.parentElement).not.toHaveTextContent('/');
    const narrowed = screen.getByText('us-west-1');
    expect(narrowed.parentElement).toHaveTextContent('us-west-1 1/2');
    expect(narrowed.parentElement?.querySelector('.mdt-text-blue-60')).toHaveTextContent('1/2');
    expect(screen.queryByText('eu-west-1')).not.toBeInTheDocument();
    expect(screen.getByText('+1 more')).toHaveClass('mdt-text-faint');
  });

  it('opens a list with every group folded but the one holding a pick, and counts the pick', async () => {
    const user = userEvent.setup();
    render(<Harness initial={['eu-west-1']} />);
    await user.click(field());

    const tree = await screen.findByRole('tree', { name: 'regions' });
    expect(within(tree).getByRole('treeitem', { name: 'Americas' })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
    expect(within(tree).getByRole('treeitem', { name: 'Europe' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    expect(within(tree).getByText('Europe (Ireland)')).toBeInTheDocument();
    expect(within(tree).queryByText('US East (N. Virginia)')).not.toBeInTheDocument();
    expect(screen.getByTestId('globe')).toBeInTheDocument();
    expect(screen.getByText('1 region · 3 zones')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear all' })).toBeInTheDocument();
    expect(within(tree).getByText('1/2')).toBeInTheDocument();
    expect(within(tree).getByText('0/2')).toHaveClass('mdt-font-mono');
    expect(screen.getByRole('checkbox', { name: 'All Europe regions' })).toHaveAttribute(
      'data-state',
      'indeterminate'
    );
  });

  it('folds a group by its chevron or its words, and an item by its chevron; the counts name the leaves', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(field());
    await screen.findByRole('tree');

    expect(screen.getByText('No regions selected')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Clear all' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Expand Americas' }));
    expect(screen.getByText('US East (N. Virginia)')).toHaveClass('mdt-text-neutral-130');
    expect(screen.getByText('3 zones')).toHaveClass('mdt-text-faint');
    expect(screen.getByText('2 zones')).toBeInTheDocument();
    expect(screen.queryByText('us-east-1a')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Expand US East (N. Virginia)' }));
    expect(screen.getByRole('treeitem', { name: 'US East (N. Virginia)' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    expect(screen.getByText('us-east-1a')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Collapse US East (N. Virginia)' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );

    await user.click(screen.getByRole('button', { name: 'Americas' }));
    expect(screen.getByRole('treeitem', { name: 'Americas' })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
    expect(screen.queryByText('US East (N. Virginia)')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Expand Europe' }));
    expect(screen.getByText('no zones')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Expand Europe (Flat)' })).not.toBeInTheDocument();
  });

  it('picks an item whole by its box or its words, and unpicks it with its leaves', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Harness initial={['us-west-1a']} onChange={onChange} />);
    await user.click(field());
    await screen.findByRole('tree');

    await user.click(screen.getByRole('checkbox', { name: 'US East (N. Virginia)' }));
    expect(onChange).toHaveBeenLastCalledWith(['us-west-1a', 'us-east-1']);
    expect(screen.getByText('2 regions · 4 zones')).toBeInTheDocument();

    await user.click(screen.getByText('US West (N. California)'));
    expect(onChange).toHaveBeenLastCalledWith(['us-east-1']);

    await user.click(screen.getByRole('checkbox', { name: 'US East (N. Virginia)' }));
    expect(onChange).toHaveBeenLastCalledWith([]);
  });

  it('narrows an item to the leaves ticked, collapses back to the whole, and drops it on the last leaf', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);
    await user.click(field());
    await screen.findByRole('tree');
    await user.click(screen.getByRole('button', { name: 'Expand Americas' }));
    await user.click(screen.getByRole('button', { name: 'Expand US East (N. Virginia)' }));

    await user.click(screen.getByRole('checkbox', { name: 'US East (N. Virginia) us-east-1a' }));
    expect(onChange).toHaveBeenLastCalledWith(['us-east-1a']);
    expect(screen.getByText('1/3 zones')).toHaveClass('mdt-text-blue-60');
    expect(screen.getByRole('checkbox', { name: 'US East (N. Virginia)' })).toHaveAttribute(
      'data-state',
      'checked'
    );

    await user.click(screen.getByRole('button', { name: 'us-east-1b' }));
    expect(onChange).toHaveBeenLastCalledWith(['us-east-1a', 'us-east-1b']);

    await user.click(screen.getByRole('checkbox', { name: 'US East (N. Virginia) us-east-1c' }));
    expect(onChange).toHaveBeenLastCalledWith(['us-east-1']);
    expect(screen.getByText('3 zones')).toHaveClass('mdt-text-faint');

    await user.click(screen.getByRole('checkbox', { name: 'US East (N. Virginia) us-east-1a' }));
    expect(onChange).toHaveBeenLastCalledWith(['us-east-1b', 'us-east-1c']);

    await user.click(screen.getByRole('checkbox', { name: 'US East (N. Virginia) us-east-1b' }));
    await user.click(screen.getByRole('checkbox', { name: 'US East (N. Virginia) us-east-1c' }));
    expect(onChange).toHaveBeenLastCalledWith([]);
    expect(screen.getByText('No regions selected')).toBeInTheDocument();
  });

  it("a group's checkbox picks every item under it that is not, or clears them all", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Harness initial={['us-east-1b']} onChange={onChange} />);
    await user.click(field());
    await screen.findByRole('tree');

    const all = screen.getByRole('checkbox', { name: 'All Americas regions' });
    expect(all).toHaveAttribute('data-state', 'indeterminate');
    await user.click(all);
    expect(onChange).toHaveBeenLastCalledWith(['us-east-1b', 'us-west-1']);
    expect(all).toHaveAttribute('data-state', 'checked');
    expect(screen.getByText('2/2')).toBeInTheDocument();

    await user.click(all);
    expect(onChange).toHaveBeenLastCalledWith([]);
    expect(all).toHaveAttribute('data-state', 'unchecked');
  });

  it('search narrows the tree and opens every group still holding a match, or says nothing matches', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(field());
    const search = await screen.findByRole('textbox', { name: 'Search regions' });

    await user.type(search, 'ire');
    expect(screen.getByText('Europe (Ireland)')).toBeInTheDocument();
    expect(screen.queryByRole('treeitem', { name: 'Americas' })).not.toBeInTheDocument();
    expect(screen.queryByText('Europe (Flat)')).not.toBeInTheDocument();

    await user.clear(search);
    await user.type(search, 'us-west');
    expect(screen.getByText('US West (N. California)')).toBeInTheDocument();
    expect(screen.queryByText('US East (N. Virginia)')).not.toBeInTheDocument();

    /* a leaf's own name finds its item, and opens it so the leaf shows */
    await user.clear(search);
    await user.type(search, 'us-east-1b');
    expect(screen.getByText('US East (N. Virginia)')).toBeInTheDocument();
    expect(screen.queryByText('US West (N. California)')).not.toBeInTheDocument();
    expect(screen.getByText('us-east-1b')).toBeInTheDocument();

    await user.clear(search);
    await user.type(search, 'zzz');
    expect(screen.getByText('No regions match “zzz”.')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(search).toHaveValue('');
    expect(screen.getByRole('treeitem', { name: 'Americas' })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  it('Clear all empties the pick, and reopening starts the search afresh', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Harness initial={['eu-west-1']} onChange={onChange} />);
    await user.click(field());
    const search = await screen.findByRole('textbox', { name: 'Search regions' });
    await user.type(search, 'eu');

    await user.click(screen.getByRole('button', { name: 'Clear all' }));
    expect(onChange).toHaveBeenLastCalledWith([]);

    await user.keyboard('{Escape}');
    await user.click(field());
    expect(await screen.findByRole('textbox', { name: 'Search regions' })).toHaveValue('');
  });

  it('wears a label, the required mark, an error and a held state', () => {
    render(
      <Harness label="Region(s)" required error="Pick at least one region." disabled id="regions" />
    );
    expect(screen.getByText('Region(s)')).toHaveAttribute('for', 'regions');
    expect(screen.getByText('*')).toHaveClass('mdt-text-destructive');
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Pick at least one region.');
    const trigger = screen.getByRole('button', { name: /Region/ });
    expect(trigger).toBeDisabled();
    expect(trigger).toHaveAttribute('aria-describedby', alert.id);
    expect(trigger).toHaveClass('mdt-border-destructive');
  });

  it('counts in its own words when none are given', async () => {
    const user = userEvent.setup();
    render(<TreeSelect groups={GROUPS} value={['us-east-1']} onChange={() => undefined} />);
    await user.click(screen.getByRole('button', { name: /us-east-1/ }));
    expect(await screen.findByRole('tree', { name: 'items' })).toBeInTheDocument();
    expect(screen.getByText('1 item · 3 sub-items')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'All Americas items' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Search items' })).toHaveAttribute(
      'placeholder',
      'Search…'
    );
  });

  it('says what the caller wants while nothing is picked', async () => {
    const user = userEvent.setup();
    render(
      <Harness emptyText="No regions selected — the crawl covers nothing until you pick one" />
    );
    await user.click(field());
    expect(
      await screen.findByText('No regions selected — the crawl covers nothing until you pick one')
    ).toHaveClass('mdt-text-faint');
  });
});
