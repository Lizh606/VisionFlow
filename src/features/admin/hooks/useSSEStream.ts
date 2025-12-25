
import { useState, useEffect, useCallback } from 'react';
import { App } from 'antd';

export interface AdminEvent {
  id: string;
  type: 'error' | 'warning' | 'info';
  domain: 'Studio' | 'Self-Hosted' | 'Marketplace';
  message: string;
  time: Date;
}

export const useSSEStream = () => {
  const { notification } = App.useApp();
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [status, setStatus] = useState<'connected' | 'reconnecting' | 'disconnected'>('connected');

  const addEvent = useCallback((event: AdminEvent) => {
    setEvents(prev => [event, ...prev].slice(0, 100));
    setUnreadCount(c => c + 1);

    // SSE Toast Implementation
    notification.open({
      message: `${event.domain} Event: ${event.type.toUpperCase()}`,
      description: event.message,
      duration: 4,
      placement: 'bottomRight',
      style: { 
        borderRadius: 'var(--vf-radius-card)',
        borderLeft: `4px solid var(--vf-${event.type === 'error' ? 'error' : event.type === 'warning' ? 'warning' : 'info'})` 
      },
    });
  }, [notification]);

  const clearEvents = () => {
    setEvents([]);
    setUnreadCount(0);
  };

  const resetUnread = () => setUnreadCount(0);

  // Mock SSE logic for demonstration
  useEffect(() => {
    const timer = setInterval(() => {
      const domains: any[] = ['Studio', 'Self-Hosted', 'Marketplace'];
      const types: any[] = ['info', 'warning', 'error'];
      
      if (Math.random() > 0.85) {
        addEvent({
          id: Date.now().toString(),
          type: types[Math.floor(Math.random() * types.length)],
          domain: domains[Math.floor(Math.random() * domains.length)],
          message: `Periodic system heartbeat check completed for cluster nodes.`,
          time: new Date()
        });
      }
    }, 12000);

    return () => clearInterval(timer);
  }, [addEvent]);

  return { events, unreadCount, status, clearEvents, resetUnread };
};
