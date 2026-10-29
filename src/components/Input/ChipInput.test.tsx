import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { ChipInput } from './ChipInput';

describe('ChipInput', () => {
  const Alone = ({ onChange }: { onChange?: (v: string[]) => void }) => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <ChipInput
        aria-label="Recipients"
        className="custom"
        values={values}
        onValuesChange={(v) => {
          setValues(v);
          onChange?.(v);
        }}
      />
    );
  };

  it('works on its own, with its own name and className', async () => {
    const onChange = vi.fn();
    const { container } = render(<Alone onChange={onChange} />);
    expect(container.firstChild).toHaveClass('custom');
    await userEvent.type(screen.getByRole('textbox', { name: 'Recipients' }), 'a@b.co{Enter}');
    expect(onChange).toHaveBeenLastCalledWith(['a@b.co']);
    expect(screen.getByText('a@b.co')).not.toHaveClass('mdt-font-mono');
  });

  it('focuses the input on a press anywhere on the field', async () => {
    render(<Alone />);
    const input = screen.getByRole('textbox', { name: 'Recipients' });
    const box = input.parentElement;
    if (box) await userEvent.click(box);
    expect(input).toHaveFocus();
  });

  const isEmail = (v: string) =>
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) ? null : `"${v}" is not an email address.`;

  it('adds on Enter, comma and space, and drops a duplicate', async () => {
    const onChange = vi.fn();
    render(<ChipInput aria-label="Tags" values={['a']} onValuesChange={onChange} />);
    const input = screen.getByRole('textbox', { name: 'Tags' });
    await userEvent.type(input, 'a{Enter}');
    expect(onChange).not.toHaveBeenCalled();
    await userEvent.type(input, 'b,');
    expect(onChange).toHaveBeenLastCalledWith(['a', 'b']);
    await userEvent.type(input, 'c ');
    expect(onChange).toHaveBeenLastCalledWith(['a', 'c']);
  });

  it('refuses a value its check fails, says why, and keeps the text', async () => {
    const onChange = vi.fn();
    render(
      <ChipInput aria-label="Recipients" values={[]} onValuesChange={onChange} validate={isEmail} />
    );
    const input = screen.getByRole('textbox', { name: 'Recipients' });
    await userEvent.type(input, 'nope{Enter}');
    expect(screen.getByRole('alert')).toHaveTextContent('"nope" is not an email address.');
    expect(input).toHaveValue('nope');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('adds every value in a pasted list, and leaves a single value to the input', () => {
    const onChange = vi.fn();
    render(<ChipInput aria-label="Tags" values={[]} onValuesChange={onChange} />);
    const input = screen.getByRole('textbox', { name: 'Tags' });
    fireEvent.paste(input, { clipboardData: { getData: () => 'one' } });
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.paste(input, { clipboardData: { getData: () => 'one, two\nthree' } });
    expect(onChange).toHaveBeenLastCalledWith(['one', 'two', 'three']);
  });

  it('takes the last chip back on Backspace, and removes one with its ✕', async () => {
    const onChange = vi.fn();
    render(<ChipInput aria-label="Tags" values={['a', 'b']} onValuesChange={onChange} />);
    await userEvent.type(screen.getByRole('textbox', { name: 'Tags' }), '{Backspace}');
    expect(onChange).toHaveBeenLastCalledWith(['a']);
    const [first] = screen.getAllByRole('button', { name: 'Remove' });
    if (first) await userEvent.click(first);
    expect(onChange).toHaveBeenLastCalledWith(['b']);
  });

  it('shows its placeholder only while empty, draws mono where asked, and turns off when disabled', () => {
    const { rerender } = render(
      <ChipInput aria-label="Ports" values={[]} onValuesChange={vi.fn()} mono />
    );
    const input = screen.getByRole('textbox', { name: 'Ports' });
    expect(input).toHaveAttribute('placeholder', 'Type a value, press Enter');
    expect(input).toHaveClass('mdt-font-mono');
    rerender(
      <ChipInput aria-label="Ports" values={['22']} onValuesChange={vi.fn()} mono disabled />
    );
    expect(input).toHaveAttribute('placeholder', '');
    expect(input).toBeDisabled();
    expect(screen.getByText('22')).toHaveClass('mdt-font-mono');
  });
});
