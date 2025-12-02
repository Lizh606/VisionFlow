
import React from 'react';
import { ThemeColors, ThemeMode, Language, ViewMode } from '../types';
import { Sun, Moon, Play, Layers, Save, TestTube2, UploadCloud, Globe, ChevronLeft } from 'lucide-react';
import { translations } from '../translations';

interface NavbarProps {
  theme: ThemeColors;
  mode: ThemeMode;
  language: Language;
  viewMode: ViewMode;
  onBackToDashboard: () => void;
  toggleTheme: () => void;
  toggleLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  theme, 
  mode, 
  language,
  viewMode,
  onBackToDashboard,
  toggleTheme,
  toggleLanguage
}) => {
  const t = translations[language].navbar;

  const ActionButton = ({ icon: Icon, label, primary = false }: { icon: any, label: string, primary?: boolean }) => (
    <button 
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
        primary 
          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600' 
          : 'hover:bg-black/5 dark:hover:bg-white/10'
      }`}
      style={{ color: primary ? '#fff' : theme.text }}
    >
      <Icon size={14} strokeWidth={primary ? 2.5 : 2} />
      <span className="hidden xl:inline">{label}</span>
    </button>
  );

  return (
    <div 
      className="h-14 border-b flex items-center justify-between px-4 z-30 relative shadow-sm flex-shrink-0"
      style={{ 
        background: theme.surface, 
        borderColor: theme.stroke 
      }}
    >
      <div className="flex items-center gap-4">
        {/* Logo Area */}
        {viewMode === 'dashboard' ? (
           <div className="flex items-center gap-3">
             <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-1.5 rounded-lg">
               <Layers className="text-white" size={18} />
             </div>
             <span className="font-bold text-lg tracking-tight" style={{ color: theme.text }}>
               Vision<span className="text-blue-500">Flow</span>
             </span>
           </div>
        ) : (
          /* Editor Back Button & Title */
          <div className="flex items-center gap-3">
             <button 
                onClick={onBackToDashboard}
                className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                title={t.backToDash}
                style={{ color: theme.text }}
             >
                <ChevronLeft size={20} />
             </button>
             <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-700" />
             <span className="font-bold text-sm tracking-tight hidden sm:block" style={{ color: theme.text }}>
                {t.project}
             </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Editor Actions Toolbar (Only visible in Editor Mode) */}
        {viewMode === 'editor' && (
          <>
            <div className="flex items-center gap-1">
              <ActionButton icon={Save} label={t.save} />
              <ActionButton icon={TestTube2} label={t.test} />
              <ActionButton icon={UploadCloud} label={t.publish} />
            </div>
            
            <button 
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-500 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all"
            >
              <Play size={12} fill="currentColor" />
              {t.deploy}
            </button>

            {/* Separator */}
            <div className="h-5 w-[1px] mx-1" style={{ background: theme.stroke }} />
          </>
        )}

        {/* Global Toggles */}
        <div className="flex items-center gap-2">
           <button 
            onClick={toggleLanguage}
            className={`px-2 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${mode === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
            style={{ color: theme.textSecondary }}
            title="Switch Language"
          >
             <Globe size={16} />
             <span className="text-xs font-bold">{language === 'en' ? 'EN' : '中'}</span>
          </button>
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${mode === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
            style={{ color: theme.textSecondary }}
            title="Toggle Theme"
          >
            {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};
