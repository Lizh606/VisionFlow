
import React from 'react';
import { Layout, Switch, Dropdown, Button, Avatar } from 'antd';
import { useTranslation } from 'react-i18next';
import { Languages, User, Moon, Sun, PanelLeftClose, PanelLeftOpen, Menu as MenuIcon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import type { MenuProps } from 'antd';
import { vfSemantic } from '../../design-system/tokens';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  isMobile: boolean;
}

export const Header: React.FC<HeaderProps> = ({ collapsed, onCollapse, isMobile }) => {
  const { mode, toggleTheme } = useTheme();
  const { i18n } = useTranslation();
  
  const handleLangClick: MenuProps['onClick'] = (e) => {
    i18n.changeLanguage(e.key);
  };

  const langItems: MenuProps['items'] = [
    { key: 'en', label: 'English' },
    { key: 'zh', label: '中文' },
  ];

  return (
    <AntHeader 
      className="sticky top-0 z-20 flex items-center justify-between border-b shadow-sm transition-colors duration-300 border-border bg-bg-card/90 backdrop-blur-sm"
      style={{ 
        height: vfSemantic.layout.headerHeight, 
        padding: '0 24px',
        lineHeight: 'normal'
      }}
    >
      {/* Left side: Sidebar Toggle */}
      <div className="flex items-center">
        <Button 
          type="text"
          icon={
            isMobile ? <MenuIcon size={20} /> : 
            (collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />)
          }
          onClick={() => onCollapse(!collapsed)}
          className="flex items-center justify-center w-9 h-9 rounded-control hover:bg-action-hover text-text-secondary hover:text-brand transition-all"
        />
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Theme Switch */}
        <Switch
          checked={mode === 'dark'}
          onChange={toggleTheme}
          checkedChildren={<div className="flex items-center justify-center h-full w-full"><Moon size={12} /></div>}
          unCheckedChildren={<div className="flex items-center justify-center h-full w-full"><Sun size={12} /></div>}
          className="bg-text-tertiary"
        />

        {/* Language */}
        <Dropdown menu={{ items: langItems, onClick: handleLangClick }} placement="bottomRight" arrow>
          <Button 
            type="text" 
            icon={<Languages size={18} className="text-text-secondary" />} 
            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-action-hover transition-colors"
          />
        </Dropdown>

        {/* Divider */}
        <div className="h-5 w-px bg-border-divider mx-1" />

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer py-1 px-2 rounded-control hover:bg-action-hover transition-colors border border-transparent hover:border-border">
          <Avatar 
            size="small" 
            icon={<User size={16} />} 
            className="bg-brand text-white flex items-center justify-center shadow-sm" 
          />
          <span className="text-sm font-medium text-text-primary hidden sm:block">Admin</span>
        </div>
      </div>
    </AntHeader>
  );
};
