
import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

// Explicitly define props to ensure className and TableProps are correctly merged
export type VFTableProps<T> = TableProps<T> & {
  className?: string;
};

export function VFTable<T extends object>({ className, ...props }: VFTableProps<T>) {
  return (
    <div className={`vf-table-wrapper rounded-card overflow-hidden border border-border bg-bg-card ${className || ''}`}>
      <Table<T>
        {...props}
        className="w-full"
        // Force size to middle for dense information density per Desktop spec
        size="middle"
        // Customize default pagination to match VisionFlow style
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
        /* Pattern Layer: Table Header */
        .vf-table-wrapper .ant-table-thead > tr > th {
          background-color: rgb(var(--vf-bg-page)) !important;
          color: rgb(var(--vf-text-secondary)) !important;
          font-weight: 600 !important;
          font-size: 13px !important;
          /* FIX: Added alpha channel to avoid harsh white border in dark mode */
          border-bottom: 1px solid rgb(var(--vf-border) / var(--vf-border-alpha)) !important;
          padding: 12px 16px !important;
        }
        
        /* Pattern Layer: Table Body */
        .vf-table-wrapper .ant-table-tbody > tr > td {
          padding: 16px 16px !important;
          /* FIX: Corrected variable name from vf-border-divider to vf-divider and added alpha */
          border-bottom: 1px solid rgb(var(--vf-divider) / var(--vf-divider-alpha)) !important;
          color: rgb(var(--vf-text-primary)) !important;
          font-size: 14px !important;
        }

        /* Hover State */
        .vf-table-wrapper .ant-table-tbody > tr:hover > td {
          background-color: rgba(var(--vf-brand), 0.02) !important;
        }

        /* Pagination Styling */
        .vf-table-wrapper .ant-pagination {
          padding: 16px !important;
          margin: 0 !important;
          /* FIX: Added alpha channel */
          border-top: 1px solid rgb(var(--vf-divider) / var(--vf-divider-alpha));
        }
      `}</style>
    </div>
  );
}
