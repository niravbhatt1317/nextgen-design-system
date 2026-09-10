import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PageBand, PageFrame, PageHeader, PageHero, PageSurface } from './PageFrame';

describe('PageFrame', () => {
  it('is the one scroll container', () => {
    const { container } = render(<PageFrame data-testid="frame">body</PageFrame>);
    const frame = container.querySelector('.mdt-page-frame');
    expect(frame).not.toBeNull();
    expect(frame).toHaveClass('mdt-overflow-y-auto');
    /* nothing inside it may scroll vertically on its own */
    expect(frame).toHaveClass('mdt-overflow-x-hidden');
  });

  it('forwards a ref and merges a className', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <PageFrame ref={ref} className="custom-frame">
        body
      </PageFrame>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('custom-frame');
    expect(ref.current).toHaveClass('mdt-page-frame');
  });
});

describe('PageHeader', () => {
  it('renders even with no breadcrumb — it is the page anchor', () => {
    const { container } = render(
      <PageFrame>
        <PageHeader data-testid="b1" />
      </PageFrame>
    );
    expect(screen.getByTestId('b1')).toBeInTheDocument();
    expect(container.querySelector('.mdt-page-header')).toHaveClass('mdt-sticky');
  });

  it('keeps its hairline — the one band that does', () => {
    render(
      <PageFrame>
        <PageHeader data-testid="b1" />
      </PageFrame>
    );
    expect(screen.getByTestId('b1')).toHaveClass('mdt-border-b');
  });

  it('renders the breadcrumb and the leading slot', () => {
    render(
      <PageFrame>
        <PageHeader leading={<button type="button">Collapse</button>}>
          <nav>Settings / Users</nav>
        </PageHeader>
      </PageFrame>
    );
    expect(screen.getByText('Settings / Users')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Collapse' })).toBeInTheDocument();
  });

  it('forwards a ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <PageFrame>
        <PageHeader ref={ref} />
      </PageFrame>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('PageHero', () => {
  it('renders the title as the page H1', () => {
    render(
      <PageFrame>
        <PageHero title="Users" />
      </PageFrame>
    );
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Users');
  });

  it('renders badge, subtitle, icon and children when given', () => {
    render(
      <PageFrame>
        <PageHero
          title="Users"
          badge={<span>248 total</span>}
          subtitle="Everyone who can sign in."
          icon={<span data-testid="icon" />}
        >
          <div>KPI strip</div>
        </PageHero>
      </PageFrame>
    );
    expect(screen.getByText('248 total')).toBeInTheDocument();
    expect(screen.getByText('Everyone who can sign in.')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('KPI strip')).toBeInTheDocument();
  });

  it('omits the subtitle row entirely when there is none', () => {
    render(
      <PageFrame>
        <PageHero title="Users" />
      </PageFrame>
    );
    expect(screen.queryByText('Everyone who can sign in.')).not.toBeInTheDocument();
  });

  it('forwards a ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <PageFrame>
        <PageHero ref={ref} title="Users" />
      </PageFrame>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('the hero-actions handoff', () => {
  it('docks the hero cluster into the header band', () => {
    render(
      <PageFrame>
        <PageHeader />
        <PageHero title="Users" actions={<button type="button">Invite users</button>} />
      </PageFrame>
    );
    /* the cluster exists twice on purpose — the hero's copy stays reachable */
    expect(screen.getAllByRole('button', { name: 'Invite users' })).toHaveLength(2);
    expect(screen.getByTestId('page-docked-actions')).toBeInTheDocument();
  });

  it('renders no docked copy when the hero has no actions', () => {
    render(
      <PageFrame>
        <PageHeader />
        <PageHero title="Users" />
      </PageFrame>
    );
    expect(screen.queryByTestId('page-docked-actions')).not.toBeInTheDocument();
  });

  it('renders no docked copy when the header opts out', () => {
    render(
      <PageFrame>
        <PageHeader dockActions={false} />
        <PageHero title="Users" actions={<button type="button">Invite users</button>} />
      </PageFrame>
    );
    expect(screen.getAllByRole('button', { name: 'Invite users' })).toHaveLength(1);
    expect(screen.queryByTestId('page-docked-actions')).not.toBeInTheDocument();
  });

  it('takes the cluster back when the hero unmounts', () => {
    const { rerender } = render(
      <PageFrame>
        <PageHeader />
        <PageHero title="Users" actions={<button type="button">Invite users</button>} />
      </PageFrame>
    );
    expect(screen.getByTestId('page-docked-actions')).toBeInTheDocument();

    rerender(
      <PageFrame>
        <PageHeader />
      </PageFrame>
    );
    expect(screen.queryByTestId('page-docked-actions')).not.toBeInTheDocument();
  });
});

describe('PageBand', () => {
  it('marks itself as the tab band', () => {
    render(
      <PageFrame>
        <PageBand variant="tabs" data-testid="band">
          tabs
        </PageBand>
      </PageFrame>
    );
    expect(screen.getByTestId('band')).toHaveAttribute('data-band', 'tabs');
  });

  it('marks itself as the toolbar band', () => {
    render(
      <PageFrame>
        <PageBand variant="toolbar" data-testid="band">
          search
        </PageBand>
      </PageFrame>
    );
    expect(screen.getByTestId('band')).toHaveAttribute('data-band', 'toolbar');
  });

  it('pins under the header band', () => {
    render(
      <PageFrame>
        <PageBand variant="toolbar" data-testid="band" />
      </PageFrame>
    );
    const band = screen.getByTestId('band');
    expect(band).toHaveClass('mdt-sticky');
    expect(band).toHaveClass('mdt-page-band');
  });

  it('renders the trailing group', () => {
    render(
      <PageFrame>
        <PageBand variant="toolbar" end={<span>248 users</span>}>
          <span>Search</span>
        </PageBand>
      </PageFrame>
    );
    expect(screen.getByText('248 users')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('forwards a ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <PageFrame>
        <PageBand ref={ref} variant="tabs" />
      </PageFrame>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('PageSurface', () => {
  it('carries no inset override of its own — the band above decides', () => {
    render(
      <PageFrame>
        <PageBand variant="tabs" />
        <PageSurface data-testid="surface">table</PageSurface>
      </PageFrame>
    );
    const surface = screen.getByTestId('surface');
    expect(surface).toHaveClass('mdt-page-surface');
    expect(surface).not.toHaveAttribute('data-under');
  });

  it('accepts an explicit override for a band outside the frame', () => {
    render(
      <PageFrame>
        <PageSurface under="tabs" data-testid="surface">
          table
        </PageSurface>
      </PageFrame>
    );
    expect(screen.getByTestId('surface')).toHaveAttribute('data-under', 'tabs');
  });

  it('is a natural-height stack, never a scroller', () => {
    render(
      <PageFrame>
        <PageSurface data-testid="surface">table</PageSurface>
      </PageFrame>
    );
    const surface = screen.getByTestId('surface');
    expect(surface.className).not.toContain('overflow-y-auto');
    expect(surface.className).not.toContain('overflow-y-scroll');
  });

  it('forwards a ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <PageFrame>
        <PageSurface ref={ref} />
      </PageFrame>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('the whole stack', () => {
  it('renders the slots in order with exactly one H1', () => {
    const { container } = render(
      <PageFrame>
        <PageHeader>
          <nav>Settings / Users</nav>
        </PageHeader>
        <PageHero title="Users" subtitle="Everyone who can sign in." />
        <PageBand variant="toolbar">search</PageBand>
        <PageSurface>table</PageSurface>
      </PageFrame>
    );
    expect(container.querySelectorAll('h1')).toHaveLength(1);

    const order = [...container.querySelectorAll('.mdt-page-frame > div')].map((n) =>
      n.className.includes('mdt-page-header')
        ? 'header'
        : n.className.includes('mdt-page-band')
          ? 'band'
          : n.className.includes('mdt-page-surface')
            ? 'surface'
            : 'hero'
    );
    expect(order).toEqual(['header', 'hero', 'band', 'surface']);
  });
});
