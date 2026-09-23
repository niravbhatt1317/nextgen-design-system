import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Breadcrumb } from './Breadcrumb';
import type { BreadcrumbItem } from './Breadcrumb.types';

const PAGE: BreadcrumbItem[] = [
  { label: 'Settings' },
  { label: 'User management' },
  { label: 'Users' },
];

const DRAWER: BreadcrumbItem[] = [{ label: 'User management' }, { label: 'Edit details' }];

const nav = () => screen.getByRole('navigation', { name: 'Breadcrumb' });
const items = () => screen.getAllByRole('listitem');
const separators = () => nav().querySelectorAll('[data-slot="breadcrumb-separator"]');
const labelOf = (li: HTMLElement) =>
  li.querySelector('[data-slot="breadcrumb-label"]') as HTMLElement;

describe('Breadcrumb', () => {
  describe('what it is', () => {
    it('is a navigation landmark named Breadcrumb, holding a list', () => {
      render(<Breadcrumb items={PAGE} />);
      expect(nav()).toBeInTheDocument();
      expect(within(nav()).getByRole('list')).toBeInTheDocument();
    });

    it('renders one item per place, root first', () => {
      render(<Breadcrumb items={PAGE} />);
      expect(items()).toHaveLength(3);
      expect(items()[0]).toHaveTextContent('Settings');
      expect(items()[1]).toHaveTextContent('User management');
      expect(items()[2]).toHaveTextContent('Users');
    });

    it('takes its own name when given one', () => {
      render(<Breadcrumb items={PAGE} aria-label="Where you are" />);
      expect(screen.getByRole('navigation', { name: 'Where you are' })).toBeInTheDocument();
    });

    it('is the page form unless told otherwise', () => {
      render(<Breadcrumb items={PAGE} />);
      expect(nav()).toHaveAttribute('data-variant', 'page');
    });
  });

  describe('the place you are on', () => {
    it('marks the last item, and only the last, as the current page', () => {
      render(<Breadcrumb items={PAGE} />);
      const marked = items().filter((li) => li.getAttribute('aria-current') === 'page');
      expect(marked).toHaveLength(1);
      expect(marked[0]).toHaveTextContent('Users');
    });

    it('never truncates the last item, and never gives it a title', () => {
      render(<Breadcrumb items={PAGE} />);
      const current = labelOf(items()[2] as HTMLElement);
      expect(current).not.toHaveAttribute('title');
      expect(current.className).not.toContain('mdt-truncate');
    });

    it('lets an ancestor truncate and carry its whole name as a title', () => {
      render(<Breadcrumb items={PAGE} />);
      const ancestor = labelOf(items()[1] as HTMLElement);
      expect(ancestor).toHaveAttribute('title', 'User management');
      expect(ancestor.className).toContain('mdt-truncate');
    });
  });

  describe('following an ancestor', () => {
    it('renders an item with an href as a link to it', () => {
      render(<Breadcrumb items={[{ label: 'Settings', href: '/settings' }, { label: 'Users' }]} />);
      expect(screen.getByRole('link', { name: 'Settings' })).toHaveAttribute('href', '/settings');
    });

    it('renders an item with onSelect as a button, and fires it on click', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      render(
        <Breadcrumb
          items={[
            { label: 'Settings' },
            { label: 'User management', onSelect },
            { label: 'Users' },
          ]}
        />
      );
      const button = screen.getByRole('button', { name: 'User management' });
      expect(button).toHaveAttribute('type', 'button');
      await user.click(button);
      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it('renders a plain item as text, not as anything you can press', () => {
      render(<Breadcrumb items={PAGE} />);
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('ignores an empty href rather than drawing a link to nowhere', () => {
      render(<Breadcrumb items={[{ label: 'Settings', href: '' }, { label: 'Users' }]} />);
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
  });

  describe('the drawer form', () => {
    it('renders the back button named after the parent, and fires onBack', async () => {
      const user = userEvent.setup();
      const onBack = vi.fn();
      render(<Breadcrumb variant="drawer" items={DRAWER} onBack={onBack} />);
      const back = screen.getByRole('button', { name: 'Back to User management' });
      expect(back).toHaveAttribute('title', 'Back to User management');
      await user.click(back);
      expect(onBack).toHaveBeenCalledTimes(1);
    });

    it('takes a given backLabel over the one it would have made', () => {
      render(
        <Breadcrumb variant="drawer" items={DRAWER} onBack={vi.fn()} backLabel="Back to the team" />
      );
      expect(screen.getByRole('button', { name: 'Back to the team' })).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Back to User management' })
      ).not.toBeInTheDocument();
    });

    it('draws the nick beside the back button, hidden from assistive tech', () => {
      render(<Breadcrumb variant="drawer" items={DRAWER} onBack={vi.fn()} />);
      const nick = nav().querySelector('[data-slot="breadcrumb-nick"]');
      expect(nick).toHaveAttribute('aria-hidden', 'true');
    });

    it('draws no back button and no nick without onBack', () => {
      render(<Breadcrumb variant="drawer" items={DRAWER} />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
      expect(nav().querySelector('[data-slot="breadcrumb-nick"]')).toBeNull();
    });

    it('lets only the back button navigate - an item href or onSelect is ignored', () => {
      render(
        <Breadcrumb
          variant="drawer"
          items={[{ label: 'Teams', href: '/teams', onSelect: vi.fn() }, { label: 'Edit details' }]}
          onBack={vi.fn()}
        />
      );
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
      expect(screen.getAllByRole('button')).toHaveLength(1);
      expect(screen.getByRole('button', { name: 'Back to Teams' })).toBeInTheDocument();
    });

    it('still marks the step as the current page', () => {
      render(<Breadcrumb variant="drawer" items={DRAWER} onBack={vi.fn()} />);
      const marked = items().filter((li) => li.getAttribute('aria-current') === 'page');
      expect(marked).toHaveLength(1);
      expect(marked[0]).toHaveTextContent('Edit details');
    });
  });

  describe('the separators', () => {
    it('draws one chevron fewer than there are places', () => {
      render(<Breadcrumb items={PAGE} />);
      expect(separators()).toHaveLength(2);
    });

    it('hides every chevron from assistive tech', () => {
      render(<Breadcrumb variant="drawer" items={DRAWER} onBack={vi.fn()} />);
      const chevrons = separators();
      expect(chevrons).toHaveLength(1);
      chevrons.forEach((svg) => {
        expect(svg).toHaveAttribute('aria-hidden', 'true');
      });
      // The whole row reads as its words and nothing else.
      expect(within(nav()).queryByRole('img')).not.toBeInTheDocument();
    });
  });
});
