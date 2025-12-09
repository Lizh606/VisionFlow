import React, { useState, useRef, useEffect } from 'react';
import { ThemeColors, ThemeMode, Language, Workflow } from '../types';
import { 
  LayoutGrid, Settings, PieChart, Plus, Clock, Activity, MoreVertical, Search, 
  Home, FolderOpen, GitBranch, LineChart, Server, Globe, HelpCircle, Bell, ChevronRight, Upload, User,
  ChevronsUpDown, ChevronLeft, Check, Users, LogOut, Briefcase, Box, List, FileKey, ChevronDown, Coins
} from 'lucide-react';
import { MOCK_WORKFLOWS } from '../constants';
import { translations } from '../translations';
import { SelfHostedOverview } from './self-hosted/SelfHostedOverview';
import { SelfHostedDevices } from './self-hosted/SelfHostedDevices';
import { SelfHostedDeviceDetail } from './self-hosted/SelfHostedDeviceDetail';
import { SelfHostedLicenses } from './self-hosted/SelfHostedLicenses';

interface DashboardProps {
  theme: ThemeColors;
  mode: ThemeMode;
  language: Language;
  onNavigateToEditor: (id: string) => void;
}

const GENERATED_WORKFLOWS: Workflow[] = Array.from({ length: 24 }).map((_, i) => {
    const base = MOCK_WORKFLOWS[i % MOCK_WORKFLOWS.length];
    return {
        ...base,
        id: `flow-${i}`,
        name: `${base.name} ${Math.floor(i / 4) + 1}`,
    };
});

const ITEMS_PER_PAGE = 8;

export const Dashboard: React.FC<DashboardProps> = ({ theme, mode, language, onNavigateToEditor }) => {
  const [currentView, setCurrentView] = useState<string>('workflows');
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [workspaceSearch, setWorkspaceSearch] = useState('');
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    'selfHosted': false
  });
  
  const workspaceRef = useRef<HTMLDivElement>(null);

  const t = translations[language].dashboard;
  const tSidebar = translations[language].sidebar;
  const tWorkspace = translations[language].workspace;
  const tSelfHosted = translations[language].selfHosted;

  const WORKSPACES = [
      { id: '1', name: tWorkspace.title, type: 'team', plan: 'Pro', members: 8, current: true, initials: 'VF', color: theme.primary },
      { id: '2', name: tWorkspace.personal, type: 'personal', plan: 'Free', members: 1, current: false, initials: 'ME', color: theme.textSecondary },
      { id: '3', name: 'R&D Department', type: 'team', plan: 'Enterprise', members: 24, current: false, initials: 'RD', color: '#8B5CF6' },
  ];

  const totalPages = Math.ceil(GENERATED_WORKFLOWS.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentWorkflows = GENERATED_WORKFLOWS.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (workspaceRef.current && !workspaceRef.current.contains(event.target as Node)) {
        setIsWorkspaceOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (currentView.startsWith('selfhosted-')) {
        setExpandedMenus(prev => ({ ...prev, 'selfHosted': true }));
    }
  }, [currentView]);

  const handlePageChange = (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const toggleMenu = (key: string) => {
    setExpandedMenus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNavigate = (view: string, id?: string) => {
      setCurrentView(view);
      if (id) {
          setSelectedDeviceId(id);
      }
  };

  const MenuItem = ({ 
    icon: Icon, 
    label, 
    active = false, 
    onClick, 
    hasSubmenu = false, 
    isExpanded = false 
  }: any) => (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm group relative z-10 ${
        active 
          ? '' 
          : 'hover:bg-black/5 dark:hover:bg-white/5'
      }`}
      style={{
        color: active ? (mode === 'dark' ? theme.primary : '#2563EB') : theme.textSecondary,
        background: active ? (mode === 'dark' ? `${theme.primary}15` : '#EFF6FF') : 'transparent'
      }}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} className={active ? '' : 'opacity-80 group-hover:opacity-100'} strokeWidth={active ? 2.5 : 2} />
        <span>{label}</span>
      </div>
      {hasSubmenu && (
          <ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} opacity-50`} />
      )}
    </button>
  );

  const SubMenuItem = ({ label, active = false, onClick }: { label: string, active?: boolean, onClick?: () => void }) => (
      <button 
        onClick={onClick}
        className={`w-full flex items-center gap-3 pl-11 pr-3 py-2 rounded-lg transition-all duration-200 font-medium text-xs group ${
          active 
            ? '' 
            : 'hover:bg-black/5 dark:hover:bg-white/5'
        }`}
        style={{
            color: active ? (mode === 'dark' ? theme.primary : '#2563EB') : theme.textSecondary,
            background: active ? (mode === 'dark' ? `${theme.primary}10` : '#EFF6FF') : 'transparent'
        }}
      >
        <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-current' : 'bg-transparent border border-current opacity-50'}`} />
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

  const filteredWorkspaces = WORKSPACES.filter(ws => ws.name.toLowerCase().includes(workspaceSearch.toLowerCase()));

  const renderMainContent = () => {
      if (currentView === 'selfhosted-overview') {
          return (
            <SelfHostedOverview 
              theme={theme} 
              mode={mode} 
              language={language} 
              onNavigate={handleNavigate}
              workspaceName={tWorkspace.title}
            />
          );
      }

      if (currentView === 'selfhosted-devices') {
          return (
              <SelfHostedDevices 
                theme={theme} 
                mode={mode} 
                language={language} 
                onNavigate={handleNavigate}
                workspaceName={tWorkspace.title}
              />
          );
      }

      if (currentView === 'selfhosted-device-detail') {
          return (
             <SelfHostedDeviceDetail 
                theme={theme}
                mode={mode}
                language={language}
                onNavigate={handleNavigate}
                workspaceName={tWorkspace.title}
                deviceId={selectedDeviceId}
             />
          );
      }

      if (currentView === 'selfhosted-licenses') {
          return (
              <SelfHostedLicenses 
                theme={theme} 
                mode={mode} 
                language={language} 
                onNavigate={handleNavigate}
                workspaceName={tWorkspace.title}
              />
          );
      }

      return (
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col min-h-full">
            <div className="flex items-center gap-2 text-xs font-medium mb-6 opacity-60" style={{ color: theme.textSecondary }}>
                <span>{tWorkspace.title}</span>
                <ChevronRight size={12} />
                <span style={{ color: theme.text }}>{t.menu.workflows}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 shrink-0">
               <StatCard label={t.stats.totalFlows} value="24" icon={GitBranch} color={theme.node.blue} />
               <StatCard label={t.stats.activeNodes} value="86" icon={Activity} color={theme.node.green} />
               <StatCard label={t.stats.uptime} value="99.9%" icon={Clock} color={theme.node.purple} />
            </div>

            <div className="flex items-center justify-between mb-8 shrink-0">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
               {currentWorkflows.map((flow) => (
                  <div 
                     key={flow.id}
                     onClick={() => onNavigateToEditor(flow.id)}
                     className="group relative rounded-2xl border overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                     style={{ background: theme.surface, borderColor: theme.stroke }}
                  >
                     <div className="h-36 w-full bg-gray-100 dark:bg-gray-800 relative overflow-hidden group-hover:opacity-90 transition-opacity">
                        <div className={`absolute inset-0 opacity-10 bg-gradient-to-br from-blue-500 to-purple-500`} />
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
            
            <div className="mt-auto border-t pt-6 pb-2 flex items-center justify-between" style={{ borderColor: theme.stroke }}>
                <div className="text-xs font-medium opacity-60" style={{ color: theme.textSecondary }}>
                   {t.pagination.showing} <span style={{ color: theme.text }}>{startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, GENERATED_WORKFLOWS.length)}</span> {t.pagination.of} <span style={{ color: theme.text }}>{GENERATED_WORKFLOWS.length}</span>
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
        </div>
      );
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      <div 
        className="w-64 border-r flex flex-col hidden md:flex flex-shrink-0 relative z-30"
        style={{ background: theme.surface, borderColor: theme.stroke }}
      >
        <div className="p-4 pb-2 relative z-50" ref={workspaceRef}>
            <button 
                onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
                className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all border group hover:shadow-md ${isWorkspaceOpen ? 'bg-black/5 dark:bg-white/5' : ''}`}
                style={{ 
                    borderColor: isWorkspaceOpen ? theme.primary : (mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'),
                    background: mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'white',
                    color: theme.text
                }}
            >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
                    <span className="font-bold font-mono text-sm tracking-tight">VF</span>
                </div>
                <div className="flex-1 min-w-0 text-left">
                    <div className="text-sm font-bold truncate leading-tight" style={{ color: theme.text }}>{tWorkspace.title}</div>
                    <div className="text-[10px] font-medium opacity-60 truncate">Pro Plan • 8 {tWorkspace.members}</div>
                </div>
                <ChevronsUpDown size={14} className="opacity-40 group-hover:opacity-100 transition-opacity shrink-0" />
            </button>

            {isWorkspaceOpen && (
              <div 
                className="absolute left-4 right-4 top-20 rounded-xl border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-[100]"
                style={{ 
                    background: theme.surface, 
                    borderColor: theme.stroke, 
                    color: theme.text,
                    boxShadow: mode === 'dark' ? `0 0 0 1px ${theme.stroke}, 0 20px 50px -10px rgba(0,0,0,0.8)` : '0 10px 40px -10px rgba(0,0,0,0.1)'
                }}
              >
                <div className="p-2 border-b" style={{ borderColor: theme.stroke }}>
                   <div 
                     className="flex items-center gap-2 px-2 py-1.5 rounded-lg border transition-colors focus-within:ring-2 focus-within:ring-blue-500/20"
                     style={{ 
                        background: theme.background, 
                        borderColor: theme.stroke 
                     }}
                   >
                      <Search size={14} className="opacity-50" />
                      <input 
                        autoFocus
                        type="text" 
                        placeholder={tWorkspace.searchPlaceholder}
                        value={workspaceSearch}
                        onChange={(e) => setWorkspaceSearch(e.target.value)}
                        className="bg-transparent border-none outline-none text-xs w-full placeholder-opacity-50"
                        style={{ color: theme.text }}
                      />
                   </div>
                </div>

                <div className="p-2 space-y-1 max-h-60 overflow-y-auto custom-scrollbar">
                   <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider opacity-50 flex items-center gap-2" style={{ color: theme.textSecondary }}>
                     <Briefcase size={10} />
                     {tWorkspace.listTitle}
                   </div>
                   
                   {filteredWorkspaces.map(ws => (
                       <button 
                         key={ws.id}
                         className={`w-full flex items-center justify-between p-2 rounded-lg border transition-all group`}
                         style={{
                             borderColor: ws.current ? `${theme.primary}20` : 'transparent',
                             background: ws.current ? `${theme.primary}10` : 'transparent',
                             color: ws.current ? theme.primary : theme.text
                         }}
                       >
                          <div className="flex items-center gap-3 min-w-0">
                             <div 
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-sm"
                                style={{ background: ws.current ? theme.primary : theme.stroke, color: ws.current ? '#fff' : theme.textSecondary }}
                             >
                                 {ws.initials}
                             </div>
                             <div className="text-left min-w-0">
                                <div className="text-sm font-bold leading-none mb-0.5 truncate" style={{ color: ws.current ? theme.primary : theme.text }}>
                                    {ws.name}
                                </div>
                                <div className="text-[10px] opacity-70 flex items-center gap-1.5" style={{ color: ws.current ? theme.primary : theme.textSecondary }}>
                                    <span>{ws.plan}</span>
                                    <span className="w-0.5 h-0.5 rounded-full bg-current opacity-50" />
                                    <span>{ws.members} {tWorkspace.members}</span>
                                </div>
                             </div>
                          </div>
                          {ws.current && <Check size={16} />}
                       </button>
                   ))}

                   <div className="h-px my-1 mx-2" style={{ background: theme.stroke }} />
                   
                   <button 
                     className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors opacity-70 hover:opacity-100"
                     style={{ color: theme.text }}
                   >
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg border border-dashed border-current flex items-center justify-center shrink-0 opacity-50">
                            <Plus size={14} />
                         </div>
                         <span className="text-sm font-medium">{tWorkspace.addTeam}</span>
                      </div>
                   </button>
                </div>
              </div>
            )}
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 custom-scrollbar relative z-10">
           
           <MenuItem icon={Home} label={t.menu.home} />
           <MenuItem icon={GitBranch} label={t.menu.workflows} active={currentView === 'workflows'} onClick={() => handleNavigate('workflows')} />
           
           <MenuItem 
              icon={Server} 
              label={t.menu.selfHosted} 
              active={currentView.startsWith('selfhosted-')} 
              hasSubmenu 
              isExpanded={expandedMenus['selfHosted']}
              onClick={() => toggleMenu('selfHosted')}
           />
           <div 
              className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                 expandedMenus['selfHosted'] ? 'max-h-40 opacity-100 mt-1 mb-2' : 'max-h-0 opacity-0'
              }`}
           >
              <SubMenuItem label={t.menu.shOverview} active={currentView === 'selfhosted-overview'} onClick={() => handleNavigate('selfhosted-overview')} />
              <SubMenuItem label={t.menu.shDevices} active={currentView === 'selfhosted-devices' || currentView === 'selfhosted-device-detail'} onClick={() => handleNavigate('selfhosted-devices')} />
              <SubMenuItem label={t.menu.shLicenses} active={currentView === 'selfhosted-licenses'} onClick={() => handleNavigate('selfhosted-licenses')} />
           </div>

           <MenuItem icon={Settings} label={t.menu.settings} />
        </div>

        <div className="p-4 space-y-1 mt-auto relative z-10">
           <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-medium" style={{color: theme.textSecondary}}>
              <HelpCircle size={18} />
              <span>{t.menu.help}</span>
              <ChevronRight size={14} className="ml-auto opacity-40" />
           </button>
           <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-medium" style={{color: theme.textSecondary}}>
              <Bell size={18} />
              <span>{t.menu.notifications}</span>
           </button>

           <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors mb-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center text-[10px] text-white font-bold border-2 border-white dark:border-gray-800 shadow-sm relative shrink-0">
                 <span>ZL</span>
              </div>
              <span className="text-sm font-medium opacity-90 truncate" style={{ color: theme.text }}>zehang li</span>
              <ChevronRight size={14} className="ml-auto opacity-40" />
           </div>

           <div className="rounded-xl overflow-hidden relative group mt-1">
              <div 
                className="p-4 relative z-10 flex flex-col gap-3"
                style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)' }}
              >
                  <div className="flex items-center gap-2 text-white/90">
                    <Coins size={16} />
                    <span className="text-xs font-bold">{t.usage.used}</span>
                  </div>
                  
                  <div className="h-1.5 w-full bg-black/30 rounded-full overflow-hidden backdrop-blur-sm">
                    <div className="h-full bg-blue-400 w-[2%]" />
                  </div>
                  
                  <div className="text-[10px] text-white/60 font-medium tracking-wide">
                     {t.usage.reset}
                  </div>
                  
                  <button className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white py-2 rounded-lg text-xs font-bold shadow-lg transition-all">
                    <Upload size={12} />
                    {t.usage.upgrade}
                  </button>
              </div>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
         <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ 
               backgroundImage: `linear-gradient(${theme.text} 1px, transparent 1px), linear-gradient(90deg, ${theme.text} 1px, transparent 1px)`,
               backgroundSize: '40px 40px'
            }}
         />
         
         {renderMainContent()}
      </div>
    </div>
  );
};