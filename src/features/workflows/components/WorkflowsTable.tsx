
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
}

export const WorkflowsTable: React.FC<Props> = ({ 
  data, 
  loading, 
  total, 
  page, 
  pageSize, 
  onPageChange 
}) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();

  if (isMobile) {
    return (
      <div className="bg-bg-card rounded-card border border-border overflow-hidden">
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
            className: 'py-4 px-4 border-t border-divider'
          }}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              className="px-4 py-4 hover:bg-bg-page/50 transition-colors cursor-pointer"
              onClick={() => window.location.hash = `/workflows/${item.id}`}
              extra={
                <Dropdown
                  trigger={['click']}
                  menu={{ items: [{ key: 'edit', label: t('common.edit') }, { key: 'delete', label: t('common.delete'), danger: true }] }}
                >
                  <Button type="text" icon={<MoreVertical size={18} />} onClick={e => e.stopPropagation()} />
                </Dropdown>
              }
            >
              <div className="flex flex-col gap-1 pr-2 overflow-hidden">
                <span className="font-bold text-text-primary text-[15px] truncate">
                  {item.name}
                </span>
                <div className="flex items-center gap-2 text-text-tertiary text-xs">
                  <Clock size={12} />
                  <span>{dayjs(item.updatedAt).fromNow()}</span>
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
        <div className="flex items-center justify-between group/row">
          <span className="font-medium text-text-primary text-[14px] group-hover:text-brand transition-colors">
            {text}
          </span>
          <ArrowRight 
            size={16} 
            className="text-brand opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" 
          />
        </div>
      ),
    },
    {
      title: t('workflows.table.updated'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 240,
      render: (date: string) => (
        <span className="text-text-secondary text-[14px] font-normal">
          {dayjs(date).fromNow()}
        </span>
      ),
    },
  ];

  return (
    <div className="border border-border rounded-card overflow-hidden bg-bg-card">
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
        className="!border-none"
        onRow={(record) => ({
          className: 'cursor-pointer',
          onClick: () => window.location.hash = `/workflows/${record.id}`
        })}
      />
    </div>
  );
};
