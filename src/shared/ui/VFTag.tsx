
import React from 'react';

export type VFTagVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'brand' | 'neutral' | 'teal';

interface VFTagProps {
  children: React.ReactNode;
  variant?: VFTagVariant;
  filled?: boolean; // True = Solid background (High emphasis); False = Soft/Outline (Low emphasis)
  icon?: React.ReactNode;
  className?: string;
  title?: string; // Tooltip text
}

export const VFTag: React.FC<VFTagProps> = ({ 
  children, 
  variant = 'default', 
  filled = false,
  icon, 
  className = '',
  title
}) => {
  // Spec: Height fixed to 24px (h-6), Radius fixed to 6px (rounded-tag)
  // Font: 12px (text-xs), Semibold for readability
  const baseClasses = "inline-flex items-center justify-center gap-1.5 px-2.5 h-6 text-xs font-semibold rounded-tag transition-colors border select-none whitespace-nowrap";

  // Style Maps (Strict adherence to tokens)
  const styles = {
    // Soft / Outline Styles (Default)
    // Concept: 10% Opacity BG + 20% Opacity Border + 100% Opacity Text
    soft: {
      default: 'bg-bg-page border-border text-text-secondary',
      neutral: 'bg-text-disabled/10 border-text-disabled/20 text-text-secondary',
      success: 'bg-success/10 border-success/20 text-success',
      warning: 'bg-warning/10 border-warning/20 text-warning',
      error:   'bg-error/10 border-error/20 text-error',
      info:    'bg-info/10 border-info/20 text-info',
      brand:   'bg-brand/10 border-brand/20 text-brand',
      // Teal (Dataviz-3) for Edge
      teal:    'bg-[rgb(var(--vf-dataviz-3)/0.1)] border-[rgb(var(--vf-dataviz-3)/0.2)] text-[rgb(var(--vf-dataviz-3))]',
    },
    // Filled / Solid Styles (High Emphasis)
    // Concept: Solid Color BG + White Text + Transparent Border
    // UPDATE: Reduced opacity to /90 (approx 0.9) to make them less "heavy"/saturated while keeping solid look
    filled: {
      default: 'bg-text-secondary border-transparent text-bg-card',
      neutral: 'bg-text-disabled border-transparent text-white',
      success: 'bg-success/90 border-transparent text-white',
      warning: 'bg-warning/90 border-transparent text-white',
      error:   'bg-error/90 border-transparent text-white',
      info:    'bg-info/90 border-transparent text-white',
      brand:   'bg-brand/90 border-transparent text-white',
      teal:    'bg-[rgb(var(--vf-dataviz-3)/0.9)] border-transparent text-white',
    }
  };

  const variantStyle = filled ? styles.filled[variant] : styles.soft[variant];

  return (
    <span 
      className={`${baseClasses} ${variantStyle} ${className}`} 
      title={title}
    >
      {icon && <span className="flex items-center justify-center -ml-0.5">{icon}</span>}
      {children}
    </span>
  );
};
