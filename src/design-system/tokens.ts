export type VFMode = "light" | "dark";

export const vfLayout = {
  radius: { tag: 6, control: 8, card: 12 },
  controlHeight: { desktop: 40, mobile: 44 },
  // Layout constraints from spec
  headerHeight: 56,
  siderWidthExpanded: 240,
  siderWidthCollapsed: 72,
  pagePadding: 24,
} as const;

// Kept for compatibility if you need specific logic, 
// but colors should be derived from tokens.css
export const vfSemantic = {
  layout: vfLayout,
} as const;