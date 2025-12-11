
import React from 'react';

export const StatusTag = ({ status, tStatus }: { status: string, tStatus: any }) => {
    let styles = "bg-gray-500 text-white";
    let label = status;

    switch (status) {
      case 'ONLINE':
        styles = "bg-green-500 text-white shadow-sm shadow-green-500/20";
        label = tStatus.online;
        break;
      case 'OFFLINE':
        styles = "bg-red-500 text-white shadow-sm shadow-red-500/20";
        label = tStatus.offline;
        break;
      case 'PENDING_LICENSE':
        styles = "bg-orange-500 text-white shadow-sm shadow-orange-500/20";
        label = tStatus.pending;
        break;
      case 'DRAINING':
        styles = "bg-blue-500 text-white shadow-sm shadow-blue-500/20";
        label = tStatus.draining;
        break;
      case 'DECOMMISSIONED':
        styles = "bg-gray-500 text-white";
        label = tStatus.decommissioned;
        break;
    }

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide whitespace-nowrap ${styles}`}>
        {status === 'ONLINE' && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
        {label}
      </span>
    );
};
