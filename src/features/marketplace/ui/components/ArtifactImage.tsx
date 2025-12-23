
import React, { useState, useEffect } from 'react';
import { Button, Skeleton } from 'antd';
import { Image as ImageIcon, RefreshCw, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFText } from '../../../../ui/VFText';

interface Props {
  alt: string;
  className?: string;
  forceFail?: boolean; // 用于演示失败态
}

export const ArtifactImage: React.FC<Props> = ({ alt, className = "", forceFail = false }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');

  const simulateLoad = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus(forceFail ? 'error' : 'success');
    }, 800);
  };

  useEffect(() => {
    simulateLoad();
  }, [forceFail]);

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    simulateLoad();
  };

  return (
    <div className={`relative w-full h-full bg-bg-page flex items-center justify-center overflow-hidden ${className}`}>
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-page z-10">
          <Skeleton.Button active className="!w-full !h-full" />
        </div>
      )}
      
      {status === 'error' && (
        <div className="flex flex-col items-center gap-2 px-4 text-center animate-in fade-in duration-300">
          <AlertCircle size={24} className="text-error opacity-60" />
          <VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-tight block">
            {t('common.retry', { defaultValue: 'Load Failed' })}
          </VFText>
          <Button 
            size="small" 
            icon={<RefreshCw size={12} />} 
            className="h-7 rounded-control"
            onClick={handleRetry}
          >
            <VFText variant="t6" color="inherit" className="font-bold">{t('common.retry')}</VFText>
          </Button>
        </div>
      )}

      {status === 'success' && (
        <div className="flex flex-col items-center opacity-30 group-hover:scale-110 group-hover:opacity-50 transition-all duration-500">
          <ImageIcon size={48} strokeWidth={1} className="text-text-tertiary" />
          <VFText variant="t6" color="tertiary" className="font-bold mt-2 uppercase tracking-widest block">{alt}</VFText>
        </div>
      )}

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};