import { render, screen } from '@testing-library/react';
import React from 'react';
import { ToolbarOld, ToolbarOldSection, ToolbarOldSpacer } from './ToolbarOld';

describe('ToolbarOld', () => {
  it('renders correctly with children', () => {
    render(
      <ToolbarOld>
        <div>Content</div>
      </ToolbarOld>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('has toolbar role', () => {
    render(<ToolbarOld>ToolbarOld</ToolbarOld>);
    expect(screen.getByRole('toolbar')).toBeInTheDocument();
  });

  it('applies default variant classes', () => {
    render(<ToolbarOld>Content</ToolbarOld>);
    const toolbar = screen.getByRole('toolbar');
    expect(toolbar).toHaveClass('mdt-flex', 'mdt-items-center', 'mdt-p-3');
  });

  it('applies compact variant classes', () => {
    render(<ToolbarOld variant="compact">Content</ToolbarOld>);
    const toolbar = screen.getByRole('toolbar');
    expect(toolbar).toHaveClass('mdt-p-2');
  });

  it('applies spacious variant classes', () => {
    render(<ToolbarOld variant="spacious">Content</ToolbarOld>);
    const toolbar = screen.getByRole('toolbar');
    expect(toolbar).toHaveClass('mdt-p-4');
  });

  it('accepts custom className', () => {
    render(<ToolbarOld className="custom-class">Content</ToolbarOld>);
    expect(screen.getByRole('toolbar')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<ToolbarOld ref={ref}>Content</ToolbarOld>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has border bottom', () => {
    render(<ToolbarOld>Content</ToolbarOld>);
    expect(screen.getByRole('toolbar')).toHaveClass('mdt-border-b');
  });
});

describe('ToolbarOldSection', () => {
  it('renders correctly with children', () => {
    render(<ToolbarOldSection>Section Content</ToolbarOldSection>);
    expect(screen.getByText('Section Content')).toBeInTheDocument();
  });

  it('applies flex classes', () => {
    const { container } = render(<ToolbarOldSection>Section</ToolbarOldSection>);
    const section = container.firstChild;
    expect(section).toHaveClass('mdt-flex', 'mdt-items-center', 'mdt-gap-2');
  });

  it('accepts custom className', () => {
    const { container } = render(
      <ToolbarOldSection className="custom-class">Section</ToolbarOldSection>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<ToolbarOldSection ref={ref}>Section</ToolbarOldSection>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders multiple children', () => {
    render(
      <ToolbarOldSection>
        <button>Button 1</button>
        <button>Button 2</button>
      </ToolbarOldSection>
    );
    expect(screen.getByText('Button 1')).toBeInTheDocument();
    expect(screen.getByText('Button 2')).toBeInTheDocument();
  });
});

describe('ToolbarOldSpacer', () => {
  it('renders correctly', () => {
    const { container } = render(<ToolbarOldSpacer />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies flex-1 class for spacing', () => {
    const { container } = render(<ToolbarOldSpacer />);
    expect(container.firstChild).toHaveClass('mdt-flex-1');
  });

  it('accepts custom className', () => {
    const { container } = render(<ToolbarOldSpacer className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class', 'mdt-flex-1');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<ToolbarOldSpacer ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('ToolbarOld integration', () => {
  it('renders toolbar with sections and spacer', () => {
    render(
      <ToolbarOld>
        <ToolbarOldSection>
          <span>Left</span>
        </ToolbarOldSection>
        <ToolbarOldSpacer />
        <ToolbarOldSection>
          <span>Right</span>
        </ToolbarOldSection>
      </ToolbarOld>
    );

    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });
});
