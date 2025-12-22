import React from 'react';
import { ArrowRight, MoreVertical, Clock } from 'lucide-react';
import { List, Button, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { VFTable } from '../../../shared/ui/VFTable';
import { Workflow } from '../model/types';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import dayjs from '../../../config/dayjsConfig';

interface Props {
  data: Workflow[];
  loading: boolean;
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number, pageSize: number) => void;
  className?: string;
}

export const WorkflowsTable: React.FC<Props> = ({ 
  data, 
  loading, 
  total, 
  page, 
  pageSize, 
  onPageChange,
  className
}) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();

  if (isMobile) {
    return (
      <div className="animate-in fade-in duration-500 bg-bg-card rounded-card border border-border shadow-sm overflow-hidden">
        <List
          loading={loading}
          dataSource={data}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: total,
            onChange: onPageChange,
            size: 'small',
            align: 'center',
            className: 'py-6 px-4 border-t border-divider'
          }}
          renderItem={(item, index) => (
            <List.Item
              key={item.id}
              className={`
                !px-4 !py-4 transition-colors active:bg-action-hover cursor-pointer
                ${index !== data.length - 1 ? 'border-b border-divider' : ''}
              `}
              onClick={() => window.location.hash = `/workflows/${item.id}`}
            >
              <div className="flex items-center justify-between w-full gap-4">
                <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                  <span className="font-semibold text-text-primary text-[16px] leading-tight truncate">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-1.5 text-text-secondary text-[12px]">
                    <Clock size={14} className="opacity-60" />
                    <span className="font-normal">{dayjs(item.updatedAt).fromNow()}</span>
                  </div>
                </div>

                <div onClick={e => e.stopPropagation()} className="shrink-0 -mr-2">
                  <Dropdown
                    trigger={['click']}
                    placement="bottomRight"
                    menu={{ 
                      items: [
                        { key: 'edit', label: t('common.edit') }, 
                        { key: 'delete', label: t('common.delete'), danger: true }
                      ] 
                    }}
                  >
                    <Button 
                      type="text" 
                      className="flex items-center justify-center w-11 h-11 text-text-tertiary hover:text-text-primary"
                      icon={<MoreVertical size={20} />} 
                    />
                  </Dropdown>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  }

  const columns = [
    {
      title: t('workflows.table.name'),
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <div className="flex items-center gap-2">
          <span className="text-text-primary font-normal transition-colors group-hover:text-brand">
            {text}
          </span>
          <ArrowRight 
            size={14} 
            className="text-brand opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" 
          />
        </div>
      ),
    },
    {
      title: t('workflows.table.updated'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 200,
      align: 'left' as const,
      render: (date: string) => (
        <span className="vf-td-timestamp">
          {dayjs(date).fromNow()}
        </span>
      ),
    },
  ];

  return (
    <div className={`vf-workflows-table-container ${className || ''}`}>
      <VFTable<Workflow>
        loading={loading}
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: pageSize,
          total: total,
          onChange: onPageChange,
        }}
        onRow={(record) => ({
          className: 'cursor-pointer group',
          onClick: () => { window.location.hash = `/workflows/${record.id}`; }
        })}
      />
      <style>{`
        /* === V1.4 Typography & Hierarchy Refinement === */
        
        /* 1. Header: 500 weight, text-secondary (Slate-600) to act as a label */
        .vf-workflows-table-container .ant-table-thead > tr > th {
          color: rgba(var(--vf-text-secondary), 1) !important;
          font-weight: 500 !important;
          background: rgba(var(--vf-bg-card), 1) !important;
        }

        /* 2. Body: 400 weight, text-primary (Slate-900) to emphasize the data */
        .vf-workflows-table-container .ant-table-tbody > tr > td {
          font-weight: 400 !important;
          color: rgba(var(--vf-text-primary), 1) !important;
        }

        /* 3. Ensure the first column doesn't override with bold */
        .vf-workflows-table-container .ant-table-tbody > tr > td:first-child {
          font-weight: 400 !important; 
        }

        /* 4. Timestamp styling */
        .vf-workflows-table-container .vf-td-timestamp {
          font-size: 12px !important;
          line-height: 18px !important;
          color: rgba(var(--vf-text-tertiary), 1);
        }
      `}</style>
    </div>
  );
};