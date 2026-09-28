import { create } from 'storybook/theming/create';

/**
 * Storybook's own chrome — the sidebar, toolbar, panels, and the Docs pages.
 *
 * Storybook renders its chrome outside the preview iframe, so it cannot read
 * the CSS variables in `globals.css`. The values below are therefore mirrored
 * from the design system by hand.
 *
 * KEEP IN SYNC WITH: scripts/dark-theme/tokens.cjs (the colour map) first —
 * every dark value below is one of its dark tiers, named beside it — then
 * src/styles/globals.css and TOKENS.md for the light values.
 * Every value here is a real system token — no stray colours.
 *
 * Used by:
 *   manager.tsx → the interface
 *   preview.ts  → `parameters.docs.theme`, so Docs pages match
 */

// --- Light: mirrored token values (see TOKENS.md) -------------------------
const BLUE_50 = '#3d7dff'; // --mdt-blue-50    : primary / accent
const WHITE = '#ffffff'; // --mdt-white
const BLACK = '#070f1d'; // --mdt-black      : hsl(218 63% 7%)
const NEUTRAL_10 = '#f6f9fc'; // --mdt-neutral-10
const NEUTRAL_20 = '#ecf1f9'; // --mdt-neutral-20
const NEUTRAL_40 = '#cad3e2'; // --mdt-neutral-40 : light border
const NEUTRAL_100 = '#485975'; // --mdt-neutral-100: muted text

// --- Dark: the colour map's dark tiers (scripts/dark-theme/tokens.cjs) -----
// One constant per map token, each in the role its light twin above plays.
// The same hexes reach the components through the generated
// [data-theme='dark'] block in globals.css (scripts/theme-dark.cjs); the
// manager, drawn outside the preview iframe, has to carry them by hand.
const DARK_PAGE = '#07101F'; // elevation.surface        : the page — panels, toolbar, canvas frame
const DARK_SUNKEN = '#0B1627'; // elevation.surface.sunken : the rail a step below — the sidebar ground
const DARK_RAISED = '#172336'; // elevation.surface.raised : a lifted control — the selected boolean
const DARK_FIELD = '#07101F'; // color.background.input   : a field's ground (the map flags this row for Pranjal)
const DARK_HAIRLINE = '#1D2A3E'; // color.border             : the hairline between panels, and around fields
const DARK_HEADING_INK = '#E3E8F2'; // color.text.brand         : heading ink — the frame's own text
const DARK_TEXT = '#CAD3E2'; // color.text               : reading text — a value typed into a field
const DARK_TEXT_SUBTLE = '#8E9FBC'; // color.text.subtle        : secondary text — muted labels, the toolbar
const DARK_LINK = '#008CFF'; // color.link               : links, the selected item, hover

// --mdt-radius is 0.5rem (8px); inputs use the derived `md` step (8 - 2)
const RADIUS = 8;
const RADIUS_MD = 6;

const brand = {
  brandTitle: 'Motadata React Library',
  brandUrl: 'https://github.com/pranjalgupta-motadata/ai-ready-design-system',
  brandTarget: '_blank' as const,
};

export const lightTheme = create({
  ...brand,
  base: 'light',

  colorPrimary: BLUE_50,
  colorSecondary: BLUE_50,

  appBg: NEUTRAL_10,
  appContentBg: WHITE,
  appPreviewBg: WHITE,
  appBorderColor: NEUTRAL_40,
  appBorderRadius: RADIUS,

  textColor: BLACK,
  textInverseColor: NEUTRAL_10,
  textMutedColor: NEUTRAL_100,

  barTextColor: NEUTRAL_100,
  barSelectedColor: BLUE_50,
  barHoverColor: BLUE_50,
  barBg: WHITE,

  inputBg: WHITE,
  inputBorder: NEUTRAL_40,
  inputTextColor: BLACK,
  inputBorderRadius: RADIUS_MD,

  booleanBg: NEUTRAL_20,
  booleanSelectedBg: WHITE,
});

export const darkTheme = create({
  ...brand,
  base: 'dark',

  colorPrimary: DARK_LINK,
  colorSecondary: DARK_LINK,

  appBg: DARK_SUNKEN,
  appContentBg: DARK_PAGE,
  appPreviewBg: DARK_PAGE,
  appBorderColor: DARK_HAIRLINE,
  appBorderRadius: RADIUS,

  textColor: DARK_HEADING_INK,
  textInverseColor: DARK_PAGE,
  textMutedColor: DARK_TEXT_SUBTLE,

  barTextColor: DARK_TEXT_SUBTLE,
  barSelectedColor: DARK_LINK,
  barHoverColor: DARK_LINK,
  barBg: DARK_PAGE,

  inputBg: DARK_FIELD,
  inputBorder: DARK_HAIRLINE,
  inputTextColor: DARK_TEXT,
  inputBorderRadius: RADIUS_MD,

  booleanBg: DARK_SUNKEN,
  booleanSelectedBg: DARK_RAISED,
});

export type ThemeName = 'light' | 'dark';

/** Where the chosen theme is remembered between visits. */
export const THEME_STORAGE_KEY = 'mdt-storybook-theme';

/**
 * Follow the viewer's operating system setting, so someone browsing in dark
 * mode gets a dark Storybook without touching anything.
 */
export const prefersDark = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

/**
 * The theme to start on: whatever was chosen last, otherwise the operating
 * system preference.
 *
 * The manager and the preview run in separate frames but share an origin, so
 * both read the same stored value and start in agreement.
 */
export const getInitialTheme = (): ThemeName => {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // Storage can be unavailable (private mode, blocked cookies) - fall through.
  }
  return prefersDark() ? 'dark' : 'light';
};

export const themeFor = (name: ThemeName) => (name === 'dark' ? darkTheme : lightTheme);
