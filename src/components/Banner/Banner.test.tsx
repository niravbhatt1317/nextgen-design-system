import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Banner } from './Banner';
import { Button } from '../Button';
import type { BannerTone } from './Banner.types';

const TITLE = 'Your trial ends in 3 days';

const slot = (name: string) => document.querySelector(`[data-slot="banner-${name}"]`);

const TONES: readonly BannerTone[] = ['info', 'warning', 'danger', 'success', 'ai', 'neutral'];

// The component has no testid of its own - the surface is found by its slot,
// the same way the styles reach it.
const surface = () => document.querySelector('[data-slot="banner"]') as HTMLElement;

describe('Banner', () => {
  describe('content', () => {
    it('shows the title', () => {
      render(<Banner title={TITLE} />);
      expect(screen.getByText(TITLE)).toBeInTheDocument();
    });

    it('shows the description under the title', () => {
      render(<Banner title={TITLE} description="Read-only after that." />);
      expect(screen.getByText('Read-only after that.')).toBeInTheDocument();
    });

    it('renders with a description and no title', () => {
      render(<Banner description="Read-only after that." />);
      expect(screen.getByText('Read-only after that.')).toBeInTheDocument();
      expect(slot('title')).toBeNull();
    });

    it('leaves the description out when it is an empty string', () => {
      render(<Banner title={TITLE} description="" />);
      expect(slot('description')).toBeNull();
    });
  });

  describe('naming', () => {
    it('is a landmark named by its title, so it is read in place', () => {
      render(<Banner title={TITLE} />);
      expect(screen.getByRole('region', { name: TITLE })).toBeInTheDocument();
    });

    it('is not a landmark at all when there is no title', () => {
      render(<Banner description="Read-only after that." />);
      expect(screen.queryByRole('region')).not.toBeInTheDocument();
    });

    it('is a region and never an alert - a banner waits, it does not interrupt', () => {
      render(<Banner tone="danger" title={TITLE} />);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('tone', () => {
    it.each(TONES)('records %s on the element, for styling and for tests', (tone) => {
      render(<Banner tone={tone} title={TITLE} />);
      expect(surface()).toHaveAttribute('data-tone', tone);
    });

    it('defaults to neutral', () => {
      render(<Banner title={TITLE} />);
      expect(surface()).toHaveAttribute('data-tone', 'neutral');
    });

    it('carries a glyph by default', () => {
      render(<Banner tone="warning" title={TITLE} />);
      expect(slot('icon')).not.toBeNull();
    });

    it('drops the glyph when icon is null', () => {
      render(<Banner tone="neutral" icon={null} title={TITLE} />);
      expect(slot('icon')).toBeNull();
    });

    it('takes a glyph of your own', () => {
      render(<Banner title={TITLE} icon={<span data-testid="mine" />} />);
      expect(screen.getByTestId('mine')).toBeInTheDocument();
    });
  });

  describe('where the actions go', () => {
    const one = (
      <Button variant="secondary" size="sm">
        Choose a plan
      </Button>
    );
    const two = (
      <>
        <Button variant="ghost" size="sm">
          Notes
        </Button>
        <Button variant="secondary" size="sm">
          Update
        </Button>
      </>
    );

    it('keeps one action beside the words', () => {
      render(<Banner title={TITLE} actions={one} />);
      expect(slot('end')?.contains(slot('actions'))).toBe(true);
    });

    it('drops two actions onto their own line', () => {
      render(<Banner title={TITLE} actions={two} />);
      expect(slot('end')).toBeNull();
      expect(slot('actions')).not.toBeNull();
    });

    it('holds two beside when told to', () => {
      render(<Banner title={TITLE} actions={two} actionPlacement="inline" />);
      expect(slot('end')?.contains(slot('actions'))).toBe(true);
    });

    it('drops one below when told to', () => {
      render(<Banner title={TITLE} actions={one} actionPlacement="below" />);
      expect(slot('end')).toBeNull();
      expect(slot('actions')).not.toBeNull();
    });

    it('has no action slot at all when there is nothing to do', () => {
      render(<Banner title={TITLE} />);
      expect(slot('actions')).toBeNull();
      expect(slot('end')).toBeNull();
    });

    it('runs the action that was clicked', async () => {
      const user = userEvent.setup();
      const run = vi.fn();
      render(
        <Banner
          title={TITLE}
          actions={
            <Button variant="secondary" size="sm" onClick={run}>
              Choose a plan
            </Button>
          }
        />
      );

      await user.click(screen.getByRole('button', { name: 'Choose a plan' }));
      expect(run).toHaveBeenCalledOnce();
    });

    it('warns about a primary button, which a banner must never carry', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      render(<Banner title={TITLE} actions={<Button variant="primary">Do it</Button>} />);
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('variant="primary"'));
      warn.mockRestore();
    });

    it('says nothing about a secondary button', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      render(<Banner title={TITLE} actions={<Button variant="secondary">Do it</Button>} />);
      expect(warn).not.toHaveBeenCalled();
      warn.mockRestore();
    });
  });

  describe('dismissing', () => {
    it('has no cross unless one is asked for', () => {
      render(<Banner title={TITLE} />);
      expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();
    });

    it('calls onDismiss when the cross is clicked', async () => {
      const user = userEvent.setup();
      const close = vi.fn();
      render(<Banner title={TITLE} onDismiss={close} />);

      await user.click(screen.getByRole('button', { name: 'Dismiss' }));
      expect(close).toHaveBeenCalledOnce();
    });

    it('takes a label of its own', () => {
      render(<Banner title={TITLE} onDismiss={() => undefined} dismissLabel="Hide this notice" />);
      expect(screen.getByRole('button', { name: 'Hide this notice' })).toBeInTheDocument();
    });

    it('puts the cross after the actions, never among them', () => {
      render(
        <Banner
          title={TITLE}
          onDismiss={() => undefined}
          actions={
            <Button variant="secondary" size="sm">
              Choose a plan
            </Button>
          }
        />
      );

      const buttons = screen.getAllByRole('button');
      expect(buttons.at(-1)).toHaveAttribute('aria-label', 'Dismiss');
    });

    it('is reachable by keyboard', async () => {
      const user = userEvent.setup();
      const close = vi.fn();
      render(<Banner title={TITLE} onDismiss={close} />);

      await user.tab();
      expect(screen.getByRole('button', { name: 'Dismiss' })).toHaveFocus();
      await user.keyboard('{Enter}');
      expect(close).toHaveBeenCalledOnce();
    });
  });

  describe('placement', () => {
    it('is rounded and fully bordered inline', () => {
      render(<Banner title={TITLE} />);
      expect(surface().className).toContain('mdt-rounded-lg');
    });

    it('loses its rounding and its side edges across a page', () => {
      render(<Banner title={TITLE} placement="page" />);
      expect(surface().className).toContain('mdt-rounded-none');
      expect(surface().className).toContain('mdt-border-x-0');
    });
  });

  describe('alignment', () => {
    const one = (
      <Button variant="secondary" size="sm">
        Choose a plan
      </Button>
    );

    it('centres everything on one line', () => {
      render(<Banner title={TITLE} />);
      expect(surface().className).toContain('mdt-items-center');
    });

    it('puts the glyph on the first line once there is a second one', () => {
      render(<Banner title={TITLE} description="Read-only after that." />);
      expect(surface().className).toContain('mdt-items-start');
    });

    it('puts the glyph on the first line once the actions drop below', () => {
      render(<Banner title={TITLE} actionPlacement="below" actions={one} />);
      expect(surface().className).toContain('mdt-items-start');
    });

    it('keeps the action on the banner centre, even under a paragraph', () => {
      render(<Banner title={TITLE} description="Read-only after that." actions={one} />);
      expect(slot('end')?.className).toContain('mdt-self-center');
    });

    it('keeps the cross on the banner centre with no action beside it', () => {
      render(
        <Banner title={TITLE} description="Read-only after that." onDismiss={() => undefined} />
      );
      expect(slot('end')?.className).toContain('mdt-self-center');
    });

    it('sends the cross to the top corner once the actions have dropped below', () => {
      render(
        <Banner
          title={TITLE}
          description="Read-only after that."
          actionPlacement="below"
          actions={one}
          onDismiss={() => undefined}
        />
      );
      expect(slot('end')?.className).not.toContain('mdt-self-center');
      expect(slot('end')?.className).toContain('mdt-h-[1.5em]');
    });
  });

  describe('the actions wear the banner', () => {
    const look = (name: string) => screen.getByRole('button', { name }).className;

    it('gives a secondary button the tone ground instead of the general grey', () => {
      render(
        <Banner
          tone="warning"
          title={TITLE}
          actions={
            <Button variant="secondary" size="sm">
              Choose a plan
            </Button>
          }
        />
      );
      expect(look('Choose a plan')).toContain('mdt-bg-[var(--bn-action)]');
    });

    it('publishes the tone ground on the banner, so nothing has to know the tone', () => {
      render(<Banner tone="warning" title={TITLE} />);
      expect(surface().className).toContain('[--bn-action:var(--mdt-feedback-warning-action)]');
    });

    it('leaves a ghost empty until the cursor is on it', () => {
      render(
        <Banner
          title={TITLE}
          actions={
            <Button variant="ghost" size="sm">
              Read the notes
            </Button>
          }
        />
      );
      expect(look('Read the notes')).toContain('mdt-bg-transparent');
      expect(look('Read the notes')).toContain('hover:mdt-bg-[var(--bn-action)]');
    });

    it('leaves a link a bare word', () => {
      render(
        <Banner
          title={TITLE}
          actions={
            <Button variant="link" size="sm">
              Review
            </Button>
          }
        />
      );
      expect(look('Review')).not.toContain('mdt-bg-[var(--bn-action)]');
    });

    it('keeps a className the caller passed', () => {
      render(
        <Banner
          title={TITLE}
          actions={
            <Button variant="secondary" size="sm" className="mine">
              Choose a plan
            </Button>
          }
        />
      );
      expect(look('Choose a plan')).toContain('mine');
    });
  });

  it('passes className and the rest through', () => {
    render(<Banner title={TITLE} className="mine" id="trial" />);
    expect(surface()).toHaveClass('mine');
    expect(surface()).toHaveAttribute('id', 'trial');
  });
});
