import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { InlineTags } from './InlineTags';

const POOL = ['Gold tier', 'Silver tier', 'Pilot', 'APAC', 'Healthcare', 'VIP'];

function Harness({ start = ['Healthcare'] }: { start?: string[] }) {
  const [tags, setTags] = useState(start);
  return (
    <div>
      <InlineTags value={tags} onChange={setTags} suggestions={['Pilot', 'APAC']} options={POOL} />
      <button type="button">outside</button>
    </div>
  );
}

const addButton = () => screen.getByRole('button', { name: 'Add tag' });
const pills = () => screen.queryAllByTestId('tag-label').map((n) => n.textContent);

describe('InlineTags', () => {
  it('at rest shows the pills and Add tag, no field and no suggestions', () => {
    render(<Harness />);
    expect(pills()).toEqual(['Healthcare']);
    expect(addButton()).toBeInTheDocument();
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    expect(screen.queryByRole('group', { name: 'Suggested tags' })).not.toBeInTheDocument();
  });

  it('Add tag opens a focused field, the ✕ outside it and the suggestions', async () => {
    render(<Harness />);
    await userEvent.click(addButton());
    expect(screen.getByRole('combobox', { name: 'New tag' })).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '+ Pilot' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Add tag' })).not.toBeInTheDocument();
  });

  it('a suggestion adds its tag and keeps the field open', async () => {
    render(<Harness />);
    await userEvent.click(addButton());
    await userEvent.click(screen.getByRole('button', { name: '+ Pilot' }));
    expect(pills()).toEqual(['Healthcare', 'Pilot']);
    expect(screen.getByRole('combobox')).toHaveFocus();
    expect(screen.queryByRole('button', { name: '+ Pilot' })).not.toBeInTheDocument();
  });

  it('typing lists matching earlier tags; picking one adds it and Add tag comes back after it', async () => {
    render(<Harness />);
    await userEvent.click(addButton());
    await userEvent.type(screen.getByRole('combobox'), 'tier');
    expect(screen.getAllByRole('option').map((o) => o.textContent)).toEqual([
      'Gold tier',
      'Silver tier',
      'Add “tier”',
    ]);
    await userEvent.click(screen.getByRole('option', { name: 'Gold tier' }));
    expect(pills()).toEqual(['Healthcare', 'Gold tier']);
    expect(addButton()).toHaveFocus();
  });

  it('a new word is added from Add "…" - and there is no Enter', async () => {
    render(<Harness />);
    await userEvent.click(addButton());
    await userEvent.type(screen.getByRole('combobox'), 'Priority{Enter}');
    expect(pills()).toEqual(['Healthcare']);
    await userEvent.click(screen.getByRole('option', { name: 'Add “Priority”' }));
    expect(pills()).toEqual(['Healthcare', 'Priority']);
  });

  it('never offers Add "…" for a tag that already exists, in any case', async () => {
    render(<Harness />);
    await userEvent.click(addButton());
    await userEvent.type(screen.getByRole('combobox'), 'healthcare');
    expect(screen.queryByRole('option', { name: /Add/ })).not.toBeInTheDocument();
    expect(screen.getByText('No earlier tag matches.')).toBeInTheDocument();
  });

  it('the ✕, Escape and a press outside all close it without adding', async () => {
    render(<Harness />);
    await userEvent.click(addButton());
    await userEvent.type(screen.getByRole('combobox'), 'abc');
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();

    await userEvent.click(addButton());
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    expect(addButton()).toHaveFocus();

    await userEvent.click(addButton());
    fireEvent.mouseDown(screen.getByRole('button', { name: 'outside' }));
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    expect(pills()).toEqual(['Healthcare']);
  });

  it('a pill’s ✕ removes it', async () => {
    render(<Harness start={['Healthcare', 'VIP']} />);
    await userEvent.click(screen.getAllByTestId('tag-remove')[0]!);
    expect(pills()).toEqual(['VIP']);
  });

  it('disabled keeps the pills, drops Add tag and every ✕', () => {
    render(<InlineTags value={['VIP']} onChange={() => {}} disabled />);
    expect(pills()).toEqual(['VIP']);
    expect(screen.queryByRole('button', { name: 'Add tag' })).not.toBeInTheDocument();
    expect(screen.queryByTestId('tag-remove')).not.toBeInTheDocument();
  });
});
