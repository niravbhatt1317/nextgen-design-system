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

  describe('going back keeps your progress (reached)', () => {
    const ACROSS = ['stacked', 'inline', 'underline'] as const;
    const labelOf = (i: number) =>
      (steps()[i] as HTMLElement).querySelector('[data-slot="stepper-label"]') as HTMLElement;

    it.each(ACROSS)(
      '%s: keeps every step before it complete, and marks where you left off',
      (layout) => {
        render(
          <Stepper
            steps={STEPS}
            current={0}
            reached={3}
            layout={layout}
            responsive={false}
            aria-label={LABEL}
          />
        );
        expect([0, 1, 2, 3].map(stateOf)).toEqual(['current', 'complete', 'complete', 'reached']);
      }
    );

    it.each(ACROSS)(
      '%s: makes every step up to reached clickable except the current one',
      async (layout) => {
        const user = userEvent.setup();
        const pick = vi.fn();
        render(
          <Stepper
            steps={STEPS}
            current={0}
            reached={3}
            layout={layout}
            responsive={false}
            onStepSelect={pick}
            aria-label={LABEL}
          />
        );
        expect(screen.getAllByRole('button')).toHaveLength(3);
        expect(screen.getByRole('button', { name: 'Connect, done' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Map fields, done' })).toBeInTheDocument();
        expect(
          screen.getByRole('button', { name: 'Review, where you left off' })
        ).toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: /Review/ }));
        expect(pick).toHaveBeenCalledWith(3, STEPS[3]);
      }
    );

    it('treats reached below current as current, and past the end as the last step', () => {
      const { rerender } = render(
        <Stepper steps={STEPS} current={2} reached={0} onStepSelect={vi.fn()} aria-label={LABEL} />
      );
      expect(stateOf(3)).toBe('upcoming');
      expect(screen.getAllByRole('button')).toHaveLength(2);

      rerender(
        <Stepper steps={STEPS} current={1} reached={99} onStepSelect={vi.fn()} aria-label={LABEL} />
      );
      expect(stateOf(3)).toBe('reached');
    });

    it('keeps the tick on the step you went back to, inside a "you are here" ring', () => {
      render(<Stepper steps={STEPS} current={1} reached={3} aria-label={LABEL} />);
      const disc = discOf(steps()[1] as HTMLElement);
      expect(disc).toHaveAttribute('data-here', 'true');
      expect(disc.className).toContain('mdt-bg-primary');
      expect(disc.className).toContain('mdt-ring-2');
      expect(disc.className).toContain('mdt-ring-primary');
      expect(disc.className).toContain('mdt-ring-offset-background');
      expect(disc.querySelector('svg')).not.toBeNull();
      // Still the step you are on: the heaviest name, and the one marked current.
      expect(labelOf(1).className).toContain('mdt-font-semibold');
      expect(steps()[1]).toHaveAttribute('aria-current', 'step');
    });

    it('rings nothing when you have not gone back', () => {
      render(<Stepper steps={STEPS} current={2} aria-label={LABEL} />);
      expect(document.querySelector('[data-here]')).toBeNull();
    });

    it('outlines where you left off in primary, with its number and its name in full ink', () => {
      render(<Stepper steps={STEPS} current={0} reached={2} aria-label={LABEL} />);
      const disc = discOf(steps()[2] as HTMLElement);
      expect(disc).toHaveTextContent('3');
      expect(disc.className).toContain('mdt-border-primary');
      expect(disc.className).toContain('mdt-bg-transparent');
      expect(disc.className).toContain('mdt-text-foreground');
      expect(labelOf(2).className).toContain('mdt-text-foreground');
      expect(labelOf(2).className).toContain('mdt-font-normal');
    });

    it('stacked: keeps the line filled up to where you left off', () => {
      render(<Stepper steps={STEPS} current={0} reached={2} aria-label={LABEL} />);
      const joined = (i: number) =>
        (steps()[i] as HTMLElement)
          .querySelector('[data-slot="stepper-connector"]')
          ?.getAttribute('data-joined');
      expect([1, 2, 3].map(joined)).toEqual(['true', 'true', 'false']);
    });

    it('underline: keeps the bar filled up to where you left off, never under a skipped step', () => {
      render(
        <Stepper
          steps={[
            { label: 'A' },
            { label: 'B', state: 'skipped' },
            { label: 'C' },
            { label: 'D' },
            { label: 'E' },
          ]}
          current={0}
          reached={3}
          layout="underline"
          aria-label={LABEL}
        />
      );
      const bar = (i: number) =>
        (steps()[i] as HTMLElement)
          .querySelector('[data-slot="stepper-bar"]')
          ?.getAttribute('data-joined');
      expect([0, 1, 2, 3, 4].map(bar)).toEqual(['true', 'false', 'true', 'true', 'false']);
    });

    it('never makes a skipped or disabled step clickable, even inside what was reached', () => {
      render(
        <Stepper
          steps={[
            { label: 'A' },
            { label: 'B', state: 'skipped' },
            { label: 'C', state: 'disabled' },
            { label: 'D' },
          ]}
          current={0}
          reached={3}
          onStepSelect={vi.fn()}
          aria-label={LABEL}
        />
      );
      expect(screen.getAllByRole('button')).toHaveLength(1);
      expect(screen.getByRole('button', { name: 'D, where you left off' })).toBeInTheDocument();
    });
  });

  describe('a finished step reads as finished', () => {
    const inkOf = (i: number) =>
      ((steps()[i] as HTMLElement).querySelector('[data-slot="stepper-label"]') as HTMLElement)
        .className;

    it('names a finished step in full ink at regular weight, not the quiet ink', () => {
      render(<Stepper steps={STEPS} current={2} layout="underline" aria-label={LABEL} />);
      expect(inkOf(0)).toContain('mdt-text-foreground');
      expect(inkOf(0)).toContain('mdt-font-normal');
      expect(inkOf(0)).not.toContain('mdt-text-muted-foreground');
    });

    it('keeps the current step the heaviest and the steps ahead quiet', () => {
      render(<Stepper steps={STEPS} current={2} layout="inline" aria-label={LABEL} />);
      expect(inkOf(2)).toContain('mdt-font-semibold');
      expect(inkOf(3)).toContain('mdt-text-muted-foreground');
    });

    it('reads a description you have been through in the secondary ink, one ahead in the quiet ink', () => {
      render(
        <Stepper
          steps={STEPS.map((s) => ({ ...s, description: `About ${String(s.label)}` }))}
          current={1}
          responsive={false}
          aria-label={LABEL}
        />
      );
      const descOf = (i: number) =>
        (
          (steps()[i] as HTMLElement).querySelector(
            '[data-slot="stepper-description"]'
          ) as HTMLElement
        ).className;
      expect(descOf(0)).toContain('mdt-text-neutral-90');
      expect(descOf(1)).toContain('mdt-text-neutral-90');
      expect(descOf(2)).toContain('mdt-text-muted-foreground');
    });
  });

  describe('a screen reader hears what the disc shows', () => {
    it('says done, skipped and disabled after the label', () => {
      render(
        <Stepper
          steps={[
            { label: 'A' },
            { label: 'B', state: 'skipped' },
            { label: 'C', state: 'disabled' },
            { label: 'D' },
            { label: 'E' },
          ]}
          current={3}
          aria-label={LABEL}
        />
      );
      expect(steps()[0]).toHaveTextContent('A, done');
      expect(steps()[1]).toHaveTextContent('B, skipped');
      expect(steps()[2]).toHaveTextContent('C, disabled');
      // The current step says nothing extra: aria-current already does.
      expect(steps()[3]?.textContent).toBe('4D');
      expect(steps()[4]?.textContent).toBe('5E');
    });

    it('says done, you are here on a finished step you went back to', () => {
      render(<Stepper steps={STEPS} current={1} reached={2} aria-label={LABEL} />);
      expect(steps()[1]).toHaveTextContent('Connect, done, you are here');
      expect(steps()[2]).toHaveTextContent('Map fields, where you left off');
    });

    it('hides those words from the eye', () => {
      render(<Stepper steps={STEPS} current={1} aria-label={LABEL} />);
      expect(screen.getByText(', done')).toHaveClass('mdt-sr-only');
    });
  });

  describe('nothing moves when a step becomes clickable', () => {
    const ACROSS = ['stacked', 'inline', 'underline'] as const;
    const boxOf = (i: number) => discOf(steps()[i] as HTMLElement).parentElement as HTMLElement;

    it.each(ACROSS)('%s: a clickable step is the same box as a plain one', (layout) => {
      const props = { steps: STEPS, current: 2, layout, responsive: false, 'aria-label': LABEL };
      const { unmount } = render(<Stepper {...props} />);
      const plainBox = boxOf(0).className.split(' ');
      const plainItem = (steps()[0] as HTMLElement).className;
      const plainList = list().className;
      unmount();

      render(<Stepper {...props} onStepSelect={vi.fn()} />);
      const button = boxOf(0);
      expect(button.tagName).toBe('BUTTON');
      expect(plainBox.every((c) => button.className.split(' ').includes(c))).toBe(true);
      expect((steps()[0] as HTMLElement).className).toBe(plainItem);
      expect(list().className).toBe(plainList);
      // No padding, no wash, no ring of its own: only the disc and the name react.
      expect(button.className).not.toMatch(/\bmdt-p[xytblr]?-(?!0\b)/);
      expect(button.className).not.toMatch(/hover:mdt-bg-/);
      expect(button.className).not.toMatch(/focus-visible:mdt-ring/);
    });

    it('halos the disc on hover and rings it on keyboard focus', () => {
      render(<Stepper steps={STEPS} current={2} onStepSelect={vi.fn()} aria-label={LABEL} />);
      const disc = discOf(steps()[0] as HTMLElement).className;
      expect(disc).toContain('group-hover/stepper-hit:mdt-ring-4');
      expect(disc).toContain('group-hover/stepper-hit:mdt-ring-primary/[0.14]');
      expect(disc).toContain('group-focus-visible/stepper-hit:mdt-ring-2');
      expect(disc).toContain('group-focus-visible/stepper-hit:mdt-ring-offset-2');
      expect(screen.getAllByRole('button')[0]).toHaveClass('mdt-group/stepper-hit');
    });

    it('draws a dashed underline under the name on hover', () => {
      render(<Stepper steps={STEPS} current={2} onStepSelect={vi.fn()} aria-label={LABEL} />);
      const label = (steps()[0] as HTMLElement).querySelector(
        '[data-slot="stepper-label"]'
      ) as HTMLElement;
      expect(label.className).toContain('mdt-underline');
      expect(label.className).toContain('mdt-decoration-dashed');
      expect(label.className).toContain('mdt-underline-offset-4');
      expect(label.className).toContain('group-hover/stepper-hit:mdt-decoration-foreground/55');
    });

    it('underline: leaves the dashed line room to show under a truncating label, and takes it back', () => {
      render(
        <Stepper
          steps={STEPS}
          current={2}
          layout="underline"
          onStepSelect={vi.fn()}
          aria-label={LABEL}
        />
      );
      const label = (steps()[0] as HTMLElement).querySelector(
        '[data-slot="stepper-label"]'
      ) as HTMLElement;
      expect(label.className).toContain('mdt-truncate');
      expect(label.className).toContain('mdt-pb-1.5');
      expect(label.className).toContain('-mdt-mb-1.5');
    });

    it('inline: every label keeps the room its bold version needs', () => {
      render(<Stepper steps={STEPS} current={1} layout="inline" aria-label={LABEL} />);
      const label = (steps()[0] as HTMLElement).querySelector(
        '[data-slot="stepper-label"]'
      ) as HTMLElement;
      expect(label).toHaveAttribute('data-text', 'Choose a source');
      expect(label.className).toContain('after:mdt-font-semibold');
      expect(label.className).toContain('mdt-inline-flex');
    });

    it('inline: a label that is not plain text reserves nothing', () => {
      render(
        <Stepper
          steps={[{ label: <b>Bold</b> }, { label: 'Plain' }]}
          current={0}
          layout="inline"
          aria-label={LABEL}
        />
      );
      const labels = screen
        .getAllByRole('listitem')
        .map((li) => li.querySelector('[data-slot="stepper-label"]'));
      expect(labels[0]).not.toHaveAttribute('data-text');
      expect(labels[1]).toHaveAttribute('data-text', 'Plain');
    });

    it('inline: 12 either side of a chevron', () => {
      render(<Stepper steps={STEPS} current={1} layout="inline" aria-label={LABEL} />);
      expect(list().className).toContain('mdt-gap-x-3');
      expect((steps()[1] as HTMLElement).className).toContain('mdt-gap-3');
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
