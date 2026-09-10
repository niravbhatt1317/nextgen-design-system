import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { Table, TableViewport } from '../Table';
import { Button } from '../Button';
import { PageBand, PageFrame, PageHeader, PageHero, PageSurface } from './PageFrame';

/* ────────────────────────────────────────────────────────────
 * Wireframe blanks.
 *
 * NOT the Skeleton component: Skeleton pulses, because it means "this content
 * is on its way". Nothing here is loading — these stories are about where
 * things sit and how they behave, so the blanks are one flat neutral and hold
 * still. Real names and numbers would only invite you to read them.
 * ──────────────────────────────────────────────────────────── */
const Blank = ({ w, h = 8, round }: { w: number; h?: number; round?: boolean }): ReactNode => (
  <span
    className="mdt-block mdt-flex-none mdt-bg-muted"
    style={{ width: w, height: h, borderRadius: round === true ? 999 : 4 }}
  />
);

const Stack = ({ children }: { children: ReactNode }): ReactNode => (
  <span className="mdt-block mdt-min-w-0">{children}</span>
);

/** The navigation rail — the only global chrome, and it never scrolls away. */
const Rail = (): ReactNode => (
  <aside className="mdt-flex mdt-w-64 mdt-flex-none mdt-flex-col mdt-border-r mdt-border-border mdt-bg-muted/30">
    <div className="mdt-flex mdt-items-center mdt-gap-2 mdt-border-b mdt-border-border mdt-p-3">
      <Blank w={28} h={28} />
      <Stack>
        <Blank w={98} h={9} />
        <span className="mdt-mt-1.5 mdt-block">
          <Blank w={60} h={7} />
        </span>
      </Stack>
    </div>
    <div className="mdt-p-3">
      <div className="mdt-flex mdt-h-[34px] mdt-items-center mdt-gap-2 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-px-2.5">
        <Blank w={16} h={16} />
        <Blank w={74} />
      </div>
    </div>
    <nav className="mdt-flex-1 mdt-overflow-auto mdt-px-3">
      {[52, null, null, null, 66, null, null].map((label, i) =>
        label === null ? (
          <div
            key={`row-${String(i)}`}
            className="mdt-mb-px mdt-flex mdt-min-h-8 mdt-items-center mdt-gap-2 mdt-rounded-md mdt-px-2.5"
          >
            <Blank w={15} h={15} />
            <Blank w={[38, 32, 84, 76, 66][i % 5] ?? 40} />
          </div>
        ) : (
          <div key={`lab-${String(i)}`} className="mdt-px-2 mdt-pb-1 mdt-pt-2.5">
            <Blank w={label} h={6} />
          </div>
        )
      )}
    </nav>
    <div className="mdt-border-t mdt-border-border mdt-p-3">
      <div className="mdt-flex mdt-items-center mdt-gap-2 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-2">
        <Blank w={26} h={26} round />
        <Stack>
          <Blank w={82} />
          <span className="mdt-mt-1.5 mdt-block">
            <Blank w={56} h={7} />
          </span>
        </Stack>
      </div>
    </div>
  </aside>
);

/** The whole frame lives in a fixed-height shell, exactly as an app does. */
const Shell = ({ children }: { children: ReactNode }): ReactNode => (
  <div className="mdt-flex mdt-h-[560px] mdt-overflow-hidden mdt-border mdt-border-border mdt-bg-card">
    <Rail />
    {children}
  </div>
);

const Crumbs = (): ReactNode => (
  <div className="mdt-flex mdt-items-center mdt-gap-2">
    <Blank w={48} />
    <span className="mdt-h-1 mdt-w-1 mdt-flex-none mdt-rounded-full mdt-bg-muted" />
    <Blank w={34} />
  </div>
);

const Actions = (): ReactNode => (
  <>
    <Button variant="outline" leftIcon={<Blank w={14} h={14} />}>
      Import
    </Button>
    <Button leftIcon={<Blank w={14} h={14} />}>Invite users</Button>
  </>
);

const KpiStripBlank = (): ReactNode => (
  <div className="mdt-grid mdt-grid-cols-4 mdt-gap-3">
    {[
      [40, 54, 68],
      [46, 40, 76],
      [62, 34, 56],
      [52, 30, 72],
    ].map((tile) => (
      <div
        key={String(tile[0])}
        className="mdt-rounded-[10px] mdt-border mdt-border-border mdt-p-3.5"
      >
        <Blank w={tile[0] ?? 40} h={7} />
        <span className="mdt-mt-1.5 mdt-block">
          <Blank w={tile[1] ?? 40} h={20} />
        </span>
        <span className="mdt-mt-1.5 mdt-block">
          <Blank w={tile[2] ?? 60} h={7} />
        </span>
      </div>
    ))}
  </div>
);

const ToolbarBlanks = (): ReactNode => (
  <>
    <div className="mdt-flex mdt-h-8 mdt-w-[290px] mdt-flex-none mdt-items-center mdt-gap-2 mdt-rounded-lg mdt-border mdt-border-border mdt-px-3">
      <Blank w={14} h={14} round />
      <Blank w={84} />
    </div>
    {[38, 30, 64].map((w) => (
      <div
        key={w}
        className="mdt-flex mdt-h-8 mdt-flex-none mdt-items-center mdt-gap-2 mdt-rounded-lg mdt-border mdt-border-border mdt-pl-3 mdt-pr-2.5"
      >
        <Blank w={w} />
        <Blank w={9} h={5} />
      </div>
    ))}
  </>
);

const TabBlanks = (): ReactNode => (
  <>
    {[
      [44, true],
      [62, false],
      [80, false],
      [48, false],
    ].map(([w, active]) => (
      <span
        key={String(w)}
        className={
          active === true
            ? 'mdt-flex mdt-items-center mdt-gap-1.5 mdt-border-b-2 mdt-border-foreground'
            : 'mdt-flex mdt-items-center mdt-gap-1.5 mdt-border-b-2 mdt-border-transparent'
        }
      >
        <Blank w={typeof w === 'number' ? w : 44} />
      </span>
    ))}
  </>
);

/** The primary surface: a card whose header row pins at `--mdt-thead-top`. */
const TableBlank = ({ rows = 8 }: { rows?: number }): ReactNode => (
  <div className="mdt-flex mdt-flex-none mdt-flex-col mdt-overflow-hidden mdt-rounded-[10px] mdt-border mdt-border-border">
    <div className="mdt-flex mdt-h-10 mdt-items-center mdt-gap-4 mdt-border-b mdt-border-border mdt-bg-muted/40 mdt-px-4">
      {[44, 38, 40, 58].map((w) => (
        <span key={w} className="mdt-flex-1">
          <Blank w={w} h={7} />
        </span>
      ))}
    </div>
    {Array.from({ length: rows }, (_, i) => {
      const widths = [
        [104, 58, 88, 74],
        [86, 52, 46, 92],
        [118, 60, 38, 48],
        [94, 54, 72, 64],
      ][i % 4] ?? [100, 56, 60, 70];
      return (
        <div
          key={`r${String(i)}`}
          className="mdt-flex mdt-h-[54px] mdt-items-center mdt-gap-4 mdt-border-b mdt-border-border/60 mdt-px-4"
        >
          <span className="mdt-flex mdt-flex-1 mdt-items-center mdt-gap-2.5">
            <Blank w={26} h={26} round />
            <Blank w={widths[0] ?? 100} h={9} />
          </span>
          <span className="mdt-flex-1">
            <Blank w={widths[1] ?? 56} h={20} round />
          </span>
          <span className="mdt-flex-1">
            <Blank w={widths[2] ?? 60} />
          </span>
          <span className="mdt-flex-1">
            <Blank w={widths[3] ?? 70} />
          </span>
        </div>
      );
    })}
  </div>
);

/** A page banner: a standing condition on the whole page, above the numbers. */
const BannerBlank = (): ReactNode => (
  <div className="mdt-flex mdt-flex-none mdt-items-center mdt-gap-2.5 mdt-rounded-lg mdt-border mdt-border-orange-30 mdt-bg-orange-10 mdt-px-3.5 mdt-py-2.5">
    <span className="mdt-size-1.5 mdt-flex-none mdt-rounded-full mdt-bg-orange-60" />
    <Blank w={318} />
  </div>
);

/** Applied filter chips, riding in the toolbar band right of the dropdowns. */
const ChipBlanks = (): ReactNode => (
  <>
    {[
      [34, 30],
      [28, 40],
    ].map(([a, b]) => (
      <span
        key={String(a)}
        className="mdt-flex mdt-h-7 mdt-flex-none mdt-items-center mdt-gap-1.5 mdt-rounded-lg mdt-border mdt-border-blue-30 mdt-bg-blue-10 mdt-pl-3 mdt-pr-1.5"
      >
        <Blank w={a ?? 30} h={7} />
        <Blank w={b ?? 30} h={7} />
        <span className="mdt-grid mdt-size-4 mdt-place-items-center">
          <Blank w={8} h={8} />
        </span>
      </span>
    ))}
    <Blank w={46} h={7} />
  </>
);

/** The empty state fills the surface and nothing more. */
const EmptyBlank = (): ReactNode => (
  <div className="mdt-flex mdt-flex-none mdt-flex-col mdt-items-center mdt-gap-3 mdt-rounded-[10px] mdt-border mdt-border-border mdt-px-5 mdt-py-14">
    <span className="mdt-size-11 mdt-rounded-[10px] mdt-border-2 mdt-border-dashed mdt-border-border" />
    <Blank w={168} h={10} />
    <Blank w={232} />
  </div>
);

/** Paging, inside the table's own footer, pinned to the bottom of the view. */
const PagerBlank = (): ReactNode => (
  <div className="mdt-sticky mdt-bottom-0 mdt-z-[19] mdt-flex mdt-flex-none mdt-items-center mdt-gap-3 mdt-border-t mdt-border-neutral-20 mdt-bg-background mdt-px-4 mdt-py-2">
    <Blank w={72} h={7} />
    <span className="mdt-flex-1" />
    <Blank w={28} h={7} />
    {[6, 7, 7, 7, 6].map((w, i) => (
      <span
        key={`pg${String(i)}`}
        className={
          i === 1
            ? 'mdt-grid mdt-size-7 mdt-place-items-center mdt-rounded-md mdt-bg-foreground'
            : 'mdt-grid mdt-size-7 mdt-place-items-center mdt-rounded-md mdt-border mdt-border-border'
        }
      >
        <span
          className={i === 1 ? 'mdt-block mdt-bg-background' : 'mdt-block mdt-bg-muted'}
          style={{ width: w, height: 8, borderRadius: 4 }}
        />
      </span>
    ))}
  </div>
);

/**
 * The REAL Table, with `expand` switched on.
 *
 * The frame's part in this is only publishing the dock line; the table reads it
 * and does the rest itself. These stories used to carry their own copy of that
 * behaviour, which is exactly the duplication the `expand` setting removed.
 */
const ExpandingTable = ({ rows = 16 }: { rows?: number }): ReactNode => (
  <Table label="Users" expand>
    <TableViewport tableWidth={880} label="Users" rowCount={rows}>
      <thead>
        <tr>
          {[44, 38, 40, 58].map((w) => (
            <th
              key={w}
              className="mdt-sticky mdt-top-0 mdt-z-[30] mdt-h-10 mdt-border-b mdt-border-neutral-20 mdt-bg-neutral-10 mdt-px-4 mdt-text-left dark:mdt-bg-neutral-140"
            >
              <Blank w={w} h={7} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }, (_, i) => {
          const widths = [
            [104, 58, 88, 74],
            [86, 52, 46, 92],
            [118, 60, 38, 48],
            [94, 54, 72, 64],
          ][i % 4] ?? [100, 56, 60, 70];
          return (
            <tr key={`r${String(i)}`} className="mdt-h-[54px] mdt-border-b mdt-border-neutral-20">
              <td className="mdt-px-4">
                <span className="mdt-flex mdt-items-center mdt-gap-2.5">
                  <Blank w={26} h={26} round />
                  <Blank w={widths[0] ?? 100} h={9} />
                </span>
              </td>
              <td className="mdt-px-4">
                <Blank w={widths[1] ?? 56} h={20} round />
              </td>
              <td className="mdt-px-4">
                <Blank w={widths[2] ?? 60} />
              </td>
              <td className="mdt-px-4">
                <Blank w={widths[3] ?? 70} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </TableViewport>
    <PagerBlank />
  </Table>
);

const meta = {
  title: 'Foundation/Page structure',
  component: PageFrame,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          '**Behaviour reference — Claude artifact:** [Console Page Frame](https://claude.ai/code/artifact/9d95439c-c22c-4137-a46b-d7b7276cfc15), a frame you can actually scroll, with a card for every arrangement and every scroll behaviour. Open it to see how the page is meant to behave — it is what this component was designed and approved from.',
          '',
          'The default page layout of the merged console, and the layer above the components:',
          'where things go, rather than what they look like.',
          '',
          'Every screen is a navigation rail that never moves beside **one scroll container** —',
          'this frame — holding four bands in a fixed order. Slots are optional; their order is not.',
          '',
          '| Band | What it holds | Height | Pins at |',
          '| --- | --- | --- | --- |',
          '| `PageHeader` (B1) | The breadcrumb, and the hero actions once they dock | 60 | 0 |',
          '| `PageHero` (B2) | The one H1, its badge and line, the action cluster, then banners and the KPI strip | content | never |',
          '| `PageBand` (B2t/B3) | Tabs **or** the toolbar — exactly one, never both | 60 | 58 |',
          '| `PageSurface` (B4) | The toolbar row when there are tabs, then the table | content | never |',
          '',
          '**The ladder is derived, never typed.** `--mdt-thead-top` is calculated from the two band',
          'heights, so a table inside the frame docks in the right place without knowing what the',
          'bands are, and a change to a height cannot leave an offset behind.',
          '',
          '**The band tucks 2px under the header.** A butt joint at exactly 60 leaks a sub-pixel seam',
          'of scrolling content at fractional zoom levels.',
          '',
          '**The surface takes its inset from the band above it**, through a CSS sibling rule rather',
          'than a prop. Under a toolbar band: 6 above, 20 below — the toolbar carries 14 of its own',
          'air, so 6 + 14 reads as an even 20 on both sides of it. Under a tab band: **16 on both**',
          '**sides**, because a tab band ends in the active tab’s 2px underline and at 6px of air that',
          'line and the table’s top edge read as one, welding the tabs to the surface.',
          '',
          '**With the table\u2019s `expand` switched on it takes the full height under the pin line — ' +
            'whatever it holds.** One rule, two consequences: it expands on scroll **even holding a single ' +
            'row**, and its paging is **always visible at the bottom of the page** rather than floating up ' +
            'under a short list. That behaviour belongs to the Table; the frame only publishes the pin line.',
          '',
          'Content in these stories is drawn as flat blanks on purpose — not the `Skeleton` component,',
          'which pulses because it means "this is still loading". Nothing here is loading.',
        ].join('\n'),
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default list page: header, hero with its numbers, the toolbar band, then
 * the table. Scroll it — the hero slides away, the toolbar catches on the
 * header and holds, and the action cluster reappears on the right of the
 * header band so the page's main verbs never leave view.
 */
export const TheWholeStack: Story = {
  render: () => (
    <Shell>
      <PageFrame>
        <PageHeader leading={<Blank w={28} h={28} />}>
          <Crumbs />
        </PageHeader>
        <PageHero
          title="Users"
          badge={<Blank w={58} h={18} round />}
          subtitle={
            <>
              <Blank w={432} />
              <span className="mdt-mt-1.5 mdt-block">
                <Blank w={268} />
              </span>
            </>
          }
          actions={<Actions />}
        >
          <KpiStripBlank />
        </PageHero>
        <PageBand variant="toolbar" end={<Blank w={52} h={7} />}>
          <ToolbarBlanks />
        </PageBand>
        <PageSurface>
          <TableBlank rows={10} />
        </PageSurface>
      </PageFrame>
    </Shell>
  ),
};

/**
 * No numbers worth showing means no strip. The hero collapses to its head row
 * and the sticky ladder is unchanged — nothing below it moves.
 */
export const WithoutKpiCards: Story = {
  render: () => (
    <Shell>
      <PageFrame>
        <PageHeader leading={<Blank w={28} h={28} />}>
          <Crumbs />
        </PageHeader>
        <PageHero title="Roles" subtitle={<Blank w={380} />} actions={<Actions />} />
        <PageBand variant="toolbar" end={<Blank w={52} h={7} />}>
          <ToolbarBlanks />
        </PageBand>
        <PageSurface>
          <TableBlank rows={10} />
        </PageSurface>
      </PageFrame>
    </Shell>
  ),
};

/**
 * The leanest hero there is: the title and the action cluster, nothing else.
 * Exactly one H1 per page, and it always lives here — never in a card, never
 * in a drawer.
 */
export const HeadingOnly: Story = {
  render: () => (
    <Shell>
      <PageFrame>
        <PageHeader leading={<Blank w={28} h={28} />}>
          <Crumbs />
        </PageHeader>
        <PageHero title="Custom fields" actions={<Actions />} />
        <PageBand variant="toolbar" end={<Blank w={52} h={7} />}>
          <ToolbarBlanks />
        </PageBand>
        <PageSurface>
          <TableBlank rows={10} />
        </PageSurface>
      </PageFrame>
    </Shell>
  ),
};

/**
 * A page without tabs always renders the toolbar band, and any page whose
 * surface is a table carries a toolbar somewhere — search at minimum.
 *
 * One anatomy everywhere: an expanded working search, then always-visible
 * filter dropdowns, then the applied chips, then the count and view actions on
 * the right. Never a second row, never a Filters popup.
 *
 * The surface below is inset 6 above and 20 below.
 */
export const WithAToolbarBand: Story = {
  render: () => (
    <Shell>
      <PageFrame>
        <PageHeader leading={<Blank w={28} h={28} />}>
          <Crumbs />
        </PageHeader>
        <PageHero title="Users" actions={<Actions />}>
          <KpiStripBlank />
        </PageHero>
        <PageBand variant="toolbar" end={<Blank w={52} h={7} />}>
          <ToolbarBlanks />
        </PageBand>
        <PageSurface>
          <TableBlank rows={8} />
        </PageSurface>
      </PageFrame>
    </Shell>
  ),
};

/**
 * When the page has tabs, the tab band takes the slot under the hero instead —
 * exactly one of the two is ever there. Tabs may carry a count pill and never
 * carry a button.
 *
 * The band ends in the active tab's 2px underline, so the surface below is
 * **inset 16 top and bottom** rather than 6 and 20. At 6 that underline and the
 * table's own top edge read as a single line.
 */
export const WithATabBar: Story = {
  render: () => (
    <Shell>
      <PageFrame>
        <PageHeader leading={<Blank w={28} h={28} />}>
          <Crumbs />
        </PageHeader>
        <PageHero title="Users" actions={<Actions />}>
          <KpiStripBlank />
        </PageHero>
        <PageBand variant="tabs">
          <TabBlanks />
        </PageBand>
        <PageSurface>
          <TableBlank rows={8} />
        </PageSurface>
      </PageFrame>
    </Shell>
  ),
};

/**
 * They never stack as two pinned bands. The tab band pins; the toolbar becomes
 * the first row of the surface and scrolls with it, so each tab gets the
 * filters it needs without a second frozen strip eating the screen.
 *
 * Toolbar and table sit inside one section, inset 16 top and bottom.
 */
export const TabBarAndToolbarTogether: Story = {
  render: () => (
    <Shell>
      <PageFrame>
        <PageHeader leading={<Blank w={28} h={28} />}>
          <Crumbs />
        </PageHeader>
        <PageHero title="Users" actions={<Actions />} />
        <PageBand variant="tabs">
          <TabBlanks />
        </PageBand>
        <PageSurface>
          <div className="mdt-flex mdt-h-11 mdt-flex-none mdt-items-center mdt-gap-2.5">
            <ToolbarBlanks />
          </div>
          <TableBlank rows={8} />
        </PageSurface>
      </PageFrame>
    </Shell>
  ),
};

/**
 * Scroll this one. Three things catch and hold — the header band at 0, the
 * toolbar band at 58, and a table's header row at 118 — and the hero travels
 * up underneath them, handing its action cluster to the header on the way out.
 *
 * Nothing else on the page is ever pinned.
 */
export const ScrollBehaviour: Story = {
  render: () => (
    <Shell>
      <PageFrame>
        <PageHeader leading={<Blank w={28} h={28} />}>
          <Crumbs />
        </PageHeader>
        <PageHero
          title="Users"
          badge={<Blank w={58} h={18} round />}
          subtitle={<Blank w={432} />}
          actions={<Actions />}
        >
          <KpiStripBlank />
        </PageHero>
        <PageBand variant="toolbar" end={<Blank w={52} h={7} />}>
          <ToolbarBlanks />
        </PageBand>
        <PageSurface>
          <TableBlank rows={16} />
        </PageSurface>
      </PageFrame>
    </Shell>
  ),
};

/**
 * A standing condition on the whole page, above the numbers — a paused sync, a
 * fired alert. Two at most.
 *
 * An explanation of how the surface works is a different thing and goes at the
 * top of the body, so it never pushes the numbers below the fold.
 */
export const WithAPageBanner: Story = {
  render: () => (
    <Shell>
      <PageFrame>
        <PageHeader leading={<Blank w={28} h={28} />}>
          <Crumbs />
        </PageHeader>
        <PageHero title="Users" actions={<Actions />}>
          <BannerBlank />
          <KpiStripBlank />
        </PageHero>
        <PageBand variant="toolbar" end={<Blank w={52} h={7} />}>
          <ToolbarBlanks />
        </PageBand>
        <PageSurface>
          <TableBlank rows={8} />
        </PageSurface>
      </PageFrame>
    </Shell>
  ),
};

/**
 * Applied filters ride in the toolbar band, right of the dropdowns, each one
 * removable, with a Clear all closing out the set.
 *
 * Never a second row, never a sidebar. The rarely-used filters live behind a
 * More filters button that opens a drawer and shows its applied count.
 */
export const WithFilterChips: Story = {
  render: () => (
    <Shell>
      <PageFrame>
        <PageHeader leading={<Blank w={28} h={28} />}>
          <Crumbs />
        </PageHeader>
        <PageHero title="Users" actions={<Actions />} />
        <PageBand variant="toolbar" end={<Blank w={52} h={7} />}>
          <ToolbarBlanks />
          <ChipBlanks />
        </PageBand>
        <PageSurface>
          <TableBlank rows={8} />
        </PageSurface>
      </PageFrame>
    </Shell>
  ),
};

/**
 * The empty state fills the surface and nothing more.
 *
 * The heading, the numbers and the toolbar all stay where they were. An empty
 * state that swallows the whole page is a defect — it takes away the very
 * controls that would get someone out of it.
 */
export const AnEmptySurface: Story = {
  render: () => (
    <Shell>
      <PageFrame>
        <PageHeader leading={<Blank w={28} h={28} />}>
          <Crumbs />
        </PageHeader>
        <PageHero title="Users" actions={<Actions />}>
          <KpiStripBlank />
        </PageHero>
        <PageBand variant="toolbar" end={<Blank w={52} h={7} />}>
          <ToolbarBlanks />
          <ChipBlanks />
        </PageBand>
        <PageSurface>
          <EmptyBlank />
        </PageSurface>
      </PageFrame>
    </Shell>
  ),
};

/**
 * **Scroll this one.** At rest the table is a rounded card at the page's inset.
 * As it approaches the pin line it takes back the 24 on each side, drops its
 * side borders and flattens its corners — it stops being an object on the page
 * and becomes the page.
 *
 * This is the real `Table` with `expand` on. The frame's only part is
 * publishing the pin line, which the table reads for itself.
 */
export const TheCardBecomesThePage: Story = {
  render: () => (
    <Shell>
      <PageFrame>
        <PageHeader leading={<Blank w={28} h={28} />}>
          <Crumbs />
        </PageHeader>
        <PageHero title="Users" subtitle={<Blank w={432} />} actions={<Actions />}>
          <KpiStripBlank />
        </PageHero>
        <PageBand variant="toolbar" end={<Blank w={52} h={7} />}>
          <ToolbarBlanks />
        </PageBand>
        <PageSurface>
          <ExpandingTable rows={14} />
        </PageSurface>
      </PageFrame>
    </Shell>
  ),
};

/**
 * **Scroll to the bottom.** Once the table is fully docked the page stops and
 * the rows take over the scroll inside it.
 *
 * The header, the toolbar and the paging are all frozen in place, so a long
 * read never loses its column names. Release it and the table re-forms as a
 * card showing its top, never mid-list.
 */
export const TheRowsTakeOverTheScroll: Story = {
  render: () => (
    <Shell>
      <PageFrame>
        <PageHeader leading={<Blank w={28} h={28} />}>
          <Crumbs />
        </PageHeader>
        <PageHero title="Users" actions={<Actions />}>
          <KpiStripBlank />
        </PageHero>
        <PageBand variant="toolbar" end={<Blank w={52} h={7} />}>
          <ToolbarBlanks />
        </PageBand>
        <PageSurface>
          <ExpandingTable rows={26} />
        </PageSurface>
      </PageFrame>
    </Shell>
  ),
};

/**
 * **One row, and it still expands.** The table holds a single entry and behaves
 * exactly like the long one — full height under the pin line, widening as it
 * docks, paging pinned to the bottom of the view.
 *
 * Expansion is a property of the table, not of how much happens to be in it, so
 * a filtered-down list does not suddenly behave like a different component.
 */
export const EvenOneRowExpands: Story = {
  render: () => (
    <Shell>
      <PageFrame>
        <PageHeader leading={<Blank w={28} h={28} />}>
          <Crumbs />
        </PageHeader>
        <PageHero title="Users" actions={<Actions />}>
          <KpiStripBlank />
        </PageHero>
        <PageBand variant="toolbar" end={<Blank w={52} h={7} />}>
          <ToolbarBlanks />
          <ChipBlanks />
        </PageBand>
        <PageSurface>
          <ExpandingTable rows={1} />
        </PageSurface>
      </PageFrame>
    </Shell>
  ),
};
