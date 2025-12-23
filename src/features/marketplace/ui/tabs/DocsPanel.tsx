
import React from 'react';
import { Button, List } from 'antd';
import { useTranslation } from 'react-i18next';
import { FileText, ExternalLink, Calendar, BookOpen } from 'lucide-react';
import { Listing } from '../../types';
import { VFEmptyState } from '../../../../shared/ui/VFEmptyState';

export const DocsPanel: React.FC<{ listing: Listing }> = ({ listing }) => {
  const { t } = useTranslation();
  const docs = listing.docs || [];

  if (docs.length === 0) {
    return (
      <div className="py-12">
        <VFEmptyState 
          icon={<BookOpen size={32} />}
          description="Documentation is currently unavailable for this resource." 
        />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col gap-6">
        <div className="rounded-card border border-divider overflow-hidden bg-bg-card">
          <List
            dataSource={docs}
            renderItem={(doc) => (
              <div 
                className="px-6 py-4 border-b border-divider last:border-b-0 hover:bg-bg-page/40 transition-colors cursor-pointer group"
                onClick={() => window.open(doc.url, '_blank')}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-9 h-9 rounded-control flex items-center justify-center shrink-0 bg-bg-page border border-border text-text-tertiary">
                       <FileText size={18} />
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                       <div className="flex items-center gap-2">
                         <span className="text-sm font-bold text-text-primary truncate">{doc.title}</span>
                         <span className="text-[10px] font-bold text-text-tertiary bg-bg-page px-1.5 py-0.5 rounded border border-border">{doc.type}</span>
                       </div>
                       {doc.updatedAt && (
                         <div className="flex items-center gap-1.5 text-text-tertiary text-[11px]">
                           <Calendar size={12} className="opacity-50" />
                           <span>Updated: {doc.updatedAt}</span>
                         </div>
                       )}
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-text-tertiary group-hover:text-brand opacity-40 group-hover:opacity-100 transition-all" />
                </div>
              </div>
            )}
          />
        </div>
        
        {/* Footnote helper - stays descriptive, not a new block */}
        <p className="text-[12px] text-text-tertiary text-center m-0">
          Advanced technical implementation details and API references are updated by the developer.
        </p>
      </div>
    </div>
  );
};
