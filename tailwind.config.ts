import type { Config } from 'tailwindcss';

const config: Config = {
  // Dark mode is keyed on the `dark` class, matched via an attribute selector.
  //
  // The obvious `darkMode: 'class'` does not work here: Tailwind applies the
  // `mdt-` prefix to the toggle class as well, emitting
  // `.dark\:mdt-bg-x:is(.mdt-dark *)` while the app puts plain `.dark` on the
  // root. The selectors never match, so every `dark:` utility in the library is
  // silently dead. Writing `['class', '.dark']` does not help either - that
  // custom selector gets prefixed too.
  //
  // An attribute selector is not prefixed, so it survives intact.
  //
  // Token-based theming was never affected, because globals.css defines
  // `.dark { --mdt-* }` in plain CSS. That is why this went unnoticed: the
  // theme flipped correctly while every `dark:` class quietly did nothing.
  darkMode: ['class', '[class~="dark"]'],
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  prefix: 'mdt-',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--mdt-border) / <alpha-value>)',
        input: 'hsl(var(--mdt-input) / <alpha-value>)',
        ring: 'hsl(var(--mdt-ring) / <alpha-value>)',
        background: 'hsl(var(--mdt-background) / <alpha-value>)',
        foreground: 'hsl(var(--mdt-foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--mdt-primary) / <alpha-value>)',
          foreground: 'hsl(var(--mdt-primary-foreground) / <alpha-value>)',
          'foreground-muted': 'hsl(var(--mdt-primary-foreground-muted) / <alpha-value>)',
          'foreground-subtle': 'hsl(var(--mdt-primary-foreground-subtle) / <alpha-value>)',
        },
        // The AI gradient's three stops, so the mark can be drawn from classes
        // as well as from the SVG's own `stop-color`.
        'ai-gradient': {
          from: 'hsl(var(--mdt-ai-gradient-from) / <alpha-value>)',
          via: 'hsl(var(--mdt-ai-gradient-via) / <alpha-value>)',
          to: 'hsl(var(--mdt-ai-gradient-to) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--mdt-secondary) / <alpha-value>)',
          foreground: 'hsl(var(--mdt-secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--mdt-destructive) / <alpha-value>)',
          foreground: 'hsl(var(--mdt-destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--mdt-muted) / <alpha-value>)',
          foreground: 'hsl(var(--mdt-muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--mdt-accent) / <alpha-value>)',
          foreground: 'hsl(var(--mdt-accent-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--mdt-popover) / <alpha-value>)',
          foreground: 'hsl(var(--mdt-popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--mdt-card) / <alpha-value>)',
          foreground: 'hsl(var(--mdt-card-foreground) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'hsl(var(--mdt-warning) / <alpha-value>)',
          foreground: 'hsl(var(--mdt-warning-foreground) / <alpha-value>)',
        },
        success: {
          DEFAULT: 'hsl(var(--mdt-success) / <alpha-value>)',
          foreground: 'hsl(var(--mdt-success-foreground) / <alpha-value>)',
        },
        info: {
          DEFAULT: 'hsl(var(--mdt-info) / <alpha-value>)',
          foreground: 'hsl(var(--mdt-info-foreground) / <alpha-value>)',
        },
        // The feedback surface - Org Mgmt's banner palette, taken exactly.
        // Scoped to Toast and Banner on purpose; see globals.css.
        feedback: {
          info: {
            bg: 'hsl(var(--mdt-feedback-info-bg) / <alpha-value>)',
            border: 'hsl(var(--mdt-feedback-info-border) / <alpha-value>)',
            icon: 'hsl(var(--mdt-feedback-info-icon) / <alpha-value>)',
          },
          warning: {
            bg: 'hsl(var(--mdt-feedback-warning-bg) / <alpha-value>)',
            border: 'hsl(var(--mdt-feedback-warning-border) / <alpha-value>)',
            icon: 'hsl(var(--mdt-feedback-warning-icon) / <alpha-value>)',
          },
          danger: {
            bg: 'hsl(var(--mdt-feedback-danger-bg) / <alpha-value>)',
            border: 'hsl(var(--mdt-feedback-danger-border) / <alpha-value>)',
            icon: 'hsl(var(--mdt-feedback-danger-icon) / <alpha-value>)',
          },
          success: {
            bg: 'hsl(var(--mdt-feedback-success-bg) / <alpha-value>)',
            border: 'hsl(var(--mdt-feedback-success-border) / <alpha-value>)',
            icon: 'hsl(var(--mdt-feedback-success-icon) / <alpha-value>)',
          },
          ai: {
            bg: 'hsl(var(--mdt-feedback-ai-bg) / <alpha-value>)',
            border: 'hsl(var(--mdt-feedback-ai-border) / <alpha-value>)',
            icon: 'hsl(var(--mdt-feedback-ai-icon) / <alpha-value>)',
          },
          neutral: {
            bg: 'hsl(var(--mdt-feedback-neutral-bg) / <alpha-value>)',
            border: 'hsl(var(--mdt-feedback-neutral-border) / <alpha-value>)',
            icon: 'hsl(var(--mdt-feedback-neutral-icon) / <alpha-value>)',
          },
          title: 'hsl(var(--mdt-feedback-title) / <alpha-value>)',
          text: 'hsl(var(--mdt-feedback-text) / <alpha-value>)',
        },

        // A surface sitting above the page. The same white as the page in light
        // mode - white is the ceiling, nothing can be lighter - and a genuine
        // step lighter in dark, which is where tone does the separating.
        surface: {
          raised: 'hsl(var(--mdt-surface-raised) / <alpha-value>)',
        },

        // Core colors
        white: 'hsl(var(--mdt-white) / <alpha-value>)',
        black: 'hsl(var(--mdt-black) / <alpha-value>)',

        // Neutral scale - both hex and CSS variables
        neutral: {
          10: 'hsl(var(--mdt-neutral-10) / <alpha-value>)',
          20: 'hsl(var(--mdt-neutral-20) / <alpha-value>)',
          30: 'hsl(var(--mdt-neutral-30) / <alpha-value>)',
          40: 'hsl(var(--mdt-neutral-40) / <alpha-value>)',
          50: 'hsl(var(--mdt-neutral-50) / <alpha-value>)',
          60: 'hsl(var(--mdt-neutral-60) / <alpha-value>)',
          70: 'hsl(var(--mdt-neutral-70) / <alpha-value>)',
          80: 'hsl(var(--mdt-neutral-80) / <alpha-value>)',
          90: 'hsl(var(--mdt-neutral-90) / <alpha-value>)',
          100: 'hsl(var(--mdt-neutral-100) / <alpha-value>)',
          110: 'hsl(var(--mdt-neutral-110) / <alpha-value>)',
          120: 'hsl(var(--mdt-neutral-120) / <alpha-value>)',
          130: 'hsl(var(--mdt-neutral-130) / <alpha-value>)',
          140: 'hsl(var(--mdt-neutral-140) / <alpha-value>)',
          150: 'hsl(var(--mdt-neutral-150) / <alpha-value>)',
          160: 'hsl(var(--mdt-neutral-160) / <alpha-value>)',
        },
        // Red scale - Destructive/Error
        red: {
          5: 'hsl(var(--mdt-red-05) / <alpha-value>)',
          10: 'hsl(var(--mdt-red-10) / <alpha-value>)',
          20: 'hsl(var(--mdt-red-20) / <alpha-value>)',
          30: 'hsl(var(--mdt-red-30) / <alpha-value>)',
          40: 'hsl(var(--mdt-red-40) / <alpha-value>)',
          50: 'hsl(var(--mdt-red-50) / <alpha-value>)',
          60: 'hsl(var(--mdt-red-60) / <alpha-value>)',
          65: 'hsl(var(--mdt-red-65) / <alpha-value>)',
          70: 'hsl(var(--mdt-red-70) / <alpha-value>)',
          80: 'hsl(var(--mdt-red-80) / <alpha-value>)',
          90: 'hsl(var(--mdt-red-90) / <alpha-value>)',
          100: 'hsl(var(--mdt-red-100) / <alpha-value>)',
        },
        // Orange scale - Warning
        orange: {
          5: 'hsl(var(--mdt-orange-05) / <alpha-value>)',
          10: 'hsl(var(--mdt-orange-10) / <alpha-value>)',
          20: 'hsl(var(--mdt-orange-20) / <alpha-value>)',
          30: 'hsl(var(--mdt-orange-30) / <alpha-value>)',
          40: 'hsl(var(--mdt-orange-40) / <alpha-value>)',
          50: 'hsl(var(--mdt-orange-50) / <alpha-value>)',
          60: 'hsl(var(--mdt-orange-60) / <alpha-value>)',
          65: 'hsl(var(--mdt-orange-65) / <alpha-value>)',
          70: 'hsl(var(--mdt-orange-70) / <alpha-value>)',
          80: 'hsl(var(--mdt-orange-80) / <alpha-value>)',
          90: 'hsl(var(--mdt-orange-90) / <alpha-value>)',
          100: 'hsl(var(--mdt-orange-100) / <alpha-value>)',
        },
        // Yellow scale - Caution
        yellow: {
          5: 'hsl(var(--mdt-yellow-05) / <alpha-value>)',
          10: 'hsl(var(--mdt-yellow-10) / <alpha-value>)',
          20: 'hsl(var(--mdt-yellow-20) / <alpha-value>)',
          30: 'hsl(var(--mdt-yellow-30) / <alpha-value>)',
          40: 'hsl(var(--mdt-yellow-40) / <alpha-value>)',
          50: 'hsl(var(--mdt-yellow-50) / <alpha-value>)',
          60: 'hsl(var(--mdt-yellow-60) / <alpha-value>)',
          70: 'hsl(var(--mdt-yellow-70) / <alpha-value>)',
          80: 'hsl(var(--mdt-yellow-80) / <alpha-value>)',
          90: 'hsl(var(--mdt-yellow-90) / <alpha-value>)',
          100: 'hsl(var(--mdt-yellow-100) / <alpha-value>)',
        },
        // Green scale - Success
        green: {
          5: 'hsl(var(--mdt-green-05) / <alpha-value>)',
          10: 'hsl(var(--mdt-green-10) / <alpha-value>)',
          20: 'hsl(var(--mdt-green-20) / <alpha-value>)',
          30: 'hsl(var(--mdt-green-30) / <alpha-value>)',
          40: 'hsl(var(--mdt-green-40) / <alpha-value>)',
          50: 'hsl(var(--mdt-green-50) / <alpha-value>)',
          60: 'hsl(var(--mdt-green-60) / <alpha-value>)',
          70: 'hsl(var(--mdt-green-70) / <alpha-value>)',
          80: 'hsl(var(--mdt-green-80) / <alpha-value>)',
          90: 'hsl(var(--mdt-green-90) / <alpha-value>)',
          100: 'hsl(var(--mdt-green-100) / <alpha-value>)',
        },
        // Blue scale - Info/Primary
        blue: {
          5: 'hsl(var(--mdt-blue-05) / <alpha-value>)',
          10: 'hsl(var(--mdt-blue-10) / <alpha-value>)',
          20: 'hsl(var(--mdt-blue-20) / <alpha-value>)',
          30: 'hsl(var(--mdt-blue-30) / <alpha-value>)',
          40: 'hsl(var(--mdt-blue-40) / <alpha-value>)',
          50: 'hsl(var(--mdt-blue-50) / <alpha-value>)',
          55: 'hsl(var(--mdt-blue-55) / <alpha-value>)',
          60: 'hsl(var(--mdt-blue-60) / <alpha-value>)',
          65: 'hsl(var(--mdt-blue-65) / <alpha-value>)',
          70: 'hsl(var(--mdt-blue-70) / <alpha-value>)',
          80: 'hsl(var(--mdt-blue-80) / <alpha-value>)',
          90: 'hsl(var(--mdt-blue-90) / <alpha-value>)',
          100: 'hsl(var(--mdt-blue-100) / <alpha-value>)',
        },
        // Purple scale - Creative/Premium
        purple: {
          5: 'hsl(var(--mdt-purple-05) / <alpha-value>)',
          10: 'hsl(var(--mdt-purple-10) / <alpha-value>)',
          20: 'hsl(var(--mdt-purple-20) / <alpha-value>)',
          30: 'hsl(var(--mdt-purple-30) / <alpha-value>)',
          40: 'hsl(var(--mdt-purple-40) / <alpha-value>)',
          50: 'hsl(var(--mdt-purple-50) / <alpha-value>)',
          60: 'hsl(var(--mdt-purple-60) / <alpha-value>)',
          70: 'hsl(var(--mdt-purple-70) / <alpha-value>)',
          80: 'hsl(var(--mdt-purple-80) / <alpha-value>)',
          90: 'hsl(var(--mdt-purple-90) / <alpha-value>)',
          100: 'hsl(var(--mdt-purple-100) / <alpha-value>)',
        },
      },
      width: {
        toast: 'var(--mdt-toast-width)',
      },
      borderRadius: {
        lg: 'var(--mdt-radius)',
        md: 'calc(var(--mdt-radius) - 2px)',
        sm: 'calc(var(--mdt-radius) - 4px)',
      },
      // Elevation. These REPLACE Tailwind's defaults rather than extending
      // them, so `mdt-shadow-md` now reads our token instead of a value nobody
      // chose. The light values are identical to what Tailwind shipped, so
      // nothing moves on screen; dark mode gains a much stronger shadow and a
      // hairline edge. See globals.css.
      boxShadow: {
        none: 'var(--mdt-shadow-none)',
        xs: 'var(--mdt-shadow-xs)',
        sm: 'var(--mdt-shadow-sm)',
        DEFAULT: 'var(--mdt-shadow-sm)',
        md: 'var(--mdt-shadow-md)',
        lg: 'var(--mdt-shadow-lg)',
        xl: 'var(--mdt-shadow-xl)',
      },
      // Layering. Named intent instead of `z-50` everywhere - see globals.css
      // for why a tooltip sits above a modal.
      zIndex: {
        base: 'var(--mdt-z-base)',
        sticky: 'var(--mdt-z-sticky)',
        'sticky-header': 'var(--mdt-z-sticky-header)',
        'sticky-corner': 'var(--mdt-z-sticky-corner)',
        overlay: 'var(--mdt-z-overlay)',
        modal: 'var(--mdt-z-modal)',
        dropdown: 'var(--mdt-z-dropdown)',
        popover: 'var(--mdt-z-popover)',
        tooltip: 'var(--mdt-z-tooltip)',
        toast: 'var(--mdt-z-toast)',
      },
      fontFamily: {
        sans: ['var(--mdt-font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--mdt-font-mono)', 'monospace'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        // A hint of travel, not a transition. The `slide-*` pair below moves
        // 100% because it was built for Dialog and Sheet, where the whole
        // surface arrives; 8px is for a list changing underneath a header that
        // stays put, where the direction is the message and the distance is
        // only there to carry it.
        'nav-in-from-right': {
          from: { opacity: '0', transform: 'translateX(8px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'nav-in-from-left': {
          from: { opacity: '0', transform: 'translateX(-8px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'slide-in-from-top': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-bottom': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-in-from-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-out-to-top': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-100%)' },
        },
        'slide-out-to-bottom': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(100%)' },
        },
        'slide-out-to-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'slide-out-to-right': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
        'zoom-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'zoom-out': {
          from: { opacity: '1', transform: 'scale(1)' },
          to: { opacity: '0', transform: 'scale(0.95)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        // Faster than the 0.2s everything else uses. This one runs on a control
        // you are already looking at, and 200ms of it reads as the panel
        // thinking rather than answering.
        'nav-in-from-right': 'nav-in-from-right 0.16s ease-out',
        'nav-in-from-left': 'nav-in-from-left 0.16s ease-out',
        'fade-out': 'fade-out 0.2s ease-out',
        'slide-in-from-top': 'slide-in-from-top 0.2s ease-out',
        'slide-in-from-bottom': 'slide-in-from-bottom 0.2s ease-out',
        'slide-in-from-left': 'slide-in-from-left 0.2s ease-out',
        'slide-in-from-right': 'slide-in-from-right 0.2s ease-out',
        'slide-out-to-top': 'slide-out-to-top 0.2s ease-out',
        'slide-out-to-bottom': 'slide-out-to-bottom 0.2s ease-out',
        'slide-out-to-left': 'slide-out-to-left 0.2s ease-out',
        'slide-out-to-right': 'slide-out-to-right 0.2s ease-out',
        'zoom-in': 'zoom-in 0.2s ease-out',
        'zoom-out': 'zoom-out 0.2s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
