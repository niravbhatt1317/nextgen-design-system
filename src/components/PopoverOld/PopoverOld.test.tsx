import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { PopoverOld, PopoverOldContent, PopoverOldTrigger } from './PopoverOld';

describe('PopoverOld', () => {
  it('renders trigger correctly', () => {
    render(
      <PopoverOld>
        <PopoverOldTrigger>Open</PopoverOldTrigger>
        <PopoverOldContent>Content</PopoverOldContent>
      </PopoverOld>
    );

    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('opens popover when trigger is clicked', async () => {
    const user = userEvent.setup();

    render(
      <PopoverOld>
        <PopoverOldTrigger>Open</PopoverOldTrigger>
        <PopoverOldContent>PopoverOld Content</PopoverOldContent>
      </PopoverOld>
    );

    const trigger = screen.getByText('Open');
    await user.click(trigger);

    expect(screen.getByText('PopoverOld Content')).toBeInTheDocument();
  });

  it('closes popover when clicking outside', async () => {
    const user = userEvent.setup();

    render(
      <div>
        <PopoverOld>
          <PopoverOldTrigger>Open</PopoverOldTrigger>
          <PopoverOldContent>PopoverOld Content</PopoverOldContent>
        </PopoverOld>
        <div>Outside</div>
      </div>
    );

    const trigger = screen.getByText('Open');
    await user.click(trigger);

    expect(screen.getByText('PopoverOld Content')).toBeInTheDocument();

    await user.click(screen.getByText('Outside'));

    // Content should be removed from document
    expect(screen.queryByText('PopoverOld Content')).not.toBeInTheDocument();
  });

  it('supports controlled mode', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <PopoverOld open={false} onOpenChange={onOpenChange}>
        <PopoverOldTrigger>Open</PopoverOldTrigger>
        <PopoverOldContent>Content</PopoverOldContent>
      </PopoverOld>
    );

    const trigger = screen.getByText('Open');
    await user.click(trigger);

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('applies custom className to content', async () => {
    const user = userEvent.setup();

    render(
      <PopoverOld>
        <PopoverOldTrigger>Open</PopoverOldTrigger>
        <PopoverOldContent className="custom-class">Content</PopoverOldContent>
      </PopoverOld>
    );

    await user.click(screen.getByText('Open'));

    const content = screen.getByText('Content');
    expect(content).toHaveClass('custom-class');
  });

  it('renders with default alignment', async () => {
    const user = userEvent.setup();

    render(
      <PopoverOld>
        <PopoverOldTrigger>Open</PopoverOldTrigger>
        <PopoverOldContent>Content</PopoverOldContent>
      </PopoverOld>
    );

    await user.click(screen.getByText('Open'));

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders with custom alignment', async () => {
    const user = userEvent.setup();

    render(
      <PopoverOld>
        <PopoverOldTrigger>Open</PopoverOldTrigger>
        <PopoverOldContent align="start">Content</PopoverOldContent>
      </PopoverOld>
    );

    await user.click(screen.getByText('Open'));

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('supports asChild on trigger', async () => {
    const user = userEvent.setup();

    render(
      <PopoverOld>
        <PopoverOldTrigger asChild>
          <button type="button">Custom Button</button>
        </PopoverOldTrigger>
        <PopoverOldContent>Content</PopoverOldContent>
      </PopoverOld>
    );

    await user.click(screen.getByText('Custom Button'));

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
