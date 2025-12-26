
import React from 'react';

/**
 * VFText Variant Definition (V1.4 Spec Section 5.3)
 */
export type VFTextVariant = 
  | 't1' // Display
  | 't2' // Page Title
  | 't3' // Section Title
  | 't4' // Subhead
  | 't5' // Body (Base)
  | 't5-strong' // Body Medium
  | 't6' // Caption
  | 't7'; // Mono

export type VFTextColor = 
  | 'primary' 
  | 'secondary' 
  | 'tertiary' 
  | 'disabled' 
  | 'brand' 
  | 'error' 
  | 'success' 
  | 'warning'
  | 'inherit';

interface VFTextProps {
  variant?: VFTextVariant;
  color?: VFTextColor;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  truncate?: boolean;
  tabularNums?: boolean;
  // V1.4 Fix: Add onClick support to enable interactive text (e.g. Subject Links)
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const variantMap: Record<VFTextVariant, string> = {
  't1': 'text-vf-t1 font-vf-semibold tracking-tight',
  't2': 'text-vf-t2 font-vf-semibold tracking-tight',
  't3': 'text-vf-t3 font-vf-semibold tracking-tight',
  't4': 'text-vf-t4 font-vf-semibold',
  't5': 'text-vf-t5 font-vf-regular',
  't5-strong': 'text-vf-t5 font-vf-medium',
  't6': 'text-vf-t6 font-vf-regular',
  't7': 'text-vf-t7 font-mono font-vf-regular',
};

const colorMap: Record<VFTextColor, string> = {
  'primary': 'text-text-primary',
  'secondary': 'text-text-secondary',
  'tertiary': 'text-text-tertiary',
  'disabled': 'text-text-disabled',
  'brand': 'text-brand',
  'error': 'text-error',
  'success': 'text-success',
  'warning': 'text-warning',
  'inherit': 'text-inherit',
};

/**
 * VFText - VisionFlow Standard Typography Wrapper
 * Implementation of V1.4 Section 5.
 */
export const VFText = React.forwardRef<HTMLElement, VFTextProps>(({
  variant = 't5',
  color = 'primary',
  as: Component = 'span',
  children,
  className = '',
  truncate = false,
  tabularNums = false,
  onClick,
}, ref) => {
  const combinedClasses = [
    variantMap[variant],
    colorMap[color],
    truncate ? 'truncate block' : '',
    tabularNums ? 'tabular-nums' : '',
    onClick ? 'cursor-pointer' : '', // Add visual feedback if interactive
    className
  ].filter(Boolean).join(' ');

  return (
    <Component 
      ref={ref} 
      className={combinedClasses}
      onClick={onClick}
    >
      {children}
    </Component>
  );
});
