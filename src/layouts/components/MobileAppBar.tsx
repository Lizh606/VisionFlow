
import React from 'react';
import { Button } from 'antd';
import { Menu } from 'lucide-react';

interface MobileAppBarProps {
  onOpenMenu: () => void;
  onBrandClick?: () => void;
}

export const MobileAppBar: React.FC<MobileAppBarProps> = ({ onOpenMenu, onBrandClick }) => {
  return (
    <header 
      className="md:hidden sticky top-0 z-[100] w-full h-header bg-bg-card border-b border-divider flex items-center justify-between px-4"
    >
      {/* Brand Entrance */}
      <div 
        className="flex items-center gap-2.5 cursor-pointer active:opacity-70 transition-opacity flex-1 min-w-0 overflow-hidden mr-4"
        onClick={onBrandClick}
      >
        <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-md">
          <img 
            src="https://p.ipic.vip/vjblew.jpg" 
            alt="VisionFlow" 
            className="w-full h-full object-contain" 
          />
        </div>
        <span className="text-[18px] font-bold text-text-primary tracking-tight truncate whitespace-nowrap">
          VisionFlow
        </span>
      </div>

      {/* Hamburger Menu - Fixed size container to ensure menu button stability */}
      <div className="flex-shrink-0 flex items-center justify-end w-11 h-11">
        <Button 
          type="text" 
          aria-label="Open menu"
          icon={<Menu size={22} className="text-text-primary" />} 
          onClick={onOpenMenu}
          className="flex items-center justify-center w-11 h-11 rounded-control hover:bg-action-hover -mr-2"
        />
      </div>
    </header>
  );
};
