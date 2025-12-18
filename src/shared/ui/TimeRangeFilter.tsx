
import React from 'react';
import { DatePicker } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';
import { TimeRangePickerProps } from 'antd';

const { RangePicker } = DatePicker;

interface TimeRangeFilterProps {
  onChange?: (range: [Dayjs | null, Dayjs | null] | null) => void;
  className?: string;
}

export const TimeRangeFilter: React.FC<TimeRangeFilterProps> = ({ onChange, className }) => {
  const { t } = useTranslation();

  // Define presets using dayjs
  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: t('selfhosted.overview.timeRange.24h'), value: [dayjs().subtract(24, 'hour'), dayjs()] },
    { label: t('selfhosted.overview.timeRange.7d'), value: [dayjs().subtract(7, 'day'), dayjs()] },
    { label: t('selfhosted.overview.timeRange.30d'), value: [dayjs().subtract(30, 'day'), dayjs()] },
  ];

  const onRangeChange = (dates: any, dateStrings: [string, string]) => {
    if (onChange) {
      onChange(dates);
    }
  };

  return (
    <div className={className}>
      <RangePicker
        presets={rangePresets}
        onChange={onRangeChange}
        showTime
        format="YYYY-MM-DD HH:mm"
        allowClear={false} 
        defaultValue={[dayjs().subtract(24, 'hour'), dayjs()]} 
        className="shadow-sm hover:border-brand-hover transition-all"
        style={{
          height: '40px', // Spec: Desktop control height
          borderRadius: 'var(--vf-radius-control)',
          // Fix: Wrap the RGB values in rgba() and include the alpha token
          border: '1px solid rgba(var(--vf-border), var(--vf-border-alpha))',
          width: '320px', // Fixed width for stability
        }}
      />
    </div>
  );
};
