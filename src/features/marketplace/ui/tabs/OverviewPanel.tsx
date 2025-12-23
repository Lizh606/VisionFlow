
import React from 'react';
import { Divider, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';
import { Listing } from '../../types';

const { Paragraph } = Typography;

export const OverviewPanel: React.FC<{ listing: Listing }> = ({ listing }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-500">
      {/* 1. Abstract Section */}
      <section className="flex flex-col gap-4">
        <h3 className="text-[16px] font-semibold text-text-primary m-0 tracking-tight">
          {t('marketplace.detail.overview')}
        </h3>
        <Paragraph className="text-[14px] text-text-secondary leading-relaxed m-0 whitespace-pre-line font-medium">
          {listing.description}
        </Paragraph>
      </section>

      {/* 2. Key Highlights - Metadata Based Only */}
      {listing.highlights && listing.highlights.length > 0 && (
        <>
          <Divider className="m-0 opacity-40" />
          <section className="flex flex-col gap-6">
            <h4 className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">
               Key Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {listing.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-success shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-[14px] text-text-primary font-medium">{h}</span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* 3. Use Cases - Clean paragraph block */}
      {listing.useCases && (
        <section className="flex flex-col gap-4 pt-8 border-t border-divider">
          <h4 className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">
             Intended Use Cases
          </h4>
          <p className="text-[14px] text-text-secondary leading-relaxed m-0 font-medium italic">
            {listing.useCases}
          </p>
        </section>
      )}
    </div>
  );
};
