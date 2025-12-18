
import React from 'react';
import { Drawer, Form, Input, Select, InputNumber, Switch, Button, Space, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { VFTag } from '../../../../../shared/ui/VFTag';

interface Props {
  open: boolean;
  onClose: () => void;
  initialValues?: any;
}

export const StreamDrawer: React.FC<Props> = ({ open, onClose, initialValues }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Drawer
      title={initialValues ? t('selfhosted.deviceDetail.workflow.drawer.titleEdit') : t('selfhosted.deviceDetail.workflow.drawer.titleAdd')}
      width={480}
      onClose={onClose}
      open={open}
      extra={
        <Space>
          <Button onClick={onClose}>{t('common.cancel')}</Button>
          <Button type="primary" onClick={() => form.submit()}>{t('common.save')}</Button>
        </Space>
      }
    >
      <Form 
        form={form} 
        layout="vertical" 
        initialValues={initialValues || { concurrency: 1, apply_immediately: true, telemetry: 'METRICS' }}
      >
        <Form.Item label={t('selfhosted.deviceDetail.workflow.drawer.name')} name="name" rules={[{ required: true }]}>
          <Input placeholder="e.g. Warehouse North Entrance" />
        </Form.Item>
        
        <Form.Item label={t('selfhosted.deviceDetail.workflow.drawer.streamId')} name="stream_id">
          <Input disabled placeholder="Auto-generated if empty" />
        </Form.Item>

        <Divider orientation="left" className="!m-0 !mb-4">
           <span className="text-xs uppercase font-bold text-text-tertiary">{t('selfhosted.deviceDetail.workflow.drawer.source')}</span>
        </Divider>

        <Form.Item label="Type" name="type" rules={[{ required: true }]}>
          <Select options={[{ value: 'RTSP', label: 'RTSP' }, { value: 'HTTP', label: 'HTTP PUSH' }]} />
        </Form.Item>
        
        <Form.Item label="Endpoint URL" name="url" rules={[{ required: true }]}>
          <Input.Password placeholder="rtsp://admin:****@192.168.1.10:554/ch1" />
        </Form.Item>

        <Divider orientation="left" className="!m-0 !mb-4">
           <span className="text-xs uppercase font-bold text-text-tertiary">{t('selfhosted.deviceDetail.workflow.drawer.workflowBind')}</span>
        </Divider>

        <Form.Item label="Select Workflow" name="workflow_id" rules={[{ required: true }]}>
          <Select options={[{ value: 'w1', label: 'Crowd Analysis v2' }, { value: 'w2', label: 'PPE Check v1.5' }]} />
        </Form.Item>

        <Form.Item label="Target Version / Tag" name="version">
           <Select defaultValue="LATEST" options={[{ value: 'LATEST', label: 'Stable (LATEST)' }, { value: 'v2.0', label: 'v2.0.1' }]} />
        </Form.Item>

        <Divider orientation="left" className="!m-0 !mb-4">
           <span className="text-xs uppercase font-bold text-text-tertiary">{t('selfhosted.deviceDetail.workflow.drawer.strategy')}</span>
        </Divider>

        <Form.Item label={t('selfhosted.deviceDetail.workflow.drawer.concurrency')} name="concurrency">
          <InputNumber min={1} max={10} className="w-full" />
        </Form.Item>

        <Form.Item label={t('selfhosted.deviceDetail.workflow.drawer.telemetryLevel')} name="telemetry">
          <Select options={[
            { value: 'HEARTBEAT', label: t('selfhosted.deviceDetail.workflow.drawer.levels.heartbeat') },
            { value: 'METRICS', label: t('selfhosted.deviceDetail.workflow.drawer.levels.metrics') },
            { value: 'DIAGNOSTIC', label: t('selfhosted.deviceDetail.workflow.drawer.levels.diagnostic') },
          ]} />
        </Form.Item>

        <Form.Item name="apply_immediately" valuePropName="checked">
          <div className="flex items-center justify-between bg-bg-page p-3 rounded-control border border-border">
            <span className="text-sm font-medium">{t('selfhosted.deviceDetail.workflow.drawer.immediate')}</span>
            <Switch />
          </div>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
