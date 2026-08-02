import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Progress, ProgressBreakdown } from './Progress';
import type { ProgressSize, ProgressTone } from './Progress.types';

const LABEL = 'Storage used';
const FILL = 'progress-fill';

const bar = () => screen.getByRole('progressbar');
const fill = () => screen.getByTestId(FILL);

describe('Progress', () => {
  describe('value', () => {
    it('reports its value to assistive tech', () => {
      render(<Progress value={40} aria-label={LABEL} />);
      expect(bar()).toHaveAttribute('aria-valuenow', '40');
      expect(bar()).toHaveAttribute('aria-valuemin', '0');
      expect(bar()).toHaveAttribute('aria-valuemax', '100');
    });

    it('is named, so it is not announced as a nameless box', () => {
      render(<Progress value={40} aria-label={LABEL} />);
      expect(screen.getByRole('progressbar', { name: LABEL })).toBeInTheDocument();
    });

    it('fills proportionally', () => {
      render(<Progress value={25} aria-label={LABEL} />);
      expect(fill()).toHaveStyle({ width: '25.000%' });
    });

    it('scales to a custom max', () => {
      render(<Progress value={5} max={20} aria-label={LABEL} />);
      expect(fill()).toHaveStyle({ width: '25.000%' });
      expect(bar()).toHaveAttribute('aria-valuemax', '20');
    });

    it('clamps a value above max', () => {
      render(<Progress value={150} aria-label={LABEL} />);
      expect(fill()).toHaveStyle({ width: '100.000%' });
      expect(bar()).toHaveAttribute('aria-valuenow', '100');
    });

    it('clamps a negative value', () => {
      render(<Progress value={-20} aria-label={LABEL} />);
      expect(fill()).toHaveStyle({ width: '0.000%' });
      expect(bar()).toHaveAttribute('aria-valuenow', '0');
    });

    it('survives a max of zero rather than dividing by it', () => {
      render(<Progress value={10} max={0} aria-label={LABEL} />);
      expect(fill()).toHaveStyle({ width: '10.000%' });
    });
  });

  describe('tone', () => {
    const cases: [ProgressTone, string][] = [
      ['default', 'mdt-bg-info'],
      ['success', 'mdt-bg-success'],
      ['warning', 'mdt-bg-warning'],
      ['danger', 'mdt-bg-destructive'],
    ];

    it.each(cases)('applies the %s tone', (tone, expected) => {
      render(<Progress value={50} tone={tone} aria-label={LABEL} />);
      expect(fill()).toHaveClass(expected);
    });
  });

  describe('size', () => {
    const cases: [ProgressSize, string][] = [
      ['sm', 'mdt-h-1'],
      ['md', 'mdt-h-1.5'],
      ['lg', 'mdt-h-2'],
    ];

    it.each(cases)('applies the %s size', (size, expected) => {
      const { container } = render(<Progress value={50} size={size} aria-label={LABEL} />);
      expect(container.querySelector(`.${CSS.escape(expected)}`)).toBeInTheDocument();
    });
  });

  describe('markers', () => {
    it('draws no markers by default', () => {
      render(<Progress value={50} aria-label={LABEL} />);
      expect(screen.queryByTestId('progress-baseline')).not.toBeInTheDocument();
      expect(screen.queryByTestId('progress-floor')).not.toBeInTheDocument();
    });

    it('draws a baseline where asked', () => {
      render(<Progress value={50} baseline={75} aria-label={LABEL} />);
      expect(screen.getByTestId('progress-baseline')).toHaveStyle({ left: '75.000%' });
    });

    it('draws a floor where asked', () => {
      render(<Progress value={50} floor={10} aria-label={LABEL} />);
      expect(screen.getByTestId('progress-floor')).toHaveStyle({ left: '10.000%' });
    });

    it('clamps markers to the track', () => {
      render(<Progress value={50} baseline={999} floor={-50} aria-label={LABEL} />);
      expect(screen.getByTestId('progress-baseline')).toHaveStyle({ left: '100.000%' });
      expect(screen.getByTestId('progress-floor')).toHaveStyle({ left: '0.000%' });
    });

    it('hides markers from screen readers, since the value is already announced', () => {
      render(<Progress value={50} baseline={75} floor={10} aria-label={LABEL} />);
      expect(screen.getByTestId('progress-baseline')).toHaveAttribute('aria-hidden', 'true');
      expect(screen.getByTestId('progress-floor')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('merges a custom className', () => {
    render(<Progress value={50} className="mdt-mt-2" aria-label={LABEL} />);
    expect(bar()).toHaveClass('mdt-mt-2');
  });

  it('forwards a ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Progress value={50} ref={ref} aria-label={LABEL} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('Progress · words around the bar', () => {
  const q = (c: HTMLElement, slot: string) => c.querySelector(`[data-slot="${slot}"]`);

  it('draws nothing extra when there are no words', () => {
    const { container } = render(<Progress value={62} aria-label="Storage" />);
    expect(q(container, 'progress-above')).toBeNull();
    expect(q(container, 'progress-below')).toBeNull();
    expect(q(container, 'progress-legend')).toBeNull();
    // and it is still the single element it always was
    expect(container.firstElementChild).toHaveAttribute('role', 'progressbar');
  });

  it('puts a name on the left and its number on the right, above the bar', () => {
    const { container } = render(
      <Progress value={62} above={{ left: 'Storage used', right: '62%' }} aria-label="Storage" />
    );
    expect(q(container, 'progress-above-left')).toHaveTextContent('Storage used');
    expect(q(container, 'progress-above-right')).toHaveTextContent('62%');
  });

  it('does the same underneath, quieter', () => {
    const { container } = render(
      <Progress
        value={62}
        below={{ left: '62 GB of 100 GB', right: '38 GB left' }}
        aria-label="Storage"
      />
    );
    expect(q(container, 'progress-below-left')).toHaveTextContent('62 GB of 100 GB');
    expect(q(container, 'progress-below-right')).toHaveTextContent('38 GB left');
    expect(q(container, 'progress-below')).toHaveClass('mdt-text-muted-foreground');
  });

  it('takes a bare string as the left end on its own', () => {
    const { container } = render(
      <Progress value={38} above="Uploading rollback-plan.pdf" aria-label="Uploading" />
    );
    expect(q(container, 'progress-above-left')).toHaveTextContent('Uploading rollback-plan.pdf');
    expect(q(container, 'progress-above-right')).toBeNull();
  });

  it('pushes a lone right end hard against the edge', () => {
    const { container } = render(
      <Progress value={91} below={{ right: '9 left' }} aria-label="Seats" />
    );
    // not a two-column grid: an empty left column would leave it stranded
    expect(q(container, 'progress-below')).toHaveClass('mdt-justify-end');
    expect(q(container, 'progress-below-left')).toBeNull();
  });

  it('sets the figures to one width, so a column of them lines up', () => {
    const { container } = render(
      <Progress
        value={7}
        below={{ left: '140 of 2,000', right: '1,860 left' }}
        aria-label="Automations"
      />
    );
    expect(q(container, 'progress-below-right')).toHaveClass('mdt-tabular-nums');
  });

  it('still announces the value with words around it', () => {
    render(
      <Progress
        value={91}
        max={100}
        above={{ left: 'Seats', right: '91 of 100' }}
        aria-label="Seats used"
      />
    );
    const bar = screen.getByRole('progressbar', { name: 'Seats used' });
    expect(bar).toHaveAttribute('aria-valuenow', '91');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });
});

describe('Progress · the key', () => {
  const legend = [
    { label: 'Used', value: 91, swatch: 'danger' as const },
    { label: 'Your plan allows', value: 75, swatch: 'baseline' as const },
  ];

  it('names each colour and the figure behind it', () => {
    render(<Progress value={91} baseline={75} legend={legend} aria-label="Seats" />);
    expect(screen.getByText('Used')).toBeInTheDocument();
    expect(screen.getByText('91')).toBeInTheDocument();
    expect(screen.getByText('Your plan allows')).toBeInTheDocument();
  });

  it('draws a marker swatch as a line, not a square', () => {
    const { container } = render(
      <Progress value={91} baseline={75} legend={legend} aria-label="Seats" />
    );
    const items = container.querySelectorAll('[data-slot="progress-legend-item"]');
    const fillSwatch = items[0]?.firstElementChild;
    const markerSwatch = items[1]?.firstElementChild;
    expect(fillSwatch).toHaveClass('mdt-w-2');
    expect(markerSwatch).toHaveClass('mdt-w-0.5');
  });

  it('draws nothing when the key is empty', () => {
    const { container } = render(<Progress value={62} legend={[]} aria-label="Storage" />);
    expect(container.querySelector('[data-slot="progress-legend"]')).toBeNull();
  });

  it('goes last, under the words below the bar', () => {
    const { container } = render(
      <Progress value={91} below={{ left: 'x' }} legend={legend} aria-label="Seats" />
    );
    const kids = [...(container.firstElementChild?.children ?? [])].map((e) =>
      e.getAttribute('data-slot')
    );
    expect(kids[kids.length - 1]).toBe('progress-legend');
  });
});

describe('ProgressBreakdown', () => {
  const segments = [
    { label: 'Tickets', value: 48, valueLabel: '48 GB' },
    { label: 'Attachments', value: 22, valueLabel: '22 GB', tone: 'warning' as const },
    { label: 'Backups', value: 14, valueLabel: '14 GB', tone: 'success' as const },
  ];

  it('is a picture with a sentence, not a progress bar', () => {
    render(<ProgressBreakdown segments={segments} max={100} aria-label="Storage: 84 of 100 GB" />);
    expect(screen.getByRole('img', { name: 'Storage: 84 of 100 GB' })).toBeInTheDocument();
    // there is no single value to announce, so it must not claim to be one
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('draws each part as its share of the whole', () => {
    const { container } = render(
      <ProgressBreakdown segments={segments} max={100} aria-label="Storage" />
    );
    const parts = container.querySelectorAll('[data-slot="progress-segment"]');
    expect(parts).toHaveLength(3);
    expect(parts[0]).toHaveStyle({ width: '48.000%' });
    expect(parts[1]).toHaveStyle({ width: '22.000%' });
  });

  it('treats the parts as the whole when no max is given', () => {
    const { container } = render(
      <ProgressBreakdown
        segments={[
          { label: 'Open', value: 25 },
          { label: 'Closed', value: 75 },
        ]}
        aria-label="Tickets"
      />
    );
    const parts = container.querySelectorAll('[data-slot="progress-segment"]');
    expect(parts[0]).toHaveStyle({ width: '25.000%' });
    expect(parts[1]).toHaveStyle({ width: '75.000%' });
  });

  it('builds the key from the parts, so the two cannot disagree', () => {
    render(<ProgressBreakdown segments={segments} max={100} aria-label="Storage" />);
    expect(screen.getByText('Tickets')).toBeInTheDocument();
    expect(screen.getByText('48 GB')).toBeInTheDocument();
    expect(screen.getByText('Attachments')).toBeInTheDocument();
  });

  it('names what is left over when asked, in the track colour', () => {
    const { container } = render(
      <ProgressBreakdown segments={segments} max={100} remainderLabel="Free" aria-label="Storage" />
    );
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('16')).toBeInTheDocument();
    const items = container.querySelectorAll('[data-slot="progress-legend-item"]');
    expect(items[items.length - 1]?.firstElementChild).toHaveClass('mdt-bg-muted');
  });

  it('writes the leftover the same way as the parts', () => {
    render(
      <ProgressBreakdown
        segments={[
          { label: 'Tickets', value: 48 },
          { label: 'Backups', value: 14 },
        ]}
        max={100}
        remainderLabel="Free"
        formatValue={(n) => `${String(n)} GB`}
        aria-label="Storage"
      />
    );
    // the same figure must not appear as "14 GB" beside a bare "38"
    expect(screen.getByText('14 GB')).toBeInTheDocument();
    expect(screen.getByText('38 GB')).toBeInTheDocument();
    expect(screen.queryByText('38')).not.toBeInTheDocument();
  });

  it('leaves the remainder out when the parts already fill the whole', () => {
    render(
      <ProgressBreakdown
        segments={[
          { label: 'Open', value: 50 },
          { label: 'Closed', value: 50 },
        ]}
        max={100}
        remainderLabel="Free"
        aria-label="Tickets"
      />
    );
    expect(screen.queryByText('Free')).not.toBeInTheDocument();
  });

  it('can be asked to leave the key out', () => {
    const { container } = render(
      <ProgressBreakdown segments={segments} max={100} showLegend={false} aria-label="Storage" />
    );
    expect(container.querySelector('[data-slot="progress-legend"]')).toBeNull();
  });

  it('survives an empty set rather than dividing by zero', () => {
    const { container } = render(<ProgressBreakdown segments={[]} aria-label="Nothing yet" />);
    expect(container.querySelectorAll('[data-slot="progress-segment"]')).toHaveLength(0);
    expect(screen.getByRole('img', { name: 'Nothing yet' })).toBeInTheDocument();
  });

  it('takes the same words above and below as Progress', () => {
    const { container } = render(
      <ProgressBreakdown
        segments={segments}
        max={100}
        above={{ left: 'Storage', right: '100 GB' }}
        below={{ right: '84 GB used' }}
        aria-label="Storage"
      />
    );
    expect(container.querySelector('[data-slot="progress-above-left"]')).toHaveTextContent(
      'Storage'
    );
    expect(container.querySelector('[data-slot="progress-below-right"]')).toHaveTextContent(
      '84 GB used'
    );
  });
});
