import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { StatusBlocks } from './StatusBlocks';
import type { StatusBlock } from './Chart.types';

const bubble = () => document.querySelector<HTMLElement>('.tt');

const BLOCKS: StatusBlock[] = [
  { label: '14:00–14:30', value: 99.1 },
  { label: '14:30–15:00', value: 97.2 },
  { label: '15:00–15:30', value: 95.7 },
  { label: 'Now', value: 98.2 },
];
const AXIS = ['2h ago', '1h ago', 'Now'];

describe('StatusBlocks', () => {
  it('draws nothing without blocks', () => {
    const { container } = render(<StatusBlocks blocks={[]} axis={AXIS} label="Sending" />);
    expect(container.firstChild).toBeNull();
  });

  it('one block per period, green at or above 98, amber at or above 96, red under it', () => {
    const { container } = render(<StatusBlocks blocks={BLOCKS} axis={AXIS} label="Sending" />);
    expect(
      [...container.querySelectorAll('.mdt-chart-block')].map((b) => b.getAttribute('data-tone'))
    ).toEqual(['good', 'warn', 'crit', 'good']);
    expect(container.querySelector('.mdt-chart-blocks')).not.toHaveClass('mdt-chart-blocks--dense');
  });

  it('names the thresholds in its legend and moves them with good and warn', () => {
    const { container, rerender } = render(
      <StatusBlocks blocks={BLOCKS} axis={AXIS} label="Sending" />
    );
    const legend = () =>
      [...container.querySelectorAll('.mdt-chart-legend > span')].map((s) => s.textContent);
    expect(legend()).toEqual(['98% or more', '96–98%', 'Under 96%']);
    rerender(<StatusBlocks blocks={BLOCKS} axis={AXIS} label="Sending" good={99} warn={95} />);
    expect(legend()).toEqual(['99% or more', '95–99%', 'Under 95%']);
    expect(
      [...container.querySelectorAll('.mdt-chart-block')].map((b) => b.getAttribute('data-tone'))
    ).toEqual(['good', 'warn', 'warn', 'warn']);
  });

  it('speaks the lowest and the latest, and names the lowest period under the axis', () => {
    const { container } = render(<StatusBlocks blocks={BLOCKS} axis={AXIS} label="Sending" />);
    expect(
      screen.getByRole('img', { name: 'Sending: lowest 95.7%, now 98.2%' })
    ).toBeInTheDocument();
    expect(
      [...container.querySelectorAll('.mdt-chart-axis span')].map((s) => s.textContent)
    ).toEqual(AXIS);
    expect(container.querySelector('.mdt-chart-blocks-wrap > .mdt-chart-note')).toHaveTextContent(
      'Lowest 95.7% · 15:00–15:30 · 2 of 4 blocks under 98%'
    );
  });

  it('closes its gaps past 60 blocks and holds a control on the legend row', () => {
    const many = Array.from({ length: 61 }, (_, i) => ({ label: `p${String(i)}`, value: 99 }));
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <StatusBlocks
        ref={ref}
        blocks={many}
        axis={AXIS}
        label="Sending"
        className="mine"
        control={<button type="button">24 hours</button>}
      />
    );
    expect(container.querySelector('.mdt-chart-blocks')).toHaveClass('mdt-chart-blocks--dense');
    expect(container.querySelector('.mdt-chart-blocks-head')).toContainElement(
      screen.getByRole('button', { name: '24 hours' })
    );
    expect(ref.current).toHaveClass('mdt-chart-blocks-wrap', 'mine');
  });

  it('each block takes focus and opens its one line, with what the share counts', async () => {
    const { container, rerender } = render(
      <StatusBlocks blocks={BLOCKS} axis={AXIS} label="Sending" what="sending data" />
    );
    const last = container.querySelectorAll<HTMLElement>('.mdt-chart-block')[3];
    expect(last).toHaveAttribute('tabindex', '0');
    await userEvent.hover(last as HTMLElement);
    await waitFor(() => {
      expect(bubble()).toHaveTextContent('Now · 98.2% sending data');
    });
    await userEvent.unhover(last as HTMLElement);
    rerender(<StatusBlocks blocks={BLOCKS} axis={AXIS} label="Sending" />);
    await userEvent.hover(
      container.querySelectorAll<HTMLElement>('.mdt-chart-block')[0] as HTMLElement
    );
    await waitFor(() => {
      /* the one line, and nothing after the number when `what` is left out */
      expect(bubble()?.querySelector(':scope > .mdt-chart-tip')?.textContent).toBe(
        '14:00–14:30 · 99.1%'
      );
    });
  });
});
