import { create } from 'storybook/theming/create';

/**
 * Storybook's own chrome — the sidebar, toolbar, panels, and the Docs pages.
 *
 * Storybook renders its chrome outside the preview iframe, so it cannot read
 * the CSS variables in `globals.css`. The values below are therefore mirrored
 * from the design system by hand.
 *
 * KEEP IN SYNC WITH: src/styles/globals.css and TOKENS.md
 * Every value here is a real system token — no stray colours.
 *
 * Used by:
 *   manager.ts  → the interface
 *   preview.ts  → `parameters.docs.theme`, so Docs pages match
 */

// --- Mirrored token values (see TOKENS.md) -------------------------------
const BLUE_50 = '#3d7dff'; // --mdt-blue-50    : primary / accent
const WHITE = '#ffffff'; // --mdt-white
const BLACK = '#070f1d'; // --mdt-black      : hsl(218 63% 7%)
const NEUTRAL_10 = '#f6f9fc'; // --mdt-neutral-10
const NEUTRAL_20 = '#ecf1f9'; // --mdt-neutral-20
const NEUTRAL_40 = '#cad3e2'; // --mdt-neutral-40 : light border
const NEUTRAL_90 = '#516381'; // --mdt-neutral-90 : dark border
const NEUTRAL_100 = '#485975'; // --mdt-neutral-100: muted text
const NEUTRAL_140 = '#172336'; // --mdt-neutral-140: dark raised surface
const NEUTRAL_150 = '#111c2c'; // --mdt-neutral-150: dark surface
const NEUTRAL_160 = '#0b1628'; // --mdt-neutral-160: dark background

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

  colorPrimary: BLUE_50,
  colorSecondary: BLUE_50,

  appBg: NEUTRAL_160,
  appContentBg: NEUTRAL_150,
  appPreviewBg: NEUTRAL_160,
  appBorderColor: NEUTRAL_90,
  appBorderRadius: RADIUS,

  textColor: NEUTRAL_10,
  textInverseColor: BLACK,
  textMutedColor: NEUTRAL_40,

  barTextColor: NEUTRAL_40,
  barSelectedColor: BLUE_50,
  barHoverColor: BLUE_50,
  barBg: NEUTRAL_150,

  inputBg: NEUTRAL_150,
  inputBorder: NEUTRAL_90,
  inputTextColor: NEUTRAL_10,
  inputBorderRadius: RADIUS_MD,

  booleanBg: NEUTRAL_140,
  booleanSelectedBg: NEUTRAL_150,
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
