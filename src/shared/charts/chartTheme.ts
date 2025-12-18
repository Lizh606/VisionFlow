
import { useEffect, useState } from 'react';
import { useTheme } from '../../app/providers/ThemeContext';

// Helper to get RGB string from CSS variable
const getCssVar = (name: string) => {
  if (typeof window === 'undefined') return '';
  const style = getComputedStyle(document.body);
  const val = style.getPropertyValue(name).trim();
  if (!val) return '';
  const normalized = val.includes(',') ? val : val.split(' ').join(',');
  return `rgb(${normalized})`;
};

const getCssVarWithAlpha = (name: string, alpha: number) => {
  if (typeof window === 'undefined') return '';
  const style = getComputedStyle(document.body);
  const val = style.getPropertyValue(name).trim();
  if (!val) return '';
  const normalized = val.includes(',') ? val : val.split(' ').join(',');
  return `rgba(${normalized}, ${alpha})`;
};

export const useChartTheme = () => {
  const { mode } = useTheme();
  const [themeConfig, setThemeConfig] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isDark = mode === 'dark';
      const textColor = getCssVar('--vf-text-secondary');
      const subTextColor = getCssVar('--vf-text-tertiary');
      const tooltipBg = getCssVar('--vf-bg-overlay');
      const tooltipText = getCssVar('--vf-text-primary');
      
      const axisLineColor = getCssVarWithAlpha('--vf-divider', isDark ? 0.15 : 1);
      const splitLineColor = getCssVarWithAlpha('--vf-divider', isDark ? 0.12 : 1);
      
      const palette = [
        '#22C1C3', 
        isDark ? '#A5B4FC' : '#818CF8',
        '#6D29D9',
        '#FBBC04',
        '#EA4335',
        '#EC4899',
      ];

      setThemeConfig({
        color: palette,
        backgroundColor: 'transparent',
        textStyle: {
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
        legend: {
          textStyle: {
            color: textColor,
            fontSize: 12
          }
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          backgroundColor: tooltipBg,
          borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
          borderWidth: 1,
          textStyle: { color: tooltipText, fontSize: 12 },
          padding: [8, 12],
          borderRadius: 8,
        },
        grid: {
          top: 40,
          bottom: 10,
          left: 10,
          right: 10,
          containLabel: true,
        },
        categoryAxis: {
          axisLine: { 
            show: true, 
            lineStyle: { color: axisLineColor }
          },
          axisTick: { show: false },
          axisLabel: { color: textColor, fontSize: 11, margin: 12 },
          splitLine: { show: false },
          nameTextStyle: {
            color: subTextColor,
            fontSize: 11
          }
        },
        valueAxis: {
          axisLine: { 
            show: true, 
            lineStyle: { color: axisLineColor }
          },
          axisTick: { show: false },
          axisLabel: { color: textColor, fontSize: 11 },
          splitLine: { 
            show: true,
            lineStyle: { 
              color: splitLineColor, 
              type: 'dashed', 
              width: 1 
            }
          },
          nameTextStyle: {
            color: subTextColor,
            fontSize: 11
          }
        },
        line: {
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 2.5 }
        },
        bar: {
          itemStyle: { borderRadius: [4, 4, 0, 0] },
          barMaxWidth: 32,
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [mode]);

  return themeConfig;
};
