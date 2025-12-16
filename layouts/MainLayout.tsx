
import React, { useState, useEffect } from 'react';
import { Layout, Drawer } from 'antd';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { vfSemantic } from '../design-system/tokens';
import { useResponsive } from '../hooks/useResponsive';

const { Content } = Layout;

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
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

  return (
    <Layout className="h-screen w-screen overflow-hidden bg-bg-page">
      {/* 
        Responsive Navigation Strategy (Spec 3.3):
        - Desktop: Sidebar
        - Mobile: Drawer
      */}
      {!isMobile && (
        <Sidebar collapsed={collapsed} />
      )}

      {isMobile && (
        <Drawer
          placement="left"
          onClose={() => setMobileOpen(false)}
          open={mobileOpen}
          styles={{ body: { padding: 0 } }}
          width={vfSemantic.layout.siderWidthExpanded}
          closable={false}
        >
           <div className="h-full bg-bg-card">
              <Sidebar collapsed={false} isMobile={true} />
           </div>
        </Drawer>
      )}
      
      {/* Right Content Area */}
      <Layout className="h-full flex flex-col transition-all duration-200 bg-bg-page">
        <Header 
          collapsed={collapsed} 
          onCollapse={toggleSidebar} 
          isMobile={isMobile}
        />
        
        {/* Scrollable Content */}
        <Content 
          className="flex-1 overflow-y-auto overflow-x-hidden relative"
          style={{ 
            padding: vfSemantic.layout.pagePadding,
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
