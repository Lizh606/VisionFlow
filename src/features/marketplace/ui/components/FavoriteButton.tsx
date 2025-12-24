
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
 * Fixed: Explicitly override AntD default blue hover with !text-brand
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
        w-7 h-7 rounded-md border shadow-none flex items-center justify-center transition-all p-0
        ${isFavorite 
          ? '!text-brand bg-brand/10 border-brand/20 hover:!bg-brand/20' 
          : '!text-text-tertiary bg-white/80 border-border/40 hover:!text-brand hover:!border-brand/40 hover:!bg-brand/5'}
        ${className}
      `}
      icon={
        loading ? (
          <Loader2 size={size} className="animate-spin text-brand" />
        ) : (
          <Heart 
            size={size} 
            strokeWidth={2.5}
            fill={isFavorite ? "currentColor" : "none"} 
            className="transition-colors"
          />
        )
      }
    />
  );
};
