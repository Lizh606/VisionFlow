
import React from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Upload, FileText, Smartphone, BookOpen, ChevronRight } from 'lucide-react';
import { VFCard } from '../../../../../shared/ui/VFCard';

interface Props {
  onNavigate: (key: string) => void;
}

export const QuickActionsCard: React.FC<Props> = ({ onNavigate }) => {
  const { t } = useTranslation();

  const actions = [
    { 
      key: 'upload-license', 
      label: t('selfhosted.overview.actions.upload'), 
      icon: <Upload size={16} />,
      color: 'text-brand bg-brand/5 border-brand/20' 
    },
    { 
      key: 'sh-devices', 
      label: t('selfhosted.overview.actions.devices'), 
      icon: <Smartphone size={16} />,
      color: 'text-info bg-info/5 border-info/20' 
    },
    { 
      key: 'sh-license', 
      label: t('selfhosted.overview.actions.manage'), 
      icon: <FileText size={16} />,
      color: 'text-success bg-success/5 border-success/20' 
    },
    { 
      key: 'docs', 
      label: t('selfhosted.overview.actions.guide'), 
      icon: <BookOpen size={16} />,
      color: 'text-warning bg-warning/5 border-warning/20' 
    },
  ];

  return (
    <VFCard title={t('selfhosted.overview.quickActions.title')} className="h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => (
          <div 
            key={action.key}
            onClick={() => onNavigate(action.key)}
            className="
              group flex items-center justify-between p-4 rounded-card border border-border 
              hover:border-brand hover:shadow-sm cursor-pointer transition-all bg-bg-card
            "
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${action.color}`}>
                {action.icon}
              </div>
              <span className="font-medium text-text-primary group-hover:text-brand transition-colors">
                {action.label}
              </span>
            </div>
            <ChevronRight size={16} className="text-text-tertiary group-hover:translate-x-1 transition-transform" />
          </div>
        ))}
      </div>
    </VFCard>
  );
};
