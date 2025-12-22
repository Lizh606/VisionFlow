
import React from 'react';
import { Dropdown, Avatar, Tooltip, MenuProps } from 'antd';
import { Languages, User, LogOut, Settings, Globe, HelpCircle, ChevronRight, Moon, Sun, Palette, Check } from 'lucide-react';
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
    { key: 'zh', label: '简体中文', icon: <Globe size={14} /> },
    { key: 'en', label: 'English', icon: <Globe size={14} /> },
  ];

  const themeOptions = [
    { key: 'light', label: 'Light Mode', icon: <Sun size={14} /> },
    { key: 'dark', label: 'Dark Mode', icon: <Moon size={14} /> },
  ];

  const settingsItems: MenuProps['items'] = [
    {
      key: 'theme-group',
      label: isMobile ? (
        <div className="flex flex-col gap-1 py-1.5">
          <div className="flex items-center gap-2 text-text-tertiary mb-1 px-1">
            <Palette size={14} />
            <span className="text-[11px] font-bold uppercase tracking-wider">Theme</span>
          </div>
          <div className="flex flex-col gap-1 ml-2">
            {themeOptions.map(opt => (
              <div 
                key={opt.key}
                onClick={(e) => {
                  e.stopPropagation();
                  if (mode !== opt.key) toggleTheme();
                }}
                className={`flex items-center justify-between px-3 py-2.5 rounded-control transition-colors ${mode === opt.key ? 'bg-brand/10 text-brand' : 'hover:bg-action-hover text-text-secondary'}`}
              >
                <div className="flex items-center gap-2">
                  {opt.icon}
                  <span className="text-[13px] font-bold">{opt.label}</span>
                </div>
                {mode === opt.key && <Check size={14} strokeWidth={3} />}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full min-w-[160px] py-1">
          <div className="flex items-center gap-2.5 flex-nowrap">
            <Palette size={15} className="text-text-secondary shrink-0" />
            <span className="text-[13px] font-bold text-text-primary whitespace-nowrap">
              Theme
            </span>
          </div>
        </div>
      ),
      children: isMobile ? undefined : themeOptions.map(opt => ({
        ...opt,
        label: (
          <div className="flex items-center justify-between w-full py-0.5">
            <span className="font-medium">{opt.label}</span>
            {mode === opt.key && <Check size={12} className="ml-4 opacity-60 text-brand" strokeWidth={3} />}
          </div>
        )
      })),
    },
    { type: 'divider' },
    {
      key: 'language-group',
      label: isMobile ? (
        <div className="flex flex-col gap-1 py-1.5">
          <div className="flex items-center gap-2 text-text-tertiary mb-1 px-1">
            <Languages size={14} />
            <span className="text-[11px] font-bold uppercase tracking-wider">{t('common.language', { defaultValue: 'Language' })}</span>
          </div>
          <div className="flex flex-col gap-1 ml-2">
            {languageOptions.map(opt => (
              <div 
                key={opt.key}
                onClick={(e) => {
                  e.stopPropagation();
                  i18n.changeLanguage(opt.key);
                }}
                className={`flex items-center justify-between px-3 py-2.5 rounded-control transition-colors ${i18n.language === opt.key ? 'bg-brand/10 text-brand' : 'hover:bg-action-hover text-text-secondary'}`}
              >
                <div className="flex items-center gap-2">
                  {opt.icon}
                  <span className="text-[13px] font-bold">{opt.label}</span>
                </div>
                {i18n.language === opt.key && <Check size={14} strokeWidth={3} />}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full min-w-[160px] py-1">
          <div className="flex items-center gap-2.5 flex-nowrap">
            <Languages size={15} className="text-text-secondary shrink-0" />
            <span className="text-[13px] font-bold text-text-primary whitespace-nowrap">
              Language
            </span>
          </div>
        </div>
      ),
      children: isMobile ? undefined : languageOptions.map(opt => ({
        ...opt,
        label: (
          <div className="flex items-center justify-between w-full py-0.5">
            <span className="font-medium">{opt.label}</span>
            {i18n.language === opt.key && <Check size={12} className="ml-4 opacity-60 text-brand" strokeWidth={3} />}
          </div>
        )
      })),
    },
    { type: 'divider' },
    {
      key: 'help',
      label: (
        <div className="flex items-center gap-2.5 min-w-[160px] py-1">
          <HelpCircle size={15} className="text-text-secondary shrink-0" />
          <span className="text-[13px] font-bold text-text-primary whitespace-nowrap">
            Help and Support
          </span>
        </div>
      ),
    }
  ];

  const userItems: MenuProps['items'] = [
    { key: 'profile', label: 'My Profile', icon: <User size={14} /> },
    { key: 'settings-direct', label: 'Account Settings', icon: <Settings size={14} /> },
    { type: 'divider' },
    { key: 'logout', label: 'Logout', icon: <LogOut size={14} />, danger: true },
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
        overlayClassName="vf-system-dropdown"
      >
        <Tooltip title={collapsed ? "Settings and Help" : ""} placement="right">
          <div className={`
            flex items-center gap-3 p-2 rounded-control cursor-pointer transition-all duration-200
            hover:bg-action-hover text-text-secondary hover:text-brand flex-nowrap overflow-hidden
            ${collapsed ? 'justify-center w-10 h-10' : 'w-full'}
          `}>
            <Settings size={18} className="shrink-0" />
            {!collapsed && (
              <div className="flex items-center justify-between flex-1 min-w-0 overflow-hidden flex-nowrap">
                <span className="text-[13px] font-bold whitespace-nowrap truncate mr-1">
                  Settings and Help
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
