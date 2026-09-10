import type { HTMLAttributes, ReactNode } from 'react';

/**
 * Which band sits in the slot under the hero.
 *
 * Band occupancy: a page renders exactly ONE of these, never both as sibling
 * bands. A page with tabs renders the tab band and puts its toolbar inside the
 * surface as the first row of the tab body; a page without tabs renders the
 * toolbar band.
 */
export type PageBandVariant = 'tabs' | 'toolbar';

export interface PageFrameProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode | undefined;
  className?: string | undefined;
}

export interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** The breadcrumb. Omit at depth &lt; 2 — the band still renders. */
  children?: ReactNode | undefined;
  /** Sits hard against the rail edge, left of the breadcrumb. */
  leading?: ReactNode | undefined;
  /**
   * Render the hero's action cluster here once the hero has scrolled away.
   * On by default; pass `false` for a page whose actions should leave with it.
   */
  dockActions?: boolean | undefined;
  className?: string | undefined;
}

export interface PageHeroProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The page's one H1. */
  title: ReactNode;
  badge?: ReactNode | undefined;
  subtitle?: ReactNode | undefined;
  /** One to three buttons, least to most emphatic, primary last. */
  actions?: ReactNode | undefined;
  icon?: ReactNode | undefined;
  /** Page banners and the KPI strip, in that order. */
  children?: ReactNode | undefined;
  className?: string | undefined;
}

export interface PageBandProps extends HTMLAttributes<HTMLDivElement> {
  variant: PageBandVariant;
  children?: ReactNode | undefined;
  /** The right-hand group — count, meta, view actions. */
  end?: ReactNode | undefined;
  className?: string | undefined;
}

export interface PageSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode | undefined;
  /**
   * Normally left alone: the surface takes its inset from whichever band is
   * actually rendered above it, through a CSS sibling rule, so the two cannot
   * drift apart. Set it only when the band lives outside this frame.
   */
  under?: PageBandVariant | undefined;
  className?: string | undefined;
}
