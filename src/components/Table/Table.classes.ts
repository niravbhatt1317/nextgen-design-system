/**
 * The class strings behind Table's pinned surfaces.
 *
 * Lifted out of `Table.tsx` when that file crossed the 1000-line limit. Only
 * plain strings live here - the CVA definitions stay in the component, because
 * `scripts/extract-variants.mjs` parses them statically out of that file and
 * would publish empty variant arrays if they moved.
 *
 * Every one of these encodes something learned by getting it wrong first. The
 * comments are the point; do not compress them away.
 */

/**
 * The shadow a pinned element casts, and only while something is under it.
 *
 * `mdt-group` on the scroll container plus these `group-data-*` variants keep
 * the rule on the cell's own class list. A descendant selector would outrank
 * the cell's classes - the same specificity trap density avoids by using
 * context.
 */
// The pinned surface matches the page in BOTH themes. No tonal lift: a header
// that changes colour when it pins reads as a different surface rather than the
// same one held in place.
export const STUCK_BASE = 'mdt-sticky mdt-z-sticky-header mdt-bg-background';

// The border is not decoration. A sticky cell leaves its row behind, and the
// row's own border does not travel with it - so a pinned header had no edge.
//
// The depth cue is a gradient band drawn by `::after`, NOT a `box-shadow`. Under
// `border-separate` every cell is its own box, so a box-shadow casts on all four
// sides and the left and right halves of adjacent cells stack into visible
// vertical seams between every column. A band pinned to the cell's full width
// only ever fades downward, and neighbouring bands butt together into one
// continuous edge.
// 16px. Long enough to read as depth rather than a second border line - 6px did
// read as a line - without the 24px reach that made the dark band look heavy.
export const STUCK_SHADOW_BASE =
  "after:mdt-pointer-events-none after:mdt-absolute after:mdt-inset-x-0 after:mdt-h-4 after:mdt-opacity-0 after:mdt-transition-opacity after:mdt-content-['']";

// The edge only lightens once the row is actually pinned.
//
// At rest a sticky header should be indistinguishable from an ordinary one - a
// third-weight edge under a header that is not doing anything yet reads as
// disconnected from the table. The moment content scrolls underneath, the wash
// arrives and the border steps back to let it carry the separation.
//
// Light mode only. In dark the wash can reach about four luminance points, so
// the edge has to keep its full weight or the pinned row loses its boundary
// altogether.
export const STUCK_BORDER_TOP =
  'mdt-border-border group-data-[scrolled-top=true]:mdt-border-border/30 dark:group-data-[scrolled-top=true]:mdt-border-border';
export const STUCK_BORDER_BOTTOM =
  'mdt-border-border group-data-[scrolled-bottom=true]:mdt-border-border/30 dark:group-data-[scrolled-bottom=true]:mdt-border-border';

// One wash, darkening, in both themes. The band is the same 24px height in each
// - only the opacity differs, and only because the two backgrounds give it very
// different amounts of room.
//
// Light has the whole page to fall through. Dark does not: the page is
// luminance 21 and `--mdt-black` is 14, about seven points of range. But a small
// absolute dip near black is a large RELATIVE change, so dark needs far less
// opacity than the raw numbers suggest, not more. At full strength it read as a
// heavy band. Seven luminance points is the hard ceiling here - `--mdt-black` is
// lum 14 against a page of lum 21 - so 70% lands at about five, which is as much
// depth as this palette can give a dark surface without a tonal lift.
//
// This cannot be a `box-shadow`, and so cannot reuse the --mdt-shadow-* tokens:
// on a table cell a box-shadow casts on all four sides, and on a `<tr>` browsers
// still render it per cell. Either way the left and right halves stack into a
// visible seam at every column boundary. A gradient band pinned across the
// cell's width only ever fades one way, and adjacent bands butt together.
export const STUCK_WASH = 'after:mdt-from-black/5 dark:after:mdt-from-black/70';

export const STUCK_TOP = [
  STUCK_BASE,
  'mdt-top-0 mdt-border-b',
  STUCK_BORDER_TOP,
  STUCK_SHADOW_BASE,
  'after:mdt-top-full after:mdt-bg-gradient-to-b after:mdt-to-transparent',
  STUCK_WASH,
  'group-data-[scrolled-top=true]:after:mdt-opacity-100',
].join(' ');

export const STUCK_BOTTOM = [
  STUCK_BASE,
  'mdt-bottom-0 mdt-border-t',
  STUCK_BORDER_BOTTOM,
  STUCK_SHADOW_BASE,
  'after:mdt-bottom-full after:mdt-bg-gradient-to-t after:mdt-to-transparent',
  STUCK_WASH,
  'group-data-[scrolled-bottom=true]:after:mdt-opacity-100',
].join(' ');

// A column pinned to the left edge.
//
// The same shape as the row treatment above, turned ninety degrees: an edge, and
// a band that only appears once something has slid underneath. The band is drawn
// by `::before` because `::after` already carries the row's wash - a frozen cell
// inside a pinned row uses both at once.
//
// The header variant sits on `z-sticky-header` rather than `z-sticky`. A frozen
// body cell and the frozen header cell cross at the top-left corner, and equal
// z-index would let the body cell paint over the header, because tbody comes
// after thead in the DOM.
/**
 * Lets a component keep its own ref while still honouring the caller's.
 *
 * `TableHead` measures its own width during a drag, so it needs a ref of its
 * own - but forwarding one is part of its contract.
 */
/** How far one arrow-key press moves a column edge. */
export const RESIZE_STEP = 16;

/**
 * The drag handle on a column's trailing edge.
 *
 * `role="separator"` with `aria-valuenow` rather than a button, because that is
 * what a moveable boundary is - the same pattern as a window splitter. It has to
 * be focusable and it has to carry a name, since a table always has more than
 * one of them.
 *
 * Wide enough to grab (8px) but drawn as a hairline, and it only shows its line
 * on hover or focus so a resting header is not a row of dividers.
 */
// The grab area stays wholly inside its own cell. Straddling the boundary is
// the prettier arrangement and it does not work: every `th` is `position:
// relative`, so the *next* header paints over the half that overhangs, and the
// centre of the handle - where you aim - belongs to the neighbouring cell. It
// swallowed every pointer event silently.
export const RESIZE_HANDLE = [
  'mdt-absolute mdt-right-0 mdt-top-0 mdt-h-full mdt-w-2',
  'mdt-cursor-col-resize mdt-touch-none mdt-select-none',
  'focus-visible:mdt-outline-none',
  // The visible line lives in ::after so the grab area can stay wider than it.
  "after:mdt-absolute after:mdt-inset-y-1 after:mdt-right-0 after:mdt-w-px after:mdt-bg-border after:mdt-opacity-0 after:mdt-transition-opacity after:mdt-content-['']",
  'hover:after:mdt-opacity-100 focus-visible:after:mdt-opacity-100',
  'focus-visible:after:mdt-bg-ring focus-visible:after:mdt-w-0.5',
].join(' ');

// `left` is not here. With one frozen column it was always zero; with two, the
// second sits at the measured width of the first, which is a runtime value and
// arrives as an inline style. Everything else about being pinned is static.
export const FROZEN_EDGE = 'mdt-sticky mdt-bg-background';

// Only the *last* frozen column draws the boundary. Put the border on every
// pinned cell and two frozen columns get a divider between them that no other
// pair of columns has - the frozen block should read as one surface, not as
// two columns that happen to be stuck.
export const FROZEN_LAST_EDGE = [
  'mdt-border-r mdt-border-border',
  'group-data-[scrolled-x=true]:mdt-border-border/30',
  'dark:group-data-[scrolled-x=true]:mdt-border-border',
].join(' ');

// The band is separate from the edge because the corner cell wants the edge
// without it.
//
// A frozen column and a sticky header each cast their own wash, and where they
// cross there is no way to join two straight gradients smoothly - one fades
// down, the other fades right, and they meet at a hard step. Extending either
// one over the corner just stacks two gradients into a darker patch.
//
// MUI sidesteps this by rendering a single scroll-shadow element spanning the
// whole pinned boundary, but it can do that because its grid is built from
// divs. In a real `<table>` you cannot place an overlay at a column edge
// without measuring column widths at runtime, so the wash has to live on the
// cells - and the corner has to be resolved rather than blended.
//
// It is resolved by leaving it out: the corner cell keeps its edge and its
// header wash, and the vertical band simply starts below the header.
export const FROZEN_BAND = [
  "before:mdt-pointer-events-none before:mdt-absolute before:mdt-top-0 before:mdt-bottom-0 before:mdt-left-full before:mdt-w-4 before:mdt-opacity-0 before:mdt-transition-opacity before:mdt-content-['']",
  'before:mdt-bg-gradient-to-r before:mdt-to-transparent',
  'before:mdt-from-black/5 dark:before:mdt-from-black/70',
  'group-data-[scrolled-x=true]:before:mdt-opacity-100',
].join(' ');

export const FROZEN_CELL = `${FROZEN_EDGE} mdt-z-sticky`;
export const FROZEN_HEAD = `${FROZEN_EDGE} mdt-z-sticky-header`;
// The band and the boundary belong to the last pinned column only.
export const FROZEN_LAST = `${FROZEN_LAST_EDGE} ${FROZEN_BAND}`;

/**
 * A frozen cell inside a sticky header, written out in full rather than layered.
 *
 * Composing `STUCK_TOP` and a frozen class would put two z-index utilities on
 * one element, and `cn()` cannot merge them: tailwind-merge recognises
 * `z-{number}`, not two custom names like `z-sticky-header` and
 * `z-sticky-corner`. Both survived, CSS source order picked the lower one, and
 * the corner ended up level with the header cells beside it - which come later
 * in the DOM, so they painted straight over the pinned column.
 *
 * It also drops the vertical band. Two straight gradients cannot join smoothly
 * where they cross, so the corner is resolved by leaving one out rather than
 * blending.
 */
export const FROZEN_STICKY_CORNER = [
  'mdt-sticky mdt-top-0 mdt-z-sticky-corner mdt-bg-background',
  'mdt-border-b mdt-border-border',
  'group-data-[scrolled-top=true]:mdt-border-border/30',
  'dark:group-data-[scrolled-top=true]:mdt-border-border',
  STUCK_SHADOW_BASE,
  'after:mdt-top-full after:mdt-bg-gradient-to-b after:mdt-to-transparent',
  STUCK_WASH,
  // Only while nothing has scrolled behind it.
  //
  // Once the table scrolls sideways, an ordinary header cell slides underneath
  // the pinned corner and casts its own wash across the same strip. Two washes
  // at 5% stack to about 10%, and the header's shadow reads visibly darker over
  // the frozen column than anywhere else - measured at 237 against 246.
  //
  // At rest the corner is the only thing there, so it has to draw its own.
  'group-data-[corner-wash=true]:after:mdt-opacity-100',
].join(' ');
