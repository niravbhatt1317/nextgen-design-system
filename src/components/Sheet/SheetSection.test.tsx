import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SheetSection } from './SheetParts';

/* SheetSection's measures, ported from the console's drawer section 2026-10-28 (the fleets' SectionHead / Note /
 * Rows / SectionGap). The behaviour tests live in SheetParts.test.tsx. */
describe('SheetSection - the console drawer section', () => {
  const section = () => screen.getByRole('heading', { name: 'Health' }).closest('section');
  const head = () => section()?.querySelector('[data-slot="sheet-section-head"]');

  it('holds the heading row at 24 at least, the action 12 from the heading', () => {
    render(<SheetSection title="Health" action={<button type="button">Manage</button>} />);
    expect(head()).toHaveClass(
      'mdt-flex',
      'mdt-min-h-6',
      'mdt-items-center',
      'mdt-justify-between',
      'mdt-gap-3'
    );
    expect(head()).not.toHaveClass('mdt-min-h-8');
  });

  it('sets the heading 14/600 on its 1.5 line in the title ink', () => {
    render(<SheetSection title="Health" />);
    expect(screen.getByRole('heading', { name: 'Health' })).toHaveClass(
      'mdt-text-sm',
      'mdt-font-semibold',
      'mdt-leading-normal',
      'mdt-text-neutral-150'
    );
  });

  it('sets the hint 12 on a 1.5 line in the quiet ink, 4 under the heading', () => {
    render(<SheetSection title="Health" hint="The last 24 hours." />);
    expect(screen.getByText('The last 24 hours.')).toHaveClass(
      'mdt-mt-1',
      'mdt-text-xs',
      'mdt-leading-normal',
      'mdt-text-neutral-70'
    );
  });

  it('puts the content 16 under the heading, its parts 12 apart', () => {
    render(
      <SheetSection title="Health">
        <p>One</p>
        <p>Two</p>
      </SheetSection>
    );
    expect(screen.getByText('One').parentElement).toHaveClass(
      'mdt-mt-4',
      'mdt-flex-col',
      'mdt-gap-3'
    );
  });

  it('stands a following section 32 below with nothing drawn between them', () => {
    render(<SheetSection title="Health" />);
    const el = section();
    expect(el?.className).toContain('[&+&]:mdt-mt-8');
    expect(el?.className).not.toContain('mdt-border-t');
    expect(el?.className).not.toContain('mdt-pt-5');
  });

  it('draws no hint and no content box when given none', () => {
    render(<SheetSection title="Health" />);
    expect(section()?.querySelectorAll('p')).toHaveLength(0);
    expect(section()?.children).toHaveLength(1);
  });
});
