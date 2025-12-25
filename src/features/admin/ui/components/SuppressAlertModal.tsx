import React, { useState, useMemo, forwardRef } from 'react';
import { Form, Input, Segmented, DatePicker, Button, Tooltip } from 'antd';
import { Calendar, Info, HelpCircle as HelpIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFModal } from '../../../../ui/VFModal';
import { VFText } from '../../../../ui/VFText';
import { AdminOpResult } from '../../types/alerts';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const HelpCircle = forwardRef<HTMLSpanElement, { size?: number; className?: string }>((props, ref) => (
  <span ref={ref} className={props.className} style={{ display: 'inline-flex' }}>
    <HelpIcon size={props.size || 14} />
  </span>
));

interface Props {
  open: boolean;
  onCancel: () => void;
  onSuccess: (res: Partial<AdminOpResult>) => void;
}

export const SuppressAlertModal: React.FC<Props> = ({ open, onCancel, onSuccess }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  const windowType = Form.useWatch('windowType', form);
  const customRange = Form.useWatch('customRange', form);

  const isSubmitDisabled = useMemo(() => {
    if (windowType === 'custom') {
      return !customRange || !customRange[0] || !customRange[1];
    }
    return false;
  }, [windowType, customRange]);

  const handleConfirm = async () => {
    try {
      const vals = await form.validateFields();
      setLoading(true);
      
      let durationLabel = vals.windowType;
      if (vals.windowType === 'custom' && vals.customRange) {
        durationLabel = `${vals.customRange[0].format('MM-DD HH:mm')} to ${vals.customRange[1].format('MM-DD HH:mm')}`;
      }

      setTimeout(() => {
        setLoading(false);
        onSuccess({
          // 此处不传 status，进入 Tracker 模拟阶段
          after: { 
            status: 'SUPPRESSED', 
            duration: durationLabel,
            comment: vals.comment,
            ticketId: vals.ticketId
          },
          keyChanges: [{ field: 'status', before: 'OPEN', after: 'SUPPRESSED' }]
        });
        form.resetFields();
      }, 600);
    } catch (e) {}
  };

  const setPreset7Days = () => {
    form.setFieldsValue({
      customRange: [dayjs(), dayjs().add(7, 'day')]
    });
  };

  return (
    <VFModal
      title={t('admin.alerts.modals.suppress.title')}
      open={open}
      onCancel={onCancel}
      onConfirm={handleConfirm}
      confirmLoading={loading}
      confirmText={t('admin.alerts.modals.suppress.confirm')}
      width={480}
    >
      <div className="flex flex-col text-left max-h-[60vh] overflow-y-auto custom-scrollbar px-1">
        <div className="flex items-center gap-2 mb-6 p-3 bg-bg-page/50 rounded-control border border-divider/40">
          <Info size={14} className="text-brand shrink-0" />
          <VFText variant="t6" color="secondary" className="flex-1 font-medium">
            {t('admin.alerts.modals.suppress.statusUpdate')}
          </VFText>
          <Tooltip title={t('admin.alerts.modals.suppress.guidance')}>
            <HelpCircle size={14} className="text-text-tertiary cursor-help opacity-60 hover:opacity-100" />
          </Tooltip>
        </div>

        <Form 
          form={form} 
          layout="vertical" 
          requiredMark={false} 
          initialValues={{ windowType: '2h' }}
        >
          <Form.Item 
            label={<VFText variant="t5-strong" color="secondary">{t('admin.alerts.modals.suppress.windowLabel')}</VFText>} 
            name="windowType"
            className="mb-4"
          >
            <Segmented
              block
              options={[
                { label: t('admin.alerts.modals.suppress.windows.2h'), value: '2h' },
                { label: t('admin.alerts.modals.suppress.windows.24h'), value: '24h' },
                { label: <div className="flex items-center justify-center gap-1.5"><Calendar size={13}/><span>{t('admin.alerts.modals.suppress.custom')}</span></div>, value: 'custom' },
              ]}
              className="vf-segmented-compact"
            />
          </Form.Item>
          
          {windowType === 'custom' && (
            <div className="flex flex-col gap-3 mb-6 p-4 bg-bg-page/30 border border-divider/40 rounded-card animate-in slide-in-from-top-2 duration-200">
              <Form.Item name="customRange" rules={[{ required: true, message: 'Required' }]} className="mb-0">
                <RangePicker 
                  showTime 
                  className="w-full h-10 rounded-control border-divider" 
                  placeholder={[t('common.start'), t('common.end')]} 
                  disabledDate={(current) => current && current < dayjs().startOf('day')}
                />
              </Form.Item>
              <div className="flex justify-end">
                <Button 
                  type="text" 
                  size="small" 
                  onClick={setPreset7Days}
                  className="text-[11px] font-bold text-brand hover:bg-brand/5 h-6 px-2 rounded-tag"
                >
                  + Quick Preset: 7 Days
                </Button>
              </div>
            </div>
          )}

          <Form.Item 
            label={<VFText variant="t5-strong" color="secondary">{t('admin.alerts.modals.suppress.reasonLabel')}</VFText>} 
            name="comment"
            rules={[{ required: true, message: t('admin.alerts.modals.suppress.reasonRequired') }]}
            className="mb-6"
          >
            <Input.TextArea 
              rows={3} 
              placeholder={t('admin.alerts.modals.suppress.reasonPlaceholder')} 
              className="rounded-control p-3 leading-relaxed" 
            />
          </Form.Item>

          <Form.Item 
            label={<VFText variant="t5-strong" color="secondary">{t('admin.alerts.modals.freeze.ticketLabel')}</VFText>} 
            name="ticketId"
            className="mb-2"
          >
            <Input placeholder="OPS-XXXXX" className="h-10 rounded-control px-3" />
          </Form.Item>
        </Form>
      </div>

      <style>{`
        .vf-modal-standard .ant-btn-primary {
          opacity: ${isSubmitDisabled ? 0.4 : 1};
          pointer-events: ${isSubmitDisabled ? 'none' : 'auto'};
        }
        .vf-segmented-compact {
          background-color: var(--vf-bg-page) !important;
          border: 1px solid rgba(var(--vf-divider), 0.8) !important;
          padding: 3px !important;
          border-radius: var(--vf-radius-control) !important;
          height: 40px !important;
          display: flex !important;
          align-items: center !important;
        }
        .vf-segmented-compact .ant-segmented-item {
          border-radius: calc(var(--vf-radius-control) - 2px) !important;
          transition: all 0.2s ease !important;
          flex: 1 !important;
          height: 32px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .vf-segmented-compact .ant-segmented-item-label {
          font-size: 14px !important;
          font-weight: 400 !important;
          color: var(--vf-text-secondary) !important;
          padding: 0 8px !important;
          line-height: 32px !important;
        }
        .vf-segmented-compact .ant-segmented-item-selected {
          background-color: var(--vf-bg-card) !important;
          box-shadow: 0 1px 2px rgba(0,0,0,0.06) !important;
          border: 1px solid rgba(var(--vf-divider), 1) !important;
        }
        .vf-segmented-compact .ant-segmented-item-selected .ant-segmented-item-label {
          font-weight: 500 !important;
          color: var(--vf-brand) !important;
        }
      `}</style>
    </VFModal>
  );
};