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
  const [leaving, setLeaving] = useState<(() => void) | null>(null);
  useSheetLeaveGuard((leave) => {
    if (!dirty) return true;
    setLeaving(() => leave);
    return false;
  });
  return (
    <div>
      <p>Editing at depth {depth}</p>
      {leaving !== null && (
        <button
          type="button"
          onClick={() => {
            leaving();
          }}
        >
          Yes, discard
        </button>
      )}
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

const Deeper = ({ dirty = false }: { dirty?: boolean }) => {
  const [leaving, setLeaving] = useState<(() => void) | null>(null);
  useSheetLeaveGuard((leave) => {
    if (!dirty) return true;
    setLeaving(() => leave);
    return false;
  });
  return (
    <div>
      <p>Roles page</p>
      {leaving !== null && (
        <button
          type="button"
          onClick={() => {
            leaving();
          }}
        >
          Yes, leave roles
        </button>
      )}
    </div>
  );
};

const Drawer = ({
  dirty,
  deeperDirty,
  onPageChange,
}: {
  dirty?: boolean;
  deeperDirty?: boolean;
  onPageChange?: () => void;
}) => (
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
      <Deeper dirty={deeperDirty} />
    </SheetPage>
  </SheetNavigation>
);

const step = (name: string) => screen.getByRole('button', { name: `Back to ${name}` });

describe('SheetNavigation', () => {
  it('opens on the root page with its plain title', () => {
    render(<Drawer />);
    expect(screen.getByRole('heading', { name: 'User management' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.queryByText(/Editing/)).toBeNull();
  });

  it('swaps the content on push, shows the path, and focuses the way back', async () => {
    const onPageChange = vi.fn();
    render(<Drawer onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(screen.getByText('Editing at depth 1')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Edit' })).toBeNull();
    expect(
      screen.getByRole('navigation', { name: 'User management › Edit details' })
    ).toBeInTheDocument();
    expect(step('User management')).toHaveFocus();
    expect(onPageChange).toHaveBeenLastCalledWith(
      { id: 'edit', title: 'Edit details' },
      expect.arrayContaining([{ id: 'edit', title: 'Edit details' }])
    );
  });

  it('draws no back button: the earlier step in the trail is the way back', async () => {
    render(<Drawer />);
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    const nav = screen.getByRole('navigation', { name: 'User management › Edit details' });
    expect(nav.querySelector('[data-slot="breadcrumb-back"]')).toBeNull();
    expect(step('User management')).toHaveAttribute('data-slot', 'breadcrumb-label');
    await userEvent.click(step('User management'));
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    // the pressed step went with its page: the focus lands on the title
    const heading = screen.getByRole('heading', { name: 'User management' });
    expect(heading.contains(document.activeElement)).toBe(true);
    expect(document.activeElement).toHaveAttribute('tabindex', '-1');
  });

  it('goes deeper than two, and any earlier step goes straight back to its page', async () => {
    render(<Drawer />);
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    await userEvent.click(screen.getByRole('button', { name: 'Deeper' }));
    expect(screen.getByText('Roles page')).toBeInTheDocument();
    expect(step('Edit details')).toHaveFocus();
    await userEvent.click(step('User management'));
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('goes one page back from the third page by the step before the last', async () => {
    render(<Drawer />);
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    await userEvent.click(screen.getByRole('button', { name: 'Deeper' }));
    await userEvent.click(step('Edit details'));
    expect(screen.getByText('Editing at depth 1')).toBeInTheDocument();
    expect(step('User management')).toHaveFocus();
    await userEvent.click(screen.getByRole('button', { name: 'Home' }));
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('lets a page hold back while its draft is dirty, and force leaves anyway', async () => {
    render(<Drawer dirty />);
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    await userEvent.click(step('User management'));
    expect(screen.getByRole('button', { name: 'Yes, discard' })).toBeInTheDocument();
    expect(screen.getByText('Editing at depth 1')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Discard' }));
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('hands the guard the leave that was asked for, and it goes there once agreed', async () => {
    render(<Drawer deeperDirty />);
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    await userEvent.click(screen.getByRole('button', { name: 'Deeper' }));
    await userEvent.click(step('User management'));
    expect(screen.getByText('Roles page')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Yes, leave roles' }));
    // straight to the first page, not one step back
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('does nothing on back from the first page, nor on backTo a page not behind', async () => {
    const onPageChange = vi.fn();
    const Probe = () => {
      const { back, backTo, push } = useSheetNavigation();
      return (
        <>
          <button type="button" onClick={() => back()}>
            Probe
          </button>
          <button
            type="button"
            onClick={() => {
              backTo(-1);
              backTo(0);
              backTo(5);
            }}
          >
            Nowhere
          </button>
          <button
            type="button"
            onClick={() => {
              push({ id: 'b', title: 'B' });
            }}
          >
            Push
          </button>
        </>
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
    await userEvent.click(screen.getByRole('button', { name: 'Push' }));
    expect(onPageChange).toHaveBeenCalledTimes(1);
    await userEvent.click(screen.getByRole('button', { name: 'Nowhere' }));
    // backTo(0) from depth 1 went back; the other two did nothing
    expect(onPageChange).toHaveBeenCalledTimes(2);
    expect(onPageChange).toHaveBeenLastCalledWith({ id: 'a', title: <b>Rich</b> }, [
      { id: 'a', title: <b>Rich</b> },
    ]);
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
    // a step drawn as something other than words is named by what it shows
    expect(screen.getByRole('button', { name: 'Rich' })).toHaveFocus();
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
