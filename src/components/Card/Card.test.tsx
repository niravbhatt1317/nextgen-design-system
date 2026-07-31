import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardMedia,
  ClickableCard,
  CollapsibleCard,
} from './Card';

const CARD = 'card';
const HEADER = 'card-header';
const BODY = 'card-body';
const FOOTER = 'card-footer';

const getCard = () => screen.getByTestId(CARD);

describe('Card', () => {
  describe('the surface', () => {
    it('renders its children', () => {
      render(
        <Card>
          <CardBody>Queue depth crossed 8,000.</CardBody>
        </Card>
      );
      expect(screen.getByText('Queue depth crossed 8,000.')).toBeInTheDocument();
    });

    it('is filled by default, and filled always keeps its border', () => {
      render(<Card />);
      // White on white measures 1.00 - without the border there is no card.
      expect(getCard()).toHaveClass('mdt-border-border');
    });

    it('gives secondary a fill and no border, because the fill carries it', () => {
      render(<Card surface="secondary" />);
      expect(getCard()).toHaveClass('mdt-bg-secondary');
      expect(getCard()).toHaveClass('mdt-border-transparent');
    });

    it('lifts elevated by making the surface lighter in dark, not the shadow darker', () => {
      render(<Card surface="elevated" />);
      expect(getCard()).toHaveClass('mdt-shadow-md');
      expect(getCard()).toHaveClass('dark:mdt-bg-neutral-140');
    });

    it('merges a custom className', () => {
      render(<Card className="mdt-w-80" />);
      expect(getCard()).toHaveClass('mdt-w-80');
    });

    it('forwards a ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Card ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('passes through native div attributes', () => {
      render(<Card aria-label="Asset" />);
      expect(getCard()).toHaveAttribute('aria-label', 'Asset');
    });
  });

  describe('one inset, every part', () => {
    it('hands the same padding to every part, so their left edges line up', () => {
      render(
        <Card padding="compact">
          <CardHeader heading="Asset" />
          <CardBody>Rows</CardBody>
          <CardFooter meta="Synced" />
        </Card>
      );
      for (const id of [HEADER, BODY, FOOTER]) {
        expect(screen.getByTestId(id)).toHaveClass('mdt-px-3.5');
      }
    });

    it('drops the inset entirely at padding="none", for content that reaches the edges', () => {
      render(
        <Card padding="none">
          <CardBody>A table</CardBody>
        </Card>
      );
      expect(screen.getByTestId(BODY)).toHaveClass('mdt-px-0');
    });
  });

  describe('the header is a region, so it carries a line', () => {
    it('draws the line by default', () => {
      render(
        <Card>
          <CardHeader heading="Asset summary" />
          <CardBody>Rows</CardBody>
        </Card>
      );
      expect(screen.getByTestId(HEADER)).toHaveClass('mdt-border-b');
    });

    it('drops the line for the rarer case where the title names the rows below it', () => {
      render(
        <Card>
          <CardHeader heading="Asset summary" plain />
          <CardBody>Rows</CardBody>
        </Card>
      );
      expect(screen.getByTestId(HEADER)).not.toHaveClass('mdt-border-b');
    });

    it('leaves a header with nothing after it to drop the line on its own', () => {
      render(
        <Card>
          <CardHeader heading="Asset summary" />
        </Card>
      );
      // The CSS does this, not a prop - so a collapsed card comes out right free.
      expect(screen.getByTestId(HEADER)).toHaveClass('last:mdt-border-b-0');
    });

    it('renders every slot it is given', () => {
      render(
        <Card>
          <CardHeader
            leading={<span>tile</span>}
            eyebrow="Incident"
            heading="Mail relay queue backing up"
            supporting="Two of four nodes refusing connections."
            meta="Raised 2 days ago"
            trailing={<span>P1</span>}
          />
        </Card>
      );
      expect(screen.getByTestId('card-header-leading')).toBeInTheDocument();
      expect(screen.getByText('Incident')).toBeInTheDocument();
      expect(screen.getByText('Mail relay queue backing up')).toBeInTheDocument();
      expect(screen.getByText('Two of four nodes refusing connections.')).toBeInTheDocument();
      expect(screen.getByText('Raised 2 days ago')).toBeInTheDocument();
      expect(screen.getByTestId('card-header-trailing')).toBeInTheDocument();
    });

    it('draws the heading as a real heading on a static card', () => {
      render(
        <Card>
          <CardHeader heading="Asset summary" />
        </Card>
      );
      expect(screen.getByRole('heading', { name: 'Asset summary' })).toBeInTheDocument();
    });

    it('lets the caller pick the heading level', () => {
      render(
        <Card>
          <CardHeader heading="Asset summary" headingAs="h2" />
        </Card>
      );
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });
  });

  describe('the footer', () => {
    it('draws its line by default and caps the actions on the right', () => {
      render(
        <Card>
          <CardBody>Rows</CardBody>
          <CardFooter meta="Synced 4 min ago" actions={<button type="button">Open</button>} />
        </Card>
      );
      expect(screen.getByTestId(FOOTER)).toHaveClass('mdt-border-t');
      expect(screen.getByTestId('card-footer-actions')).toBeInTheDocument();
      expect(screen.getByText('Synced 4 min ago')).toBeInTheDocument();
    });

    it('drops its line when asked', () => {
      render(
        <Card>
          <CardBody>Rows</CardBody>
          <CardFooter plain meta="Synced" />
        </Card>
      );
      expect(screen.getByTestId(FOOTER)).not.toHaveClass('mdt-border-t');
    });
  });

  describe('media', () => {
    it('renders full width, ignoring the inset', () => {
      render(
        <Card>
          <CardMedia>
            <img src="/x.png" alt="" />
          </CardMedia>
        </Card>
      );
      expect(screen.getByTestId('card-media')).toHaveClass('mdt-w-full');
    });
  });
});

describe('ClickableCard', () => {
  it('is a single button when it has no destination', () => {
    render(<ClickableCard onClick={() => {}}>INC-4471</ClickableCard>);
    expect(screen.getByRole('button', { name: 'INC-4471' })).toBeInTheDocument();
  });

  it('is a single link when it has one', () => {
    render(<ClickableCard href="/incidents/4471">INC-4471</ClickableCard>);
    expect(screen.getByRole('link', { name: 'INC-4471' })).toHaveAttribute(
      'href',
      '/incidents/4471'
    );
  });

  it('fires once for a click anywhere on the card', async () => {
    const onClick = vi.fn();
    render(
      <ClickableCard onClick={onClick}>
        <CardHeader heading="INC-4471" supporting="Mail relay queue backing up." />
      </ClickableCard>
    );
    await userEvent.click(screen.getByText('Mail relay queue backing up.'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not put a heading inside the control', () => {
    // A heading nested in a button is invalid, so the header steps down to a span.
    render(
      <ClickableCard onClick={() => {}}>
        <CardHeader heading="INC-4471" />
      </ClickableCard>
    );
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.getByText('INC-4471')).toBeInTheDocument();
  });

  it('is reachable by keyboard and fires on Enter', async () => {
    const onClick = vi.fn();
    render(<ClickableCard onClick={onClick}>INC-4471</ClickableCard>);
    await userEvent.tab();
    expect(screen.getByRole('button')).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('CollapsibleCard', () => {
  const header = { heading: 'Related changes', supporting: '3 linked to this incident' };

  it('starts closed and hides its content', () => {
    render(
      <CollapsibleCard header={header}>
        <p>CHG-0912</p>
      </CollapsibleCard>
    );
    expect(screen.getByTestId('card-toggle')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('CHG-0912')).not.toBeInTheDocument();
  });

  it('opens on click and reveals its content', async () => {
    render(
      <CollapsibleCard header={header}>
        <p>CHG-0912</p>
      </CollapsibleCard>
    );
    await userEvent.click(screen.getByTestId('card-toggle'));
    expect(screen.getByTestId('card-toggle')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('CHG-0912')).toBeInTheDocument();
  });

  it('drops the header line while it is closed, and draws it once open', async () => {
    // Closed, the line would land 20px above the card's own edge and leave an
    // empty strip that reads as an unfinished row.
    render(
      <CollapsibleCard header={header}>
        <p>CHG-0912</p>
      </CollapsibleCard>
    );
    expect(screen.getByTestId(HEADER)).not.toHaveClass('mdt-border-b');
    await userEvent.click(screen.getByTestId('card-toggle'));
    expect(screen.getByTestId(HEADER)).toHaveClass('mdt-border-b');
    // The header is the only child of the toggle, so it is always :last-child.
    // Without this the `last:border-b-0` rule strips the line the class asks
    // for, and only a browser would show it.
    expect(screen.getByTestId(HEADER)).toHaveClass('last:mdt-border-b');
    expect(screen.getByTestId(HEADER)).not.toHaveClass('last:mdt-border-b-0');
  });

  it('honours defaultOpen', () => {
    render(
      <CollapsibleCard header={header} defaultOpen>
        <p>CHG-0912</p>
      </CollapsibleCard>
    );
    expect(screen.getByText('CHG-0912')).toBeInTheDocument();
  });

  it('can be driven from outside without moving on its own', async () => {
    const onOpenChange = vi.fn();
    render(
      <CollapsibleCard header={header} open={false} onOpenChange={onOpenChange}>
        <p>CHG-0912</p>
      </CollapsibleCard>
    );
    await userEvent.click(screen.getByTestId('card-toggle'));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    // Still shut, because the caller owns the state.
    expect(screen.queryByText('CHG-0912')).not.toBeInTheDocument();
  });

  it('announces itself as a heading, with the control inside it', () => {
    render(
      <CollapsibleCard header={header}>
        <p>CHG-0912</p>
      </CollapsibleCard>
    );
    const heading = screen.getByRole('heading', { name: /Related changes/ });
    expect(heading).toContainElement(screen.getByTestId('card-toggle'));
  });

  it('points the control at the panel it opens', async () => {
    render(
      <CollapsibleCard header={header}>
        <p>CHG-0912</p>
      </CollapsibleCard>
    );
    await userEvent.click(screen.getByTestId('card-toggle'));
    const controls = screen.getByTestId('card-toggle').getAttribute('aria-controls');
    expect(screen.getByTestId('card-panel')).toHaveAttribute('id', controls);
  });
});
