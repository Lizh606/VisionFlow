
import React from 'react';
import { ArrowRight, MoreVertical, Clock } from 'lucide-react';
import { List, Button, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { VFTable } from '../../../shared/ui/VFTable';
import { Workflow } from '../model/types';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { VFText } from '../../../ui/VFText';
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
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  {/* Mobile Row Title: T4 */}
                  <VFText variant="t4" color="primary" truncate>
                    {item.name}
                  </VFText>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-text-tertiary" />
                    {/* Mobile Meta: T6 */}
                    <VFText variant="t6" color="secondary">
                      {dayjs(item.updatedAt).fromNow()}
                    </VFText>
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
                      className="flex items-center justify-center w-11 h-11 text-text-tertiary"
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
          {/* V1.4: Cell Primary = T5 */}
          <VFText variant="t5" color="primary" className="group-hover:text-brand transition-colors">
            {text}
          </VFText>
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
        /* V1.4: Meta = T6 (12px) */
        <VFText variant="t6" color="tertiary" tabularNums>
          {dayjs(date).fromNow()}
        </VFText>
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
    </div>
  );
};
