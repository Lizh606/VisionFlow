
import React, { useState, useEffect, useMemo } from 'react';
import { Menu, Dropdown, Input } from 'antd';
import type { MenuProps } from 'antd';
import {
  LayoutGrid,
  Server,
  Check,
  Search,
  ChevronDown,
  ShoppingBag,
  Store,
  Package,
  LayoutDashboard,
  Cpu,
  KeyRound,
  Inbox
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SidebarSystemArea } from './SidebarSystemArea';
import { VFBrand } from '../../shared/ui/VFBrand';
import { VFText } from '../../ui/VFText';

type MenuItem = Required<MenuProps>['items'][number];

const workspaces = [
  { id: '1', name: 'Vision Team', plan: 'Pro', members: 8 },
  { id: '2', name: 'Personal', plan: 'Free', members: 1 },
  { id: '3', name: 'R&D Dept', plan: 'Ent', members: 24 },
];

interface SidebarProps {
  collapsed: boolean;
  activeKey?: string;
  onNavigate?: (key: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  collapsed, 
  activeKey = 'workflows', 
  onNavigate 
}) => {
  const { t } = useTranslation();
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  // 记录非折叠状态下的展开项
  const [lastOpenKeys, setLastOpenKeys] = useState<string[]>(['self-hosted', 'marketplace-menu']);

  // 展开逻辑处理：折叠时清空 openKeys，取消折叠时恢复
  const currentOpenKeys = useMemo(() => collapsed ? [] : lastOpenKeys, [collapsed, lastOpenKeys]);

  const handleOpenChange = (keys: string[]) => {
    if (!collapsed) {
      setLastOpenKeys(keys);
    }
  };

  const workspaceDropdownContent = (
    <div className="bg-bg-card rounded-[14px] shadow-overlay border border-border p-3 flex flex-col gap-1 w-[260px] animate-in fade-in slide-in-from-top-1 duration-150">
      <div className="px-1 mb-2">
        <Input 
          placeholder="Search workspaces..." 
          prefix={<Search size={14} className="text-text-tertiary" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="bg-bg-page border-border text-sm rounded-control h-10"
        />
      </div>
      <div className="flex flex-col gap-1 max-h-[320px] overflow-y-auto custom-scrollbar">
        {workspaces.filter(ws => ws.name.toLowerCase().includes(searchText.toLowerCase())).map(ws => {
          const isSelected = activeWorkspace.id === ws.id;
          return (
            <div 
              key={ws.id}
              onClick={() => { setActiveWorkspace(ws); setDropdownOpen(false); }}
              className={`flex items-center justify-between h-12 px-3 rounded-control cursor-pointer transition-all ${isSelected ? 'bg-brand/5' : 'hover:bg-action-hover'}`}
            >
              <div className="flex flex-col min-w-0">
                <VFText variant="t5-strong" color={isSelected ? 'brand' : 'primary'} truncate>{ws.name}</VFText>
                <VFText variant="t6" color="secondary" truncate className="opacity-60">{ws.plan} · {ws.members} Members</VFText>
              </div>
              {isSelected && <Check size={14} strokeWidth={3} className="text-brand shrink-0 ml-2" />}
            </div>
          );
        })}
      </div>
    </div>
  );

  const menuItems: MenuItem[] = useMemo(() => [
    {
      key: 'workflows',
      icon: <LayoutGrid size={18} />,
      label: t('menu.workflows'),
    },
    {
      key: 'marketplace-menu',
      icon: <ShoppingBag size={18} />,
      label: t('menu.marketplace'),
      children: [
        { key: 'marketplace', icon: <Store size={16} />, label: t('marketplace.home.title') },
        { key: 'marketplace-library', icon: <Package size={16} />, label: t('marketplace.library.title') },
        { key: 'marketplace-seller', icon: <Inbox size={16} />, label: t('marketplace.seller.myListings') },
      ],
    },
    {
      key: 'self-hosted',
      icon: <Server size={18} />,
      label: t('menu.selfHosted'),
      children: [
        { key: 'sh-overview', icon: <LayoutDashboard size={14} />, label: t('menu.overview') },
        { key: 'sh-devices', icon: <Cpu size={14} />, label: t('menu.devices') },
        { key: 'sh-license', icon: <KeyRound size={14} />, label: t('menu.license') },
      ],
    },
  ], [t]);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    onNavigate?.(e.key);
  };

  return (
    <div className="flex flex-col h-full bg-bg-card">
      <VFBrand collapsed={collapsed} onClick={() => onNavigate?.('workflows')} />
      
      {/* Workspace Selector */}
      <div className={`px-4 mt-2 mb-4 shrink-0 transition-all duration-200 ${collapsed ? 'opacity-0 h-0 overflow-hidden mb-0' : 'opacity-100'}`}>
        <Dropdown 
          open={dropdownOpen} 
          onOpenChange={setDropdownOpen} 
          dropdownRender={() => workspaceDropdownContent} 
          trigger={['click']}
          placement="bottomLeft"
        >
          <div className={`group flex items-center justify-between h-[52px] px-3.5 rounded-[12px] border transition-all duration-200 cursor-pointer outline-none bg-bg-card ${dropdownOpen ? 'border-brand ring-4 ring-brand/5 shadow-sm' : 'border-border hover:bg-action-hover'}`}>
            <div className="flex flex-col min-w-0 flex-1">
              <VFText variant="t5-strong" color={dropdownOpen ? 'brand' : 'primary'} truncate>{activeWorkspace.name}</VFText>
              <VFText variant="t6" color="secondary" truncate className="opacity-70">{activeWorkspace.plan} Plan</VFText>
            </div>
            <ChevronDown size={16} className={`text-text-secondary shrink-0 ml-2 transition-transform ${dropdownOpen ? 'rotate-180 text-brand' : 'group-hover:text-text-primary'}`} />
          </div>
        </Dropdown>
      </div>

      {/* Main Navigation Menu - 修复点：折叠时必须 overflow-visible 否则 Popup 会被截断 */}
      <div className={`flex-1 ${collapsed ? 'overflow-visible' : 'overflow-y-auto overflow-x-hidden custom-scrollbar'}`}>
        <Menu
          mode="inline"
          inlineCollapsed={collapsed}
          selectedKeys={[activeKey]}
          openKeys={currentOpenKeys}
          onOpenChange={handleOpenChange}
          items={menuItems}
          onClick={handleMenuClick}
          className="vf-sidebar-menu border-none bg-transparent"
        />
      </div>
      
      <SidebarSystemArea collapsed={collapsed} />
    </div>
  );
};
