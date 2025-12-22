
import React from 'react';

export type VFTagVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'brand' | 'neutral' | 'teal';

interface VFTagProps {
  children: React.ReactNode;
  variant?: VFTagVariant;
  filled?: boolean; 
  icon?: React.ReactNode;
  className?: string;
  title?: string;
  minWidth?: string | number; 
}

export const VFTag: React.FC<VFTagProps> = ({ 
  children, 
  variant = 'default', 
  filled = false,
  icon, 
  className = '',
  title,
  minWidth
}) => {
  /**
   * VisionFlow V1.4 统一 Soft Pill 算法:
   * - Height: h-6 (24px)
   * - Radius: rounded-full (999px)
   * - Font: text-[12px] font-medium (T6)
   * - Padding: px-2.5
   * - Icon Container: w-4 (16px) fixed width to prevent text jitter
   */
  const baseClasses = "inline-flex items-center justify-center gap-1.5 px-2.5 h-6 text-[12px] font-medium rounded-full transition-all border select-none whitespace-nowrap";

  // 定义语义色变量名映射
  const colorMap: Record<VFTagVariant, string> = {
    default: '--vf-text-secondary',
    neutral: '--vf-text-tertiary',
    success: '--vf-success',
    warning: '--vf-warning',
    error:   '--vf-error',
    info:    '--vf-info',
    brand:   '--vf-brand',
    teal:    '--vf-teal',
  };

  const cssVar = colorMap[variant];

  // 统一视觉强度：背景 8%，边框 18%，Hover 背景 12%
  const softStyle = {
    color: `rgb(var(${cssVar}))`,
    backgroundColor: `rgb(var(${cssVar}) / 0.08)`,
    borderColor: `rgb(var(${cssVar}) / 0.18)`,
  };

  const filledStyle = {
    color: '#FFFFFF',
    backgroundColor: `rgb(var(${cssVar}))`,
    borderColor: 'transparent',
  };

  return (
    <span 
      className={`${baseClasses} ${className} group/tag`} 
      title={title}
      style={{ 
        minWidth, 
        ...(filled ? filledStyle : softStyle)
      }}
    >
      {icon && (
        <span className="w-4 flex justify-center shrink-0">
          {/* 强制图标大小为 12x12 */}
          {React.cloneElement(icon as React.ReactElement, { size: 12, strokeWidth: 2.5 })}
        </span>
      )}
      <span className="leading-none">{children}</span>

      <style>{`
        .group\\/tag:hover {
          background-color: ${filled ? `rgb(var(${cssVar}) / 0.9)` : `rgb(var(${cssVar}) / 0.12)`} !important;
        }
      `}</style>
    </span>
  );
};
