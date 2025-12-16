
import { theme } from "antd";
import type { ThemeConfig } from "antd/es/config-provider/context";
import { vfTheme, type VFMode } from "./tokens";

export function getAntdTheme(mode: VFMode): ThemeConfig {
  const t = vfTheme[mode];

  return {
    algorithm: mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      // Brand
      colorPrimary: t.color.brand,
      colorInfo: t.color.status.info,
      colorSuccess: t.color.status.success,
      colorWarning: t.color.status.warning,
      colorError: t.color.status.error,

      // Surface/Text/Border
      colorBgLayout: t.color.surface.page,
      colorBgContainer: t.color.surface.card,
      colorBgElevated: t.color.surface.overlay,

      colorText: t.color.text.primary,
      colorTextSecondary: t.color.text.secondary,
      colorTextTertiary: t.color.text.tertiary,
      colorTextDisabled: t.color.text.disabled,

      colorBorder: t.color.border.default,
      colorSplit: t.color.border.divider,

      // Radius & Size
      borderRadius: 8,
      controlHeight: 40,
      controlHeightSM: 32,
    },

    components: {
      Button: {
        borderRadius: 8,
      },
      Card: {
        borderRadiusLG: 12,
        headerBg: 'transparent',
      },
      Layout: {
        bodyBg: t.color.surface.page,
        siderBg: t.color.surface.card, // Sidebar uses card background
        headerBg: t.color.surface.card,
      },
      Menu: {
        itemBg: 'transparent',
        subMenuItemBg: 'transparent',
        activeBarBorderWidth: 0,
        itemSelectedBg: mode === 'dark' ? 'rgba(155, 99, 255, 0.15)' : '#F5EEFF', // Matches brand 50/Alpha
        itemSelectedColor: t.color.brand,
        itemBorderRadius: 8,
        itemMarginInline: 0, // Ensure items fill the width defined by parent padding
        itemHeight: 40,
        iconMarginInlineEnd: 12, // More space between icon and text
      },
    },
  };
}
