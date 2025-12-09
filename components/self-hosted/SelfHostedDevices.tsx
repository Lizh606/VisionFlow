import React, { useState, useEffect } from 'react';
import { ThemeColors, ThemeMode, Language } from '../../types';
import { translations } from '../../translations';
import { 
  ChevronRight, ChevronLeft, Search, RefreshCw, Download, AlertTriangle, 
  Server, Cloud, Cpu, FileKey, Eye, Link, Ban
} from 'lucide-react';

interface SelfHostedDevicesProps {
  theme: ThemeColors;
  mode: ThemeMode;
  language: Language;
  onNavigate?: (view: string, id?: string) => void;
  workspaceName?: string;
}

const MOCK_DEVICES = [
  { id: '1', name: 'Edge-Gateway-01', deviceId: 'dev_829302_abcdef_123456', runtimeId: 'rt_2201_xyz_998877', status: 'ONLINE', mode: 'EDGE', license: 'Enterprise-Edge-v2', config: 'v2.4.1', lastSeen: '2m ago', usage: 1240 },
  { id: '2', name: 'Cloud-Inference-Node', deviceId: 'dev_110293_qqq_111222', runtimeId: 'rt_9932_aaa_333444', status: 'ONLINE', mode: 'CLOUD', license: 'Cloud-Pro-Pack', config: 'v2.5.0-rc1', lastSeen: '10s ago', usage: 55201 },
  { id: '3', name: 'Factory-Cam-Cluster', deviceId: 'dev_773821_bbb_555666', runtimeId: 'rt_1120_ccc_777888', status: 'OFFLINE', mode: 'EDGE', license: 'Standard-Edge', config: 'v2.3.9', lastSeen: '45m ago', usage: 0 },
  { id: '4', name: 'New-Device-001', deviceId: 'dev_000001_new_000111', runtimeId: 'rt_0000_init_000000', status: 'PENDING_LICENSE', mode: 'EDGE', license: null, config: 'v1.0.0', lastSeen: '1h ago', usage: 0 },
  { id: '5', name: 'New-Device-002', deviceId: 'dev_000002_new_000222', runtimeId: 'rt_0000_init_000000', status: 'PENDING_LICENSE', mode: 'EDGE', license: null, config: 'v1.0.0', lastSeen: '5m ago', usage: 0 },
  { id: '6', name: 'New-Device-003', deviceId: 'dev_000003_new_000333', runtimeId: 'rt_0000_init_000000', status: 'PENDING_LICENSE', mode: 'EDGE', license: null, config: 'v1.0.0', lastSeen: '2h ago', usage: 0 },
  { id: '7', name: 'Legacy-Node-X', deviceId: 'dev_999999_leg_999999', runtimeId: 'rt_8888_leg_888888', status: 'DRAINING', mode: 'CLOUD', license: 'Legacy-Pack', config: 'v2.0.0', lastSeen: '1d ago', usage: 120 },
  { id: '8', name: 'Old-Gateway', deviceId: 'dev_old_01_arch_000', runtimeId: 'rt_old_arch_000', status: 'DECOMMISSIONED', mode: 'EDGE', license: 'Expired', config: 'v1.8.0', lastSeen: '30d ago', usage: 0 },
  { id: '9', name: 'Edge-Gateway-02', deviceId: 'dev_829303', runtimeId: 'rt_2202', status: 'ONLINE', mode: 'EDGE', license: 'Enterprise-Edge-v2', config: 'v2.4.1', lastSeen: '5m ago', usage: 1100 },
  { id: '10', name: 'Edge-Gateway-03', deviceId: 'dev_829304', runtimeId: 'rt_2203', status: 'ONLINE', mode: 'EDGE', license: 'Enterprise-Edge-v2', config: 'v2.4.1', lastSeen: '8m ago', usage: 980 },
  { id: '11', name: 'Edge-Gateway-04', deviceId: 'dev_829305', runtimeId: 'rt_2204', status: 'OFFLINE', mode: 'EDGE', license: 'Enterprise-Edge-v2', config: 'v2.4.0', lastSeen: '2h ago', usage: 0 },
  { id: '12', name: 'Cloud-Node-Backup', deviceId: 'dev_110299', runtimeId: 'rt_9933', status: 'ONLINE', mode: 'CLOUD', license: 'Cloud-Pro-Pack', config: 'v2.5.0', lastSeen: '1m ago', usage: 12000 },
];

const ITEMS_PER_PAGE = 10;

const DeviceStatusTag = ({ status, tStatus }: { status: string, tStatus: any }) => {
  let styles = "bg-gray-500 text-white";
  let label = status;

  switch (status) {
    case 'ONLINE':
      styles = "bg-green-500 text-white shadow-sm shadow-green-500/20";
      label = tStatus.online;
      break;
    case 'OFFLINE':
      styles = "bg-red-500 text-white shadow-sm shadow-red-500/20";
      label = tStatus.offline;
      break;
    case 'PENDING_LICENSE':
      styles = "bg-orange-500 text-white shadow-sm shadow-orange-500/20";
      label = tStatus.pending;
      break;
    case 'DRAINING':
      styles = "bg-blue-500 text-white shadow-sm shadow-blue-500/20";
      label = tStatus.draining;
      break;
    case 'DECOMMISSIONED':
      styles = "bg-gray-500 text-white";
      label = tStatus.decommissioned;
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${styles}`}>
      {status === 'ONLINE' && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
      {label}
    </span>
  );
};

const DeploymentModeTag = ({ mode, tTooltips, theme }: { mode: string, tTooltips: any, theme: any }) => {
    const isEdge = mode === 'EDGE';
    const borderColor = isEdge ? theme.node.green : theme.node.purple;
    const textColor = isEdge ? theme.node.green : theme.node.purple;
    
    return (
        <div 
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-bold cursor-help transition-colors hover:bg-black/5 dark:hover:bg-white/5"
            style={{ 
                borderColor: borderColor,
                color: textColor,
            }}
            title={isEdge ? tTooltips.edgeMode : tTooltips.cloudMode}
        >
            {isEdge ? <Cpu size={10} /> : <Cloud size={10} />}
            {mode}
        </div>
    );
};

export const SelfHostedDevices: React.FC<SelfHostedDevicesProps> = ({ 
  theme, 
  mode, 
  language,
  onNavigate,
  workspaceName = 'Workspace' 
}) => {
  const t = translations[language].selfHosted.devices;
  const tCommon = translations[language].selfHosted;
  const tTooltips = translations[language].selfHosted.tooltips;
  const tStatus = translations[language].selfHosted.status;
  const tPagination = translations[language].dashboard.pagination;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [modeFilter, setModeFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  
  const pendingCount = MOCK_DEVICES.filter(d => d.status === 'PENDING_LICENSE').length;

  const filteredDevices = MOCK_DEVICES.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.runtimeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || d.status === statusFilter;
    const matchesMode = modeFilter === 'ALL' || d.mode === modeFilter;
    return matchesSearch && matchesStatus && matchesMode;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, modeFilter]);

  const totalPages = Math.ceil(filteredDevices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDevices = filteredDevices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleViewDetails = (id: string) => {
      if (onNavigate) {
          onNavigate('selfhosted-device-detail', id);
      }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div>
              <div className="flex items-center gap-2 text-xs font-medium mb-1 opacity-60" style={{ color: theme.textSecondary }}>
                 <span>{workspaceName}</span>
                 <ChevronRight size={12} />
                 <span>{tCommon.breadcrumbs.root}</span>
                 <ChevronRight size={12} />
                 <span style={{ color: theme.text }}>{tCommon.breadcrumbs.devices}</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: theme.text }}>{t.title}</h1>
          </div>
          
          <div className="flex items-center gap-2">
             <button className="p-2 rounded-lg border hover:bg-black/5 dark:hover:bg-white/5 transition-colors" style={{ borderColor: theme.stroke, color: theme.text }}>
                <RefreshCw size={16} />
             </button>
             <button className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-bold" style={{ borderColor: theme.stroke, color: theme.text }}>
                <Download size={16} />
                <span>{t.actions.export}</span>
             </button>
          </div>
      </div>

      {pendingCount > 0 && (
         <div 
           className="w-full rounded-xl p-3 flex items-center justify-between border-l-4 shrink-0"
           style={{ 
             background: mode === 'dark' ? 'rgba(249, 115, 22, 0.1)' : '#FFF7ED',
             borderColor: theme.node.orange,
             color: mode === 'dark' ? theme.node.orange : '#C2410C'
           }}
         >
            <div className="flex items-center gap-3">
               <AlertTriangle size={18} />
               <span className="text-sm font-bold">{t.alert.pendingMessage}</span>
            </div>
            <button 
              onClick={() => setStatusFilter('PENDING_LICENSE')}
              className="text-xs font-bold underline decoration-2 hover:opacity-80 transition-opacity"
            >
               {t.alert.filterAction}
            </button>
         </div>
      )}

      <div className="flex flex-col md:flex-row items-center gap-4 shrink-0">
          <div className="relative flex-1 w-full md:w-auto">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" size={16} />
             <input 
                type="text" 
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                style={{ background: theme.surface, borderColor: theme.stroke, color: theme.text }}
             />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
             <select 
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
               className="px-3 py-2.5 rounded-xl border text-sm font-medium outline-none cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
               style={{ background: theme.surface, borderColor: theme.stroke, color: theme.text }}
             >
                <option value="ALL">{t.filters.all}</option>
                <option value="ONLINE">{tCommon.status.online}</option>
                <option value="OFFLINE">{tCommon.status.offline}</option>
                <option value="PENDING_LICENSE">{tCommon.status.pending}</option>
             </select>

             <select 
               value={modeFilter}
               onChange={(e) => setModeFilter(e.target.value)}
               className="px-3 py-2.5 rounded-xl border text-sm font-medium outline-none cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
               style={{ background: theme.surface, borderColor: theme.stroke, color: theme.text }}
             >
                <option value="ALL">All Modes</option>
                <option value="EDGE">{t.filters.edge}</option>
                <option value="CLOUD">{t.filters.cloud}</option>
             </select>
          </div>
      </div>

      <div 
         className="rounded-2xl border overflow-hidden shadow-sm flex flex-col"
         style={{ background: theme.surface, borderColor: theme.stroke }}
      >
         <div className="overflow-x-auto flex-1">
           <table className="w-full text-left border-collapse">
             <thead>
               <tr className="border-b text-xs font-bold uppercase tracking-wider" style={{ borderColor: theme.stroke, background: mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.02)' }}>
                  <th className="px-6 py-4 text-center" style={{ color: theme.textSecondary }}>{t.table.device}</th>
                  <th className="px-2 py-4 text-center w-32" style={{ color: theme.textSecondary }}>{t.table.ids}</th>
                  <th className="px-6 py-4 text-center" style={{ color: theme.textSecondary }}>{t.table.status}</th>
                  <th className="px-6 py-4 text-center" style={{ color: theme.textSecondary }}>{t.table.mode}</th>
                  <th className="px-6 py-4 text-center" style={{ color: theme.textSecondary }}>{t.table.license}</th>
                  <th className="px-6 py-4 text-center" style={{ color: theme.textSecondary }}>{t.table.config}</th>
                  <th className="px-6 py-4 text-center" style={{ color: theme.textSecondary }}>{t.table.lastSeen}</th>
                  <th className="px-6 py-4 text-center w-44" style={{ color: theme.textSecondary }}>{t.table.actions}</th>
               </tr>
             </thead>
             <tbody>
               {currentDevices.map((device, index) => (
                 <tr 
                   key={device.id} 
                   className="group transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                   style={{ borderBottom: index === currentDevices.length - 1 ? 'none' : `1px solid ${theme.stroke}` }}
                 >
                    <td className="px-6 py-4">
                       <button onClick={() => handleViewDetails(device.id)} className="flex items-center gap-3 hover:opacity-80 transition-opacity text-left">
                          <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 text-blue-500">
                             <Server size={18} />
                          </div>
                          <div className="font-bold text-sm whitespace-nowrap" style={{ color: theme.text }}>{device.name}</div>
                       </button>
                    </td>

                    <td className="px-2 py-4">
                        <div className="flex flex-col gap-1.5 justify-center items-center">
                            <div className="flex items-center gap-1 cursor-help" title={`Device ID: ${device.deviceId}`}>
                                <span className="text-[9px] font-bold opacity-40 uppercase tracking-wider" style={{ color: theme.textSecondary }}>Dev</span>
                                <span className="font-mono text-[10px] opacity-70 bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded truncate max-w-[80px]" style={{ color: theme.text }}>
                                    {device.deviceId}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 cursor-help" title={`Runtime ID: ${device.runtimeId}`}>
                                <span className="text-[9px] font-bold opacity-40 uppercase tracking-wider" style={{ color: theme.textSecondary }}>Run</span>
                                <span className="font-mono text-[10px] opacity-70 bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded truncate max-w-[80px]" style={{ color: theme.text }}>
                                    {device.runtimeId}
                                </span>
                            </div>
                        </div>
                    </td>
                    
                    <td className="px-6 py-4 text-center">
                       <DeviceStatusTag status={device.status} tStatus={tStatus} />
                    </td>

                    <td className="px-6 py-4 text-center">
                        <DeploymentModeTag mode={device.mode} tTooltips={tTooltips} theme={theme} />
                    </td>

                    <td className="px-6 py-4 text-center">
                        {device.license ? (
                            <div className="flex items-center justify-center gap-2 text-sm font-medium" style={{ color: theme.text }}>
                                <FileKey size={14} className="opacity-50" />
                                {device.license}
                            </div>
                        ) : (
                            <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">{t.table.unbound}</span>
                        )}
                    </td>

                    <td className="px-6 py-4 text-center">
                       <span className="font-mono text-xs opacity-70" style={{ color: theme.text }}>{device.config}</span>
                    </td>

                    <td className="px-6 py-4 text-center">
                       <span className="text-sm font-medium opacity-70" style={{ color: theme.text }}>{device.lastSeen}</span>
                    </td>

                    <td className="px-6 py-4 text-center relative">
                       <div className="flex items-center justify-center gap-2">
                          {device.status === 'PENDING_LICENSE' ? (
                             <button 
                               onClick={() => handleViewDetails(device.id)}
                               className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
                             >
                                <Link size={12} />
                                {t.actions.bind}
                             </button>
                          ) : (
                             <>
                                <button 
                                    onClick={() => handleViewDetails(device.id)}
                                    className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors" 
                                    title={t.actions.view} 
                                    style={{ color: theme.text }}
                                >
                                    <Eye size={16} />
                                </button>
                                <button 
                                    className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors hover:text-orange-500" 
                                    title={t.actions.drain} 
                                    style={{ color: theme.textSecondary }}
                                >
                                    <Ban size={16} />
                                </button>
                             </>
                          )}
                       </div>
                    </td>
                 </tr>
               ))}

               {filteredDevices.length === 0 && (
                   <tr>
                       <td colSpan={8} className="text-center py-12 opacity-50 text-sm font-medium" style={{ color: theme.textSecondary }}>
                           No devices found matching your filters.
                       </td>
                   </tr>
               )}
             </tbody>
           </table>
         </div>

         {filteredDevices.length > 0 && (
           <div className="px-6 py-4 border-t flex items-center justify-between shrink-0" style={{ borderColor: theme.stroke }}>
              <div className="text-xs font-medium opacity-60" style={{ color: theme.textSecondary }}>
                 {tPagination.showing} <span style={{ color: theme.text }}>{startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredDevices.length)}</span> {tPagination.of} <span style={{ color: theme.text }}>{filteredDevices.length}</span>
              </div>
              
              <div className="flex items-center gap-2">
                  <button 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      style={{ borderColor: theme.stroke, color: theme.text }}
                  >
                      <ChevronLeft size={16} />
                  </button>
                  
                  <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }).map((_, i) => (
                          <button
                              key={i}
                              onClick={() => handlePageChange(i + 1)}
                              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                                  currentPage === i + 1 
                                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' 
                                      : 'hover:bg-black/5 dark:hover:bg-white/5'
                              }`}
                              style={{ color: currentPage === i + 1 ? '#fff' : theme.text }}
                          >
                              {i + 1}
                          </button>
                      ))}
                  </div>

                  <button 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      style={{ borderColor: theme.stroke, color: theme.text }}
                  >
                      <ChevronRight size={16} />
                  </button>
              </div>
           </div>
         )}
      </div>

    </div>
  );
};