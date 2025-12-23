
import React from 'react';
import { Modal, Button } from 'antd';
import { LogIn, UserPlus, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  open: boolean;
  onCancel: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onCancel }) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={400}
      className="vf-modal-refined"
    >
      <div className="py-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-brand/5 border border-brand/10 flex items-center justify-center text-brand mb-6">
          <ShieldCheck size={32} />
        </div>
        
        <h3 className="text-xl font-bold text-text-primary mb-2">Sign in Required</h3>
        <p className="text-sm text-text-secondary mb-8 max-w-[280px]">
          Please log in to your account to save resources to your library and favorites.
        </p>

        <div className="flex flex-col gap-3 w-full px-4">
          <Button 
            type="primary" 
            block 
            icon={<LogIn size={18} />}
            className="h-11 font-bold rounded-control"
          >
            Log In
          </Button>
          <Button 
            block 
            icon={<UserPlus size={18} />}
            className="h-11 font-bold rounded-control"
          >
            Create Free Account
          </Button>
        </div>
        
        <Button 
          type="link" 
          onClick={onCancel}
          className="mt-4 text-text-tertiary hover:text-text-primary text-xs"
        >
          Maybe Later
        </Button>
      </div>
    </Modal>
  );
};
