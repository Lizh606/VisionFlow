
import React from 'react';
import { ExternalLink, Globe, MapPin, Search as SearchIcon } from 'lucide-react';
import { VFText } from './VFText';

export interface GroundingSource {
  uri: string;
  title: string;
  type: 'web' | 'maps';
}

interface VFGroundingListProps {
  sources: GroundingSource[];
  title?: string;
  className?: string;
}

/**
 * VFGroundingList - Gemini Grounding 溯源 UI 标准实现
 */
export const VFGroundingList: React.FC<VFGroundingListProps> = ({ 
  sources, 
  title = "Sources", 
  className = "" 
}) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className={`flex flex-col gap-3 p-5 rounded-card bg-bg-page/40 border border-divider ${className}`}>
      <div className="flex items-center gap-2 mb-1">
        <SearchIcon size={14} className="text-brand opacity-60" />
        <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest">
          {title}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {sources.map((source, idx) => {
          const domain = new URL(source.uri).hostname.replace('www.', '');
          const Icon = source.type === 'maps' ? MapPin : Globe;

          return (
            <a 
              key={idx}
              href={source.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group flex items-center justify-between gap-4 p-3 
                bg-bg-card rounded-control border border-transparent
                hover:border-brand/30 hover:shadow-sm transition-all
              "
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-bg-page flex items-center justify-center text-text-tertiary shrink-0 group-hover:text-brand group-hover:bg-brand/5 transition-colors">
                  <Icon size={14} />
                </div>
                <div className="flex flex-col min-w-0">
                  <VFText variant="t5-strong" className="truncate text-[13px]">
                    {source.title}
                  </VFText>
                  <span className="text-[11px] text-text-tertiary truncate opacity-70">
                    {domain}
                  </span>
                </div>
              </div>
              <ExternalLink size={14} className="text-text-tertiary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all shrink-0" />
            </a>
          );
        })}
      </div>
    </div>
  );
};
