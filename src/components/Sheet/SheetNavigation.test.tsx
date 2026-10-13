import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  SheetNavigation,
  SheetNavigationTitle,
  SheetPage,
  useSheetLeaveGuard,
  useSheetNavigation,
} from './SheetNavigation';

const View = () => {
  const { push } = useSheetNavigation();
  return (
    <button
      type="button"
      onClick={() => {
        push({ id: 'edit', title: 'Edit details' });
      }}
    >
      Edit
    </button>
  );
};

const Edit = ({ dirty = false }: { dirty?: boolean }) => {
  const { back, push, reset, depth } = useSheetNavigation();
  const [asked, setAsked] = useState(false);
  useSheetLeaveGuard(() => {
    if (!dirty) return true;
    setAsked(true);
    return false;
  });
  return (
    <div>
      <p>Editing at depth {depth}</p>
      {asked && <p>Discard?</p>}
      <button
        type="button"
        onClick={() => {
          back({ force: true });
        }}
      >
        Discard
      </button>
      <button
        type="button"
        onClick={() => {
          push({ id: 'deeper', title: 'Roles' });
        }}
      >
        Deeper
      </button>
      <button type="button" onClick={reset}>
        Home
      </button>
    </div>
  );
};

const Drawer = ({ dirty, onPageChange }: { dirty?: boolean; onPageChange?: () => void }) => (
  <SheetNavigation root={{ id: 'view', title: 'User management' }} onPageChange={onPageChange}>
    <h2>
      <SheetNavigationTitle />
    </h2>
    <SheetPage id="view">
      <View />
    </SheetPage>
    <SheetPage id="edit">
      <Edit dirty={dirty} />
    </SheetPage>
    <SheetPage id="deeper">
      <p>Roles page</p>
    </SheetPage>
  </SheetNavigation>
);

describe('SheetNavigation', () => {
  it('opens on the root page with its plain title', () => {
    render(<Drawer />);
    expect(screen.getByRole('heading', { name: 'User management' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.queryByText(/Editing/)).toBeNull();
  });

  it('swaps the content on push, shows the path, focuses back, and back brings the page back', async () => {
    const onPageChange = vi.fn();
    render(<Drawer onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(screen.getByText('Editing at depth 1')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Edit' })).toBeNull();
    expect(
      screen.getByRole('navigation', { name: 'User management › Edit details' })
    ).toBeInTheDocument();
    const backButton = screen.getByRole('button', { name: 'Back to User management' });
    expect(backButton).toHaveFocus();
    expect(onPageChange).toHaveBeenLastCalledWith(
      { id: 'edit', title: 'Edit details' },
      expect.arrayContaining([{ id: 'edit', title: 'Edit details' }])
    );
    await userEvent.click(backButton);
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'User management' })).toBeInTheDocument();
  });

  it('goes deeper than two, names back after the page before, and reset goes home', async () => {
    render(<Drawer />);
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    await userEvent.click(screen.getByRole('button', { name: 'Deeper' }));
    expect(screen.getByText('Roles page')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Back to Edit details' }));
    expect(screen.getByText('Editing at depth 1')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Home' }));
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('lets a page hold back while its draft is dirty, and force leaves anyway', async () => {
    render(<Drawer dirty />);
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    await userEvent.click(screen.getByRole('button', { name: 'Back to User management' }));
    expect(screen.getByText('Discard?')).toBeInTheDocument();
    expect(screen.getByText('Editing at depth 1')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Discard' }));
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('does nothing on back from the first page', () => {
    const onPageChange = vi.fn();
    const Probe = () => {
      const { back } = useSheetNavigation();
      return (
        <button type="button" onClick={() => back()}>
          Probe
        </button>
      );
    };
    render(
      <SheetNavigation root={{ id: 'a', title: <b>Rich</b> }} onPageChange={onPageChange}>
        <SheetNavigationTitle />
        <Probe />
      </SheetNavigation>
    );
    screen.getByRole('button', { name: 'Probe' }).click();
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('names the trail by its words, and falls back when the titles are not text', async () => {
    const Push = () => {
      const { push } = useSheetNavigation();
      return (
        <button
          type="button"
          onClick={() => {
            push({ id: 'b', title: <i>Icon step</i> });
          }}
        >
          Go
        </button>
      );
    };
    render(
      <SheetNavigation root={{ id: 'a', title: <b>Rich</b> }}>
        <SheetNavigationTitle />
        <Push />
      </SheetNavigation>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Go' }));
    expect(screen.getByText('Icon step')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('refuses to run outside a SheetNavigation', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const Lost = () => {
      useSheetNavigation();
      return null;
    };
    expect(() => render(<Lost />)).toThrow(
      'useSheetNavigation must be used inside a SheetNavigation.'
    );
    spy.mockRestore();
  });
});
