import React from 'react';
// Added Space to imports to fix "Cannot find name 'Space'"
import { List, Button, Tooltip, Space } from 'antd';
import { RotateCcw, Eye, User, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFText } from '../../../../ui/VFText';
import { VFTag } from '../../../../shared/ui/VFTag';
import { mockQuotaHistory } from '../../model/mockQuota';
import dayjs from 'dayjs';

interface Props {
  workspaceId: string;
  onRestore: (payload: any) => void;
}

export const PolicyHistoryTab: React.FC<Props> = ({ workspaceId, onRestore }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 py-2 animate-in fade-in duration-500">
      <List
        dataSource={mockQuotaHistory}
        renderItem={(item) => (
          <div className="p-5 bg-bg-card border border-divider rounded-card hover:border-brand/40 transition-all group mb-4 relative overflow-hidden">
             <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <VFText variant="t7" color="primary" className="font-bold bg-bg-page px-2 py-0.5 rounded border border-divider tabular-nums">
                    {item.version}
                  </VFText>
                  <VFTag variant="neutral" className="h-5 text-[9px] font-bold opacity-60">AUDITED</VFTag>
                </div>
                <VFText variant="t7" color="disabled" tabularNums>{dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm')}</VFText>
             </div>

             <VFText variant="t5" color="secondary" className="leading-relaxed block mb-5 italic border-l-2 border-divider pl-3">
               "{item.reason}"
             </VFText>

             <div className="flex items-center justify-between pt-4 border-t border-divider/40">
                <div className="flex items-center gap-2">
                   <User size={12} className="text-text-tertiary opacity-50" />
                   <VFText variant="t6" color="tertiary" className="font-medium">{item.updatedBy}</VFText>
                </div>
                {/* Space component now available via import */}
                <Space size={8}>
                  <Button type="text" size="small" icon={<Eye size={14}/>} className="text-xs font-bold text-text-tertiary">View JSON</Button>
                  <Button 
                    type="link" 
                    size="small" 
                    icon={<RotateCcw size={14}/>} 
                    className="text-xs font-bold"
                    onClick={() => onRestore(item.payload)}
                  >
                    Copy as draft
                  </Button>
                </Space>
             </div>
          </div>
        )}
      />
    </div>
  );
};