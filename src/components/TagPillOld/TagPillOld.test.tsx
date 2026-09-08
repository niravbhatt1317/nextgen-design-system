import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { TagPillOld } from './TagPillOld';
import type { TagPillOldShape } from './TagPillOld.types';

const TEXT = 'Infrastructure';
const TAG = 'tag';
const LABEL = 'tag-label';
const REMOVE = 'tag-remove';
const ICON = 'tag-icon';
const AVATAR = 'tag-avatar';

const getTag = () => screen.getByTestId(TAG);

describe('TagPillOld', () => {
  describe('rendering', () => {
    it('renders its label', () => {
      render(<TagPillOld>{TEXT}</TagPillOld>);
      expect(screen.getByText(TEXT)).toBeInTheDocument();
    });

    it('wraps the label so it can be cut off independently of the chip', () => {
      render(<TagPillOld>{TEXT}</TagPillOld>);
      expect(screen.getByTestId(LABEL)).toHaveTextContent(TEXT);
    });

    it('merges a custom className', () => {
      render(<TagPillOld className="mdt-ml-2">{TEXT}</TagPillOld>);
      expect(getTag()).toHaveClass('mdt-ml-2');
    });

    it('forwards a ref', () => {
      const ref = createRef<HTMLSpanElement>();
      render(<TagPillOld ref={ref}>{TEXT}</TagPillOld>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it('passes through native span attributes', () => {
      render(<TagPillOld title="A tag">{TEXT}</TagPillOld>);
      expect(getTag()).toHaveAttribute('title', 'A tag');
    });

    it('lets a caller override the test id', () => {
      render(<TagPillOld data-testid="mine">{TEXT}</TagPillOld>);
      expect(screen.getByTestId('mine')).toBeInTheDocument();
    });

    // A remove control needs a 24 x 24 target, and a shorter chip cannot hold
    // one. That is why there is exactly one size.
    it('is one fixed height', () => {
      render(<TagPillOld>{TEXT}</TagPillOld>);
      expect(getTag()).toHaveClass('mdt-h-6');
    });

    // The edge sat a full step darker than the fill, so the chip read as a
    // dark-edged object. The fill alone carries the shape.
    it('has no border', () => {
      render(<TagPillOld>{TEXT}</TagPillOld>);
      expect(getTag().className).not.toMatch(/mdt-border/);
    });

    it('tints neutral in both themes', () => {
      render(<TagPillOld>{TEXT}</TagPillOld>);
      expect(getTag()).toHaveClass('mdt-bg-neutral-20');
      expect(getTag()).toHaveClass('dark:mdt-bg-neutral-120');
    });
  });

  describe('shapes', () => {
    const cases: Array<[TagPillOldShape, string]> = [
      ['pill', 'mdt-rounded-full'],
      ['square', 'mdt-rounded-sm'],
    ];

    it.each(cases)('applies the %s shape', (shape, expected) => {
      render(<TagPillOld shape={shape}>{TEXT}</TagPillOld>);
      expect(getTag()).toHaveClass(expected);
    });

    it('is a pill by default', () => {
      render(<TagPillOld>{TEXT}</TagPillOld>);
      expect(getTag()).toHaveClass('mdt-rounded-full');
    });
  });

  describe('removing', () => {
    it('has no cross without a handler', () => {
      render(<TagPillOld>{TEXT}</TagPillOld>);
      expect(screen.queryByTestId(REMOVE)).not.toBeInTheDocument();
    });

    it('shows the cross when a handler is given', () => {
      render(<TagPillOld onRemove={vi.fn()}>{TEXT}</TagPillOld>);
      expect(screen.getByTestId(REMOVE)).toBeInTheDocument();
    });

    it('calls the handler when clicked', async () => {
      const onRemove = vi.fn();
      render(<TagPillOld onRemove={onRemove}>{TEXT}</TagPillOld>);
      await userEvent.click(screen.getByTestId(REMOVE));
      expect(onRemove).toHaveBeenCalledTimes(1);
    });

    // The cross is a real button, so Tab reaches it and Enter fires it. That is
    // why dropping the Backspace shortcut costs nothing.
    it('is reachable and firable from the keyboard', async () => {
      const onRemove = vi.fn();
      render(<TagPillOld onRemove={onRemove}>{TEXT}</TagPillOld>);
      await userEvent.tab();
      expect(screen.getByTestId(REMOVE)).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      expect(onRemove).toHaveBeenCalled();
    });

    it('carries a spoken label, since the cross has no text', () => {
      render(<TagPillOld onRemove={vi.fn()}>{TEXT}</TagPillOld>);
      expect(screen.getByLabelText('Remove')).toBeInTheDocument();
    });

    // The chip only lifts on hover when there is something to act on.
    it('gains a hover state only when it is removable', () => {
      const { rerender } = render(<TagPillOld>{TEXT}</TagPillOld>);
      expect(getTag()).not.toHaveClass('hover:mdt-bg-neutral-30');
      rerender(<TagPillOld onRemove={vi.fn()}>{TEXT}</TagPillOld>);
      expect(getTag()).toHaveClass('hover:mdt-bg-neutral-30');
    });

    it('tightens the right inset when the cross is there', () => {
      const { rerender } = render(<TagPillOld>{TEXT}</TagPillOld>);
      expect(getTag()).toHaveClass('mdt-pr-2.5');
      rerender(<TagPillOld onRemove={vi.fn()}>{TEXT}</TagPillOld>);
      expect(getTag()).toHaveClass('mdt-pr-0.5');
    });
  });

  describe('read-only', () => {
    it('renders no cross even when a handler is given', () => {
      render(
        <TagPillOld readOnly onRemove={vi.fn()}>
          {TEXT}
        </TagPillOld>
      );
      expect(screen.queryByTestId(REMOVE)).not.toBeInTheDocument();
    });

    it('is skipped by Tab, because there is nothing to act on', async () => {
      render(
        <TagPillOld readOnly onRemove={vi.fn()}>
          {TEXT}
        </TagPillOld>
      );
      await userEvent.tab();
      expect(screen.queryByTestId(REMOVE)).not.toBeInTheDocument();
      expect(document.body).toHaveFocus();
    });

    it('does not lift on hover', () => {
      render(<TagPillOld readOnly>{TEXT}</TagPillOld>);
      expect(getTag()).not.toHaveClass('hover:mdt-bg-neutral-30');
    });

    it('keeps the roomier right inset, having no cross to make space for', () => {
      render(
        <TagPillOld readOnly onRemove={vi.fn()}>
          {TEXT}
        </TagPillOld>
      );
      expect(getTag()).toHaveClass('mdt-pr-2.5');
    });
  });

  describe('disabled', () => {
    it('dims the chip', () => {
      render(
        <TagPillOld disabled onRemove={vi.fn()}>
          {TEXT}
        </TagPillOld>
      );
      expect(getTag()).toHaveClass('mdt-opacity-50');
    });

    it('still shows the cross, because it is yours - just not now', () => {
      render(
        <TagPillOld disabled onRemove={vi.fn()}>
          {TEXT}
        </TagPillOld>
      );
      expect(screen.getByTestId(REMOVE)).toBeInTheDocument();
    });

    it('disables the cross', () => {
      render(
        <TagPillOld disabled onRemove={vi.fn()}>
          {TEXT}
        </TagPillOld>
      );
      expect(screen.getByTestId(REMOVE)).toBeDisabled();
    });

    it('does not fire the handler', async () => {
      const onRemove = vi.fn();
      render(
        <TagPillOld disabled onRemove={onRemove}>
          {TEXT}
        </TagPillOld>
      );
      await userEvent.click(screen.getByTestId(REMOVE), { pointerEventsCheck: 0 });
      expect(onRemove).not.toHaveBeenCalled();
    });

    it('does not lift on hover', () => {
      render(
        <TagPillOld disabled onRemove={vi.fn()}>
          {TEXT}
        </TagPillOld>
      );
      expect(getTag()).not.toHaveClass('hover:mdt-bg-neutral-30');
    });
  });

  describe('the leading slot', () => {
    it('renders an icon before the label', () => {
      render(<TagPillOld icon={<svg data-testid="glyph" />}>{TEXT}</TagPillOld>);
      expect(screen.getByTestId(ICON)).toBeInTheDocument();
      expect(screen.getByTestId('glyph')).toBeInTheDocument();
    });

    it('sizes the icon itself, so the caller never picks one', () => {
      render(<TagPillOld icon={<svg data-testid="glyph" />}>{TEXT}</TagPillOld>);
      expect(screen.getByTestId(ICON)).toHaveClass('[&_svg]:mdt-size-3');
    });

    it('renders an avatar before the label', () => {
      render(<TagPillOld avatar={<span data-testid="face" />}>{TEXT}</TagPillOld>);
      expect(screen.getByTestId(AVATAR)).toBeInTheDocument();
      expect(screen.getByTestId('face')).toBeInTheDocument();
    });

    // A filled circle carries no air, so padding it like a word reads lopsided.
    it('pulls the chip in for an avatar and holds it back for anything else', () => {
      const { rerender } = render(<TagPillOld>{TEXT}</TagPillOld>);
      expect(getTag()).toHaveClass('mdt-pl-2.5');
      rerender(<TagPillOld icon={<svg />}>{TEXT}</TagPillOld>);
      expect(getTag()).toHaveClass('mdt-pl-2.5');
      rerender(<TagPillOld avatar={<span />}>{TEXT}</TagPillOld>);
      expect(getTag()).toHaveClass('mdt-pl-0.5');
    });

    // A tag has one leading mark, not two.
    it('drops the icon when an avatar is also given', () => {
      render(
        <TagPillOld avatar={<span data-testid="face" />} icon={<svg data-testid="glyph" />}>
          {TEXT}
        </TagPillOld>
      );
      expect(screen.getByTestId(AVATAR)).toBeInTheDocument();
      expect(screen.queryByTestId(ICON)).not.toBeInTheDocument();
    });

    it('hides both from screen readers, since the label already says it', () => {
      const { rerender } = render(<TagPillOld icon={<svg />}>{TEXT}</TagPillOld>);
      expect(screen.getByTestId(ICON)).toHaveAttribute('aria-hidden', 'true');
      rerender(<TagPillOld avatar={<span />}>{TEXT}</TagPillOld>);
      expect(screen.getByTestId(AVATAR)).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('truncation', () => {
    it('is off by default', () => {
      render(<TagPillOld>{TEXT}</TagPillOld>);
      expect(screen.getByTestId(LABEL)).not.toHaveClass('mdt-truncate');
    });

    it('caps the chip width when asked for', () => {
      render(<TagPillOld truncate>Infrastructure and platform</TagPillOld>);
      expect(getTag()).toHaveClass('mdt-max-w-32');
    });

    it('cuts the label rather than the chip', () => {
      render(<TagPillOld truncate>Infrastructure and platform</TagPillOld>);
      expect(screen.getByTestId(LABEL)).toHaveClass('mdt-truncate');
    });
  });
});
