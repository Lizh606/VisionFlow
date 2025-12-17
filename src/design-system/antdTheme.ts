
import { theme } from "antd";
import type { ThemeConfig } from "antd";
import type { VFMode } from "./tokens";

// Define strict color palette mirroring tokens.css
const vfColors = {
  light: {
    brand: '#6D29D9',       // --vf-brand
    brandHover: '#7F3DFF',  // --vf-brand-hover
    brandActive: '#5B21B6', // --vf-brand-active
    brandSoft: 'rgba(109, 41, 217, 0.1)', 
    
    info: '#4285F4',     
    success: '#0F9D58',  
    warning: '#FBBC04',  
    error: '#EA4335',    
    
    bgPage: '#F6F8FB',   
    bgCard: '#FFFFFF',   
    bgOverlay: '#FFFFFF',
    
    textPrimary: '#111522',   
    textSecondary: '#4B5565', 
    textTertiary: '#6B778C',  
    textDisabled: '#9AA0A6',  
    
    border: '#E5EAF2',        
    divider: '#E5EAF2',
  },
  dark: {
    brand: '#9B63FF',       // --vf-brand (dark)
    brandHover: '#B98CFF',  // --vf-brand-hover (dark)
    brandActive: '#7F3DFF', // --vf-brand-active (dark)
    brandSoft: 'rgba(155, 99, 255, 0.15)',

    info: '#4285F4',
    success: '#0F9D58',
    warning: '#FBBC04',
    error: '#EA4335',
    
    bgPage: '#0B0F1A',   
    bgCard: '#111522',   
    bgOverlay: '#1E2330',
    
    textPrimary: 'rgba(255, 255, 255, 1)',
    textSecondary: 'rgba(255, 255, 255, 0.65)',
    textTertiary: 'rgba(255, 255, 255, 0.45)',
    textDisabled: 'rgba(255, 255, 255, 0.25)',
    
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
      // --- Global Tokens ---
      // Setting colorPrimary here is the Single Source of Truth.
      // Ant Design will automatically derive Button, Input, Spin, etc. from this.
      colorPrimary: colors.brand,
      colorPrimaryHover: colors.brandHover,
      colorPrimaryActive: colors.brandActive,
      
      // Functional Colors
      colorInfo: colors.info,
      colorSuccess: colors.success,
      colorWarning: colors.warning,
      colorError: colors.error,

      // Backgrounds
      colorBgLayout: colors.bgPage,
      colorBgContainer: colors.bgCard,
      colorBgElevated: colors.bgOverlay,
      
      // Text
      colorText: colors.textPrimary,
      colorTextSecondary: colors.textSecondary,
      colorTextTertiary: colors.textTertiary,
      colorTextDisabled: colors.textDisabled,

      // Borders
      colorBorder: colors.border,
      colorSplit: colors.divider,

      // Shape
      borderRadius: 8,
      controlHeight: 40,
      controlHeightSM: 32,
    },

    components: {
      // --- Component Specific Tokens ---
      
      Button: {
        borderRadius: 8,
        primaryShadow: '0 2px 0 rgba(0, 0, 0, 0.05)',
      },
      Card: {
        borderRadiusLG: 12,
        headerBg: 'transparent',
      },
      Layout: {
        bodyBg: colors.bgPage,
        siderBg: colors.bgCard,
        headerBg: colors.bgCard,
      },
      Menu: {
        itemBg: 'transparent',
        subMenuItemBg: 'transparent',
        activeBarBorderWidth: 0,
        // For Menu, explicit overrides are still good because they have specific logic
        itemSelectedBg: colors.brandSoft,
        itemSelectedColor: colors.brand,
        itemBorderRadius: 8,
        itemMarginInline: 8, 
        itemHeight: 40,
        iconMarginInlineEnd: 12,
      },
      DatePicker: {
        colorBgElevated: colors.bgOverlay,
        controlItemBgActive: colors.brandSoft, 
      },
      Select: {
        optionSelectedBg: colors.brandSoft,
        optionSelectedColor: colors.brand,
      },
      Table: {
        headerBg: colors.bgPage,
        headerColor: colors.textSecondary,
        headerSplitColor: colors.divider,
      },
      Input: {
        activeBorderColor: colors.brand,
        hoverBorderColor: colors.brandHover,
      }
    },
  };
}
