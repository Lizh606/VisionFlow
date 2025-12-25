import React, { useState } from 'react';
import { Form, Input, Button, App } from 'antd';
import { Copy, ShieldCheck, AlertCircle } from 'lucide-react';
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

/**
 * AlertAckModal - Standard Admin Action Modal
 */
export const AlertAckModal: React.FC<Props> = ({ open, alertId, onCancel, onConfirm, loading }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { message: antdMessage, modal } = App.useApp();
  
  const [isDirty, setIsDirty] = useState(false);

  const handleConfirm = () => {
    form.validateFields().then((values) => {
      onConfirm(values.comment);
      setIsDirty(false);
    }).catch(() => {
      // Validation failed
    });
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(alertId);
    antdMessage.success(t('common.copy') + ' OK');
  };

  const handleCancel = () => {
    if (isDirty) {
      modal.confirm({
        title: t('common.unsavedTitle'),
        content: t('common.unsavedDesc'),
        okText: t('common.discard'),
        cancelText: t('common.keepEditing'),
        okType: 'danger',
        onOk: () => {
          form.resetFields();
          setIsDirty(false);
          onCancel();
        },
      });
    } else {
      onCancel();
    }
  };

  // V1.4: Refactored message to a constant to avoid deep nesting in rules attribute
  const errorHint = (
    <span className="flex items-center gap-1.5 text-error mt-1">
      <AlertCircle size={12} />
      <VFText variant="t6" color="inherit" className="font-bold">
        {t('admin.alerts.modals.ack.commentRequired')}
      </VFText>
    </span>
  );

  return (
    <VFModal
      title={t('admin.alerts.ack.title')}
      open={open}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      confirmLoading={loading}
      confirmText={t('admin.alerts.ack.confirm')}
      width={480}
    >
      <div className="flex flex-col gap-6 text-left pb-4"> {/* Added pb-4 to prevent sticking to footer */}
        <div className="flex items-start gap-3 p-3 bg-brand/5 border border-brand/10 rounded-control">
          <ShieldCheck size={18} className="text-brand shrink-0 mt-0.5" />
          <VFText variant="t6" color="secondary" className="leading-relaxed">
            {t('admin.alerts.ack.desc')}
          </VFText>
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
        
        <Form 
          form={form} 
          layout="vertical" 
          requiredMark={false} 
          className="px-1"
          onValuesChange={() => setIsDirty(true)}
        >
          <Form.Item
            name="comment"
            label={<VFText variant="t5-strong" color="secondary">{t('admin.alerts.ack.comment')}</VFText>}
            rules={[{ required: true, message: errorHint }]}
            className="mb-0"
          >
            <Input.TextArea 
              rows={4} 
              placeholder={t('admin.alerts.ack.comment.placeholder')} 
              className="rounded-control p-3 leading-relaxed"
              maxLength={500}
              showCount
            />
          </Form.Item>
        </Form>
      </div>
    </VFModal>
  );
};