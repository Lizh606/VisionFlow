
import React from 'react';
import { ThemeColors } from '../../../../types';

export const Card = ({ children, title, action, className = '', theme, noPadding = false, contentClassName = '' }: any) => (
    <div className={`rounded-2xl border flex flex-col h-full relative overflow-hidden group ${className}`} style={{ background: theme.surface, borderColor: theme.stroke }}>
        <div className={`flex justify-between items-center shrink-0 ${noPadding ? 'p-5 pb-2' : 'p-5 pb-4'}`}>
            <h3 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: theme.textSecondary }}>{title}</h3>
            {action}
        </div>
        <div className={`flex-1 ${noPadding ? '' : 'px-5 pb-5'} ${contentClassName}`}>{children}</div>
    </div>
);

export const CardFooter = ({ children, className = '', theme }: any) => (
    <div className={`mt-auto pt-3 border-t flex items-center h-10 ${className}`} style={{ borderColor: theme.stroke }}>
        {children}
    </div>
);
