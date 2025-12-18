
import { theme } from "antd";
import type { ThemeConfig } from "antd";
import type { VFMode } from "./tokens";

const vfColors = {
  light: {
    brand: '#6D29D9',
    brandHover: '#7F3DFF',
    brandActive: '#5B21B6',
    brandSoft: 'rgba(109, 41, 217, 0.1)', 
    
    info: '#818CF8',     /* 柔和靛青 */
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
    brand: '#9B63FF',
    brandHover: '#B98CFF',
    brandActive: '#7F3DFF',
    brandSoft: 'rgba(155, 99, 255, 0.15)',

    info: '#A5B4FC',    /* 暗色模式靛青 */
    success: '#0F9D58',
    warning: '#FBBC04',
    error: '#EA4335',
    
    bgPage: '#0B0F1A',   
    bgCard: '#111522',   
    bgOverlay: '#1E2330',
    
    /* 核心修复：提升暗色模式文字亮度系数 */
    textPrimary: 'rgba(255, 255, 255, 1)',
    textSecondary: 'rgba(255, 255, 255, 0.78)', /* 0.65 -> 0.78 */
    textTertiary: 'rgba(255, 255, 255, 0.62)',  /* 0.45 -> 0.62 */
    textDisabled: 'rgba(255, 255, 255, 0.35)',  /* 0.25 -> 0.35 */
    
    /* 核心修复：显著提升边框可见度 */
    border: 'rgba(255, 255, 255, 0.16)',        /* 0.16 使 Select/Input 轮廓清晰 */
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

      borderRadius: 8,
      controlHeight: 40,
      controlHeightSM: 32,
    },

    components: {
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
        /* 增加输入框内部背景深浅区分 */
        colorBgContainer: isDark ? 'rgba(255, 255, 255, 0.04)' : '#FFFFFF',
      },
      Select: {
        optionSelectedBg: colors.brandSoft,
        optionSelectedColor: colors.brand,
        /* 增加输入框内部背景深浅区分 */
        colorBgContainer: isDark ? 'rgba(255, 255, 255, 0.04)' : '#FFFFFF',
      },
      Table: {
        headerBg: colors.bgPage,
        headerColor: colors.textSecondary,
        headerSplitColor: colors.divider,
      },
      Input: {
        activeBorderColor: colors.brand,
        hoverBorderColor: colors.brandHover,
        colorBgContainer: isDark ? 'rgba(255, 255, 255, 0.04)' : '#FFFFFF',
      },
      Segmented: {
        trackBg: isDark ? 'rgba(255, 255, 255, 0.06)' : colors.bgPage,
        itemSelectedBg: colors.bgCard,
      }
    },
  };
}
