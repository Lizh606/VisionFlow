
import React, { useState, useMemo, useEffect } from 'react';
import { Modal, Button, Slider, Divider, App, Upload, Tooltip, Segmented, InputNumber } from 'antd';
import { 
  X, Play, RotateCcw, ImageIcon, 
  Settings2, Activity, Info, AlertCircle, 
  FileJson, CheckCircle2,
  CloudUpload, Loader2, Clock, RefreshCw,
  Terminal, Layers
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Listing, InferenceResult, ParamSchema } from '../../types';
import { marketplaceService } from '../../../../services/marketplaceService';

interface Props {
  open: boolean;
  onCancel: () => void;
  listing: Listing;
}

type TestState = 'IDLE' | 'QUEUED' | 'RUNNING' | 'SUCCESS' | 'FAILED';

export const CloudTestModal: React.FC<Props> = ({ open, onCancel, listing }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const [state, setState] = useState<TestState>('IDLE');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [paramValues, setParamValues] = useState<Record<string, any>>({});
  const [lastRunParams, setLastRunParams] = useState<Record<string, any> | null>(null);
  const [result, setResult] = useState<InferenceResult | null>(null);
  const [viewMode, setViewMode] = useState<'overlay' | 'json'>('overlay');

  useEffect(() => {
    if (listing.allowed_params) {
      const defaults: Record<string, any> = {};
      listing.allowed_params.forEach(p => defaults[p.id] = p.default);
      setParamValues(defaults);
      setLastRunParams(null);
    }
  }, [listing, open]);

  const isDirty = useMemo(() => {
    if (state !== 'SUCCESS' || !lastRunParams) return false;
    return JSON.stringify(paramValues) !== JSON.stringify(lastRunParams);
  }, [paramValues, lastRunParams, state]);

  const handleRun = async () => {
    if (!selectedImage) return;
    setState('QUEUED');
    await new Promise(r => setTimeout(r, 1200));
    setState('RUNNING');
    try {
      const data = await marketplaceService.cloudTest(listing.id, selectedImage, paramValues);
      setResult(data);
      setLastRunParams({ ...paramValues });
      setState('SUCCESS');
      setViewMode('overlay');
    } catch (e) {
      setState('FAILED');
      message.error("Inference Engine Unavailable");
    }
  };

  const renderParamField = (p: ParamSchema) => {
    const val = paramValues[p.id] ?? p.default;

    return (
      <div key={p.id} className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <label className="text-[13px] font-bold text-text-primary flex items-center gap-2">
            {p.label}
            {p.help && <Tooltip title={p.help}><Info size={14} className="text-text-tertiary" /></Tooltip>}
          </label>
          <span className="text-[13px] font-bold text-brand tabular-nums">
            {typeof val === 'number' && val < 1 ? `${Math.round(val * 100)}%` : val}
          </span>
        </div>

        {p.type === 'SLIDER' && (
          <Slider min={p.min} max={p.max} step={p.step} value={Number(val)} onChange={(v) => setParamValues(prev => ({ ...prev, [p.id]: v }))} disabled={state === 'RUNNING' || state === 'QUEUED'} />
        )}

        {p.type === 'SEGMENTED' && (
          <Segmented block options={p.options || []} value={val} onChange={(v) => setParamValues(prev => ({ ...prev, [p.id]: v }))} disabled={state === 'RUNNING' || state === 'QUEUED'} />
        )}

        {p.type === 'INPUT_NUMBER' && (
          <InputNumber className="w-full h-10" min={p.min} max={p.max} value={Number(val)} onChange={(v) => setParamValues(prev => ({ ...prev, [p.id]: v }))} disabled={state === 'RUNNING' || state === 'QUEUED'} />
        )}
      </div>
    );
  };

  return (
    <Modal open={open} onCancel={onCancel} footer={null} width={1000} centered closable={false} destroyOnClose className="vf-modal-cloud-test" styles={{ body: { padding: 0, height: '700px', overflow: 'hidden' } }}>
      <div className="flex flex-col h-full bg-bg-card">
        <header className="h-[64px] px-6 border-b border-divider flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
             <Activity size={22} className="text-brand" />
             <h2 className="m-0 text-[16px] font-bold">Cloud Test Sandbox</h2>
          </div>
          <Button type="text" icon={<X size={20} />} onClick={onCancel} />
        </header>
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-[1.8] border-r border-divider bg-bg-page/5 p-8 overflow-y-auto">
             {!selectedImage ? (
               <Upload.Dragger showUploadList={false} action={(file) => { setSelectedImage(URL.createObjectURL(file as any)); return Promise.resolve(); }}>
                 <div className="py-20 flex flex-col items-center">
                    <CloudUpload size={48} className="text-text-tertiary mb-4" />
                    <p className="font-bold">Click or drag image to test</p>
                 </div>
               </Upload.Dragger>
             ) : (
               <div className="h-full bg-black/90 rounded-card overflow-hidden flex items-center justify-center">
                  <img src={selectedImage} className="max-h-full object-contain" alt="test" />
               </div>
             )}
          </div>
          <div className="flex-1 p-8 flex flex-col gap-8">
             <div className="flex-1 overflow-y-auto">
                {listing.allowed_params?.map(p => renderParamField(p))}
             </div>
             <Button type="primary" block size="large" icon={<Play size={18} />} className="h-12 font-bold" disabled={!selectedImage || state === 'RUNNING'} onClick={handleRun}>
               {state === 'RUNNING' ? 'Running...' : 'Run Inference'}
             </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
