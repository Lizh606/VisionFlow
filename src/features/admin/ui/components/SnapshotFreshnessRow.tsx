
import React from 'react';
import { Button, Tooltip, Space } from 'antd';
import { RefreshCw, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFText } from '../../../../ui/VFText';
import dayjs from 'dayjs';

interface Props {
  lastAggregated: string;
  onRefresh: () => void;
  loading: boolean;
}

export const SnapshotFreshnessRow: React.FC<Props> = ({ lastAggregated, onRefresh, loading }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center px-1 mb-4">
      <Space size={8}>
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-text-tertiary" />
          <VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-tight">
            {t('admin.overview.snapshotFreshness')}: <span className="tabular-nums font-mono text-text-secondary">{dayjs(lastAggregated).format('HH:mm:ss')}</span>
          </VFText>
        </div>

        <Tooltip title={t('admin.overview.freshnessHint')}>
          <Button 
            type="text" 
            size="small" 
            disabled={loading}
            icon={<RefreshCw size={12} className={loading ? 'animate-spin' : ''} />} 
            className="text-text-tertiary hover:text-brand font-bold text-[10px] uppercase tracking-wider h-6 flex items-center gap-1.5 px-2 bg-bg-page/50 rounded-tag border border-divider/50"
            onClick={onRefresh}
          >
            {loading ? t('common.loading') : t('common.refresh')}
          </Button>
        </Tooltip>
      </Space>
    </div>
  );
};
