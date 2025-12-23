
import React from 'react';
import { Drawer, Button, Space } from 'antd';
import { X } from 'lucide-react';
import { useResponsive } from '../shared/hooks/useResponsive';
import { VFText } from './VFText';

export type VFDrawerSize = 'S' | 'M' | 'L';

interface VFDrawerProps {
  title: string;
  subtitle?: string;
  open: boolean;
  onClose: () => void;
  size?: VFDrawerSize;
  children: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
}

const sizeMap: Record<VFDrawerSize, number> = {
  'S': 480,
  'M': 640,
  'L': 840,
};

/**
 * VFDrawer - 严格遵守 V1.4 第 7 节规范
 * 1. 结构固化：Header(T2) + Body(Scroll) + Footer(Sticky)
 * 2. 响应式：Mobile 强制 100vw
 */
export const VFDrawer: React.FC<VFDrawerProps> = ({
  title,
  subtitle,
  open,
  onClose,
  size = 'M',
  children,
  footer,
  loading = false,
  maskClosable = true,
  destroyOnClose = true,
}) => {
  const { isMobile } = useResponsive();

  return (
    <Drawer
      title={
        <div className="flex flex-col gap-0.5">
          <VFText variant="t2" color="primary">{title}</VFText>
          {subtitle && <VFText variant="t6" color="tertiary" className="font-medium uppercase tracking-wider">{subtitle}</VFText>}
        </div>
      }
      open={open}
      onClose={onClose}
      width={isMobile ? '100%' : sizeMap[size]}
      closable={false}
      extra={
        <Button 
          type="text" 
          icon={<X size={20} className="text-text-tertiary" />} 
          onClick={onClose} 
          className="w-10 h-10 flex items-center justify-center rounded-control hover:bg-action-hover transition-all"
        />
      }
      maskClosable={maskClosable}
      destroyOnClose={destroyOnClose}
      className="vf-drawer-standard"
      styles={{
        header: { 
          padding: '20px 24px', 
          borderBottom: '1px solid rgba(var(--vf-divider), var(--vf-divider-alpha))' 
        },
        body: { 
          padding: isMobile ? '20px' : '24px 32px',
          backgroundColor: 'rgba(var(--vf-bg-page), 0.3)' 
        },
        footer: { 
          padding: '16px 24px', 
          borderTop: '1px solid rgba(var(--vf-divider), var(--vf-divider-alpha))',
          backgroundColor: '#FFFFFF'
        }
      }}
      footer={footer && (
        <div className="flex items-center justify-end w-full">
          {footer}
        </div>
      )}
    >
      <div className="flex flex-col h-full overflow-x-hidden">
        {children}
      </div>
    </Drawer>
  );
};
