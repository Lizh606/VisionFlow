
import React from 'react';
import { Table, ConfigProvider } from 'antd';
import type { TableProps } from 'antd';

export type VFTableProps<T> = TableProps<T> & {
  className?: string;
};

/**
 * Internal VFTable Implementation
 */
function InternalVFTable<T extends object>(
  { className, ...props }: VFTableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
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
      <div ref={ref} className={`vf-table-container rounded-card border border-border bg-bg-card overflow-hidden shadow-card ${className || ''}`}>
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
          /* === V1.4 Standard Table Typography & Layout Overrides === */
          
          .vf-standard-table {
            background-color: #fff !important;
          }

          /* Header Styling: T5 Body Strong (14/22, 500) */
          /* Exclude measure rows to ensure headers are not stretched unexpectedly */
          .vf-standard-table .ant-table-thead > tr:not(.ant-table-measure-row) > th {
            padding: 11px 16px !important;
            font-size: var(--vf-font-size-t5) !important;
            line-height: var(--vf-lh-t5) !important;
            font-weight: var(--vf-font-weight-medium) !important;
            border-bottom: 1px solid rgba(var(--vf-divider), var(--vf-divider-alpha)) !important;
            background-color: rgba(var(--vf-bg-card), 1) !important;
            vertical-align: middle !important;
          }

          /* Body Styling: T5 Body (14/22, 400) */
          .vf-standard-table .ant-table-tbody > tr:not(.ant-table-measure-row) > td {
            padding: 11px 16px !important;
            font-size: var(--vf-font-size-t5) !important;
            line-height: var(--vf-lh-t5) !important;
            font-weight: var(--vf-font-weight-regular) !important;
            color: rgba(var(--vf-text-primary), 1) !important;
            border-bottom: 1px solid rgba(var(--vf-divider), var(--vf-divider-alpha)) !important;
            vertical-align: middle !important;
          }

          /* CRITICAL RESET: Eliminate measure row spacing */
          .vf-standard-table .ant-table-measure-row,
          .vf-standard-table .ant-table-measure-row td {
            padding: 0 !important;
            height: 0 !important;
            line-height: 0 !important;
            border: 0 !important;
            visibility: hidden !important;
            font-size: 0 !important;
          }

          /* Fixed Column Alignment Adjustments */
          .vf-standard-table .ant-table-cell-fix-left-last::after,
          .vf-standard-table .ant-table-cell-fix-right-first::after {
            display: none !important;
          }
          
          .vf-standard-table .ant-table-cell-fix-right-first {
             border-left: 1px solid rgba(var(--vf-divider), var(--vf-divider-alpha)) !important;
          }

          /* Pagination Alignment (Spec V1.4 Section 6.3) */
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

export const VFTable = React.forwardRef(InternalVFTable) as <T extends object>(
  props: VFTableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;
