import React, { useState, useMemo } from 'react';
import { Form, Input, Alert, Checkbox, Button, App } from 'antd';
import { AlertTriangle, Copy, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFModal } from '../../../../ui/VFModal';
import { VFText } from '../../../../ui/VFText';
import { AdminAlert, AdminOpResult } from '../../types/alerts';

interface Props {
  open: boolean;
  alert: AdminAlert;
  onCancel: () => void;
  onSuccess: (res: Partial<AdminOpResult>) => void;
}

export const FreezeEntitlementModal: React.FC<Props> = ({ open, alert, onCancel, onSuccess }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const reason = Form.useWatch('reason', form);
  const understood = Form.useWatch('understood', form);

  const targetEntitlementId = useMemo(() => {
    return alert.snapshot?.lease?.['EntitlementID'] || `ENT-${alert.subjectId.slice(-6).toUpperCase()}`;
  }, [alert]);

  const isSubmitDisabled = !understood || !reason || reason.trim().length < 10;

  const handleConfirm = async () => {
    try {
      const vals = await form.validateFields();
      setLoading(true);
      
      // 模拟网络请求延迟后，将操作加入队列，由 Tracker 控制状态
      setTimeout(() => {
        setLoading(false);
        onSuccess({
          // 注意：此处不传 status，由 Tracker 默认为 PENDING
          before: { entitlementStatus: 'ACTIVE' },
          after: { 
            entitlementId: targetEntitlementId,
            status: 'FROZEN', 
            reason: vals.reason, 
            ticketId: vals.ticketId 
          },
          keyChanges: [{ field: 'entitlementStatus', before: 'ACTIVE', after: 'FROZEN' }]
        });
        form.resetFields();
      }, 600);
    } catch (e) {}
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(targetEntitlementId);
    message.success(t('common.copy') + ' OK');
  };

  return (
    <VFModal
      title={t('admin.alerts.modals.freeze.title')}
      open={open}
      onCancel={onCancel}
      onConfirm={handleConfirm}
      confirmLoading={loading}
      confirmText={t('admin.alerts.modals.freeze.confirm')}
      type="danger"
      width={520}
    >
      <div className="flex flex-col text-left pt-2 max-h-[70vh] overflow-y-auto custom-scrollbar px-1">
        <Alert 
          type="error"
          showIcon
          icon={<AlertTriangle size={18} className="mt-0.5" />}
          message={<span className="font-bold text-[13px] uppercase tracking-tight">{t('admin.alerts.modals.freeze.warningTitle')}</span>}
          description={<span className="text-xs leading-relaxed">{t('admin.alerts.modals.freeze.warningDesc')}</span>}
          className="rounded-card border-error/20 bg-error/[0.02] py-3 mb-6"
        />

        <div className="flex flex-col gap-2 mb-6 px-1">
          <VFText variant="t5-strong" color="secondary">
            {t('admin.alerts.modals.freeze.targetLabel')}
          </VFText>
          <div className="flex items-center justify-between h-12 px-4 bg-bg-page border border-divider rounded-control group transition-all hover:border-border-strong">
             <div className="flex items-center gap-2.5 min-w-0">
               <Lock size={14} className="text-text-tertiary shrink-0" />
               <VFText variant="t7" color="primary" className="font-bold select-all tabular-nums tracking-tight">
                 {targetEntitlementId}
               </VFText>
             </div>
             <Button 
               type="text" 
               size="small" 
               icon={<Copy size={14} />} 
               onClick={handleCopyId}
               className="text-text-tertiary opacity-40 group-hover:opacity-100 hover:text-brand transition-all"
             />
          </div>
        </div>

        <Form 
          form={form} 
          layout="vertical" 
          requiredMark={false} 
          initialValues={{ understood: false }}
        >
          <Form.Item 
            label={<VFText variant="t5-strong" color="secondary">{t('admin.alerts.modals.freeze.reasonLabel')}</VFText>} 
            name="reason"
            rules={[{ required: true, min: 10, message: t('admin.alerts.modals.freeze.reasonRequired') }]}
            className="mb-6"
          >
            <Input.TextArea 
              rows={3} 
              placeholder={t('admin.alerts.modals.freeze.reasonPlaceholder')} 
              className="rounded-control p-3 leading-relaxed" 
            />
          </Form.Item>

          <Form.Item 
            label={<VFText variant="t5-strong" color="secondary">{t('admin.alerts.modals.freeze.ticketLabel')}</VFText>} 
            name="ticketId"
            className="mb-6"
          >
            <Input placeholder="OPS-XXXXX" className="h-10 rounded-control px-3" />
          </Form.Item>

          <div 
            className={`p-4 rounded-card border flex gap-3 select-none cursor-pointer transition-all mb-2 ${understood ? 'bg-error/[0.02] border-error/20 shadow-sm' : 'bg-bg-page border-divider'}`} 
            onClick={() => form.setFieldValue('understood', !understood)}
          >
            <Form.Item name="understood" valuePropName="checked" className="mb-0">
              <Checkbox className="mt-0.5" onClick={e => e.stopPropagation()} />
            </Form.Item>
            <div className="flex flex-col gap-0.5">
              <VFText variant="t5-strong" color={understood ? 'primary' : 'secondary'} className="transition-colors">
                {t('admin.alerts.modals.freeze.understandLabel')}
              </VFText>
              <VFText variant="t6" color="tertiary" className="leading-relaxed font-medium">
                {t('admin.alerts.modals.freeze.understandDesc')}
              </VFText>
            </div>
          </div>
        </Form>
      </div>

      <style>{`
        .vf-modal-standard .ant-btn-primary {
          opacity: ${isSubmitDisabled ? 0.4 : 1};
          pointer-events: ${isSubmitDisabled ? 'none' : 'auto'};
        }
      `}</style>
    </VFModal>
  );
};