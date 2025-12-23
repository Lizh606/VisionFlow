
import React, { useState, useEffect } from 'react';
import { Layout, Drawer } from 'antd';
import { Sidebar } from './components/Sidebar';
import { MobileAppBar } from './components/MobileAppBar';
import { vfLayout } from '../design-system/tokens';
import { useResponsive } from '../shared/hooks/useResponsive';

const { Content, Sider } = Layout;

interface MainLayoutProps {
  children?: React.ReactNode;
  activePath?: string;
  onNavigate?: (key: string) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, activePath = 'workflows', onNavigate }) => {
  const { isMobile, shouldCollapseSidebar } = useResponsive();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setCollapsed(shouldCollapseSidebar);
  }, [shouldCollapseSidebar]);

  const handleNavigate = (key: string) => {
    if (onNavigate) onNavigate(key);
    if (isMobile) setMobileOpen(false);
  };

  const handleBrandClick = () => {
    handleNavigate('workflows');
  };

  return (
    <Layout className="h-screen w-screen overflow-hidden bg-bg-page flex flex-col md:flex-row">
      {/* 1. Mobile AppBar */}
      <MobileAppBar 
        onOpenMenu={() => setMobileOpen(true)} 
        onBrandClick={handleBrandClick}
      />

      {/* 2. Desktop/Tablet Sidebar (>= 768px) */}
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={vfLayout.siderWidthExpanded}
          collapsedWidth={vfLayout.siderWidthCollapsed}
          className="!bg-bg-card border-r border-border h-full flex flex-col shrink-0"
        >
          <Sidebar 
            collapsed={collapsed} 
            activeKey={activePath} 
            onNavigate={handleNavigate} 
          />
        </Sider>
      )}

      {/* 3. Mobile Navigation Drawer */}
      <Drawer
        placement="right"
        onClose={() => setMobileOpen(false)}
        open={mobileOpen && isMobile}
        styles={{ 
          body: { padding: 0 },
          header: { display: 'none' } 
        }}
        width="min(320px, 85vw)"
        closable={false}
        destroyOnClose={false}
      >
        <div className="h-full bg-bg-card flex flex-col">
          <Sidebar 
            collapsed={false} 
            activeKey={activePath} 
            onNavigate={handleNavigate}
          />
        </div>
      </Drawer>
      
      {/* 4. Content Area: 移除 max-w 限制，真正实现 Canvas 效果 */}
      <Layout className="flex-1 flex flex-col bg-bg-page relative overflow-hidden">
        <Content 
          className="flex-1 overflow-y-auto overflow-x-hidden relative custom-scrollbar bg-bg-page"
          style={{ 
            padding: isMobile ? '16px' : '24px',
          }}
        >
          <div className="w-full min-h-full">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
