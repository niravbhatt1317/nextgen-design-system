import { render, screen } from '@testing-library/react';
import { Container } from './Container';

describe('Container', () => {
  it('renders container with children', () => {
    render(<Container>Test content</Container>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies default max-width variant', () => {
    const { container } = render(<Container>Content</Container>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-max-w-screen-lg');
  });

  it('applies custom max-width variant', () => {
    const { container } = render(<Container maxWidth="sm">Content</Container>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-max-w-screen-sm');
  });

  it('applies full max-width variant', () => {
    const { container } = render(<Container maxWidth="full">Content</Container>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-max-w-full');
  });

  it('applies default padding variant', () => {
    const { container } = render(<Container>Content</Container>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-px-6');
  });

  it('applies custom padding variant', () => {
    const { container } = render(<Container padding="lg">Content</Container>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-px-8');
  });

  it('applies no padding', () => {
    const { container } = render(<Container padding="none">Content</Container>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-px-0');
  });

  it('applies vertical padding', () => {
    const { container } = render(<Container paddingY="lg">Content</Container>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-py-8');
  });

  it('applies centered by default', () => {
    const { container } = render(<Container>Content</Container>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-mx-auto');
  });

  it('can disable centering', () => {
    const { container } = render(<Container centered={false}>Content</Container>);
    const element = container.firstChild as HTMLElement;
    expect(element).not.toHaveClass('mdt-mx-auto');
  });

  it('applies custom className', () => {
    const { container } = render(<Container className="custom-class">Content</Container>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('custom-class');
  });

  it('renders as different HTML element', () => {
    const { container } = render(<Container as="section">Content</Container>);
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });

  it('renders as article element', () => {
    const { container } = render(<Container as="article">Content</Container>);
    expect(container.firstChild?.nodeName).toBe('ARTICLE');
  });

  it('renders as main element', () => {
    const { container } = render(<Container as="main">Content</Container>);
    expect(container.firstChild?.nodeName).toBe('MAIN');
  });

  it('forwards additional props', () => {
    const { container } = render(
      <Container data-testid="test-container" id="my-container">
        Content
      </Container>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveAttribute('data-testid', 'test-container');
    expect(element).toHaveAttribute('id', 'my-container');
  });

  it('combines multiple variants correctly', () => {
    const { container } = render(
      <Container maxWidth="xl" padding="xl" paddingY="lg" centered={true}>
        Content
      </Container>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-max-w-screen-xl');
    expect(element).toHaveClass('mdt-px-12');
    expect(element).toHaveClass('mdt-py-8');
    expect(element).toHaveClass('mdt-mx-auto');
  });

  it('renders nested containers', () => {
    render(
      <Container maxWidth="2xl">
        <Container maxWidth="lg">
          <Container maxWidth="sm">Nested content</Container>
        </Container>
      </Container>
    );
    expect(screen.getByText('Nested content')).toBeInTheDocument();
  });

  it('applies all max-width sizes correctly', () => {
    const sizes = ['sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;
    const expectedClasses = [
      'mdt-max-w-screen-sm',
      'mdt-max-w-screen-md',
      'mdt-max-w-screen-lg',
      'mdt-max-w-screen-xl',
      'mdt-max-w-screen-2xl',
      'mdt-max-w-full',
    ];

    sizes.forEach((size, index) => {
      const { container } = render(<Container maxWidth={size}>Content</Container>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass(expectedClasses[index]);
    });
  });

  it('applies all padding sizes correctly', () => {
    const sizes = ['none', 'sm', 'md', 'lg', 'xl'] as const;
    const expectedClasses = ['mdt-px-0', 'mdt-px-4', 'mdt-px-6', 'mdt-px-8', 'mdt-px-12'];

    sizes.forEach((size, index) => {
      const { container } = render(<Container padding={size}>Content</Container>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass(expectedClasses[index]);
    });
  });

  it('applies all vertical padding sizes correctly', () => {
    const sizes = ['none', 'sm', 'md', 'lg', 'xl'] as const;
    const expectedClasses = ['mdt-py-0', 'mdt-py-4', 'mdt-py-6', 'mdt-py-8', 'mdt-py-12'];

    sizes.forEach((size, index) => {
      const { container } = render(<Container paddingY={size}>Content</Container>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass(expectedClasses[index]);
    });
  });
});
