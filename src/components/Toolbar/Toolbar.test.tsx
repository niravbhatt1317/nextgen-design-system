import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Toolbar, ToolbarSection, ToolbarSpacer } from './Toolbar';

describe('Toolbar', () => {
  it('is a toolbar landmark with a spoken name', () => {
    render(<Toolbar>controls</Toolbar>);
    expect(screen.getByRole('toolbar', { name: 'Toolbar' })).toBeInTheDocument();
  });

  it('takes a spoken name of its own', () => {
    render(<Toolbar label="User controls">controls</Toolbar>);
    expect(screen.getByRole('toolbar', { name: 'User controls' })).toBeInTheDocument();
  });

  it('is the console strip: 60px tall, 24px inset, 10px between controls, on the page ground', () => {
    render(<Toolbar>controls</Toolbar>);
    expect(screen.getByRole('toolbar')).toHaveClass(
      'mdt-h-[60px]',
      'mdt-px-6',
      'mdt-gap-2.5',
      'mdt-bg-background'
    );
  });

  it('has no hairline unless asked', () => {
    const { rerender } = render(<Toolbar>controls</Toolbar>);
    expect(screen.getByRole('toolbar')).not.toHaveClass('mdt-border-b');
    rerender(<Toolbar border>controls</Toolbar>);
    expect(screen.getByRole('toolbar')).toHaveClass('mdt-border-b', 'mdt-border-border');
  });

  it('merges a custom className and forwards the ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Toolbar ref={ref} className="mine">
        controls
      </Toolbar>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('mine');
  });

  it('passes other attributes through', () => {
    render(<Toolbar data-testid="strip">controls</Toolbar>);
    expect(screen.getByTestId('strip')).toBeInTheDocument();
  });
});

describe('ToolbarSection', () => {
  it('keeps 8px between its controls and forwards the ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <ToolbarSection ref={ref} className="mine" data-testid="section">
        <span>Sort</span>
        <span>Columns</span>
      </ToolbarSection>
    );
    expect(screen.getByTestId('section')).toHaveClass(
      'mdt-flex',
      'mdt-items-center',
      'mdt-gap-2',
      'mine'
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(screen.getByText('Sort')).toBeInTheDocument();
    expect(screen.getByText('Columns')).toBeInTheDocument();
  });
});

describe('ToolbarSpacer', () => {
  it('fills the middle and is not read out', () => {
    const ref = createRef<HTMLDivElement>();
    render(<ToolbarSpacer ref={ref} data-testid="spacer" className="mine" />);
    const spacer = screen.getByTestId('spacer');
    expect(spacer).toHaveClass('mdt-flex-1', 'mine');
    expect(spacer).toHaveAttribute('aria-hidden', 'true');
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('the strip assembled', () => {
  it('holds a left run, a spacer and a right-hand section', () => {
    render(
      <Toolbar label="User controls">
        <span>Search</span>
        <span>Filters</span>
        <ToolbarSpacer />
        <ToolbarSection>
          <span>Sort</span>
          <span>Columns</span>
        </ToolbarSection>
      </Toolbar>
    );
    const strip = screen.getByRole('toolbar', { name: 'User controls' });
    expect(strip).toContainElement(screen.getByText('Search'));
    expect(strip).toContainElement(screen.getByText('Columns'));
  });
});
