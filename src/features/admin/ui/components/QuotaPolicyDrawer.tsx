
import React, { useState, useEffect } from 'react';
import { Tabs, Button, App } from 'antd';
import { Layout, BarChart3, FileCode, History, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFDrawer } from '../../../../ui/VFDrawer';
import { PolicyOverviewTab } from './PolicyOverviewTab';
import { ImpactPreviewTab } from './ImpactPreviewTab';
import { PolicyJsonTab } from './PolicyJsonTab';
import { PolicyHistoryTab } from './PolicyHistoryTab';
import { QuotaPolicy } from '../../types/quota';

interface Props {
  open: boolean;
  mode: 'view' | 'edit';
  policy: QuotaPolicy | null;
  onClose: () => void;
  onModeChange: (mode: 'view' | 'edit') => void;
  onPublish: (values: any) => void;
  isAdmin?: boolean;
}

export const QuotaPolicyDrawer: React.FC<Props> = ({ 
  open, mode, policy, onClose, onModeChange, onPublish, isAdmin = true
}) => {
  const { t } = useTranslation();
  const { modal } = App.useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [isDirty, setIsDirty] = useState(false);
  const [formValues, setFormValues] = useState<any>(null);

  const isEdit = mode === 'edit';

  useEffect(() => {
    if (open) {
      setIsDirty(false);
      setFormValues(null);
      setActiveTab('overview');
    }
  }, [open]);

  const handleClose = () => {
    if (isDirty && isEdit) {
      modal.confirm({
        title: t('common.unsavedTitle'),
        content: t('common.unsavedDesc'),
        okText: t('common.discard'),
        cancelText: t('common.keepEditing'),
        okType: 'danger',
        onOk: onClose
      });
    } else {
      onClose();
    }
  };

  if (!policy) return null;

  return (
    <VFDrawer
      title={isEdit ? t('admin.quota.drawer.editTitle') : t('admin.quota.drawer.viewTitle')}
      subtitle={`Workspace: ${policy.workspaceName}`}
      open={open}
      onClose={handleClose}
      size="M"
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <Button onClick={handleClose} className="px-6 h-10 font-medium">
            {t('common.cancel')}
          </Button>
          {isEdit ? (
            <Button 
              type="primary" 
              icon={<Send size={16} />}
              onClick={() => onPublish(formValues || policy)}
              className="px-10 h-10 font-bold shadow-md bg-brand border-brand"
            >
              {t('admin.quota.modals.publish.title')}
            </Button>
          ) : (
            isAdmin && (
              <Button 
                type="primary" 
                onClick={() => onModeChange('edit')}
                className="px-10 h-10 font-bold shadow-md"
              >
                {t('common.edit')}
              </Button>
            )
          )}
        </div>
      }
    >
      <Tabs 
        activeKey={activeTab}
        onChange={setActiveTab}
        className="vf-detail-tabs"
        items={[
          {
            key: 'overview',
            label: <span className="flex items-center gap-2"><Layout size={14}/>{t('admin.quota.drawer.tabs.overview')}</span>,
            children: (
              <PolicyOverviewTab 
                policy={policy} 
                isEdit={isEdit} 
                onChange={(vals) => { 
                  setFormValues(vals); 
                  setIsDirty(true); 
                }} 
              />
            )
          },
          {
            key: 'preview',
            label: <span className="flex items-center gap-2"><BarChart3 size={14}/>{t('admin.quota.drawer.tabs.preview')}</span>,
            children: <ImpactPreviewTab policy={policy} currentDraft={formValues} />
          },
          {
            key: 'json',
            label: <span className="flex items-center gap-2"><FileCode size={14}/>{t('admin.quota.drawer.tabs.json')}</span>,
            children: <PolicyJsonTab activePolicy={policy} draftPolicy={formValues} isEdit={isEdit} />
          },
          {
            key: 'history',
            label: <span className="flex items-center gap-2"><History size={14}/>{t('admin.quota.drawer.tabs.history')}</span>,
            children: <PolicyHistoryTab workspaceId={policy.workspaceId} onRestore={(p) => { setFormValues(p); onModeChange('edit'); }} />
          }
        ]}
      />
    </VFDrawer>
  );
};
