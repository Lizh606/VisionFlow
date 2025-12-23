
import React from 'react';
import { Modal, Button, Space } from 'antd';
import { AlertCircle, X } from 'lucide-react';
import { VFText } from './VFText';

interface VFModalProps {
  title: string;
  open: boolean;
  onCancel: () => void;
  onConfirm?: () => void;
  confirmLoading?: boolean;
  children: React.ReactNode;
  type?: 'default' | 'danger';
  width?: number;
}

export const VFModal: React.FC<VFModalProps> = ({
  title,
  open,
  onCancel,
  onConfirm,
  confirmLoading = false,
  children,
  type = 'default',
  width = 440
}) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      centered
      width={width}
      closable={false}
      footer={
        <Space size={12}>
          <Button onClick={onCancel} className="px-6 h-10 font-medium border-none hover:bg-bg-page transition-all">
            Cancel
          </Button>
          <Button 
            type="primary" 
            danger={type === 'danger'} 
            loading={confirmLoading}
            onClick={onConfirm}
            className="px-8 h-10 font-bold shadow-md"
          >
            Confirm
          </Button>
        </Space>
      }
      className="vf-modal-standard"
      styles={{
        header: { marginBottom: 20 },
        body: { padding: '8px 0' }
      }}
    >
      <div className="flex flex-col items-center text-center gap-4">
        {type === 'danger' && (
          <div className="w-12 h-12 rounded-full bg-error/5 flex items-center justify-center text-error mb-2">
            <AlertCircle size={28} />
          </div>
        )}
        <VFText variant="t2" color="primary">{title}</VFText>
        <div className="text-sm text-text-secondary leading-relaxed font-normal">
          {children}
        </div>
      </div>
    </Modal>
  );
};
