import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TableFilterChips } from './TableFilterChips';
import { TableFilterMenu } from './TableFilterMenu';

const attributes = [
  { key: 'status', label: 'Status', values: ['Open', 'In Process', 'Resolved'] },
  { key: 'priority', label: 'Priority', values: ['High', 'Low'] },
];

const open = async () => {
  await userEvent.click(screen.getByRole('button', { name: /Filters/ }));
};

describe('TableFilterMenu', () => {
  describe('picking an attribute', () => {
    it('lists what can be filtered', async () => {
      render(
        <TableFilterMenu attributes={attributes} valuesFor={() => []} onToggleValue={vi.fn()} />
      );
      await open();
      expect(screen.getByRole('option', { name: /Status/ })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /Priority/ })).toBeInTheDocument();
    });

    it('shows how many values each attribute already has', async () => {
      render(
        <TableFilterMenu
          attributes={attributes}
          valuesFor={(a) => (a === 'status' ? ['Open', 'Resolved'] : [])}
          onToggleValue={vi.fn()}
        />
      );
      await open();
      // Otherwise finding out what is filtered means opening each in turn.
      expect(screen.getByRole('option', { name: /Status\s*2/ })).toBeInTheDocument();
    });

    it('filters the attribute list as you type', async () => {
      render(
        <TableFilterMenu attributes={attributes} valuesFor={() => []} onToggleValue={vi.fn()} />
      );
      await open();
      await userEvent.type(screen.getByPlaceholderText('Search'), 'zzz');
      expect(screen.getByText('No attributes match.')).toBeInTheDocument();
    });
  });

  describe('picking values', () => {
    it('drills in and back', async () => {
      render(
        <TableFilterMenu attributes={attributes} valuesFor={() => []} onToggleValue={vi.fn()} />
      );
      await open();
      await userEvent.click(screen.getByRole('option', { name: /Status/ }));
      expect(screen.getByRole('option', { name: 'In Process' })).toBeInTheDocument();
      await userEvent.click(screen.getByRole('button', { name: 'Back to attributes' }));
      expect(screen.getByRole('option', { name: /Priority/ })).toBeInTheDocument();
    });

    it('reports the attribute and the value', async () => {
      const onToggleValue = vi.fn();
      render(
        <TableFilterMenu
          attributes={attributes}
          valuesFor={() => []}
          onToggleValue={onToggleValue}
        />
      );
      await open();
      await userEvent.click(screen.getByRole('option', { name: /Status/ }));
      await userEvent.click(screen.getByRole('option', { name: 'Open' }));
      expect(onToggleValue).toHaveBeenCalledWith('status', 'Open');
    });

    it('says when a value search matches nothing', async () => {
      render(
        <TableFilterMenu attributes={attributes} valuesFor={() => []} onToggleValue={vi.fn()} />
      );
      await open();
      await userEvent.click(screen.getByRole('option', { name: /Status/ }));
      await userEvent.type(screen.getByPlaceholderText('Search'), 'zzz');
      expect(screen.getByText('No values match.')).toBeInTheDocument();
    });
  });

  describe('the trigger', () => {
    it('counts attributes rather than values', () => {
      render(
        <TableFilterMenu
          attributes={attributes}
          valuesFor={() => []}
          onToggleValue={vi.fn()}
          count={2}
        />
      );
      // "2" should mean two things are narrowing the table, not two values.
      const trigger = screen.getByRole('button', { name: /Filters/ });
      expect(trigger).toHaveTextContent('2');
      expect(trigger).toHaveClass('mdt-border-primary');
    });

    it('is unmarked when nothing is filtered', () => {
      render(
        <TableFilterMenu attributes={attributes} valuesFor={() => []} onToggleValue={vi.fn()} />
      );
      expect(screen.getByRole('button', { name: /Filters/ })).not.toHaveClass('mdt-border-primary');
    });

    it('takes a label and classes of its own', () => {
      render(
        <TableFilterMenu
          attributes={attributes}
          valuesFor={() => []}
          onToggleValue={vi.fn()}
          label="Narrow"
          className="custom"
        />
      );
      expect(screen.getByRole('button', { name: /Narrow/ })).toHaveClass('custom');
    });
  });

  describe('clearing', () => {
    it('offers Clear all only when something is filtered and it can clear', async () => {
      const onClear = vi.fn();
      const { rerender } = render(
        <TableFilterMenu
          attributes={attributes}
          valuesFor={() => []}
          onToggleValue={vi.fn()}
          onClear={onClear}
          count={0}
        />
      );
      await open();
      expect(screen.queryByRole('button', { name: /Clear all filters/ })).not.toBeInTheDocument();

      rerender(
        <TableFilterMenu
          attributes={attributes}
          valuesFor={() => []}
          onToggleValue={vi.fn()}
          onClear={onClear}
          count={1}
        />
      );
      await userEvent.click(screen.getByRole('button', { name: /Clear all filters/ }));
      expect(onClear).toHaveBeenCalledTimes(1);
    });
  });
});

describe('TableFilterChips', () => {
  const labelFor = (key: string) => attributes.find((a) => a.key === key)?.label ?? key;

  it('renders nothing when nothing is filtered', () => {
    const { container } = render(
      <TableFilterChips filters={[]} labelFor={labelFor} onRemove={vi.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('names the attribute, because a value alone is ambiguous', () => {
    render(
      <TableFilterChips
        filters={[{ attribute: 'status', values: ['Open'] }]}
        labelFor={labelFor}
        onRemove={vi.fn()}
      />
    );
    expect(screen.getByText(/Status: Open/)).toBeInTheDocument();
  });

  it('joins several values into one chip', () => {
    render(
      <TableFilterChips
        filters={[{ attribute: 'status', values: ['Open', 'In Process'] }]}
        labelFor={labelFor}
        onRemove={vi.fn()}
      />
    );
    // Two chips would read as two filters that both have to be true, which is
    // the opposite of what an or-list does.
    expect(screen.getByText(/Status: Open, In Process/)).toBeInTheDocument();
  });

  it('removes one filter', async () => {
    const onRemove = vi.fn();
    render(
      <TableFilterChips
        filters={[{ attribute: 'status', values: ['Open'] }]}
        labelFor={labelFor}
        onRemove={onRemove}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(onRemove).toHaveBeenCalledWith('status');
  });

  it('offers Clear all only past one filter', () => {
    const { rerender } = render(
      <TableFilterChips
        filters={[{ attribute: 'status', values: ['Open'] }]}
        labelFor={labelFor}
        onRemove={vi.fn()}
        onClear={vi.fn()}
      />
    );
    // With one chip it would sit beside a cross that already does the job.
    expect(screen.queryByRole('button', { name: 'Clear all' })).not.toBeInTheDocument();

    rerender(
      <TableFilterChips
        filters={[
          { attribute: 'status', values: ['Open'] },
          { attribute: 'priority', values: ['High'] },
        ]}
        labelFor={labelFor}
        onRemove={vi.fn()}
        onClear={vi.fn()}
      />
    );
    expect(screen.getByRole('button', { name: 'Clear all' })).toBeInTheDocument();
  });

  it('falls back to the key when an attribute has no label', () => {
    render(
      <TableFilterChips
        filters={[{ attribute: 'mystery', values: ['x'] }]}
        labelFor={labelFor}
        onRemove={vi.fn()}
      />
    );
    expect(screen.getByText(/mystery: x/)).toBeInTheDocument();
  });
});
