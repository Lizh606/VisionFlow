import { useState, useEffect, useCallback, useMemo } from 'react';
import { App } from 'antd';
import { AdminOpResult } from '../types/alerts';

export const useAdminOperationTracker = (alertId?: string) => {
  const { notification } = App.useApp();
  const [operations, setOperations] = useState<AdminOpResult[]>([]);
  const [isPolling, setIsPolling] = useState(false);

  // 初始化历史数据
  useEffect(() => {
    if (alertId === 'alt-001' && operations.length === 0) {
      setOperations([
        {
          adminOpId: '01HFZ1XG2Z5V5V5V5V5V5V5V5V',
          actionType: 'Initial System Check',
          status: 'SUCCESS',
          operatorId: 'system',
          startedAt: '09:00:00',
          timestamp: '09:00:02',
          subjectType: 'DEVICE',
          subjectId: 'dev_829305_a',
        }
      ]);
    }
  }, [alertId]);

  const updateOpStatus = useCallback((adminOpId: string, updates: Partial<AdminOpResult>) => {
    setOperations(prev => prev.map(op => 
      op.adminOpId === adminOpId ? { ...op, ...updates } : op
    ));
  }, []);

  const startPolling = useCallback((adminOpId: string) => {
    setIsPolling(true);
    let iterations = 0;
    const maxIterations = 2; // 2轮轮询，每轮5s，总计10s演示时长

    const interval = setInterval(() => {
      iterations++;
      
      if (iterations >= maxIterations) {
        const isSuccess = Math.random() > 0.2; // 提高成功率模拟
        
        updateOpStatus(adminOpId, { 
          status: isSuccess ? 'SUCCESS' : 'FAILED', 
          timestamp: new Date().toLocaleTimeString('en-GB', { hour12: false }),
          errorSummary: isSuccess ? undefined : 'Cluster synchronization timeout (ETCD_ERR_04)',
          retryable: !isSuccess
        });
        
        clearInterval(interval);
        setIsPolling(false);
        
        if (isSuccess) {
          notification.success({
            message: 'Operation Successful',
            description: `Transaction ${adminOpId.slice(0, 8)} finalized.`,
            placement: 'bottomRight',
          });
        }
      }
    }, 5000); 
  }, [notification, updateOpStatus]);

  const addOperation = (op: Partial<AdminOpResult>) => {
    const fullOp: AdminOpResult = {
      adminOpId: op.adminOpId || `OP-${Date.now().toString(36).toUpperCase()}`,
      actionType: op.actionType || 'Admin Action',
      operatorId: op.operatorId || 'admin-01',
      subjectType: op.subjectType || 'UNKNOWN',
      subjectId: op.subjectId || 'N/A',
      startedAt: new Date().toLocaleTimeString('en-GB', { hour12: false }),
      ...op,
      status: 'PENDING',
    } as AdminOpResult;

    setOperations(prev => [fullOp, ...prev].slice(0, 10));
    startPolling(fullOp.adminOpId);
  };

  const retryOperation = (op: AdminOpResult) => {
    // 1. 将状态重置为 PENDING
    updateOpStatus(op.adminOpId, { 
      status: 'PENDING', 
      startedAt: new Date().toLocaleTimeString('en-GB', { hour12: false }),
      errorMessage: undefined,
      errorSummary: undefined 
    });
    // 2. 重新开始轮询
    startPolling(op.adminOpId);
  };

  const inProgressOps = useMemo(() => operations.filter(o => o.status === 'PENDING'), [operations]);
  const recentOps = useMemo(() => operations.filter(o => o.status !== 'PENDING').slice(0, 5), [operations]);

  return {
    inProgressOps,
    recentOps,
    operations,
    addOperation,
    retryOperation,
    isPolling
  };
};