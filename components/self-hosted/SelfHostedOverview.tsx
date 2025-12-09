import React, { useState } from 'react';
import { ThemeColors, ThemeMode, Language } from '../../types';
import { translations } from '../../translations';
import { 
  Server, CreditCard, Activity, AlertTriangle, ChevronRight, 
  HardDrive, Cloud, AlertCircle, FileKey, List, Calendar
} from 'lucide-react';

interface SelfHostedOverviewProps {
  theme: ThemeColors;
  mode: ThemeMode;
  language: Language;
  onNavigate?: (view: string, id?: string) => void;
  workspaceName?: string;
}

const MOCK_GLOBAL_ALERTS = [
    { level: 'CRITICAL', msg: 'Device Edge-Gateway-04 offline > 30m', entityId: 'dev_829305', entityType: 'DEVICE', time: '10m ago' },
    { level: 'WARNING', msg: 'License Enterprise-Edge-v1 expiring', entityId: 'lic_882', entityType: 'LICENSE', time: '2d ago' },
    { level: 'INFO', msg: 'Cloud usage spike detected', entityId: 'billing', entityType: 'BILLING', time: '4h ago' }
];

export const SelfHostedOverview: React.FC<SelfHostedOverviewProps> = ({ 
  theme, 
  mode, 
  language, 
  onNavigate,
  workspaceName = 'Workspace' 
}) => {
  const t = translations[language].selfHosted;
  const tAlertLevels = t.alerts.levels;
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');

  const stats = {
    totalDevices: 24,
    status: {
      online: 18,
      offline: 1,
      pending: 3,
      draining: 1,
      decommissioned: 1
    },
    license: {
      used: 24,
      total: 50,
      expiring: 2
    },
    usage: {
      edge: '1.2M', 
      cloud: '54k'  
    }
  };

  const Card = ({ children, className = '' }: { children?: React.ReactNode, className?: string }) => (
    <div 
      className={`rounded-2xl border p-5 relative overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}
      style={{ background: theme.surface, borderColor: theme.stroke }}
    >
        {children}
    </div>
  );

  const StatusDot = ({ color, label, count }: { color: string, label: string, count: number }) => (
      <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
          <span className="text-xs font-medium opacity-70" style={{ color: theme.textSecondary }}>{label}</span>
          <span className="text-xs font-bold ml-auto" style={{ color: theme.text }}>{count}</span>
      </div>
  );

  const UsageBar = ({ label, value, color, icon: Icon }: any) => (
     <div className="space-y-2">
         <div className="flex justify-between items-center text-xs">
             <div className="flex items-center gap-1.5 font-medium" style={{ color: theme.text }}>
                 <Icon size={14} className={mode === 'dark' ? 'text-white' : 'text-black'} />
                 {label}
             </div>
             <span className="font-bold font-mono">{value}</span>
         </div>
         <div className="h-1.5 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
             <div className="h-full rounded-full" style={{ width: '65%', background: color }} />
         </div>
     </div>
  );

  const AlertItem: React.FC<{ alert: any }> = ({ alert }) => {
    let bg = 'bg-blue-500/10';
    let text = 'text-blue-500';
    let border = 'border-blue-500/20';
    let label = tAlertLevels.info;

    if (alert.level === 'CRITICAL') {
        bg = 'bg-red-500/10';
        text = 'text-red-500';
        border = 'border-red-500/20';
        label = tAlertLevels.critical;
    } else if (alert.level === 'WARNING') {
        bg = 'bg-orange-500/10';
        text = 'text-orange-500';
        border = 'border-orange-500/20';
        label = tAlertLevels.warning;
    }

    const handleClick = () => {
        if (alert.entityType === 'DEVICE' && onNavigate) {
            onNavigate('selfhosted-device-detail', alert.entityId);
        }
    }

    return (
        <button 
            onClick={handleClick}
            className="w-full flex items-center gap-4 p-3 rounded-xl border transition-all hover:bg-black/5 dark:hover:bg-white/5 group text-left" 
            style={{ borderColor: theme.stroke }}
        >
           <div className={`px-2 py-1 rounded text-[9px] font-bold ${bg} ${text} shrink-0 min-w-[60px] text-center border ${border}`}>
               {label}
           </div>

           <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
               <div className="flex flex-col">
                  <div className="text-xs font-bold truncate group-hover:text-blue-500 transition-colors mb-0.5" style={{ color: theme.text }}>
                      {alert.msg}
                  </div>
                  <div className="text-[10px] opacity-60 font-mono" style={{ color: theme.textSecondary }}>
                      {alert.time}
                  </div>
               </div>
               
               <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold opacity-50 uppercase tracking-wider hidden sm:inline" style={{ color: theme.textSecondary }}>Target:</span>
                   <span 
                      className="font-mono text-[10px] font-medium bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded"
                      style={{ color: theme.text }}
                   >
                      {alert.entityId}
                   </span>
               </div>
           </div>
           
           <ChevronRight size={14} className="opacity-30 group-hover:opacity-100 transition-opacity shrink-0" />
        </button>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
              <div className="flex items-center gap-2 text-xs font-medium mb-1 opacity-60" style={{ color: theme.textSecondary }}>
                 <span>{workspaceName}</span>
                 <ChevronRight size={12} />
                 <span>{t.breadcrumbs.root}</span>
                 <ChevronRight size={12} />
                 <span style={{ color: theme.text }}>{t.breadcrumbs.overview}</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: theme.text }}>{translations[language].dashboard.headers.shOverview}</h1>
          </div>

          <div className="flex items-center bg-black/5 dark:bg-white/5 p-1 rounded-lg border" style={{ borderColor: theme.stroke }}>
             {['24h', '7d', '30d'].map((range) => (
                 <button
                    key={range}
                    onClick={() => setTimeRange(range as any)}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        timeRange === range 
                            ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-500' 
                            : 'opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                    style={{ color: timeRange === range ? theme.primary : theme.text }}
                 >
                     {range === '24h' ? t.timeRange.last24h : range === '7d' ? t.timeRange.last7d : t.timeRange.last30d}
                 </button>
             ))}
             <div className="w-px h-4 bg-gray-500/20 mx-1" />
             <button
                className="px-2.5 py-1.5 rounded-md text-xs font-bold opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-1.5"
                style={{ color: theme.text }}
             >
                <Calendar size={12} />
             </button>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
             <div className="flex justify-between items-start mb-4">
                 <div>
                     <div className="text-3xl font-bold mb-1" style={{ color: theme.text }}>{stats.totalDevices}</div>
                     <div className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: theme.textSecondary }}>{t.cards.totalDevices}</div>
                 </div>
                 <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                     <Server size={20} />
                 </div>
             </div>
             <div className="space-y-1.5 pt-2 border-t" style={{ borderColor: theme.stroke }}>
                 <StatusDot color={theme.node.green} label={t.status.online} count={stats.status.online} />
                 <StatusDot color={theme.node.orange} label={t.status.pending} count={stats.status.pending} />
                 <StatusDot color={theme.node.red} label={t.status.offline} count={stats.status.offline} />
             </div>
          </Card>

          <Card>
              <div className="flex justify-between items-start mb-4">
                 <div>
                     <div className="text-3xl font-bold mb-1" style={{ color: theme.text }}>
                         {stats.license.used}<span className="text-lg opacity-40 font-medium">/{stats.license.total}</span>
                     </div>
                     <div className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: theme.textSecondary }}>{t.cards.licenseUsage}</div>
                 </div>
                 <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
                     <FileKey size={20} />
                 </div>
             </div>
             <div className="pt-2 border-t flex items-center gap-2" style={{ borderColor: theme.stroke }}>
                 <div className="flex-1 h-2 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-purple-500 w-[48%]" />
                 </div>
                 {stats.license.expiring > 0 && (
                     <div className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                         <AlertCircle size={10} /> {stats.license.expiring} {t.cards.expiring}
                     </div>
                 )}
             </div>
          </Card>

          <Card>
              <div className="flex justify-between items-start mb-4">
                 <div className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: theme.textSecondary }}>{t.cards.usageSummary}</div>
                 <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500">
                     <Activity size={20} />
                 </div>
             </div>
             <div className="space-y-4">
                 <UsageBar icon={HardDrive} label={t.cards.edge} value={stats.usage.edge} color={theme.node.teal} />
                 <UsageBar icon={Cloud} label={t.cards.cloud} value={stats.usage.cloud} color={theme.node.purple} />
             </div>
          </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="min-h-[300px] flex flex-col">
              <h3 className="font-bold text-sm mb-6" style={{ color: theme.text }}>{t.charts.deviceStatus}</h3>
              <div className="flex-1 flex items-end justify-between px-4 pb-4 gap-4">
                  {[
                      { h: '80%', l: t.status.online, c: theme.node.green },
                      { h: '10%', l: t.status.pending, c: theme.node.orange },
                      { h: '5%', l: t.status.offline, c: theme.node.red },
                      { h: '2%', l: t.status.draining, c: theme.node.blue },
                      { h: '3%', l: t.status.decommissioned, c: theme.textSecondary }
                  ].map((bar, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                          <div className="w-full relative h-40 bg-black/5 dark:bg-white/5 rounded-lg overflow-hidden flex items-end">
                              <div 
                                className="w-full transition-all duration-1000 ease-out opacity-80 group-hover:opacity-100" 
                                style={{ height: bar.h, background: bar.c }} 
                              />
                          </div>
                          <span className="text-[10px] font-bold opacity-60 text-center leading-tight">{bar.l}</span>
                      </div>
                  ))}
              </div>
          </Card>

          <Card className="min-h-[300px] flex flex-col">
              <h3 className="font-bold text-sm mb-6 flex justify-between items-center" style={{ color: theme.text }}>
                 {t.charts.usageTrend}
                 <div className="flex gap-2">
                     <span className="flex items-center gap-1 text-[10px] font-bold opacity-60"><div className="w-2 h-2 rounded-full bg-teal-500" />EDGE</span>
                     <span className="flex items-center gap-1 text-[10px] font-bold opacity-60"><div className="w-2 h-2 rounded-full bg-purple-500" />CLOUD</span>
                 </div>
              </h3>
              <div className="flex-1 relative border-l border-b m-2" style={{ borderColor: theme.stroke }}>
                 <svg className="absolute inset-0 w-full h-full overflow-visible p-2" viewBox="0 0 100 100" preserveAspectRatio="none">
                     <path 
                        d="M0,80 C20,75 40,60 60,70 S80,40 100,50" 
                        fill="none" 
                        stroke={theme.node.teal} 
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                     />
                     <path 
                        d="M0,95 C10,95 20,90 30,95 S40,20 50,80 S80,90 100,85" 
                        fill="none" 
                        stroke={theme.node.purple} 
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                        strokeDasharray="4 4"
                     />
                 </svg>
              </div>
          </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: theme.text }}>
                  <AlertTriangle size={16} className="text-orange-500" />
                  {t.alerts.title}
              </h3>
              <div className="space-y-3">
                 {MOCK_GLOBAL_ALERTS.map((alert, i) => (
                     <AlertItem key={i} alert={alert} />
                 ))}
              </div>
          </Card>

          <Card>
              <h3 className="font-bold text-sm mb-4" style={{ color: theme.text }}>{t.shortcuts.title}</h3>
              <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => onNavigate && onNavigate('selfhosted-devices')}
                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-dashed transition-all hover:border-solid hover:bg-blue-500/5 hover:border-blue-500 hover:text-blue-500" 
                    style={{ borderColor: theme.stroke, color: theme.text }}
                  >
                      <List size={20} />
                      <span className="text-xs font-bold">{t.shortcuts.viewDevices}</span>
                  </button>
                  <button 
                    onClick={() => onNavigate && onNavigate('selfhosted-licenses')}
                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-dashed transition-all hover:border-solid hover:bg-purple-500/5 hover:border-purple-500 hover:text-purple-500" 
                    style={{ borderColor: theme.stroke, color: theme.text }}
                  >
                      <FileKey size={20} />
                      <span className="text-xs font-bold">{t.shortcuts.viewLicenses}</span>
                  </button>
                  <button 
                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-dashed transition-all hover:border-solid hover:bg-green-500/5 hover:border-green-500 hover:text-green-500 col-span-2" 
                    style={{ borderColor: theme.stroke, color: theme.text }}
                  >
                       <Activity size={20} />
                      <span className="text-xs font-bold">{t.shortcuts.recentReleases}</span>
                  </button>
              </div>
          </Card>
      </div>

    </div>
  );
};