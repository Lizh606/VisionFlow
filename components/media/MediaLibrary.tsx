
import React, { useState, useEffect } from 'react';
import { ThemeColors, ThemeMode, Language } from '../../types';
import { translations } from '../../translations';
import { 
  Search, Upload, Filter, Image, Video, MoreVertical, 
  Trash2, Download, HardDrive, FileImage, Film, ChevronRight, ChevronLeft
} from 'lucide-react';

interface MediaLibraryProps {
  theme: ThemeColors;
  mode: ThemeMode;
  language: Language;
  workspaceName?: string;
}

interface MediaAsset {
    id: string;
    name: string;
    type: 'image' | 'video';
    mimeType: string;
    size: string;
    sizeBytes: number;
    dimensions: string;
    uploadedAt: string;
    url: string;
}

const MOCK_ASSETS: MediaAsset[] = [
    { id: '1', name: 'factory_floor_001.jpg', type: 'image', mimeType: 'image/jpeg', size: '2.4 MB', sizeBytes: 2516582, dimensions: '1920x1080', uploadedAt: '2023-10-24 10:30', url: 'https://images.unsplash.com/photo-1565514020176-db9315d1cb32?auto=format&fit=crop&w=300&q=80' },
    { id: '2', name: 'assembly_line_test.mp4', type: 'video', mimeType: 'video/mp4', size: '154.2 MB', sizeBytes: 161689231, dimensions: '1280x720', uploadedAt: '2023-10-23 14:20', url: '' },
    { id: '3', name: 'defect_sample_A.png', type: 'image', mimeType: 'image/png', size: '1.1 MB', sizeBytes: 1153433, dimensions: '800x600', uploadedAt: '2023-10-22 09:15', url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=300&q=80' },
    { id: '4', name: 'safety_gear_dataset.zip', type: 'video', mimeType: 'application/zip', size: '450 MB', sizeBytes: 471859200, dimensions: '-', uploadedAt: '2023-10-20 16:45', url: '' },
    { id: '5', name: 'worker_safety_002.jpg', type: 'image', mimeType: 'image/jpeg', size: '3.2 MB', sizeBytes: 3355443, dimensions: '3840x2160', uploadedAt: '2023-10-18 11:00', url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=300&q=80' },
];

const ITEMS_PER_PAGE = 10;

// Generate more mock assets for pagination
const GENERATED_ASSETS: MediaAsset[] = Array.from({ length: 42 }).map((_, i) => {
    const base = MOCK_ASSETS[i % MOCK_ASSETS.length];
    return {
        ...base,
        id: `gen-${i}`,
        name: `${base.name.split('.')[0]}_${i}.${base.name.split('.')[1]}`,
        uploadedAt: '2023-10-24 10:00'
    };
});

export const MediaLibrary: React.FC<MediaLibraryProps> = ({ theme, mode, language, workspaceName = 'Workspace' }) => {
    const t = translations[language].media;
    const tPagination = translations[language].dashboard.pagination;
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');
    const [currentPage, setCurrentPage] = useState(1);

    const storageStats = {
        used: 2.8, // GB
        total: 10, // GB
        usedBytes: 3006477107,
        totalBytes: 10737418240,
        itemCount: GENERATED_ASSETS.length
    };

    const usagePercent = (storageStats.used / storageStats.total) * 100;

    const filteredAssets = GENERATED_ASSETS.filter(asset => {
        const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || asset.type === filterType;
        return matchesSearch && matchesType;
    });

    // Pagination Logic
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterType]);

    const totalPages = Math.ceil(filteredAssets.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentAssets = filteredAssets.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    const getIcon = (type: string) => {
        if (type === 'image') return <FileImage size={18} className="text-blue-500" />;
        if (type === 'video') return <Film size={18} className="text-purple-500" />;
        return <HardDrive size={18} className="text-gray-500" />;
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-10">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-medium mb-1 opacity-60" style={{ color: theme.textSecondary }}>
                 <span>{workspaceName}</span>
                 <ChevronRight size={12} />
                 <span style={{ color: theme.text }}>{translations[language].dashboard.headers.mediaLibrary}</span>
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                     <h1 className="text-2xl font-bold tracking-tight" style={{ color: theme.text }}>{t.storage.title}</h1>
                     <div className="text-sm opacity-60 mt-1" style={{ color: theme.textSecondary }}>Manage your training data and assets</div>
                </div>
                <button 
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
                >
                    <Upload size={18} />
                    {t.upload}
                </button>
            </div>

            {/* Storage Card */}
            <div 
                className="p-6 rounded-2xl border relative overflow-hidden"
                style={{ background: theme.surface, borderColor: theme.stroke }}
            >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
                     <div className="flex-1 space-y-4">
                         <div className="flex items-center gap-3">
                             <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                                 <HardDrive size={24} />
                             </div>
                             <div>
                                 <div className="text-sm font-bold opacity-60 uppercase tracking-wider" style={{ color: theme.textSecondary }}>{t.storage.title}</div>
                                 <div className="text-2xl font-bold font-mono" style={{ color: theme.text }}>
                                     {storageStats.used} GB <span className="text-base opacity-40 font-medium">/ {storageStats.total} GB</span>
                                 </div>
                             </div>
                         </div>
                         
                         <div className="space-y-2 max-w-xl">
                            <div className="h-3 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                                <div 
                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000" 
                                    style={{ width: `${usagePercent}%` }} 
                                />
                            </div>
                            <div className="flex justify-between text-xs font-medium opacity-60" style={{ color: theme.textSecondary }}>
                                <span>{usagePercent.toFixed(1)}% {t.storage.used}</span>
                                <span>{storageStats.itemCount} {t.storage.items}</span>
                            </div>
                         </div>
                     </div>
                </div>
                
                {/* Background Pattern */}
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none" />
            </div>

            {/* Content Area */}
            <div className="space-y-4">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full sm:w-auto">
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
                    
                    <div className="flex items-center bg-black/5 dark:bg-white/5 p-1 rounded-xl border w-full sm:w-auto overflow-x-auto" style={{ borderColor: theme.stroke }}>
                        {[
                            { id: 'all', label: t.filters.all, icon: Filter },
                            { id: 'image', label: t.filters.images, icon: Image },
                            { id: 'video', label: t.filters.videos, icon: Video },
                        ].map(f => (
                            <button 
                                key={f.id}
                                onClick={() => setFilterType(f.id as any)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${filterType === f.id ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-500' : 'opacity-60 hover:opacity-100'}`}
                                style={{ color: filterType === f.id ? theme.primary : theme.text }}
                            >
                                <f.icon size={14} />
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div 
                    className="rounded-2xl border overflow-hidden shadow-sm flex flex-col"
                    style={{ background: theme.surface, borderColor: theme.stroke }}
                >
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse">
                             <thead>
                                <tr className="border-b text-xs font-bold uppercase tracking-wider" style={{ borderColor: theme.stroke, background: mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.02)' }}>
                                    <th className="px-6 py-4 w-12" style={{ color: theme.textSecondary }}></th>
                                    <th className="px-6 py-4" style={{ color: theme.textSecondary }}>{t.table.name}</th>
                                    <th className="px-6 py-4" style={{ color: theme.textSecondary }}>{t.table.type}</th>
                                    <th className="px-6 py-4" style={{ color: theme.textSecondary }}>{t.table.dimension}</th>
                                    <th className="px-6 py-4 text-right" style={{ color: theme.textSecondary }}>{t.table.size}</th>
                                    <th className="px-6 py-4 text-right" style={{ color: theme.textSecondary }}>{t.table.date}</th>
                                    <th className="px-6 py-4 text-right w-20" style={{ color: theme.textSecondary }}>{t.table.actions}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentAssets.map((asset, i) => (
                                    <tr 
                                        key={asset.id}
                                        className="group transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                                        style={{ borderBottom: i === currentAssets.length - 1 ? 'none' : `1px solid ${theme.stroke}` }}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-black/10 dark:bg-white/10 flex items-center justify-center border" style={{ borderColor: theme.stroke }}>
                                                {asset.type === 'image' && asset.url ? (
                                                    <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    getIcon(asset.type)
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-sm" style={{ color: theme.text }}>{asset.name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-mono opacity-60 bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded" style={{ color: theme.text }}>
                                                {asset.mimeType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs opacity-60" style={{ color: theme.text }}>{asset.dimensions}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-xs font-mono font-medium" style={{ color: theme.text }}>{asset.size}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-xs opacity-60" style={{ color: theme.textSecondary }}>{asset.uploadedAt}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {/* Actions visible by default, not hidden */}
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors" title="Download">
                                                    <Download size={16} className="text-blue-500" />
                                                </button>
                                                <button className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors" title="Delete">
                                                    <Trash2 size={16} className="text-red-500" />
                                                </button>
                                                <button className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                                                    <MoreVertical size={16} style={{ color: theme.textSecondary }} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filteredAssets.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="text-center py-16 opacity-50">
                                            <div className="flex flex-col items-center gap-2">
                                                <Image size={32} strokeWidth={1.5} />
                                                <span className="text-sm font-medium">{t.empty}</span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {filteredAssets.length > 0 && (
                        <div className="px-6 py-4 border-t flex items-center justify-between shrink-0" style={{ borderColor: theme.stroke }}>
                            <div className="text-xs font-medium opacity-60" style={{ color: theme.textSecondary }}>
                                {tPagination.showing} <span style={{ color: theme.text }}>{startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredAssets.length)}</span> {tPagination.of} <span style={{ color: theme.text }}>{filteredAssets.length}</span>
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
        </div>
    );
};
