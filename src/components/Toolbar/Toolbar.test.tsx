import { render, screen } from '@testing-library/react';
import React from 'react';
import { Toolbar, ToolbarSection, ToolbarSpacer } from './Toolbar';

describe('Toolbar', () => {
  it('renders correctly with children', () => {
    render(
      <Toolbar>
        <div>Content</div>
      </Toolbar>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('has toolbar role', () => {
    render(<Toolbar>Toolbar</Toolbar>);
    expect(screen.getByRole('toolbar')).toBeInTheDocument();
  });

  it('applies default variant classes', () => {
    render(<Toolbar>Content</Toolbar>);
    const toolbar = screen.getByRole('toolbar');
    expect(toolbar).toHaveClass('mdt-flex', 'mdt-items-center', 'mdt-p-3');
  });

  it('applies compact variant classes', () => {
    render(<Toolbar variant="compact">Content</Toolbar>);
    const toolbar = screen.getByRole('toolbar');
    expect(toolbar).toHaveClass('mdt-p-2');
  });

  it('applies spacious variant classes', () => {
    render(<Toolbar variant="spacious">Content</Toolbar>);
    const toolbar = screen.getByRole('toolbar');
    expect(toolbar).toHaveClass('mdt-p-4');
  });

  it('accepts custom className', () => {
    render(<Toolbar className="custom-class">Content</Toolbar>);
    expect(screen.getByRole('toolbar')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Toolbar ref={ref}>Content</Toolbar>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has border bottom', () => {
    render(<Toolbar>Content</Toolbar>);
    expect(screen.getByRole('toolbar')).toHaveClass('mdt-border-b');
  });
});

describe('ToolbarSection', () => {
  it('renders correctly with children', () => {
    render(<ToolbarSection>Section Content</ToolbarSection>);
    expect(screen.getByText('Section Content')).toBeInTheDocument();
  });

  it('applies flex classes', () => {
    const { container } = render(<ToolbarSection>Section</ToolbarSection>);
    const section = container.firstChild;
    expect(section).toHaveClass('mdt-flex', 'mdt-items-center', 'mdt-gap-2');
  });

  it('accepts custom className', () => {
    const { container } = render(<ToolbarSection className="custom-class">Section</ToolbarSection>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<ToolbarSection ref={ref}>Section</ToolbarSection>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders multiple children', () => {
    render(
      <ToolbarSection>
        <button>Button 1</button>
        <button>Button 2</button>
      </ToolbarSection>
    );
    expect(screen.getByText('Button 1')).toBeInTheDocument();
    expect(screen.getByText('Button 2')).toBeInTheDocument();
  });
});

describe('ToolbarSpacer', () => {
  it('renders correctly', () => {
    const { container } = render(<ToolbarSpacer />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies flex-1 class for spacing', () => {
    const { container } = render(<ToolbarSpacer />);
    expect(container.firstChild).toHaveClass('mdt-flex-1');
  });

  it('accepts custom className', () => {
    const { container } = render(<ToolbarSpacer className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class', 'mdt-flex-1');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<ToolbarSpacer ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('Toolbar integration', () => {
  it('renders toolbar with sections and spacer', () => {
    render(
      <Toolbar>
        <ToolbarSection>
          <span>Left</span>
        </ToolbarSection>
        <ToolbarSpacer />
        <ToolbarSection>
          <span>Right</span>
        </ToolbarSection>
      </Toolbar>
    );

    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });
});
