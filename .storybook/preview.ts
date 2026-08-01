import type { Preview, Decorator } from '@storybook/react-vite';
import { withDeprecationWarning } from './decorators/withDeprecationWarning';
import { getInitialTheme, themeFor } from './themes';
import '../src/styles/globals.css';
// Covers the Docs chrome that `docs.theme` cannot reach when the Theme toolbar
// is switched manually, away from the operating system preference.
import './docs-theme.css';

/**
 * Applies the design system's own theming to the preview canvas.
 *
 * Adding `.dark` to the root element flips every semantic token, and
 * `globals.css` paints the body from `--mdt-background`. That means the canvas
 * background follows the theme on its own — there is deliberately no separate
 * `backgrounds` toolbar here. One switch, not two.
 */
const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as string | undefined) ?? 'light';

  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  return Story();
};

// Start from the remembered choice, falling back to the operating system
// setting, so the interface, the Docs pages and the canvas all agree on load.
const startingTheme = getInitialTheme();

// Exported as the object itself rather than through a `preview` variable, and
// that is not a style choice. Storybook reads `options.storySort` by parsing
// this file as TEXT before anything runs, and its parser cannot follow a
// variable - so behind one, the sort is silently ignored. No error, no warning;
// the sidebar just falls back to the order the files happened to be walked in,
// which puts the most recently touched component at the very bottom.
//
// `satisfies` keeps the type checking and the parser strips it before reading.
export default {
  parameters: {
    // Alphabetical, so a new component turns up where its name says it should.
    options: {
      storySort: { method: 'alphabetical', locales: 'en-US' },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    // Docs pages are chrome, not components — Storybook paints them, so it needs
    // the theme handed to it. Without this the page renders on a hardcoded white
    // panel while the text follows the dark theme, which is unreadable.
    docs: {
      theme: themeFor(startingTheme),
    },
    // No `backgrounds` parameter on purpose — the canvas is painted by the
    // design system's own `--mdt-background` token via the theme toggle above.
    // Re-adding it would hardcode colours that live in globals.css.
    layout: 'centered',
  },
  globalTypes: {
    // Deliberately no `toolbar` here. Storybook's built-in toolbar control can
    // only reach the preview iframe, which is what left the interface light
    // while the components went dark. The single toggle in manager.tsx drives
    // this global instead — one control for the whole of Storybook.
    theme: {
      description: 'Light or dark, across the whole of Storybook',
      defaultValue: startingTheme,
    },
  },
  decorators: [withDeprecationWarning, withTheme],
  tags: ['autodocs'],
} satisfies Preview;
