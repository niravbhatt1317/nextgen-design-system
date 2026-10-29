import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectableCard, SelectableCardGroup } from './SelectableCard';

const Radios = ({ onPick = vi.fn(), disabledSet = false }) => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <SelectableCardGroup
      aria-label="Holders"
      value={value}
      disabled={disabledSet}
      onValueChange={(v) => {
        setValue(v);
        onPick(v);
      }}
    >
      <SelectableCard value="existing" title="Replace with existing" description="Holders move">
        {value === 'existing' && <button type="button">Pick a profile</button>}
      </SelectableCard>
      <SelectableCard value="new" title="Replace with new" />
      <SelectableCard value="off" title="Held" disabled />
      <SelectableCard value="remove" title="Remove" />
    </SelectableCardGroup>
  );
};

describe('SelectableCard', () => {
  it('is a radiogroup of radios named by their titles and described by their lines', () => {
    render(<Radios />);
    expect(screen.getByRole('radiogroup', { name: 'Holders' })).toBeInTheDocument();
    const card = screen.getByRole('radio', { name: 'Replace with existing' });
    expect(card).toHaveAccessibleDescription('Holders move');
    expect(card).toHaveAttribute('aria-checked', 'false');
  });

  it('picks a card on press, and makes only the chosen card a tab stop', async () => {
    const onPick = vi.fn();
    render(<Radios onPick={onPick} />);
    const remove = screen.getByRole('radio', { name: 'Remove' });
    expect(remove).toHaveAttribute('tabindex', '0');
    await userEvent.click(remove);
    expect(onPick).toHaveBeenCalledWith('remove');
    expect(remove).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'Replace with new' })).toHaveAttribute(
      'tabindex',
      '-1'
    );
    await userEvent.click(remove);
    expect(onPick).toHaveBeenCalledTimes(1);
  });

  it('keeps a press inside the body to itself', async () => {
    const onPick = vi.fn();
    render(<Radios onPick={onPick} />);
    await userEvent.click(screen.getByRole('radio', { name: 'Replace with existing' }));
    await userEvent.click(screen.getByRole('button', { name: 'Pick a profile' }));
    expect(onPick).toHaveBeenCalledTimes(1);
  });

  it('walks the arrows to the next card that can take it, wrapping and skipping a held one', async () => {
    const onPick = vi.fn();
    render(<Radios onPick={onPick} />);
    await userEvent.click(screen.getByRole('radio', { name: 'Replace with new' }));
    await userEvent.keyboard('{ArrowDown}');
    expect(onPick).toHaveBeenLastCalledWith('remove');
    expect(screen.getByRole('radio', { name: 'Remove' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(onPick).toHaveBeenLastCalledWith('existing');
    await userEvent.keyboard('{ArrowUp}');
    expect(onPick).toHaveBeenLastCalledWith('remove');
    await userEvent.keyboard('a');
    expect(onPick).toHaveBeenCalledTimes(4);
  });

  it('picks with Space and Enter, and ignores a held card or a held set', async () => {
    const onPick = vi.fn();
    const { unmount } = render(<Radios onPick={onPick} />);
    screen.getByRole('radio', { name: 'Remove' }).focus();
    await userEvent.keyboard(' ');
    expect(onPick).toHaveBeenLastCalledWith('remove');
    screen.getByRole('radio', { name: 'Replace with new' }).focus();
    await userEvent.keyboard('{Enter}');
    expect(onPick).toHaveBeenLastCalledWith('new');
    const held = screen.getByRole('radio', { name: 'Held' });
    expect(held).toHaveAttribute('aria-disabled', 'true');
    held.click();
    expect(onPick).toHaveBeenCalledTimes(2);
    unmount();
    render(<Radios onPick={onPick} disabledSet />);
    screen.getByRole('radio', { name: 'Remove' }).click();
    expect(onPick).toHaveBeenCalledTimes(2);
  });

  it('is a checkbox on its own, toggling through onCheckedChange', async () => {
    const onChecked = vi.fn();
    const { rerender } = render(
      <SelectableCard title="Email" icon={<svg />} tag="Fastest" onCheckedChange={onChecked} />
    );
    const box = screen.getByRole('checkbox', { name: /Email/ });
    await userEvent.click(box);
    expect(onChecked).toHaveBeenCalledWith(true);
    rerender(<SelectableCard title="Email" checked onCheckedChange={onChecked} />);
    expect(box).toHaveAttribute('aria-checked', 'true');
    await userEvent.click(box);
    expect(onChecked).toHaveBeenLastCalledWith(false);
  });

  it('a checkbox set is a group, and the arrows leave it alone', async () => {
    const onChecked = vi.fn();
    render(
      <SelectableCardGroup type="checkbox" aria-label="Channels" columns={2}>
        <SelectableCard title="Email" onCheckedChange={onChecked} />
      </SelectableCardGroup>
    );
    expect(screen.getByRole('group', { name: 'Channels' })).toHaveAttribute('data-layout', 'grid');
    screen.getByRole('checkbox', { name: 'Email' }).focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(onChecked).not.toHaveBeenCalled();
  });

  it('draws chips without the line, and takes a ref and handlers of its own', async () => {
    const groupRef = vi.fn();
    const ref = { current: null as HTMLDivElement | null };
    const onClick = vi.fn((e: { preventDefault: () => void }) => {
      e.preventDefault();
    });
    const onKeyDown = vi.fn();
    render(
      <SelectableCardGroup ref={groupRef} layout="chips" value="a" onKeyDown={onKeyDown}>
        <SelectableCard
          ref={ref}
          value="a"
          title="Okta"
          description="hidden on a chip"
          onClick={onClick}
        />
      </SelectableCardGroup>
    );
    expect(screen.queryByText('hidden on a chip')).toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(groupRef).toHaveBeenCalled();
    await userEvent.click(screen.getByRole('radio', { name: 'Okta' }));
    expect(onClick).toHaveBeenCalled();
    screen.getByRole('radio').focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(onKeyDown).toHaveBeenCalled();
  });

  it('takes an object ref on the group', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<SelectableCardGroup ref={ref} aria-label="Set" />);
    expect(ref.current).toHaveAttribute('role', 'radiogroup');
  });
});

describe('tiles', () => {
  const Tiles = () => (
    <SelectableCardGroup layout="tiles" aria-label="Provider" value="aws">
      <SelectableCard value="aws" title="AWS" description="Public cloud" icon={<img src="/aws.svg" alt="" />} />
      <SelectableCard value="oci" title="OCI" description="Public cloud" icon={<span>OCI</span>} />
    </SelectableCardGroup>
  );
  const dotOf = (card: HTMLElement) => {
    const dot = card.querySelector('.mdt-absolute');
    if (!dot) throw new Error('no dot');
    return dot;
  };

  it('lays five to a row and re-flows each card: the mark on top, the words centred, the dot in the corner', () => {
    render(<Tiles />);
    const group = screen.getByRole('radiogroup', { name: 'Provider' });
    expect(group).toHaveAttribute('data-layout', 'tiles');
    expect(group).toHaveClass('mdt-grid-cols-5');
    const aws = screen.getByRole('radio', { name: 'AWS' });
    expect(aws).toHaveAttribute('aria-checked', 'true');
    expect(aws).toHaveClass('mdt-rounded-[10px]', 'mdt-px-2.5', 'mdt-py-3');
    expect(screen.getByText('AWS')).toHaveClass('mdt-justify-center', 'mdt-text-[13px]');
    expect(screen.getAllByText('Public cloud')[0]).toHaveClass('mdt-truncate');
    expect(aws).toHaveAccessibleDescription('Public cloud');
  });

  it('the dot is 15 in the corner, its ring 4.5 on the chosen tile only', () => {
    render(<Tiles />);
    const chosen = dotOf(screen.getByRole('radio', { name: 'AWS' }));
    expect(chosen).toHaveClass('mdt-size-[15px]', 'mdt-right-2.5', 'mdt-top-2.5', 'mdt-border-[4.5px]');
    const plain = dotOf(screen.getByRole('radio', { name: 'OCI' }));
    expect(plain).toHaveClass('mdt-size-[15px]');
    expect(plain).not.toHaveClass('mdt-border-[4.5px]');
  });

  it('leaves a card that is not a tile untouched', () => {
    render(
      <SelectableCardGroup aria-label="Mode" value="a">
        <SelectableCard value="a" title="A" description="d" icon={<span>i</span>} />
      </SelectableCardGroup>
    );
    const a = screen.getByRole('radio', { name: 'A' });
    expect(a).not.toHaveClass('mdt-rounded-[10px]');
    expect(a.querySelector('.mdt-absolute')).toBeNull();
    expect(screen.getByText('A')).not.toHaveClass('mdt-text-[13px]');
  });
});
