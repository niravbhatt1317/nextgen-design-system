import { render } from '@testing-library/react';
import { Separator } from './Separator';

describe('Separator', () => {
  it('renders correctly', () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies default horizontal orientation', () => {
    const { container } = render(<Separator />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-h-px');
    expect(element).toHaveClass('mdt-w-full');
  });

  it('applies vertical orientation', () => {
    const { container } = render(<Separator orientation="vertical" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-h-full');
    expect(element).toHaveClass('mdt-w-px');
  });

  it('applies default solid variant', () => {
    const { container } = render(<Separator />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-bg-border');
    expect(element).not.toHaveClass('mdt-border-dashed');
    expect(element).not.toHaveClass('mdt-border-dotted');
  });

  it('applies dashed variant for horizontal', () => {
    const { container } = render(<Separator variant="dashed" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-border-dashed');
    expect(element).toHaveClass('mdt-border-t');
    expect(element).toHaveClass('mdt-bg-transparent');
  });

  it('applies dashed variant for vertical', () => {
    const { container } = render(<Separator orientation="vertical" variant="dashed" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-border-dashed');
    expect(element).toHaveClass('mdt-border-l');
    expect(element).toHaveClass('mdt-bg-transparent');
  });

  it('applies dotted variant for horizontal', () => {
    const { container } = render(<Separator variant="dotted" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-border-dotted');
    expect(element).toHaveClass('mdt-border-t');
    expect(element).toHaveClass('mdt-bg-transparent');
  });

  it('applies dotted variant for vertical', () => {
    const { container } = render(<Separator orientation="vertical" variant="dotted" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-border-dotted');
    expect(element).toHaveClass('mdt-border-l');
    expect(element).toHaveClass('mdt-bg-transparent');
  });

  it('applies thin thickness for horizontal', () => {
    const { container } = render(<Separator thickness="thin" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-h-px');
  });

  it('applies medium thickness for horizontal', () => {
    const { container } = render(<Separator thickness="medium" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-h-0.5');
  });

  it('applies thick thickness for horizontal', () => {
    const { container } = render(<Separator thickness="thick" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-h-1');
  });

  it('applies thin thickness for vertical', () => {
    const { container } = render(<Separator orientation="vertical" thickness="thin" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-w-px');
  });

  it('applies medium thickness for vertical', () => {
    const { container } = render(<Separator orientation="vertical" thickness="medium" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-w-0.5');
  });

  it('applies thick thickness for vertical', () => {
    const { container } = render(<Separator orientation="vertical" thickness="thick" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-w-1');
  });

  it('applies horizontal spacing sm', () => {
    const { container } = render(<Separator spacing="sm" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-my-2');
  });

  it('applies horizontal spacing md', () => {
    const { container } = render(<Separator spacing="md" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-my-4');
  });

  it('applies horizontal spacing lg', () => {
    const { container } = render(<Separator spacing="lg" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-my-6');
  });

  it('applies horizontal spacing xl', () => {
    const { container } = render(<Separator spacing="xl" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-my-8');
  });

  it('applies vertical spacing sm', () => {
    const { container } = render(<Separator orientation="vertical" spacing="sm" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-mx-2');
  });

  it('applies vertical spacing md', () => {
    const { container } = render(<Separator orientation="vertical" spacing="md" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-mx-4');
  });

  it('applies vertical spacing lg', () => {
    const { container } = render(<Separator orientation="vertical" spacing="lg" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-mx-6');
  });

  it('applies vertical spacing xl', () => {
    const { container } = render(<Separator orientation="vertical" spacing="xl" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-mx-8');
  });

  it('applies no spacing by default', () => {
    const { container } = render(<Separator />);
    const element = container.firstChild as HTMLElement;
    expect(element).not.toHaveClass('mdt-my-2');
    expect(element).not.toHaveClass('mdt-my-4');
    expect(element).not.toHaveClass('mdt-mx-2');
    expect(element).not.toHaveClass('mdt-mx-4');
  });

  it('applies role="none" when decorative is true', () => {
    const { container } = render(<Separator decorative />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveAttribute('role', 'none');
    expect(element).not.toHaveAttribute('aria-orientation');
  });

  it('applies role="separator" when decorative is false', () => {
    const { container } = render(<Separator decorative={false} />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveAttribute('role', 'separator');
    expect(element).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('applies correct aria-orientation for vertical separator', () => {
    const { container } = render(<Separator orientation="vertical" decorative={false} />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('applies custom className', () => {
    const { container } = render(<Separator className="custom-class" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('custom-class');
  });

  it('forwards additional props', () => {
    const { container } = render(<Separator data-testid="test-separator" id="my-separator" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveAttribute('data-testid', 'test-separator');
    expect(element).toHaveAttribute('id', 'my-separator');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Separator ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('combines multiple variants correctly', () => {
    const { container } = render(
      <Separator
        orientation="vertical"
        variant="dashed"
        thickness="thick"
        spacing="lg"
        decorative={false}
      />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-w-1');
    expect(element).toHaveClass('mdt-mx-6');
    expect(element).toHaveClass('mdt-border-dashed');
    expect(element).toHaveClass('mdt-border-l');
    expect(element).toHaveAttribute('role', 'separator');
    expect(element).toHaveAttribute('aria-orientation', 'vertical');
  });

  // Label tests
  it('renders label when provided', () => {
    const { getByText } = render(<Separator label="OR" />);
    expect(getByText('OR')).toBeInTheDocument();
  });

  it('renders label with horizontal orientation', () => {
    const { container, getByText } = render(<Separator label="OR" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('mdt-flex');
    expect(wrapper).toHaveClass('mdt-items-center');
    expect(getByText('OR')).toBeInTheDocument();
  });

  it('renders label centered by default', () => {
    const { container } = render(<Separator label="OR" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('mdt-justify-center');
  });

  it('renders label positioned left', () => {
    const { container } = render(<Separator label="OR" labelPosition="left" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('mdt-justify-start');
  });

  it('renders label positioned right', () => {
    const { container } = render(<Separator label="OR" labelPosition="right" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('mdt-justify-end');
  });

  it('renders separator lines on both sides for center label', () => {
    const { container } = render(<Separator label="OR" labelPosition="center" />);
    const wrapper = container.firstChild as HTMLElement;
    const flexDivs = wrapper.querySelectorAll('.mdt-flex-1');
    expect(flexDivs).toHaveLength(2);
  });

  it('renders only right separator line for left label', () => {
    const { container } = render(<Separator label="OR" labelPosition="left" />);
    const wrapper = container.firstChild as HTMLElement;
    const flexDivs = wrapper.querySelectorAll('.mdt-flex-1');
    expect(flexDivs).toHaveLength(1);
  });

  it('renders only left separator line for right label', () => {
    const { container } = render(<Separator label="OR" labelPosition="right" />);
    const wrapper = container.firstChild as HTMLElement;
    const flexDivs = wrapper.querySelectorAll('.mdt-flex-1');
    expect(flexDivs).toHaveLength(1);
  });

  it('applies custom labelClassName', () => {
    const { getByText } = render(<Separator label="OR" labelClassName="custom-label" />);
    const label = getByText('OR');
    expect(label).toHaveClass('custom-label');
    expect(label).toHaveClass('mdt-text-muted-foreground');
  });

  it('renders label with vertical orientation', () => {
    const { container, getByText } = render(<Separator orientation="vertical" label="OR" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('mdt-flex');
    expect(wrapper).toHaveClass('mdt-h-full');
    expect(wrapper).toHaveClass('mdt-items-center');
    expect(getByText('OR')).toBeInTheDocument();
  });

  it('renders vertical label centered by default', () => {
    const { container } = render(<Separator orientation="vertical" label="OR" />);
    const wrapper = container.firstChild as HTMLElement;
    const flexDivs = wrapper.querySelectorAll('.mdt-flex-1');
    // Center position should have 2 separator lines (top and bottom)
    expect(flexDivs).toHaveLength(2);
  });

  it('renders vertical label aligned start', () => {
    const { container } = render(
      <Separator orientation="vertical" label="OR" labelPosition="left" />
    );
    const wrapper = container.firstChild as HTMLElement;
    const flexDivs = wrapper.querySelectorAll('.mdt-flex-1');
    // Left position should have only 1 separator line (bottom)
    expect(flexDivs).toHaveLength(1);
  });

  it('renders vertical label aligned end', () => {
    const { container } = render(
      <Separator orientation="vertical" label="OR" labelPosition="right" />
    );
    const wrapper = container.firstChild as HTMLElement;
    const flexDivs = wrapper.querySelectorAll('.mdt-flex-1');
    // Right position should have only 1 separator line (top)
    expect(flexDivs).toHaveLength(1);
  });

  it('applies role="none" when label is present', () => {
    const { container } = render(<Separator label="OR" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveAttribute('role', 'none');
  });

  it('renders label with dashed variant', () => {
    const { container, getByText } = render(<Separator label="OR" variant="dashed" />);
    expect(getByText('OR')).toBeInTheDocument();
    const separatorDivs = container.querySelectorAll('.mdt-border-dashed');
    expect(separatorDivs.length).toBeGreaterThan(0);
  });

  it('renders ReactNode as label', () => {
    const { getByText } = render(<Separator label={<strong>OR</strong>} />);
    const label = getByText('OR');
    expect(label.tagName).toBe('STRONG');
  });

  it('forwards ref when label is present', () => {
    const ref = { current: null };
    render(<Separator ref={ref} label="OR" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
