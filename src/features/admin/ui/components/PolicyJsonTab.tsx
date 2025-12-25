
import React from 'react';
import { Button } from 'antd';
import { Copy, FileJson, Terminal } from 'lucide-react';
import { VFText } from '../../../../ui/VFText';
import { QuotaPolicy } from '../../types/quota';

interface Props {
  activePolicy: QuotaPolicy;
  draftPolicy: any;
  isEdit: boolean;
}

export const PolicyJsonTab: React.FC<Props> = ({ activePolicy, draftPolicy, isEdit }) => {
  const policyOnly = (p: any) => {
    if (!p) return {};
    // 排除掉管理系统内部使用的元数据，只保留下发给边缘节点的策略定义
    const { workspaceId, workspaceName, updatedBy, updatedAt, version, metadata, ...rest } = p;
    return rest;
  };

  // 逻辑简化：编辑态显示草稿，查看态显示线上
  const currentData = isEdit ? { ...activePolicy, ...draftPolicy } : activePolicy;
  const displayJson = JSON.stringify(policyOnly(currentData), null, 2);

  return (
    <div className="flex flex-col gap-5 py-2 animate-in fade-in duration-300">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-brand opacity-60" />
          <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest">
            {isEdit ? 'Draft Specification' : 'Active Specification'}
          </VFText>
        </div>
        <Button 
          type="text" 
          size="small" 
          icon={<Copy size={14} />} 
          onClick={() => navigator.clipboard.writeText(displayJson)}
          className="text-brand font-bold text-xs hover:bg-brand/5 rounded-control px-3"
        >
          Copy JSON
        </Button>
      </div>

      <div className="relative group">
        <pre className="p-6 bg-bg-page border border-divider rounded-card text-[12px] font-mono leading-relaxed overflow-auto max-h-[580px] custom-scrollbar text-text-secondary shadow-inner">
          {displayJson}
        </pre>
        {/* 装饰性的角落标签，增加专业感 */}
        <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <VFText variant="t7" color="disabled" className="bg-bg-card/80 px-2 py-1 rounded border border-divider">ReadOnly View</VFText>
        </div>
      </div>
      
      <div className="p-4 bg-bg-page/30 rounded-card border border-divider border-dashed flex items-start gap-3">
        <FileJson size={16} className="text-text-tertiary opacity-40 mt-0.5" />
        <VFText variant="t6" color="tertiary" className="italic font-medium leading-relaxed">
          The JSON above represents the raw policy schema enforced by workspace agents. Metadata fields are omitted for clarity.
        </VFText>
      </div>
    </div>
  );
};
