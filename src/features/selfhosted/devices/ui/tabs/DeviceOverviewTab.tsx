
import React from 'react';
import { Alert, Button } from 'antd';
import { ShieldAlert, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Device } from '../../../common/types';
import { UsageSummaryPanel } from '../components/UsageSummaryPanel';
import { ConfigSummaryPanel } from '../components/ConfigSummaryPanel';
import { ActiveAlertsPanel } from '../components/ActiveAlertsPanel';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';

interface Props {
  device: Device;
}

export const DeviceOverviewTab: React.FC<Props> = ({ device }) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  
  const isUnbound = device.status === 'PENDING_LICENSE';

  return (
    <div className={`flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500 ${isMobile ? 'p-4' : 'p-6'}`}>
      {/* 1. 强力警告横幅：仅在待绑定状态下显示 */}
      {isUnbound && (
        <Alert
          type="warning"
          showIcon
          icon={<ShieldAlert size={18} className="text-warning" />}
          message={
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="font-bold text-text-primary text-sm">
                  {t('selfhosted.devices.unbound')}
                </span>
                <span className="text-xs text-text-secondary">
                  当前设备未关联有效的许可证书，遥测监控与任务部署功能暂不可用。
                </span>
              </div>
              <Button 
                type="primary" 
                size="small" 
                className="h-8 px-4 font-bold bg-warning border-warning hover:bg-warning/80 flex items-center gap-1.5 shrink-0"
                onClick={() => console.log('Open license modal')}
              >
                立即绑定授权 <ArrowRight size={14} />
              </Button>
            </div>
          }
          className="rounded-card border-warning/20 bg-warning/5"
        />
      )}

      {/* 2. 用量摘要：传递 device 对象以处理内部空状态 */}
      <section className="w-full">
        <UsageSummaryPanel deviceId={device.id} />
      </section>

      {/* 3. 配置与告警双栏：同步适配待绑定状态 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <section className="h-full">
          <ConfigSummaryPanel device={device} />
        </section>
        <section className="h-full">
          <ActiveAlertsPanel deviceId={device.id} />
        </section>
      </div>
    </div>
  );
};
