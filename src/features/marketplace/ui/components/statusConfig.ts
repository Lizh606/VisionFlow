
import React from 'react';
import { 
  Edit2, Eye, Send, ExternalLink, 
  ShieldCheck, Info, Ban, Archive, 
  MessageSquare, FileText
} from 'lucide-react';
import { Listing, ListingStatus } from '../../types';

export interface ActionDef {
  label: string;
  icon?: React.ReactNode;
  action: 'edit' | 'preview' | 'submit' | 'details' | 'live' | 'submission_info';
  disabled?: boolean;
  tooltip?: string;
}

export interface StatusConfigDef {
  tag: {
    variant: 'neutral' | 'warning' | 'success' | 'error' | 'default';
    label: string;
  };
  info?: {
    text: string;
    icon?: React.ReactNode;
    type: 'default' | 'error' | 'warning';
  };
  primary: ActionDef;
  secondaryLeft: ActionDef;
  secondaryRight: ActionDef;
}

export const getStatusConfig = (listing: Listing, t: any): StatusConfigDef => {
  const configs: Record<ListingStatus, StatusConfigDef> = {
    DRAFT: {
      tag: { variant: 'neutral', label: t('marketplace.seller.status.draft') },
      primary: { label: t('common.edit'), icon: React.createElement(Edit2, { size: 14 }), action: 'edit' },
      secondaryLeft: { label: t('marketplace.seller.wizard.launchPreview'), action: 'preview' },
      secondaryRight: { 
        label: t('marketplace.seller.wizard.launchSubmit'), 
        action: 'submit', 
        disabled: !listing.shortDescription,
        tooltip: !listing.shortDescription ? t('marketplace.seller.wizard.missingMetadata') : undefined
      }
    },
    PENDING_REVIEW: {
      tag: { variant: 'warning', label: t('marketplace.seller.status.pending_review') },
      info: { text: t('marketplace.seller.notices.reviewing'), icon: React.createElement(ShieldCheck, { size: 12 }), type: 'warning' },
      primary: { label: t('marketplace.seller.wizard.launchPreview'), icon: React.createElement(Eye, { size: 14 }), action: 'preview' },
      secondaryLeft: { label: t('marketplace.seller.actions.submissionInfo'), action: 'submission_info' },
      secondaryRight: { label: t('common.viewDetails'), action: 'details' }
    },
    PUBLISHED: {
      tag: { variant: 'success', label: t('marketplace.seller.status.published') },
      info: { text: t('marketplace.seller.notices.live'), icon: React.createElement(ShieldCheck, { size: 12, className: "text-success" }), type: 'default' },
      primary: { label: t('marketplace.seller.actions.liveStore'), icon: React.createElement(ExternalLink, { size: 14 }), action: 'live' },
      secondaryLeft: { label: t('marketplace.seller.wizard.launchPreview'), action: 'preview' },
      secondaryRight: { label: t('common.edit'), action: 'edit' }
    },
    SUSPENDED: {
      tag: { variant: 'error', label: t('marketplace.seller.status.suspended') },
      info: { text: listing.rejectionReason || t('marketplace.seller.notices.violation'), icon: React.createElement(Ban, { size: 12 }), type: 'error' },
      primary: { label: t('common.viewDetails'), icon: React.createElement(Info, { size: 14 }), action: 'details' },
      secondaryLeft: { label: t('marketplace.seller.wizard.launchPreview'), action: 'preview', disabled: true },
      secondaryRight: { label: t('common.edit'), action: 'edit', disabled: true }
    },
    ARCHIVED: {
      tag: { variant: 'default', label: t('marketplace.seller.status.archived') },
      info: { text: t('marketplace.seller.notices.archived'), icon: React.createElement(Archive, { size: 12 }), type: 'default' },
      primary: { label: t('common.viewDetails'), icon: React.createElement(Info, { size: 14 }), action: 'details' },
      secondaryLeft: { label: t('marketplace.seller.wizard.launchPreview'), action: 'preview' },
      secondaryRight: { label: t('common.edit'), action: 'edit', disabled: true }
    }
  };

  return configs[listing.status];
};
