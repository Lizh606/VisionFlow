
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        brand: "rgba(var(--vf-brand), 1)",
        "brand-hover": "rgba(var(--vf-brand-hover), 1)",
        "brand-active": "rgba(var(--vf-brand-active), 1)",
        info: "rgba(var(--vf-info), 1)",
        success: "rgba(var(--vf-success), 1)",
        warning: "rgba(var(--vf-warning), 1)",
        error: "rgba(var(--vf-error), 1)",
        teal: "rgba(var(--vf-teal), 1)",
        divider: "rgba(var(--vf-divider), var(--vf-divider-alpha))",
        bg: {
          page: "rgba(var(--vf-bg-page), 1)",
          card: "rgba(var(--vf-bg-card), 1)",
          raised: "rgba(var(--vf-bg-raised), 1)",
          overlay: "rgba(var(--vf-bg-overlay), 1)",
          input: "rgba(var(--vf-bg-input), var(--vf-bg-input-alpha))",
        },
        text: {
          primary: "rgba(var(--vf-text-primary), 1)",
          secondary: "rgba(var(--vf-text-secondary), 1)",
          tertiary: "rgba(var(--vf-text-tertiary), 1)",
          disabled: "rgba(var(--vf-text-disabled), 1)",
          inverse: "rgba(var(--vf-text-inverse), 1)",
        },
        border: {
          DEFAULT: "rgba(var(--vf-border), var(--vf-border-alpha))",
          strong: "rgba(var(--vf-border-strong), var(--vf-border-strong-alpha))",
          divider: "rgba(var(--vf-divider), var(--vf-divider-alpha))",
        },
        action: {
          hover: "rgba(var(--vf-hover), var(--vf-hover-alpha))",
          active: "rgba(var(--vf-active), var(--vf-active-alpha))",
        },
        mask: "rgba(var(--vf-mask), var(--vf-mask-alpha))",
      },
      fontSize: {
        'vf-t1': ['var(--vf-font-size-t1)', 'var(--vf-lh-t1)'],
        'vf-t2': ['var(--vf-font-size-t2)', 'var(--vf-lh-t2)'],
        'vf-t3': ['var(--vf-font-size-t3)', 'var(--vf-lh-t3)'],
        'vf-t4': ['var(--vf-font-size-t4)', 'var(--vf-lh-t4)'],
        'vf-t5': ['var(--vf-font-size-t5)', 'var(--vf-lh-t5)'],
        'vf-t6': ['var(--vf-font-size-t6)', 'var(--vf-lh-t6)'],
        'vf-t7': ['var(--vf-font-size-t7)', 'var(--vf-lh-t7)'],
      },
      fontWeight: {
        'vf-regular': 'var(--vf-font-weight-regular)',
        'vf-medium': 'var(--vf-font-weight-medium)',
        'vf-semibold': 'var(--vf-font-weight-semibold)',
      },
      fontFamily: {
        sans: ['var(--vf-font-sans)'],
        mono: ['var(--vf-font-mono)'],
      },
      ringColor: {
        focus: "rgba(var(--vf-focus), var(--vf-focus-alpha))",
      },
      borderRadius: {
        control: "var(--vf-radius-control)",
        card: "var(--vf-radius-card)",
        tag: "var(--vf-radius-tag)",
      },
      boxShadow: {
        card: "var(--vf-shadow-card)",
        overlay: "var(--vf-shadow-overlay)",
      },
      spacing: {
        'header': '56px',
        'sidebar-expanded': '240px',
        'sidebar-collapsed': '72px',
        'content-padding': '24px',
        "vf-1": "4px",
        "vf-2": "8px",
        "vf-3": "12px",
        "vf-4": "16px",
        "vf-5": "24px",
        "vf-6": "32px",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
}
