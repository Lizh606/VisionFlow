
import React from 'react';
import { ThemeColors, ThemeMode, Language, Workflow } from '../types';
import { 
  LayoutGrid, Settings, PieChart, Plus, Clock, Activity, MoreVertical, Search, 
  Home, FolderOpen, GitBranch, LineChart, Server, Globe, HelpCircle, Bell, ChevronRight, Upload, User,
  ChevronsUpDown
} from 'lucide-react';
import { MOCK_WORKFLOWS } from '../constants';
import { translations } from '../translations';

interface DashboardProps {
  theme: ThemeColors;
  mode: ThemeMode;
  language: Language;
  onNavigateToEditor: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ theme, mode, language, onNavigateToEditor }) => {
  const t = translations[language].dashboard;
  const tSidebar = translations[language].sidebar;
  const tNav = translations[language].navbar;

  const MenuItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
    <button 
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm group ${
        active 
          ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400' 
          : 'hover:bg-black/5 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400'
      }`}
    >
      <Icon size={18} className={active ? 'text-blue-600 dark:text-blue-400' : 'group-hover:text-gray-700 dark:group-hover:text-gray-200'} strokeWidth={active ? 2.5 : 2} />
      <span>{label}</span>
    </button>
  );

  const StatCard = ({ label, value, icon: Icon, color }: { label: string, value: string, icon: any, color: string }) => (
     <div 
       className="p-5 rounded-2xl border flex flex-col justify-between h-32 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
       style={{ background: theme.surface, borderColor: theme.stroke }}
     >
       <div className={`absolute top-0 right-0 p-24 opacity-5 rounded-full -mr-8 -mt-8`} style={{ background: color }} />
       <div className="flex justify-between items-start z-10">
          <div className="p-2.5 rounded-lg" style={{ background: `${color}15`, color: color }}>
             <Icon size={20} />
          </div>
       </div>
       <div className="z-10">
          <div className="text-3xl font-bold mb-1" style={{ color: theme.text }}>{value}</div>
          <div className="text-xs font-semibold uppercase tracking-wider opacity-60" style={{ color: theme.textSecondary }}>{label}</div>
       </div>
     </div>
  );

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Sidebar Menu */}
      <div 
        className="w-64 border-r flex flex-col hidden md:flex flex-shrink-0"
        style={{ background: theme.surface, borderColor: theme.stroke }}
      >
        {/* Workspace Selector */}
        <div className="p-4 pb-2">
            <button 
                className="w-full flex items-center gap-3 p-2 rounded-xl transition-colors border group hover:shadow-md"
                style={{ 
                    borderColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    background: mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'white'
                }}
            >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
                    <span className="font-bold font-mono text-sm tracking-tight">VF</span>
                </div>
                <div className="flex-1 min-w-0 text-left">
                    <div className="text-sm font-bold truncate leading-tight" style={{ color: theme.text }}>Vision Team</div>
                    <div className="text-[10px] font-medium opacity-60 truncate">Free Plan • 1 Member</div>
                </div>
                <ChevronsUpDown size={14} className="opacity-40 group-hover:opacity-100 transition-opacity shrink-0" />
            </button>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 custom-scrollbar">
           <div className="text-[10px] font-bold uppercase tracking-wider opacity-40 px-3 mb-2 mt-2">Platform</div>
           <MenuItem icon={Home} label={t.menu.home} />
           <MenuItem icon={FolderOpen} label={t.menu.projects} />
           <MenuItem icon={GitBranch} label={t.menu.workflows} active />
           <MenuItem icon={LineChart} label={t.menu.monitoring} />
           <MenuItem icon={Server} label={t.menu.deployments} />
           <MenuItem icon={Globe} label={t.menu.explore} />
           
           <div className="pt-4 mt-2 mb-2 border-t" style={{ borderColor: theme.stroke }}>
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-40 px-3 mb-2">Config</div>
              <MenuItem icon={Settings} label={t.menu.settings} />
           </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4 space-y-2 mt-auto">
           {/* System Links */}
           <div className="space-y-1 mb-6">
              <MenuItem icon={HelpCircle} label={t.menu.help} />
              <MenuItem icon={Bell} label={t.menu.notifications} />
              <div className="flex items-center gap-3 px-3 py-2.5 mt-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors">
                 <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center text-[10px] text-white font-bold border-2 border-white dark:border-gray-800 shadow-sm">
                    ZL
                 </div>
                 <span className="text-sm font-medium opacity-80" style={{ color: theme.text }}>zehang li</span>
                 <ChevronRight size={14} className="ml-auto opacity-40" />
              </div>
           </div>

           {/* Usage Widget */}
           <div className="rounded-xl p-4 relative overflow-hidden group shadow-lg" style={{ background: mode === 'dark' ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)' : 'linear-gradient(135deg, #172554 0%, #1e40af 100%)' }}>
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-20 h-20 rounded-full bg-white/5 blur-2xl"></div>
              <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-2 text-white/90">
                    <Server size={14} />
                    <span className="text-xs font-bold">{t.usage.used}</span>
                 </div>
                 <div className="h-1.5 w-full bg-black/20 rounded-full mb-2 overflow-hidden backdrop-blur-sm">
                    <div className="h-full bg-blue-400 w-[15%] rounded-full shadow-[0_0_8px_rgba(96,165,250,0.6)]"></div>
                 </div>
                 <div className="text-[10px] text-white/60 mb-3 font-medium tracking-wide">{t.usage.reset}</div>
                 <button className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-1.5 rounded-lg text-xs font-bold backdrop-blur-sm transition-all border border-white/10">
                    <Upload size={12} />
                    {t.usage.upgrade}
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
         <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ 
               backgroundImage: `linear-gradient(${theme.text} 1px, transparent 1px), linear-gradient(90deg, ${theme.text} 1px, transparent 1px)`,
               backgroundSize: '40px 40px'
            }}
         />
         
         <div className="max-w-7xl mx-auto relative z-10">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
               <StatCard label={t.stats.totalFlows} value="12" icon={GitBranch} color={theme.node.blue} />
               <StatCard label={t.stats.activeNodes} value="48" icon={Activity} color={theme.node.green} />
               <StatCard label={t.stats.uptime} value="99.9%" icon={Clock} color={theme.node.purple} />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
               <h1 className="text-2xl font-bold tracking-tight" style={{ color: theme.text }}>{t.headers.myWorkflows}</h1>
               
               <div className="flex items-center gap-4">
                  <div className="relative group hidden sm:block">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:text-blue-500 transition-colors" size={16} />
                     <input 
                        type="text" 
                        placeholder={tSidebar.search}
                        className="pl-9 pr-4 py-2 rounded-lg text-sm border outline-none focus:ring-2 focus:ring-blue-500/20 transition-all w-64 shadow-sm"
                        style={{ background: theme.surface, borderColor: theme.stroke, color: theme.text }}
                     />
                  </div>
                  <button 
                     onClick={() => onNavigateToEditor('new')}
                     className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
                  >
                     <Plus size={16} strokeWidth={3} />
                     <span>{t.headers.createNew}</span>
                  </button>
               </div>
            </div>

            {/* Workflow Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {MOCK_WORKFLOWS.map((flow) => (
                  <div 
                     key={flow.id}
                     onClick={() => onNavigateToEditor(flow.id)}
                     className="group relative rounded-2xl border overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                     style={{ background: theme.surface, borderColor: theme.stroke }}
                  >
                     {/* Preview Placeholder */}
                     <div className="h-36 w-full bg-gray-100 dark:bg-gray-800 relative overflow-hidden group-hover:opacity-90 transition-opacity">
                        <div className={`absolute inset-0 opacity-10 bg-gradient-to-br from-blue-500 to-purple-500`} />
                        {/* Abstract shapes for preview */}
                        <div className="absolute top-4 left-4 w-12 h-8 rounded border-2 border-blue-500/30 bg-blue-500/10 backdrop-blur-sm" />
                        <div className="absolute bottom-6 right-12 w-10 h-10 rounded-full border-2 border-purple-500/30 bg-purple-500/10 backdrop-blur-sm" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gray-400/20" />
                        
                        <div className="absolute top-3 right-3 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-md bg-black/40 text-white shadow-sm border border-white/10">
                           {flow.status}
                        </div>
                     </div>

                     <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                           <h3 className="font-bold text-base truncate pr-2 group-hover:text-blue-500 transition-colors" style={{ color: theme.text }}>
                              {flow.name}
                           </h3>
                           <button className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100">
                              <MoreVertical size={16} />
                           </button>
                        </div>
                        <p className="text-xs mb-4 line-clamp-2 min-h-[2.5em] leading-relaxed" style={{ color: theme.textSecondary }}>
                           {flow.description}
                        </p>

                        <div className="flex items-center justify-between text-xs font-medium pt-4 border-t" style={{ borderColor: theme.stroke, color: theme.textSecondary }}>
                           <div className="flex items-center gap-1.5">
                              <Activity size={14} className="text-blue-500" />
                              <span>{flow.nodesCount} {t.card.nodes}</span>
                           </div>
                           <div className="opacity-70">{flow.updatedAt}</div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};
