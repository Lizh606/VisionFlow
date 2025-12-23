
import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, Input, Divider } from 'antd';
import type { MenuProps } from 'antd';
import {
  LayoutGrid,
  Server,
  Check,
  Plus,
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
  const [openKeys, setOpenKeys] = useState<string[]>(['self-hosted', 'marketplace-menu']);

  useEffect(() => {
    if (activeKey.startsWith('sh-')) {
      setOpenKeys(prev => Array.from(new Set([...prev, 'self-hosted'])));
    }
    if (activeKey.startsWith('marketplace')) {
      setOpenKeys(prev => Array.from(new Set([...prev, 'marketplace-menu'])));
    }
  }, [activeKey]);

  // 搜索过滤逻辑
  const filteredWorkspaces = workspaces.filter(ws => 
    ws.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // 下拉菜单内容还原
  const workspaceDropdownContent = (
    <div className="bg-bg-card rounded-[14px] shadow-overlay border border-border p-3 flex flex-col gap-1 w-[260px] animate-in fade-in slide-in-from-top-1 duration-150">
      <div className="px-1 mb-2">
        <Input 
          placeholder="Search workspaces..." 
          prefix={<Search size={14} className="text-text-tertiary" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="bg-bg-page border-border text-sm rounded-control h-10 hover:border-brand/40 focus:border-brand transition-all"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div className="flex flex-col gap-1 max-h-[320px] overflow-y-auto custom-scrollbar">
        {filteredWorkspaces.map(ws => {
          const isSelected = activeWorkspace.id === ws.id;
          return (
            <div 
              key={ws.id}
              onClick={() => { setActiveWorkspace(ws); setDropdownOpen(false); }}
              className={`flex items-center justify-between h-12 px-3 rounded-control cursor-pointer transition-all ${isSelected ? 'bg-brand/5' : 'hover:bg-action-hover'}`}
            >
              <div className="flex flex-col min-w-0">
                <span className={`text-[13px] font-bold truncate ${isSelected ? 'text-brand' : 'text-text-primary'}`}>{ws.name}</span>
                <span className="text-[11px] text-text-secondary font-medium truncate opacity-60">{ws.plan} · {ws.members} Members</span>
              </div>
              {isSelected && <Check size={14} strokeWidth={3} className="text-brand shrink-0 ml-2" />}
            </div>
          );
        })}
      </div>
      <div className="h-px bg-divider mx-1 my-2" />
      <div className="flex items-center gap-2.5 h-11 px-3 rounded-control cursor-pointer hover:bg-action-hover text-text-primary group transition-colors">
        <div className="flex items-center justify-center w-6 h-6 rounded-full border border-border bg-bg-page group-hover:border-brand/40 group-hover:text-brand transition-all">
          <Plus size={14} />
        </div>
        <span className="text-[13px] font-bold group-hover:text-brand transition-colors">Create Workspace</span>
      </div>
    </div>
  );

  const mainItems: MenuProps['items'] = [
    {
      key: 'workflows',
      icon: <LayoutGrid size={18} />,
      label: <span className="vf-t5-strong">{t('menu.workflows')}</span>,
      onClick: () => onNavigate?.('workflows'),
    },
    {
      key: 'marketplace-menu',
      icon: <ShoppingBag size={18} />,
      label: <span className="vf-t5-strong">{t('menu.marketplace')}</span>,
      children: [
        { key: 'marketplace', icon: <Store size={16} />, label: <span className="vf-t5">{t('marketplace.home.title')}</span>, onClick: () => onNavigate?.('marketplace') },
        { key: 'marketplace-library', icon: <Package size={16} />, label: <span className="vf-t5">{t('marketplace.library.title')}</span>, onClick: () => onNavigate?.('marketplace-library') },
        { key: 'marketplace-seller', icon: <Inbox size={16} />, label: <span className="vf-t5">{t('marketplace.seller.myListings')}</span>, onClick: () => onNavigate?.('marketplace-seller') },
      ],
    },
    {
      key: 'self-hosted',
      icon: <Server size={18} />,
      label: <span className="vf-t5-strong">{t('menu.selfHosted')}</span>,
      children: [
        { key: 'sh-overview', icon: <LayoutDashboard size={14} />, label: <span className="vf-t5">{t('menu.overview')}</span>, onClick: () => onNavigate?.('sh-overview') },
        { key: 'sh-devices', icon: <Cpu size={14} />, label: <span className="vf-t5">{t('menu.devices')}</span>, onClick: () => onNavigate?.('sh-devices') },
        { key: 'sh-license', icon: <KeyRound size={14} />, label: <span className="vf-t5">{t('menu.license')}</span>, onClick: () => onNavigate?.('sh-license') },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full bg-bg-card">
      <VFBrand collapsed={collapsed} onClick={() => onNavigate?.('workflows')} />
      
      {/* Workspace Selector Segment */}
      <div className={`px-4 mt-2 mb-4 shrink-0 ${collapsed ? 'hidden' : ''}`}>
        <Dropdown 
          open={dropdownOpen} 
          onOpenChange={setDropdownOpen} 
          dropdownRender={() => workspaceDropdownContent} 
          trigger={['click']}
          placement="bottomLeft"
        >
          <div 
            tabIndex={0}
            className={`
              ant-dropdown-trigger 
              group flex items-center justify-between h-[52px] px-3.5 rounded-[12px] border transition-all duration-200
              cursor-pointer outline-none bg-bg-card
              ${dropdownOpen ? 'border-brand ring-4 ring-brand/5 shadow-sm' : 'border-border hover:bg-action-hover'}
            `}
          >
            <div className="flex flex-col min-w-0 flex-1">
              <span className={`text-[13px] font-bold truncate leading-tight transition-colors ${dropdownOpen ? 'text-brand' : 'text-text-primary'}`}>
                {activeWorkspace.name}
              </span>
              <span className={`text-[11px] font-medium text-text-secondary truncate mt-0.5 opacity-70`}>
                {activeWorkspace.plan} Plan
              </span>
            </div>
            <ChevronDown 
              size={16} 
              className={`text-text-secondary shrink-0 ml-2 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-brand' : 'group-hover:text-text-primary'}`} 
            />
          </div>
        </Dropdown>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-2">
        <Menu
          mode="inline"
          inlineCollapsed={collapsed}
          selectedKeys={[activeKey]}
          openKeys={collapsed ? [] : openKeys}
          onOpenChange={setOpenKeys}
          items={mainItems}
          className="vf-sidebar-menu border-none bg-transparent"
        />
      </div>
      
      <SidebarSystemArea collapsed={collapsed} />
      
      <style>{`
        .vf-sidebar-menu .ant-menu-item-selected {
           background-color: rgba(var(--vf-brand), 0.06) !important;
           color: rgba(var(--vf-brand), 1) !important;
        }
        .vf-sidebar-menu .ant-menu-item, .vf-sidebar-menu .ant-menu-submenu-title {
           height: 40px !important;
           line-height: 40px !important;
        }
      `}</style>
    </div>
  );
};
