import React, { useState } from 'react';
import { Form, Input, Alert, App } from 'antd';
import { Info, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFModal } from '../../../../ui/VFModal';
import { VFText } from '../../../../ui/VFText';

interface Props {
  type: string; // 'retry' | 'manual' | 'chargeback'
  open: boolean;
  onCancel: () => void;
  onConfirm: (vals: any) => void;
  confirmLoading?: boolean;
}

/**
 * ConfirmOperationModal (Refactored OrderActionModal)
 * Implementation for UC-AC-001 Step 5B.
 * Strictly follows V1.4: T2 Titles, T5 Labels, T6 Hints, 2+1 Field Logic.
 */
export const OrderActionModal: React.FC<Props> = ({ 
  type, open, onCancel, onConfirm, confirmLoading = false 
}) => {
  const { t } = useTranslation();
  const { modal } = App.useApp();
  const [form] = Form.useForm();
  const [isDirty, setIsDirty] = useState(false);

  // Config mapping for visual and content variations
  const config = {
    retry: {
      title: t('admin.marketplace.orders.actions.modals.retry.title'),
      hint: t('admin.marketplace.orders.actions.modals.retry.hint'),
      confirmText: t('admin.marketplace.orders.actions.modals.retry.confirm'),
      severity: 'info' as const,
      modalType: 'default' as const
    },
    manual: {
      title: t('admin.marketplace.orders.actions.modals.manual.title'),
      hint: t('admin.marketplace.orders.actions.modals.manual.hint'),
      confirmText: t('admin.marketplace.orders.actions.modals.manual.confirm'),
      severity: 'info' as const,
      modalType: 'default' as const
    },
    chargeback: {
      title: t('admin.marketplace.orders.actions.modals.chargeback.title'),
      hint: t('admin.marketplace.orders.actions.modals.chargeback.hint'),
      confirmText: t('admin.marketplace.orders.actions.modals.chargeback.confirm'),
      severity: 'warning' as const,
      modalType: 'danger' as const
    }
  }[type] || {
    title: 'Operation',
    hint: 'This action will be audited.',
    confirmText: 'Confirm',
    severity: 'info' as const,
    modalType: 'default' as const
  };

  const handleConfirm = async () => {
    try {
      const vals = await form.validateFields();
      onConfirm({
        ...vals,
        actionType: type.toUpperCase(),
        timestamp: new Date().toISOString()
      });
      setIsDirty(false);
      form.resetFields();
    } catch (e) {
      // Validation errors handled by form
    }
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

  return (
    <VFModal
      title={config.title}
      open={open}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      confirmLoading={confirmLoading}
      confirmText={config.confirmText}
      type={config.modalType}
      width={480}
    >
      <div className="flex flex-col text-left gap-6 pt-1">
        {/* 1. Standard Top Hint Callout */}
        <Alert 
          showIcon
          icon={config.severity === 'warning' ? <AlertTriangle size={16} /> : <Info size={16} />}
          type={config.severity}
          message={
            <VFText variant="t6" color="inherit" className="font-bold">
              {config.hint}
            </VFText>
          }
          className="rounded-card border-none"
        />

        {/* 2. Standardized 2+1 Field Form */}
        <Form 
          form={form} 
          layout="vertical" 
          requiredMark={true} 
          className="px-1"
          onValuesChange={() => setIsDirty(true)}
        >
          {/* Reason - Required */}
          <Form.Item 
            label={<VFText variant="t5-strong" color="secondary">{t('admin.marketplace.orders.actions.modals.fields.reason')}</VFText>} 
            name="reason"
            rules={[{ required: true, message: t('admin.marketplace.orders.actions.modals.fields.reasonRequired') }]}
            className="mb-4"
          >
            <Input.TextArea 
              rows={3} 
              autoSize={{ minRows: 3, maxRows: 5 }}
              placeholder={t('admin.marketplace.orders.actions.modals.fields.reasonPlaceholder')} 
              className="rounded-control p-3 leading-relaxed" 
            />
          </Form.Item>
          
          {/* Comment / Remark - Required */}
          <Form.Item 
            label={<VFText variant="t5-strong" color="secondary">{t('admin.marketplace.orders.actions.modals.fields.comment')}</VFText>} 
            name="comment"
            rules={[{ required: true, message: t('admin.marketplace.orders.actions.modals.fields.commentRequired') }]}
            className="mb-4"
          >
            <Input.TextArea 
              rows={3} 
              autoSize={{ minRows: 3, maxRows: 5 }}
              placeholder={t('admin.marketplace.orders.actions.modals.fields.commentPlaceholder')} 
              className="rounded-control p-3 leading-relaxed" 
            />
          </Form.Item>

          {/* Ticket ID - Optional */}
          <Form.Item 
            label={<VFText variant="t5-strong" color="secondary">{t('admin.marketplace.orders.actions.modals.fields.ticket')}</VFText>} 
            name="ticketId"
            className="mb-0"
          >
             <Input 
              placeholder={t('admin.marketplace.orders.actions.modals.fields.ticketPlaceholder')} 
              className="h-10 rounded-control px-3 font-mono" 
             />
          </Form.Item>
        </Form>
        
        {/* 3. Bottom Audit Note */}
        <div className="flex items-center gap-2 px-1 opacity-60">
           <ShieldCheck size={14} className="text-text-tertiary" />
           <VFText variant="t6" color="tertiary" className="font-medium">
             Changes will be broadcasted to Billing domain immediately.
           </VFText>
        </div>
      </div>
    </VFModal>
  );
};