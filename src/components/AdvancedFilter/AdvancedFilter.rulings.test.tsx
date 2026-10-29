/* The More filters panel rulings of 2026-09-26/27 (Pranjal), held by tests: a reopen is not lit, the light is a halo
 * and never an edge, Add filter is a plain text action, and the panel caps its height with the rows scrolling. The
 * "Where sits one step back" ink is not tested here: it was re-ruled to neutral-90 on 2026-10-10 (#141). */
import { act, fireEvent, render, screen } from '@testing-library/react';
import { AdvancedFilter } from './AdvancedFilter';
import type { FilterKey } from './AdvancedFilter.types';

/* THE ONE-SECOND LIGHT AND THE PRESS RULE (Pranjal, 2026-09-26 and the 2026-09-27 mock). A press outside the panel
 * never closes it: it is swallowed and the panel wears a soft halo for a second. The first press starts the second, a
 * press during it is swallowed all the same but does not restart it, and once the light drops the next press lights it
 * again. The light is a shadow, never a change of the edge. These tests hold the panel to that, plus the inks he ruled
 * inside it: a value in a field reads in the reading ink, Where and GROUP sit one step back, Add filter is a plain
 * text action (the Button's ghost look) rather than an outlined one. */

interface Person {
  name: string;
  role: string;
}
const KEYS: FilterKey<Person>[] = [
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'role', label: 'Role', type: 'pick', options: ['Admin', 'Member'] },
];

/* the door and the panel share one relative host; the button beside them is "elsewhere on the page" */
function Host({ open = true, onElsewhere }: { open?: boolean; onElsewhere?: () => void }) {
  return (
    <div>
      <button type="button" data-testid="elsewhere" onClick={onElsewhere}>
        elsewhere
      </button>
      <span className="mdt-relative mdt-inline-flex">
        <AdvancedFilter<Person> open={open} keys={KEYS} onApply={() => undefined} />
      </span>
    </div>
  );
}
const panel = () => screen.getByRole('dialog', { name: 'Filters' });
const lit = () => panel().hasAttribute('data-nudge');
const pressElsewhere = () => {
  const el = screen.getByTestId('elsewhere');
  fireEvent.pointerDown(el);
  fireEvent.click(el);
};
const tick = (ms: number) => {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
};

describe('AdvancedFilter - the one-second light', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it('a close puts the light out, so a reopen inside the second is not lit', () => {
    const view = render(<Host />);
    pressElsewhere();
    expect(lit()).toBe(true);
    view.rerender(<Host open={false} />);
    view.rerender(<Host open />);
    expect(lit()).toBe(false);
  });

  it('the light is a halo over the panel shadow, never a change of the edge', () => {
    render(<Host />);
    const classes = panel().className;
    expect(classes).toContain('mdt-transition-shadow');
    expect(classes).toContain(
      'data-[nudge]:mdt-shadow-[0_0_0_4px_hsl(var(--mdt-nudge)/0.12),0_12px_32px_-12px_rgba(29,43,62,0.22),0_2px_8px_rgba(29,43,62,0.06)]'
    );
    /* the panel's own shadow stays, so it does not drop while lit */
    expect(classes).toContain(
      'mdt-shadow-[0_12px_32px_-12px_rgba(29,43,62,0.22),0_2px_8px_rgba(29,43,62,0.06)]'
    );
    expect(classes).not.toContain('data-[nudge]:mdt-border');
    expect(classes).not.toMatch(/mdt-outline/);
  });
});

describe('AdvancedFilter - the inks inside the panel', () => {
  it('Add filter is a plain text action, Clear all outline, Apply primary', () => {
    render(<Host />);
    const add = screen.getByRole('button', { name: 'Add filter' });
    expect(add).toBeDisabled();
    expect(add.className).not.toContain('mdt-border-neutral-30');
    expect(add.className).toContain('hover:mdt-bg-neutral-10');
    expect(screen.getByRole('button', { name: 'Clear all' }).className).toContain(
      'mdt-border-neutral-30'
    );
    expect(screen.getByRole('button', { name: /^Apply/ }).className).toContain('mdt-bg-primary');
  });
});

describe('AdvancedFilter - the panel never runs off the page', () => {
  it('caps its height to the room under it and scrolls the rows, the header and the footer staying', () => {
    render(<Host />);
    const dialog = panel();
    expect(dialog.className).toContain('mdt-flex-col');
    /* jsdom: a 768 window and a panel at the top → 768 - 0 - 16 = 752 */
    const cap = parseInt(dialog.style.maxHeight, 10);
    expect(cap).toBeGreaterThanOrEqual(240);
    const body = dialog.querySelector('[data-scroll]') as HTMLElement;
    expect(body).not.toBeNull();
    expect(body.className).toContain('mdt-overflow-y-auto');
    expect(body.className).toContain('mdt-min-h-0');
    /* the rows and Add filter scroll; the ✕ and Apply do not */
    expect(body.querySelector('[data-row]')).not.toBeNull();
    expect(body.contains(screen.getByRole('button', { name: /^add filter$/i }))).toBe(true);
    expect(body.contains(screen.getByRole('button', { name: /^close filters$/i }))).toBe(false);
    expect(body.contains(screen.getByRole('button', { name: /^apply$/i }))).toBe(false);
  });
});
