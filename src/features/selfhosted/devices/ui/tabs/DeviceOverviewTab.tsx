
import React from 'react';
import { Device } from '../../../common/types';
import { UsageSummaryPanel } from '../components/UsageSummaryPanel';
import { ConfigSummaryPanel } from '../components/ConfigSummaryPanel';
import { ActiveAlertsPanel } from '../components/ActiveAlertsPanel';

interface Props {
  device: Device;
}

export const DeviceOverviewTab: React.FC<Props> = ({ device }) => {
  return (
    <div className="p-6 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Panel 1: Usage Summary - Full Width with Large Chart */}
      <section className="w-full">
        <UsageSummaryPanel deviceId={device.id} />
      </section>

      {/* Row 2: Config & Alerts - 1:1 Split */}
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
