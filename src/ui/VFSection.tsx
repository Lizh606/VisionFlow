
import React from 'react';
import { VFText } from './VFText';

interface VFSectionProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  level?: 3 | 4; // T3 或 T4 标题
}

/**
 * VFSection - 标准化的页面分区/卡片内部小节
 */
export const VFSection: React.FC<VFSectionProps> = ({
  title,
  description,
  icon,
  children,
  className = '',
  level = 3
}) => {
  return (
    <section className={`flex flex-col gap-5 mb-10 last:mb-0 ${className}`}>
      <div className="flex flex-col gap-1 border-l-[3px] border-brand pl-4">
        <div className="flex items-center gap-2">
          {icon && <span className="text-brand shrink-0">{icon}</span>}
          <VFText variant={level === 3 ? 't3' : 't4'} color="primary" className="m-0">
            {title}
          </VFText>
        </div>
        {description && (
          <VFText variant="t5" color="secondary" className="opacity-80 leading-relaxed max-w-2xl">
            {description}
          </VFText>
        )}
      </div>
      <div className="pt-1">
        {children}
      </div>
    </section>
  );
};
