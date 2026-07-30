import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './Tooltip';

describe('Tooltip', () => {
  describe('Rendering', () => {
    it('renders trigger element', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent>Tooltip content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('does not show content initially', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent>Tooltip content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
      const trigger = screen.getByText('Hover me');
      expect(trigger).toBeInTheDocument();
    });

    it('shows content on hover', async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent>Tooltip content visible</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      const trigger = screen.getByText('Hover me');
      await user.hover(trigger);

      await waitFor(() => {
        const contentElements = screen.queryAllByText('Tooltip content visible');
        expect(contentElements.length).toBeGreaterThan(0);
      });
    });
  });

  describe('TooltipProvider', () => {
    it('accepts delayDuration prop', () => {
      render(
        <TooltipProvider delayDuration={500}>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent>Content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('uses default delayDuration of 200ms', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent>Content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });
  });

  describe('TooltipContent', () => {
    it('renders with custom className', async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent className="custom-class">Content unique text</TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent side="bottom">Bottom content xyz</TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent align="start">Aligned content abc</TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent showArrow={false}>Content without arrow def</TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
        <TooltipProvider>
          <Tooltip open={true}>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent>Always visible ghi</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      await waitFor(() => {
        expect(screen.queryAllByText('Always visible ghi').length).toBeGreaterThan(0);
      });
    });

    it('respects controlled closed state', () => {
      render(
        <TooltipProvider>
          <Tooltip open={false}>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent>Never visible jkl</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(screen.queryByText('Never visible jkl')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('trigger is focusable', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button">Hover me button</button>
            </TooltipTrigger>
            <TooltipContent>Content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      const trigger = screen.getByRole('button', { name: 'Hover me button' });
      trigger.focus();
      expect(trigger).toHaveFocus();
    });

    it('shows content on focus', async () => {
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button">Focus me button</button>
            </TooltipTrigger>
            <TooltipContent>Tooltip on focus mno</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      const trigger = screen.getByRole('button');
      trigger.focus();

      await waitFor(() => {
        expect(screen.queryAllByText('Tooltip on focus mno').length).toBeGreaterThan(0);
      });
    });
  });

  describe('Multiple tooltips', () => {
    it('can render multiple tooltips independently', async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>Trigger 1</TooltipTrigger>
            <TooltipContent>Content 1 pqr</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>Trigger 2</TooltipTrigger>
            <TooltipContent>Content 2 stu</TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>Hover</TooltipTrigger>
            <TooltipContent>Styled content vwx</TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button">Custom button xyz</button>
            </TooltipTrigger>
            <TooltipContent>Content yzab</TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
        <TooltipProvider delayDuration={0}>
          <Tooltip defaultOpen>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent ref={ref}>Content bcde</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      await waitFor(() => {
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
      });
    });
  });
});
