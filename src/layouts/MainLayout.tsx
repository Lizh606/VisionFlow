
import React, { useState, useEffect } from 'react';
import { Layout, Drawer } from 'antd';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { vfLayout } from '../design-system/tokens';
import { useResponsive } from '../shared/hooks/useResponsive';

const { Content } = Layout;

interface MainLayoutProps {
  children?: React.ReactNode;
  activePath?: string;
  onNavigate?: (key: string) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, activePath = 'workflows', onNavigate }) => {
  const { isMobile, shouldCollapseSidebar } = useResponsive();
  
  // State for sidebar collapsed (desktop) or drawer open (mobile)
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sync initial state with screen size
  useEffect(() => {
    setCollapsed(shouldCollapseSidebar);
  }, [shouldCollapseSidebar]);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const handleMobileNavigate = (key: string) => {
    if (onNavigate) onNavigate(key);
    setMobileOpen(false);
  };

  // Spec Rule:
  // - Workflows/Overview (Canvas/Dashboard) -> Gray Background (bg-bg-page)
  // - Devices/Licenses (Table/List) -> White Background (bg-bg-card)
  const whiteBgRoutes = ['sh-devices', 'sh-license', 'upload-license'];
  const isWhitePage = whiteBgRoutes.includes(activePath);
  
  const contentBgClass = isWhitePage ? 'bg-bg-card' : 'bg-bg-page';

  return (
    <Layout className="h-screen w-screen overflow-hidden bg-bg-page">
      {/* 
        Responsive Navigation Strategy:
        - Desktop: Sidebar
        - Mobile: Drawer
      */}
      {!isMobile && (
        <Sidebar 
          collapsed={collapsed} 
          activeKey={activePath} 
          onNavigate={onNavigate} 
        />
      )}

      {isMobile && (
        <Drawer
          placement="left"
          onClose={() => setMobileOpen(false)}
          open={mobileOpen}
          styles={{ body: { padding: 0 } }}
          width={vfLayout.siderWidthExpanded}
          closable={false}
        >
           <div className="h-full bg-bg-card">
              <Sidebar 
                collapsed={false} 
                isMobile={true} 
                activeKey={activePath} 
                onNavigate={handleMobileNavigate}
              />
           </div>
        </Drawer>
      )}
      
      {/* Right Content Area */}
      {/* Apply dynamic background class here to cover full height */}
      <Layout className={`h-full flex flex-col transition-colors duration-200 ${contentBgClass}`}>
        <Header 
          collapsed={collapsed} 
          onCollapse={toggleSidebar} 
          isMobile={isMobile}
        />
        
        {/* Scrollable Content */}
        <Content 
          className="flex-1 overflow-y-auto overflow-x-hidden relative custom-scrollbar"
          style={{ 
            padding: vfLayout.pagePadding,
          }}
        >
          {/* Content Wrapper - Max Width for Wide screens */}
          <div className="w-full mx-auto max-w-[1600px] min-h-full">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
