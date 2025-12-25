
import React from 'react';
import { Button, App } from 'antd';
import { CheckCircle2, Copy, ExternalLink, ArrowRight } from 'lucide-react';
import { VFModal } from '../../../../ui/VFModal';
import { VFText } from '../../../../ui/VFText';

interface Props {
  open: boolean;
  opId: string;
  onClose: () => void;
  onNavigateToAudit: (id: string) => void;
}

export const OpResultModal: React.FC<Props> = ({ open, opId, onClose, onNavigateToAudit }) => {
  const { message } = App.useApp();

  const copyId = () => {
    navigator.clipboard.writeText(opId);
    message.success('Operation ID copied');
  };

  return (
    <VFModal
      title="Operation Successful"
      open={open}
      onCancel={onClose}
      onConfirm={onClose}
      width={440}
    >
      <div className="flex flex-col items-center py-2">
        <CheckCircle2 size={48} className="text-success mb-4" strokeWidth={2.5} />
        
        <VFText variant="t5" color="secondary" className="mb-6">
          The alert state has been updated successfully.
        </VFText>

        <div className="w-full bg-bg-page p-4 rounded-card border border-divider mb-6 flex flex-col gap-2 text-left">
           <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest">Admin Operation ID</VFText>
           <div className="flex items-center justify-between gap-3">
              <VFText variant="t7" color="primary" className="font-bold truncate">{opId}</VFText>
              <Button type="text" size="small" icon={<Copy size={14} />} onClick={copyId} />
           </div>
        </div>

        <Button 
          block 
          icon={<ExternalLink size={16} />}
          className="h-11 rounded-control border-brand text-brand font-bold flex items-center justify-center gap-2"
          onClick={() => onNavigateToAudit(opId)}
        >
          View in Audit Logs <ArrowRight size={16} />
        </Button>
      </div>
    </VFModal>
  );
};
