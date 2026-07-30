import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { vi } from 'vitest';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarSection,
  SidebarLabel,
  SidebarItem,
} from './Sidebar';

describe('Sidebar', () => {
  it('renders correctly with children', () => {
    render(
      <Sidebar>
        <div>Sidebar content</div>
      </Sidebar>
    );
    expect(screen.getByText('Sidebar content')).toBeInTheDocument();
  });

  it('applies default variant classes', () => {
    const { container } = render(<Sidebar>Content</Sidebar>);
    const sidebar = container.firstChild;
    expect(sidebar).toHaveClass('mdt-flex', 'mdt-flex-col', 'mdt-w-60');
  });

  it('applies compact variant classes', () => {
    const { container } = render(<Sidebar variant="compact">Content</Sidebar>);
    const sidebar = container.firstChild;
    expect(sidebar).toHaveClass('mdt-w-16');
  });

  it('applies wide variant classes', () => {
    const { container } = render(<Sidebar variant="wide">Content</Sidebar>);
    const sidebar = container.firstChild;
    expect(sidebar).toHaveClass('mdt-w-80');
  });

  it('accepts custom className', () => {
    const { container } = render(<Sidebar className="custom-class">Content</Sidebar>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Sidebar ref={ref}>Content</Sidebar>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has border right', () => {
    const { container } = render(<Sidebar>Content</Sidebar>);
    expect(container.firstChild).toHaveClass('mdt-border-r');
  });
});

describe('SidebarHeader', () => {
  it('renders correctly with children', () => {
    render(<SidebarHeader>Header content</SidebarHeader>);
    expect(screen.getByText('Header content')).toBeInTheDocument();
  });

  it('applies header classes', () => {
    const { container } = render(<SidebarHeader>Header</SidebarHeader>);
    const header = container.firstChild;
    expect(header).toHaveClass(
      'mdt-flex',
      'mdt-items-center',
      'mdt-gap-2',
      'mdt-px-4',
      'mdt-py-3',
      'mdt-border-b'
    );
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<SidebarHeader ref={ref}>Header</SidebarHeader>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('SidebarContent', () => {
  it('renders correctly with children', () => {
    render(<SidebarContent>Content</SidebarContent>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies content classes', () => {
    const { container } = render(<SidebarContent>Content</SidebarContent>);
    const content = container.firstChild;
    expect(content).toHaveClass('mdt-flex-1', 'mdt-overflow-y-auto', 'mdt-px-2', 'mdt-py-2');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<SidebarContent ref={ref}>Content</SidebarContent>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('SidebarSection', () => {
  it('renders correctly with children', () => {
    render(<SidebarSection>Section content</SidebarSection>);
    expect(screen.getByText('Section content')).toBeInTheDocument();
  });

  it('applies section classes', () => {
    const { container } = render(<SidebarSection>Section</SidebarSection>);
    const section = container.firstChild;
    expect(section).toHaveClass('mdt-mb-4');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<SidebarSection ref={ref}>Section</SidebarSection>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('SidebarLabel', () => {
  it('renders correctly with children', () => {
    render(<SidebarLabel>Label text</SidebarLabel>);
    expect(screen.getByText('Label text')).toBeInTheDocument();
  });

  it('applies label classes', () => {
    const { container } = render(<SidebarLabel>Label</SidebarLabel>);
    const label = container.firstChild;
    expect(label).toHaveClass(
      'mdt-mb-1',
      'mdt-flex',
      'mdt-items-center',
      'mdt-justify-between',
      'mdt-px-2',
      'mdt-py-1',
      'mdt-text-xs',
      'mdt-font-medium',
      'mdt-text-muted-foreground'
    );
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<SidebarLabel ref={ref}>Label</SidebarLabel>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('SidebarItem', () => {
  it('renders correctly with children', () => {
    render(<SidebarItem>Item text</SidebarItem>);
    expect(screen.getByRole('button', { name: /item text/i })).toBeInTheDocument();
  });

  it('applies item classes', () => {
    render(<SidebarItem>Item</SidebarItem>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'mdt-group',
      'mdt-flex',
      'mdt-w-full',
      'mdt-items-center',
      'mdt-gap-2',
      'mdt-rounded-md',
      'mdt-px-2',
      'mdt-py-1.5'
    );
  });

  it('applies active state classes', () => {
    render(<SidebarItem active>Active Item</SidebarItem>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('mdt-bg-muted', 'mdt-text-foreground');
  });

  it('renders with icon', () => {
    render(<SidebarItem icon={<span data-testid="icon">📊</span>}>Item with icon</SidebarItem>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Item with icon')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<SidebarItem onClick={handleClick}>Click me</SidebarItem>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has button type by default', () => {
    render(<SidebarItem>Item</SidebarItem>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<SidebarItem ref={ref}>Item</SidebarItem>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('truncates long text', () => {
    render(<SidebarItem>Very long item text that should truncate</SidebarItem>);
    const button = screen.getByRole('button');
    const textSpan = button.querySelector('span.mdt-truncate');
    expect(textSpan).toHaveClass('mdt-truncate');
  });
});

describe('Sidebar integration', () => {
  it('renders complete sidebar structure', () => {
    render(
      <Sidebar>
        <SidebarHeader>
          <span>My App</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarSection>
            <SidebarLabel>Navigation</SidebarLabel>
            <SidebarItem active>Dashboard</SidebarItem>
            <SidebarItem>Settings</SidebarItem>
          </SidebarSection>
        </SidebarContent>
      </Sidebar>
    );

    expect(screen.getByText('My App')).toBeInTheDocument();
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
  });
});
