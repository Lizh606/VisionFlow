
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

const getCssVar = (name: string) => {
  if (typeof window === 'undefined') return '';
  const val = getComputedStyle(document.body).getPropertyValue(name).trim();
  return val.includes(',') ? `rgb(${val})` : val;
};

const getCssVarRGBA = (name: string, alpha: number) => {
  if (typeof window === 'undefined') return '';
  const val = getComputedStyle(document.body).getPropertyValue(name).trim();
  const clean = val.split(',').join(' ');
  return `rgba(${clean}, ${alpha})`;
};

export const useChartTheme = () => {
  const { mode } = useTheme();
  const [themeConfig, setThemeConfig] = useState<any>(null);

  useEffect(() => {
    // 延迟确保 CSS Variables 已注入 DOM
    const timer = setTimeout(() => {
      const isDark = mode === 'dark';
      
      const textSecondary = getCssVar('--vf-text-secondary');
      const textTertiary = getCssVar('--vf-text-tertiary');
      const dividerColor = getCssVarRGBA('--vf-divider', isDark ? 0.15 : 0.8);
      const bgCard = getCssVar('--vf-bg-card');

      setThemeConfig({
        color: PALETTE,
        backgroundColor: 'transparent',
        textStyle: {
          fontFamily: 'var(--vf-font-sans)',
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
          textStyle: { color: getCssVar('--vf-text-primary'), fontSize: 13 },
          axisPointer: {
            lineStyle: { color: getCssVar('--vf-brand'), width: 1, type: 'dashed' }
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
          bottom: 48, // 预留给 Legend
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
