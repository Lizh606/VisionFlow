
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

  // Initialize param values
  useEffect(() => {
    if (listing.allowed_params) {
      const defaults: Record<string, any> = {};
      listing.allowed_params.forEach(p => defaults[p.id] = p.default);
      setParamValues(defaults);
      setLastRunParams(null);
    }
  }, [listing, open]);

  // Dirty check: has user changed params since last successful run?
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

  const handleReset = () => {
    setState('IDLE');
    setResult(null);
    setLastRunParams(null);
  };

  const examples = [
    'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1545143333-6382f1d5b93d?auto=format&fit=crop&w=400&q=80'
  ];

  const renderParamField = (p: ParamSchema) => {
    const val = paramValues[p.id] ?? p.default;

    return (
      <div key={p.id} className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <label className="text-[13px] font-bold text-text-primary flex items-center gap-2">
            {p.label}
            {p.help && (
              <Tooltip title={p.help}>
                <Info size={14} className="text-text-tertiary cursor-help" />
              </Tooltip>
            )}
          </label>
          <span className="text-[13px] font-bold text-brand tabular-nums">
            {typeof val === 'number' && val < 1 ? `${Math.round(val * 100)}%` : val}
          </span>
        </div>

        {p.type === 'SLIDER' && (
          <Slider 
            min={p.min} 
            max={p.max} 
            step={p.step} 
            value={val} 
            onChange={(v) => setParamValues(prev => ({ ...prev, [p.id]: v }))}
            disabled={state === 'RUNNING' || state === 'QUEUED'}
            className="vf-cloud-slider !m-0"
          />
        )}

        {p.type === 'SEGMENTED' && (
          <Segmented
            block
            options={p.options || []}
            value={val}
            onChange={(v) => setParamValues(prev => ({ ...prev, [p.id]: v }))}
            disabled={state === 'RUNNING' || state === 'QUEUED'}
            className="rounded-control p-1"
          />
        )}

        {p.type === 'INPUT_NUMBER' && (
          <InputNumber
            className="w-full h-10"
            min={p.min}
            max={p.max}
            value={val}
            onChange={(v) => setParamValues(prev => ({ ...prev, [p.id]: v }))}
            disabled={state === 'RUNNING' || state === 'QUEUED'}
          />
        )}
      </div>
    );
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={1000}
      centered
      closable={false}
      destroyOnClose
      className="vf-modal-cloud-test"
      styles={{ 
        body: { padding: 0, height: '700px', overflow: 'hidden' },
        mask: { backdropFilter: 'blur(4px)', backgroundColor: 'rgba(var(--vf-mask), 0.4)' }
      }}
    >
      <div className="flex flex-col h-full bg-bg-card">
        {/* Modal Header */}
        <header className="h-[64px] px-6 border-b border-divider flex items-center justify-between shrink-0 bg-bg-card z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-control bg-brand/5 border border-brand/10 flex items-center justify-center text-brand">
              <Activity size={22} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <h2 className="m-0 text-[16px] font-bold text-text-primary tracking-tight leading-none mb-1">
                Cloud Test Sandbox
              </h2>
              <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider opacity-60">
                Inference: {listing.name}
              </span>
            </div>
          </div>
          <Button 
            type="text" 
            icon={<X size={20} className="text-text-tertiary" />} 
            onClick={onCancel}
            className="hover:bg-action-hover rounded-full h-10 w-10 flex items-center justify-center transition-colors"
          />
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Column: Input Source (65%) */}
          <div className="flex-[1.8] border-r border-divider bg-bg-page/5 flex flex-col overflow-hidden relative">
             <div className="px-8 py-4 border-b border-divider bg-bg-card flex items-center justify-between shrink-0">
                <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-[0.15em] flex items-center gap-2">
                  <ImageIcon size={14} /> Test Input
                </span>
                {selectedImage && ['IDLE', 'SUCCESS', 'FAILED'].includes(state) && (
                  <Button 
                    type="link" 
                    size="small" 
                    className="text-xs p-0 font-bold h-auto flex items-center gap-1.5" 
                    onClick={() => { setSelectedImage(null); handleReset(); }}
                  >
                    <RefreshCw size={12} /> 更换输入
                  </Button>
                )}
             </div>

             <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                {!selectedImage ? (
                  <div className="flex flex-col gap-10 animate-in fade-in duration-500">
                    <section>
                       <h4 className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider mb-4 opacity-50">
                         Select an Example
                       </h4>
                       <div className="grid grid-cols-3 gap-4">
                          {examples.map((img, idx) => (
                            <div 
                              key={idx}
                              onClick={() => setSelectedImage(img)}
                              className="aspect-square rounded-card border border-divider hover:border-brand bg-bg-card transition-all cursor-pointer overflow-hidden p-1 shadow-sm group"
                            >
                              <div className="w-full h-full rounded-[8px] overflow-hidden relative">
                                <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="example" />
                                <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </div>
                          ))}
                       </div>
                    </section>

                    <Divider className="m-0 opacity-40">
                      <span className="text-[10px] font-bold text-text-tertiary px-3">OR UPLOAD</span>
                    </Divider>

                    <div className="w-full">
                      <Upload.Dragger 
                        showUploadList={false} 
                        className="vf-test-dragger !bg-bg-card/40 hover:!border-brand transition-all !rounded-card !border-divider"
                        action={(file) => {
                          setSelectedImage(URL.createObjectURL(file as any));
                          return Promise.resolve();
                        }}
                      >
                        <div className="h-[280px] flex flex-col items-center justify-center py-6 px-4">
                           <div className="w-12 h-12 rounded-full bg-bg-page border border-border flex items-center justify-center text-text-tertiary mb-4">
                             <CloudUpload size={24} strokeWidth={1.5} />
                           </div>
                           <h3 className="text-sm font-bold text-text-primary mb-1">Drag and drop or click to upload</h3>
                           <p className="text-xs text-text-tertiary m-0 font-medium">PNG, JPG or WEBP up to 10MB</p>
                        </div>
                      </Upload.Dragger>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6 h-full relative">
                    {/* Results Display Area */}
                    <div className="flex-1 bg-black/90 rounded-card border border-border overflow-hidden relative shadow-lg group min-h-0">
                       {viewMode === 'overlay' ? (
                          <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
                             <img src={selectedImage} className={`w-full h-full object-contain ${['RUNNING', 'QUEUED'].includes(state) ? 'opacity-40 grayscale blur-md' : ''} transition-all duration-700`} alt="test-preview" />
                             
                             {state === 'QUEUED' && (
                               <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 animate-in fade-in duration-300">
                                  <Clock size={48} className="text-white animate-pulse" />
                                  <span className="text-sm font-bold text-white uppercase tracking-[0.2em]">In Queue...</span>
                               </div>
                             )}

                             {state === 'RUNNING' && (
                               <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                  <Loader2 size={48} className="text-brand animate-spin" />
                                  <span className="text-sm font-bold text-white uppercase tracking-[0.2em]">Inferencing...</span>
                               </div>
                             )}

                             {state === 'SUCCESS' && result?.detections.map((d, i) => (
                               <div 
                                 key={i}
                                 className="absolute border-2 border-brand bg-brand/10"
                                 style={{ left: `${d.bbox[0]}%`, top: `${d.bbox[1]}%`, width: `${d.bbox[2]}%`, height: `${d.bbox[3]}%` }}
                               >
                                 <span className="absolute -top-6 left-[-2px] bg-brand text-white text-[10px] font-bold px-1.5 py-0.5 whitespace-nowrap uppercase leading-none">
                                   {d.label} {Math.round(d.confidence * 100)}%
                                 </span>
                               </div>
                             ))}
                          </div>
                       ) : (
                          <div className="w-full h-full bg-[#0D1117] p-6 overflow-y-auto custom-scrollbar font-mono text-[13px] leading-relaxed">
                             <div className="text-[#8B949E] mb-2">// Raw Inference Meta Response</div>
                             <pre className="text-[#E6EDF3] whitespace-pre-wrap">
                                {JSON.stringify(result, null, 2)}
                             </pre>
                          </div>
                       )}
                    </div>

                    {/* Stats Toolbar */}
                    {state === 'SUCCESS' && (
                       <div className="flex items-center justify-between p-4 bg-bg-card rounded-card border border-border animate-in slide-in-from-bottom-4 duration-500 shadow-sm">
                          <div className="flex items-center gap-8">
                             <div className="flex flex-col gap-0.5">
                                <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest leading-none mb-1">Inference Latency</span>
                                <span className="text-sm font-bold text-success tabular-nums">{result?.latency}ms</span>
                             </div>
                             <div className="flex flex-col gap-0.5">
                                <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest leading-none mb-1">Detections</span>
                                <span className="text-sm font-bold text-text-primary tabular-nums">{result?.detections.length} Objects</span>
                             </div>
                          </div>
                          <div className="flex bg-bg-page p-1 rounded-control border border-divider">
                             <Button 
                               size="small" 
                               className={`font-bold h-7 px-3 border-none shadow-none text-[11px] transition-all flex items-center gap-1.5 ${viewMode === 'overlay' ? 'bg-bg-card text-brand' : 'text-text-tertiary'}`}
                               onClick={() => setViewMode('overlay')}
                             >
                                <Layers size={12} /> Visual
                             </Button>
                             <Button 
                               size="small" 
                               className={`font-bold h-7 px-3 border-none shadow-none text-[11px] transition-all flex items-center gap-1.5 ${viewMode === 'json' ? 'bg-bg-card text-brand' : 'text-text-tertiary'}`}
                               onClick={() => setViewMode('json')}
                             >
                                <Terminal size={12} /> JSON
                             </Button>
                          </div>
                       </div>
                    )}
                  </div>
                )}
             </div>
          </div>

          {/* Right Column: Run Configuration (35%) */}
          <div className="flex-1 bg-bg-card flex flex-col overflow-hidden">
             <div className="px-6 py-4 border-b border-divider flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-[0.15em] flex items-center gap-2">
                  <Settings2 size={14} /> Run Configuration
                </span>
             </div>

             <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="flex flex-col gap-10">
                   {/* Dynamic Parameters */}
                   {listing.allowed_params && listing.allowed_params.length > 0 ? (
                     <div className="flex flex-col gap-10">
                       {listing.allowed_params.map(p => renderParamField(p))}
                     </div>
                   ) : (
                     <div className="py-12 flex flex-col items-center justify-center text-center opacity-30">
                        <FileJson size={32} strokeWidth={1} className="mb-3" />
                        <span className="text-xs font-bold uppercase tracking-widest">Standard Configuration</span>
                        <p className="text-[11px] font-medium mt-2 max-w-[140px]">This resource uses fixed inference logic.</p>
                     </div>
                   )}

                   <div className="mt-10 pt-10 border-t border-divider/40">
                      <div className="flex items-start gap-3">
                         <Info size={14} className="text-text-tertiary shrink-0 mt-0.5" />
                         <p className="text-[11px] text-text-tertiary font-medium leading-relaxed italic m-0">
                           Cloud test provides a preview of real-time logic. Advanced training and pipeline fine-tuning are available after resource activation.
                         </p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Footer CTA closure */}
             <div className="p-6 border-t border-divider bg-bg-page/10 flex flex-col gap-4">
                {/* Parameter Dirty State Hint */}
                {isDirty && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-warning/10 border border-warning/20 rounded-control animate-in fade-in slide-in-from-bottom-2">
                    <AlertCircle size={14} className="text-warning" />
                    <span className="text-[11px] font-bold text-warning uppercase">参数已更改，点击再次运行应用</span>
                  </div>
                )}

                <div className="w-full">
                  {state === 'FAILED' ? (
                    <Button 
                      danger
                      block 
                      size="large" 
                      icon={<RotateCcw size={18} />}
                      className="h-12 font-bold rounded-control"
                      onClick={handleRun}
                    >
                      Retry Inference
                    </Button>
                  ) : (
                    <Tooltip 
                      title={!selectedImage ? "Choose input source to start" : ""}
                      placement="top"
                    >
                      <div className="w-full">
                        <Button 
                          type="primary" 
                          block 
                          size="large" 
                          icon={['QUEUED', 'RUNNING'].includes(state) ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
                          className={`h-12 font-bold rounded-control shadow-md transition-all ${isDirty ? 'ring-4 ring-brand/15' : ''}`}
                          disabled={!selectedImage || ['QUEUED', 'RUNNING'].includes(state)}
                          onClick={handleRun}
                        >
                          {state === 'QUEUED' ? "In Queue..." : 
                           state === 'RUNNING' ? "Running..." : 
                           state === 'SUCCESS' ? "Run Again" : "Run Inference"}
                        </Button>
                      </div>
                    </Tooltip>
                  )}
                </div>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        .vf-modal-cloud-test .ant-modal-content { border-radius: 16px !important; box-shadow: var(--vf-shadow-overlay) !important; }
        .vf-test-dragger.ant-upload-wrapper .ant-upload-drag { border: 2px dashed rgba(var(--vf-divider), 0.8) !important; }
        .vf-test-dragger.ant-upload-wrapper .ant-upload-drag:hover { border-color: rgba(var(--vf-brand), 1) !important; }
        .vf-cloud-slider .ant-slider-track { background-color: rgba(var(--vf-brand), 1) !important; }
        .vf-cloud-slider .ant-slider-handle::after { box-shadow: 0 0 0 2px rgba(var(--vf-brand), 1) !important; }
        .ant-segmented-item-selected { background-color: #fff !important; color: rgba(var(--vf-brand), 1) !important; font-weight: 700 !important; }
      `}</style>
    </Modal>
  );
};
