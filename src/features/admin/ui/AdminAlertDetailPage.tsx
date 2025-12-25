import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Button, App, Skeleton, Tooltip } from 'antd';
import { RefreshCw, Copy, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFTag } from '../../../shared/ui/VFTag';
import { VFText } from '../../../ui/VFText';
import { AlertDetailSummary } from './components/AlertDetailSummary';
import { AlertDetailSnapshot } from './components/AlertDetailSnapshot';
import { AlertDetailActions } from './components/AlertDetailActions';
import { AdminAlert, SoTResult, AlertTimelineEvent } from '../types/alerts';
import { mockAlerts } from '../model/mockAlerts';
import dayjs from 'dayjs';

interface Props {
  alertId: string;
  onBack: () => void;
  onNavigate?: (p: string) => void;
}

export const AdminAlertDetailPage: React.FC<Props> = ({ alertId, onBack, onNavigate }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [alert, setAlert] = useState<AdminAlert | null>(null);
  const [loading, setLoading] = useState(true);
  const [sotData, setSotData] = useState<SoTResult | null>(null);
  const [sotLoading, setSotLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const base = mockAlerts.find(a => a.id === alertId) || mockAlerts[0];
      
      const mockTimeline: AlertTimelineEvent[] = [
        { 
          status: 'OPEN' as const, 
          actorType: 'system' as const, 
          actorDetail: 'Watchdog-Svc', 
          timestamp: dayjs().subtract(4, 'hour').toISOString(),
          message: 'Initial anomaly detection: Heartbeat missing.'
        }
      ].reverse();

      // P0: 收敛主体类型
      const normalizedType = (base.subjectType === 'RUNTIME_POD' ? 'DEVICE' : base.subjectType).toUpperCase();

      setAlert({
        ...base,
        subjectType: normalizedType,
        description: 'Cross-domain anomaly detected: Device offline causing lease drift.',
        aggregationKey: `subject:${base.subjectId}|domain:${base.domain}`,
        timeline: mockTimeline,
        snapshot: {
          device: { 'Status': 'OFFLINE', 'HardwareID': base.subjectId, 'LastSeen': '5m ago', 'Firmware': 'v2.4.1' },
          lease: { 'EntitlementID': 'ENT-9920', 'LeaseStatus': 'ACTIVE', 'Expiry': '2025-12-31' },
          deployment: { 'Workflow': 'PPE-Check-v2', 'Version': 'v2.4.1' },
          usage: { 'Last24h': '1.2M inferences' }
        }
      });
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [alertId]);

  const handleUpdateAlert = useCallback((updates: Partial<AdminAlert>, newEvent?: AlertTimelineEvent) => {
    setAlert(prev => {
      if (!prev) return null;
      const updatedTimeline = newEvent ? [newEvent, ...(prev.timeline || [])] : prev.timeline;
      return { ...prev, ...updates, timeline: updatedTimeline };
    });
  }, []);

  const handleSubjectClick = () => {
    if (alert && onNavigate) {
      // P0: 确保路由路径合规
      onNavigate(`admin-subjects/${alert.subjectType.toLowerCase()}/${alert.subjectId}`);
    }
  };

  const handleQuerySoT = useCallback(() => {
    if (!alert) return;
    setSotLoading(true);
    setTimeout(() => {
      setSotData({
        data: {
          device: { 'Status': 'OFFLINE', 'HardwareID': alert.subjectId, 'LastSeen': '7m ago', 'Firmware': 'v2.4.1' },
          lease: { 'EntitlementID': 'ENT-9920', 'LeaseStatus': 'DRIFT_DETECTED', 'Expiry': '2025-12-31' },
          deployment: { 'Workflow': 'PPE-Check-v2', 'Version': 'v2.4.1' },
          usage: { 'Last24h': '1.2M inferences' }
        },
        lastAggregatedAt: new Date().toISOString(),
        lagMs: 185000,
        dlqCount: 3,
        source: 'VisionFlow-SoT-Resolver'
      });
      message.success(t('admin.alerts.detail.sotSuccess'));
      setSotLoading(false);
    }, 1000);
  }, [alert, message, t]);

  if (loading) return <div className="p-8"><Skeleton active paragraph={{ rows: 12 }} /></div>;
  if (!alert) return null;

  const domainMap: Record<string, { label: string; variant: any }> = {
    studio: { label: 'Studio', variant: 'brand' },
    selfhosted: { label: 'Self-hosted', variant: 'teal' },
    marketplace: { label: 'Marketplace', variant: 'info' },
    billing: { label: 'Billing', variant: 'warning' },
    usage: { label: 'Usage', variant: 'neutral' }
  };
  const dConfig = domainMap[alert.domain] || { label: alert.domain.toUpperCase(), variant: 'default' };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 w-full pb-20">
      <VFPageHeader 
        title={
          <div className="flex items-center gap-3">
            <span>{alert.type.replace(/_/g, ' ')}</span>
            <VFTag variant={dConfig.variant} filled className="font-bold">{dConfig.label}</VFTag>
          </div>
        }
        description={
          <div className="flex items-center gap-2 group/id cursor-pointer" onClick={handleSubjectClick}>
             <VFText variant="t5" color="secondary">{t('admin.alerts.detail.subjectId')}:</VFText>
             <VFText variant="t7" color="brand" className="font-bold tabular-nums hover:underline">{alert.subjectId}</VFText>
             <ArrowUpRight size={14} className="text-brand opacity-40 group-hover/id:opacity-100 transition-opacity" />
          </div>
        }
        onBack={onBack}
        actions={
          <Tooltip title={t('admin.overview.refreshTooltip')}>
            <Button 
              icon={<RefreshCw size={16} />} 
              onClick={() => { setLoading(true); setSotData(null); }}
              className="h-10 rounded-control font-bold text-text-secondary"
            >
              {t('admin.overview.refreshSnapshot')}
            </Button>
          </Tooltip>
        }
      />

      <Row gutter={[24, 24]} align="stretch">
        <Col xs={24} xl={6}>
          <AlertDetailSummary alert={alert} />
        </Col>
        <Col xs={24} xl={12}>
          <AlertDetailSnapshot 
            alert={alert} 
            sot={sotData} 
            loading={sotLoading} 
            onQuery={handleQuerySoT} 
            onViewHealth={() => onNavigate?.('admin-health')}
            onOpenSubjectDetail={handleSubjectClick}
          />
        </Col>
        <Col xs={24} xl={6}>
          <AlertDetailActions alert={alert} onUpdate={handleUpdateAlert} />
        </Col>
      </Row>
    </div>
  );
};