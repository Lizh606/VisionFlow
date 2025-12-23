
import React, { useState } from 'react';
import { Button } from 'antd';
import { Heart, Loader2 } from 'lucide-react';

interface FavoriteButtonProps {
  isFavorite?: boolean;
  onToggle: (e: React.MouseEvent) => Promise<void>;
  className?: string;
  size?: number;
}

/**
 * Standardize Favorite Button - V1.4
 * Container: 28x28 rounded-md
 * Colors: Tertiary (Muted) -> Brand (Selected)
 */
export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  isFavorite = false, 
  onToggle, 
  className = '',
  size = 14
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading) return;
    setLoading(true);
    try {
      await onToggle(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      disabled={loading}
      onClick={handleClick}
      className={`
        w-7 h-7 rounded-md border shadow-none flex items-center justify-center backdrop-blur-sm transition-all p-0
        bg-white/80 border-border/40
        ${isFavorite 
          ? 'text-brand' 
          : 'text-text-tertiary hover:text-text-primary hover:border-border/60 hover:bg-white'}
        ${className}
      `}
      icon={
        loading ? (
          <Loader2 size={size} className="animate-spin text-brand" />
        ) : (
          <Heart 
            size={size} 
            strokeWidth={2.2}
            fill={isFavorite ? "currentColor" : "none"} 
          />
        )
      }
    />
  );
};
