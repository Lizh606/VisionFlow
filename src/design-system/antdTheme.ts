
import { theme } from "antd";
import type { ThemeConfig } from "antd";
import type { VFMode } from "./tokens";

const vfColors = {
  light: {
    brand: '#6D29D9',
    brandHover: '#7F3DFF',
    brandActive: '#5B21B6',
    brandSoft: 'rgba(109, 41, 217, 0.06)', 
    info: '#818CF8',
    success: '#0F9D58',  
    warning: '#FBBC04',  
    error: '#EA4335',    
    bgPage: '#F8FAFC',
    bgCard: '#FFFFFF',
    bgOverlay: '#FFFFFF',
    textPrimary: '#0F172A',   
    textSecondary: '#475569', 
    textTertiary: '#64748B',  
    textDisabled: '#94A3B8',  
    border: '#E2E8F0',
    divider: '#E2E8F0',
  },
  dark: {
    brand: '#9B63FF',
    brandHover: '#B98CFF',
    brandActive: '#7F3DFF',
    brandSoft: 'rgba(155, 99, 255, 0.15)',
    info: '#A5B4FC',
    success: '#0F9D58',
    warning: '#FBBC04',
    error: '#EA4335',
    bgPage: '#0B0F1A',   
    bgCard: '#111522',   
    bgOverlay: '#1E2330',
    textPrimary: 'rgba(255, 255, 255, 1)',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
    textTertiary: 'rgba(255, 255, 255, 0.65)',
    textDisabled: 'rgba(255, 255, 255, 0.35)',
    border: 'rgba(255, 255, 255, 0.16)',
    divider: 'rgba(255, 255, 255, 0.12)',
  }
};

export function getAntdTheme(mode: VFMode): ThemeConfig {
  const isDark = mode === 'dark';
  const colors = isDark ? vfColors.dark : vfColors.light;

  return {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: colors.brand,
      colorPrimaryHover: colors.brandHover,
      colorPrimaryActive: colors.brandActive,
      colorInfo: colors.info,
      colorSuccess: colors.success,
      colorWarning: colors.warning,
      colorError: colors.error,
      colorBgLayout: colors.bgPage,
      colorBgContainer: colors.bgCard,
      colorBgElevated: colors.bgOverlay,
      colorText: colors.textPrimary,
      colorTextSecondary: colors.textSecondary,
      colorTextTertiary: colors.textTertiary,
      colorTextDisabled: colors.textDisabled,
      colorBorder: colors.border,
      colorSplit: colors.divider,
      // Global Link Token
      colorLink: colors.brand,
      colorLinkHover: colors.brandHover,
      colorLinkActive: colors.brandActive,
      borderRadius: 8,
      controlHeight: 40,
      fontFamily: `var(--vf-font-sans)`,
      fontSize: 14,
      lineHeight: 1.5,
      fontWeightStrong: 600,
    },

    components: {
      Typography: {
        fontWeightStrong: 600,
        colorTextHeading: colors.textPrimary,
      },
      Button: {
        borderRadius: 8,
        primaryShadow: 'none',
        fontWeight: 500,
        defaultColor: colors.textSecondary,
        defaultHoverColor: colors.brand,
        defaultHoverBorderColor: colors.brand,
        defaultActiveColor: colors.brandActive,
        defaultActiveBorderColor: colors.brandActive,
        ghostBg: 'transparent',
        // Component-level Link Colors
        colorLink: colors.brand,
        colorLinkHover: colors.brandHover,
        colorLinkActive: colors.brandActive,
      },
      Card: {
        borderRadiusLG: 12,
        headerBg: 'transparent',
        paddingLG: 20,
      },
      Layout: {
        bodyBg: colors.bgPage,
        siderBg: colors.bgCard,
        headerBg: colors.bgCard,
      },
      Menu: {
        itemBg: 'transparent',
        subMenuItemBg: 'transparent',
        itemSelectedBg: isDark ? 'rgba(var(--vf-brand), 0.15)' : 'rgba(var(--vf-brand), 0.06)',
        itemSelectedColor: colors.brand,
        itemHoverBg: 'rgba(var(--vf-hover), var(--vf-hover-alpha))',
        itemActiveBg: 'rgba(var(--vf-brand), 0.1)',
        itemColor: colors.textSecondary,
        itemBorderRadius: 8,
        itemMarginInline: 8, 
        iconMarginInlineEnd: 12,
        itemHeight: 44,
        fontSize: 14,
      },
      Table: {
        headerBg: colors.bgPage,
        headerColor: colors.textSecondary,
        headerSplitColor: colors.divider,
        borderColor: colors.border,
        fontSize: 14,
      }
    },
  };
}
