import React from 'react';

import {StaminaChart} from '@/components/shared/stamina/chart/common';
import {StaminaChartTooltipOfEfficiency} from '@/components/shared/stamina/chart/tooltip/efficiency';
import {StaminaChartCommonProps} from '@/components/shared/stamina/chart/type';


export const StaminaChartOfEfficiency = ({config, logs}: StaminaChartCommonProps) => {
  const start = config.sleepSession.primary.end;

  return (
    <StaminaChart
      config={config}
      logs={logs}
      titleI18nId="Chart.Efficiency"
      getData={({efficiency}) => efficiency}
      domainMin={1}
      tooltip={<StaminaChartTooltipOfEfficiency logs={logs} start={start}/>}
    />
  );
};
