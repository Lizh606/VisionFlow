
import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

export type VFTableProps<T> = TableProps<T> & {
  className?: string;
};

export function VFTable<T extends object>({ className, ...props }: VFTableProps<T>) {
  return (
    <div className={`vf-table-wrapper rounded-card overflow-hidden border border-border bg-bg-card ${className || ''}`}>
      <Table<T>
        {...props}
        className="w-full"
        size="middle"
        pagination={
          props.pagination
            ? {
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total: number) => `Total ${total} items`,
                size: 'small',
                position: ['bottomRight'],
                ...(typeof props.pagination === 'object' ? props.pagination : {}),
              }
            : false
        }
      />
      <style>{`
        /* 1. Header Styles: Standardized across all tables */
        .vf-table-wrapper .ant-table-thead > tr > th {
          background-color: rgba(var(--vf-bg-page), 0.5) !important;
          color: rgba(var(--vf-text-secondary), 1) !important;
          font-weight: 600 !important;
          font-size: 13px !important;
          border-bottom: 1px solid rgba(var(--vf-divider), var(--vf-divider-alpha)) !important;
          padding: 12px 16px !important;
          text-transform: none !important;
          letter-spacing: normal !important;
        }
        
        /* Remove vertical header dividers */
        .vf-table-wrapper .ant-table-thead > tr > th::before {
          display: none !important;
        }

        /* 2. Cell Styles: High-density and clean */
        .vf-table-wrapper .ant-table-tbody > tr > td {
          padding: 12px 16px !important;
          border-bottom: 1px solid rgba(var(--vf-divider), var(--vf-divider-alpha)) !important;
          color: rgba(var(--vf-text-primary), 1) !important;
          font-size: 14px !important;
        }

        /* Hover row highlight */
        .vf-table-wrapper .ant-table-tbody > tr:hover > td {
          background-color: rgba(var(--vf-brand), 0.03) !important;
        }

        /* 3. Pagination Styles */
        .vf-table-wrapper .ant-pagination {
          padding: 12px 24px !important;
          margin: 0 !important;
          border-top: 1px solid rgba(var(--vf-divider), var(--vf-divider-alpha));
          background-color: rgba(var(--vf-bg-card), 1);
        }

        /* Fix fixed column background */
        .vf-table-wrapper .ant-table-cell-fix-right,
        .vf-table-wrapper .ant-table-cell-fix-left {
          background-color: inherit !important;
        }

        /* Remove any extra empty TD artifacts caused by scroll columns */
        .vf-table-wrapper .ant-table-placeholder .ant-table-cell {
          border-bottom: none !important;
        }
      `}</style>
    </div>
  );
}
