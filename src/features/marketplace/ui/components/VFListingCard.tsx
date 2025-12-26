
import React from 'react';
import { Button, Tooltip } from 'antd';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFTag } from '../../../../shared/ui/VFTag';
import { VFListingCardBase } from './VFListingCardBase';
import { ArtifactImage } from './ArtifactImage';
import { StatusConfigDef, ActionDef } from './statusConfig';
import { VFText } from '../../../../ui/VFText';
import dayjs from 'dayjs';

interface Props {
  listing: any;
  config: StatusConfigDef;
  onAction: (id: string, action: string) => void;
  forceCoverFail?: boolean;
}

const ActionBtn: React.FC<{ 
  def: ActionDef; 
  btnType?: 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';
  block?: boolean;
  onAction: (action: string) => void;
}> = ({ def, btnType = 'default', block = false, onAction }) => {
  const btn = (
    <Button 
      type={btnType}
      block={block}
      disabled={def.disabled}
      icon={def.icon}
      className={`h-9 font-bold text-[12px] uppercase tracking-wider rounded-control transition-all shadow-none ${btnType === 'default' ? 'text-text-secondary border-border hover:text-brand hover:border-brand' : ''}`}
      onClick={(e) => { e.stopPropagation(); onAction(def.action); }}
    >
      {def.label}
    </Button>
  );
  return def.tooltip ? <Tooltip title={def.tooltip}>{btn}</Tooltip> : btn;
};

export const VFListingCard: React.FC<Props> = ({ listing, config, onAction, forceCoverFail = false }) => {
  const { t } = useTranslation();

  const handleBtnAction = (action: string) => {
    onAction(listing.id, action);
  };

  return (
    <VFListingCardBase
      cover={<ArtifactImage alt={listing.type} forceFail={forceCoverFail} />}
      statusTag={<VFTag variant={config.tag.variant} filled>{config.tag.label}</VFTag>}
      title={listing.name}
      meta={
        <div className="flex items-center gap-2">
          <VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-wider opacity-60">
            {t(`marketplace.type.${listing.type.toLowerCase()}` as any)}
          </VFText>
          <span className="opacity-30">{"\u2022"}</span>
          <VFText variant="t6" color="tertiary" className="font-medium opacity-60">
            {dayjs(listing.lastUpdated).fromNow()}
          </VFText>
        </div>
      }
      keyInfo={
        config.info ? (
          <div className="flex items-center gap-2 overflow-hidden">
            <span className={config.info.type === 'error' ? 'text-error' : config.info.type === 'warning' ? 'text-warning' : 'text-text-tertiary'}>
              {config.info.icon || <AlertCircle size={14} />}
            </span>
            <VFText variant="t6" color={config.info.type === 'error' ? 'error' : 'secondary'} className="font-bold truncate leading-none">
              {config.info.text}
            </VFText>
          </div>
        ) : null
      }
      actions={
        <div className="flex flex-col gap-2">
          <ActionBtn def={config.primary} btnType="primary" block onAction={handleBtnAction} />
          <div className="grid grid-cols-2 gap-2">
            <ActionBtn def={config.secondaryLeft} onAction={handleBtnAction} />
            <ActionBtn def={config.secondaryRight} onAction={handleBtnAction} />
          </div>
        </div>
      }
    />
  );
};
