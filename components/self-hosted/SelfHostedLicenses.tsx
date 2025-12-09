import React, { useState } from 'react';
import { ThemeColors, ThemeMode, Language } from '../../types';
import { translations } from '../../translations';
import { 
  ChevronRight, Search, Plus, Filter, MoreVertical, 
  FileKey, CheckCircle2, AlertCircle, XCircle, Cloud, Server, CreditCard, Download
} from 'lucide-react';

interface SelfHostedLicensesProps {
  theme: ThemeColors;
  mode: ThemeMode;
  language: Language;
  onNavigate?: (view: string, id?: string) => void;
  workspaceName?: string;
}

const MOCK_LICENSES = [
  { 
    id: 'lic_enterprise_001', 
    name: 'Enterprise-Edge-v2', 
    type: 'SELF_HOSTED', 
    billingMode: 'PER_DEVICE', 
    used: 24, 
    total: 100, 
    expires: '2024-12-31', 
    status: 'ACTIVE',
    features: ['Unlimited Streams', 'Offline Lease', 'Priority Support'] 
  },
  { 
    id: 'lic_standard_055', 
    name: 'Standard-Edge-Pack', 
    type: 'SELF_HOSTED', 
    billingMode: 'PER_DEVICE', 
    used: 48, 
    total: 50, 
    expires: '2024-10-15', 
    status: 'EXPIRING_SOON',
    features: ['Max 10 Streams'] 
  },
  { 
    id: 'lic_dev_kit_99', 
    name: 'Dev-Starter-Kit', 
    type: 'SELF_HOSTED', 
    billingMode: 'PER_RUNTIME', 
    used: 5, 
    total: 5, 
    expires: '2025-01-01', 
    status: 'ACTIVE',
    features: ['Non-commercial', 'Debug Tools'] 
  },
  { 
    id: 'lic_cloud_hybrid', 
    name: 'Cloud-Hybrid-Connect', 
    type: 'CLOUD', 
    billingMode: 'PER_IMAGE', 
    used: 0, 
    total: 0, 
    expires: 'N/A', 
    status: 'ACTIVE',
    features: ['Pay-as-you-go', 'Auto Scaling'] 
  },
  { 
    id: 'lic_legacy_v1', 
    name: 'Legacy-Edge-v1', 
    type: 'SELF_HOSTED', 
    billingMode: 'PER_DEVICE', 
    used: 12, 
    total: 20, 
    expires: '2023-12-31', 
    status: 'EXPIRED',
    features: ['Legacy Support'] 
  },
];

export const SelfHostedLicenses: React.FC<SelfHostedLicensesProps> = ({
  theme,
  mode,
  language,
  onNavigate,
  workspaceName = 'Workspace'
}) => {
  const tCommon = translations[language].selfHosted;
  const tDashboard = translations[language].dashboard;
  const t = tCommon.licenses;
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'SELF_HOSTED' | 'CLOUD'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'EXPIRED'>('ALL');

  const filteredLicenses = MOCK_LICENSES.filter(lic => {
    const matchesSearch = lic.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lic.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'ALL' || lic.type === typeFilter;
    const matchesStatus = statusFilter === 'ALL' || 
                          (statusFilter === 'ACTIVE' ? ['ACTIVE', 'EXPIRING_SOON'].includes(lic.status) : lic.status === 'EXPIRED');
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
      switch(status) {
          case 'ACTIVE':
              return (
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-500/10 text-green-500 border border-green-500/20">
                      <CheckCircle2 size={12} />
                      {t.status.active}
                  </div>
              );
          case 'EXPIRING_SOON':
              return (
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/10 text-orange-500 border border-orange-500/20">
                      <AlertCircle size={12} />
                      {t.status.expiring}
                  </div>
              );
          case 'EXPIRED':
              return (
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-500 border border-red-500/20">
                      <XCircle size={12} />
                      {t.status.expired}
                  </div>
              );
          default: return null;
      }
  };

  const getTypeIcon = (type: string) => {
      if (type === 'CLOUD') return <Cloud size={14} className="text-purple-500" />;
      return <Server size={14} className="text-blue-500" />;
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
                 <span style={{ color: theme.text }}>{tDashboard.menu.shLicenses}</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: theme.text }}>{t.title}</h1>
          </div>
          
          <button 
             className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
          >
             <Plus size={16} strokeWidth={3} />
             <span>{t.actions.activate}</span>
          </button>
      </div>

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
             <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-xl border" style={{ borderColor: theme.stroke }}>
                  {[
                      { id: 'ALL', label: tCommon.licenseModal.filter.all },
                      { id: 'SELF_HOSTED', label: tCommon.licenseModal.filter.selfHosted },
                      { id: 'CLOUD', label: tCommon.licenseModal.filter.cloud },
                  ].map(f => (
                      <button 
                        key={f.id}
                        onClick={() => setTypeFilter(f.id as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${typeFilter === f.id ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-500' : 'opacity-60 hover:opacity-100'}`}
                        style={{ color: typeFilter === f.id ? theme.primary : theme.text }}
                      >
                          {f.label}
                      </button>
                  ))}
             </div>
             
             <button className="p-2.5 rounded-xl border hover:bg-black/5 dark:hover:bg-white/5 transition-colors" style={{ borderColor: theme.stroke, color: theme.text }}>
                <Filter size={16} />
             </button>
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
                  <th className="px-6 py-4" style={{ color: theme.textSecondary }}>{t.table.details}</th>
                  <th className="px-6 py-4" style={{ color: theme.textSecondary }}>{t.table.type}</th>
                  <th className="px-6 py-4 w-48" style={{ color: theme.textSecondary }}>{t.table.allocation}</th>
                  <th className="px-6 py-4" style={{ color: theme.textSecondary }}>{t.table.expiry}</th>
                  <th className="px-6 py-4" style={{ color: theme.textSecondary }}>{t.table.status}</th>
                  <th className="px-6 py-4 text-right" style={{ color: theme.textSecondary }}>{t.table.actions}</th>
               </tr>
             </thead>
             <tbody style={{ borderTop: `1px solid ${theme.stroke}` }}>
                {filteredLicenses.map((lic, index) => (
                    <tr 
                        key={lic.id} 
                        className="group hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        style={{ borderBottom: index === filteredLicenses.length - 1 ? 'none' : `1px solid ${theme.stroke}` }}
                    >
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${lic.type === 'CLOUD' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                    <FileKey size={18} />
                                </div>
                                <div>
                                    <div className="font-bold text-sm" style={{ color: theme.text }}>{lic.name}</div>
                                    <div className="text-[10px] font-mono opacity-50" style={{ color: theme.textSecondary }}>{lic.id}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: theme.text }}>
                                    {getTypeIcon(lic.type)}
                                    <span>{lic.type === 'CLOUD' ? 'Cloud' : 'Self-Hosted'}</span>
                                </div>
                                <div className="text-[10px] opacity-60 flex items-center gap-1" style={{ color: theme.textSecondary }}>
                                    <CreditCard size={10} />
                                    {lic.billingMode}
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            {lic.total > 0 ? (
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-medium" style={{ color: theme.text }}>
                                        <span>{lic.used} / {lic.total} Devices</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full rounded-full transition-all bg-blue-500" 
                                            style={{ width: `${(lic.used/lic.total)*100}%` }} 
                                        />
                                    </div>
                                </div>
                            ) : (
                                <span className="text-xs italic opacity-50" style={{ color: theme.textSecondary }}>Unlimited Usage</span>
                            )}
                        </td>
                        <td className="px-6 py-4">
                            <span className="text-sm font-medium" style={{ color: theme.text }}>{lic.expires}</span>
                        </td>
                        <td className="px-6 py-4">
                            {getStatusBadge(lic.status)}
                        </td>
                        <td className="px-6 py-4 text-right">
                             <div className="flex justify-end gap-2">
                                <button className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors" style={{ color: theme.textSecondary }}>
                                    <Download size={16} />
                                </button>
                                <button className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors" style={{ color: theme.textSecondary }}>
                                    <MoreVertical size={16} />
                                </button>
                             </div>
                        </td>
                    </tr>
                ))}
                
                {filteredLicenses.length === 0 && (
                   <tr>
                       <td colSpan={6} className="text-center py-12 opacity-50 text-sm font-medium" style={{ color: theme.textSecondary }}>
                           No licenses found matching your filters.
                       </td>
                   </tr>
                )}
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
};