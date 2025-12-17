import React from 'react';
import { VFCard } from './VFCard';

interface VFStatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendStatus?: 'success' | 'warning' | 'error' | 'neutral';
  footer?: string;
}

export const VFStatCard: React.FC<VFStatCardProps> = ({ title, value, trend, trendStatus = 'neutral', footer }) => {
  const trendColor = {
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    neutral: 'text-text-tertiary',
  }[trendStatus];

  return (
    <VFCard className="h-full">
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="text-sm font-semibold text-text-tertiary mb-2 uppercase tracking-wider">{title}</div>
          <div className="text-3xl font-bold text-text-primary tabular-nums tracking-tight">{value}</div>
        </div>
        
        {(trend || footer) && (
          <div className="flex flex-col gap-1 mt-4">
             {trend && (
               <div className={`text-xs font-semibold px-2 py-0.5 rounded-tag w-fit bg-opacity-10 ${trendColor} bg-current`}>
                 {trend}
               </div>
             )}
             {footer && <div className="text-xs text-text-tertiary mt-1">{footer}</div>}
          </div>
        )}
      </div>
    </VFCard>
  );
};