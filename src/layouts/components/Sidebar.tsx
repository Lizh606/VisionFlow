
import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, Input } from 'antd';
import type { MenuProps } from 'antd';
import {
  LayoutGrid,
  Server,
  Check,
  Plus,
  Search,
  ChevronDown,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SidebarSystemArea } from './SidebarSystemArea';

const workspaces = [
  { id: '1', name: 'Vision Team', plan: 'Pro', members: 8 },
  { id: '2', name: 'Personal', plan: 'Free', members: 1 },
  { id: '3', name: 'R&D Dept', plan: 'Ent', members: 24 },
  { id: '4', name: 'Marketing', plan: 'Pro', members: 5 },
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
  const [openKeys, setOpenKeys] = useState<string[]>(['self-hosted']);

  useEffect(() => {
    if (activeKey.startsWith('sh-')) {
      setOpenKeys(['self-hosted']);
    }
  }, [activeKey]);

  // Navigation Items - Removed 'security' item
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
        { key: 'sh-overview', label: t('menu.overview'), onClick: () => onNavigate?.('sh-overview') },
        { key: 'sh-devices', label: t('menu.devices'), onClick: () => onNavigate?.('sh-devices') },
        { key: 'sh-license', label: t('menu.license'), onClick: () => onNavigate?.('sh-license') },
      ],
    },
  ];

  const filteredWorkspaces = workspaces.filter(ws => 
    ws.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const workspaceDropdownContent = (
    <div className="bg-bg-card rounded-[14px] shadow-overlay border border-border p-3 flex flex-col gap-1 w-[260px] animate-in fade-in slide-in-from-top-1 duration-150">
      <div className="px-1 mb-2">
        <Input 
          placeholder="Search workspaces..." 
          prefix={<Search size={14} className="text-text-tertiary" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="bg-bg-page border-border text-sm rounded-control h-10 hover:border-brand/40 focus:border-brand transition-all"
        />
      </div>
      
      <div className="px-1 py-1">
        <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider opacity-60">
          Switch Workspace
        </span>
      </div>

      <div className="flex flex-col gap-1 max-h-[320px] overflow-y-auto custom-scrollbar">
        {filteredWorkspaces.map(ws => {
          const isSelected = activeWorkspace.id === ws.id;
          return (
            <div 
              key={ws.id}
              onClick={() => { setActiveWorkspace(ws); setDropdownOpen(false); }}
              className={`
                flex items-center justify-between h-12 px-3 rounded-control cursor-pointer transition-all
                ${isSelected ? 'bg-brand/5' : 'hover:bg-action-hover'}
              `}
            >
              <div className="flex flex-col min-w-0">
                <span className={`text-[13px] font-bold truncate ${isSelected ? 'text-brand' : 'text-text-primary'}`}>
                  {ws.name}
                </span>
                <span className="text-[11px] text-text-secondary font-medium truncate opacity-60">
                  {ws.plan} · {ws.members} {ws.members > 1 ? 'Members' : 'Member'}
                </span>
              </div>
              {isSelected && <Check size={14} strokeWidth={3} className="text-brand shrink-0 ml-2" />}
            </div>
          );
        })}
      </div>

      <div className="h-px bg-divider mx-1 my-2" />

      <div 
        className="flex items-center gap-2.5 h-11 px-3 rounded-control cursor-pointer hover:bg-action-hover text-text-primary group transition-colors"
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-full border border-border bg-bg-page group-hover:border-brand/40 group-hover:text-brand transition-all">
          <Plus size={14} />
        </div>
        <span className="text-[13px] font-bold group-hover:text-brand transition-colors">Create Workspace</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-bg-card">
      <div className="flex flex-col h-full">
        {/* A) Brand Header: 58px height, 16px horizontal padding */}
        <div className="flex items-center h-[58px] px-4 shrink-0 gap-2.5">
          <div className="w-7 h-7 flex items-center justify-center overflow-hidden rounded-md">
            <img 
              src="https://p.ipic.vip/vjblew.jpg" 
              alt="Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
          {!collapsed && (
            <span className="text-[17px] font-semibold text-text-primary tracking-tight whitespace-nowrap pt-0.5">
              VisionFlow
            </span>
          )}
        </div>

        {/* B) Workspace Selector: Neutral by default */}
        <div className={`px-4 mt-3 mb-4 shrink-0 ${collapsed ? 'hidden' : ''}`}>
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
                group flex items-center justify-between h-[52px] px-3.5 rounded-[12px] border transition-all duration-200
                cursor-pointer outline-none bg-bg-card
                ${dropdownOpen ? 'border-brand ring-4 ring-brand/5 shadow-sm' : 'border-border hover:bg-action-hover'}
              `}
            >
              <div className="flex flex-col min-w-0 flex-1">
                <span className={`text-[13px] font-bold truncate leading-tight transition-colors ${dropdownOpen ? 'text-brand' : 'text-text-primary'}`}>
                  {activeWorkspace.name}
                </span>
                <span className="text-[11px] font-medium text-text-secondary truncate mt-0.5 opacity-70">
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
      </div>
      
      <style>{`
        .vf-sidebar-menu.ant-menu-inline, 
        .vf-sidebar-menu.ant-menu-vertical {
          border-inline-end: none !important;
        }
      `}</style>
    </div>
  );
};
