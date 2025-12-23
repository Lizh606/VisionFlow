
import React from 'react';
import { Modal, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { VFText } from '../../../ui/VFText';

interface Props {
  open: boolean;
  onCancel: () => void;
  onCreate: (name: string) => void;
}

export const CreateFolderModal: React.FC<Props> = ({ open, onCancel, onCreate }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(values => {
      onCreate(values.name.trim());
      form.resetFields();
    });
  };

  return (
    <Modal
      title={<VFText variant="t2" color="primary">{t('workflows.folders.create')}</VFText>}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText={t('common.confirm')}
      cancelText={t('common.cancel')}
      destroyOnClose
      className="vf-modal-custom"
      okButtonProps={{ className: 'h-10 px-6 font-bold' }}
      cancelButtonProps={{ className: 'h-10 px-6' }}
    >
      <Form form={form} layout="vertical" className="pt-4">
        <Form.Item
          name="name"
          label={
            /* V1.4: Form Label = T5 Body Strong */
            <VFText variant="t5-strong" color="secondary" className="uppercase tracking-wider">
              {t('workflows.folders.nameLabel')}
            </VFText>
          }
          rules={[
            { required: true, message: t('workflows.folders.nameRequired') },
            { max: 40, message: 'Max 40 characters' },
            { whitespace: true, message: 'Cannot be empty' }
          ]}
        >
          <Input 
            placeholder={t('workflows.folders.namePlaceholder')} 
            className="h-11 rounded-control" 
            autoFocus
            onPressEnter={handleOk}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
