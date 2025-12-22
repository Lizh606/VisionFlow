
import React from 'react';

interface VFBrandProps {
  collapsed?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * VFBrand - The core brand lockup (Mark + Wordmark)
 * Designed for VisionFlow V1.4+
 */
export const VFBrand: React.FC<VFBrandProps> = ({ collapsed, onClick, className = '' }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        group flex items-center h-[60px] px-4 cursor-pointer select-none transition-all duration-200
        ${collapsed ? 'justify-center' : 'gap-3'}
        ${className}
      `}
    >
      {/* 1. Logo Mark: Rounded square with modern aesthetic - Borders removed per request */}
      <div className={`
        relative shrink-0 flex items-center justify-center 
        overflow-hidden rounded-[8px]
        transition-all duration-300 group-hover:scale-105
        ${collapsed ? 'w-9 h-9' : 'w-8 h-8'}
      `}>
        <img 
          src="https://p.ipic.vip/vjblew.jpg" 
          alt="VisionFlow Logo" 
          className="w-full h-full object-cover" 
        />
        {/* Subtle overlay for refinement */}
        <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* 2. Wordmark: Semi-bold with layered colors */}
      {!collapsed && (
        <div className="flex items-baseline overflow-hidden animate-in fade-in slide-in-from-left-1 duration-300">
          <span className="
            text-[21px] lg:text-[21px] md:text-[18px] font-semibold 
            text-text-primary tracking-[-0.02em] leading-none whitespace-nowrap
            group-hover:text-brand transition-colors
          ">
            Vision
          </span>
          <span className="
            text-[21px] lg:text-[21px] md:text-[18px] font-semibold 
            text-text-secondary/85 tracking-[-0.02em] leading-none whitespace-nowrap
          ">
            Flow
          </span>
        </div>
      )}
    </div>
  );
};
