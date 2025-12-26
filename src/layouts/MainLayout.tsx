
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
  const [collapsed, setCollapsed] = useState(shouldCollapseSidebar);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sync internal collapsed state with responsive hook
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

  /**
   * Layout Implementation - VisionFlow V1.4 Standard
   * Tablet (>=768) and Desktop (>=1200) share the same Dual-Column skeleton.
   * Mobile (<768) uses Top Bar + Navigation Drawer.
   */
  return (
    <Layout className="h-screen w-screen overflow-hidden bg-bg-page">
      {/* 1. Mobile-only App Bar (Strict JS conditional) */}
      {isMobile && (
        <MobileAppBar 
          onOpenMenu={() => setMobileOpen(true)} 
          onBrandClick={handleBrandClick}
        />
      )}

      <Layout className="flex-1 flex flex-row overflow-hidden">
        {/* 2. Desktop/Tablet Sidebar (>= 768px) */}
        {!isMobile && (
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={vfLayout.siderWidthExpanded}
            collapsedWidth={vfLayout.siderWidthCollapsed}
            className="!bg-bg-card border-r border-divider h-full flex flex-col shrink-0 z-50 shadow-sm"
          >
            <Sidebar 
              collapsed={collapsed} 
              activeKey={activePath} 
              onNavigate={handleNavigate} 
            />
          </Sider>
        )}

        {/* 3. Main Content Area */}
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

      {/* 4. Mobile Navigation Drawer (Right Side per V1.4) */}
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
    </Layout>
  );
};
