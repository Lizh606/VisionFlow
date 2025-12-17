
import React from 'react';
import { List, Tag, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { VFCard } from '../../../../../shared/ui/VFCard';
import { OverviewAlert } from '../../model/types';

interface Props {
  alerts: OverviewAlert[];
}

export const AlertsCard: React.FC<Props> = ({ alerts }) => {
  const { t } = useTranslation();

  const getIcon = (severity: string) => {
    switch(severity) {
      case 'critical': return <AlertCircle size={16} className="text-error" />;
      case 'warning': return <AlertTriangle size={16} className="text-warning" />;
      default: return <Info size={16} className="text-info" />;
    }
  };

  const getBg = (severity: string) => {
    switch(severity) {
      case 'critical': return 'bg-error/5 border-error/10';
      case 'warning': return 'bg-warning/5 border-warning/10';
      default: return 'bg-info/5 border-info/10';
    }
  };

  return (
    <VFCard 
      title={t('selfhosted.overview.alerts.title')} 
      className="h-full"
      extra={<Button type="link" size="small">{t('selfhosted.overview.alerts.viewAll')}</Button>}
      noPadding
    >
      <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
        <List
          dataSource={alerts}
          renderItem={(item: OverviewAlert) => (
            <div className={`
              flex items-start gap-3 px-6 py-4 border-b border-border last:border-b-0
              hover:bg-bg-page/50 transition-colors cursor-pointer
            `}>
              <div className={`shrink-0 mt-0.5 w-8 h-8 rounded-full flex items-center justify-center border ${getBg(item.severity)}`}>
                {getIcon(item.severity)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm font-medium text-text-primary truncate pr-2">{item.title}</span>
                  <span className="text-xs text-text-tertiary whitespace-nowrap">{item.timestamp}</span>
                </div>
                <div className="text-xs text-text-secondary">
                   {/* Optional ID or source display */}
                   ID: {item.id}
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </VFCard>
  );
};
