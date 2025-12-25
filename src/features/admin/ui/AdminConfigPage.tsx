
import React from 'react';
import { Row, Col, Button, Tooltip } from 'antd';
import { Bell, MapPin, FileCode, ArrowRight, Lock, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFCard } from '../../../shared/ui/VFCard';
import { VFTag } from '../../../shared/ui/VFTag';
import { VFText } from '../../../ui/VFText';

const CURRENT_USER_ROLE = 'ops_admin'; // Mock role

interface ConfigCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  status: 'available' | 'comingSoon';
  onClick: () => void;
  permission?: boolean;
}

const ConfigEntranceCard: React.FC<ConfigCardProps> = ({ title, description, icon: Icon, status, onClick, permission = true }) => {
  const { t } = useTranslation();
  const isAvailable = status === 'available' && permission;
  
  const statusLabel = !permission 
    ? t('admin.config.status.noAccess') 
    : status === 'available' 
      ? t('admin.config.status.available') 
      : t('admin.config.status.comingSoon');

  return (
    <VFCard 
      noPadding
      onClick={isAvailable ? onClick : undefined}
      className={`h-full border-border transition-all duration-300 ${isAvailable ? 'hover:border-brand/40 hover:shadow-sm cursor-pointer' : 'opacity-60 bg-bg-page/40 cursor-not-allowed'}`}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-5">
          <div className={`w-11 h-11 rounded-control flex items-center justify-center border ${isAvailable ? 'bg-brand/5 text-brand border-brand/10' : 'bg-bg-page text-text-tertiary border-divider'}`}>
            <Icon size={22} strokeWidth={2} />
          </div>
          <VFTag variant={!permission ? 'error' : isAvailable ? 'success' : 'neutral'} filled={false} className="h-5 text-[10px] font-bold uppercase tracking-tight">
            {statusLabel}
          </VFTag>
        </div>

        <div className="flex flex-col flex-1 mb-8">
          <VFText variant="t4" color={isAvailable ? 'primary' : 'disabled'} className="mb-2">{title}</VFText>
          <VFText variant="t5" color="secondary" className="leading-relaxed opacity-80">{description}</VFText>
        </div>

        <div className="mt-auto">
          {!permission ? (
            <div className="flex items-center gap-2 text-text-disabled px-1">
              <Lock size={14} />
              <VFText variant="t6" color="disabled" className="font-bold uppercase tracking-tighter">Forbidden</VFText>
            </div>
          ) : (
            <Button 
              type="link"
              disabled={!isAvailable}
              icon={<ArrowRight size={14} />}
              className={`p-0 h-auto font-bold flex items-center gap-1.5 transition-all ${isAvailable ? 'text-brand hover:opacity-70' : 'text-text-disabled'}`}
            >
              {isAvailable ? t('common.viewDetails') : 'Unavailable'}
            </Button>
          )}
        </div>
      </div>
    </VFCard>
  );
};

export const AdminConfigPage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();
  
  const hasAlertPermission = ['ops_admin', 'support_readonly'].includes(CURRENT_USER_ROLE);
  const hasRoutingPermission = ['ops_admin'].includes(CURRENT_USER_ROLE);
  const hasTemplatePermission = ['ops_admin', 'bizops_admin'].includes(CURRENT_USER_ROLE);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 w-full pb-24">
      <VFPageHeader 
        title={t('admin.config.title')} 
        description={t('admin.config.subtitle')}
      />

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12} lg={8}>
          <ConfigEntranceCard 
            title={t('admin.config.cards.alertRules.title')}
            description={t('admin.config.cards.alertRules.desc')}
            icon={Bell}
            status="available"
            permission={hasAlertPermission}
            onClick={() => onNavigate('admin-config-alerts')}
          />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <ConfigEntranceCard 
            title={t('admin.config.cards.notificationRouting.title')}
            description={t('admin.config.cards.notificationRouting.desc')}
            icon={MapPin}
            status="available"
            permission={hasRoutingPermission}
            onClick={() => onNavigate('admin-config-routing')}
          />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <ConfigEntranceCard 
            title={t('admin.config.cards.templates.title')}
            description={t('admin.config.cards.templates.desc')}
            icon={FileCode}
            status="available"
            permission={hasTemplatePermission}
            onClick={() => onNavigate('admin-config-templates')}
          />
        </Col>
      </Row>
    </div>
  );
};
