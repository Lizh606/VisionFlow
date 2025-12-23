
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

import '../i18n/config';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('workflows');

  const renderContent = () => {
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

    return <WorkflowsPage />;
  };

  return (
    <AppProviders>
      <MainLayout activePath={currentPath} onNavigate={setCurrentPath}>
        {renderContent()}
      </MainLayout>
    </AppProviders>
  );
};

export default App;
