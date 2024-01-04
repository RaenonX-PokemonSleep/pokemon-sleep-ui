import React from 'react';

import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {StrengthGrowthChartTooltip} from '@/components/shared/chart/strength/tooltip';
import {StrengthGrowthData, StrengthGrowthDataEntry} from '@/components/shared/chart/strength/type';
import {useLayout} from '@/hooks/layout/main';
import {generateNumberTicks} from '@/utils/number/generator';


type Props = {
  data: StrengthGrowthData,
  formatTicks: (value: number) => string,
  leftMargin?: number,
};

export const StrengthGrowthChart = ({data, formatTicks, leftMargin}: Props) => {
  const {isLandscape} = useLayout();

  const dataMax = Math.max(...data.map(({strength}) => strength));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{top: 10, bottom: 0, right: 20, left: leftMargin ?? 0}}>
        <CartesianGrid strokeDasharray="1 1" stroke="#777777"/>
        <XAxis
          type="number"
          dataKey={({level}: StrengthGrowthDataEntry) => level}
          ticks={[...generateNumberTicks({
            max: data.length,
            interval: isLandscape ? 5 : 10,
            start: 1,
          })]}
          domain={[1, 'dataMax']}
          dy={10}
          interval={0}
          className="text-sm"
        />
        <YAxis
          type="number"
          dataKey={({strength}: StrengthGrowthDataEntry) => strength}
          interval={0}
          domain={[0, 'dataMax']}
          ticks={[...generateNumberTicks({
            max: dataMax,
            interval: dataMax / 5,
            start: 0,
          })]}
          tickFormatter={formatTicks}
          className="text-sm"
        />
        <Tooltip content={<StrengthGrowthChartTooltip formatStrength={formatTicks}/>}/>
        <Line
          type="linear"
          dataKey={({strength}: StrengthGrowthDataEntry) => strength}
          animationDuration={300}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
