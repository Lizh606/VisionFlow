
import React from 'react';

interface VFBrandProps {
  collapsed?: boolean;
  onClick?: () => void;
  className?: string;
}

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
      <div className={`
        relative shrink-0 flex items-center justify-center 
        transition-all duration-300 group-hover:scale-105
        ${collapsed ? 'w-10 h-10' : 'w-8 h-8'}
      `}>
        <img 
          src="https://p.ipic.vip/vjblew.jpg" 
          alt="VisionFlow Logo" 
          className="w-full h-full object-contain" 
        />
        {/* 确保没有任何遮罩或背景层干扰 Logo 纯净度 */}
      </div>

      {!collapsed && (
        <div className="flex items-baseline overflow-hidden animate-in fade-in slide-in-from-left-1 duration-300">
          <span className="
            text-xl font-bold
            text-text-primary tracking-tight leading-none whitespace-nowrap
            group-hover:text-brand transition-colors
          ">
            Vision
          </span>
          <span className="
            text-xl font-bold
            text-text-secondary/80 tracking-tight leading-none whitespace-nowrap
          ">
            Flow
          </span>
        </div>
      )}
    </div>
  );
};
