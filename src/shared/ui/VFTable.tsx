
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
        /* 1. thead: 标尺化表头 */
        .vf-table-wrapper .ant-table-thead > tr > th {
          background-color: rgba(var(--vf-bg-page), 1) !important;
          color: rgba(var(--vf-text-secondary), 1) !important;
          font-weight: 500 !important; /* V1.4 Medium */
          font-size: 14px !important;   /* T5 Body */
          border-bottom: 1px solid rgba(var(--vf-divider), var(--vf-divider-alpha)) !important;
          padding: 12px 16px !important;
          transition: background-color 0.2s ease;
        }
        
        /* 移除 AntD 默认的表头竖向分割线 保持整洁 */
        .vf-table-wrapper .ant-table-thead > tr > th::before {
          display: none !important;
        }

        /* 排序与筛选 Icon 弱化 */
        .vf-table-wrapper .ant-table-column-sorter {
          color: rgba(var(--vf-text-tertiary), 0.5) !important;
        }
        .vf-table-wrapper .ant-table-column-header-col:hover .ant-table-column-sorter {
          color: rgba(var(--vf-text-secondary), 1) !important;
        }

        /* 2. tbody: 利落行样式 */
        .vf-table-wrapper .ant-table-tbody > tr > td {
          /* 56px 行高计算：17px(padding) * 2 + 22px(line-height) = 56px */
          padding: 17px 16px !important;
          border-bottom: 1px solid rgba(var(--vf-divider), 0.5) !important;
          color: rgba(var(--vf-text-primary), 1) !important;
          background-color: rgba(var(--vf-bg-card), 1) !important;
          vertical-align: middle !important;
          transition: background-color 0.2s ease;
        }

        /* 极轻的 Hover 反馈 */
        .vf-table-wrapper .ant-table-tbody > tr:hover > td {
          background-color: rgba(var(--vf-hover), var(--vf-hover-alpha)) !important;
        }

        /* 状态与模式 Tag 容器对齐 */
        .vf-table-wrapper .ant-table-tbody .ant-tag,
        .vf-table-wrapper .ant-table-tbody .vf-tag {
          margin: 0 !important;
          vertical-align: middle;
        }

        /* 右侧操作按钮感知增强 */
        .vf-table-wrapper .ant-table-tbody > tr .ant-btn-text,
        .vf-table-wrapper .ant-table-tbody > tr .lucide-more-vertical {
          opacity: 0.6;
          transition: opacity 0.2s ease, color 0.2s ease;
        }
        .vf-table-wrapper .ant-table-tbody > tr:hover .ant-btn-text,
        .vf-table-wrapper .ant-table-tbody > tr:hover .lucide-more-vertical {
          opacity: 1;
        }

        /* 3. Pagination 底部区域 */
        .vf-table-wrapper .ant-pagination {
          padding: 16px 24px !important;
          margin: 0 !important;
          border-top: 1px solid rgba(var(--vf-divider), var(--vf-divider-alpha));
          background-color: rgba(var(--vf-bg-card), 1);
        }

        .vf-table-wrapper .ant-pagination-total-text {
          font-size: 13px;
          color: rgba(var(--vf-text-tertiary), 1);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
