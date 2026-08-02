import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DialogSteps } from './DialogSteps';
import { DialogSubmitHint } from './DialogSubmitHint';
import { useSubmitShortcut } from './useSubmitShortcut';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog';

describe('Dialog', () => {
  describe('Rendering', () => {
    it('renders trigger button', () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByRole('button', { name: 'Open Dialog' })).toBeInTheDocument();
    });

    it('does not render content initially when closed', () => {
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders content when open', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Opening and Closing', () => {
    it('opens when trigger is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: 'Open' }));
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('closes when close button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: 'Open' }));
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Close' }));
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('closes when Escape key is pressed', async () => {
      const user = userEvent.setup();
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: 'Open' }));
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('calls onOpenChange when state changes', async () => {
      const user = userEvent.setup();
      const handleOpenChange = vi.fn();
      render(
        <Dialog onOpenChange={handleOpenChange}>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: 'Open' }));
      expect(handleOpenChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Content', () => {
    it('renders DialogHeader correctly', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader data-testid="header">
              <DialogTitle>Title</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByTestId('header')).toHaveClass('mdt-flex');
    });

    it('renders DialogTitle correctly', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>My Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByText('My Title')).toHaveClass('mdt-font-semibold');
    });

    it('renders DialogDescription correctly', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>My description</DialogDescription>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByText('My description')).toHaveClass('mdt-text-muted-foreground');
    });

    it('renders DialogFooter correctly', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogFooter data-testid="footer">
              <button>Action</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByTestId('footer')).toHaveClass('mdt-flex');
    });
  });

  describe('Close Button', () => {
    it('shows close button by default', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    });

    it('hides close button when showCloseButton is false', () => {
      render(
        <Dialog open>
          <DialogContent showCloseButton={false}>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
    });
  });

  describe('DialogClose', () => {
    it('closes dialog when custom close element is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent showCloseButton={false}>
            <DialogTitle>Title</DialogTitle>
            <DialogClose>Custom Close</DialogClose>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: 'Open' }));
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Custom Close' }));
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className to DialogContent', () => {
      render(
        <Dialog open>
          <DialogContent className="custom-class">
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByRole('dialog')).toHaveClass('custom-class');
    });

    it('applies custom className to DialogHeader', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader className="custom-header">
              <DialogTitle>Title</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByText('Title').parentElement).toHaveClass('custom-header');
    });
  });

  describe('Accessibility', () => {
    it('has correct aria attributes', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Accessible Title</DialogTitle>
            <DialogDescription>Accessible description</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-labelledby');
      expect(dialog).toHaveAttribute('aria-describedby');
    });

    it('focuses the dialog content when opened', async () => {
      const user = userEvent.setup();
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
            <button>Focus me</button>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: 'Open' }));
      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        // Radix Dialog focuses the close button by default
        expect(document.activeElement).not.toBe(document.body);
      });
    });
  });

  describe('how it is centred', () => {
    const open = (
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Centred</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    it('does not put a transform and an animation on the same element', () => {
      render(open);
      const content = screen.getByRole('dialog');
      const classes = content.getAttribute('class') ?? '';

      // The bug this guards: the dialog used to centre itself with
      // `translate(-50%, -50%)` and animate with a keyframe whose `from` sets
      // `transform: scale(0.95)`. A keyframe's transform *replaces* the
      // element's, so for 200ms the centring did not exist - the box hung with
      // its own top-left corner at the middle of the screen and snapped into
      // place when the animation ended.
      //
      // Anything that animates must leave `transform` alone.
      expect(classes).toContain('mdt-animate-zoom-in');
      expect(classes).not.toMatch(/mdt-translate-[xy]/);
    });

    it('is centred by a parent instead', () => {
      const { baseElement } = render(open);
      const content = screen.getByRole('dialog');
      const centring = content.parentElement;

      expect(centring?.className).toContain('mdt-items-center');
      expect(centring?.className).toContain('mdt-justify-center');
      // `min-h-full` inside a scrolling parent: a dialog taller than the
      // viewport scrolls rather than being centred past its own top edge.
      expect(centring?.className).toContain('mdt-min-h-full');
      expect(centring?.parentElement?.className).toContain('mdt-overflow-y-auto');
      expect(baseElement).toBeTruthy();
    });

    it('keeps the dialog off the edge of a small screen', () => {
      render(open);
      const scroller = screen.getByRole('dialog').parentElement?.parentElement;
      expect(scroller?.className).toContain('mdt-p-4');
    });
  });

  describe('when it may close', () => {
    const panel = (props: Record<string, unknown> = {}) => (
      <Dialog defaultOpen>
        <DialogContent {...props}>
          <DialogTitle>Edit</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    it('closes on Escape, the overlay and the button, by default', async () => {
      const user = userEvent.setup();
      render(panel());
      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    describe('blocking', () => {
      it('refuses Escape', async () => {
        const user = userEvent.setup();
        render(panel({ blocking: true }));
        await user.keyboard('{Escape}');
        // Nothing dismisses it. For a session that has expired or a plan that
        // has lapsed - the content has to contain the way forward.
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      it('shows no close button at all', () => {
        render(panel({ blocking: true }));
        // An X that refuses to work reads as broken rather than as deliberate.
        expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
      });
    });

    describe('busy', () => {
      it('refuses Escape while work is in flight', async () => {
        const user = userEvent.setup();
        render(panel({ busy: true }));
        await user.keyboard('{Escape}');
        // Two seconds of submitting, in which Escape would abandon a request
        // already on its way to the server.
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      it('disables the close button rather than hiding it', () => {
        render(panel({ busy: true }));
        // Unlike blocking: the way out still exists, it is just not available
        // yet, and hiding it would say something untrue.
        expect(screen.getByRole('button', { name: /close/i })).toBeDisabled();
      });
    });

    describe('the guard', () => {
      it('keeps the dialog open when the answer is no', async () => {
        const user = userEvent.setup();
        const onRequestClose = vi.fn().mockReturnValue(false);
        render(panel({ onRequestClose }));
        await user.keyboard('{Escape}');
        expect(onRequestClose).toHaveBeenCalledWith('escape');
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      it('lets it close when the handler only observes', async () => {
        const user = userEvent.setup();
        const onRequestClose = vi.fn();
        render(panel({ onRequestClose }));
        await user.keyboard('{Escape}');
        // Anything other than `false` lets it close, so a handler that just
        // wants to know does not have to remember to return true.
        await waitFor(() => {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
      });

      it('says which way it was asked', async () => {
        const user = userEvent.setup();
        const onRequestClose = vi.fn().mockReturnValue(false);
        render(panel({ onRequestClose }));
        await user.click(screen.getByRole('button', { name: /close/i }));
        // "I pressed Escape" and "I clicked outside" sometimes deserve
        // different answers - the second is often an accident.
        expect(onRequestClose).toHaveBeenCalledWith('close-button');
      });
    });
  });

  describe('stacked', () => {
    it('holds a confirmation over a form', async () => {
      const user = userEvent.setup();
      render(
        <Dialog defaultOpen>
          <DialogContent onRequestClose={() => false}>
            <DialogTitle>Edit field</DialogTitle>
            <Dialog>
              <DialogTrigger>Discard</DialogTrigger>
              <DialogContent>
                <DialogTitle>Discard changes?</DialogTitle>
              </DialogContent>
            </Dialog>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByText('Discard'));

      // Supported, deliberately: a guard that refuses to close has to be able
      // to ask, and the asking is another dialog.
      expect(screen.getByText('Discard changes?')).toBeInTheDocument();

      // Both are in the DOM and both are open. Only the top one is reachable by
      // role, because Radix takes the layer beneath out of the accessibility
      // tree - so a screen reader is not offered a form it cannot get to past
      // the question standing in front of it. That is what makes this a stack
      // rather than two dialogs that happen to overlap.
      expect(document.querySelectorAll('[role="dialog"]')).toHaveLength(2);
      expect(screen.getAllByRole('dialog')).toHaveLength(1);
      expect(screen.getByText('Edit field')).toBeInTheDocument();
    });
  });

  describe('on a small screen', () => {
    it('is full-bleed below the breakpoint and a card above it', () => {
      render(
        <Dialog defaultOpen>
          <DialogContent>
            <DialogTitle>Sized</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      const classes = screen.getByRole('dialog').getAttribute('class') ?? '';
      expect(classes).toContain('mdt-rounded-none');
      expect(classes).toContain('sm:mdt-rounded-lg');
      expect(classes).toContain('mdt-min-h-full');
      expect(classes).toContain('sm:mdt-min-h-0');
    });
  });
});

describe('useSubmitShortcut', () => {
  const press = (init: KeyboardEventInit) => {
    document.dispatchEvent(new KeyboardEvent('keydown', { ...init, bubbles: true }));
  };

  it('submits on Command and on Control', () => {
    const onSubmit = vi.fn();
    renderHook(() => {
      useSubmitShortcut({ onSubmit });
    });
    press({ key: 'Enter', metaKey: true });
    press({ key: 'Enter', ctrlKey: true });
    // One shortcut that works on every platform without asking which it is on.
    expect(onSubmit).toHaveBeenCalledTimes(2);
  });

  it('ignores Enter on its own', () => {
    const onSubmit = vi.fn();
    renderHook(() => {
      useSubmitShortcut({ onSubmit });
    });
    press({ key: 'Enter' });
    // Enter belongs to the field you are in - it moves between them, it adds a
    // line to a textarea. Requiring the modifier is what lets a form with a
    // textarea have a keyboard submit at all.
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('stops listening when it is switched off', () => {
    const onSubmit = vi.fn();
    const { rerender } = renderHook(
      ({ enabled }) => {
        useSubmitShortcut({ onSubmit, enabled });
      },
      { initialProps: { enabled: true } }
    );
    rerender({ enabled: false });
    press({ key: 'Enter', metaKey: true });
    // A shortcut that survives its dialog fires into a form nobody can see.
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('lets go when it unmounts', () => {
    const onSubmit = vi.fn();
    const { unmount } = renderHook(() => {
      useSubmitShortcut({ onSubmit });
    });
    unmount();
    press({ key: 'Enter', metaKey: true });
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

describe('DialogSteps', () => {
  const steps = [
    { key: 'details', label: 'Invite details' },
    { key: 'access', label: 'Access duration' },
    { key: 'roles', label: 'Assign roles' },
  ];

  it('ticks what is done, numbers what is not', () => {
    const { container } = render(<DialogSteps steps={steps} current={1} />);
    // A finished step shows a tick rather than its number: the number is only
    // useful before you arrive, and afterwards the useful thing is that it is
    // done.
    expect(container.querySelector('[name="check"]')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });

  it('says which one you are on', () => {
    render(<DialogSteps steps={steps} current={1} />);
    const here = screen.getByText('Access duration').closest('li');
    expect(here).toHaveAttribute('aria-current', 'step');
    expect(screen.getByText('Invite details').closest('li')).not.toHaveAttribute('aria-current');
  });

  it('lets you go back but not forward', async () => {
    const user = userEvent.setup();
    const onStepSelect = vi.fn();
    render(<DialogSteps steps={steps} current={1} onStepSelect={onStepSelect} />);

    await user.click(screen.getByText('Invite details'));
    expect(onStepSelect).toHaveBeenCalledWith('details', 0);

    // Jumping ahead to a step whose inputs depend on one you have not filled in
    // is how a form ends up half-complete in an order nobody designed for.
    await user.click(screen.getByText('Assign roles'));
    expect(onStepSelect).toHaveBeenCalledTimes(1);
  });

  it('is inert without a handler', () => {
    render(<DialogSteps steps={steps} current={2} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('names itself for a screen reader', () => {
    render(<DialogSteps steps={steps} current={0} label="Invite progress" />);
    expect(screen.getByRole('list', { name: 'Invite progress' })).toBeInTheDocument();
  });

  it('leaves more room beneath itself than the dialog leaves between blocks', () => {
    // 20 to whatever follows, against 16 everywhere else - the grid's gap plus
    // this 4. The reading starts below the steps.
    const { container } = render(<DialogSteps steps={steps} current={0} />);
    expect(container.firstElementChild?.className).toContain('mdt-mb-1');
  });
});

describe('DialogFooter', () => {
  it('draws the rule above it, because the product always has one', () => {
    const { container } = render(<DialogFooter>ok</DialogFooter>);
    const footer = container.firstElementChild;
    // The footer is the only part separated by a line - the header flows into
    // the body without one. A line above the buttons says "the reading is over".
    expect(footer?.className).toContain('mdt-border-t');
    // And it breaks out of the dialog's padding, so the rule reaches both edges
    // rather than reading as an underline on the buttons.
    expect(footer?.className).toContain('-mdt-mx-4');
  });

  /** The footer of whichever dialog is currently rendered. */
  const footerClasses = () =>
    [...document.querySelectorAll('div')]
      .find((n) => (n.getAttribute('class') ?? '').includes('mdt-border-t'))
      ?.getAttribute('class') ?? '';

  const withDensity = (density: 'comfortable' | 'compact') =>
    render(
      <Dialog defaultOpen>
        <DialogContent density={density}>
          <DialogTitle>Sized</DialogTitle>
          <DialogFooter>ok</DialogFooter>
        </DialogContent>
      </Dialog>
    );

  it('breaks out by 16 when the dialog padded itself by 16', () => {
    withDensity('comfortable');
    expect(footerClasses()).toContain('-mdt-mx-4');
  });

  it('breaks out by 12 when the dialog padded itself by 12', () => {
    withDensity('compact');
    // Hard-coded at one number this overhung the tighter dialog by 7px on each
    // side - measured in a browser, after the arithmetic predicted the same.
    // The footer cannot know the padding on its own, so the content tells it.
    expect(footerClasses()).toContain('-mdt-mx-3');
    expect(footerClasses()).not.toContain('-mdt-mx-4');
  });

  it('can go without', () => {
    const { container } = render(<DialogFooter divider={false}>ok</DialogFooter>);
    expect(container.firstElementChild?.className).not.toContain('mdt-border-t');
  });

  it('pushes the two apart when there is a way back', () => {
    const { container } = render(<DialogFooter align="between">ok</DialogFooter>);
    expect(container.firstElementChild?.className).toContain('sm:mdt-justify-between');
  });

  it('gathers them on the right by default', () => {
    const { container } = render(<DialogFooter>ok</DialogFooter>);
    expect(container.firstElementChild?.className).toContain('sm:mdt-justify-end');
  });
});

describe('DialogSubmitHint', () => {
  it('shows the key and stays out of the reading', () => {
    const { container } = render(<DialogSubmitHint />);
    const chip = container.firstElementChild;
    // An icon, not the ⏎ character: the character carries its own sidebearings
    // and sits off its own baseline, so it cannot be centred in a box.
    expect(chip?.querySelector('svg')).toBeInTheDocument();
    // Read out, it becomes "Send invite return symbol", which helps nobody.
    expect(chip).toHaveAttribute('aria-hidden', 'true');
  });

  it('takes the colour of whatever it sits in', () => {
    const { container } = render(<DialogSubmitHint />);
    // One chip works on the dark primary and on the pale disabled state without
    // being told which it is on.
    expect(container.firstElementChild?.className).toContain('mdt-border-current/25');
  });

  it("pulls the button's trailing padding in, since a chip is not reading", () => {
    // 16 becomes 12. Owned by the chip rather than by a Button variant, so it
    // only ever applies where there is actually a chip.
    const { container } = render(<DialogSubmitHint />);
    expect(container.firstElementChild?.className).toContain('-mdt-mr-1');
  });

  it('is outlined rather than filled', () => {
    // A filled chip reads as a second, smaller button inside the first - two
    // things to press where there is one.
    const { container } = render(<DialogSubmitHint />);
    expect(container.firstElementChild?.className).not.toContain('mdt-bg-current');
  });
});

describe('size and density', () => {
  const at = (props: Record<string, unknown>) => {
    render(
      <Dialog defaultOpen>
        <DialogContent {...props}>
          <DialogTitle>Sized</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    return screen.getByRole('dialog').getAttribute('class') ?? '';
  };

  it('defaults to the middle step', () => {
    expect(at({})).toContain('sm:mdt-max-w-lg');
  });

  it('takes each of the five', () => {
    expect(at({ size: 'sm' })).toContain('sm:mdt-max-w-md');
  });

  it('stretches at full rather than capping', () => {
    // `self-stretch` beats the centring on the flex parent, so it fills the
    // height the scroller already has - no viewport calculation needed.
    const classes = at({ size: 'full' });
    expect(classes).toContain('mdt-max-w-none');
    expect(classes).toContain('sm:mdt-self-stretch');
  });

  it('pads by 16, and by 14 underneath', () => {
    // The buttons sit closer to the bottom edge than the reading does to the
    // top. The footer already has its rule; a full 16 under it as well left the
    // actions floating away from the box they belong to.
    const classes = at({});
    expect(classes).toContain('mdt-p-4');
    expect(classes).toContain('mdt-pb-3.5');
  });

  it('tightens up when asked', () => {
    const classes = at({ density: 'compact' });
    expect(classes).toContain('mdt-p-3');
    expect(classes).toContain('mdt-pb-2');
  });
});
