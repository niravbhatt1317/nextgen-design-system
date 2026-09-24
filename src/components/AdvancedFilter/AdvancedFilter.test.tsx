import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
  AdvancedFilter,
  EMPTY_FILTER,
  OPERATORS,
  applyAdvanced,
  countConditions,
  isComplete,
  isGroup,
  liveItems,
  matchRow,
} from './AdvancedFilter';
import type { FilterGroup, FilterKey, FilterRow, FilterValue } from './AdvancedFilter.types';

interface User {
  name: string;
  role: string;
  note?: string | null;
  joined: string;
}

const KEYS: FilterKey<User>[] = [
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'role', label: 'Role', type: 'pick', options: ['Admin', 'Member'] },
  { id: 'note', label: 'Note', type: 'text' },
  { id: 'joined', label: 'Joined', type: 'date' },
];

const USERS: User[] = [
  { name: 'Sarah Johnson', role: 'Admin', note: 'on call', joined: '2026-01-10' },
  { name: 'Michael Smith', role: 'Member', note: '', joined: '2026-06-01' },
  { name: 'Priya Natarajan', role: 'Member', note: null, joined: '2026-09-20' },
];

const row = (key: string, op: string, value: unknown = null): FilterRow => ({ key, op, value });
const group = (join: 'and' | 'or', rows: FilterRow[]): FilterGroup => ({ group: true, join, rows });
const filter = (join: 'and' | 'or', rows: FilterValue['rows']): FilterValue => ({ join, rows });

describe('the filter vocabulary', () => {
  it('offers operators for each kind of key, and only ones that kind can answer', () => {
    expect(OPERATORS.text.map(([id]) => id)).toContain('contains');
    expect(OPERATORS.pick.map(([id]) => id)).not.toContain('contains');
    expect(OPERATORS.date.map(([id]) => id)).toContain('within');
  });

  it('starts empty, joined by and', () => {
    expect(EMPTY_FILTER).toEqual({ join: 'and', rows: [] });
  });
});

describe('isGroup', () => {
  it('tells a group from a row, and copes with nothing', () => {
    expect(isGroup(group('and', []))).toBe(true);
    expect(isGroup(row('name', 'is', 'x'))).toBe(false);
    expect(isGroup(undefined)).toBe(false);
  });
});

describe('isComplete', () => {
  it('wants a key, an operator and a value', () => {
    expect(isComplete(row('name', 'is', 'Sarah'))).toBe(true);
    expect(isComplete({ key: null, op: 'is', value: 'Sarah' })).toBe(false);
    expect(isComplete({ key: 'name', op: null, value: 'Sarah' })).toBe(false);
    expect(isComplete(row('name', 'is', ''))).toBe(false);
  });

  it('asks for no value from an operator that needs none', () => {
    expect(isComplete(row('note', 'empty'))).toBe(true);
    expect(isComplete(row('note', 'notempty'))).toBe(true);
  });

  it('counts a picked list as a value only when something is picked', () => {
    expect(isComplete(row('role', 'is', ['Admin']))).toBe(true);
    expect(isComplete(row('role', 'is', []))).toBe(false);
  });

  it('treats whitespace as no value', () => {
    expect(isComplete(row('name', 'is', '   '))).toBe(false);
  });

  it('a group is complete when every row in it is, and never when it is empty', () => {
    expect(isComplete(group('and', [row('name', 'is', 'Sarah')]))).toBe(true);
    expect(isComplete(group('and', [row('name', 'is', 'Sarah'), row('role', 'is', [])]))).toBe(
      false
    );
    expect(isComplete(group('and', []))).toBe(false);
  });

  it('copes with nothing', () => {
    expect(isComplete(undefined)).toBe(false);
  });
});

describe('liveItems and countConditions', () => {
  it('drops half-built rows and keeps the finished ones', () => {
    const v = filter('and', [row('name', 'is', 'Sarah'), { key: null, op: null, value: null }]);
    expect(liveItems(v)).toHaveLength(1);
    expect(countConditions(v)).toBe(1);
  });

  it('keeps a group by its finished rows alone', () => {
    const v = filter('and', [
      group('or', [row('role', 'is', ['Admin']), { key: null, op: null, value: null }]),
    ]);
    const live = liveItems(v);
    expect(live).toHaveLength(1);
    expect(isGroup(live[0]) && live[0].rows).toHaveLength(1);
  });

  it('drops a group with nothing finished in it', () => {
    const v = filter('and', [group('and', [{ key: null, op: null, value: null }])]);
    expect(liveItems(v)).toHaveLength(0);
    expect(countConditions(v)).toBe(0);
  });

  it('counts a group row for row, not as one', () => {
    const v = filter('and', [group('and', [row('name', 'is', 'a'), row('role', 'is', ['Admin'])])]);
    expect(countConditions(v)).toBe(2);
  });

  it('copes with nothing', () => {
    expect(liveItems(undefined)).toEqual([]);
    expect(countConditions(undefined)).toBe(0);
  });
});

describe('matchRow — text', () => {
  const sarah = USERS[0] as User;

  it('matches is and is not, without regard to case', () => {
    expect(matchRow(sarah, row('name', 'is', 'sarah johnson'), KEYS)).toBe(true);
    expect(matchRow(sarah, row('name', 'isnot', 'sarah johnson'), KEYS)).toBe(false);
    expect(matchRow(sarah, row('name', 'isnot', 'someone else'), KEYS)).toBe(true);
  });

  it('matches contains and starts with', () => {
    expect(matchRow(sarah, row('name', 'contains', 'john'), KEYS)).toBe(true);
    expect(matchRow(sarah, row('name', 'starts', 'Sarah'), KEYS)).toBe(true);
    expect(matchRow(sarah, row('name', 'starts', 'Johnson'), KEYS)).toBe(false);
  });

  it('answers empty and is not empty, counting null and "" alike', () => {
    const blank = USERS[1] as User;
    const missing = USERS[2] as User;
    expect(matchRow(blank, row('note', 'empty'), KEYS)).toBe(true);
    expect(matchRow(missing, row('note', 'empty'), KEYS)).toBe(true);
    expect(matchRow(sarah, row('note', 'empty'), KEYS)).toBe(false);
    expect(matchRow(sarah, row('note', 'notempty'), KEYS)).toBe(true);
  });

  it('lets a row through when the key is unknown or the operator missing', () => {
    expect(matchRow(sarah, row('nope', 'is', 'x'), KEYS)).toBe(true);
    expect(matchRow(sarah, { key: 'name', op: null, value: 'x' }, KEYS)).toBe(true);
  });

  it('reads through `get` when the key says to', () => {
    const keys: FilterKey<User>[] = [
      { id: 'initial', label: 'Initial', type: 'text', get: (u) => u.name.charAt(0) },
    ];
    expect(matchRow(sarah, row('initial', 'is', 'S'), keys)).toBe(true);
  });

  it('never stringifies an object into a match', () => {
    const keys: FilterKey<User>[] = [
      { id: 'thing', label: 'Thing', type: 'text', get: () => ({ a: 1 }) },
    ];
    expect(matchRow(sarah, row('thing', 'empty'), keys)).toBe(true);
  });
});

describe('matchRow — a key with a list of options', () => {
  const member = USERS[1] as User;

  it('is: any of the picked values', () => {
    expect(matchRow(member, row('role', 'is', ['Admin', 'Member']), KEYS)).toBe(true);
    expect(matchRow(member, row('role', 'is', ['Admin']), KEYS)).toBe(false);
  });

  it('is not: none of them', () => {
    expect(matchRow(member, row('role', 'isnot', ['Admin']), KEYS)).toBe(true);
    expect(matchRow(member, row('role', 'isnot', ['Member']), KEYS)).toBe(false);
  });

  it('takes a single value as well as a list', () => {
    expect(matchRow(member, row('role', 'is', 'Member'), KEYS)).toBe(true);
  });
});

describe('matchRow — dates', () => {
  const NOW = new Date('2026-09-24T12:00:00Z');
  const joined = (d: string): User => ({ name: 'x', role: 'Member', joined: d });

  it('matches on, before and after by the day, not the hour', () => {
    /* Midday both sides: `dayStart` reads local components, so a value near
     * midnight UTC lands on a different day depending on the machine. */
    const u = joined('2026-06-01T12:30:00Z');
    expect(matchRow(u, row('joined', 'on', '2026-06-01T09:00:00Z'), KEYS, NOW)).toBe(true);
    expect(matchRow(u, row('joined', 'before', '2026-07-01'), KEYS, NOW)).toBe(true);
    expect(matchRow(u, row('joined', 'after', '2026-07-01'), KEYS, NOW)).toBe(false);
  });

  it('within the last N days', () => {
    expect(matchRow(joined('2026-09-20'), row('joined', 'within', '7'), KEYS, NOW)).toBe(true);
    expect(matchRow(joined('2026-01-10'), row('joined', 'within', '7'), KEYS, NOW)).toBe(false);
  });

  it('turns away a row whose date cannot be read', () => {
    expect(matchRow(joined('not a date'), row('joined', 'on', '2026-06-01'), KEYS, NOW)).toBe(
      false
    );
  });

  it('lets the row through while the date being compared to is still unset', () => {
    expect(matchRow(joined('2026-06-01'), row('joined', 'on', null), KEYS, NOW)).toBe(true);
  });

  it('answers empty before it tries to read a date', () => {
    expect(matchRow(joined(''), row('joined', 'empty'), KEYS, NOW)).toBe(true);
  });
});

describe('applyAdvanced', () => {
  it('returns the list whole when nothing is applied', () => {
    expect(applyAdvanced(USERS, undefined, KEYS)).toHaveLength(3);
    expect(applyAdvanced(USERS, EMPTY_FILTER, KEYS)).toHaveLength(3);
  });

  it('returns it whole when every row is still half-built', () => {
    const v = filter('and', [{ key: 'name', op: null, value: null }]);
    expect(applyAdvanced(USERS, v, KEYS)).toHaveLength(3);
  });

  it('and: a row must answer every condition', () => {
    const v = filter('and', [row('role', 'is', ['Member']), row('name', 'contains', 'smith')]);
    expect(applyAdvanced(USERS, v, KEYS).map((u) => u.name)).toEqual(['Michael Smith']);
  });

  it('or: a row need answer only one', () => {
    const v = filter('or', [
      row('name', 'is', 'Sarah Johnson'),
      row('name', 'is', 'Michael Smith'),
    ]);
    expect(applyAdvanced(USERS, v, KEYS)).toHaveLength(2);
  });

  it('a group answers by its own join, inside the outer one', () => {
    const v = filter('and', [
      row('role', 'is', ['Member']),
      group('or', [row('name', 'contains', 'smith'), row('name', 'contains', 'natarajan')]),
    ]);
    expect(applyAdvanced(USERS, v, KEYS)).toHaveLength(2);
  });

  it('an and-group inside asks for both', () => {
    const v = filter('and', [
      group('and', [row('role', 'is', ['Member']), row('name', 'contains', 'smith')]),
    ]);
    expect(applyAdvanced(USERS, v, KEYS).map((u) => u.name)).toEqual(['Michael Smith']);
  });

  it('ignores a half-built row sitting beside a finished one', () => {
    const v = filter('and', [
      row('role', 'is', ['Member']),
      { key: 'name', op: 'contains', value: '' },
    ]);
    expect(applyAdvanced(USERS, v, KEYS)).toHaveLength(2);
  });
});

describe('the panel', () => {
  const panel = (props: Partial<React.ComponentProps<typeof AdvancedFilter<User>>> = {}) => {
    const onApply = vi.fn();
    const onClose = vi.fn();
    const view = render(
      <AdvancedFilter<User> open keys={KEYS} onApply={onApply} onClose={onClose} {...props} />
    );
    return { ...view, onApply, onClose, user: userEvent.setup() };
  };

  it('is a named dialog, titled Filters unless told otherwise', () => {
    panel();
    expect(screen.getByRole('dialog', { name: 'Filters' })).toBeInTheDocument();
  });

  it('takes the title the page gives it', () => {
    panel({ title: 'Advanced' });
    expect(screen.getByRole('dialog', { name: 'Advanced' })).toBeInTheDocument();
  });

  it('renders nothing while closed', () => {
    panel({ open: false });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens on an empty row, ready to be filled', () => {
    panel();
    expect(screen.getByText('Select key')).toBeInTheDocument();
    expect(screen.getByText('Select operator')).toBeInTheDocument();
  });

  it('will not add a second row until the first is finished', () => {
    panel();
    expect(screen.getByRole('button', { name: /Add filter/ })).toBeDisabled();
  });

  it('adds one once it is', () => {
    panel({ value: filter('and', [row('name', 'is', 'Sarah')]) });
    expect(screen.getByRole('button', { name: /Add filter/ })).toBeEnabled();
  });

  it('applies what is built, and closes', async () => {
    const { onApply, onClose, user } = panel({
      value: filter('and', [row('name', 'is', 'Sarah')]),
    });
    await user.click(screen.getByRole('button', { name: /Apply/ }));
    expect(onApply).toHaveBeenCalledWith(
      expect.objectContaining({ join: 'and', rows: [expect.objectContaining({ key: 'name' })] })
    );
    expect(onClose).toHaveBeenCalled();
  });

  it('applies nothing but an empty filter on Clear all', async () => {
    const { onApply, user } = panel({ value: filter('and', [row('name', 'is', 'Sarah')]) });
    await user.click(screen.getByRole('button', { name: 'Clear all' }));
    expect(onApply).toHaveBeenCalledWith(EMPTY_FILTER);
  });

  it('starts every open from what is already applied', () => {
    panel({ value: filter('and', [row('name', 'is', 'Sarah')]) });
    expect(screen.getByDisplayValue('Sarah')).toBeInTheDocument();
  });

  it('drops a half-built row on the way out rather than applying it', async () => {
    const { onApply, user } = panel({
      value: filter('and', [row('name', 'is', 'Sarah'), { key: 'role', op: null, value: null }]),
    });
    await user.click(screen.getByRole('button', { name: /Apply/ }));
    expect((onApply.mock.calls[0]?.[0] as FilterValue).rows).toHaveLength(1);
  });

  it('gives an outer row its actions menu', () => {
    panel({ value: filter('and', [row('name', 'is', 'Sarah')]) });
    expect(screen.getByRole('button', { name: 'Filter actions' })).toBeInTheDocument();
  });

  it('gives a group its own actions, and its single row a clear', () => {
    panel({ value: filter('and', [group('and', [row('name', 'is', 'Sarah')])]) });
    expect(screen.getByRole('button', { name: 'Group actions' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear this filter' })).toBeInTheDocument();
  });

  it('a group of several offers to remove one rather than clear it', () => {
    panel({
      value: filter('and', [
        group('and', [row('name', 'is', 'Sarah'), row('role', 'is', ['Admin'])]),
      ]),
    });
    expect(screen.getAllByRole('button', { name: 'Remove this filter' })).toHaveLength(2);
  });

  it('takes the width the page asks for', () => {
    panel({ width: 500 });
    expect(screen.getByRole('dialog')).toHaveStyle({ width: '500px' });
  });

  it('takes extra classes', () => {
    panel({ className: 'custom-panel' });
    expect(screen.getByRole('dialog')).toHaveClass('custom-panel');
  });
});

describe('the panel — building a filter', () => {
  const open = (props: Partial<React.ComponentProps<typeof AdvancedFilter<User>>> = {}) => {
    const onApply = vi.fn();
    const onClose = vi.fn();
    render(
      <AdvancedFilter<User> open keys={KEYS} onApply={onApply} onClose={onClose} {...props} />
    );
    return { onApply, onClose, user: userEvent.setup() };
  };

  /** The row's fields are comboboxes in order: key, then operator. */
  const combos = () => screen.getAllByRole('combobox');
  const pick = async (user: ReturnType<typeof userEvent.setup>, which: number, label: string) => {
    await user.click(combos()[which] as HTMLElement);
    await user.click(await screen.findByText(label));
  };

  it('offers every key, and the operators that key can answer', async () => {
    const { user } = open();
    await user.click(combos()[0] as HTMLElement);
    expect(await screen.findByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Joined')).toBeInTheDocument();
    await user.click(screen.getByText('Name'));
    await user.click(combos()[1] as HTMLElement);
    expect(await screen.findByText('contains')).toBeInTheDocument();
  });

  it('offers a pick key only the operators it can answer', async () => {
    const { user } = open();
    await pick(user, 0, 'Role');
    await user.click(combos()[1] as HTMLElement);
    expect(await screen.findByText('is not')).toBeInTheDocument();
    expect(screen.queryByText('contains')).not.toBeInTheDocument();
  });

  it('takes a typed value and applies the finished row', async () => {
    const { onApply, user } = open();
    await pick(user, 0, 'Name');
    await pick(user, 1, 'contains');
    await user.type(screen.getByPlaceholderText('Type a value'), 'Sarah');
    await user.click(screen.getByRole('button', { name: /Apply/ }));
    expect(onApply).toHaveBeenCalledWith(
      expect.objectContaining({
        rows: [expect.objectContaining({ key: 'name', op: 'contains', value: 'Sarah' })],
      })
    );
  });

  it('asks for no value once the operator needs none', async () => {
    const { onApply, user } = open();
    await pick(user, 0, 'Note');
    await pick(user, 1, 'is empty');
    expect(screen.queryByPlaceholderText('Type a value')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Apply/ }));
    expect(onApply).toHaveBeenCalledWith(
      expect.objectContaining({ rows: [expect.objectContaining({ op: 'empty', value: null })] })
    );
  });

  it('offers a day field for a date key, and days for "within the last"', async () => {
    const { user } = open();
    await pick(user, 0, 'Joined');
    await pick(user, 1, 'within the last');
    expect(screen.getByPlaceholderText('Days')).toBeInTheDocument();
  });

  it('forgets the operator and value when the key changes', async () => {
    const { user } = open();
    await pick(user, 0, 'Name');
    await pick(user, 1, 'contains');
    await user.type(screen.getByPlaceholderText('Type a value'), 'Sarah');
    await pick(user, 0, 'Note');
    /* The typed value is the unambiguous signal: `contains` stays on screen as
     * an OPTION, because Note is a text key and answers the same list. */
    expect(screen.queryByDisplayValue('Sarah')).not.toBeInTheDocument();
  });

  it('adds a second row once the first is finished, and joins them', async () => {
    const { user } = open({ value: filter('and', [row('name', 'is', 'Sarah')]) });
    await user.click(screen.getByRole('button', { name: /Add filter/ }));
    expect(screen.getAllByText('Select key')).toHaveLength(1);
  });

  it('applies an empty filter when everything is cleared', async () => {
    const { onApply, user } = open({ value: filter('and', [row('name', 'is', 'Sarah')]) });
    await user.click(screen.getByRole('button', { name: 'Clear all' }));
    expect(onApply).toHaveBeenCalledWith(EMPTY_FILTER);
  });

  it('closes on Escape without applying', async () => {
    const { onApply, onClose, user } = open();
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
    expect(onApply).not.toHaveBeenCalled();
  });

  it('offers to group a row, or remove it, through its actions menu', async () => {
    const { user } = open({ value: filter('and', [row('name', 'is', 'Sarah')]) });
    await user.click(screen.getByRole('button', { name: 'Filter actions' }));
    expect(await screen.findByRole('menuitem', { name: 'Create group' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Remove' })).toBeInTheDocument();
  });

  it('turns a row into a group when asked', async () => {
    const { user } = open({ value: filter('and', [row('name', 'is', 'Sarah')]) });
    await user.click(screen.getByRole('button', { name: 'Filter actions' }));
    await user.click(await screen.findByRole('menuitem', { name: 'Create group' }));
    expect(screen.getByRole('button', { name: 'Group actions' })).toBeInTheDocument();
  });

  it('a group shows its own join between its rows', () => {
    open({
      value: filter('and', [
        group('or', [row('name', 'is', 'Sarah'), row('role', 'is', ['Admin'])]),
      ]),
    });
    expect(screen.getByRole('button', { name: 'Group actions' })).toBeInTheDocument();
  });
});

describe('the panel — groups', () => {
  const open = (value: FilterValue) => {
    const onApply = vi.fn();
    render(<AdvancedFilter<User> open keys={KEYS} value={value} onApply={onApply} />);
    return { onApply, user: userEvent.setup() };
  };

  const twoRowGroup = () =>
    filter('and', [group('and', [row('name', 'is', 'Sarah'), row('note', 'notempty')])]);

  const applied = (onApply: ReturnType<typeof vi.fn>) => onApply.mock.calls[0]?.[0] as FilterValue;

  it('edits a row inside a group without touching the others', async () => {
    const { onApply, user } = open(twoRowGroup());
    await user.clear(screen.getByDisplayValue('Sarah'));
    await user.type(screen.getByPlaceholderText('Type a value'), 'Michael');
    await user.click(screen.getByRole('button', { name: /Apply/ }));
    const g = applied(onApply).rows[0];
    expect(isGroup(g) && g.rows[0]?.value).toBe('Michael');
    expect(isGroup(g) && g.rows[1]?.op).toBe('notempty');
  });

  it('removes one row of several', async () => {
    const { onApply, user } = open(twoRowGroup());
    const [first] = screen.getAllByRole('button', { name: 'Remove this filter' });
    await user.click(first as HTMLElement);
    await user.click(screen.getByRole('button', { name: /Apply/ }));
    const g = applied(onApply).rows[0];
    expect(isGroup(g) && g.rows).toHaveLength(1);
  });

  it('clearing the only row leaves the group with a blank one, not nothing', async () => {
    const { onApply, user } = open(filter('and', [group('and', [row('name', 'is', 'Sarah')])]));
    await user.click(screen.getByRole('button', { name: 'Clear this filter' }));
    await user.click(screen.getByRole('button', { name: /Apply/ }));
    /* the blank row is not complete, so nothing survives to be applied */
    expect(applied(onApply).rows).toHaveLength(0);
    expect(screen.getByText('Select key')).toBeInTheDocument();
  });

  it('adds a row to the group', async () => {
    const { user } = open(twoRowGroup());
    /* the group's own Add filter comes first; the outer list's follows it */
    const [inGroup] = screen.getAllByRole('button', { name: /Add filter/ });
    await user.click(inGroup as HTMLElement);
    expect(screen.getByText('Select key')).toBeInTheDocument();
  });

  it('switches the group between And and Or', async () => {
    const { onApply, user } = open(twoRowGroup());
    await user.click(screen.getByRole('button', { name: 'And' }));
    await user.click(screen.getByRole('button', { name: /Apply/ }));
    const g = applied(onApply).rows[0];
    expect(isGroup(g) && g.join).toBe('or');
  });

  it('ungroups, putting its rows back in the outer list', async () => {
    const { onApply, user } = open(twoRowGroup());
    await user.click(screen.getByRole('button', { name: 'Group actions' }));
    await user.click(await screen.findByRole('menuitem', { name: 'Ungroup' }));
    await user.click(screen.getByRole('button', { name: /Apply/ }));
    const v = applied(onApply);
    expect(v.rows).toHaveLength(2);
    expect(v.rows.every((it) => !isGroup(it))).toBe(true);
  });

  it('removes the group outright', async () => {
    const { onApply, user } = open(twoRowGroup());
    await user.click(screen.getByRole('button', { name: 'Group actions' }));
    await user.click(await screen.findByRole('menuitem', { name: 'Remove group' }));
    await user.click(screen.getByRole('button', { name: /Apply/ }));
    expect(applied(onApply).rows).toHaveLength(0);
  });

  it('switches the outer list between And and Or', async () => {
    const { onApply, user } = open(
      filter('and', [row('name', 'is', 'Sarah'), row('note', 'notempty')])
    );
    await user.click(screen.getByRole('button', { name: 'And' }));
    await user.click(screen.getByRole('button', { name: /Apply/ }));
    expect(applied(onApply).join).toBe('or');
  });
});

describe('the panel — a key with a list of options', () => {
  const pickRow = (value: unknown) => filter('and', [{ key: 'role', op: 'is', value }]);

  const open = (value: unknown) => {
    const onApply = vi.fn();
    render(<AdvancedFilter<User> open keys={KEYS} value={pickRow(value)} onApply={onApply} />);
    return { onApply, user: userEvent.setup() };
  };

  it('shows each picked value as a pill you can take off', () => {
    open(['Admin']);
    expect(screen.getByRole('button', { name: 'Admin' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remove Admin' })).toBeInTheDocument();
  });

  it('takes one off, and applies what is left', async () => {
    const { onApply, user } = open(['Admin', 'Member']);
    await user.click(screen.getByRole('button', { name: 'Remove Admin' }));
    await user.click(screen.getByRole('button', { name: /Apply/ }));
    const r = (onApply.mock.calls[0]?.[0] as FilterValue).rows[0] as FilterRow;
    expect(r.value).toEqual(['Member']);
  });

  it('taking the last one off leaves the row unfinished, so nothing is applied', async () => {
    const { onApply, user } = open(['Admin']);
    await user.click(screen.getByRole('button', { name: 'Remove Admin' }));
    await user.click(screen.getByRole('button', { name: /Apply/ }));
    expect((onApply.mock.calls[0]?.[0] as FilterValue).rows).toHaveLength(0);
  });
});
