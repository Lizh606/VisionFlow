
import React from 'react';
import { Segmented, Button } from 'antd';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const HeaderRangePicker: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center gap-3">
      {/* 
        Spec: Controls should have radius=8px (rounded-control). 
        Height should be 40px (desktop standard).
      */}
      <Segmented 
        options={[
          { label: t('selfhosted.overview.timeRange.24h'), value: '24h' },
          { label: t('selfhosted.overview.timeRange.7d'), value: '7d' },
          { label: t('selfhosted.overview.timeRange.30d'), value: '30d' },
        ]}
        defaultValue="24h"
        className="bg-bg-input border border-border text-text-secondary shadow-sm"
        style={{ borderRadius: 'var(--vf-radius-control)', minHeight: '40px', padding: '4px' }}
      />
      <Button 
        icon={<Calendar size={18} />} 
        className="
          flex items-center justify-center 
          h-10 w-10 
          rounded-control bg-bg-input border-border text-text-secondary
          hover:border-brand hover:text-brand transition-all shadow-sm
        "
      />
    </div>
  );
};
