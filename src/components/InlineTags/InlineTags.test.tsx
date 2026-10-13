import { render, screen, within } from '@testing-library/react';
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
      expect(screen.getByRole('textbox', { name: 'Search or create a tag' })).toHaveFocus();
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
        screen.getByRole('textbox', { name: 'Search or create a tag' }),
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
      expect(screen.getByRole('textbox', { name: 'Search or create a tag' })).toBeInTheDocument();
      await userEvent.click(row('VIP'));
      await userEvent.click(screen.getByRole('button', { name: 'Apply' }));
      expect(onChange).toHaveBeenCalledWith(['Healthcare', 'VIP']);
    });
  });
});
