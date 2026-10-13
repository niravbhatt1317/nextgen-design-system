import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { OverflowCount } from './OverflowCount';

const COUNTER = 'overflow-count';

/** The visible bubble; Radix keeps a second, hidden copy for screen readers. */
const bubble = () => document.querySelector<HTMLElement>('.tt');

async function open() {
  await userEvent.hover(screen.getByTestId(COUNTER));
  await waitFor(() => {
    expect(bubble()).not.toBeNull();
  });
  return bubble() as HTMLElement;
}

describe('OverflowCount', () => {
  describe('rendering', () => {
    it('shows +N for the hidden items', () => {
      render(<OverflowCount items={['Network', 'Security']} />);
      expect(screen.getByTestId(COUNTER)).toHaveTextContent('+2');
    });

    it('prefers an explicit count over the number of items', () => {
      render(<OverflowCount count={5} items={['Network', 'Security']} />);
      expect(screen.getByTestId(COUNTER)).toHaveTextContent('+5');
    });

    it('shows a count with no items', () => {
      render(<OverflowCount count={3} />);
      expect(screen.getByTestId(COUNTER)).toHaveTextContent('+3');
    });

    it('renders nothing at zero', () => {
      const { container } = render(<OverflowCount items={[]} />);
      expect(container).toBeEmptyDOMElement();
    });

    it('renders nothing for a zero or negative count', () => {
      const { container, rerender } = render(<OverflowCount count={0} items={['A']} />);
      expect(container).toBeEmptyDOMElement();
      rerender(<OverflowCount count={-1} />);
      expect(container).toBeEmptyDOMElement();
    });

    it('drops empty strings from the list', () => {
      render(<OverflowCount items={['Network', '', 'Security']} />);
      expect(screen.getByTestId(COUNTER)).toHaveTextContent('+2');
    });

    it('is quiet muted 12px text with no pill, the same as the TagList +N', () => {
      render(<OverflowCount items={['Network']} />);
      const el = screen.getByTestId(COUNTER);
      expect(el).toHaveClass('mdt-text-xs', 'mdt-text-muted-foreground', 'mdt-bg-transparent');
      expect(el).toHaveClass('mdt-border-0', 'mdt-p-0');
    });

    it('merges a custom className and forwards a ref', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<OverflowCount ref={ref} items={['Network']} className="mdt-ml-1" />);
      expect(screen.getByTestId(COUNTER)).toHaveClass('mdt-ml-1');
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('accessibility', () => {
    it('reads the hidden items out', () => {
      render(<OverflowCount items={['Network', 'Security']} />);
      expect(screen.getByLabelText('2 more: Network, Security')).toBeInTheDocument();
    });

    it('reads the label out when there is no list', () => {
      render(<OverflowCount count={4} label="More members" />);
      expect(screen.getByLabelText('More members: 4')).toBeInTheDocument();
    });

    it('is a button that does not submit a form', () => {
      render(<OverflowCount items={['Network']} />);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });
  });

  describe('tooltip', () => {
    it('lists the hidden items on hover', async () => {
      render(<OverflowCount items={['Network', 'Security', 'Billing']} />);
      const tt = await open();
      const lis = (tt.querySelector('.tt-list') as HTMLElement).querySelectorAll('li');
      expect(lis).toHaveLength(3);
      expect(lis[0]).toHaveTextContent('Network');
    });

    it('says what it counts when the items are not known', async () => {
      render(<OverflowCount count={4} label="More members" />);
      const tt = await open();
      expect(tt).toHaveTextContent('More members');
      expect(tt.querySelector('li')).toBeNull();
    });

    it('falls back to "More assigned"', async () => {
      render(<OverflowCount count={2} />);
      const tt = await open();
      expect(tt).toHaveTextContent('More assigned');
    });

    it('opens on keyboard focus', async () => {
      render(<OverflowCount items={['Network']} />);
      await userEvent.tab();
      await waitFor(() => {
        expect(bubble()).not.toBeNull();
      });
    });
  });
});
