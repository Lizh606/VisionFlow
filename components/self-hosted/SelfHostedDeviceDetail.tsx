
import React, { useState } from 'react';
import { ThemeColors, ThemeMode, Language } from '../../types';
import { translations } from '../../translations';
import { LicenseSelectionModal } from './LicenseSelectionModal';
import { ChevronRight, ArrowLeft, RotateCcw, AlertTriangle } from 'lucide-react';

import { getMockDevice } from './device-detail/mockData';
import { DeviceHeader } from './device-detail/DeviceHeader';
import { DeviceOverview } from './device-detail/DeviceOverview';
import { DeviceDeployment } from './device-detail/DeviceDeployment';
import { DeviceUsage } from './device-detail/DeviceUsage';
import { DeviceLogs } from './device-detail/DeviceLogs';
import { DeviceHistoryDrawer } from './device-detail/DeviceHistoryDrawer';
import { DeviceStreamDrawer } from './device-detail/DeviceStreamDrawer';

interface SelfHostedDeviceDetailProps {
  theme: ThemeColors;
  mode: ThemeMode;
  language: Language;
  onNavigate: (view: string) => void;
  workspaceName?: string;
  deviceId?: string;
}

export const SelfHostedDeviceDetail: React.FC<SelfHostedDeviceDetailProps> = ({ 
  theme, mode, language, onNavigate, workspaceName = 'Workspace', deviceId 
}) => {
  // Fetch device data
  const device = getMockDevice(deviceId);

  const [activeTab, setActiveTab] = useState<'overview' | 'deployment' | 'usage' | 'logs'>('overview');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isStreamDrawerOpen, setIsStreamDrawerOpen] = useState(false);
  const [editingStream, setEditingStream] = useState<any>(null);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [isModeConfirmOpen, setIsModeConfirmOpen] = useState(false);
  const [pendingMode, setPendingMode] = useState<'EDGE' | 'CLOUD' | null>(null);
  
  // History Drawer State
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null);
  const [historyViewMode, setHistoryViewMode] = useState<'SNAPSHOT' | 'DIFF'>('SNAPSHOT');
  const [rollbackTarget, setRollbackTarget] = useState<string | null>(null);

  // Usage Summary State (Overview)
  const [usageTimeRange, setUsageTimeRange] = useState('24h');

  // Detailed Usage Tab State
  const [detailTimeRange, setDetailTimeRange] = useState('24h');
  const [detailModeFilter, setDetailModeFilter] = useState<'ALL' | 'EDGE' | 'CLOUD'>('ALL');
  const [detailMetric, setDetailMetric] = useState<'image' | 'video'>('image');
  const [selectedUsageRow, setSelectedUsageRow] = useState<string | null>(null);

  const tCommon = translations[language].selfHosted;
  const t = tCommon.deviceDetail;

  const handleLicenseSelect = (licenseId: string) => {
    console.log('Selected License:', licenseId);
    // In a real app, dispatch API call here.
    setIsLicenseModalOpen(false);
  };

  const handleModeChange = (newMode: 'EDGE' | 'CLOUD') => {
      if (newMode === device.mode) return;
      setPendingMode(newMode);
      setIsModeConfirmOpen(true);
  };

  const confirmModeChange = () => {
      // Logic to actually switch mode
      console.log(`Switching mode to ${pendingMode}`);
      setIsModeConfirmOpen(false);
      setPendingMode(null);
  }

  const handleRollback = () => {
    console.log(`Rolling back to version: ${rollbackTarget}`);
    setRollbackTarget(null);
    setIsHistoryOpen(false);
    // Add logic to refresh current config
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 relative">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-medium mb-6 opacity-60" style={{ color: theme.textSecondary }}>
            <span>{workspaceName}</span>
            <ChevronRight size={12} />
            <span>{tCommon.breadcrumbs.root}</span>
            <ChevronRight size={12} />
            <span className="cursor-pointer hover:underline" onClick={() => onNavigate('selfhosted-devices')}>{tCommon.breadcrumbs.devices}</span>
            <ChevronRight size={12} />
            <span style={{ color: theme.text }}>{device.name}</span>
        </div>

        {/* Title & Back Button */}
        <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('selfhosted-devices')} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <ArrowLeft size={20} style={{ color: theme.text }} />
            </button>
            <div>
                <h1 className="text-2xl font-bold tracking-tight" style={{ color: theme.text }}>{device.name}</h1>
            </div>
        </div>

        {/* Top Info Cards */}
        <DeviceHeader 
            device={device}
            theme={theme}
            t={t}
            tCommon={tCommon}
            handleModeChange={handleModeChange}
            setIsLicenseModalOpen={setIsLicenseModalOpen}
        />

        {/* Tab Navigation */}
        <div className="border-b" style={{ borderColor: theme.stroke }}>
             <div className="flex gap-6">
                 {['overview', 'deployment', 'usage', 'logs'].map(tab => (
                     <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`py-3 text-xs font-bold uppercase tracking-wider relative transition-colors ${
                            activeTab === tab ? 'text-blue-500' : 'opacity-60 hover:opacity-100'
                        }`}
                        style={{ color: activeTab === tab ? theme.primary : theme.text }}
                     >
                         {/* @ts-ignore */}
                         {t.tabs[tab]}
                         {activeTab === tab && (
                             <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-full shadow-[0_-2px_8px_rgba(59,130,246,0.5)]" />
                         )}
                     </button>
                 ))}
             </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
            {activeTab === 'overview' && (
                <DeviceOverview 
                    device={device}
                    theme={theme}
                    t={t}
                    tCommon={tCommon}
                    setActiveTab={setActiveTab}
                    usageTimeRange={usageTimeRange}
                    setUsageTimeRange={setUsageTimeRange}
                />
            )}

            {activeTab === 'deployment' && (
                <DeviceDeployment 
                    device={device}
                    theme={theme}
                    mode={mode}
                    t={t}
                    tCommon={tCommon}
                    setIsHistoryOpen={setIsHistoryOpen}
                    setEditingStream={setEditingStream}
                    setIsStreamDrawerOpen={setIsStreamDrawerOpen}
                />
            )}

            {/* ... other tabs ... */}
            {activeTab === 'usage' && (
                <DeviceUsage 
                    device={device}
                    theme={theme}
                    mode={mode}
                    t={t}
                    tCommon={tCommon}
                    detailTimeRange={detailTimeRange}
                    setDetailTimeRange={setDetailTimeRange}
                    detailModeFilter={detailModeFilter}
                    setDetailModeFilter={setDetailModeFilter}
                    detailMetric={detailMetric}
                    setDetailMetric={setDetailMetric}
                    selectedUsageRow={selectedUsageRow}
                    setSelectedUsageRow={setSelectedUsageRow}
                />
            )}

            {activeTab === 'logs' && (
                <DeviceLogs theme={theme} t={t} />
            )}
        </div>

        {/* --- DRAWERS & MODALS --- */}

        {/* Config History Sidebar */}
        <DeviceHistoryDrawer 
            isOpen={isHistoryOpen}
            onClose={() => setIsHistoryOpen(false)}
            theme={theme}
            mode={mode}
            t={t}
            expandedVersion={expandedVersion}
            setExpandedVersion={setExpandedVersion}
            historyViewMode={historyViewMode}
            setHistoryViewMode={setHistoryViewMode}
            setRollbackTarget={setRollbackTarget}
        />

        {/* Add/Edit Stream Drawer */}
        <DeviceStreamDrawer 
            isOpen={isStreamDrawerOpen}
            onClose={() => setIsStreamDrawerOpen(false)}
            theme={theme}
            mode={mode}
            t={t}
            editingStream={editingStream}
        />
        
        {/* License Selection Modal */}
        <LicenseSelectionModal
            theme={theme}
            mode={mode}
            language={language}
            isOpen={isLicenseModalOpen}
            onClose={() => setIsLicenseModalOpen(false)}
            onSelect={handleLicenseSelect}
            currentLicenseId={device.license?.id}
        />

        {/* Rollback Confirmation Modal */}
        {rollbackTarget && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 backdrop-blur-sm bg-black/40 animate-in fade-in duration-200">
                <div 
                    className="w-full max-w-sm rounded-2xl shadow-2xl p-6 border transform transition-all scale-100"
                    style={{ background: theme.surface, borderColor: theme.stroke, color: theme.text }}
                >
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                            <RotateCcw size={24} />
                        </div>
                        <h3 className="text-lg font-bold">Rollback to {rollbackTarget}?</h3>
                        <p className="text-sm opacity-70 leading-relaxed">
                            This will create a new configuration version (e.g. v2.4.2) and overwrite all current streams.
                            <br/><br/>
                            Changes will be applied immediately.
                        </p>
                        
                        <div className="flex gap-3 w-full mt-2">
                            <button 
                                onClick={() => setRollbackTarget(null)}
                                className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5 border border-transparent"
                                style={{ color: theme.text }}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleRollback}
                                className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white bg-blue-500 shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-colors"
                            >
                                Confirm Rollback
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Mode Switch Confirmation Modal */}
        {isModeConfirmOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 backdrop-blur-sm bg-black/40 animate-in fade-in duration-200">
                <div 
                    className="w-full max-w-md rounded-2xl shadow-2xl p-6 border transform transition-all scale-100"
                    style={{ background: theme.surface, borderColor: theme.stroke, color: theme.text }}
                >
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center">
                            <AlertTriangle size={24} />
                        </div>
                        <h3 className="text-lg font-bold">{t.modeSwitchModal.title}</h3>
                        <p className="text-sm opacity-70 leading-relaxed">
                            {pendingMode === 'CLOUD' ? t.modeSwitchModal.edgeToCloud : t.modeSwitchModal.cloudToEdge}
                        </p>
                        
                        <div className="w-full h-px bg-gray-500/10 my-2" />
                        
                        <div className="flex gap-3 w-full">
                            <button 
                                onClick={() => { setIsModeConfirmOpen(false); setPendingMode(null); }}
                                className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5 border border-transparent"
                                style={{ color: theme.text }}
                            >
                                {t.modeSwitchModal.cancel}
                            </button>
                            <button 
                                onClick={confirmModeChange}
                                className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white bg-blue-500 shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-colors"
                            >
                                {t.modeSwitchModal.confirm}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Overlay for Drawers */}
        {(isHistoryOpen || isStreamDrawerOpen) && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity" onClick={() => { setIsHistoryOpen(false); setIsStreamDrawerOpen(false); }} />
        )}

    </div>
  );
};
