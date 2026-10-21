import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Stepper } from './Stepper';
import type { StepperStep } from './Stepper.types';

const LABEL = 'Create organization';

const STEPS: StepperStep[] = [
  { label: 'Essentials', description: 'Required · 3 fields' },
  { label: 'Profile' },
  { label: 'Security policy' },
  { label: 'Allowed domains' },
  { label: 'Sites' },
];

const steps = () => screen.getAllByRole('listitem');
const stateOf = (i: number) => steps()[i]?.getAttribute('data-state');
const connectorOf = (i: number) => steps()[i]?.querySelector('[data-slot="stepper-connector"]');

describe('Stepper - layout="vertical"', () => {
  describe('what it is', () => {
    it('is a named list inside a nav', () => {
      render(<Stepper layout="vertical" steps={STEPS} current={0} aria-label={LABEL} />);
      expect(screen.getByRole('navigation', { name: LABEL })).toBeInTheDocument();
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(steps()).toHaveLength(5);
    });

    it('shows the description under its label', () => {
      render(<Stepper layout="vertical" steps={STEPS} current={0} aria-label={LABEL} />);
      expect(steps()[0]).toHaveTextContent('Required · 3 fields');
    });
  });

  describe('state, worked out from current and reached', () => {
    it('without reached: behind is complete, ahead is upcoming', () => {
      render(<Stepper layout="vertical" steps={STEPS} current={2} aria-label={LABEL} />);
      expect([0, 1, 2, 3, 4].map(stateOf)).toEqual([
        'complete',
        'complete',
        'current',
        'upcoming',
        'upcoming',
      ]);
    });

    it('with reached ahead of current: steps before it stay complete, and it is where you left off', () => {
      render(
        <Stepper layout="vertical" steps={STEPS} current={1} reached={3} aria-label={LABEL} />
      );
      expect([0, 1, 2, 3, 4].map(stateOf)).toEqual([
        'complete',
        'current',
        'complete',
        'reached',
        'upcoming',
      ]);
    });

    it('treats reached below current as current', () => {
      render(
        <Stepper layout="vertical" steps={STEPS} current={2} reached={0} aria-label={LABEL} />
      );
      expect(stateOf(3)).toBe('upcoming');
      expect(steps()[3]).toHaveAttribute('aria-disabled', 'true');
    });

    it('marks exactly one step as the current one', () => {
      render(
        <Stepper layout="vertical" steps={STEPS} current={2} reached={3} aria-label={LABEL} />
      );
      const marked = steps().filter((li) => li.getAttribute('aria-current') === 'step');
      expect(marked).toHaveLength(1);
      expect(marked[0]).toHaveTextContent('Security policy');
    });

    it('lets a step be set to disabled by hand', () => {
      const withDisabled = STEPS.map((s, i) =>
        i === 1 ? { ...s, state: 'disabled' as const } : s
      );
      render(
        <Stepper
          layout="vertical"
          steps={withDisabled}
          current={0}
          reached={3}
          aria-label={LABEL}
        />
      );
      expect(stateOf(1)).toBe('disabled');
      expect(steps()[1]).toHaveAttribute('aria-disabled', 'true');
    });

    it('fills the rail down to the furthest step reached - going back does not empty it', () => {
      render(
        <Stepper layout="vertical" steps={STEPS} current={1} reached={2} aria-label={LABEL} />
      );
      expect(connectorOf(0)).toHaveAttribute('data-joined', 'true');
      // Under the step you went back to: the step after it was reached, so it stays lit.
      expect(connectorOf(1)).toHaveAttribute('data-joined', 'true');
      // Under where you left off: what comes next is not reached yet.
      expect(connectorOf(2)).toHaveAttribute('data-joined', 'false');
      expect(connectorOf(3)).toHaveAttribute('data-joined', 'false');
      expect(connectorOf(4)).toBeNull();
    });

    it('never lights the rail under a skipped step', () => {
      const withSkipped = STEPS.map((s, i) => (i === 1 ? { ...s, state: 'skipped' as const } : s));
      render(<Stepper layout="vertical" steps={withSkipped} current={3} aria-label={LABEL} />);
      expect(connectorOf(0)).toHaveAttribute('data-joined', 'true');
      expect(connectorOf(1)).toHaveAttribute('data-joined', 'false');
      expect(connectorOf(2)).toHaveAttribute('data-joined', 'true');
    });
  });

  describe('where you can go', () => {
    it('has nothing focusable without onStepSelect', () => {
      render(
        <Stepper layout="vertical" steps={STEPS} current={2} reached={3} aria-label={LABEL} />
      );
      expect(screen.queryAllByRole('button')).toHaveLength(0);
    });

    it('makes every unlocked step a button except the current one', () => {
      render(
        <Stepper
          layout="vertical"
          steps={STEPS}
          current={1}
          reached={3}
          onStepSelect={vi.fn()}
          aria-label={LABEL}
        />
      );
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
      expect(buttons[0]).toHaveTextContent('Essentials');
      expect(buttons[1]).toHaveTextContent('Security policy');
      expect(buttons[2]).toHaveTextContent('Allowed domains');
    });

    it('hands back the index and the step on click', async () => {
      const onStepSelect = vi.fn();
      render(
        <Stepper
          layout="vertical"
          steps={STEPS}
          current={1}
          reached={3}
          onStepSelect={onStepSelect}
          aria-label={LABEL}
        />
      );
      await userEvent.click(screen.getByRole('button', { name: /Allowed domains/ }));
      expect(onStepSelect).toHaveBeenCalledWith(3, STEPS[3]);
    });

    it('opens with the keyboard', async () => {
      const onStepSelect = vi.fn();
      render(
        <Stepper
          layout="vertical"
          steps={STEPS}
          current={1}
          reached={2}
          onStepSelect={onStepSelect}
          aria-label={LABEL}
        />
      );
      await userEvent.tab();
      expect(screen.getByRole('button', { name: /Essentials/ })).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      expect(onStepSelect).toHaveBeenLastCalledWith(0, STEPS[0]);
      await userEvent.tab();
      expect(screen.getByRole('button', { name: /Security policy/ })).toHaveFocus();
      await userEvent.keyboard(' ');
      expect(onStepSelect).toHaveBeenLastCalledWith(2, STEPS[2]);
    });

    it('never lets focus reach a locked step', async () => {
      render(
        <Stepper
          layout="vertical"
          steps={STEPS}
          current={0}
          reached={1}
          onStepSelect={vi.fn()}
          aria-label={LABEL}
        />
      );
      await userEvent.tab();
      expect(screen.getByRole('button', { name: /Profile/ })).toHaveFocus();
      await userEvent.tab();
      expect(document.body).toHaveFocus();
      expect(steps()[2]?.querySelector('button')).toBeNull();
      expect(steps()[2]).toHaveAttribute('aria-disabled', 'true');
    });

    it('says what opens a locked step, when the step before has a text label', () => {
      render(
        <Stepper layout="vertical" steps={STEPS} current={0} reached={1} aria-label={LABEL} />
      );
      expect(steps()[2]).toHaveAttribute('title', 'Opens after Profile');
      expect(steps()[1]).not.toHaveAttribute('title');
    });

    it('stays quiet when the step before is not plain text', () => {
      const rich: StepperStep[] = [{ label: <b>Essentials</b> }, { label: 'Profile' }];
      render(<Stepper layout="vertical" steps={rich} current={0} aria-label={LABEL} />);
      expect(steps()[1]).not.toHaveAttribute('title');
    });

    it('never makes a disabled step clickable, even when reached', () => {
      const withDisabled = STEPS.map((s, i) =>
        i === 2 ? { ...s, state: 'disabled' as const } : s
      );
      render(
        <Stepper
          layout="vertical"
          steps={withDisabled}
          current={0}
          reached={3}
          onStepSelect={vi.fn()}
          aria-label={LABEL}
        />
      );
      expect(screen.queryByRole('button', { name: /Security policy/ })).toBeNull();
    });

    it('never makes a skipped step clickable, even when reached', () => {
      const withSkipped = STEPS.map((s, i) => (i === 2 ? { ...s, state: 'skipped' as const } : s));
      render(
        <Stepper
          layout="vertical"
          steps={withSkipped}
          current={0}
          reached={3}
          onStepSelect={vi.fn()}
          aria-label={LABEL}
        />
      );
      expect(screen.queryByRole('button', { name: /Security policy/ })).toBeNull();
      expect(screen.getByRole('button', { name: /Allowed domains/ })).toBeInTheDocument();
    });
  });

  describe('going back keeps your progress', () => {
    const revisit = (onStepSelect?: () => void) =>
      render(
        <Stepper
          layout="vertical"
          steps={STEPS}
          current={0}
          reached={3}
          {...(onStepSelect ? { onStepSelect } : {})}
          aria-label={LABEL}
        />
      );
    const discOf = (i: number) =>
      steps()[i]?.querySelector('[data-slot="stepper-disc"]') as HTMLElement;
    const labelOf = (i: number) =>
      steps()[i]?.querySelector('[data-slot="stepper-label"]') as HTMLElement;

    it('keeps the tick on the step you went back to, inside a "you are here" ring', () => {
      revisit();
      const disc = discOf(0);
      expect(disc).toHaveAttribute('data-here', 'true');
      expect(disc.className).toContain('mdt-bg-primary');
      expect(disc.className).toContain('mdt-ring-primary');
      expect(disc.className).toContain('mdt-ring-offset-2');
      expect(disc.querySelector('svg')).not.toBeNull();
      expect(steps()[0]).toHaveAttribute('aria-current', 'step');
    });

    it('draws where you left off outlined in primary, its number in full ink', () => {
      revisit();
      const disc = discOf(3);
      expect(disc).toHaveTextContent('4');
      expect(disc.className).toContain('mdt-border-primary');
      expect(disc.className).toContain('mdt-bg-transparent');
      expect(disc.className).toContain('mdt-text-foreground');
      expect(labelOf(3).className).toContain('mdt-text-foreground');
      expect(labelOf(3).className).not.toContain('mdt-text-muted-foreground');
    });

    it('rings nothing when you have not gone back', () => {
      render(<Stepper layout="vertical" steps={STEPS} current={2} aria-label={LABEL} />);
      expect(document.querySelector('[data-here]')).toBeNull();
    });

    it('says what the tick and the ring say, for a screen reader', () => {
      revisit(vi.fn());
      expect(steps()[0]).toHaveTextContent('Essentials, done, you are here');
      expect(screen.getByRole('button', { name: 'Profile, done' })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Allowed domains, where you left off' })
      ).toBeInTheDocument();
    });

    it('reads a finished description in the secondary ink and a locked one in the quiet ink', () => {
      const described = STEPS.map((s) => ({ ...s, description: `About ${String(s.label)}` }));
      render(
        <Stepper layout="vertical" steps={described} current={0} reached={3} aria-label={LABEL} />
      );
      const descOf = (i: number) =>
        steps()[i]?.querySelector('[data-slot="stepper-description"]') as HTMLElement;
      expect(descOf(0).className).toContain('mdt-text-neutral-90');
      expect(descOf(1).className).toContain('mdt-text-neutral-90');
      expect(descOf(3).className).toContain('mdt-text-neutral-90');
      expect(descOf(4).className).toContain('mdt-text-muted-foreground');
    });
  });

  describe('hover and focus mark the disc and the name, nothing else', () => {
    const clickable = () =>
      render(
        <Stepper
          layout="vertical"
          steps={STEPS}
          current={2}
          onStepSelect={vi.fn()}
          aria-label={LABEL}
        />
      );

    it('gives the button no wash, padding or ring of its own', () => {
      clickable();
      const button = screen.getByRole('button', { name: /Profile/ });
      expect(button.className).not.toMatch(/hover:mdt-bg-/);
      expect(button.className).not.toMatch(/focus-visible:mdt-ring/);
      expect(button.className).not.toMatch(/\bmdt-p[xytblr]?-(?!0\b)/);
    });

    it('halos the disc under the pointer and rings it on keyboard focus', () => {
      clickable();
      const disc = screen
        .getByRole('button', { name: /Profile/ })
        .querySelector('[data-slot="stepper-disc"]') as HTMLElement;
      expect(disc.className).toContain('group-hover/stepper-hit:mdt-ring-4');
      expect(disc.className).toContain('group-focus-visible/stepper-hit:mdt-ring-ring');
    });

    it('draws a dashed underline under the name on hover', () => {
      clickable();
      const label = screen
        .getByRole('button', { name: /Profile/ })
        .querySelector('[data-slot="stepper-label"]') as HTMLElement;
      expect(label.className).toContain('mdt-decoration-dashed');
      expect(label.className).toContain('group-hover/stepper-hit:mdt-decoration-foreground/55');
    });

    it('is the same box clickable or not, so nothing moves', () => {
      const { unmount } = render(
        <Stepper layout="vertical" steps={STEPS} current={2} aria-label={LABEL} />
      );
      const plain = (steps()[1]?.querySelector('[data-slot="stepper-disc"]') as HTMLElement)
        .parentElement as HTMLElement;
      const plainBox = plain.className.split(' ');
      const plainItem = steps()[1]?.className;
      unmount();

      clickable();
      const button = screen.getByRole('button', { name: /Profile/ });
      expect(plainBox.every((c) => button.className.split(' ').includes(c))).toBe(true);
      expect(steps()[1]?.className).toBe(plainItem);
    });
  });
});
