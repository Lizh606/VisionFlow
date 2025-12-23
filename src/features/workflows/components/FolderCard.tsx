
import React from 'react';
import { Button, Dropdown } from 'antd';
import { Folder as FolderIcon, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Folder } from '../model/types';
import { VFText } from '../../../ui/VFText';

interface Props {
  folder: Folder;
  onClick: (id: string) => void;
}

export const FolderCard: React.FC<Props> = ({ folder, onClick }) => {
  const { t } = useTranslation();

  return (
    <div 
      onClick={() => onClick(folder.id)}
      className="
        group flex items-center justify-between h-[64px] md:h-[68px] px-4 
        bg-bg-card border border-border rounded-card 
        hover:border-brand/40 hover:bg-action-hover 
        transition-all duration-200 cursor-pointer select-none
      "
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="flex items-center justify-center w-9 h-9 rounded-control bg-bg-page border border-border text-text-tertiary group-hover:text-brand transition-colors shrink-0">
          <FolderIcon size={18} strokeWidth={2} />
        </div>
        
        <div className="flex flex-col min-w-0">
          {/* V1.4: Card Title = T4 */}
          <VFText variant="t4" color="primary" truncate className="group-hover:text-brand transition-colors">
            {folder.name}
          </VFText>
          {/* V1.4: Meta = T6 */}
          <VFText variant="t6" color="secondary" className="opacity-70">
            {t('workflows.folders.count', { count: folder.workflowCount })}
          </VFText>
        </div>
      </div>

      <Dropdown
        trigger={['click']}
        placement="bottomRight"
        menu={{
          items: [
            { key: 'rename', label: t('common.edit'), icon: <Edit2 size={14} /> },
            { key: 'delete', label: t('common.delete'), icon: <Trash2 size={14} />, danger: true },
          ],
          onClick: (e) => e.domEvent.stopPropagation()
        }}
      >
        <Button 
          type="text" 
          size="small" 
          icon={<MoreVertical size={18} />} 
          className="text-text-tertiary opacity-40 group-hover:opacity-100 transition-opacity -mr-1" 
          onClick={(e) => e.stopPropagation()} 
        />
      </Dropdown>
    </div>
  );
};
