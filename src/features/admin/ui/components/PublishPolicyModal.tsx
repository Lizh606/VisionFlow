
import React from 'react';
import { Form, Input, Alert } from 'antd';
import { Info, Send, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFModal } from '../../../../ui/VFModal';
import { VFText } from '../../../../ui/VFText';

interface Props {
  open: boolean;
  onCancel: () => void;
  onConfirm: (payload: any) => void;
  loading?: boolean;
}

export const PublishPolicyModal: React.FC<Props> = ({ open, onCancel, onConfirm, loading = false }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const vals = await form.validateFields();
      onConfirm(vals);
      form.resetFields();
    } catch (e) {}
  };

  return (
    <VFModal
      title="Publish Quota Changes"
      open={open}
      onCancel={onCancel}
      onConfirm={handleOk}
      confirmLoading={loading}
      confirmText="Publish to Fleet"
      width={520}
    >
      <div className="flex flex-col text-left gap-6 pt-2">
        <div className="p-4 bg-brand/5 border border-brand/10 rounded-card flex gap-4">
           <Info size={20} className="text-brand shrink-0 mt-0.5" />
           <VFText variant="t6" color="secondary" className="leading-relaxed font-medium">
             You are about to publish new resource limits. These changes will be enforced globally and recorded in the immutable audit trail.
           </VFText>
        </div>

        <Form form={form} layout="vertical" requiredMark={false} className="px-1">
          <Form.Item 
            label={<VFText variant="t5-strong" color="secondary">Justification / Reason</VFText>} 
            name="comment"
            rules={[
              { required: true, message: "A reason is required for audit logs" },
              { min: 10, message: "Please provide a more detailed reason (min 10 chars)" }
            ]}
          >
            <Input.TextArea 
              rows={4} 
              placeholder="e.g., Increased limits for Q1 marketing campaign traffic..."
              showCount 
              maxLength={500}
              className="rounded-control p-3 leading-relaxed" 
            />
          </Form.Item>
          
          <Form.Item label={<VFText variant="t5-strong" color="secondary">Jira / Ticket ID (Optional)</VFText>} name="ticketId">
             <Input placeholder="OPS-12345" className="h-10 rounded-control px-3 font-mono" />
          </Form.Item>
        </Form>
        
        <Alert 
          type="warning" 
          showIcon
          icon={<AlertTriangle size={16} />}
          message={<VFText variant="t6" color="inherit" className="font-bold">Immediate Enforcement</VFText>}
          description="Workspace agents will sync the new policy within 60 seconds."
          className="rounded-card border-warning/20 bg-warning/[0.02]"
        />
      </div>
    </VFModal>
  );
};
