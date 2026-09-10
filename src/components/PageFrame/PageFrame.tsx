import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/utils';
import './pageFrame.css';
import type {
  PageBandProps,
  PageFrameProps,
  PageHeaderProps,
  PageHeroProps,
  PageSurfaceProps,
} from './PageFrame.types';

/** The header band's height, mirrored from the CSS so the handoff can measure. */
const B1_HEIGHT = 60;

interface FrameContextValue {
  /** The hero's action cluster, published for the header band to dock. */
  actions: ReactNode;
  publish: (node: ReactNode) => void;
  /** The frame element, so the hero can measure against the one scrollport. */
  frame: HTMLDivElement | null;
}

const FrameContext = createContext<FrameContextValue | null>(null);

/**
 * PageFrame — the content column, and the only scroll container on the page.
 *
 * The rail beside it never scrolls; the page body never scrolls the whole app.
 * Everything pinned is a `position: sticky` child of THIS element, never a
 * nested scroller of its own.
 *
 * It publishes the sticky ladder as custom properties, so a table inside it
 * docks at `--mdt-thead-top` without being told what the bands are.
 *
 * @example
 * ```tsx
 * <PageFrame>
 *   <PageHeader><Breadcrumb /></PageHeader>
 *   <PageHero title="Users" actions={<Button>Invite</Button>}>
 *     <KpiStrip />
 *   </PageHero>
 *   <PageBand variant="toolbar"><Input placeholder="Search" /></PageBand>
 *   <PageSurface><Table /></PageSurface>
 * </PageFrame>
 * ```
 */
const PageFrame = forwardRef<HTMLDivElement, PageFrameProps>(
  ({ className, children, ...props }, ref) => {
    const [actions, setActions] = useState<ReactNode>(null);
    const [frame, setFrame] = useState<HTMLDivElement | null>(null);

    const publish = useCallback((node: ReactNode) => {
      setActions((prev) => (prev === node ? prev : node));
    }, []);

    const attach = useCallback(
      (node: HTMLDivElement | null) => {
        setFrame(node);
        if (typeof ref === 'function') ref(node);
        else if (ref !== null) ref.current = node;
      },
      [ref]
    );

    const value = useMemo<FrameContextValue>(
      () => ({ actions, publish, frame }),
      [actions, publish, frame]
    );

    return (
      <FrameContext.Provider value={value}>
        <div
          ref={attach}
          data-hero-away="false"
          className={cn(
            'mdt-page-frame',
            'mdt-flex mdt-min-h-0 mdt-min-w-0 mdt-flex-1 mdt-flex-col',
            'mdt-overflow-y-auto mdt-overflow-x-hidden',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </FrameContext.Provider>
    );
  }
);
PageFrame.displayName = 'PageFrame';

/**
 * B1 — the header band. 60 tall, pinned at the top, and always rendered: it is
 * the page's fixed anchor even at a depth where the breadcrumb itself is
 * omitted. It carries the breadcrumb and nothing global — global controls live
 * in the navigation rail.
 *
 * It is the one band that keeps a hairline; the bands below it have none.
 */
const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, children, leading, dockActions = true, ...props }, ref) => {
    const ctx = useContext(FrameContext);
    const docked = dockActions ? ctx?.actions : null;

    return (
      <div
        ref={ref}
        className={cn(
          'mdt-page-header',
          'mdt-sticky mdt-z-[36] mdt-flex mdt-flex-none mdt-items-center mdt-gap-2.5',
          'mdt-border-b mdt-border-border mdt-bg-card mdt-pl-4 mdt-pr-6',
          className
        )}
        {...props}
      >
        {leading}
        {children}
        {docked !== null && docked !== undefined && docked !== false ? (
          <div
            className="mdt-page-docked mdt-ml-auto mdt-flex mdt-flex-none mdt-items-center mdt-gap-2"
            data-testid="page-docked-actions"
          >
            {docked}
          </div>
        ) : null}
      </div>
    );
  }
);
PageHeader.displayName = 'PageHeader';

/**
 * B2 — the hero band. The page's one H1, its optional badge and supporting
 * line, and an action cluster of one to three buttons ordered least to most
 * emphatic. Banners and the KPI strip go in as children, in that order.
 *
 * It is never pinned. Once you are reading the surface, the surface is what
 * should own the screen — but the action cluster is handed to the header band
 * on the way out, so the page's main verbs never leave view.
 */
const PageHero = forwardRef<HTMLDivElement, PageHeroProps>(
  ({ className, title, badge, subtitle, actions, icon, children, ...props }, ref) => {
    const ctx = useContext(FrameContext);
    const headRef = useRef<HTMLDivElement>(null);
    const publish = ctx?.publish;
    const frame = ctx?.frame ?? null;

    /* publish the cluster for the header band to dock, and take it back on the
     * way out — never mid-render, or the docked copy blinks on every update */
    useEffect(() => {
      if (publish === undefined) return undefined;
      publish(actions ?? null);
      return () => {
        publish(null);
      };
    }, [publish, actions]);

    /* away = the head row has slid under the pinned header band */
    useEffect(() => {
      const head = headRef.current;
      if (frame === null || head === null) return undefined;

      let raf = 0;
      const check = (): void => {
        raf = 0;
        const gone =
          head.getBoundingClientRect().bottom <= frame.getBoundingClientRect().top + B1_HEIGHT;
        frame.dataset.heroAway = String(gone);
      };
      const onScroll = (): void => {
        if (raf === 0) raf = requestAnimationFrame(check);
      };

      check();
      frame.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        frame.removeEventListener('scroll', onScroll);
        if (raf !== 0) cancelAnimationFrame(raf);
        frame.dataset.heroAway = 'false';
      };
    }, [frame]);

    return (
      <div
        ref={ref}
        className={cn(
          'mdt-flex mdt-flex-none mdt-flex-col mdt-gap-4',
          'mdt-bg-card mdt-px-6 mdt-pb-1.5 mdt-pt-5',
          className
        )}
        {...props}
      >
        <div ref={headRef} className="mdt-flex mdt-items-start mdt-justify-between mdt-gap-4">
          <div className="mdt-min-w-0">
            <div className="mdt-flex mdt-min-w-0 mdt-items-center mdt-gap-2.5">
              {icon !== undefined && icon !== null ? (
                <span className="mdt-inline-flex mdt-flex-none mdt-text-muted-foreground">
                  {icon}
                </span>
              ) : null}
              <h1 className="mdt-truncate mdt-text-xl mdt-font-semibold mdt-leading-tight mdt-text-foreground">
                {title}
              </h1>
              {badge}
            </div>
            {subtitle !== undefined && subtitle !== null ? (
              <div className="mdt-mt-1 mdt-max-w-[720px] mdt-text-xs mdt-leading-normal mdt-text-muted-foreground">
                {subtitle}
              </div>
            ) : null}
          </div>
          {actions !== undefined && actions !== null ? (
            <div className="mdt-flex mdt-flex-none mdt-items-center mdt-gap-2">{actions}</div>
          ) : null}
        </div>
        {children}
      </div>
    );
  }
);
PageHero.displayName = 'PageHero';

/**
 * B2t / B3 — the band under the hero. A page renders exactly ONE of these,
 * never both as sibling bands: the tab band when the page has tabs, the
 * toolbar band when it does not. A page whose surface is a table always
 * carries a toolbar somewhere — the band when it is tab-less, the first row of
 * the surface when it has tabs.
 *
 * The variant is not only a look: the surface below reads it and sets its own
 * inset from it.
 */
const PageBand = forwardRef<HTMLDivElement, PageBandProps>(
  ({ className, variant, children, end, ...props }, ref) => (
    <div
      ref={ref}
      data-band={variant}
      className={cn(
        'mdt-page-band',
        'mdt-sticky mdt-z-[35] mdt-flex mdt-flex-none mdt-items-stretch mdt-bg-card mdt-px-6',
        variant === 'tabs' ? 'mdt-gap-6' : 'mdt-items-center mdt-gap-2.5',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'mdt-flex mdt-min-w-0 mdt-flex-1 mdt-gap-2.5',
          variant === 'tabs' ? 'mdt-items-stretch mdt-gap-6' : 'mdt-items-center'
        )}
      >
        {children}
      </div>
      {end !== undefined && end !== null ? (
        <div className="mdt-flex mdt-flex-none mdt-items-center mdt-gap-2">{end}</div>
      ) : null}
    </div>
  )
);
PageBand.displayName = 'PageBand';

/**
 * B4 — the surface section. A natural-height stack riding the page scroll, not
 * a scroller of its own.
 *
 * Its inset comes from whichever band is rendered above it, through a CSS
 * sibling rule rather than a prop, so the two cannot drift: 6 above and 20
 * below under a toolbar band, 16 on both sides under a tab band.
 */
const PageSurface = forwardRef<HTMLDivElement, PageSurfaceProps>(
  ({ className, children, under, ...props }, ref) => (
    <div
      ref={ref}
      {...(under === undefined ? {} : { 'data-under': under })}
      className={cn(
        'mdt-page-surface',
        'mdt-flex mdt-flex-1 mdt-flex-col mdt-gap-3 mdt-px-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
PageSurface.displayName = 'PageSurface';

export { PageFrame, PageHeader, PageHero, PageBand, PageSurface };
