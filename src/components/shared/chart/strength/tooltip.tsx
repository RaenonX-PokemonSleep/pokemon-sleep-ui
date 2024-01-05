import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';
import {TooltipProps} from 'recharts/types/component/Tooltip';

import {Flex} from '@/components/layout/flex/common';
import {
  StrengthGrowthChartCommonProps,
  StrengthGrowthChartState,
  StrengthGrowthDataEntry,
} from '@/components/shared/chart/strength/type';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {LevelIcon} from '@/components/shared/icon/lv';
import {Dimension} from '@/types/style';


type Props<TKey extends string> = StrengthGrowthChartCommonProps<TKey> & TooltipProps<number, number> & {
  state: StrengthGrowthChartState<TKey>,
  formatStrength?: (strength: number) => string,
};

export const StrengthGrowthChartTooltip = <TKey extends string>({
  dataKeys,
  dataNames,
  active,
  payload,
  state,
  formatStrength,
}: Props<TKey>) => {
  const t = useTranslations('UI.Common');

  if (!active || !payload || !payload.length) {
    return null;
  }

  const dimension: Dimension = 'h-5 w-5';
  const {level, strength} = payload[0].payload as StrengthGrowthDataEntry<TKey>;
  const isMultiData = dataKeys.length > 1;

  return (
    <Flex direction={isMultiData ? 'col' : 'row'} center className="info-section">
      <Flex direction="row" center className={clsx(isMultiData && 'info-highlight px-2')}>
        <LevelIcon dimension={dimension}/>
        <div>{level}</div>
      </Flex>
      <Flex className="gap-1">
        {dataKeys.map((key) => {
          if (!state.show[key]) {
            return null;
          }

          return (
            <Flex key={key} direction="row" className={clsx('items-center justify-between', isMultiData && 'gap-3')}>
              <div className="self-start">{dataNames(state)[key]}</div>
              <Flex key={key} direction="row" noFullWidth className="items-center gap-1">
                <ColoredEnergyIcon alt={t('Strength')} dimension={dimension}/>
                <div>{formatStrength ? formatStrength(strength[key]) : strength[key]}</div>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};
