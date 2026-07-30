import { render, screen } from '@testing-library/react';
import { Stack } from './Stack';

describe('Stack', () => {
  it('renders stack with children', () => {
    render(
      <Stack>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('applies default vertical direction', () => {
    const { container } = render(
      <Stack>
        <div>Content</div>
      </Stack>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-flex-col');
  });

  it('applies horizontal direction', () => {
    const { container } = render(
      <Stack direction="horizontal">
        <div>Content</div>
      </Stack>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-flex-row');
  });

  it('applies default gap', () => {
    const { container } = render(
      <Stack>
        <div>Content</div>
      </Stack>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-gap-4');
  });

  it('applies custom gap sizes', () => {
    const gaps = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;
    const expectedClasses = [
      'mdt-gap-0',
      'mdt-gap-1',
      'mdt-gap-2',
      'mdt-gap-4',
      'mdt-gap-6',
      'mdt-gap-8',
      'mdt-gap-12',
      'mdt-gap-16',
    ];

    gaps.forEach((gap, index) => {
      const { container } = render(
        <Stack gap={gap}>
          <div>Content</div>
        </Stack>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass(expectedClasses[index]);
    });
  });

  it('applies justify alignment', () => {
    const { container } = render(
      <Stack justify="center">
        <div>Content</div>
      </Stack>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-justify-center');
  });

  it('applies all justify variants', () => {
    const justifyOptions = ['start', 'center', 'end', 'between', 'around', 'evenly'] as const;
    const expectedClasses = [
      'mdt-justify-start',
      'mdt-justify-center',
      'mdt-justify-end',
      'mdt-justify-between',
      'mdt-justify-around',
      'mdt-justify-evenly',
    ];

    justifyOptions.forEach((justify, index) => {
      const { container } = render(
        <Stack justify={justify}>
          <div>Content</div>
        </Stack>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass(expectedClasses[index]);
    });
  });

  it('applies align alignment', () => {
    const { container } = render(
      <Stack align="center">
        <div>Content</div>
      </Stack>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-items-center');
  });

  it('applies all align variants', () => {
    const alignOptions = ['start', 'center', 'end', 'stretch', 'baseline'] as const;
    const expectedClasses = [
      'mdt-items-start',
      'mdt-items-center',
      'mdt-items-end',
      'mdt-items-stretch',
      'mdt-items-baseline',
    ];

    alignOptions.forEach((align, index) => {
      const { container } = render(
        <Stack align={align}>
          <div>Content</div>
        </Stack>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass(expectedClasses[index]);
    });
  });

  it('applies wrap when enabled', () => {
    const { container } = render(
      <Stack wrap>
        <div>Content</div>
      </Stack>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-flex-wrap');
  });

  it('applies nowrap by default', () => {
    const { container } = render(
      <Stack>
        <div>Content</div>
      </Stack>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-flex-nowrap');
  });

  it('applies fullWidth when enabled', () => {
    const { container } = render(
      <Stack fullWidth>
        <div>Content</div>
      </Stack>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-w-full');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Stack className="custom-class">
        <div>Content</div>
      </Stack>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('custom-class');
  });

  it('renders as different HTML element', () => {
    const { container } = render(
      <Stack as="section">
        <div>Content</div>
      </Stack>
    );
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });

  it('renders dividers between children', () => {
    const { container } = render(
      <Stack divider>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Stack>
    );

    const separators = container.querySelectorAll('hr');
    expect(separators).toHaveLength(2); // 3 items = 2 dividers
  });

  it('renders vertical dividers for horizontal stack', () => {
    const { container } = render(
      <Stack direction="horizontal" divider>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );

    const separator = container.querySelector('hr');
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    expect(separator).toHaveClass('mdt-w-px');
  });

  it('renders horizontal dividers for vertical stack', () => {
    const { container } = render(
      <Stack direction="vertical" divider>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );

    const separator = container.querySelector('hr');
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
    expect(separator).toHaveClass('mdt-h-px');
  });

  it('does not render dividers with single child', () => {
    const { container } = render(
      <Stack divider>
        <div>Single item</div>
      </Stack>
    );

    const separators = container.querySelectorAll('hr');
    expect(separators).toHaveLength(0);
  });

  it('applies custom divider className', () => {
    const { container } = render(
      <Stack divider dividerClassName="custom-divider">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );

    const separator = container.querySelector('hr');
    expect(separator).toHaveClass('custom-divider');
  });

  it('handles null and undefined children with dividers', () => {
    const { container } = render(
      <Stack divider>
        <div>Item 1</div>
        {null}
        <div>Item 2</div>
        {undefined}
        <div>Item 3</div>
      </Stack>
    );

    // Should only render dividers between valid children
    const separators = container.querySelectorAll('hr');
    expect(separators).toHaveLength(2);
  });

  it('forwards additional props', () => {
    const { container } = render(
      <Stack data-testid="test-stack" id="my-stack">
        <div>Content</div>
      </Stack>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveAttribute('data-testid', 'test-stack');
    expect(element).toHaveAttribute('id', 'my-stack');
  });

  it('combines multiple variants correctly', () => {
    const { container } = render(
      <Stack direction="horizontal" gap="lg" justify="between" align="center" wrap fullWidth>
        <div>Content</div>
      </Stack>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-flex-row');
    expect(element).toHaveClass('mdt-gap-6');
    expect(element).toHaveClass('mdt-justify-between');
    expect(element).toHaveClass('mdt-items-center');
    expect(element).toHaveClass('mdt-flex-wrap');
    expect(element).toHaveClass('mdt-w-full');
  });

  it('renders nested stacks', () => {
    render(
      <Stack>
        <Stack direction="horizontal">
          <div>Nested item</div>
        </Stack>
      </Stack>
    );
    expect(screen.getByText('Nested item')).toBeInTheDocument();
  });

  it('handles array children correctly', () => {
    const items = ['Item 1', 'Item 2', 'Item 3'];
    render(
      <Stack>
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </Stack>
    );

    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
