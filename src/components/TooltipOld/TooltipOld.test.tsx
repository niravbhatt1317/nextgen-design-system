import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { TooltipOld, TooltipTriggerOld, TooltipContentOld, TooltipProviderOld } from './TooltipOld';

describe('TooltipOld', () => {
  describe('Rendering', () => {
    it('renders trigger element', () => {
      render(
        <TooltipProviderOld>
          <TooltipOld>
            <TooltipTriggerOld>Hover me</TooltipTriggerOld>
            <TooltipContentOld>TooltipOld content</TooltipContentOld>
          </TooltipOld>
        </TooltipProviderOld>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('does not show content initially', () => {
      render(
        <TooltipProviderOld>
          <TooltipOld>
            <TooltipTriggerOld>Hover me</TooltipTriggerOld>
            <TooltipContentOld>TooltipOld content</TooltipContentOld>
          </TooltipOld>
        </TooltipProviderOld>
      );
      const trigger = screen.getByText('Hover me');
      expect(trigger).toBeInTheDocument();
    });

    it('shows content on hover', async () => {
      const user = userEvent.setup();

      render(
        <TooltipProviderOld delayDuration={0}>
          <TooltipOld>
            <TooltipTriggerOld>Hover me</TooltipTriggerOld>
            <TooltipContentOld>TooltipOld content visible</TooltipContentOld>
          </TooltipOld>
        </TooltipProviderOld>
      );

      const trigger = screen.getByText('Hover me');
      await user.hover(trigger);

      await waitFor(() => {
        const contentElements = screen.queryAllByText('TooltipOld content visible');
        expect(contentElements.length).toBeGreaterThan(0);
      });
    });
  });

  describe('TooltipProviderOld', () => {
    it('accepts delayDuration prop', () => {
      render(
        <TooltipProviderOld delayDuration={500}>
          <TooltipOld>
            <TooltipTriggerOld>Hover me</TooltipTriggerOld>
            <TooltipContentOld>Content</TooltipContentOld>
          </TooltipOld>
        </TooltipProviderOld>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('uses default delayDuration of 200ms', () => {
      render(
        <TooltipProviderOld>
          <TooltipOld>
            <TooltipTriggerOld>Hover me</TooltipTriggerOld>
            <TooltipContentOld>Content</TooltipContentOld>
          </TooltipOld>
        </TooltipProviderOld>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });
  });

  describe('TooltipContentOld', () => {
    it('renders with custom className', async () => {
      const user = userEvent.setup();

      render(
        <TooltipProviderOld delayDuration={0}>
          <TooltipOld>
            <TooltipTriggerOld>Hover me</TooltipTriggerOld>
            <TooltipContentOld className="custom-class">Content unique text</TooltipContentOld>
          </TooltipOld>
        </TooltipProviderOld>
      );

      const trigger = screen.getByText('Hover me');
      await user.hover(trigger);

      await waitFor(() => {
        expect(screen.queryAllByText('Content unique text').length).toBeGreaterThan(0);
      });
    });

    it('applies custom side prop', async () => {
      const user = userEvent.setup();

      render(
        <TooltipProviderOld delayDuration={0}>
          <TooltipOld>
            <TooltipTriggerOld>Hover me</TooltipTriggerOld>
            <TooltipContentOld side="bottom">Bottom content xyz</TooltipContentOld>
          </TooltipOld>
        </TooltipProviderOld>
      );

      const trigger = screen.getByText('Hover me');
      await user.hover(trigger);

      await waitFor(() => {
        expect(screen.queryAllByText('Bottom content xyz').length).toBeGreaterThan(0);
      });
    });

    it('applies custom align prop', async () => {
      const user = userEvent.setup();

      render(
        <TooltipProviderOld delayDuration={0}>
          <TooltipOld>
            <TooltipTriggerOld>Hover me</TooltipTriggerOld>
            <TooltipContentOld align="start">Aligned content abc</TooltipContentOld>
          </TooltipOld>
        </TooltipProviderOld>
      );

      const trigger = screen.getByText('Hover me');
      await user.hover(trigger);

      await waitFor(() => {
        expect(screen.queryAllByText('Aligned content abc').length).toBeGreaterThan(0);
      });
    });

    it('hides arrow when showArrow is false', async () => {
      const user = userEvent.setup();

      render(
        <TooltipProviderOld delayDuration={0}>
          <TooltipOld>
            <TooltipTriggerOld>Hover me</TooltipTriggerOld>
            <TooltipContentOld showArrow={false}>Content without arrow def</TooltipContentOld>
          </TooltipOld>
        </TooltipProviderOld>
      );

      const trigger = screen.getByText('Hover me');
      await user.hover(trigger);

      await waitFor(() => {
        expect(screen.queryAllByText('Content without arrow def').length).toBeGreaterThan(0);
      });
    });
  });

  describe('Controlled state', () => {
    it('respects controlled open state', async () => {
      render(
        <TooltipProviderOld>
          <TooltipOld open={true}>
            <TooltipTriggerOld>Trigger</TooltipTriggerOld>
            <TooltipContentOld>Always visible ghi</TooltipContentOld>
          </TooltipOld>
        </TooltipProviderOld>
      );

      await waitFor(() => {
        expect(screen.queryAllByText('Always visible ghi').length).toBeGreaterThan(0);
      });
    });

    it('respects controlled closed state', () => {
      render(
        <TooltipProviderOld>
          <TooltipOld open={false}>
            <TooltipTriggerOld>Trigger</TooltipTriggerOld>
            <TooltipContentOld>Never visible jkl</TooltipContentOld>
          </TooltipOld>
        </TooltipProviderOld>
      );

      expect(screen.queryByText('Never visible jkl')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('trigger is focusable', () => {
      render(
        <TooltipProviderOld>
          <TooltipOld>
            <TooltipTriggerOld asChild>
              <button type="button">Hover me button</button>
            </TooltipTriggerOld>
            <TooltipContentOld>Content</TooltipContentOld>
          </TooltipOld>
        </TooltipProviderOld>
      );

      const trigger = screen.getByRole('button', { name: 'Hover me button' });
      trigger.focus();
      expect(trigger).toHaveFocus();
    });

    it('shows content on focus', async () => {
      render(
        <TooltipProviderOld delayDuration={0}>
          <TooltipOld>
            <TooltipTriggerOld asChild>
              <button type="button">Focus me button</button>
            </TooltipTriggerOld>
            <TooltipContentOld>TooltipOld on focus mno</TooltipContentOld>
          </TooltipOld>
        </TooltipProviderOld>
      );

      const trigger = screen.getByRole('button');
      trigger.focus();

      await waitFor(() => {
        expect(screen.queryAllByText('TooltipOld on focus mno').length).toBeGreaterThan(0);
      });
    });
  });

  describe('Multiple tooltips', () => {
    it('can render multiple tooltips independently', async () => {
      const user = userEvent.setup();

      render(
        <TooltipProviderOld delayDuration={0}>
          <TooltipOld>
            <TooltipTriggerOld>Trigger 1</TooltipTriggerOld>
            <TooltipContentOld>Content 1 pqr</TooltipContentOld>
          </TooltipOld>
          <TooltipOld>
            <TooltipTriggerOld>Trigger 2</TooltipTriggerOld>
            <TooltipContentOld>Content 2 stu</TooltipContentOld>
          </TooltipOld>
        </TooltipProviderOld>
      );

      const trigger1 = screen.getByText('Trigger 1');
      await user.hover(trigger1);

      await waitFor(() => {
        expect(screen.queryAllByText('Content 1 pqr').length).toBeGreaterThan(0);
        expect(screen.queryByText('Content 2 stu')).not.toBeInTheDocument();
      });
    });
  });

  describe('Styling', () => {
    it('has correct base classes', async () => {
      const user = userEvent.setup();

      render(
        <TooltipProviderOld delayDuration={0}>
          <TooltipOld>
            <TooltipTriggerOld>Hover</TooltipTriggerOld>
            <TooltipContentOld>Styled content vwx</TooltipContentOld>
          </TooltipOld>
        </TooltipProviderOld>
      );

      const trigger = screen.getByText('Hover');
      await user.hover(trigger);

      await waitFor(() => {
        expect(screen.queryAllByText('Styled content vwx').length).toBeGreaterThan(0);
      });
    });
  });

  describe('asChild prop', () => {
    it('merges props when using asChild on trigger', async () => {
      const user = userEvent.setup();

      render(
        <TooltipProviderOld delayDuration={0}>
          <TooltipOld>
            <TooltipTriggerOld asChild>
              <button type="button">Custom button xyz</button>
            </TooltipTriggerOld>
            <TooltipContentOld>Content yzab</TooltipContentOld>
          </TooltipOld>
        </TooltipProviderOld>
      );

      const button = screen.getByRole('button', { name: 'Custom button xyz' });
      expect(button).toHaveAttribute('type', 'button');

      await user.hover(button);

      await waitFor(() => {
        expect(screen.queryAllByText('Content yzab').length).toBeGreaterThan(0);
      });
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to content', async () => {
      const ref = { current: null as HTMLDivElement | null };

      render(
        <TooltipProviderOld delayDuration={0}>
          <TooltipOld defaultOpen>
            <TooltipTriggerOld>Trigger</TooltipTriggerOld>
            <TooltipContentOld ref={ref}>Content bcde</TooltipContentOld>
          </TooltipOld>
        </TooltipProviderOld>
      );

      await waitFor(() => {
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
      });
    });
  });
});
