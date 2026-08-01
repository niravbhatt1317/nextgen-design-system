import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox, CheckboxGroup } from './Checkbox';

describe('Checkbox', () => {
  it('renders checkbox', () => {
    render(<Checkbox aria-label="Test checkbox" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('toggles checked state on click', async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Test checkbox" />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('renders with default checked state', () => {
    render(<Checkbox defaultChecked aria-label="Test checkbox" />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('handles disabled state', () => {
    render(<Checkbox disabled aria-label="Disabled checkbox" />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('renders card variant with content', () => {
    render(
      <Checkbox variant="card" aria-label="Card checkbox">
        <div>Card content</div>
      </Checkbox>
    );

    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('calls onCheckedChange when toggled', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox onCheckedChange={handleChange} aria-label="Test checkbox" />);

    await user.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('applies custom className', () => {
    render(<Checkbox className="custom-class" aria-label="Test checkbox" />);
    expect(screen.getByRole('checkbox')).toHaveClass('custom-class');
  });

  it('handles controlled checked state', () => {
    const { rerender } = render(<Checkbox checked={false} aria-label="Test checkbox" />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();

    rerender(<Checkbox checked={true} aria-label="Test checkbox" />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('supports indeterminate state', () => {
    render(<Checkbox checked="indeterminate" aria-label="Test checkbox" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.getAttribute('data-state')).toBe('indeterminate');
  });

  describe('the mark', () => {
    // Radix shows the indicator for `indeterminate` as well as `checked`, so a
    // half-selected box painted a full tick until the glyph was swapped. A
    // header checkbox is the one place that is always wrong and never obvious.
    const marks = (container: HTMLElement) =>
      [...container.querySelectorAll('svg')].map((svg) => svg.getAttribute('class') ?? '');

    it('hides the dash and shows the tick until the state says otherwise', () => {
      const { container } = render(<Checkbox checked aria-label="Test checkbox" />);
      const [tick, dash] = marks(container);
      expect(tick).toContain('group-data-[state=indeterminate]/mark:mdt-hidden');
      expect(dash).toContain('mdt-hidden');
      expect(dash).toContain('group-data-[state=indeterminate]/mark:mdt-block');
    });

    it('fills the box in both marked states', () => {
      render(<Checkbox checked="indeterminate" aria-label="Test checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('data-[state=indeterminate]:mdt-bg-primary');
      expect(checkbox).toHaveClass('data-[state=checked]:mdt-bg-primary');
    });

    it('carries both marks in the card variant too', () => {
      const { container } = render(
        <Checkbox variant="card-with-checkbox" checked="indeterminate" aria-label="Card checkbox">
          Card
        </Checkbox>
      );
      expect(marks(container)).toHaveLength(2);
    });
  });

  it('handles id attribute', () => {
    render(<Checkbox id="test-id" aria-label="Test checkbox" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.getAttribute('id')).toBe('test-id');
  });

  it('does not trigger events when disabled', () => {
    const handleChange = vi.fn();
    render(<Checkbox disabled onCheckedChange={handleChange} aria-label="Test checkbox" />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders card variant without children', () => {
    render(<Checkbox variant="card" aria-label="Card checkbox" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  describe('card-with-checkbox variant', () => {
    it('renders card-with-checkbox variant with children', () => {
      render(
        <Checkbox variant="card-with-checkbox" aria-label="Card with checkbox">
          <div>Card content with checkbox</div>
        </Checkbox>
      );

      expect(screen.getByText('Card content with checkbox')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders checked state in card-with-checkbox variant', () => {
      render(
        <Checkbox variant="card-with-checkbox" defaultChecked aria-label="Checked card">
          <div>Checked card content</div>
        </Checkbox>
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('toggles card-with-checkbox variant', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Checkbox
          variant="card-with-checkbox"
          onCheckedChange={handleChange}
          aria-label="Toggle card"
        >
          <div>Toggleable card</div>
        </Checkbox>
      );

      await user.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('applies custom className to card-with-checkbox', () => {
      render(
        <Checkbox variant="card-with-checkbox" className="my-custom-class" aria-label="Custom card">
          <div>Custom class card</div>
        </Checkbox>
      );

      expect(screen.getByRole('checkbox')).toHaveClass('my-custom-class');
    });

    it('supports disabled state in card-with-checkbox variant', () => {
      render(
        <Checkbox variant="card-with-checkbox" disabled aria-label="Disabled card">
          <div>Disabled card</div>
        </Checkbox>
      );

      expect(screen.getByRole('checkbox')).toBeDisabled();
    });
  });

  describe('stable layout', () => {
    it('sits off the text baseline so ticking it cannot move the line box', () => {
      // The tick indicator only exists while checked. On a baseline-aligned
      // inline-block that meant checking the box grew the surrounding line box -
      // a table row measurably jumped from 53px to 55px on every click.
      const { container } = render(<Checkbox aria-label="Select" />);
      const root = container.querySelector('[role="checkbox"]');
      expect(root).toHaveClass('mdt-align-middle');
      expect(root).toHaveClass('mdt-inline-flex');
    });

    it('keeps the same classes checked and unchecked', () => {
      const { container: off } = render(<Checkbox aria-label="a" />);
      const { container: on } = render(<Checkbox aria-label="b" checked />);
      const cls = (c: HTMLElement) =>
        (c.querySelector('[role="checkbox"]') as HTMLElement).className
          .split(' ')
          .filter((x) => !x.includes('data-'))
          .sort()
          .join(' ');
      expect(cls(off)).toBe(cls(on));
    });
  });
});

describe('CheckboxGroup · chips', () => {
  const chips = (c: HTMLElement) => [...c.querySelectorAll('[data-slot="checkbox-chip"]')];
  const group = (c: HTMLElement) => c.querySelector('[data-slot="checkbox-group"]');

  const render3 = (props: Record<string, unknown> = {}) =>
    render(
      <CheckboxGroup label="Affected services" {...props}>
        <Checkbox defaultChecked>Network</Checkbox>
        <Checkbox>Storage</Checkbox>
        <Checkbox>Database</Checkbox>
      </CheckboxGroup>
    );

  it('is a named group of real checkboxes, not a row of buttons', () => {
    render3();
    expect(screen.getByRole('group', { name: 'Affected services' })).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
    expect(screen.getByRole('checkbox', { name: 'Network' })).toBeChecked();
  });

  it('lets go when pressed again, which is what makes it a checkbox and not a tag', async () => {
    render3();
    const chip = screen.getByRole('checkbox', { name: 'Storage' });
    await userEvent.click(chip);
    expect(chip).toBeChecked();
    await userEvent.click(chip);
    expect(chip).not.toBeChecked();
  });

  it('wraps rather than joining, because several answers are allowed', () => {
    const { container } = render3();
    expect(group(container)).toHaveClass('mdt-flex-wrap');
    // no shared edges: a joined strip is Radio's segmented variant, not this
    expect(group(container)).not.toHaveClass('mdt-overflow-hidden');
    expect(group(container)).toHaveClass('mdt-gap-2');
  });

  it('stays an outline, chosen or not', () => {
    const { container } = render3();
    const chip = chips(container)[0];
    expect(chip).toHaveClass('mdt-bg-transparent');
    expect(chip).toHaveClass('mdt-border');
    // chosen lifts the ground a step; it never fills solid
    expect(chip).toHaveClass('data-[state=checked]:mdt-bg-secondary');
    expect(chip).not.toHaveClass('data-[state=checked]:mdt-bg-primary');
  });

  it('firms the edge and the text when chosen, but never the weight', () => {
    const { container } = render3();
    const chip = chips(container)[0];
    expect(chip).toHaveClass('data-[state=checked]:mdt-border-foreground');
    expect(chip).toHaveClass('data-[state=checked]:mdt-text-foreground');
    // bolder text is wider text - 1.4px to 3.4px a chip, which across a row is
    // enough to tip it onto another line and undo the held tick space
    expect(chip).not.toHaveClass('data-[state=checked]:mdt-font-semibold');
  });

  it('holds the room for the tick, so nothing moves when a chip is pressed', () => {
    const { container } = render3();
    const tick = container.querySelector('[data-slot="checkbox-chip-tick"]');
    // present from the start, and only its opacity changes
    expect(tick).toBeInTheDocument();
    expect(tick).toHaveClass('mdt-opacity-0');
    expect(tick).toHaveClass('group-data-[state=checked]:mdt-opacity-100');
    expect(tick).not.toHaveClass('mdt-hidden');
  });

  it('puts the tick after the label, not before it', () => {
    const { container } = render3();
    const chip = chips(container)[0] as HTMLElement;
    const tick = chip.querySelector('[data-slot="checkbox-chip-tick"]');
    expect(chip.lastElementChild).toBe(tick);
  });

  it('keeps the tick out of the name a screen reader reads', () => {
    render3();
    // the label is the whole accessible name - no stray "check" in it
    expect(screen.getByRole('checkbox', { name: 'Network' })).toBeInTheDocument();
  });

  it('takes the variant from the group, so a chip does not repeat it', () => {
    const { container } = render3();
    expect(chips(container)).toHaveLength(3);
  });

  it('is taller than a TagPill, which is what keeps the two apart', () => {
    const { container: md } = render3();
    expect(chips(md)[0]).toHaveClass('mdt-h-8'); // 32px, against TagPill's 24
    const { container: sm } = render3({ size: 'sm' });
    expect(chips(sm)[0]).toHaveClass('mdt-h-7');
  });

  it('lets one chip override the group size', () => {
    const { container } = render(
      <CheckboxGroup label="Sizes">
        <Checkbox>A</Checkbox>
        <Checkbox size="sm">B</Checkbox>
      </CheckboxGroup>
    );
    const [a, b] = chips(container);
    expect(a).toHaveClass('mdt-h-8');
    expect(b).toHaveClass('mdt-h-7');
  });

  it('keeps a chip that cannot be pressed in the row', () => {
    const { container } = render(
      <CheckboxGroup label="Affected services">
        <Checkbox defaultChecked>Network</Checkbox>
        <Checkbox disabled>Storage</Checkbox>
      </CheckboxGroup>
    );
    expect(chips(container)).toHaveLength(2);
    expect(screen.getByRole('checkbox', { name: 'Storage' })).toBeDisabled();
  });

  it('reports each answer on its own', async () => {
    const onCheckedChange = vi.fn();
    render(
      <CheckboxGroup label="Affected services">
        <Checkbox onCheckedChange={onCheckedChange}>Network</Checkbox>
      </CheckboxGroup>
    );
    await userEvent.click(screen.getByRole('checkbox', { name: 'Network' }));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('leaves every other checkbox variant exactly as it was', () => {
    const { container } = render(<Checkbox aria-label="Plain" />);
    const box = container.querySelector('[role="checkbox"]');
    expect(box).toHaveClass('mdt-h-4');
    expect(box).toHaveClass('mdt-rounded-sm');
    expect(container.querySelectorAll('[data-slot="checkbox-chip"]')).toHaveLength(0);
  });

  it('stacks rather than wrapping when the group is not chips', () => {
    const { container } = render(
      <CheckboxGroup variant="default" label="Plain">
        <Checkbox aria-label="One" />
        <Checkbox aria-label="Two" />
      </CheckboxGroup>
    );
    expect(group(container)).toHaveClass('mdt-flex-col');
    expect(chips(container)).toHaveLength(0);
  });
});
