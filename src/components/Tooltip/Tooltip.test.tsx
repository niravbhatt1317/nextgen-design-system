import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import type { Ref } from 'react';
import { describe, it, expect } from 'vitest';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';
import type { TooltipContentProps, TooltipContentRef } from './Tooltip.types';

function Bubble(
  props: TooltipContentProps & {
    delay?: number;
    instant?: boolean;
    open?: boolean;
    contentRef?: Ref<TooltipContentRef>;
  }
) {
  const { delay = 0, instant, open, contentRef, ...content } = props;
  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip
        {...(instant !== undefined ? { instant } : {})}
        {...(open !== undefined ? { open } : {})}
      >
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent ref={contentRef} {...content} />
      </Tooltip>
    </TooltipProvider>
  );
}

/** The visible bubble; Radix keeps a second, hidden copy for screen readers. */
const bubble = () => document.querySelector<HTMLElement>('.tt');

async function open() {
  await userEvent.hover(screen.getByText('Hover me'));
  await waitFor(() => {
    expect(bubble()).not.toBeNull();
  });
  return bubble() as HTMLElement;
}

describe('Tooltip', () => {
  it('renders the trigger and no bubble until hovered', () => {
    render(<Bubble>Tooltip content</Bubble>);
    expect(screen.getByText('Hover me')).toBeInTheDocument();
    expect(bubble()).toBeNull();
  });

  it('opens on hover with the console fill, the library padding and a 280px cap, centred', async () => {
    render(<Bubble>Tooltip content</Bubble>);
    const el = await open();
    expect(el).toHaveClass(
      'mdt-bg-neutral-130',
      'dark:mdt-bg-neutral-10',
      'mdt-text-white',
      'mdt-px-3',
      'mdt-py-1.5',
      'mdt-text-center'
    );
    expect(el.style.maxWidth).toBe('280px');
    expect(el.querySelector('svg')).toHaveClass('mdt-fill-neutral-130');
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip content');
  });

  it('takes a wider cap and can drop the arrow', async () => {
    render(
      <Bubble maxWidth={360} showArrow={false}>
        Wide
      </Bubble>
    );
    const el = await open();
    expect(el.style.maxWidth).toBe('360px');
    expect(el.querySelector('svg')).toBeNull();
  });

  it('shows a quieter hint line and reads from the left', async () => {
    render(<Bubble hint="Click to copy the mail">sarah@company.com</Bubble>);
    const el = await open();
    expect(el).toHaveClass('mdt-text-left');
    const hint = el.querySelector('.tt-hint');
    expect(hint).toHaveTextContent('Click to copy the mail');
    expect(hint).toHaveClass('mdt-text-[10px]', 'mdt-opacity-[0.62]');
  });

  it('lists items as bullet lines in a list that scrolls past seven', async () => {
    const items = [
      'Platform',
      'Security',
      'Finance',
      'Design',
      'Web',
      'Support',
      'Data',
      'Sales',
      'Ops',
    ];
    render(<Bubble items={items} />);
    const el = await open();
    const list = el.querySelector('.tt-list') as HTMLElement;
    expect(list).toHaveClass('mdt-max-h-[133px]', 'mdt-overflow-y-auto');
    expect(list.querySelectorAll('li')).toHaveLength(9);
    expect(list.querySelector('li')).toHaveTextContent('Platform');
  });

  it('waits for the provider delay by default and opens at once when instant', async () => {
    const { unmount } = render(<Bubble delay={5000}>Slow</Bubble>);
    await userEvent.hover(screen.getByText('Hover me'));
    await new Promise((r) => setTimeout(r, 250));
    expect(bubble()).toBeNull();
    unmount();
    render(
      <Bubble delay={5000} instant>
        Fast
      </Bubble>
    );
    await open();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Fast');
  });

  it('opens on keyboard focus', async () => {
    render(<Bubble>Focused</Bubble>);
    await userEvent.tab();
    await waitFor(() => {
      expect(bubble()).not.toBeNull();
    });
  });

  it('respects a controlled open state and forwards the ref', async () => {
    const ref = createRef<TooltipContentRef>();
    render(
      <Bubble open contentRef={ref}>
        Held open
      </Bubble>
    );
    await waitFor(() => {
      expect(bubble()).not.toBeNull();
    });
    expect(ref.current).toBe(bubble());
  });
});
