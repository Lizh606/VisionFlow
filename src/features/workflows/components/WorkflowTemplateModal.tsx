
import React, { useState, useMemo } from 'react';
import { Modal, Button, Tooltip } from 'antd';
import { X, LayoutGrid, MousePointerClick } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TemplateGallery } from './TemplateGallery';
import { ArchitecturePreview } from './ArchitecturePreview';
import { CustomizePanel } from './CustomizePanel';
import { useResponsive } from '../../../shared/hooks/useResponsive';

export interface Template {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  isNew?: boolean;
  requiresModel?: boolean;
}

const TEMPLATES: Template[] = [
  { id: 'sam-prompts', name: 'SAM3 with Prompts', icon: 'Zap', isNew: true, category: 'Foundation Models', description: 'Segment Anything Model v3 optimized for prompt-based mask generation.', requiresModel: true },
  { id: 'build-my-own', name: 'Build My Own', icon: 'FilePlus', category: 'Foundation Models', description: 'Start from scratch. Manually add and connect your own blocks.', requiresModel: false },
  { id: 'detect-count', name: 'Detect, Count, and Visualize', icon: 'Maximize', category: 'Detection & Tracking', description: 'A complete pipeline for object detection and population statistics.', requiresModel: true },
  { id: 'detect-classify', name: 'Detect and Classify', icon: 'Box', category: 'Detection & Tracking', description: 'Two-stage pipeline: detect and then classify.', requiresModel: true },
  { id: 'small-object', name: 'Small Object Detection (SAHI)', icon: 'ArrowDownWideNarrow', category: 'Detection & Tracking', description: 'Optimized for high-resolution images with tiny objects.', requiresModel: true },
  { id: 'text-recognition', name: 'OCR Text Recognition', icon: 'Type', category: 'Analytics & OCR', description: 'Identify and extract text from images.', requiresModel: true },
  { id: 'barcode-scanner', name: 'Barcode & QR Scanner', icon: 'Box', category: 'Analytics & OCR', description: 'High-speed industrial-grade scanning.', requiresModel: false },
  { id: 'ppe-compliance', name: 'PPE Compliance Check', icon: 'Shield', isNew: true, category: 'Industry Specific', description: 'Ensuring safety protocols on construction sites.', requiresModel: true },
  { id: 'thermal-anomaly', name: 'Thermal Anomaly Sentinel', icon: 'Zap', category: 'Industry Specific', description: 'Detecting heat signatures for early warning.', requiresModel: true },
  { id: 'retail-heatmap', name: 'Retail Traffic Heatmap', icon: 'Users', category: 'Industry Specific', description: 'Analyze customer dwell time and movement patterns.', requiresModel: true },
];

interface Props {
  open: boolean;
  onCancel: () => void;
  onCreate: (templateId: string, config: any) => void;
}

export const WorkflowTemplateModal: React.FC<Props> = ({ open, onCancel, onCreate }) => {
  const { t } = useTranslation();
  const { isMobile, isTablet } = useResponsive();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedTemplate = useMemo(() => 
    TEMPLATES.find(t => t.id === selectedId) || null
  , [selectedId]);

  const handleCancel = () => {
    setSelectedId(null);
    onCancel();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      width={isMobile ? '100%' : 1160}
      centered
      className="vf-responsive-modal"
      styles={{
        mask: { backdropFilter: 'blur(4px)', backgroundColor: 'rgba(var(--vf-mask), var(--vf-mask-alpha))' },
        content: { padding: 0, overflow: 'hidden', borderRadius: isMobile ? 0 : 'var(--vf-radius-card)', backgroundColor: 'rgba(var(--vf-bg-card), 1)' }
      }}
    >
      <div className={`flex flex-col bg-bg-card ${isMobile ? 'h-screen' : 'h-[780px]'}`}>
        {/* Header */}
        <header className="h-[60px] px-4 md:px-6 border-b border-divider flex items-center justify-between shrink-0 bg-bg-card z-10">
          <div className="flex items-center gap-3">
            <LayoutGrid size={18} className="text-text-secondary" strokeWidth={2} />
            <h2 className="m-0 text-[15px] font-bold text-text-primary tracking-tight">
              {t('workflows.templates.modalTitle')}
            </h2>
          </div>
          <Button 
            type="text" 
            size="small"
            icon={<X size={20} className="text-text-tertiary" />} 
            onClick={handleCancel}
            className="hover:bg-action-hover rounded-full h-8 w-8 flex items-center justify-center transition-colors"
          />
        </header>

        <div className={`flex-1 flex overflow-hidden ${isMobile ? 'flex-col' : 'flex-row'}`}>
          {/* Gallery Sidebar */}
          <aside className={`
            border-divider bg-bg-card flex flex-col shrink-0 overflow-hidden
            ${isMobile ? 'h-2/5 border-b' : 'w-[320px] md:w-[380px] border-r'}
          `}>
            <TemplateGallery 
              templates={TEMPLATES}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </aside>

          {/* Content Area */}
          <main className="flex-1 flex flex-col overflow-hidden bg-bg-card relative">
            {selectedTemplate ? (
              <div className="flex flex-col h-full overflow-hidden">
                <div className="px-6 md:px-8 py-5 md:py-7 border-b border-divider shrink-0 bg-bg-card">
                  <h3 className="m-0 text-lg md:text-[22px] font-bold text-text-primary mb-1 tracking-tight leading-none">
                    {selectedTemplate.name}
                  </h3>
                  <p className="m-0 text-[13px] text-text-secondary leading-relaxed max-w-[560px]">
                    {selectedTemplate.description}
                  </p>
                </div>

                <div className={`flex-1 flex overflow-hidden ${isTablet || isMobile ? 'flex-col' : 'flex-row'}`}>
                  <div className={`flex-1 bg-bg-page/5 overflow-y-auto custom-scrollbar p-6 md:p-8 ${!isMobile && 'border-r border-divider'}`}>
                    <ArchitecturePreview template={selectedTemplate} />
                  </div>
                  <div className={`${isTablet || isMobile ? 'h-auto border-t' : 'w-[340px]'} shrink-0 overflow-y-auto custom-scrollbar p-6 md:p-8 bg-bg-card`}>
                    <CustomizePanel template={selectedTemplate} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center bg-bg-page/5 p-8 md:p-12 text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-brand/5 border border-brand/10 flex items-center justify-center text-brand/30 mb-5">
                  <MousePointerClick size={32} strokeWidth={1.5} />
                </div>
                <h4 className="text-[16px] font-bold text-text-primary mb-2">
                  {t('workflows.templates.emptyTitle')}
                </h4>
                <p className="text-[13px] text-text-tertiary max-w-[300px] leading-relaxed">
                  {t('workflows.templates.emptyDesc')}
                </p>
              </div>
            )}

            {/* Sticky Footer */}
            <footer className="h-[72px] md:h-[80px] px-6 md:px-8 border-t border-divider flex items-center justify-end gap-3 shrink-0 bg-bg-card mt-auto">
              <Button 
                onClick={handleCancel}
                className="h-10 md:h-11 px-6 md:px-8 font-semibold border-none text-text-secondary hover:text-text-primary transition-all"
              >
                {t('common.cancel')}
              </Button>
              
              <Tooltip title={!selectedId ? t('workflows.templates.footerHint') : ""}>
                <Button 
                  type="primary"
                  disabled={!selectedId}
                  onClick={() => selectedId && onCreate(selectedId, {})}
                  className="h-10 md:h-11 px-8 md:px-10 font-bold shadow-md rounded-control"
                >
                  {t('workflows.actions.create')}
                </Button>
              </Tooltip>
            </footer>
          </main>
        </div>
      </div>
    </Modal>
  );
};
