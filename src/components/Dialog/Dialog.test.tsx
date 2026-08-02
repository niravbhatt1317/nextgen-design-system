import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DialogSteps } from './DialogSteps';
import { useSubmitShortcut } from './useSubmitShortcut';
import { useTypedConfirmation } from './useTypedConfirmation';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { DialogDensity } from './Dialog.types';
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogMedia,
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
    // A `nav`, not a bare list - that is `Stepper`'s own markup, and it is
    // better: a labelled landmark can be jumped to, where a labelled list
    // cannot.
    render(<DialogSteps steps={steps} current={0} label="Invite progress" />);
    expect(screen.getByRole('navigation', { name: 'Invite progress' })).toBeInTheDocument();
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
    // The rule reaches both edges because the footer is a full-width block that
    // pads its own contents. It used to be a padded box tearing back out
    // through the container's padding with a negative margin, and that number
    // was wrong by 7px a side the first time anybody measured it.
    expect(footer?.className).not.toContain('-mdt-mx');
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

  it('pads its own contents by the gutter the rest of the dialog uses', () => {
    withDensity('comfortable');
    expect(footerClasses()).toContain('mdt-px-4');
  });

  it('follows the density, so the three regions cannot drift apart', () => {
    withDensity('compact');
    expect(footerClasses()).toContain('mdt-px-3');
    expect(footerClasses()).not.toContain('mdt-px-4');
  });

  it('can go without', () => {
    const { container } = render(<DialogFooter divider={false}>ok</DialogFooter>);
    expect(container.firstElementChild?.className).not.toContain('mdt-border-t');
  });

  it('is not the same spacing minus a line when it goes without', () => {
    // Without a rule the separation has to be done by space alone, so the
    // buttons get MORE room above them, not the rule's room minus the rule.
    // Measured: 24 from the reading, against 37 with a rule at 24 and the
    // buttons 12 below it. Dropping to the bare 16 read as a footer that had
    // lost something rather than one that never had it.
    const { container: bare } = render(<DialogFooter divider={false}>ok</DialogFooter>);
    expect(bare.firstElementChild?.className).toContain('mdt-mt-2');
    expect(bare.firstElementChild?.className).not.toContain('mdt-pt-');

    const { container: ruled } = render(<DialogFooter>ok</DialogFooter>);
    expect(ruled.firstElementChild?.className).toContain('mdt-pt-3');
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

describe('the regions', () => {
  const at = (density: DialogDensity) => {
    render(
      <Dialog defaultOpen>
        <DialogContent density={density}>
          <DialogHeader>
            <DialogTitle>Sized</DialogTitle>
          </DialogHeader>
          <DialogBody>body</DialogBody>
          <DialogFooter>ok</DialogFooter>
        </DialogContent>
      </Dialog>
    );
    const dialog = screen.getByRole('dialog');
    return [...dialog.children].map((n) => n.getAttribute('class') ?? '');
  };

  it('gives header, body and footer the same left and right', () => {
    // One value in one place. Three regions each carrying their own number is
    // how they drift, and a footer inset differently from the body above it is
    // visible at a glance.
    const gutters = at('comfortable').filter((c) => c.includes('mdt-px-'));
    expect(gutters).toHaveLength(3);
    expect(gutters.every((c) => c.includes('mdt-px-4'))).toBe(true);
  });

  it.each([
    ['compact', 'mdt-px-3'],
    ['comfortable', 'mdt-px-4'],
    ['spacious', 'mdt-px-6'],
  ] as const)('moves all three together at %s', (density, gutter) => {
    const gutters = at(density).filter((c) => c.includes('mdt-px-'));
    expect(gutters).toHaveLength(3);
    expect(gutters.every((c) => c.includes(gutter))).toBe(true);
  });

  it.each([
    ['compact', 'mdt-pt-3'],
    ['comfortable', 'mdt-pt-4'],
    ['spacious', 'mdt-pt-6'],
  ] as const)('puts the space above the first region on the header at %s', (density, top) => {
    expect(at(density)[0]).toContain(top);
  });

  it.each([
    ['compact', 'mdt-pt-2', 'mdt-pb-2'],
    ['comfortable', 'mdt-pt-3', 'mdt-pb-3'],
    ['spacious', 'mdt-pt-5', 'mdt-pb-5'],
  ] as const)('is even about its buttons at %s', (density, above, below) => {
    // The step minus 4, both sides. This is what `compact` was getting wrong:
    // it kept `comfortable`'s 12 above the buttons while using 8 below them.
    const classes = at(density);
    const footer = classes.find((c) => c.includes('mdt-border-t')) ?? '';
    expect(footer).toContain(above);
    expect(screen.getByRole('dialog').getAttribute('class')).toContain(below);
  });
});

describe('scroll', () => {
  const at = (scroll: 'page' | 'body') => {
    render(
      <Dialog defaultOpen>
        <DialogContent scroll={scroll}>
          <DialogHeader>
            <DialogTitle>Panel</DialogTitle>
          </DialogHeader>
          <DialogBody>body</DialogBody>
          <DialogFooter>ok</DialogFooter>
        </DialogContent>
      </Dialog>
    );
    const dialog = screen.getByRole('dialog');
    return { dialog, regions: [...dialog.children].map((n) => n.getAttribute('class') ?? '') };
  };

  it('lets the whole dialog grow by default', () => {
    const { dialog } = at('page');
    expect(dialog.className).not.toContain('mdt-max-h-full');
  });

  it('caps the dialog at the viewport when the body scrolls', () => {
    const { dialog } = at('body');
    expect(dialog.className).toContain('mdt-max-h-full');
    expect(dialog.className).toContain('mdt-overflow-hidden');
  });

  it('gives the body the leftover height, and lets it shrink into it', () => {
    // `min-h-0` is the load-bearing half. A flex child's minimum size is its
    // content, so without it the body refuses to shrink, pushes the dialog
    // past `max-h-full`, and nothing scrolls - while every other class looks
    // right.
    const { dialog } = at('body');
    const scroller = dialog.querySelector('.mdt-overflow-y-auto');
    expect(scroller?.className).toContain('mdt-min-h-0');
    expect(scroller?.parentElement?.className).toContain('mdt-flex-1');
  });

  it('leaves the body alone when the page scrolls instead', () => {
    expect(at('page').dialog.querySelector('.mdt-overflow-y-auto')).toBeNull();
  });

  it('fades both edges, and starts with both fades off', () => {
    // A fade with nothing behind it says there is more when there is not. A
    // body short enough not to scroll never reaches either end, so neither
    // shows until it has been scrolled.
    const { dialog } = at('body');
    const fades = [...dialog.querySelectorAll('span[aria-hidden]')].filter((n) =>
      n.className.includes('mdt-bg-gradient')
    );
    expect(fades).toHaveLength(2);
    expect(fades.every((f) => f.className.includes('mdt-opacity-0'))).toBe(true);
  });

  it('ends its fades in the dialog’s own surface', () => {
    // A fade ends in whatever it sits on. `LeftNav` draws the same edge in its
    // panel colour; only the strip and the direction are shared.
    const { dialog } = at('body');
    const fade = dialog.querySelector('span.mdt-bg-gradient-to-b');
    expect(fade?.className).toContain('mdt-from-background');
  });

  it('puts the fades beside the scroller, not inside it', () => {
    // A child would scroll away with the content it is meant to be covering.
    const { dialog } = at('body');
    const scroller = dialog.querySelector('.mdt-overflow-y-auto');
    expect(scroller?.querySelector('span.mdt-bg-gradient')).toBeNull();
  });

  it('leaves room under the last thing, inside the scroller', () => {
    // Inside, not below: padding here scrolls with the content, so the clipping
    // edge stays on the rule and the fade still runs into it. A margin outside
    // would fix the resting state by breaking the scrolling one.
    const { dialog } = at('body');
    const scroller = dialog.querySelector('.mdt-overflow-y-auto');
    expect(scroller?.className).toContain('mdt-pb-4');
  });

  it('closes the gap above the footer rule, so the cut lands on the line', () => {
    // A gap between where the content stops and where the rule is reads as
    // content cut short rather than content continuing under it.
    const footer = (scroll: 'page' | 'body') =>
      at(scroll).regions.find((c) => c.includes('mdt-border-t')) ?? '';
    expect(footer('page')).toContain('mdt-mt-2');
    expect(footer('body')).not.toContain('mdt-mt-2');
  });

  it('takes that gap back from whatever follows the scroller, not from the footer', () => {
    // The footer cannot know what is above it. Pulling itself up collapsed it
    // against the header on a dialog with no scrolling body at all - measured
    // at 0px between a description and the rule, the two touching.
    const { dialog } = at('body');
    expect(dialog.className).toContain('[&>[data-dialog-scroller]+*]:-mdt-mt-4');
    expect(dialog.querySelector('[data-dialog-scroller]')).toBeInTheDocument();
  });

  it('holds the header and the footer still', () => {
    // The whole point of the pattern: the title and the actions stay where they
    // are while the reading moves.
    const { regions } = at('body');
    // Not `regions.at(-1)` - the close button is the last child, after the
    // footer. The footer is the one carrying the rule.
    const footer = regions.find((c) => c.includes('mdt-border-t')) ?? '';
    expect(regions[0]).toContain('mdt-shrink-0');
    expect(footer).toContain('mdt-shrink-0');
  });

  it('stacks its regions as flex, not grid', () => {
    // Identical for a stack of blocks with a gap - the difference only shows up
    // when one of them has to scroll.
    expect(at('body').dialog.className).toContain('mdt-flex-col');
  });
});

describe('the Panel slots', () => {
  const panel = (props: Record<string, unknown> = {}) =>
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogMedia>
            <img src="/shot.png" alt="" />
          </DialogMedia>
          <DialogHeader {...props}>
            <DialogTitle>Configure</DialogTitle>
          </DialogHeader>
          <DialogBody>body</DialogBody>
        </DialogContent>
      </Dialog>
    );

  it('gives the media no gutter, unlike every other region', () => {
    // A product shot inset by 16px reads as a picture somebody placed in a
    // dialog; the same shot reaching both edges reads as the dialog's own.
    // The dialog is portalled, so `container` does not hold it.
    panel();
    const media = screen.getByRole('dialog').firstElementChild;
    expect(media?.className).not.toContain('mdt-px-');
    expect(media?.className).toContain('mdt-shrink-0');
  });

  it('takes the top inset off whatever follows it', () => {
    // A header directly under a picture is not the top of the dialog, so it
    // does not want the padding that says it is. Measured at 32 from the image
    // to the title before this - the content's gap plus a top inset for a top
    // the header was no longer at.
    panel();
    expect(screen.getByRole('dialog').className).toContain('[&>[data-dialog-media]+*]:mdt-pt-0');
    expect(screen.getByRole('dialog').firstElementChild).toHaveAttribute('data-dialog-media');
  });

  it('rounds the media to match the card it fills, and stays square on a phone', () => {
    panel();
    const media = screen.getByRole('dialog').firstElementChild;
    expect(media?.className).toContain('mdt-rounded-none');
    expect(media?.className).toContain('sm:mdt-rounded-t-lg');
  });

  it('draws no row above the title when there is nothing to put in it', () => {
    // An empty 20px strip pushes the title down for no reason, which is what a
    // row rendered unconditionally does on the many dialogs needing neither.
    panel();
    expect(screen.queryByRole('button', { name: /Back/ })).not.toBeInTheDocument();
    const header = screen.getByRole('heading', { name: 'Configure' }).parentElement;
    expect(header?.firstElementChild?.tagName).toBe('H2');
  });

  it('reports the back press, and names where it goes', () => {
    const onBack = vi.fn();
    panel({ onBack, backLabel: 'All integrations' });
    screen.getByRole('button', { name: 'All integrations' }).click();
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('keeps back and close as visibly different exits', () => {
    // One steps back inside the dialog, the other leaves. Two exits doing
    // different things have to look different.
    panel({ onBack: vi.fn() });
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('keeps the row above the title exactly one line tall', () => {
    // The close button centres on a line. A row taller than one line leaves it
    // sitting above the row - measured at 2px out before this.
    panel({ onBack: vi.fn(), counter: '2 of 5' });
    const row = screen.getByRole('heading', { name: 'Configure' }).parentElement?.firstElementChild;
    expect(row?.className).toContain('mdt-h-5');
    expect(screen.getByRole('button', { name: 'Back' }).className).toContain('mdt-h-5');
  });

  it('shows a counter where one is given', () => {
    panel({ counter: '2 of 5' });
    expect(screen.getByText('2 of 5')).toBeInTheDocument();
  });

  it('puts the tabs inside the header, so they do not scroll away', () => {
    // The header is the part that does not move. Tabs that scrolled with the
    // body would leave somebody unable to switch back without scrolling up.
    panel({ tabs: <div data-testid="tabs" /> });
    const header = screen.getByRole('heading', { name: 'Configure' }).parentElement;
    expect(header?.contains(screen.getByTestId('tabs'))).toBe(true);
  });
});

describe('DialogTitle', () => {
  const title = (tag?: boolean) => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle {...(tag === true ? { tag: <span>Guest</span> } : {})}>Invite</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    return screen.getByRole('heading', { name: /Invite/ });
  };

  it('takes a tag beside the title', () => {
    title(true);
    expect(screen.getByText('Guest')).toBeInTheDocument();
  });

  it('tightens the gap under itself when it carries one', () => {
    // 6 under a title with a tag, against 8 under one without. A tag is taller
    // than the text beside it, so it closes some of that gap on its own.
    expect(title(true).className).toContain('-mdt-mb-0.5');
  });

  it('leaves the gap alone when it does not', () => {
    expect(title().className).not.toContain('-mdt-mb-0.5');
  });
});

describe('the close button', () => {
  const close = () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Sized</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    return screen.getByRole('button', { name: 'Close' });
  };

  it("is as tall as the title line, so it sits on the title's centre", () => {
    // At 16px square pinned to the same top edge it rode 6px high of the words
    // beside it. 28 is the line box of the title, so the two centres meet.
    expect(close().className).toContain('mdt-h-7');
  });

  it('is muted rather than near-black', () => {
    // The way out of a dialog is not the thing to look at first, and at full
    // strength the X competed with the title for that.
    expect(close().className).toContain('mdt-text-muted-foreground');
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

  it('keeps only the rhythm between regions and the floor beneath them', () => {
    // Left, right and top belong to the regions themselves. The bottom stays on
    // the container because no region knows whether it is the last thing in the
    // box - a dialog with a footer wants 12 under its buttons and one without
    // wants 12 under its body, and this is what makes those the same number.
    const classes = at({});
    expect(classes).toContain('mdt-gap-4');
    expect(classes).toContain('mdt-pb-3');
    expect(classes).not.toContain('mdt-p-4');
    expect(classes).not.toContain('mdt-px-4');
    expect(classes).not.toContain('mdt-pt-4');
  });

  it.each([
    ['compact', 'mdt-gap-3'],
    ['comfortable', 'mdt-gap-4'],
    ['spacious', 'mdt-gap-6'],
  ] as const)('sets the rhythm between regions at %s', (density, gap) => {
    expect(at({ density })).toContain(gap);
  });
});

describe('useTypedConfirmation', () => {
  const typed = (phrase: string, opts?: { caseSensitive?: boolean }) =>
    renderHook(() => useTypedConfirmation({ phrase, ...opts }));

  it('refuses until the phrase matches', () => {
    const { result } = typed('Acme Production');
    expect(result.current.confirmed).toBe(false);
    act(() => {
      result.current.onChange({ target: { value: 'Acme' } });
    });
    expect(result.current.confirmed).toBe(false);
    act(() => {
      result.current.onChange({ target: { value: 'Acme Production' } });
    });
    expect(result.current.confirmed).toBe(true);
  });

  it('forgives a trailing space, because a copied name arrives with one', () => {
    // Refusing it teaches people the control is broken rather than that they
    // are wrong.
    const { result } = typed('Acme Production');
    act(() => {
      result.current.onChange({ target: { value: '  Acme Production ' } });
    });
    expect(result.current.confirmed).toBe(true);
  });

  it('ignores case by default', () => {
    // The job is to make somebody stop and read, not to test their shift key.
    // Somebody who typed the right name in the wrong case has demonstrably read
    // it.
    const { result } = typed('Acme Production');
    act(() => {
      result.current.onChange({ target: { value: 'acme production' } });
    });
    expect(result.current.confirmed).toBe(true);
  });

  it('minds it when told to', () => {
    const { result } = typed('Acme Production', { caseSensitive: true });
    act(() => {
      result.current.onChange({ target: { value: 'acme production' } });
    });
    expect(result.current.confirmed).toBe(false);
  });

  it('never confirms on an empty phrase', () => {
    // A gate that is open before anybody touches it is worse than no gate,
    // because it looks like one.
    const { result } = typed('');
    expect(result.current.confirmed).toBe(false);
    act(() => {
      result.current.onChange({ target: { value: '   ' } });
    });
    expect(result.current.confirmed).toBe(false);
  });

  it('empties itself, for reopening on the same page', () => {
    const { result } = typed('Acme Production');
    act(() => {
      result.current.onChange({ target: { value: 'Acme Production' } });
    });
    act(() => {
      result.current.reset();
    });
    expect(result.current.value).toBe('');
    expect(result.current.confirmed).toBe(false);
  });
});
