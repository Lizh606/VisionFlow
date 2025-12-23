
import React from 'react';
import { Input, Space, Button } from 'antd';
import { Search, RefreshCw, SlidersHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useResponsive } from '../shared/hooks/useResponsive';

interface VFTableToolbarProps {
  search?: {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
  };
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  onRefresh?: () => void;
  refreshing?: boolean;
  className?: string;
}

/**
 * VFTableToolbar - 遵循规范 6.3 的标准列表/表格工具条
 */
export const VFTableToolbar: React.FC<VFTableToolbarProps> = ({
  search,
  filters,
  actions,
  onRefresh,
  refreshing = false,
  className = ''
}) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();

  return (
    <div className={`
      flex flex-col md:flex-row md:items-center justify-between gap-4 
      bg-bg-card p-4 rounded-card border border-border shadow-sm 
      ${className}
    `}>
      {/* 左侧：搜索与基础筛选 */}
      <div className="flex flex-col sm:flex-row items-center gap-3 flex-1 min-w-0">
        {search && (
          <Input
            prefix={<Search size={16} className="text-text-tertiary" />}
            placeholder={search.placeholder || t('common.search')}
            value={search.value}
            onChange={(e) => search.onChange(e.target.value)}
            className="h-10 rounded-control border-border bg-bg-page/20 w-full sm:max-w-[320px] hover:border-brand/40 transition-all"
            allowClear
          />
        )}
        {filters && (
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto custom-scrollbar no-scrollbar pb-0.5">
            {filters}
          </div>
        )}
      </div>

      {/* 右侧：操作区 */}
      <div className="flex items-center gap-3 shrink-0">
        {actions}
        
        {(onRefresh || isMobile) && (
          <div className="flex items-center gap-2 ml-1 border-l border-divider pl-3">
             {onRefresh && (
               <Button 
                icon={<RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />} 
                onClick={onRefresh}
                className="h-10 w-10 flex items-center justify-center rounded-control text-text-tertiary hover:text-brand"
               />
             )}
             {isMobile && (
                <Button 
                  icon={<SlidersHorizontal size={16} />} 
                  className="h-10 w-10 flex items-center justify-center rounded-control text-text-tertiary"
                />
             )}
          </div>
        )}
      </div>
    </div>
  );
};
