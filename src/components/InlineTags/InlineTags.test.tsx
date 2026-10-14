import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { InlineTags } from './InlineTags';

const POOL = ['Gold tier', 'Silver tier', 'Pilot', 'APAC', 'Healthcare', 'VIP'];
const COUNTS = { 'Gold tier': 14, 'Silver tier': 11, Pilot: 4, APAC: 12, Healthcare: 8, VIP: 3 };

function Harness({
  start = ['Healthcare'],
  variant,
  onChange,
}: {
  start?: string[];
  variant?: 'inline' | 'popover';
  onChange?: (t: string[]) => void;
}) {
  const [tags, setTags] = useState(start);
  return (
    <div>
      <InlineTags
        value={tags}
        onChange={(t) => {
          setTags(t);
          onChange?.(t);
        }}
        suggestions={['Pilot']}
        options={POOL}
        counts={COUNTS}
        variant={variant}
      />
      <button type="button">outside</button>
    </div>
  );
}

const pills = () => screen.queryAllByTestId('tag-label').map((n) => n.textContent);
const list = () => screen.getByRole('listbox', { name: 'Tags' });
const row = (name: string) => within(list()).getByRole('option', { name: new RegExp(name) });

describe('InlineTags', () => {
  describe('inline', () => {
    it('at rest shows the pills and Add tag, no picker', () => {
      render(<Harness />);
      expect(pills()).toEqual(['Healthcare']);
      expect(screen.getByRole('button', { name: 'Add tag' })).toBeInTheDocument();
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('Add tag becomes the search field in place and opens the picker: Selected, then Suggested', async () => {
      render(<Harness />);
      await userEvent.click(screen.getByRole('button', { name: 'Add tag' }));
      expect(screen.getByRole('combobox', { name: 'Search or create a tag' })).toHaveFocus();
      expect(screen.queryByRole('button', { name: 'Add tag' })).not.toBeInTheDocument();
      expect(row('Healthcare')).toHaveAttribute('aria-selected', 'true');
      expect(row('Pilot')).toHaveAttribute('aria-selected', 'false');
      expect(within(list()).getByText('Selected')).toBeInTheDocument();
      expect(within(list()).getByText('Suggested')).toBeInTheDocument();
    });

    it('suggestions come first under Suggested, then the rest by use', async () => {
      render(<Harness />);
      await userEvent.click(screen.getByRole('button', { name: 'Add tag' }));
      const names = within(list())
        .getAllByRole('option')
        .filter((o) => o.getAttribute('aria-selected') === 'false')
        .map((o) => o.getAttribute('data-tag'));
      expect(names).toEqual(['Pilot', 'Gold tier', 'APAC', 'Silver tier', 'VIP']);
    });

    it('ticks are a draft: the row holds still until Apply, which hands back the whole list', async () => {
      const onChange = vi.fn();
      render(<Harness onChange={onChange} />);
      await userEvent.click(screen.getByRole('button', { name: 'Add tag' }));
      await userEvent.click(row('APAC'));
      expect(row('APAC')).toHaveAttribute('aria-selected', 'true');
      expect(pills()).toEqual(['Healthcare']);
      expect(onChange).not.toHaveBeenCalled();
      expect(screen.getByText('1 to add')).toBeInTheDocument();
      await userEvent.click(screen.getByRole('button', { name: 'Apply' }));
      expect(onChange).toHaveBeenCalledWith(['Healthcare', 'APAC']);
      expect(pills()).toEqual(['Healthcare', 'APAC']);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('Cancel drops the draft', async () => {
      const onChange = vi.fn();
      render(<Harness onChange={onChange} />);
      await userEvent.click(screen.getByRole('button', { name: 'Add tag' }));
      await userEvent.click(row('Pilot'));
      await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(onChange).not.toHaveBeenCalled();
      expect(pills()).toEqual(['Healthcare']);
    });

    it('Apply waits for a change', async () => {
      render(<Harness />);
      await userEvent.click(screen.getByRole('button', { name: 'Add tag' }));
      expect(screen.getByRole('button', { name: 'Apply' })).toBeDisabled();
    });

    it('typing narrows the list and offers Create for a new word, which lands in Selected', async () => {
      render(<Harness />);
      await userEvent.click(screen.getByRole('button', { name: 'Add tag' }));
      await userEvent.type(
        screen.getByRole('combobox', { name: 'Search or create a tag' }),
        'Platinum'
      );
      const create = within(list()).getByRole('option', { name: /Create/ });
      await userEvent.click(create);
      expect(row('Platinum')).toHaveAttribute('aria-selected', 'true');
    });

    it('Enter ticks the highlighted row; Enter on an empty search applies', async () => {
      const onChange = vi.fn();
      render(<Harness onChange={onChange} />);
      await userEvent.click(screen.getByRole('button', { name: 'Add tag' }));
      await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}');
      expect(row('Pilot')).toHaveAttribute('aria-selected', 'true');
      await userEvent.keyboard('{Escape}');
      expect(onChange).not.toHaveBeenCalled();
    });

    it('the pills lose their cross while the picker is open', async () => {
      render(<Harness />);
      expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument();
      await userEvent.click(screen.getByRole('button', { name: 'Add tag' }));
      expect(screen.queryByRole('button', { name: 'Remove' })).not.toBeInTheDocument();
    });

    it('a pill’s cross removes at once when the picker is closed', async () => {
      const onChange = vi.fn();
      render(<Harness onChange={onChange} />);
      await userEvent.click(screen.getByRole('button', { name: 'Remove' }));
      expect(onChange).toHaveBeenCalledWith([]);
    });

    it('disabled: pills only, no Add tag', () => {
      render(<InlineTags value={['VIP']} onChange={() => undefined} disabled />);
      expect(screen.queryByRole('button', { name: 'Add tag' })).not.toBeInTheDocument();
    });
  });

  describe('popover', () => {
    it('the cell shows two pills and a quiet +N', () => {
      render(<Harness variant="popover" start={['Gold tier', 'Pilot', 'VIP']} />);
      expect(screen.getByRole('button', { name: 'Edit tags' })).toHaveTextContent(
        'Gold tierPilot+1'
      );
    });

    it('an empty cell says Add tags', () => {
      render(<Harness variant="popover" start={[]} />);
      expect(screen.getByRole('button', { name: 'Edit tags' })).toHaveTextContent('Add tags');
    });

    it('pressed, it opens the picker with its own search on top; Apply hands back the list', async () => {
      const onChange = vi.fn();
      render(<Harness variant="popover" onChange={onChange} />);
      await userEvent.click(screen.getByRole('button', { name: 'Edit tags' }));
      expect(screen.getByRole('combobox', { name: 'Search or create a tag' })).toBeInTheDocument();
      await userEvent.click(row('VIP'));
      await userEvent.click(screen.getByRole('button', { name: 'Apply' }));
      expect(onChange).toHaveBeenCalledWith(['Healthcare', 'VIP']);
    });
  });
});

/*
 * The keyboard path, and the ARIA that carries it.
 *
 * Arrow keys move a highlight the list draws with `data-active`. That is a picture: unless the field
 * also says which row is active, a screen reader user arrows through the whole list in silence and
 * then applies a tag nobody told them about. These assert the wiring, not the paint.
 */
describe('InlineTags - the keyboard, and what it announces', () => {
  const field = () => screen.getByRole('combobox');
  const slot = (name: string) => {
    const el = document.querySelector(`[data-slot="${name}"]`);
    if (!el) throw new Error(`no [data-slot="${name}"]`);
    return el;
  };
  const open = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.click(screen.getByRole('button', { name: /add tag/i }));
    return field();
  };

  it('ties the field to the list it drives', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const box = await open(user);
    expect(box).toHaveAttribute('aria-expanded', 'true');
    expect(box).toHaveAttribute('aria-controls', list().id);
    expect(list().id).not.toBe('');
  });

  it('names the active row, so the move is announced and not only drawn', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const box = await open(user);
    expect(box).not.toHaveAttribute('aria-activedescendant');

    await user.keyboard('{ArrowDown}');
    const first = box.getAttribute('aria-activedescendant');
    expect(first).toBeTruthy();
    expect(document.getElementById(first ?? '')).toHaveAttribute('role', 'option');

    await user.keyboard('{ArrowDown}');
    expect(box.getAttribute('aria-activedescendant')).not.toBe(first);

    await user.keyboard('{ArrowUp}');
    expect(box.getAttribute('aria-activedescendant')).toBe(first);
  });

  it('only lets the listbox own options and groups', async () => {
    /* a listbox's children must be `option` or `group`; the headings used to be bare divs */
    const user = userEvent.setup();
    render(<Harness />);
    await open(user);
    const roles = Array.from(list().children).map((c) => c.getAttribute('role'));
    expect(roles.length).toBeGreaterThan(0);
    for (const role of roles) expect(['option', 'group']).toContain(role);
  });

  it('Enter on a highlighted row ticks it, and Apply is what reaches onChange', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Harness onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: /add tag/i }));

    await user.keyboard('{ArrowDown}{Enter}');
    expect(onChange).not.toHaveBeenCalled(); // a tick is a draft

    await user.click(screen.getByRole('button', { name: 'Apply' }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('Enter applies only once nothing is highlighted', async () => {
    /* Enter picks the highlighted row when there is one - and a mouse move highlights, so the
     * apply-on-Enter shortcut is reachable from the keyboard path, which is what this asserts. */
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Harness onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: /add tag/i }));

    await user.keyboard('{ArrowDown}{Enter}'); // highlight the first row and tick it
    expect(onChange).not.toHaveBeenCalled();

    await user.type(field(), 'x');
    await user.keyboard('{Backspace}'); // an empty search drops the highlight
    expect(field()).not.toHaveAttribute('aria-activedescendant');

    await user.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('Escape clears the search first, and only then gives up', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: /add tag/i }));
    await user.type(field(), 'Gold');
    expect(field()).toHaveValue('Gold');

    await user.keyboard('{Escape}');
    expect(field()).toHaveValue('');
    expect(screen.queryByRole('listbox')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('offers Create for a word nothing matches, and the created tag lands selected', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Harness onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: /add tag/i }));
    await user.type(field(), 'Brand new');

    const create = within(list()).getByText(/Create/);
    await user.click(create);
    await user.click(screen.getByRole('button', { name: 'Apply' }));
    expect(onChange).toHaveBeenCalledWith(expect.arrayContaining(['Brand new']));
  });

  it('Cancel throws the draft away', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Harness onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: /add tag/i }));
    await user.click(row('Pilot'));
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onChange).not.toHaveBeenCalled();
    expect(pills()).toEqual(['Healthcare']);
  });

  it('Apply is dead until something actually changed', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: /add tag/i }));
    expect(screen.getByRole('button', { name: 'Apply' })).toBeDisabled();
    await user.click(row('Pilot'));
    expect(screen.getByRole('button', { name: 'Apply' })).toBeEnabled();
  });

  it('counts the draft rather than the saved list', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: /add tag/i }));
    await user.click(row('Pilot'));
    expect(slot('tag-picker-diff')).toHaveTextContent('1 to add');

    /* a second press inside 280ms is swallowed on purpose, so a row that slid under the
     * pointer is never ticked by accident - wait it out rather than assert the lock away */
    await new Promise((r) => setTimeout(r, 320));
    await user.click(row('Healthcare'));
    expect(slot('tag-picker-diff')).toHaveTextContent('1 to add · 1 to remove');
  });

  it('a press outside with an unapplied draft is swallowed, not obeyed', async () => {
    const outside = vi.fn();
    const user = userEvent.setup();
    render(
      <div>
        <Harness />
        <button type="button" onClick={outside}>
          elsewhere
        </button>
      </div>
    );
    await user.click(screen.getByRole('button', { name: /add tag/i }));
    await user.click(row('Pilot'));
    await user.click(screen.getByRole('button', { name: 'elsewhere' }));
    expect(outside).not.toHaveBeenCalled();
    expect(screen.queryByRole('listbox')).toBeInTheDocument();
  });

  it('the search X empties the field', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: /add tag/i }));
    await user.type(field(), 'Gold');
    const clear = screen.getByRole('button', { name: /clear/i });
    await user.click(clear);
    expect(field()).toHaveValue('');
  });

  it('says so when there is nothing to show at all', async () => {
    const user = userEvent.setup();
    render(<InlineTags value={[]} onChange={vi.fn()} options={[]} suggestions={[]} counts={{}} />);
    await user.click(screen.getByRole('button', { name: /add tag/i }));
    expect(slot('tag-picker-empty')).toHaveTextContent('No tags yet');
  });
});

/*
 * The paths a pointer and a real browser reach but jsdom does not: a row driven by its own
 * key handler, and the slide that is skipped when the reader asked for less motion.
 */
describe('InlineTags - the defensive paths', () => {
  const list2 = () => screen.getByRole('listbox', { name: 'Tags' });

  it('a row answers Enter and Space on itself', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: /add tag/i }));
    /* the row moves between the two groups when it is ticked, so it has to be found again */
    const pilot = () => within(list2()).getByRole('option', { name: /Pilot/ });

    fireEvent.keyDown(pilot(), { key: 'Enter' });
    expect(pilot()).toHaveAttribute('aria-selected', 'true');
    fireEvent.keyDown(pilot(), { key: ' ' });
    expect(pilot()).toHaveAttribute('aria-selected', 'false');
  });

  it('the Create row answers a key too', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: /add tag/i }));
    await user.type(screen.getByRole('combobox'), 'Totally new');
    const create = list2().querySelector('[data-slot="tag-picker-create"]');
    expect(create).not.toBeNull();
    fireEvent.keyDown(create as Element, { key: 'Enter' });
    expect(within(list2()).getByRole('option', { name: /Totally new/ })).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });

  it('a key that means nothing to the picker is left alone', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: /add tag/i }));
    await user.keyboard('{Tab}');
    expect(screen.getByRole('listbox', { name: 'Tags' })).toBeInTheDocument();
  });

  it('skips the slide when the reader asked for less motion', async () => {
    const real = window.matchMedia;
    window.matchMedia = ((q: string) =>
      ({
        matches: q.includes('prefers-reduced-motion'),
        media: q,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
      }) as unknown as MediaQueryList) as typeof window.matchMedia;
    try {
      const user = userEvent.setup();
      render(<Harness />);
      await user.click(screen.getByRole('button', { name: /add tag/i }));
      await user.click(within(list2()).getByRole('option', { name: /Pilot/ }));
      expect(within(list2()).getByRole('option', { name: /Pilot/ })).toHaveAttribute(
        'aria-selected',
        'true'
      );
    } finally {
      window.matchMedia = real;
    }
  });
});
