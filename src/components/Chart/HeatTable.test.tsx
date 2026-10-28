import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { HeatTable } from './HeatTable';
import type { HeatCell } from './Chart.types';

const bubble = () => document.querySelector<HTMLElement>('.tt');
const cell = (n: number, of: number, fleetRate: number, onPick = vi.fn()): HeatCell => ({
  n,
  of,
  fleetRate,
  tip: `cell ${String(n)}`,
  onPick,
});

describe('HeatTable', () => {
  it('heads the groups, the count and every problem; each row its group, its count and its cells', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <HeatTable
        ref={ref}
        className="mine"
        head="Zone"
        countLabel="Agents"
        cols={['Silent', 'Over budget']}
        rows={[
          {
            label: 'Retail stores',
            n: 1075,
            cells: [cell(16, 1075, 0.015), cell(15, 1075, 0.011)],
          },
          {
            label: '7.4.0',
            note: 'current',
            n: 1086,
            cells: [cell(0, 1086, 0.015), cell(9, 1086, 0.011)],
          },
        ]}
      />
    );
    expect(ref.current).toHaveClass('mdt-chart-heat-wrap', 'mine');
    expect(screen.getAllByRole('columnheader').map((h) => h.textContent)).toEqual([
      'Zone',
      'Agents',
      'Silent',
      'Over budget',
    ]);
    const rows = screen.getAllByRole('row').slice(1);
    expect(within(rows[0] as HTMLElement).getAllByRole('cell')[1]).toHaveTextContent('1,075');
    expect(within(rows[1] as HTMLElement).getAllByRole('cell')[0]).toHaveTextContent(
      '7.4.0 current'
    );
    expect(screen.getByRole('button', { name: '161.5%' })).toBeEnabled();
    expect(screen.getByRole('button', { name: '00%' })).toBeDisabled();
  });

  it('shades each cell against the whole: none, then five steps from far better to far worse', () => {
    const rates = [0, 0.4, 0.8, 1, 1.5, 2];
    const { container } = render(
      <HeatTable
        head="Zone"
        countLabel="Collectors"
        cols={rates.map((r) => `x${String(r)}`)}
        rows={[{ label: 'A', n: 100, cells: rates.map((r) => cell(r * 10, 100, 0.1)) }]}
      />
    );
    expect(
      [...container.querySelectorAll('.mdt-chart-heat__c')].map((c) => c.getAttribute('data-level'))
    ).toEqual(['0', '1', '2', '3', '4', '5']);
  });

  it('a zero rate on the whole still shades, and an empty row does not divide by zero', () => {
    const { container } = render(
      <HeatTable
        head="Zone"
        countLabel="Agents"
        cols={['a', 'b']}
        rows={[{ label: 'A', n: 0, cells: [cell(1, 0, 0), cell(0, 0, 0)] }]}
      />
    );
    const cells = container.querySelectorAll('.mdt-chart-heat__c');
    expect(cells[0]).toHaveAttribute('data-level', '5');
    expect(cells[1]).toHaveAttribute('data-level', '0');
  });

  it('names its ramp, lighter better, darker worse', () => {
    const { container } = render(<HeatTable head="Zone" countLabel="Agents" cols={[]} rows={[]} />);
    const ramp = container.querySelector('.mdt-chart-ramp');
    expect(ramp).toHaveTextContent('Better than the fleet Worse than the fleet');
    expect(ramp).toHaveAttribute('aria-hidden', 'true');
    expect(
      [...(ramp?.querySelectorAll('i') ?? [])].map((i) => i.getAttribute('data-level'))
    ).toEqual(['1', '2', '3', '4', '5']);
  });

  it('a cell opens its members on a click, and its hover is the one line', async () => {
    const onPick = vi.fn();
    render(
      <HeatTable
        head="Zone"
        countLabel="Agents"
        cols={['Silent']}
        rows={[
          {
            label: 'Retail stores',
            n: 1075,
            cells: [
              { ...cell(16, 1075, 0.015, onPick), tip: 'Retail stores · Silent · 16 agents' },
            ],
          },
        ]}
      />
    );
    const button = screen.getByRole('button', { name: '161.5%' });
    await userEvent.hover(button);
    await waitFor(() => {
      expect(bubble()).toHaveTextContent('Retail stores · Silent · 16 agents');
    });
    await userEvent.click(button);
    expect(onPick).toHaveBeenCalledTimes(1);
  });
});
