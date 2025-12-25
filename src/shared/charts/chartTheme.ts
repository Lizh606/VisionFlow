
import { useEffect, useState } from 'react';
import { useTheme } from '../../app/providers/ThemeContext';

// 严格对齐 V1.4 规范的色盘（数据色与状态色分离）
const PALETTE = [
  '#6D29D9', // Brand Primary
  '#22C1C3', // Teal
  '#818CF8', // Indigo
  '#EC4899', // Pink
  '#0EA5E9', // Sky
  '#F59E0B', // Amber (Non-warning usage)
];

/**
 * Robustly get a CSS variable's value. 
 * If it's a comma-separated RGB list, returns a valid rgb() string.
 */
const getCssVar = (name: string, fallback: string = '') => {
  if (typeof window === 'undefined') return fallback;
  const val = getComputedStyle(document.body).getPropertyValue(name).trim();
  if (!val) return fallback;
  // If the variable is just numbers (like our RGB tokens), wrap it.
  if (/^[\d\s,]+$/.test(val)) {
    return `rgb(${val})`;
  }
  return val;
};

export const useChartTheme = () => {
  const { mode } = useTheme();
  const [themeConfig, setThemeConfig] = useState<any>(null);

  useEffect(() => {
    // 延迟确保 CSS Variables 已注入 DOM
    const timer = setTimeout(() => {
      const isDark = mode === 'dark';
      
      const textPrimary = getCssVar('--vf-text-primary', isDark ? '#FFFFFF' : '#0F172A');
      const textSecondary = getCssVar('--vf-text-secondary', isDark ? 'rgba(255,255,255,0.85)' : '#475569');
      const textTertiary = getCssVar('--vf-text-tertiary', isDark ? 'rgba(255,255,255,0.65)' : '#64748B');
      const dividerColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(226,232,240,0.8)';
      const brandColor = getCssVar('--vf-brand', '#6D29D9');

      setThemeConfig({
        color: PALETTE,
        backgroundColor: 'transparent',
        textStyle: {
          // Canvas cannot resolve CSS variables in fontFamily. Use the actual name.
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 12,
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
          borderColor: dividerColor,
          borderWidth: 1,
          padding: [10, 14],
          borderRadius: 8,
          shadowColor: 'rgba(0,0,0,0.1)',
          shadowBlur: 10,
          textStyle: { color: textPrimary, fontSize: 13 },
          axisPointer: {
            lineStyle: { color: brandColor, width: 1, type: 'dashed' }
          }
        },
        legend: {
          bottom: 0,
          itemWidth: 8,
          itemHeight: 8,
          icon: 'circle',
          textStyle: { color: textSecondary, fontWeight: 500 }
        },
        grid: {
          top: 40,
          bottom: 48,
          left: 10,
          right: 10,
          containLabel: true,
        },
        categoryAxis: {
          axisLine: { lineStyle: { color: dividerColor } },
          axisTick: { show: false },
          axisLabel: { color: textTertiary, margin: 12 },
          splitLine: { show: false }
        },
        valueAxis: {
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: textTertiary },
          splitLine: { 
            show: true, 
            lineStyle: { color: dividerColor, type: 'dashed' } 
          }
        },
        line: {
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 3 }
        },
        bar: {
          itemStyle: { borderRadius: [4, 4, 0, 0] },
          barMaxWidth: 24,
        }
      });
    }, 150);
    return () => clearTimeout(timer);
  }, [mode]);

  return themeConfig;
};
