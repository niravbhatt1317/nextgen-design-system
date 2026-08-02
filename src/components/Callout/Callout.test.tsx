import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FEEDBACK_TONES } from '@/utils/feedback-tones';
import { Button } from '../Button';
import { Callout } from './Callout';

/** The callout root. It has no implicit role - it is content, not a landmark. */
const root = (container: HTMLElement) => container.firstElementChild as HTMLElement;

describe('Callout', () => {
  describe('rendering', () => {
    it('renders its reading', () => {
      render(<Callout>Deleting this removes 3 members.</Callout>);
      expect(screen.getByText('Deleting this removes 3 members.')).toBeInTheDocument();
    });

    it('takes a title above it', () => {
      render(<Callout title="This cannot be undone">Three members lose access.</Callout>);
      expect(screen.getByText('This cannot be undone')).toBeInTheDocument();
      expect(screen.getByText('Three members lose access.')).toBeInTheDocument();
    });

    it('renders without a title, since one sentence needs no heading', () => {
      const { container } = render(<Callout>Just the sentence.</Callout>);
      expect(root(container)).toHaveTextContent('Just the sentence.');
    });

    it('holds whatever the page holds, not two strings', () => {
      // The difference from Toast. A toast is read in passing; a callout is
      // part of the page and takes a list, a table, a pair of controls.
      render(
        <Callout title="About to be deleted">
          <ul>
            <li>3 members</li>
            <li>12 files</li>
          </ul>
        </Callout>
      );
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });
  });

  describe('tones', () => {
    it.each(FEEDBACK_TONES)('draws %s with its own tint and edge', (tone) => {
      const { container } = render(<Callout tone={tone}>Body</Callout>);
      expect(root(container)).toHaveAttribute('data-tone', tone);
      expect(root(container).className).toContain(`mdt-bg-feedback-${tone}-bg`);
      expect(root(container).className).toContain(`mdt-border-feedback-${tone}-border`);
    });

    it('keeps the body text one calm colour in every tone', () => {
      // Six tones that differ by a tint, an edge and a glyph read as one
      // family. Six tones of coloured text read as six problems.
      const inks = FEEDBACK_TONES.map((tone) => {
        const { container } = render(<Callout tone={tone}>Body</Callout>);
        return root(container).querySelector('.mdt-text-feedback-text') !== null;
      });
      expect(inks.every(Boolean)).toBe(true);
    });

    it('is neutral unless told otherwise', () => {
      const { container } = render(<Callout>Body</Callout>);
      expect(root(container)).toHaveAttribute('data-tone', 'neutral');
    });
  });

  describe('the glyph', () => {
    it('is a step under the text it sits beside', () => {
      // At 16 against 14px copy the icon was the largest thing in the callout
      // and pulled the eye before the writing did.
      const { container } = render(<Callout tone="danger">Body</Callout>);
      expect(container.querySelector('svg')?.getAttribute('class')).toContain('mdt-h-3.5');
    });

    it('is centred in a line-tall box, so it sits on the title', () => {
      // Measured at 0.0px from the title's centre. `mt-0.5` was a fudge that
      // looked close at one size and was off at the other, and went wrong again
      // whenever a title made the first line taller than the body.
      const { container } = render(<Callout title="T">Body</Callout>);
      const box = container.querySelector('svg')?.parentElement;
      expect(box?.className).toContain('mdt-h-5');
      expect(box?.className).toContain('mdt-items-center');
    });

    it('brings its own per tone', () => {
      const { container } = render(<Callout tone="danger">Body</Callout>);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('takes one of yours', () => {
      const { container } = render(<Callout icon={<span data-testid="mine" />}>Body</Callout>);
      expect(screen.getByTestId('mine')).toBeInTheDocument();
      expect(container.querySelectorAll('svg')).toHaveLength(0);
    });

    it('goes away entirely for a grouped block', () => {
      // `neutral` with no icon is a plain inset panel, and that is a callout
      // too - an icon there labels a group that does not need labelling.
      const { container } = render(<Callout icon={false}>Body</Callout>);
      expect(container.querySelector('svg')).not.toBeInTheDocument();
    });
  });

  describe('variant and size', () => {
    it('drops the fill but keeps the edge when outlined', () => {
      // For a callout on a surface that is already tinted, where a second tint
      // reads as a stain rather than as a block.
      const { container } = render(
        <Callout tone="danger" variant="outline">
          Body
        </Callout>
      );
      expect(root(container).className).toContain('mdt-bg-transparent');
      expect(root(container).className).toContain('mdt-border-feedback-danger-border');
    });

    it('pairs the dark-mode background with the light one', () => {
      // The merger treats `dark:bg-*` and `bg-*` as separate groups, so a lone
      // `bg-transparent` would clear the light fill and leave the dark one.
      const { container } = render(<Callout variant="outline">Body</Callout>);
      expect(root(container).className).toContain('dark:mdt-bg-transparent');
    });

    it('takes both sizes', () => {
      const { container: small } = render(<Callout size="sm">Body</Callout>);
      expect(root(small).className).toContain('mdt-text-xs');
      const { container: medium } = render(<Callout size="md">Body</Callout>);
      expect(root(medium).className).toContain('mdt-text-sm');
    });

    it('defaults to md, which matches body copy', () => {
      const { container } = render(<Callout>Body</Callout>);
      expect(root(container).className).toContain('mdt-text-sm');
    });

    it('carries no shadow, because it does not float', () => {
      // A toast floats over the page and a shadow says so. A shadow on
      // something inline reads as a card that has come loose.
      const { container } = render(<Callout>Body</Callout>);
      expect(root(container).className).not.toContain('mdt-shadow');
    });
  });

  describe('actions', () => {
    it('puts them below the reading', () => {
      render(<Callout actions={<Button>Review</Button>}>Body</Callout>);
      expect(screen.getByRole('button', { name: 'Review' })).toBeInTheDocument();
    });

    it('renders none when none were given', () => {
      render(<Callout>Body</Callout>);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('dismissing', () => {
    it('has no way out by default', () => {
      // The opposite of Toast. A toast always has one because it arrived
      // uninvited; a close on something that was always there implies it will
      // come back.
      render(<Callout>Body</Callout>);
      expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();
    });

    it('grows one when asked, and reports the press', async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();
      render(<Callout onDismiss={onDismiss}>Body</Callout>);
      await user.click(screen.getByRole('button', { name: 'Dismiss' }));
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('sits on the title line, like the tone glyph', () => {
      const { container } = render(
        <Callout title="T" onDismiss={vi.fn()}>
          Body
        </Callout>
      );
      const close = screen.getByRole('button', { name: 'Dismiss' });
      expect(close.className).toContain('mdt-h-5');
      expect(close.className).toContain('mdt-items-center');
      expect(container.querySelectorAll('svg')[1]?.getAttribute('class')).toContain('mdt-h-3.5');
    });

    it('lets the control be renamed', () => {
      render(
        <Callout onDismiss={vi.fn()} dismissLabel="Hide this notice">
          Body
        </Callout>
      );
      expect(screen.getByRole('button', { name: 'Hide this notice' })).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('is not a live region, because it was always there', () => {
      // A callout is read in document order like any other content. A caller
      // that makes one *appear* adds role="alert" itself, because only the
      // caller knows it is new.
      const { container } = render(<Callout tone="danger">Body</Callout>);
      expect(root(container)).not.toHaveAttribute('aria-live');
      expect(root(container)).not.toHaveAttribute('role');
    });

    it('lets a caller make it one', () => {
      const { container } = render(
        <Callout tone="danger" role="alert">
          Body
        </Callout>
      );
      expect(root(container)).toHaveAttribute('role', 'alert');
    });

    it('names the tone for people who cannot see the colour', () => {
      // The glyph is decorative, so a danger callout whose writing does not say
      // it is dangerous reads as neutral.
      render(
        <Callout tone="danger" toneLabel="Warning">
          Body
        </Callout>
      );
      expect(screen.getByText('Warning:')).toBeInTheDocument();
    });

    it('says nothing extra when the writing already carries it', () => {
      render(<Callout tone="danger">This cannot be undone.</Callout>);
      expect(screen.queryByText(/:/)).not.toBeInTheDocument();
    });

    it('hides the tone glyph from the reading', () => {
      const { container } = render(<Callout tone="warning">Body</Callout>);
      expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    });

    it('forwards a ref', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<Callout ref={ref}>Body</Callout>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('takes a className without losing its own', () => {
      const { container } = render(<Callout className="custom">Body</Callout>);
      expect(root(container).className).toContain('custom');
      expect(root(container).className).toContain('mdt-rounded-lg');
    });
  });
});
