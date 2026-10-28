import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { SheetField, SheetFields } from './SheetParts';

const rowOf = (text: string): HTMLElement => {
  const row = screen.getByText(text).closest<HTMLElement>('[data-slot="sheet-field"]');
  if (!row) throw new Error(`no fact row holds ${text}`);
  return row;
};

describe('SheetField - the fact row', () => {
  it('splits the row in halves, centred, with no floor on its height', () => {
    render(<SheetField label="Email">sarah@company.com</SheetField>);
    const row = rowOf('Email');
    expect(row).toHaveClass('mdt-grid', 'mdt-grid-cols-2', 'mdt-items-center', 'mdt-gap-0');
    expect(row).not.toHaveClass('mdt-min-h-8');
  });

  it('reads the value in the reading ink and the label in the secondary ink, both 13 / 1.5', () => {
    render(<SheetField label="Email">sarah@company.com</SheetField>);
    const label = screen.getByText('Email');
    expect(label).toHaveClass('mdt-text-[13px]', 'mdt-leading-normal', 'mdt-text-neutral-90');
    const value = screen.getByText('sarah@company.com');
    expect(value).toHaveClass(
      'mdt-flex',
      'mdt-flex-wrap',
      'mdt-gap-1.5',
      'mdt-font-medium',
      'mdt-leading-normal',
      'mdt-text-neutral-150'
    );
  });

  it('takes the 3 : 7 split and a top alignment', () => {
    render(
      <SheetField label="Tags" ratio="3:7" align="top">
        role:edge
      </SheetField>
    );
    const row = rowOf('Tags');
    expect(row).toHaveClass('mdt-grid-cols-[minmax(0,3fr)_minmax(0,7fr)]', 'mdt-items-start');
    expect(row).not.toHaveClass('mdt-grid-cols-2');
  });

  it('puts an ⓘ after the label, named after it, that explains on hover', async () => {
    render(
      <SheetField label="Network zone" info="Taken from the agent's address.">
        Retail core
      </SheetField>
    );
    const tip = screen.getByRole('button', { name: 'About network zone' });
    expect(tip.parentElement).toHaveTextContent('Network zone');
    await userEvent.hover(tip);
    expect((await screen.findAllByText("Taken from the agent's address.")).length).toBeGreaterThan(
      0
    );
  });

  it('takes its own name for the ⓘ, and a generic one for a label that is not text', () => {
    render(
      <>
        <SheetField label="Renews" info="Every 30 days." infoLabel="About renewal">
          in 12 days
        </SheetField>
        <SheetField label={<em>Signed by</em>} info="The fleet's own authority.">
          OneOps CA
        </SheetField>
      </>
    );
    expect(screen.getByRole('button', { name: 'About renewal' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'About this' })).toBeInTheDocument();
  });

  it('has no ⓘ without info, and reads "-" with no value', () => {
    render(<SheetField label="VIP user" info={null} />);
    expect(screen.queryByRole('button')).toBeNull();
    expect(rowOf('VIP user')).toHaveTextContent('-');
  });

  it('ties the label to its control and forwards its ref', async () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <SheetField ref={ref} label="Job title" htmlFor="job" className="mine">
        <input id="job" />
      </SheetField>
    );
    expect(ref.current).toHaveAttribute('data-slot', 'sheet-field');
    expect(ref.current).toHaveClass('mine');
    await userEvent.click(screen.getByText('Job title'));
    expect(screen.getByRole('textbox', { name: 'Job title' })).toHaveFocus();
  });
});

describe('SheetFields - the stack', () => {
  it('stacks fact rows 18 apart, keeps a class and forwards its ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <SheetFields ref={ref} className="mine" aria-label="Overview">
        <SheetField label="Agent version">7.4.0</SheetField>
        <SheetField label="Address">10.32.0.14</SheetField>
      </SheetFields>
    );
    const stack = screen.getByLabelText('Overview');
    expect(ref.current).toBe(stack);
    expect(stack).toHaveAttribute('data-slot', 'sheet-fields');
    expect(stack).toHaveClass('mdt-flex', 'mdt-flex-col', 'mdt-gap-[18px]', 'mine');
    expect(stack.querySelectorAll('[data-slot="sheet-field"]')).toHaveLength(2);
  });
});
