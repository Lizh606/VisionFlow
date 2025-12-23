
import React from 'react';
import { Row, Col, Button } from 'antd';
import { FileText, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Section = ({ title, subtitle, children }: any) => (
  <div className="flex flex-col gap-6 mb-12 animate-in fade-in slide-in-from-bottom-2 duration-300 last:mb-0">
    <div className="flex flex-col gap-1 border-l-[3px] border-brand pl-4">
      <h3 className="text-[20px] font-semibold text-text-primary m-0 tracking-tight leading-tight">{title}</h3>
      {subtitle && <p className="text-[12px] text-text-tertiary font-bold uppercase tracking-widest m-0 mt-1">{subtitle}</p>}
    </div>
    <div className="pt-2">{children}</div>
  </div>
);

export const ArtifactsStep: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="animate-in fade-in">
      <Section title={t('marketplace.seller.wizard.artifacts.docsTitle')} subtitle={t('marketplace.seller.wizard.artifacts.docsSubtitle')}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col p-8 rounded-card border border-divider bg-bg-page/20 border-dashed items-center justify-center cursor-pointer hover:border-brand transition-all group">
            <FileText size={32} className="text-text-tertiary group-hover:text-brand mb-3 opacity-40" />
            <span className="text-[14px] font-bold text-text-secondary">{t('marketplace.seller.wizard.artifacts.uploadDocs')}</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-4 rounded-control border border-divider bg-bg-card">
              <div className="flex items-center gap-3">
                <FileText size={16} className="text-text-tertiary" />
                <span className="text-[13px] font-bold text-text-primary">Implementation_Guide.pdf</span>
              </div>
              <Button type="text" danger icon={<Trash2 size={14} />} size="small" />
            </div>
          </div>
        </div>
      </Section>

      <Section title={t('marketplace.seller.wizard.artifacts.examplesTitle')} subtitle={t('marketplace.seller.wizard.artifacts.examplesSubtitle')}>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <div className="aspect-square rounded-card border border-divider bg-bg-page/40 flex items-center justify-center border-dashed cursor-pointer hover:border-brand transition-all">
              <Plus size={24} className="text-text-tertiary opacity-30" />
            </div>
          </Col>
          {[1, 2].map(i => (
            <Col span={6} key={i}>
              <div className="aspect-square rounded-card border border-divider bg-bg-card overflow-hidden relative group">
                <div className="absolute inset-0 flex items-center justify-center text-text-tertiary/10">
                  <ImageIcon size={40} />
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="small" danger className="w-8 h-8 p-0 flex items-center justify-center rounded-full shadow-sm"><Trash2 size={12} /></Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Section>
    </div>
  );
};
