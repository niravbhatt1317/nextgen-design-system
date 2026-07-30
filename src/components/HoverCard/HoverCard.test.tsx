import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardArrow } from './HoverCard';

describe('HoverCard', () => {
  describe('Rendering', () => {
    it('renders trigger element', () => {
      render(
        <HoverCard>
          <HoverCardTrigger>Hover me</HoverCardTrigger>
          <HoverCardContent>Content</HoverCardContent>
        </HoverCard>
      );

      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('does not show content initially', () => {
      render(
        <HoverCard>
          <HoverCardTrigger>Hover me</HoverCardTrigger>
          <HoverCardContent>Hover content</HoverCardContent>
        </HoverCard>
      );

      expect(screen.queryByText('Hover content')).not.toBeInTheDocument();
    });

    it('renders custom className on content', () => {
      render(
        <HoverCard defaultOpen>
          <HoverCardTrigger>Hover me</HoverCardTrigger>
          <HoverCardContent className="custom-class" data-testid="hover-content">
            Content
          </HoverCardContent>
        </HoverCard>
      );

      const content = screen.getByTestId('hover-content');
      expect(content).toHaveClass('custom-class');
    });
  });

  describe('Interactions', () => {
    it('shows content on hover', async () => {
      const user = userEvent.setup();

      render(
        <HoverCard openDelay={0}>
          <HoverCardTrigger>Hover me</HoverCardTrigger>
          <HoverCardContent>Hover content</HoverCardContent>
        </HoverCard>
      );

      const trigger = screen.getByText('Hover me');
      await user.hover(trigger);

      await waitFor(() => {
        expect(screen.getByText('Hover content')).toBeInTheDocument();
      });
    });

    it('hides content when unhovered', async () => {
      const user = userEvent.setup();

      render(
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger>Hover me</HoverCardTrigger>
          <HoverCardContent>Hover content</HoverCardContent>
        </HoverCard>
      );

      const trigger = screen.getByText('Hover me');
      await user.hover(trigger);

      await waitFor(() => {
        expect(screen.getByText('Hover content')).toBeInTheDocument();
      });

      await user.unhover(trigger);

      await waitFor(() => {
        expect(screen.queryByText('Hover content')).not.toBeInTheDocument();
      });
    });
  });

  describe('Controlled', () => {
    it('respects controlled open state', () => {
      render(
        <HoverCard open={true}>
          <HoverCardTrigger>Hover me</HoverCardTrigger>
          <HoverCardContent>Always visible</HoverCardContent>
        </HoverCard>
      );

      expect(screen.getByText('Always visible')).toBeInTheDocument();
    });

    it('calls onOpenChange when state changes', async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <HoverCard onOpenChange={onOpenChange} openDelay={0}>
          <HoverCardTrigger>Hover me</HoverCardTrigger>
          <HoverCardContent>Content</HoverCardContent>
        </HoverCard>
      );

      const trigger = screen.getByText('Hover me');
      await user.hover(trigger);

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(true);
      });
    });
  });

  describe('Positioning', () => {
    it('applies correct side prop', () => {
      render(
        <HoverCard defaultOpen>
          <HoverCardTrigger>Hover me</HoverCardTrigger>
          <HoverCardContent side="top">Top content</HoverCardContent>
        </HoverCard>
      );

      expect(screen.getByText('Top content')).toBeInTheDocument();
    });

    it('applies correct align prop', () => {
      render(
        <HoverCard defaultOpen>
          <HoverCardTrigger>Hover me</HoverCardTrigger>
          <HoverCardContent align="start">Start aligned</HoverCardContent>
        </HoverCard>
      );

      expect(screen.getByText('Start aligned')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('trigger is focusable', () => {
      render(
        <HoverCard>
          <HoverCardTrigger asChild>
            <button type="button">Hover me</button>
          </HoverCardTrigger>
          <HoverCardContent>Content</HoverCardContent>
        </HoverCard>
      );

      const trigger = screen.getByRole('button', { name: 'Hover me' });
      trigger.focus();
      expect(trigger).toHaveFocus();
    });
  });

  describe('asChild prop', () => {
    it('merges props when using asChild', () => {
      render(
        <HoverCard>
          <HoverCardTrigger asChild>
            <button type="button">Custom button</button>
          </HoverCardTrigger>
          <HoverCardContent>Content</HoverCardContent>
        </HoverCard>
      );

      const button = screen.getByRole('button', { name: 'Custom button' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  describe('HoverCardArrow', () => {
    it('renders arrow with default props', () => {
      render(
        <HoverCard defaultOpen>
          <HoverCardTrigger>Hover me</HoverCardTrigger>
          <HoverCardContent data-testid="hover-content">
            <HoverCardArrow data-testid="hover-arrow" />
            <p>Content with arrow</p>
          </HoverCardContent>
        </HoverCard>
      );

      const arrow = screen.getByTestId('hover-arrow');
      expect(arrow).toBeInTheDocument();
      expect(arrow).toHaveClass('mdt-fill-border');
    });

    it('renders arrow with custom className', () => {
      render(
        <HoverCard defaultOpen>
          <HoverCardTrigger>Hover me</HoverCardTrigger>
          <HoverCardContent>
            <HoverCardArrow className="custom-arrow-class" data-testid="custom-arrow" />
            <p>Content with custom arrow</p>
          </HoverCardContent>
        </HoverCard>
      );

      const arrow = screen.getByTestId('custom-arrow');
      expect(arrow).toBeInTheDocument();
      expect(arrow).toHaveClass('mdt-fill-border');
      expect(arrow).toHaveClass('custom-arrow-class');
    });

    it('renders arrow with custom width and height', () => {
      render(
        <HoverCard defaultOpen>
          <HoverCardTrigger>Hover me</HoverCardTrigger>
          <HoverCardContent>
            <HoverCardArrow width={20} height={10} data-testid="sized-arrow" />
            <p>Content with sized arrow</p>
          </HoverCardContent>
        </HoverCard>
      );

      const arrow = screen.getByTestId('sized-arrow');
      expect(arrow).toBeInTheDocument();
      expect(arrow).toHaveAttribute('width', '20');
      expect(arrow).toHaveAttribute('height', '10');
    });
  });
});
