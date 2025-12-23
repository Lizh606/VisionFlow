
import React from 'react';
import { Dropdown, Avatar, Tooltip, MenuProps } from 'antd';
import { User, LogOut, Settings, Globe, HelpCircle, ChevronRight, Moon, Sun, Palette, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useResponsive } from '../../shared/hooks/useResponsive';
import { useTheme } from '../../app/providers/ThemeContext';

interface Props {
  collapsed: boolean;
}

export const SidebarSystemArea: React.FC<Props> = ({ collapsed }) => {
  const { i18n, t } = useTranslation();
  const { mode, toggleTheme } = useTheme();
  const { isMobile } = useResponsive();

  const handleMenuClick: MenuProps['onClick'] = (info) => {
    if (info.key === 'en' || info.key === 'zh') {
      i18n.changeLanguage(info.key);
    } else if (info.key === 'light' || info.key === 'dark') {
      if (info.key !== mode) {
        toggleTheme();
      }
    }
  };

  const menuPlacement = isMobile ? 'bottomRight' : 'rightBottom';

  const languageOptions = [
    { key: 'zh', label: '简体中文' },
    { key: 'en', label: 'English' },
  ];

  const themeOptions = [
    { key: 'light', label: t('menu.lightMode'), icon: <Sun size={14} /> },
    { key: 'dark', label: t('menu.darkMode'), icon: <Moon size={14} /> },
  ];

  // 辅助组件：标准化菜单项 Label 结构
  const MenuItemLabel = ({ icon: Icon, label }: { icon: React.ElementType, label: string }) => (
    <div className="flex items-center gap-2.5 h-full">
      <Icon size={15} className="text-text-secondary shrink-0" />
      <span className="text-[13px] font-bold text-text-primary whitespace-nowrap leading-none pt-[1px]">
        {label}
      </span>
    </div>
  );

  const settingsItems: MenuProps['items'] = [
    {
      key: 'theme-group',
      label: <MenuItemLabel icon={Palette} label={t('menu.theme')} />,
      children: isMobile ? undefined : themeOptions.map(opt => ({
        ...opt,
        label: (
          <div className="flex items-center justify-between w-full min-w-[120px]">
            <span className="font-medium text-[13px]">{opt.label}</span>
            {mode === opt.key && <Check size={12} className="ml-4 text-brand" strokeWidth={3} />}
          </div>
        )
      })),
    },
    { type: 'divider' },
    {
      key: 'language-group',
      label: <MenuItemLabel icon={Globe} label={t('menu.language')} />,
      children: isMobile ? undefined : languageOptions.map(opt => ({
        ...opt,
        label: (
          <div className="flex items-center justify-between w-full min-w-[120px]">
            <span className="font-medium text-[13px]">{opt.label}</span>
            {i18n.language === opt.key && <Check size={12} className="ml-4 text-brand" strokeWidth={3} />}
          </div>
        )
      })),
    },
    { type: 'divider' },
    {
      key: 'help',
      label: <MenuItemLabel icon={HelpCircle} label={t('menu.support')} />,
    }
  ];

  const userItems: MenuProps['items'] = [
    { key: 'profile', label: t('menu.profile'), icon: <User size={14} /> },
    { key: 'settings-direct', label: t('menu.accountSettings'), icon: <Settings size={14} /> },
    { type: 'divider' },
    { key: 'logout', label: t('menu.logout'), icon: <LogOut size={14} />, danger: true },
  ];

  return (
    <div className={`mt-auto flex flex-col gap-1 pt-4 border-t border-divider ${collapsed ? 'items-center px-2' : 'px-3'}`}>
      <Dropdown 
        menu={{ 
          items: settingsItems, 
          onClick: handleMenuClick,
          selectedKeys: [mode, i18n.language]
        }} 
        placement={menuPlacement} 
        trigger={['click']}
      >
        <Tooltip title={collapsed ? t('menu.settingsHelp') : ""} placement="right">
          <div className={`
            flex items-center gap-3 p-2 rounded-control cursor-pointer transition-all duration-200
            hover:bg-action-hover text-text-secondary hover:text-brand flex-nowrap overflow-hidden
            ${collapsed ? 'justify-center w-10 h-10' : 'w-full'}
          `}>
            <Settings size={18} className="shrink-0" />
            {!collapsed && (
              <div className="flex items-center justify-between flex-1 min-w-0 overflow-hidden flex-nowrap">
                <span className="text-[13px] font-bold whitespace-nowrap truncate mr-1 pt-[1px]">
                  {t('menu.settingsHelp')}
                </span>
                <ChevronRight size={12} className="opacity-40 shrink-0" />
              </div>
            )}
          </div>
        </Tooltip>
      </Dropdown>

      <div className="py-1">
        <Dropdown menu={{ items: userItems }} placement={menuPlacement} trigger={['click']}>
          <div className={`
            flex items-center gap-3 p-2 rounded-control cursor-pointer transition-all duration-200
            hover:bg-action-hover border border-transparent hover:border-border flex-nowrap overflow-hidden
            ${collapsed ? 'justify-center w-10 h-10' : 'w-full'}
          `}>
            <Avatar 
              size={collapsed ? 24 : 28} 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=64&h=64&q=80"
              className="shrink-0 border border-white/20 shadow-sm"
            />
            {!collapsed && (
              <div className="flex flex-col min-w-0 flex-1 overflow-hidden flex-nowrap">
                <span className="text-sm font-bold text-text-primary truncate leading-none mb-1 whitespace-nowrap">
                  Admin User
                </span>
                <span className="text-[10px] text-text-tertiary font-bold truncate leading-none uppercase tracking-tighter whitespace-nowrap">
                  Pro Plan
                </span>
              </div>
            )}
          </div>
        </Dropdown>
      </div>
    </div>
  );
};
