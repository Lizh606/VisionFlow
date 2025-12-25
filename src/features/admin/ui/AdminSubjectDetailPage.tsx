import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Skeleton, App, Space, Tooltip } from 'antd';
import { RefreshCw, Download, Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFText } from '../../../ui/VFText';
import { SubjectOverviewCard } from './components/SubjectOverviewCard';
import { SubjectDataTabs } from './components/SubjectDataTabs';
import { SubjectFreshnessBanner } from './components/SubjectFreshnessBanner';
import { RelatedAlertsTable } from './components/RelatedAlertsTable';
import { RecentAuditTable } from './components/RecentAuditTable';
import { mockSubjectDetails } from '../model/mockSubjects';
import { SubjectDetailData, SubjectType } from '../types/subjects';

interface Props {
  subjectType: SubjectType;
  subjectId: string;
  onBack: () => void;
  onNavigate?: (p: string) => void;
}

export const AdminSubjectDetailPage: React.FC<Props> = ({ 
  subjectType, subjectId, onBack, onNavigate 
}) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [data, setData] = useState<SubjectDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSnapshot = () => {
    setLoading(true);
    setTimeout(() => {
      // UC-AC-001: Ensure data is fetched by ID or defaults to dev sample
      const result = mockSubjectDetails[subjectId] || mockSubjectDetails['dev_829305_a'];
      setData(result);
      setLoading(false);
    }, 600);
  };

  useEffect(() => { fetchSnapshot(); }, [subjectId]);

  const handleCopyId = () => {
    navigator.clipboard.writeText(subjectId);
    message.success(t('common.copy') + ' OK');
  };

  if (loading) return <div className="p-8"><Skeleton active paragraph={{ rows: 15 }} /></div>;
  if (!data) return null;

  // P0: Fix Title i18n and type mapping
  const typeLabel = t(`admin.subjects.types.${subjectType}`);
  const displayTitle = `${typeLabel} Detail`;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 w-full pb-20">
      <VFPageHeader 
        title={displayTitle}
        onBack={onBack}
        description={
          <div className="flex items-center gap-2 group cursor-pointer" onClick={handleCopyId}>
            <VFText variant="t5" color="secondary">{t('admin.subjects.detail.subjectId')}:</VFText>
            <VFText variant="t7" color="primary" className="font-mono tabular-nums font-bold">{subjectId}</VFText>
            <Tooltip title={t('common.copy')}>
              <Copy size={12} className="text-text-tertiary opacity-40 group-hover:opacity-100 transition-all" />
            </Tooltip>
          </div>
        }
        actions={
          <Space size={12}>
            <Button 
              icon={<RefreshCw size={16} />} 
              onClick={fetchSnapshot}
              className="h-10 rounded-control font-bold text-text-secondary"
            >
              {t('common.refresh')}
            </Button>
            <Button 
              disabled
              icon={<Download size={16} />} 
              className="h-10 rounded-control font-bold text-text-secondary"
            >
              Export
            </Button>
          </Space>
        }
      />

      <SubjectFreshnessBanner 
        lastAggregated={data.lastAggregatedAt} 
        lagMs={data.lagMs}
        dlqCount={data.dlqCount}
        onViewHealth={() => onNavigate?.('admin-health')}
      />

      <Row gutter={[24, 24]}>
        <Col xs={24} xl={16} className="flex flex-col gap-6">
          <SubjectOverviewCard subject={data.snapshot} />
          <SubjectDataTabs 
            snapshot={data.snapshot} 
            subjectId={subjectId} 
            subjectType={subjectType}
            onViewHealth={() => onNavigate?.('admin-health')}
          />
        </Col>

        <Col xs={24} xl={8} className="flex flex-col gap-6">
          <RelatedAlertsTable 
            subjectId={subjectId} 
            onViewAlert={(id) => onNavigate?.(`admin-alerts/${id}`)}
          />
          <RecentAuditTable 
            subjectId={subjectId} 
            onViewAudit={(opId) => onNavigate?.(`admin-audit?adminOpId=${opId}`)}
            onViewFullLog={() => onNavigate?.(`admin-audit?subjectId=${subjectId}`)}
          />
        </Col>
      </Row>
    </div>
  );
};