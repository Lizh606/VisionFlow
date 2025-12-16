
export type VFMode = "light" | "dark";

export const vfPalette = {
  brandPurple: {
    50: "#F5EEFF",
    100: "#E9DDFF",
    200: "#D3B8FF",
    300: "#B98CFF",
    400: "#9B63FF",
    500: "#7F3DFF",
    600: "#6D29D9",
    700: "#5B21B6",
    800: "#46198A",
    900: "#2E105E",
  },

  google: {
    blue500: "#4285F4",
    red500: "#EA4335",
    yellow500: "#FBBC04",
    green500: "#0F9D58",
    grey500: "#9AA0A6",
  },

  neutral: {
    0: "#FFFFFF",
    25: "#FAFBFC",
    50: "#F6F8FB",
    100: "#EEF2F7",
    200: "#E5EAF2",
    300: "#D3DAE6",
    400: "#A8B3C5",
    500: "#6B778C",
    600: "#4B5565",
    700: "#2E3442",
    800: "#1E2330",
    900: "#111522",
    950: "#0B0F1A",
  },

  alpha: {
    black10: "rgba(0,0,0,0.10)",
    black20: "rgba(0,0,0,0.20)",
  },

  dataViz: {
    1: "#6D29D9",
    2: "#4285F4",
    3: "#0F9D58",
    4: "#FBBC04",
    5: "#EA4335",
    6: "#22C1C3",
    7: "#7C3AED",
    8: "#F97316",
    9: "#EC4899",
    10: "#94A3B8",
  },
} as const;

export const vfSemantic = {
  color: {
    brand: {
      primary: vfPalette.brandPurple[600],
      primaryHover: vfPalette.brandPurple[500],
      primaryActive: vfPalette.brandPurple[700],
      primarySoft: vfPalette.brandPurple[100],
    },
    status: {
      info: vfPalette.google.blue500,
      success: vfPalette.google.green500,
      warning: vfPalette.google.yellow500,
      error: vfPalette.google.red500,
    },
  },

  layout: {
    radius: { tag: 6, control: 8, card: 12 },
    controlHeight: { desktop: 40, mobile: 44 },
    // Layout constraints from spec
    headerHeight: 56,
    siderWidthExpanded: 240, // CORRECTED to 240px per Spec
    siderWidthCollapsed: 72,
    pagePadding: 24,
  },
} as const;

export const vfTheme = {
  light: {
    color: {
      brand: vfSemantic.color.brand.primary,
      brandHover: vfSemantic.color.brand.primaryHover,
      brandActive: vfSemantic.color.brand.primaryActive,

      status: vfSemantic.color.status,

      surface: {
        page: vfPalette.neutral[50],
        card: vfPalette.neutral[0],
        raised: vfPalette.neutral[0],
        overlay: vfPalette.neutral[0],
        input: vfPalette.neutral[0],
      },

      text: {
        primary: vfPalette.neutral[900],
        secondary: vfPalette.neutral[600],
        tertiary: vfPalette.neutral[500],
        disabled: vfPalette.google.grey500,
        inverse: vfPalette.neutral[0],
      },

      border: {
        default: vfPalette.neutral[200],
        strong: vfPalette.neutral[300],
        divider: vfPalette.neutral[200],
      },

      action: {
        hoverBase: "17 21 34",
        hoverAlpha: 0.04,
        activeBase: "17 21 34",
        activeAlpha: 0.08,
      },

      focus: {
        ringBase: vfPalette.brandPurple[400],
        ringAlpha: 0.28,
      },

      mask: { base: "0 0 0", alpha: 0.40 },
    },

    elevation: {
      card: `0 1px 2px ${vfPalette.alpha.black10}`,
      overlay: `0 8px 24px ${vfPalette.alpha.black20}`,
    },
  },

  dark: {
    color: {
      brand: vfPalette.brandPurple[400],
      brandHover: vfPalette.brandPurple[300],
      brandActive: vfPalette.brandPurple[500],

      status: vfSemantic.color.status,

      surface: {
        page: vfPalette.neutral[950],
        card: vfPalette.neutral[900],
        raised: vfPalette.neutral[800],
        overlay: vfPalette.neutral[800],
        input: "#FFFFFF",
      },

      text: {
        primary: vfPalette.neutral[0],
        secondary: "rgba(255,255,255,0.78)",
        tertiary: "rgba(255,255,255,0.62)",
        disabled: "rgba(255,255,255,0.45)",
        inverse: vfPalette.neutral[950],
      },

      border: {
        default: "#FFFFFF",
        strong: "#FFFFFF",
        divider: "#FFFFFF",
      },

      action: {
        hoverBase: "255 255 255",
        hoverAlpha: 0.06,
        activeBase: "255 255 255",
        activeAlpha: 0.10,
      },

      focus: {
        ringBase: vfPalette.brandPurple[400],
        ringAlpha: 0.32,
      },

      mask: { base: "0 0 0", alpha: 0.60 },
    },

    elevation: {
      card: "0 1px 2px rgba(0,0,0,0.35)",
      overlay: "0 10px 28px rgba(0,0,0,0.55)",
    },
  },
} as const;
