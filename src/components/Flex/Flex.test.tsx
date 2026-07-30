import { render } from '@testing-library/react';
import { Flex } from './Flex';

describe('Flex', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Flex>
        <div>Item 1</div>
      </Flex>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies base flex class', () => {
    const { container } = render(<Flex>Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-flex');
  });

  it('applies default direction row', () => {
    const { container } = render(<Flex>Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-flex-row');
  });

  it('applies default wrap nowrap', () => {
    const { container } = render(<Flex>Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-flex-nowrap');
  });

  it('applies direction col', () => {
    const { container } = render(<Flex direction="col">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-flex-col');
  });

  it('applies direction row-reverse', () => {
    const { container } = render(<Flex direction="row-reverse">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-flex-row-reverse');
  });

  it('applies direction col-reverse', () => {
    const { container } = render(<Flex direction="col-reverse">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-flex-col-reverse');
  });

  it('applies wrap', () => {
    const { container } = render(<Flex wrap="wrap">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-flex-wrap');
  });

  it('applies wrap-reverse', () => {
    const { container } = render(<Flex wrap="wrap-reverse">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-flex-wrap-reverse');
  });

  it('applies justify start', () => {
    const { container } = render(<Flex justify="start">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-justify-start');
  });

  it('applies justify end', () => {
    const { container } = render(<Flex justify="end">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-justify-end');
  });

  it('applies justify center', () => {
    const { container } = render(<Flex justify="center">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-justify-center');
  });

  it('applies justify between', () => {
    const { container } = render(<Flex justify="between">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-justify-between');
  });

  it('applies justify around', () => {
    const { container } = render(<Flex justify="around">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-justify-around');
  });

  it('applies justify evenly', () => {
    const { container } = render(<Flex justify="evenly">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-justify-evenly');
  });

  it('applies align start', () => {
    const { container } = render(<Flex align="start">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-items-start');
  });

  it('applies align end', () => {
    const { container } = render(<Flex align="end">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-items-end');
  });

  it('applies align center', () => {
    const { container } = render(<Flex align="center">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-items-center');
  });

  it('applies align baseline', () => {
    const { container } = render(<Flex align="baseline">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-items-baseline');
  });

  it('applies align stretch', () => {
    const { container } = render(<Flex align="stretch">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-items-stretch');
  });

  it('applies gap none', () => {
    const { container } = render(<Flex gap="none">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-gap-0');
  });

  it('applies gap xs', () => {
    const { container } = render(<Flex gap="xs">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-gap-1');
  });

  it('applies gap sm', () => {
    const { container } = render(<Flex gap="sm">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-gap-2');
  });

  it('applies gap md', () => {
    const { container } = render(<Flex gap="md">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-gap-4');
  });

  it('applies gap lg', () => {
    const { container } = render(<Flex gap="lg">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-gap-6');
  });

  it('applies gap xl', () => {
    const { container } = render(<Flex gap="xl">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-gap-8');
  });

  it('applies gap 2xl', () => {
    const { container } = render(<Flex gap="2xl">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-gap-12');
  });

  it('applies gap 3xl', () => {
    const { container } = render(<Flex gap="3xl">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-gap-16');
  });

  it('applies gapX md', () => {
    const { container } = render(<Flex gapX="md">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-gap-x-4');
  });

  it('applies gapY lg', () => {
    const { container } = render(<Flex gapY="lg">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-gap-y-6');
  });

  it('applies different gapX and gapY together', () => {
    const { container } = render(
      <Flex gapX="sm" gapY="xl">
        Content
      </Flex>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-gap-x-2');
    expect(element).toHaveClass('mdt-gap-y-8');
  });

  it('applies custom className', () => {
    const { container } = render(<Flex className="custom-class">Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveClass('mdt-flex');
  });

  it('forwards additional props', () => {
    const { container } = render(
      <Flex data-testid="test-flex" id="my-flex">
        Content
      </Flex>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveAttribute('data-testid', 'test-flex');
    expect(element).toHaveAttribute('id', 'my-flex');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Flex ref={ref}>Content</Flex>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders as different element with as prop', () => {
    const { container } = render(
      <Flex as="section">
        <div>Item</div>
      </Flex>
    );
    const element = container.firstChild as HTMLElement;
    expect(element.tagName).toBe('SECTION');
  });

  it('renders as nav element', () => {
    const { container } = render(
      <Flex as="nav" gap="md">
        <a href="/">Home</a>
        <a href="/about">About</a>
      </Flex>
    );
    const element = container.firstChild as HTMLElement;
    expect(element.tagName).toBe('NAV');
  });

  it('combines multiple variants correctly', () => {
    const { container } = render(
      <Flex direction="col" wrap="wrap" justify="center" align="start" gap="lg">
        Content
      </Flex>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-flex');
    expect(element).toHaveClass('mdt-flex-col');
    expect(element).toHaveClass('mdt-flex-wrap');
    expect(element).toHaveClass('mdt-justify-center');
    expect(element).toHaveClass('mdt-items-start');
    expect(element).toHaveClass('mdt-gap-6');
  });

  it('renders multiple children correctly', () => {
    const { container } = render(
      <Flex>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Flex>
    );
    const element = container.firstChild as HTMLElement;
    expect(element.children).toHaveLength(3);
  });

  it('handles no gap by default', () => {
    const { container } = render(<Flex>Content</Flex>);
    const element = container.firstChild as HTMLElement;
    expect(element).not.toHaveClass('mdt-gap-0');
    expect(element).not.toHaveClass('mdt-gap-4');
  });
});
