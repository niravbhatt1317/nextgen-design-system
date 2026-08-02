import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Stepper } from './Stepper';
import type { StepperStep } from './Stepper.types';

const LABEL = 'Import assets';

const STEPS: StepperStep[] = [
  { label: 'Choose a source' },
  { label: 'Connect' },
  { label: 'Map fields' },
  { label: 'Review' },
];

const steps = () => screen.getAllByRole('listitem');
const list = () => screen.getByRole('list');
const discOf = (li: HTMLElement) => li.querySelector('[data-slot="stepper-disc"]') as HTMLElement;
const stateOf = (i: number) => steps()[i]?.getAttribute('data-state');

describe('Stepper', () => {
  describe('what it is', () => {
    it('is a list, not tabs - order matters and nothing is a tab', () => {
      render(<Stepper steps={STEPS} current={1} aria-label={LABEL} />);
      expect(list()).toBeInTheDocument();
      expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    it('is named, so it is not a nameless list of four things', () => {
      render(<Stepper steps={STEPS} current={1} aria-label={LABEL} />);
      expect(screen.getByRole('navigation', { name: LABEL })).toBeInTheDocument();
    });

    it('renders one item per step, in order', () => {
      render(<Stepper steps={STEPS} current={1} aria-label={LABEL} />);
      expect(steps()).toHaveLength(4);
      expect(steps()[0]).toHaveTextContent('Choose a source');
      expect(steps()[3]).toHaveTextContent('Review');
    });
  });

  describe('state, worked out from the counter', () => {
    it('marks everything behind you complete and everything ahead upcoming', () => {
      render(<Stepper steps={STEPS} current={2} aria-label={LABEL} />);
      expect(stateOf(0)).toBe('complete');
      expect(stateOf(1)).toBe('complete');
      expect(stateOf(2)).toBe('current');
      expect(stateOf(3)).toBe('upcoming');
    });

    it('marks exactly one step as the current one, for a screen reader', () => {
      render(<Stepper steps={STEPS} current={2} aria-label={LABEL} />);
      const marked = steps().filter((li) => li.getAttribute('aria-current') === 'step');
      expect(marked).toHaveLength(1);
      expect(marked[0]).toHaveTextContent('Map fields');
    });

    it('clamps a counter past the end rather than marking nothing', () => {
      render(<Stepper steps={STEPS} current={99} aria-label={LABEL} />);
      expect(stateOf(3)).toBe('current');
    });

    it('clamps a negative counter to the first step', () => {
      render(<Stepper steps={STEPS} current={-4} aria-label={LABEL} />);
      expect(stateOf(0)).toBe('current');
    });

    it('lets a step override what the counter said', () => {
      render(
        <Stepper
          steps={[
            { label: 'A' },
            { label: 'B', state: 'skipped' },
            { label: 'C', state: 'disabled' },
          ]}
          current={0}
          aria-label={LABEL}
        />
      );
      expect(stateOf(1)).toBe('skipped');
      expect(stateOf(2)).toBe('disabled');
    });

    it('marks nothing as current when the override took the current step away', () => {
      render(
        <Stepper
          steps={[{ label: 'A' }, { label: 'B', state: 'skipped' }]}
          current={1}
          aria-label={LABEL}
        />
      );
      expect(steps().filter((li) => li.getAttribute('aria-current') === 'step')).toHaveLength(0);
    });
  });

  describe('filled means settled, outlined means live', () => {
    it('fills the disc of a finished step', () => {
      render(<Stepper steps={STEPS} current={2} aria-label={LABEL} />);
      expect(discOf(steps()[0] as HTMLElement).className).toContain('mdt-bg-primary');
    });

    it('leaves the disc of the current step outlined, with nothing behind it', () => {
      render(<Stepper steps={STEPS} current={2} aria-label={LABEL} />);
      const disc = discOf(steps()[2] as HTMLElement).className;
      expect(disc).toContain('mdt-border-primary');
      expect(disc).toContain('mdt-bg-transparent');
      expect(disc).not.toContain('mdt-bg-primary ');
    });

    it('never paints a disc red - there is no error state, and that is the point', () => {
      render(
        <Stepper
          steps={[
            { label: 'A' },
            { label: 'B' },
            { label: 'C', state: 'skipped' },
            { label: 'D', state: 'disabled' },
          ]}
          current={1}
          aria-label={LABEL}
        />
      );
      steps().forEach((li) => {
        expect(discOf(li).className).not.toContain('destructive');
      });
    });

    it('outlines an upcoming step in neutral, not in primary', () => {
      render(<Stepper steps={STEPS} current={0} aria-label={LABEL} />);
      const disc = discOf(steps()[2] as HTMLElement).className;
      expect(disc).toContain('mdt-border-border');
      expect(disc).not.toContain('mdt-border-primary');
    });

    it('shows the number on the step you are standing on', () => {
      render(<Stepper steps={STEPS} current={2} aria-label={LABEL} />);
      expect(discOf(steps()[2] as HTMLElement)).toHaveTextContent('3');
    });

    it('replaces the number with a mark once the step is behind you', () => {
      render(<Stepper steps={STEPS} current={2} aria-label={LABEL} />);
      expect(discOf(steps()[0] as HTMLElement)).not.toHaveTextContent('1');
      expect(discOf(steps()[0] as HTMLElement).querySelector('svg')).not.toBeNull();
    });
  });

  describe('the connector', () => {
    it('draws no connector before the first step', () => {
      render(<Stepper steps={STEPS} current={2} aria-label={LABEL} />);
      expect(
        (steps()[0] as HTMLElement).querySelector('[data-slot="stepper-connector"]')
      ).toBeNull();
    });

    it('fills only once the step behind it is finished', () => {
      render(<Stepper steps={STEPS} current={2} aria-label={LABEL} />);
      const joined = (i: number) =>
        (steps()[i] as HTMLElement)
          .querySelector('[data-slot="stepper-connector"]')
          ?.getAttribute('data-joined');

      expect(joined(1)).toBe('true'); // step 0 is complete
      expect(joined(2)).toBe('true'); // step 1 is complete
      expect(joined(3)).toBe('false'); // step 2 is only current
    });
  });

  describe('layout', () => {
    it('is stacked by default', () => {
      render(<Stepper steps={STEPS} current={1} aria-label={LABEL} />);
      expect(list()).toHaveAttribute('data-layout', 'stacked');
    });

    it('takes inline when asked', () => {
      render(<Stepper steps={STEPS} current={1} layout="inline" aria-label={LABEL} />);
      expect(list()).toHaveAttribute('data-layout', 'inline');
    });

    it('holds the layout it was given when responsive is off', () => {
      render(<Stepper steps={STEPS} current={1} responsive={false} aria-label={LABEL} />);
      expect(list()).toHaveAttribute('data-layout', 'stacked');
    });
  });

  describe('a second line', () => {
    it('renders on stacked', () => {
      render(
        <Stepper
          steps={[{ label: 'Connect', description: 'Credentials and reachability' }]}
          current={0}
          aria-label={LABEL}
        />
      );
      expect(screen.getByText('Credentials and reachability')).toBeInTheDocument();
    });

    it('is dropped on inline, which has nowhere to put it', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      render(
        <Stepper
          steps={[{ label: 'Connect', description: 'Credentials and reachability' }]}
          current={0}
          layout="inline"
          aria-label={LABEL}
        />
      );
      expect(screen.queryByText('Credentials and reachability')).not.toBeInTheDocument();
      warn.mockRestore();
    });

    it('says so while you build, rather than dropping it silently', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      render(
        <Stepper
          steps={[{ label: 'Connect', description: 'Credentials' }]}
          current={0}
          layout="inline"
          aria-label={LABEL}
        />
      );
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('layout="stacked"'));
      warn.mockRestore();
    });

    it('says nothing when no step has one', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      render(<Stepper steps={STEPS} current={0} layout="inline" aria-label={LABEL} />);
      expect(warn).not.toHaveBeenCalled();
      warn.mockRestore();
    });
  });

  describe('clicking back', () => {
    it('makes nothing focusable unless onStepSelect is given', () => {
      render(<Stepper steps={STEPS} current={2} aria-label={LABEL} />);
      expect(screen.queryAllByRole('button')).toHaveLength(0);
    });

    it('turns only the finished steps into buttons', () => {
      render(<Stepper steps={STEPS} current={2} onStepSelect={vi.fn()} aria-label={LABEL} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveTextContent('Choose a source');
      expect(buttons[1]).toHaveTextContent('Connect');
    });

    it('leaves the step you are on as plain text - you are already here', () => {
      render(<Stepper steps={STEPS} current={2} onStepSelect={vi.fn()} aria-label={LABEL} />);
      expect(screen.queryByRole('button', { name: /Map fields/ })).not.toBeInTheDocument();
    });

    it('leaves a step you have not reached as plain text - it is not a place', () => {
      render(<Stepper steps={STEPS} current={2} onStepSelect={vi.fn()} aria-label={LABEL} />);
      expect(screen.queryByRole('button', { name: /Review/ })).not.toBeInTheDocument();
    });

    it('hands back the index and the step it was given', async () => {
      const user = userEvent.setup();
      const pick = vi.fn();
      render(<Stepper steps={STEPS} current={2} onStepSelect={pick} aria-label={LABEL} />);

      await user.click(screen.getByRole('button', { name: /Connect/ }));
      expect(pick).toHaveBeenCalledWith(1, STEPS[1]);
    });

    it('is reachable by keyboard', async () => {
      const user = userEvent.setup();
      const pick = vi.fn();
      render(<Stepper steps={STEPS} current={2} onStepSelect={pick} aria-label={LABEL} />);

      await user.tab();
      expect(screen.getByRole('button', { name: /Choose a source/ })).toHaveFocus();
      await user.keyboard('{Enter}');
      expect(pick).toHaveBeenCalledWith(0, STEPS[0]);
    });

    it('never makes a skipped step clickable', () => {
      render(
        <Stepper
          steps={[{ label: 'A', state: 'skipped' }, { label: 'B' }]}
          current={1}
          onStepSelect={vi.fn()}
          aria-label={LABEL}
        />
      );
      expect(screen.queryAllByRole('button')).toHaveLength(0);
    });
  });

  it('takes a key from the step when it has one', () => {
    const withIds: StepperStep[] = [
      { id: 'source', label: 'Choose a source' },
      { id: 'connect', label: 'Connect' },
    ];
    render(<Stepper steps={withIds} current={0} aria-label={LABEL} />);
    expect(steps()).toHaveLength(2);
  });

  it('passes className and the rest through', () => {
    render(<Stepper steps={STEPS} current={0} className="mine" id="import" aria-label={LABEL} />);
    const nav = screen.getByRole('navigation', { name: LABEL });
    expect(nav).toHaveClass('mine');
    expect(nav).toHaveAttribute('id', 'import');
  });
});
