import React from 'react';

import {useTranslations} from 'next-intl';
import {TooltipProps} from 'recharts/types/component/Tooltip';

import {Flex} from '@/components/layout/flex/common';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {LevelIcon} from '@/components/shared/icon/lv';
import {Dimension} from '@/types/style';


type Props = TooltipProps<number, number> & {
  formatStrength?: (strength: number) => string,
};

export const StrengthGrowthChartTooltip = ({active, payload, label, formatStrength}: Props) => {
  const t = useTranslations('UI.Common');

  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0];

  if (data.value === undefined) {
    return null;
  }

  const dimension: Dimension = 'h-5 w-5';
  const level = label as number;
  const strength = data.value;

  return (
    <Flex direction="row" noFullWidth className="info-section items-center">
      <LevelIcon dimension={dimension}/>
      <div>{level}</div>
      <ColoredEnergyIcon alt={t('Strength')} dimension={dimension}/>
      <div>{formatStrength ? formatStrength(strength) : strength}</div>
    </Flex>
  );
};
