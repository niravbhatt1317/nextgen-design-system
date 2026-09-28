import React, { useCallback, useEffect } from 'react';
import { addons, types, useGlobals } from 'storybook/manager-api';
import { IconButton } from 'storybook/internal/components';
import { getInitialTheme, themeFor, THEME_STORAGE_KEY, type ThemeName } from './themes';

/**
 * A single theme toggle that switches EVERYTHING at once:
 *
 *   - Storybook's interface (sidebar, toolbar, panels)  via addons.setConfig
 *   - The Docs pages                                    via docs-theme.css
 *   - The canvas and every component                    via the `theme` global
 *
 * Storybook's built-in `globalTypes` toolbar can only reach the preview iframe,
 * which is why the interface used to stay light while the components went dark.
 * This replaces it, so there is one control rather than two.
 */

const ADDON_ID = 'mdt/theme-toggle';
const TOOL_ID = `${ADDON_ID}/tool`;

const SIDEBAR_AND_TOOLBAR = {
  sidebar: {
    showRoots: true,
    collapsedRoots: ['other'],
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
} as const;

/** Re-themes the Storybook interface itself. */
const applyManagerTheme = (name: ThemeName) => {
  addons.setConfig({
    theme: themeFor(name),
    ...SIDEBAR_AND_TOOLBAR,
  });
};

const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
    <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 2.4v2.2M12 19.4v2.2M2.4 12h2.2M19.4 12h2.2" />
      <path d="M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
    </g>
  </svg>
);

const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M20 13.4A8.2 8.2 0 1 1 10.6 4a6.6 6.6 0 0 0 9.4 9.4Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const ThemeToggle = () => {
  const [globals, updateGlobals] = useGlobals();
  // What the preview has reported, if anything yet. Until the preview boots,
  // `globals` is `{}` - that is "not known yet", not a choice of light.
  const reported: ThemeName | undefined =
    globals.theme === 'dark' ? 'dark' : globals.theme === 'light' ? 'light' : undefined;
  const current: ThemeName = reported ?? getInitialTheme();
  const next: ThemeName = current === 'dark' ? 'light' : 'dark';

  // Keep the interface and the stored preference in step with the global -
  // once there is one. Acting on the empty `{}` wrote "light" over the
  // remembered choice on every reload, before the preview had read it, so a
  // dark Storybook came back light and its Docs pages booted on the light
  // docs theme (found 2026-09-26, while moving the frame onto the colour map).
  useEffect(() => {
    if (reported === undefined) return;
    applyManagerTheme(reported);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, reported);
    } catch {
      // Storage unavailable - the toggle still works for this session.
    }
  }, [reported]);

  const toggle = useCallback(() => {
    updateGlobals({ theme: next });
  }, [next, updateGlobals]);

  return (
    <IconButton
      key={TOOL_ID}
      active={current === 'dark'}
      title={`Switch to ${next} mode`}
      aria-label={`Switch to ${next} mode`}
      onClick={toggle}
    >
      {current === 'dark' ? <MoonIcon /> : <SunIcon />}
      <span style={{ marginLeft: 6 }}>{current === 'dark' ? 'Dark' : 'Light'}</span>
    </IconButton>
  );
};

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Theme',
    // Show on stories and Docs pages alike.
    match: () => true,
    render: () => <ThemeToggle />,
  });
});

// Paint the interface before the first render, so it never flashes the wrong
// theme on load.
applyManagerTheme(getInitialTheme());
