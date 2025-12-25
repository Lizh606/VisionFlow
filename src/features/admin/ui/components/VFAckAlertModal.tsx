import React from 'react';
import { Form, Input, Button, App } from 'antd';
import { Info, UserCheck, Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFModal } from '../../../../ui/VFModal';
import { VFText } from '../../../../ui/VFText';

interface Props {
  open: boolean;
  alertId: string;
  onCancel: () => void;
  onConfirm: (comment: string) => void;
  loading: boolean;
}

export const VFAckAlertModal: React.FC<Props> = ({ open, alertId, onCancel, onConfirm, loading }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const vals = await form.validateFields();
      onConfirm(vals.comment);
      form.resetFields();
    } catch (e) {}
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(alertId);
    message.success(t('common.copy') + ' OK');
  };

  return (
    <VFModal
      title={t('admin.alerts.ack.title')}
      open={open}
      onCancel={onCancel}
      onConfirm={handleOk}
      confirmLoading={loading}
      confirmText={t('admin.alerts.ack.confirm')}
      width={480}
    >
      <div className="flex flex-col text-left gap-6 pt-2">
        <div className="p-4 bg-brand/5 border border-brand/10 rounded-card flex gap-4">
           <UserCheck size={20} className="text-brand shrink-0 mt-0.5" />
           <div className="flex flex-col gap-1">
              <VFText variant="t5-strong" color="primary">Acknowledge Receipt</VFText>
              <VFText variant="t6" color="secondary" className="leading-relaxed font-medium">
                {t('admin.alerts.ack.desc')}
              </VFText>
           </div>
        </div>

        <div className="flex flex-col gap-1.5 px-1">
          <VFText variant="t5-strong" color="secondary">
            {t('admin.alerts.ack.alertId')}
          </VFText>
          <div className="flex items-center justify-between h-10 px-3 bg-bg-page border border-divider rounded-control group transition-all hover:border-border-strong">
             <VFText variant="t7" color="primary" className="font-bold select-all tabular-nums">
               {alertId}
             </VFText>
             <Button 
               type="text" 
               size="small" 
               icon={<Copy size={14} />} 
               onClick={handleCopyId}
               className="text-text-tertiary opacity-40 group-hover:opacity-100 hover:text-brand transition-all flex items-center justify-center p-0 w-6 h-6"
             />
          </div>
        </div>

        <Form form={form} layout="vertical" requiredMark={false} className="px-1">
          <Form.Item 
            label={<VFText variant="t5-strong" color="secondary">{t('admin.alerts.ack.comment')}</VFText>} 
            name="comment"
            rules={[{ required: true, message: t('admin.alerts.modals.ack.commentRequired') }]}
          >
            <Input.TextArea 
              rows={4} 
              placeholder={t('admin.alerts.ack.comment.placeholder')}
              showCount 
              maxLength={500}
              className="rounded-control p-3" 
            />
          </Form.Item>
        </Form>
      </div>
    </VFModal>
  );
};