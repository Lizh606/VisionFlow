
import React, { useState, useEffect, useMemo } from 'react';
import { Button, Tooltip, Divider } from 'antd';
import { 
  Lock, ShieldOff, UserCheck, Activity
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFText } from '../../../../ui/VFText';
import { AdminAlert, AdminOpResult, AlertTimelineEvent } from '../../types/alerts';
import { FreezeEntitlementModal } from './FreezeEntitlementModal';
import { SuppressAlertModal } from './SuppressAlertModal';
import { VFAckAlertModal } from './VFAckAlertModal';
import { VFOperationStatusCard } from './VFOperationStatusCard';
import { VFOperationDetailDrawer } from './VFOperationDetailDrawer';
import { useAdminOperationTracker } from '../../hooks/useAdminOperationTracker';

const MOCK_CURRENT_ROLE: string = 'ops_admin';

interface ActionBtnProps {
  label: string;
  icon: React.ElementType;
  action: string;
  danger?: boolean;
  primary?: boolean;
  permission: {
    granted: boolean;
    reason?: string;
  };
  stateValid: boolean;
  dependency: {
    available: boolean;
    reason?: string;
  };
  onClick: (a: string) => void;
}

const ActionButton: React.FC<ActionBtnProps> = ({ 
  label, icon: Icon, action, danger, primary, permission, stateValid, dependency, onClick 
}) => {
  const isDisabled = !permission.granted || !dependency.available || !stateValid;
  
  const tooltipContent = useMemo(() => {
    if (!permission.granted) return permission.reason;
    if (!dependency.available) return dependency.reason;
    if (!stateValid) return "Action not available for current status.";
    return `Perform ${label}.`;
  }, [permission, dependency, stateValid, label]);

  return (
    <Tooltip title={tooltipContent} placement="left">
      <Button 
        block
        type={primary ? 'primary' : 'default'}
        danger={danger}
        disabled={isDisabled}
        icon={<Icon size={16} />}
        className={`h-10 font-bold text-[13px] rounded-control shadow-none flex items-center justify-center gap-2 ${primary && !danger && !isDisabled ? 'bg-brand border-brand' : ''}`}
        onClick={() => onClick(action)}
      >
        {label}
      </Button>
    </Tooltip>
  );
};

interface DetailActionsProps {
  alert: AdminAlert;
  onUpdate: (updates: Partial<AdminAlert>, newEvent?: AlertTimelineEvent) => void;
}

export const AlertDetailActions: React.FC<DetailActionsProps> = ({ alert, onUpdate }) => {
  const { t } = useTranslation();
  const tracker = useAdminOperationTracker(alert.id);
  
  const [activeModal, setActiveModal] = useState<'freeze' | 'suppress' | 'ack' | null>(null);
  const [selectedOp, setSelectedOp] = useState<AdminOpResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Sync logic: listen for op status changes to update main view
  useEffect(() => {
    const latestOp = tracker.recentOps[0];
    if (!latestOp || latestOp.status !== 'SUCCESS') return;

    const isAlreadyLogged = alert.timeline?.some(ev => ev.adminOpId === latestOp.adminOpId && ev.status === 'ACTION_RESULT');
    if (isAlreadyLogged) return;

    let updates: Partial<AdminAlert> = {};
    let timelineMessage = `${latestOp.actionType} successful.`;
    let comment = (latestOp.after as any)?.comment;

    if (latestOp.actionType.includes('Acknowledge')) {
      updates = { status: 'ACKNOWLEDGED' };
    } 
    else if (latestOp.actionType.includes('Suppress')) {
      updates = { status: 'SUPPRESSED' };
      const duration = (latestOp.after as any)?.duration;
      timelineMessage = `Alert suppressed for window: ${duration}.`;
    } 
    else if (latestOp.actionType.includes('Freeze')) {
      const entId = (latestOp.after as any)?.entitlementId;
      timelineMessage = `Risk containment executed: Entitlement ${entId} frozen.`;
      comment = (latestOp.after as any)?.reason;
    }

    const timelineEvent: AlertTimelineEvent = {
      status: 'ACTION_RESULT',
      actorType: 'operator',
      actorDetail: latestOp.operatorId,
      timestamp: latestOp.timestamp,
      message: timelineMessage,
      adminOpId: latestOp.adminOpId,
      opStatus: 'SUCCESS',
      comment: comment
    };

    onUpdate(updates, timelineEvent);
  }, [tracker.recentOps, onUpdate, alert.timeline]);

  const handleActionConfirm = (type: string, payload: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const newOp: Partial<AdminOpResult> = {
        adminOpId: `OP-${type.toUpperCase()}-${Math.random().toString(36).substring(7).toUpperCase()}`,
        actionType: type === 'ack' ? 'Acknowledge Alert' : type === 'freeze' ? 'Freeze Entitlement' : 'Suppress Alert',
        operatorId: 'admin-01',
        subjectType: type === 'ack' ? 'ALERT' : alert.subjectType,
        subjectId: type === 'ack' ? alert.id : alert.subjectId,
        ...payload
      };
      
      tracker.addOperation(newOp);
      setActiveModal(null);

      // Trigger immediate timeline update
      onUpdate({}, {
        status: 'ACTION_START',
        actorType: 'operator',
        actorDetail: 'admin-01',
        timestamp: new Date().toISOString(),
        message: `Triggered: ${newOp.actionType}`,
        adminOpId: newOp.adminOpId
      });
    }, 400);
  };

  const canAction = alert.status !== 'RESOLVED';
  const isReadonly = MOCK_CURRENT_ROLE === 'support_readonly';

  const rbac = {
    ops: { granted: !isReadonly, reason: isReadonly ? "Read-only access" : undefined },
  };

  const isFreezeUsed = useMemo(() => {
    return alert.timeline?.some(ev => ev.status === 'ACTION_RESULT' && ev.message.includes('Freeze') && ev.opStatus === 'SUCCESS');
  }, [alert.timeline]);

  return (
    <div className="flex flex-col gap-6 h-full overflow-hidden">
      <VFCard title={t('admin.alerts.detail.recommendedActions')} className="shadow-none border-border shrink-0">
        <div className="flex flex-col gap-5">
           <div className="flex flex-col gap-3">
             <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest px-1">{t('admin.alerts.detail.containment')}</VFText>
             <ActionButton 
               label={t('admin.alerts.modals.freeze.title')} icon={Lock} action="freeze" danger 
               permission={rbac.ops} stateValid={canAction && !isFreezeUsed} dependency={{available: true}} onClick={() => setActiveModal('freeze')}
             />
             <ActionButton 
               label={t('admin.alerts.table.ackAction')} icon={UserCheck} action="ack" 
               permission={rbac.ops} stateValid={alert.status === 'OPEN'} dependency={{available: true}} onClick={() => setActiveModal('ack')}
             />
           </div>

           <Divider className="my-2 opacity-40" />

           <div className="flex flex-col gap-3">
             <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest px-1">{t('admin.alerts.detail.noiseReduction')}</VFText>
             <ActionButton 
               label={t('admin.alerts.modals.suppress.title')} icon={ShieldOff} action="suppress" 
               permission={rbac.ops} stateValid={canAction && alert.status !== 'SUPPRESSED'} dependency={{available: true}} onClick={() => setActiveModal('suppress')}
             />
           </div>
        </div>
      </VFCard>

      <VFOperationStatusCard 
        inProgress={tracker.inProgressOps}
        recent={tracker.recentOps}
        onViewDetails={setSelectedOp}
        onViewAudit={(id) => window.location.hash = `/admin-audit?adminOpId=${id}`}
        onRetry={tracker.retryOperation}
      />

      <FreezeEntitlementModal 
        open={activeModal === 'freeze'} alert={alert} onCancel={() => setActiveModal(null)} 
        onSuccess={(res) => handleActionConfirm('freeze', res)} 
      />
      <SuppressAlertModal 
        open={activeModal === 'suppress'} onCancel={() => setActiveModal(null)} 
        onSuccess={(res) => handleActionConfirm('suppress', res)} 
      />
      <VFAckAlertModal 
        open={activeModal === 'ack'} alertId={alert.id} onCancel={() => setActiveModal(null)} 
        onConfirm={(c) => handleActionConfirm('ack', { before: { status: alert.status }, after: { status: 'ACKNOWLEDGED', comment: c } })}
        loading={loading}
      />

      <VFOperationDetailDrawer 
        open={!!selectedOp} result={selectedOp} onClose={() => setSelectedOp(null)} 
        onNavigateToAudit={(id) => window.location.hash = `/admin-audit?adminOpId=${id}`}
      />
    </div>
  );
};
