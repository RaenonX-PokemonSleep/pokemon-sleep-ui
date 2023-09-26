import React from 'react';

import ClockIcon from '@heroicons/react/24/outline/ClockIcon';
import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex';
import {PokemonFrequencyProps} from '@/components/shared/pokemon/frequency/type';
import {durationOfDay} from '@/const/common';
import {formatFloat} from '@/utils/number';
import {toHoursMinutesSeconds} from '@/utils/time';


type Props = PokemonFrequencyProps & {
  frequency: number,
};

export const PokemonFrequency = ({frequency, noIcon, normalText}: Props) => {
  const dailyCount = durationOfDay / frequency;

  return (
    <Flex direction="row" center noFullWidth className={clsx('gap-0.5', !normalText && 'text-sm')}>
      {
        !noIcon &&
        <div className={normalText ? 'h-5 w-5' : 'h-4 w-4'}>
          <ClockIcon/>
        </div>
      }
      <div>{toHoursMinutesSeconds(frequency)}</div>
      <div>({formatFloat(dailyCount)}x)</div>
    </Flex>
  );
};
