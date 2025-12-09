import React, { useState, useEffect } from 'react';
import { ThemeColors, Language, ThemeMode } from '../../types';
import { translations } from '../../translations';
import { X, Search, FileKey, Check, ShieldCheck, Activity, WifiOff, CreditCard } from 'lucide-react';

interface LicenseSelectionModalProps {
  theme: ThemeColors;
  mode: ThemeMode;
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (licenseId: string) => void;
  currentLicenseId?: string;
}

interface License {
  id: string;
  name: string;
  type: 'SELF_HOSTED' | 'CLOUD';
  billingMode: 'PER_DEVICE' | 'PER_RUNTIME' | 'PER_IMAGE';
  used: number;
  total: number;
  expires: string;
  offlineLease: boolean;
  keyStart: string;
}

const MOCK_LICENSES: License[] = [
  { id: 'lic_enterprise_001', name: 'Enterprise-Edge-v2', type: 'SELF_HOSTED', billingMode: 'PER_DEVICE', used: 24, total: 100, expires: '2024-12-31', offlineLease: true, keyStart: 'vflow_ent_' },
  { id: 'lic_standard_055', name: 'Standard-Edge-Pack', type: 'SELF_HOSTED', billingMode: 'PER_DEVICE', used: 45, total: 50, expires: '2024-10-15', offlineLease: false, keyStart: 'vflow_std_' },
  { id: 'lic_dev_kit_99', name: 'Dev-Starter-Kit', type: 'SELF_HOSTED', billingMode: 'PER_RUNTIME', used: 2, total: 5, expires: '2025-01-01', offlineLease: true, keyStart: 'vflow_dev_' },
  { id: 'lic_cloud_hybrid', name: 'Cloud-Hybrid-Connect', type: 'CLOUD', billingMode: 'PER_IMAGE', used: 0, total: 0, expires: 'N/A', offlineLease: false, keyStart: 'vflow_cld_' },
];

export const LicenseSelectionModal: React.FC<LicenseSelectionModalProps> = ({
  theme,
  mode,
  language,
  isOpen,
  onClose,
  onSelect,
  currentLicenseId
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'SELF_HOSTED' | 'CLOUD'>('ALL');
  const [selectedId, setSelectedId] = useState<string | null>(currentLicenseId || null);

  const t = translations[language].selfHosted.licenseModal;

  useEffect(() => {
    if (isOpen) {
      setSelectedId(currentLicenseId || null);
      setSearchTerm('');
    }
  }, [isOpen, currentLicenseId]);

  if (!isOpen) return null;

  const filteredLicenses = MOCK_LICENSES.filter(lic => {
    const matchesSearch = lic.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lic.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || lic.type === filterType;
    return matchesSearch && matchesType;
  });

  const selectedLicense = MOCK_LICENSES.find(l => l.id === selectedId);

  const getUsageBarColor = (used: number, total: number) => {
    const ratio = used / total;
    if (ratio >= 0.9) return theme.node.red;
    if (ratio >= 0.7) return theme.node.orange;
    return theme.node.green;
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 backdrop-blur-sm bg-black/40 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl h-[600px] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative transition-all border"
        style={{ 
            background: theme.surface, 
            borderColor: theme.stroke,
            color: theme.text,
            boxShadow: mode === 'dark' ? '0 0 50px -10px rgba(0,0,0,0.5)' : '0 20px 40px -10px rgba(0,0,0,0.1)'
        }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0" style={{ borderColor: theme.stroke }}>
          <div className="flex items-center gap-3">
             <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                <FileKey size={20} />
             </div>
             <div>
                <h2 className="text-lg font-bold tracking-tight" style={{ color: theme.text }}>{t.title}</h2>
                <div className="text-xs opacity-60" style={{ color: theme.textSecondary }}>Bind a license to activate device capabilities</div>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            style={{ color: theme.text }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4 border-b flex flex-col md:flex-row gap-4 justify-between" style={{ borderColor: theme.stroke }}>
           <div className="flex items-center gap-2">
               <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-lg border" style={{ borderColor: theme.stroke }}>
                  {[
                      { id: 'ALL', label: t.filter.all },
                      { id: 'SELF_HOSTED', label: t.filter.selfHosted },
                      { id: 'CLOUD', label: t.filter.cloud },
                  ].map(f => (
                      <button 
                        key={f.id}
                        onClick={() => setFilterType(f.id as any)}
                        className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${filterType === f.id ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-500' : 'opacity-60 hover:opacity-100'}`}
                        style={{ color: filterType === f.id ? theme.primary : theme.text }}
                      >
                          {f.label}
                      </button>
                  ))}
               </div>
           </div>
           
           <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" size={14} style={{ color: theme.text }} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-3 py-2 rounded-lg border bg-transparent text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                style={{ borderColor: theme.stroke, color: theme.text }}
              />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto relative">
           <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-10 text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-opacity-90" style={{ background: theme.surface, color: theme.textSecondary }}>
                 <tr className="border-b" style={{ borderColor: theme.stroke }}>
                    <th className="px-6 py-3 w-10"></th>
                    <th className="px-6 py-3">{t.columns.license}</th>
                    <th className="px-6 py-3">{t.columns.type}</th>
                    <th className="px-6 py-3 w-40">{t.columns.usage}</th>
                    <th className="px-6 py-3">{t.columns.expiry}</th>
                    <th className="px-6 py-3">{t.columns.features}</th>
                 </tr>
              </thead>
              <tbody>
                 {filteredLicenses.map((lic, index) => {
                     const isSelected = selectedId === lic.id;
                     const isCurrent = currentLicenseId === lic.id;
                     return (
                         <tr 
                            key={lic.id}
                            onClick={() => setSelectedId(lic.id)}
                            className={`cursor-pointer transition-colors ${isSelected ? 'bg-blue-500/5' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                            style={{ borderBottom: index === filteredLicenses.length - 1 ? 'none' : `1px solid ${theme.stroke}` }}
                         >
                             <td className="px-6 py-4">
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-400'}`}>
                                    {isSelected && <Check size={10} strokeWidth={4} />}
                                </div>
                             </td>
                             <td className="px-6 py-4">
                                 <div className="flex flex-col">
                                     <div className="flex items-center gap-2">
                                         <span className="text-sm font-bold" style={{ color: theme.text }}>{lic.name}</span>
                                         {isCurrent && <span className="text-[9px] font-bold bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded border border-green-500/20">CURRENT</span>}
                                     </div>
                                     <span className="text-xs font-mono opacity-50" style={{ color: theme.textSecondary }}>{lic.id}</span>
                                 </div>
                             </td>
                             <td className="px-6 py-4">
                                 <div className="flex flex-col gap-1">
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded w-fit ${lic.type === 'SELF_HOSTED' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                        {lic.type}
                                    </span>
                                    <span className="text-xs opacity-70" style={{ color: theme.textSecondary }}>{lic.billingMode}</span>
                                 </div>
                             </td>
                             <td className="px-6 py-4">
                                 {lic.total > 0 ? (
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-xs font-medium" style={{ color: theme.text }}>
                                            <span>{lic.used} / {lic.total}</span>
                                            <span className="opacity-50">{Math.round((lic.used/lic.total)*100)}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full rounded-full transition-all" 
                                                style={{ width: `${(lic.used/lic.total)*100}%`, background: getUsageBarColor(lic.used, lic.total) }} 
                                            />
                                        </div>
                                    </div>
                                 ) : (
                                     <span className="text-xs opacity-50 italic" style={{ color: theme.textSecondary }}>Unlimited / Pay-as-you-go</span>
                                 )}
                             </td>
                             <td className="px-6 py-4">
                                 <div className="text-sm font-medium" style={{ color: theme.text }}>{lic.expires}</div>
                             </td>
                             <td className="px-6 py-4">
                                 <div className="flex gap-2">
                                     {lic.offlineLease ? (
                                         <div className="flex items-center gap-1 text-[10px] font-bold bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded" title="Offline Lease Supported">
                                             <WifiOff size={10} />
                                             Offline
                                         </div>
                                     ) : (
                                        <span className="text-[10px] opacity-30">-</span>
                                     )}
                                 </div>
                             </td>
                         </tr>
                     )
                 })}
              </tbody>
           </table>
        </div>

        <div className="p-0 border-t" style={{ borderColor: theme.stroke }}>
            {selectedLicense ? (
                <div className="p-5 space-y-5 bg-blue-500/5">
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={18} className="text-blue-500" />
                        <span className="text-base font-bold" style={{ color: theme.text }}>{t.summary.selected}: {selectedLicense.name}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="p-3 rounded-lg border bg-surface/50" style={{ borderColor: theme.stroke, background: theme.surface }}>
                            <div className="font-bold opacity-60 mb-1 uppercase tracking-wider text-[10px]" style={{ color: theme.textSecondary }}>{t.summary.billingDesc}</div>
                            <div className="flex items-center gap-2 font-medium" style={{ color: theme.text }}>
                                <CreditCard size={14} className="opacity-70" />
                                <span>{selectedLicense.type === 'SELF_HOSTED' ? 'Pre-paid License Quota' : 'Monthly Post-paid'}</span>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg border bg-surface/50" style={{ borderColor: theme.stroke, background: theme.surface }}>
                            <div className="font-bold opacity-60 mb-1 uppercase tracking-wider text-[10px]" style={{ color: theme.textSecondary }}>{t.summary.capabilities}</div>
                            <div className="flex items-center gap-2 font-medium" style={{ color: theme.text }}>
                                <Activity size={14} className="opacity-70" />
                                <span>Max Streams: {selectedLicense.type === 'SELF_HOSTED' ? 'Unlimited' : '10 / Node'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                         <button 
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-sm font-bold transition-colors"
                            style={{ color: theme.textSecondary }}
                         >
                            {t.cancel}
                         </button>
                         <button 
                            onClick={() => selectedId && onSelect(selectedId)}
                            className="px-8 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
                         >
                            {t.confirm}
                         </button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between items-center p-5">
                    <span className="text-sm opacity-50 italic pl-2" style={{ color: theme.textSecondary }}>Select a license from the list above...</span>
                    <button 
                       onClick={onClose}
                       className="px-6 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-sm font-bold transition-colors"
                       style={{ color: theme.textSecondary }}
                    >
                       {t.cancel}
                    </button>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};