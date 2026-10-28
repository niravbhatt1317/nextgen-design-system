import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Icon } from '../Icon';
import { ProblemList, ProblemRow } from './ProblemRow';
import type { ProblemSeverity } from './ProblemRow.types';

const TITLE = '125 hosts with a crashing module';
const DETAIL = 'Metrics on 40 · Logs on 30 · Patch on 19';

const slot = (name: string) =>
  document.querySelector<HTMLElement>(`[data-slot="problem-row-${name}"]`);
const row = () => screen.getByRole('button');

describe('ProblemRow', () => {
  describe('the words', () => {
    it('says what the problem is and the detail behind it', () => {
      render(<ProblemRow severity="warning" title={TITLE} detail={DETAIL} />);
      expect(slot('title')).toHaveTextContent(TITLE);
      expect(slot('detail')).toHaveTextContent(DETAIL);
    });

    it('draws a leading count in semibold and keeps the rest as it is said', () => {
      render(<ProblemRow severity="warning" title="1,204 agents silent" />);
      const count = slot('title')?.querySelector('span');
      expect(count).toHaveTextContent('1,204');
      expect(count).toHaveClass('mdt-font-semibold');
      expect(slot('title')).toHaveTextContent('1,204 agents silent');
    });

    it('leaves a title without a leading count as it is', () => {
      render(<ProblemRow severity="info" title="A collector isn't placed in a network zone" />);
      expect(slot('title')?.querySelector('span')).toBeNull();
    });

    it('shows the whole of a string title and detail on hover', () => {
      render(<ProblemRow severity="warning" title={TITLE} detail={DETAIL} />);
      expect(slot('title')).toHaveAttribute('title', TITLE);
      expect(slot('detail')).toHaveAttribute('title', DETAIL);
    });

    it('takes a node for the title, drawn as given, with no hover text and no default name', () => {
      render(
        <ProblemRow
          severity="danger"
          title={
            <>
              <b>9</b> collectors down
            </>
          }
          detail={<i>since 14:20</i>}
        />
      );
      expect(slot('title')).not.toHaveAttribute('title');
      expect(slot('detail')).not.toHaveAttribute('title');
      expect(row()).not.toHaveAttribute('aria-label');
    });

    it('leaves the detail line out when there is none', () => {
      const { rerender } = render(<ProblemRow severity="warning" title={TITLE} />);
      expect(slot('detail')).toBeNull();
      rerender(<ProblemRow severity="warning" title={TITLE} detail="" />);
      expect(slot('detail')).toBeNull();
      rerender(<ProblemRow severity="warning" title={TITLE} detail={null} />);
      expect(slot('detail')).toBeNull();
    });

    it('keeps each line to one, cut with an ellipsis', () => {
      render(<ProblemRow severity="warning" title={TITLE} detail={DETAIL} />);
      expect(slot('title')).toHaveClass('mdt-truncate');
      expect(slot('detail')).toHaveClass('mdt-truncate');
    });
  });

  describe('the level', () => {
    it.each<[ProblemSeverity, string, string]>([
      ['danger', 'Critical', 'mdt-bg-red-10'],
      ['warning', 'Warning', 'mdt-bg-orange-20'],
      ['info', 'Notice', 'mdt-bg-blue-10'],
    ])('a %s row wears its tile and says "%s"', (severity, word, tint) => {
      render(<ProblemRow severity={severity} title={TITLE} />);
      const tile = screen.getByRole('img', { name: word });
      expect(tile).toHaveClass(tint);
      expect(tile).toHaveClass('mdt-rounded-full');
      expect(tile.parentElement).toHaveAttribute('title', word);
      expect(row()).toHaveAttribute('data-severity', severity);
    });

    it('draws the level glyph at 16', () => {
      render(<ProblemRow severity="warning" title={TITLE} />);
      const svg = screen.getByRole('img', { name: 'Warning' }).querySelector('svg');
      expect(svg?.style.width).toBe('16px');
    });

    it('takes the level word from the caller', () => {
      render(<ProblemRow severity="danger" title={TITLE} severityLabel="Urgent" />);
      expect(screen.getByRole('img', { name: 'Urgent' })).toBeInTheDocument();
      expect(row()).toHaveAttribute('aria-label', `${TITLE}. Urgent.`);
    });

    it('takes a glyph of its own in place of the level glyph', () => {
      render(
        <ProblemRow
          severity="info"
          title={TITLE}
          icon={<Icon name="hard-drive" size={16} data-testid="own" />}
        />
      );
      expect(screen.getByTestId('own')).toBeInTheDocument();
    });
  });

  describe('the button', () => {
    it('is one button named by what it is and how bad', () => {
      render(<ProblemRow severity="warning" title={TITLE} detail={DETAIL} />);
      expect(screen.getAllByRole('button')).toHaveLength(1);
      expect(row()).toHaveAttribute('type', 'button');
      expect(row()).toHaveAttribute('aria-label', `${TITLE}. Warning.`);
    });

    it('takes the caller’s name for what pressing it opens', () => {
      render(
        <ProblemRow
          severity="warning"
          title={TITLE}
          aria-label={`${TITLE}. Warning. Open its agents.`}
        />
      );
      expect(
        screen.getByRole('button', { name: `${TITLE}. Warning. Open its agents.` })
      ).toBeInTheDocument();
    });

    it('runs onClick on a press, on Enter and on Space', async () => {
      const onClick = vi.fn();
      render(<ProblemRow severity="warning" title={TITLE} onClick={onClick} />);
      await userEvent.click(row());
      row().focus();
      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');
      expect(onClick).toHaveBeenCalledTimes(3);
    });

    it('shows View only on hover or focus, and hides it from the reader', () => {
      render(<ProblemRow severity="warning" title={TITLE} />);
      const view = slot('view');
      expect(view).toHaveTextContent('View');
      expect(view).toHaveAttribute('aria-hidden', 'true');
      expect(view).toHaveClass(
        'mdt-opacity-0',
        'group-hover:mdt-opacity-100',
        'group-focus-visible:mdt-opacity-100'
      );
    });

    it('takes another word for View', () => {
      render(<ProblemRow severity="warning" title={TITLE} viewLabel="Open" />);
      expect(slot('view')).toHaveTextContent('Open');
    });

    it('washes in the accent on hover and focus, and draws the hairline only after another row', () => {
      render(<ProblemRow severity="warning" title={TITLE} />);
      const cls = row().className;
      for (const c of [
        'hover:mdt-bg-accent',
        'focus-visible:mdt-bg-accent',
        'before:[&+&]:mdt-border-neutral-20',
        'before:[&:hover+&]:mdt-border-transparent',
        'before:[&+&:hover]:mdt-border-transparent',
        '-mdt-mx-2.5',
        'mdt-rounded-lg',
      ])
        expect(cls).toContain(c);
    });

    it('forwards the ref, className and the rest', () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <ProblemRow ref={ref} severity="info" title={TITLE} className="mine" id="silent" disabled />
      );
      expect(ref.current).toBe(row());
      expect(row()).toHaveClass('mine');
      expect(row()).toHaveAttribute('id', 'silent');
      expect(row()).toBeDisabled();
    });
  });
});

describe('ProblemList', () => {
  it('stacks the rows in one column', () => {
    render(
      <ProblemList aria-label="Needs attention">
        <ProblemRow severity="danger" title="9 collectors down" />
        <ProblemRow severity="warning" title="3 collectors over capacity" />
      </ProblemList>
    );
    const list = screen.getByLabelText('Needs attention');
    expect(list).toHaveAttribute('data-slot', 'problem-list');
    expect(list).toHaveClass('mdt-flex', 'mdt-flex-col');
    expect(list.children).toHaveLength(2);
  });

  it('forwards the ref and className', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<ProblemList ref={ref} className="mine" />);
    expect(ref.current).toBe(container.firstElementChild);
    expect(ref.current).toHaveClass('mine');
  });
});
