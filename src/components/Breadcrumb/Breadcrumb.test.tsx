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

    it('keeps every name on one line and never shortens it, as the console does', () => {
      render(<Breadcrumb items={PAGE} />);
      const ancestor = labelOf(items()[1] as HTMLElement);
      expect(ancestor).not.toHaveAttribute('title');
      expect(ancestor.className).toContain('mdt-whitespace-nowrap');
      expect(ancestor.className).not.toContain('mdt-truncate');
    });

    it('reads the faint ink and the drawer step the soft ink - the console’s rendered values', () => {
      render(<Breadcrumb variant="drawer" items={DRAWER} onBack={vi.fn()} />);
      expect(nav().className).toContain('mdt-text-faint');
      expect(nav().className).not.toContain('mdt-text-muted-foreground');
      expect(labelOf(items()[1] as HTMLElement)).toHaveClass(
        'mdt-font-semibold',
        'mdt-text-neutral-130'
      );
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
    it('wears the drawer title’s 14 on a 20 line, its boxes 7 apart (12 to the eye)', () => {
      render(<Breadcrumb variant="drawer" items={DRAWER} />);
      expect(nav()).toHaveClass('mdt-text-sm', 'mdt-leading-5', 'mdt-gap-[7px]');
      expect(nav()).not.toHaveClass('mdt-text-base');
      expect(nav().querySelector('ol')).toHaveClass('mdt-gap-[7px]');
      items().forEach((li) => {
        expect(li).toHaveClass('mdt-gap-[7px]');
      });
    });

    it('draws no back button and no nick, ever', () => {
      render(<Breadcrumb variant="drawer" items={DRAWER} onBack={vi.fn()} />);
      expect(nav().querySelector('[data-slot="breadcrumb-back"]')).toBeNull();
      expect(nav().querySelector('[data-slot="breadcrumb-nick"]')).toBeNull();
      expect(screen.getAllByRole('button')).toHaveLength(1);
    });

    it('makes an earlier step with onSelect the way back, named after it', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      render(
        <Breadcrumb
          variant="drawer"
          items={[{ label: 'Needs attention', onSelect }, { label: 'Crashing modules' }]}
        />
      );
      const step = screen.getByRole('button', { name: 'Back to Needs attention' });
      expect(step).toHaveTextContent('Needs attention');
      expect(step).toHaveAttribute('type', 'button');
      expect(step).toHaveAttribute('data-slot', 'breadcrumb-label');
      await user.click(step);
      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it('underlines the way back in the foreground under the pointer, and rings it on keyboard focus', () => {
      render(<Breadcrumb variant="drawer" items={DRAWER} onBack={vi.fn()} />);
      const step = screen.getByRole('button', { name: 'Back to User management' });
      expect(step).toHaveClass(
        'mdt-font-normal',
        'mdt-whitespace-nowrap',
        'mdt-cursor-pointer',
        'mdt-rounded-sm',
        'hover:mdt-text-foreground',
        'hover:mdt-underline',
        'hover:mdt-decoration-neutral-60',
        'hover:mdt-underline-offset-[3px]',
        'focus-visible:mdt-outline-2',
        'focus-visible:mdt-outline-offset-2',
        'focus-visible:mdt-outline-ring'
      );
    });

    it('lets every earlier step go back, three steps deep', async () => {
      const user = userEvent.setup();
      const toRoot = vi.fn();
      const toModules = vi.fn();
      render(
        <Breadcrumb
          variant="drawer"
          items={[
            { label: 'Agent details', onSelect: toRoot },
            { label: 'Modules', onSelect: toModules },
            { label: 'Metrics' },
          ]}
        />
      );
      await user.click(screen.getByRole('button', { name: 'Back to Agent details' }));
      await user.click(screen.getByRole('button', { name: 'Back to Modules' }));
      expect(toRoot).toHaveBeenCalledTimes(1);
      expect(toModules).toHaveBeenCalledTimes(1);
    });

    it('never follows the last step - it is where you are', () => {
      const onSelect = vi.fn();
      render(
        <Breadcrumb
          variant="drawer"
          items={[{ label: 'Teams' }, { label: 'Edit details', onSelect, href: '/edit' }]}
        />
      );
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('follows an earlier step with an href as a link, named as the way back', () => {
      render(
        <Breadcrumb
          variant="drawer"
          items={[{ label: 'Teams', href: '/teams' }, { label: 'Edit' }]}
        />
      );
      expect(screen.getByRole('link', { name: 'Back to Teams' })).toHaveAttribute('href', '/teams');
    });

    it('hands onBack to the step before the last when it has nowhere of its own to go', async () => {
      const user = userEvent.setup();
      const onBack = vi.fn();
      render(
        <Breadcrumb
          variant="drawer"
          items={[{ label: 'User management' }, { label: 'Edit details' }]}
          onBack={onBack}
        />
      );
      await user.click(screen.getByRole('button', { name: 'Back to User management' }));
      expect(onBack).toHaveBeenCalledTimes(1);
    });

    it('keeps an earlier step’s own onSelect over onBack', async () => {
      const user = userEvent.setup();
      const onBack = vi.fn();
      const onSelect = vi.fn();
      render(
        <Breadcrumb
          variant="drawer"
          items={[{ label: 'Teams', onSelect }, { label: 'Edit details' }]}
          onBack={onBack}
        />
      );
      await user.click(screen.getByRole('button', { name: 'Back to Teams' }));
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onBack).not.toHaveBeenCalled();
    });

    it('gives onBack only to the step before the last, not to the root of a deeper trail', () => {
      render(
        <Breadcrumb
          variant="drawer"
          items={[{ label: 'Teams' }, { label: 'Members' }, { label: 'Permissions' }]}
          onBack={vi.fn()}
        />
      );
      expect(screen.getAllByRole('button')).toHaveLength(1);
      expect(screen.getByRole('button', { name: 'Back to Members' })).toBeInTheDocument();
    });

    it('takes a given backLabel for the step before the last', () => {
      render(
        <Breadcrumb
          variant="drawer"
          items={[{ label: 'User management' }, { label: 'Edit details' }]}
          onBack={vi.fn()}
          backLabel="Back to the team"
        />
      );
      expect(screen.getByRole('button', { name: 'Back to the team' })).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Back to User management' })
      ).not.toBeInTheDocument();
    });

    it('names a step drawn as something other than words by what it shows', () => {
      render(
        <Breadcrumb
          variant="drawer"
          items={[{ label: <b>Rich step</b>, onSelect: vi.fn() }, { label: 'Edit' }]}
        />
      );
      const step = screen.getByRole('button', { name: 'Rich step' });
      expect(step).not.toHaveAttribute('aria-label');
    });

    it('draws a step with nowhere to go as plain text, with no page-form cursor', () => {
      render(<Breadcrumb variant="drawer" items={[{ label: 'Teams' }, { label: 'Edit' }]} />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
      expect(labelOf(items()[0] as HTMLElement).tagName).toBe('SPAN');
      expect(labelOf(items()[0] as HTMLElement)).not.toHaveClass('mdt-cursor-default');
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
