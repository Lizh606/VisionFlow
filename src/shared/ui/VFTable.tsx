
import React from 'react';
import { Table, ConfigProvider } from 'antd';
import type { TableProps } from 'antd';

export type VFTableProps<T> = TableProps<T> & {
  className?: string;
};

/**
 * VFTable - VisionFlow V1.4 Standard Table
 * 1. Typography: Header T5 Body Strong (14/22, 500), Body T5 Body (14/22, 400).
 * 2. Hierarchy: Pure white header (#FFFFFF) + border-divider (Alpha 1.0).
 * 3. Compactness: Row height 44px.
 */
export function VFTable<T extends object>({ className, ...props }: VFTableProps<T>) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            // 1. Header: White background + Primary text
            headerBg: 'rgba(var(--vf-bg-card), 1)', 
            headerColor: 'rgba(var(--vf-text-primary), 1)',
            headerSplitColor: 'transparent',
            headerBorderRadius: 0,
            
            // 2. Base surface and text colors
            colorBgContainer: 'rgba(var(--vf-bg-card), 1)',
            colorText: 'rgba(var(--vf-text-primary), 1)',
            // V1.4: Clearer row divider (Alpha 1.0)
            colorBorderSecondary: 'rgba(var(--vf-divider), var(--vf-divider-alpha))', 
            
            // 3. Interaction states
            rowHoverBg: 'rgba(var(--vf-hover), 0.02)',
            selectedRowBg: 'rgba(var(--vf-brand), 0.04)',
            
            // 4. Compact sizing
            padding: 12,
            paddingXS: 8,
          },
          Pagination: {
            itemSize: 32,
            borderRadius: 8,
            colorPrimary: 'rgba(var(--vf-brand), 1)',
            colorText: 'rgba(var(--vf-text-secondary), 1)',
          }
        }
      }}
    >
      <div className={`vf-table-container rounded-card border border-border bg-bg-card overflow-hidden shadow-card ${className || ''}`}>
        <Table<T>
          {...props}
          className="vf-standard-table"
          size="middle"
          pagination={
            props.pagination
              ? {
                  showSizeChanger: true,
                  showTotal: (total: number) => `Total ${total} items`,
                  size: 'small',
                  position: ['bottomRight'],
                  ...(typeof props.pagination === 'object' ? props.pagination : {}),
                }
              : false
          }
        />
        <style>{`
          /* === V1.4 Standard Table Typography Overrides === */
          
          /* 1. Header: T5 Body Strong (14/22, 500) */
          .vf-standard-table .ant-table-thead > tr > th {
            height: 44px !important;
            padding: 11px 16px !important;
            font-size: 14px !important;
            line-height: 22px !important;
            font-weight: 500 !important;
            text-transform: none !important;
            letter-spacing: normal !important;
            border-bottom: 1px solid rgba(var(--vf-divider), var(--vf-divider-alpha)) !important;
          }

          .vf-standard-table .ant-table-thead > tr > th::before {
            display: none !important;
          }

          /* 2. Body: T5 Body (14/22, 400) */
          .vf-standard-table .ant-table-tbody > tr > td {
            height: 44px !important; 
            padding: 11px 16px !important;
            font-size: 14px !important;
            line-height: 22px !important;
            font-weight: 400 !important;
            border-bottom: 1px solid rgba(var(--vf-divider), var(--vf-divider-alpha)) !important;
            background-color: transparent !important;
          }

          /* Hover behavior */
          .vf-standard-table .ant-table-tbody > tr:hover > td {
            background-color: rgba(var(--vf-hover), 0.02) !important;
          }

          /* Emphasis for first column */
          .vf-standard-table .ant-table-tbody > tr > td:first-child {
            font-weight: 500 !important;
          }

          /* Pagination styles */
          .vf-standard-table .ant-table-pagination.ant-pagination {
            margin: 16px 20px !important;
          }
        `}</style>
      </div>
    </ConfigProvider>
  );
}
