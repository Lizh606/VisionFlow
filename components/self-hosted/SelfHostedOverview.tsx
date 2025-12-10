
import React, { useState, useMemo } from 'react';
import { ThemeColors, ThemeMode, Language } from '../../types';
import { translations } from '../../translations';
import { 
  Server, CreditCard, Activity, AlertTriangle, ChevronRight, 
  HardDrive, Cloud, AlertCircle, FileKey, List, Calendar,
  Image as ImageIcon, Video
} from 'lucide-react';
import { UsageChart, StatusChart, Card, StatusTag } from './device-detail/Shared';

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
  const [trendMetric, setTrendMetric] = useState<'image' | 'video'>('image');
  const [summaryMetric, setSummaryMetric] = useState<'image' | 'video'>('image');

  // Dynamic Chart Data based on Time Range
  const chartData = useMemo(() => {
      const points = timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : 30;
      const xAxis = Array.from({ length: points }, (_, i) => {
          if (timeRange === '24h') return `${i}:00`;
          return `Day ${i+1}`;
      });
      
      // Generate data for both metrics
      const edgeImages = Array.from({ length: points }, () => Math.floor(Math.random() * 5000) + 3000);
      const cloudImages = Array.from({ length: points }, () => Math.floor(Math.random() * 2000) + 500);
      
      const edgeVideo = Array.from({ length: points }, () => Math.floor(Math.random() * 1000) + 200);
      const cloudVideo = Array.from({ length: points }, () => Math.floor(Math.random() * 100) + 10);

      return { xAxis, edgeImages, cloudImages, edgeVideo, cloudVideo };
  }, [timeRange]);

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
      image: { edge: 1250000, cloud: 54000 },
      video: { edge: 450000, cloud: 12400 }
    }
  };

  const formatCount = (n: number) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return n.toLocaleString();
  };

  const StatusDot = ({ color, label, count }: { color: string, label: string, count: number }) => (
      <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
          <span className="text-xs font-medium opacity-70" style={{ color: theme.textSecondary }}>{label}</span>
          <span className="text-xs font-bold ml-auto" style={{ color: theme.text }}>
            {stats.totalDevices > 0 ? Math.round((count / stats.totalDevices) * 100) : 0}%
          </span>
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
            className="w-full flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 rounded-xl border transition-all hover:bg-black/5 dark:hover:bg-white/5 group text-left" 
            style={{ borderColor: theme.stroke }}
        >
           <div className={`px-2 py-1 rounded text-[9px] font-bold ${bg} ${text} shrink-0 w-fit text-center border ${border} mt-0.5 sm:mt-0`}>
               {label}
           </div>

           <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
               <div className="flex flex-col min-w-0">
                  <div className="text-xs font-bold truncate group-hover:text-blue-500 transition-colors mb-0.5 leading-tight" style={{ color: theme.text }}>
                      {alert.msg}
                  </div>
                  <div className="text-[10px] opacity-60 font-mono" style={{ color: theme.textSecondary }}>
                      {alert.time}
                  </div>
               </div>
               
               <div className="flex items-center gap-2 shrink-0">
                   <span className="text-xs font-bold opacity-50 uppercase tracking-wider hidden sm:inline" style={{ color: theme.textSecondary }}>Target:</span>
                   <span 
                      className="font-mono text-[10px] font-medium bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded truncate max-w-[120px]"
                      style={{ color: theme.text }}>
                      {alert.entityId}
                   </span>
               </div>
           </div>
           
           <ChevronRight size={14} className="opacity-30 group-hover:opacity-100 transition-opacity shrink-0 mt-1 sm:mt-0 hidden sm:block" />
        </button>
    )
  }

  const renderUsageSummaryContent = () => {
    const isImage = summaryMetric === 'image';
    const valueEdge = isImage ? stats.usage.image.edge : stats.usage.video.edge;
    const valueCloud = isImage ? stats.usage.image.cloud : stats.usage.video.cloud;
    const max = Math.max(valueEdge, valueCloud) * 1.2;
    const colorEdge = theme.node.teal;
    const colorCloud = theme.node.purple;

    return (
        <div className="space-y-6 pt-2">
             <div className="space-y-1.5">
                 <div className="flex items-center justify-between text-[10px] font-medium">
                     <span className="opacity-60" style={{ color: theme.textSecondary }}>EDGE</span>
                     <span style={{ color: theme.text }}>{formatCount(valueEdge)}</span>
                 </div>
                 <div className="h-2 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (valueEdge / max) * 100)}%`, background: colorEdge }} />
                 </div>
             </div>

             <div className="space-y-1.5">
                 <div className="flex items-center justify-between text-[10px] font-medium">
                     <span className="opacity-60" style={{ color: theme.textSecondary }}>CLOUD</span>
                     <span style={{ color: theme.text }}>{formatCount(valueCloud)}</span>
                 </div>
                 <div className="h-2 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (valueCloud / max) * 100)}%`, background: colorCloud }} />
                 </div>
             </div>
        </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-medium mb-1 opacity-60" style={{ color: theme.textSecondary }}>
            <span>{workspaceName}</span>
            <ChevronRight size={12} />
            <span>{t.breadcrumbs.root}</span>
            <ChevronRight size={12} />
            <span style={{ color: theme.text }}>{t.breadcrumbs.overview}</span>
      </div>

      {/* Header & Time Range */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
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

      {/* Row 1: Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card theme={theme} title={t.cards.totalDevices}>
             <div className="flex justify-between items-start mb-4">
                 <div className="text-3xl font-bold mb-1" style={{ color: theme.text }}>{stats.totalDevices}</div>
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

          <Card theme={theme} title={t.cards.licenseUsage}>
              <div className="flex justify-between items-start mb-4">
                 <div>
                     <div className="text-3xl font-bold mb-1" style={{ color: theme.text }}>
                         {stats.license.used}<span className="text-lg opacity-40 font-medium">/{stats.license.total}</span>
                     </div>
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

          <Card 
            theme={theme} 
            title={t.cards.usageSummary} 
            action={
                <div className="flex bg-black/5 dark:bg-white/5 p-0.5 rounded-lg border border-transparent">
                    <button 
                        onClick={() => setSummaryMetric('image')}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold transition-all ${summaryMetric === 'image' ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-500' : 'opacity-60 hover:opacity-100'}`}
                        style={{ color: summaryMetric === 'image' ? theme.primary : theme.text }}
                    >
                        <ImageIcon size={12} />
                        Images
                    </button>
                    <button 
                        onClick={() => setSummaryMetric('video')}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold transition-all ${summaryMetric === 'video' ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-500' : 'opacity-60 hover:opacity-100'}`}
                        style={{ color: summaryMetric === 'video' ? theme.primary : theme.text }}
                    >
                        <Video size={12} />
                        Video
                    </button>
                </div>
            }
          >
             <div className="flex justify-between items-start mb-2">
                 {/* Placeholder for alignment if needed, or remove if unnecessary */}
             </div>
             {renderUsageSummaryContent()}
          </Card>
      </div>

      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Device Status Distribution */}
          <Card theme={theme} title={t.charts.deviceStatus} className="min-h-[350px]">
              <div className="flex-1 w-full h-[300px] mt-2">
                 <StatusChart 
                    theme={theme}
                    mode={mode}
                    data={[
                        { label: t.status.online, value: stats.status.online, color: theme.node.green },
                        { label: t.status.pending, value: stats.status.pending, color: theme.node.orange },
                        { label: t.status.offline, value: stats.status.offline, color: theme.node.red },
                        { label: t.status.draining, value: stats.status.draining, color: theme.node.blue },
                        { label: t.status.decommissioned, value: stats.status.decommissioned, color: theme.textSecondary }
                    ]}
                    height={300}
                 />
              </div>
          </Card>

          {/* Usage Trend */}
          <Card 
            theme={theme} 
            title={t.charts.usageTrend} 
            className="min-h-[350px]" 
            noPadding 
            contentClassName="px-5 pb-5"
          >
              <div className="p-5 pb-0">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold opacity-80"><div className="w-2 h-2 rounded-full" style={{background: theme.node.teal}} />EDGE</span>
                        <span className="flex items-center gap-1.5 text-[10px] font-bold opacity-80"><div className="w-2 h-2 rounded-full" style={{background: theme.node.purple}} />CLOUD</span>
                    </div>
                    
                    <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-lg border" style={{ borderColor: theme.stroke }}>
                        <button 
                            onClick={() => setTrendMetric('image')}
                            className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all flex items-center gap-1.5 ${trendMetric === 'image' ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-500' : 'opacity-60 hover:opacity-100'}`}
                            style={{ color: trendMetric === 'image' ? theme.primary : theme.text }}
                        >
                            <ImageIcon size={12} /> Images
                        </button>
                        <button 
                            onClick={() => setTrendMetric('video')}
                            className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all flex items-center gap-1.5 ${trendMetric === 'video' ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-500' : 'opacity-60 hover:opacity-100'}`}
                            style={{ color: trendMetric === 'video' ? theme.primary : theme.text }}
                        >
                            <Video size={12} /> Video
                        </button>
                    </div>
                </div>
              </div>
              
              <div className="w-full h-[220px]">
                 <UsageChart 
                    theme={theme}
                    mode={mode}
                    xAxisData={chartData.xAxis}
                    series={trendMetric === 'image' ? [
                        { name: 'EDGE Images', data: chartData.edgeImages, color: theme.node.teal, area: true },
                        { name: 'CLOUD Images', data: chartData.cloudImages, color: theme.node.purple, area: true }
                    ] : [
                        { name: 'EDGE Video', data: chartData.edgeVideo, color: theme.node.teal, area: true },
                        { name: 'CLOUD Video', data: chartData.cloudVideo, color: theme.node.purple, area: true }
                    ]}
                    height="100%"
                    showXAxis={true}
                    showYAxis={true}
                 />
              </div>
          </Card>
      </div>

      {/* Row 3: Alerts & Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card theme={theme} title={t.alerts.title}>
              <div className="space-y-3">
                 {MOCK_GLOBAL_ALERTS.map((alert, i) => (
                     <AlertItem key={i} alert={alert} />
                 ))}
              </div>
          </Card>

          <Card theme={theme} title={t.shortcuts.title}>
              <div className="grid grid-cols-2 gap-3 h-full">
                  <button 
                    onClick={() => onNavigate && onNavigate('selfhosted-devices')}
                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-dashed transition-all hover:border-solid hover:bg-blue-500/5 hover:border-blue-500 hover:text-blue-500 h-24" 
                    style={{ borderColor: theme.stroke, color: theme.text }}
                  >
                      <List size={20} />
                      <span className="text-xs font-bold">{t.shortcuts.viewDevices}</span>
                  </button>
                  <button 
                    onClick={() => onNavigate && onNavigate('selfhosted-licenses')}
                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-dashed transition-all hover:border-solid hover:bg-purple-500/5 hover:border-purple-500 hover:text-purple-500 h-24" 
                    style={{ borderColor: theme.stroke, color: theme.text }}
                  >
                      <FileKey size={20} />
                      <span className="text-xs font-bold">{t.shortcuts.viewLicenses}</span>
                  </button>
                  <button 
                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-dashed transition-all hover:border-solid hover:bg-green-500/5 hover:border-green-500 hover:text-green-500 col-span-2 h-20" 
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
