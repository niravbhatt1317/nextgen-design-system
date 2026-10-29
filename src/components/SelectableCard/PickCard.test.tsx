import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Icon } from '../Icon';
import { PickCard } from './PickCard';

const TITLE = 'Direct to SaaS';
const LINE = 'Straight to the platform, with no collector in between';

const slot = (name: string) =>
  document.querySelector<HTMLElement>(`[data-slot="pick-card-${name}"]`);

describe('PickCard', () => {
  describe('the words', () => {
    it('shows the chosen option and its line', () => {
      render(<PickCard icon={<Icon name="cloud" />} title={TITLE} description={LINE} />);
      expect(slot('title')).toHaveTextContent(TITLE);
      expect(slot('description')).toHaveTextContent(LINE);
    });

    it('keeps the line to one, cut with an ellipsis', () => {
      render(<PickCard icon={<Icon name="cloud" />} title={TITLE} description={LINE} />);
      expect(slot('description')).toHaveClass('mdt-truncate');
    });

    it('leaves the line out when there is none', () => {
      const { rerender } = render(<PickCard icon={<Icon name="cloud" />} title={TITLE} />);
      expect(slot('description')).toBeNull();
      rerender(<PickCard icon={<Icon name="cloud" />} title={TITLE} description="" />);
      expect(slot('description')).toBeNull();
    });

    it('draws the glyph at 20 on the 40 tile', () => {
      render(<PickCard icon={<Icon name="cloud" />} title={TITLE} />);
      expect(slot('tile')).toHaveClass(
        'mdt-size-10',
        'mdt-rounded-md',
        'mdt-bg-secondary',
        'group-hover:mdt-bg-background'
      );
      expect(slot('tile')?.querySelector('svg')?.style.width).toBe('20px');
    });
  });

  describe('the door', () => {
    it('holds the selector glyph and the underlined Change in one cell, Change shown on hover or focus', () => {
      render(<PickCard icon={<Icon name="cloud" />} title={TITLE} />);
      const end = slot('end');
      expect(end).toHaveAttribute('aria-hidden', 'true');
      const glyph = end?.querySelector('svg');
      expect(glyph).toHaveAttribute('name', 'chevrons-up-down');
      expect(glyph).toHaveClass('mdt-col-start-1', 'mdt-row-start-1', 'group-hover:mdt-opacity-0');
      const change = slot('change');
      expect(change).toHaveTextContent('Change');
      expect(change).toHaveClass(
        'mdt-col-start-1',
        'mdt-row-start-1',
        'mdt-opacity-0',
        'group-hover:mdt-opacity-100',
        'mdt-underline'
      );
    });

    it('takes another word for Change', () => {
      render(<PickCard icon={<Icon name="cloud" />} title={TITLE} changeLabel="Edit" />);
      expect(slot('change')).toHaveTextContent('Edit');
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', `${TITLE}. Edit`);
    });
  });

  describe('the button', () => {
    it('is one button, named by the pick and the door', () => {
      render(<PickCard icon={<Icon name="cloud" />} title={TITLE} description={LINE} />);
      expect(screen.getAllByRole('button')).toHaveLength(1);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
      expect(screen.getByRole('button', { name: `${TITLE}. Change` })).toBeInTheDocument();
    });

    it('takes the caller’s name, with the field in it', () => {
      render(
        <PickCard
          icon={<Icon name="cloud" />}
          title={TITLE}
          aria-label="How it ships: Direct to SaaS. Change"
        />
      );
      expect(
        screen.getByRole('button', { name: 'How it ships: Direct to SaaS. Change' })
      ).toBeInTheDocument();
    });

    it('has no default name when the title is not plain words', () => {
      render(<PickCard icon={<Icon name="cloud" />} title={<b>{TITLE}</b>} />);
      expect(screen.getByRole('button')).not.toHaveAttribute('aria-label');
    });

    it('calls onChange on a press, on Enter and on Space', async () => {
      const onChange = vi.fn();
      render(<PickCard icon={<Icon name="cloud" />} title={TITLE} onChange={onChange} />);
      const card = screen.getByRole('button');
      await userEvent.click(card);
      card.focus();
      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');
      expect(onChange).toHaveBeenCalledTimes(3);
    });

    it('runs onClick first, and a prevented click opens nothing', async () => {
      const onChange = vi.fn();
      const onClick = vi.fn((event: { preventDefault: () => void }) => {
        event.preventDefault();
      });
      render(
        <PickCard
          icon={<Icon name="cloud" />}
          title={TITLE}
          onChange={onChange}
          onClick={onClick}
        />
      );
      await userEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('works with no onChange at all', async () => {
      render(<PickCard icon={<Icon name="cloud" />} title={TITLE} />);
      await userEvent.click(screen.getByRole('button'));
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('wears the option card: 14 in, 12 corners, the 1.5 edge, the sunken fill on hover', () => {
      render(<PickCard icon={<Icon name="cloud" />} title={TITLE} />);
      const cls = screen.getByRole('button').className;
      for (const c of [
        'mdt-p-3.5',
        'mdt-rounded-xl',
        'mdt-border-neutral-20',
        'hover:mdt-border-input',
        'hover:mdt-bg-secondary',
        'mdt-w-full',
        'focus-visible:mdt-ring-2',
      ])
        expect(cls).toContain(c);
    });

    it('forwards the ref, className and the rest', () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <PickCard
          ref={ref}
          icon={<Icon name="cloud" />}
          title={TITLE}
          className="mine"
          id="ship"
          disabled
        />
      );
      expect(ref.current).toBe(screen.getByRole('button'));
      expect(ref.current).toHaveClass('mine');
      expect(ref.current).toHaveAttribute('id', 'ship');
      expect(ref.current).toBeDisabled();
    });
  });
});
