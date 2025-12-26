
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
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

export const VFTag = React.forwardRef<HTMLSpanElement, VFTagProps>((props, ref) => {
  const { 
    children, 
    variant = 'default', 
    filled = false,
    icon, 
    className = '',
    title,
    minWidth,
    onClick,
    onMouseDown
  } = props;

  /**
   * VisionFlow V1.4 Unified Soft Pill Algorithm:
   * - Height: h-6 (24px)
   * - Radius: rounded-full (999px)
   * - Font: text-[12px] font-medium (T6)
   * - Padding: px-2.5
   * - Icon Container: w-4 (16px) fixed width to prevent text jitter
   */
  const baseClasses = "inline-flex items-center justify-center gap-1.5 px-2.5 h-6 text-[12px] font-medium rounded-full transition-all border select-none whitespace-nowrap";

  // Semantic color map
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

  // Visual intensity: bg 8%, border 18%, hover bg 12%
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
      ref={ref}
      onClick={onClick}
      onMouseDown={onMouseDown}
      className={`${baseClasses} ${onClick ? 'cursor-pointer' : ''} ${className} group/tag`} 
      title={title}
      style={{ 
        minWidth, 
        ...(filled ? filledStyle : softStyle)
      }}
    >
      {React.isValidElement(icon) && (
        <span className="w-4 flex justify-center shrink-0">
          {React.cloneElement(icon as React.ReactElement<any>, { size: 12, strokeWidth: 2.5 })}
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
});
