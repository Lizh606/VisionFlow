
import React from 'react';
import { Table, ConfigProvider } from 'antd';
import type { TableProps } from 'antd';

export type VFTableProps<T> = TableProps<T> & {
  className?: string;
};

/**
 * VFTable - VisionFlow V1.4 Standard Table
 * 1. Typography: Header T5 Body Strong (14/22, 500), Body T5 Body (14/22, 400).
 * 2. Layout: Added horizontal padding to pagination to prevent sticking to borders.
 */
export function VFTable<T extends object>({ className, ...props }: VFTableProps<T>) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: 'rgba(var(--vf-bg-card), 1)', 
            headerColor: 'rgba(var(--vf-text-secondary), 1)',
            headerSplitColor: 'transparent',
            headerBorderRadius: 0,
            colorBgContainer: 'rgba(var(--vf-bg-card), 1)',
            colorText: 'rgba(var(--vf-text-primary), 1)',
            colorBorderSecondary: 'rgba(var(--vf-divider), var(--vf-divider-alpha))', 
            rowHoverBg: 'rgba(var(--vf-hover), 0.02)',
            selectedRowBg: 'rgba(var(--vf-brand), 0.04)',
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
          
          .vf-standard-table {
            background-color: #fff !important;
          }

          /* Header: T5 Body Strong (14/22, 500) */
          .vf-standard-table .ant-table-thead > tr > th {
            height: 44px !important;
            padding: 11px 16px !important;
            font-size: var(--vf-font-size-t5) !important;
            line-height: var(--vf-lh-t5) !important;
            font-weight: var(--vf-font-weight-medium) !important;
            border-bottom: 1px solid rgba(var(--vf-divider), var(--vf-divider-alpha)) !important;
          }

          /* Body: T5 Body (14/22, 400) */
          .vf-standard-table .ant-table-tbody > tr > td {
            height: 44px !important; 
            padding: 11px 16px !important;
            font-size: var(--vf-font-size-t5) !important;
            line-height: var(--vf-lh-t5) !important;
            font-weight: var(--vf-font-weight-regular) !important;
            color: rgba(var(--vf-text-primary), 1) !important;
            border-bottom: 1px solid rgba(var(--vf-divider), var(--vf-divider-alpha)) !important;
          }

          /* First column weight fallback */
          .vf-standard-table .ant-table-tbody > tr > td:first-child {
            font-weight: var(--vf-font-weight-regular) !important;
          }

          /* === Pagination Alignment Fix (Spec V1.4 Section 6.3) === */
          /* 为分页器增加右侧边距 (24px) 和上下边距，确保不贴边 */
          .vf-standard-table .ant-table-pagination.ant-pagination {
            margin: 16px 24px !important; 
            padding: 0 !important;
          }

          @media (max-width: 767px) {
            .vf-standard-table .ant-table-pagination.ant-pagination {
              margin: 16px 16px !important;
              justify-content: center !important;
              width: calc(100% - 32px);
            }
          }
        `}</style>
      </div>
    </ConfigProvider>
  );
}
