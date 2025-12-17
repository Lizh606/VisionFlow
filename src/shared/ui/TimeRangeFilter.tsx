
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
        allowClear={false} // Enforce a selection usually, or allow clear if business logic permits
        defaultValue={[dayjs().subtract(24, 'hour'), dayjs()]} // Default 24h
        className="shadow-sm hover:border-brand-hover transition-all"
        style={{
          height: '40px', // Spec: Desktop control height
          borderRadius: 'var(--vf-radius-control)',
          border: '1px solid var(--vf-border)',
          width: '320px', // Fixed width for stability
        }}
        // Styles for popup to match theme can be handled by ConfigProvider globally, 
        // but here we ensure the input itself fits the page design.
      />
    </div>
  );
};
