
import React from 'react';
import { Row, Col, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Play, ImageIcon } from 'lucide-react';
import { Listing } from '../../types';
import { VFEmptyState } from '../../../../shared/ui/VFEmptyState';

interface Props {
  listing: Listing;
  onUseInTest: (url: string) => void;
}

export const ExamplesPanel: React.FC<Props> = ({ listing, onUseInTest }) => {
  const { t } = useTranslation();
  const examples = listing.examples || [];

  if (examples.length === 0) {
    return (
      <div className="py-12">
        <VFEmptyState 
          icon={<ImageIcon size={32} />}
          description="No samples provided for this resource yet." 
        />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <Row gutter={[16, 16]}>
        {examples.map((ex, idx) => (
          <Col xs={24} sm={12} lg={8} key={ex.id}>
            <div className="flex flex-col h-full rounded-card border border-divider overflow-hidden bg-bg-card hover:border-border-strong transition-all">
              {/* Visual Placeholder */}
              <div className="aspect-video bg-bg-page flex flex-col items-center justify-center text-text-tertiary/10 group cursor-pointer relative">
                 <ImageIcon size={40} strokeWidth={1} />
                 <span className="mt-2 text-[10px] font-bold uppercase tracking-widest opacity-60">Visual Sample {idx + 1}</span>
                 <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-4 flex flex-col gap-3">
                 <span className="text-[13px] font-bold text-text-primary truncate">
                   {ex.title || `Sample ${idx + 1}`}
                 </span>
                 
                 <Button 
                   block 
                   type="default"
                   icon={<Play size={14} />} 
                   disabled={!listing.entitlements?.can_cloud_test}
                   onClick={() => onUseInTest(ex.url)}
                   className="h-9 font-bold text-[11px] rounded-control border-divider text-text-secondary hover:text-brand hover:border-brand transition-all flex items-center justify-center gap-1.5 uppercase tracking-wide"
                 >
                   Use in Cloud Test
                 </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};
