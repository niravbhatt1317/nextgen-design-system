import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { TagPill } from './TagPill';

describe('TagPill', () => {
  it('renders correctly with default props', () => {
    render(<TagPill>Tag</TagPill>);
    expect(screen.getByText('Tag')).toBeInTheDocument();
  });

  it('applies default variant classes', () => {
    render(<TagPill variant="default">Default</TagPill>);
    const element = screen.getByText('Default').parentElement as HTMLElement;
    expect(element).toHaveClass('mdt-bg-muted/5', 'mdt-text-muted-foreground', 'mdt-border-border');
  });

  it('applies blue variant classes', () => {
    render(<TagPill variant="blue">Blue</TagPill>);
    const element = screen.getByText('Blue').parentElement as HTMLElement;
    expect(element).toHaveClass(
      'mdt-bg-blue-400/10',
      'mdt-text-blue-700',
      'mdt-border-blue-300/50'
    );
  });

  it('applies green variant classes', () => {
    render(<TagPill variant="green">Green</TagPill>);
    const element = screen.getByText('Green').parentElement as HTMLElement;
    expect(element).toHaveClass(
      'mdt-bg-green-400/10',
      'mdt-text-green-700',
      'mdt-border-green-300/50'
    );
  });

  it('applies yellow variant classes', () => {
    render(<TagPill variant="yellow">Yellow</TagPill>);
    const element = screen.getByText('Yellow').parentElement as HTMLElement;
    expect(element).toHaveClass(
      'mdt-bg-yellow-400/10',
      'mdt-text-yellow-700',
      'mdt-border-yellow-300/50'
    );
  });

  it('applies red variant classes', () => {
    render(<TagPill variant="red">Red</TagPill>);
    const element = screen.getByText('Red').parentElement as HTMLElement;
    expect(element).toHaveClass('mdt-bg-red-400/10', 'mdt-text-red-700', 'mdt-border-red-300/50');
  });

  it('applies size variants correctly', () => {
    const { rerender } = render(<TagPill size="sm">Small</TagPill>);
    const smallElement = screen.getByText('Small').parentElement as HTMLElement;
    expect(smallElement).toHaveClass('mdt-px-1.5', 'mdt-py-0.5');

    rerender(<TagPill size="lg">Large</TagPill>);
    const largeElement = screen.getByText('Large').parentElement as HTMLElement;
    expect(largeElement).toHaveClass('mdt-px-2.5', 'mdt-py-1');
  });

  it('accepts custom className', () => {
    render(<TagPill className="custom-class">Test</TagPill>);
    const element = screen.getByText('Test').parentElement as HTMLElement;
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<TagPill ref={ref}>Test</TagPill>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('renders with custom children', () => {
    render(
      <TagPill>
        <span>Custom Content</span>
      </TagPill>
    );
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  it('applies all color variants correctly', () => {
    const variants = [
      { variant: 'default' as const, text: 'Default' },
      { variant: 'blue' as const, text: 'Blue' },
      { variant: 'green' as const, text: 'Green' },
      { variant: 'yellow' as const, text: 'Yellow' },
      { variant: 'red' as const, text: 'Red' },
      { variant: 'purple' as const, text: 'Purple' },
      { variant: 'orange' as const, text: 'Orange' },
      { variant: 'pink' as const, text: 'Pink' },
      { variant: 'teal' as const, text: 'Teal' },
      { variant: 'cyan' as const, text: 'Cyan' },
    ];

    render(
      <div>
        {variants.map((v) => (
          <TagPill key={v.variant} variant={v.variant}>
            {v.text}
          </TagPill>
        ))}
      </div>
    );

    variants.forEach((v) => {
      expect(screen.getByText(v.text)).toBeInTheDocument();
    });
  });

  it('has border by default', () => {
    render(<TagPill>Bordered</TagPill>);
    const element = screen.getByText('Bordered').parentElement as HTMLElement;
    expect(element).toHaveClass('mdt-border');
  });

  it('renders with icon', () => {
    const icon = <svg data-testid="test-icon" />;
    render(<TagPill icon={icon}>With Icon</TagPill>);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  it('renders with close button when onClose provided', () => {
    const onClose = vi.fn();
    render(<TagPill onClose={onClose}>Closable</TagPill>);
    const closeButton = screen.getByLabelText('Remove tag');
    expect(closeButton).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<TagPill onClose={onClose}>Closable</TagPill>);
    const closeButton = screen.getByLabelText('Remove tag');
    await user.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
