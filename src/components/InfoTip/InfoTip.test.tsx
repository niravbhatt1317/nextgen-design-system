import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { InfoTip } from './InfoTip';

const TEXT = 'Applies to every user in this organization.';

/** The visible bubble; Radix keeps a second, hidden copy for screen readers. */
const bubble = () => document.querySelector<HTMLElement>('.tt');
const trigger = () => screen.getByRole('button', { name: 'About Security policy' });
/** The visible link - the first in the bubble; the hidden copy's follows it. */
const visibleLink = () => bubble()?.querySelector<HTMLAnchorElement>('[data-infotip-link]') ?? null;

async function openByHover() {
  await userEvent.hover(trigger());
  await waitFor(() => {
    expect(bubble()).not.toBeNull();
  });
  return bubble() as HTMLElement;
}

describe('InfoTip', () => {
  describe('rendering', () => {
    it('renders a 20px ⓘ named by its label, the filled glyph at 14, and no bubble yet', () => {
      render(<InfoTip label="About Security policy">{TEXT}</InfoTip>);
      const button = trigger();
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveClass('mdt-h-5', 'mdt-w-5', 'mdt-rounded-md', 'mdt-text-neutral-40');
      expect(button.querySelector('svg')).toHaveClass('mdt-h-3.5', 'mdt-w-3.5');
      expect(button.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
      expect(bubble()).toBeNull();
    });

    it('takes another glyph and a className', () => {
      render(
        <InfoTip label="About Security policy" icon={<span data-testid="glyph" />} className="x">
          {TEXT}
        </InfoTip>
      );
      expect(screen.getByTestId('glyph')).toBeInTheDocument();
      expect(trigger()).toHaveClass('x');
    });

    it('forwards the ref to the ⓘ', () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <InfoTip ref={ref} label="About Security policy">
          {TEXT}
        </InfoTip>
      );
      expect(ref.current).toBe(trigger());
    });
  });

  describe('opening', () => {
    it('opens on hover, read from the left, 340 wide at most, under its start', async () => {
      render(<InfoTip label="About Security policy">{TEXT}</InfoTip>);
      const el = await openByHover();
      expect(el).toHaveTextContent(TEXT);
      expect(el).toHaveClass('mdt-text-left');
      expect(el).not.toHaveClass('mdt-text-center');
      expect(el.style.maxWidth).toBe('340px');
      expect(el).toHaveAttribute('data-side', 'bottom');
      expect(el).toHaveAttribute('data-align', 'start');
      expect(screen.getByRole('tooltip')).toHaveTextContent(TEXT);
    });

    it('takes another side, alignment and width', async () => {
      render(
        <InfoTip label="About Security policy" side="top" align="center" maxWidth={300}>
          {TEXT}
        </InfoTip>
      );
      const el = await openByHover();
      expect(el).toHaveAttribute('data-side', 'top');
      expect(el).toHaveAttribute('data-align', 'center');
      expect(el.style.maxWidth).toBe('300px');
    });

    it('opens on keyboard focus and closes on Escape', async () => {
      render(<InfoTip label="About Security policy">{TEXT}</InfoTip>);
      await userEvent.tab();
      expect(trigger()).toHaveFocus();
      await waitFor(() => {
        expect(bubble()).not.toBeNull();
      });
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(bubble()).toBeNull();
      });
    });

    it('opens on a press, and a second press does not blink it shut', async () => {
      const user = userEvent.setup();
      render(<InfoTip label="About Security policy">{TEXT}</InfoTip>);
      await user.pointer({ keys: '[MouseLeft]', target: trigger() });
      await waitFor(() => {
        expect(bubble()).not.toBeNull();
      });
      await user.pointer({ keys: '[MouseLeft]', target: trigger() });
      expect(bubble()).not.toBeNull();
    });

    it('closes on a press anywhere else', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <InfoTip label="About Security policy">{TEXT}</InfoTip>
          <p>Elsewhere</p>
        </div>
      );
      await user.pointer({ keys: '[MouseLeft]', target: trigger() });
      await waitFor(() => {
        expect(bubble()).not.toBeNull();
      });
      await user.pointer({ keys: '[MouseLeft]', target: screen.getByText('Elsewhere') });
      await waitFor(() => {
        expect(bubble()).toBeNull();
      });
    });

    it('opens on Enter', async () => {
      render(<InfoTip label="About Security policy">{TEXT}</InfoTip>);
      trigger().focus();
      await userEvent.keyboard('{Enter}');
      await waitFor(() => {
        expect(bubble()).not.toBeNull();
      });
    });
  });

  describe('learn more', () => {
    it('shows the link at the foot, "Learn more" by default, out of the tab order', async () => {
      render(
        <InfoTip label="About Security policy" learnMore={{ href: '/docs/policy' }}>
          {TEXT}
        </InfoTip>
      );
      await openByHover();
      const link = visibleLink();
      expect(link).toHaveTextContent('Learn more');
      expect(link).toHaveAttribute('href', '/docs/policy');
      expect(link).toHaveAttribute('tabindex', '-1');
      expect(link).not.toHaveAttribute('target');
    });

    it('takes its own words and opens a new tab when asked, saying so', async () => {
      render(
        <InfoTip
          label="About Security policy"
          learnMore={{ href: 'https://example.com', label: 'Read the guide', newTab: true }}
        >
          {TEXT}
        </InfoTip>
      );
      await openByHover();
      const link = visibleLink();
      expect(link).toHaveTextContent('Read the guide (opens in a new tab)');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('Tab on the open ⓘ moves into the link; Shift+Tab goes back', async () => {
      render(
        <InfoTip label="About Security policy" learnMore={{ href: '/docs/policy' }}>
          {TEXT}
        </InfoTip>
      );
      await userEvent.tab();
      await waitFor(() => {
        expect(bubble()).not.toBeNull();
      });
      await userEvent.tab();
      expect(visibleLink()).toHaveFocus();
      expect(bubble()).not.toBeNull();
      await userEvent.tab({ shift: true });
      expect(trigger()).toHaveFocus();
      expect(bubble()).not.toBeNull();
    });

    it('Tab from the link closes it and moves on to what follows the ⓘ', async () => {
      render(
        <div>
          <InfoTip label="About Security policy" learnMore={{ href: '/docs/policy' }}>
            {TEXT}
          </InfoTip>
          <button type="button">Next</button>
        </div>
      );
      await userEvent.tab();
      await waitFor(() => {
        expect(bubble()).not.toBeNull();
      });
      await userEvent.tab();
      expect(visibleLink()).toHaveFocus();
      await userEvent.tab();
      expect(screen.getByRole('button', { name: 'Next' })).toHaveFocus();
      await waitFor(() => {
        expect(bubble()).toBeNull();
      });
    });

    it('Escape from the link closes it and returns to the ⓘ', async () => {
      render(
        <InfoTip label="About Security policy" learnMore={{ href: '/docs/policy' }}>
          {TEXT}
        </InfoTip>
      );
      await userEvent.tab();
      await waitFor(() => {
        expect(bubble()).not.toBeNull();
      });
      await userEvent.tab();
      expect(visibleLink()).toHaveFocus();
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(bubble()).toBeNull();
      });
      expect(trigger()).toHaveFocus();
    });

    it('without a link, Tab leaves the ⓘ as usual', async () => {
      render(
        <div>
          <InfoTip label="About Security policy">{TEXT}</InfoTip>
          <button type="button">Next</button>
        </div>
      );
      await userEvent.tab();
      await userEvent.tab();
      expect(screen.getByRole('button', { name: 'Next' })).toHaveFocus();
    });
  });
});
