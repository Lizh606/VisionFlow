
import React from 'react';
import { Divider, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';
import { Listing } from '../../types';
import { VFText } from '../../../../ui/VFText';

const { Paragraph } = Typography;

export const OverviewPanel: React.FC<{ listing: Listing }> = ({ listing }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-500">
      {/* 1. Abstract Section */}
      <section className="flex flex-col gap-4">
        <VFText variant="t4" as="h3" color="primary" className="m-0 tracking-tight">
          {t('marketplace.detail.overview')}
        </VFText>
        <VFText variant="t5" color="secondary" className="leading-relaxed m-0 whitespace-pre-line font-medium block">
          {listing.description}
        </VFText>
      </section>

      {/* 2. Key Highlights - Metadata Based Only */}
      {listing.highlights && listing.highlights.length > 0 && (
        <>
          <Divider className="m-0 opacity-40" />
          <section className="flex flex-col gap-6">
            <VFText variant="t6" as="h4" color="tertiary" className="uppercase font-bold tracking-wider block">
               Key Features
            </VFText>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {listing.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-success shrink-0 mt-0.5" strokeWidth={2.5} />
                  <VFText variant="t5" color="primary" className="font-medium">{h}</VFText>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};