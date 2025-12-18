
import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Input } from 'antd';
import type { MenuProps } from 'antd';
import {
  LayoutGrid,
  Server,
  Settings,
  ShieldCheck,
  LifeBuoy,
  ChevronsUpDown,
  Check,
  Plus,
  Search
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { vfLayout } from '../../design-system/tokens';

const { Sider } = Layout;

// Mock Data for Workspaces with high-quality images
const workspaces = [
  { 
    id: '1', 
    name: 'Vision Team', 
    plan: 'Pro', 
    members: 8, 
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=64&h=64&q=80', 
    color: 'bg-brand' 
  },
  { 
    id: '2', 
    name: 'Personal', 
    plan: 'Free', 
    members: 1, 
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=64&h=64&q=80', 
    color: 'bg-text-tertiary' 
  },
  { 
    id: '3', 
    name: 'R&D Dept', 
    plan: 'Ent', 
    members: 24, 
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=64&h=64&q=80', 
    color: 'bg-info' 
  },
  { 
    id: '4', 
    name: 'Marketing', 
    plan: 'Pro', 
    members: 5, 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=64&h=64&q=80', 
    color: 'bg-warning' 
  },
];

// SidebarProps interface definition
interface SidebarProps {
  collapsed: boolean;
  isMobile?: boolean;
  activeKey?: string;
  onNavigate?: (key: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  collapsed, 
  isMobile, 
  activeKey = 'workflows', 
  onNavigate 
}) => {
  const { t } = useTranslation();
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Primary Platform Navigation
  const mainItems: MenuProps['items'] = [
    {
      key: 'workflows',
      icon: <LayoutGrid size={18} strokeWidth={1.5} />,
      label: t('menu.workflows'),
      onClick: () => onNavigate?.('workflows'),
    },
    {
      key: 'self-hosted',
      icon: <Server size={18} strokeWidth={1.5} />,
      label: t('menu.selfHosted'),
      children: [
        {
          key: 'sh-overview',
          label: t('menu.overview'),
          onClick: () => onNavigate?.('sh-overview'),
        },
        {
          key: 'sh-devices',
          label: t('menu.devices'),
          onClick: () => onNavigate?.('sh-devices'),
        },
        {
          key: 'sh-license',
          label: t('menu.license'),
          onClick: () => onNavigate?.('sh-license'),
        },
      ],
    },
    {
      key: 'security',
      icon: <ShieldCheck size={18} strokeWidth={1.5} />,
      label: t('menu.security'),
      onClick: () => onNavigate?.('security'),
    },
  ];

  // Secondary/System Navigation
  const bottomItems: MenuProps['items'] = [
    {
      key: 'support',
      icon: <LifeBuoy size={18} strokeWidth={1.5} />,
      label: t('menu.support'),
    },
    {
      key: 'settings',
      icon: <Settings size={18} strokeWidth={1.5} />,
      label: t('menu.settings'),
    },
  ];

  // Filter logic for Dropdown
  const filteredWorkspaces = workspaces.filter(ws => 
    ws.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const dropdownWidth = collapsed ? 240 : (vfLayout.siderWidthExpanded - 30);

  const workspaceDropdownContent = (
    <div 
      className="bg-bg-card rounded-card shadow-overlay border border-border p-2 flex flex-col gap-2 transition-all duration-200"
      style={{ width: dropdownWidth }}
    >
      <div className="px-1">
        <Input 
          placeholder="Search workspaces..." 
          prefix={<Search size={14} className="text-text-tertiary" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="bg-bg-page border-border text-sm"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div className="text-[11px] font-bold text-text-tertiary px-3 mt-1 tracking-wider">WORKSPACES</div>
      
      <div className="flex flex-col max-h-[200px] overflow-y-auto custom-scrollbar gap-0.5">
        {filteredWorkspaces.length > 0 ? (
          filteredWorkspaces.map(ws => (
            <div 
              key={ws.id}
              onClick={() => {
                setActiveWorkspace(ws);
                setDropdownOpen(false);
                setSearchText('');
              }}
              className={`
                flex items-center justify-between p-2 rounded-control cursor-pointer transition-colors
                ${activeWorkspace.id === ws.id ? 'bg-brand/5' : 'hover:bg-bg-page'}
              `}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <Avatar 
                  shape="square" 
                  size={24}
                  src={ws.image}
                  className={`${ws.color} rounded-tag shrink-0 border border-black/5 dark:border-white/5`}
                />
                <div className="flex flex-col min-w-0">
                  <span className={`text-sm font-medium truncate ${activeWorkspace.id === ws.id ? 'text-brand' : 'text-text-primary'}`}>
                    {ws.name}
                  </span>
                  <span className="text-xs text-text-tertiary truncate">{ws.plan} · {ws.members} Members</span>
                </div>
              </div>
              {activeWorkspace.id === ws.id && <Check size={16} className="text-brand shrink-0" />}
            </div>
          ))
        ) : (
          <div className="p-3 text-center text-sm text-text-tertiary">No workspaces found</div>
        )}
      </div>

      <div className="h-px bg-divider mx-1 my-1" />
      
      <div 
        className="flex items-center gap-3 p-2 rounded-control cursor-pointer hover:bg-bg-page text-text-secondary hover:text-text-primary transition-colors"
        onClick={() => setDropdownOpen(false)}
      >
        <div className="w-6 h-6 flex items-center justify-center rounded-md border border-dashed border-border text-text-tertiary shrink-0">
          <Plus size={14} />
        </div>
        <span className="text-sm font-medium truncate">Create Workspace</span>
      </div>
    </div>
  );

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={vfLayout.siderWidthExpanded}
      collapsedWidth={vfLayout.siderWidthCollapsed}
      className="!bg-bg-card border-r border-border z-30 h-full"
    >
      <div className="flex flex-col h-full">
        {/* --- 1. Logo Section --- */}
        <div 
          className="flex items-center justify-center shrink-0 overflow-hidden relative transition-all duration-300"
          style={{ height: vfLayout.headerHeight }}
        >
          <div className={`flex items-center gap-3 transition-all duration-300 ${collapsed ? 'w-full justify-center' : 'w-full pl-8'}`}>
            {/* System Logo Section */}
            <div className="relative group cursor-pointer shrink-0">
               {/* 
                  Refinement: Removed padding (p-1) to allow the image to fill the container perfectly.
                  This results in a 100% clean image box without any background, border, shadow, or internal spacing.
               */}
               <div className="relative flex items-center justify-center w-9 h-9 rounded-control overflow-hidden transition-all duration-300 group-hover:scale-105">
                 <img 
                   src="https://p.ipic.vip/8id4dm.jpg" 
                   alt="VisionFlow Logo" 
                   className="w-full h-full object-contain"
                 />
               </div>
            </div>
            
            <span 
              className={`
                text-xl font-bold text-text-primary tracking-tight whitespace-nowrap transition-all duration-300
                ${collapsed ? 'opacity-0 w-0 hidden' : 'opacity-100 w-auto'}
              `}
            >
              VisionFlow
            </span>
          </div>
        </div>

        {/* --- 2. Workspace Switcher --- */}
        <div className={`transition-all duration-200 mb-3 ${collapsed ? 'mt-3 px-0' : 'mt-3 px-4'}`}>
          <Dropdown 
            open={dropdownOpen}
            onOpenChange={setDropdownOpen}
            dropdownRender={() => workspaceDropdownContent}
            trigger={['click']} 
            placement="bottom"
            overlayClassName="vf-dropdown-reset"
          >
            {collapsed ? (
              <div className="flex justify-center w-full">
                <div className="w-10 h-10 flex items-center justify-center rounded-control hover:bg-bg-page cursor-pointer transition-colors group">
                  <Avatar 
                    shape="square" 
                    size={24}
                    src={activeWorkspace.image}
                    className={`${activeWorkspace.color} rounded-control shadow-sm transition-transform group-hover:scale-105 border border-black/10 dark:border-white/10`}
                  />
                </div>
              </div>
            ) : (
              <div className="
                group
                flex items-center justify-between 
                py-2 px-4 rounded-xl
                border border-border 
                hover:border-brand/40 hover:shadow-sm
                cursor-pointer transition-all duration-200
                bg-bg-card
              ">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Avatar 
                    shape="square" 
                    size={24} 
                    src={activeWorkspace.image}
                    className={`${activeWorkspace.color} rounded-lg shrink-0 border border-black/5 dark:border-white/5`}
                  />
                  <div className="flex flex-col min-w-0 items-start gap-0.5">
                    <span className="text-sm font-bold text-text-primary truncate leading-none">
                      {activeWorkspace.name}
                    </span>
                    <span className="text-[11px] text-text-tertiary truncate leading-none">
                      {activeWorkspace.plan} Plan • {activeWorkspace.members} Members
                    </span>
                  </div>
                </div>
                <ChevronsUpDown size={14} className="text-text-tertiary group-hover:text-text-secondary shrink-0 ml-1" />
              </div>
            )}
          </Dropdown>
        </div>

        {/* --- 3. Main Navigation --- */}
        <div className={`flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-1 mt-1 ${collapsed ? 'px-2' : 'px-4'}`}>
          <Menu
            mode="inline"
            inlineCollapsed={collapsed}
            selectedKeys={[activeKey]}
            defaultOpenKeys={['self-hosted']}
            items={mainItems}
            className="border-none bg-transparent !border-r-0 font-medium"
            style={{ 
              fontSize: '14px', 
              width: '100%',
            }}
          />
        </div>

        {/* --- 4. Bottom Navigation --- */}
        <div className={`shrink-0 py-4 border-t border-divider ${collapsed ? 'px-2' : 'px-4'}`}>
          <Menu
            mode="inline"
            inlineCollapsed={collapsed}
            selectable={false}
            items={bottomItems}
            className="border-none bg-transparent !border-r-0 text-text-secondary"
            style={{ fontSize: '14px', width: '100%' }}
          />
        </div>
      </div>
    </Sider>
  );
};
