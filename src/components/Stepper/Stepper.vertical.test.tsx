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

    it('with reached ahead of current: steps up to reached stay complete', () => {
      render(
        <Stepper layout="vertical" steps={STEPS} current={1} reached={3} aria-label={LABEL} />
      );
      expect([0, 1, 2, 3, 4].map(stateOf)).toEqual([
        'complete',
        'current',
        'complete',
        'complete',
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

    it('fills the line under a step only once that step is complete', () => {
      render(
        <Stepper layout="vertical" steps={STEPS} current={1} reached={2} aria-label={LABEL} />
      );
      expect(connectorOf(0)).toHaveAttribute('data-joined', 'true');
      expect(connectorOf(1)).toHaveAttribute('data-joined', 'false');
      expect(connectorOf(2)).toHaveAttribute('data-joined', 'true');
      expect(connectorOf(3)).toHaveAttribute('data-joined', 'false');
      expect(connectorOf(4)).toBeNull();
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
  });
});
