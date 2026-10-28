import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Icon } from '../Icon';
import { OrgCard } from './OrgCard';

const NAME = 'MSP owner organization';
const LINE =
  'The team belongs to the active frame. Switch to a client frame to create a client team.';

const slot = (name: string) => document.querySelector<HTMLElement>(`[data-slot="${name}"]`);

describe('OrgCard', () => {
  describe('the words', () => {
    it('names the organization and says what belonging to it means', () => {
      render(<OrgCard name={NAME} line={LINE} />);
      expect(slot('org-card-name')).toHaveTextContent(NAME);
      expect(slot('org-card-line')).toHaveTextContent(LINE);
    });

    it('leaves the line out when there is none', () => {
      const { rerender } = render(<OrgCard name={NAME} />);
      expect(slot('org-card-line')).toBeNull();
      rerender(<OrgCard name={NAME} line="" />);
      expect(slot('org-card-line')).toBeNull();
    });

    it('prints the field label above the card and names the card by it', () => {
      render(<OrgCard label="Organization" name={NAME} line={LINE} />);
      expect(slot('org-card-label')).toHaveTextContent('Organization');
      expect(screen.getByRole('group', { name: 'Organization' })).toBe(slot('org-card'));
    });

    it('is not a group at all without a label', () => {
      const { rerender } = render(<OrgCard name={NAME} />);
      expect(screen.queryByRole('group')).toBeNull();
      expect(slot('org-card-label')).toBeNull();
      rerender(<OrgCard name={NAME} label="" />);
      expect(screen.queryByRole('group')).toBeNull();
    });
  });

  describe('the console look', () => {
    it('is a hairline outline at radius 10, no fill, 8 in, 12 between the parts', () => {
      render(<OrgCard name={NAME} />);
      const body = slot('org-card-body');
      for (const c of [
        'mdt-border',
        'mdt-border-neutral-20',
        'mdt-rounded-[10px]',
        'mdt-p-2',
        'mdt-gap-3',
      ])
        expect(body).toHaveClass(c);
      expect(body?.className).not.toMatch(/mdt-bg-/);
    });

    it('draws the 40 tile in the avatar-blue pair with the building at 20, hidden from the reader', () => {
      render(<OrgCard name={NAME} />);
      const tile = slot('org-card-tile');
      expect(tile).toHaveClass('mdt-size-10', 'mdt-rounded-[10px]');
      expect(tile?.className).toContain('--mdt-avatar-blue-fill');
      expect(tile?.className).toContain('--mdt-avatar-blue-ink');
      expect(tile).toHaveAttribute('aria-hidden', 'true');
      const svg = tile?.querySelector('svg');
      expect(svg).toHaveAttribute('name', 'building');
      expect(svg?.style.width).toBe('20px');
    });

    it('sets the name 14/500 in the reading ink and the line 12 in the faint ink', () => {
      render(<OrgCard name={NAME} line={LINE} label="Organization" />);
      expect(slot('org-card-name')).toHaveClass(
        'mdt-text-sm',
        'mdt-font-medium',
        'mdt-text-neutral-150'
      );
      expect(slot('org-card-line')).toHaveClass('mdt-text-xs', 'mdt-text-faint', 'mdt-mt-px');
      expect(slot('org-card-label')).toHaveClass(
        'mdt-text-[13px]',
        'mdt-font-medium',
        'mdt-text-neutral-90',
        'mdt-mb-2'
      );
    });
  });

  describe('the glyph', () => {
    it('takes another icon by name', () => {
      render(<OrgCard name={NAME} icon="users" />);
      expect(slot('org-card-tile')?.querySelector('svg')).toHaveAttribute('name', 'users');
    });

    it('draws a node at the tile size', () => {
      render(<OrgCard name={NAME} icon={<Icon name="globe" />} />);
      expect(slot('org-card-tile')?.querySelector('svg')?.style.width).toBe('20px');
    });
  });

  it('forwards the ref, className and the rest', () => {
    const ref = createRef<HTMLDivElement>();
    render(<OrgCard ref={ref} name={NAME} className="mine" id="org" style={{ marginTop: 16 }} />);
    expect(ref.current).toBe(slot('org-card'));
    expect(ref.current).toHaveClass('mine');
    expect(ref.current).toHaveAttribute('id', 'org');
    expect(ref.current?.style.marginTop).toBe('16px');
  });
});
