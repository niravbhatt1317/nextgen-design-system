import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { PopoverOld2, PopoverOld2Content, PopoverOld2Trigger } from './PopoverOld2';

describe('PopoverOld2', () => {
  it('renders trigger correctly', () => {
    render(
      <PopoverOld2>
        <PopoverOld2Trigger>Open</PopoverOld2Trigger>
        <PopoverOld2Content>Content</PopoverOld2Content>
      </PopoverOld2>
    );

    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('opens popover when trigger is clicked', async () => {
    const user = userEvent.setup();

    render(
      <PopoverOld2>
        <PopoverOld2Trigger>Open</PopoverOld2Trigger>
        <PopoverOld2Content>PopoverOld2 Content</PopoverOld2Content>
      </PopoverOld2>
    );

    const trigger = screen.getByText('Open');
    await user.click(trigger);

    expect(screen.getByText('PopoverOld2 Content')).toBeInTheDocument();
  });

  it('closes popover when clicking outside', async () => {
    const user = userEvent.setup();

    render(
      <div>
        <PopoverOld2>
          <PopoverOld2Trigger>Open</PopoverOld2Trigger>
          <PopoverOld2Content>PopoverOld2 Content</PopoverOld2Content>
        </PopoverOld2>
        <div>Outside</div>
      </div>
    );

    const trigger = screen.getByText('Open');
    await user.click(trigger);

    expect(screen.getByText('PopoverOld2 Content')).toBeInTheDocument();

    await user.click(screen.getByText('Outside'));

    // Content should be removed from document
    expect(screen.queryByText('PopoverOld2 Content')).not.toBeInTheDocument();
  });

  it('supports controlled mode', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <PopoverOld2 open={false} onOpenChange={onOpenChange}>
        <PopoverOld2Trigger>Open</PopoverOld2Trigger>
        <PopoverOld2Content>Content</PopoverOld2Content>
      </PopoverOld2>
    );

    const trigger = screen.getByText('Open');
    await user.click(trigger);

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('applies custom className to content', async () => {
    const user = userEvent.setup();

    render(
      <PopoverOld2>
        <PopoverOld2Trigger>Open</PopoverOld2Trigger>
        <PopoverOld2Content className="custom-class">Content</PopoverOld2Content>
      </PopoverOld2>
    );

    await user.click(screen.getByText('Open'));

    const content = screen.getByText('Content');
    expect(content).toHaveClass('custom-class');
  });

  it('renders with default alignment', async () => {
    const user = userEvent.setup();

    render(
      <PopoverOld2>
        <PopoverOld2Trigger>Open</PopoverOld2Trigger>
        <PopoverOld2Content>Content</PopoverOld2Content>
      </PopoverOld2>
    );

    await user.click(screen.getByText('Open'));

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders with custom alignment', async () => {
    const user = userEvent.setup();

    render(
      <PopoverOld2>
        <PopoverOld2Trigger>Open</PopoverOld2Trigger>
        <PopoverOld2Content align="start">Content</PopoverOld2Content>
      </PopoverOld2>
    );

    await user.click(screen.getByText('Open'));

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('supports asChild on trigger', async () => {
    const user = userEvent.setup();

    render(
      <PopoverOld2>
        <PopoverOld2Trigger asChild>
          <button type="button">Custom Button</button>
        </PopoverOld2Trigger>
        <PopoverOld2Content>Content</PopoverOld2Content>
      </PopoverOld2>
    );

    await user.click(screen.getByText('Custom Button'));

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
