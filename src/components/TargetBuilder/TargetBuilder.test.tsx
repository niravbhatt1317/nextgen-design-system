import { createRef, useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TargetBuilder } from './TargetBuilder';
import type { TargetBuilderProps, TargetEntry, TargetKind } from './TargetBuilder.types';

const KINDS: TargetKind[] = [
  {
    value: 'host',
    label: 'Specific IP / host',
    field: 'single',
    placeholder: '10.20.4.14',
    validate: (v) => (/^\d+\.\d+\.\d+\.\d+$/.test(v.trim()) ? null : 'Not an IP address.'),
  },
  {
    value: 'set',
    label: 'Specific set',
    field: 'multi',
    placeholder: 'a, b',
    validate: (v) =>
      v.includes('!') ? 'No marks in a set.' : v.trim() ? null : 'Enter at least one address.',
  },
  {
    value: 'cidr',
    label: 'CIDR block',
    field: 'single',
    warning: (v) => (v.includes('/16') ? 'Large CIDR' : null),
  },
  { value: 'csv', label: 'CSV import', field: 'file' },
];

/** The builder holding its own list, reporting every change. */
const Live = ({
  start = [],
  spy,
  ...props
}: { start?: TargetEntry[]; spy?: (e: TargetEntry[]) => void } & Partial<TargetBuilderProps>) => {
  const [entries, setEntries] = useState<TargetEntry[]>(start);
  return (
    <TargetBuilder
      kinds={KINDS}
      defaultKind="host"
      label="Include targets"
      {...props}
      entries={entries}
      onEntriesChange={(e) => {
        setEntries(e);
        spy?.(e);
      }}
    />
  );
};

const valueField = () => screen.getByRole('textbox', { name: 'Specific IP / host' });
const addButton = () => screen.getByRole('button', { name: 'Add' });

const pickKind = async (label: string) => {
  const user = userEvent.setup();
  await user.click(screen.getByRole('combobox'));
  await waitFor(() => {
    expect(screen.getAllByText(label).length).toBeGreaterThan(0);
  });
  const options = screen.getAllByText(label);
  await user.click(options[options.length - 1] as HTMLElement);
};

describe('TargetBuilder', () => {
  describe('rendering', () => {
    it('labels the group and opens on the default kind', () => {
      render(<Live />);
      expect(screen.getByRole('group', { name: 'Include targets' })).toBeInTheDocument();
      expect(valueField()).toHaveAttribute('placeholder', '10.20.4.14');
      expect(valueField()).toHaveClass('mdt-font-mono');
      expect(addButton()).toBeInTheDocument();
    });

    it('draws the add row dashed on the sunken ground', () => {
      const { container } = render(<Live />);
      const box = container.querySelector('.mdt-border-dashed');
      expect(box).toHaveClass(
        'mdt-border-input',
        'mdt-bg-secondary',
        'mdt-p-2.5',
        'mdt-rounded-lg'
      );
    });

    it('shows no list and no value field until a kind is picked', () => {
      render(<Live defaultKind="" placeholder="Pick a type" />);
      expect(screen.queryByRole('list')).toBeNull();
      expect(screen.queryByRole('textbox')).toBeNull();
      expect(screen.queryByRole('button', { name: 'Add' })).toBeNull();
    });

    it('forwards the ref and the class', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <TargetBuilder
          ref={ref}
          className="extra"
          kinds={KINDS}
          entries={[]}
          onEntriesChange={() => undefined}
        />
      );
      expect(ref.current).toHaveClass('extra');
      expect(TargetBuilder.displayName).toBe('TargetBuilder');
    });

    it('draws each entry as a row - badge, mono value, pencil, bin; a file row has no pencil', () => {
      render(
        <Live
          start={[
            { kind: 'host', value: '10.20.4.14' },
            { kind: 'csv', file: 'targets.csv' },
          ]}
        />
      );
      const rows = screen.getAllByRole('listitem');
      expect(rows).toHaveLength(2);
      expect(screen.getByText('10.20.4.14')).toHaveClass('mdt-font-mono', 'mdt-truncate');
      expect(screen.getByText('targets.csv')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Edit 10.20.4.14' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /Edit targets/ })).toBeNull();
      expect(screen.getByRole('button', { name: 'Remove targets.csv' })).toBeInTheDocument();
      expect(rows[0]).toHaveClass('mdt-border-b');
      expect(rows[1]).not.toHaveClass('mdt-border-b');
    });

    it('wears the danger badge for exclusions', () => {
      render(<Live tone="danger" start={[{ kind: 'host', value: '10.0.0.1' }]} />);
      expect(screen.getByText('Specific IP / host', { selector: 'li *' })).toBeInTheDocument();
    });

    it('falls back to the kind key for an unknown kind', () => {
      render(<Live start={[{ kind: 'mystery', value: 'x' }]} />);
      expect(screen.getByText('mystery')).toBeInTheDocument();
    });
  });

  describe('adding', () => {
    it('adds a valid value on Add and empties the field', async () => {
      const spy = vi.fn();
      render(<Live spy={spy} />);
      await userEvent.type(valueField(), '10.20.4.14');
      await userEvent.click(addButton());
      expect(spy).toHaveBeenLastCalledWith([{ kind: 'host', value: '10.20.4.14' }]);
      expect(valueField()).toHaveValue('');
    });

    it('adds on Enter', async () => {
      const spy = vi.fn();
      render(<Live spy={spy} />);
      await userEvent.type(valueField(), '10.0.0.1{Enter}');
      expect(spy).toHaveBeenLastCalledWith([{ kind: 'host', value: '10.0.0.1' }]);
    });

    it('refuses a failing value, says why, and keeps saying it live until it passes', async () => {
      const spy = vi.fn();
      render(<Live spy={spy} />);
      await userEvent.type(valueField(), 'abc');
      expect(screen.queryByText('Not an IP address.')).toBeNull();
      await userEvent.click(addButton());
      expect(spy).not.toHaveBeenCalled();
      expect(screen.getByText('Not an IP address.')).toBeInTheDocument();
      await userEvent.clear(valueField());
      await userEvent.type(valueField(), '1.2.3.4');
      expect(screen.queryByText('Not an IP address.')).toBeNull();
    });

    it('adds a value with no validate', async () => {
      const spy = vi.fn();
      render(<Live spy={spy} defaultKind="cidr" />);
      await userEvent.type(screen.getByRole('textbox', { name: 'CIDR block' }), '10.0.0.0/24');
      await userEvent.click(addButton());
      expect(spy).toHaveBeenLastCalledWith([{ kind: 'cidr', value: '10.0.0.0/24' }]);
    });

    it('shows a kind warning while it applies', async () => {
      render(<Live defaultKind="cidr" />);
      const field = screen.getByRole('textbox', { name: 'CIDR block' });
      expect(screen.queryByText('Large CIDR')).toBeNull();
      await userEvent.type(field, '10.0.0.0/16');
      expect(screen.getByText('Large CIDR')).toBeInTheDocument();
    });

    it('adds a block through its text area and Add block', async () => {
      const spy = vi.fn();
      render(<Live spy={spy} defaultKind="set" />);
      const area = screen.getByRole('textbox', { name: 'Specific set' });
      expect(area.tagName).toBe('TEXTAREA');
      await userEvent.click(screen.getByRole('button', { name: 'Add block' }));
      expect(screen.getByText('Enter at least one address.')).toBeInTheDocument();
      await userEvent.type(area, 'a, b');
      await userEvent.click(screen.getByRole('button', { name: 'Add block' }));
      expect(spy).toHaveBeenLastCalledWith([{ kind: 'set', value: 'a, b' }]);
    });

    it('uploads a file kind - its own name by default, the caller’s through onUpload, none when it returns nothing', async () => {
      const spy = vi.fn();
      const { unmount } = render(<Live spy={spy} defaultKind="csv" />);
      expect(screen.getByText(/Single-column CSV/)).toBeInTheDocument();
      await userEvent.click(screen.getByRole('button', { name: 'Upload' }));
      expect(spy).toHaveBeenLastCalledWith([{ kind: 'csv', file: 'csv.csv' }]);
      unmount();

      const spy2 = vi.fn();
      const onUpload = vi.fn().mockReturnValueOnce('mine.csv').mockReturnValueOnce(undefined);
      render(<Live spy={spy2} defaultKind="csv" onUpload={onUpload} />);
      await userEvent.click(screen.getByRole('button', { name: 'Upload' }));
      expect(spy2).toHaveBeenLastCalledWith([{ kind: 'csv', file: 'mine.csv' }]);
      await userEvent.click(screen.getByRole('button', { name: 'Upload' }));
      expect(spy2).toHaveBeenCalledTimes(1);
      expect(onUpload).toHaveBeenCalledWith('csv');
    });

    it('changes kind through the picker and tells the caller', async () => {
      const onKindChange = vi.fn();
      render(<Live onKindChange={onKindChange} />);
      await pickKind('CIDR block');
      expect(onKindChange).toHaveBeenCalledWith('cidr');
      expect(screen.getByRole('textbox', { name: 'CIDR block' })).toBeInTheDocument();
    });
  });

  describe('editing and removing', () => {
    it('edits a row in place - Enter saves, the type kept', async () => {
      const spy = vi.fn();
      render(<Live spy={spy} start={[{ kind: 'host', value: '10.0.0.1' }]} />);
      await userEvent.click(screen.getByRole('button', { name: 'Edit 10.0.0.1' }));
      const field = screen.getByRole('textbox', { name: 'Edit Specific IP / host' });
      expect(field).toHaveValue('10.0.0.1');
      await userEvent.clear(field);
      await userEvent.type(field, '10.0.0.2{Enter}');
      expect(spy).toHaveBeenLastCalledWith([{ kind: 'host', value: '10.0.0.2' }]);
      expect(screen.getByText('10.0.0.2')).toBeInTheDocument();
    });

    it('refuses a failing edit and says why; Save is off while empty', async () => {
      const spy = vi.fn();
      render(<Live spy={spy} start={[{ kind: 'host', value: '10.0.0.1' }]} />);
      await userEvent.click(screen.getByRole('button', { name: 'Edit 10.0.0.1' }));
      const field = screen.getByRole('textbox', { name: 'Edit Specific IP / host' });
      await userEvent.clear(field);
      expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
      fireEvent.keyDown(field, { key: 'Enter' });
      await userEvent.type(field, 'nope');
      await userEvent.click(screen.getByRole('button', { name: 'Save' }));
      expect(spy).not.toHaveBeenCalled();
      expect(screen.getByText('Not an IP address.')).toBeInTheDocument();
    });

    it('cancels an edit with Escape or Cancel', async () => {
      render(<Live start={[{ kind: 'host', value: '10.0.0.1' }]} />);
      await userEvent.click(screen.getByRole('button', { name: 'Edit 10.0.0.1' }));
      fireEvent.keyDown(screen.getByRole('textbox', { name: 'Edit Specific IP / host' }), {
        key: 'Escape',
      });
      expect(screen.queryByRole('textbox', { name: 'Edit Specific IP / host' })).toBeNull();
      await userEvent.click(screen.getByRole('button', { name: 'Edit 10.0.0.1' }));
      await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(screen.getByText('10.0.0.1')).toBeInTheDocument();
    });

    it('opens a block in a text area - Ctrl+Enter saves, Escape cancels, Enter is a new line', async () => {
      const spy = vi.fn();
      render(<Live spy={spy} start={[{ kind: 'set', value: 'a, b' }]} />);
      await userEvent.click(screen.getByRole('button', { name: 'Edit a, b' }));
      const area = screen.getByRole('textbox', { name: 'Edit Specific set' });
      expect(area.tagName).toBe('TEXTAREA');
      fireEvent.keyDown(area, { key: 'Enter' });
      expect(spy).not.toHaveBeenCalled();
      await userEvent.type(area, ', c');
      fireEvent.keyDown(area, { key: 'Enter', ctrlKey: true });
      expect(spy).toHaveBeenLastCalledWith([{ kind: 'set', value: 'a, b, c' }]);

      await userEvent.click(screen.getByRole('button', { name: 'Edit a, b, c' }));
      fireEvent.keyDown(screen.getByRole('textbox', { name: 'Edit Specific set' }), {
        key: 'Escape',
      });
      expect(screen.queryByRole('textbox', { name: 'Edit Specific set' })).toBeNull();

      await userEvent.click(screen.getByRole('button', { name: 'Edit a, b, c' }));
      await userEvent.type(screen.getByRole('textbox', { name: 'Edit Specific set' }), '!');
      fireEvent.keyDown(screen.getByRole('textbox', { name: 'Edit Specific set' }), {
        key: 'Enter',
        metaKey: true,
      });
      expect(screen.getByText('No marks in a set.')).toBeInTheDocument();
      expect(spy).toHaveBeenCalledTimes(1);
      await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    });

    it('removes a row and ends any edit in progress', async () => {
      const spy = vi.fn();
      render(
        <Live
          spy={spy}
          start={[
            { kind: 'host', value: '10.0.0.1' },
            { kind: 'host', value: '10.0.0.2' },
          ]}
        />
      );
      await userEvent.click(screen.getByRole('button', { name: 'Edit 10.0.0.1' }));
      await userEvent.click(screen.getByRole('button', { name: 'Remove 10.0.0.2' }));
      expect(spy).toHaveBeenLastCalledWith([{ kind: 'host', value: '10.0.0.1' }]);
      expect(screen.queryByRole('textbox', { name: 'Edit Specific IP / host' })).toBeNull();
    });
  });
});
