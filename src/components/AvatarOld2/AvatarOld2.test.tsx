import { fireEvent, render, screen } from '@testing-library/react';
import { AvatarOld2, initialsForNameOld2, toneForNameOld2 } from './AvatarOld2';
import { AvatarStackOld2 } from './AvatarStackOld2';

// Smoke test for the snapshot: it renders and its main props still work.
describe('AvatarOld2', () => {
  it('shows two initials from a name and carries the name as its label', () => {
    render(<AvatarOld2 name="Sarah Johnson" />);
    expect(screen.getByRole('img', { name: 'Sarah Johnson' })).toHaveTextContent('SJ');
  });

  it('shows one initial at the small sizes', () => {
    render(<AvatarOld2 name="Sarah Johnson" size="xs" />);
    expect(screen.getByRole('img')).toHaveTextContent(/^S$/);
  });

  it('derives the same tone from the same name every time', () => {
    expect(toneForNameOld2('Sarah Johnson')).toBe(toneForNameOld2('Sarah Johnson'));
    expect(initialsForNameOld2('monitoring')).toBe('mo');
  });

  it('takes an explicit tone, size and shape', () => {
    render(<AvatarOld2 name="Ravi Patel" tone="blue" size="lg" shape="rounded" />);
    expect(screen.getByRole('img')).toHaveClass('mdt-bg-blue-10', 'mdt-h-10', 'mdt-rounded-lg');
  });

  it('shows a photo and falls back to initials when it fails', () => {
    render(<AvatarOld2 name="Sarah Johnson" src="/sarah.jpg" />);
    const image = screen.getByTestId('avatar-image');
    expect(image).toBeInTheDocument();
    fireEvent.error(image);
    expect(screen.queryByTestId('avatar-image')).not.toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveTextContent('SJ');
  });

  it('stacks avatars and collapses the rest into a count', () => {
    render(
      <AvatarStackOld2 max={2}>
        <AvatarOld2 name="A One" />
        <AvatarOld2 name="B Two" />
        <AvatarOld2 name="C Three" />
        <AvatarOld2 name="D Four" />
      </AvatarStackOld2>
    );
    expect(screen.getAllByRole('img')).toHaveLength(2);
    expect(screen.getByTestId('avatar-stack-overflow')).toHaveTextContent('+2');
  });
});
