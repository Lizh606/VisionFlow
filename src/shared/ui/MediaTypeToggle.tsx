
import React from 'react';
import { Image, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export type MediaType = 'img' | 'vid';

interface MediaTypeToggleProps {
  value: MediaType;
  onChange: (val: MediaType) => void;
  className?: string;
}

export const MediaTypeToggle: React.FC<MediaTypeToggleProps> = ({ value, onChange, className = '' }) => {
  const { t } = useTranslation();

  const options = [
    { value: 'img', icon: Image, label: t('selfhosted.overview.charts.images') },
    { value: 'vid', icon: Video, label: t('selfhosted.overview.charts.video') },
  ] as const;

  return (
    <div className={`
      inline-flex items-center p-0.5 rounded-lg bg-bg-page border border-border 
      ${className}
    `}>
      {options.map((option) => {
        const isActive = value === option.value;
        const Icon = option.icon;
        
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value as MediaType)}
            type="button"
            className={`
              flex items-center justify-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all duration-200 select-none cursor-pointer
              ${isActive 
                ? 'bg-bg-card text-brand shadow-sm ring-1 ring-black/5 dark:ring-white/10' 
                : 'text-text-tertiary hover:text-text-secondary hover:bg-black/5 dark:hover:bg-white/5'
              }
            `}
            style={{
              // Compact height logic: 
              // content(16px icon) + py-1(4px*2) = 24px button height
              // container p-0.5(2px*2) + border(2px) => Total approx 30-32px
              minWidth: '80px',
              height: '28px' 
            }}
          >
            <Icon size={14} strokeWidth={isActive ? 2.5 : 2} />
            <span className="whitespace-nowrap">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};
