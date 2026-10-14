import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sheet, SheetBody, SheetContent, SheetHeader, SheetTitle } from './Sheet';
import { SheetField, SheetIdentity, SheetSection } from './SheetParts';
import type { SheetContentProps } from './Sheet.types';

const Drawer = ({
  onOpenChange = vi.fn(),
  ...props
}: Partial<SheetContentProps> & { onOpenChange?: (open: boolean) => void }) => (
  <Sheet defaultOpen onOpenChange={onOpenChange}>
    <SheetContent layout="drawer" aria-describedby={undefined} {...props}>
      <SheetHeader>
        <SheetTitle>Access profiles</SheetTitle>
      </SheetHeader>
      <SheetBody>Body</SheetBody>
    </SheetContent>
  </Sheet>
);

/** Radix arms its outside listener a tick after opening, then hears a pointerdown on the document. */
const pressOutside = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
  fireEvent.pointerDown(document.body);
};

describe('SheetContent closing options', () => {
  it('closes on Escape and on a press outside by default, over a scrim', async () => {
    const onOpenChange = vi.fn();
    render(<Drawer onOpenChange={onOpenChange} />);
    expect(document.querySelector('[data-state="open"].mdt-fixed.mdt-inset-0')).not.toBeNull();
    await userEvent.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('stays open on Escape when closeOnEscape is off', async () => {
    const onOpenChange = vi.fn();
    render(<Drawer onOpenChange={onOpenChange} closeOnEscape={false} />);
    await userEvent.keyboard('{Escape}');
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('stays open on a press outside when closeOnOutsideClick is off, and closes when on', async () => {
    const onInteractOutside = vi.fn();
    const held = vi.fn();
    const { unmount } = render(
      <Drawer
        onOpenChange={held}
        closeOnOutsideClick={false}
        onInteractOutside={onInteractOutside}
      />
    );
    await pressOutside();
    expect(onInteractOutside).toHaveBeenCalled();
    expect(held).not.toHaveBeenCalled();
    unmount();
    const closes = vi.fn();
    render(<Drawer onOpenChange={closes} />);
    await pressOutside();
    await waitFor(() => {
      expect(closes).toHaveBeenCalledWith(false);
    });
  });

  it('draws no scrim when overlay is off', () => {
    render(<Drawer overlay={false} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(document.querySelector('.mdt-fixed.mdt-inset-0.mdt-z-50:not([role=dialog])')).toBeNull();
  });
});

describe('SheetContent width', () => {
  it('takes pixels from a number and any CSS length from a string, over size', () => {
    const { unmount } = render(<Drawer width={600} size="sm" />);
    const px = screen.getByRole('dialog');
    expect(px).toHaveStyle({ width: '600px', maxWidth: '100vw' });
    expect(px).not.toHaveAttribute('data-size');
    expect(px.className).not.toContain('mdt-w-[480px]');
    unmount();
    const { unmount: next } = render(<Drawer width="40%" style={{ zIndex: 60 }} />);
    expect(screen.getByRole('dialog')).toHaveStyle({ width: '40%', zIndex: '60' });
    next();
    render(<Drawer width="640" />);
    expect(screen.getByRole('dialog')).toHaveStyle({ width: '640px' });
  });

  it('ignores width on a top or bottom sheet, and keeps size without it', () => {
    const { unmount } = render(<Drawer width="40%" side="bottom" />);
    expect(screen.getByRole('dialog').style.width).toBe('');
    unmount();
    render(<Drawer size="md" />);
    expect(screen.getByRole('dialog')).toHaveAttribute('data-size', 'md');
  });
});

describe('SheetIdentity', () => {
  it('shows the mark, name, status, lines split by hairlines, actions and what sits under it', () => {
    const { container } = render(
      <SheetIdentity
        mark={<span>M</span>}
        name="Helpdesk Access"
        status={<span>Active</span>}
        lines={[['IT Support', 'Teams'], 'Created by Natasha']}
        actions={<button type="button">Edit</button>}
      >
        <div>Facts</div>
      </SheetIdentity>
    );
    expect(screen.getByText('Helpdesk Access')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Teams')).toBeInTheDocument();
    expect(screen.getByText('Created by Natasha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.getByText('Facts')).toBeInTheDocument();
    expect(container.querySelectorAll('.mdt-mx-2')).toHaveLength(1);
  });

  it('needs only a name', () => {
    render(<SheetIdentity name="Sarah Johnson" />);
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
  });
});

describe('SheetSection and SheetField', () => {
  it('draws a heading, its hint and action, and label · value rows', () => {
    render(
      <SheetSection
        title="User details"
        hint="Who this is"
        action={<button type="button">Add</button>}
      >
        <SheetField label="Email">sarah@company.com</SheetField>
        <SheetField label="VIP user" />
      </SheetSection>
    );
    expect(screen.getByRole('heading', { name: 'User details' })).toBeInTheDocument();
    expect(screen.getByText('Who this is')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
    expect(screen.getByText('sarah@company.com')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('ties a label to its control with htmlFor', async () => {
    render(
      <SheetSection title="Edit">
        <SheetField label="Job title" htmlFor="job">
          <input id="job" />
        </SheetField>
      </SheetSection>
    );
    await userEvent.click(screen.getByText('Job title'));
    expect(screen.getByRole('textbox', { name: 'Job title' })).toHaveFocus();
  });

  it('a section with no content draws only its heading', () => {
    render(<SheetSection title="Empty" />);
    expect(screen.getByRole('heading', { name: 'Empty' })).toBeInTheDocument();
  });
});
