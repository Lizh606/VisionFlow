
import React from 'react';
import { Form, Input, App, Divider } from 'antd';
import { ShieldCheck, AlertCircle, BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFModal } from '../../../../ui/VFModal';
import { VFText } from '../../../../ui/VFText';

interface Props {
  open: boolean;
  onCancel: () => void;
  onConfirm: (vals: { reason: string; ticketId?: string }) => void;
  workspaceInfo?: {
    id: string;
    name: string;
    workflowsCount: number;
    usage24h: string;
  };
}

/**
 * PublishConfirmModal - UC-AC-001 Step 9 implementation
 * Displays mandatory impact assessment data before high-risk publish.
 */
export const PublishConfirmModal: React.FC<Props> = ({ open, onCancel, onConfirm, workspaceInfo }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const vals = await form.validateFields();
      onConfirm(vals);
      form.resetFields();
    } catch (e) {}
  };

  const renderError = (key: string) => (
    <span className="flex items-center gap-1.5 text-error mt-1">
      <AlertCircle size={12} />
      <VFText variant="t6" color="inherit" className="font-bold">
        {t(key)}
      </VFText>
    </span>
  );

  return (
    <VFModal
      title={t('admin.quota.modals.publish.title')}
      open={open}
      onCancel={onCancel}
      onConfirm={handleOk}
      confirmText={t('admin.quota.modals.publish.confirm')}
      width={560}
    >
      <div className="flex flex-col text-left gap-6 pt-2">
        <div className="p-4 bg-brand/5 border border-brand/10 rounded-card flex gap-4">
           <ShieldCheck size={20} className="text-brand shrink-0 mt-0.5" />
           <div className="flex flex-col gap-1">
              <VFText variant="t5-strong" color="primary">
                {t('admin.quota.modals.publish.trackingTitle')}
              </VFText>
              <VFText variant="t6" color="secondary" className="leading-relaxed font-medium">
                {t('admin.quota.modals.publish.trackingDesc')}
              </VFText>
           </div>
        </div>

        {/* Impact Assessment Section - Requirement from UC-AC-001 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-1">
            <BarChart3 size={14} className="text-text-tertiary" />
            <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest">
              {t('admin.quota.modals.publish.impactTitle')}
            </VFText>
          </div>
          <div className="grid grid-cols-1 gap-1.5 p-4 bg-bg-page/50 border border-divider rounded-card">
            <div className="flex justify-between items-center">
              <VFText variant="t6" color="secondary">{t('admin.quota.modals.publish.affectedWorkspace')}</VFText>
              <VFText variant="t6" color="primary" className="font-bold tabular-nums">{workspaceInfo?.id || 'ws-001'}</VFText>
            </div>
            <div className="flex justify-between items-center">
              <VFText variant="t6" color="secondary">{t('admin.quota.modals.publish.affectedWorkflow')}</VFText>
              <VFText variant="t6" color="primary" className="font-bold">{workspaceInfo?.workflowsCount || 5} active flows</VFText>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-divider/40">
              <VFText variant="t6" color="secondary">{t('admin.quota.modals.publish.recentUsage')}</VFText>
              <VFText variant="t5-strong" color="brand" tabularNums>{workspaceInfo?.usage24h || '1.2M inferences'}</VFText>
            </div>
          </div>
        </div>

        <Form form={form} layout="vertical" requiredMark={true} className="px-1">
          <Form.Item 
            label={<VFText variant="t5-strong" color="secondary">{t('admin.quota.modals.publish.reasonLabel')}</VFText>} 
            name="reason"
            rules={[{ required: true, message: renderError('admin.quota.modals.publish.reasonRequired') }]}
          >
            <Input.TextArea 
              rows={3} 
              placeholder={t('admin.quota.modals.publish.reasonPlaceholder')} 
              className="rounded-control p-3 leading-relaxed" 
              maxLength={400}
              showCount
            />
          </Form.Item>
          
          <Form.Item 
            label={<VFText variant="t5-strong" color="secondary">{t('admin.quota.modals.publish.ticketLabel')}</VFText>} 
            name="ticketId"
            className="mb-2"
          >
             <Input placeholder={t('admin.quota.modals.publish.ticketPlaceholder')} className="h-10 rounded-control px-3 font-mono" />
          </Form.Item>
        </Form>

        <div className="px-1 opacity-70">
          <VFText variant="t6" color="tertiary" className="leading-relaxed font-medium">
            {t('admin.quota.modals.publish.propagationHint')}
          </VFText>
        </div>
      </div>
    </VFModal>
  );
};
