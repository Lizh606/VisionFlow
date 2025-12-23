
import React from 'react';
import { VFCard } from './VFCard';
import { VFText } from '../../ui/VFText';

interface VFStatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendStatus?: 'success' | 'warning' | 'error' | 'neutral';
  footer?: string;
}

export const VFStatCard = React.forwardRef<HTMLDivElement, VFStatCardProps>((props, ref) => {
  const { title, value, trend, trendStatus = 'neutral', footer } = props;
  
  const trendColor = {
    success: 'success' as const,
    warning: 'warning' as const,
    error: 'error' as const,
    neutral: 'tertiary' as const,
  }[trendStatus];

  return (
    <VFCard ref={ref} className="h-full">
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* V1.4: T6 Caption Strong (12/18, 500) */}
          <VFText variant="t6" color="tertiary" className="mb-2 block uppercase font-bold tracking-wider">
            {title}
          </VFText>
          {/* V1.4: T1 Display (28/36, 600) + Tabular Nums */}
          <VFText variant="t1" color="primary" tabularNums className="leading-none">
            {value}
          </VFText>
        </div>
        
        {(trend || footer) && (
          <div className="flex flex-col gap-1 mt-4">
             {trend && (
               <div className="flex">
                 <VFTag variant={trendStatus === 'neutral' ? 'neutral' : trendStatus as any} className="h-5 px-1.5 font-bold text-[10px]">
                   {trend}
                 </VFTag>
               </div>
             )}
             {footer && (
               /* V1.4: Meta Info = T6 Caption */
               <VFText variant="t6" color="tertiary" className="mt-1">
                 {footer}
               </VFText>
             )}
          </div>
        )}
      </div>
    </VFCard>
  );
});

// Helper for inline trend tag if VFTag is not imported
const VFTag = ({ variant, children, className }: any) => (
  <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold border ${
    variant === 'success' ? 'bg-success/10 border-success/20 text-success' :
    variant === 'warning' ? 'bg-warning/10 border-warning/20 text-warning' :
    variant === 'error' ? 'bg-error/10 border-error/20 text-error' :
    'bg-bg-page border-border text-text-tertiary'
  } ${className}`}>
    {children}
  </span>
);
