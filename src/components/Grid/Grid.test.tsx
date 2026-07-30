import { render } from '@testing-library/react';
import { Grid } from './Grid';

describe('Grid', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Grid>
        <div>Item 1</div>
      </Grid>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies base grid class', () => {
    const { container } = render(<Grid>Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-grid');
  });

  it('applies default gap', () => {
    const { container } = render(<Grid>Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-gap-4');
  });

  it('applies columns variant', () => {
    const { container } = render(<Grid columns={3}>Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-grid-cols-3');
  });

  it('applies all column variants', () => {
    const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
    columns.forEach((col) => {
      const { container } = render(<Grid columns={col}>Content</Grid>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass(`mdt-grid-cols-${col}`);
    });
  });

  it('applies auto columns', () => {
    const { container } = render(<Grid columns="auto">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-grid-cols-auto');
  });

  it('applies rows variant', () => {
    const { container } = render(<Grid rows={3}>Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-grid-rows-3');
  });

  it('applies all row variants', () => {
    const rows = [1, 2, 3, 4, 5, 6] as const;
    rows.forEach((row) => {
      const { container } = render(<Grid rows={row}>Content</Grid>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass(`mdt-grid-rows-${row}`);
    });
  });

  it('applies auto rows', () => {
    const { container } = render(<Grid rows="auto">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-grid-rows-auto');
  });

  it('applies gap variants', () => {
    const { container } = render(<Grid gap="lg">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-gap-6');
  });

  it('applies all gap sizes', () => {
    const gaps = {
      none: '0',
      xs: '1',
      sm: '2',
      md: '4',
      lg: '6',
      xl: '8',
      '2xl': '12',
      '3xl': '16',
    };
    Object.entries(gaps).forEach(([size, value]) => {
      const { container } = render(<Grid gap={size as any}>Content</Grid>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass(`mdt-gap-${value}`);
    });
  });

  it('applies gapX variant', () => {
    const { container } = render(<Grid gapX="lg">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-gap-x-6');
  });

  it('applies gapY variant', () => {
    const { container } = render(<Grid gapY="sm">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-gap-y-2');
  });

  it('applies different gapX and gapY together', () => {
    const { container } = render(
      <Grid gapX="lg" gapY="sm">
        Content
      </Grid>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-gap-x-6');
    expect(element).toHaveClass('mdt-gap-y-2');
  });

  it('applies justify items start', () => {
    const { container } = render(<Grid justify="start">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-justify-items-start');
  });

  it('applies justify items end', () => {
    const { container } = render(<Grid justify="end">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-justify-items-end');
  });

  it('applies justify items center', () => {
    const { container } = render(<Grid justify="center">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-justify-items-center');
  });

  it('applies justify items stretch', () => {
    const { container } = render(<Grid justify="stretch">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-justify-items-stretch');
  });

  it('applies align items start', () => {
    const { container } = render(<Grid align="start">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-items-start');
  });

  it('applies align items end', () => {
    const { container } = render(<Grid align="end">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-items-end');
  });

  it('applies align items center', () => {
    const { container } = render(<Grid align="center">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-items-center');
  });

  it('applies align items stretch', () => {
    const { container } = render(<Grid align="stretch">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-items-stretch');
  });

  it('applies justify content start', () => {
    const { container } = render(<Grid justifyContent="start">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-justify-start');
  });

  it('applies justify content between', () => {
    const { container } = render(<Grid justifyContent="between">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-justify-between');
  });

  it('applies justify content evenly', () => {
    const { container } = render(<Grid justifyContent="evenly">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-justify-evenly');
  });

  it('applies align content start', () => {
    const { container } = render(<Grid alignContent="start">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-content-start');
  });

  it('applies align content between', () => {
    const { container } = render(<Grid alignContent="between">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-content-between');
  });

  it('applies align content evenly', () => {
    const { container } = render(<Grid alignContent="evenly">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-content-evenly');
  });

  it('applies auto flow row', () => {
    const { container } = render(<Grid autoFlow="row">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-grid-flow-row');
  });

  it('applies auto flow col', () => {
    const { container } = render(<Grid autoFlow="col">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-grid-flow-col');
  });

  it('applies auto flow dense', () => {
    const { container } = render(<Grid autoFlow="dense">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-grid-flow-dense');
  });

  it('applies auto flow row-dense', () => {
    const { container } = render(<Grid autoFlow="rowDense">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-grid-flow-row-dense');
  });

  it('applies auto flow col-dense', () => {
    const { container } = render(<Grid autoFlow="colDense">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-grid-flow-col-dense');
  });

  it('applies custom className', () => {
    const { container } = render(<Grid className="custom-class">Content</Grid>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveClass('mdt-grid');
  });

  it('forwards additional props', () => {
    const { container } = render(
      <Grid data-testid="test-grid" id="my-grid">
        Content
      </Grid>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveAttribute('data-testid', 'test-grid');
    expect(element).toHaveAttribute('id', 'my-grid');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Grid ref={ref}>Content</Grid>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders as different element with as prop', () => {
    const { container } = render(
      <Grid as="section">
        <div>Item</div>
      </Grid>
    );
    const element = container.firstChild as HTMLElement;
    expect(element.tagName).toBe('SECTION');
  });

  it('renders as ul with list items', () => {
    const { container } = render(
      <Grid as="ul" columns={2}>
        <li>Item 1</li>
        <li>Item 2</li>
      </Grid>
    );
    const element = container.firstChild as HTMLElement;
    expect(element.tagName).toBe('UL');
  });

  it('combines multiple variants correctly', () => {
    const { container } = render(
      <Grid
        columns={3}
        rows={2}
        gap="lg"
        justify="center"
        align="start"
        justifyContent="between"
        alignContent="center"
        autoFlow="row"
      >
        Content
      </Grid>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('mdt-grid');
    expect(element).toHaveClass('mdt-grid-cols-3');
    expect(element).toHaveClass('mdt-grid-rows-2');
    expect(element).toHaveClass('mdt-gap-6');
    expect(element).toHaveClass('mdt-justify-items-center');
    expect(element).toHaveClass('mdt-items-start');
    expect(element).toHaveClass('mdt-justify-between');
    expect(element).toHaveClass('mdt-content-center');
    expect(element).toHaveClass('mdt-grid-flow-row');
  });

  it('renders multiple children correctly', () => {
    const { container } = render(
      <Grid columns={2}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Grid>
    );
    const element = container.firstChild as HTMLElement;
    expect(element.children).toHaveLength(3);
  });
});
