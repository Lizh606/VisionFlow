
import React, { useState } from 'react';
import { AppProviders } from './providers/AppProviders';
import { MainLayout } from '../layouts/MainLayout';
import { WorkflowsPage } from '../pages/WorkflowsPage';
import { SelfHostedOverviewPage } from '../pages/SelfHostedOverviewPage';
import { DevicesPage } from '../features/selfhosted/devices/ui/DevicesPage';
import { LicensesPage } from '../features/selfhosted/licenses/ui/LicensesPage';
import { DeviceDetailPage } from '../features/selfhosted/devices/ui/DeviceDetailPage';
import { MarketplacePage } from '../features/marketplace/ui/MarketplacePage';
import { MarketplaceSellerListingPage } from '../features/marketplace/ui/MarketplaceSellerListingPage';
import { MarketplaceSellerWizard } from '../features/marketplace/ui/MarketplaceSellerWizard';

// Admin Console Pages
import { AdminOverviewPage } from '../features/admin/ui/AdminOverviewPage';
import { AdminAlertsPage } from '../features/admin/ui/AdminAlertsPage';
import { AdminAlertDetailPage } from '../features/admin/ui/AdminAlertDetailPage';
import { AdminStudioOpsPage } from '../features/admin/ui/AdminStudioOpsPage';
import { AdminMarketplaceOpsPage } from '../features/admin/ui/AdminMarketplaceOpsPage';
import { AdminMarketplaceOrdersPage } from '../features/admin/ui/AdminMarketplaceOrdersPage';
import { AdminOrderDetailPage } from '../features/admin/ui/AdminOrderDetailPage';
import { AdminAuditPage } from '../features/admin/ui/AdminAuditPage';
import { AdminConfigPage } from '../features/admin/ui/AdminConfigPage';
import { AdminSystemHealthPage } from '../features/admin/ui/AdminSystemHealthPage';
import { AdminQuotaPolicyPage } from '../features/admin/ui/AdminQuotaPolicyPage';
import { AdminSubjectDetailPage } from '../features/admin/ui/AdminSubjectDetailPage';

// Config Sub-pages
import { AlertRulesPage } from '../features/admin/ui/config/AlertRulesPage';
import { NotificationRoutingPage } from '../features/admin/ui/config/NotificationRoutingPage';
import { TemplatesPage } from '../features/admin/ui/config/TemplatesPage';

import '../i18n/config';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('workflows');

  const renderContent = () => {
    // Standard Routes
    if (currentPath === 'workflows') return <WorkflowsPage />;
    if (currentPath === 'sh-overview') return <SelfHostedOverviewPage onNavigate={setCurrentPath} />;
    if (currentPath === 'sh-devices') return <DevicesPage onDeviceClick={(id) => setCurrentPath(`sh-device-detail-${id}`)} />;
    if (currentPath === 'sh-license') return <LicensesPage />;
    if (currentPath.startsWith('sh-device-detail-')) {
      const deviceId = currentPath.split('sh-device-detail-')[1];
      return <DeviceDetailPage deviceId={deviceId} onBack={() => setCurrentPath('sh-devices')} />;
    }
    if (currentPath === 'marketplace-seller') return <MarketplaceSellerListingPage onNavigate={setCurrentPath} />;
    if (currentPath.startsWith('marketplace-seller-wizard')) {
      const params = new URLSearchParams(currentPath.split('?')[1]);
      return <MarketplaceSellerWizard listingId={params.get('id') || undefined} onNavigate={setCurrentPath} />;
    }
    if (currentPath.startsWith('marketplace')) {
      return <MarketplacePage subPath={currentPath} onNavigate={setCurrentPath} />;
    }

    // Admin Console Routes
    if (currentPath.startsWith('admin-overview')) return <AdminOverviewPage onNavigate={setCurrentPath} />;
    if (currentPath.startsWith('admin-alerts')) {
      const parts = currentPath.split('/');
      if (parts.length > 1 && parts[1]) {
        return <AdminAlertDetailPage alertId={parts[1]} onBack={() => setCurrentPath('admin-alerts')} onNavigate={setCurrentPath} />;
      }
      return <AdminAlertsPage onNavigate={setCurrentPath} />;
    }
    if (currentPath === 'admin-studio') return <AdminStudioOpsPage />;
    if (currentPath === 'admin-quota') return <AdminQuotaPolicyPage onNavigate={setCurrentPath} />;
    if (currentPath === 'admin-marketplace') return <AdminMarketplaceOpsPage />;
    if (currentPath.startsWith('admin-orders')) {
      const parts = currentPath.split('/');
      if (parts.length > 1 && parts[1]) {
        return <AdminOrderDetailPage orderId={parts[1]} onBack={() => setCurrentPath('admin-orders')} />;
      }
      return <AdminMarketplaceOrdersPage onNavigate={setCurrentPath} />;
    }
    
    // P0: Fix Admin Audit Routing to support search parameters from other pages
    if (currentPath.startsWith('admin-audit')) return <AdminAuditPage path={currentPath} />;
    
    // UC-AC-001: Admin Subject Detail Route
    if (currentPath.startsWith('admin-subjects/')) {
       const parts = currentPath.split('/');
       if (parts.length >= 3) {
          return (
            <AdminSubjectDetailPage 
              subjectType={parts[1] as any} 
              subjectId={parts[2]} 
              // Fix: Subject Detail Back button should navigate to Alert Center 
              // instead of window history (SPA state routing consistency)
              onBack={() => setCurrentPath('admin-alerts')}
              onNavigate={setCurrentPath}
            />
          );
       }
    }

    // Config Routing
    if (currentPath === 'admin-config') return <AdminConfigPage onNavigate={setCurrentPath} />;
    if (currentPath === 'admin-config-alerts') return <AlertRulesPage onBack={() => setCurrentPath('admin-config')} />;
    if (currentPath === 'admin-config-routing') return <NotificationRoutingPage onBack={() => setCurrentPath('admin-config')} />;
    if (currentPath === 'admin-config-templates') return <TemplatesPage onBack={() => setCurrentPath('admin-config')} onNavigate={setCurrentPath} />;

    if (currentPath === 'admin-health') return <AdminSystemHealthPage />;

    return <WorkflowsPage />;
  };

  return (
    <AppProviders>
      <MainLayout activePath={currentPath.split('/')[0]} onNavigate={setCurrentPath}>
        {renderContent()}
      </MainLayout>
    </AppProviders>
  );
};

export default App;
