
import React from 'react';
import { Form, Input, Select, Switch } from 'antd';
import { VFSection } from '../../../../ui/VFSection';
import { VFText } from '../../../../ui/VFText';
import { QuotaPolicy } from '../../types/quota';

interface Props {
  policy: QuotaPolicy;
  isEdit: boolean;
  onChange: (values: any) => void;
}

export const PolicyOverviewTab: React.FC<Props> = ({ policy, isEdit, onChange }) => {
  const [form] = Form.useForm();
  
  const handleValuesChange = (_: any, allValues: any) => {
    onChange(allValues);
  };

  const renderInfoRow = (label: string, value: string) => (
    <div className="flex items-center justify-between py-3 border-b border-divider/40 last:border-none">
      <VFText variant="t6" color="secondary" className="font-medium">{label}</VFText>
      <VFText variant="t5-strong" color="primary" tabularNums>{value}</VFText>
    </div>
  );

  const filterNonDigits = (e: any) => {
    const val = e.target.value;
    return val.replace(/[^0-9]/g, '');
  };

  return (
    <div className="flex flex-col gap-8 py-2 animate-in fade-in duration-300">
      <Form 
        form={form} 
        layout="vertical" 
        initialValues={policy} 
        onValuesChange={handleValuesChange}
        requiredMark={false}
      >
        <VFSection title="Resource Configuration" level={4} description="Adjust operational limits based on workspace resource schema.">
          <div className={`grid grid-cols-2 gap-6 p-6 rounded-card border shadow-sm ${isEdit ? 'bg-bg-card border-divider' : 'bg-bg-page/40 border-divider'}`}>
            <Form.Item 
              label={<VFText variant="t5-strong" color="secondary">{policy.metadata.quotaLabel}</VFText>} 
              name="freeQuota"
              rules={[{ required: true, message: 'Required' }]}
              getValueFromEvent={filterNonDigits}
            >
              <Input 
                disabled={!isEdit}
                className="h-11 font-mono font-bold" 
                suffix={<span className="text-[10px] font-bold text-text-tertiary uppercase">{policy.metadata.quotaUnit}</span>}
              />
            </Form.Item>
            
            <Form.Item 
              label={<VFText variant="t5-strong" color="secondary">{policy.metadata.rateLimitLabel}</VFText>} 
              name="rateLimit"
              rules={[{ required: true, message: 'Required' }]}
              getValueFromEvent={filterNonDigits}
            >
              <Input 
                disabled={!isEdit}
                className="h-11 font-mono font-bold" 
                suffix={<span className="text-[10px] font-bold text-text-tertiary uppercase">{policy.metadata.rateLimitUnit}</span>}
              />
            </Form.Item>
          </div>
        </VFSection>

        <VFSection title="Governance" level={4}>
          <div className="flex flex-col gap-4">
            <Form.Item label={<VFText variant="t5-strong" color="secondary">Enforcement Scope</VFText>} name="scope">
              <Select disabled={!isEdit} className="h-11" options={[{label: 'GLOBAL', value: 'GLOBAL'}, {label: 'REGIONAL', value: 'REGIONAL'}]} />
            </Form.Item>

            {policy.metadata.supportsEnforcementToggle && (
              <div className="p-4 bg-bg-page/50 rounded-card border border-divider flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <VFText variant="t5-strong" color="primary">Policy Enforcement</VFText>
                  <VFText variant="t6" color="tertiary" className="opacity-80">Actively block requests exceeding the limits.</VFText>
                </div>
                <Form.Item 
                  name="status" 
                  valuePropName="checked" 
                  getValueProps={(v) => ({ checked: v === 'ACTIVE' })} 
                  getValueFromEvent={(c) => c ? 'ACTIVE' : 'DISABLED'} 
                  className="mb-0"
                >
                  <Switch disabled={!isEdit} />
                </Form.Item>
              </div>
            )}
          </div>
        </VFSection>

        {!isEdit && (
          <VFSection title="System Audit" level={4}>
            <div className="bg-bg-card rounded-card border border-divider p-6 flex flex-col shadow-sm">
              {renderInfoRow("Policy Version", policy.version)}
              {renderInfoRow("Last Synchronized", policy.updatedAt)}
              {renderInfoRow("Governance Operator", policy.updatedBy)}
              {renderInfoRow("Target Workspace ID", policy.workspaceId)}
            </div>
          </VFSection>
        )}
      </Form>
    </div>
  );
};
