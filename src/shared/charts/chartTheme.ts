
import { useEffect, useState } from 'react';
import { useTheme } from '../../app/providers/ThemeContext';

// Helper to get RGB string from CSS variable and convert to rgba/hex if needed
const getCssVar = (name: string) => {
  const style = getComputedStyle(document.body);
  const val = style.getPropertyValue(name).trim();
  if (!val) return '';
  // Ensure we handle the "R G B" format from tokens.css
  return `rgb(${val.split(' ').join(',')})`;
};

const getCssVarWithAlpha = (name: string, alpha: number) => {
  const style = getComputedStyle(document.body);
  const val = style.getPropertyValue(name).trim();
  if (!val) return '';
  return `rgba(${val.split(' ').join(',')}, ${alpha})`;
};

export const useChartTheme = () => {
  const { mode } = useTheme();
  const [themeConfig, setThemeConfig] = useState<any>(null);

  useEffect(() => {
    // Small delay to ensure DOM styles are applied (esp. during HMR or theme switch)
    const timer = setTimeout(() => {
      const textColor = getCssVar('--vf-text-secondary');
      const tooltipBg = getCssVar('--vf-bg-overlay');
      const tooltipText = getCssVar('--vf-text-primary');
      const splitLineColor = getCssVarWithAlpha('--vf-border', mode === 'dark' ? 0.15 : 1);
      
      // VisionFlow DataViz Palette (Strict adherence to Spec)
      // Do NOT use status colors (Success/Error) for generic data series.
      const palette = [
        getCssVar('--vf-dataviz-1'), // Purple (Brand)
        getCssVar('--vf-dataviz-3'), // Teal
        getCssVar('--vf-dataviz-2'), // Blue
        getCssVar('--vf-dataviz-4'), // Orange
        getCssVar('--vf-dataviz-5'), // Pink
        getCssVar('--vf-dataviz-6'), // Violet
      ];

      setThemeConfig({
        color: palette,
        backgroundColor: 'transparent',
        textStyle: {
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
        tooltip: {
          backgroundColor: tooltipBg,
          borderColor: splitLineColor,
          textStyle: {
            color: tooltipText,
            fontSize: 12,
          },
          padding: [8, 12],
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          borderRadius: 8, // Spec: Control radius
          borderWidth: 1,
        },
        grid: {
          top: 30,
          bottom: 10, // Tight bottom
          left: 10,
          right: 10,
          containLabel: true,
        },
        categoryAxis: {
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: textColor, fontSize: 11, margin: 12 },
          splitLine: { show: false },
        },
        valueAxis: {
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: textColor, fontSize: 11 },
          splitLine: { 
            show: true,
            lineStyle: { color: splitLineColor, type: 'dashed', width: 1 }
          },
        },
        line: {
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: {
            width: 2.5
          }
        },
        bar: {
          itemStyle: {
            borderRadius: [4, 4, 0, 0] // Top rounded bars
          },
          barMaxWidth: 32,
        }
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [mode]);

  return themeConfig;
};
