
import React, { useState, useEffect, useMemo } from 'react';
import { Button, Select, Dropdown, App, Badge, Space } from 'antd';
import { Download, FilterX, FileStack, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFTableToolbar } from '../../../ui/VFTableToolbar';
import { TimeRangeFilter } from '../../../shared/ui/TimeRangeFilter';
import { VFAuditTable } from './components/VFAuditTable';
import { VFOperationDetailDrawer } from './components/VFOperationDetailDrawer';
import { VFExportCenter } from './components/VFExportCenter';
import { mockAuditLogs, mockExportTasks } from '../model/mockAudit';
import { AuditLogEntry, AuditExportTask } from '../types/audit';
import { VFText } from '../../../ui/VFText';

interface Props {
  path?: string;
}

export const AdminAuditPage: React.FC<Props> = ({ path }) => {
  const { t } = useTranslation();
  const { message, notification } = App.useApp();
  
  const queryParams = useMemo(() => new URLSearchParams(path?.split('?')[1] || ''), [path]);
  
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [exports, setExports] = useState<AuditExportTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [exportCenterOpen, setExportCenterOpen] = useState(false);
  
  const [search, setSearch] = useState(queryParams.get('adminOpId') || queryParams.get('subjectId') || '');
  const [searchDim, setSearchDim] = useState(queryParams.get('subjectId') ? 'subjectId' : 'adminOpId');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEntry, setSelectedEntry] = useState<AuditLogEntry | null>(null);

  const fetchLogs = async (silent = false) => {
    if (!silent) setLoading(true);
    setTimeout(() => {
      setLogs(mockAuditLogs);
      setExports(mockExportTasks);
      setLoading(false);
      if (silent) message.success(t('common.refresh') + ' OK');
    }, 600);
  };

  useEffect(() => { fetchLogs(); }, []);

  const handleExport = (format: 'CSV' | 'JSON') => {
    const newTask: AuditExportTask = {
      id: `EXP-${Date.now().toString().slice(-6)}`,
      status: 'PREPARING',
      format,
      createdBy: 'admin-01',
      createdAt: new Date().toLocaleString(),
      filters: { search, searchDim }
    };
    setExports([newTask, ...exports]);
    notification.info({ message: t('admin.audit.export.preparing'), placement: 'bottomRight' });
    
    setTimeout(() => {
      setExports(prev => prev.map(ex => ex.id === newTask.id ? { ...ex, status: 'READY', downloadUrl: '#' } : ex));
      notification.success({ message: t('admin.audit.export.ready'), description: `Task ${newTask.id} finalized.`, placement: 'bottomRight' });
    }, 3000);
  };

  const filteredLogs = useMemo(() => {
    return logs.filter(l => {
      const matchSearch = !search || (l as any)[searchDim]?.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || l.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [logs, search, searchDim, statusFilter]);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 w-full pb-20">
      {/* V1.4 对齐菜单文案 */}
      <VFPageHeader 
        title={t('menu.adminAudit')} 
        description={t('admin.audit.description')}
        actions={
          <div className="flex items-center gap-3">
            <Badge count={exports.filter(e => e.status === 'PREPARING').length} size="small">
              <Button 
                icon={<FileStack size={18} />} 
                onClick={() => setExportCenterOpen(true)}
                className="h-10 w-10 flex items-center justify-center rounded-control hover:text-brand shadow-sm bg-bg-card border-border"
              />
            </Badge>
            
            <Dropdown
              trigger={['click']}
              menu={{
                items: [
                  { key: 'csv', label: t('admin.audit.export.csv'), onClick: () => handleExport('CSV') },
                  { key: 'json', label: t('admin.audit.export.json'), onClick: () => handleExport('JSON') },
                ]
              }}
            >
              <Button type="primary" icon={<Download size={16} />} className="h-10 px-6 font-bold rounded-control shadow-md bg-brand border-brand">
                {t('admin.audit.export.btn')}
              </Button>
            </Dropdown>
          </div>
        }
      />

      <VFTableToolbar 
        search={{
          value: search,
          onChange: setSearch,
          placeholder: t('admin.audit.searchPlaceholder')
        }}
        filters={
          <div className="flex flex-wrap items-center gap-3">
            <Select 
              value={searchDim} 
              onChange={setSearchDim} 
              className="w-40 h-10 font-bold"
              options={[
                { label: 'adminOpId', value: 'adminOpId' },
                { label: 'operatorId', value: 'operatorId' },
                { label: 'subjectId', value: 'subjectId' },
              ]}
            />
            <Select 
              value={statusFilter} 
              onChange={setStatusFilter} 
              className="w-44 h-10 font-bold"
              options={[
                { label: t('admin.alerts.filters.allStatus'), value: 'all' },
                { label: 'SUCCESS', value: 'SUCCESS' },
                { label: 'FAILED', value: 'FAILED' },
              ]}
            />
            <TimeRangeFilter />
          </div>
        }
        actions={
          <Button 
            icon={<FilterX size={16} />} 
            onClick={() => { setSearch(''); setStatusFilter('all'); }} 
            className="h-10 px-4 text-text-tertiary font-bold"
          >
            {t('marketplace.filters.reset')}
          </Button>
        }
        onRefresh={() => fetchLogs(true)}
        refreshing={loading}
      />

      <VFAuditTable 
        data={filteredLogs} 
        loading={loading} 
        onRowClick={setSelectedEntry} 
        onFilterSubject={(id) => { setSearch(id); setSearchDim('subjectId'); }}
      />

      <VFOperationDetailDrawer 
        open={!!selectedEntry} 
        result={selectedEntry} 
        onClose={() => setSelectedEntry(null)} 
      />

      <VFExportCenter 
        open={exportCenterOpen} 
        tasks={exports} 
        onClose={() => setExportCenterOpen(false)}
        onRefresh={() => fetchLogs(true)}
      />
    </div>
  );
};
