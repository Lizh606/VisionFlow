
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    // Define breakpoints strictly per Spec Section 2.1
    screens: {
      'sm': '640px',
      'md': '768px',  // Tablet start
      'lg': '1024px', // Desktop start
      'xl': '1280px',
      '2xl': '1440px', // Wide
    },
    extend: {
      colors: {
        // Brand & Status
        brand: "rgb(var(--vf-brand) / <alpha-value>)",
        "brand-hover": "rgb(var(--vf-brand-hover) / <alpha-value>)",
        "brand-active": "rgb(var(--vf-brand-active) / <alpha-value>)",
        
        info: "rgb(var(--vf-info) / <alpha-value>)",
        success: "rgb(var(--vf-success) / <alpha-value>)",
        warning: "rgb(var(--vf-warning) / <alpha-value>)",
        error: "rgb(var(--vf-error) / <alpha-value>)",

        // Surface
        bg: {
          page: "rgb(var(--vf-bg-page) / <alpha-value>)",
          card: "rgb(var(--vf-bg-card) / <alpha-value>)",
          raised: "rgb(var(--vf-bg-raised) / <alpha-value>)",
          overlay: "rgb(var(--vf-bg-overlay) / <alpha-value>)",
          input: "rgb(var(--vf-bg-input) / var(--vf-bg-input-alpha))",
        },

        // Text
        text: {
          primary: "rgb(var(--vf-text-primary) / <alpha-value>)",
          secondary: "rgb(var(--vf-text-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--vf-text-tertiary) / <alpha-value>)",
          disabled: "rgb(var(--vf-text-disabled) / <alpha-value>)",
          inverse: "rgb(var(--vf-text-inverse) / <alpha-value>)",
        },

        // Border
        border: {
          DEFAULT: "rgb(var(--vf-border) / var(--vf-border-alpha))",
          strong: "rgb(var(--vf-border-strong) / var(--vf-border-strong-alpha))",
          divider: "rgb(var(--vf-divider) / var(--vf-divider-alpha))",
        },

        // Action background (hover/active)
        action: {
          hover: "rgb(var(--vf-hover) / var(--vf-hover-alpha))",
          active: "rgb(var(--vf-active) / var(--vf-active-alpha))",
        },

        // Overlay mask
        mask: "rgb(var(--vf-mask) / var(--vf-mask-alpha))",
      },

      ringColor: {
        focus: "rgb(var(--vf-focus) / var(--vf-focus-alpha))",
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
        'sidebar-expanded': '220px',
        'sidebar-collapsed': '72px',
        'content-padding': '24px',
        // VF spacing tokens
        "vf-1": "4px",
        "vf-2": "8px",
        "vf-3": "12px",
        "vf-4": "16px",
        "vf-5": "24px",
        "vf-6": "32px",
      },

      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
        ],
        mono: [
          'Menlo', 
          'Monaco', 
          'Consolas', 
          '"Liberation Mono"', 
          '"Courier New"', 
          'monospace'
        ]
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
}
