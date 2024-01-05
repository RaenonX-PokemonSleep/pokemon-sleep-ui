import React from 'react';

import PresentationChartLineIcon from '@heroicons/react/24/outline/PresentationChartLineIcon';
import {CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {v4} from 'uuid';

import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {FilterInclusionMap} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {StrengthGrowthChartTooltip} from '@/components/shared/chart/strength/tooltip';
import {
  StrengthGrowthChartCommonProps,
  StrengthGrowthChartState,
  StrengthGrowthDataEntry,
} from '@/components/shared/chart/strength/type';
import {useLayout} from '@/hooks/layout/main';
import {textFilterButtonStyle} from '@/styles/input';
import {generateNumberTicks} from '@/utils/number/generator';
import {Nullable} from '@/utils/type';


type Props<TKey extends string> = StrengthGrowthChartCommonProps<TKey> & {
  formatTicks: (value: number) => string,
  currentLevel?: Nullable<number>,
  classNameOfData?: {[key in TKey]?: string},
  leftMargin?: number,
};

export const StrengthGrowthChart = <TKey extends string>({
  formatTicks,
  currentLevel,
  classNameOfData,
  leftMargin,
  ...props
}: Props<TKey>) => {
  const {
    dataKeys,
    dataNames,
    data,
  } = props;

  const {isLandscape} = useLayout();
  const [
    state,
    setState,
  ] = React.useState<StrengthGrowthChartState<TKey>>({
    show: Object.fromEntries(dataKeys.map((key) => [key, true])) as FilterInclusionMap<TKey>,
  });

  const dataMax = Math.max(
    ...dataKeys.flatMap((key) => {
      if (!state.show[key]) {
        return [];
      }

      return data.map(({strength}) => strength[key]);
    }),
  );

  return (
    <Flex className="h-full gap-1.5">
      {
        dataKeys.length > 1 &&
        <FilterExpandedInput
          title={
            <Flex center>
              <PresentationChartLineIcon className="h-6 w-6"/>
            </Flex>
          }
          ids={dataKeys}
          idToButton={(key) => (
            <Flex>
              {dataNames(state)[key]}
            </Flex>
          )}
          className={textFilterButtonStyle}
          {...getMultiSelectOnClickProps({
            filter: state,
            setFilter: setState,
            filterKey: 'show',
          })}
        />
      }
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{top: 10, bottom: 0, right: 20, left: leftMargin ?? 0}}>
          <CartesianGrid strokeDasharray="1 1" stroke="#777777"/>
          <XAxis
            type="number"
            dataKey={({level}: StrengthGrowthDataEntry<TKey>) => level}
            ticks={[...generateNumberTicks({
              max: data.length,
              interval: isLandscape ? 5 : 10,
              start: 1,
            })]}
            domain={[1, 'dataMax']}
            dy={10}
            interval={0}
            className="text-sm"
            tickFormatter={(value: number) => `Lv ${value}`}
          />
          <YAxis
            type="number"
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
          {currentLevel && <ReferenceLine x={currentLevel} stroke="red" className="[&>line]:stroke-purple-500"/>}
          <Tooltip content={<StrengthGrowthChartTooltip formatStrength={formatTicks} state={state} {...props}/>}/>
          {dataKeys.map((dataKey) => {
            if (!state.show[dataKey]) {
              return null;
            }

            // intentional random key to trigger animation on data toggled
            return (
              <Line
                key={v4()}
                type="linear"
                dataKey={({strength}: StrengthGrowthDataEntry<TKey>) => strength[dataKey]}
                animationDuration={300}
                dot={false}
                className={classNameOfData && classNameOfData[dataKey]}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </Flex>
  );
};
