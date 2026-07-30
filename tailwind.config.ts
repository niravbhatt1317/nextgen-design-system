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
        border: 'hsl(var(--mdt-border))',
        input: 'hsl(var(--mdt-input))',
        ring: 'hsl(var(--mdt-ring))',
        background: 'hsl(var(--mdt-background))',
        foreground: 'hsl(var(--mdt-foreground))',
        primary: {
          DEFAULT: 'hsl(var(--mdt-primary))',
          foreground: 'hsl(var(--mdt-primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--mdt-secondary))',
          foreground: 'hsl(var(--mdt-secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--mdt-destructive))',
          foreground: 'hsl(var(--mdt-destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--mdt-muted))',
          foreground: 'hsl(var(--mdt-muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--mdt-accent))',
          foreground: 'hsl(var(--mdt-accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--mdt-popover))',
          foreground: 'hsl(var(--mdt-popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--mdt-card))',
          foreground: 'hsl(var(--mdt-card-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--mdt-warning))',
          foreground: 'hsl(var(--mdt-warning-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--mdt-success))',
          foreground: 'hsl(var(--mdt-success-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--mdt-info))',
          foreground: 'hsl(var(--mdt-info-foreground))',
        },
        // The feedback surface - Org Mgmt's banner palette, taken exactly.
        // Scoped to Toast and Banner on purpose; see globals.css.
        feedback: {
          info: {
            bg: 'hsl(var(--mdt-feedback-info-bg))',
            border: 'hsl(var(--mdt-feedback-info-border))',
            icon: 'hsl(var(--mdt-feedback-info-icon))',
          },
          warning: {
            bg: 'hsl(var(--mdt-feedback-warning-bg))',
            border: 'hsl(var(--mdt-feedback-warning-border))',
            icon: 'hsl(var(--mdt-feedback-warning-icon))',
          },
          danger: {
            bg: 'hsl(var(--mdt-feedback-danger-bg))',
            border: 'hsl(var(--mdt-feedback-danger-border))',
            icon: 'hsl(var(--mdt-feedback-danger-icon))',
          },
          success: {
            bg: 'hsl(var(--mdt-feedback-success-bg))',
            border: 'hsl(var(--mdt-feedback-success-border))',
            icon: 'hsl(var(--mdt-feedback-success-icon))',
          },
          ai: {
            bg: 'hsl(var(--mdt-feedback-ai-bg))',
            border: 'hsl(var(--mdt-feedback-ai-border))',
            icon: 'hsl(var(--mdt-feedback-ai-icon))',
          },
          neutral: {
            bg: 'hsl(var(--mdt-feedback-neutral-bg))',
            border: 'hsl(var(--mdt-feedback-neutral-border))',
            icon: 'hsl(var(--mdt-feedback-neutral-icon))',
          },
          title: 'hsl(var(--mdt-feedback-title))',
          text: 'hsl(var(--mdt-feedback-text))',
        },

        // Core colors
        white: 'hsl(var(--mdt-white))',
        black: 'hsl(var(--mdt-black))',

        // Neutral scale - both hex and CSS variables
        neutral: {
          10: 'hsl(var(--mdt-neutral-10))',
          20: 'hsl(var(--mdt-neutral-20))',
          30: 'hsl(var(--mdt-neutral-30))',
          40: 'hsl(var(--mdt-neutral-40))',
          50: 'hsl(var(--mdt-neutral-50))',
          60: 'hsl(var(--mdt-neutral-60))',
          70: 'hsl(var(--mdt-neutral-70))',
          80: 'hsl(var(--mdt-neutral-80))',
          90: 'hsl(var(--mdt-neutral-90))',
          100: 'hsl(var(--mdt-neutral-100))',
          110: 'hsl(var(--mdt-neutral-110))',
          120: 'hsl(var(--mdt-neutral-120))',
          130: 'hsl(var(--mdt-neutral-130))',
          140: 'hsl(var(--mdt-neutral-140))',
          150: 'hsl(var(--mdt-neutral-150))',
          160: 'hsl(var(--mdt-neutral-160))',
        },
        // Red scale - Destructive/Error
        red: {
          5: 'hsl(var(--mdt-red-05))',
          10: 'hsl(var(--mdt-red-10))',
          20: 'hsl(var(--mdt-red-20))',
          30: 'hsl(var(--mdt-red-30))',
          40: 'hsl(var(--mdt-red-40))',
          50: 'hsl(var(--mdt-red-50))',
          60: 'hsl(var(--mdt-red-60))',
          65: 'hsl(var(--mdt-red-65))',
          70: 'hsl(var(--mdt-red-70))',
          80: 'hsl(var(--mdt-red-80))',
          90: 'hsl(var(--mdt-red-90))',
          100: 'hsl(var(--mdt-red-100))',
        },
        // Orange scale - Warning
        orange: {
          5: 'hsl(var(--mdt-orange-05))',
          10: 'hsl(var(--mdt-orange-10))',
          20: 'hsl(var(--mdt-orange-20))',
          30: 'hsl(var(--mdt-orange-30))',
          40: 'hsl(var(--mdt-orange-40))',
          50: 'hsl(var(--mdt-orange-50))',
          60: 'hsl(var(--mdt-orange-60))',
          65: 'hsl(var(--mdt-orange-65))',
          70: 'hsl(var(--mdt-orange-70))',
          80: 'hsl(var(--mdt-orange-80))',
          90: 'hsl(var(--mdt-orange-90))',
          100: 'hsl(var(--mdt-orange-100))',
        },
        // Yellow scale - Caution
        yellow: {
          5: 'hsl(var(--mdt-yellow-05))',
          10: 'hsl(var(--mdt-yellow-10))',
          20: 'hsl(var(--mdt-yellow-20))',
          30: 'hsl(var(--mdt-yellow-30))',
          40: 'hsl(var(--mdt-yellow-40))',
          50: 'hsl(var(--mdt-yellow-50))',
          60: 'hsl(var(--mdt-yellow-60))',
          70: 'hsl(var(--mdt-yellow-70))',
          80: 'hsl(var(--mdt-yellow-80))',
          90: 'hsl(var(--mdt-yellow-90))',
          100: 'hsl(var(--mdt-yellow-100))',
        },
        // Green scale - Success
        green: {
          5: 'hsl(var(--mdt-green-05))',
          10: 'hsl(var(--mdt-green-10))',
          20: 'hsl(var(--mdt-green-20))',
          30: 'hsl(var(--mdt-green-30))',
          40: 'hsl(var(--mdt-green-40))',
          50: 'hsl(var(--mdt-green-50))',
          60: 'hsl(var(--mdt-green-60))',
          70: 'hsl(var(--mdt-green-70))',
          80: 'hsl(var(--mdt-green-80))',
          90: 'hsl(var(--mdt-green-90))',
          100: 'hsl(var(--mdt-green-100))',
        },
        // Blue scale - Info/Primary
        blue: {
          5: 'hsl(var(--mdt-blue-05))',
          10: 'hsl(var(--mdt-blue-10))',
          20: 'hsl(var(--mdt-blue-20))',
          30: 'hsl(var(--mdt-blue-30))',
          40: 'hsl(var(--mdt-blue-40))',
          50: 'hsl(var(--mdt-blue-50))',
          55: 'hsl(var(--mdt-blue-55))',
          60: 'hsl(var(--mdt-blue-60))',
          65: 'hsl(var(--mdt-blue-65))',
          70: 'hsl(var(--mdt-blue-70))',
          80: 'hsl(var(--mdt-blue-80))',
          90: 'hsl(var(--mdt-blue-90))',
          100: 'hsl(var(--mdt-blue-100))',
        },
        // Purple scale - Creative/Premium
        purple: {
          5: 'hsl(var(--mdt-purple-05))',
          10: 'hsl(var(--mdt-purple-10))',
          20: 'hsl(var(--mdt-purple-20))',
          30: 'hsl(var(--mdt-purple-30))',
          40: 'hsl(var(--mdt-purple-40))',
          50: 'hsl(var(--mdt-purple-50))',
          60: 'hsl(var(--mdt-purple-60))',
          70: 'hsl(var(--mdt-purple-70))',
          80: 'hsl(var(--mdt-purple-80))',
          90: 'hsl(var(--mdt-purple-90))',
          100: 'hsl(var(--mdt-purple-100))',
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
