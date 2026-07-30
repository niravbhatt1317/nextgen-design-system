import { render, screen } from '@testing-library/react';
import { Label } from './Label';

const TEXT = 'Connection';

describe('Label', () => {
  it('renders its text', () => {
    render(<Label>{TEXT}</Label>);
    expect(screen.getByText(TEXT)).toBeInTheDocument();
  });

  it('is uppercase', () => {
    render(<Label>{TEXT}</Label>);
    expect(screen.getByText(TEXT)).toHaveClass('mdt-uppercase');
  });

  it('uses one letter-spacing, settling the three the source systems disagreed on', () => {
    render(<Label>{TEXT}</Label>);
    expect(screen.getByText(TEXT)).toHaveClass('mdt-tracking-wider');
  });

  it('is small by default', () => {
    render(<Label>{TEXT}</Label>);
    expect(screen.getByText(TEXT)).toHaveClass('mdt-text-xs');
  });

  it('has a medium size', () => {
    render(<Label size="md">{TEXT}</Label>);
    expect(screen.getByText(TEXT)).toHaveClass('mdt-text-sm');
  });

  it('renders a span by default', () => {
    render(<Label>{TEXT}</Label>);
    expect(screen.getByText(TEXT).tagName).toBe('SPAN');
  });

  it.each(['div', 'h3', 'h4', 'legend'] as const)('can render as %s', (tag) => {
    render(<Label as={tag}>{TEXT}</Label>);
    expect(screen.getByText(TEXT).tagName).toBe(tag.toUpperCase());
  });

  it('keeps heading semantics when rendered as a heading', () => {
    render(<Label as="h3">{TEXT}</Label>);
    expect(screen.getByRole('heading', { name: TEXT, level: 3 })).toBeInTheDocument();
  });

  it('merges a custom className', () => {
    render(<Label className="mdt-mb-2">{TEXT}</Label>);
    expect(screen.getByText(TEXT)).toHaveClass('mdt-mb-2');
  });

  it('passes through native attributes', () => {
    render(<Label id="conn">{TEXT}</Label>);
    expect(screen.getByText(TEXT)).toHaveAttribute('id', 'conn');
  });
});
