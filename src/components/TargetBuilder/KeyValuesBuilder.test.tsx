import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { KeyValuesBuilder } from './KeyValuesBuilder';
import type {
  KeyValuesBuilderProps,
  KeyValuesOption,
  KeyValuesRow,
} from './KeyValuesBuilder.types';

const OPTIONS: KeyValuesOption[] = [
  { value: 'ssh', label: 'SSH', hint: '22' },
  { value: 'wmi', label: 'WMI' },
];
const checkPort = (v: string) =>
  /^\d{1,5}$/.test(v) && Number(v) >= 1 && Number(v) <= 65535
    ? null
    : 'A port is a number from 1 to 65535';

/** A builder holding its own rows, reporting every change - set up as the console's Custom ports. */
const Live = ({
  start = [],
  onChange,
  ...props
}: { start?: KeyValuesRow[]; onChange?: (r: KeyValuesRow[]) => void } & Partial<
  Omit<KeyValuesBuilderProps, 'rows' | 'onRowsChange'>
>) => {
  const [rows, setRows] = useState<KeyValuesRow[]>(start);
  return (
    <KeyValuesBuilder
      options={OPTIONS}
      keyLabel="Protocol"
      valuesLabel="Ports"
      addLabel="Add protocol"
      validateValue={checkPort}
      {...props}
      rows={rows}
      onRowsChange={(next) => {
        setRows(next);
        onChange?.(next);
      }}
    />
  );
};

const field = (name = 'Ports for SSH') => screen.getByRole('textbox', { name });

describe('KeyValuesBuilder', () => {
  describe('rendering', () => {
    it('shows one blank row with no bin when there are no rows', () => {
      render(<Live />);
      expect(field('Ports')).toBeDisabled();
      expect(screen.queryByRole('button', { name: /^Remove/ })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Add protocol' })).toBeDisabled();
    });

    it('uses its generic words by default', () => {
      render(
        <KeyValuesBuilder
          options={OPTIONS}
          rows={[{ key: 'ssh', values: [] }]}
          onRowsChange={vi.fn()}
        />
      );
      expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
      expect(screen.getByRole('combobox', { name: 'Key' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Values for SSH' })).toHaveAttribute(
        'placeholder',
        'Type a value, press Enter'
      );
    });

    it('names the group by its label and puts the explainer behind an ⓘ', () => {
      render(<Live label="Custom ports" info="Standard ports are always probed." />);
      expect(screen.getByRole('group', { name: 'Custom ports' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'About Custom ports' })).toBeInTheDocument();
    });

    it('names the ⓘ generically when the label is not text', () => {
      render(<Live label={<b>Ports</b>} info="Explainer" />);
      expect(screen.getByRole('button', { name: 'About this field' })).toBeInTheDocument();
    });

    it('leaves the group unnamed and the ⓘ out without a label', () => {
      render(<Live info="Explainer" />);
      expect(screen.getByRole('group')).not.toHaveAttribute('aria-labelledby');
      expect(screen.queryByRole('button', { name: /^About/ })).not.toBeInTheDocument();
    });

    it('draws each value as a chip, mono where asked, and forwards ref and className', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(
        <KeyValuesBuilder
          ref={ref}
          className="custom"
          mono
          options={OPTIONS}
          rows={[{ key: 'ssh', values: ['2222', '2200'] }]}
          onRowsChange={vi.fn()}
        />
      );
      expect(screen.getByText('2222')).toHaveClass('mdt-font-mono');
      expect(screen.getByText('2200')).toBeInTheDocument();
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('custom');
    });
  });

  describe('values', () => {
    it('adds a value on Enter, a comma or a space', async () => {
      const onChange = vi.fn();
      render(<Live start={[{ key: 'ssh', values: [] }]} onChange={onChange} />);
      await userEvent.type(field(), '2222{Enter}2200,8443 ');
      expect(onChange).toHaveBeenLastCalledWith([{ key: 'ssh', values: ['2222', '2200', '8443'] }]);
      expect(field()).toHaveValue('');
    });

    it('adds what is typed when the field loses focus, and nothing for an empty field', async () => {
      const onChange = vi.fn();
      render(<Live start={[{ key: 'ssh', values: [] }]} onChange={onChange} />);
      await userEvent.click(field());
      await userEvent.tab();
      expect(onChange).not.toHaveBeenCalled();
      await userEvent.type(field(), '161');
      await userEvent.tab();
      expect(onChange).toHaveBeenLastCalledWith([{ key: 'ssh', values: ['161'] }]);
    });

    it('adds every value in a pasted list, dropping duplicates', () => {
      const onChange = vi.fn();
      render(<Live start={[{ key: 'ssh', values: ['2222'] }]} onChange={onChange} />);
      fireEvent.paste(field(), { clipboardData: { getData: () => '2222, 2200 2200;8443' } });
      expect(onChange).toHaveBeenLastCalledWith([{ key: 'ssh', values: ['2222', '2200', '8443'] }]);
    });

    it('leaves a paste with no separator to the input', () => {
      const onChange = vi.fn();
      render(<Live start={[{ key: 'ssh', values: [] }]} onChange={onChange} />);
      fireEvent.paste(field(), { clipboardData: { getData: () => '2222' } });
      expect(onChange).not.toHaveBeenCalled();
    });

    it('keeps a refused value in the field with its message, until it is changed', async () => {
      const onChange = vi.fn();
      render(<Live start={[{ key: 'ssh', values: [] }]} onChange={onChange} />);
      await userEvent.type(field(), '70000{Enter}');
      expect(screen.getByRole('alert')).toHaveTextContent('A port is a number from 1 to 65535');
      expect(field()).toHaveValue('70000');
      expect(field()).toHaveAttribute('aria-invalid', 'true');
      expect(onChange).not.toHaveBeenCalled();
      await userEvent.type(field(), '{Backspace}');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('accepts any value without a check', async () => {
      const onChange = vi.fn();
      render(
        <Live validateValue={undefined} start={[{ key: 'ssh', values: [] }]} onChange={onChange} />
      );
      await userEvent.type(field(), 'anything{Enter}');
      expect(onChange).toHaveBeenLastCalledWith([{ key: 'ssh', values: ['anything'] }]);
    });

    it('takes the last chip back on Backspace in an empty field', async () => {
      const onChange = vi.fn();
      render(<Live start={[{ key: 'ssh', values: ['2222', '2200'] }]} onChange={onChange} />);
      await userEvent.type(field(), '{Backspace}');
      expect(onChange).toHaveBeenLastCalledWith([{ key: 'ssh', values: ['2222'] }]);
    });

    it('removes a value with its chip’s ✕', async () => {
      const onChange = vi.fn();
      render(<Live start={[{ key: 'ssh', values: ['2222', '2200'] }]} onChange={onChange} />);
      const [first] = screen.getAllByRole('button', { name: 'Remove' });
      if (first) await userEvent.click(first);
      expect(onChange).toHaveBeenLastCalledWith([{ key: 'ssh', values: ['2200'] }]);
    });
  });

  describe('rows', () => {
    it('adds a row, and leaves a held key out of the next picker', async () => {
      const onChange = vi.fn();
      render(<Live start={[{ key: 'ssh', values: ['2222'] }]} onChange={onChange} />);
      await userEvent.click(screen.getByRole('button', { name: 'Add protocol' }));
      expect(onChange).toHaveBeenLastCalledWith([
        { key: 'ssh', values: ['2222'] },
        { key: '', values: [] },
      ]);
      expect(screen.getByRole('button', { name: 'Add protocol' })).toBeDisabled();
      const second = screen.getAllByRole('combobox', { name: 'Protocol' })[1];
      if (second) await userEvent.click(second);
      expect(screen.queryAllByText('SSH (22)')).toHaveLength(1);
      expect(screen.queryAllByText('WMI').length).toBeGreaterThan(0);
    });

    it('picks a key, which turns its values field on', async () => {
      const onChange = vi.fn();
      render(<Live onChange={onChange} />);
      await userEvent.click(screen.getByRole('combobox', { name: 'Protocol' }));
      await userEvent.click(screen.getByText('SSH (22)'));
      expect(onChange).toHaveBeenLastCalledWith([{ key: 'ssh', values: [] }]);
      expect(field()).toBeEnabled();
    });

    it('turns the add button off once every key is in use', () => {
      render(
        <Live
          start={[
            { key: 'ssh', values: [] },
            { key: 'wmi', values: [] },
          ]}
        />
      );
      expect(screen.getByRole('button', { name: 'Add protocol' })).toBeDisabled();
    });

    it('removes a row with its bin', async () => {
      const onChange = vi.fn();
      render(
        <Live
          start={[
            { key: 'ssh', values: ['2222'] },
            { key: 'wmi', values: [] },
          ]}
          onChange={onChange}
        />
      );
      await userEvent.click(screen.getByRole('button', { name: 'Remove SSH' }));
      expect(onChange).toHaveBeenLastCalledWith([{ key: 'wmi', values: [] }]);
    });

    it('names a row by its key when the key is not among the options', () => {
      render(
        <KeyValuesBuilder
          options={OPTIONS}
          rows={[{ key: 'ftp', values: [] }]}
          onRowsChange={vi.fn()}
        />
      );
      expect(screen.getByRole('button', { name: 'Remove ftp' })).toBeInTheDocument();
    });

    it('names the bin generically on a row with values but no key', () => {
      render(
        <KeyValuesBuilder
          options={OPTIONS}
          rows={[{ key: '', values: ['1'] }]}
          onRowsChange={vi.fn()}
        />
      );
      expect(screen.getByRole('button', { name: 'Remove row' })).toBeInTheDocument();
    });

    it('turns every control off when disabled', () => {
      render(<Live disabled start={[{ key: 'ssh', values: ['2222'] }]} />);
      expect(field()).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Remove SSH' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Add protocol' })).toBeDisabled();
    });
  });
});
