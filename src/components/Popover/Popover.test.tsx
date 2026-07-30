import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

describe('Popover', () => {
  it('renders trigger correctly', () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );

    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('opens popover when trigger is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByText('Open');
    await user.click(trigger);

    expect(screen.getByText('Popover Content')).toBeInTheDocument();
  });

  it('closes popover when clicking outside', async () => {
    const user = userEvent.setup();

    render(
      <div>
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>Popover Content</PopoverContent>
        </Popover>
        <div>Outside</div>
      </div>
    );

    const trigger = screen.getByText('Open');
    await user.click(trigger);

    expect(screen.getByText('Popover Content')).toBeInTheDocument();

    await user.click(screen.getByText('Outside'));

    // Content should be removed from document
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
  });

  it('supports controlled mode', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <Popover open={false} onOpenChange={onOpenChange}>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByText('Open');
    await user.click(trigger);

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('applies custom className to content', async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent className="custom-class">Content</PopoverContent>
      </Popover>
    );

    await user.click(screen.getByText('Open'));

    const content = screen.getByText('Content');
    expect(content).toHaveClass('custom-class');
  });

  it('renders with default alignment', async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );

    await user.click(screen.getByText('Open'));

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders with custom alignment', async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent align="start">Content</PopoverContent>
      </Popover>
    );

    await user.click(screen.getByText('Open'));

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('supports asChild on trigger', async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger asChild>
          <button type="button">Custom Button</button>
        </PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );

    await user.click(screen.getByText('Custom Button'));

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
